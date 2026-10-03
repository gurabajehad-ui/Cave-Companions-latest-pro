# CAVE COMPANIONS
# AUTHORITATIVE AI INTENT DIRECTORY

---

## 1. FIND_MOSQUE
- **Meaning**: User wants to locate, search for, or get directions to an existing nearby approved mosque.
- **Example Questions**:
  - আমার আশেপাশের মসজিদ কোথায়?
  - কাছের মসজিদ কীভাবে খুঁজবো?
  - nearest mosque kothay?
  - How can I find a mosque near me?
  - আশেপাশের মসজিদের তালিকা দেখতে চাই।
- **Relevant Knowledge Base Section**: Mosque Directory ➔ Find Nearby Mosques (`5.1`)
- **Forbidden Knowledge Base Sections**: Add Mosque (`5.3`), Mosque Approval (`5.4`), Token Donation (`7.3`), Merchant (`14`), Rider (`15`)
- **Expected Response Style**: Concise navigation path and GPS locator instruction.
- **Status**: `IMPLEMENTED`

---

## 2. ADD_MOSQUE
- **Meaning**: User wants to submit a request to add a new mosque to the directory.
- **Example Questions**:
  - নতুন মসজিদ কীভাবে যুক্ত করবো?
  - আমাদের এলাকার মসজিদ অ্যাপে অ্যাড করতে চাই।
  - How to submit a new mosque?
  - notun mosque add korbo kivabe?
- **Relevant Knowledge Base Section**: Mosque Directory ➔ Add New Mosque Request (`5.3`)
- **Forbidden Knowledge Base Sections**: Find Nearby Mosques (`5.1`), Token Redemption (`7.2`), Quran (`8`), Merchant (`14`)
- **Expected Response Style**: Step-by-step submission instructions (Location pin, Imam info, photos).
- **Status**: `IMPLEMENTED`

---

## 3. MOSQUE_DETAILS
- **Meaning**: User is asking about a specific mosque's details, address, or Imam contact info.
- **Example Questions**:
  - মসজিদের ইমাম সাহেবের নম্বর কোথায় পাব?
  - এই মসজিদের ঠিকানা কী?
  - Mosque details & contact info.
- **Relevant Knowledge Base Section**: Mosque Directory ➔ Mosque Details (`5.2`)
- **Forbidden Knowledge Base Sections**: Add Mosque (`5.3`), Token Rules (`7.1`), Market (`13`)
- **Expected Response Style**: Direct information on accessing mosque detail card.
- **Status**: `IMPLEMENTED`

---

## 4. MOSQUE_LOCATION
- **Meaning**: User asks how mosque GPS location and geofence radius work.
- **Example Questions**:
  - মসজিদের রেডিয়াস কে নির্ধারণ করে?
  - মসজিদের জিওফেন্স কত মিটার?
  - Who sets mosque GPS radius?
- **Relevant Knowledge Base Section**: Mosque Directory ➔ Geofence Radius (`5.4`)
- **Forbidden Knowledge Base Sections**: Token Donation (`7.3`), Cave Media (`17`)
- **Expected Response Style**: Explain that only Super Admins configure the GPS geofence radius.
- **Status**: `IMPLEMENTED`

---

## 5. PRAYER_TIME
- **Meaning**: User asks about daily waqt prayer times, sunrise, or Sehri/Iftar timings.
- **Example Questions**:
  - আজকের আসরের ওয়াক্ত কয়টায়?
  - সেহরি ও ইফতারের সময়সূচি কোথায় পাব?
  - Prayer times for Dhaka district.
  - namajer somoy kothay dekhbo?
- **Relevant Knowledge Base Section**: Salat ➔ Prayer Times & Calculation (`6.3`)
- **Forbidden Knowledge Base Sections**: Merchant Portal (`14`), Rider Portal (`15`)
- **Expected Response Style**: Explain district-based calculation card on Home dashboard.
- **Status**: `IMPLEMENTED`

---

## 6. SALAT_VERIFICATION
- **Meaning**: User asks how congregational prayer is verified for daily token awards.
- **Example Questions**:
  - জামাতে সালাত কীভাবে ভেরিফাই করব?
  - জিপিএস ভেরিফিকেশন কীভাবে কাজ করে?
  - How does prayer verification work?
  - salat verification kivabe hoy?
- **Relevant Knowledge Base Section**: Salat ➔ Congregational Prayer Verification (`6.2`)
- **Forbidden Knowledge Base Sections**: Cave Journey Self-Logging (`6.1`), Add Mosque (`5.3`), Market (`13`)
- **Expected Response Style**: Explain GPS geofence matching during waqt time.
- **Status**: `IMPLEMENTED`

---

## 7. SALAT_HISTORY
- **Meaning**: User asks about Cave Journey, personal prayer logs, streaks, or consistency analytics.
- **Example Questions**:
  - কেভ জার্নিতে সালাত কীভাবে লগ করবো?
  - আমার নামাজের স্ট্রিক কোথায় দেখব?
  - Cave journey self-logging guide.
  - নামাযের সফর বা আমল ট্র্যাকার কী?
- **Relevant Knowledge Base Section**: Salat ➔ Cave Journey (`6.1`)
- **Forbidden Knowledge Base Sections**: GPS Verification (`6.2`), Merchant (`14`), Admin (`16`)
- **Expected Response Style**: Explain manual self-recording journal without GPS.
- **Status**: `IMPLEMENTED`

---

## 8. TOKEN_BALANCE
- **Meaning**: User asks where to see their earned tokens and token tier breakdown.
- **Example Questions**:
  - আমার টোকেন ব্যালেন্স কোথায় দেখব?
  - কয়টা গোল্ড টোকেন আছে কীভাবে জানব?
  - Where to check my token wallet?
  - token balance kothay pabo?
- **Relevant Knowledge Base Section**: Navigation ➔ My Tokens (`3`), Tokens (`7.1`)
- **Forbidden Knowledge Base Sections**: Merchant Registration (`14`), Quran (`8`)
- **Expected Response Style**: Direct to "My Tokens" bottom navigation tab.
- **Status**: `IMPLEMENTED`

---

## 9. TOKEN_EARNING
- **Meaning**: User asks how to earn Faith Tokens, daily limits, and tier requirements.
- **Example Questions**:
  - Gold token কীভাবে পাব?
  - টোকেন কীভাবে অর্জন হয়?
  - How to earn faith tokens?
  - token kivabe earn korbo?
  - প্রতিদিন কয়টি টোকেন পাওয়া যায়?
- **Relevant Knowledge Base Section**: Tokens ➔ Daily Earning Limits & Tiers (`7.1`)
- **Forbidden Knowledge Base Sections**: Token Donation (`7.3`), Token Redemption (`7.2`), Add Mosque (`5.3`), Merchant (`14`)
- **Expected Response Style**: Clear breakdown of 5 waqt (Gold), 4 waqt (Silver), 3 waqt (Bronze) with max 1 token/day rule.
- **Status**: `IMPLEMENTED`

---

## 10. TOKEN_REDEMPTION
- **Meaning**: User asks how to spend or redeem tokens for shopping discounts.
- **Example Questions**:
  - পার্টনার শপে টোকেন কীভাবে খরচ করব?
  - টোকেন দিয়ে ডিসকাউন্ট কীভাবে পাব?
  - How to redeem tokens at partner stores?
  - token spend korbo kivabe?
- **Relevant Knowledge Base Section**: Tokens ➔ Token Redemption at Partner Shops (`7.2`)
- **Forbidden Knowledge Base Sections**: Token Donation (`7.3`), Token Earning (`7.1`), Add Mosque (`5.3`)
- **Expected Response Style**: Explain 1 token per purchase rule and QR scan/market discount process.
- **Status**: `IMPLEMENTED`

---

## 11. TOKEN_DONATION
- **Meaning**: User asks how to donate tokens as Sadakah to a mosque.
- **Example Questions**:
  - Token দিয়ে মসজিদে দান করা যাবে?
  - টোকেন সাদাকাহ করব কীভাবে?
  - Can I donate my tokens to a mosque?
  - token mosque sadakah kivabe dibo?
- **Relevant Knowledge Base Section**: Tokens ➔ Token Mosque Sadakah Donation (`7.3`)
- **Forbidden Knowledge Base Sections**: Token Redemption (`7.2`), Partner Shop (`12`), Rider (`15`)
- **Expected Response Style**: Guide user to "My Tokens" page ➔ Mosque Sadakah donate button.
- **Status**: `IMPLEMENTED`

---

## 12. QURAN
- **Meaning**: User asks about reading Quran, Surahs, Bengali translations, audio recitation, or Khatam tracker.
- **Example Questions**:
  - Quran কোথায় পাব?
  - কুরআন তিলাওয়াত ও অডিও কীভাবে শুনব?
  - How to read Quran with Bengali translation?
  - quran majid kothay ase?
- **Relevant Knowledge Base Section**: Al-Quran Majeed (`8`), Navigation (`3`)
- **Forbidden Knowledge Base Sections**: Tokens (`7`), Market (`13`), Merchant (`14`)
- **Expected Response Style**: Direct navigation to Quran Majeed view and feature summary.
- **Status**: `IMPLEMENTED`

---

## 13. TAFSIR
- **Meaning**: User asks specifically for verse-by-verse Tafsir explanations.
- **Example Questions**:
  - কুরআনের তাফসির আছে কি?
  - Surah Baqarah tafsir.
- **Relevant Knowledge Base Section**: Al-Quran Majeed (`8`), Current Limitations (`20`)
- **Forbidden Knowledge Base Sections**: Fabricated commentaries.
- **Expected Response Style**: Explain current translation availability and concise Islamic reference.
- **Status**: `PARTIALLY_IMPLEMENTED`

---

## 14. HADITH
- **Meaning**: User asks about Daily Nasiha or Hadith references in the app.
- **Example Questions**:
  - ডেইলি হাদিস কোথায় দেখতে পাব?
  - Daily Nasiha hadith inspiration.
- **Relevant Knowledge Base Section**: Navigation ➔ Home (`3`), Application Overview (`2`)
- **Forbidden Knowledge Base Sections**: Merchant Portal (`14`), Rider Portal (`15`)
- **Expected Response Style**: Point to Home dashboard Daily Nasiha card.
- **Status**: `IMPLEMENTED`

---

## 15. HISNUL_MUSLIM
- **Meaning**: User asks for daily supplications (Duas) and morning/evening Adhkar.
- **Example Questions**:
  - সকাল সন্ধ্যার জিকির কোথায় পাব?
  - হিসনুল মুসলিম দুআ কীভাবে খুঁজব?
  - Morning & Evening Adhkar guide.
  - hisnul muslim dua kothay pabo?
- **Relevant Knowledge Base Section**: Hisnul Muslim (`9`), Navigation (`3`)
- **Forbidden Knowledge Base Sections**: Tokens (`7`), Orders (`13`), Delivery (`15`)
- **Expected Response Style**: Direct navigation to Hisnul Muslim module with category breakdown.
- **Status**: `IMPLEMENTED`

---

## 16. TASBIH
- **Meaning**: User asks about the Digital Tasbih counter, vibration, and custom zikr.
- **Example Questions**:
  - ডিজিটাল তাসবীহ কীভাবে ব্যবহার করব?
  - তসবিহ গণনা ও ভাইব্রেশন অন করব কীভাবে?
  - How to use digital tasbih?
  - tasbih counter kivabe chalabo?
- **Relevant Knowledge Base Section**: Digital Tasbih (`10`), Navigation (`3`)
- **Forbidden Knowledge Base Sections**: Partner Shops (`12`), Admin (`16`)
- **Expected Response Style**: Guide to opening Digital Tasbih modal and setting custom target laps.
- **Status**: `IMPLEMENTED`

---

## 17. QIBLA
- **Meaning**: User asks how to find Kaaba / Qibla direction using the compass.
- **Example Questions**:
  - কিবলা কোন দিকে কীভাবে বুঝব?
  - কিবলা কম্পাস কীভাবে চালু করব?
  - How to find Qibla direction?
  - qibla compass kothay?
- **Relevant Knowledge Base Section**: Qibla Direction Compass (`11`), Navigation (`3`)
- **Forbidden Knowledge Base Sections**: Market (`13`), Merchant (`14`)
- **Expected Response Style**: Instruct user to open Qibla Compass from All Features / Profile.
- **Status**: `IMPLEMENTED`

---

## 18. PARTNER_SHOP
- **Meaning**: User asks about finding verified partner shops and in-store discounts.
- **Example Questions**:
  - পার্টনার শপ কোথায় পাব?
  - আমাদের এলাকার পার্টনার দোকান কীভাবে খুঁজব?
  - How to find partner shops?
  - partner shop kothay ase?
- **Relevant Knowledge Base Section**: Partner Shops (`12`), Navigation (`3`)
- **Forbidden Knowledge Base Sections**: Add Mosque (`5.3`), Hisnul Muslim (`9`)
- **Expected Response Style**: Guide to Bottom Navigation "Shops" tab and district/upazila filters.
- **Status**: `IMPLEMENTED`

---

## 19. CAVE_MARKET
- **Meaning**: User asks about buying products, Local vs Nationwide market, or discounts.
- **Example Questions**:
  - লোকাল মার্কেট ও ন্যাশনাল মার্কেট কী?
  - কেভ মার্কেটে কীভাবে অর্ডার করব?
  - How does Cave Market work?
  - market theke kivabe kinbo?
- **Relevant Knowledge Base Section**: Cave Market (`13`), Navigation (`3`)
- **Forbidden Knowledge Base Sections**: Add Mosque (`5.3`), Tasbih (`10`)
- **Expected Response Style**: Explain Market tab, Local (rider 30-60m) vs Nationwide (courier), and token checkout.
- **Status**: `IMPLEMENTED`

---

## 20. ORDER
- **Meaning**: User asks how to place an order or view active orders.
- **Example Questions**:
  - পণ্য কীভাবে কিনব?
  - আমার অর্ডার কোথায় দেখব?
  - How to place an order and check status?
  - order kivabe dibo?
- **Relevant Knowledge Base Section**: Cave Market ➔ Order Lifecycle (`13`)
- **Forbidden Knowledge Base Sections**: Rider Registration (`15`), Add Mosque (`5.3`)
- **Expected Response Style**: Step-by-step ordering and checking "My Orders" modal.
- **Status**: `IMPLEMENTED`

---

## 21. DELIVERY
- **Meaning**: User asks how delivery works and how to track delivery riders live.
- **Example Questions**:
  - অর্ডার কীভাবে ট্র্যাক করব?
  - রাইডার কত দূরে আছে কীভাবে দেখব?
  - How to track my rider live on map?
  - rider tracking kivabe dekhbo?
- **Relevant Knowledge Base Section**: Cave Market ➔ Live Order Tracking (`13`)
- **Forbidden Knowledge Base Sections**: Merchant Application (`14`), Quran (`8`)
- **Expected Response Style**: Explain "My Orders" live GPS map tracking and ETA calculation.
- **Status**: `IMPLEMENTED`

---

## 22. MERCHANT
- **Meaning**: User asks how to become a partner merchant or access Merchant Portal.
- **Example Questions**:
  - Merchant account কীভাবে খুলবো?
  - মার্চেন্ট হব কীভাবে?
  - How to register as a merchant?
  - merchant registration kivabe korbo?
- **Relevant Knowledge Base Section**: Authentication ➔ Merchant (`4`), Merchant Portal (`14`)
- **Forbidden Knowledge Base Sections**: Rider Registration (`15`), Mosque Directory (`5`), Quran (`8`)
- **Expected Response Style**: Point user to Login Screen ➔ "অন্যান্য →" ➔ "মার্চেন্ট রেজিস্ট্রেশন".
- **Status**: `IMPLEMENTED`

---

## 23. RIDER
- **Meaning**: User asks how to become a delivery rider or access Rider Portal.
- **Example Questions**:
  - Rider হিসেবে কীভাবে register করবো?
  - রাইডার হব কীভাবে?
  - How to become a delivery rider?
  - rider login / registration kivabe kore?
- **Relevant Knowledge Base Section**: Authentication ➔ Rider (`4`), Rider Portal (`15`)
- **Forbidden Knowledge Base Sections**: Merchant Registration (`14`), Add Mosque (`5.3`)
- **Expected Response Style**: Point user to Login Screen ➔ "অন্যান্য →" ➔ "রাইডার রেজিস্ট্রেশন".
- **Status**: `IMPLEMENTED`

---

## 24. ADMIN
- **Meaning**: User or store manager asks about admin review or management.
- **Example Questions**:
  - এডমিন অনুমোদন কীভাবে পাব?
  - Admin approval process for mosques/merchants.
- **Relevant Knowledge Base Section**: Admin Capabilities (`16`)
- **Forbidden Knowledge Base Sections**: Exposing internal credentials or database structure.
- **Expected Response Style**: High-level explanation of admin review and approval timelines.
- **Status**: `IMPLEMENTED`

---

## 25. PROFILE
- **Meaning**: User asks about managing their profile, badges, or settings.
- **Example Questions**:
  - প্রোফাইল কীভাবে এডিট করব?
  - ভাষা পরিবর্তন করব কীভাবে?
  - How to switch language in profile?
- **Relevant Knowledge Base Section**: Profile & Language Settings (`18`), Navigation (`3`)
- **Forbidden Knowledge Base Sections**: Admin Database (`16`)
- **Expected Response Style**: Guide to Profile tab and language toggle button.
- **Status**: `IMPLEMENTED`

---

## 26. ACCOUNT
- **Meaning**: User asks about account registration, editing personal info, or logging in.
- **Example Questions**:
  - নতুন একাউন্ট কীভাবে খুলব?
  - How to create a user account?
  - account kivabe khulbo?
- **Relevant Knowledge Base Section**: Authentication & Accounts (`4`)
- **Forbidden Knowledge Base Sections**: Merchant Wizard (`14`), Rider Portal (`15`)
- **Expected Response Style**: Explain user signup form with mobile phone & OTP verification.
- **Status**: `IMPLEMENTED`

---

## 27. PASSWORD
- **Meaning**: User forgot password or wants to reset password.
- **Example Questions**:
  - আমার password ভুলে গেছি
  - পাসওয়ার্ড কীভাবে রিসেট করব?
  - Forgot my password, how to reset?
  - password vule gesi ki korbo?
- **Relevant Knowledge Base Section**: Authentication & Accounts ➔ Password Recovery (`4`)
- **Forbidden Knowledge Base Sections**: Mosque Submission (`5.3`), Market (`13`)
- **Expected Response Style**: Guide to Login screen ➔ "পাসওয়ার্ড ভুলে গেছেন?" ➔ OTP verification.
- **Status**: `IMPLEMENTED`

---

## 28. OTP
- **Meaning**: User asks why they didn't receive OTP or how OTP works.
- **Example Questions**:
  - OTP কোড আসছে না কেন?
  - ওটিপি ভেরিফিকেশন কীভাবে করব?
  - SMS OTP verification help.
- **Relevant Knowledge Base Section**: Authentication & Accounts (`4`)
- **Forbidden Knowledge Base Sections**: Unrelated app features.
- **Expected Response Style**: Explain 6-digit SMS OTP, countdown timer, and resend button.
- **Status**: `IMPLEMENTED`

---

## 29. CAVE_MEDIA
- **Meaning**: User asks about Islamic lectures, articles, and media content.
- **Example Questions**:
  - ইসলামিক লেকচার ও আলোচনা কোথায় পাব?
  - কেভ মিডিয়া কী?
  - Where to watch Islamic lectures?
  - cave media kothay?
- **Relevant Knowledge Base Section**: Cave Media (`17`), Navigation (`3`)
- **Forbidden Knowledge Base Sections**: Tokens (`7`), Merchant (`14`)
- **Expected Response Style**: Direct navigation to All Features ➔ "কেভ মিডিয়া".
- **Status**: `IMPLEMENTED`

---

## 30. APP_NAVIGATION
- **Meaning**: User asks general navigation questions regarding finding a specific feature.
- **Example Questions**:
  - All Features কোথায় পাব?
  - হোম পেজে কীভাবে ফিরে যাব?
  - Where is the main menu?
- **Relevant Knowledge Base Section**: Navigation (`3`)
- **Forbidden Knowledge Base Sections**: Unrelated detailed rules.
- **Expected Response Style**: Provide concise direct path instructions.
- **Status**: `IMPLEMENTED`

---

## 31. GENERAL_APP_QUESTION
- **Meaning**: Greetings, identity of Cave AI, or overview/purpose of Cave Companions.
- **Example Questions**:
  - আসসালামু আলাইকুম
  - তুমি কে?
  - Cave Companions কী এবং এর উদ্দেশ্য কী?
  - Who are you and what is Cave Companions?
- **Relevant Knowledge Base Section**: Purpose (`1`), Application Overview (`2`)
- **Forbidden Knowledge Base Sections**: Irrelevant technical minutiae.
- **Expected Response Style**: Polite Islamic greeting reply, clear assistant identity, and concise mission summary.
- **Status**: `IMPLEMENTED`

---

## 32. GENERAL_ISLAMIC_QUESTION
- **Meaning**: General Islamic question not specific to an app feature.
- **Example Questions**:
  - নামাজের গুরুত্ব কী?
  - মিসওয়াক করার সুন্নাত কী?
- **Relevant Knowledge Base Section**: General authentic Islamic guidance.
- **Forbidden Knowledge Base Sections**: Fabricated rulings, sectarian controversy.
- **Expected Response Style**: Brief authentic reminder with advice to consult local scholars for specific fatwas.
- **Status**: `IMPLEMENTED`

---

## 33. UNKNOWN
- **Meaning**: The query is completely outside the scope of Cave Companions or Islamic guidance.
- **Example Questions**:
  - আজকের আবহাওয়া কেমন?
  - Stock market price.
- **Relevant Knowledge Base Section**: None.
- **Forbidden Knowledge Base Sections**: All app docs.
- **Expected Response Style**: Polite notice that Cave AI is dedicated specifically to Cave Companions and Islamic lifestyle guidance.
- **Status**: `IMPLEMENTED`
