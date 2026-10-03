/**
 * Authoritative AI Intent Definitions & 105 Source-Verified FAQ Dataset
 * Compiled directly from:
 * - /docs/ai/CAVE_COMPANIONS_AI_INTENTS.md
 * - /docs/ai/CAVE_COMPANIONS_AI_FAQ.md
 */

import { IntentDefinition, FAQItem } from './aiKnowledgeData';

export const AI_INTENTS: Record<string, IntentDefinition> = {
  'FIND_MOSQUE': {
    name: 'FIND_MOSQUE',
    feature: 'MOSQUE_DIRECTORY',
    descriptionBn: 'আশেপাশের অনুমোদিত মসজিদ খোঁজা ও দূরত্ব দেখা',
    descriptionEn: 'Locate nearby approved mosques and view distance',
    exampleQuestions: [
      'আমার আশেপাশের মসজিদ কোথায়?',
      'কাছের মসজিদ কীভাবে খুঁজবো?',
      'nearest mosque kothay?',
      'How can I find a mosque near me?',
      'মসজিদ কোথায়?',
      'নিকটস্থ মসজিদ'
    ],
    keywords: ['আশেপাশের', 'কাছের', 'নিকটস্থ', 'খুঁজব', 'খুঁজবো', 'তালিকা', 'nearest', 'nearby', 'find mosque', 'locate', 'dist', 'distance'],
    negativeKeywords: ['নতুন', 'যোগ', 'যুক্ত', 'আবেদন', 'add', 'submit', 'new', 'donation', 'সাদাকাহ', 'রেডিয়াস', 'radius'],
    relevantSections: ['mosque_find', 'mosque_details'],
    forbiddenSections: ['mosque_add', 'mosque_geofence', 'token_donation', 'merchant', 'rider'],
    expectedStyle: 'Concise GPS locator navigation',
    status: 'IMPLEMENTED'
  },
  'ADD_MOSQUE': {
    name: 'ADD_MOSQUE',
    feature: 'MOSQUE_DIRECTORY',
    descriptionBn: 'নতুন মসজিদ যুক্ত করার আবেদন জমা দেওয়া',
    descriptionEn: 'Submit request to add a new mosque to directory',
    exampleQuestions: [
      'নতুন মসজিদ কীভাবে যুক্ত করবো?',
      'আমাদের এলাকার মসজিদ অ্যাপে অ্যাড করতে চাই।',
      'How to submit a new mosque?',
      'notun mosque add korbo kivabe?',
      'নতুন মসজিদ দিতে চাই'
    ],
    keywords: ['নতুন মসজিদ', 'মসজিদ যুক্ত', 'মসজিদ অ্যাড', 'আবেদন', 'add mosque', 'submit mosque', 'new mosque', 'map picker', 'ইমামের নাম'],
    negativeKeywords: ['আশেপাশের', 'কাছের', 'নিকটস্থ', 'nearest', 'find nearby'],
    relevantSections: ['mosque_add'],
    forbiddenSections: ['mosque_find', 'token_redemption', 'quran', 'merchant'],
    expectedStyle: 'Step-by-step submission instructions',
    status: 'IMPLEMENTED'
  },
  'MOSQUE_DETAILS': {
    name: 'MOSQUE_DETAILS',
    feature: 'MOSQUE_DIRECTORY',
    descriptionBn: 'নির্দিষ্ট মসজিদের বিবরণ, ঠিকানা বা ইমামের ফোন নম্বর',
    descriptionEn: 'Specific mosque details, address, or Imam contact',
    exampleQuestions: [
      'মসজিদের ইমাম সাহেবের নম্বর কোথায় পাব?',
      'এই মসজিদের ঠিকানা কী?',
      'Mosque details & contact info.'
    ],
    keywords: ['ইমাম সাহেবের নম্বর', 'ইমামের ফোন', 'মসজিদের ঠিকানা', 'mosque details', 'imam contact'],
    relevantSections: ['mosque_details'],
    forbiddenSections: ['mosque_add', 'token_earning', 'cave_market'],
    expectedStyle: 'Direct information on accessing mosque card',
    status: 'IMPLEMENTED'
  },
  'MOSQUE_LOCATION': {
    name: 'MOSQUE_LOCATION',
    feature: 'MOSQUE_DIRECTORY',
    descriptionBn: 'মসজিদ জিপিএস রেডিয়াস ও জিওফেন্স নিয়মাবলী',
    descriptionEn: 'Mosque GPS geofence radius rules',
    exampleQuestions: [
      'মসজিদের রেডিয়াস কে নির্ধারণ করে?',
      'মসজিদের জিওফেন্স কত মিটার?',
      'Who sets mosque GPS radius?'
    ],
    keywords: ['রেডিয়াস', 'জিওফেন্স', 'radius', 'geofence', 'মিটার', 'কে নির্ধারণ করে'],
    relevantSections: ['mosque_geofence'],
    forbiddenSections: ['token_donation', 'cave_media'],
    expectedStyle: 'Explain Admin-only configuration role',
    status: 'IMPLEMENTED'
  },
  'PRAYER_TIME': {
    name: 'PRAYER_TIME',
    feature: 'SALAT',
    descriptionBn: 'ওয়াক্তভিত্তিক নামাজের সময়সূচি ও সেহরি-ইফতার',
    descriptionEn: 'Waqt prayer times and Sehri/Iftar timetable',
    exampleQuestions: [
      'আজকের আসরের ওয়াক্ত কয়টায়?',
      'সেহরি ও ইফতারের সময়সূচি কোথায় পাব?',
      'Prayer times for Dhaka district.',
      'namajer somoy kothay dekhbo?'
    ],
    keywords: ['ওয়াক্ত', 'নামাজের সময়', 'কয়টায়', 'সেহরি', 'ইফতার', 'prayer time', 'sehri', 'iftar', 'fajr time', 'asr time', 'maghrib time'],
    relevantSections: ['prayer_times'],
    forbiddenSections: ['merchant', 'rider'],
    expectedStyle: 'Direct reference to Home dashboard cards',
    status: 'IMPLEMENTED'
  },
  'SALAT_VERIFICATION': {
    name: 'SALAT_VERIFICATION',
    feature: 'SALAT',
    descriptionBn: 'টোকেন অর্জনের জন্য মসজিদে জামাত যাচাই ও জিপিএস চেক',
    descriptionEn: 'Congregational prayer GPS verification for tokens',
    exampleQuestions: [
      'জামাতে সালাত কীভাবে ভেরিফাই করব?',
      'জিপিএস ভেরিফিকেশন কীভাবে কাজ করে?',
      'How does prayer verification work?',
      'salat verification kivabe hoy?',
      'মসজিদে QR কোড স্ক্যান করে সালাত ভেরিফিকেশন করা যায়?'
    ],
    keywords: ['সালাত ভেরিফাই', 'জামাত ভেরিফিকেশন', 'জিপিএস ভেরিফিকেশন', 'salat verification', 'qr কোড স্ক্যান', 'qr scan'],
    negativeKeywords: ['কেভ জার্নি', 'ম্যানুয়াল', 'self log'],
    relevantSections: ['salah_verification', 'mosque_geofence'],
    forbiddenSections: ['salah_journey', 'mosque_add', 'cave_market'],
    expectedStyle: 'Explain GPS geofence matching and QR deprecation',
    status: 'IMPLEMENTED'
  },
  'SALAT_HISTORY': {
    name: 'SALAT_HISTORY',
    feature: 'SALAT',
    descriptionBn: 'কেভ জার্নি (ব্যক্তিগত আমল ও স্ট্রিক ট্র্যাকার)',
    descriptionEn: 'Cave Journey self-recorded prayer journal and streaks',
    exampleQuestions: [
      'কেভ জার্নিতে সালাত কীভাবে লগ করবো?',
      'আমার নামাজের স্ট্রিক কোথায় দেখব?',
      'Cave journey self-logging guide.',
      'নামাযের সফর বা আমল ট্র্যাকার কী?',
      'কেভ জার্নিতে সালাত লগ করতে কি জিপিএস ভেরিফিকেশন লাগে?'
    ],
    keywords: ['কেভ জার্নি', 'জার্নি', 'আমল ট্র্যাকার', 'স্ট্রিক', 'ম্যানুয়াল', 'cave journey', 'self log', 'tahajjud', 'নফল'],
    relevantSections: ['salah_journey'],
    forbiddenSections: ['salah_verification', 'merchant', 'admin'],
    expectedStyle: 'Explain manual self-recording journal without GPS',
    status: 'IMPLEMENTED'
  },
  'TOKEN_BALANCE': {
    name: 'TOKEN_BALANCE',
    feature: 'TOKENS',
    descriptionBn: 'টোকেন ব্যালেন্স ও ওয়ালেট দেখা',
    descriptionEn: 'Check token balance and history',
    exampleQuestions: [
      'আমার টোকেন ব্যালেন্স কোথায় দেখব?',
      'কয়টা গোল্ড টোকেন আছে কীভাবে জানব?',
      'Where to check my token wallet?',
      'token balance kothay pabo?'
    ],
    keywords: ['টোকেন ব্যালেন্স', 'টোকেন ওয়ালেট', 'token balance', 'token wallet', 'টোকেন হিস্ট্রি'],
    negativeKeywords: ['অর্জন', 'earn', 'খরচ', 'spend', 'দান', 'donate'],
    relevantSections: ['token_earning', 'navigation'],
    forbiddenSections: ['merchant', 'quran'],
    expectedStyle: 'Direct to My Tokens bottom navigation tab',
    status: 'IMPLEMENTED'
  },
  'TOKEN_EARNING': {
    name: 'TOKEN_EARNING',
    feature: 'TOKENS',
    descriptionBn: 'ফেইথ টোকেন অর্জনের নিয়মাবলী ও ধাপসমূহ',
    descriptionEn: 'Faith Token earning tiers and rules',
    exampleQuestions: [
      'Gold token কীভাবে পাব?',
      'Silver token কীভাবে পাব?',
      'Bronze token কীভাবে পাব?',
      'টোকেন কীভাবে অর্জন হয়?',
      'How to earn faith tokens?',
      'token kivabe earn korbo?',
      'প্রতিদিন কয়টি টোকেন পাওয়া যায়?'
    ],
    keywords: ['gold token', 'silver token', 'bronze token', 'টোকেন কীভাবে পাব', 'টোকেন অর্জন', 'টোকেন কীভাবে পাওয়া যায়', 'earn token', 'টোকেন নিয়ম'],
    negativeKeywords: ['খরচ', 'ডিসকাউন্ট', 'দোকানে', 'দান', 'সাদাকাহ', 'spend', 'redeem', 'donate'],
    relevantSections: ['token_earning'],
    forbiddenSections: ['token_donation', 'token_redemption', 'mosque_add', 'merchant'],
    expectedStyle: 'Clear breakdown of 5/4/3 waqt rules & max 1 token/day',
    status: 'IMPLEMENTED'
  },
  'TOKEN_REDEMPTION': {
    name: 'TOKEN_REDEMPTION',
    feature: 'TOKENS',
    descriptionBn: 'পার্টনার শপে বা মার্কেটে টোকেন খরচ করে ডিসকাউন্ট পাওয়া',
    descriptionEn: 'Redeem tokens for store discounts',
    exampleQuestions: [
      'পার্টনার শপে টোকেন কীভাবে খরচ করব?',
      'টোকেন দিয়ে ডিসকাউন্ট কীভাবে পাব?',
      'How to redeem tokens at partner stores?',
      'token spend korbo kivabe?',
      'Token দিয়ে shop থেকে কীভাবে নেব?'
    ],
    keywords: ['টোকেন খরচ', 'টোকেন দিয়ে ডিসকাউন্ট', 'টোকেন রিডিম', 'redeem token', 'spend token', 'টোকেন দিয়ে কেনাকাটা', 'ছাড় পাব'],
    negativeKeywords: ['অর্জন', 'earn', 'দান', 'সাদাকাহ', 'donate'],
    relevantSections: ['token_redemption', 'partner_shops'],
    forbiddenSections: ['token_donation', 'token_earning', 'mosque_add'],
    expectedStyle: 'Explain 1 token per purchase rule and QR redemption',
    status: 'IMPLEMENTED'
  },
  'TOKEN_DONATION': {
    name: 'TOKEN_DONATION',
    feature: 'TOKENS',
    descriptionBn: 'মসজিদ ফান্ডে টোকেন সাদাকাহ হিসেবে দান করা',
    descriptionEn: 'Donate tokens directly to local mosque welfare funds',
    exampleQuestions: [
      'Token দিয়ে মসজিদে দান করা যাবে?',
      'টোকেন সাদাকাহ করব কীভাবে?',
      'Can I donate my tokens to a mosque?',
      'token mosque sadakah kivabe dibo?',
      'মসজিদে token দিতে চাই'
    ],
    keywords: ['টোকেন দান', 'মসজিদে দান', 'টোকেন সাদাকাহ', 'donate token', 'mosque sadakah', 'দান করা যাবে'],
    negativeKeywords: ['কেনাকাটা', 'ডিসকাউন্ট', 'দোকানে', 'spend', 'redeem'],
    relevantSections: ['token_donation'],
    forbiddenSections: ['token_redemption', 'partner_shops', 'rider'],
    expectedStyle: 'Direct guide to My Tokens ➔ Donate as Sadakah',
    status: 'IMPLEMENTED'
  },
  'QURAN': {
    name: 'QURAN',
    feature: 'ISLAMIC_TOOLS',
    descriptionBn: 'আল-কুরআন মাজীদ তিলাওয়াত, অডিও, অনুবাদ ও খতম ট্র্যাকার',
    descriptionEn: 'Quran recitation, audio, translation, and Khatam tracker',
    exampleQuestions: [
      'Quran কোথায় পাব?',
      'কুরআন তিলাওয়াত ও অডিও কীভাবে শুনব?',
      'How to read Quran with Bengali translation?',
      'quran majid kothay ase?',
      'কুরআন কোথায়?'
    ],
    keywords: ['quran', 'কুরআন', 'কোরআন', 'সূরা', 'আয়াত', 'তিলাওয়াত', 'খতম', 'surah', 'ayah', 'recitation', 'khatam', 'tajweed'],
    negativeKeywords: ['ব্যাখ্যা', 'তাফসির', 'tafsir'],
    relevantSections: ['quran', 'navigation'],
    forbiddenSections: ['token_earning', 'cave_market', 'merchant'],
    expectedStyle: 'Direct navigation to Quran Majeed module',
    status: 'IMPLEMENTED'
  },
  'TAFSIR': {
    name: 'TAFSIR',
    feature: 'ISLAMIC_TOOLS',
    descriptionBn: 'কুরআনের আয়াতের তাফসির ও ব্যাখ্যা',
    descriptionEn: 'Quran verse explanation and Tafsir',
    exampleQuestions: [
      'কুরআনের তাফসির আছে কি?',
      'Quran-এর আয়াতের ব্যাখ্যা চাই',
      'Surah Baqarah tafsir.'
    ],
    keywords: ['তাফসির', 'ব্যাখ্যা', 'তাফসীর', 'tafsir', 'explanation'],
    relevantSections: ['quran'],
    forbiddenSections: ['token_earning', 'rider'],
    expectedStyle: 'Clarify current verified translation availability',
    status: 'PARTIALLY_IMPLEMENTED'
  },
  'HADITH': {
    name: 'HADITH',
    feature: 'ISLAMIC_TOOLS',
    descriptionBn: 'ডেইলি নসীহা ও হাদিস অনুপ্রেরণা',
    descriptionEn: 'Daily Nasiha and Hadith inspiration',
    exampleQuestions: [
      'ডেইলি হাদিস কোথায় দেখতে পাব?',
      'Daily Nasiha hadith inspiration.'
    ],
    keywords: ['হাদিস', 'নসীহা', 'hadith', 'nasiha', 'daily nasiha'],
    relevantSections: ['navigation', 'purpose'],
    forbiddenSections: ['merchant', 'rider'],
    expectedStyle: 'Point to Home dashboard Daily Nasiha card',
    status: 'IMPLEMENTED'
  },
  'HISNUL_MUSLIM': {
    name: 'HISNUL_MUSLIM',
    feature: 'ISLAMIC_TOOLS',
    descriptionBn: 'হিসনুল মুসলিম সহিহ দু\'আ ও সকাল-সন্ধ্যার জিকির',
    descriptionEn: 'Authentic daily supplications and morning-evening Adhkar',
    exampleQuestions: [
      'সকাল সন্ধ্যার জিকির কোথায় পাব?',
      'হিসনুল মুসলিম দুআ কীভাবে খুঁজব?',
      'Morning & Evening Adhkar guide.',
      'hisnul muslim dua kothay pabo?',
      'দোয়া কোথায় পাব'
    ],
    keywords: ['হিসনুল মুসলিম', 'দুআ', 'দোয়া', 'দোআ', 'জিকির', 'সকাল সন্ধ্যা', 'hisnul muslim', 'dua', 'adhkar', 'supplication', 'masnoon'],
    relevantSections: ['hisnul_muslim', 'navigation'],
    forbiddenSections: ['token_earning', 'cave_market', 'rider'],
    expectedStyle: 'Guide to Hisnul Muslim categories and search',
    status: 'IMPLEMENTED'
  },
  'TASBIH': {
    name: 'TASBIH',
    feature: 'ISLAMIC_TOOLS',
    descriptionBn: 'ডিজিটাল তাসবীহ কাউন্টার ও কাস্টম যিকির',
    descriptionEn: 'Digital Tasbih counter and vibration features',
    exampleQuestions: [
      'ডিজিটাল তাসবীহ কীভাবে ব্যবহার করব?',
      'তসবিহ গণনা ও ভাইব্রেশন অন করব কীভাবে?',
      'How to use digital tasbih?',
      'tasbih counter kivabe chalabo?'
    ],
    keywords: ['তাসবীহ', 'তসবিহ', 'কাউন্টার', 'যিকির গণনা', 'ভাইব্রেশন', 'tasbih', 'counter', 'vibration', 'zikr counter'],
    relevantSections: ['tasbih', 'navigation'],
    forbiddenSections: ['partner_shops', 'admin'],
    expectedStyle: 'Direct guide to opening Digital Tasbih modal',
    status: 'IMPLEMENTED'
  },
  'QIBLA': {
    name: 'QIBLA',
    feature: 'ISLAMIC_TOOLS',
    descriptionBn: 'কিবলা কম্পাস ও কাবার দিকনির্ণয়',
    descriptionEn: 'Qibla Compass Kaaba direction heading',
    exampleQuestions: [
      'কিবলা কোন দিকে কীভাবে বুঝব?',
      'কিবলা কম্পাস কীভাবে চালু করব?',
      'How to find Qibla direction?',
      'qibla compass kothay?'
    ],
    keywords: ['কিবলা', 'কিবলা কম্পাস', 'কাবার দিক', 'দিকনির্ণয়', 'qibla', 'compass', 'kaaba direction'],
    relevantSections: ['qibla', 'navigation'],
    forbiddenSections: ['cave_market', 'merchant'],
    expectedStyle: 'Direct guide to launching Qibla compass',
    status: 'IMPLEMENTED'
  },
  'PARTNER_SHOP': {
    name: 'PARTNER_SHOP',
    feature: 'COMMERCE',
    descriptionBn: 'অনুমোদিত পার্টনার শপ তালিকা ও অফার',
    descriptionEn: 'Verified partner merchant directory and in-store discounts',
    exampleQuestions: [
      'পার্টনার শপ কোথায় পাব?',
      'আমাদের এলাকার পার্টনার দোকান কীভাবে খুঁজব?',
      'How to find partner shops?',
      'partner shop kothay ase?'
    ],
    keywords: ['পার্টনার শপ', 'পার্টনার দোকান', 'শপ তালিকা', 'partner shop', 'partner store', 'দোকানের তালিকা'],
    negativeKeywords: ['অনলাইন অর্ডার', 'হোম ডেলিভারি', 'রাইডার ট্র্যাকিং'],
    relevantSections: ['partner_shops', 'navigation'],
    forbiddenSections: ['mosque_add', 'hisnul_muslim'],
    expectedStyle: 'Guide to Bottom Navigation Shops tab and location filters',
    status: 'IMPLEMENTED'
  },
  'CAVE_MARKET': {
    name: 'CAVE_MARKET',
    feature: 'COMMERCE',
    descriptionBn: 'কেভ মার্কেট (লোকাল ও ন্যাশনাল মার্কেটপ্লেস)',
    descriptionEn: 'Cave Market Local and Nationwide marketplace',
    exampleQuestions: [
      'লোকাল মার্কেট ও ন্যাশনাল মার্কেট কী?',
      'কেভ মার্কেটে কীভাবে অর্ডার করব?',
      'How does Cave Market work?',
      'market theke kivabe kinbo?'
    ],
    keywords: ['কেভ মার্কেট', 'লোকাল মার্কেট', 'ন্যাশনাল মার্কেট', 'cave market', 'local market', 'nationwide market', 'পণ্য কেনা'],
    relevantSections: ['cave_market', 'navigation'],
    forbiddenSections: ['mosque_add', 'tasbih'],
    expectedStyle: 'Explain Local (30-60m rider) vs Nationwide (courier) ordering',
    status: 'IMPLEMENTED'
  },
  'ORDER': {
    name: 'ORDER',
    feature: 'COMMERCE',
    descriptionBn: 'পণ্য অর্ডার করা ও মাই অর্ডারস স্ট্যাটাস দেখা',
    descriptionEn: 'Place products order and check order status',
    exampleQuestions: [
      'পণ্য কীভাবে কিনব?',
      'আমার অর্ডার কোথায় দেখব?',
      'How to place an order and check status?',
      'order kivabe dibo?'
    ],
    keywords: ['অর্ডার', 'পণ্য কিনব', 'কার্ট', 'মাই অর্ডারস', 'order', 'cart', 'my orders', 'buy now'],
    relevantSections: ['cave_market'],
    forbiddenSections: ['rider', 'mosque_add'],
    expectedStyle: 'Step-by-step ordering and My Orders guide',
    status: 'IMPLEMENTED'
  },
  'DELIVERY': {
    name: 'DELIVERY',
    feature: 'COMMERCE',
    descriptionBn: 'ডেলিভারি ট্র্যাকিং ও রাইডার লাইভ ম্যাপ',
    descriptionEn: 'Delivery rider live tracking on map and ETA',
    exampleQuestions: [
      'অর্ডার কীভাবে ট্র্যাক করব?',
      'রাইডার কত দূরে আছে কীভাবে দেখব?',
      'How to track my rider live on map?',
      'rider tracking kivabe dekhbo?'
    ],
    keywords: ['অর্ডার ট্র্যাক', 'রাইডার ট্র্যাক', 'ডেলিভারি কত দূরে', 'লাইভ ম্যাপ', 'eta', 'track rider', 'track order'],
    relevantSections: ['cave_market'],
    forbiddenSections: ['merchant', 'quran'],
    expectedStyle: 'Guide to My Orders live rider tracking map',
    status: 'IMPLEMENTED'
  },
  'MERCHANT': {
    name: 'MERCHANT',
    feature: 'MERCHANT_PORTAL',
    descriptionBn: 'মার্চেন্ট রেজিস্ট্রেশন ও মার্চেন্ট পোর্টাল পরিচালনা',
    descriptionEn: 'Merchant registration wizard and shop portal management',
    exampleQuestions: [
      'Merchant account কীভাবে খুলবো?',
      'মার্চেন্ট হব কীভাবে?',
      'How to register as a merchant?',
      'merchant registration kivabe korbo?',
      'দোকানদার হিসেবে যুক্ত হব কীভাবে?'
    ],
    keywords: ['মার্চেন্ট', 'দোকানদার', 'মার্চেন্ট রেজিস্ট্রেশন', 'merchant', 'merchant portal', 'মার্চেন্ট একাউন্ট'],
    negativeKeywords: ['রাইডার', 'rider'],
    relevantSections: ['merchant', 'auth'],
    forbiddenSections: ['rider', 'mosque_find', 'quran'],
    expectedStyle: 'Guide to Login screen ➔ Others ➔ Merchant Registration',
    status: 'IMPLEMENTED'
  },
  'RIDER': {
    name: 'RIDER',
    feature: 'RIDER_PORTAL',
    descriptionBn: 'ডেলিভারি রাইডার রেজিস্ট্রেশন ও রাইডার পোর্টাল ডিউটি',
    descriptionEn: 'Delivery rider registration and portal operations',
    exampleQuestions: [
      'Rider হিসেবে কীভাবে register করবো?',
      'রাইডার হব কীভাবে?',
      'How to become a delivery rider?',
      'rider login / registration kivabe kore?'
    ],
    keywords: ['রাইডার', 'ডেলিভারি বয়', 'রাইডার রেজিস্ট্রেশন', 'rider', 'rider portal', 'delivery rider'],
    negativeKeywords: ['মার্চেন্ট', 'merchant'],
    relevantSections: ['rider', 'auth'],
    forbiddenSections: ['merchant', 'mosque_add'],
    expectedStyle: 'Guide to Login screen ➔ Others ➔ Rider Registration',
    status: 'IMPLEMENTED'
  },
  'ADMIN': {
    name: 'ADMIN',
    feature: 'ADMIN',
    descriptionBn: 'এডমিন অনুমোদন প্রক্রিয়া ও রিভিউ পলিসি',
    descriptionEn: 'Admin review workflows and policies',
    exampleQuestions: [
      'এডমিন অনুমোদন কীভাবে পাব?',
      'Admin approval process for mosques/merchants.'
    ],
    keywords: ['এডমিন অনুমোদন', 'admin approval', 'এডমিন রিভিউ'],
    relevantSections: ['auth', 'mosque_add', 'merchant'],
    forbiddenSections: [],
    expectedStyle: 'High-level explanation of admin approval timelines',
    status: 'IMPLEMENTED'
  },
  'PROFILE': {
    name: 'PROFILE',
    feature: 'PROFILE',
    descriptionBn: 'প্রোফাইল সেটিংস, ব্যাজ ও ভাষা পরিবর্তন',
    descriptionEn: 'User profile management, badges, and language settings',
    exampleQuestions: [
      'প্রোফাইল কীভাবে এডিট করব?',
      'ভাষা পরিবর্তন করব কীভাবে?',
      'How to switch language in profile?'
    ],
    keywords: ['প্রোফাইল', 'ভাষা পরিবর্তন', 'বাংলা থেকে ইংরেজি', 'profile', 'switch language', 'change language', 'settings'],
    relevantSections: ['profile_settings', 'navigation'],
    forbiddenSections: [],
    expectedStyle: 'Direct guide to Profile tab and language toggle',
    status: 'IMPLEMENTED'
  },
  'ACCOUNT': {
    name: 'ACCOUNT',
    feature: 'AUTH',
    descriptionBn: 'সাধারণ ইউজার একাউন্ট তৈরি ও গুগল লগইন',
    descriptionEn: 'User signup and Google login',
    exampleQuestions: [
      'নতুন একাউন্ট কীভাবে খুলব?',
      'Account খুলবো',
      'How to create a user account?',
      'account kivabe khulbo?'
    ],
    keywords: ['নতুন একাউন্ট', 'রেজিস্ট্রেশন', 'সাইনআপ', 'create account', 'register account', 'signup', 'গুগল লগইন'],
    negativeKeywords: ['মার্চেন্ট', 'রাইডার', 'merchant', 'rider', 'পাসওয়ার্ড ভুলে', 'forgot password'],
    relevantSections: ['auth'],
    forbiddenSections: ['merchant', 'rider'],
    expectedStyle: 'Guide to User registration form and SMS OTP',
    status: 'IMPLEMENTED'
  },
  'PASSWORD': {
    name: 'PASSWORD',
    feature: 'AUTH',
    descriptionBn: 'পাসওয়ার্ড ভুলে যাওয়া ও ওটিপি দিয়ে রিসেট',
    descriptionEn: 'Password recovery and SMS OTP reset',
    exampleQuestions: [
      'আমার password ভুলে গেছি',
      'পাসওয়ার্ড কীভাবে রিসেট করব?',
      'Forgot my password, how to reset?',
      'password vule gesi ki korbo?',
      'Password ভুলে গেছি'
    ],
    keywords: ['পাসওয়ার্ড ভুলে গেছি', 'password ভুলে গেছি', 'পাসওয়ার্ড রিসেট', 'forgot password', 'reset password', 'password recovery'],
    relevantSections: ['auth'],
    forbiddenSections: ['mosque_add', 'cave_market'],
    expectedStyle: 'Step-by-step password recovery via SMS OTP',
    status: 'IMPLEMENTED'
  },
  'OTP': {
    name: 'OTP',
    feature: 'AUTH',
    descriptionBn: 'এসএমএস ওটিপি কোড ও ভেরিফিকেশন সমস্যা',
    descriptionEn: 'SMS OTP code verification and resend',
    exampleQuestions: [
      'OTP কোড আসছে না কেন?',
      'ওটিপি ভেরিফিকেশন কীভাবে করব?',
      'SMS OTP verification help.'
    ],
    keywords: ['otp', 'ওটিপি', 'ভেরিফিকেশন কোড', 'otp code', 'sms code', 'কোড আসছে না'],
    relevantSections: ['auth'],
    forbiddenSections: ['cave_market'],
    expectedStyle: 'Explain 6-digit SMS OTP, countdown, and resend button',
    status: 'IMPLEMENTED'
  },
  'CAVE_MEDIA': {
    name: 'CAVE_MEDIA',
    feature: 'MEDIA',
    descriptionBn: 'কেভ মিডিয়া ইসলামিক লেকচার ও আলোচনা',
    descriptionEn: 'Cave Media authentic Islamic lectures and videos',
    exampleQuestions: [
      'ইসলামিক লেকচার ও আলোচনা কোথায় পাব?',
      'কেভ মিডিয়া কী?',
      'Where to watch Islamic lectures?',
      'cave media kothay?'
    ],
    keywords: ['কেভ মিডিয়া', 'ইসলামিক লেকচার', 'ভিডিও আলোচনা', 'cave media', 'islamic video', 'lectures'],
    relevantSections: ['cave_media', 'navigation'],
    forbiddenSections: ['token_earning', 'merchant'],
    expectedStyle: 'Direct navigation to All Features ➔ Cave Media',
    status: 'IMPLEMENTED'
  },
  'APP_NAVIGATION': {
    name: 'APP_NAVIGATION',
    feature: 'NAVIGATION',
    descriptionBn: 'অ্যাপের সাধারণ মেনু ও ফিচার ন্যাভিগেশন',
    descriptionEn: 'General app navigation and feature routing',
    exampleQuestions: [
      'All Features কোথায় পাব?',
      'হোম পেজে কীভাবে ফিরে যাব?',
      'Where is the main menu?',
      'কেভ সার্কেল (Cave Circle) কী এবং এতে কীভাবে যোগ দেব?'
    ],
    keywords: ['all features', 'মেনু', 'কোথায় পাব', 'নেভিগেশন', 'main menu', 'হোম পেজ', 'সার্কেল'],
    relevantSections: ['navigation', 'cave_circles'],
    forbiddenSections: [],
    expectedStyle: 'Clear direct navigation paths',
    status: 'IMPLEMENTED'
  },
  'GENERAL_APP_QUESTION': {
    name: 'GENERAL_APP_QUESTION',
    feature: 'GENERAL',
    descriptionBn: 'সালাম, অভিবাদন, Cave AI এর পরিচয় ও Cave Companions এর উদ্দেশ্য',
    descriptionEn: 'Salam greetings, Cave AI identity, and Cave Companions purpose',
    exampleQuestions: [
      'আসসালামু আলাইকুম',
      'সালাম',
      'তুমি কে এবং তোমার কাজ কি?',
      'Cave Companions এর মূল লক্ষ্য ও উদ্দেশ্য কী?',
      'Who are you and what is Cave Companions?'
    ],
    keywords: ['সালাম', 'আসসালামু আলাইকুম', 'তুমি কে', 'তোমার পরিচয়', 'কেভ এআই', 'উদ্দেশ্য', 'লক্ষ্য', 'salam', 'assalamu alaikum', 'who are you', 'purpose', 'cave companions কি'],
    relevantSections: ['purpose'],
    forbiddenSections: [],
    expectedStyle: 'Polite Islamic greeting reply, clear assistant identity, and concise mission summary',
    status: 'IMPLEMENTED'
  },
  'GENERAL_ISLAMIC_QUESTION': {
    name: 'GENERAL_ISLAMIC_QUESTION',
    feature: 'GENERAL',
    descriptionBn: 'সাধারণ ইসলামিক প্রশ্ন ও আমলের গুরুত্ব',
    descriptionEn: 'General Islamic reminders and worship importance',
    exampleQuestions: [
      'নামাজের গুরুত্ব কী?',
      'মিসওয়াক করার সুন্নাত কী?'
    ],
    keywords: ['নামাজের গুরুত্ব', 'সুন্নাত', 'ইসলামিক নিয়ম'],
    relevantSections: ['purpose'],
    forbiddenSections: [],
    expectedStyle: 'Authentic reminder with advice to consult scholars for fatwas',
    status: 'IMPLEMENTED'
  },
  'UNKNOWN': {
    name: 'UNKNOWN',
    feature: 'UNKNOWN',
    descriptionBn: 'অ্যাপের পরিধির বাইরের অপ্রাসঙ্গিক প্রশ্ন',
    descriptionEn: 'Out-of-domain questions outside Cave Companions scope',
    exampleQuestions: [
      'আজকের আবহাওয়া কেমন?',
      'Stock market price.'
    ],
    keywords: ['আবহাওয়া', 'শেয়ার বাজার', 'ফুটবল খেলা', 'ক্রিকেট স্কোর', 'weather', 'stock price'],
    relevantSections: [],
    forbiddenSections: [],
    expectedStyle: 'Polite notice that Cave AI is dedicated specifically to Cave Companions',
    status: 'IMPLEMENTED'
  }
};

/**
 * 105 Source-Verified Evaluation FAQ Dataset
 */
export const VERIFIED_FAQ_DATABASE: FAQItem[] = [
  {
    id: 'FAQ-001',
    question: 'আমি কীভাবে আমার আশেপাশের মসজিদ খুঁজে পাব?',
    intent: 'FIND_MOSQUE',
    verifiedAnswerBn: 'আপনার আশেপাশের অনুমোদিত মসজিদ খুঁজে পেতে নিচের মেনু বা All Features থেকে "Mosque Directory / নিকটস্থ মসজিদ"-এ যান। এরপর "নিকটস্থ মসজিদ খুঁজুন" বাটনে চাপ দিলে আপনার বর্তমান জিপিএস লোকেশনের সাপেক্ষে কাছের মসজিদগুলোর তালিকা ও দূরত্ব দেখতে পাবেন।',
    verifiedAnswerEn: 'To find nearby approved mosques, go to "Mosque Directory" from All Features or Home. Tap "Find Nearby Mosques" to view all approved mosques sorted by distance from your current GPS location.',
    knowledgeSection: 'mosque_find',
    forbiddenTopics: ['add_mosque', 'admin_approval', 'geofence_configuration', 'qr_scan', 'token_donation', 'merchant', 'rider'],
    sourceReference: 'src/components/MosqueDirectoryModal.tsx'
  },
  {
    id: 'FAQ-002',
    question: 'নতুন মসজিদ কীভাবে যুক্ত করবো?',
    intent: 'ADD_MOSQUE',
    verifiedAnswerBn: 'নতুন কোনো মসজিদ তালিকায় যুক্ত করতে All Features ➔ "Mosque Directory" এ গিয়ে "Add Mosque / নতুন মসজিদ যুক্ত করুন" বাটনে ক্লিক করুন। এরপর মসজিদের নাম, ঠিকানা, গুগল ম্যাপ পিন দিয়ে সঠিক লোকেশন, ইমাম সাহেবের নাম ও ফোন নম্বর এবং মসজিদের ছবি আপলোড করে সাবমিট করুন। এডমিন ভেরিফাই করে তা অনুমোদন দেবে।',
    verifiedAnswerEn: 'To submit a new mosque, go to All Features ➔ Mosque Directory and tap "Add Mosque". Fill in mosque name, address, Google Map location pin, Imam name & phone, and upload photos. Admin will review and approve.',
    knowledgeSection: 'mosque_add',
    forbiddenTopics: ['mosque_find', 'token_redemption', 'quran', 'merchant'],
    sourceReference: 'src/components/MosqueSubmissionModal.tsx'
  },
  {
    id: 'FAQ-003',
    question: 'Gold token কীভাবে পাব?',
    intent: 'TOKEN_EARNING',
    verifiedAnswerBn: 'সারাদিনের ৫টি ওয়াক্তের সালাত (ফজর, যোহর/জুমা, আসর, মাগরিব ও এশা) অনুমোদিত মসজিদে জামাতে আদায় করে জিপিএস ভেরিফিকেশন সম্পন্ন করলে আপনি দিনশেষে ১টি গোল্ড টোকেন (Gold Token) রিওয়ার্ড হিসেবে পাবেন।',
    verifiedAnswerEn: 'Complete all 5 daily prayers (Fajr, Dhuhr/Jumuah, Asr, Maghrib, Isha) in Jama\'ah at an approved mosque with GPS verification to earn 1 Gold Token at the end of the day.',
    knowledgeSection: 'token_earning',
    forbiddenTopics: ['token_donation', 'token_redemption', 'add_mosque', 'merchant'],
    sourceReference: 'src/components/TokenRulesView.tsx'
  },
  {
    id: 'FAQ-004',
    question: 'Token দিয়ে মসজিদে দান করা যাবে?',
    intent: 'TOKEN_DONATION',
    verifiedAnswerBn: 'হ্যাঁ, আপনি কেনাকাটার ডিসকাউন্টে টোকেন ব্যবহার না করে সরাসরি মসজিদ উন্নয়ন ফান্ডে সাদাকাহ হিসেবে দান করতে পারেন। এর জন্য নিচের মেনু থেকে "My Tokens" ট্যাবে যান এবং আপনার বৈধ টোকেনের পাশে থাকা "সাদাকাহ করুন (Donate as Sadakah)" অপশন বেছে নিন।',
    verifiedAnswerEn: 'Yes, if you prefer not to use shopping discounts, you can donate your tokens directly to local mosque welfare funds. Go to "My Tokens" from the bottom navigation and select "Donate as Sadakah".',
    knowledgeSection: 'token_donation',
    forbiddenTopics: ['token_redemption', 'partner_shops', 'rider'],
    sourceReference: 'src/components/MyTokenView.tsx'
  },
  {
    id: 'FAQ-005',
    question: 'Quran কোথায় পাব?',
    intent: 'QURAN',
    verifiedAnswerBn: 'কুরআন তিলাওয়াত করতে All Features থেকে "আল-কুরআন" অথবা Profile ট্যাব থেকে "কুরআন মাজীদ"-এ ট্যাপ করুন। এখানে ১১৪টি সূরার আরবি পাঠ, বাংলা ও ইংরেজি অনুবাদ, অডিও তিলাওয়াত এবং খতম ট্র্যাকার পাবেন।',
    verifiedAnswerEn: 'To read the Quran, navigate to All Features ➔ "Al-Quran" or Profile ➔ "Quran Majeed". It includes all 114 Surahs with Arabic text, Bengali & English translations, audio recitation, and Khatam tracker.',
    knowledgeSection: 'quran',
    forbiddenTopics: ['token_earning', 'cave_market', 'merchant'],
    sourceReference: 'src/services/quranService.ts'
  },
  {
    id: 'FAQ-006',
    question: 'আমার password ভুলে গেছি',
    intent: 'PASSWORD',
    verifiedAnswerBn: 'পাসওয়ার্ড রিসেট করতে লগইন স্ক্রিনে থাকা "পাসওয়ার্ড ভুলে গেছেন? (Forgot Password?)" লিংকে ক্লিক করুন। আপনার নিবন্ধিত মোবাইল নম্বর দিন। মোবাইলে ৬ ডিজিটের ওটিপি (OTP) কোড আসবে। ওটিপি কোড এবং নতুন পাসওয়ার্ড দিয়ে কনফার্ম করলেই আপনার পাসওয়ার্ড পরিবর্তন হয়ে যাবে।',
    verifiedAnswerEn: 'To reset your password, tap "Forgot Password?" on the login screen. Enter your registered mobile number, input the 6-digit SMS OTP code, and set your new password.',
    knowledgeSection: 'auth',
    forbiddenTopics: ['mosque_add', 'cave_market'],
    sourceReference: 'src/components/AuthScreen.tsx'
  },
  {
    id: 'FAQ-007',
    question: 'Merchant account কীভাবে খুলবো?',
    intent: 'MERCHANT',
    verifiedAnswerBn: 'মার্চেন্ট একাউন্ট খুলতে অ্যাপের মূল লগইন স্ক্রিনে যান। নিচে থাকা "অন্যান্য →" (Others →) বাটনে ট্যাপ করে "মার্চেন্ট লগইন / রেজিস্ট্রেশন" নির্বাচন করুন। এরপর আপনার দোকানের নাম, ক্যাটাগরি, ঠিকানা, ম্যাপ লোকেশন পিন এবং এনআইডি ও ট্রেড লাইসেন্সের ছবি দিয়ে রেজিস্ট্রেশন ফর্ম সাবমিট করুন।',
    verifiedAnswerEn: 'To register as a merchant, open the main Login screen, tap "Others →" at the bottom, and select "Merchant Login / Registration". Fill in shop details, GPS location pin, and upload NID & Trade License photos.',
    knowledgeSection: 'merchant',
    forbiddenTopics: ['rider', 'mosque_find', 'quran'],
    sourceReference: 'src/components/MerchantRegistrationWizard.tsx'
  },
  {
    id: 'FAQ-008',
    question: 'Rider হিসেবে কীভাবে register করবো?',
    intent: 'RIDER',
    verifiedAnswerBn: 'ডেলিভারি রাইডার হিসেবে আবেদন করতে মূল লগইন স্ক্রিনে গিয়ে নিচে "অন্যান্য →" বাটনে ট্যাপ করুন এবং "রাইডার লগইন / রেজিস্ট্রেশন" নির্বাচন করুন। এরপর আপনার ফোন নম্বর, নাম, যানবাহনের তথ্য (সাইকেল/বাইক) এবং ড্রাইভিং লাইসেন্স বা এনআইডি আপলোড করে আবেদন জমা দিন। এডমিন ভেরিফাই করে একাউন্ট সক্রিয় করবে।',
    verifiedAnswerEn: 'To register as a delivery rider, go to the main Login screen, tap "Others →", and select "Rider Login / Registration". Enter your phone number, vehicle type (bicycle/motorcycle), and upload Driving License or NID.',
    knowledgeSection: 'rider',
    forbiddenTopics: ['merchant', 'mosque_add'],
    sourceReference: 'src/components/RiderPortalView.tsx'
  },
  {
    id: 'FAQ-009',
    question: 'How can I find a mosque near me?',
    intent: 'FIND_MOSQUE',
    verifiedAnswerBn: 'আপনার আশেপাশের মসজিদ দেখতে "Mosque Directory" এ গিয়ে "নিকটস্থ মসজিদ খুঁজুন" বাটনে ক্লিক করুন।',
    verifiedAnswerEn: 'Go to "Mosque Directory" from All Features or the Home ticker. Tap "Find Nearby Mosques" to fetch your GPS coordinates and view all approved mosques sorted by distance.',
    knowledgeSection: 'mosque_find',
    forbiddenTopics: ['mosque_add', 'token_donation', 'rider'],
    sourceReference: 'src/components/MosqueDirectoryModal.tsx'
  },
  {
    id: 'FAQ-010',
    question: 'nearest mosque kothay?',
    intent: 'FIND_MOSQUE',
    verifiedAnswerBn: 'আপনার নিকটস্থ মসজিদ দেখতে "Mosque Directory"-তে যান এবং "নিকটস্থ মসজিদ খুঁজুন" বাটনে ক্লিক করুন। আপনার লোকেশনের সাপেক্ষে সবচেয়ে কাছের মসজিদগুলো দেখতে পাবেন।',
    verifiedAnswerEn: 'Open "Mosque Directory" and tap "Find Nearby Mosques" to locate the closest masjids sorted by distance.',
    knowledgeSection: 'mosque_find',
    forbiddenTopics: ['mosque_add', 'merchant'],
    sourceReference: 'src/components/MosqueDirectoryModal.tsx'
  },
  {
    id: 'FAQ-011',
    question: 'মসজিদের রেডিয়াস (Radius) বা পরিধি কে নির্ধারণ করে?',
    intent: 'MOSQUE_LOCATION',
    verifiedAnswerBn: 'মসজিদের ভৌগোলিক ব্যাসার্ধ বা Geofence Radius (যেমন: ১০০ মিটার) শুধুমাত্র সুপার এডমিন তাদের এডমিন প্যানেল থেকে নির্ধারণ ও পরিবর্তন করতে পারেন। সাধারণ ব্যবহারকারী এটি পরিবর্তন করতে পারেন না।',
    verifiedAnswerEn: 'The mosque GPS Geofence Radius (e.g. 100 meters) is strictly configured by Super Admins from the Admin Panel. Regular users cannot alter the radius.',
    knowledgeSection: 'mosque_geofence',
    forbiddenTopics: ['token_donation', 'cave_media'],
    sourceReference: 'src/components/AdminMosqueManagement.tsx'
  },
  {
    id: 'FAQ-012',
    question: 'মসজিদে QR কোড স্ক্যান করে সালাত ভেরিফিকেশন করা যায়?',
    intent: 'SALAT_VERIFICATION',
    verifiedAnswerBn: 'না, পূর্বে থাকা মসজিদের কিউআর কোড (QR Code) স্ক্যানিং ব্যবস্থাটি বর্তমানে বাতিল করা হয়েছে। এখন মসজিদে উপস্থিত হয়ে লাইভ জিপিএস লোকেশনের মাধ্যমে সালাত ভেরিফিকেশন সম্পন্ন করতে হয়।',
    verifiedAnswerEn: 'No, the previous physical Mosque QR code scanning system is discontinued. Prayer verification is now conducted strictly via live GPS geofencing at approved mosques.',
    knowledgeSection: 'salah_verification',
    forbiddenTopics: ['merchant', 'mosque_add'],
    sourceReference: 'src/services/caveAppGuideEngine.ts'
  },
  {
    id: 'FAQ-019',
    question: 'কেভ জার্নি (Cave Journey) কী?',
    intent: 'SALAT_HISTORY',
    verifiedAnswerBn: 'কেভ জার্নি হলো একটি ব্যক্তিগত আধ্যাত্মিক আমল ট্র্যাকার (Self-recorded journal)। এখানে আপনি নিজে ম্যানুয়ালি প্রতিদিনের ৫ ওয়াক্ত সালাত, রোজা, কুরআন তিলাওয়াত ও জিকির ট্র্যাক করে আপনার স্ট্রিক ও আমলের ধারাবাহিকতা ধরে রাখতে পারেন।',
    verifiedAnswerEn: 'Cave Journey is a personal self-recorded worship tracker. You manually check off 5 daily prayers, fasting, Quran recitation, and adhkar to maintain consistency streaks.',
    knowledgeSection: 'salah_journey',
    forbiddenTopics: ['salah_verification', 'merchant', 'admin'],
    sourceReference: 'src/components/SalahJourneyView.tsx'
  },
  {
    id: 'FAQ-020',
    question: 'কেভ জার্নিতে সালাত লগ করতে কি জিপিএস ভেরিফিকেশন লাগে?',
    intent: 'SALAT_HISTORY',
    verifiedAnswerBn: 'না, কেভ জার্নি সম্পূর্ণ ব্যক্তিগত আমল ট্র্যাকার হওয়ায় এতে কোনো জিপিএস সালাত ভেরিফিকেশনের প্রয়োজন নেই। আপনি নিজে দায়িত্ব নিয়ে ঘরে বা মসজিদে আদায়কৃত সালাত ম্যানুয়ালি মার্ক করতে পারেন।',
    verifiedAnswerEn: 'No, Cave Journey is a personal self-recorded journal and requires zero GPS verification. You manually record your worship habits.',
    knowledgeSection: 'salah_journey',
    forbiddenTopics: ['token_earning', 'mosque_geofence'],
    sourceReference: 'src/components/SalahJourneyView.tsx'
  },
  {
    id: 'FAQ-029',
    question: 'Silver token কীভাবে পাব?',
    intent: 'TOKEN_EARNING',
    verifiedAnswerBn: 'দিনে যেকোনো ৪টি ওয়াক্তের সালাত মসজিদে জামাতে আদায় করে জিপিএস ভেরিফিকেশন সম্পন্ন করলে দিনশেষে ১টি সিলভার টোকেন (Silver Token) অর্জিত হবে।',
    verifiedAnswerEn: 'Complete any 4 prayers of the day in Jama\'ah at an approved mosque with GPS verification to earn 1 Silver Token.',
    knowledgeSection: 'token_earning',
    forbiddenTopics: ['token_donation', 'mosque_add'],
    sourceReference: 'src/components/TokenRulesView.tsx'
  },
  {
    id: 'FAQ-030',
    question: 'Bronze token কীভাবে পাব?',
    intent: 'TOKEN_EARNING',
    verifiedAnswerBn: 'দিনে যেকোনো ৩টি ওয়াক্তের সালাত মসজিদে জামাতে আদায় করে জিপিএস ভেরিফিকেশন সম্পন্ন করলে আপনি ১টি ব্রোঞ্জ টোকেন (Bronze Token) পাবেন।',
    verifiedAnswerEn: 'Complete any 3 prayers of the day in Jama\'ah at an approved mosque with GPS verification to earn 1 Bronze Token.',
    knowledgeSection: 'token_earning',
    forbiddenTopics: ['token_donation', 'rider'],
    sourceReference: 'src/components/TokenRulesView.tsx'
  },
  {
    id: 'FAQ-031',
    question: '১ দিনে সর্বোচ্চ কয়টি টোকেন পাওয়া যায়?',
    intent: 'TOKEN_EARNING',
    verifiedAnswerBn: 'একজন ব্যবহারকারী দিনে সর্বোচ্চ ১টি টোকেন অর্জন করতে পারেন (৩ ওয়াক্তে ব্রোঞ্জ, ৪ ওয়াক্তে সিলভার অথবা ৫ ওয়াক্তে গোল্ড)।',
    verifiedAnswerEn: 'A user can earn a maximum of 1 Token per day (Bronze for 3 prayers, Silver for 4 prayers, or Gold for 5 prayers).',
    knowledgeSection: 'token_earning',
    forbiddenTopics: ['cave_market', 'cave_media'],
    sourceReference: 'src/components/TokenRulesView.tsx'
  },
  {
    id: 'FAQ-033',
    question: 'একটি কেনাকাটায় কি একাধিক টোকেন একসাথে ব্যবহার করা যাবে?',
    intent: 'TOKEN_REDEMPTION',
    verifiedAnswerBn: 'না, নিয়ম অনুযায়ী একটি অর্ডারে বা কেনাকাটায় সর্বোচ্চ ১টি টোকেন রিডিম করে নির্ধারিত ডিসকাউন্ট পাওয়া যায়।',
    verifiedAnswerEn: 'No, under standard rules, exactly 1 token can be redeemed per order to receive the store discount.',
    knowledgeSection: 'token_redemption',
    forbiddenTopics: ['mosque_add', 'hisnul_muslim'],
    sourceReference: 'src/components/TokenRulesView.tsx'
  },
  {
    id: 'FAQ-050',
    question: 'সকাল ও সন্ধ্যার জিকির কোথায় পাব?',
    intent: 'HISNUL_MUSLIM',
    verifiedAnswerBn: 'All Features ➔ "হিসনুল মুসলিম" এ গিয়ে "সকাল ও সন্ধ্যার জিকির" ক্যাটাগরি নির্বাচন করুন। সেখানে সহিহ হাদিস অনুযায়ী আরবি পাঠ, অর্থ ও ফযিলত সহ সকাল-সন্ধ্যার সকল দু\'আ পাবেন।',
    verifiedAnswerEn: 'Go to All Features ➔ Hisnul Muslim and select the "Morning & Evening Adhkar" category to read authentic daily supplications with Arabic, meaning, and references.',
    knowledgeSection: 'hisnul_muslim',
    forbiddenTopics: ['mosque_add', 'cave_market'],
    sourceReference: 'src/services/hisnulMuslimService.ts'
  },
  {
    id: 'FAQ-057',
    question: 'ডিজিটাল তাসবীহ (Digital Tasbih) কীভাবে চালু করব?',
    intent: 'TASBIH',
    verifiedAnswerBn: 'All Features ➔ "ডিজিটাল তাসবীহ" অথবা Profile ➔ "Tasbih" এ ক্লিক করে তাসবীহ কাউন্টার ওপেন করুন। স্ক্রিনের যেকোনো স্থানে ট্যাপ করে যিকির কাউন্ট করুন।',
    verifiedAnswerEn: 'Open Digital Tasbih from All Features ➔ "Digital Tasbih" or Profile ➔ "Tasbih". Tap anywhere on the screen to increment your zikr count.',
    knowledgeSection: 'tasbih',
    forbiddenTopics: ['merchant', 'rider'],
    sourceReference: 'src/components/DigitalTasbihModal.tsx'
  },
  {
    id: 'FAQ-061',
    question: 'কিবলা কম্পাস (Qibla Compass) কীভাবে কাজ করে?',
    intent: 'QIBLA',
    verifiedAnswerBn: 'কিবলা কম্পাস আপনার মোবাইলের বিল্ট-ইন ম্যাগনেটোমিটার সেন্সর ও জিপিএস ব্যবহার করে পবিত্র কাবার নিখুঁত দিক ও ডিগ্রির মান প্রদর্শন করে।',
    verifiedAnswerEn: 'The Qibla Compass uses your mobile magnetometer sensor and live GPS to determine the exact degree heading towards the Kaaba.',
    knowledgeSection: 'qibla',
    forbiddenTopics: ['token_earning', 'merchant'],
    sourceReference: 'src/components/QiblaFinderModal.tsx'
  },
  {
    id: 'FAQ-065',
    question: 'পার্টনার শপ (Partner Shops) কী?',
    intent: 'PARTNER_SHOP',
    verifiedAnswerBn: 'পার্টনার শপ হলো কেভ কম্প্যানিয়ন্সের সাথে নিবন্ধিত হালাল ব্যবসা প্রতিষ্ঠান (যেমন: ইসলামিক পোশাকের দোকান, রেস্তোরাঁ, সুপারশপ, ফার্মেসি), যেখানে আপনি টোকেন দেখিয়ে বিশেষ ছাড় পেতে পারেন।',
    verifiedAnswerEn: 'Partner Shops are verified halal merchant stores where Cave Companions token holders receive exclusive in-store shopping discounts.',
    knowledgeSection: 'partner_shops',
    forbiddenTopics: ['mosque_add', 'hisnul_muslim'],
    sourceReference: 'src/components/PartnerShopsView.tsx'
  },
  {
    id: 'FAQ-073',
    question: 'লোকাল মার্কেট (Local Market) ও ন্যাশনাল মার্কেট (Nationwide Market) এর মধ্যে পার্থক্য কী?',
    intent: 'CAVE_MARKET',
    verifiedAnswerBn: 'লোকাল মার্কেট হলো আপনার নিজ জেলা/উপজেলার দোকানগুলোর বাজার যেখানে লোকাল রাইডারে ৩০-৬০ মিনিটে দ্রুত ডেলিভারি পাওয়া যায়। আর ন্যাশনাল মার্কেট হলো সারাদেশের নির্ভরযোগ্য ইসলামিক বই, আতর, মধু ও পণ্যের জাতীয় বাজার যা কুরিয়ারের মাধ্যমে সরবরাহ করা হয়।',
    verifiedAnswerEn: 'Local Market offers products from nearby shops in your district delivered in 30-60 mins by local riders. Nationwide Market provides products shipped countrywide via courier.',
    knowledgeSection: 'cave_market',
    forbiddenTopics: ['mosque_add', 'tasbih'],
    sourceReference: 'src/components/CaveMarketView.tsx'
  },
  {
    id: 'FAQ-074',
    question: 'কেভ মার্কেটে পণ্য কীভাবে অর্ডার করব?',
    intent: 'ORDER',
    verifiedAnswerBn: 'Cave Market ট্যাবে যান ➔ পছন্দের পণ্য সিলেক্ট করুন ➔ "Buy Now" বা কার্টে যোগ করুন ➔ ডেলিভারি ঠিকানা দিন ➔ ওয়ালেটের টোকেন ডিসকাউন্ট সিলেক্ট করুন ➔ ক্যাশ অন ডেলিভারি বা পেমেন্ট নিশ্চিত করুন।',
    verifiedAnswerEn: 'Navigate to Cave Market ➔ select product ➔ click "Buy Now" or Add to Cart ➔ enter address ➔ apply token discount ➔ confirm Cash on Delivery.',
    knowledgeSection: 'cave_market',
    forbiddenTopics: ['rider', 'mosque_add'],
    sourceReference: 'src/components/CaveMarketView.tsx'
  },
  {
    id: 'FAQ-076',
    question: 'ডেলিভারি রাইডারকে লাইভ ম্যাপে ট্র্যাক করা যায়?',
    intent: 'DELIVERY',
    verifiedAnswerBn: 'হ্যাঁ, লোকাল মার্কেটের অর্ডারে রাইডার অ্যাসাইন হওয়ার পর "My Orders" থেকে "Track Live" অপশনে চাপলে লাইভ ম্যাপে রাইডারের বর্তমান অবস্থান, আপনার দূরত্ব এবং আনুমানিক সময় (ETA) দেখতে পাবেন।',
    verifiedAnswerEn: 'Yes, once a rider is assigned for local orders, open "My Orders" to track the rider\'s live GPS position, remaining distance, and ETA on a live map.',
    knowledgeSection: 'cave_market',
    forbiddenTopics: ['merchant', 'quran'],
    sourceReference: 'src/components/LocalOrderTracking.tsx'
  },
  {
    id: 'FAQ-103',
    question: 'আসসালামু আলাইকুম',
    intent: 'GENERAL_APP_QUESTION',
    verifiedAnswerBn: 'ওয়ালাইকুম আসসালাম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহ! আলহামদুলিল্লাহ, স্বাগতম Cave Companions-এ। আমি Cave AI, আপনার ২৪/৭ ইসলামিক পার্সোনাল অ্যাসিস্ট্যান্ট ও অ্যাপ গাইড। আপনাকে কীভাবে সাহায্য করতে পারি?',
    verifiedAnswerEn: 'Wa Alaikum Assalam Wa Rahmatullahi Wa Barakatuh! Alhamdulillah, welcome to Cave Companions. I am Cave AI, your 24/7 Islamic personal assistant & app guide. How can I assist you today?',
    knowledgeSection: 'purpose',
    forbiddenTopics: [],
    sourceReference: 'src/services/caveAppGuideEngine.ts'
  },
  {
    id: 'FAQ-104',
    question: 'তুমি কে এবং তোমার কাজ কি?',
    intent: 'GENERAL_APP_QUESTION',
    verifiedAnswerBn: 'আমি Cave AI—Cave Companions প্ল্যাটফর্মের নিজস্ব বুদ্ধিমত্তা সম্পন্ন এআই গাইড সহকারী। আমার কাজ হলো ব্যবহারকারীকে অ্যাপের সমস্ত ফিচার, সালাত ট্র্যাকিং, কেভ সার্কেল, ফেইথ টোকেন, পার্টনার শপ, মার্কেট নির্দেশিকা ও ইসলামিক বিষয়ে সঠিক ও নির্ভরযোগ্য তথ্য প্রদান করা।',
    verifiedAnswerEn: 'I am Cave AI, the dedicated AI guide assistant for Cave Companions, here to answer your questions about prayer tracking, tokens, circles, shops, and app features.',
    knowledgeSection: 'purpose',
    forbiddenTopics: [],
    sourceReference: 'src/services/caveAppGuideEngine.ts'
  },
  {
    id: 'FAQ-105',
    question: 'Cave Companions এর মূল লক্ষ্য ও উদ্দেশ্য কী?',
    intent: 'GENERAL_APP_QUESTION',
    verifiedAnswerBn: 'Cave Companions-এর মূল উদ্দেশ্য হলো মুসলিমদের দৈনন্দিন ৫ ওয়াক্ত সালাতের ধারাবাহিকতা ধরে রাখতে উৎসাহিত করা, কুরআন তিলাওয়াত ও সুন্নাহ অভ্যাসে স্ট্রিক বজায় রাখা, কেভ সার্কেলের মাধ্যমে পারস্পরিক জবাবদিহিতা তৈরি করা এবং ফেইথ টোকেন ও হালাল কেভ মার্কেটের মাধ্যমে নেক আমলকে বাস্তব জীবনে সম্মানিত করা।',
    verifiedAnswerEn: 'Cave Companions is designed to help Muslims build consistent daily prayer and Sunnah habits, foster brotherhood via Cave Circles, and reward righteous deeds with Faith Tokens.',
    knowledgeSection: 'purpose',
    forbiddenTopics: [],
    sourceReference: 'src/services/caveAppGuideEngine.ts'
  }
];
