/**
 * Authoritative AI Knowledge Base Data Models
 * Compiled directly from /docs/ai/ documentation files:
 * - /docs/ai/CAVE_COMPANIONS_AI_KNOWLEDGE_BASE.md
 * - /docs/ai/CAVE_COMPANIONS_AI_INTENTS.md
 * - /docs/ai/CAVE_COMPANIONS_AI_FAQ.md
 */

export interface KnowledgeSection {
  id: string;
  sectionNumber: string;
  titleBn: string;
  titleEn: string;
  summaryBn: string;
  summaryEn: string;
  navigationPathBn?: string;
  navigationPathEn?: string;
  stepsBn?: string[];
  stepsEn?: string[];
  rulesBn?: string[];
  rulesEn?: string[];
  status: 'IMPLEMENTED' | 'PARTIALLY_IMPLEMENTED' | 'PLANNED' | 'NOT_VERIFIED';
}

export interface IntentDefinition {
  name: string;
  descriptionBn: string;
  descriptionEn: string;
  feature: string;
  exampleQuestions: string[];
  keywords: string[];
  negativeKeywords?: string[];
  relevantSections: string[];
  forbiddenSections: string[];
  expectedStyle: string;
  status: 'IMPLEMENTED' | 'PARTIALLY_IMPLEMENTED' | 'PLANNED' | 'NOT_VERIFIED';
}

export interface FAQItem {
  id: string;
  question: string;
  intent: string;
  verifiedAnswerBn: string;
  verifiedAnswerEn: string;
  knowledgeSection: string;
  forbiddenTopics: string[];
  sourceReference: string;
}

export const AI_KNOWLEDGE_SECTIONS: Record<string, KnowledgeSection> = {
  'purpose': {
    id: 'purpose',
    sectionNumber: '1',
    titleBn: 'অ্যাপের উদ্দেশ্য ও ভিশন',
    titleEn: 'Purpose & Mission',
    summaryBn: 'Cave Companions হলো একটি সমন্বিত ইসলামিক লাইফস্টাইল ও ডিজিটাল পার্টনারশিপ প্ল্যাটফর্ম। এর মূল লক্ষ্য মুসলিমদের দৈনন্দিন ৫ ওয়াক্ত সালাতের ধারাবাহিকতা ধরে রাখা, কুরআন তিলাওয়াত ও সুন্নাহ অভ্যাস বজায় রাখা, কেভ সার্কেলের মাধ্যমে জবাবদিহিতা তৈরি করা এবং ফেইথ টোকেন ও হালাল কেভ মার্কেটের মাধ্যমে নেক আমলকে বাস্তব জীবনে সম্মানিত করা।',
    summaryEn: 'Cave Companions is an integrated Islamic lifestyle platform designed to foster consistent 5 daily prayers, Quran recitation, mutual spiritual accountability via Cave Circles, and rewarding good deeds with Faith Tokens redeemable in partner shops.',
    status: 'IMPLEMENTED'
  },
  'navigation': {
    id: 'navigation',
    sectionNumber: '3',
    titleBn: 'অ্যাপ নেভিগেশন ও মেনু',
    titleEn: 'App Navigation & Tabs',
    summaryBn: 'অ্যাপের মূল ৫টি বটম ট্যাব: Home (হোম), Tokens (টোকেন ওয়ালেট), Shops (পার্টনার শপ), Market (কেভ মার্কেট), Profile (প্রোফাইল)। এছাড়া All Features মেনু থেকে কুরআন, হিসনুল মুসলিম, ডিজিটাল তাসবীহ, কিবলা কম্পাস, নিকটস্থ মসজিদ, কেভ সার্কেল ও কেভ মিডিয়া অ্যাক্সেস করা যায়।',
    summaryEn: 'The app features 5 primary bottom tabs: Home, Tokens, Shops, Market, and Profile. Dedicated features like Quran, Hisnul Muslim, Tasbih, Qibla, Mosques, Circles, and Media are accessible from All Features & Profile.',
    status: 'IMPLEMENTED'
  },
  'auth': {
    id: 'auth',
    sectionNumber: '4',
    titleBn: 'রেজিস্ট্রেশন, লগইন ও পাসওয়ার্ড',
    titleEn: 'Authentication & Accounts',
    summaryBn: 'মোবাইল নম্বর ও ৬ ডিজিটের এসএমএস ওটিপি দিয়ে সাধারণ ইউজার একাউন্ট রেজিস্ট্রেশন ও লগইন করা যায়। পাসওয়ার্ড ভুলে গেলে লগইন স্ক্রিনের "পাসওয়ার্ড ভুলে গেছেন?" অপশন থেকে ওটিপি ভেরিফাই করে রিসেট করা যায়। Google এক ক্লিকে সাইন-ইন সমর্থিত। মার্চেন্ট ও রাইডার রেজিস্ট্রেশন লগইন পেজের নিচে "অন্যান্য →" বাটন থেকে করতে হয়।',
    summaryEn: 'Users register/login with mobile phone and 6-digit SMS OTP. Password recovery is handled via SMS OTP. Google Sign-In is supported. Merchant and Rider registrations are accessed from the "Others →" button at the bottom of the Login screen.',
    status: 'IMPLEMENTED'
  },
  'mosque_find': {
    id: 'mosque_find',
    sectionNumber: '5.1',
    titleBn: 'নিকটস্থ মসজিদ অনুসন্ধান',
    titleEn: 'Find Nearby Mosques',
    summaryBn: 'All Features বা হোম স্ক্রিন থেকে "Mosque Directory / নিকটস্থ মসজিদ"-এ যান। "নিকটস্থ মসজিদ খুঁজুন" বাটনে ক্লিক করলে জিপিএস লোকেশনের ভিত্তিতে সবচেয়ে কাছের অনুমোদিত মসজিদগুলোর তালিকা ও দূরত্ব দেখতে পাবেন। সার্চ বক্সে জেলা, উপজেলা বা নাম দিয়েও খোঁজা যায়।',
    summaryEn: 'Open "Mosque Directory" from All Features or Home. Tap "Find Nearby Mosques" to view approved masjids sorted by distance from your live GPS location. You can also search by district, upazila, or mosque name.',
    navigationPathBn: 'All Features ➔ Mosque Directory (নিকটস্থ মসজিদ) ➔ নিকটস্থ মসজিদ খুঁজুন',
    navigationPathEn: 'All Features ➔ Mosque Directory ➔ Find Nearby Mosques',
    status: 'IMPLEMENTED'
  },
  'mosque_details': {
    id: 'mosque_details',
    sectionNumber: '5.2',
    titleBn: 'মসজিদের বিবরণ ও ইমামের যোগাযোগ',
    titleEn: 'Mosque Details & Contact',
    summaryBn: 'Mosque Directory থেকে যেকোনো মসজিদের নামের উপর ট্যাপ করলে বিস্তারিত বিবরণ কার্ড খুলে যাবে, যেখানে মসজিদের ঠিকানা, দূরত্ব, ইমাম সাহেবের নাম ও মোবাইল নম্বর দেখতে পাবেন।',
    summaryEn: 'Tap on any mosque in the directory to view its detail modal, displaying the exact address, distance, Imam name, and phone number.',
    status: 'IMPLEMENTED'
  },
  'mosque_add': {
    id: 'mosque_add',
    sectionNumber: '5.3',
    titleBn: 'নতুন মসজিদ যুক্ত করার আবেদন',
    titleEn: 'Add New Mosque Request',
    summaryBn: 'নতুন মসজিদ যুক্ত করতে All Features ➔ Mosque Directory এ গিয়ে "Add Mosque / নতুন মসজিদ যুক্ত করুন" বাটনে চাপুন। মসজিদের নাম, ঠিকানা, গুগল ম্যাপ লোকেশন পিন, ইমাম সাহেবের নাম ও ফোন নম্বর এবং ছবি আপলোড করে সাবমিট করুন। এডমিন রিভিউ করে অনুমোদন দিলে তা তালিকায় যুক্ত হবে।',
    summaryEn: 'To submit a new mosque, go to Mosque Directory ➔ Tap "Add Mosque". Enter mosque name, address, Google Map GPS pin, Imam name & phone, and upload photos. Admin will review and approve.',
    navigationPathBn: 'All Features ➔ Mosque Directory ➔ Add Mosque (নতুন মসজিদ যুক্ত করুন)',
    navigationPathEn: 'All Features ➔ Mosque Directory ➔ Add Mosque',
    status: 'IMPLEMENTED'
  },
  'mosque_geofence': {
    id: 'mosque_geofence',
    sectionNumber: '5.4',
    titleBn: 'মসজিদ জিপিএস জিওফেন্স ও রেডিয়াস',
    titleEn: 'Mosque Geofence Radius',
    summaryBn: 'মসজিদের ভৌগোলিক ব্যাসার্ধ (Geofence Radius, যেমন ১০০ মিটার) শুধুমাত্র সুপার এডমিন এডমিন প্যানেল থেকে নির্ধারণ ও পরিবর্তন করতে পারেন। সাধারণ ব্যবহারকারী এটি পরিবর্তন করতে পারেন না। পূর্বে থাকা কিউআর কোড স্ক্যানিং ব্যবস্থাটি বর্তমানে বাতিল করা হয়েছে।',
    summaryEn: 'Mosque geofence radius (e.g. 100m) can ONLY be set and adjusted by Super Admins. Physical mosque QR code scanning is deprecated and disabled; GPS geofencing is used instead.',
    status: 'IMPLEMENTED'
  },
  'salah_journey': {
    id: 'salah_journey',
    sectionNumber: '6.1',
    titleBn: 'কেভ জার্নি (ব্যক্তিগত আমল ট্র্যাকার)',
    titleEn: 'Cave Journey (Personal Journal)',
    summaryBn: 'কেভ জার্নি হলো একটি ব্যক্তিগত আত্মউন্নয়ন ও আমল ট্র্যাকার। এখানে ব্যবহারকারী নিজে দায়িত্ব নিয়ে ৫ ওয়াক্ত সালাত, সিয়াম, কুরআন তিলাওয়াত ও জিকির ম্যানুয়ালি মার্ক করে স্ট্রিক বজায় রাখেন। এতে কোনো জিপিএস সালাত ভেরিফিকেশনের প্রয়োজন নেই।',
    summaryEn: 'Cave Journey is a self-recorded spiritual tracker. Users manually log their daily 5 prayers, fasting, Quran recitation, and adhkar for consistency streaks. No GPS verification is required for Cave Journey.',
    navigationPathBn: 'Home Progress Card ➔ কেভ জার্নি OR All Features ➔ Cave Journey',
    navigationPathEn: 'Home Progress Card ➔ Cave Journey OR All Features ➔ Cave Journey',
    status: 'IMPLEMENTED'
  },
  'salah_verification': {
    id: 'salah_verification',
    sectionNumber: '6.2',
    titleBn: 'জামাতে সালাত যাচাই (টোকেন অর্জনের জন্য)',
    titleEn: 'Prayer Verification (For Tokens)',
    summaryBn: 'ফেইথ টোকেন অর্জনের জন্য পুরুষ ব্যবহারকারীদের অনুমোদিত মসজিদে ওয়াক্ত চলাকালীন সময়ে উপস্থিত হয়ে লাইভ জিপিএস লোকেশনের মাধ্যমে সালাত ভেরিফাই করতে হয়। মা-বোনদের ক্ষেত্রে ওয়াক্তের সময়মতো অ্যাপ চেক-ইনের মাধ্যমে জামাত বোনাস সংরক্ষিত হয়।',
    summaryEn: 'To earn daily Faith Tokens, male users verify prayer attendance within approved mosque GPS geofences during waqt. Female users verify timely waqt check-ins in the app.',
    status: 'IMPLEMENTED'
  },
  'prayer_times': {
    id: 'prayer_times',
    sectionNumber: '6.3',
    titleBn: 'নামাজের সময়সূচি ও সেহরি-ইফতার',
    titleEn: 'Prayer Times & Calculation',
    summaryBn: 'হোম পেজের "Five Daily Prayers" ও "Sehri & Iftar Timetable" কার্ডে আপনার নির্বাচিত জেলার জন্য ফজর, যোহর, আসর, মাগরিব, এশা, সূর্যোদয় এবং সেহরি ও ইফতারের সঠিক সময় প্রদর্শিত হয়।',
    summaryEn: 'The Home dashboard displays real-time calculated prayer waqt times (Fajr, Dhuhr, Asr, Maghrib, Isha, Sunrise) and Sehri/Iftar timetable tailored to your Bangladesh district.',
    status: 'IMPLEMENTED'
  },
  'token_earning': {
    id: 'token_earning',
    sectionNumber: '7.1',
    titleBn: 'ফেইথ টোকেন অর্জন ও ধাপসমূহ',
    titleEn: 'Token Earning Rules & Tiers',
    summaryBn: 'প্রতিদিন জামাতে সালাত আদায়ের জন্য সর্বোচ্চ ১টি টোকেন পাওয়া যায়: ৫ ওয়াক্ত জামাতে গোল্ড টোকেন (🥇), ৪ ওয়াক্ত জামাতে সিলভার টোকেন (🥈), ৩ ওয়াক্ত জামাতে ব্রোঞ্জ টোকেন (🥉)। ৩ ওয়াক্তের কম পড়লে কোনো টোকেন দেওয়া হয় না। পূর্বের দিনের টোকেন পরদিন দুপুর ১২:০০ টা পর্যন্ত ক্লেইম করা যায়।',
    summaryEn: 'Users earn max 1 token per day based on verified prayers: 5 prayers in Jama\'ah = Gold Token (🥇), 4 prayers = Silver Token (🥈), 3 prayers = Bronze Token (🥉). Previous day tokens can be claimed until 12:00 PM next day.',
    navigationPathBn: 'Bottom Navigation ➔ Tokens (২য় ট্যাব) ➔ নিয়মাবলী',
    navigationPathEn: 'Bottom Navigation ➔ Tokens tab ➔ Token Rules',
    status: 'IMPLEMENTED'
  },
  'token_redemption': {
    id: 'token_redemption',
    sectionNumber: '7.2',
    titleBn: 'পার্টনার শপে টোকেন খরচ ও ছাড়',
    titleEn: 'Token Redemption at Partner Shops',
    summaryBn: 'প্রতিটি অর্ডারে সর্বোচ্চ ১টি টোকেন রিডিম করা যায়। পার্টনার দোকানে শপের কিউআর কোড স্ক্যান করে অথবা কেভ মার্কেটে অনলাইন কেনাকাটায় চেকআউটের সময় টোকেন সিলেক্ট করে নির্ধারিত ডিসকাউন্ট পাওয়া যায়। প্রতিটি টোকেন সিঙ্গেল-ইউজ (একবারই ব্যবহারযোগ্য)।',
    summaryEn: 'Exactly 1 token can be applied per purchase. Redeem in-store by scanning partner shop QR codes or select token discount during online Cave Market checkout. Tokens are single-use.',
    status: 'IMPLEMENTED'
  },
  'token_donation': {
    id: 'token_donation',
    sectionNumber: '7.3',
    titleBn: 'মসজিদ ফান্ডে টোকেন সাদাকাহ',
    titleEn: 'Token Mosque Sadakah Donation',
    summaryBn: 'কেনাকাটার ডিসকাউন্ট না চাইলে আপনার অর্জিত টোকেনটি "My Tokens" পেজ থেকে স্থানীয় মসজিদের উন্নয়ন ফান্ডে সরাসরি সাদাকাহ হিসেবে অনুদান করতে পারেন। এতে মসজিদে আর্থিক সহায়তা পৌঁছায় এবং প্রোফাইলে সাদাকাহ ব্যাজ যুক্ত হয়।',
    summaryEn: 'If you prefer not to use shopping discounts, donate your tokens directly as Sadakah for local mosque development funds via the "My Tokens" page.',
    navigationPathBn: 'Bottom Navigation ➔ Tokens ➔ সাদাকাহ করুন (Donate as Sadakah)',
    navigationPathEn: 'Bottom Navigation ➔ Tokens ➔ Donate as Sadakah',
    status: 'IMPLEMENTED'
  },
  'quran': {
    id: 'quran',
    sectionNumber: '8',
    titleBn: 'আল-কুরআন মাজীদ',
    titleEn: 'Al-Quran Majeed',
    summaryBn: '১১৪টি সূরার আরবি পাঠ, নির্ভরযোগ্য বাংলা ও ইংরেজি অনুবাদ, আন্তর্জাতিক কারীদের অডিও তিলাওয়াত, খতম ট্র্যাকার, তাজবীদ কালার ও বুকমার্কিং সুবিধা সমৃদ্ধ।',
    summaryEn: 'Complete 114 Surahs with Arabic text, authentic Bengali and English translations, verse-by-verse audio recitations, Khatam reading tracker, Tajweed colors, and bookmarks.',
    navigationPathBn: 'All Features ➔ আল-কুরআন OR Profile ➔ কুরআন মাজীদ',
    navigationPathEn: 'All Features ➔ Quran OR Profile ➔ Quran Majeed',
    status: 'IMPLEMENTED'
  },
  'hisnul_muslim': {
    id: 'hisnul_muslim',
    sectionNumber: '9',
    titleBn: 'হিসনুল মুসলিম (মাসনূন দু\'আ ও আজকার)',
    titleEn: 'Hisnul Muslim (Dua & Adhkar)',
    summaryBn: 'দৈনন্দিন জীবনের সকল পরিস্থিতির সহিহ হাদিসভিত্তিক দু\'আ ও সকাল-সন্ধ্যার জিকির। প্রতিটি দু\'আয় আরবি পাঠ, সহজ বাংলা উচ্চারণ, অর্থ, হাদিস রেফারেন্স ও কাউন্টার সুবিধা রয়েছে।',
    summaryEn: 'Authentic daily supplications and morning/evening Adhkar categorized by life situations, complete with Arabic text, transliteration, Bengali translation, Hadith sources, and counters.',
    navigationPathBn: 'All Features ➔ হিসনুল মুসলিম OR Profile ➔ হিসনুল মুসলিম',
    navigationPathEn: 'All Features ➔ Hisnul Muslim OR Profile ➔ Hisnul Muslim',
    status: 'IMPLEMENTED'
  },
  'tasbih': {
    id: 'tasbih',
    sectionNumber: '10',
    titleBn: 'ডিজিটাল তাসবীহ কাউন্টার',
    titleEn: 'Digital Tasbih Counter',
    summaryBn: 'ভার্চুয়াল যিকির কাউন্টার, কাস্টম আজকার তৈরির সুবিধা, টার্গেট সংখ্যা (৩৩, ১০০ বা কাস্টম), মৃদু ভাইব্রেশন ও সাউন্ড ফিডব্যাক এবং অতীত দিনের হিস্ট্রি ট্র্যাকিং।',
    summaryEn: 'Virtual bead zikr counter with custom adhkar, target lap count (33, 100, custom), haptic vibration feedback, sound clicks, and session history.',
    navigationPathBn: 'All Features ➔ ডিজিটাল তাসবীহ OR Profile ➔ Tasbih',
    navigationPathEn: 'All Features ➔ Digital Tasbih OR Profile ➔ Tasbih',
    status: 'IMPLEMENTED'
  },
  'qibla': {
    id: 'qibla',
    sectionNumber: '11',
    titleBn: 'কিবলা কম্পাস দিকনির্ণয়',
    titleEn: 'Qibla Direction Compass',
    summaryBn: 'মোবাইলের জিপিএস ও ম্যাগনেটোমিটার সেন্সর ব্যবহার করে পবিত্র কাবার নিখুঁত দিক ও ডিগ্রির মান প্রদর্শন করে। মোবাইলটি সমতলভাবে রাখলে লাইভ কিবলা দিক দেখা যায়।',
    summaryEn: 'Calculates the precise Kaaba direction using GPS coordinates and device magnetometer sensors. Hold phone flat to find accurate Qibla heading.',
    navigationPathBn: 'All Features ➔ কিবলা কম্পাস OR Profile ➔ Qibla',
    navigationPathEn: 'All Features ➔ Qibla Compass OR Profile ➔ Qibla',
    status: 'IMPLEMENTED'
  },
  'partner_shops': {
    id: 'partner_shops',
    sectionNumber: '12',
    titleBn: 'পার্টনার শপ তালিকা ও ছাড়',
    titleEn: 'Partner Shops Directory',
    summaryBn: 'নিবন্ধিত হালাল শপগুলোর তালিকা (রেস্তোরাঁ, সুপারশপ, পোশাক, ইসলামিক বই, ফার্মেসি)। জেলা ও উপজেলা ফিল্টার করে নিকটস্থ দোকানগুলোর ঠিকানা, ডিসকাউন্ট রেট ও খোলার সময় দেখে কেনাকাটায় টোকেন ছাড় নেওয়া যায়।',
    summaryEn: 'Verified partner businesses offering exclusive token discounts. Filter by district and upazila to explore local shops, opening hours, and discount rates.',
    navigationPathBn: 'Bottom Navigation ➔ Shops (৩য় ট্যাব)',
    navigationPathEn: 'Bottom Navigation ➔ Shops tab',
    status: 'IMPLEMENTED'
  },
  'cave_market': {
    id: 'cave_market',
    sectionNumber: '13',
    titleBn: 'কেভ মার্কেট ও লাইভ অর্ডার ট্র্যাকিং',
    titleEn: 'Cave Market & Order Tracking',
    summaryBn: 'লোকাল মার্কেট (কাছের দোকান থেকে রাইডারে ৩০-৬০ মিনিটে দ্রুত ডেলিভারি) এবং ন্যাশনাল মার্কেট (সারাদেশে কুরিয়ার ডেলিভারি)। কার্টে পণ্য যুক্ত করে টোকেন ডিসকাউন্টে ক্যাশ অন ডেলিভারিতে অর্ডার করা যায়। "My Orders" থেকে লাইভ ম্যাপে রাইডার ট্র্যাক করা যায়।',
    summaryEn: 'Local Market (30-60 min rider delivery) and Nationwide Market (courier delivery across Bangladesh). Apply token discounts at checkout and track delivery riders live on map via "My Orders".',
    navigationPathBn: 'Bottom Navigation ➔ Market (৪র্থ ট্যাব)',
    navigationPathEn: 'Bottom Navigation ➔ Market tab',
    status: 'IMPLEMENTED'
  },
  'merchant': {
    id: 'merchant',
    sectionNumber: '14',
    titleBn: 'মার্চেন্ট পোর্টাল ও রেজিস্ট্রেশন',
    titleEn: 'Merchant Portal & Registration',
    summaryBn: 'মার্চেন্ট রেজিস্ট্রেশন করতে লগইন স্ক্রিনের নিচে "অন্যান্য →" ➔ "মার্চেন্ট রেজিস্ট্রেশন" এ যান। দোকানের তথ্য, জিপিএস পিন, এনআইডি ও ট্রেড লাইসেন্স দিয়ে সাবমিট করুন। অনুমোদনের পর মার্চেন্ট পোর্টাল থেকে প্রোডাক্ট আপলোড, অর্ডার একসেপ্ট ও সেলস ম্যানেজ করা যায়।',
    summaryEn: 'Register as a merchant via Login screen ➔ "Others →" ➔ "Merchant Registration". Upload shop info, GPS pin, NID, and Trade License. Once approved, manage product catalog, accept orders, and track sales in Merchant Portal.',
    status: 'IMPLEMENTED'
  },
  'rider': {
    id: 'rider',
    sectionNumber: '15',
    titleBn: 'রাইডার পোর্টাল ও ডেলিভারি ডিউটি',
    titleEn: 'Rider Portal & Deliveries',
    summaryBn: 'রাইডার রেজিস্ট্রেশন লগইন স্ক্রিনের নিচে "অন্যান্য →" ➔ "রাইডার রেজিস্ট্রেশন" থেকে করতে হয়। সাইকেল বা বাইক তথ্য ও এনআইডি সাবমিট করতে হয়। অনুমোদিত রাইডাররা পোর্টাল থেকে Online হয়ে লোকাল ডেলিভারি রিকোয়েস্ট একসেপ্ট ও আয় করতে পারেন।',
    summaryEn: 'Register as a rider via Login screen ➔ "Others →" ➔ "Rider Registration". Submit vehicle info (bike/bicycle) and NID. Approved riders go Online in Rider Portal to accept local delivery dispatches and earn delivery fees.',
    status: 'IMPLEMENTED'
  },
  'cave_circles': {
    id: 'cave_circles',
    sectionNumber: '16',
    titleBn: 'কেভ সার্কেল (গ্রুপ আমল ও আমীর)',
    titleEn: 'Cave Circles (Group Streaks)',
    summaryBn: 'দ্বীনি বন্ধু ও পরিবারের সাথে হালাকা গ্রুপ খুলে একে অপরের সালাত স্ট্রিক দেখা, নেক আমলের প্রতিযোগিতা এবং পারস্পরিক পরামর্শে আমীর নির্বাচনের ব্যবস্থা।',
    summaryEn: 'Form spiritual halaqas with family & friends to track daily prayer streaks together, compete in good deeds, and elect group Amirs.',
    navigationPathBn: 'All Features ➔ কেভ সার্কেল OR Profile ➔ কেভ সার্কেল',
    navigationPathEn: 'All Features ➔ Cave Circles OR Profile ➔ Cave Circles',
    status: 'IMPLEMENTED'
  },
  'cave_media': {
    id: 'cave_media',
    sectionNumber: '17',
    titleBn: 'কেভ মিডিয়া (ইসলামিক লেকচার)',
    titleEn: 'Cave Media (Islamic Lectures)',
    summaryBn: 'আহলে সুন্নাহ ওয়াল জামাআহ্-এর আলেমদের তথ্যবহুল ইসলামিক লেকচার, আলোচনা ও দ্বীনি নসীহার ভিডিও ও অডিও সংকলন।',
    summaryEn: 'Curated library of Islamic lectures, educational videos, and spiritual reminders by reputable scholars of Ahle Sunnah Wal Jama\'ah.',
    navigationPathBn: 'All Features ➔ কেভ মিডিয়া',
    navigationPathEn: 'All Features ➔ Cave Media',
    status: 'IMPLEMENTED'
  },
  'profile_settings': {
    id: 'profile_settings',
    sectionNumber: '18',
    titleBn: 'প্রোফাইল, ভাষা ও সেটিংস',
    titleEn: 'Profile, Language & Settings',
    summaryBn: 'প্রোফাইল থেকে অর্জিত ব্যাজ ও স্ট্রিক দেখা যায়। হেডার বারের "BN / EN" বাটনে চাপ দিয়ে যেকোনো সময় ভাষা অদলবদল করা যায়। সেটিংস থেকে নোটিফিকেশন ও আজান অ্যালার্ট কাস্টমাইজ করা যায়।',
    summaryEn: 'View profile badges and streaks. Toggle instantly between Bengali and English using the BN / EN button in the top header. Customize prayer notification preferences in settings.',
    status: 'IMPLEMENTED'
  }
};
