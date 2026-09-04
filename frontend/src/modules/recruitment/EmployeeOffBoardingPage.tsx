import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  UserMinus, 
  Sparkles, 
  FileText, 
  Laptop, 
  User, 
  Award, 
  Globe, 
  ShieldCheck, 
  BarChart3, 
  Send, 
  CheckCircle2, 
  Clock, 
  Download, 
  Lock, 
  FileCheck, 
  Car, 
  Plane, 
  DollarSign, 
  Briefcase, 
  History, 
  AlertCircle, 
  CheckSquare, 
  RotateCcw, 
  TrendingUp, 
  Activity,
  Layers,
  Heart
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const EmployeeOffBoardingPage: React.FC = () => {
  const toast = useToast();
  const location = useLocation();
  const path = location.pathname;

  // Active page-level green pill tab states
  const [docTab, setDocTab] = useState('resignation-ai');
  const [perfTab, setPerfTab] = useState('history');
  const [settlementTab, setSettlementTab] = useState('compensation');
  const [legalTab, setLegalTab] = useState('cheque');
  const [assetTab, setAssetTab] = useState('possessed');
  const [travelTab, setTravelTab] = useState('tickets');
  const [reportTab, setReportTab] = useState('reports-ai');

  // AI Drafting State
  const [isDraftingDoc, setIsDraftingDoc] = useState(false);
  const [offboardEmpName, setOffboardEmpName] = useState('Sarah Jenkins');
  const [offboardRole, setOffboardRole] = useState('Principal Software Engineer');
  const [noticeDuration, setNoticeDuration] = useState('30 Days');
  const [reasonText, setReasonText] = useState('Pursuing higher studies & career transition');

  const handleDraftOffboardDoc = (type: string) => {
    setIsDraftingDoc(true);
    setTimeout(() => {
      setIsDraftingDoc(false);
      toast.success(`${type} generated with AI successfully for ${offboardEmpName}!`);
    }, 800);
  };

  const isDocument = path.includes('/offboarding/document');
  const isPerformance = path.includes('/offboarding/performance');
  const isSettlement = path.includes('/offboarding/settlement');
  const isLegal = path.includes('/offboarding/legal');
  const isAssets = path.includes('/offboarding/assets');
  const isTravel = path.includes('/offboarding/travel');
  const isReport = path.includes('/offboarding/report');

  // View 1: Document
  if (isDocument || (!isPerformance && !isSettlement && !isLegal && !isAssets && !isTravel && !isReport)) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider mb-2">
            <UserMinus className="h-3.5 w-3.5 text-teal-300" />
            <span>Off-Boarding Document Studio</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Off-Boarding Documents</h1>
          <p className="text-xs text-teal-100/80 mt-1">AI-assisted resignation letter and termination letter generation.</p>
        </div>

        {/* 2 Page-level Green Pill Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 select-none">
          {[
            { id: 'resignation-ai', label: 'Resignation Letter Drafting with AI' },
            { id: 'termination-ai', label: 'Termination Letter Drafting with AI' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setDocTab(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                docTab === t.id
                  ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Resignation Letter Drafting with AI */}
        {docTab === 'resignation-ai' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-3xl">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3">
              <div className="flex items-center gap-2 text-purple-700 font-bold text-xs">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-extrabold text-slate-900">AI Resignation Letter Studio</span>
              </div>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-[11px] font-extrabold">Legal AI</span>
            </div>

            <div className="space-y-3.5 text-xs font-semibold text-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-bold text-slate-800">Employee Name</label>
                  <input 
                    type="text"
                    value={offboardEmpName}
                    onChange={(e) => setOffboardEmpName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-[#004848]"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-800">Role / Position</label>
                  <input 
                    type="text"
                    value={offboardRole}
                    onChange={(e) => setOffboardRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-[#004848]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-bold text-slate-800">Notice Period</label>
                  <select 
                    value={noticeDuration}
                    onChange={(e) => setNoticeDuration(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none"
                  >
                    <option>30 Days (Standard)</option>
                    <option>60 Days (Executive)</option>
                    <option>Notice Period Waiver Request</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-800">Resignation Reason</label>
                  <input 
                    type="text"
                    value={reasonText}
                    onChange={(e) => setReasonText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-[#004848]"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-slate-900 font-bold">
                  <span>AI Clause Benchmarking</span>
                  <span className="text-xs text-emerald-600 font-extrabold">Labor Law Compliant</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">Includes standard exit acknowledgement, knowledge transfer timeline, and final settlement release clause.</p>
              </div>

              <button
                onClick={() => handleDraftOffboardDoc('Resignation Letter')}
                disabled={isDraftingDoc}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-sm hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>{isDraftingDoc ? 'Drafting Resignation Letter...' : 'Draft Resignation Letter with AI'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Termination Letter Drafting with AI */}
        {docTab === 'termination-ai' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-3xl">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3">
              <div className="flex items-center gap-2 text-purple-700 font-bold text-xs">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-extrabold text-slate-900">AI Termination Letter Generator</span>
              </div>
              <span className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full text-[11px] font-extrabold">Executive Separation</span>
            </div>

            <div className="space-y-3.5 text-xs font-semibold text-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-bold text-slate-800">Target Employee</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none">
                    <option>Sarah Jenkins (Principal Software Engineer)</option>
                    <option>David Vance (Senior Operations Manager)</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-800">Termination Type</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none">
                    <option>Mutual Separation Agreement</option>
                    <option>Redundancy / Structural Restructure</option>
                    <option>For Cause Separation</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-slate-900 font-bold">
                  <span>Severance & Benefits Clause</span>
                  <span className="text-xs text-purple-700 font-extrabold">Auto-Calculated</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">Includes 2 months severance pay, COBRA health insurance continuation, and NDA non-solicitation reminder.</p>
              </div>

              <button
                onClick={() => handleDraftOffboardDoc('Termination Letter')}
                disabled={isDraftingDoc}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-sm hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>{isDraftingDoc ? 'Drafting Termination Letter...' : 'Draft Termination Letter with AI'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // View 2: Performance
  if (isPerformance) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Performance Retrospective</h1>
          <p className="text-xs text-teal-100/80 mt-1">Tenure history, appraisal ratings, exit interview feedback, and reference endorsements.</p>
        </div>

        {/* 3 Page-level Green Pill Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 select-none">
          {[
            { id: 'history', label: "It's story (History)" },
            { id: 'appraisal', label: 'Appraisal' },
            { id: 'reference', label: 'reference' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setPerfTab(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                perfTab === t.id
                  ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {perfTab === 'history' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Tenure Timeline & Career Milestones Story</h3>
            <div className="space-y-3">
              {[
                { date: 'March 2023', event: 'Joined Huremaso as Senior Engineer', detail: 'Onboarded into Core Platform Team' },
                { date: 'January 2024', event: 'Promoted to Principal Software Engineer', detail: 'Led UI Micro-frontend Redesign' },
                { date: 'June 2025', event: 'Received Excellence Award', detail: 'Delivered High-Availability Architecture' },
              ].map((m, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <History className="h-4 w-4 text-[#004848]" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 m-0">{m.event} ({m.date})</h4>
                      <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{m.detail}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-xs font-extrabold">Milestone</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {perfTab === 'appraisal' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Historical Appraisal Scores & Exit Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                <span className="text-xs font-bold text-slate-500">Overall Cumulative Rating</span>
                <div className="text-2xl font-extrabold text-[#004848]">4.85 / 5.0</div>
                <span className="text-[11px] text-emerald-600 font-semibold font-bold">Consistently Exceeded Expectations</span>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                <span className="text-xs font-bold text-slate-500">Exit Interview Score</span>
                <div className="text-2xl font-extrabold text-slate-900">Highly Recommended</div>
                <span className="text-[11px] text-teal-600 font-semibold font-bold">Eligible for Re-hire</span>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                <span className="text-xs font-bold text-slate-500">Project Deliverables</span>
                <div className="text-2xl font-extrabold text-slate-900">100% Cleared</div>
                <span className="text-[11px] text-emerald-600 font-semibold font-bold">Handover Complete</span>
              </div>
            </div>
          </div>
        )}

        {perfTab === 'reference' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <div className="flex justify-between items-center border-b border-slate-150 pb-3">
              <h3 className="text-sm font-bold text-slate-900 m-0">Verified Experience Certificate & Reference Letter</h3>
              <button 
                onClick={() => toast.success("Downloaded Experience Certificate & Reference Letter PDF")}
                className="px-3.5 py-1.5 bg-[#004848] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#006666] flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">Official Endorsement Status</span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">Signed & Stamped</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">Valid corporate digital signature applied. Verified by HR Operations.</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // View 3: Settlement
  if (isSettlement) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Final Financial Settlement</h1>
          <p className="text-xs text-teal-100/80 mt-1">Full & Final (F&F) compensation payout, gratuity, notice period, and custom exit benefits.</p>
        </div>

        {/* 5 Page-level Green Pill Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 select-none">
          {[
            { id: 'compensation', label: 'Compensation' },
            { id: 'gratuity', label: 'gratuity' },
            { id: 'notice-salary', label: 'Notice Period Salary' },
            { id: 'pending-salary', label: 'Pending Salary' },
            { id: 'other-benefits', label: 'Other Benefits (Custom)' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSettlementTab(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                settlementTab === t.id
                  ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {settlementTab === 'compensation' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Full & Final (F&F) Payout Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                <span className="text-xs font-bold text-slate-500">Gross Exit Payout</span>
                <div className="text-2xl font-extrabold text-[#004848]">$28,450 USD</div>
                <span className="text-[11px] text-emerald-600 font-semibold font-bold">Calculated & Audited</span>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                <span className="text-xs font-bold text-slate-500">Encashable Leave Days</span>
                <div className="text-2xl font-extrabold text-slate-900">14 Days ($7,600)</div>
                <span className="text-[11px] text-teal-600 font-semibold font-bold">PTO Balance Encashed</span>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                <span className="text-xs font-bold text-slate-500">Deductions (Asset/Tax)</span>
                <div className="text-2xl font-extrabold text-slate-900">$0.00</div>
                <span className="text-[11px] text-emerald-600 font-semibold font-bold">Zero Deductions</span>
              </div>
            </div>
          </div>
        )}

        {settlementTab === 'gratuity' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">End of Service Gratuity Calculation</h3>
            <div className="space-y-3 text-xs font-semibold text-slate-700">
              <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                <span>Total Tenure Served:</span>
                <strong className="text-slate-900">3 Years 6 Months</strong>
              </div>
              <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                <span>Basic Salary Entitlement Formula:</span>
                <strong className="text-slate-900">21 Days per Year</strong>
              </div>
              <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                <span>Net Approved Gratuity Payout:</span>
                <strong className="text-emerald-700 text-sm font-extrabold">$14,850 USD</strong>
              </div>
            </div>
          </div>
        )}

        {settlementTab === 'notice-salary' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Notice Period Salary Particulars</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">Served Notice Period Salary (30 Days)</span>
                <span className="text-sm font-extrabold text-[#004848]">$13,750 USD</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">Included in final monthly disbursement cycle.</p>
            </div>
          </div>
        )}

        {settlementTab === 'pending-salary' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Unprocessed Pending Salary & Expenses</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">Pending Expenses Reimbursement</h4>
                <p className="text-[11px] text-slate-500 font-semibold">Travel & Client Dinner Receipts Cleared</p>
              </div>
              <span className="text-sm font-extrabold text-emerald-700">$1,250 USD</span>
            </div>
          </div>
        )}

        {settlementTab === 'other-benefits' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Other Custom Exit Allowances</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                <h4 className="text-xs font-bold text-slate-900 m-0">Vested Stock Options Acceleration</h4>
                <p className="text-[11px] text-slate-500 font-semibold">2,500 Vested Options exercisable within 90 days</p>
                <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-extrabold">Active Window</span>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                <h4 className="text-xs font-bold text-slate-900 m-0">COBRA Health Plan Subsidy</h4>
                <p className="text-[11px] text-slate-500 font-semibold">3 Months company subsidized medical continuation</p>
                <span className="inline-block px-2 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-[10px] font-extrabold font-bold">Approved</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // View 4: Legal
  if (isLegal) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Legal Clearance & Revocation</h1>
          <p className="text-xs text-teal-100/80 mt-1">Legal cheque vouchers, visa cancellation, insurance delisting, and police clearance.</p>
        </div>

        {/* 4 Page-level Green Pill Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 select-none">
          {[
            { id: 'cheque', label: 'Legal Cheque' },
            { id: 'visa-cancel', label: 'Visa Cancellation' },
            { id: 'insurance', label: 'Insurance' },
            { id: 'pcc', label: 'PCC' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setLegalTab(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                legalTab === t.id
                  ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {legalTab === 'cheque' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Legal Cheque & Payment Release Voucher</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">Legal Cheque Voucher #</span>
                <span className="text-xs font-mono font-bold text-[#004848]">CHQ-2026-OFF-8841</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">Bank Cashier Cheque prepared and ready for handover upon final clearance sign-off.</p>
            </div>
          </div>
        )}

        {legalTab === 'visa-cancel' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Labor & Residency Visa Cancellation</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">MOHRE & Immigration Work Permit Revocation</h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Status: Grace Period Active (30 Days Remaining)</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">Cancelled</span>
            </div>
          </div>
        )}

        {legalTab === 'insurance' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Group Insurance Delisting</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">Health & Life Policy Cancellation Notice</h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Transitioned to COBRA Individual Continuation</p>
              </div>
              <span className="px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-xs font-extrabold font-bold">Processed</span>
            </div>
          </div>
        )}

        {legalTab === 'pcc' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Police Clearance Certificate & NOC</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">Police Conduct Clearance (PCC) & Employer NOC</h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">No Objection Certificate Issued</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold font-bold">Clear</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // View 5: Assets
  if (isAssets) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Asset Return & IT Clearance</h1>
          <p className="text-xs text-teal-100/80 mt-1">Possessed assets inventory, return audit, project dependencies, and final clearance.</p>
        </div>

        {/* 6 Page-level Green Pill Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 select-none">
          {[
            { id: 'possessed', label: 'Assets List - Possessed' },
            { id: 'return', label: 'Assets Return' },
            { id: 'dependencies', label: 'Dependencies' },
            { id: 'missing', label: 'Missing' },
            { id: 'cost-calc', label: 'Cost Calculation' },
            { id: 'asset-settlement', label: 'Settlement' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setAssetTab(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                assetTab === t.id
                  ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {assetTab === 'possessed' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Currently Possessed Company Hardware & Tokens</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'MacBook Pro M3 Max 64GB', tag: 'ASSET-2026-IT-901', status: 'Pending Return' },
                { name: 'Dual Dell 27" 4K Monitors', tag: 'ASSET-2026-IT-902', status: 'Pending Return' },
                { name: 'YubiKey 5C NFC Token', tag: 'ASSET-2026-IT-903', status: 'Returned' },
                { name: 'Smart Keycard Badge', tag: 'ASSET-SEC-402', status: 'Returned' },
              ].map((a, i) => (
                <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 m-0">{a.name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{a.tag}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                    a.status === 'Returned' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>{a.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {assetTab === 'return' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Physical Asset Return Inspection Log</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">IT Hardware Inspection Report</span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">Passed Condition Check</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">All returned hardware thoroughly inspected with zero damage or missing cables.</p>
            </div>
          </div>
        )}

        {assetTab === 'dependencies' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Project Handovers & Access Revocation Checklist</h3>
            <div className="space-y-3">
              {[
                { task: 'GitHub Repository Admin Access Revocation', status: 'Completed' },
                { task: 'AWS Cloud Console IAM Account Deactivation', status: 'Completed' },
                { task: 'Project Architecture Knowledge Transfer Session', status: 'Signed Off' },
              ].map((d, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{d.task}</span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">{d.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {assetTab === 'missing' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Missing or Damaged Assets Audit</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">Missing Asset Items</span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">0 Missing Items</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">No missing or damaged company equipment logged.</p>
            </div>
          </div>
        )}

        {assetTab === 'cost-calc' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Asset Depreciation & Deduction Cost Calculation</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">Total Asset Liability Deduction</span>
                <span className="text-sm font-extrabold text-[#004848]">$0.00 USD</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">All hardware accounted for and returned in original condition.</p>
            </div>
          </div>
        )}

        {assetTab === 'asset-settlement' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">IT & Asset Clearance Sign-Off</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">Head of IT Infrastructure Clearance</h4>
                <p className="text-[11px] text-slate-500 font-semibold">Signed by Marcus Vance</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">Fully Cleared</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // View 6: Travel
  if (isTravel) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Repatriation & Travel</h1>
          <p className="text-xs text-teal-100/80 mt-1">Repatriation flight tickets and custom relocation luggage allowances.</p>
        </div>

        {/* 2 Page-level Green Pill Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 select-none">
          {[
            { id: 'tickets', label: 'Tickets' },
            { id: 'misc-custom', label: 'MISC (Custom Fields)' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTravelTab(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                travelTab === t.id
                  ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {travelTab === 'tickets' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Repatriation Flight Ticket Booking</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">Emirates Business Class Return Ticket</h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Destination: London Heathrow (LHR) • Oct 15, 2026</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">Issued</span>
            </div>
          </div>
        )}

        {travelTab === 'misc-custom' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Custom Excess Cargo & Relocation Allowance</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">Excess Baggage Relocation Stipend</span>
                <span className="text-sm font-extrabold text-[#004848]">$1,500 USD</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">Reimbursed directly via corporate travel portal.</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // View 7: Report:
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider mb-2">
          <BarChart3 className="h-3.5 w-3.5 text-teal-300" />
          <span>Off-Boarding AI Analytics</span>
        </div>
        <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Off-Boarding Reports & Analytics</h1>
        <p className="text-xs text-teal-100/80 mt-1">Attrition analysis, exit interview AI sentiment insights, and clearance duration velocity.</p>
      </div>

      {/* 2 Page-level Green Pill Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 select-none">
        {[
          { id: 'reports-ai', label: 'Reports + AI' },
          { id: 'analytics-ai', label: 'Analytics + AI' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setReportTab(t.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
              reportTab === t.id
                ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {reportTab === 'reports-ai' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">AI Exit Sentiment & Attrition Reports</h3>
          <div className="space-y-3">
            {[
              { title: 'Q3 Exit Interview AI Sentiment Audit.pdf', status: 'Generated by AI' },
              { title: 'Engineering Attrition & Key Risk Drivers Report.pdf', status: 'Ready for Review' },
            ].map((r, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <span className="text-xs font-bold text-slate-900">{r.title}</span>
                </div>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-extrabold">{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {reportTab === 'analytics-ai' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500">Average Clearance Duration</span>
            <div className="text-2xl font-extrabold text-slate-900">2.1 Days</div>
            <span className="text-[11px] text-emerald-600 font-semibold font-bold">100% Automated F&F Clearance</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500">Annualized Attrition Rate</span>
            <div className="text-2xl font-extrabold text-slate-900">4.2%</div>
            <span className="text-[11px] text-teal-600 font-semibold font-bold">Well Below Tech Standard</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500">Re-hire Eligibility Score</span>
            <div className="text-2xl font-extrabold text-slate-900">92%</div>
            <span className="text-[11px] text-emerald-600 font-semibold font-bold">High Employer Branding</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeOffBoardingPage;
