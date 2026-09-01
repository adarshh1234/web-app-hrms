import React, { useState } from 'react';
import { Award, TrendingUp, DollarSign, BookOpen, ShieldCheck } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const WellnessFinancialIncentivesPage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'esop' | 'bonus' | 'incentives' | 'literacy'>('esop');

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider mb-2">
          <Award className="h-3.5 w-3.5 text-teal-300" />
          <span>Wellness & Development</span>
        </div>
        <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Financial Incentives</h1>
        <p className="text-xs text-teal-100/80 mt-1">Manage ESOP stock grants, performance bonus plans, target incentives, and financial literacy workshops.</p>
      </div>

      {/* Top Page Tabs */}
      <div className="flex flex-wrap gap-2.5 items-center border-b border-slate-200 pb-3 select-none">
        {[
          { id: 'esop', label: 'ESOPs' },
          { id: 'bonus', label: 'Performance Bonus' },
          { id: 'incentives', label: 'Incentives' },
          { id: 'literacy', label: 'Financial Literacy Programs' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'esop' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500">Granted ESOP Units</span>
              <div className="text-2xl font-extrabold text-slate-900">2,500 Shares</div>
              <span className="text-[11px] text-teal-600 font-semibold">Grant Price: $12.50 / share</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500">Vested Shares</span>
              <div className="text-2xl font-extrabold text-slate-900">1,250 Shares (50%)</div>
              <span className="text-[11px] text-emerald-600 font-semibold">Available for exercise</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500">Estimated Portfolio Value</span>
              <div className="text-2xl font-extrabold text-slate-900">$106,250</div>
              <span className="text-[11px] text-teal-600 font-semibold">FMV: $42.50 / share (+240%)</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0">Vesting Schedule Roster</h3>
            <div className="space-y-3">
              {[
                { period: 'Tranche 1 (Year 1)', date: 'Oct 15, 2024', shares: '625 Shares', status: 'Vested & Exercisable' },
                { period: 'Tranche 2 (Year 2)', date: 'Oct 15, 2025', shares: '625 Shares', status: 'Vested & Exercisable' },
                { period: 'Tranche 3 (Year 3)', date: 'Oct 15, 2026', shares: '625 Shares', status: 'Unvested (Next Vesting)' },
                { period: 'Tranche 4 (Year 4)', date: 'Oct 15, 2027', shares: '625 Shares', status: 'Unvested' },
              ].map((row, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50/60 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 m-0">{row.period}</h4>
                    <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Vesting Date: {row.date} • {row.shares}</p>
                  </div>
                  <button 
                    onClick={() => toast.success("Exercise request submitted to finance compliance.")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      row.status.includes('Vested &') 
                        ? 'bg-[#004848] text-white hover:bg-[#006666]' 
                        : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {row.status.includes('Vested &') ? 'Exercise Options' : row.status}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bonus' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-150 pb-3">
            <h3 className="text-sm font-bold text-slate-900 m-0">Annual Performance Bonus Tracker</h3>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">Q3 Target Met (112%)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-500">Base Performance Multiplier</span>
              <div className="text-xl font-extrabold text-slate-900">1.25x Base Pay</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-500">Estimated Annual Bonus</span>
              <div className="text-xl font-extrabold text-emerald-600">$18,500 USD</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'incentives' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 m-0">Quarterly Target Incentives</h3>
          <div className="space-y-3">
            {[
              { title: 'Project Milestone Alpha', target: '100% On-time delivery', reward: '$2,500 Spot Award', status: 'Achieved' },
              { title: 'Client Satisfaction Index', target: '> 95% CSAT Score', reward: '$1,500 Incentive', status: 'In Progress (96.2%)' },
            ].map((item, i) => (
              <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 m-0">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Target: {item.target} • Reward: {item.reward}</p>
                </div>
                <span className="px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-xs font-extrabold">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'literacy' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 m-0">Financial Literacy & Wealth Management Workshops</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Personal Tax Planning & Deductions 2026', date: 'September 12, 2026', speaker: 'Senior Tax Consultant' },
              { title: 'Investment Strategies: 401(k) & Mutual Funds', date: 'September 24, 2026', speaker: 'Certified Wealth Planner' }
            ].map((w, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
                <div className="flex items-center gap-2 text-[#004848] font-bold text-xs">
                  <BookOpen className="h-4 w-4" />
                  <span>{w.speaker}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 m-0">{w.title}</h4>
                <p className="text-[11px] font-semibold text-slate-500">{w.date}</p>
                <button 
                  onClick={() => toast.success("Registered for financial literacy session!")}
                  className="w-full py-1.5 bg-[#004848] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#006666]"
                >
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WellnessFinancialIncentivesPage;
