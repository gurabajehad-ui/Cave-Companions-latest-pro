import { ModerationResult } from './moderationTypes.js';
import { ConversationContext, analyzeContextSignals } from './ConversationContext.js';

export interface ConversationRiskResult {
  riskScore: number;
  decision: ModerationResult['decision'];
  contextCategories: string[];
  contextualSignals: string[];
  confidence: number;
  escalationDetected: boolean;
  quotationDetected: boolean;
  educationalContextDetected: boolean;
  fiqhContextDetected: boolean;
  disagreement: boolean;
  contextualDisagreement: boolean;
}

export class ConversationRiskAnalyzer {
  /**
   * Combines single-message Rule and AI results with conversation-level context.
   * GUARANTEE: Rule Engine BLOCK decisions are strictly authoritative and CANNOT be downgraded by context.
   */
  public analyze(
    content: string,
    ruleResult: ModerationResult,
    aiResult: ModerationResult,
    context: ConversationContext
  ): ConversationRiskResult {
    const isFiqh = ruleResult.isReligiousEducationalContext || aiResult.isReligiousEducationalContext;
    const contextAnalysis = analyzeContextSignals(content, context, isFiqh);

    // 1. Authoritative Rule Engine Check
    if (ruleResult.decision === 'BLOCK') {
      return {
        riskScore: Math.max(ruleResult.riskScore, 0.95),
        decision: 'BLOCK',
        contextCategories: contextAnalysis.contextCategories,
        contextualSignals: [...contextAnalysis.contextualSignals, 'RULE_ENGINE_CRITICAL_BLOCK_OVERRIDE'],
        confidence: 1.0,
        escalationDetected: contextAnalysis.escalationDetected,
        quotationDetected: contextAnalysis.quotationDetected,
        educationalContextDetected: contextAnalysis.educationalContextDetected,
        fiqhContextDetected: contextAnalysis.fiqhContextDetected,
        disagreement: aiResult.decision === 'ALLOW',
        contextualDisagreement: false
      };
    }

    // 2. Base AI Risk Score calculation
    let baseAiRisk = aiResult.riskScore;

    // Apply context modifier safely
    let adjustedRisk = baseAiRisk + contextAnalysis.contextRiskScoreModifier;

    // Fiqh or Educational Context Hard Cap (Prevent False Positives)
    if (contextAnalysis.fiqhContextDetected || contextAnalysis.educationalContextDetected) {
      if (!ruleResult.matchedRuleSnippets || ruleResult.matchedRuleSnippets.length === 0) {
        adjustedRisk = Math.min(adjustedRisk, 0.20);
      }
    }

    // Quotation context dampening for single non-severe AI flag
    if (contextAnalysis.quotationDetected && !contextAnalysis.escalationDetected) {
      adjustedRisk = Math.min(adjustedRisk, 0.55);
    }

    // Multi-message escalation amplification
    if (contextAnalysis.escalationDetected) {
      adjustedRisk = Math.max(adjustedRisk, 0.75);
    }

    // Clamp between 0.0 and 1.0
    adjustedRisk = Math.max(0.0, Math.min(1.0, Number(adjustedRisk.toFixed(3))));

    // Determine final Decision in Calibration/Shadow mode
    // Rule Engine is authoritative, so if Rule Engine is ALLOW/REVIEW, decision comes from Rule Engine,
    // while adjustedRisk reflects the context-aware AI signal.
    let decision: ModerationResult['decision'] = ruleResult.decision;
    if (decision === 'ALLOW' && ruleResult.matchedRuleSnippets && ruleResult.matchedRuleSnippets.length > 0) {
      decision = 'ALLOW_WITH_WARNING';
    }

    const disagreement = ruleResult.decision !== aiResult.decision;
    const contextualDisagreement = (adjustedRisk >= 0.60 && ruleResult.decision === 'ALLOW');

    return {
      riskScore: adjustedRisk,
      decision,
      contextCategories: contextAnalysis.contextCategories,
      contextualSignals: contextAnalysis.contextualSignals,
      confidence: contextAnalysis.confidence,
      escalationDetected: contextAnalysis.escalationDetected,
      quotationDetected: contextAnalysis.quotationDetected,
      educationalContextDetected: contextAnalysis.educationalContextDetected,
      fiqhContextDetected: contextAnalysis.fiqhContextDetected,
      disagreement,
      contextualDisagreement
    };
  }
}

export const defaultConversationRiskAnalyzer = new ConversationRiskAnalyzer();
