# CAVE COMPANIONS
# AUTHORITATIVE AI KNOWLEDGE BASE

---

## 1. Purpose

This document serves as the absolute, authoritative, source-code-grounded knowledge base for the Cave Companions AI Assistant. Every statement in this document has been audited directly against the executable source code of the Cave Companions application. 

The purpose of this knowledge base is to guarantee that the AI:
1. Gives exact, verified answers reflecting current application logic.
2. Never confuses separate intents (e.g., finding a mosque vs. adding a mosque, earning tokens vs. redeeming vs. donating).
3. Never fabricates non-existent buttons, fees, rules, or screens.
4. Strictly distinguishes between currently implemented features, partially implemented features, planned features, and unverified areas.

---

## 2. Application Overview

- **Application Name**: Cave Companions (কেভ কম্প্যানিয়নস)
- **Primary Mission**: An integrated Islamic lifestyle, worship habit tracker, mutual spiritual accountability (Cave Circles), and Halal commerce ecosystem.
- **Core Value Proposition**:
  - Daily 5-time prayer attendance and personal spiritual consistency (Cave Journey).
  - Daily Faith Token rewards for congregational prayer attendance at verified mosques.
  - Partner Shop discount redemptions and Mosque Sadakah donations using earned tokens.
  - Local and nationwide halal commerce marketplace (Cave Market) with on-demand rider delivery.
  - Islamic tools: Al-Quran Majeed (audio & translations), Hisnul Muslim authentic supplications, Digital Tasbih counter, Qibla compass, Sahri/Iftar timetable.
- **Implementation Status**: `IMPLEMENTED`
- **Source Reference**: `src/App.tsx`, `src/services/caveAppGuideEngine.ts`, `src/locales/bn.ts`, `src/locales/en.ts`

---

## 3. Navigation

The application uses a persistent 5-tab Bottom Navigation Bar along with dedicated modal views and secondary tabs accessible via "All Features & Tools" or direct action buttons.

### Primary Bottom Navigation Tabs
1. **Home (`home`)**
   - *Status*: `IMPLEMENTED`
   - *Navigation Path*: Bottom Navigation ➔ Home icon (১ম ট্যাব)
   - *Contents*: Daily Prayer Progress Card, Ad Banners, 5 Daily Waqt Cards, Feature Discovery Ticker, Sahri/Iftar Timetable, Daily Nasiha Card.
   - *Source*: `src/components/BottomNav.tsx`, `src/App.tsx`

2. **My Tokens (`tokens`)**
   - *Status*: `IMPLEMENTED`
   - *Navigation Path*: Bottom Navigation ➔ Tokens icon (২য় ট্যাব)
   - *Contents*: Active token balance, token tier history (Gold, Silver, Bronze), Mosque Sadakah donation interface, token rules link.
   - *Source*: `src/components/MyTokenView.tsx`, `src/components/BottomNav.tsx`

3. **Partner Shops (`shops`)**
   - *Status*: `IMPLEMENTED`
   - *Navigation Path*: Bottom Navigation ➔ Store icon (৩য় ট্যাব)
   - *Contents*: Directory of verified partner merchant shops, discount percentages, district/upazila location filters, QR redemption interface.
   - *Source*: `src/components/PartnerShopsView.tsx`, `src/components/ShopsView.tsx`

4. **Cave Market (`market`)**
   - *Status*: `IMPLEMENTED`
   - *Navigation Path*: Bottom Navigation ➔ Shopping Bag icon (৪র্থ ট্যাব)
   - *Contents*: Halal marketplace products, Local vs. Nationwide filter toggle, category filters, cart, token discount application, checkout, "My Orders" tracking.
   - *Source*: `src/components/CaveMarketView.tsx`

5. **Profile (`profile`)**
   - *Status*: `IMPLEMENTED`
   - *Navigation Path*: Bottom Navigation ➔ User icon (৫ম ট্যাব)
   - *Contents*: User info, streak stats, language toggle (BN/EN), settings, links to Quran, Hisnul Muslim, Cave Circles, Legal/Privacy, Logout.
   - *Source*: `src/components/ProfileView.tsx`

### Dedicated Feature Navigation Paths
- **Cave AI Guide**: Header Sparkles button or All Features ➔ "Cave AI"
- **All Features & Tools**: Home ➔ Top Header Grid / Discover ➔ All Features View (`AllFeaturesView.tsx`)
- **Cave Journey (Self-recorded Journal)**: Home Daily Progress Card ➔ "কেভ জার্নি" OR All Features ➔ "Cave Journey" (`SalahJourneyView.tsx`)
- **Nearby Mosques**: All Features ➔ "Nearby Mosques" OR Feature Discovery Ticker ➔ "নিকটস্থ মসজিদ" (`MosqueDirectoryModal.tsx`)
- **Digital Tasbih**: All Features ➔ "ডিজিটাল তাসবীহ" OR Profile ➔ "Tasbih" (`DigitalTasbihModal.tsx`)
- **Qibla Compass**: All Features ➔ "কিবলা কম্পাস" OR Profile ➔ "Qibla" (`QiblaFinderModal.tsx`)
- **Al-Quran Majeed**: All Features ➔ "আল-কুরআন" OR Profile ➔ "কুরআন মাজীদ" (`QuranMajidView.tsx`)
- **Hisnul Muslim (Dua & Adhkar)**: All Features ➔ "হিসনুল মুসলিম" OR Profile ➔ "হিসনুল মুসলিম" (`HisnulMuslimView.tsx`)
- **Cave Circles**: All Features ➔ "কেভ সার্কেল" OR Profile ➔ "কেভ সার্কেল" (`CaveCirclesView.tsx`)
- **CAVE Media (Islamic Lectures)**: All Features ➔ "কেভ মিডিয়া" (`BlogView.tsx`)
- **Token Rules**: Home Progress Card ➔ Info icon OR My Tokens ➔ "নিয়মাবলী" (`TokenRulesView.tsx`)
- **Merchant / Rider Portal Entry**: Main Auth/Login Screen ➔ Bottom "অন্যান্য →" (Others →) button (`AuthScreen.tsx`)

---

## 4. Authentication & Accounts

### General User Authentication
- **Registration**:
  - *Fields*: Mobile Phone (01XXXXXXXXX), Full Name, Password, Confirm Password, Gender (Male/Female), District, Upazila.
  - *Verification*: 6-digit SMS OTP verification code.
  - *Status*: `IMPLEMENTED`
  - *Source*: `src/components/RegistrationView.tsx`, `server/routes/authRoutes.ts`
- **Login**:
  - *Fields*: Mobile Phone or Email, Password.
  - *Status*: `IMPLEMENTED`
  - *Source*: `src/components/AuthScreen.tsx`, `server/auth.ts`
- **Password Recovery**:
  - *Flow*: User enters mobile number ➔ receives 6-digit SMS OTP ➔ inputs OTP with new password ➔ password reset confirmed.
  - *Status*: `IMPLEMENTED`
  - *Source*: `src/components/AuthScreen.tsx`, `server/routes/authRoutes.ts`
- **Google Sign-In**:
  - *Flow*: Google Identity Services (GSI) One-Tap / Button. If email already exists without Google link, prompts password to link account. If new user, prompts profile completion (phone, district, upazila).
  - *Status*: `IMPLEMENTED`
  - *Source*: `src/components/AuthScreen.tsx`, `server/routes/authRoutes.ts`

### Merchant Authentication
- **Access Point**: Auth Screen ➔ "অন্যান্য →" ➔ "মার্চেন্ট লগইন / রেজিস্ট্রেশন".
- **Registration**: Multi-step wizard requiring Owner Name, Phone, Email, Password, Shop Name, Category, District, Upazila, Full Address, GPS Location Pin, NID photo, Trade License photo.
- **Verification & Approval**: Submitted merchant accounts are in `PENDING` state until Admin reviews and approves.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/MerchantRegistrationWizard.tsx`, `server/routes/merchantRoutes.ts`

### Rider Authentication
- **Access Point**: Auth Screen ➔ "অন্যান্য →" ➔ "রাইডার লগইন / রেজিস্ট্রেশন".
- **Login**: Phone Number and Security PIN.
- **Registration Flow**: Name, Phone, District, Upazila, Vehicle Type (Bicycle / Motorcycle), Driving License / NID photos submitted for admin activation.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/RiderLogin.tsx`, `src/components/RiderPortalView.tsx`, `server/routes/riderRoutes.ts`

### Admin Authentication
- **Access Point**: Dedicated admin access URL / portal.
- **Authentication**: Admin token header (`x-admin-token` / Bearer).
- **Status*: `IMPLEMENTED`
- **Source*: `server/routes/adminRoutes.ts`

---

## 5. Mosque Directory & Location

### 5.1 Find Nearby Mosques (`FIND_MOSQUE`)
- **Behavior**: Users open Mosque Directory Modal. Clicking "নিকটস্থ মসজিদ খুঁজুন" requests GPS coordinates and sorts approved mosques by distance (in kilometers).
- **Search**: Search bar allows searching by Mosque Name, District, Upazila, or Address.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/MosqueDirectoryModal.tsx`, `server/routes/mosqueRoutes.ts`

### 5.2 Mosque Details (`MOSQUE_DETAILS`)
- **Information Shown**: Mosque Name, Full Address, Distance from user, Imam Name, Imam Phone Number, Photos, Verified Badge.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/MosqueDetailModal.tsx`, `src/components/MosqueDirectoryModal.tsx`

### 5.3 Add New Mosque Request (`ADD_MOSQUE`)
- **Behavior**: Users tap "Add Mosque / নতুন মসজিদ যুক্ত করুন" inside Mosque Directory.
- **Form Fields**: Mosque Name, Full Address, District, Upazila, Latitude & Longitude (via Interactive Google Map Picker), Imam Name, Imam Contact Number, Mosque Exterior/Interior Photos.
- **Submission Lifecycle**: Status starts as `PENDING`. Visible under user's "My Requests" tab.
- **Approval**: Admins review, verify geofence radius, and approve or reject with feedback.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/MosqueSubmissionModal.tsx`, `server/routes/mosqueRoutes.ts`

### 5.4 Geofence Radius Configuration
- **Rule**: Geofence radius (e.g., 100m, 150m) can ONLY be configured and updated by Admins from the Admin Panel. Regular users cannot set or modify the geofence radius.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/AdminMosqueManagement.tsx`, `server/routes/adminRoutes.ts`

### 5.5 Mosque QR Code Scanning
- **Rule**: Mosque physical QR code scanning is DEPRECATED and disabled. Prayer verification relies exclusively on live GPS geofencing.
- **Status*: `IMPLEMENTED (DEPRECATED RULE ENFORCED)`
- **Source*: `src/services/caveAppGuideEngine.ts`, `server/routes/mosqueRoutes.ts`

---

## 6. Salat & Worship Tracking

### 6.1 Cave Journey (Self-recorded Spiritual Journal)
- **Concept**: A personal worship habit tracker where the user manually logs daily prayers, fasting (Sawm), Quran recitation minutes, and morning/evening adhkar.
- **Verification**: **NO GPS or physical verification is required for Cave Journey.** It is purely self-recorded for personal habit streaks and spiritual consistency.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/SalahJourneyView.tsx`, `server/salahJourneyService.ts`

### 6.2 Congregational Prayer Verification (For Daily Tokens)
- **Concept**: Verifying attendance at an approved mosque during waqt time to qualify for daily Faith Tokens.
- **Male Verification**: Verified when user is physically located inside the approved mosque's GPS geofence boundary during prayer waqt.
- **Female Verification**: Verified via timely waqt check-in (at home or place of prayer) according to Islamic modesty guidelines.
- **Anti-Spoofing**: Built-in detection of mock coordinates, simulated accuracy anomalies, and GPS teleportation.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/CompactPrayersCard.tsx`, `src/utils/antiSpoofing.ts`, `server/routes/prayerRoutes.ts`

### 6.3 Prayer Times & Calculation
- **Method**: Real-time astrological calculation based on user's selected Bangladesh District coordinates (Salafi/Standard method). Displays Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha, and Sehri/Iftar timings.
- **Status*: `IMPLEMENTED`
- **Source*: `src/services/prayerTimeService.ts`, `src/data/prayerConfig.ts`

---

## 7. Faith Tokens Reward System

### 7.1 Daily Earning Limits & Tiers
- **Daily Limit**: Exactly **1 Token maximum per user per day**.
- **Tier Upgrading**:
  - **Gold Token (🥇)**: 5 Waqt Jama'ah prayer attendances in a single day. Highest partner shop discount & maximum Sadakah value.
  - **Silver Token (🥈)**: 4 Waqt Jama'ah prayer attendances in a single day. Standard discount rate.
  - **Bronze Token (🥉)**: 3 Waqt Jama'ah prayer attendances in a single day. Entry level discount rate.
  - Fewer than 3 prayers: No token awarded for that day.
- **Grace Period**: Tokens from the previous day can be claimed until 12:00 PM (noon) of the following day.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/TokenRulesView.tsx`, `server/testTokenRules.ts`, `server/timezone.ts`

### 7.2 Token Redemption at Partner Shops
- **Rule**: Exactly **1 Token per purchase/order**.
- **Mechanism**:
  - In-store: User scans Partner Shop's dynamic QR code or enters shop code via Shop Redemption Modal.
  - Online Market: Token discount is selected during checkout in Cave Market.
- **Single Use**: Once redeemed, the token status changes to `REDEEMED` and cannot be reused.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/ShopRedemptionModal.tsx`, `src/components/ProductBuyModal.tsx`, `server/routes/tokenRoutes.ts`

### 7.3 Token Mosque Sadakah Donation
- **Rule**: Users who do not wish to use tokens for commercial shopping discounts can donate their tokens as Sadakah directly to local mosque development funds via "My Tokens" page.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/MyTokenView.tsx`, `src/components/TokenRulesView.tsx`, `server/routes/tokenRoutes.ts`

---

## 8. Al-Quran Majeed

- **Features**: Complete 114 Surahs with Arabic Uthmani text, Bengali translation, English translation, verse-by-verse audio recitation, Tajweed color options, search by Surah name or number, bookmarks, and Khatam reading tracker.
- **Status*: `IMPLEMENTED`
- **Source*: `src/services/quranService.ts`, `src/data/quran/`

---

## 9. Hisnul Muslim (Fortress of the Muslim)

- **Features**: Authentic daily supplications and morning/evening Adhkar categorized by situations (Waking up, Prayer, Protection, Travel, Distress, Illness, Evening). Includes Arabic text, transliteration, Bengali meaning, Hadith reference, and repetition counter.
- **Status*: `IMPLEMENTED`
- **Source*: `src/services/hisnulMuslimService.ts`, `src/data/hisnulMuslimData.ts`

---

## 10. Digital Tasbih

- **Features**: Virtual bead counter, preset adhkar (SubhanAllah, Alhamdulillah, Allahu Akbar, Astaghfirullah, La Ilaha Illallah), custom zikr creation, target lap count (33, 100, custom), haptic vibration feedback, audio click sound toggle, and daily session history.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/DigitalTasbihModal.tsx`

---

## 11. Qibla Direction Compass

- **Features**: Real-time Kaaba compass orientation utilizing mobile device magnetometers and GPS geolocation. Displays precise azimuth degree heading towards Mecca from anywhere in Bangladesh.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/QiblaFinderModal.tsx`, `src/utils/qibla.ts`

---

## 12. Partner Shops

- **Features**: List of verified halal businesses (restaurants, supermarkets, Islamic clothing, bookstores, pharmacies) offering exclusive discounts to Cave Companions token holders. Filterable by District and Upazila. Displays opening hours, location map, discount percentage, and owner contact.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/PartnerShopsView.tsx`, `src/components/ShopDetailsView.tsx`, `server/routes/shopRoutes.ts`

---

## 13. Cave Market (Halal E-Commerce)

- **Marketplace Types**:
  - **Local Market**: Displays nearby partner shop inventory within the user's district/upazila for rapid 30–60 min delivery by local delivery riders.
  - **Nationwide Market**: Countrywide courier delivery for authentic Islamic books, honey, attar, dates, clothing, and organic products.
- **Order Lifecycle**: `PENDING` ➔ `CONFIRMED` ➔ `PREPARING` ➔ `RIDER_ASSIGNED` ➔ `ON_THE_WAY` ➔ `DELIVERED`.
- **Live Order Tracking**: "My Orders" modal displays real-time GPS map tracking of delivery rider, distance remaining, and estimated time of arrival (ETA).
- **Payment**: Cash on Delivery (COD) and Online Payment with token discount deduction.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/CaveMarketView.tsx`, `src/components/LocalOrderTracking.tsx`, `src/components/MyOrdersModal.tsx`, `server/routes/orderRoutes.ts`

---

## 14. Merchant Portal

- **Features**: Merchant dashboard, live sales metrics, product catalog management (add, edit, toggle availability), token redemption logs, order status management (Accept, Prepare, Handover to Rider), withdrawal balance requests.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/MerchantPortalView.tsx`, `src/components/MerchantProductsTab.tsx`, `server/routes/merchantRoutes.ts`

---

## 15. Rider Portal

- **Features**: Online/Offline duty toggle, nearby delivery dispatch requests, accept/reject delivery jobs, in-app turn-by-turn map navigation from merchant shop to customer address, OTP-based order handover, daily delivery earnings summary.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/RiderPortalView.tsx`, `server/routes/riderRoutes.ts`

---

## 16. Admin Capabilities

- **User-Relevant Scope**: Mosque submission verification & geofence configuration, merchant registration document auditing, rider account activation, product listing moderation, advertisement banner placement.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/AdminDashboardView.tsx`, `server/routes/adminRoutes.ts`

---

## 17. Cave Media

- **Features**: Curated library of authentic Islamic lectures, educational videos, and articles by reputable scholars. Filterable by topics (Aqeedah, Fiqh, Quran, Family).
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/BlogView.tsx`, `server/routes/mediaRoutes.ts`

---

## 18. Profile & Language Settings

- **Features**: User profile details, spiritual badges, streak fire counter, toggle language instantly between Bengali (বাংলা) and English (EN), push notification preferences, support helpline.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/ProfileView.tsx`, `src/context/LanguageContext.tsx`

---

## 19. Notifications

- **Features**: Waqt adhan alerts, circle reminder notifications, token reward notifications, order status change alerts.
- **Status*: `IMPLEMENTED`
- **Source*: `src/components/NotificationsView.tsx`, `src/services/prayerReminderService.ts`

---

## 20. Current Limitations

1. **Qaza Prayer Auto-Calculator**: Qaza prayer tracker has been removed from the application. Prayers are tracked as active daily waqts.
2. **Mosque QR Code Attendance**: Physical QR attendance at mosques is disabled; GPS geofencing is used instead.
3. **Token Earning on Self-logging**: Tokens are not earned for manual Cave Journey entries; tokens require verified congregational attendance.
4. **Third-party Payment Gateways (bKash/Nagad automated IPN)**: Partial/Manual COD and verified transactions.

---

## 21. Planned / Future Features

- Advanced offline mesh syncing for Cave Circle halaqas (`PLANNED`).
- Audio recitation voice recognition for Quran memorization testing (`PLANNED`).

---

## 22. Unknown / Not Verified

- Any undocumented external third-party courier APIs not present in repository (`NOT_VERIFIED`).
- Non-standard regional madhhab timetable variations outside standard Bangladesh Islamic Foundation parameters (`NOT_VERIFIED`).
