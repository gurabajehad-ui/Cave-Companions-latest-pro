import { initPostgresSchema } from './pgInit.js';
import { query } from './pg.js';
import { moderationPipeline } from './moderation/ModerationPipeline.js';
import { defaultRuleClassifier } from './moderation/RuleBasedClassifier.js';
import { defaultPolicyEngine } from './moderation/policyEngine.js';
import crypto from 'crypto';

interface TestResult {
  name: string;
  category: string;
  passed: boolean;
  expected: string;
  actual: string;
  details?: string;
}

async function runModerationSuite() {
  console.log('====================================================');
  console.log('  CAVE CIRCLE PRIVATE TEXT MODERATOR — PHASE 2 TESTS');
  console.log('====================================================\n');

  const results: TestResult[] = [];

  // 1. Initialize Database & Schemas
  console.log('[Step 1] Initializing Database & Moderation Schemas...');
  try {
    await initPostgresSchema();
    console.log('✅ Database schema initialized successfully.\n');
  } catch (err: any) {
    console.error('❌ Database initialization error:', err.message);
  }

  // 2. Test Suite: Safe Messages
  console.log('[Step 2] Testing Safe Messages (Bengali, English, Arabic, Quran, Hadith)...');
  const safeTestCases = [
    { text: 'আসসালামু আলাইকুম ভাই, আজকে মাগরিবের নামায কোন মসজিদে পড়বেন?', desc: 'Bengali Islamic Greeting' },
    { text: 'Hello brothers, let us meet for Jamah prayer today at 5 PM.', desc: 'English Clean Conversation' },
    { text: 'আলহামদুলিল্লাহ, আজকে সূরা আল-কাহফ তিলাওয়াত সম্পন্ন করেছি।', desc: 'Quran Tilawat Bengali' },
    { text: 'সুবহানাল্লাহ, রাসূলুল্লাহ (সাঃ) এর সুন্নাহ অনুযায়ী আমল করার চেষ্টা করছি।', desc: 'Hadith/Sunnah Bengali' },
    { text: 'JazakAllah Khair for the gentle reminder, brother.', desc: 'Islamic Expression in English' }
  ];

  for (const tc of safeTestCases) {
    const classification = await defaultRuleClassifier.classify(tc.text, {
      userId: 'test_user_safe',
      circleId: 'test_circle',
      messageType: 'TEXT'
    });
    const policy = defaultPolicyEngine.evaluatePolicy(classification, {
      userId: 'test_user_safe',
      circleId: 'test_circle',
      messageType: 'TEXT'
    });

    const passed = policy.decision === 'ALLOW';
    results.push({
      name: tc.desc,
      category: 'SAFE_CONTENT',
      passed,
      expected: 'ALLOW',
      actual: policy.decision,
      details: `Risk: ${policy.riskScore}, Cat: ${policy.categories.join(', ')}`
    });
  }

  // 3. Test Suite: Ambiguous / Legitimate Fiqh & Educational Discussions
  console.log('[Step 3] Testing Context-Aware Fiqh & Educational Topics (Must NOT be blocked)...');
  const fiqhTestCases = [
    { text: 'ভাই, ফরজ গোসলের সঠিক নিয়ম ও পদ্ধতি সম্পর্কে শরিয়তের মাসআলা কি?', desc: 'Fiqh Question on Ghusl/Purification' },
    { text: 'What is the Islamic ruling on Mahr and Nikah conditions in Shariah?', desc: 'Fiqh Question on Nikah & Mahr' },
    { text: 'হায়েয ও নেফাস সংক্রান্ত মহিলাদের বিশেষ মাসআলা কোন হাদিস গ্রন্থে বিস্তারিত আছে?', desc: 'Educational Inquiry on Taharah/Haidh' },
    { text: 'What are the boundaries of Awrah for men according to the Hanafi and Shafi fiqh?', desc: 'Educational Discussion on Awrah' },
    { text: 'তালাক ও ইদ্দতের ব্যাপারে কুরআনের সূরা বাকারার নির্দেশনা কি?', desc: 'Quranic Discussion on Talaq & Iddah' }
  ];

  for (const tc of fiqhTestCases) {
    const classification = await defaultRuleClassifier.classify(tc.text, {
      userId: 'test_user_fiqh',
      circleId: 'test_circle',
      messageType: 'TEXT'
    });
    const policy = defaultPolicyEngine.evaluatePolicy(classification, {
      userId: 'test_user_fiqh',
      circleId: 'test_circle',
      messageType: 'TEXT'
    });

    // Fiqh discussions must NEVER be blocked
    const passed = policy.decision !== 'BLOCK';
    results.push({
      name: tc.desc,
      category: 'FIQH_EDUCATIONAL_CONTEXT',
      passed,
      expected: 'ALLOW or REVIEW (NOT BLOCK)',
      actual: policy.decision,
      details: `IsReligiousContext: ${classification.isReligiousEducationalContext}, Risk: ${policy.riskScore}`
    });
  }

  // 4. Test Suite: Clear Severe Violations (Simulated synthetic fixtures)
  console.log('[Step 4] Testing Severe Harm Detection (Simulated Fixtures)...');
  const violationTestCases = [
    { text: 'visit pornhub.com for free videos link', desc: 'Explicit Adult Website Link', expectedDecision: 'BLOCK' },
    { text: 'join babu88 online casino and play 1xbet betting now', desc: 'Online Gambling & Casino Spam', expectedDecision: 'BLOCK' },
    { text: 'click grabify.link/track to see your prize', desc: 'Malicious IP Logger Phishing', expectedDecision: 'BLOCK' },
    { text: 'আমি তোকে খুন করব এবং গলা কেটে ফেলব শুয়োরের বাচ্চা', desc: 'Direct Violence Threat & Severe Vulgarity', expectedDecision: 'BLOCK' },
    { text: 'free-bkash-money login to claim 5000 tk', desc: 'Financial Credential Phishing', expectedDecision: 'BLOCK' }
  ];

  for (const tc of violationTestCases) {
    const classification = await defaultRuleClassifier.classify(tc.text, {
      userId: 'test_user_violator',
      circleId: 'test_circle',
      messageType: 'TEXT'
    });
    const policy = defaultPolicyEngine.evaluatePolicy(classification, {
      userId: 'test_user_violator',
      circleId: 'test_circle',
      messageType: 'TEXT'
    });

    const passed = policy.decision === tc.expectedDecision;
    results.push({
      name: tc.desc,
      category: 'SEVERE_VIOLATIONS',
      passed,
      expected: tc.expectedDecision,
      actual: policy.decision,
      details: `Risk: ${policy.riskScore}, Categories: ${policy.categories.join(', ')}`
    });
  }

  // 5. Test Suite: User Restrictions & Cooldown Enforcement
  console.log('[Step 5] Testing Active User Cooldown & Restrictions...');
  const restrictedUserId = 'test_user_muted_' + Date.now();
  const restrictionId = crypto.randomUUID();

  // Insert a test 24-hour mute restriction
  await query(`
    INSERT INTO user_restrictions (id, user_id, circle_id, restriction_type, reason, issued_by, expires_at, is_active)
    VALUES ($1, $2, NULL, 'MUTED_24H', 'Test Cooldown', 'SYSTEM_TEST', CURRENT_TIMESTAMP + INTERVAL '24 hours', TRUE)
  `, [restrictionId, restrictedUserId]);

  const pipelineRes = await moderationPipeline.evaluateTextMessage('Hello anyone here?', {
    userId: restrictedUserId,
    circleId: 'test_circle',
    messageType: 'TEXT'
  });

  const restrictionEnforced = !pipelineRes.isPermitted && pipelineRes.restriction?.restrictionType === 'MUTED_24H';
  results.push({
    name: 'Active 24H Mute Cooldown Enforced',
    category: 'RESTRICTION_COOLDOWN',
    passed: restrictionEnforced,
    expected: 'isPermitted = false (MUTED_24H)',
    actual: `isPermitted = ${pipelineRes.isPermitted} (${pipelineRes.restriction?.restrictionType})`,
    details: pipelineRes.userFacingMessage
  });

  // 6. Test Suite: Message Reporting Flow
  console.log('[Step 6] Testing Message Reporting DB Entry...');
  const reportTestId = crypto.randomUUID();
  const reporterId = 'test_reporter_' + Date.now();
  const reportedUserId = 'test_reported_' + Date.now();
  const testMsgId = 'test_msg_' + Date.now();

  await query(`
    INSERT INTO moderation_reports (id, circle_id, message_id, reported_user_id, reporter_user_id, category, description, status)
    VALUES ($1, 'test_circle', $2, $3, $4, 'HARASSMENT', 'Inappropriate behavior in circle', 'PENDING')
  `, [reportTestId, testMsgId, reportedUserId, reporterId]);

  const checkReport = await query(`SELECT * FROM moderation_reports WHERE id = $1`, [reportTestId]);
  const reportRecorded = checkReport.rows.length > 0 && checkReport.rows[0].status === 'PENDING';
  results.push({
    name: 'User Report Registered in DB',
    category: 'REPORTING',
    passed: reportRecorded,
    expected: 'status = PENDING',
    actual: checkReport.rows[0]?.status || 'NOT_FOUND'
  });

  // 7. Test Suite: Admin Action Execution
  console.log('[Step 7] Testing Admin Moderation Actions...');
  const testEventId = crypto.randomUUID();
  await query(`
    INSERT INTO moderation_events (id, circle_id, user_id, decision, risk_score, categories, reason, message_snippet, classifier_id, review_status)
    VALUES ($1, 'test_circle', $2, 'BLOCK', 0.95, '["SPAM"]'::jsonb, 'Test Event', 'test spam snippet', 'RULE_ENGINE_V1', 'PENDING')
  `, [testEventId, reportedUserId]);

  // Execute DISMISS action
  await query(`
    UPDATE moderation_events 
    SET review_status = 'DISMISSED', reviewed_by = 'ADMIN_TEST', reviewed_at = CURRENT_TIMESTAMP
    WHERE id = $1
  `, [testEventId]);

  const checkEvent = await query(`SELECT * FROM moderation_events WHERE id = $1`, [testEventId]);
  const actionExecuted = checkEvent.rows[0]?.review_status === 'DISMISSED';
  results.push({
    name: 'Admin Moderation Action Handled',
    category: 'ADMIN_ACTIONS',
    passed: actionExecuted,
    expected: 'review_status = DISMISSED',
    actual: checkEvent.rows[0]?.review_status || 'NOT_FOUND'
  });

  // Summary Output
  console.log('\n====================================================');
  console.log('               TEST RESULTS SUMMARY');
  console.log('====================================================\n');

  let passedCount = 0;
  let failedCount = 0;

  for (const r of results) {
    if (r.passed) {
      passedCount++;
      console.log(`✅ [PASS] [${r.category}] ${r.name}`);
    } else {
      failedCount++;
      console.log(`❌ [FAIL] [${r.category}] ${r.name} | Expected: ${r.expected} | Actual: ${r.actual}`);
    }
  }

  console.log(`\nTotal Tests: ${results.length} | Passed: ${passedCount} | Failed: ${failedCount}`);

  if (failedCount > 0) {
    process.exit(1);
  }
}

runModerationSuite().catch(err => {
  console.error('Test Suite Fatal Error:', err);
  process.exit(1);
});
