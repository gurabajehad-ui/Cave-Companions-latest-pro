import React, { useState, useEffect, useCallback, useRef, Suspense, lazy } from 'react';
import { useAuth } from './context/AuthContext';
import { useLanguage } from './context/LanguageContext';
import { api } from './services/api';
import { offlineSyncService } from './services/offlineSyncService';
import { prayerReminderService } from './services/prayerReminderService';
import { TodayPrayerRecord, Mosque } from './types';
import { evaluateLocationSpoofing } from './utils/antiSpoofing';
import confetti from 'canvas-confetti';

// Core Synchronous UI Elements & Modals
import { PDFVerificationView } from './components/PDFVerificationView';
import { SplashScreen } from './components/SplashScreen';
import { AuthScreen } from './components/AuthScreen';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import AdBanner from './components/AdBanner';
import { DailyProgressCard } from './components/DailyProgressCard';
import { CompactPrayersCard } from './components/CompactPrayersCard';
import { FeatureDiscoveryTicker } from './components/FeatureDiscoveryTicker';
import { SehriIftarCard } from './components/SehriIftarCard';
import { DailyNasihaCard } from './components/DailyNasihaCard';
import { ToastContainer, ToastMessage } from './components/Toast';
import { LegalModal } from './components/LegalModals';
import { MosqueDirectoryModal } from './components/MosqueDirectoryModal';
import { DigitalTasbihModal } from './components/DigitalTasbihModal';
import { QiblaFinderModal } from './components/QiblaFinderModal';
import { Loader2, RefreshCw, Wifi, WifiOff } from 'lucide-react';

// Lazy-Loaded Views for Smooth Performance
const AdminDashboardView = lazy(() => import('./components/AdminDashboardView').then(m => ({ default: m.AdminDashboardView })));
const MerchantPortalView = lazy(() => import('./components/MerchantPortalView').then(m => ({ default: m.MerchantPortalView })));
const RiderPortalView = lazy(() => import('./components/RiderPortalView').then(m => ({ default: m.RiderPortalView })));
const MyTokenView = lazy(() => import('./components/MyTokenView').then(m => ({ default: m.MyTokenView })));
const ShopsView = lazy(() => import('./components/ShopsView').then(m => ({ default: m.ShopsView })));
const CaveMarketView = lazy(() => import('./components/CaveMarketView').then(m => ({ default: m.CaveMarketView })));
const ProfileView = lazy(() => import('./components/ProfileView').then(m => ({ default: m.ProfileView })));
const QuranView = lazy(() => import('./components/quran/QuranMajidView').then(m => ({ default: m.QuranMajidView })));
const HisnulMuslimView = lazy(() => import('./components/hisnulMuslim/HisnulMuslimView').then(m => ({ default: m.HisnulMuslimView })));
const CaveCirclesView = lazy(() => import('./components/CaveCirclesView').then(m => ({ default: m.CaveCirclesView })));
const NotificationsView = lazy(() => import('./components/NotificationsView').then(m => ({ default: m.NotificationsView })));
const BlogView = lazy(() => import('./components/BlogView').then(m => ({ default: m.BlogView })));
const SalahJourneyView = lazy(() => import('./components/SalahJourneyView').then(m => ({ default: m.SalahJourneyView })));
const TokenRulesView = lazy(() => import('./components/TokenRulesView').then(m => ({ default: m.TokenRulesView })));
const SupportView = lazy(() => import('./components/SupportView').then(m => ({ default: m.SupportView })));
const AllFeaturesView = lazy(() => import('./components/AllFeaturesView').then(m => ({ default: m.AllFeaturesView })));
const CaveCompanionsGuideView = lazy(() => import('./components/CaveCompanionsGuideView').then(m => ({ default: m.CaveCompanionsGuideView })));

const triggerConfetti = async () => {
  try {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#10b981', '#fbbf24', '#34d399', '#ffffff'],
    });
  } catch {}
};

const LoadingFallback: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-3 py-16">
      <div className="w-10 h-10 rounded-full border-3 border-emerald-500 border-t-transparent animate-spin" />
      <p className="text-xs text-emerald-400 font-medium">
        {language === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}
      </p>
    </div>
  );
};

const SPLASH_SESSION_KEY = 'cave_splash_shown_session';
const SPLASH_LAST_SHOWN_KEY = 'cave_splash_last_shown_time';

const hasSplashBeenShown = (): boolean => {
  if (typeof window === 'undefined') return true;
  try {
    if (sessionStorage.getItem(SPLASH_SESSION_KEY) === 'true') return true;
    const lastShown = localStorage.getItem(SPLASH_LAST_SHOWN_KEY);
    if (lastShown) {
      const elapsed = Date.now() - parseInt(lastShown, 10);
      if (!isNaN(elapsed) && elapsed < 720 * 60 * 1000) return true;
    }
    return false;
  } catch {
    return false;
  }
};

export const App: React.FC = () => {
  const [isPdfVerify] = useState(() =>
    typeof window !== 'undefined' ? window.location.pathname.startsWith('/verify/pdf/') : false
  );

  if (isPdfVerify) {
    return <PDFVerificationView />;
  }

  const { user, isLoading, logout, refreshUser } = useAuth();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Navigation controller
  const getInitialTab = (): string => {
    if (typeof window === 'undefined') return 'home';
    const pathname = window.location.pathname;
    const hash = window.location.hash;
    if (pathname.startsWith('/admin') || hash === '#admin' || hash.startsWith('#admin-')) return 'admin';
    if (pathname.startsWith('/rider') || hash === '#rider' || hash.startsWith('#rider-')) return 'rider';
    if (pathname.startsWith('/merchant') || hash === '#merchant' || hash.startsWith('#merchant-')) return 'merchant';
    if (hash.startsWith('#shop-')) return 'shops';
    if (pathname === '/quran' || hash === '#quran') return 'quran';
    if (pathname === '/hisnul-muslim' || hash === '#hisnul_muslim') return 'hisnul_muslim';
    if (hash.startsWith('#') && hash.length > 1) {
      const tab = hash.substring(1);
      if (['home', 'quran', 'hisnul_muslim', 'tokens', 'shops', 'market', 'profile', 'prayer_journey', 'notifications', 'support', 'merchant', 'rider', 'admin', 'cave_circle', 'token_rules', 'all_features', 'cave_ai'].includes(tab)) {
        return tab;
      }
    }
    try {
      const navEntry = performance.getEntriesByType('navigation')[0] as any;
      if (navEntry ? navEntry.type === 'reload' : (performance as any).navigation?.type === 1) {
        const savedTab = localStorage.getItem('cave_active_tab_current');
        if (savedTab && ['home', 'quran', 'hisnul_muslim', 'tokens', 'shops', 'market', 'profile', 'prayer_journey', 'notifications', 'support', 'cave_circle', 'all_features', 'cave_ai'].includes(savedTab)) {
          return savedTab;
        }
      }
    } catch {}
    return 'home';
  };

  const [activeTab, setActiveTab] = useState<string>(getInitialTab);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (['merchant', 'rider', 'admin'].includes(activeTab)) {
        localStorage.removeItem('cave_active_tab_current');
      } else {
        localStorage.setItem('cave_active_tab_current', activeTab);
      }
      if (!window.location.hash.startsWith('#shop-') && !window.location.hash.startsWith('#admin-')) {
        if (activeTab === 'home') {
          if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        } else {
          window.history.replaceState(null, '', `#${activeTab}`);
        }
      }
    } catch (err) {
      console.warn('Failed to save activeTab state', err);
    }
  }, [activeTab]);

  // Modal and App State
  const [showSplash, setShowSplash] = useState(() => !hasSplashBeenShown());
  const [isMosquesOpen, setIsMosquesOpen] = useState(false);
  const [isTasbihOpen, setIsTasbihOpen] = useState(false);
  const [isQiblaOpen, setIsQiblaOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);

  // PWA Install Prompt Listener
  useEffect(() => {
    if ((window as any).deferredPrompt) {
      setDeferredPrompt((window as any).deferredPrompt);
      setCanInstall(true);
    }
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).deferredPrompt = e;
      setCanInstall(true);
    };
    const handlePwaPrompt = (e: any) => {
      if (e.detail) {
        setDeferredPrompt(e.detail);
        (window as any).deferredPrompt = e.detail;
        setCanInstall(true);
      }
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('pwa-prompt-available', handlePwaPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('pwa-prompt-available', handlePwaPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    const prompt = deferredPrompt || (window as any).deferredPrompt;
    if (!prompt) {
      showToast('info', isBn ? 'ইন্সটল' : 'Install', isBn ? 'আপনি ব্রাউজারের "Add to Home Screen" বা "Install App" অপশন ব্যবহার করে ইন্সটল করতে পারেন।' : 'You can install using browser "Add to Home Screen" or "Install App".');
      return;
    }
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === 'accepted') {
        showToast('success', isBn ? 'ইন্সটল সফল' : 'Install Successful', isBn ? 'অ্যাপটি সফলভাবে ডিভাইসে ইনস্টল করা হয়েছে।' : 'App installed successfully on your device.');
      }
    } catch (err) {
      console.error('[PWA] Error triggering install prompt:', err);
    } finally {
      setDeferredPrompt(null);
      (window as any).deferredPrompt = null;
      setCanInstall(false);
    }
  };

  // Notification and Data States
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [actionLoadingPrayerType, setActionLoadingPrayerType] = useState<string | null>(null);
  const [pendingCheckIns, setPendingCheckIns] = useState(() => offlineSyncService.getPendingCheckIns());
  const [isSyncing, setIsSyncing] = useState(() => offlineSyncService.getIsSyncing());
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [todayStatus, setTodayStatus] = useState<TodayPrayerRecord | null>(null);
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [hadithIndex, setHadithIndex] = useState(0);
  const [nasihaList, setNasihaList] = useState<any[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const lastNotifIdRef = useRef<string | null>(null);

  // Browser push notification permission
  useEffect(() => {
    if (user && typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }, [user]);

  // Fetch notification count
  const fetchNotificationCount = useCallback(async () => {
    if (!user || !localStorage.getItem('cave_companions_auth_token')) return;
    try {
      const res = await api.getNotifications(true);
      const unread = res.unreadCount || 0;
      setUnreadNotificationsCount(unread);
      if (res.notifications && res.notifications.length > 0) {
        const top = res.notifications[0];
        if (lastNotifIdRef.current && lastNotifIdRef.current !== top.id && !top.read) {
          if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
            try {
              new Notification(top.title || 'Cave Circles', {
                body: top.message || 'নতুন বার্তা এসেছে',
                icon: '/favicon.ico'
              });
            } catch {}
          }
          showToast('info', top.title || 'নতুন বার্তা', top.message || '');
        }
        lastNotifIdRef.current = top.id;
      }
    } catch (err: any) {
      if (err.status === 401 || err.code === 'UNAUTHORIZED' || err.code === 'INVALID_TOKEN') {
        logout();
      }
    }
  }, [user, logout, showToast]);

  // Fetch today's prayers
  const fetchTodayPrayers = useCallback(async () => {
    if (!user || !localStorage.getItem('cave_companions_auth_token')) return;
    try {
      const prayers = await api.getTodayPrayers();
      setTodayStatus(prayers);
    } catch (err: any) {
      if (err.status === 401 || err.code === 'UNAUTHORIZED') {
        logout();
      }
    }
  }, [user, logout]);

  // Fetch mosques
  const fetchMosques = useCallback(async () => {
    try {
      const res = await api.getMosques();
      if (res && Array.isArray(res.mosques)) {
        setMosques(res.mosques);
        offlineSyncService.cacheMosques(res.mosques);
      }
    } catch (err: any) {
      const cached = offlineSyncService.getCachedMosques();
      if (cached && cached.length > 0) {
        setMosques(cached);
      }
    }
  }, []);

  // Fetch public nasiha
  const fetchNasiha = useCallback(async () => {
    try {
      const res = await api.getPublicNasihaList();
      if (res && ((res as any).nasihaList || (res as any).list)) {
        setNasihaList((res as any).nasihaList || (res as any).list);
      }
    } catch {}
  }, []);

  // Dismiss splash
  const handleStartFromSplash = useCallback(() => {
    setShowSplash(false);
    setActiveTab('home');
    try {
      sessionStorage.setItem(SPLASH_SESSION_KEY, 'true');
      localStorage.setItem(SPLASH_LAST_SHOWN_KEY, Date.now().toString());
    } catch {}
  }, []);

  // Splash auto-dismiss
  useEffect(() => {
    if (!showSplash) return;
    try {
      sessionStorage.setItem(SPLASH_SESSION_KEY, 'true');
      localStorage.setItem(SPLASH_LAST_SHOWN_KEY, Date.now().toString());
    } catch {}
    const timer = setTimeout(() => {
      handleStartFromSplash();
    }, 2500);
    return () => clearTimeout(timer);
  }, [showSplash, handleStartFromSplash]);

  // Initial user data fetch
  useEffect(() => {
    fetchNasiha();
    if (user) {
      Promise.allSettled([fetchTodayPrayers(), fetchMosques(), fetchNotificationCount()]);
      const interval = setInterval(() => {
        fetchNotificationCount();
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [user, fetchNasiha, fetchTodayPrayers, fetchMosques, fetchNotificationCount]);

  // Hadith index
  useEffect(() => {
    setHadithIndex(new Date().getDate() % 10);
  }, []);

  // Offline queue and network listeners
  useEffect(() => {
    offlineSyncService.init(
      () => {
        fetchTodayPrayers();
        refreshUser();
      },
      (type, title, msg) => {
        showToast(type, title, msg);
      }
    );
    const handleQueueUpdate = () => {
      setPendingCheckIns(offlineSyncService.getPendingCheckIns());
      setIsSyncing(offlineSyncService.getIsSyncing());
      setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : true);
    };
    window.addEventListener('cave_offline_queue_updated', handleQueueUpdate);
    window.addEventListener('online', handleQueueUpdate);
    window.addEventListener('offline', handleQueueUpdate);
    return () => {
      window.removeEventListener('cave_offline_queue_updated', handleQueueUpdate);
      window.removeEventListener('online', handleQueueUpdate);
      window.removeEventListener('offline', handleQueueUpdate);
    };
  }, [showToast, fetchTodayPrayers, refreshUser]);

  // Prayer reminder scheduler
  useEffect(() => {
    prayerReminderService.setInAppReminderCallback((prayerKey, prayerNameBn, timeStr) => {
      showToast('info', `🕌 ${prayerNameBn} সালাতের ওয়াক্ত শুরু হয়েছে`, `এখন ${prayerNameBn} সালাতের ওয়াক্ত শুরু হয়েছে (${timeStr})। সালাত আদায় করে নিন।`);
    });
    prayerReminderService.startScheduler();
    return () => {
      prayerReminderService.stopScheduler();
    };
  }, [showToast]);

  // URL hash and history listener
  useEffect(() => {
    (window as any).setAppActiveTab = (tab: string) => {
      setActiveTab(tab);
    };
    const handlePopState = () => {
      const tab = getInitialTab();
      setActiveTab(tab);
    };
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#shop-')) {
        setActiveTab('shops');
      } else {
        handlePopState();
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const lastCoordsRef = useRef<{ lat: number; lng: number; timestamp: number } | null>(null);

  // Prayer verification handler
  const handleCompletePrayer = useCallback(async (prayerObj: { type: string }) => {
    if (actionLoadingPrayerType) return;
    const isFemale = ((user?.gender) || 'male').toLowerCase() === 'female';
    setActionLoadingPrayerType(prayerObj.type);

    try {
      if (isFemale) {
        const res = await api.verifyPrayer(prayerObj.type as any, { mosqueId: 'FEMALE_DIRECT' });
        triggerConfetti();
        showToast('success', isBn ? 'আলহামদুলিল্লাহ!' : 'Alhamdulillah!', isBn ? 'আলহামদুলিল্লাহ! সালাতের রেকর্ড সংরক্ষণ হয়েছে।' : 'Alhamdulillah! Prayer record has been saved.');
        if (res?.tokenResult?.message) {
          showToast('info', isBn ? '🪙 টোকেন রিওয়ার্ড' : '🪙 Token Reward', res.tokenResult.message);
        }
        await Promise.allSettled([fetchTodayPrayers(), refreshUser()]);
      } else {
        if (!navigator.geolocation) {
          showToast('error', isBn ? 'লোকেশন প্রয়োজন' : 'Location Required', isBn ? 'লোকেশন যাচাই করা যাচ্ছে না। Location চালু আছে কিনা দেখুন।' : 'Cannot verify location. Please check if Location is enabled.');
          return;
        }

        let coords: { lat: number; lng: number; accuracy: number } | null = null;
        let spoofData: any = {};

        try {
          coords = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (pos1) => {
                const c1 = { lat: pos1.coords.latitude, lng: pos1.coords.longitude, accuracy: pos1.coords.accuracy };
                setTimeout(() => {
                  navigator.geolocation.getCurrentPosition(
                    (pos2) => {
                      const prev = lastCoordsRef.current;
                      const report = evaluateLocationSpoofing(pos1, pos2, prev);
                      if (report.isSpoofed) {
                        reject(new Error(isBn ? 'নিরাপত্তা সতর্কতা: ডিভাইসে ফেক জিপিএস সনাক্ত হয়েছে।' : 'Security Alert: Fake GPS detected.'));
                        return;
                      }
                      spoofData = { isMock: report.isMockProvider, spoofSignals: report.reasons, sampleVariance: report.sampleVariance };
                      lastCoordsRef.current = { lat: c1.lat, lng: c1.lng, timestamp: Date.now() };
                      resolve(c1);
                    },
                    () => {
                      const report = evaluateLocationSpoofing(pos1, null, null);
                      if (report.isSpoofed) {
                        reject(new Error(isBn ? 'নিরাপত্তা সতর্কতা: ফেক জিপিএস সনাক্ত হয়েছে।' : 'Security Alert: Fake GPS detected.'));
                        return;
                      }
                      spoofData = { isMock: report.isMockProvider, spoofSignals: report.reasons, sampleVariance: 0 };
                      lastCoordsRef.current = { lat: c1.lat, lng: c1.lng, timestamp: Date.now() };
                      resolve(c1);
                    },
                    { enableHighAccuracy: true, timeout: 4000, maximumAge: 0 }
                  );
                }, 350);
              },
              (err1) => {
                navigator.geolocation.getCurrentPosition(
                  (posLow) => {
                    const cLow = { lat: posLow.coords.latitude, lng: posLow.coords.longitude, accuracy: posLow.coords.accuracy };
                    const report = evaluateLocationSpoofing(posLow, null, null);
                    if (report.isSpoofed) {
                      reject(new Error(isBn ? 'নিরাপত্তা সতর্কতা: ফেক জিপিএস সনাক্ত হয়েছে।' : 'Security Alert: Fake GPS detected.'));
                      return;
                    }
                    spoofData = { isMock: report.isMockProvider, spoofSignals: report.reasons, sampleVariance: 0 };
                    lastCoordsRef.current = { lat: cLow.lat, lng: cLow.lng, timestamp: Date.now() };
                    resolve(cLow);
                  },
                  (errLow) => {
                    reject(new Error(isBn ? 'আপনার ডিভাইসের জিপিএস বা লোকেশন সার্ভিস বন্ধ রয়েছে।' : 'Your device location service is turned off.'));
                  },
                  { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
                );
              },
              { enableHighAccuracy: true, timeout: 10000, maximumAge: 20000 }
            );
          });
        } catch (geoErr: any) {
          showToast('error', isBn ? 'লোকেশন যাচাই সমস্যা' : 'Location Verification Error', geoErr.message);
          return;
        }

        if (!coords) return;

        const res = await api.verifyPrayer(prayerObj.type as any, {
          lat: coords.lat,
          lng: coords.lng,
          accuracy: coords.accuracy,
          isMock: spoofData.isMock,
          spoofSignals: spoofData.spoofSignals,
          sampleVariance: spoofData.sampleVariance,
        });

        triggerConfetti();
        showToast('success', isBn ? 'আলহামদুলিল্লাহ!' : 'Alhamdulillah!', isBn ? 'আলহামদুলিল্লাহ! সালাতের রেকর্ড সংরক্ষণ হয়েছে।' : 'Alhamdulillah! Prayer record has been saved.');
        if (res?.tokenResult?.message) {
          showToast('info', isBn ? '🪙 টোকেন রিওয়ার্ড' : '🪙 Token Reward', res.tokenResult.message);
        }
        await Promise.allSettled([fetchTodayPrayers(), refreshUser()]);
      }
    } catch (err: any) {
      showToast('error', isBn ? 'যাচাই ব্যর্থ' : 'Verification Failed', err.message || (isBn ? 'সালাতের রেকর্ড সংরক্ষণ করা সম্ভব হয়নি।' : 'Could not save prayer record.'));
    } finally {
      setActionLoadingPrayerType(null);
    }
  }, [actionLoadingPrayerType, user, showToast, isBn, fetchTodayPrayers, refreshUser]);

  // Render Splash Screen
  if (showSplash) {
    return (
      <>
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        <SplashScreen onStart={handleStartFromSplash} />
      </>
    );
  }

  // Render Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-emerald-300">
          {isBn ? 'কেভ কম্প্যানিয়ন্স লোড হচ্ছে...' : 'Loading Cave Companions...'}
        </p>
      </div>
    );
  }

  // Admin Dashboard Portal View
  if (activeTab === 'admin') {
    return (
      <div className="h-screen w-full bg-[#090d16] text-slate-100 flex flex-col selection:bg-emerald-600 selection:text-white overflow-hidden">
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        <Suspense fallback={<LoadingFallback />}>
          <AdminDashboardView currentUser={user as any} />
        </Suspense>
      </div>
    );
  }

  // Merchant Portal View
  if (activeTab === 'merchant') {
    return (
      <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-600 selection:text-white">
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        <Suspense fallback={<LoadingFallback />}>
          <MerchantPortalView
            onShowToast={showToast}
            onExitMerchant={() => {
              setActiveTab('home');
              if (typeof window !== 'undefined') window.history.replaceState(null, '', '/');
            }}
          />
        </Suspense>
      </div>
    );
  }

  // Rider Portal View
  if (activeTab === 'rider') {
    return (
      <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-600 selection:text-white">
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        <Suspense fallback={<LoadingFallback />}>
          <RiderPortalView
            onShowToast={showToast}
            onExitRider={() => {
              setActiveTab('home');
              if (typeof window !== 'undefined') window.history.replaceState(null, '', '/');
            }}
          />
        </Suspense>
      </div>
    );
  }

  // Unauthenticated user -> AuthScreen (Google One Tap + Phone/Password)
  if (!user) {
    return (
      <>
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        <AuthScreen
          onSuccess={() => {
            setActiveTab('home');
            if (typeof window !== 'undefined') window.history.replaceState(null, '', '/');
            showToast('success', isBn ? 'স্বাগতম' : 'Welcome', isBn ? 'সফলভাবে লগইন সম্পন্ন হয়েছে!' : 'Logged in successfully!');
          }}
          onOpenMerchantLogin={() => setActiveTab('merchant')}
          onOpenRiderLogin={() => setActiveTab('rider')}
        />
      </>
    );
  }

  const todayDateStr = todayStatus ? todayStatus.date : new Date().toISOString().split('T')[0];
  const completedCount = todayStatus ? todayStatus.completedCount : 0;

  return (
    <div className="min-h-screen bg-[var(--bg-app,#030712)] text-[var(--text-app,#f9fafb)] flex flex-col selection:bg-emerald-600 selection:text-white pb-16">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {activeTab === 'home' && (
        <Header
          onOpenNotifications={() => setActiveTab('notifications')}
          unreadNotificationsCount={unreadNotificationsCount}
          showInstallPrompt={canInstall}
          onInstallClick={handleInstallClick}
          onOpenTasbih={() => setIsTasbihOpen(true)}
        />
      )}

      <main className={`flex-1 w-full max-w-2xl mx-auto px-1 sm:px-3 pb-5 ${activeTab === 'home' ? 'pt-1.5' : 'pt-2.5 sm:pt-4'}`}>
        {/* ================= HOME TAB ================= */}
        {activeTab === 'home' && (
          <div className="space-y-3 sm:space-y-3.5">
            <AdBanner pageName="HOME" placementSlot="TOP" />

            <DailyProgressCard
              todayStatus={todayStatus}
              completedCount={completedCount}
              totalPrayers={5}
              dateStr={todayDateStr}
              userDistrict={user?.district}
              userGender={user?.gender}
              onOpenJourney={() => setActiveTab('prayer_journey')}
              onOpenTokens={() => setActiveTab('tokens')}
              onOpenTokenRules={() => setActiveTab('token_rules')}
            />

            <AdBanner pageName="HOME" placementSlot="BEFORE_PRODUCTS" />

            {/* Offline sync banner */}
            {(pendingCheckIns.length > 0 || isSyncing || !isOnline) && (
              <div className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 shadow-xs ${
                isSyncing
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : isOnline
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-slate-800/60 border-slate-700/50 text-slate-300'
              }`}>
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`p-2 rounded-xl shrink-0 ${
                    isSyncing ? 'bg-amber-500/20 text-amber-400' : isOnline ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700/50 text-slate-400'
                  }`}>
                    {isSyncing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : isOnline ? (
                      <Wifi className="w-4 h-4" />
                    ) : (
                      <WifiOff className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold leading-tight truncate">
                      {isSyncing
                        ? (isBn ? 'সার্ভারের সাথে সিঙ্ক হচ্ছে...' : 'Syncing with server...')
                        : isOnline
                        ? (isBn ? `অফলাইনে সংরক্ষিত চেক-ইন: ${pendingCheckIns.length}টি` : `Offline saved check-ins: ${pendingCheckIns.length}`)
                        : (isBn ? `ডিভাইস অফলাইনে আছে (${pendingCheckIns.length}টি পেন্ডিং)` : `Device is offline (${pendingCheckIns.length} pending)`)}
                    </h4>
                    <p className="text-[11px] opacity-80 mt-0.5 leading-snug">
                      {isSyncing
                        ? (isBn ? 'অনুগ্রহ করে অপেক্ষা করুন, সার্ভারে উপস্থিতি যাচাই করা হচ্ছে' : 'Please wait, verifying attendance on server')
                        : isOnline
                        ? (isBn ? 'ইন্টারনেট চালু হয়েছে। সবগুলো চেক-ইন সার্ভারে পাঠাতে সিঙ্ক করুন' : 'Internet restored. Sync to submit all check-ins')
                        : (isBn ? 'ইন্টারনেট সংযোগ ফিরলে স্বয়ংক্রিয়ভাবে সার্ভারের সাথে সিঙ্ক হবে' : 'Will automatically sync once internet is restored')}
                    </p>
                  </div>
                </div>

                {isOnline && !isSyncing && pendingCheckIns.length > 0 && (
                  <button
                    onClick={() => offlineSyncService.syncPendingCheckIns(true)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shrink-0 transition cursor-pointer shadow-xs active:scale-95 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{isBn ? 'সিঙ্ক করুন' : 'Sync Now'}</span>
                  </button>
                )}
              </div>
            )}

            <CompactPrayersCard
              todayStatus={todayStatus}
              userDistrict={user?.district}
              userGender={user?.gender}
              onCompletePrayer={handleCompletePrayer}
              actionLoadingPrayerType={actionLoadingPrayerType}
              onShowToast={showToast}
              todayDateStr={todayDateStr}
            />

            <FeatureDiscoveryTicker
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenQibla={() => setIsQiblaOpen(true)}
              onOpenMosques={() => setIsMosquesOpen(true)}
            />

            <AdBanner pageName="HOME" placementSlot="MIDDLE" />

            <SehriIftarCard
              userDistrict={user?.district}
              onShowToast={(type, title, message) => showToast(type as any, title, message)}
            />

            <DailyNasihaCard
              nasihaList={nasihaList}
              randomHadithIndex={hadithIndex}
            />

            <AdBanner pageName="HOME" placementSlot="BOTTOM" />
          </div>
        )}

        {/* ================= TOKENS TAB ================= */}
        {activeTab === 'tokens' && (
          <Suspense fallback={<LoadingFallback />}>
            <MyTokenView
              onShowToast={showToast}
              onNavigateToHome={() => setActiveTab('home')}
              onNavigateToShops={() => setActiveTab('shops')}
            />
          </Suspense>
        )}

        {/* ================= SHOPS TAB ================= */}
        {activeTab === 'shops' && (
          <Suspense fallback={<LoadingFallback />}>
            <ShopsView
              user={user as any}
              onShowToast={showToast}
              onNavigateToTokens={() => setActiveTab('tokens')}
              onNavigateToMerchant={() => setActiveTab('merchant')}
            />
          </Suspense>
        )}

        {/* ================= MARKET TAB ================= */}
        {activeTab === 'market' && (
          <Suspense fallback={<LoadingFallback />}>
            <CaveMarketView />
          </Suspense>
        )}

        {/* ================= PROFILE TAB ================= */}
        {activeTab === 'profile' && (
          <Suspense fallback={<LoadingFallback />}>
            <ProfileView
              onLogout={logout}
              onBack={() => setActiveTab('home')}
              onShowToast={showToast}
              onOpenQibla={() => setIsQiblaOpen(true)}
              onOpenTasbih={() => setIsTasbihOpen(true)}
              onOpenMosques={() => setIsMosquesOpen(true)}
            />
          </Suspense>
        )}

        {/* ================= QURAN VIEW ================= */}
        {activeTab === 'quran' && (
          <Suspense fallback={<LoadingFallback />}>
            <QuranView
              onBack={() => setActiveTab('home')}
              onShowToast={(msg, type) => showToast(type, '', msg)}
            />
          </Suspense>
        )}

        {/* ================= HISNUL MUSLIM VIEW ================= */}
        {activeTab === 'hisnul_muslim' && (
          <Suspense fallback={<LoadingFallback />}>
            <HisnulMuslimView
              onBack={() => setActiveTab('home')}
              onShowToast={(msg, type) => showToast(type, '', msg)}
            />
          </Suspense>
        )}

        {/* ================= CAVE CIRCLES VIEW ================= */}
        {activeTab === 'cave_circle' && (
          <Suspense fallback={<LoadingFallback />}>
            <CaveCirclesView
              onBack={() => setActiveTab('profile')}
              onShowToast={showToast}
            />
          </Suspense>
        )}

        {/* ================= NOTIFICATIONS VIEW ================= */}
        {activeTab === 'notifications' && (
          <Suspense fallback={<LoadingFallback />}>
            <NotificationsView
              onBack={() => setActiveTab('home')}
              onShowToast={showToast}
              onNotificationReadChange={(unread) => setUnreadNotificationsCount(unread)}
            />
          </Suspense>
        )}

        {/* ================= BLOG VIEW ================= */}
        {activeTab === 'blog' && (
          <Suspense fallback={<LoadingFallback />}>
            <BlogView onBack={() => setActiveTab('profile')} />
          </Suspense>
        )}

        {/* ================= SALAH JOURNEY VIEW ================= */}
        {(activeTab === 'prayer_journey' || activeTab === 'prayer_history' || activeTab === 'history') && (
          <Suspense fallback={<LoadingFallback />}>
            <SalahJourneyView
              onBack={() => setActiveTab('home')}
              onOpenTasbih={() => setIsTasbihOpen(true)}
              onShowToast={showToast}
            />
          </Suspense>
        )}

        {/* ================= TOKEN RULES VIEW ================= */}
        {activeTab === 'token_rules' && (
          <Suspense fallback={<LoadingFallback />}>
            <TokenRulesView
              onBack={() => setActiveTab('home')}
              onNavigateToTokens={() => setActiveTab('tokens')}
              onNavigateToShops={() => setActiveTab('shops')}
            />
          </Suspense>
        )}

        {/* ================= SUPPORT VIEW ================= */}
        {activeTab === 'support' && (
          <Suspense fallback={<LoadingFallback />}>
            <SupportView
              onBack={() => setActiveTab('profile')}
              onShowToast={showToast}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          </Suspense>
        )}

        {/* ================= ALL FEATURES VIEW ================= */}
        {activeTab === 'all_features' && (
          <Suspense fallback={<LoadingFallback />}>
            <AllFeaturesView
              onBack={() => setActiveTab('profile')}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenQibla={() => setIsQiblaOpen(true)}
              onOpenTasbih={() => setIsTasbihOpen(true)}
              onOpenMosques={() => setIsMosquesOpen(true)}
              onShowToast={showToast}
            />
          </Suspense>
        )}

        {/* ================= CAVE AI VIEW ================= */}
        {activeTab === 'cave_ai' && (
          <Suspense fallback={<LoadingFallback />}>
            <CaveCompanionsGuideView
              onBack={() => setActiveTab('all_features')}
              onNavigate={(tab) => setActiveTab(tab)}
              onShowToast={showToast}
            />
          </Suspense>
        )}
      </main>

      {/* Persistent Bottom Navigation */}
      {['home', 'tokens', 'shops', 'market', 'profile'].includes(activeTab) && (
        <BottomNav
          activeTab={activeTab as any}
          setActiveTab={(tab) => setActiveTab(tab)}
          onChangeTab={(tab) => setActiveTab(tab)}
        />
      )}

      {/* Global Modals */}
      <Suspense fallback={null}>
        {legalModalType && (
          <LegalModal
            isOpen={!!legalModalType}
            type={legalModalType}
            onClose={() => setLegalModalType(null)}
          />
        )}
        {isMosquesOpen && (
          <MosqueDirectoryModal
            onClose={() => setIsMosquesOpen(false)}
          />
        )}
        {isTasbihOpen && (
          <DigitalTasbihModal
            isOpen={isTasbihOpen}
            onClose={() => setIsTasbihOpen(false)}
            onShowToast={(title, msg) => showToast('info', isBn ? 'তাসবীহ' : 'Digital Tasbih', msg)}
          />
        )}
        {isQiblaOpen && (
          <QiblaFinderModal
            isOpen={isQiblaOpen}
            onClose={() => setIsQiblaOpen(false)}
            userDistrict={user?.district || ''}
            onShowToast={showToast}
          />
        )}
      </Suspense>
    </div>
  );
};

export default App;
