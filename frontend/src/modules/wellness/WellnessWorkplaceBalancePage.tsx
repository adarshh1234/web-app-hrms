import React, { useState } from 'react';
import { Home, Calendar, Baby, Users, CheckCircle2, DollarSign, Receipt, Plus } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const WellnessWorkplaceBalancePage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'flexi' | 'leave' | 'care' | 'family' | 'fringe'>('flexi');

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider mb-2">
          <Home className="h-3.5 w-3.5 text-teal-300" />
          <span>Workplace & Life Balance</span>
        </div>
        <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Workplace Life Balance</h1>
        <p className="text-xs text-teal-100/80 mt-1">Flexible work scheduling, sabbatical packages, dormitory & daycare assistance, family support, and fringe reimbursements.</p>
      </div>

      {/* Top Page Tabs */}
      <div className="flex flex-wrap gap-2.5 items-center border-b border-slate-200 pb-3 select-none">
        {[
          { id: 'flexi', label: 'Flexible Work Scheduling' },
          { id: 'leave', label: 'Paid Leave Package' },
          { id: 'care', label: 'Dormitory + Child Care' },
          { id: 'family', label: 'Family Wellbeing' },
          { id: 'fringe', label: 'Fringe Reimbursement' },
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
      {activeTab === 'flexi' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-150 pb-3">
            <h3 className="text-sm font-bold text-slate-900 m-0">Hybrid Work Schedule Agreement</h3>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">Current Schedule: 3 Days Office / 2 Days WFH</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
              <span className="text-xs font-bold text-slate-500">Core Hours Preference</span>
              <div className="text-base font-bold text-slate-900">09:00 AM - 05:00 PM (Flexi-band: 08:00 AM - 10:00 AM)</div>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
              <span className="text-xs font-bold text-slate-500">Remote Work Location</span>
              <div className="text-base font-bold text-slate-900">Primary Residence (Verified High-Speed Network)</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'leave' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 m-0">Special Wellness & Paid Leave Allowances</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
              <span className="text-xs font-bold text-slate-500">Sabbatical Leave Balance</span>
              <div className="text-xl font-extrabold text-slate-900">4 Weeks Paid</div>
              <span className="text-[11px] text-teal-600 font-semibold">Eligible after 3 years tenure</span>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
              <span className="text-xs font-bold text-slate-500">Wellness & Caregiver Days</span>
              <div className="text-xl font-extrabold text-slate-900">5 Days Remaining</div>
              <span className="text-[11px] text-emerald-600 font-semibold">Fully paid mental wellness days</span>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
              <span className="text-xs font-bold text-slate-500">Parental Bonding Package</span>
              <div className="text-xl font-extrabold text-slate-900">16 Weeks Paid</div>
              <span className="text-[11px] text-teal-600 font-semibold">Primary & secondary caregiver</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'care' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 m-0">Company Dormitory & Child Care Assistance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-[#004848] font-bold text-xs">
                <Baby className="h-4 w-4" />
                <span>On-Site Daycare & Childcare Subsidies</span>
              </div>
              <p className="text-xs text-slate-600 font-semibold">Monthly $400 USD child care stipend for registered partner nurseries.</p>
              <button 
                onClick={() => toast.success("Childcare stipend application submitted!")}
                className="w-full py-1.5 bg-[#004848] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#006666]"
              >
                Apply for Stipend
              </button>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-[#004848] font-bold text-xs">
                <Home className="h-4 w-4" />
                <span>Executive Company Dormitory Allocation</span>
              </div>
              <p className="text-xs text-slate-600 font-semibold">Short-stay executive apartments available for business travel & relocation.</p>
              <button 
                onClick={() => toast.success("Dormitory booking portal opened.")}
                className="w-full py-1.5 bg-[#004848] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#006666]"
              >
                Reserve Stay
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'family' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 m-0">Family Support & Annual Events</h3>
          <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900 m-0">Annual Family Sports & Picnic Day 2026</h4>
              <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Date: October 18, 2026 • Location: Grand Meadow Park</p>
            </div>
            <button 
              onClick={() => toast.success("Family event passes sent to your email!")}
              className="px-3 py-1.5 bg-[#004848] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#006666]"
            >
              Get Family Pass
            </button>
          </div>
        </div>
      )}

      {activeTab === 'fringe' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500">Monthly Internet & Phone Allowance</span>
              <div className="text-2xl font-extrabold text-slate-900">$150.00 / mo</div>
              <span className="text-[11px] text-emerald-600 font-semibold">Auto-reimbursed with payroll</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500">Commute & Travel Stipend</span>
              <div className="text-2xl font-extrabold text-slate-900">$200.00 / mo</div>
              <span className="text-[11px] text-teal-600 font-semibold">Transit & EV charging credits</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500">Total YTD Fringe Reimbursed</span>
              <div className="text-2xl font-extrabold text-slate-900">$2,800 USD</div>
              <span className="text-[11px] text-teal-600 font-semibold">Tax-exempt benefits</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3">
              <h3 className="text-sm font-bold text-slate-900 m-0">Fringe Benefit Reimbursement Claims</h3>
              <button 
                onClick={() => toast.success("Fringe benefit claim submission form opened.")}
                className="px-3.5 py-1.5 bg-[#004848] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#006666] flex items-center gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Submit Fringe Claim</span>
              </button>
            </div>
            <div className="space-y-3">
              {[
                { id: 'FRG-401', date: 'August 24, 2026', title: 'Home Fiber Internet Bill', category: 'Connectivity', amount: '$120.00', status: 'Approved' },
                { id: 'FRG-392', date: 'August 12, 2026', title: 'Monthly Transit Pass Reimbursement', category: 'Commute', amount: '$180.00', status: 'Paid' },
                { id: 'FRG-380', date: 'July 28, 2026', title: 'Ergonomic Home Office Setup Allowance', category: 'Equipment', amount: '$250.00', status: 'Paid' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50/60 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 m-0">{item.id}: {item.title}</h4>
                    <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Submitted: {item.date} • Category: {item.category} • Amount: {item.amount}</p>
                  </div>
                  <span className={`px-3 py-1 border rounded-full text-xs font-extrabold ${
                    item.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-teal-50 text-teal-700 border-teal-200'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WellnessWorkplaceBalancePage;
