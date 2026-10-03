import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  RefreshCw,
  Eye,
  Filter,
  Users,
  MessageSquare,
  AlertCircle,
  Flag,
  UserX,
  VolumeX,
  Check,
  X,
  Trash2,
  Calendar,
  Lock,
  ChevronRight,
  Info,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { api } from '../services/api';
import { toBnNumber } from '../data/prayerConfig';

interface AdminCircleModerationViewProps {
  adminRole: string;
  adminPermissions: string[];
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg: string) => void;
}

type FilterTab = 'ALL' | 'PENDING' | 'REPORTS' | 'BLOCKED' | 'WARNINGS' | 'RESOLVED' | 'WITHDRAWN';
type SortOption = 'NEWEST' | 'OLDEST' | 'HIGHEST_RISK';

export const AdminCircleModerationView: React.FC<AdminCircleModerationViewProps> = ({
  adminRole,
  adminPermissions,
  onShowToast
}) => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [filterTab, setFilterTab] = useState<FilterTab>('PENDING');
  const [sortOption, setSortOption] = useState<SortOption>('NEWEST');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Item for Detail Modal
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedType, setSelectedType] = useState<'EVENT' | 'REPORT'>('EVENT');

  // Action Confirmation Modal State
  const [confirmAction, setConfirmAction] = useState<{
    action: 'ALLOW' | 'REMOVE_MESSAGE' | 'WARN_USER' | 'MUTE_USER_24H' | 'DISMISS';
    title: string;
    description: string;
    isDangerous: boolean;
  } | null>(null);
  const [actionNotes, setActionNotes] = useState('');
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  // Withdrawal Confirmation Modal State
  const [confirmWithdraw, setConfirmWithdraw] = useState<any | null>(null);
  const [withdrawNotes, setWithdrawNotes] = useState('');
  const [isProcessingWithdraw, setIsProcessingWithdraw] = useState(false);

  // Permission Checks
  const canManage = useMemo(() => {
    return adminRole === 'MASTER_ADMIN' || adminPermissions.includes('MODERATION_MANAGE');
  }, [adminRole, adminPermissions]);

  const fetchModerationData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getAdminModerationQueue();
      if (res.success) {
        setEvents(res.events || []);
        setReports(res.reports || []);
        setStats(res.stats || {});
      } else {
        setError('মডারেশন কিউ লোড করা যায়নি');
      }
    } catch (err: any) {
      console.error('[Admin Moderation] Fetch error:', err);
      setError(err.message || 'সার্ভার সংযোগে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModerationData();
  }, []);

  // Filtered & Sorted Events / Reports
  const filteredList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    if (filterTab === 'REPORTS') {
      let result = reports.filter(r => {
        if (!q) return true;
        const circ = (r.circle_name || '').toLowerCase();
        const rep = (r.reporter_user_name || '').toLowerCase();
        const tar = (r.reported_user_name || '').toLowerCase();
        const desc = (r.description || '').toLowerCase();
        const cat = (r.category || '').toLowerCase();
        return circ.includes(q) || rep.includes(q) || tar.includes(q) || desc.includes(q) || cat.includes(q);
      });

      if (sortOption === 'OLDEST') {
        result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      } else {
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
      return result.map(item => ({ ...item, _type: 'REPORT' }));
    }

    let result = events.filter(e => {
      // Tab filter
      if (filterTab === 'PENDING' && e.review_status !== 'PENDING') return false;
      if (filterTab === 'BLOCKED' && e.decision !== 'BLOCK' && e.admin_action !== 'MUTE_USER_24H' && e.admin_action !== 'REMOVE_MESSAGE') return false;
      if (filterTab === 'WARNINGS' && e.decision !== 'ALLOW_WITH_WARNING' && e.admin_action !== 'WARN_USER') return false;
      if (filterTab === 'RESOLVED' && e.review_status === 'PENDING') return false;
      if (filterTab === 'WITHDRAWN' && !e.is_withdrawn && e.review_status !== 'WITHDRAWN') return false;

      // Search filter
      if (!q) return true;
      const circ = (e.circle_name || '').toLowerCase();
      const user = (e.user_name || '').toLowerCase();
      const phone = (e.user_phone || '').toLowerCase();
      const reason = (e.reason || '').toLowerCase();
      const snippet = (e.message_snippet || '').toLowerCase();
      const notes = (e.admin_notes || '').toLowerCase();
      const action = (e.admin_action || '').toLowerCase();
      return circ.includes(q) || user.includes(q) || phone.includes(q) || reason.includes(q) || snippet.includes(q) || notes.includes(q) || action.includes(q);
    });

    if (sortOption === 'OLDEST') {
      result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (sortOption === 'HIGHEST_RISK') {
      result.sort((a, b) => Number(b.risk_score || 0) - Number(a.risk_score || 0));
    } else {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result.map(item => ({ ...item, _type: 'EVENT' }));
  }, [events, reports, filterTab, sortOption, searchQuery]);

  const handleOpenActionConfirm = (
    action: 'ALLOW' | 'REMOVE_MESSAGE' | 'WARN_USER' | 'MUTE_USER_24H' | 'DISMISS'
  ) => {
    if (!canManage) {
      onShowToast('error', 'অনুমতি নেই', 'মডারেশন সিদ্ধান্ত গ্রহণের জন্য MODERATION_MANAGE পারমিশন প্রয়োজন');
      return;
    }

    let title = '';
    let description = '';
    let isDangerous = false;

    if (action === 'ALLOW') {
      title = 'বার্তা অনুমোদন করুন (Allow Message)';
      description = 'এই বার্তাটি নিরাপদ হিসেবে চিহ্নিত হবে এবং সার্কেলে বহাল থাকবে।';
    } else if (action === 'REMOVE_MESSAGE') {
      title = 'বার্তা মুছে ফেলুন (Remove Message)';
      description = 'এই বার্তাটি সার্কেল থেকে স্থায়ীভাবে অপসারণ করা হবে। এই প্রক্রিয়াটি অপরিবর্তনযোগ্য।';
      isDangerous = true;
    } else if (action === 'WARN_USER') {
      title = 'ব্যবহারকারীকে সতর্কতা পাঠান (Warn User)';
      description = 'ব্যবহারকারীর অ্যাকাউন্টে কমিউনিটি গাইডলাইন লঙ্ঘনের অফিশিয়াল সতর্কতা নথিভুক্ত হবে।';
      isDangerous = false;
    } else if (action === 'MUTE_USER_24H') {
      title = '২৪ ঘণ্টার সাময়িক বিরতি নির্ধারণ (24h Chat Mute)';
      description = 'ব্যবহারকারী আগামী ২৪ ঘণ্টার জন্য কোনো সার্কেলে টেক্সট বার্তা পাঠাতে পারবেন না।';
      isDangerous = true;
    } else if (action === 'DISMISS') {
      title = 'রিভিউ খারিজ করুন (Dismiss Case)';
      description = 'কোনো শাস্তিমূলক ব্যবস্থা ছাড়াই এই কেসটি সমাধান হিসেবে চিহ্নিত হবে।';
    }

    setConfirmAction({ action, title, description, isDangerous });
    setActionNotes('');
  };

  const handleExecuteAction = async () => {
    if (!confirmAction || !selectedItem || isProcessingAction) return;
    setIsProcessingAction(true);

    try {
      const res = await api.executeAdminModerationAction(selectedItem.id, {
        action: confirmAction.action,
        notes: actionNotes.trim()
      });

      if (res.success) {
        onShowToast('success', 'সিদ্ধান্ত সংরক্ষিত', res.message || 'মডারেশন অ্যাকশন সফলভাবে সম্পন্ন হয়েছে');
        setConfirmAction(null);
        setSelectedItem(null);
        await fetchModerationData();
      } else {
        onShowToast('error', 'ত্রুটি', res.message || 'অ্যাকশন সম্পন্ন করা যায়নি');
      }
    } catch (err: any) {
      console.error('[Admin Moderation] Action failed:', err);
      onShowToast('error', 'ব্যর্থ হয়েছে', err.message || 'সার্ভার প্রক্রিয়াকরণে সমস্যা হয়েছে');
    } finally {
      setIsProcessingAction(false);
    }
  };

  const handleWithdrawAction = async () => {
    if (!confirmWithdraw) return;
    setIsProcessingWithdraw(true);
    try {
      const res = await api.withdrawAdminModerationEvent(confirmWithdraw.id, withdrawNotes);
      if (res.success) {
        onShowToast('success', 'সিদ্ধান্ত প্রত্যাহার সম্পন্ন', 'মডারেশন সিদ্ধান্ত প্রত্যাহার ও ব্যবহারকারীর বিধিনিষেধ তুলে নেওয়া হয়েছে।');
        setConfirmWithdraw(null);
        setWithdrawNotes('');
        setSelectedItem(null);
        await fetchModerationData();
      } else {
        onShowToast('error', 'ব্যর্থ হয়েছে', res.message || 'সিদ্ধান্ত প্রত্যাহার করা যায়নি');
      }
    } catch (err: any) {
      console.error('[Admin Moderation] Withdraw error:', err);
      onShowToast('error', 'ত্রুটি', err.message || 'সার্ভার সংযোগে সমস্যা হয়েছে');
    } finally {
      setIsProcessingWithdraw(false);
    }
  };

  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case 'EXPLICIT_SEXUAL':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'HARASSMENT':
      case 'HATE_ABUSE':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'MALICIOUS_LINK':
      case 'SPAM':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'INAPPROPRIATE_SOLICITATION':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getDecisionBadge = (item: any) => {
    if (!item) return null;
    if (item.is_withdrawn || item.review_status === 'WITHDRAWN') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-violet-500/15 text-violet-300 border border-violet-500/30">
          <RotateCcw className="w-3 h-3 text-violet-400" />
          Withdrawn (প্রত্যাহারকৃত)
        </span>
      );
    }
    if (item.admin_action === 'WARN_USER') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/35">
          <AlertTriangle className="w-3 h-3 text-amber-400" />
          User Warned (সতর্কতা জারি)
        </span>
      );
    }
    if (item.admin_action === 'MUTE_USER_24H') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-500/15 text-orange-300 border border-orange-500/35">
          <VolumeX className="w-3 h-3 text-orange-400" />
          Muted 24h (বার্তা বিরতি)
        </span>
      );
    }
    if (item.admin_action === 'REMOVE_MESSAGE') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/35">
          <Trash2 className="w-3 h-3 text-rose-400" />
          Message Removed (মুছে ফেলা হয়েছে)
        </span>
      );
    }
    if (item.admin_action === 'ALLOW' || item.review_status === 'APPROVED') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/35">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          Allowed / Approved (অনুমোদিত)
        </span>
      );
    }
    if (item.admin_action === 'DISMISS' || item.review_status === 'DISMISSED') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
          <Check className="w-3 h-3 text-slate-400" />
          Dismissed (খারিজ)
        </span>
      );
    }
    if (item.decision === 'ALLOW_WITH_WARNING') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/35">
          <AlertTriangle className="w-3 h-3 text-amber-400" />
          System Warning Flag
        </span>
      );
    }
    if (item.decision === 'BLOCK') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/35">
          <XCircle className="w-3 h-3 text-rose-400" />
          Blocked by System (সিস্টেম ব্লক)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/15 text-blue-300 border border-blue-500/35">
        <Clock className="w-3 h-3 text-blue-400" />
        Pending Review (অপেক্ষমাণ)
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-[#0b1329] border border-[#152347] shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white tracking-wide">Cave Circle Moderation</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-amber-400 border border-slate-700">
                  Private Engine V1
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                কেভ সার্কেল মেসেজ মডারেশন কিউ ও ব্যবহারকারী রিপোর্ট পর্যালোচনা কনসোল।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={fetchModerationData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#152347] hover:bg-[#1d305f] text-slate-200 hover:text-white border border-[#233870] text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              রিফ্রেশ
            </button>
          </div>
        </div>
      </div>

      {/* Compact Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl bg-[#0b1329] border border-[#152347] flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            Pending Review
          </span>
          <div className="text-2xl font-black text-white mt-2">
            {toBnNumber(stats.pending_count || 0)}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0b1329] border border-[#152347] flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Flag className="w-3.5 h-3.5 text-amber-400" />
            User Reports
          </span>
          <div className="text-2xl font-black text-amber-400 mt-2">
            {toBnNumber(reports.length || 0)}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0b1329] border border-[#152347] flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
            Warnings Issued
          </span>
          <div className="text-2xl font-black text-yellow-400 mt-2">
            {toBnNumber(stats.warning_count || 0)}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0b1329] border border-[#152347] flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Resolved Actions
          </span>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            {toBnNumber(stats.resolved_count || 0)}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0b1329] border border-[#152347] flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5 text-violet-400" />
            Withdrawn (প্রত্যাহার)
          </span>
          <div className="text-2xl font-black text-violet-400 mt-2">
            {toBnNumber(stats.withdrawn_count || 0)}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0b1329] border border-[#152347] flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            Total Events
          </span>
          <div className="text-2xl font-black text-slate-300 mt-2">
            {toBnNumber(stats.total_events || 0)}
          </div>
        </div>
      </div>

      {/* Self-Hosted Private AI Shadow Mode Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#0c1630] to-[#081f21] border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
            🤖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Private AI Classifier (Shadow Mode)</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE • PRIVATE_AI_MULTILINGUAL_V1 (DistilBERT Multilingual)
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              এআই মডেল শ্যাডো মোডে ব্যাকগ্রাউন্ডে মূল্যায়ন করছে; রুল ইঞ্জিন চূড়ান্ত সিদ্ধান্ত গ্রহণকারী হিসেবে সক্রিয়।
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] shrink-0 font-mono">
          <div>
            <span className="text-slate-400">AI Evaluated:</span>{' '}
            <span className="text-white font-bold">{toBnNumber(stats.ai_evaluated_count || 0)}</span>
          </div>
          <div>
            <span className="text-slate-400">Disagreements:</span>{' '}
            <span className="text-amber-400 font-bold">{toBnNumber(stats.ai_disagreement_count || 0)}</span>
          </div>
          <div>
            <span className="text-slate-400">Avg Latency:</span>{' '}
            <span className="text-emerald-400 font-bold">{stats.ai_avg_latency_ms || 0} ms</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="rounded-2xl bg-[#0b1329] border border-[#152347] overflow-hidden shadow-xl">
        {/* Navigation Tabs & Search Controls */}
        <div className="p-4 border-b border-[#152347] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setFilterTab('PENDING')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterTab === 'PENDING'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Pending ({toBnNumber(stats.pending_count || 0)})
            </button>

            <button
              onClick={() => setFilterTab('REPORTS')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterTab === 'REPORTS'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              User Reports ({toBnNumber(reports.length || 0)})
            </button>

            <button
              onClick={() => setFilterTab('BLOCKED')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterTab === 'BLOCKED'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Blocked Messages
            </button>

            <button
              onClick={() => setFilterTab('WARNINGS')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterTab === 'WARNINGS'
                  ? 'bg-yellow-500 text-slate-950 font-black shadow-lg shadow-yellow-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Warnings ({toBnNumber(stats.warning_count || 0)})
            </button>

            <button
              onClick={() => setFilterTab('RESOLVED')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterTab === 'RESOLVED'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Resolved ({toBnNumber(stats.resolved_count || 0)})
            </button>

            <button
              onClick={() => setFilterTab('WITHDRAWN')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterTab === 'WITHDRAWN'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Withdrawn ({toBnNumber(stats.withdrawn_count || 0)})
            </button>

            <button
              onClick={() => setFilterTab('ALL')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterTab === 'ALL'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              All Events
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[220px] flex-1">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="সার্কেল, ইউজার বা কারণ খুঁজুন..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#070d1f] border border-[#152347] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortOption}
              onChange={e => setSortOption(e.target.value as SortOption)}
              className="px-3 py-1.5 bg-[#070d1f] border border-[#152347] rounded-xl text-xs text-slate-300 focus:outline-none focus:border-amber-500/50 cursor-pointer"
            >
              <option value="NEWEST">সর্বশেষ (Newest)</option>
              <option value="OLDEST">পুরাতন (Oldest)</option>
              <option value="HIGHEST_RISK">সর্বোচ্চ ঝুঁকি (Risk)</option>
            </select>
          </div>
        </div>

        {/* List Content */}
        {loading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-amber-400" />
            <span className="text-xs font-bold">মডারেশন তথ্য লোড হচ্ছে...</span>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <AlertCircle className="w-8 h-8 text-rose-400" />
            <span className="text-sm font-bold text-white">{error}</span>
            <button
              onClick={fetchModerationData}
              className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold cursor-pointer hover:bg-amber-400 transition-all"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-500">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-white">কোনো পর্যালোচনা অপেক্ষমাণ নেই</span>
            <span className="text-xs text-slate-500">এই ফিল্টারে কোনো মডারেশন ইভেন্ট পাওয়া যায়নি।</span>
          </div>
        ) : (
          <div className="divide-y divide-[#152347]">
            {filteredList.map((item: any) => {
              const isReport = item._type === 'REPORT';

              if (isReport) {
                return (
                  <div
                    key={item.id}
                    onClick={() => { setSelectedItem(item); setSelectedType('REPORT'); }}
                    className="p-4 hover:bg-[#101b38] transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                        <Flag className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-black text-white truncate">
                            {item.circle_name || 'Cave Circle'}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getCategoryBadgeClass(item.category)}`}>
                            {item.category}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                            Status: {item.status}
                          </span>
                        </div>

                        <div className="text-xs text-slate-300 mt-1 line-clamp-1">
                          <span className="text-slate-500">অভিযোগকারী:</span> {item.reporter_user_name} → <span className="text-slate-500">বিরুদ্ধে:</span> <span className="font-bold text-white">{item.reported_user_name}</span>
                        </div>

                        {item.description && (
                          <p className="text-[11px] text-slate-400 mt-1 italic line-clamp-1">
                            "{item.description}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 text-right">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block">
                          {new Date(item.created_at).toLocaleString('bn-BD')}
                        </span>
                      </div>
                      <button className="p-2 rounded-lg bg-[#152347] text-slate-300 group-hover:text-amber-400 group-hover:bg-[#1d305f] transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              }

              // Normal Moderation Event
              let parsedCategories: string[] = [];
              if (item.categories) {
                if (Array.isArray(item.categories)) parsedCategories = item.categories;
                else if (typeof item.categories === 'string') {
                  try { parsedCategories = JSON.parse(item.categories); } catch { parsedCategories = [item.categories]; }
                }
              }

              return (
                <div
                  key={item.id}
                  onClick={() => { setSelectedItem(item); setSelectedType('EVENT'); }}
                  className="p-4 hover:bg-[#101b38] transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0 mt-0.5">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-white truncate">
                          {item.circle_name || 'Cave Circle'}
                        </span>
                        {getDecisionBadge(item)}
                        {item.ai_decision && (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${
                            item.shadow_disagreement
                              ? 'bg-amber-500/10 text-amber-300 border-amber-500/40'
                              : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          }`}>
                            <span>🤖 AI:</span>
                            <span>{item.ai_decision} ({Math.round(Number(item.ai_risk_score || 0) * 100)}%)</span>
                            {item.shadow_disagreement && <span className="text-amber-400">⚠️ Disagree</span>}
                          </span>
                        )}
                        {parsedCategories.map((cat, idx) => (
                          <span key={idx} className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getCategoryBadgeClass(cat)}`}>
                            {cat}
                          </span>
                        ))}
                      </div>

                      <div className="text-xs text-slate-300 mt-1">
                        <span className="text-slate-500">প্রেরক:</span> <span className="font-bold text-white">{item.user_name}</span> ({item.user_phone})
                      </div>

                      {item.message_snippet && (
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 font-mono bg-slate-950/40 px-2 py-1 rounded border border-slate-800/80">
                          {item.message_snippet}
                        </p>
                      )}

                      {item.admin_notes && (
                        <p className="text-[11px] text-amber-300/80 mt-1 line-clamp-1 flex items-center gap-1.5">
                          <span className="font-bold text-slate-400">এডমিন নোট:</span> {item.admin_notes}
                        </p>
                      )}

                      {item.is_withdrawn && (
                        <p className="text-[11px] text-violet-400 mt-1 flex items-center gap-1">
                          <RotateCcw className="w-3 h-3 text-violet-400" />
                          <span>সিদ্ধান্ত প্রত্যাহার করা হয়েছে ({new Date(item.withdrawn_at).toLocaleString('bn-BD')})</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 text-right">
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-300">
                        Risk: <span className={Number(item.risk_score) >= 0.75 ? 'text-rose-400 font-black' : Number(item.risk_score) >= 0.35 ? 'text-amber-400' : 'text-emerald-400'}>{Number(item.risk_score || 0).toFixed(2)}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block">
                        {new Date(item.created_at).toLocaleString('bn-BD')}
                      </span>
                    </div>

                    <button className="p-2 rounded-lg bg-[#152347] text-slate-300 group-hover:text-amber-400 group-hover:bg-[#1d305f] transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Case Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-2xl bg-[#0b1329] border border-[#152347] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#152347] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">
                    {selectedType === 'REPORT' ? 'User Report Details' : 'Moderation Event Review'}
                  </h3>
                  <span className="text-[11px] text-slate-400">Case ID: {selectedItem.id}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Section 1: USER CONTENT */}
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                  1. User Content (বার্তা ও ব্যবহারকারী)
                </span>
                <div className="p-4 rounded-xl bg-[#060b18] border border-slate-800 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px]">সার্কেল:</span>
                      <span className="font-bold text-white">{selectedItem.circle_name || selectedItem.circle_id}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">প্রেরক:</span>
                      <span className="font-bold text-white">{selectedItem.user_name || selectedItem.reported_user_name || 'N/A'}</span> ({selectedItem.user_phone || selectedItem.reported_user_phone || 'N/A'})
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] mb-1">মেসেজ কন্টেন্ট:</span>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 break-words">
                      {selectedItem.message_snippet || selectedItem.message_content || '(বার্তা স্নিপেট সংরক্ষিত নেই)'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: SYSTEM ANALYSIS */}
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  2. System & AI Analysis (সিস্টেম ও এআই বিশ্লেষণ)
                </span>
                <div className="p-4 rounded-xl bg-[#060b18] border border-slate-800 space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Authoritative Classifier:</span>
                      <span className="font-bold text-amber-400">{selectedItem.classifier_id || 'RULE_ENGINE_V1'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Rule Risk Score:</span>
                      <span className="font-bold text-rose-400">{Number(selectedItem.risk_score || 0).toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Authoritative Decision:</span>
                      <span className="font-bold text-white">{selectedItem.decision || selectedItem.status}</span>
                    </div>
                  </div>

                  {/* Private AI Shadow Evaluation Card */}
                  {selectedItem.ai_decision ? (
                    <div className="p-3 rounded-lg bg-slate-900/80 border border-emerald-500/20 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-emerald-400 flex items-center gap-1">
                          🤖 Self-Hosted Private AI (PRIVATE_AI_TOXIC_BERT_V1)
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">
                          Latency: {selectedItem.ai_latency_ms || 0}ms
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-slate-500 block text-[10px]">AI Prediction:</span>
                          <span className="font-bold text-white">{selectedItem.ai_decision}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">Confidence:</span>
                          <span className="font-bold text-emerald-300">{(Number(selectedItem.ai_risk_score || 0) * 100).toFixed(0)}%</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">Alignment:</span>
                          <span className={`font-bold ${selectedItem.shadow_disagreement ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {selectedItem.shadow_disagreement ? '⚠️ Disagreement' : '✓ Aligned with Rules'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-500 italic">
                      এআই শ্যাডো মূল্যায়ন ডেটা সংরক্ষিত নেই (রুল ইঞ্জিন সিদ্ধান্ত গ্রহণ করেছে)।
                    </div>
                  )}

                  {selectedItem.reason && (
                    <div>
                      <span className="text-slate-500 block text-[10px] mb-1">শনাক্তকরণের কারণ:</span>
                      <p className="text-xs text-slate-300">{selectedItem.reason}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 3: ADMIN DECISION STATUS & HISTORY */}
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  3. Admin Moderation Decision & History (প্রশাসনিক সিদ্ধান্ত ও রেকর্ড)
                </span>

                {/* If a decision was already taken on this event */}
                {(selectedItem.admin_action || selectedItem.review_status !== 'PENDING' || selectedItem.is_withdrawn) && (
                  <div className="p-4 rounded-xl bg-[#060b18] border border-amber-500/20 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">বর্তমান সিদ্ধান্ত:</span>
                        {getDecisionBadge(selectedItem)}
                      </div>
                      {selectedItem.reviewed_at && (
                        <span className="text-[11px] text-slate-500">
                          {new Date(selectedItem.reviewed_at).toLocaleString('bn-BD')}
                        </span>
                      )}
                    </div>

                    {selectedItem.admin_notes && (
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                        <span className="font-bold text-slate-400 block text-[10px] mb-0.5">এডমিন অডিট নোট:</span>
                        {selectedItem.admin_notes}
                      </div>
                    )}

                    {selectedItem.reviewed_by && (
                      <div className="text-[11px] text-slate-500">
                        গৃহীত সিদ্ধান্তকারী এডমিন: <span className="text-white font-medium">{selectedItem.reviewed_by}</span>
                      </div>
                    )}

                    {/* Withdrawal Status & Button */}
                    {selectedItem.is_withdrawn ? (
                      <div className="p-3 rounded-lg bg-violet-950/40 border border-violet-500/30 text-xs text-violet-300 flex items-center gap-2">
                        <RotateCcw className="w-4 h-4 text-violet-400 shrink-0" />
                        <div>
                          <span className="font-bold block">সিদ্ধান্ত প্রত্যাহার করা হয়েছে (Withdrawn)</span>
                          <span className="text-[10px] text-violet-400/80">
                            ব্যবহারকারীর সতর্কতা ও বার্তা প্রেরণের নিষেধাজ্ঞা সম্পূর্ণরূপে তুলে নেওয়া হয়েছে।
                          </span>
                        </div>
                      </div>
                    ) : canManage && (
                      <div className="pt-2 border-t border-slate-800 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setConfirmWithdraw(selectedItem)}
                          className="px-4 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/40 hover:border-violet-500 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-violet-400" />
                          সিদ্ধান্ত প্রত্যাহার করুন (Withdraw Decision)
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Execution Panel */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 block">
                    {selectedItem.admin_action ? 'নতুন সিদ্ধান্ত গ্রহণ বা পরিবর্তন করুন:' : 'সিদ্ধান্ত গ্রহণ করুন:'}
                  </span>

                  {!canManage ? (
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                      <Info className="w-4 h-4 text-amber-400 shrink-0" />
                      আপনার অ্যাকাউন্টে শুধুমাত্র <b>MODERATION_VIEW</b> পারমিশন রয়েছে। সিদ্ধান্ত নিতে <b>MODERATION_MANAGE</b> পারমিশন প্রয়োজন।
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                      <button
                        onClick={() => handleOpenActionConfirm('ALLOW')}
                        className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Allow Message
                      </button>

                      <button
                        onClick={() => handleOpenActionConfirm('WARN_USER')}
                        className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        Warn User
                      </button>

                      <button
                        onClick={() => handleOpenActionConfirm('MUTE_USER_24H')}
                        className="p-3 rounded-xl bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <VolumeX className="w-4 h-4" />
                        24h Mute
                      </button>

                      <button
                        onClick={() => handleOpenActionConfirm('REMOVE_MESSAGE')}
                        className="p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove Message
                      </button>

                      <button
                        onClick={() => handleOpenActionConfirm('DISMISS')}
                        className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer col-span-2 md:col-span-2"
                      >
                        <Check className="w-4 h-4" />
                        Dismiss / Resolve Case
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-[#0b1329] border border-[#152347] shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                confirmAction.isDangerous ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              }`}>
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white">{confirmAction.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{confirmAction.description}</p>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1.5">
                এডমিন অডিট নোট (ঐচ্ছিক):
              </label>
              <textarea
                value={actionNotes}
                onChange={e => setActionNotes(e.target.value)}
                placeholder="সিদ্ধান্তের কারণ বা নির্দেশনা লিখুন..."
                rows={2}
                className="w-full p-3 bg-[#070d1f] border border-[#152347] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmAction(null)}
                disabled={isProcessingAction}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
              >
                বাতিল
              </button>

              <button
                onClick={handleExecuteAction}
                disabled={isProcessingAction}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50 ${
                  confirmAction.isDangerous
                    ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                }`}
              >
                {isProcessingAction && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                নিশ্চিত করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Confirmation Modal */}
      {confirmWithdraw && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-[#0b1329] border border-violet-500/40 shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-400 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white">সিদ্ধান্ত প্রত্যাহার নিশ্চিতকরণ (Withdraw Decision)</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  ব্যবহারকারীর উপর আরোপিত সতর্কতা বা চ্যাট মিউট বাতিল হয়ে যাবে এবং ব্যবহারকারীর ইনবক্সে নোটিফিকেশন পৌঁছাবে।
                </p>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1.5">
                প্রত্যাহারের কারণ / নোট (ঐচ্ছিক):
              </label>
              <textarea
                value={withdrawNotes}
                onChange={e => setWithdrawNotes(e.target.value)}
                placeholder="ভুলবশত সতর্কতা জারি হয়েছিল বা ক্ষমা চাওয়া হয়েছে..."
                rows={2}
                className="w-full p-3 bg-[#070d1f] border border-[#152347] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => { setConfirmWithdraw(null); setWithdrawNotes(''); }}
                disabled={isProcessingWithdraw}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
              >
                বাতিল
              </button>

              <button
                onClick={handleWithdrawAction}
                disabled={isProcessingWithdraw}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-black transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-violet-600/30 disabled:opacity-50"
              >
                {isProcessingWithdraw && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                প্রত্যাহার কার্যকর করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
