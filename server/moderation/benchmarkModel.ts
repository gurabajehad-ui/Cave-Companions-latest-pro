import { pipeline, env } from '@xenova/transformers';

// Configure cache directory
env.cacheDir = './.model_cache';

async function runBenchmark() {
  console.log('=== STARTING BENCHMARK ===');
  const memBefore = process.memoryUsage().rss / (1024 * 1024);
  console.log(`Initial RSS Memory: ${memBefore.toFixed(2)} MB`);

  const t0 = Date.now();
  console.log('Loading pipeline: text-classification with Xenova/toxic-bert (quantized)...');
  const classifier = await pipeline('text-classification', 'Xenova/toxic-bert', {
    quantized: true
  });
  const loadTime = Date.now() - t0;
  const memAfter = process.memoryUsage().rss / (1024 * 1024);
  console.log(`Model Loaded in: ${loadTime} ms`);
  console.log(`Memory after model load: ${memAfter.toFixed(2)} MB (Delta: ${(memAfter - memBefore).toFixed(2)} MB)`);

  const testCases = [
    // Safe English
    { text: 'Assalamu Alaikum brother, hope you are having a blessed day.', lang: 'en', type: 'safe', label: 'SAFE' },
    { text: 'Let us meet at the mosque for Asr prayer in congregation.', lang: 'en', type: 'safe', label: 'SAFE' },
    // Safe Bengali
    { text: 'আসসালামু আলাইকুম ওয়া রহমাতুল্লাহ। আজকের আসরের সালাতের জামাআত কখন শুরু হবে?', lang: 'bn', type: 'safe', label: 'SAFE' },
    { text: 'সুবহানাল্লাহ, আজকের খুতবাটি অনেক অনুপ্রেরণামূলক ছিল।', lang: 'bn', type: 'safe', label: 'SAFE' },
    // Safe Arabic
    { text: 'جَزَاكَ ٱللَّٰهُ خَيْرًا يا أخي العزيز، تقبل الله منا ومنكم صالح الأعمال.', lang: 'ar', type: 'safe', label: 'SAFE' },
    // Islamic Educational / Sensitive terms
    { text: 'পবিত্রতা ও গোসলের (Ghusl) ফরজ নিয়মগুলো নিয়ে সহীহ হাদিসের আলোচনা প্রয়োজন।', lang: 'bn', type: 'fiqh', label: 'SAFE' },
    { text: 'What are the essential conditions for Nikah and Mahr according to Islamic fiqh?', lang: 'en', type: 'fiqh', label: 'SAFE' },
    { text: 'তাহারা (Taharah) এবং হায়েজ (Haidh) সংক্রান্ত মাসআলা সঠিকভাবে জানা আবশ্যক।', lang: 'bn', type: 'fiqh', label: 'SAFE' },
    // Violations - English
    { text: 'You are an absolute idiot and I hate you, you pathetic loser.', lang: 'en', type: 'violation', label: 'HARASSMENT' },
    { text: 'I am going to hunt you down and kill you and your family.', lang: 'en', type: 'violation', label: 'HATE_ABUSE' },
    { text: 'Click here to see hot naked girls and free adult videos now!', lang: 'en', type: 'violation', label: 'EXPLICIT_SEXUAL' },
    // Violations - Bengali
    { text: 'তুই একটা শুয়োরের বাচ্চা, তোকে মেরে ফেলব কুত্তা।', lang: 'bn', type: 'violation', label: 'HARASSMENT' },
    { text: 'তোর মতো নোংরা মানুষের এখানে কোনো জায়গা নেই, তোকে শেষ করে দেব।', lang: 'bn', type: 'violation', label: 'HATE_ABUSE' },
    // Mixed Bengali-English
    { text: 'Bro don\'t be so dumb, shut up or I will beat you up তুই বোকা', lang: 'mixed', type: 'violation', label: 'HARASSMENT' },
    // Transliterated Bengali
    { text: 'tui ekta baje manush toke mere phelbo kuttar baccha', lang: 'translit', type: 'violation', label: 'HARASSMENT' }
  ];

  console.log('\n--- EVALUATING TEST SAMPLES ---');
  const latencies: number[] = [];
  const results = [];

  for (const tc of testCases) {
    const start = Date.now();
    const out = await classifier(tc.text, { topk: null });
    const dur = Date.now() - start;
    latencies.push(dur);

    // out is array of { label: string, score: number }
    const topScores: Record<string, number> = {};
    if (Array.isArray(out)) {
      for (const item of (out as any[])) {
        topScores[item.label] = Number(item.score.toFixed(4));
      }
    }

    results.push({
      text: tc.text.slice(0, 50) + '...',
      lang: tc.lang,
      expected: tc.label,
      type: tc.type,
      durMs: dur,
      scores: topScores
    });
  }

  latencies.sort((a, b) => a - b);
  const avgLat = latencies.reduce((a, b) => a + b, 0) / latencies.length;
  const p95Lat = latencies[Math.floor(latencies.length * 0.95)];

  console.log(JSON.stringify({
    summary: {
      loadTimeMs: loadTime,
      memAfterMb: memAfter,
      avgLatencyMs: avgLat,
      p95LatencyMs: p95Lat,
      totalSamples: testCases.length
    },
    results
  }, null, 2));
}

runBenchmark().catch(console.error);
