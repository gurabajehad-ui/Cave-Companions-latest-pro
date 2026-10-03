import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Search,
  Send,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Compass,
  CheckCircle2,
  Lightbulb,
  RotateCcw,
  ShieldCheck,
  MessageSquare,
  HelpCircle,
  X,
  Code2,
  Languages,
  Layers
} from 'lucide-react';
import {
  CAVE_GUIDE_TOPICS,
  appKnowledgeBase,
  queryCaveGuide,
  getPopularPrompts,
  GuideAnswer,
  GuideTopic
} from '../services/caveAppGuideEngine';
import { useLanguage } from '../context/LanguageContext';

interface CaveCompanionsGuideViewProps {
  onNavigate?: (tab: string) => void;
  onShowToast?: (type: 'success' | 'error' | 'info', title: string, msg: string) => void;
  onBack?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text?: string;
  answers?: GuideAnswer[];
  createdAt: string;
}

export const CaveCompanionsGuideView: React.FC<CaveCompanionsGuideViewProps> = ({
  onNavigate,
  onShowToast,
  onBack
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [inputQuery, setInputQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showInfoModal, setShowInfoModal] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: isBn
        ? 'আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ! আমি Cave Companions-এর সার্বক্ষণিক এআই গাইড সহকারী।\n\nঅ্যাপের যেকোনো ফিচার—যেমন ৫ ওয়াক্ত নামাজ ট্র্যাকিং, কুরআন খতম ও বুকমার্ক, ডিজিটাল তাসবীহ, কেভ সার্কেল তৈরি কিংবা পার্টনার শপে ফেইথ টোকেন রিডিম সংক্রান্ত যেকোনো প্রশ্ন করতে পারেন।'
        : 'Assalamu Alaikum wa Rahmatullah! I am your 24/7 Cave Companions AI Guide Assistant.\n\nFeel free to ask about any feature—including daily prayer tracking, Quran recitation & khatam planning, digital tasbih, managing circles, or redeeming faith tokens at partner shops.',
      createdAt: new Date().toISOString()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popularPrompts = getPopularPrompts(isBn ? 'bn' : 'en');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Autofocus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle Escape key to close modal or go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showInfoModal) {
          setShowInfoModal(false);
        } else if (onBack) {
          onBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showInfoModal, onBack]);

  const handleAsk = (queryText: string) => {
    const text = queryText.trim();
    if (!text) return;

    const userMsgId = 'user-' + Date.now();
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputQuery('');

    // Query local knowledge-base-driven Cave AI engine
    const recentTurns = messages.slice(-10);
    const results = queryCaveGuide(text, recentTurns, isBn ? 'bn' : 'en');
    const answerText = results.length === 0
      ? (isBn
          ? 'দুঃখিত, এই বিষয়টি সম্পর্কে সরাসরি কোনো উত্তর পাওয়া যায়নি। অনুগ্রহ করে আপনার প্রশ্নটি অন্যভাবে লিখুন।'
          : 'Sorry, no exact answer was found for this query. Please try phrasing differently.')
      : results.map(r => r.formattedText || r.summary).join('\n\n');

    const assistantMsgId = 'asst-' + (Date.now() + 1);
    const newAssistantMsg: ChatMessage = {
      id: assistantMsgId,
      sender: 'assistant',
      text: answerText,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, newAssistantMsg]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk(inputQuery);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-msg-' + Date.now(),
        sender: 'assistant',
        text: isBn
          ? 'নতুন কথোপকথন শুরু হয়েছে। Cave Companions-এর যেকোনো ফিচার বা ইসলামিক আমল সম্পর্কে প্রশ্ন করুন।'
          : 'New conversation started. Ask anything about using Cave Companions features.',
        createdAt: new Date().toISOString()
      }
    ]);
  };

  const categories = [
    { id: 'all', labelBn: 'সকল বিষয়', labelEn: 'All Topics' },
    { id: 'prayer', labelBn: '🕌 নামাজ ও সালাত', labelEn: '🕌 Prayer' },
    { id: 'quran', labelBn: '📖 কুরআন মাজীদ', labelEn: '📖 Quran' },
    { id: 'hisnul_muslim', labelBn: '✨ মাসনূন আজকার', labelEn: '✨ Adhkar' },
    { id: 'tasbih', labelBn: '📿 ডিজিটাল তাসবীহ', labelEn: '📿 Tasbih' },
    { id: 'circle', labelBn: '👥 কেভ সার্কেল', labelEn: '👥 Circle' },
    { id: 'tokens', labelBn: '🎁 ফেইথ টোকেন ও শপ', labelEn: '🎁 Tokens' },
    { id: 'habits', labelBn: '🔥 অভ্যাস ট্র্যাকার', labelEn: '🔥 Habits' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col w-screen h-screen bg-slate-950 overflow-hidden text-slate-100 select-text">
      {/* Top Banner & Header */}
      <header className="px-3 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-emerald-950/95 via-slate-900 to-slate-950 border-b border-emerald-800/40 flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 shadow-sm"
              title={isBn ? 'ফিরে যান (Esc)' : 'Back / Close (Esc)'}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            </button>
          )}

          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-inner shrink-0">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-sm sm:text-lg font-bold text-white tracking-wide truncate">
                {isBn ? 'কেভ কম্প্যানিয়নস এআই গাইড' : 'Cave Companions AI Guide'}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shrink-0">
                <ShieldCheck className="w-3 h-3" />
                {isBn ? 'ফুল স্ক্রিন • অফলাইন' : 'Full Screen • Local'}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 truncate hidden sm:block">
              {isBn
                ? 'অ্যাপের ১০০% ফিচার, আমল ও নির্দেশিকা তাৎক্ষণিক জানার বিশ্বস্ত সহকারী (বাংলা ও ইংরেজি)'
                : 'Interactive instant guide for 100% of Cave Companions features (Bangla & English)'}
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Info / Training Guide Modal Trigger */}
          <button
            type="button"
            onClick={() => setShowInfoModal(true)}
            className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-800/90 hover:bg-emerald-600/30 border border-slate-700/60 text-slate-300 hover:text-emerald-300 text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            title={isBn ? 'এই এআই সম্পর্কে বিস্তারিত ও ট্রেইনিং নিয়ম' : 'AI Capabilities & Training Info'}
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline font-medium">{isBn ? 'ট্রেইনিং গাইড' : 'AI Info'}</span>
          </button>

          {/* Reset Chat */}
          <button
            type="button"
            onClick={handleResetChat}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700/60 shadow-sm"
            title={isBn ? 'নতুন করে শুরু করুন' : 'Reset Conversation'}
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">{isBn ? 'রিসেট' : 'Reset'}</span>
          </button>

          {/* Close Fullscreen Button */}
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-rose-950/70 hover:bg-rose-900 border border-rose-800/60 text-rose-300 hover:text-white text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title={isBn ? 'চ্যাট বন্ধ করুন' : 'Close Chat'}
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">{isBn ? 'বন্ধ করুন' : 'Close'}</span>
            </button>
          )}
        </div>
      </header>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-1.5 px-3 sm:px-6 py-2 bg-slate-900/90 border-b border-slate-800/90 overflow-x-auto custom-scrollbar shrink-0">
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white'
            }`}
          >
            {isBn ? cat.labelBn : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Main Chat & Guide Messages Container */}
      <main className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 custom-scrollbar bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Quick Suggestion Chips */}
          <div className="space-y-2.5 bg-slate-900/70 border border-slate-800/90 p-3 sm:p-4 rounded-2xl shadow-sm">
            <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-400" />
              {isBn ? 'জনপ্রিয় প্রশ্নসমূহ (এক ক্লিকে উত্তর জানুন):' : 'Popular Topics (Tap to ask):'}
            </p>
            <div className="flex flex-wrap gap-2">
              {popularPrompts.map((p, idx) => (
                <button
                  key={`prompt-${idx}`}
                  type="button"
                  onClick={() => handleAsk(p.query)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-500/20 border border-slate-700 hover:border-emerald-500/50 text-xs text-slate-200 hover:text-emerald-300 transition-all cursor-pointer text-left active:scale-95 shadow-sm"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message Thread */}
          {messages.map(msg => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
              >
                <div
                  className={`max-w-[95%] sm:max-w-[85%] rounded-2xl p-3.5 sm:p-5 text-xs sm:text-sm shadow-md ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-tr-xs'
                      : 'bg-slate-900/95 border border-slate-800 text-slate-100 rounded-tl-xs'
                  }`}
                >
                  {msg.text && (
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  )}
                </div>

                <span className="text-[10px] text-slate-500 px-1 font-mono">
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Bar */}
      <footer className="p-3 sm:p-5 bg-slate-900/95 border-t border-slate-800 shrink-0 shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-slate-950 border border-slate-700/90 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 rounded-2xl px-4 py-2.5 shadow-inner transition-all"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              placeholder={
                isBn
                  ? 'বাংলা বা ইংরেজিতে প্রশ্ন লিখুন: যেমন: কীভাবে সার্কেল বানাব? বা নামাজ কীভাবে লগ করব...'
                  : 'Ask in English or Bangla: e.g. How to create a circle or log prayers...'
              }
              className="flex-1 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2 sm:p-2.5 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md active:scale-95 shrink-0"
              title={isBn ? 'পাঠান' : 'Send'}
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </form>
        </div>
      </footer>

      {/* AI Capabilities & Training Guide Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {isBn ? 'এই এআই সহকারী ও ট্রেইনিং নির্দেশিকা' : 'AI Capabilities & Training Guide'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 custom-scrollbar text-xs sm:text-sm text-slate-200">
              {/* 1. What questions can it answer? */}
              <div className="space-y-2 p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl">
                <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  {isBn ? '১. এই এআই কি কি প্রশ্নের উত্তর দিতে পারবে?' : '1. What questions can this AI answer?'}
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {isBn
                    ? 'এই এআই Cave Companions অ্যাপের ১০০% ফিচার এবং ইসলামিক আমল সংক্রান্ত সকল প্রশ্নের নিখুঁত উত্তর দিতে পারে:'
                    : 'This AI provides comprehensive, accurate answers for 100% of Cave Companions features:'}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {[
                    isBn ? '🕌 ৫ ওয়াক্ত সালাত, সিয়াম ও কেভ জার্নি ট্র্যাকিং' : '🕌 5 Daily Prayers, Fasting & Cave Journey',
                    isBn ? '📖 কুরআন তিলাওয়াত, খতম প্ল্যানার ও বুকমার্ক' : '📖 Quran Recitation & Khatam Planner',
                    isBn ? '✨ হিসনুল মুসলিমের সকাল-সন্ধ্যার দুআ' : '✨ Hisnul Muslim Morning/Evening Adhkar',
                    isBn ? '📿 ডিজিটাল তাসবীহ ও ভাইব্রেশন গাইড' : '📿 Digital Tasbih & Sound Guidelines',
                    isBn ? '👥 কেভ সার্কেল তৈরি ও বন্ধুদের ইনভাইট' : '👥 Cave Circles Creation & Invitations',
                    isBn ? '🎁 ফেইথ টোকেন (Gold/Silver/Bronze) অর্জন' : '🎁 Earning Faith Coins & Tokens',
                    isBn ? '🛍️ পার্টনার শপ নেটওয়ার্ক ও কিউআর রিডেম্পশন' : '🛍️ Partner Shop QR Discount Redemption',
                    isBn ? '🕋 কিবলা ফাইন্ডার ও কম্পাস পরিচালনা' : '🕋 Qibla Finder & Direction Guidance'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-200 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. Languages supported */}
              <div className="space-y-2 p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl">
                <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                  <Languages className="w-4 h-4 text-emerald-400" />
                  {isBn ? '২. ভাষা সমর্থন (বাংলা ও ইংরেজি)' : '2. Language Support (Bangla & English)'}
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {isBn
                    ? 'হ্যাঁ, এই এআই সহকারী বাংলা (বাংলা হরফ ও বাংলিশ/Banglish) এবং ইংরেজি (English) উভয় ভাষাতেই সাবলীলভাবে বুঝতে পারে এবং উত্তর দিতে পারে।'
                    : 'Yes! The AI assistant understands and provides fluent answers in both Bangla (Native script & Banglish keywords) and English.'}
                </p>
              </div>

              {/* 3. How to train this AI? */}
              <div className="space-y-2 p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl">
                <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  {isBn ? '৩. এই এআই কে কীভাবে ট্রেইন / কাস্টমাইজ করবেন?' : '3. How to Train and Expand this AI?'}
                </h4>
                <div className="space-y-2.5 text-slate-300 leading-relaxed">
                  <p>
                    {isBn
                      ? 'এই সহকারীটি দ্রুত, নিরাপদ এবং অফলাইনে চলার জন্য একটি শক্তিশালী লোকাল সেমান্টিক নলেজ ইঞ্জিন দ্বারা চালিত। এটি নতুন তথ্য দিয়ে ট্রেইন করার উপায়:'
                      : 'This assistant is powered by a high-speed, privacy-first local knowledge engine. To add new topics or train it:'}
                  </p>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-300 space-y-1">
                    <p className="text-slate-400">// ফাইল পাথ / File Path:</p>
                    <p className="text-white font-bold">src/services/caveAppGuideEngine.ts</p>
                    <p className="text-slate-400 mt-2">// CAVE_GUIDE_TOPICS অ্যারেতে নতুন টপিক যোগ করুন:</p>
                    <pre className="text-emerald-400 overflow-x-auto p-2 bg-slate-950 rounded border border-slate-800">
{`{
  id: 'your-new-topic',
  category: 'prayer', // prayer, quran, tokens, circle, etc.
  titleBn: 'আপনার নতুন প্রশ্নের শিরোনাম (বাংলা)',
  titleEn: 'Your New Topic Title (English)',
  keywords: ['কীওয়ার্ড১', 'keyword2', 'tag'],
  summaryBn: 'সংক্ষিপ্ত ব্যাখ্যা (বাংলা)',
  summaryEn: 'Short summary in English',
  stepsBn: ['ধাপ ১', 'ধাপ ২'],
  stepsEn: ['Step 1', 'Step 2'],
  actionTab: 'quran' // সংশ্লিষ্ট ট্যাবে রিডাইরেক্ট বাটন
}`}
                    </pre>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {isBn
                      ? 'নতুন যেকোনো ফিচার বা আমলের নিয়ম অথেনটিক নলেজ বেসে অন্তর্ভুক্ত করার সাথে সাথেই Cave AI তাৎক্ষণিকভাবে সেই তথ্যের ওপর ভিত্তি করে নির্ভরযোগ্য উত্তর প্রদান করে।'
                      : 'As new features or rules are added to the authoritative Knowledge Base, Cave AI instantly provides grounded answers based on that verified truth.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                {isBn ? 'বুঝেছি' : 'Got it'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
