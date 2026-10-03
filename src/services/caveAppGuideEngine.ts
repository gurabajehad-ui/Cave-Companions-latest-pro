/**
 * Cave Companions Comprehensive Local AI Guide & Semantic Knowledge Engine
 * 
 * Provides privacy-preserving, local, intelligent Q&A and step-by-step guidance
 * for 100% of Cave Companions features in both Bengali and English.
 * 
 * Zero external AI API calls - runs entirely on-device / local server intelligence.
 */
import { classifyIntent } from './aiIntentRouter.js';
import { VERIFIED_FAQ_DATABASE } from './aiIntentsFaqData.js';
import { CAVE_AI_KNOWLEDGE_BOOK } from './aiKnowledgeBook.js';

export interface GuideTopic {
  id: string;
  category: 'prayer' | 'quran' | 'hisnul_muslim' | 'tasbih' | 'circle' | 'tokens' | 'habits' | 'profile';
  categoryTitleBn: string;
  categoryTitleEn: string;
  titleBn: string;
  titleEn: string;
  keywords: string[];
  summaryBn: string;
  summaryEn: string;
  stepsBn: string[];
  stepsEn: string[];
  proTipBn?: string;
  proTipEn?: string;
  actionTab?: 'home' | 'prayer_journey' | 'quran' | 'hisnul_muslim' | 'cave_circle' | 'tokens' | 'shops' | 'market' | 'profile' | 'support' | 'blog';
  actionLabelBn?: string;
  actionLabelEn?: string;
}

export interface GuideAnswer {
  topicId: string;
  title: string;
  category: string;
  summary: string;
  steps: string[];
  proTip?: string;
  actionTab?: 'home' | 'prayer_journey' | 'quran' | 'hisnul_muslim' | 'cave_circle' | 'tokens' | 'shops' | 'market' | 'profile' | 'support' | 'blog';
  actionLabel?: string;
  confidence: number;
  formattedText: string;
}

export const CAVE_GUIDE_TOPICS: GuideTopic[] = [
  // 0. GREETINGS, IDENTITY & CAVE COMPANIONS PURPOSE
  {
    id: 'greetings-salam-reply',
    category: 'profile',
    categoryTitleBn: 'অভিভাদন ও সালাম',
    categoryTitleEn: 'Greetings & Salam',
    titleBn: 'সালামের জবাব ও অভিবাদন (Salam Reply & Greetings)',
    titleEn: 'Greetings & Salam Response',
    keywords: [
      'সালাম', 'সালামের জবাব', 'আসসালামু আলাইকুম', 'ওয়ালাইকুম আসসালাম', 'হাই', 'হ্যালো', 'অভিবাদন', 'সুবহে বাকের', 'শুভ সকাল',
      'salam', 'assalamu alaikum', 'walaikum assalam', 'hi', 'hello', 'hey', 'greetings'
    ],
    summaryBn: 'ওয়ালাইকুম আসসালাম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহ! আলহামদুলিল্লাহ, স্বাগতম Cave Companions-এ। আমি Cave AI, আপনার ২৪/৭ ইসলামিক পার্সোনাল অ্যাসিস্ট্যান্ট ও অ্যাপ গাইড। আপনাকে কীভাবে সাহায্য করতে পারি?',
    summaryEn: 'Wa Alaikum Assalam Wa Rahmatullahi Wa Barakatuh! Alhamdulillah, welcome to Cave Companions. I am Cave AI, your 24/7 Islamic personal assistant & app guide. How can I assist you today?',
    stepsBn: [
      'ইসলামিক সালামের সঠিক উত্তর প্রদান: ওয়ালাইকুম আসসালাম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহ।',
      'অ্যাপের যেকোনো বিষয় যেমন কেভ জার্নি, সালাত, কুরআন, ডিজিটাল তাসবীহ, কেভ সার্কেল, ফেইথ টোকেন বা কেভ মার্কেট নিয়ে সরাসরি প্রশ্ন করুন।'
    ],
    stepsEn: [
      'Warm Islamic greeting response: Wa Alaikum Assalam Wa Rahmatullahi Wa Barakatuh.',
      'Feel free to ask anything about Cave Journey, Quran, Tasbih, Circles, Faith Tokens, or Cave Market.'
    ],
    actionTab: 'home',
    actionLabelBn: 'হোমে যান',
    actionLabelEn: 'Go to Home'
  },
  {
    id: 'cave-ai-identity',
    category: 'profile',
    categoryTitleBn: 'Cave AI পরিচয়',
    categoryTitleEn: 'Cave AI Identity',
    titleBn: 'Cave AI-এর পরিচয় ও সামর্থ্য (Cave AI Identity & Capabilities)',
    titleEn: 'Cave AI Identity & Capabilities',
    keywords: [
      'পরিচয়', 'কেভ এআই', 'তুমি কে', 'তোমার পরিচয়', 'আপনার পরিচয়', 'ক্ষমতা',
      'cave ai', 'who are you', 'identity', 'about ai', 'what can you do'
    ],
    summaryBn: 'আমি Cave AI—Cave Companions প্ল্যাটফর্মের নিজস্ব বুদ্ধিমত্তা সম্পন্ন এআই গাইড সহকারী। আমার কাজ হলো আপনাকে অ্যাপের সমস্ত ফিচার, নিয়মকানুন, সালাত ও আমল ট্র্যাকার, কেভ সার্কেল, ফেইথ টোকেন, পার্টনার শপ ও কেভ মার্কেট এবং ইসলামিক বিষয়ে সঠিক ও নির্ভরযোগ্য তথ্য প্রদান করা।',
    summaryEn: 'I am Cave AI, the dedicated AI Guide Assistant for Cave Companions. My mission is to provide you with instant, accurate guidance regarding app features, worship tracking, Cave Circles, Faith Tokens, Marketplace, and daily Islamic habits.',
    stepsBn: [
      'অ্যাপের সমস্ত ফিচার ও নিয়মকানুন সম্পর্কে নির্ভুল তথ্য প্রদান করা।',
      'বাংলা ও ইংরেজি উভয় ভাষায় ২৪/৭ অন-ডিভাইস ও সার্ভার বুদ্ধিমত্তায় সহায়তায় যুক্ত থাকা।',
      'আমল ট্র্যাকিং ও কেভ সার্কেল সম্পর্কিত যেকোনো প্রশ্নের সরাসরি উত্তর দেওয়া।'
    ],
    stepsEn: [
      'Provide accurate explanations of all app features and rules.',
      'Offer 24/7 bilingual support in Bengali and English.',
      'Guide users through Cave Journey, Circles, Faith Tokens, and Market orders.'
    ],
    actionTab: 'support',
    actionLabelBn: 'গাইডে প্রশ্ন করুন',
    actionLabelEn: 'Ask AI Guide'
  },
  {
    id: 'cave-companions-overview-purpose',
    category: 'profile',
    categoryTitleBn: 'Cave Companions পরিচয় ও উদ্দেশ্য',
    categoryTitleEn: 'Cave Companions Mission & Purpose',
    titleBn: 'Cave Companions কী এবং এর মূল উদ্দেশ্য কী? (What is Cave Companions & Purpose)',
    titleEn: 'What is Cave Companions and Its Core Purpose?',
    keywords: [
      'কেভ কম্প্যানিয়ন্স', 'উদ্দেশ্য', 'লক্ষ্য', 'ভোর', 'আমল',
      'cave companions', 'what is cave companions', 'purpose', 'objective', 'mission', 'about app', 'অ্যাপের কাজ'
    ],
    summaryBn: 'Cave Companions হলো একটি সমন্বিত ইসলামিক লাইফস্টাইল ও মিউচুয়াল একাউন্টেবিলিটি প্ল্যাটফর্ম। এর মূল উদ্দেশ্য হলো মুসলিমদের দৈনন্দিন সালাত ও সুন্নাহ অভ্যাসে ধারাবাহিকতা বজায় রাখা, কেভ সার্কেলের মাধ্যমে বন্ধুবান্ধব ও পরিবারের মাঝে নেক আমলে প্রতিযোগিতা তৈরি করা এবং ভালো কাজের বিনিময়ে ফেইথ টোকেন প্রদানের মাধ্যমে বাস্তব জীবনে উৎসাহিত করা।',
    summaryEn: 'Cave Companions is an Islamic lifestyle & mutual accountability platform. Its core purpose is to help Muslims build consistent daily prayer and Sunnah habits, foster brotherhood & accountability through Cave Circles, and reward righteous deeds with Faith Tokens redeemable in partner shops.',
    stepsBn: [
      '১. কেভ জার্নি: ৫ ওয়াক্ত সালাত, সিয়াম, কুরআন তিলাওয়াত ও জিকিরের পার্সোনাল স্ট্রিক ট্র্যাকার।',
      '২. কেভ সার্কেল: পরিবার ও বন্ধুদের সাথে সার্কেল খুলে আমলের ট্র্যাকিং ও আমীর নির্বাচন।',
      '৩. ফেইথ টোকেন ও শপ: আমলের বিনিময়ে টোকেন অর্জন এবং পার্টনার শপ ও কেভ মার্কেটে বিশেষ ডিসকাউন্ট।',
      '৪. ইসলামিক টুলস: আল-কুরআন, হিসনুল মুসলিম আজকার, ডিজিটাল তাসবীহ ও কিবলা কম্পাস।'
    ],
    stepsEn: [
      '1. Cave Journey: Personal streak tracker for 5 daily prayers, fasting, Quran, and Dhikr.',
      '2. Cave Circle: Form circles with friends & family for mutual spiritual accountability.',
      '3. Faith Tokens & Market: Earn tokens for good deeds and redeem discounts at partner shops.',
      '4. Islamic Tools: Al-Quran, Hisnul Muslim Adhkar, Digital Tasbih, and Qibla Compass.'
    ],
    actionTab: 'home',
    actionLabelBn: 'অ্যাপের মূল পাতায় যান',
    actionLabelEn: 'Explore App'
  },

  // 1. CAVE JOURNEY (PRAYER, FASTING, DEEDS)
  {
    id: 'cave-journey-self-logging',
    category: 'prayer',
    categoryTitleBn: 'কেভ জার্নি (Cave Journey)',
    categoryTitleEn: 'Cave Journey',
    titleBn: 'কেভ জার্নি (Cave Journey) কী এবং এতে সালাত ভেরিফিকেশনের প্রয়োজন আছে কি?',
    titleEn: 'What is Cave Journey and is GPS verification required?',
    keywords: [
      'কেভ জার্নি', 'জার্নি', 'সালাত ভেরিফিকেশন', 'ম্যানুয়াল', 'ব্যক্তিগত আমল', 'স্ট্রিক', 'ভেরিফিকেশন',
      'cave journey', 'journey', 'verification', 'self log', 'personal', 'streak'
    ],
    summaryBn: 'কেভ জার্নি হলো সম্পূর্ণ একটি ব্যক্তিগত আমল ও পার্সোনাল স্ট্রিক ট্র্যাকার (Self-recorded journal)। এখানে ব্যবহারকারী নিজে দায়িত্ব নিয়ে ম্যানুয়ালি ৫ ওয়াক্ত সালাত, সিয়াম, কুরআন তিলাওয়াত ও আজকার ট্র্যাক করেন। কেভ জার্নিতে কোনো জিপিএস সালাত ভেরিফিকেশনের প্রয়োজন নেই।',
    summaryEn: 'Cave Journey is a personal self-recorded worship tracker. Users manually check off 5 daily prayers, fasting, Quran reading, and dhikr for personal consistency streaks. No GPS verification is needed for Cave Journey.',
    stepsBn: [
      'ফিচার বা নিচের মেনু থেকে "কেভ জার্নি" (Cave Journey) খুলুন।',
      'আজকের দিনে আপনার আদায়কৃত সালাত, সিয়াম ও কুরআন তিলাওয়াতের ঘরে ম্যানুয়ালি ক্লিক করে আপডেট করুন।',
      'আপনার ধারাবাহিক আমলের ওপর ভিত্তি করে আত্মউন্নয়ন অ্যানালিটিক্স ও স্ট্রিক হিসাব দেখাবে।'
    ],
    stepsEn: [
      'Open "Cave Journey" from features or bottom menu.',
      'Manually mark completed prayers, fasting, and Quran minutes for today.',
      'Track your spiritual consistency and personal habit streaks over time.'
    ],
    actionTab: 'prayer_journey',
    actionLabelBn: 'কেভ জার্নিতে যান',
    actionLabelEn: 'Open Cave Journey'
  },
  {
    id: 'prayer-logging',
    category: 'prayer',
    categoryTitleBn: 'কেভ জার্নি',
    categoryTitleEn: 'Cave Journey',
    titleBn: '৫ ওয়াক্ত নামাজ কীভাবে লগ করবেন?',
    titleEn: 'How to log 5 daily prayers?',
    keywords: [
      'নামাজ', 'সালাত', 'ফজর', 'যোহর', 'আসর', 'মাগরিব', 'এশা', 'ওয়াক্ত', 'লগ', 'জামাত', 'একাকী', 'জার্নি',
      'prayer', 'salah', 'fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'log', 'jamaah', 'alone', 'journey'
    ],
    summaryBn: 'Cave Companions-এ ৫ ওয়াক্ত নামাজের সঠিক ট্র্যাকিং আপনার দৈনন্দিন আধ্যাত্মিক স্ট্রিক ও ফেইথ কয়েন অর্জনের ভিত্তি।',
    summaryEn: 'Tracking your 5 daily prayers in Cave Companions is the cornerstone of your daily spiritual streak and Faith Coins.',
    stepsBn: [
      'নিচের মেনু বা ফিচারস থেকে "কেভ জার্নি" (Cave Journey) ট্যাবে যান।',
      'চলতি ওয়াক্তের নামাজে (ফজর, যোহর, আসর, মাগরিব বা এশা) ক্লিক করুন।',
      'আপনি কীভাবে নামাজ আদায় করেছেন তা নির্বাচন করুন: "জামাআতে" (Jama\'ah) অথবা "একাকী" (Individual)।',
      'জামাতে আদায়ে অতিরিক্ত বোনাস ফেইথ কয়েন যোগ হবে এবং আপনার আজকের সালাত স্ট্রিক সক্রিয় থাকবে।'
    ],
    stepsEn: [
      'Navigate to the "Cave Journey" tab from the bottom navigation or features list.',
      'Tap on the current prayer (Fajr, Dhuhr, Asr, Maghrib, or Isha).',
      'Select how you prayed: "In Jama\'ah" or "Individually".',
      'Praying in Jama\'ah awards bonus Faith Coins and preserves your daily streak.'
    ],
    proTipBn: 'ওয়াক্ত শেষ হওয়ার পূর্বে নামাজ লগ করলে অতিরিক্ত পাংকচুয়ালিটি (Punctuality) বোনাস পাওয়া যায়!',
    proTipEn: 'Logging prayer before the time window ends grants extra punctuality bonus coins!',
    actionTab: 'prayer_journey',
    actionLabelBn: 'কেভ জার্নিতে যান',
    actionLabelEn: 'Open Cave Journey'
  },
  {
    id: 'mosque-geofence-admin-rules',
    category: 'prayer',
    categoryTitleBn: 'মসজিদ জিপিএস ও নিয়মাবলী',
    categoryTitleEn: 'Mosque GPS & Rules',
    titleBn: 'মসজিদ জিপিএস ভেরিফিকেশন, রেডিয়াস (Radius) ও কিউআর কোড নিয়মাবলী',
    titleEn: 'Mosque GPS Verification, Geofence Radius & QR Code Rules',
    keywords: [
      'মসজিদ', 'রেডিয়াস', 'জিওফেন্স', 'এডমিন', 'কিউআর', 'qr', 'স্ক্যান', 'ভেরিফিকেশন', 'জিপিএস',
      'mosque', 'radius', 'geofence', 'admin', 'qr code', 'scan', 'gps'
    ],
    summaryBn: 'মসজিদে উপস্থিত হয়ে জামাত ভেরিফিকেশনের জন্য জিপিএস ব্যবহার করা হয়। মসজিদের ভৌগোলিক ব্যাসার্ধ (Geofence Radius) শুধুমাত্র সুপার এডমিন পরিবর্তন/নির্ধারণ করতে পারেন। উল্লেখ্য, পূর্বে থাকা মসজিদের QR Code স্ক্যানিং ব্যবস্থাটি বর্তমানে বাতিল করা হয়েছে।',
    summaryEn: 'Jama\'ah verification is verified via GPS location. The Geofence Radius (e.g. 100m) can ONLY be configured by Super Admins. Note that the old Mosque QR code scan system is deprecated and disabled.',
    stepsBn: [
      'জামাতে সালাতের সময় অনুমোদিত মসজিদে উপস্থিত হয়ে সালাত ভেরিফাই করুন।',
      'মসজিদের রেডিয়াস বা পরিধি সাধারণ ব্যবহারকারী পরিবর্তন করতে পারেন না, এটি এডমিন পেনাল থেকে নির্ধারিত হয়।',
      'মসজিদের কিউআর কোড স্ক্যানিং ব্যবস্থা এখন আর নেই।'
    ],
    stepsEn: [
      'Be present at an approved mosque during Jama\'ah time for GPS verification.',
      'Geofence radius is exclusively defined by Admins in the admin panel.',
      'Mosque QR code scanning is no longer supported.'
    ],
    actionTab: 'home',
    actionLabelBn: 'হোম পেজে যান',
    actionLabelEn: 'Go to Home'
  },
  {
    id: 'mosque-directory-find',
    category: 'prayer',
    categoryTitleBn: 'মসজিদ ডিরেক্টরি',
    categoryTitleEn: 'Mosque Directory',
    titleBn: 'আশেপাশের অনুমোদিত মসজিদ কীভাবে খুঁজে পাবেন?',
    titleEn: 'How to find nearby approved mosques?',
    keywords: [
      'কাছের মসজিদ', 'আশেপাশের মসজিদ', 'নিকটস্থ মসজিদ', 'মসজিদ খুঁজব', 'মসজিদ খুঁজবো', 'মসজিদ কোথায়', 'কাছের মসজিদ কোথায়', 'আশেপাশের মসজিদ কোথায়', 'নিকটস্থ মসজিদ কোথায়', 'মসজিদের তালিকা',
      'find mosque', 'nearby mosque', 'nearest mosque', 'locate mosque', 'mosque list'
    ],
    summaryBn: 'আপনার আশেপাশের অনুমোদিত মসজিদ খুঁজে পেতে নিচের মেনু বা All Features থেকে "Mosque Directory / নিকটস্থ মসজিদ"-এ যান। এরপর "নিকটস্থ মসজিদ খুঁজুন" বাটনে চাপ দিলে আপনার বর্তমান জিপিএস লোকেশনের সাপেক্ষে কাছের মসজিদগুলোর তালিকা ও দূরত্ব দেখতে পাবেন।',
    summaryEn: 'To find nearby approved mosques, navigate to "Mosque Directory" from All Features or Home. Tap "Find Nearby Mosques" to view all approved mosques sorted by distance from your current GPS location.',
    stepsBn: [
      'নিচের মেনু বা All Features থেকে "Mosque Directory / নিকটস্থ মসজিদ"-এ যান।',
      '"নিকটস্থ মসজিদ খুঁজুন" বাটনে ট্যাপ করুন।',
      'আপনার বর্তমান জিপিএস লোকেশন অনুযায়ী নিকটবর্তী অনুমোদিত মসজিদসমূহের নাম ও দূরত্ব দেখতে পাবেন।'
    ],
    stepsEn: [
      'Go to "Mosque Directory" from bottom menu or All Features.',
      'Tap "Find Nearby Mosques".',
      'View the list of verified mosques sorted by real-time GPS distance from you.'
    ],
    actionTab: 'home',
    actionLabelBn: 'মসজিদ তালিকায় যান',
    actionLabelEn: 'Open Mosque Directory'
  },
  {
    id: 'mosque-submission-rules',
    category: 'prayer',
    categoryTitleBn: 'মসজিদ নির্দেশিকা',
    categoryTitleEn: 'Mosque Directory',
    titleBn: 'নতুন মসজিদ যুক্ত করার আবেদন কীভাবে করবেন?',
    titleEn: 'How to submit a request to add a new Mosque?',
    keywords: [
      'মসজিদ আবেদন', 'নতুন মসজিদ', 'যুক্ত করা', 'ইমাম', 'আবেদন', 'ম্যাপ পিকার',
      'add mosque', 'submit mosque', 'new mosque', 'imam', 'map picker'
    ],
    summaryBn: 'All Features ➔ Mosque Directory ➔ "Add Mosque / নতুন মসজিদ যুক্ত করুন" এ গিয়ে নাম, ঠিকানা, জিপিএস পিন, ইমাম সাহেবের নাম ও ছবি দিয়ে আবেদন করুন। এডমিন ভেরিফাই করে অনুমোদন দেবে।',
    summaryEn: 'Submit a new mosque via All Features ➔ Mosque Directory ➔ "Add Mosque". Enter mosque details, GPS pin, Imam name and phone, and upload photos for admin approval.',
    stepsBn: [
      'All Features থেকে "Mosque Directory" এ যান।',
      '"Add Mosque / নতুন মসজিদ যুক্ত করুন" বাটনে চাপুন।',
      'নাম, ঠিকানা, জিপিএস পিন (Map Picker দিয়ে), ইমামের নাম ও মোবাইল নম্বর এবং ছবি আপলোড করে সাবমিট করুন।'
    ],
    stepsEn: [
      'Go to "Mosque Directory" from All Features.',
      'Tap "Add Mosque".',
      'Fill in mosque name, address, GPS location pin, Imam contact, and upload photos.'
    ],
    actionTab: 'home',
    actionLabelBn: 'মসজিদ তালিকায় যান',
    actionLabelEn: 'Go to Mosque Directory'
  },
  {
    id: 'prayer-tahajjud-nafl',
    category: 'prayer',
    categoryTitleBn: 'কেভ জার্নি',
    categoryTitleEn: 'Cave Journey',
    titleBn: 'তাহাজ্জুদ ও নফল সালাত কীভাবে ট্র্যাক করবেন?',
    titleEn: 'How to track Tahajjud & voluntary prayers?',
    keywords: [
      'তাহাজ্জুদ', 'ইশরাক', 'চাশত', 'আউয়াবিন', 'নফল', 'বিতর',
      'tahajjud', 'ishraq', 'duha', 'nafl', 'night prayer', 'witr'
    ],
    summaryBn: 'ফরজের পাশাপাশি তাহাজ্জুদ ও চাশত/ইশরাকের মতো মর্যাদাপূর্ণ নফল নামাজগুলো ট্র্যাকিংয়ের মাধ্যমে অতিরিক্ত রুহানি অগ্রগতি অর্জন করুন।',
    summaryEn: 'Deepen your spirituality by tracking voluntary night and morning prayers alongside obligatory ones.',
    stepsBn: [
      '"কেভ জার্নি" স্ক্রিনে নিচে স্ক্রোল করে "নফল ও তাহাজ্জুদ" সেকশনে যান।',
      'রাতের শেষ প্রহরে তাহাজ্জুদ আদায়ের পর "তাহাজ্জুদ" চেকবক্সে টিক দিন।',
      'সূর্যোদয়ের ২০ মিনিট পর ইশরাক এবং দ্বিপ্রহরের পূর্বে চাশত সালাত রেকর্ড করতে পারবেন।'
    ],
    stepsEn: [
      'Scroll down in "Cave Journey" to the "Voluntary & Tahajjud" section.',
      'Mark the Tahajjud checkbox after offering your night prayer in the last third of the night.',
      'Record Ishraq 20 minutes after sunrise and Duha before midday.'
    ],
    actionTab: 'prayer_journey',
    actionLabelBn: 'নফল সালাত লগ করুন',
    actionLabelEn: 'Log Nafl Prayer'
  },

  // 2. QURAN JOURNEY
  {
    id: 'quran-reading',
    category: 'quran',
    categoryTitleBn: 'কুরআন তিলাওয়াত',
    categoryTitleEn: 'Quran Recitation',
    titleBn: 'কুরআন তিলাওয়াত, বাংলা অর্থ ও অডিও কীভাবে শুনবেন?',
    titleEn: 'How to read Quran with translation and audio?',
    keywords: [
      'কুরআন', 'তেলাওয়াত', 'তিলাওয়াত', 'অর্থ', 'অনুবাদ', 'সূরা', 'পারা', 'অডিও', 'শুনতে',
      'quran', 'tilawat', 'surah', 'juz', 'para', 'translation', 'audio', 'recitation'
    ],
    summaryBn: 'Cave Companions-এ ১১৪টি পূর্ণাঙ্গ সূরা, ৩০টি পারা, স্পষ্ট বাংলা উচ্চারণ ও অর্থ এবং বিশুদ্ধ অডিও তিলাওয়াত সংরক্ষিত রয়েছে।',
    summaryEn: 'Complete 114 Surahs, 30 Juz, authentic Bengali translations and crystal-clear audio recitations in one place.',
    stepsBn: [
      'হোম অথবা নেভিগেশন থেকে "কুরআন" (Quran) ট্যাবে ট্যাপ করুন।',
      'সূরার তালিকা বা পারার তালিকা থেকে আপনার কাঙ্ক্ষিত সূরা নির্বাচন করুন।',
      'প্রতিটি আয়াতের নিচে বাংলা অনুবাদ দেখতে পাবেন।',
      'উপরে থাকা "অডিও প্লে" (Play Audio) বাটনে চাপলে ক্বারীর মধুর কণ্ঠে ধারাবাহিক তিলাওয়াত শোনা যাবে।'
    ],
    stepsEn: [
      'Tap on the "Quran" tab from the main navigation.',
      'Browse by Surah list or Juz/Para index and select your desired Surah.',
      'Read clear Arabic text with full Bengali translation under every Ayah.',
      'Tap the top "Play Audio" icon to stream continuous recitation by world-renowned Qaris.'
    ],
    actionTab: 'quran',
    actionLabelBn: 'কুরআন মজীদে যান',
    actionLabelEn: 'Open Quran'
  },
  {
    id: 'quran-bookmark-khatam',
    category: 'quran',
    categoryTitleBn: 'কুরআন তিলাওয়াত',
    categoryTitleEn: 'Quran Recitation',
    titleBn: 'কুরআন আয়াত বুকমার্ক ও ব্যক্তিগত খতম কীভাবে করবেন?',
    titleEn: 'How to bookmark Ayahs and set Khatam goals?',
    keywords: [
      'বুকমার্ক', 'খতম', 'পারা ট্র্যাকিং', 'সেভ', 'স্মরণ', 'লক্ষ্য',
      'bookmark', 'khatam', 'goal', 'save', 'favorite'
    ],
    summaryBn: 'আপনার ব্যক্তিগত কুরআন পড়ার পৃষ্ঠা চিহ্নিত রাখা এবং পুরো কুরআন সমাপ্তির লক্ষ্য নির্ধারণের সহজ উপায়।',
    summaryEn: 'Bookmark your last read Ayah and set personal reading goals to finish the entire Holy Quran.',
    stepsBn: [
      'যেকোনো আয়াতের পাশে থাকা বুকমার্ক (Bookmark) আইকনে চাপ দিলে তা আপনার সেভ তালিকায় যুক্ত হবে।',
      'পরবর্তীতে কুরআন পেজের উপরে "আমার বুকমার্ক"-এ ক্লিক করে ঠিক সেই জায়গা থেকে পড়া শুরু করতে পারবেন।',
      'কুরআন খতম ট্র্যাকারে আপনার পড়া শেষ হওয়া পারাসমূহ টিক দিয়ে ১০০% অগ্রগতি পূর্ণ করতে পারেন।'
    ],
    stepsEn: [
      'Tap the bookmark ribbon icon beside any Ayah to save your reading position.',
      'Access "My Bookmarks" anytime from the top bar to resume reading instantly.',
      'Check off completed Juz in your personal Khatam tracker to measure completion progress.'
    ],
    actionTab: 'quran',
    actionLabelBn: 'বুকমার্ক ও তিলাওয়াত দেখুন',
    actionLabelEn: 'View Bookmarks'
  },

  // 3. HISNUL MUSLIM & ADHKAR
  {
    id: 'hisnul-muslim-adhkar',
    category: 'hisnul_muslim',
    categoryTitleBn: 'হিসনুল মুসলিম ও দো\'আ',
    categoryTitleEn: 'Hisnul Muslim & Duas',
    titleBn: 'সকাল-সন্ধ্যার আজকার ও দৈনন্দিন মাসনূন দো\'আ কীভাবে পড়বেন?',
    titleEn: 'How to read Morning/Evening Adhkar & daily Duas?',
    keywords: [
      'আজকার', 'দোয়া', 'দোআ', 'সকাল', 'সন্ধ্যা', 'হিসনুল মুসলিম', 'মাসনুন', 'ঘুমের', 'বিপদ',
      'adhkar', 'azkar', 'dua', 'morning', 'evening', 'hisnul muslim', 'masnoon', 'supplication'
    ],
    summaryBn: 'সহীহ হাদিসভিত্তিক সকাল-সন্ধ্যার জিকির এবং জীবনের প্রতিটি মুহূর্তের জন্য প্রয়োজনীয় মাসনূন দো\'আসমূহ।',
    summaryEn: 'Authentic morning and evening Adhkar and Sunnah supplications categorized for every daily situation.',
    stepsBn: [
      'মেনু থেকে "হিসনুল মুসলিম" (Hisnul Muslim) ট্যাবে প্রবেশ করুন।',
      '"সকাল-সন্ধ্যার আজকার" কার্ড নির্বাচন করে প্রতিটি জিকিরের নির্দিষ্ট সংখ্যা ও ফযিলত জেনে পড়ুন।',
      'অন্যান্য দো\'আ পেতে বিষয়ভিত্তিক ক্যাটাগরি (ঘুমানোর দো\'আ, মসজিদে প্রবেশের দো\'আ, রোগমুক্তির দো\'আ) ব্রাউজ করুন।',
      'প্রতিটি দো\'আর সাথে আরবি উচ্চারণ, বাংলা অর্থ এবং হাদিসের রেফারেন্স রয়েছে।'
    ],
    stepsEn: [
      'Open the "Hisnul Muslim" tab from the navigation.',
      'Tap "Morning & Evening Adhkar" to follow guided counters with Hadith references.',
      'Browse categorized Duas for sleeping, entering the mosque, illness, or travel.',
      'Each supplication includes authentic Arabic, phonetic transliteration, Bengali translation, and reference.'
    ],
    actionTab: 'hisnul_muslim',
    actionLabelBn: 'হিসনুল মুসলিম খুলুন',
    actionLabelEn: 'Open Hisnul Muslim'
  },

  // 4. DIGITAL TASBIH
  {
    id: 'digital-tasbih-usage',
    category: 'tasbih',
    categoryTitleBn: 'ডিজিটাল তাসবীহ',
    categoryTitleEn: 'Digital Tasbih',
    titleBn: 'ডিজিটাল তাসবীহ কীভাবে ব্যবহার করবেন এবং সাউন্ড/ভাইব্রেশন অন করবেন?',
    titleEn: 'How to use Digital Tasbih with sound & vibration?',
    keywords: [
      'তাসবিহ', 'তাসবীহ', 'জিকির', 'সুবহানাল্লাহ', 'আলহামদুলিল্লাহ', 'আল্লাহু আকবার', 'কাউন্টার', 'ভাইব্রেশন', 'সাউন্ড',
      'tasbih', 'tasbee', 'dhikr', 'counter', 'subhanallah', 'vibration', 'sound', 'haptic'
    ],
    summaryBn: 'অন-স্ক্রিন আধুনিক ডিজিটাল তাসবীহ যাতে রয়েছে কাস্টম জিকির, ভাইব্রেশন ফিডব্যাক এবং শান্তিময় সাউন্ড এফেক্ট।',
    summaryEn: 'Modern on-screen digital tasbih featuring custom dhikr selection, haptic vibration feedback, and soothing audio chimes.',
    stepsBn: [
      'হোম পেজের কুইক অ্যাকশন থেকে "ডিজিটাল তাসবীহ" আইকনে ট্যাপ করুন।',
      'পছন্দ অনুযায়ী জিকির (যেমন: সুবহানাল্লাহ, আলহামদুলিল্লাহ, আস্তাগফিরুল্লাহ) নির্বাচন করুন।',
      'বড় সার্কেল বোতামটিতে চাপ দিয়ে প্রতিবার জিকির কাউন্ট করুন।',
      'উপরের স্পিকার ও ভাইব্রেশন আইকন চেপে স্পর্শের সাউন্ড ও হালকা কম্পন নিয়ন্ত্রণ করতে পারেন।',
      '৩৩ বা ১০০ কাউন্ট পূর্ণ হলে স্ক্রিনে মিষ্টি সুর ও নোটিফিকেশনের মাধ্যমে সতর্ক করা হবে।'
    ],
    stepsEn: [
      'Tap the "Digital Tasbih" icon from the Home quick actions.',
      'Select your desired Dhikr phrase (SubhanAllah, Alhamdulillah, Astaghfirullah, etc.).',
      'Tap the large central disc to advance your count.',
      'Toggle audio chime and haptic vibration feedback using the top toolbar icons.',
      'Upon reaching your target (33, 100, etc.), a double chime celebrates your completion.'
    ],
    actionTab: 'home',
    actionLabelBn: 'তাসবীহ শুরু করুন',
    actionLabelEn: 'Open Digital Tasbih'
  },

  // 5. CAVE CIRCLES & HALQA
  {
    id: 'cave-circle-create-join',
    category: 'circle',
    categoryTitleBn: 'কেভ সার্কেলস (হালাকা)',
    categoryTitleEn: 'Cave Circles (Halqa)',
    titleBn: 'কেভ সার্কেল কী, কীভাবে নতুন সার্কেল বানাবেন বা যোগ দেবেন?',
    titleEn: 'What is a Cave Circle and how to create or join one?',
    keywords: [
      'সার্কেল', 'হালাকা', 'গ্রুপ', 'সাথী', 'আমীর', 'কোড', 'তৈরি', 'জয়েন', 'যোগ',
      'circle', 'halqa', 'group', 'companion', 'amir', 'code', 'create', 'join'
    ],
    summaryBn: 'নেক আমল ও কুরআন খতমের জন্য সাথীদের নিয়ে গঠিত সুরক্ষিত ইসলামিক স্টাডি সার্কেল।',
    summaryEn: 'Private Islamic accountability circles to collaborate on good deeds, Quran khatam, and mutual encouragement.',
    stepsBn: [
      'নেভিগেশন বার থেকে "কেভ সার্কেলস" (Cave Circles) ট্যাবে যান।',
      'নতুন গ্রুপ তৈরি করতে "+ নতুন সার্কেল তৈরি করুন" বাটনে চাপুন, নাম ও নিয়ত দিন। সার্কেল কোড পাবেন যা বন্ধুদের পাঠানো যাবে।',
      'অন্য কারও সার্কেলে যোগ দিতে "সার্কেলে জয়েন করুন" অপশনে গিয়ে আমীরের দেওয়া ৬ অক্ষরের কোডটি প্রবেশ করান।'
    ],
    stepsEn: [
      'Navigate to the "Cave Circles" tab from the bottom navigation.',
      'To start a new group, tap "+ Create Circle", name your circle, and copy your unique 6-character invite code.',
      'To join an existing group, tap "Join Circle" and enter the invite code provided by your Circle Amir.'
    ],
    proTipBn: 'একটি সার্কেলে সর্বোচ্চ ৫০ জন সাথী যুক্ত হতে পারেন। সার্কেলের প্রতিষ্ঠাতা স্বয়ংক্রিয়ভাবে "আমীর" নির্বাচিত হন।',
    proTipEn: 'A circle supports up to 50 active companions. The creator automatically serves as the Circle Amir.',
    actionTab: 'cave_circle',
    actionLabelBn: 'কেভ সার্কেলে যান',
    actionLabelEn: 'Open Cave Circles'
  },
  {
    id: 'cave-circle-amir-roles',
    category: 'circle',
    categoryTitleBn: 'কেভ সার্কেলস (হালাকা)',
    categoryTitleEn: 'Cave Circles (Halqa)',
    titleBn: 'সার্কেল আমীরের দায়িত্ব ও ক্ষমতা কী কী?',
    titleEn: 'What are the responsibilities and privileges of an Amir?',
    keywords: [
      'আমীর', 'লিডার', 'এডমিন', 'আমীরের কাজ', 'দায়িত্ব', 'ক্ষমতা', 'রিমুভ', 'রুলস',
      'amir', 'admin', 'leader', 'privilege', 'role', 'kick', 'transfer'
    ],
    summaryBn: 'সার্কেল আমীর হলেন দলের অভিভাবক ও অনুপ্রেরণাদাতা, যিনি গ্রুপের শৃংখলা ও কুরআন খতম পরিচালনা করেন।',
    summaryEn: 'The Circle Amir is the spiritual mentor and administrator who guides circle members and oversees Khatam goals.',
    stepsBn: [
      'আমীর যেকোনো সদস্যের অগ্রগতি ও সক্রিয়তা পর্যালোচনা করতে পারেন।',
      'গ্রুপের শৃংখলা ভঙ্গের ক্ষেত্রে আমীর সদস্যকে সতর্ক বা অপসারণ (Remove) করতে পারেন।',
      'আমীর চাইলে সার্কেল সেটিংসে গিয়ে অন্য কোনো যোগ্য সাথীকে আমীর পদ হস্তান্তর (Transfer Amir) করতে পারেন।'
    ],
    stepsEn: [
      'The Amir monitors companion consistency and prayer milestones.',
      'The Amir maintains respectful Islamic etiquette and may remove inactive or disruptive members.',
      'The Amir can transfer leadership to another trustworthy companion anytime via Circle Settings.'
    ],
    actionTab: 'cave_circle',
    actionLabelBn: 'সার্কেল ম্যানেজমেন্ট দেখুন',
    actionLabelEn: 'Manage Circles'
  },
  {
    id: 'cave-circle-quran-khatam',
    category: 'circle',
    categoryTitleBn: 'কেভ সার্কেলস (হালাকা)',
    categoryTitleEn: 'Cave Circles (Halqa)',
    titleBn: 'সার্কেলে সবাই মিলে যৌথ কুরআন খতম কীভাবে করবেন?',
    titleEn: 'How to participate in group Quran Khatam in a Circle?',
    keywords: [
      'যৌথ খতম', 'গ্রুপ খতম', 'পারা বণ্টন', '৩০ পারা', 'কুরআন খতম সার্কেল',
      'group khatam', 'circle khatam', '30 juz', 'claim juz'
    ],
    summaryBn: 'সার্কেলের সাথীরা মিলে ৩০টি পারা নিজেদের মধ্যে ভাগ করে নিয়ে খুব দ্রুত সম্মিলিত কুরআন খতম সম্পন্ন করতে পারেন।',
    summaryEn: 'Circle companions distribute the 30 Juz among themselves to complete collective Quran Khatams seamlessly.',
    stepsBn: [
      'আপনার সার্কেলের চ্যাট স্ক্রিনের উপরে "কুরআন খতম লক্ষ্য" (Khatam Goal) ব্যানারে ট্যাপ করুন।',
      '১ থেকে ৩০ পারার গ্রিড দেখতে পাবেন। অপঠিত যেকোনো পারা সিলেক্ট করে "পারা গ্রহণ করুন" চাপুন।',
      'তিলাওয়াত শেষ হলে আবার সেই পারায় ট্যাপ করে "পড়া সম্পন্ন" মার্ক করুন।',
      '৩০টি পারা শেষ হলে সম্পূর্ণ সার্কেলে আনন্দের মাইলস্টোন স্পার্কল ও দো\'আ নোটিফিকেশন প্রচারিত হবে।'
    ],
    stepsEn: [
      'In your Circle chat, tap the "Circle Quran Khatam" progress banner at the top.',
      'View the interactive 1–30 Juz grid. Tap an available Juz to claim it.',
      'Once read, tap it again to confirm completion.',
      'When all 30 Juz are complete, the system broadcasts a celebratory milestone notification to all companions.'
    ],
    actionTab: 'cave_circle',
    actionLabelBn: 'সার্কেল খতম দেখুন',
    actionLabelEn: 'View Circle Khatam'
  },
  {
    id: 'cave-circle-voice-message',
    category: 'circle',
    categoryTitleBn: 'কেভ সার্কেলস (হালাকা)',
    categoryTitleEn: 'Cave Circles (Halqa)',
    titleBn: 'সার্কেলে ভয়েস মেসেজ ও অডিও কীভাবে পাঠাবেন ও শুনবেন?',
    titleEn: 'How to send and play voice notes in Cave Circles?',
    keywords: [
      'ভয়েস', 'অডিও', 'রেকর্ড', 'শুনতে', 'প্লে', 'মাইক',
      'voice', 'audio', 'record', 'play', 'voice note', 'playback', 'mic'
    ],
    summaryBn: 'টাইপ করার ঝামেলা ছাড়াই সাথীদের সাথে খাঁটি ও নির্ভরযোগ্য ভয়েস নোট আদান-প্রদান করতে পারবেন।',
    summaryEn: 'Send high-clarity voice notes to your circle companions with instant on-device audio playback.',
    stepsBn: [
      'সার্কেল চ্যাটের নিচে থাকা লাল মাইক্রোফোন বাটনে ট্যাপ করে কথা বলা শুরু করুন।',
      'কথা শেষ হলে "পাঠান" (Send) বাটনে চাপ দিন, সাথে সাথে অডিওটি সার্কেলে পৌঁছে যাবে।',
      'বাতিল করতে চাইলে "বাতিল" (Cancel) বাটনে চাপুন।',
      'অন্য সাথীর পাঠানো ভয়েস নোটে প্লে (▶) বাটনে চাপলে সুন্দরভাবে অডিও বেজে উঠবে।'
    ],
    stepsEn: [
      'Tap the red microphone button in Circle chat to initiate recording.',
      'Speak your message, then tap "Send" to transmit the voice note.',
      'Tap "Cancel" at any time to discard the recording.',
      'Tap the Play (▶) icon on any received audio bubble to hear the message clearly.'
    ],
    actionTab: 'cave_circle',
    actionLabelBn: 'সার্কেল চ্যাটে যান',
    actionLabelEn: 'Go to Circle Chat'
  },

  // 6. FAITH TOKENS & HALAL MARKET
  {
    id: 'tokens-earning-guide',
    category: 'tokens',
    categoryTitleBn: 'ফেইথ টোকেন ও রিওয়ার্ড',
    categoryTitleEn: 'Faith Tokens & Rewards',
    titleBn: 'ফেইথ টোকেন অর্জনের ধাপসমূহ (গোল্ড, সিলভার, ব্রোঞ্জ)',
    titleEn: 'Token Earning Tiers (Gold, Silver, Bronze)',
    keywords: [
      'টোকেন', 'কয়েন', 'গোল্ড', 'সিলভার', 'ব্রোঞ্জ', 'আয়', 'উপার্জন', 'জামাত',
      'tokens', 'coins', 'gold', 'silver', 'bronze', 'earn', 'jamaah'
    ],
    summaryBn: 'অনুমোদিত মসজিদে জামাতে সালাত আদায়ের ওপর ভিত্তি করে দিনে ১টি টোকেন অর্জিত হয়: ৫ ওয়াক্ত জামাতে গোল্ড টোকেন (🥇), ৪ ওয়াক্তে সিলভার টোকেন (🥈) এবং ৩ ওয়াক্তে ব্রোঞ্জ টোকেন (🥉)।',
    summaryEn: 'Earn 1 token daily based on Jama\'ah prayers at approved mosques: Gold Token for 5 prayers, Silver Token for 4 prayers, Bronze Token for 3 prayers.',
    stepsBn: [
      'দিনে ৫ ওয়াক্তই মসজিদে জামাতে সালাত আদায় করলে ১টি গোল্ড টোকেন পাওয়া যায়।',
      'দিনের যেকোনো ৪ ওয়াক্ত জামাতে আদায় করলে সিলভার টোকেন এবং ৩ ওয়াক্ত জামাতে আদায় করলে ব্রোঞ্জ টোকেন অর্জিত হয়।',
      'প্রতিদিন সর্বোচ্চ ১টি রিওয়ার্ড টোকেন ওয়ালেটে জমা হয়।'
    ],
    stepsEn: [
      'Complete all 5 daily prayers in Jama\'ah to earn 1 Gold Token.',
      'Complete 4 prayers for a Silver Token, or 3 prayers for a Bronze Token.',
      'A maximum of 1 reward token can be earned per day.'
    ],
    actionTab: 'tokens',
    actionLabelBn: 'টোকেন ওয়ালেট দেখুন',
    actionLabelEn: 'View Token Wallet'
  },
  {
    id: 'tokens-rules-and-sadakah',
    category: 'tokens',
    categoryTitleBn: 'টোকেন নিয়মাবলী ও সাদাকাহ',
    categoryTitleEn: 'Token Rules & Sadakah',
    titleBn: 'টোকেন ব্যবহারের নিয়মাবলী ও মসজিদে সরাসরি সাদাকাহ প্রদান',
    titleEn: 'Token Spending Rules & Direct Mosque Sadakah Donation',
    keywords: [
      'টোকেন নিয়ম', 'ব্যবহার', 'একবার', 'সাদাকাহ', 'মসজিদ ফান্ড', 'দান', 'ছাড়',
      'token rules', 'single use', 'sadakah', 'mosque fund', 'donate', 'discount'
    ],
    summaryBn: 'প্রতি অর্ডারে বা কেনাকাটায় ১টি টোকেন একবার ব্যবহারযোগ্য। কেনাকাটায় ডিসকাউন্ট ব্যবহার করতে না চাইলে "My Tokens" পেজ থেকে টোকেনটি সরাসরি স্থানীয় মসজিদের উন্নয়ন ফান্ডে সাদাকাহ হিসেবে দান করা যায়।',
    summaryEn: 'Apply 1 single-use token per purchase for partner discounts. Alternatively, donate your token directly as Sadakah for local mosque welfare funds via "My Tokens".',
    stepsBn: [
      'কেনাকাটার সময় প্রতি বিলে ১টি বৈধ টোকেন ব্যবহার করে ছাড় পান।',
      'প্রতিটি টোকেন একবার রিডিম হয়ে গেলে তা ব্যবহৃত তালিকায় চলে যাবে।',
      'ডিসকাউন্ট না নিতে চাইলে "My Tokens" পেজ থেকে "Donate to Mosque" নির্বাচন করে সরাসরি মসজিদে সাদাকাহ করুন।'
    ],
    stepsEn: [
      'Redeem 1 valid token per store purchase to apply your discount.',
      'Tokens are single-use only.',
      'To donate, go to "My Tokens" and select "Donate to Mosque Fund" to transfer value as Sadakah.'
    ],
    actionTab: 'tokens',
    actionLabelBn: 'আমার টোকেনে যান',
    actionLabelEn: 'Go to My Tokens'
  },
  {
    id: 'shops-redemption-guide',
    category: 'tokens',
    categoryTitleBn: 'পার্টনার শপ ও রিডেম্পশন',
    categoryTitleEn: 'Partner Shops & Redemption',
    titleBn: 'পার্টনার শপে কীভাবে টোকেন দিয়ে ডিসকাউন্ট রিডিম করবেন?',
    titleEn: 'How to redeem token discounts at Partner Shops?',
    keywords: [
      'পার্টনার শপ', 'দোকান', 'রিডিম', 'কিউআর', 'ক্যাশ মেমো', 'ডিসকাউন্ট', 'বিল',
      'partner shop', 'redeem', 'qr', 'discount', 'memo', 'bill'
    ],
    summaryBn: 'পার্টনার শপে কেনাকাটার সময় দোকানের QR কোড স্ক্যান করে বা দোকান সিলেক্ট করে টোকেন ও বিলের পরিমাণ সাবমিট করুন। দোকানদার একসেপ্ট করলে ডিসকাউন্ট বাদ দিয়ে ডিজিটাল ক্যাশ মেমো জেনারেট হবে।',
    summaryEn: 'Scan partner shop QR code or select shop, choose your token, enter total bill amount. Once the shopkeeper approves, a digital cash memo with discount applied is generated.',
    stepsBn: [
      '"Partner Shops" পেজে গিয়ে শপ সিলেক্ট করুন অথবা দোকানে থাকা QR কোড স্ক্যান করুন।',
      'ওয়ালেটের ১টি টোকেন সিলেক্ট করুন এবং মোট বিলের পরিমাণ দিন।',
      'দোকানদার রিয়েল-টাইমে রিকোয়েস্ট অ্যাপ্রুভ করলে স্ক্রিনে ডিজিটাল ক্যাশ মেমো বা ভাউচার দেখতে পাবেন।'
    ],
    stepsEn: [
      'Select shop in "Partner Shops" or scan store QR code.',
      'Select 1 token from your wallet and input total purchase bill.',
      'When shopkeeper approves in real-time, your digital cash memo with discount is generated.'
    ],
    actionTab: 'shops',
    actionLabelBn: 'পার্টনার শপ দেখুন',
    actionLabelEn: 'View Partner Shops'
  },
  {
    id: 'local-vs-national-market-guide',
    category: 'tokens',
    categoryTitleBn: 'কেভ মার্কেট নির্দেশিকা',
    categoryTitleEn: 'Cave Market Guide',
    titleBn: 'লোকাল মার্কেট ও ন্যাশনাল মার্কেট কী এবং এদের সুবিধা?',
    titleEn: 'What is Local Market vs National Market?',
    keywords: [
      'লোকাল মার্কেট', 'ন্যাশনাল মার্কেট', 'পার্থক্য', 'জেলা', 'উপজেলা', 'কুরিয়ার', 'রাইডার', 'দ্রুত ডেলিভারি',
      'local market', 'national market', 'district', 'rider', 'fast delivery', 'courier'
    ],
    summaryBn: 'লোকাল মার্কেট হলো আপনার নিজ জেলা/উপজেলার পার্টনার শপগুলোর বাজার যেখানে লোকাল রাইডারে ৩০-৬০ মিনিটে দ্রুত ডেলিভারি পাওয়া যায়। ন্যাশনাল মার্কেট হলো সারাদেশে কুরিয়ারে সরবরাহযোগ্য বই, আতর, মধু ও অর্গানিক পণ্যের জাতীয় বাজার।',
    summaryEn: 'Local Market features products from registered shops in your own district/upazila delivered in 30-60 mins by local riders. National Market aggregates countrywide items shipped via courier.',
    stepsBn: [
      'Cave Market-এর উপরে "Local" অথবা "Nationwide" টগল বাটন সিলেক্ট করুন।',
      'লোকাল মার্কেটে আপনার এলাকার কাছের দোকানগুলোর ক্যাফে, ফুড, ও গ্রোসারি দেখতে পাবেন।',
      'ন্যাশনাল মার্কেটে সারাদেশে হোম ডেলিভারিযোগ্য যেকোনো পণ্য টোকেন ডিসকাউন্টে কিনতে পারবেন।'
    ],
    stepsEn: [
      'Toggle between "Local" and "Nationwide" at top of Cave Market.',
      'Local Market shows nearby shops for fast 30-60 min rider delivery.',
      'Nationwide Market shows products shippable via courier across Bangladesh.'
    ],
    actionTab: 'market',
    actionLabelBn: 'কেভ মার্কেটে যান',
    actionLabelEn: 'Open Cave Market'
  },
  {
    id: 'market-order-tracking-guide',
    category: 'tokens',
    categoryTitleBn: 'অর্ডার ও লাইভ ট্র্যাকিং',
    categoryTitleEn: 'Orders & Live Tracking',
    titleBn: 'কেভ মার্কেটে কীভাবে অর্ডার করবেন এবং রাইডার ট্র্যাক করবেন?',
    titleEn: 'How to place orders and track delivery live on Cave Market?',
    keywords: [
      'অর্ডার', 'পণ্য কেনা', 'ট্র্যাক', 'রাইডার ট্র্যাকিং', 'ক্যাশ অন ডেলিভারি', 'ইটিএ',
      'order', 'buy', 'track', 'rider tracking', 'cod', 'eta', 'my orders'
    ],
    summaryBn: 'Cave Market থেকে পণ্য বেছে নিয়ে টোকেন ছাড় যুক্ত করে ক্যাশ অন ডেলিভারিতে অর্ডার করুন। "My Orders" অপশন থেকে লোকাল রাইডারের অবস্থান ও আনুমানিক সময় (ETA) লাইভ ম্যাপে ট্র্যাক করা যায়।',
    summaryEn: 'Select items on Cave Market, apply token discount, and place order via Cash on Delivery. Track live rider position and ETA under "My Orders".',
    stepsBn: [
      'পছন্দের প্রোডাক্টে "Buy Now" বা "Add to Cart" এ ক্লিক করুন।',
      'এড্রেস দিন, ওয়ালেটের টোকেন বেছে নিন এবং Cash on Delivery বা অনলাইনে অর্ডার কনফার্ম করুন।',
      'অর্ডার স্টেটাস ও লাইভ রাইডার ম্যাপ দেখতে Cave Market থেকে "My Orders" এ ট্যাপ করুন।'
    ],
    stepsEn: [
      'Click "Buy Now" or "Add to Cart" on selected item.',
      'Enter delivery address, select token discount, confirm Cash on Delivery.',
      'Open "My Orders" from Cave Market to view live rider GPS map and estimated arrival time.'
    ],
    actionTab: 'market',
    actionLabelBn: 'মাই অর্ডারস দেখুন',
    actionLabelEn: 'View My Orders'
  },
  {
    id: 'merchant-rider-registration-guide',
    category: 'profile',
    categoryTitleBn: 'মার্চেন্ট ও রাইডার পোর্টাল',
    categoryTitleEn: 'Merchant & Rider Portal',
    titleBn: 'মার্চেন্ট বা ডেলিভারি রাইডার হিসেবে রেজিস্ট্রেশন করবেন কীভাবে?',
    titleEn: 'How to register as a Merchant or Delivery Rider?',
    keywords: [
      'মার্চেন্ট', 'রাইডার', 'রেজিস্ট্রেশন', 'লগইন পেজ', 'দোকানদার', 'অন্যান্য', 'আবেদন',
      'merchant', 'rider', 'register', 'login page', 'partner', 'others'
    ],
    summaryBn: 'মার্চেন্ট বা রাইডার রেজিস্ট্রেশন সাধারণ প্রোফাইলের ভেতর থাকে না—এটি করতে হয় মূল লগইন স্ক্রিন (Auth Screen) থেকে। লগইন স্ক্রিনের নিচে "অন্যান্য →" বাটনে চেপে "মার্চেন্ট রেজিস্ট্রেশন" বা "রাইডার রেজিস্ট্রেশন" সিলেক্ট করে ফর্ম সাবমিট করতে হয়।',
    summaryEn: 'Merchant & Rider registration is accessed ONLY from the main Auth/Login Screen. Tap "Others →" at bottom of Login screen, then select "Merchant Login/Registration" or "Rider Login/Registration".',
    stepsBn: [
      'অ্যাপের মূল লগইন স্ক্রিনে (Auth Screen) যান।',
      'নিচের দিকে থাকা "অন্যান্য →" (Others →) বাটনে ট্যাপ করুন।',
      'তালিকা থেকে "মার্চেন্ট লগইন / রেজিস্ট্রেশন" অথবা "রাইডার লগইন / রেজিস্ট্রেশন" নির্বাচন করুন।',
      'আপনার দোকানের তথ্য/যানবাহনের তথ্য, এনআইডি ও ট্রেড লাইসেন্সের ছবি দিয়ে ফর্ম সাবমিট করুন। এডমিন রিভিউ করে অনুমোদন দেবে।'
    ],
    stepsEn: [
      'Go to main Auth / Login Screen.',
      'Tap "Others →" button at the bottom.',
      'Select "Merchant Login / Registration" or "Rider Login / Registration".',
      'Fill in shop or vehicle info, upload NID / Trade License photos, and submit for admin approval.'
    ],
    actionTab: 'profile',
    actionLabelBn: 'লগইন পেজে যান',
    actionLabelEn: 'Go to Login Page'
  },

  // 7. HABITS & SUNNAH
  {
    id: 'daily-habits-tracking',
    category: 'habits',
    categoryTitleBn: 'সুন্নাহ অভ্যাস ও স্ট্রিক',
    categoryTitleEn: 'Sunnah Habits & Streaks',
    titleBn: 'প্রতিদিনের সুন্নাহ অভ্যাস ও স্ট্রিক কীভাবে বজায় রাখবেন?',
    titleEn: 'How to maintain daily Sunnah habits and streaks?',
    keywords: [
      'অভ্যাস', 'সুন্নাহ', 'আমল', 'চেকলিস্ট', 'স্ট্রিক', 'মিসওয়াক', 'সাদাকা',
      'habit', 'sunnah', 'checklist', 'streak', 'miswak', 'sadaqah', 'tracker'
    ],
    summaryBn: 'দৈনন্দিন জীবনে ছোট কিন্তু অত্যন্ত ফযিলতপূর্ণ সুন্নাতসমূহ অভ্যাসে রূপান্তর করার দৈনিক ট্র্যাকার।',
    summaryEn: 'Transform cherished daily Sunnah practices into lifelong habits with our daily accountability checklist.',
    stepsBn: [
      'হোম পেজের "আজকের আমল চেকলিস্ট"-এ যান।',
      'আজকে করা আমলগুলোতে (যেমন: মিসওয়াক, সাদাকা প্রদান, সুন্নাত তিলাওয়াত, সালাম বিনিময়) টিক দিন।',
      'প্রতিদিন সকল আমল পূর্ণ করলে আপনার "ডেইলি স্ট্রিক ফায়ার" জ্বলতে থাকবে এবং প্রোফাইলে ব্যাজ অর্জিত হবে।'
    ],
    stepsEn: [
      'Locate the "Daily Sunnah Checklist" on your Home dashboard.',
      'Check off habits fulfilled today (Miswak, Sadaqah, Quran recitation, spreading Salam).',
      'Maintaining consecutive daily entries builds your streak fire and unlocks prestigious spiritual badges.'
    ],
    actionTab: 'home',
    actionLabelBn: 'হোম ড্যাশবোর্ডে যান',
    actionLabelEn: 'Go to Dashboard'
  },

  // 8. PROFILE, LANGUAGE & SETTINGS
  {
    id: 'account-language-settings',
    category: 'profile',
    categoryTitleBn: 'প্রোফাইল ও সেটিংস',
    categoryTitleEn: 'Profile & Settings',
    titleBn: 'ভাষা পরিবর্তন (বাংলা/English) ও নোটিফিকেশন কীভাবে নিয়ন্ত্রণ করবেন?',
    titleEn: 'How to switch language and customize notifications?',
    keywords: [
      'ভাষা', 'ইংরেজি', 'বাংলা', 'সেটিংস', 'নোটিফিকেশন', 'আজান', 'প্রোফাইল', 'পাসওয়ার্ড',
      'language', 'english', 'bangla', 'settings', 'notification', 'adhan', 'profile', 'theme'
    ],
    summaryBn: 'Cave Companions সম্পূর্ণ বাংলা ও ইংরেজি উভয় ভাষায় ব্যবহারযোগ্য। যেকোনো সময় ভাষা ও নোটিফিকেশন বদলানো যায়।',
    summaryEn: 'Cave Companions natively supports both Bengali and English interfaces with full notification controls.',
    stepsBn: [
      'নিচের মেনু থেকে "প্রোফাইল" (Profile) ট্যাবে ট্যাপ করুন।',
      'উপরে ডান পাশে থাকা গ্লোব বা "BN / EN" বাটনে চাপ দিয়ে তাৎক্ষণিক ভাষা অদলবদল করতে পারেন।',
      'সেটিংস সেকশনে গিয়ে সালাতের আজান অ্যালার্ট ও সার্কেল রিমাইন্ডার কাস্টমাইজ করুন।'
    ],
    stepsEn: [
      'Navigate to the "Profile" tab from the bottom navigation.',
      'Tap the language toggle button (BN / EN) in the top header to instantly switch between Bengali and English.',
      'Open Settings to configure Adhan prayer alerts, circle message sounds, and push notifications.'
    ],
    actionTab: 'profile',
    actionLabelBn: 'প্রোফাইলে যান',
    actionLabelEn: 'Go to Profile'
  },
  // 9. CAVE MEDIA (ISLAMIC LECTURES)
  {
    id: 'cave-media-lectures',
    category: 'profile',
    categoryTitleBn: 'কেভ মিডিয়া',
    categoryTitleEn: 'CAVE Media',
    titleBn: 'কেভ মিডিয়া (ইসলামিক লেকচার) কী?',
    titleEn: 'What is CAVE Media?',
    keywords: [
      'মিডিয়া', 'মিডিয়া', 'লেকচার', 'আলোচনা', 'ভিডিও', 'ওয়াজ', 'lecture', 'media', 'blog', 'video', 'youtube'
    ],
    summaryBn: 'কেভ মিডিয়ায় নির্ভরযোগ্য আহলে সুন্নাহ ওয়াল জামাআহ্-এর আলেমদের ইসলামিক লেকচার, সংক্ষিপ্ত দ্বীনি নসীহা ও ভিডিও আলোচনা সংকলিত থাকে। All Features থেকে "কেভ মিডিয়া" অপশনে প্রবেশ করে এগুলো দেখা যায়।',
    summaryEn: 'CAVE Media gathers authentic Islamic lectures, short reminders, and video discussions from trusted scholars of Ahle Sunnah Wal Jama\'ah. It can be accessed via All Features ➔ CAVE Media.',
    stepsBn: [
      'All Features থেকে "কেভ মিডিয়া" (CAVE Media) আইকনে ট্যাপ করুন।',
      'সেখানে আহলে সুন্নাহ ওয়াল জামাআহ্-এর গ্রহণযোগ্য আলেমদের নির্ভরযোগ্য লেকচার ও আলোচনা ক্যাটাগরি অনুযায়ী দেখতে ও শুনতে পারবেন।'
    ],
    stepsEn: [
      'Go to All Features ➔ "CAVE Media".',
      'Watch and listen to reliable Islamic lectures and reminders categorized by topic from trusted scholars of Ahle Sunnah Wal Jama\'ah.'
    ],
    actionTab: 'blog',
    actionLabelBn: 'কেভ মিডিয়ায় যান',
    actionLabelEn: 'Go to CAVE Media'
  }
];

/**
 * Synonym Dictionary for Bangla, Banglish & English keywords
 */
const SYNONYM_MAP: Record<string, string[]> = {
  'সালাম': ['আসসালামু আলাইকুম', 'ওয়ালাইকুম আসসালাম', 'হাই', 'হ্যালো', 'salam', 'assalamu alaikum', 'hi', 'hello', 'hey', 'greetings', 'অভিবাদন'],
  'পরিচয়': ['কেভ এআই', 'তুমি কে', 'তোমার পরিচয়', 'আপনার পরিচয়', 'cave ai', 'who are you', 'identity', 'about ai', 'capabilities'],
  'উদ্দেশ্য': ['লক্ষ্য', 'কেভ কম্প্যানিয়ন্স কি', 'কেভ কম্প্যানিয়ন্স এর উদ্দেশ্য', 'purpose', 'objective', 'mission', 'about app', 'what is cave companions'],
  'দোকান': ['পার্টনার শপ', 'শপ', 'shop', 'store', 'মার্চেন্ট'],
  'কেনাকাটা': ['মার্কেট', 'পণ্য', 'অর্ডার', 'market', 'product', 'buy'],
  'পেমেন্ট': ['টোকেন', 'ডিসকাউন্ট', 'কয়েন', 'token', 'coin', 'discount'],
  'মেম্বার': ['সার্কেল', 'আমীর', 'হালাকা', 'circle', 'member', 'amir'],
  'ডেলিভারি': ['রাইডার', 'কুরিয়ার', 'rider', 'delivery', 'eta'],
  'রেজিস্ট্রেশন': ['লগইন পেজ', 'নিবন্ধন', 'সাইনআপ', 'register', 'signup', 'login'],
  'রেডিয়াস': ['জিওফেন্স', 'এডমিন', 'পরিধি', 'radius', 'geofence', 'admin'],
  'ভেরিফিকেশন': ['জিপিএস', 'চেক', 'verification', 'gps', 'check'],
  'সালাত': ['নামাজ', 'কেভ জার্নি', 'salah', 'prayer', 'journey'],
  'জার্নি': ['কেভ জার্নি', 'আমল', 'ট্র্যাকার', 'journey', 'streak'],
  'কাজা': ['অফসেট', 'ছুটে যাওয়া'],
  'মসজিদ': ['ইমাম', 'মসজিদ তালিকা', 'mosque', 'directory']
};

/**
 * Levenshtein distance for fuzzy matching typos
 */
function levenshteinDistance(str1: string, str2: string): number {
  const track = Array(str2.length + 1).fill(null).map(() =>
    Array(str1.length + 1).fill(null)
  );
  for (let i = 0; i <= str1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= str2.length; j += 1) track[j][0] = j;

  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }
  return track[str2.length][str1.length];
}

/**
 * Tokenizes text and cleans punctuation for multi-lingual semantic matching
 */
function tokenizeText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[।.,?!;:'"(){}[\]<>_+\-=*&^%$#@~/\\|]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1);
}

/**
 * Fuzzy matches query token against keyword using exact, substring, and Levenshtein distance
 */
function isFuzzyMatch(queryToken: string, keywordToken: string): boolean {
  if (queryToken === keywordToken) return true;
  if (keywordToken.includes(queryToken) || queryToken.includes(keywordToken)) return true;

  // Levenshtein distance check for typos (for words > 3 characters)
  if (queryToken.length > 3 && keywordToken.length > 3) {
    const dist = levenshteinDistance(queryToken, keywordToken);
    if (dist <= 2) return true;
  }

  return false;
}

/**
 * Resolves pronouns & follow-up context from multi-turn chat history
 */
function resolveMultiTurnContext(query: string, chatHistory: any[] = []): string[] {
  const queryTokens = tokenizeText(query);
  const isFollowUp = queryTokens.length <= 4 || 
    query.includes('এটার') || query.includes('সেখানে') || query.includes('কীভাবে') || 
    query.includes('নিয়ম') || query.includes('সুবিধা') || query.includes('কোথায়') || 
    query.includes('how') || query.includes('rules') || query.includes('where');

  if (!isFollowUp || chatHistory.length === 0) {
    return queryTokens;
  }

  // Look back at previous assistant messages or user messages
  const contextTokens: string[] = [...queryTokens];
  for (let i = chatHistory.length - 1; i >= 0 && contextTokens.length < 10; i--) {
    const msg = chatHistory[i];
    if (msg.answers && msg.answers.length > 0) {
      const prevAns = msg.answers[0];
      const prevTokens = tokenizeText(`${prevAns.title} ${prevAns.category}`);
      contextTokens.push(...prevTokens);
      break;
    } else if (msg.text) {
      const prevTextTokens = tokenizeText(msg.text);
      contextTokens.push(...prevTextTokens.slice(0, 5));
    }
  }

  return Array.from(new Set(contextTokens));
}

/**
 * Calculates match score between user query tokens and topic keywords/title
 */
function calculateTopicScore(queryTokens: string[], rawQuery: string, topic: GuideTopic): number {
  let score = 0;
  const rawLower = rawQuery.toLowerCase();

  // Exact phrase match in title or summary
  if (topic.titleBn.toLowerCase().includes(rawLower) || topic.titleEn.toLowerCase().includes(rawLower)) {
    score += 60;
  }
  if (topic.summaryBn.toLowerCase().includes(rawLower) || topic.summaryEn.toLowerCase().includes(rawLower)) {
    score += 30;
  }

  const topicKeywordTokens = topic.keywords.map(k => k.toLowerCase());

  // Expand query tokens with synonyms
  const expandedQueryTokens: string[] = [...queryTokens];
  for (const tok of queryTokens) {
    if (SYNONYM_MAP[tok]) {
      expandedQueryTokens.push(...SYNONYM_MAP[tok]);
    }
    for (const [key, syns] of Object.entries(SYNONYM_MAP)) {
      if (syns.includes(tok)) {
        expandedQueryTokens.push(key);
      }
    }
  }

  for (const token of expandedQueryTokens) {
    for (const kw of topicKeywordTokens) {
      if (isFuzzyMatch(token, kw)) {
        score += 15;
      }
    }
  }

  return score;
}

/**
 * Main query function: searches the local semantic knowledge base with multi-turn history & fuzzy matching
 */
export function queryCaveGuide(query: string, chatHistory: any[] = [], language: 'bn' | 'en' = 'bn'): GuideAnswer[] {
  const cleanQuery = query.trim();
  if (!cleanQuery) return [];

  const lowerQuery = cleanQuery.toLowerCase();

  // Direct check for Cave Media queries to ensure robust multi-lingual and character handling
  if (
    lowerQuery.includes('কেভ মিডিয়া') || 
    lowerQuery.includes('কেভ মিডিয়া') || 
    lowerQuery.includes('cave media') || 
    lowerQuery.includes('cavemedia')
  ) {
    const isBn = language === 'bn';
    const answer = isBn 
      ? "কেভ মিডিয়ায় নির্ভরযোগ্য আহলে সুন্নাহ ওয়াল জামাআহ্-এর আলেমদের ইসলামিক লেকচার, সংক্ষিপ্ত দ্বীনি নসীহা ও ভিডিও আলোচনা সংকলিত থাকে। All Features থেকে \"কেভ মিডিয়া\" অপশনে প্রবেশ করে এগুলো দেখা যায়।"
      : "CAVE Media gathers authentic Islamic lectures, short reminders, and video discussions from trusted scholars of Ahle Sunnah Wal Jama'ah. It can be accessed via All Features ➔ CAVE Media.";
    return [{
      topicId: 'kb-media-direct',
      title: isBn ? 'কেভ মিডিয়া' : 'CAVE Media',
      category: isBn ? 'কেভ এআই নলেজ বুক' : 'Cave AI Knowledge Book',
      summary: answer,
      steps: [],
      actionTab: 'blog',
      confidence: 100,
      formattedText: answer
    }];
  }

  // 0. Knowledge Book Exact/Semantic Matcher for 200 Verified Questions
  const kbMatch = CAVE_AI_KNOWLEDGE_BOOK.find(item => {
    const normQ = item.question.trim().toLowerCase().replace(/[?？.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ");
    const normUser = cleanQuery.trim().toLowerCase().replace(/[?？.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ");
    return normQ === normUser || (normUser.length > 5 && (normUser.includes(normQ) || normQ.includes(normUser)));
  });

  if (kbMatch) {
    const isBn = language === 'bn';
    const answer = isBn ? kbMatch.verifiedAnswerBn : (kbMatch.verifiedAnswerEn || kbMatch.verifiedAnswerBn);
    
    // Attempt to map matching topic for action button redirect
    const matchingTopic = CAVE_GUIDE_TOPICS.find(t => 
      t.id === kbMatch.intent.toLowerCase().replace(/_/g, '-') ||
      t.keywords.some(k => kbMatch.question.toLowerCase().includes(k.toLowerCase()))
    );

    return [{
      topicId: 'kb-' + kbMatch.id,
      title: isBn ? 'যাচাইকৃত উত্তর' : 'Verified Answer',
      category: isBn ? 'কেভ এআই নলেজ বুক' : 'Cave AI Knowledge Book',
      summary: answer,
      steps: [],
      actionTab: matchingTopic?.actionTab || 'home',
      actionLabel: matchingTopic ? (isBn ? matchingTopic.actionLabelBn : matchingTopic.actionLabelEn) : undefined,
      confidence: 100,
      formattedText: answer
    }];
  }

  // 1. Direct Greeting Matcher
  const isGreeting = [
    'সালাম', 'আসসালামু আলাইকুম', 'সালামু আলাইকুম', 'সলাম', 'হাই', 'হ্যালো',
    'salam', 'assalamu alaikum', 'hi', 'hello', 'hey', 'greetings', 'শুভ সকাল'
  ].some(g => lowerQuery === g || lowerQuery.startsWith(g));

  if (isGreeting) {
    const greetingTopic = CAVE_GUIDE_TOPICS.find(t => t.id === 'greetings-salam-reply');
    if (greetingTopic) {
      return [formatAnswer(greetingTopic, language, 100)];
    }
  }

  // 1.5 Casual Chit-Chat Matcher with Warm Islamic Etiquette
  const isChitChat = [
    'কেমন আছ', 'কেমন আছেন', 'কেমন আছো', 'কেমন চলতাছে', 'কেমন চলছে', 'কেমন কাটছে', 'কেমন আছিস', 'কেমন আছেন আপনি',
    'kemon acho', 'kemon achen', 'kemon aco', 'how are you', 'how is it going', 'how are u', 'whats up'
  ].some(c => lowerQuery.includes(c));

  if (isChitChat) {
    const isBn = language === 'bn';
    const chitChatResponseBn = "আলহামদুলিল্লাহ, আল্লাহর অশেষ রহমতে ও মেহেরবানীতে আমি খুব ভালো আছি। ইনশাআল্লাহ আপনার দিনটিও অনেক বরকতময় ও নেক আমলে পরিপূর্ণ কাটবে। কেভ কম্প্যানিয়ন্স-এর কোনো ফিচার বা আমল ট্র্যাকিং নিয়ে আজ আপনাকে কীভাবে সাহায্য করতে পারি, ভাই/বোন? জাজাকাল্লাহু খাইরান।";
    const chitChatResponseEn = "Alhamdulillah, by the grace and mercy of Allah, I am doing very well. Insha'Allah, your day will be filled with blessings. How can I assist you today with Cave Companions features or worship tracking, brother/sister? Jazakallahu Khayran.";
    
    return [{
      topicId: 'chitchat-reply',
      title: isBn ? 'কুশল বিনিময়' : 'Greetings',
      category: isBn ? 'কেভ এআই আলাপ' : 'Cave AI Chat',
      summary: isBn ? chitChatResponseBn : chitChatResponseEn,
      steps: [],
      confidence: 100,
      formattedText: isBn ? chitChatResponseBn : chitChatResponseEn
    }];
  }

  // 2. Direct Identity Matcher
  const isIdentity = [
    'তুমি কে', 'তোমার পরিচয়', 'আপনার পরিচয়', 'কেভ এআই', 'cave ai', 'who are you', 'identity', 'about ai'
  ].some(id => lowerQuery.includes(id));

  if (isIdentity) {
    const identityTopic = CAVE_GUIDE_TOPICS.find(t => t.id === 'cave-ai-identity');
    if (identityTopic) {
      return [formatAnswer(identityTopic, language, 100)];
    }
  }

  // 3. Direct App Purpose Matcher
  const isPurpose = [
    'উদ্দেশ্য', 'লক্ষ্য', 'উদ্দেশ্য কি', 'উদ্দেশ্য কী', 'cave companions কি', 'কেভ কম্প্যানিয়ন্স কি',
    'what is cave companions', 'purpose', 'objective', 'mission'
  ].some(p => lowerQuery.includes(p));

  if (isPurpose) {
    const purposeTopic = CAVE_GUIDE_TOPICS.find(t => t.id === 'cave-companions-overview-purpose');
    if (purposeTopic) {
      return [formatAnswer(purposeTopic, language, 100)];
    }
  }

  // 4. Intent Classification Router Integration
  const intentResult = classifyIntent(cleanQuery, chatHistory);
  const isBn = language === 'bn';

  if (intentResult.needsClarification && intentResult.clarificationQuestion) {
    return [{
      topicId: 'clarification',
      title: isBn ? 'অনুরোধটি স্পষ্ট করুন' : 'Clarification Required',
      category: isBn ? 'জিজ্ঞাসা' : 'Query',
      summary: intentResult.clarificationQuestion,
      steps: [],
      confidence: 90,
      formattedText: intentResult.clarificationQuestion
    }];
  }

  if (intentResult.intent && intentResult.intent !== 'UNKNOWN') {
    // Map specific intents to exact topics
    if (intentResult.intent === 'FIND_MOSQUE') {
      const topic = CAVE_GUIDE_TOPICS.find(t => t.id === 'mosque-directory-find');
      if (topic) return [formatAnswer(topic, language, 100)];
    }
    if (intentResult.intent === 'ADD_MOSQUE') {
      const topic = CAVE_GUIDE_TOPICS.find(t => t.id === 'mosque-submission-rules');
      if (topic) return [formatAnswer(topic, language, 100)];
    }

    // Search verified FAQ for exact intent match
    const matchedFaq = VERIFIED_FAQ_DATABASE.find(f => f.intent === intentResult.intent);
    if (matchedFaq) {
      const faqAnswer = isBn ? matchedFaq.verifiedAnswerBn : matchedFaq.verifiedAnswerEn;
      const matchingTopic = CAVE_GUIDE_TOPICS.find(t => t.keywords.some(k => matchedFaq.question.toLowerCase().includes(k.toLowerCase())));
      return [{
        topicId: matchingTopic?.id || 'faq-' + matchedFaq.id,
        title: isBn ? 'তথ্য ও নির্দেশিকা' : 'Guide Instruction',
        category: isBn ? 'নির্দেশিকা' : 'Guide',
        summary: faqAnswer,
        steps: [],
        actionTab: matchingTopic?.actionTab || 'home',
        actionLabel: matchingTopic ? (isBn ? matchingTopic.actionLabelBn : matchingTopic.actionLabelEn) : undefined,
        confidence: 95,
        formattedText: faqAnswer
      }];
    }
  }

  // Context-aware multi-turn resolution
  const tokens = resolveMultiTurnContext(cleanQuery, chatHistory);
  if (tokens.length === 0) return [];

  const scored = CAVE_GUIDE_TOPICS.map(topic => {
    const score = calculateTopicScore(tokens, cleanQuery, topic);
    return { topic, score };
  })
    .filter(item => item.score > 5)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    // Fallback: fuzzy search general keywords
    const categoryFallback = CAVE_GUIDE_TOPICS.filter(t => 
      t.keywords.some(k => tokens.some(tok => isFuzzyMatch(tok, k.toLowerCase())))
    );
    return categoryFallback.slice(0, 2).map(t => formatAnswer(t, language, 40));
  }

  return scored.slice(0, 3).map(item => formatAnswer(item.topic, language, item.score));
}

export function getFormattedText(topic: GuideTopic, language: 'bn' | 'en'): string {
  const isBn = language === 'bn';
  const summary = isBn ? topic.summaryBn : topic.summaryEn;
  const steps = isBn ? topic.stepsBn : topic.stepsEn;
  const proTip = isBn ? topic.proTipBn : topic.proTipEn;

  if (topic.id === 'greetings-salam-reply' || topic.id === 'cave-ai-identity' || topic.id === 'cave-companions-overview-purpose') {
    return summary;
  }

  let text = summary;
  if (steps && steps.length > 0) {
    text += `\n\n${isBn ? 'নির্দেশনা / নিয়মাবলী:' : 'Guidelines:'}\n` + steps.map(s => `• ${s}`).join('\n');
  }
  if (proTip) {
    text += `\n\n💡 ${isBn ? 'পরামর্শ' : 'Tip'}: ${proTip}`;
  }
  return text;
}

function formatAnswer(topic: GuideTopic, language: 'bn' | 'en', score: number): GuideAnswer {
  const isBn = language === 'bn';
  const formattedText = getFormattedText(topic, language);
  return {
    topicId: topic.id,
    title: isBn ? topic.titleBn : topic.titleEn,
    category: isBn ? topic.categoryTitleBn : topic.categoryTitleEn,
    summary: isBn ? topic.summaryBn : topic.summaryEn,
    steps: isBn ? topic.stepsBn : topic.stepsEn,
    proTip: isBn ? topic.proTipBn : topic.proTipEn,
    actionTab: topic.actionTab,
    actionLabel: isBn ? topic.actionLabelBn : topic.actionLabelEn,
    confidence: Math.min(100, Math.round(score * 1.5)),
    formattedText
  };
}

/**
 * Returns popular suggested prompt chips organized by feature area
 */
export function getPopularPrompts(language: 'bn' | 'en' = 'bn'): Array<{ label: string; query: string; category: string }> {
  if (language === 'bn') {
    return [
      { label: '👋 আসসালামু আলাইকুম / সালামের জবাব', query: 'আসসালামু আলাইকুম', category: 'profile' },
      { label: '🤖 Cave AI এর পরিচয় ও ক্ষমতা', query: 'তুমি কে এবং তোমার পরিচয় কি?', category: 'profile' },
      { label: '🌟 Cave Companions এর উদ্দেশ্য কী?', query: 'Cave Companions কী এবং এর মূল উদ্দেশ্য কী?', category: 'profile' },
      { label: '🕌 কেভ জার্নিতে সালাত ভেরিফিকেশন নিয়ম', query: 'কেভ জার্নি কী এবং এতে সালাত ভেরিফিকেশনের প্রয়োজন আছে কি?', category: 'prayer' },
      { label: '📍 মসজিদ জিওফেন্স ও রেডিয়াস নিয়ম', query: 'মসজিদের জিপিএস ভেরিফিকেশন ও রেডিয়াস কে সেট করে?', category: 'prayer' },
      { label: '🏪 লোকাল বনাম ন্যাশনাল মার্কেট', query: 'লোকাল মার্কেট ও ন্যাশনাল মার্কেট কী?', category: 'tokens' },
      { label: '💼 মার্চেন্ট ও রাইডার রেজিস্ট্রেশন', query: 'মার্চেন্ট বা রাইডার হিসেবে রেজিস্ট্রেশন করব কীভাবে?', category: 'profile' },
      { label: '🎁 টোকেন অর্জনের ধাপ ও নিয়মাবলী', query: 'টোকেন অর্জন ও খরচের নিয়মাবলী কি?', category: 'tokens' }
    ];
  }

  return [
    { label: '👋 Assalamu Alaikum / Greetings', query: 'Assalamu Alaikum', category: 'profile' },
    { label: '🤖 Cave AI Identity & Mission', query: 'Who are you and what is your identity?', category: 'profile' },
    { label: '🌟 Cave Companions Purpose', query: 'What is Cave Companions and its core purpose?', category: 'profile' },
    { label: '🕌 Cave Journey Verification Rules', query: 'What is Cave Journey and is GPS verification required?', category: 'prayer' },
    { label: '📍 Mosque Geofence & Admin Radius', query: 'Who sets the mosque geofence radius and rules?', category: 'prayer' },
    { label: '🏪 Local vs National Market', query: 'What is Local Market vs National Market?', category: 'tokens' },
    { label: '💼 Merchant & Rider Registration', query: 'How to register as a merchant or delivery rider?', category: 'profile' },
    { label: '🎁 Token Rules & Spending', query: 'What are token earning and spending rules?', category: 'tokens' }
  ];
}

/**
 * Single source of truth knowledge base exported for multi-turn prompt payload injection
 */
export const appKnowledgeBase = CAVE_GUIDE_TOPICS;
