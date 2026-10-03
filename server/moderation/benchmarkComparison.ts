import { pipeline, env } from '@xenova/transformers';

env.cacheDir = './.model_cache';

async function runComparison() {
  console.log('=== STARTING SIDE-BY-SIDE MODEL BENCHMARK ===');

  const testCases = [
    // 1. Safe Bengali
    { id: 'BN_SAFE_1', text: 'আসসালামু আলাইকুম ভাই, কেমন আছেন সবাই?', lang: 'bn', expected: 'SAFE' },
    { id: 'BN_SAFE_2', text: 'আজকে আসরের সালাত মসজিদে একসাথে আদায় করব ইনশাআল্লাহ।', lang: 'bn', expected: 'SAFE' },
    { id: 'BN_SAFE_3', text: 'পবিত্রতা ও ফরজ গোসলের নিয়ম কানুন হাদিস অনুযায়ী আলোচনা করা হোক।', lang: 'bn', expected: 'SAFE (Fiqh)' },

    // 2. Toxic / Harassment Native Bengali
    { id: 'BN_TOXIC_1', text: 'তুই একটা খারাপ মানুষ তোকে মেরে ফেলব কুত্তা', lang: 'bn', expected: 'TOXIC' },
    { id: 'BN_TOXIC_2', text: 'তোর বাড়ি গিয়ে গলা কেটে রেখে আসব খানকির পোলা', lang: 'bn', expected: 'TOXIC' },
    { id: 'BN_TOXIC_3', text: 'মাদারচোদ তোরে আমি শেষ করে দেব', lang: 'bn', expected: 'TOXIC' },
    { id: 'BN_TOXIC_4', text: 'শুয়োরের বাচ্চা তোরে জ্যান্ত কবর দেব', lang: 'bn', expected: 'TOXIC' },

    // 3. Roman Bengali / Transliterated Bengali
    { id: 'ROMAN_BN_SAFE', text: 'kemon achen vai? ajke asor por dekha hobe inshallah', lang: 'roman_bn', expected: 'SAFE' },
    { id: 'ROMAN_BN_TOXIC_1', text: 'toke mere phelbo kuttar baccha baje manush', lang: 'roman_bn', expected: 'TOXIC' },
    { id: 'ROMAN_BN_TOXIC_2', text: 'madarchod tor gala kete felbo bari giye', lang: 'roman_bn', expected: 'TOXIC' },

    // 4. English Safe & Toxic
    { id: 'EN_SAFE', text: 'May Allah bless you all with peace and good health.', lang: 'en', expected: 'SAFE' },
    { id: 'EN_TOXIC_1', text: 'You are an absolute idiot and I will beat you to death.', lang: 'en', expected: 'TOXIC' },
    { id: 'EN_TOXIC_2', text: 'Die in hell you disgusting piece of trash.', lang: 'en', expected: 'TOXIC' },

    // 5. Arabic
    { id: 'AR_SAFE', text: 'جزاكم الله خيرا وبارك الله فيكم جميعا يا إخوة', lang: 'ar', expected: 'SAFE' },
    { id: 'AR_TOXIC', text: 'سأقتلك يا ملعون يا ابن الكلب', lang: 'ar', expected: 'TOXIC' }
  ];

  console.log('\n--- 1. Testing Xenova/toxic-bert ---');
  const toxicBert = await pipeline('text-classification', 'Xenova/toxic-bert', { quantized: true });
  const toxicBertResults: any[] = [];
  for (const tc of testCases) {
    const t0 = Date.now();
    const res = await toxicBert(tc.text, { topk: null });
    const dur = Date.now() - t0;
    const scores: Record<string, number> = {};
    if (Array.isArray(res)) {
      for (const item of (res as any[])) {
        scores[item.label] = Number(item.score.toFixed(4));
      }
    }
    const maxScore = Math.max(...Object.values(scores));
    toxicBertResults.push({ id: tc.id, expected: tc.expected, durMs: dur, maxScore, scores });
  }

  console.log('\n--- 2. Testing onnx-community/distilbert-multilingual-toxicity-classifier-ONNX ---');
  const distilMultilingual = await pipeline(
    'text-classification',
    'onnx-community/distilbert-multilingual-toxicity-classifier-ONNX',
    { quantized: true }
  );
  const multilingualResults: any[] = [];
  for (const tc of testCases) {
    const t0 = Date.now();
    const res = await distilMultilingual(tc.text, { topk: null });
    const dur = Date.now() - t0;
    const scores: Record<string, number> = {};
    if (Array.isArray(res)) {
      for (const item of (res as any[])) {
        scores[item.label] = Number(item.score.toFixed(4));
      }
    }
    const toxicScore = scores['toxic'] || 0;
    multilingualResults.push({ id: tc.id, expected: tc.expected, durMs: dur, toxicScore, scores });
  }

  console.log('\n=== COMPARISON SUMMARY ===');
  console.log(JSON.stringify({ toxicBertResults, multilingualResults }, null, 2));
}

runComparison().catch(console.error);
