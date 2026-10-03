/**
 * Authoritative Intent Classification Router
 * Based on /docs/ai/CAVE_COMPANIONS_AI_INTENTS.md
 */

import { AI_INTENTS } from './aiIntentsFaqData';
import { IntentDefinition } from './aiKnowledgeData';

export interface IntentClassificationResult {
  intent: string;
  confidence: number;
  feature: string;
  entities: string[];
  needsClarification: boolean;
  clarificationQuestion?: string;
  relevantSections: string[];
  forbiddenSections: string[];
}

/**
 * Normalizes query string for multilingual matching
 */
export function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .replace(/[।.,?!;:'"(){}[\]<>_+\-=*&^%$#@~/\\|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Tokenizes text into distinct word tokens
 */
export function tokenize(query: string): string[] {
  return normalizeQuery(query)
    .split(' ')
    .filter(t => t.length > 1);
}

/**
 * Resolves pronoun or follow-up context from previous conversation turns
 */
export function resolveConversationContext(rawQuery: string, history: any[] = []): string {
  const norm = normalizeQuery(rawQuery);
  const isShortFollowUp = norm.split(' ').length <= 4 && (
    norm.includes('এটা') || norm.includes('এটার') || norm.includes('সেখানে') ||
    norm.includes('কীভাবে') || norm.includes('নিয়ম') || norm.includes('কোথায়') ||
    norm.includes('how') || norm.includes('rules') || norm.includes('where')
  );

  if (!isShortFollowUp || history.length === 0) {
    return rawQuery;
  }

  // Look back at latest messages
  for (let i = history.length - 1; i >= 0; i--) {
    const prev = history[i];
    if (prev.intent && prev.intent !== 'UNKNOWN' && prev.intent !== 'GENERAL_APP_QUESTION') {
      return `${rawQuery} (Context: ${prev.intent})`;
    }
  }

  return rawQuery;
}

/**
 * Classifies user query into one of 33 explicit intents with strict separation
 */
export function classifyIntent(rawQuery: string, history: any[] = []): IntentClassificationResult {
  const clean = normalizeQuery(rawQuery);
  if (!clean) {
    return createResult('UNKNOWN', 0, 'UNKNOWN', [], false);
  }

  // 1. Direct Greetings & Assistant Identity
  const isDirectGreeting = [
    'সালাম', 'আসসালামু আলাইকুম', 'সালামু আলাইকুম', 'সলাম', 'হাই', 'হ্যালো',
    'salam', 'assalamu alaikum', 'hi', 'hello', 'hey', 'greetings', 'শুভ সকাল'
  ].some(g => clean === g || clean.startsWith(g));

  if (isDirectGreeting) {
    return createResult('GENERAL_APP_QUESTION', 1.0, 'GENERAL', ['greeting'], false);
  }

  if (
    clean.includes('তুমি কে') || clean.includes('তোমার পরিচয়') || clean.includes('আপনার পরিচয়') ||
    clean.includes('who are you') || clean.includes('about cave ai') || clean.includes('কেভ এআই কি') ||
    clean.includes('cave companions কি') || clean.includes('কেভ কম্প্যানিয়ন্স কি') || clean.includes('উদ্দেশ্য') ||
    clean.includes('লক্ষ্য') || clean.includes('what is cave companions')
  ) {
    return createResult('GENERAL_APP_QUESTION', 0.98, 'GENERAL', ['identity_or_purpose'], false);
  }

  // 2. Ambiguity Detector for critical confused intent pairs
  if (clean === 'মসজিদ' || clean === 'mosque' || clean === 'মসজিদ নিয়ে') {
    return {
      intent: 'FIND_MOSQUE',
      confidence: 0.5,
      feature: 'MOSQUE_DIRECTORY',
      entities: ['mosque'],
      needsClarification: true,
      clarificationQuestion: 'আপনি কি আশেপাশের মসজিদ খুঁজতে চান, নাকি নতুন মসজিদ যুক্ত করার আবেদন করতে চান?',
      relevantSections: ['mosque_find'],
      forbiddenSections: ['mosque_add']
    };
  }

  if (clean === 'টোকেন' || clean === 'token' || clean === 'টোকেন নিয়ে') {
    return {
      intent: 'TOKEN_EARNING',
      confidence: 0.5,
      feature: 'TOKENS',
      entities: ['token'],
      needsClarification: true,
      clarificationQuestion: 'আপনি কি টোকেন অর্জনের নিয়ম জানতে চান, শপে খরচ করতে চান, নাকি মসজিদে দান করতে চান?',
      relevantSections: ['token_earning'],
      forbiddenSections: ['token_donation']
    };
  }

  // 3. Explicit Rule-Based Intent Classifiers (Strict Separation)

  // 3.1 PASSWORD RECOVERY
  if (
    clean.includes('password ভুলে') || clean.includes('পাসওয়ার্ড ভুলে') ||
    clean.includes('forgot password') || clean.includes('reset password') ||
    clean.includes('পাসওয়ার্ড রিসেট') || clean.includes('পাসওয়ার্ড ভুলে')
  ) {
    return createResult('PASSWORD', 0.99, 'AUTH', ['password'], false);
  }

  // 3.2 MERCHANT REGISTRATION / PORTAL
  if (
    clean.includes('merchant') || clean.includes('মার্চেন্ট') || clean.includes('দোকানদার')
  ) {
    if (!clean.includes('রাইডার') && !clean.includes('rider')) {
      return createResult('MERCHANT', 0.98, 'MERCHANT_PORTAL', ['merchant'], false);
    }
  }

  // 3.3 RIDER REGISTRATION / PORTAL
  if (
    clean.includes('rider') || clean.includes('রাইডার') || clean.includes('ডেলিভারি বয়')
  ) {
    if (!clean.includes('মার্চেন্ট') && !clean.includes('merchant')) {
      return createResult('RIDER', 0.98, 'RIDER_PORTAL', ['rider'], false);
    }
  }

  // 3.4 ADD MOSQUE vs FIND MOSQUE vs MOSQUE LOCATION
  const isMosqueRelated = clean.includes('মসজিদ') || clean.includes('mosque') || clean.includes('masjid');
  if (isMosqueRelated) {
    // Check Mosque Geofence Radius
    if (clean.includes('রেডিয়াস') || clean.includes('জিওফেন্স') || clean.includes('radius') || clean.includes('geofence')) {
      return createResult('MOSQUE_LOCATION', 0.98, 'MOSQUE_DIRECTORY', ['geofence'], false);
    }
    // Check Imam Contact details
    if (clean.includes('ইমাম') || clean.includes('ইমামের') || clean.includes('ফোন নম্বর') || clean.includes('ঠিকানা')) {
      return createResult('MOSQUE_DETAILS', 0.95, 'MOSQUE_DIRECTORY', ['mosque_details'], false);
    }
    // Check Add Mosque
    if (
      clean.includes('নতুন') || clean.includes('যুক্ত') || clean.includes('অ্যাড') ||
      clean.includes('add') || clean.includes('submit') || clean.includes('notun') ||
      clean.includes('আবেদন') || clean.includes('দিতে চাই') || clean.includes('তালিকায় নাই')
    ) {
      return createResult('ADD_MOSQUE', 0.99, 'MOSQUE_DIRECTORY', ['add_mosque'], false);
    }
    // Check Mosque Sadakah / Donation
    if (clean.includes('দান') || clean.includes('সাদাকাহ') || clean.includes('donate')) {
      return createResult('TOKEN_DONATION', 0.98, 'TOKENS', ['donation'], false);
    }
    // Default to Find Mosque
    if (
      clean.includes('আশেপাশের') || clean.includes('কাছের') || clean.includes('নিকটস্থ') ||
      clean.includes('nearest') || clean.includes('nearby') || clean.includes('খুঁজব') ||
      clean.includes('খুঁজবো') || clean.includes('কোথায়') || clean.includes('kothay') ||
      clean.includes('খুঁজে') || clean.includes('তালিকা')
    ) {
      return createResult('FIND_MOSQUE', 0.99, 'MOSQUE_DIRECTORY', ['find_mosque'], false);
    }
    return createResult('FIND_MOSQUE', 0.90, 'MOSQUE_DIRECTORY', ['find_mosque'], false);
  }

  // 3.5 TOKEN DONATION vs TOKEN REDEMPTION vs TOKEN EARNING vs TOKEN BALANCE
  const isTokenRelated = clean.includes('টোকেন') || clean.includes('token') || clean.includes('কয়েন') || clean.includes('coin');
  if (isTokenRelated) {
    // Donation check
    if (clean.includes('দান') || clean.includes('সাদাকাহ') || clean.includes('মসজিদে দান') || clean.includes('donate')) {
      return createResult('TOKEN_DONATION', 0.99, 'TOKENS', ['donation'], false);
    }
    // Redemption / Spending check
    if (
      clean.includes('খরচ') || clean.includes('ডিসকাউন্ট') || clean.includes('ছাড়') ||
      clean.includes('শপে') || clean.includes('দোকানে') || clean.includes('spend') ||
      clean.includes('redeem') || clean.includes('মার্কেটে খরচ') || clean.includes('কেনাকাটায়')
    ) {
      return createResult('TOKEN_REDEMPTION', 0.98, 'TOKENS', ['redemption'], false);
    }
    // Earning / Tier check
    if (
      clean.includes('gold') || clean.includes('silver') || clean.includes('bronze') ||
      clean.includes('গোল্ড') || clean.includes('সিলভার') || clean.includes('ব্রোঞ্জ') ||
      clean.includes('অর্জন') || clean.includes('কীভাবে পাব') || clean.includes('কয়টি') ||
      clean.includes('earn') || clean.includes('নিয়ম') || clean.includes('rules') || clean.includes('গ্রেস')
    ) {
      return createResult('TOKEN_EARNING', 0.99, 'TOKENS', ['earning'], false);
    }
    // Balance check
    if (clean.includes('ব্যালেন্স') || clean.includes('balance') || clean.includes('ওয়ালেট') || clean.includes('হিস্ট্রি')) {
      return createResult('TOKEN_BALANCE', 0.95, 'TOKENS', ['balance'], false);
    }
    return createResult('TOKEN_EARNING', 0.90, 'TOKENS', ['earning'], false);
  }

  // 3.6 PRAYER TIME vs SALAT VERIFICATION vs SALAT HISTORY (Cave Journey)
  if (
    clean.includes('ওয়াক্ত') || clean.includes('নামাজের সময়') || clean.includes('কখন') ||
    clean.includes('সেহরি') || clean.includes('ইফতার') || clean.includes('prayer time') ||
    clean.includes('sehri') || clean.includes('iftar') || clean.includes('আজান')
  ) {
    return createResult('PRAYER_TIME', 0.98, 'SALAT', ['prayer_times'], false);
  }

  if (
    clean.includes('কেভ জার্নি') || clean.includes('cave journey') || clean.includes('জার্নি') ||
    clean.includes('আমল ট্র্যাকার') || clean.includes('স্ট্রিক') || clean.includes('ম্যানুয়ালি') ||
    clean.includes('তাহাজ্জুদ') || clean.includes('নফল') || clean.includes('রোজা লগ')
  ) {
    return createResult('SALAT_HISTORY', 0.98, 'SALAT', ['salah_journey'], false);
  }

  if (
    clean.includes('সালাত ভেরিফাই') || clean.includes('জামাত ভেরিফিকেশন') ||
    clean.includes('salat verification') || clean.includes('জিপিএস চেক')
  ) {
    return createResult('SALAT_VERIFICATION', 0.98, 'SALAT', ['salah_verification'], false);
  }

  // 3.7 QURAN vs TAFSIR
  if (clean.includes('তাফসির') || clean.includes('তাফসীর') || clean.includes('ব্যাখ্যা') || clean.includes('tafsir')) {
    return createResult('TAFSIR', 0.96, 'ISLAMIC_TOOLS', ['tafsir'], false);
  }

  if (
    clean.includes('quran') || clean.includes('কুরআন') || clean.includes('কোরআন') ||
    clean.includes('সূরা') || clean.includes('আয়াত') || clean.includes('তিলাওয়াত') ||
    clean.includes('খতম') || clean.includes('তাজবীদ') || clean.includes('surah')
  ) {
    return createResult('QURAN', 0.98, 'ISLAMIC_TOOLS', ['quran'], false);
  }

  // 3.8 HISNUL MUSLIM
  if (
    clean.includes('হিসনুল মুসলিম') || clean.includes('দুআ') || clean.includes('দোয়া') ||
    clean.includes('দোআ') || clean.includes('জিকির') || clean.includes('সকাল সন্ধ্যা') ||
    clean.includes('hisnul muslim') || clean.includes('dua') || clean.includes('adhkar')
  ) {
    return createResult('HISNUL_MUSLIM', 0.98, 'ISLAMIC_TOOLS', ['hisnul_muslim'], false);
  }

  // 3.9 DIGITAL TASBIH
  if (
    clean.includes('তাসবীহ') || clean.includes('তসবিহ') || clean.includes('তাসবিহ') ||
    clean.includes('কাউন্টার') || clean.includes('ভাইব্রেশন') || clean.includes('tasbih')
  ) {
    return createResult('TASBIH', 0.98, 'ISLAMIC_TOOLS', ['tasbih'], false);
  }

  // 3.10 QIBLA COMPASS
  if (
    clean.includes('কিবলা') || clean.includes('qibla') || clean.includes('কাবার দিক') ||
    clean.includes('দিকনির্ণয়') || clean.includes('কম্পাস')
  ) {
    return createResult('QIBLA', 0.98, 'ISLAMIC_TOOLS', ['qibla'], false);
  }

  // 3.11 PARTNER SHOPS vs CAVE MARKET vs ORDERS vs DELIVERY
  if (clean.includes('ট্র্যাক') || clean.includes('রাইডার কত দূরে') || clean.includes('eta') || clean.includes('লাইভ ম্যাপ')) {
    return createResult('DELIVERY', 0.98, 'COMMERCE', ['delivery_tracking'], false);
  }

  if (clean.includes('অর্ডার') || clean.includes('কার্ট') || clean.includes('পণ্য কিনব') || clean.includes('buy now')) {
    return createResult('ORDER', 0.98, 'COMMERCE', ['order'], false);
  }

  if (
    clean.includes('কেভ মার্কেট') || clean.includes('লোকাল মার্কেট') || clean.includes('ন্যাশনাল মার্কেট') ||
    clean.includes('cave market') || clean.includes('মার্কেটপ্লেস')
  ) {
    return createResult('CAVE_MARKET', 0.98, 'COMMERCE', ['cave_market'], false);
  }

  if (
    clean.includes('পার্টনার শপ') || clean.includes('পার্টনার দোকান') || clean.includes('partner shop') ||
    clean.includes('শপ তালিকা')
  ) {
    return createResult('PARTNER_SHOP', 0.98, 'COMMERCE', ['partner_shops'], false);
  }

  // 3.12 CAVE CIRCLES
  if (clean.includes('সার্কেল') || clean.includes('circle') || clean.includes('আমীর') || clean.includes('হালাকা')) {
    return createResult('APP_NAVIGATION', 0.95, 'COMMUNITY', ['cave_circles'], false);
  }

  // 3.13 CAVE MEDIA
  if (clean.includes('কেভ মিডিয়া') || clean.includes('ইসলামিক লেকচার') || clean.includes('cave media') || clean.includes('লেকচার')) {
    return createResult('CAVE_MEDIA', 0.98, 'MEDIA', ['cave_media'], false);
  }

  // 3.14 PROFILE & LANGUAGE
  if (clean.includes('ভাষা পরিবর্তন') || clean.includes('বাংলা থেকে ইংরেজি') || clean.includes('switch language') || clean.includes('প্রোফাইল')) {
    return createResult('PROFILE', 0.96, 'PROFILE', ['profile'], false);
  }

  // 3.15 GENERAL APP NAVIGATION
  if (clean.includes('all features') || clean.includes('মেনু') || clean.includes('ফিচার কোথায়')) {
    return createResult('APP_NAVIGATION', 0.95, 'NAVIGATION', ['navigation'], false);
  }

  // 4. Fallback Keyword Scoring across All 33 Intents
  let bestIntent = 'UNKNOWN';
  let bestScore = 0;

  for (const [intentKey, def] of Object.entries(AI_INTENTS)) {
    let score = 0;
    const tokens = tokenize(clean);

    for (const kw of def.keywords) {
      if (clean.includes(kw.toLowerCase())) {
        score += 30;
      }
    }

    if (def.negativeKeywords) {
      for (const neg of def.negativeKeywords) {
        if (clean.includes(neg.toLowerCase())) {
          score -= 40;
        }
      }
    }

    for (const eg of def.exampleQuestions) {
      if (clean === normalizeQuery(eg)) {
        score += 100;
      } else if (clean.includes(normalizeQuery(eg)) || normalizeQuery(eg).includes(clean)) {
        score += 50;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestIntent = intentKey;
    }
  }

  if (bestScore >= 20) {
    const matchedDef = AI_INTENTS[bestIntent];
    return createResult(bestIntent, Math.min(0.95, bestScore / 100), matchedDef.feature, [], false);
  }

  return createResult('UNKNOWN', 0.1, 'UNKNOWN', [], false);
}

function createResult(
  intent: string,
  confidence: number,
  feature: string,
  entities: string[],
  needsClarification: boolean
): IntentClassificationResult {
  const def = AI_INTENTS[intent] || AI_INTENTS['UNKNOWN'];
  return {
    intent,
    confidence,
    feature: def.feature || feature,
    entities,
    needsClarification,
    relevantSections: def.relevantSections || [],
    forbiddenSections: def.forbiddenSections || []
  };
}
