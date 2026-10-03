# CAVE COMPANIONS
# AUTHORITATIVE AI FAQ (VERIFIED EVALUATION SUITE)

---

### FAQ 001
- **Question**: আমি কীভাবে আমার আশেপাশের মসজিদ খুঁজে পাব?
- **Intent**: `FIND_MOSQUE`
- **Verified Answer**: আপনার আশেপাশের অনুমোদিত মসজিদ খুঁজে পেতে নিচের মেনু বা All Features থেকে "Mosque Directory / নিকটস্থ মসজিদ"-এ যান। এরপর "নিকটস্থ মসজিদ খুঁজুন" বাটনে চাপ দিলে আপনার বর্তমান জিপিএস লোকেশনের সাপেক্ষে কাছের মসজিদগুলোর তালিকা ও দূরত্ব দেখতে পাবেন।
- **Knowledge Section**: Mosque Directory ➔ Find Nearby Mosques (`5.1`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`), Admin Approval (`5.4`), Geofence Configuration (`5.4`), QR Scanning (`5.5`), Token Donation (`7.3`), Merchant (`14`), Rider (`15`)
- **Source Reference**: `src/components/MosqueDirectoryModal.tsx`

---

### FAQ 002
- **Question**: নতুন মসজিদ কীভাবে যুক্ত করবো?
- **Intent**: `ADD_MOSQUE`
- **Verified Answer**: নতুন কোনো মসজিদ তালিকায় যুক্ত করতে All Features ➔ "Mosque Directory" এ গিয়ে "Add Mosque / নতুন মসজিদ যুক্ত করুন" বাটনে ক্লিক করুন। এরপর মসজিদের নাম, ঠিকানা, গুগল ম্যাপ পিন দিয়ে সঠিক লোকেশন, ইমাম সাহেবের নাম ও ফোন নম্বর এবং মসজিদের ছবি আপলোড করে সাবমিট করুন। এডমিন ভেরিফাই করে তা অনুমোদন দেবে।
- **Knowledge Section**: Mosque Directory ➔ Add New Mosque Request (`5.3`)
- **Forbidden Unrelated Topics**: Find Nearby Mosques (`5.1`), Token Redemption (`7.2`), Quran (`8`), Merchant Registration (`14`)
- **Source Reference**: `src/components/MosqueSubmissionModal.tsx`, `server/routes/mosqueRoutes.ts`

---

### FAQ 003
- **Question**: Gold token কীভাবে পাব?
- **Intent**: `TOKEN_EARNING`
- **Verified Answer**: সারাদিনের ৫টি ওয়াক্তের সালাত (ফজর, যোহর/জুমা, আসর, মাগরিব ও এশা) অনুমোদিত মসজিদে জামাতে আদায় করে জিপিএস ভেরিফিকেশন সম্পন্ন করলে আপনি দিনশেষে ১টি গোল্ড টোকেন (Gold Token) রিওয়ার্ড হিসেবে পাবেন।
- **Knowledge Section**: Tokens ➔ Daily Earning Limits & Tiers (`7.1`)
- **Forbidden Unrelated Topics**: Token Donation (`7.3`), Token Redemption (`7.2`), Add Mosque (`5.3`), Merchant Rules (`14`)
- **Source Reference**: `src/components/TokenRulesView.tsx`, `server/testTokenRules.ts`

---

### FAQ 004
- **Question**: Token দিয়ে মসজিদে দান করা যাবে?
- **Intent**: `TOKEN_DONATION`
- **Verified Answer**: হ্যাঁ, আপনি কেনাকাটার ডিসকাউন্টে টোকেন ব্যবহার না করে সরাসরি মসজিদ উন্নয়ন ফান্ডে সাদাকাহ হিসেবে দান করতে পারেন। এর জন্য নিচের মেনু থেকে "My Tokens" ট্যাবে যান এবং আপনার বৈধ টোকেনের পাশে থাকা "সাদাকাহ করুন (Donate as Sadakah)" অপশন বেছে নিন।
- **Knowledge Section**: Tokens ➔ Token Mosque Sadakah Donation (`7.3`)
- **Forbidden Unrelated Topics**: Token Redemption (`7.2`), Partner Shop Locations (`12`), Rider Tasks (`15`)
- **Source Reference**: `src/components/MyTokenView.tsx`, `src/components/TokenRulesView.tsx`

---

### FAQ 005
- **Question**: Quran কোথায় পাব?
- **Intent**: `QURAN`
- **Verified Answer**: কুরআন তিলাওয়াত করতে All Features থেকে "আল-কুরআন" অথবা Profile ট্যাব থেকে "কুরআন মাজীদ"-এ ট্যাপ করুন। এখানে ১১৪টি সূরার আরবি পাঠ, বাংলা ও ইংরেজি অনুবাদ, অডিও তিলাওয়াত এবং খতম ট্র্যাকার পাবেন।
- **Knowledge Section**: Al-Quran Majeed (`8`), Navigation (`3`)
- **Forbidden Unrelated Topics**: Token Rules (`7`), Cave Market (`13`), Merchant Rules (`14`)
- **Source Reference**: `src/App.tsx`, `src/services/quranService.ts`

---

### FAQ 006
- **Question**: আমার password ভুলে গেছি
- **Intent**: `PASSWORD`
- **Verified Answer**: পাসওয়ার্ড রিসেট করতে লগইন স্ক্রিনে থাকা "পাসওয়ার্ড ভুলে গেছেন? (Forgot Password?)" লিংকে ক্লিক করুন। আপনার নিবন্ধিত মোবাইল নম্বর দিন। মোবাইলে ৬ ডিজিটের ওটিপি (OTP) কোড আসবে। ওটিপি কোড এবং নতুন পাসওয়ার্ড দিয়ে কনফার্ম করলেই আপনার পাসওয়ার্ড পরিবর্তন হয়ে যাবে।
- **Knowledge Section**: Authentication & Accounts ➔ Password Recovery (`4`)
- **Forbidden Unrelated Topics**: Mosque Submission (`5.3`), Market Orders (`13`)
- **Source Reference**: `src/components/AuthScreen.tsx`, `server/routes/authRoutes.ts`

---

### FAQ 007
- **Question**: Merchant account কীভাবে খুলবো?
- **Intent**: `MERCHANT`
- **Verified Answer**: মার্চেন্ট একাউন্ট খুলতে অ্যাপের মূল লগইন স্ক্রিনে যান। নিচে থাকা "অন্যান্য →" (Others →) বাটনে ট্যাপ করে "মার্চেন্ট লগইন / রেজিস্ট্রেশন" নির্বাচন করুন। এরপর আপনার দোকানের নাম, ক্যাটাগরি, ঠিকানা, ম্যাপ লোকেশন পিন এবং এনআইডি ও ট্রেড লাইসেন্সের ছবি দিয়ে রেজিস্ট্রেশন ফর্ম সাবমিট করুন।
- **Knowledge Section**: Authentication ➔ Merchant (`4`), Merchant Portal (`14`)
- **Forbidden Unrelated Topics**: Rider Registration (`15`), Mosque Directory (`5`), Quran (`8`)
- **Source Reference**: `src/components/AuthScreen.tsx`, `src/components/MerchantRegistrationWizard.tsx`

---

### FAQ 008
- **Question**: Rider হিসেবে কীভাবে register করবো?
- **Intent**: `RIDER`
- **Verified Answer**: ডেলিভারি রাইডার হিসেবে আবেদন করতে মূল লগইন স্ক্রিনে গিয়ে নিচে "অন্যান্য →" বাটনে ট্যাপ করুন এবং "রাইডার লগইন / রেজিস্ট্রেশন" নির্বাচন করুন। এরপর আপনার ফোন নম্বর, নাম, যানবাহনের তথ্য (সাইকেল/বাইক) এবং ড্রাইভিং লাইসেন্স বা এনআইডি আপলোড করে আবেদন জমা দিন। এডমিন ভেরিফাই করে একাউন্ট সক্রিয় করবে।
- **Knowledge Section**: Authentication ➔ Rider (`4`), Rider Portal (`15`)
- **Forbidden Unrelated Topics**: Merchant Registration (`14`), Mosque Submission (`5.3`)
- **Source Reference**: `src/components/AuthScreen.tsx`, `src/components/RiderLogin.tsx`, `src/components/RiderPortalView.tsx`

---

### FAQ 009
- **Question**: How can I find a mosque near me?
- **Intent**: `FIND_MOSQUE`
- **Verified Answer**: Go to "Mosque Directory" from All Features or the Home ticker. Tap "Find Nearby Mosques" to fetch your GPS coordinates and view all approved mosques sorted by distance.
- **Knowledge Section**: Mosque Directory ➔ Find Nearby Mosques (`5.1`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`), Token Rules (`7`), Rider (`15`)
- **Source Reference**: `src/components/MosqueDirectoryModal.tsx`

---

### FAQ 010
- **Question**: nearest mosque kothay?
- **Intent**: `FIND_MOSQUE`
- **Verified Answer**: আপনার নিকটস্থ মসজিদ দেখতে "Mosque Directory"-তে যান এবং "নিকটস্থ মসজিদ খুঁজুন" বাটনে ক্লিক করুন। আপনার লোকেশনের সাপেক্ষে সবচেয়ে কাছের মসজিদগুলো দেখতে পাবেন।
- **Knowledge Section**: Mosque Directory ➔ Find Nearby Mosques (`5.1`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`), Merchant (`14`)
- **Source Reference**: `src/components/MosqueDirectoryModal.tsx`

---

### FAQ 011
- **Question**: মসজিদের রেডিয়াস (Radius) বা পরিধি কে নির্ধারণ করে?
- **Intent**: `MOSQUE_LOCATION`
- **Verified Answer**: মসজিদের ভৌগোলিক ব্যাসার্ধ বা Geofence Radius (যেমন: ১০০ মিটার) শুধুমাত্র সুপার এডমিন তাদের এডমিন প্যানেল থেকে নির্ধারণ ও পরিবর্তন করতে পারেন। সাধারণ ব্যবহারকারী এটি পরিবর্তন করতে পারেন না।
- **Knowledge Section**: Mosque Directory ➔ Geofence Radius (`5.4`)
- **Forbidden Unrelated Topics**: Token Donation (`7.3`), Cave Media (`17`)
- **Source Reference**: `src/components/AdminMosqueManagement.tsx`, `server/routes/adminRoutes.ts`

---

### FAQ 012
- **Question**: মসজিদে QR কোড স্ক্যান করে সালাত ভেরিফিকেশন করা যায়?
- **Intent**: `SALAT_VERIFICATION`
- **Verified Answer**: না, পূর্বে থাকা মসজিদের কিউআর কোড (QR Code) স্ক্যানিং ব্যবস্থাটি বর্তমানে বাতিল করা হয়েছে। এখন মসজিদে উপস্থিত হয়ে লাইভ জিপিএস লোকেশনের মাধ্যমে সালাত ভেরিফিকেশন সম্পন্ন করতে হয়।
- **Knowledge Section**: Mosque Directory ➔ Mosque QR Code Scanning (`5.5`), Salat (`6.2`)
- **Forbidden Unrelated Topics**: Merchant QR (`12`), Add Mosque (`5.3`)
- **Source Reference**: `src/services/caveAppGuideEngine.ts`, `server/routes/mosqueRoutes.ts`

---

### FAQ 013
- **Question**: নতুন মসজিদের আবেদন করার পর কি সাথে সাথে তা তালিকায় দেখা যাবে?
- **Intent**: `ADD_MOSQUE`
- **Verified Answer**: না, নতুন মসজিদের আবেদনটি প্রাথমিকভাবে 'পেন্ডিং' অবস্থায় থাকে। এডমিন প্যানেল থেকে তথ্য ও লোকেশন যাচাই করে অনুমোদন দিলে তা সকলের জন্য তালিকায় দৃশ্যমান হবে। আপনি "My Requests" ট্যাবে আবেদনের স্ট্যাটাস দেখতে পারেন।
- **Knowledge Section**: Mosque Directory ➔ Add New Mosque Request (`5.3`)
- **Forbidden Unrelated Topics**: Token Earning (`7.1`), Market Orders (`13`)
- **Source Reference**: `src/components/MosqueDirectoryModal.tsx`, `server/routes/mosqueRoutes.ts`

---

### FAQ 014
- **Question**: মসজিদের ইমাম সাহেবের ফোন নম্বর কীভাবে পাব?
- **Intent**: `MOSQUE_DETAILS`
- **Verified Answer**: Mosque Directory থেকে যেকোনো মসজিদের নামের উপর ট্যাপ করে Mosque Details কার্ড খুলুন। সেখানে মসজিদের ঠিকানা, ইমাম সাহেবের নাম এবং ফোন নম্বর পেয়ে যাবেন।
- **Knowledge Section**: Mosque Directory ➔ Mosque Details (`5.2`)
- **Forbidden Unrelated Topics**: Token Rules (`7`), Market (`13`)
- **Source Reference**: `src/components/MosqueDetailModal.tsx`

---

### FAQ 015
- **Question**: মসজিদ কি জেলা বা উপজেলা দিয়ে ফিল্টার করা যায়?
- **Intent**: `FIND_MOSQUE`
- **Verified Answer**: হ্যাঁ, Mosque Directory-র সার্চ বক্সে আপনার জেলা, উপজেলা বা এলাকার নাম লিখে খুঁজলেই উক্ত এলাকার অন্তর্ভুক্ত অনুমোদিত মসজিদগুলো ফিল্টার হয়ে যাবে।
- **Knowledge Section**: Mosque Directory ➔ Find Nearby Mosques (`5.1`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`), Delivery (`13`)
- **Source Reference**: `src/components/MosqueDirectoryModal.tsx`

---

### FAQ 016
- **Question**: গুগল ম্যাপ পিন ছাড়া কি নতুন মসজিদ সাবমিট করা যাবে?
- **Intent**: `ADD_MOSQUE`
- **Verified Answer**: না, সঠিক জিপিএস পিন ছাড়া মসজিদ সাবমিট করা যায় না। আবেদনের সময় গুগল ম্যাপ পিকার দিয়ে মসজিদের সঠিক অবস্থান নির্ধারণ করা বাধ্যতামূলক যাতে পরবর্তীতে ব্যবহারকারীরা সেখানে সালাত ভেরিফাই করতে পারে।
- **Knowledge Section**: Mosque Directory ➔ Add New Mosque Request (`5.3`)
- **Forbidden Unrelated Topics**: Token Redemption (`7.2`)
- **Source Reference**: `src/components/MosqueSubmissionModal.tsx`

---

### FAQ 017
- **Question**: আমার সাবমিট করা মসজিদের স্ট্যাটাস কোথায় দেখব?
- **Intent**: `ADD_MOSQUE`
- **Verified Answer**: Mosque Directory খুলে উপরের "My Requests / আমার আবেদন" ট্যাবে ক্লিক করলে আপনার সাবমিট করা সকল মসজিদের তালিকা এবং তাদের অনুমোদন স্ট্যাটাস (Pending, Approved বা Rejected) দেখতে পাবেন।
- **Knowledge Section**: Mosque Directory ➔ Add New Mosque Request (`5.3`)
- **Forbidden Unrelated Topics**: Cart (`13`), Hisnul Muslim (`9`)
- **Source Reference**: `src/components/MosqueDirectoryModal.tsx`

---

### FAQ 018
- **Question**: এক সাথে কয়টি মসজিদ যোগ করার আবেদন করা যায়?
- **Intent**: `ADD_MOSQUE`
- **Verified Answer**: আপনি প্রয়োজন অনুযায়ী একাধিক মসজিদের জন্য আবেদন জমা দিতে পারেন। প্রতিটি আবেদন আলাদাভাবে এডমিন কর্তৃক রিভিউ ও অনুমোদিত হয়।
- **Knowledge Section**: Mosque Directory ➔ Add New Mosque Request (`5.3`)
- **Forbidden Unrelated Topics**: Token Balance (`8`)
- **Source Reference**: `server/routes/mosqueRoutes.ts`

---

### FAQ 019
- **Question**: কেভ জার্নি (Cave Journey) কী?
- **Intent**: `SALAT_HISTORY`
- **Verified Answer**: কেভ জার্নি হলো একটি ব্যক্তিগত আধ্যাত্মিক আমল ট্র্যাকার (Self-recorded journal)। এখানে আপনি নিজে ম্যানুয়ালি প্রতিদিনের ৫ ওয়াক্ত সালাত, রোজা, কুরআন তিলাওয়াত ও জিকির ট্র্যাক করে আপনার স্ট্রিক ও আমলের ধারাবাহিকতা ধরে রাখতে পারেন।
- **Knowledge Section**: Salat ➔ Cave Journey (`6.1`)
- **Forbidden Unrelated Topics**: GPS Geofencing (`6.2`), Merchant (`14`), Admin (`16`)
- **Source Reference**: `src/components/SalahJourneyView.tsx`, `src/services/caveAppGuideEngine.ts`

---

### FAQ 020
- **Question**: কেভ জার্নিতে সালাত লগ করতে কি জিপিএস ভেরিফিকেশন লাগে?
- **Intent**: `SALAT_HISTORY`
- **Verified Answer**: না, কেভ জার্নি সম্পূর্ণ ব্যক্তিগত আমল ট্র্যাকার হওয়ায় এতে কোনো জিপিএস সালাত ভেরিফিকেশনের প্রয়োজন নেই। আপনি নিজে দায়িত্ব নিয়ে ঘরে বা মসজিদে আদায়কৃত সালাত ম্যানুয়ালি মার্ক করতে পারেন।
- **Knowledge Section**: Salat ➔ Cave Journey (`6.1`)
- **Forbidden Unrelated Topics**: Token Rewards (`7.1`), Mosque GPS (`5.4`)
- **Source Reference**: `src/components/SalahJourneyView.tsx`, `src/services/caveAppGuideEngine.ts`

---

### FAQ 021
- **Question**: মহিলারা কীভাবে সালাত ভেরিফাই করবেন?
- **Intent**: `SALAT_VERIFICATION`
- **Verified Answer**: মা-বোনদের জন্য মসজিদে যাওয়ার বাধ্যবাধকতা নেই। তাঁরা ওয়াক্ত চলাকালীন সময়ে অ্যাপের হোম পেজ থেকে সময়মতো চেক-ইন সম্পন্ন করে জামাত বোনাস ও সালাত ধারাবাহিকতা বজায় রাখতে পারেন।
- **Knowledge Section**: Salat ➔ Congregational Prayer Verification (`6.2`)
- **Forbidden Unrelated Topics**: Mosque Geofence (`5.4`), Market (`13`)
- **Source Reference**: `src/components/CompactPrayersCard.tsx`, `server/routes/prayerRoutes.ts`

---

### FAQ 022
- **Question**: জিপিএস ছাড়া কি জামাত ভেরিফিকেশন হবে?
- **Intent**: `SALAT_VERIFICATION`
- **Verified Answer**: পুরুষ ব্যবহারকারীদের ক্ষেত্রে টোকেন অর্জনের জন্য অনুমোদিত মসজিদের জিপিএস বাউন্ডারির ভেতরে উপস্থিত থেকে ভেরিফাই করা বাধ্যতামূলক। মক বা ফেক লোকেশন সিস্টেম স্বয়ংক্রিয়ভাবে ব্লক করে দেয়।
- **Knowledge Section**: Salat ➔ Congregational Prayer Verification (`6.2`)
- **Forbidden Unrelated Topics**: Quran (`8`), Tasbih (`10`)
- **Source Reference**: `src/utils/antiSpoofing.ts`, `server/routes/prayerRoutes.ts`

---

### FAQ 023
- **Question**: কাজা সালাত হিসাব করার অপশন আছে কি?
- **Intent**: `SALAT_HISTORY`
- **Verified Answer**: অ্যাপে আলাদা কোনো কাজা সালাত ক্যালকুলেটর নেই। ব্যবহারকারী প্রতিদিনের চলতি ওয়াক্তের সালাত কেভ জার্নিতে নিয়মিত লগ করতে পারেন।
- **Knowledge Section**: Current Limitations (`20`), Salat (`6.1`)
- **Forbidden Unrelated Topics**: Token Rules (`7`)
- **Source Reference**: `src/components/SalahJourneyView.tsx`

---

### FAQ 024
- **Question**: নামাজের ওয়াক্ত শুরু ও শেষ সময় কোথায় দেখব?
- **Intent**: `PRAYER_TIME`
- **Verified Answer**: হোম পেজের "Five Daily Prayers" কার্ডে আপনার জেলার বর্তমান ওয়াক্তের নাম, শুরুর সময়, শেষ সময় এবং পরবর্তী ওয়াক্তের কাউন্টডাউন টাইমার দেখতে পাবেন।
- **Knowledge Section**: Salat ➔ Prayer Times & Calculation (`6.3`)
- **Forbidden Unrelated Topics**: Merchant (`14`), Rider (`15`)
- **Source Reference**: `src/components/CompactPrayersCard.tsx`, `src/services/prayerTimeService.ts`

---

### FAQ 025
- **Question**: সেহরি ও ইফতারের সময়সূচি কোথায় পাব?
- **Intent**: `PRAYER_TIME`
- **Verified Answer**: হোম পেজের "Sehri & Iftar Timetable" কার্ডে আপনার নির্বাচিত জেলার জন্য আজকের সেহরির শেষ সময় ও ইফতারের সঠিক সময় প্রদর্শিত হয়।
- **Knowledge Section**: Salat ➔ Prayer Times & Calculation (`6.3`), Navigation (`3`)
- **Forbidden Unrelated Topics**: Token Redemption (`7.2`)
- **Source Reference**: `src/components/SehriIftarCard.tsx`, `src/services/prayerTimeService.ts`

---

### FAQ 026
- **Question**: তাহাজ্জুদ ও নফল সালাত কীভাবে লগ করব?
- **Intent**: `SALAT_HISTORY`
- **Verified Answer**: কেভ জার্নি (Cave Journey) পেজে যান। সেখানে ৫ ওয়াক্ত ফরজ সালাতের পাশাপাশি তাহাজ্জুদ, ইশরাক ও অন্যান্য নফল ইবাদতের চেকলিস্টে ক্লিক করে আপনার আমল সংরক্ষণ করুন।
- **Knowledge Section**: Salat ➔ Cave Journey (`6.1`)
- **Forbidden Unrelated Topics**: GPS Verification (`6.2`), Rider (`15`)
- **Source Reference**: `src/components/SalahJourneyView.tsx`

---

### FAQ 027
- **Question**: অফলাইনে সালাত লগ করলে কি তা পরে সিঙ্ক হবে?
- **Intent**: `SALAT_HISTORY`
- **Verified Answer**: হ্যাঁ, ইন্টারনেট না থাকলে সালাতের তথ্য লোকাল মেমোরিতে জমা থাকে। পরবর্তীতে ইন্টারনেট সংযোগ চালু হলে বা "Sync Now" বাটনে চাপ দিলে স্বয়ংক্রিয়ভাবে সার্ভারের সাথে সিঙ্ক হয়ে যায়।
- **Knowledge Section**: Navigation ➔ Home Offline Sync (`3`), Salat (`6.1`)
- **Forbidden Unrelated Topics**: Market Orders (`13`)
- **Source Reference**: `src/services/offlineSyncService.ts`, `src/App.tsx`

---

### FAQ 028
- **Question**: আজান নোটিফিকেশন অ্যালার্ট কীভাবে চালু করব?
- **Intent**: `PRAYER_TIME`
- **Verified Answer**: All Features থেকে "নামাজের রিমাইন্ডার (Prayer Reminder)" অপশনে যান। সেখানে ৫ ওয়াক্ত সালাতের আজান ও অ্যালার্ম টগলগুলো অন করে নোটিফিকেশন পারমিশন এনাবল করুন।
- **Knowledge Section**: Notifications (`19`), Navigation (`3`)
- **Forbidden Unrelated Topics**: Merchant (`14`)
- **Source Reference**: `src/services/prayerReminderService.ts`, `src/components/AllFeaturesView.tsx`

---

### FAQ 029
- **Question**: Silver token কীভাবে পাব?
- **Intent**: `TOKEN_EARNING`
- **Verified Answer**: দিনে যেকোনো ৪টি ওয়াক্তের সালাত মসজিদে জামাতে আদায় করে জিপিএস ভেরিফিকেশন সম্পন্ন করলে দিনশেষে ১টি সিলভার টোকেন (Silver Token) অর্জিত হবে।
- **Knowledge Section**: Tokens ➔ Daily Earning Limits & Tiers (`7.1`)
- **Forbidden Unrelated Topics**: Token Donation (`7.3`), Add Mosque (`5.3`)
- **Source Reference**: `src/components/TokenRulesView.tsx`, `server/testTokenRules.ts`

---

### FAQ 030
- **Question**: Bronze token কীভাবে পাব?
- **Intent**: `TOKEN_EARNING`
- **Verified Answer**: দিনে যেকোনো ৩টি ওয়াক্তের সালাত মসজিদে জামাতে আদায় করে জিপিএস ভেরিফিকেশন সম্পন্ন করলে আপনি ১টি ব্রোঞ্জ টোকেন (Bronze Token) পাবেন।
- **Knowledge Section**: Tokens ➔ Daily Earning Limits & Tiers (`7.1`)
- **Forbidden Unrelated Topics**: Token Donation (`7.3`), Rider (`15`)
- **Source Reference**: `src/components/TokenRulesView.tsx`, `server/testTokenRules.ts`

---

### FAQ 031
- **Question**: ১ দিনে সর্বোচ্চ কয়টি টোকেন পাওয়া যায়?
- **Intent**: `TOKEN_EARNING`
- **Verified Answer**: একজন ব্যবহারকারী দিনে সর্বোচ্চ ১টি টোকেন অর্জন করতে পারেন (৩ ওয়াক্তে ব্রোঞ্জ, ৪ ওয়াক্তে সিলভার অথবা ৫ ওয়াক্তে গোল্ড)।
- **Knowledge Section**: Tokens ➔ Daily Earning Limits & Tiers (`7.1`)
- **Forbidden Unrelated Topics**: Market Orders (`13`), Cave Media (`17`)
- **Source Reference**: `src/components/TokenRulesView.tsx`, `server/testTokenRules.ts`

---

### FAQ 032
- **Question**: টোকেন ক্লেইম করার গ্রেস পিরিয়ড (Grace Period) কতক্ষণ?
- **Intent**: `TOKEN_EARNING`
- **Verified Answer**: পূর্ববর্তী দিনের অর্জিত টোকেন পরবর্তী দিনের দুপুর ১২:০০ টা (12:00 PM) পর্যন্ত গ্রেস পিরিয়ডের মধ্যে ক্লেইম করা যায়।
- **Knowledge Section**: Tokens ➔ Daily Earning Limits & Tiers (`7.1`)
- **Forbidden Unrelated Topics**: Merchant (`14`), Quran (`8`)
- **Source Reference**: `server/timezone.ts`, `server/testTokenRules.ts`

---

### FAQ 033
- **Question**: একটি কেনাকাটায় কি একাধিক টোকেন একসাথে ব্যবহার করা যাবে?
- **Intent**: `TOKEN_REDEMPTION`
- **Verified Answer**: না, নিয়ম অনুযায়ী একটি অর্ডারে বা কেনাকাটায় সর্বোচ্চ ১টি টোকেন রিডিম করে নির্ধারিত ডিসকাউন্ট পাওয়া যায়।
- **Knowledge Section**: Tokens ➔ Token Redemption at Partner Shops (`7.2`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`), Hisnul Muslim (`9`)
- **Source Reference**: `src/components/TokenRulesView.tsx`, `src/components/ShopRedemptionModal.tsx`

---

### FAQ 034
- **Question**: একবার ব্যবহার করা টোকেন কি আবার ব্যবহার করা যাবে?
- **Intent**: `TOKEN_REDEMPTION`
- **Verified Answer**: না, প্রতিটি টোকেন সিঙ্গেল-ইউজ (Single Use)। একবার ডিসকাউন্টে বা সাদাকাহ হিসেবে ব্যবহার হয়ে গেলে তা 'Redeemed' তালিকায় চলে যায় এবং পুনরায় ব্যবহার করা যায় না।
- **Knowledge Section**: Tokens ➔ Token Redemption at Partner Shops (`7.2`)
- **Forbidden Unrelated Topics**: Mosque Submission (`5.3`)
- **Source Reference**: `src/components/TokenRulesView.tsx`, `server/testTokenRules.ts`

---

### FAQ 035
- **Question**: আমার টোকেন হিস্ট্রি কোথায় দেখতে পাব?
- **Intent**: `TOKEN_BALANCE`
- **Verified Answer**: নিচের মেনু থেকে "My Tokens" ট্যাবে যান। সেখানে আপনার একটিভ টোকেন ব্যালেন্সের নিচে "Token History / রিডিম হিস্ট্রি"-তে ইতিপূর্বে ব্যবহৃত ও অর্জিত টোকেনের বিস্তারিত দেখতে পাবেন।
- **Knowledge Section**: Navigation ➔ My Tokens (`3`), Tokens (`7.1`)
- **Forbidden Unrelated Topics**: Rider (`15`), Admin (`16`)
- **Source Reference**: `src/components/MyTokenView.tsx`

---

### FAQ 036
- **Question**: ২ ওয়াক্ত জামাতে পড়লে কি কোনো টোকেন পাওয়া যাবে?
- **Intent**: `TOKEN_EARNING`
- **Verified Answer**: না, টোকেন অর্জনের সর্বনিম্ন শর্ত হলো দিনে কমপক্ষে ৩ ওয়াক্ত জামাত (ব্রোঞ্জ টোকেন)। ২ ওয়াক্ত জামাতের জন্য টোকেন দেওয়া হয় না।
- **Knowledge Section**: Tokens ➔ Daily Earning Limits & Tiers (`7.1`)
- **Forbidden Unrelated Topics**: Market (`13`)
- **Source Reference**: `src/components/TokenRulesView.tsx`, `server/testTokenRules.ts`

---

### FAQ 037
- **Question**: মসজিদে টোকেন সাদাকাহ করলে কী লাভ?
- **Intent**: `TOKEN_DONATION`
- **Verified Answer**: টোকেন সাদাকাহ করলে আপনার অর্জিত নেক আমল সরাসরি স্থানীয় মসজিদের উন্নয়ন ফান্ডে আর্থিক সহযোগিতায় রূপান্তরিত হয় এবং আপনার প্রোফাইলে সাদাকাহ ব্যাজ যুক্ত হয়।
- **Knowledge Section**: Tokens ➔ Token Mosque Sadakah Donation (`7.3`)
- **Forbidden Unrelated Topics**: Merchant Registration (`14`)
- **Source Reference**: `src/components/TokenRulesView.tsx`, `src/components/MyTokenView.tsx`

---

### FAQ 038
- **Question**: টোকেন কি অন্য কারো একাউন্টে ট্রান্সফার করা যায়?
- **Intent**: `TOKEN_BALANCE`
- **Verified Answer**: না, ফেইথ টোকেন সম্পূর্ণ অ-হস্তান্তরযোগ্য (Non-transferable)। এটি ব্যবহারকারীর নিজস্ব সালাতের আমলের ওপর ভিত্তি করে অর্জিত হয়।
- **Knowledge Section**: Tokens ➔ Daily Earning Limits & Tiers (`7.1`), Current Limitations (`20`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`)
- **Source Reference**: `src/components/TokenRulesView.tsx`

---

### FAQ 039
- **Question**: কুরআন তিলাওয়াত কীভাবে শুনব?
- **Intent**: `QURAN`
- **Verified Answer**: "কুরআন মাজীদ" মডিউলে গিয়ে যেকোনো সূরায় প্রবেশ করুন। আয়াতের পাশে থাকা প্লে (Play) বাটনে চাপ দিয়ে আন্তর্জাতিক কারীদের স্পষ্ট অডিও তিলাওয়াত শুনতে পারেন।
- **Knowledge Section**: Al-Quran Majeed (`8`)
- **Forbidden Unrelated Topics**: Tokens (`7`), Delivery (`15`)
- **Source Reference**: `src/services/quranService.ts`

---

### FAQ 040
- **Question**: কুরআনে আয়াত বুকমার্ক করার নিয়ম কী?
- **Intent**: `QURAN`
- **Verified Answer**: কুরআন পড়ার সময় আয়াতের পাশে থাকা বুকমার্ক আইকনে ক্লিক করুন। পরবর্তীতে কুরআন হোম স্ক্রিনের "Bookmarks" ট্যাব থেকে সহজেই বুকমার্ক করা আয়াতে ফিরে যেতে পারবেন।
- **Knowledge Section**: Al-Quran Majeed (`8`)
- **Forbidden Unrelated Topics**: Merchant (`14`)
- **Source Reference**: `src/services/quranService.ts`

---

### FAQ 041
- **Question**: খতম ট্র্যাকার (Khatam Tracker) কীভাবে ব্যবহার করব?
- **Intent**: `QURAN`
- **Verified Answer**: কুরআন মডিউলের খতম প্ল্যানার অপশনে গিয়ে আপনার পড়ার লক্ষ্যমাত্রা (যেমন: ৩০ দিনে ১ খতম) সেট করুন। প্রতিদিন যত পৃষ্ঠা বা আয়াত পড়বেন তা মার্ক করলে আপনার খতম অগ্রগতি দেখাবে।
- **Knowledge Section**: Al-Quran Majeed (`8`)
- **Forbidden Unrelated Topics**: Partner Shop (`12`)
- **Source Reference**: `src/services/quranService.ts`

---

### FAQ 042
- **Question**: সূরা সার্চ করবেন কীভাবে?
- **Intent**: `QURAN`
- **Verified Answer**: কুরআন ভিউয়ের উপরে থাকা সার্চ বক্সে সূরার নাম (যেমন: সূরা ইয়াসিন, কাহফ, বাকারাহ) বা সূরার নম্বর লিখে দ্রুত যেকোনো সূরা খুঁজে বের করুন।
- **Knowledge Section**: Al-Quran Majeed (`8`)
- **Forbidden Unrelated Topics**: Mosque Directory (`5`)
- **Source Reference**: `src/services/quranService.ts`

---

### FAQ 043
- **Question**: কুরআনের ফন্ট সাইজ বড়-ছোট করা যায়?
- **Intent**: `QURAN`
- **Verified Answer**: হ্যাঁ, কুরআন পড়ার ভিউতে উপরে থাকা সেটিংস বা 'A+ / A-' অপশনে ট্যাপ করে আপনার সুবিধাজনক আরবি ও বাংলা ফন্ট সাইজ নির্ধারণ করতে পারেন।
- **Knowledge Section**: Al-Quran Majeed (`8`)
- **Forbidden Unrelated Topics**: Tokens (`7`)
- **Source Reference**: `src/services/quranService.ts`

---

### FAQ 044
- **Question**: তাজবীদ কালার কোডিং অন করব কীভাবে?
- **Intent**: `QURAN`
- **Verified Answer**: কুরআন স্ক্রিনের সেটিংস থেকে "Tajweed Rules" টগলটি অন করলেই গুন্নাহ, ইখফা, ইদগাম ও কলকলার নিয়ম অনুযায়ী বিভিন্ন রঙে আরবি হরফ প্রদর্শিত হবে।
- **Knowledge Section**: Al-Quran Majeed (`8`)
- **Forbidden Unrelated Topics**: Merchant (`14`)
- **Source Reference**: `src/services/quranService.ts`

---

### FAQ 045
- **Question**: কুরআনের কোন অনুবাদ ব্যবহার করা হয়েছে?
- **Intent**: `QURAN`
- **Verified Answer**: আল-কুরআনে নির্ভরযোগ্য সহিহ ইন্টারন্যাশনাল ইংরেজি এবং বাংলাদেশ ইসলামিক ফাউন্ডেশন ও মুহিউদ্দীন খান অনূদিত বাংলা অনুবাদ সংযুক্ত রয়েছে।
- **Knowledge Section**: Al-Quran Majeed (`8`)
- **Forbidden Unrelated Topics**: Rider (`15`)
- **Source Reference**: `src/services/quranService.ts`, `QURAN_LICENSES.md`

---

### FAQ 046
- **Question**: পুরো কুরআন কি অফলাইনে পড়া যাবে?
- **Intent**: `QURAN`
- **Verified Answer**: হ্যাঁ, কুরআনের টেক্সট ও অনুবাদ অফলাইনে পড়ার জন্য সংরক্ষিত থাকে। অডিও ফাইলগুলো প্রথমবার শোনার পর লোকাল ক্যাশে সেভ থাকে।
- **Knowledge Section**: Al-Quran Majeed (`8`)
- **Forbidden Unrelated Topics**: Market (`13`)
- **Source Reference**: `src/services/quranIndexedDb.ts`

---

### FAQ 047
- **Question**: ডেইলি নসীহা (Daily Nasiha) হাদিস কোথায় পাব?
- **Intent**: `HADITH`
- **Verified Answer**: অ্যাপের হোম স্ক্রিনে "Daily Nasiha" কার্ডে প্রতিদিন নির্বাচিত সহিহ হাদিস ও অনুপ্রেরণামূলক ইসলামিক উক্তি দেখতে পাবেন।
- **Knowledge Section**: Navigation ➔ Home (`3`), Application Overview (`2`)
- **Forbidden Unrelated Topics**: Merchant Portal (`14`)
- **Source Reference**: `src/components/DailyNasihaCard.tsx`

---

### FAQ 048
- **Question**: কুরআনের কোনো সূরায় সিজদা আছে কি না কীভাবে বুঝব?
- **Intent**: `QURAN`
- **Verified Answer**: যেসকল আয়াতে সিজদায়ে তিলাওয়াত ওয়াজিব রয়েছে, সেসকল আয়াতের পাশে স্পষ্ট 'সিজদাহ' মার্কার ও চিহ্ন উল্লেখ করা রয়েছে।
- **Knowledge Section**: Al-Quran Majeed (`8`)
- **Forbidden Unrelated Topics**: Token Earning (`7.1`)
- **Source Reference**: `src/services/quranService.ts`

---

### FAQ 049
- **Question**: হিসনুল মুসলিম (Hisnul Muslim) কী?
- **Intent**: `HISNUL_MUSLIM`
- **Verified Answer**: হিসনুল মুসলিম হলো দৈনন্দিন জীবনের সকল ক্ষেত্রের সহিহ হাদিসভিত্তিক মাসনূন দু'আ ও সকাল-সন্ধ্যার জিকিরের একটি নির্ভরযোগ্য সংকলন।
- **Knowledge Section**: Hisnul Muslim (`9`)
- **Forbidden Unrelated Topics**: Tokens (`7`), Delivery (`15`)
- **Source Reference**: `src/services/hisnulMuslimService.ts`

---

### FAQ 050
- **Question**: সকাল ও সন্ধ্যার জিকির কোথায় পাব?
- **Intent**: `HISNUL_MUSLIM`
- **Verified Answer**: All Features ➔ "হিসনুল মুসলিম" এ গিয়ে "সকাল ও সন্ধ্যার জিকির" ক্যাটাগরি নির্বাচন করুন। সেখানে সহিহ হাদিস অনুযায়ী আরবি পাঠ, অর্থ ও ফযিলত সহ সকাল-সন্ধ্যার সকল দু'আ পাবেন।
- **Knowledge Section**: Hisnul Muslim (`9`), Navigation (`3`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`), Market (`13`)
- **Source Reference**: `src/services/hisnulMuslimService.ts`, `src/data/hisnulMuslimData.ts`

---

### FAQ 051
- **Question**: হিসনুল মুসলিমে দু'আ সার্চ করব কীভাবে?
- **Intent**: `HISNUL_MUSLIM`
- **Verified Answer**: হিসনুল মুসলিম মডিউলের উপরে থাকা সার্চ বক্সে বিষয় (যেমন: ঘুম, খাবার, সফর, বিপদ, রোগমুক্তি) লিখে সার্চ করলেই প্রাসঙ্গিক দু'আসমূহ চলে আসবে।
- **Knowledge Section**: Hisnul Muslim (`9`)
- **Forbidden Unrelated Topics**: Merchant (`14`)
- **Source Reference**: `src/services/hisnulMuslimService.ts`

---

### FAQ 052
- **Question**: দু'আ পড়ার সময় কাউন্টার ব্যবহার করা যায়?
- **Intent**: `HISNUL_MUSLIM`
- **Verified Answer**: হ্যাঁ, যেসকল দু'আ একাধিকবার পড়ার নিয়ম (যেমন ৩ বার, ৩৩ বার বা ১০০ বার), সেগুলোতে বিল্ট-ইন ট্যাপ কাউন্টার রয়েছে যাতে আপনি সহজেই পাঠ সংখ্যা গণনা করতে পারেন।
- **Knowledge Section**: Hisnul Muslim (`9`)
- **Forbidden Unrelated Topics**: Rider (`15`)
- **Source Reference**: `src/services/hisnulMuslimService.ts`

---

### FAQ 053
- **Question**: দু'আর হাদিস রেফারেন্স কীভাবে দেখব?
- **Intent**: `HISNUL_MUSLIM`
- **Verified Answer**: প্রতিটি দু'আর কার্ডের নিচে সহিহ বুখারী, সহিহ মুসলিম, আবু দাউদ বা তিরমিযী হাদিসের সঠিক কিতাব ও হাদিস নম্বর দেওয়া থাকে।
- **Knowledge Section**: Hisnul Muslim (`9`)
- **Forbidden Unrelated Topics**: Tokens (`7`)
- **Source Reference**: `src/data/hisnulMuslimData.ts`

---

### FAQ 054
- **Question**: প্রিয় দু'আ ফেভারিট করে রাখা যায়?
- **Intent**: `HISNUL_MUSLIM`
- **Verified Answer**: হ্যাঁ, প্রতিটি দু'আর পাশে থাকা স্টার (Favorite) আইকনে ট্যাপ করে আপনার প্রয়োজনীয় দু'আগুলো ফেভারিট তালিকায় সেভ করে রাখতে পারেন।
- **Knowledge Section**: Hisnul Muslim (`9`)
- **Forbidden Unrelated Topics**: Mosque Directory (`5`)
- **Source Reference**: `src/services/hisnulMuslimService.ts`

---

### FAQ 055
- **Question**: দু'আর বাংলা উচ্চারণ (উচ্চারণসহ অর্থ) কি দেওয়া আছে?
- **Intent**: `HISNUL_MUSLIM`
- **Verified Answer**: হ্যাঁ, হিসনুল মুসলিমের প্রতিটি দু'আয় মূল আরবি ইবারতের সাথে সহজ বাংলা উচ্চারণ ও বাংলা অনুবাদ দেওয়া রয়েছে।
- **Knowledge Section**: Hisnul Muslim (`9`)
- **Forbidden Unrelated Topics**: Partner Shops (`12`)
- **Source Reference**: `src/data/hisnulMuslimData.ts`

---

### FAQ 056
- **Question**: হিসনুল মুসলিমের ক্যাটাগরিগুলো কী কী?
- **Intent**: `HISNUL_MUSLIM`
- **Verified Answer**: ঘুম ও জাগ্রত হওয়া, সালাত ও অজু, সুরক্ষা ও আশ্রয়, বিপদ ও রোগব্যাধি, ঘর ও পরিবার, পানাহার ও পোশাক, সফর ও যাত্রা ইত্যাদি ক্যাটাগরিতে দু'আগুলো সাজানো রয়েছে।
- **Knowledge Section**: Hisnul Muslim (`9`)
- **Forbidden Unrelated Topics**: Market Orders (`13`)
- **Source Reference**: `src/services/hisnulMuslimService.ts`

---

### FAQ 057
- **Question**: ডিজিটাল তাসবীহ (Digital Tasbih) কীভাবে চালু করব?
- **Intent**: `TASBIH`
- **Verified Answer**: All Features ➔ "ডিজিটাল তাসবীহ" অথবা Profile ➔ "Tasbih" এ ক্লিক করে তাসবীহ কাউন্টার ওপেন করুন। স্ক্রিনের যেকোনো স্থানে ট্যাপ করে যিকির কাউন্ট করুন।
- **Knowledge Section**: Digital Tasbih (`10`), Navigation (`3`)
- **Forbidden Unrelated Topics**: Merchant (`14`), Rider (`15`)
- **Source Reference**: `src/components/DigitalTasbihModal.tsx`

---

### FAQ 058
- **Question**: তাসবীহতে ভাইব্রেশন (Vibration) অন করব কীভাবে?
- **Intent**: `TASBIH`
- **Verified Answer**: ডিজিটাল তাসবীহ স্ক্রিনের উপরের টুলবার থেকে ভাইব্রেশন আইকনে ট্যাপ করে ভাইব্রেশন মোড চালু করুন। প্রতি ট্যাপে ও ৩৩/১০০ পূর্ণ হলে মৃদু ভাইব্রেশন হবে।
- **Knowledge Section**: Digital Tasbih (`10`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`)
- **Source Reference**: `src/components/DigitalTasbihModal.tsx`

---

### FAQ 059
- **Question**: কাস্টম যিকির বা নিজস্ব টার্গেট সেট করা যায়?
- **Intent**: `TASBIH`
- **Verified Answer**: হ্যাঁ, "Add Custom Zikr" অপশন থেকে আপনার পছন্দের জিকিরের নাম ও টার্গেট কাউন্ট (যেমন: ৩৩, ১০০ বা কাস্টম সংখ্যা) লিখে নতুন কাউন্টার তৈরি করতে পারেন।
- **Knowledge Section**: Digital Tasbih (`10`)
- **Forbidden Unrelated Topics**: Tokens (`7`)
- **Source Reference**: `src/components/DigitalTasbihModal.tsx`

---

### FAQ 060
- **Question**: তাসবীহ কাউন্টার রিসেট করার নিয়ম কী?
- **Intent**: `TASBIH`
- **Verified Answer**: কাউন্টারের পাশে থাকা রিসেট (Rotate) বাটনে চাপ দিলে বর্তমান গণনা শূন্য (০) হয়ে যাবে।
- **Knowledge Section**: Digital Tasbih (`10`)
- **Forbidden Unrelated Topics**: Market (`13`)
- **Source Reference**: `src/components/DigitalTasbihModal.tsx`

---

### FAQ 061
- **Question**: কিবলা কম্পাস (Qibla Compass) কীভাবে কাজ করে?
- **Intent**: `QIBLA`
- **Verified Answer**: কিবলা কম্পাস আপনার মোবাইলের বিল্ট-ইন ম্যাগনেটোমিটার সেন্সর ও জিপিএস ব্যবহার করে পবিত্র কাবার নিখুঁত দিক ও ডিগ্রির মান প্রদর্শন করে।
- **Knowledge Section**: Qibla Direction Compass (`11`), Navigation (`3`)
- **Forbidden Unrelated Topics**: Tokens (`7`), Merchant (`14`)
- **Source Reference**: `src/components/QiblaFinderModal.tsx`, `src/utils/qibla.ts`

---

### FAQ 062
- **Question**: কিবলা কম্পাস ব্যবহারের সময় মোবাইল কীভাবে ধরতে হবে?
- **Intent**: `QIBLA`
- **Verified Answer**: মোবাইলটিকে সমতল বা ফ্ল্যাট (Flat) ভাবে মাটির সমান্তরালে রাখুন এবং কোনো ধাতব বস্তু বা চুম্বকীয় ক্ষেত্র থেকে দূরে রাখুন যাতে সেন্সর সঠিক দিক দেখাতে পারে।
- **Knowledge Section**: Qibla Direction Compass (`11`)
- **Forbidden Unrelated Topics**: Delivery (`15`)
- **Source Reference**: `src/components/QiblaFinderModal.tsx`

---

### FAQ 063
- **Question**: কিবলা খোঁজার জন্য কি লোকেশন অন থাকতে হবে?
- **Intent**: `QIBLA`
- **Verified Answer**: হ্যাঁ, আপনার অবস্থানের সাপেক্ষে মক্কার সঠিক দিকনির্ণয় করতে ডিভাইসের লোকেশন / জিপিএস পারমিশন চালু থাকতে হবে।
- **Knowledge Section**: Qibla Direction Compass (`11`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`)
- **Source Reference**: `src/utils/qibla.ts`

---

### FAQ 064
- **Question**: তাসবীহর পূর্বের হিস্ট্রি কোথায় পাব?
- **Intent**: `TASBIH`
- **Verified Answer**: তাসবীহ স্ক্রিনের হিস্ট্রি (History) ট্যাবে ট্যাপ করলে আপনার অতীত দিনের জিকির সংখ্যা ও সেশনের বিস্তারিত হিসেব দেখতে পাবেন।
- **Knowledge Section**: Digital Tasbih (`10`)
- **Forbidden Unrelated Topics**: Merchant Portal (`14`)
- **Source Reference**: `src/components/DigitalTasbihModal.tsx`

---

### FAQ 065
- **Question**: পার্টনার শপ (Partner Shops) কী?
- **Intent**: `PARTNER_SHOP`
- **Verified Answer**: পার্টনার শপ হলো কেভ কম্প্যানিয়ন্সের সাথে নিবন্ধিত হালাল ব্যবসা প্রতিষ্ঠান (যেমন: ইসলামিক পোশাকের দোকান, রেস্তোরাঁ, সুপারশপ, ফার্মেসি), যেখানে আপনি টোকেন দেখিয়ে বিশেষ ছাড় পেতে পারেন।
- **Knowledge Section**: Partner Shops (`12`), Navigation (`3`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`), Hisnul Muslim (`9`)
- **Source Reference**: `src/components/PartnerShopsView.tsx`

---

### FAQ 066
- **Question**: পার্টনার শপ কীভাবে খুঁজব?
- **Intent**: `PARTNER_SHOP`
- **Verified Answer**: নিচের মেনু থেকে "Shops" ট্যাবে যান। সেখানে আপনার জেলা ও উপজেলা ফিল্টার করে নিকটস্থ সকল পার্টনার শপের নাম, ঠিকানা, ডিসকাউন্ট রেট ও ফোন নম্বর দেখতে পাবেন।
- **Knowledge Section**: Partner Shops (`12`), Navigation (`3`)
- **Forbidden Unrelated Topics**: Quran (`8`), Tasbih (`10`)
- **Source Reference**: `src/components/PartnerShopsView.tsx`

---

### FAQ 067
- **Question**: দোকানে গিয়ে টোকেন দিয়ে কীভাবে ছাড় পাব?
- **Intent**: `TOKEN_REDEMPTION`
- **Verified Answer**: পার্টনার দোকানে কেনাকাটা শেষে শপের কিউআর কোড স্ক্যান করুন অথবা "Shop Redemption" অপশনে গিয়ে শপের কোড দিয়ে আপনার গোল্ড, সিলভার বা ব্রোঞ্জ টোকেন সিলেক্ট করে রিডিম কনফার্ম করুন। ক্যাশ মেমোতে ছাড় যুক্ত হবে।
- **Knowledge Section**: Tokens ➔ Token Redemption (`7.2`), Partner Shops (`12`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`), Cave Media (`17`)
- **Source Reference**: `src/components/ShopRedemptionModal.tsx`

---

### FAQ 068
- **Question**: পার্টনার শপে কি ক্যাটাগরি অনুযায়ী ফিল্টার করা যায়?
- **Intent**: `PARTNER_SHOP`
- **Verified Answer**: হ্যাঁ, শপ তালিকায় গিয়ে ফুড ও রেস্টুরেন্ট, মুদি ও গ্রোসারি, পোশাক ও ফ্যাশন, বই ও ইসলামিক আইটেম, ফার্মেসি ইত্যাদি ক্যাটাগরিতে দোকান ফিল্টার করতে পারেন।
- **Knowledge Section**: Partner Shops (`12`)
- **Forbidden Unrelated Topics**: Hisnul Muslim (`9`)
- **Source Reference**: `src/components/PartnerShopsView.tsx`

---

### FAQ 069
- **Question**: পার্টনার শপের ঠিকানা ও লোকেশন ম্যাপে দেখা যায়?
- **Intent**: `PARTNER_SHOP`
- **Verified Answer**: হ্যাঁ, যেকোনো শপের কার্ডে ক্লিক করলে শপের বিস্তারিত বিবরণ, খোলার সময় এবং গুগল ম্যাপ লোকেশন পিন দেখতে পাবেন।
- **Knowledge Section**: Partner Shops (`12`)
- **Forbidden Unrelated Topics**: Tokens (`7`)
- **Source Reference**: `src/components/ShopDetailsView.tsx`, `src/components/ShopLocationModal.tsx`

---

### FAQ 070
- **Question**: পার্টনার শপের ডিসকাউন্ট কি সবসময় পাওয়া যায়?
- **Intent**: `PARTNER_SHOP`
- **Verified Answer**: শপগুলো তাদের নির্ধারিত অফার সময় অনুযায়ী ডিসকাউন্ট প্রদান করে। শপ কার্ডের উপর অ্যাক্টিভ ডিসকাউন্ট পার্সেন্টেজ উল্লেখ থাকে।
- **Knowledge Section**: Partner Shops (`12`)
- **Forbidden Unrelated Topics**: Rider Tasks (`15`)
- **Source Reference**: `src/components/PartnerShopsView.tsx`

---

### FAQ 071
- **Question**: পার্টনার দোকানে টোকেন রিডিম করলে কি ক্যাশব্যাক পাওয়া যাবে?
- **Intent**: `TOKEN_REDEMPTION`
- **Verified Answer**: না, টোকেন সরাসরি ক্যাশ বা টাকায় রূপান্তরযোগ্য নয়। এটি শুধুমাত্র কেনাকাটার মূল বিল থেকে তাৎক্ষণিক মূল্যছাড় (Discount) হিসেবে প্রযোজ্য।
- **Knowledge Section**: Tokens ➔ Token Redemption (`7.2`)
- **Forbidden Unrelated Topics**: Mosque Submission (`5.3`)
- **Source Reference**: `src/components/TokenRulesView.tsx`

---

### FAQ 072
- **Question**: অনলাইনে কি পার্টনার শপের পণ্য কিনতে পারব?
- **Intent**: `CAVE_MARKET`
- **Verified Answer**: হ্যাঁ, পার্টনার শপগুলোর পণ্য "Cave Market" ট্যাবে তালিকাভুক্ত থাকে। আপনি সেখান থেকে সরাসরি কার্টে যুক্ত করে হোম ডেলিভারি অর্ডার করতে পারেন।
- **Knowledge Section**: Cave Market (`13`), Navigation (`3`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`)
- **Source Reference**: `src/components/CaveMarketView.tsx`

---

### FAQ 073
- **Question**: লোকাল মার্কেট (Local Market) ও ন্যাশনাল মার্কেট (Nationwide Market) এর মধ্যে পার্থক্য কী?
- **Intent**: `CAVE_MARKET`
- **Verified Answer**: লোকাল মার্কেট হলো আপনার নিজ জেলা/উপজেলার দোকানগুলোর বাজার যেখানে লোকাল রাইডারে ৩০-৬০ মিনিটে দ্রুত ডেলিভারি পাওয়া যায়। আর ন্যাশনাল মার্কেট হলো সারাদেশের নির্ভরযোগ্য ইসলামিক বই, আতর, মধু ও পণ্যের জাতীয় বাজার যা কুরিয়ারের মাধ্যমে সরবরাহ করা হয়।
- **Knowledge Section**: Cave Market ➔ Marketplace Types (`13`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`), Tasbih (`10`)
- **Source Reference**: `src/components/CaveMarketView.tsx`

---

### FAQ 074
- **Question**: কেভ মার্কেটে পণ্য কীভাবে অর্ডার করব?
- **Intent**: `ORDER`
- **Verified Answer**: Cave Market ট্যাবে যান ➔ পছন্দের পণ্য সিলেক্ট করুন ➔ "Buy Now" বা কার্টে যোগ করুন ➔ ডেলিভারি ঠিকানা দিন ➔ ওয়ালেটের টোকেন ডিসকাউন্ট সিলেক্ট করুন ➔ ক্যাশ অন ডেলিভারি বা পেমেন্ট নিশ্চিত করুন।
- **Knowledge Section**: Cave Market ➔ Order Lifecycle (`13`)
- **Forbidden Unrelated Topics**: Rider Registration (`15`), Add Mosque (`5.3`)
- **Source Reference**: `src/components/CaveMarketView.tsx`, `src/components/ProductBuyModal.tsx`

---

### FAQ 075
- **Question**: আমার অর্ডারের অবস্থা (Order Status) কীভাবে জানব?
- **Intent**: `ORDER`
- **Verified Answer**: Cave Market-এর উপরে থাকা "My Orders" বাটনে ক্লিক করুন। সেখানে পেন্ডিং, প্রিপেয়ারিং, রাইডার অ্যাসাইনড বা ডেলিভারড সকল অর্ডারের রিয়েলটাইম স্ট্যাটাস দেখতে পাবেন।
- **Knowledge Section**: Cave Market ➔ Order Lifecycle (`13`)
- **Forbidden Unrelated Topics**: Quran (`8`), Tasbih (`10`)
- **Source Reference**: `src/components/MyOrdersModal.tsx`

---

### FAQ 076
- **Question**: ডেলিভারি রাইডারকে লাইভ ম্যাপে ট্র্যাক করা যায়?
- **Intent**: `DELIVERY`
- **Verified Answer**: হ্যাঁ, লোকাল মার্কেটের অর্ডারে রাইডার অ্যাসাইন হওয়ার পর "My Orders" থেকে "Track Live" অপশনে চাপলে লাইভ ম্যাপে রাইডারের বর্তমান অবস্থান, আপনার দূরত্ব এবং আনুমানিক সময় (ETA) দেখতে পাবেন।
- **Knowledge Section**: Cave Market ➔ Live Order Tracking (`13`)
- **Forbidden Unrelated Topics**: Merchant Registration (`14`)
- **Source Reference**: `src/components/LocalOrderTracking.tsx`

---

### FAQ 077
- **Question**: ক্যাশ অন ডেলিভারি (Cash on Delivery) সুবিধা আছে?
- **Intent**: `ORDER`
- **Verified Answer**: হ্যাঁ, কেভ মার্কেটের লোকাল ও ন্যাশনাল অধিকাংশ পণ্যে ক্যাশ অন ডেলিভারিতে পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা রয়েছে।
- **Knowledge Section**: Cave Market (`13`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`)
- **Source Reference**: `src/components/ProductBuyModal.tsx`

---

### FAQ 078
- **Question**: পণ্যের দামের ওপর টোকেন ছাড় কীভাবে যুক্ত হবে?
- **Intent**: `CAVE_MARKET`
- **Verified Answer**: চেকআউট স্ক্রিনে আপনার ওয়ালেটে থাকা গোল্ড, সিলভার বা ব্রোঞ্জ টোকেন সিলেক্ট করলে মোট বিল থেকে টোকেনের নির্ধারিত মূল্যছাড় স্বয়ংক্রিয়ভাবে বিয়োগ হয়ে যাবে।
- **Knowledge Section**: Cave Market (`13`), Tokens (`7.2`)
- **Forbidden Unrelated Topics**: Rider Tasks (`15`)
- **Source Reference**: `src/components/ProductBuyModal.tsx`

---

### FAQ 079
- **Question**: অর্ডার ক্যানসেল করা যাবে কি?
- **Intent**: `ORDER`
- **Verified Answer**: অর্ডারটি 'Pending' থাকা অবস্থায় আপনি My Orders থেকে ক্যানসেল করতে পারবেন। মার্চেন্ট প্রস্তুতি বা রাইডার পিকআপ করে ফেললে ক্যানসেল করা যায় না।
- **Knowledge Section**: Cave Market (`13`)
- **Forbidden Unrelated Topics**: Quran (`8`)
- **Source Reference**: `server/routes/orderRoutes.ts`

---

### FAQ 080
- **Question**: কার্ট (Cart) থেকে পণ্য রিমুভ করব কীভাবে?
- **Intent**: `ORDER`
- **Verified Answer**: মার্কেট স্ক্রিনের উপরে থাকা কার্ট আইকনে ট্যাপ করে কার্ট ওপেন করুন। পণ্যের পাশে থাকা ডিলিট বা মাইনাস (-) আইকনে চেপে পণ্যটি সরিয়ে ফেলতে পারেন।
- **Knowledge Section**: Cave Market (`13`)
- **Forbidden Unrelated Topics**: Mosque Directory (`5`)
- **Source Reference**: `src/components/CartModal.tsx`

---

### FAQ 081
- **Question**: কেভ মার্কেটে কী কী ধরনের পণ্য পাওয়া যায়?
- **Intent**: `CAVE_MARKET`
- **Verified Answer**: ইসলামিক বই, কুরআন ও হাদিস গ্রন্থ, খাঁটি মধু ও ঘি, আতর ও তসবিহ, পাঞ্জাবি, টুপি, বোরকা-হিজাব, অর্গানিক ফুড ও নিত্যপ্রয়োজনীয় হালাল সামগ্রী।
- **Knowledge Section**: Cave Market (`13`)
- **Forbidden Unrelated Topics**: Admin Database (`16`)
- **Source Reference**: `src/components/CaveMarketView.tsx`

---

### FAQ 082
- **Question**: ডেলিভারি চার্জ কত?
- **Intent**: `DELIVERY`
- **Verified Answer**: লোকাল অর্ডারে দূরত্বের ওপর ভিত্তি করে সুলভ লোকাল রাইডার ফি ধার্য হয় এবং ন্যাশনাল অর্ডারে স্ট্যান্ডার্ড কুরিয়ার ডেলিভারি চার্জ প্রযোজ্য হয়, যা চেকআউটে প্রদর্শিত হয়।
- **Knowledge Section**: Cave Market (`13`)
- **Forbidden Unrelated Topics**: Hisnul Muslim (`9`)
- **Source Reference**: `src/components/ProductBuyModal.tsx`, `server/routes/orderRoutes.ts`

---

### FAQ 083
- **Question**: মার্চেন্ট রেজিস্ট্রেশনের জন্য কী কী ডকুমেন্ট লাগবে?
- **Intent**: `MERCHANT`
- **Verified Answer**: মার্চেন্ট রেজিস্ট্রেশনের জন্য মালিকের জাতীয় পরিচয়পত্র (NID) নম্বর ও ছবি, ট্রেড লাইসেন্সের ছবি (প্রযোজ্য ক্ষেত্রে), দোকানের ছবি এবং দোকানের সঠিক জিপিএস লোকেশন পিন প্রয়োজন হয়।
- **Knowledge Section**: Authentication ➔ Merchant (`4`), Merchant Portal (`14`)
- **Forbidden Unrelated Topics**: Rider (`15`), Add Mosque (`5.3`)
- **Source Reference**: `src/components/MerchantRegistrationWizard.tsx`

---

### FAQ 084
- **Question**: মার্চেন্ট হিসেবে পণ্য কীভাবে আপলোড করব?
- **Intent**: `MERCHANT`
- **Verified Answer**: মার্চেন্ট পোর্টালে লগইন করে "Products" ট্যাবে যান ➔ "Add New Product" বাটনে ক্লিক করুন ➔ পণ্যের নাম, ক্যাটাগরি, মূল্য, ছবি ও টোকেন ডিসকাউন্ট নির্ধারণ করে সেভ করুন।
- **Knowledge Section**: Merchant Portal (`14`)
- **Forbidden Unrelated Topics**: Rider Tasks (`15`), Quran (`8`)
- **Source Reference**: `src/components/MerchantProductsTab.tsx`

---

### FAQ 085
- **Question**: মার্চেন্ট একাউন্ট অনুমোদন হতে কতদিন সময় লাগে?
- **Intent**: `MERCHANT`
- **Verified Answer**: সাবমিট করার পর সাধারণত ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এডমিন টিম তথ্য ও ডকুমেন্টস যাচাই করে মার্চেন্ট একাউন্ট অনুমোদন করে থাকে।
- **Knowledge Section**: Merchant Portal (`14`), Admin (`16`)
- **Forbidden Unrelated Topics**: Hisnul Muslim (`9`)
- **Source Reference**: `server/routes/merchantRoutes.ts`

---

### FAQ 086
- **Question**: মার্চেন্ট পোর্টালে নতুন অর্ডারের নোটিফিকেশন কীভাবে আসবে?
- **Intent**: `MERCHANT`
- **Verified Answer**: কোনো কাস্টমার অর্ডার করলে মার্চেন্ট ড্যাশবোর্ডে নতুন অর্ডারের অ্যালার্ট প্রদর্শিত হবে এবং আপনি সেখান থেকে অর্ডার একসেপ্ট (Accept) ও প্রিপেয়ারিং মার্ক করতে পারবেন।
- **Knowledge Section**: Merchant Portal (`14`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`)
- **Source Reference**: `src/components/MerchantPortalView.tsx`

---

### FAQ 087
- **Question**: মার্চেন্ট ব্যালেন্স উইথড্র (টাকা উত্তোলন) করবেন কীভাবে?
- **Intent**: `MERCHANT`
- **Verified Answer**: মার্চেন্ট পোর্টালের Finance / Wallet সেকশনে গিয়ে আপনার বিক্রয়লব্ধ ব্যালেন্স দেখতে পাবেন এবং সেখান থেকে আপনার ব্যাংক বা মোবাইল ব্যাংকিং একাউন্টে উইথড্র রিকোয়েস্ট পাঠাতে পারবেন।
- **Knowledge Section**: Merchant Portal (`14`)
- **Forbidden Unrelated Topics**: Rider Tasks (`15`)
- **Source Reference**: `src/components/MerchantPortalView.tsx`, `server/routes/merchantRoutes.ts`

---

### FAQ 088
- **Question**: কোনো পণ্য স্টক আউট হলে কী করবেন?
- **Intent**: `MERCHANT`
- **Verified Answer**: মার্চেন্ট পোর্টালের Products ট্যাব থেকে নির্দিষ্ট পণ্যের পাশে থাকা "Available / Unavailable" টগল বাটনটি অফ করে দিলেই পণ্যটি মার্কেটে স্টক আউট দেখাবে।
- **Knowledge Section**: Merchant Portal (`14`)
- **Forbidden Unrelated Topics**: Quran (`8`)
- **Source Reference**: `src/components/MerchantProductsTab.tsx`

---

### FAQ 089
- **Question**: রিজেক্টেড মার্চেন্ট আবেদন কি পুনরায় ঠিক করে জমা দেওয়া যায়?
- **Intent**: `MERCHANT`
- **Verified Answer**: হ্যাঁ, কোনো ভুল তথ্যের কারণে আবেদন রিজেক্ট হলে লগইন স্ক্রিন থেকে মার্চেন্ট পোর্টালে গেলে রিজেকশনের কারণ দেখতে পাবেন এবং "Update & Resubmit" বাটনে ক্লিক করে তথ্য সংশোধন করে পুনরায় জমা দিতে পারবেন।
- **Knowledge Section**: Authentication ➔ Merchant (`4`), Merchant Portal (`14`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`)
- **Source Reference**: `src/components/MerchantCorrectionScreen.tsx`

---

### FAQ 090
- **Question**: মার্চেন্ট পাসওয়ার্ড ভুলে গেলে কীভাবে উদ্ধার করবেন?
- **Intent**: `MERCHANT`
- **Verified Answer**: মার্চেন্ট লগইন স্ক্রিনে "Forgot Password" অপশনে ক্লিক করে নিবন্ধিত মোবাইল নম্বরে প্রাপ্ত ওটিপি কোড দিয়ে নতুন পাসওয়ার্ড সেট করে নিতে পারেন।
- **Knowledge Section**: Authentication ➔ Merchant (`4`)
- **Forbidden Unrelated Topics**: Rider Tasks (`15`)
- **Source Reference**: `server/routes/merchantRoutes.ts`

---

### FAQ 091
- **Question**: রাইডার হিসেবে কাজ শুরু করার নিয়ম কী?
- **Intent**: `RIDER`
- **Verified Answer**: রাইডার একাউন্ট অনুমোদিত হওয়ার পর রাইডার পোর্টালে গিয়ে "Online" স্ট্যাটাস অন করুন। এরপর আপনার আশেপাশের শপ থেকে কাস্টমারের ঠিকানায় ডেলিভারি রিকোয়েস্ট আসবে।
- **Knowledge Section**: Rider Portal (`15`)
- **Forbidden Unrelated Topics**: Merchant Wizard (`14`), Mosque Submission (`5.3`)
- **Source Reference**: `src/components/RiderPortalView.tsx`

---

### FAQ 092
- **Question**: রাইডার কীভাবে ডেলিভারি রিকোয়েস্ট একসেপ্ট করবেন?
- **Intent**: `RIDER`
- **Verified Answer**: স্ক্রিনে আগত অর্ডারের পিকআপ শপ, ডেলিভারি লোকেশন ও ডেলিভারি ফি দেখে "Accept Order" বাটনে চাপ দিন এবং ইন-অ্যাপ ম্যাপ দেখে দোকানে গিয়ে পণ্য সংগ্রহ করুন।
- **Knowledge Section**: Rider Portal (`15`)
- **Forbidden Unrelated Topics**: Quran (`8`)
- **Source Reference**: `src/components/RiderPortalView.tsx`

---

### FAQ 093
- **Question**: কাস্টমারকে পণ্য বুঝিয়ে দেওয়ার প্রমাণ কীভাবে জমা হবে?
- **Intent**: `RIDER`
- **Verified Answer**: কাস্টমারের কাছে পৌঁছানোর পর কাস্টমারের দেওয়া ডেলিভারি ওটিপি (OTP) বা কনফার্মেশন কোড রাইডার অ্যাপে ইনপুট দিয়ে "Complete Delivery" নিশ্চিত করতে হয়।
- **Knowledge Section**: Rider Portal (`15`)
- **Forbidden Unrelated Topics**: Tokens (`7`)
- **Source Reference**: `src/components/RiderPortalView.tsx`

---

### FAQ 094
- **Question**: রাইডারের ডেলিভারি আয়ের হিসাব কোথায় দেখা যায়?
- **Intent**: `RIDER`
- **Verified Answer**: রাইডার পোর্টালের Earnings ট্যাবে দৈনিক ডেলিভারি সংখ্যা, অর্জিত মোট ডেলিভারি ফি এবং ট্রিপ হিস্ট্রি প্রদর্শিত হয়।
- **Knowledge Section**: Rider Portal (`15`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`)
- **Source Reference**: `src/components/RiderPortalView.tsx`

---

### FAQ 095
- **Question**: বাইক ছাড়াও কি সাইকেল দিয়ে রাইডার হওয়া যায়?
- **Intent**: `RIDER`
- **Verified Answer**: হ্যাঁ, রেজিস্ট্রেশনের সময় Vehicle Type হিসেবে সাইকেল (Bicycle) বা মোটর সাইকেল (Motorcycle) যেকোনো একটি নির্বাচন করা যায়।
- **Knowledge Section**: Authentication ➔ Rider (`4`), Rider Portal (`15`)
- **Forbidden Unrelated Topics**: Merchant Products (`14`)
- **Source Reference**: `src/components/RiderLogin.tsx`, `server/routes/riderRoutes.ts`

---

### FAQ 096
- **Question**: রাইডার ডিউটি সাময়িক বন্ধ রাখতে চাইলে কী করবেন?
- **Intent**: `RIDER`
- **Verified Answer**: রাইডার পোর্টালের উপরে থাকা পাওয়ার টগল বাটনে ক্লিক করে "Offline" হয়ে গেলেই নতুন কোনো ডেলিভারি কল আসবে না।
- **Knowledge Section**: Rider Portal (`15`)
- **Forbidden Unrelated Topics**: Quran (`8`)
- **Source Reference**: `src/components/RiderPortalView.tsx`

---

### FAQ 097
- **Question**: সাধারণ ইউজার একাউন্ট তৈরি করতে কী কী লাগে?
- **Intent**: `ACCOUNT`
- **Verified Answer**: সাধারণ ইউজার একাউন্ট খুলতে শুধুমাত্র নাম, মোবাইল নম্বর, পাসওয়ার্ড এবং জেলা ও উপজেলা নির্বাচন করে ৬ ডিজিটের এসএমএস ওটিপি ভেরিফাই করতে হয়।
- **Knowledge Section**: Authentication & Accounts (`4`)
- **Forbidden Unrelated Topics**: Merchant Wizard (`14`), Rider Portal (`15`)
- **Source Reference**: `src/components/RegistrationView.tsx`

---

### FAQ 098
- **Question**: গুগল (Google Sign-In) দিয়ে লগইন করা যায়?
- **Intent**: `ACCOUNT`
- **Verified Answer**: হ্যাঁ, লগইন স্ক্রিনে "Continue with Google" বাটনে চাপ দিয়ে সহজেই এক ক্লিকে গুগল একাউন্টের মাধ্যমে লগইন করা যায়।
- **Knowledge Section**: Authentication & Accounts (`4`)
- **Forbidden Unrelated Topics**: Add Mosque (`5.3`)
- **Source Reference**: `src/components/AuthScreen.tsx`

---

### FAQ 099
- **Question**: ওটিপি (OTP) না আসলে কী করব?
- **Intent**: `OTP`
- **Verified Answer**: ৬০ সেকেন্ডের কাউন্টডাউন শেষ হওয়া পর্যন্ত অপেক্ষা করুন এবং এরপর "Resend OTP / কোড পুনরায় পাঠান" বাটনে চাপ দিন। আপনার মোবাইল নেটওয়ার্ক সচল আছে কি না নিশ্চিত করুন।
- **Knowledge Section**: Authentication & Accounts (`4`)
- **Forbidden Unrelated Topics**: Market Orders (`13`)
- **Source Reference**: `src/components/AuthScreen.tsx`

---

### FAQ 100
- **Question**: অ্যাপের ভাষা (বাংলা থেকে ইংরেজি) পরিবর্তন করব কীভাবে?
- **Intent**: `PROFILE`
- **Verified Answer**: নিচের মেনু থেকে "Profile" ট্যাবে যান অথবা হেডার বারে থাকা গ্লোব/ভাষা আইকনে (BN / EN) ট্যাপ করে তাৎক্ষণিকভাবে ভাষা পরিবর্তন করতে পারেন।
- **Knowledge Section**: Profile & Language Settings (`18`), Navigation (`3`)
- **Forbidden Unrelated Topics**: Admin Database (`16`)
- **Source Reference**: `src/components/ProfileView.tsx`, `src/context/LanguageContext.tsx`

---

### FAQ 101
- **Question**: কেভ সার্কেল (Cave Circle) কী এবং এতে কীভাবে যোগ দেব?
- **Intent**: `APP_NAVIGATION`
- **Verified Answer**: কেভ সার্কেল হলো পরিবার ও বন্ধুদের সাথে দ্বীনি গ্রুপ তৈরির প্ল্যাটফর্ম যেখানে একে অপরের সালাত স্ট্রিক দেখতে পাবেন ও আমীর নির্বাচন করতে পারবেন। All Features ➔ "কেভ সার্কেল" এ গিয়ে নতুন গ্রুপ খুলুন বা ইনভাইট কোড দিয়ে যোগ দিন।
- **Knowledge Section**: Navigation ➔ Dedicated Features (`3`), Overview (`2`)
- **Forbidden Unrelated Topics**: Merchant (`14`), Rider (`15`)
- **Source Reference**: `src/components/CaveCirclesView.tsx`

---

### FAQ 102
- **Question**: কেভ মিডিয়া (CAVE Media) তে কী থাকে?
- **Intent**: `CAVE_MEDIA`
- **Verified Answer**: কেভ মিডিয়ায় নির্ভরযোগ্য সহিহ আকিদার আলেমদের ইসলামিক লেকচার, সংক্ষিপ্ত দ্বীনি নসীহা ও ভিডিও আলোচনা সংকলিত থাকে। All Features থেকে "কেভ মিডিয়া" অপশনে প্রবেশ করে এগুলো দেখা যায়।
- **Knowledge Section**: Cave Media (`17`), Navigation (`3`)
- **Forbidden Unrelated Topics**: Tokens (`7`), Merchant (`14`)
- **Source Reference**: `src/components/BlogView.tsx`

---

### FAQ 103
- **Question**: আসসালামু আলাইকুম
- **Intent**: `GENERAL_APP_QUESTION`
- **Verified Answer**: ওয়ালাইকুম আসসালাম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহ! আলহামদুলিল্লাহ, স্বাগতম Cave Companions-এ। আমি Cave AI, আপনার ২৪/৭ ইসলামিক পার্সোনাল অ্যাসিস্ট্যান্ট ও অ্যাপ গাইড। আপনাকে কীভাবে সাহায্য করতে পারি?
- **Knowledge Section**: Purpose (`1`), Application Overview (`2`)
- **Forbidden Unrelated Topics**: Complex technical stack details
- **Source Reference**: `src/services/caveAppGuideEngine.ts`

---

### FAQ 104
- **Question**: তুমি কে এবং তোমার কাজ কি?
- **Intent**: `GENERAL_APP_QUESTION`
- **Verified Answer**: আমি Cave AI—Cave Companions প্ল্যাটফর্মের নিজস্ব বুদ্ধিমত্তা সম্পন্ন এআই গাইড সহকারী। আমার কাজ হলো ব্যবহারকারীকে অ্যাপের সমস্ত ফিচার, সালাত ট্র্যাকিং, কেভ সার্কেল, ফেইথ টোকেন, পার্টনার শপ, মার্কেট নির্দেশিকা ও ইসলামিক বিষয়ে সঠিক ও নির্ভরযোগ্য তথ্য প্রদান করা।
- **Knowledge Section**: Purpose (`1`), Application Overview (`2`)
- **Forbidden Unrelated Topics**: Fabricated external claims
- **Source Reference**: `src/services/caveAppGuideEngine.ts`

---

### FAQ 105
- **Question**: Cave Companions এর মূল লক্ষ্য ও উদ্দেশ্য কী?
- **Intent**: `GENERAL_APP_QUESTION`
- **Verified Answer**: Cave Companions-এর মূল উদ্দেশ্য হলো মুসলিমদের দৈনন্দিন ৫ ওয়াক্ত সালাতের ধারাবাহিকতা ধরে রাখতে উৎসাহিত করা, কুরআন তিলাওয়াত ও সুন্নাহ অভ্যাসে স্ট্রিক বজায় রাখা, কেভ সার্কেলের মাধ্যমে পারস্পরিক জবাবদিহিতা তৈরি করা এবং ফেইথ টোকেন ও হালাল কেভ মার্কেটের মাধ্যমে নেক আমলকে বাস্তব জীবনে সম্মানিত করা।
- **Knowledge Section**: Purpose (`1`), Application Overview (`2`)
- **Forbidden Unrelated Topics**: Speculative roadmap items
- **Source Reference**: `src/services/caveAppGuideEngine.ts`
