import React, { useState } from 'react';
import { Heart, ShieldCheck, DollarSign, Smile, Activity, FileText } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const WellnessHealthPage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'insurance' | 'reimbursement' | 'mental' | 'fitness'>('insurance');

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider mb-2">
          <Heart className="h-3.5 w-3.5 text-teal-300" />
          <span>Health & Wellness</span>
        </div>
        <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Health & Wellness</h1>
        <p className="text-xs text-teal-100/80 mt-1">Group insurance cards, OPD medical claims, mental health sessions, and corporate fitness programs.</p>
      </div>

      {/* Top Page Tabs */}
      <div className="flex flex-wrap gap-2.5 items-center border-b border-slate-200 pb-3 select-none">
        {[
          { id: 'insurance', label: 'Group Insurance' },
          { id: 'reimbursement', label: 'Health Reimbursement' },
          { id: 'mental', label: 'Mental Wellbeing' },
          { id: 'fitness', label: 'Fitness Program' },
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
      {activeTab === 'insurance' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                <ShieldCheck className="h-4 w-4" />
                <span>Policy Active (Group Health Cover)</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 m-0">Policy Number: GHI-8849-2026</h3>
              <p className="text-xs text-slate-500 font-semibold m-0">Total Sum Insured: $50,000 USD (Self + Spouse + 2 Children)</p>
            </div>
            <button 
              onClick={() => toast.success("Downloading Insurance E-Card PDF...")}
              className="px-4 py-2.5 bg-[#004848] text-white text-xs font-bold rounded-xl hover:bg-[#006666] transition-all cursor-pointer shadow-sm"
            >
              Download Insurance E-Card
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0">Covered Dependents</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Sarah Johnson (Self)', relation: 'Primary Insured', status: 'Covered' },
                { name: 'Michael Johnson', relation: 'Spouse', status: 'Covered' },
                { name: 'Emma Johnson', relation: 'Child', status: 'Covered' },
              ].map((d, i) => (
                <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 m-0">{d.name}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold">{d.relation}</p>
                  <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-extrabold">{d.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reimbursement' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-150 pb-3">
            <h3 className="text-sm font-bold text-slate-900 m-0">OPD & Medical Reimbursement Claims</h3>
            <button 
              onClick={() => toast.success("Medical claim submission form opened.")}
              className="px-3 py-1.5 bg-[#004848] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#006666]"
            >
              Submit New Claim
            </button>
          </div>
          <div className="space-y-3">
            {[
              { id: 'CLM-901', date: 'August 10, 2026', type: 'Dental Consultation', amount: '$150.00', status: 'Approved' },
              { id: 'CLM-882', date: 'July 14, 2026', type: 'Prescription Eyewear', amount: '$220.00', status: 'Reimbursed' }
            ].map((claim, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 m-0">{claim.id}: {claim.type}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Submitted: {claim.date} • Amount: {claim.amount}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">
                  {claim.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'mental' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 m-0">Mental Wellbeing & EAP Counseling</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-[#004848] font-bold text-xs">
                <Smile className="h-4 w-4" />
                <span>1-on-1 Confidential Counseling</span>
              </div>
              <p className="text-xs text-slate-600 font-semibold">Book unlimited 1-on-1 sessions with licensed therapists at zero cost.</p>
              <button 
                onClick={() => toast.success("Redirecting to confidential EAP booking portal...")}
                className="w-full py-1.5 bg-[#004848] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#006666]"
              >
                Book Counselor Session
              </button>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-[#004848] font-bold text-xs">
                <Activity className="h-4 w-4" />
                <span>Mindfulness App Premium Access</span>
              </div>
              <p className="text-xs text-slate-600 font-semibold">Free premium subscription to Headspace & Calm for employee & family.</p>
              <button 
                onClick={() => toast.success("Access code: HUREMASO-WELLNESS sent to your email!")}
                className="w-full py-1.5 bg-[#004848] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#006666]"
              >
                Claim Premium Code
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'fitness' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 m-0">Corporate Fitness Programs</h3>
          <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900 m-0">Monthly 100,000 Step Challenge</h4>
              <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Current Rank: #14 (78,400 steps completed this month)</p>
            </div>
            <span className="px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-xs font-extrabold">Active</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WellnessHealthPage;
