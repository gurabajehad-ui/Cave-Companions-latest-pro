import {
  ModerationResult,
  ModerationContext,
  ModerationDecision,
  ModerationCategory
} from './moderationTypes.js';

export interface CombinedAnalysisResult {
  // The authoritative result that governs the current user action
  authoritativeResult: ModerationResult;
  // Shadow AI details for evaluation and logging
  shadowAiResult: {
    classifierId: 'PRIVATE_AI_V1' | 'PRIVATE_AI_TOXIC_BERT_V1' | 'PRIVATE_AI_BANGLA_V1' | 'PRIVATE_AI_MULTILINGUAL_V1';
    decision: ModerationDecision;
    riskScore: number;
    categories: ModerationCategory[];
    reason: string;
    latencyMs: number;
    disagreement: boolean;
  };
  isShadowMode: boolean;
  disagreement: boolean;
  agreementType: 'BOTH_SAFE' | 'BOTH_VIOLATION' | 'RULE_ONLY' | 'AI_ONLY';
}

export class CombinedRiskAnalyzer {
  private isShadowMode: boolean;

  constructor(isShadowMode: boolean = true) {
    this.isShadowMode = isShadowMode;
  }

  public setShadowMode(enabled: boolean) {
    this.isShadowMode = enabled;
  }

  /**
   * Combines deterministic rule signal with private AI signal
   */
  public analyze(
    ruleResult: ModerationResult,
    aiResult: ModerationResult,
    context: ModerationContext
  ): CombinedAnalysisResult {
    const isRuleViolation = ruleResult.decision !== 'ALLOW';
    const isAiViolation = aiResult.decision !== 'ALLOW';

    let agreementType: CombinedAnalysisResult['agreementType'] = 'BOTH_SAFE';
    let disagreement = false;

    if (!isRuleViolation && !isAiViolation) {
      agreementType = 'BOTH_SAFE';
      disagreement = false;
    } else if (isRuleViolation && isAiViolation) {
      agreementType = 'BOTH_VIOLATION';
      disagreement = false;
    } else if (isRuleViolation && !isAiViolation) {
      // E.g., Bengali regex matched, but AI was English-trained
      agreementType = 'RULE_ONLY';
      disagreement = true;
    } else {
      // AI detected subtle toxicity/threat that didn't match deterministic keywords
      agreementType = 'AI_ONLY';
      disagreement = true;
    }

    const shadowAi = {
      classifierId: (aiResult.classifierId as any) || 'PRIVATE_AI_TOXIC_BERT_V1',
      decision: aiResult.decision,
      riskScore: aiResult.riskScore,
      categories: aiResult.categories,
      reason: aiResult.reason,
      latencyMs: aiResult.latencyMs || 0,
      disagreement
    };

    if (this.isShadowMode) {
      // In Shadow Mode, Rule-Based Classifier remains 100% authoritative for actual message moderation
      const authoritative: ModerationResult = {
        ...ruleResult,
        classifierId: 'RULE_ENGINE_V1',
        shadowAiResult: shadowAi
      };

      return {
        authoritativeResult: authoritative,
        shadowAiResult: shadowAi,
        isShadowMode: true,
        disagreement,
        agreementType
      };
    }

    // Future Enforcement Combination (Phase 5):
    // 1. If clear deterministic rule violation: rule remains authoritative
    if (isRuleViolation && ruleResult.riskScore >= 0.75) {
      return {
        authoritativeResult: {
          ...ruleResult,
          classifierId: 'COMBINED_SHADOW_V1',
          shadowAiResult: shadowAi
        },
        shadowAiResult: shadowAi,
        isShadowMode: false,
        disagreement,
        agreementType
      };
    }

    // 2. Both agree on violation
    if (isRuleViolation && isAiViolation) {
      const combinedRisk = Math.min(1.0, Math.max(ruleResult.riskScore, aiResult.riskScore) + 0.1);
      const combinedCategories = Array.from(new Set([...ruleResult.categories, ...aiResult.categories]));
      return {
        authoritativeResult: {
          decision: combinedRisk >= 0.75 ? 'BLOCK' : 'REVIEW',
          riskScore: Number(combinedRisk.toFixed(3)),
          categories: combinedCategories,
          reason: `সম্মিলিত শনাক্তকরণ: রুল ও এআই উভয়েই সম্ভাব্য নিয়ম লঙ্ঘন চিহ্নিত করেছে (${combinedCategories.join(', ')})`,
          isReligiousEducationalContext: ruleResult.isReligiousEducationalContext || aiResult.isReligiousEducationalContext,
          classifierId: 'COMBINED_SHADOW_V1',
          shadowAiResult: shadowAi
        },
        shadowAiResult: shadowAi,
        isShadowMode: false,
        disagreement,
        agreementType
      };
    }

    // 3. AI flagged high confidence violation (>0.85) while rule missed (prefer REVIEW rather than instant block)
    if (!isRuleViolation && isAiViolation && aiResult.riskScore >= 0.85) {
      return {
        authoritativeResult: {
          decision: 'REVIEW',
          riskScore: aiResult.riskScore,
          categories: aiResult.categories,
          reason: `এআই সেন্সর দ্বারা পর্যালোচনার জন্য চিহ্নিত (${aiResult.categories.join(', ')})`,
          isReligiousEducationalContext: aiResult.isReligiousEducationalContext,
          classifierId: 'COMBINED_SHADOW_V1',
          shadowAiResult: shadowAi
        },
        shadowAiResult: shadowAi,
        isShadowMode: false,
        disagreement,
        agreementType
      };
    }

    // Default to rule result
    return {
      authoritativeResult: {
        ...ruleResult,
        shadowAiResult: shadowAi
      },
      shadowAiResult: shadowAi,
      isShadowMode: false,
      disagreement,
      agreementType
    };
  }
}

export const defaultCombinedAnalyzer = new CombinedRiskAnalyzer(true); // Shadow mode true by default
