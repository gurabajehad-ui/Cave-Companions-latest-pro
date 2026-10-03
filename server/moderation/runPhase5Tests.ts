import { defaultRuleClassifier } from './RuleBasedClassifier.js';
import { defaultPrivateAIClassifier } from './PrivateAIClassifier.js';
import { defaultCombinedAnalyzer } from './CombinedRiskAnalyzer.js';
import { defaultPolicyEngine } from './policyEngine.js';
import { sanitizeAndNormalizeText } from './normalization.js';

interface TestCase {
  id: string;
  categoryName: string;
  text: string;
  expectedDecision: 'ALLOW' | 'BLOCK' | 'REVIEW' | 'ALLOW_WITH_WARNING';
  shouldBeBlockedOrFlagged: boolean;
  isEducational: boolean;
}

const TEST_CASES: TestCase[] = [
  // 1. Native Bengali Unicode Threats / Violence
  {
    id: 'BN_01',
    categoryName: 'Native Bengali Threat',
    text: 'তোকে মেরে ফেলব কুত্তার বাচ্চা',
    expectedDecision: 'BLOCK',
    shouldBeBlockedOrFlagged: true,
    isEducational: false
  },
  // 2. Native Bengali Slurs & Abusive Language
  {
    id: 'BN_02',
    categoryName: 'Native Bengali Abuse',
    text: 'তুই একটা খানকির পোলা শুয়োরের বাচ্চা',
    expectedDecision: 'BLOCK',
    shouldBeBlockedOrFlagged: true,
    isEducational: false
  },
  // 3. Roman / Transliterated Bengali Threats & Harassment
  {
    id: 'ROMAN_01',
    categoryName: 'Roman-Bengali Threat',
    text: 'tore mere phelbo kuttar baccha',
    expectedDecision: 'BLOCK',
    shouldBeBlockedOrFlagged: true,
    isEducational: false
  },
  {
    id: 'ROMAN_02',
    categoryName: 'Roman-Bengali Slur',
    text: 'madarchod shala harami tore khun korbo',
    expectedDecision: 'BLOCK',
    shouldBeBlockedOrFlagged: true,
    isEducational: false
  },
  // 4. Bengali-English Mixed Text
  {
    id: 'MIXED_01',
    categoryName: 'Bengali-English Mixed Threat',
    text: 'Hey you idiot shut up or তোরে শেষ করে দিব I will hunt you down',
    expectedDecision: 'BLOCK',
    shouldBeBlockedOrFlagged: true,
    isEducational: false
  },
  // 5. Bengali with Intentionally Distorted Spelling & Leetspeak
  {
    id: 'DISTORT_01',
    categoryName: 'Distorted Spelling Obfuscation',
    text: 'm-a-r-b-o t-o-r-e m@darchod k_u_t_t_a',
    expectedDecision: 'BLOCK',
    shouldBeBlockedOrFlagged: true,
    isEducational: false
  },
  {
    id: 'DISTORT_02',
    categoryName: 'Spaced Bengali Letters',
    text: 'ম ে র ে  ফ ে ল ব  শু য় ো র',
    expectedDecision: 'BLOCK',
    shouldBeBlockedOrFlagged: true,
    isEducational: false
  },
  // 6. Bengali Harassment & Insult
  {
    id: 'HARASS_01',
    categoryName: 'Bengali Harassment',
    text: 'তুই একটা পাগল জানয়ার তোর মতো নোংরা মানুষের জায়গা নেই',
    expectedDecision: 'BLOCK',
    shouldBeBlockedOrFlagged: true,
    isEducational: false
  },
  // 7. Bengali Sexual / Inappropriate Solicitation
  {
    id: 'SEX_01',
    categoryName: 'Bengali Sexual Solicitation',
    text: 'কল গার্ল এসকর্ট সার্ভিস রুম ডেট জন্য মেসেজ দাও',
    expectedDecision: 'BLOCK',
    shouldBeBlockedOrFlagged: true,
    isEducational: false
  },
  {
    id: 'SEX_02',
    categoryName: 'Roman Sexual Solicitation',
    text: 'call girl dhaka available for night date room date',
    expectedDecision: 'BLOCK',
    shouldBeBlockedOrFlagged: true,
    isEducational: false
  },
  // 8. Bengali Spam & Scam Language
  {
    id: 'SPAM_01',
    categoryName: 'Bengali Casino/Gambling Spam',
    text: 'ঘরে বসে প্রতিদিন ৫০০০ টাকা আয় করুন babu88 অনলাইন ক্যাসিনো বাজি ধরুন',
    expectedDecision: 'BLOCK',
    shouldBeBlockedOrFlagged: true,
    isEducational: false
  },
  // 9. Islamic Educational & Fiqh Discussions (MUST BE SAFE / ALLOWED)
  {
    id: 'FIQH_01',
    categoryName: 'Islamic Educational Fiqh (Bengali)',
    text: 'আসসালামু আলাইকুম, ফরজ গোসল ও তাহারাত (পবিত্রতা) অর্জনের সহীহ নিয়ম বিস্তারিত জানতে চাই।',
    expectedDecision: 'ALLOW',
    shouldBeBlockedOrFlagged: false,
    isEducational: true
  },
  {
    id: 'FIQH_02',
    categoryName: 'Islamic Marriage/Nikah Discussion',
    text: 'বিবাহ ও দেনমোহর (Mahr) নির্ধারণে শরীয়তের বিধান কী? জাযাকাল্লাহু খাইরান।',
    expectedDecision: 'ALLOW',
    shouldBeBlockedOrFlagged: false,
    isEducational: true
  },
  {
    id: 'FIQH_03',
    categoryName: 'Islamic Menstruation/Haidh Inquiry',
    text: 'হায়েজ ও নেফাস চলাকালীন সালাতের হুকুম সম্পর্কিত মাসআলা ব্যাখ্যা করবেন কি?',
    expectedDecision: 'ALLOW',
    shouldBeBlockedOrFlagged: false,
    isEducational: true
  },
  // 10. Everyday Safe Messages (Bengali, English, Arabic)
  {
    id: 'SAFE_01',
    categoryName: 'Safe Bengali Greeting',
    text: 'শুভ সকাল ভাই, আজকের আসরের জামাত কোন মসজিদে আদায় করবেন?',
    expectedDecision: 'ALLOW',
    shouldBeBlockedOrFlagged: false,
    isEducational: false
  },
  {
    id: 'SAFE_02',
    categoryName: 'Safe English Community Chat',
    text: 'Assalamu Alaikum everyone, reminder that Quran study circle starts in 15 minutes.',
    expectedDecision: 'ALLOW',
    shouldBeBlockedOrFlagged: false,
    isEducational: false
  },
  {
    id: 'SAFE_03',
    categoryName: 'Safe Arabic Dua',
    text: 'جزاكم الله خيرا وبارك الله فيكم جميعا وتقبل الله منا ومنكم الصيام والقيام',
    expectedDecision: 'ALLOW',
    shouldBeBlockedOrFlagged: false,
    isEducational: false
  }
];

async function runTests() {
  console.log('===============================================================');
  console.log('   CAVE CIRCLE PHASE 5: PRIVATE AI & MULTILINGUAL VERIFICATION');
  console.log('   Model: onnx-community/distilbert-multilingual-toxicity-classifier-ONNX');
  console.log('   Classifier ID: PRIVATE_AI_MULTILINGUAL_V1');
  console.log('===============================================================\n');

  console.log('Warming up Private AI Classifier...');
  const initSuccess = await defaultPrivateAIClassifier.initPipeline();
  console.log(`Private AI Initialized: ${initSuccess ? 'SUCCESS (Ready)' : 'FAILED'}\n`);

  let totalPassed = 0;
  const results: any[] = [];

  for (const tc of TEST_CASES) {
    const norm = sanitizeAndNormalizeText(tc.text);
    const mockContext = {
      userId: 'test-user-1',
      circleId: 'test-circle-1',
      messageType: 'TEXT' as const,
      senderName: 'Test Companion'
    };

    // 1. Rule Engine evaluation
    const ruleRes = await defaultRuleClassifier.classify(norm.cleaned, mockContext);

    // 2. Private AI evaluation
    const aiRes = await defaultPrivateAIClassifier.classify(norm.cleaned, mockContext);

    // 3. Combined Risk Analyzer
    const combined = defaultCombinedAnalyzer.analyze(ruleRes, aiRes, mockContext);

    // 4. Policy Engine
    const outcome = defaultPolicyEngine.evaluatePolicy(combined.authoritativeResult, mockContext);

    const isViolationExpected = tc.shouldBeBlockedOrFlagged;
    const isActuallyBlockedOrFlagged = outcome.decision !== 'ALLOW';
    const isSuccess = isViolationExpected ? isActuallyBlockedOrFlagged : (outcome.decision === 'ALLOW');

    if (isSuccess) totalPassed++;

    results.push({
      id: tc.id,
      category: tc.categoryName,
      textSnippet: tc.text.slice(0, 45) + (tc.text.length > 45 ? '...' : ''),
      expected: tc.expectedDecision,
      actualAuthoritative: outcome.decision,
      ruleRiskScore: ruleRes.riskScore,
      aiClassifierId: aiRes.classifierId,
      aiRiskScore: aiRes.riskScore,
      aiDecision: aiRes.decision,
      disagreement: combined.disagreement,
      isSuccess
    });
  }

  console.table(results.map(r => ({
    ID: r.id,
    Category: r.category,
    Expected: r.expected,
    Outcome: r.actualAuthoritative,
    'Rule Score': r.ruleRiskScore,
    'AI Score': r.aiRiskScore,
    'AI ID': r.aiClassifierId,
    Passed: r.isSuccess ? '✅ PASS' : '❌ FAIL'
  })));

  console.log(`\nResults: ${totalPassed} / ${TEST_CASES.length} Test Cases Passed (${Math.round((totalPassed / TEST_CASES.length) * 100)}%)`);

  if (totalPassed === TEST_CASES.length) {
    console.log('\n🎉 ALL PHASE 5 TESTS PASSED FLAWLESSLY!');
  } else {
    console.log(`\n⚠️ ${TEST_CASES.length - totalPassed} test cases differed from expectation.`);
  }
}

runTests().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});
