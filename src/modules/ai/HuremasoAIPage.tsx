import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Brain, 
  MessageSquare, 
  ShieldCheck, 
  UserCheck, 
  Award, 
  Heart, 
  Zap, 
  Search, 
  Bot, 
  CheckCircle2, 
  ChevronRight, 
  Send,
  EyeOff,
  Globe
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const HuremasoAIPage: React.FC = () => {
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveTabFromPath = (pathname: string) => {
    if (pathname.includes('/ai/autonomous-performance')) return 'performance';
    if (pathname.includes('/ai/employee-experience')) return 'ex';
    if (pathname.includes('/ai/automated-compliance')) return 'compliance';
    return 'predictive';
  };

  const [activeTab, setActiveTab] = useState<'predictive' | 'performance' | 'ex' | 'compliance'>(
    () => getActiveTabFromPath(location.pathname)
  );

  useEffect(() => {
    setActiveTab(getActiveTabFromPath(location.pathname));
  }, [location.pathname]);

  // Chat simulation state for Conversational HR
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello Sarah! I am your HUREMASO+AI Assistant. How can I assist you with company policies, leave entitlements, or performance analytics today?'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputQuery('');

    setTimeout(() => {
      let botResponse = "Based on company policy & localized entities, employees are entitled to standard leave and comprehensive health benefits as outlined in our 2026 handbook.";
      if (userText.toLowerCase().includes('maternity') || userText.toLowerCase().includes('leave')) {
        botResponse = "According to our Indian entity guidelines (Maternity Benefit Act 1961/2017), female employees are entitled to 26 weeks of fully paid maternity leave for up to two surviving children.";
      } else if (userText.toLowerCase().includes('burnout') || userText.toLowerCase().includes('wellness')) {
        botResponse = "Our Smart Wellness tracker evaluates anonymized metadata. No individual data is disclosed, but leadership receives department-level workload balancing alerts.";
      }
      setChatMessages(prev => [...prev, { sender: 'ai', text: botResponse }]);
    }, 600);
  };

  const tabs = [
    { id: 'predictive', label: '1. Predictive Workforce Analytics', path: '/ai/predictive-analytics' },
    { id: 'performance', label: '2. Autonomous Performance & Skill', path: '/ai/autonomous-performance' },
    { id: 'ex', label: '3. Next-Gen Employee Experience (EX)', path: '/ai/employee-experience' },
    { id: 'compliance', label: '4. Automated Compliance & Operations', path: '/ai/automated-compliance' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#002222] via-[#004848] to-[#007878] rounded-2xl p-6 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-teal-300 animate-pulse" />
              <span>HUREMASO+AI Engine Active</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white m-0">
              Autonomous HR Intelligence & Workforce Analytics
            </h1>
            <p className="text-xs md:text-sm text-teal-100/80 max-w-2xl leading-relaxed">
              Powered by deep learning retention models, generative sentiment analysis, and continuous global compliance guardrails.
            </p>
          </div>
          <button 
            onClick={() => toast.success("AI Knowledge Base synchronized with global entities.")}
            className="self-start md:self-center flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold backdrop-blur-md transition-all text-white cursor-pointer shrink-0"
          >
            <Zap className="h-4 w-4 text-amber-300" />
            <span>Sync AI Knowledge Base</span>
          </button>
        </div>
      </div>

      {/* Top Sub-pages Navigation Pills */}
      <div className="flex flex-wrap gap-2.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                navigate(tab.path);
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer select-none ${
                isActive
                  ? 'bg-[#004848] text-white font-extrabold shadow-md border border-[#006666]'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: PREDICTIVE WORKFORCE ANALYTICS & FLIGHT RISK DETECTION */}
      {activeTab === 'predictive' && (
        <div className="space-y-6 animate-fade-in">
          {/* Top Feature Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Card 1: Retention Risk */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-100 text-rose-600">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-700">Flight Risk Alert</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Retention Risk Modeling</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Monitors activity signals (e.g., missed deadlines, drop in collaboration tool engagement, vacation patterns) to alert managers before high performers resign.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Active Signals Flagged:</span>
                <span className="font-extrabold text-rose-600">3 Employees at Risk</span>
              </div>
            </div>

            {/* Card 2: Succession Planning */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600">
                  <UserCheck className="h-5 w-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-700">AI Match 94%</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Succession Planning Engines</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Identifies high-potential internal candidates for promotion and maps custom career trajectories to fill future executive vacancies.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Succession Pipeline:</span>
                <span className="font-extrabold text-emerald-600">12 High-Potentials</span>
              </div>
            </div>

            {/* Card 3: Dynamic Labor Forecasting */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-100 text-teal-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-teal-100 text-teal-700">Forecast Q3/Q4</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Dynamic Labor Forecasting</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Analyzes historical sales, seasonality, and industry trends to predict future staffing requirements and optimize shift scheduling.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Optimum Capacity:</span>
                <span className="font-extrabold text-[#006666]">+18 Staff Recommended</span>
              </div>
            </div>
          </div>

          {/* Deep Dive Section: Flight Risk Dashboard Demos */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-rose-500" />
              <span>High-Performer Retention Risk Breakdown</span>
            </h3>

            <div className="space-y-3">
              {[
                { name: 'Alex Morgan', role: 'Lead Architect (Engineering)', riskScore: '87% High', factors: 'Drop in Slack activity (-42%), 4 consecutive weekend overtime spikes', recommendation: 'Schedule 1-on-1 career review & review workload distribution.' },
                { name: 'Rachel Green', role: 'Senior Product Manager', riskScore: '64% Moderate', factors: 'Unusual vacation pattern cluster, delayed sprint sign-offs', recommendation: 'Offer flexible project rotation & check goal alignment.' },
                { name: 'David Lee', role: 'DevOps Manager', riskScore: '22% Low', factors: 'Stable engagement score, active mentor badges', recommendation: 'Nominate for Tech Lead Succession Track.' }
              ].map((emp) => (
                <div key={emp.name} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50/50 items-center text-xs">
                  <div className="md:col-span-3">
                    <span className="font-bold text-slate-900 text-sm block">{emp.name}</span>
                    <span className="text-slate-500 text-[11px] font-semibold">{emp.role}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-block ${
                      emp.riskScore.includes('High') 
                        ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                        : emp.riskScore.includes('Moderate')
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}>
                      {emp.riskScore}
                    </span>
                  </div>
                  <div className="md:col-span-4 text-slate-600 font-semibold leading-relaxed">
                    <span className="text-slate-400 block font-bold text-[10px] uppercase">Signals Detected:</span>
                    {emp.factors}
                  </div>
                  <div className="md:col-span-3 text-right">
                    <button 
                      onClick={() => toast.info(`AI Intervention triggered for ${emp.name}`)}
                      className="px-3.5 py-2 bg-[#004848] hover:bg-[#003333] text-white font-bold text-[11px] rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      Trigger AI Action
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AUTONOMOUS PERFORMANCE & SKILL MANAGEMENT */}
      {activeTab === 'performance' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Sentiment */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 w-fit">
                <Brain className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Continuous Feedback Sentiment Analysis</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Evaluates daily peer reviews, project notes, and Slack/Teams sentiment to give managers real-time insights on team dynamics.
              </p>
            </div>

            {/* AI OKRs */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="p-2.5 rounded-lg bg-purple-50 border border-purple-100 text-purple-600 w-fit">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">AI-Generated OKRs & Reviews</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automatically synthesizes a year’s worth of an employee's data into balanced, constructive performance summaries and custom growth metrics.
              </p>
            </div>

            {/* L&D */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100 text-amber-600 w-fit">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Hyper-Personalized Learning & Development</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Builds dynamic corporate training paths based on individual performance gaps and upcoming company technological transitions.
              </p>
            </div>
          </div>

          {/* AI Review Generator Showcase */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Award className="h-4 w-4 text-purple-600" />
                <span>AI Automated Annual Review Synthesizer</span>
              </h3>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
                Auto-Generated for 2026 Cycle
              </span>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800 text-sm">Target Employee: Sarah Joseph (Engineering Lead)</span>
                <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full text-[10px]">Exceeds Expectations (4.8/5.0)</span>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium bg-white p-3 rounded-lg border border-slate-200">
                <strong>AI Executive Summary:</strong> Sarah demonstrated exceptional delivery in Q1-Q3, successfully leading 4 major microservices migrations with 99.98% uptime. Sentiment feedback across 34 peer inputs highlights strong empathy and mentoring skills. Recommended OKR focus for next quarter: Cloud Architecture Optimization.
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => toast.success("AI Generated OKR export completed.")}
                  className="px-4 py-2 bg-[#004848] hover:bg-[#003333] text-white font-bold rounded-lg text-xs cursor-pointer"
                >
                  Export AI OKRs & Path
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NEXT-GEN EMPLOYEE EXPERIENCE (EX) & CONVERSATIONAL HR */}
      {activeTab === 'ex' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-100 text-teal-600 w-fit">
                <Bot className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">24/7 Generative HR Virtual Assistants</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Answers complex, localized policy queries instantly (e.g., "How many maternity weeks do I get based on our current Indian entity guidelines?") by parsing internal wikis.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 w-fit">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Smart Wellness & Burnout Tracking</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Analyzes metadata patterns to detect systemic burnout across specific departments and flags anonymized recommendations to leadership.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 w-fit">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Instant Automated Onboarding</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Uses conversational workflows to guide new hires through localized documentation, compliance, and IT asset provisioning automatically.
              </p>
            </div>
          </div>

          {/* Interactive Chat Assistant Demo */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[420px]">
            <div className="px-5 py-3.5 bg-gradient-to-r from-[#002222] to-[#004848] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Bot className="h-4.5 w-4.5 text-teal-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white m-0">24/7 Generative HR Virtual Assistant</h4>
                  <span className="text-[10px] text-teal-200/80 font-medium">Localized Entity Policy Engine Active</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                Online
              </span>
            </div>

            {/* Messages area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60 text-xs">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xl p-3 rounded-2xl leading-relaxed font-medium ${
                    msg.sender === 'user' 
                      ? 'bg-[#004848] text-white rounded-br-none shadow-xs' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="p-3 border-t border-slate-200 bg-white flex gap-2">
              <input
                type="text"
                placeholder="Ask policy questions e.g. 'How many maternity weeks do I get in India?'..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-[#006666]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#004848] hover:bg-[#003333] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Ask</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: AUTOMATED COMPLIANCE & BORDERLESS OPERATIONS */}
      {activeTab === 'compliance' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Multi-Jurisdiction */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600">
                  <Globe className="h-5 w-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                  Global Registers Connected
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Multi-Jurisdiction Compliance Guardrails</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Continually scans global legal registers to update payroll compliance rules, tax computations, and local leave mandates automatically.
              </p>
              
              <div className="space-y-2 pt-2 border-t border-slate-100">
                {[
                  { country: 'India Entity', rule: 'Maternity Benefit & Statutory Gratuity Rules 2026', status: 'Compliant & Auto-Updated' },
                  { country: 'Canada Regional HQ', rule: 'Ontario Employment Standards Act (ESA)', status: 'Compliant & Auto-Updated' },
                  { country: 'UK Subsidiary', rule: 'HMRC Statutory Sick Pay & Pension Auto-Enrolment', status: 'Compliant & Auto-Updated' }
                ].map((c) => (
                  <div key={c.country} className="flex justify-between items-center text-xs p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div>
                      <span className="font-bold text-slate-800 block">{c.country}</span>
                      <span className="text-[11px] text-slate-500 font-semibold">{c.rule}</span>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bias Mitigation */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600">
                  <EyeOff className="h-5 w-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-indigo-100 text-indigo-800">
                  Equal Pay Parity 99.4%
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Anonymized Bias Mitigation Tools</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Redacts demographic indicators during recruitment pipelines and analyzes compensation maps to ensure equal pay practices.
              </p>

              <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs space-y-2">
                <span className="font-bold text-indigo-900 block">AI Resume Anonymizer Status:</span>
                <p className="text-indigo-800 font-medium leading-relaxed">
                  All incoming candidates for technical roles automatically have names, age, gender, and photo indicators redacted before HR shortlisting.
                </p>
                <div className="flex items-center gap-2 text-indigo-700 font-bold pt-1">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Equal Compensation Audit: No systemic wage gaps detected.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default HuremasoAIPage;
