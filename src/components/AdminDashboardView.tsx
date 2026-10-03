import React from 'react';
import { ShieldCheck, Users, Store, Coins, CheckCircle, AlertCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface AdminDashboardViewProps {
  currentUser: UserProfile;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ currentUser }) => {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
          <div>
            <h1 className="text-xl font-bold text-white">এডমিন ও মার্চেন্ট কন্ট্রোল প্যানেল</h1>
            <p className="text-slate-400 text-xs">কেভ সাথী সিস্টেম তদারকি, মার্চেন্ট কিউআর ভেরিফিকেশন ও টোকেন ম্যানেজমেন্ট</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
          <Users className="w-6 h-6 text-emerald-400 mx-auto" />
          <div className="text-xl font-bold text-white mt-2">১,৪২৫</div>
          <div className="text-xs text-slate-400">মোট সক্রিয় ইউজার</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
          <Store className="w-6 h-6 text-amber-400 mx-auto" />
          <div className="text-xl font-bold text-white mt-2">৪৮</div>
          <div className="text-xs text-slate-400">পার্টনার শপ</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
          <Coins className="w-6 h-6 text-emerald-300 mx-auto" />
          <div className="text-xl font-bold text-white mt-2">২৫,৪০০</div>
          <div className="text-xs text-slate-400">বিতরণকৃত টোকেন</div>
        </div>
      </div>
    </div>
  );
};
