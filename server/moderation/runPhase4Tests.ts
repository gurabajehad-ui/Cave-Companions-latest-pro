import { defaultRuleClassifier } from './RuleBasedClassifier.js';
import { PrivateAIClassifier } from './PrivateAIClassifier.js';
import { CombinedRiskAnalyzer } from './CombinedRiskAnalyzer.js';
import { ModerationPipeline } from './ModerationPipeline.js';
import { ModerationContext } from './moderationTypes.js';
import { initPostgresSchema } from '../pgInit.js';

async function runTestSuite() {
  console.log('====================================================');
  console.log('CAVE CIRCLE — PHASE 4 PRIVATE AI CLASSIFIER TEST SUITE');
  console.log('====================================================\n');

  console.log('Initializing database schema...');
  try {
    await initPostgresSchema();
    console.log('Database ready.\n');
  } catch (dbErr: any) {
    console.warn('Database init notice:', dbErr.message);
  }

  const dummyContext: ModerationContext = {
    userId: 'test-user-1',
    circleId: 'test-circle-1',
    messageType: 'TEXT',
    senderName: 'Test Companion'
  };

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    totalTests++;
    if (condition) {
      console.log(`  ✓ PASS: ${testName}`);
      passedTests++;
    } else {
      console.error(`  ✗ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
    }
  }

  // TEST 1: Model Initialization
  console.log('--- TEST 1: MODEL INITIALIZATION ---');
  const privateAI = new PrivateAIClassifier();
  const initSuccess = await privateAI.initPipeline();
  assert(initSuccess, 'Private AI model loads successfully');
  const status = privateAI.getStatus();
  assert(status.isReady, 'Model reports readiness state as true');
  assert(status.modelName === 'Xenova/toxic-bert', 'Configured model is Xenova/toxic-bert');

  // TEST 2: Safe Messages (English, Bengali, Arabic)
  console.log('\n--- TEST 2: SAFE MESSAGES EVALUATION ---');
  const safeSamples = [
    { text: 'Assalamu Alaikum brother, hope your family is doing well.', lang: 'English' },
    { text: 'আজকের ফজর সালাতে জামাআত অনেক সুন্দর হয়েছে। আলহামদুলিল্লাহ।', lang: 'Bengali' },
    { text: 'بارك الله فيكم يا أخي وتقبل الله منا ومنكم.', lang: 'Arabic' }
  ];

  for (const sample of safeSamples) {
    const res = await privateAI.classify(sample.text, dummyContext);
    assert(res.decision === 'ALLOW', `Safe message (${sample.lang}) allowed by AI`, `Got ${res.decision}, risk: ${res.riskScore}`);
  }

  // TEST 3: Islamic Educational False-Positive Protection
  console.log('\n--- TEST 3: ISLAMIC EDUCATIONAL FALSE-POSITIVE PROTECTION ---');
  const islamicSamples = [
    { text: 'সহীহ বুখারী অনুযায়ী জানাবাত ও গোসল (Ghusl) এর সঠিক সুন্নাত পদ্ধতি কী?', topic: 'Ghusl' },
    { text: 'ইসলামিক ফিকহ অনুযায়ী নিকাহ (Nikah) ও মহর (Mahr) নির্ধারণের শর্তসমূহ।', topic: 'Nikah/Mahr' },
    { text: 'পবিত্রতা (Taharah) ও হায়েজ (Haidh) সংক্রান্ত মাসআলা সঠিকভাবে জানতে চাই।', topic: 'Taharah/Haidh' },
    { text: 'পোশাকের শালীনতা ও সতর (Awrah) রক্ষা করার ধর্মীয় গুরুত্ব।', topic: 'Awrah' }
  ];

  for (const sample of islamicSamples) {
    const res = await privateAI.classify(sample.text, dummyContext);
    assert(res.decision === 'ALLOW', `Educational topic [${sample.topic}] NOT blocked by AI`, `Got ${res.decision}`);
    assert(!res.categories.includes('EXPLICIT_SEXUAL'), `Educational topic [${sample.topic}] NOT categorized as EXPLICIT_SEXUAL`);
  }

  // TEST 4: Violation Detections (English, Threat, Mixed, Transliterated)
  console.log('\n--- TEST 4: VIOLATIONS DETECTION ---');
  const violationSamples = [
    { text: 'You are an absolute idiot and a filthy piece of garbage.', expected: 'HARASSMENT' },
    { text: 'I will find your home and kill you and shoot your friends.', expected: 'HATE_ABUSE' },
    { text: 'Hey shut up idiot, I will beat you up তুই বোকা', expected: 'HARASSMENT' },
    { text: 'tui ekta baje manush toke mere phelbo kuttar baccha', expected: 'HARASSMENT' }
  ];

  for (const sample of violationSamples) {
    const res = await privateAI.classify(sample.text, dummyContext);
    const hasViolation = res.decision !== 'ALLOW' && res.riskScore >= 0.50;
    assert(hasViolation, `Violation detected by AI: "${sample.text.slice(0, 35)}..."`, `Decision: ${res.decision}, Risk: ${res.riskScore}`);
  }

  // TEST 5: Bengali Script Behavior Documentation & Rule Engine Fallback
  console.log('\n--- TEST 5: BENGALI SCRIPT & RULE ENGINE AUTHORITATIVENESS ---');
  const bengaliViolation = 'তুই একটা শুয়োরের বাচ্চা তোকে মেরে ফেলব কুত্তা';
  const aiBengaliRes = await privateAI.classify(bengaliViolation, dummyContext);
  const ruleBengaliRes = await defaultRuleClassifier.classify(bengaliViolation, dummyContext);

  assert(ruleBengaliRes.decision === 'BLOCK', 'RuleBasedClassifier catches Bengali slur and issues BLOCK');
  assert(ruleBengaliRes.riskScore >= 0.80, 'RuleBasedClassifier assigns high risk score to Bengali slur');

  // Verify that BERT tokenization on raw Bengali yields low score (honest documentation)
  assert(aiBengaliRes.riskScore < 0.20, 'Raw Bengali script without transliteration is unclassified by toxic-bert (Honest Limitation confirmed)');

  // TEST 6: CombinedRiskAnalyzer in Shadow Mode
  console.log('\n--- TEST 6: COMBINED RISK ANALYZER (SHADOW MODE) ---');
  const combinedAnalyzer = new CombinedRiskAnalyzer(true);
  const combinedRes = combinedAnalyzer.analyze(ruleBengaliRes, aiBengaliRes, dummyContext);

  assert(combinedRes.isShadowMode === true, 'Analyzer confirms Shadow Mode is ACTIVE');
  assert(combinedRes.authoritativeResult.decision === 'BLOCK', 'Authoritative decision comes from Rule Engine in Shadow Mode');
  assert(combinedRes.disagreement === true, 'Disagreement is correctly flagged when Rule blocks but AI was silent on Bengali script');
  assert(combinedRes.shadowAiResult.classifierId === 'PRIVATE_AI_V1', 'Shadow AI result is captured with PRIVATE_AI_V1 ID');

  // TEST 7: Pipeline Fallback on AI Failure / Timeout
  console.log('\n--- TEST 7: PIPELINE FALLBACK & FAILURE SAFETY ---');
  // Create a broken AI classifier to simulate failure
  const failingAI = new PrivateAIClassifier({ enabled: false });
  const pipelineWithFailingAI = new ModerationPipeline(
    defaultRuleClassifier,
    failingAI,
    combinedAnalyzer
  );

  const testMsg = 'আসসালামু আলাইকুম। কেমন আছেন সবাই?';
  const pipelineRes = await pipelineWithFailingAI.evaluateTextMessage(testMsg, dummyContext);
  assert(pipelineRes.isPermitted === true, 'Normal message is permitted even when AI classifier fails/disabled');
  assert(pipelineRes.outcome.decision === 'ALLOW', 'Fallback to rule engine yields ALLOW');

  // Pipeline on bad message with broken AI
  const badMsg = 'তুই একটা শুয়োরের বাচ্চা';
  const badPipelineRes = await pipelineWithFailingAI.evaluateTextMessage(badMsg, dummyContext);
  assert(badPipelineRes.isPermitted === false, 'Bad message is blocked by Rule Engine even when AI fails');
  assert(badPipelineRes.outcome.decision === 'BLOCK', 'Policy outcome is BLOCK');

  // Latency Benchmark
  console.log('\n--- TEST 8: INFERENCE LATENCY BENCHMARK ---');
  const latencies: number[] = [];
  for (let i = 0; i < 10; i++) {
    const t0 = Date.now();
    await privateAI.classify('Hello companions, have a blessed day.', dummyContext);
    latencies.push(Date.now() - t0);
  }
  const avg = latencies.reduce((a, b) => a + b, 0) / latencies.length;
  latencies.sort((a, b) => a - b);
  const p95 = latencies[Math.floor(latencies.length * 0.95)];
  console.log(`  Measured Average Latency: ${avg.toFixed(1)} ms`);
  console.log(`  Measured P95 Latency: ${p95} ms`);
  assert(avg < 150, `Average latency is below 150ms (${avg.toFixed(1)}ms)`);

  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passedTests}/${totalTests} TESTS PASSED (${((passedTests/totalTests)*100).toFixed(0)}%)`);
  console.log('====================================================');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runTestSuite().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
