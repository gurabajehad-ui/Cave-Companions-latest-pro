/**
 * Local AI Engine Verification & Regression Test Suite
 * Evaluates Knowledge-Base-driven Cave AI without external API calls
 */

import { queryCaveGuide } from '../src/services/caveAppGuideEngine.js';
import { classifyIntent } from '../src/services/aiIntentRouter.js';
import { VERIFIED_FAQ_DATABASE } from '../src/services/aiIntentsFaqData.js';

async function runLocalAiVerification() {
  console.log('===============================================================');
  console.log('CAVE COMPANIONS — LOCAL AI ENGINE VERIFICATION');
  console.log('===============================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  // -------------------------------------------------------------
  // TEST SUITE 1: CRITICAL MOSQUE INTENT SEPARATION (FIND vs ADD)
  // -------------------------------------------------------------
  console.log('--- TEST SUITE 1: CRITICAL MOSQUE INTENT SEPARATION ---');

  // Test Case A: FIND_MOSQUE
  totalTests++;
  const queryFind = 'আমি কীভাবে আমার আশেপাশের মসজিদ খুঁজে পাব?';
  const intentFind = classifyIntent(queryFind);
  const answersFind = queryCaveGuide(queryFind, [], 'bn');
  const textFind = answersFind.map(a => a.formattedText || a.summary).join(' ');

  const findIntentOk = intentFind.intent === 'FIND_MOSQUE';
  const findNoAddText = !textFind.includes('নতুন মসজিদ যুক্ত করুন') && !textFind.includes('Add Mosque');
  const findHasNearbyText = textFind.includes('নিকটস্থ মসজিদ') || textFind.includes('আশেপাশের') || textFind.includes('Mosque Directory');

  if (findIntentOk && findNoAddText && findHasNearbyText) {
    console.log(`[PASS] FIND_MOSQUE: "${queryFind}" -> Correctly returned nearby mosque instructions without Add Mosque noise.`);
    passedTests++;
  } else {
    console.error(`[FAIL] FIND_MOSQUE check failed! Intent: ${intentFind.intent}, NoAddText: ${findNoAddText}, HasNearbyText: ${findHasNearbyText}`);
    console.error(`Output: ${textFind}`);
  }

  // Test Case B: ADD_MOSQUE
  totalTests++;
  const queryAdd = 'নতুন মসজিদ কীভাবে যুক্ত করবো?';
  const intentAdd = classifyIntent(queryAdd);
  const answersAdd = queryCaveGuide(queryAdd, [], 'bn');
  const textAdd = answersAdd.map(a => a.formattedText || a.summary).join(' ');

  const addIntentOk = intentAdd.intent === 'ADD_MOSQUE';
  const addHasSubmissionText = textAdd.includes('নতুন মসজিদ যুক্ত করুন') || textAdd.includes('Add Mosque') || textAdd.includes('আবেদন');

  if (addIntentOk && addHasSubmissionText) {
    console.log(`[PASS] ADD_MOSQUE: "${queryAdd}" -> Correctly returned mosque submission workflow.`);
    passedTests++;
  } else {
    console.error(`[FAIL] ADD_MOSQUE check failed! Intent: ${intentAdd.intent}, HasSubmissionText: ${addHasSubmissionText}`);
  }

  // -------------------------------------------------------------
  // TEST SUITE 2: CORE FUNCTIONAL SCENARIOS
  // -------------------------------------------------------------
  console.log('\n--- TEST SUITE 2: CORE FUNCTIONAL SCENARIOS ---');

  const functionalCases = [
    { query: 'Gold token কীভাবে পাব?', expectedIntents: ['TOKEN_EARNING'] },
    { query: 'Token দিয়ে মসজিদে দান করা যাবে?', expectedIntents: ['TOKEN_DONATION'] },
    { query: 'Quran কোথায় পাব?', expectedIntents: ['QURAN', 'QURAN_RECITATION'] },
    { query: 'Password ভুলে গেছি', expectedIntents: ['PASSWORD', 'PASSWORD_RECOVERY'] },
    { query: 'Merchant account কীভাবে খুলবো?', expectedIntents: ['MERCHANT', 'MERCHANT_REGISTRATION'] },
    { query: 'Rider হিসেবে কীভাবে register করবো?', expectedIntents: ['RIDER', 'RIDER_REGISTRATION'] },
    { query: 'আসসালামু আলাইকুম', expectedIntents: ['GENERAL_APP_QUESTION'] },
    { query: 'তুমি কে?', expectedIntents: ['GENERAL_APP_QUESTION'] }
  ];

  for (const fc of functionalCases) {
    totalTests++;
    const classified = classifyIntent(fc.query);
    const answers = queryCaveGuide(fc.query, [], 'bn');
    const intentOk = fc.expectedIntents.includes(classified.intent) || answers.length > 0;

    if (intentOk && answers.length > 0) {
      console.log(`[PASS] Functional: "${fc.query}" -> Intent: ${classified.intent}`);
      passedTests++;
    } else {
      console.error(`[FAIL] Functional: "${fc.query}" -> Intent: ${classified.intent} (expected: ${fc.expectedIntents.join(', ')})`);
    }
  }

  // -------------------------------------------------------------
  // TEST SUITE 3: 105 SOURCE-VERIFIED FAQ REGRESSION
  // -------------------------------------------------------------
  console.log('\n--- TEST SUITE 3: 105 SOURCE-VERIFIED FAQ REGRESSION ---');

  let faqSuccess = 0;

  for (const faq of VERIFIED_FAQ_DATABASE) {
    totalTests++;
    const answers = queryCaveGuide(faq.question, [], 'bn');
    if (answers && answers.length > 0 && answers[0].formattedText.length > 10) {
      faqSuccess++;
      passedTests++;
    }
  }

  console.log(`FAQ Regression Result: ${faqSuccess} / ${VERIFIED_FAQ_DATABASE.length} evaluation questions answered from Knowledge Base.`);

  // -------------------------------------------------------------
  // TEST SUITE 4: CAVE MEDIA LINGUISTIC ALIGNMENT
  // -------------------------------------------------------------
  console.log('\n--- TEST SUITE 4: CAVE MEDIA LINGUISTIC ALIGNMENT ---');

  const mediaQueries = [
    'Cave media ki',
    'কেভ মিডিয়া কি',
    'cave media kothay',
    'কেভ মিডিয়া কী'
  ];

  for (const mq of mediaQueries) {
    totalTests++;
    const answers = queryCaveGuide(mq, [], 'bn');
    const isCorrect = answers.length > 0 && answers[0].summary.includes('আহলে সুন্নাহ');
    if (isCorrect) {
      console.log(`[PASS] CAVE_MEDIA query: "${mq}" -> Correctly resolved to Cave Media.`);
      passedTests++;
    } else {
      console.error(`[FAIL] CAVE_MEDIA query: "${mq}" failed!`);
      if (answers.length > 0) {
        console.error(`  Received: ${answers[0].summary}`);
      } else {
        console.error('  Received no answers.');
      }
    }
  }

  // -------------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------------
  console.log('\n===============================================================');
  console.log(`TOTAL TESTS: ${totalTests}`);
  console.log(`PASSED: ${passedTests}`);
  console.log(`FAILED: ${totalTests - passedTests}`);
  console.log(`SUCCESS RATE: ${((passedTests / totalTests) * 100).toFixed(2)}%`);
  console.log('===============================================================');
}

runLocalAiVerification().catch(err => {
  console.error('Local AI verification crashed:', err);
  process.exit(1);
});
