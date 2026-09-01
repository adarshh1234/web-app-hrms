import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  UserCheck, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  Laptop, 
  User, 
  GraduationCap, 
  Globe, 
  Heart, 
  Layers, 
  BarChart3, 
  Send, 
  CheckCircle2, 
  Clock, 
  Bot,
  Plus,
  Download,
  BrainCircuit,
  Lock,
  FileCheck,
  ShieldAlert,
  Car,
  Home,
  Briefcase,
  Box,
  Monitor,
  Users,
  BookOpen,
  Calendar,
  Award,
  DollarSign,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const EmployeeOnboardingPage: React.FC = () => {
  const toast = useToast();
  const location = useLocation();
  const path = location.pathname;

  // Active sub-page tab state for multi-tab views
  const [bgTab, setBgTab] = useState('legal');
  const [assessmentTab, setAssessmentTab] = useState('psychometric');
  const [psychometricSubTab, setPsychometricSubTab] = useState<'genius' | 'reports'>('genius');
  const [docTab, setDocTab] = useState('contract');
  const [provisionTab, setProvisionTab] = useState('assignments');
  const [buddyTab, setBuddyTab] = useState('department');
  const [trainingTab, setTrainingTab] = useState('materials');
  const [visaTab, setVisaTab] = useState('status');
  const [insuranceTab, setInsuranceTab] = useState('details');
  const [miscTab, setMiscTab] = useState('association');
  const [reportPageTab, setReportPageTab] = useState('reports-ai');

  // Smart Offer Builder state
  const [candidateName, setCandidateName] = useState('Aisha Kumar');
  const [roleTitle, setRoleTitle] = useState('Senior Frontend Engineer');
  const [baseSalary, setBaseSalary] = useState('$165,000');
  const [equity, setEquity] = useState('0.15%');
  const [isGeneratingOffer, setIsGeneratingOffer] = useState(false);

  // Contract & NDA AI drafting state
  const [isDraftingDoc, setIsDraftingDoc] = useState(false);

  const handleGenerateOffer = () => {
    setIsGeneratingOffer(true);
    setTimeout(() => {
      setIsGeneratingOffer(false);
      toast.success(`Smart Offer Letter generated for ${candidateName}!`);
    }, 800);
  };

  const handleDraftDoc = (docType: string) => {
    setIsDraftingDoc(true);
    setTimeout(() => {
      setIsDraftingDoc(false);
      toast.success(`${docType} drafted with AI successfully!`);
    }, 800);
  };

  const isFinalList = path.includes('/final-list');
  const isBgVerification = path.includes('/background-verification');
  const isAssessments = path.includes('/assessments');
  const isOffers = path.includes('/offers');
  const isDocuments = path.includes('/documents');
  const isProvisions = path.includes('/provisions');
  const isBuddyManager = path.includes('/buddy-manager');
  const isTraining = path.includes('/training');
  const isVisaImmigration = path.includes('/visa-immigration');
  const isInsurance = path.includes('/insurance');
  const isMiscellaneous = path.includes('/miscellaneous');
  const isReports = path.includes('/reports');

  // View 1: Final List
  if (isFinalList) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider mb-2">
            <UserCheck className="h-3.5 w-3.5 text-teal-300" />
            <span>Onboarding Pipeline</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Final Onboarding Candidate List</h1>
          <p className="text-xs text-teal-100/80 mt-1">Cleared candidates ready for background verification, contract signing, and provision setup.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
          {[
            { name: 'Aisha Kumar', role: 'Senior Frontend Engineer', dept: 'Engineering', start: 'Sept 15, 2026', status: 'Offer Accepted' },
            { name: 'Marcus Vance', role: 'Product Manager', dept: 'Product', start: 'Sept 20, 2026', status: 'Verification Pending' },
            { name: 'Elena Rostova', role: 'DevOps Specialist', dept: 'Infrastructure', start: 'Oct 01, 2026', status: 'Contract Signed' },
          ].map((c, i) => (
            <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">{c.name}</h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{c.role} • {c.dept} • Start: {c.start}</p>
              </div>
              <span className="px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-xs font-extrabold">{c.status}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // View 2: Background Verification
  if (isBgVerification) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Background Verification</h1>
          <p className="text-xs text-teal-100/80 mt-1">Legal checks, police clearance, biometrics, credentials & digital footprint audits.</p>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 select-none">
          {[
            { id: 'legal', label: 'Legal Check' },
            { id: 'pcc', label: 'PCC' },
            { id: 'immigration', label: 'Immigration' },
            { id: 'biometrics', label: 'Identity + Biometrics' },
            { id: 'credentials', label: 'Documents + Credentials' },
            { id: 'digital', label: 'Digital Footprint' },
            { id: 'post-hire', label: 'Post-hire Check' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setBgTab(t.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                bgTab === t.id ? 'bg-[#004848] text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900 m-0">Aisha Kumar - {bgTab.toUpperCase()} Verification</h4>
              <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Status: Clear • Verified by First Advantage API</p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">Verified</span>
          </div>
        </div>
      </div>
    );
  }

  // View 3: Assessments
  if (isAssessments) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Candidate Assessments</h1>
          <p className="text-xs text-teal-100/80 mt-1">Psychometric Genius tests, language proficiency, technical evaluations, and AT assessments.</p>
        </div>

        {/* Main Assessment Tabs */}
        <div className="space-y-3 border-b border-slate-200 pb-3 select-none">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'psychometric', label: 'Psychometric Tests' },
              { id: 'language', label: 'Language + Communication Assessment' },
              { id: 'performance', label: 'Performance Assessment' },
              { id: 'technical', label: 'Technical Assessment' },
              { id: 'at', label: 'AT Assessment' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setAssessmentTab(t.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  assessmentTab === t.id
                    ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Nested Sub-tabs for Psychometric Tests */}
          {assessmentTab === 'psychometric' && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mr-1">Psychometric Views:</span>
              {[
                { id: 'genius', label: 'Genius Test' },
                { id: 'reports', label: 'Reports' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setPsychometricSubTab(sub.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                    psychometricSubTab === sub.id
                      ? 'bg-slate-900 text-white border-transparent shadow-xs'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Display */}
        {assessmentTab === 'psychometric' && psychometricSubTab === 'genius' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 m-0">Genius Psychometric Test Suite</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Adaptive cognitive aptitude, situational judgment, and problem-solving speed assessment.</p>
              </div>
              <button 
                onClick={() => toast.success("Genius test session launched for candidate!")}
                className="px-4 py-2 bg-[#004848] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#006666]"
              >
                Launch Genius Test
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                <span className="text-xs font-bold text-slate-500">Genius Score Benchmark</span>
                <div className="text-2xl font-extrabold text-[#004848]">94 / 100</div>
                <span className="text-[11px] text-emerald-600 font-semibold">Top 3rd Percentile</span>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                <span className="text-xs font-bold text-slate-500">Cognitive Speed Index</span>
                <div className="text-2xl font-extrabold text-slate-900">1.45x Fast</div>
                <span className="text-[11px] text-teal-600 font-semibold">Rapid Decision Making</span>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                <span className="text-xs font-bold text-slate-500">Test Completion Time</span>
                <div className="text-2xl font-extrabold text-slate-900">22 mins</div>
                <span className="text-[11px] font-semibold text-slate-500">45 mins allocated</span>
              </div>
            </div>
          </div>
        )}

        {assessmentTab === 'psychometric' && psychometricSubTab === 'reports' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 m-0">Psychometric Assessment Evaluation Report</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Comprehensive behavioral personality matrix, stress resilience rating, and team compatibility.</p>
              </div>
              <button 
                onClick={() => toast.success("Downloading Psychometric Assessment PDF Report...")}
                className="px-4 py-2 bg-[#004848] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#006666] flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Report PDF</span>
              </button>
            </div>

            <div className="space-y-3">
              {[
                { trait: 'Analytical Problem Solving', score: '96%', desc: 'Exceptional capacity for breaking down complex architectural challenges.' },
                { trait: 'Emotional Stability & Stress Tolerance', score: '91%', desc: 'High composure under tight project delivery deadlines.' },
                { trait: 'Team Collaboration & Empathy', score: '94%', desc: 'Strong active listening skills and collaborative mindset.' }
              ].map((row, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 m-0">{row.trait}</h4>
                    <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{row.desc}</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">{row.score}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {assessmentTab !== 'psychometric' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0">{assessmentTab.toUpperCase()} Assessment Report</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">Overall Candidate Score</span>
                <span className="text-sm font-extrabold text-[#004848]">92 / 100</span>
              </div>
              <p className="text-xs text-slate-600 font-semibold">Passed all automated evaluation criteria with high distinction.</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // View 4: Offers
  if (isOffers) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Offers & Draft Offer Letter with AI</h1>
          <p className="text-xs text-teal-100/80 mt-1">Generate AI-benchmarked offer letters, salary packages, and equity packages.</p>
        </div>

        {/* Draft Offer Letter with AI Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-purple-700 font-bold text-xs">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span>Draft Offer Letter with AI</span>
          </div>

          <div className="space-y-3.5 text-xs font-semibold text-slate-700">
            <div>
              <label className="block mb-1 font-bold text-slate-800">Candidate</label>
              <input 
                type="text" 
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-[#004848]"
              />
            </div>

            <div>
              <label className="block mb-1 font-bold text-slate-800">Role</label>
              <input 
                type="text" 
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-[#004848]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-bold text-slate-800">Base Salary</label>
                <input 
                  type="text" 
                  value={baseSalary}
                  onChange={(e) => setBaseSalary(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-[#004848]"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-slate-800">Equity</label>
                <input 
                  type="text" 
                  value={equity}
                  onChange={(e) => setEquity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-[#004848]"
                />
              </div>
            </div>

            <div className="p-2.5 bg-blue-50/80 border border-blue-100 rounded-lg text-[11px] text-slate-600 font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0"></span>
              <span>Benchmarked against market: <strong>85th percentile</strong> • internally equitable</span>
            </div>

            <button
              onClick={handleGenerateOffer}
              disabled={isGeneratingOffer}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-sm hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{isGeneratingOffer ? 'Generating Offer Letter...' : 'Generate Offer Letter'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // View 5: Documents
  if (isDocuments) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Onboarding Documents</h1>
          <p className="text-xs text-teal-100/80 mt-1">Employment contracts, NDAs, benefit details, legal compliance, and visa paperwork.</p>
        </div>

        {/* 5 Page-level Green Pill Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 select-none">
          {[
            { id: 'contract', label: 'Draft Employment Contract with AI' },
            { id: 'nda', label: 'Draft NDAs with AI' },
            { id: 'benefit', label: 'Benefit details' },
            { id: 'legal', label: 'Legal Documents' },
            { id: 'visa', label: 'Visa et emigration documents' },
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

        {/* Tab 1: Draft Employment Contract with AI */}
        {docTab === 'contract' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-3xl">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3">
              <div className="flex items-center gap-2 text-purple-700 font-bold text-xs">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-extrabold text-slate-900">AI Employment Contract Drafting Studio</span>
              </div>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-[11px] font-extrabold">AI Generator</span>
            </div>

            <div className="space-y-3.5 text-xs font-semibold text-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-bold text-slate-800">Target Candidate</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none">
                    <option>Aisha Kumar (Sr. Frontend Engineer)</option>
                    <option>Marcus Vance (Product Manager)</option>
                    <option>Elena Rostova (DevOps Specialist)</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-800">Contract Standard Jurisdiction</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none">
                    <option>US Standard Employment (At-Will)</option>
                    <option>UK Employment Agreement 2026</option>
                    <option>EU GDPR-Compliant Contract</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-slate-900 font-bold">
                  <span>Generated Terms Summary</span>
                  <span className="text-xs text-teal-700 font-extrabold">Auto-Benchmarked</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">Includes 3-month probation clause, IP transfer agreement, non-compete 12 months, full remote work provisions.</p>
              </div>

              <button
                onClick={() => handleDraftDoc('Employment Contract')}
                disabled={isDraftingDoc}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-sm hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>{isDraftingDoc ? 'Drafting Contract with AI...' : 'Draft Contract with AI'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Draft NDAs with AI */}
        {docTab === 'nda' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-3xl">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3">
              <div className="flex items-center gap-2 text-purple-700 font-bold text-xs">
                <Lock className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-extrabold text-slate-900">AI Non-Disclosure Agreement (NDA) Generator</span>
              </div>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-[11px] font-extrabold">Legal AI</span>
            </div>

            <div className="space-y-3.5 text-xs font-semibold text-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-bold text-slate-800">NDA Agreement Type</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none">
                    <option>Mutual Non-Disclosure Agreement</option>
                    <option>Unilateral Employee NDA</option>
                    <option>Contractor IP Protection NDA</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-800">Confidentiality Duration</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none">
                    <option>3 Years Post-Termination</option>
                    <option>5 Years Post-Termination</option>
                    <option>Perpetual Confidentiality</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => handleDraftDoc('NDA Agreement')}
                disabled={isDraftingDoc}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-sm hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Lock className="h-4 w-4" />
                <span>{isDraftingDoc ? 'Drafting NDA with AI...' : 'Draft NDAs with AI'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Benefit Details */}
        {docTab === 'benefit' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Benefit Details & Compensation Matrix</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Executive Health & Medical Cover', detail: 'Fully paid premium for employee + dependents', type: 'Health' },
                { title: '401(k) Retirement Match', detail: '100% match up to 6% of base salary', type: 'Financial' },
                { title: 'Annual Learning & Wellness Stipend', detail: '$2,500 annual allowance for courses & gym', type: 'Wellness' },
                { title: 'Flexible Paid Time Off (PTO)', detail: '25 Days annual leave + statutory public holidays', type: 'Leave' },
              ].map((b, i) => (
                <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 m-0">{b.title}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold">{b.detail}</p>
                  <span className="inline-block px-2 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-[10px] font-extrabold">{b.type}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Legal Documents */}
        {docTab === 'legal' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Legal & Compliance Documents Repository</h3>
            <div className="space-y-3">
              {[
                { name: 'Corporate Code of Conduct & Ethics 2026.pdf', status: 'Mandatory Sign-off' },
                { name: 'Anti-Harassment & Equal Opportunity Policy.pdf', status: 'Signed' },
                { name: 'Data Protection & GDPR Compliance Undertaking.pdf', status: 'Signed' },
              ].map((l, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileCheck className="h-4 w-4 text-[#004848]" />
                    <span className="text-xs font-bold text-slate-900">{l.name}</span>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">{l.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Visa et emigration documents */}
        {docTab === 'visa' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Visa et Emigration Documents Vault</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { doc: 'International Passport Bio Page Scan', status: 'Verified' },
                { doc: 'Form I-797 Approval Notice (H-1B)', status: 'Verified' },
                { doc: 'Emigration & Immigration Clearance Certificate', status: 'Approved' },
                { doc: 'Relocation & Travel Voucher Receipt', status: 'Processed' },
              ].map((v, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-[#004848]" />
                    <span className="text-xs font-bold text-slate-900">{v.doc}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-xs font-extrabold">{v.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // View 6: Provisions
  if (isProvisions) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">IT & Asset Provisions</h1>
          <p className="text-xs text-teal-100/80 mt-1">Hardware assignment, laptops, office furniture, stationary, and company car/home allowances.</p>
        </div>

        {/* 7 Page-level Green Pill Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 select-none">
          {[
            { id: 'assignments', label: 'Assets Assignments:' },
            { id: 'it-assets', label: 'IT Assets:' },
            { id: 'furniture', label: 'office + office furniture' },
            { id: 'stationary', label: 'Stationary' },
            { id: 'car', label: 'Car' },
            { id: 'home', label: 'Home' },
            { id: 'misc-assets', label: 'Miscellaneous Assets' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setProvisionTab(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                provisionTab === t.id
                  ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Assets Assignments */}
        {provisionTab === 'assignments' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Complete Assets Assignments Roster</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { item: 'MacBook Pro M3 Max 64GB', recipient: 'Aisha Kumar', category: 'IT Asset', status: 'Shipped' },
                { item: 'Herman Miller Ergonomic Chair', recipient: 'Aisha Kumar', category: 'Furniture', status: 'Delivered' },
                { item: 'Executive Leather Notebook & Pen Set', recipient: 'Aisha Kumar', category: 'Stationary', status: 'Issued' },
                { item: 'Tesla Model Y Company Lease Pass', recipient: 'Aisha Kumar', category: 'Vehicle Allowance', status: 'Approved' },
              ].map((p, i) => (
                <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 m-0">{p.item}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold">Assigned to: {p.recipient} • {p.category}</p>
                  <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-extrabold">{p.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: IT Assets */}
        {provisionTab === 'it-assets' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">IT Hardware & Technical Assets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Apple MacBook Pro M3 Max (36GB RAM / 1TB SSD)', tag: 'ASSET-2026-IT-901', status: 'Assigned' },
                { name: 'Dual Dell UltraSharp 27" 4K USB-C Hub Monitors', tag: 'ASSET-2026-IT-902', status: 'Dispatched' },
                { name: 'YubiKey 5C NFC Security Key Bundle', tag: 'ASSET-2026-IT-903', status: 'Configured' },
                { name: 'Sony WH-1000XM5 Active Noise Cancelling Headset', tag: 'ASSET-2026-IT-904', status: 'Assigned' },
              ].map((it, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Laptop className="h-4 w-4 text-[#004848]" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 m-0">{it.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{it.tag}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">{it.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: office + office furniture */}
        {provisionTab === 'furniture' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Office Layout & Furniture Provisions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { item: 'Electric Height-Adjustable Standing Desk (Oak)', status: 'Installed' },
                { item: 'Herman Miller Aeron Ergonomic Office Chair', status: 'Delivered' },
                { item: 'Dual Monitor Heavy-Duty Spring Arm', status: 'Installed' },
                { item: 'LED Desk Task Light with Wireless Phone Charger', status: 'Delivered' },
              ].map((f, i) => (
                <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900">{f.item}</span>
                  <span className="px-2.5 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-xs font-extrabold">{f.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Stationary */}
        {provisionTab === 'stationary' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Stationary & Office Supplies Package</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">Welcome Stationary Box</span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">Ready at Desk</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">Contains: Company hardcover journal, engraved pen set, sticky notes pack, highlighters, and desk organizer.</p>
            </div>
          </div>
        )}

        {/* Tab 5: Car */}
        {provisionTab === 'car' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Company Vehicle & Transportation Provisions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                <h4 className="text-xs font-bold text-slate-900 m-0">Corporate EV Lease Program</h4>
                <p className="text-[11px] text-slate-500 font-semibold">$800/month EV lease subsidy + ChargePoint card</p>
                <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-extrabold">Active Subsidy</span>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                <h4 className="text-xs font-bold text-slate-900 m-0">HQ Executive Parking Bay</h4>
                <p className="text-[11px] text-slate-500 font-semibold">Reserved Slot #B2-45 with EV Charger</p>
                <span className="inline-block px-2 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-[10px] font-extrabold">Assigned</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Home */}
        {provisionTab === 'home' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Home Office Setup & Fiber Internet Allowance</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">Home Fiber Internet Reimbursement</span>
                <span className="text-sm font-extrabold text-[#004848]">$120 / month</span>
              </div>
              <p className="text-xs text-slate-600 font-medium font-semibold">Automatic monthly disbursement on 1st of every month via payroll.</p>
            </div>
          </div>
        )}

        {/* Tab 7: Miscellaneous Assets */}
        {provisionTab === 'misc-assets' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Miscellaneous Access & Security Tokens</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'RFID Smart Building Badge Keycard', status: 'Active' },
                { name: 'Corporate Amex Credit Card ($10k limit)', status: 'Dispatched' },
                { name: 'Priority Pass Airport Lounge Card', status: 'Issued' },
              ].map((m, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{m.name}</span>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">{m.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // View 7: Buddy/Direct Manager
  if (isBuddyManager) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Buddy & Direct Manager Mapping</h1>
          <p className="text-xs text-teal-100/80 mt-1">Assign onboarding buddies, reporting managers, and department leads.</p>
        </div>

        {/* 4 Page-level Green Pill Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 select-none">
          {[
            { id: 'department', label: 'Department' },
            { id: 'reporting', label: 'Reporting to' },
            { id: 'team', label: 'Team & Team Head' },
            { id: 'in-charge', label: 'In charge of department' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setBuddyTab(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                buddyTab === t.id
                  ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {buddyTab === 'department' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Department Organization Details</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">Assigned Department</span>
                <span className="text-sm font-extrabold text-[#004848]">Core Engineering & Platform</span>
              </div>
              <p className="text-xs text-slate-600 font-semibold">Engineering Division • Platform Infrastructure & Frontend Architecture</p>
            </div>
          </div>
        )}

        {buddyTab === 'reporting' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Direct Reporting Manager Hierarchy</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">David Miller</h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Engineering Lead • david.m@huremaso.com</p>
              </div>
              <span className="px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-xs font-extrabold">Direct Manager</span>
            </div>
          </div>
        )}

        {buddyTab === 'team' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Team & Team Head Details</h3>
            <div className="space-y-3">
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 m-0">Team Head: Dr. Aris Thorne</h4>
                  <p className="text-[11px] text-slate-500 font-semibold">VP of Global Engineering</p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">Team Head</span>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 m-0">Onboarding Buddy: Rachel Green</h4>
                  <p className="text-[11px] text-slate-500 font-semibold">Senior Fullstack Engineer</p>
                </div>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-extrabold">Assigned Buddy</span>
              </div>
            </div>
          </div>
        )}

        {buddyTab === 'in-charge' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">In Charge of Department</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">Executive Department Head</span>
                <span className="text-xs font-extrabold text-[#004848]">Dr. Aris Thorne</span>
              </div>
              <p className="text-xs text-slate-600 font-semibold">Full administrative and budget approval authority for Core Engineering.</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // View 8: Training
  if (isTraining) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Onboarding Training Modules</h1>
          <p className="text-xs text-teal-100/80 mt-1">Learning materials assigned, scheduled training sessions, courses, and trainer assignments.</p>
        </div>

        {/* 5 Page-level Green Pill Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 select-none">
          {[
            { id: 'materials', label: 'Learning Materials Assigned' },
            { id: 'sessions', label: 'Training Sessions' },
            { id: 'courses', label: 'Courses:' },
            { id: 'misc', label: 'Misc' },
            { id: 'trainer', label: 'Trainer' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTrainingTab(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                trainingTab === t.id
                  ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {trainingTab === 'materials' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Assigned Learning Materials</h3>
            {[
              { title: 'Frontend Architecture Standards 2026.pdf', format: 'PDF Document' },
              { title: 'Security & Data Privacy Handbook.pdf', format: 'PDF Document' },
            ].map((m, i) => (
              <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-[#004848]" />
                  <span className="text-xs font-bold text-slate-900">{m.title}</span>
                </div>
                <button 
                  onClick={() => toast.success(`Opened ${m.title}`)}
                  className="px-3 py-1.5 bg-[#004848] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#006666]"
                >
                  View Material
                </button>
              </div>
            ))}
          </div>
        )}

        {trainingTab === 'sessions' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Scheduled Live Training Sessions</h3>
            {[
              { title: 'Company Culture & Security Compliance 2026', trainer: 'HR Team', duration: '2 Hours' },
              { title: 'Architecture Walkthrough & Repo Setup', trainer: 'David Miller', duration: '4 Hours' },
            ].map((t, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 m-0">{t.title}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Trainer: {t.trainer} • Duration: {t.duration}</p>
                </div>
                <button 
                  onClick={() => toast.success("Training session started!")}
                  className="px-3 py-1.5 bg-[#004848] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#006666]"
                >
                  Start Training
                </button>
              </div>
            ))}
          </div>
        )}

        {trainingTab === 'courses' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Enrolled Interactive Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Advanced React 19 & Next.js Architecture', provider: 'Udemy Enterprise', status: 'In Progress (45%)' },
                { name: 'AWS Certified Solutions Architect 2026', provider: 'A Cloud Guru', status: 'Enrolled' },
              ].map((c, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 m-0">{c.name}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold">{c.provider}</p>
                  <span className="inline-block px-2 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-[10px] font-extrabold">{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {trainingTab === 'misc' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Miscellaneous Learning Allowances</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">O'Reilly Learning Subscription</span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold font-bold">Activated</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">Unlimited corporate access to digital books, videos, and live tech sessions.</p>
            </div>
          </div>
        )}

        {trainingTab === 'trainer' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Assigned Internal Trainers Roster</h3>
            <div className="space-y-3">
              {[
                { name: 'David Miller', role: 'Engineering Lead', topic: 'Technical & Architecture' },
                { name: 'Sarah Connor', role: 'Product Lead', topic: 'Product Domain & Workflows' },
              ].map((tr, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 m-0">{tr.name} ({tr.role})</h4>
                    <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Focus Area: {tr.topic}</p>
                  </div>
                  <span className="px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-xs font-extrabold font-bold">Trainer</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // View 9: Visa & Immigration
  if (isVisaImmigration) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Visa & Immigration Management</h1>
          <p className="text-xs text-teal-100/80 mt-1">Visa sponsorship status, work permit processing, documents vault, and cost tracking.</p>
        </div>

        {/* 5 Page-level Green Pill Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 select-none">
          {[
            { id: 'status', label: 'Visa Status' },
            { id: 'details', label: 'Visa Details' },
            { id: 'expiry', label: 'Visa Expiry' },
            { id: 'documents', label: 'Documents' },
            { id: 'cost', label: 'Cost' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setVisaTab(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                visaTab === t.id
                  ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {visaTab === 'status' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500">Sponsorship Status</span>
              <div className="text-2xl font-extrabold text-[#004848]">Approved & Stamped</div>
              <span className="text-[11px] text-emerald-600 font-semibold font-bold">Form I-797 Cleared</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500">Work Authorization</span>
              <div className="text-2xl font-extrabold text-slate-900">H-1B Specialty</div>
              <span className="text-[11px] text-teal-600 font-semibold font-bold">Full Time Authorized</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500">Processing Status</span>
              <div className="text-2xl font-extrabold text-slate-900">Completed</div>
              <span className="text-[11px] text-emerald-600 font-semibold font-bold">100% Verified</span>
            </div>
          </div>
        )}

        {visaTab === 'details' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Immigration & Petition Particulars</h3>
            <div className="space-y-3 text-xs font-semibold text-slate-700">
              <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                <span>USCIS Receipt Number:</span>
                <strong className="text-slate-900 font-mono">EAC-2026-90412</strong>
              </div>
              <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                <span>Employer Sponsor:</span>
                <strong className="text-slate-900">Huremaso Global Inc</strong>
              </div>
              <div className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                <span>LCA Wage Level:</span>
                <strong className="text-slate-900">$165,000 / year (Level 4 High)</strong>
              </div>
            </div>
          </div>
        )}

        {visaTab === 'expiry' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Visa Expiry & Renewal Timeline</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">Validity Expiration Date</span>
                <span className="text-sm font-extrabold text-[#004848]">October 30, 2029</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">Auto-Renewal Reminder scheduled 90 days before expiration.</p>
            </div>
          </div>
        )}

        {visaTab === 'documents' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Visa & Immigration Documents Vault</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Passport Bio Page Copy.pdf', status: 'Verified' },
                { name: 'USCIS Form I-797 Approval Notice.pdf', status: 'Verified' },
                { name: 'Certified Labor Condition Application (LCA).pdf', status: 'Approved' },
                { name: 'Form I-94 Arrival/Departure Record.pdf', status: 'Active' },
              ].map((doc, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-[#004848]" />
                    <span className="text-xs font-bold text-slate-900">{doc.name}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-xs font-extrabold">{doc.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {visaTab === 'cost' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Immigration & Sponsorship Cost Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { fee: 'USCIS Premium Processing Fee', amount: '$2,805 USD', status: 'Paid by Company' },
                { fee: 'USCIS Base Petition & Fraud Fee', amount: '$1,500 USD', status: 'Paid by Company' },
                { fee: 'Immigration Attorney Legal Counsel Fee', amount: '$3,500 USD', status: 'Paid by Company' },
                { fee: 'Total Sponsored Immigration Investment', amount: '$7,805 USD', status: '100% Sponsored' },
              ].map((c, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 m-0">{c.fee}</h4>
                  <div className="text-xl font-extrabold text-[#004848]">{c.amount}</div>
                  <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-extrabold">{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // View 10: Insurance (with 6 green pill tabs!)
  if (isInsurance) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Onboarding Insurance Enrollment</h1>
          <p className="text-xs text-teal-100/80 mt-1">Medical, accident cover, family health, and group insurance policies.</p>
        </div>

        {/* 6 Page-level Green Pill Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 select-none">
          {[
            { id: 'details', label: 'Insurance Details' },
            { id: 'medical', label: 'Medical Insurance' },
            { id: 'employee', label: 'Employee Insurance' },
            { id: 'accident', label: 'Accident Cover' },
            { id: 'family', label: 'Family Insurance' },
            { id: 'group', label: 'Group Insurance' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setInsuranceTab(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                insuranceTab === t.id
                  ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {insuranceTab === 'details' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">General Insurance Policy Overview</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900">Corporate Master Policy Number</span>
                <span className="text-xs font-mono font-bold text-[#004848]">HUR-2026-INS-990</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">Underwritten by Blue Cross & MetLife. Active 100% cashless hospital network access.</p>
            </div>
          </div>
        )}

        {insuranceTab === 'medical' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Comprehensive Medical Insurance</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">Blue Cross Shield Health Plan</h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Sum Insured: $50,000 USD • Cashless Network: 12,000+ Hospitals</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">Active</span>
            </div>
          </div>
        )}

        {insuranceTab === 'employee' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Individual Term Life Insurance</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">Employee Term Life Benefit</h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Coverage: 3x Base Salary ($495,000 USD)</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">Active</span>
            </div>
          </div>
        )}

        {insuranceTab === 'accident' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Personal Accident & Disability Cover</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">MetLife Group Disability Insurance</h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Short Term & Long Term Disability Protection ($100,000 Cover)</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold font-bold">Enrolled</span>
            </div>
          </div>
        )}

        {insuranceTab === 'family' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Spouse & Dependent Family Health Extension</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">Aetna Family Health Plan</h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Covering Spouse + 2 Children (Fully Company Paid)</p>
              </div>
              <span className="px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-xs font-extrabold font-bold">Covered</span>
            </div>
          </div>
        )}

        {insuranceTab === 'group' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Group Corporate Floater Policy</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">Corporate Group Floater Policy</h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Tier 1 Executive Pool Coverage</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold font-bold">Tier 1</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // View 11: Other Miscellaneous (with 3 green pill tabs!)
  if (isMiscellaneous) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Other Miscellaneous Onboarding Setup</h1>
          <p className="text-xs text-teal-100/80 mt-1">Association memberships, team Slack channels, and group invitations.</p>
        </div>

        {/* 3 Page-level Green Pill Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 select-none">
          {[
            { id: 'association', label: 'Association' },
            { id: 'teams', label: 'Teams' },
            { id: 'group', label: 'Group' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setMiscTab(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                miscTab === t.id
                  ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {miscTab === 'association' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Professional Association Memberships</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">IEEE Computer Society & ACM Professional</h4>
                <p className="text-[11px] text-slate-500 font-semibold">Corporate Sponsored Membership</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">Active</span>
            </div>
          </div>
        )}

        {miscTab === 'teams' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Team Workspaces & Channels</h3>
            <div className="space-y-3">
              {[
                { channel: '#eng-frontend-core (Slack)', status: 'Joined' },
                { channel: '#huremaso-all-hands (Slack)', status: 'Joined' },
                { channel: 'Engineering Standup Workspace (MS Teams)', status: 'Joined' },
              ].map((team, i) => (
                <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900">{team.channel}</span>
                  <span className="px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-xs font-extrabold">{team.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {miscTab === 'group' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Cross-Functional Interest & Guild Groups</h3>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">AI & Machine Learning Innovation Guild</h4>
                <p className="text-[11px] text-slate-500 font-semibold">Weekly tech exchange & hackathon group</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">Member</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // View 12: Reports (with 2 green pill tabs!)
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider mb-2">
          <BarChart3 className="h-3.5 w-3.5 text-teal-300" />
          <span>Onboarding AI Analytics</span>
        </div>
        <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Onboarding Reports & Analytics - AI</h1>
        <p className="text-xs text-teal-100/80 mt-1">Average time-to-onboard analytics, completion velocity, and AI bottleneck predictions.</p>
      </div>

      {/* 2 Page-level Green Pill Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 select-none">
        {[
          { id: 'reports-ai', label: 'Reports - AI' },
          { id: 'analytics-ai', label: 'Analytics - AI' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setReportPageTab(t.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
              reportPageTab === t.id
                ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {reportPageTab === 'reports-ai' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">AI-Generated Onboarding Status Reports</h3>
            <div className="space-y-3">
              {[
                { title: 'Weekly Onboarding Pipeline Velocity Summary.pdf', status: 'Ready for Review' },
                { title: 'Background Check Friction & Bottleneck Audit.pdf', status: 'Generated by AI' },
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
        </div>
      )}

      {reportPageTab === 'analytics-ai' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500">Average Onboarding Velocity</span>
            <div className="text-2xl font-extrabold text-slate-900">4.2 Days</div>
            <span className="text-[11px] text-emerald-600 font-semibold font-bold">50% Faster than Industry Avg</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500">Candidate Satisfaction Score</span>
            <div className="text-2xl font-extrabold text-slate-900">4.9 / 5.0</div>
            <span className="text-[11px] text-teal-600 font-semibold font-bold">98% Positive Feedback</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500">AI Checklist Completion</span>
            <div className="text-2xl font-extrabold text-slate-900">100%</div>
            <span className="text-[11px] text-emerald-600 font-semibold font-bold">All 12 Sub-sections Complete</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeOnboardingPage;
