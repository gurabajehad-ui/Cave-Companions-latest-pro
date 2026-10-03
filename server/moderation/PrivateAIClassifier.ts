import { pipeline, env } from '@xenova/transformers';
import {
  IModerationClassifier,
  ModerationContext,
  ModerationResult,
  ModerationCategory
} from './moderationTypes.js';
import { ISLAMIC_FIQH_EDUCATIONAL_MARKERS } from './moderationRules.js';

// Configure model cache inside project or temp directory
env.cacheDir = process.env.PRIVATE_AI_CACHE_DIR || './.model_cache';

export interface PrivateAIConfig {
  enabled: boolean;
  modelName: string;
  timeoutMs: number;
  confidenceThreshold: number;
}

export class PrivateAIClassifier implements IModerationClassifier {
  private classifierPipeline: any = null;
  private isInitializing: boolean = false;
  private initPromise: Promise<boolean> | null = null;
  private initError: string | null = null;
  private isReady: boolean = false;
  private config: PrivateAIConfig;

  constructor(customConfig?: Partial<PrivateAIConfig>) {
    this.config = {
      enabled: process.env.PRIVATE_AI_ENABLED !== 'false',
      modelName: process.env.PRIVATE_AI_MODEL_NAME || 'onnx-community/distilbert-multilingual-toxicity-classifier-ONNX',
      timeoutMs: Number(process.env.PRIVATE_AI_TIMEOUT_MS) || 2500,
      confidenceThreshold: Number(process.env.PRIVATE_AI_CONFIDENCE_THRESHOLD) || 0.60,
      ...customConfig
    };

    if (this.config.enabled) {
      // Lazy / background initialization without blocking main thread
      this.initPipeline().catch(err => {
        console.warn('[PrivateAIClassifier] Background model init notice:', err.message);
      });
    }
  }

  /**
   * Warm up and load model once per process lifecycle
   */
  public async initPipeline(): Promise<boolean> {
    if (this.isReady && this.classifierPipeline) return true;
    if (this.initPromise) return this.initPromise;

    this.isInitializing = true;
    this.initError = null;

    this.initPromise = (async () => {
      try {
        console.log(`[PrivateAIClassifier] Initializing self-hosted model: ${this.config.modelName} (quantized CPU)...`);
        const start = Date.now();

        this.classifierPipeline = await pipeline('text-classification', this.config.modelName, {
          quantized: true
        });

        this.isReady = true;
        this.isInitializing = false;
        console.log(`[PrivateAIClassifier] Model ready in ${Date.now() - start} ms (status: ACTIVE_LOCAL)`);
        return true;
      } catch (err: any) {
        this.isInitializing = false;
        this.isReady = false;
        this.initError = err.message || 'Unknown model load failure';
        console.warn('[PrivateAIClassifier] Model initialization failed (graceful fallback active):', this.initError);
        return false;
      }
    })();

    return this.initPromise;
  }

  public getStatus() {
    return {
      enabled: this.config.enabled,
      isReady: this.isReady,
      isInitializing: this.isInitializing,
      initError: this.initError,
      modelName: this.config.modelName,
      timeoutMs: this.config.timeoutMs
    };
  }

  /**
   * Classify text with timeout protection and Islamic educational context guard
   */
  public async classify(content: string, context: ModerationContext): Promise<ModerationResult> {
    const startTime = Date.now();

    // If model is currently initializing, wait for it up to timeout
    if (this.config.enabled && this.isInitializing && this.initPromise) {
      try {
        await Promise.race([
          this.initPromise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Model warm-up timeout')), this.config.timeoutMs)
          )
        ]);
      } catch {
        // Continue to fallback check below
      }
    }

    const classifierId = (this.config.modelName.includes('multilingual') || this.config.modelName.includes('distilbert'))
      ? 'PRIVATE_AI_MULTILINGUAL_V1'
      : 'PRIVATE_AI_TOXIC_BERT_V1';

    // 1. Safe fallback if disabled or failed to initialize
    if (!this.config.enabled || !this.isReady || !this.classifierPipeline) {
      return {
        decision: 'ALLOW',
        riskScore: 0.0,
        categories: ['SAFE'],
        reason: this.initError 
          ? `AI Classifier unavailable (${this.initError}). Rule engine fallback active.` 
          : 'AI Classifier disabled or initializing. Rule engine active.',
        isReligiousEducationalContext: false,
        classifierId,
        latencyMs: Date.now() - startTime
      };
    }

    // 2. Detect Islamic Educational / Fiqh Context Guard
    let isReligiousEducationalContext = false;
    for (const marker of ISLAMIC_FIQH_EDUCATIONAL_MARKERS) {
      if (marker.test(content)) {
        isReligiousEducationalContext = true;
        break;
      }
    }

    // 3. Run Inference with strict timeout guard and dual-stream Bengali projection
    try {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`AI inference timed out after ${this.config.timeoutMs}ms`)), this.config.timeoutMs)
      );

      let rawOutput: any[] = [];
      const hasBengali = /[\u0980-\u09FF]/.test(content);

      if (hasBengali) {
        // Dual-stream: direct text + phonetic Roman-Bengali projection
        const { transliterateBengaliToRoman } = await import('./normalization.js');
        const phonetic = transliterateBengaliToRoman(content);

        const [directRes, phoneticRes] = (await Promise.all([
          Promise.race([this.classifierPipeline(content, { topk: null }), timeoutPromise]),
          Promise.race([this.classifierPipeline(phonetic, { topk: null }), timeoutPromise])
        ])) as [any[], any[]];

        // Merge highest score per label from direct and phonetic streams
        const mergedScores: Record<string, number> = {};
        if (Array.isArray(directRes)) {
          for (const item of directRes) {
            if (item?.label) mergedScores[item.label] = Math.max(mergedScores[item.label] || 0, item.score || 0);
          }
        }
        if (Array.isArray(phoneticRes)) {
          for (const item of phoneticRes) {
            if (item?.label) mergedScores[item.label] = Math.max(mergedScores[item.label] || 0, item.score || 0);
          }
        }
        rawOutput = Object.entries(mergedScores).map(([label, score]) => ({ label, score }));
      } else {
        // Direct inference on Latin / English / Arabic / Roman-Bengali text
        rawOutput = (await Promise.race([
          this.classifierPipeline(content, { topk: null }),
          timeoutPromise
        ])) as any[];
      }

      const latencyMs = Date.now() - startTime;

      // Extract label probabilities
      // Xenova/toxic-bert labels: toxic, severe_toxic, obscene, threat, insult, identity_hate
      // onnx-community/distilbert-multilingual-toxicity-classifier-ONNX labels: toxic, not-toxic
      const labelMap: Record<string, number> = {};
      if (Array.isArray(rawOutput)) {
        for (const item of rawOutput) {
          if (item && item.label && typeof item.score === 'number') {
            labelMap[item.label] = item.score;
          }
        }
      }

      const toxicScore = labelMap['toxic'] || 0;
      const severeToxicScore = labelMap['severe_toxic'] || 0;
      const obsceneScore = labelMap['obscene'] || 0;
      const threatScore = labelMap['threat'] || 0;
      const insultScore = labelMap['insult'] || 0;
      const identityHateScore = labelMap['identity_hate'] || 0;

      // Map to Cave moderation categories
      const detectedCategories = new Set<ModerationCategory>();
      let maxConfidence = Math.max(toxicScore, severeToxicScore, obsceneScore, threatScore, insultScore, identityHateScore);

      if (threatScore >= this.config.confidenceThreshold || severeToxicScore >= this.config.confidenceThreshold) {
        detectedCategories.add('HATE_ABUSE');
      }
      if (identityHateScore >= this.config.confidenceThreshold) {
        detectedCategories.add('HATE_ABUSE');
      }
      if (insultScore >= this.config.confidenceThreshold || toxicScore >= this.config.confidenceThreshold) {
        detectedCategories.add('HARASSMENT');
      }
      if (obsceneScore >= this.config.confidenceThreshold) {
        // If in Islamic educational context (e.g. discussing Ghusl, Taharah, Nikah, Haidh), do not classify as sexual misconduct
        if (!isReligiousEducationalContext) {
          detectedCategories.add('EXPLICIT_SEXUAL');
        } else {
          maxConfidence = Math.min(0.20, maxConfidence * 0.2);
        }
      }

      // Check if any category was flagged
      const categories = Array.from(detectedCategories);
      if (categories.length === 0) {
        return {
          decision: 'ALLOW',
          riskScore: Number(maxConfidence.toFixed(3)),
          categories: ['SAFE'],
          reason: 'স্বয়ংক্রিয় এআই মডেল কোনো ক্ষতিকর বিষয় শনাক্ত করেনি (নিরাপদ)',
          isReligiousEducationalContext,
          classifierId,
          latencyMs
        };
      }

      // Calculate preliminary AI decision based on model confidence
      let decision: ModerationResult['decision'] = 'ALLOW_WITH_WARNING';
      if (maxConfidence >= 0.85) {
        decision = 'BLOCK';
      } else if (maxConfidence >= 0.60) {
        decision = 'REVIEW';
      }

      const categoryLabels = categories.join(', ');
      return {
        decision,
        riskScore: Number(maxConfidence.toFixed(3)),
        categories,
        reason: `প্রাইভেট এআই মডেল সম্ভাব্য লঙ্ঘন শনাক্ত করেছে (${categoryLabels}, আত্মবিশ্বাস: ${(maxConfidence * 100).toFixed(0)}%)`,
        isReligiousEducationalContext,
        classifierId,
        latencyMs
      };
    } catch (err: any) {
      const latencyMs = Date.now() - startTime;
      console.warn('[PrivateAIClassifier] Inference error/timeout (fallback to rule engine):', err.message);

      return {
        decision: 'ALLOW',
        riskScore: 0.0,
        categories: ['SAFE'],
        reason: `এআই ইনফারেন্স ব্যর্থ (${err.message})। রুল ইঞ্জিন ফলব্যাক কার্যকর।`,
        isReligiousEducationalContext,
        classifierId,
        latencyMs
      };
    }
  }
}

export const defaultPrivateAIClassifier = new PrivateAIClassifier();
