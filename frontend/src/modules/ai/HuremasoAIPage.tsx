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
  Globe,
  HelpCircle,
  Copy,
  Paperclip,
  Mic,
  FileText,
  Clock
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
    if (pathname.includes('/huremaso-ai')) return 'ask';
    return 'ask';
  };

  const [activeTab, setActiveTab] = useState<'ask' | 'predictive' | 'performance' | 'ex' | 'compliance'>(
    () => getActiveTabFromPath(location.pathname)
  );

  useEffect(() => {
    setActiveTab(getActiveTabFromPath(location.pathname));
  }, [location.pathname]);

  // Chat simulation state for Conversational HR AI Assistant
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello Sarah! I am your HUREMASO AI Assistant. You can ask me anything about company policies, payroll status, leave balances, performance reviews, or request AI-generated HR drafts!',
      time: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    { label: '💡 Draft a Leave Approval email', prompt: 'Draft a professional leave approval email template for managers.' },
    { label: '📊 Analyze Q3 Sales department turnover', prompt: 'What is the projected Q3 turnover rate for the Sales department?' },
    { label: '💰 Check Bonus eligibility rules', prompt: 'Explain the company performance bonus eligibility criteria for senior leads.' },
    { label: '📜 Maternity & Paternity Policy details', prompt: 'Summarize our current maternity and paternity paid leave policy.' },
    { label: '🚀 Engineer Onboarding Checklist', prompt: 'Generate a 5-step onboarding checklist for a new Senior Software Engineer.' }
  ];

  const handleSendChat = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userText = query;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText, time: 'Just now' }]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "Based on company policy & localized entity records, employees are entitled to standard benefits, transparent performance reviews, and flexible leave allocations.";
      const lower = userText.toLowerCase();

      if (lower.includes('leave') || lower.includes('maternity') || lower.includes('approval')) {
        botResponse = "Here is your requested template:\n\n'Dear Team,\nYour leave request from July 10 to July 15 has been approved. Please ensure all pending tasks are handed over to your replacement lead.\n\nBest regards,\nHR Team'";
      } else if (lower.includes('turnover') || lower.includes('sales') || lower.includes('q3')) {
        botResponse = "Q3 Sales Department turnover is currently projected at 2.1% (well below the 5% industry benchmark). Retention score remains high at 94.2%.";
      } else if (lower.includes('bonus') || lower.includes('eligibility')) {
        botResponse = "Performance Bonus Eligibility:\n- Minimum 6 months of active service\n- Performance rating >= 4.0 out of 5.0\n- Approved KPI goal completion by end of Q4.";
      } else if (lower.includes('onboarding') || lower.includes('engineer') || lower.includes('checklist')) {
        botResponse = "5-Step Engineer Onboarding Checklist:\n1. IT Access & Hardware Setup\n2. GitHub & CI/CD Pipeline Grants\n3. Architecture Walkthrough with Tech Lead\n4. First Good-First-Issue Task Assignment\n5. 30-Day Check-in Sync";
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: botResponse, time: 'Just now' }]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Response copied to clipboard!");
  };

  const tabs = [
    { id: 'ask', label: '🤖 Floating AI Assistant', path: '/huremaso-ai' },
    { id: 'predictive', label: '1. Predictive Workforce Analytics', path: '/ai/predictive-analytics' },
    { id: 'performance', label: '2. Autonomous Performance & Skill', path: '/ai/autonomous-performance' },
    { id: 'ex', label: '3. Employee Experience (EX)', path: '/ai/employee-experience' },
    { id: 'compliance', label: '4. Automated Compliance', path: '/ai/automated-compliance' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#002222] via-[#004848] to-[#007878] rounded-2xl p-6 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-teal-300 animate-pulse" />
              <span>HUREMASO AI Floating Assistant</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white m-0">
              AI – Floating for Anything to Ask
            </h1>
            <p className="text-xs md:text-sm text-teal-100/80 max-w-2xl leading-relaxed">
              Ask anything about company policies, leave entitlements, payroll status, performance insights, or generate instant HR emails and checklists.
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

      {/* Top Navigation Pills */}
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

      {/* Mode 1: AI – Floating for anything to ask */}
      {activeTab === 'ask' && (
        <div className="space-y-6 animate-fade-in">
          {/* Quick Prompt Floating Chips */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-[#004848]" />
              <span>Suggested Floating Questions & Actions:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendChat(qp.prompt)}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:border-[#004848] hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-full transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
                >
                  <span>{qp.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chat Window */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[520px]">
            {/* Window Header */}
            <div className="bg-gradient-to-r from-slate-900 via-[#002222] to-[#004848] px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-teal-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold m-0 text-white">HUREMASO AI Assistant</h3>
                  <div className="flex items-center gap-2 text-[10px] text-teal-200/80">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Online & Ready to Answer</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setChatMessages([{ sender: 'ai', text: 'Chat history cleared. How can I help you next?', time: 'Just now' }])}
                className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                Clear History
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                    msg.sender === 'user' 
                      ? 'bg-[#004848] text-white' 
                      : 'bg-teal-100 text-[#004848] border border-teal-200'
                  }`}>
                    {msg.sender === 'user' ? 'SJ' : <Bot className="h-4 w-4 text-[#004848]" />}
                  </div>

                  <div className={`max-w-xl rounded-2xl p-4 text-xs font-medium leading-relaxed space-y-2 shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#004848] text-white rounded-tr-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-line m-0">{msg.text}</p>
                    {msg.sender === 'ai' && (
                      <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 border-t border-slate-100">
                        <span>{msg.time}</span>
                        <button
                          onClick={() => handleCopyText(msg.text)}
                          className="flex items-center gap-1 text-slate-500 hover:text-[#004848] transition-colors cursor-pointer"
                        >
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-400 italic bg-white p-3 rounded-2xl border border-slate-200 w-48">
                  <Bot className="h-4 w-4 text-teal-600 animate-spin" />
                  <span>HUREMASO AI is typing...</span>
                </div>
              )}
            </div>

            {/* Prompt Input Footer */}
            <form onSubmit={(e) => { e.preventDefault(); handleSendChat(); }} className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
              <button 
                type="button" 
                onClick={() => toast.info("Attach file or policy document")}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask HUREMASO AI anything (e.g. 'Draft leave email', 'Policy rules')..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:bg-white focus:border-[#004848] font-semibold"
              />
              <button 
                type="button" 
                onClick={() => toast.info("Listening for voice input...")}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Mic className="h-4 w-4" />
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#004848] hover:bg-[#003333] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Send</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

          {/* AI Capabilities Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {[
              { title: '⚡ Instant Policy Search', desc: 'Queries global handbook entities, statutory leave rules, and entity-specific clauses in seconds.', icon: Search },
              { title: '📝 Smart Document Drafts', desc: 'Generates professional leave approvals, promotion letters, and warning notices instantly.', icon: FileText },
              { title: '🛡️ Automated Compliance Guardrails', desc: 'Real-time validation against Indian Labour Laws, Maternity Benefit Act, and POSH guidelines.', icon: ShieldCheck }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 hover:shadow-md transition-all">
                  <div className="h-8 w-8 rounded-xl bg-teal-50 text-[#004848] flex items-center justify-center">
                    <Icon className="h-4 w-4 text-[#004848]" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 m-0">{card.title}</h4>
                  <p className="text-[11px] font-semibold text-slate-500 leading-relaxed m-0">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Existing AI sub-pages */}
      {activeTab === 'predictive' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">Predicted Turnover (Q3)</span>
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">2.1%</div>
              <p className="text-[11px] font-semibold text-emerald-600">↓ 1.4% lower than industry average</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">Flight Risk Employees</span>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">4 High Risk</div>
              <p className="text-[11px] font-semibold text-amber-600">Action recommendations generated</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">Overall Workforce Health</span>
                <Heart className="h-4 w-4 text-rose-500" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">92 / 100</div>
              <p className="text-[11px] font-semibold text-teal-600">Optimal engagement index</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 animate-fade-in shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Autonomous Performance & Skill Gap Matrix</h3>
          <p className="text-xs text-slate-500">AI automatically maps skill competencies against upcoming project requirements.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-800">React & Next.js Skill Density</span>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-[#004848] h-2 rounded-full w-[88%]"></div>
              </div>
              <span className="text-[10px] text-slate-500 font-bold">88% Team Readiness</span>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-800">Cloud AI & LLM Engineering</span>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full w-[65%]"></div>
              </div>
              <span className="text-[10px] text-slate-500 font-bold">65% Team Readiness (Upskilling Recommended)</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ex' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 animate-fade-in shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Next-Gen Employee Experience (EX) & Sentiment Pulse</h3>
          <p className="text-xs text-slate-500">Real-time anonymized sentiment radar and workload balance monitoring.</p>
          <div className="p-4 border border-teal-100 bg-teal-50/50 rounded-xl text-xs font-semibold text-teal-900">
            Current Sentiment Score: <span className="font-extrabold text-[#004848]">Positive (8.6/10)</span> — High satisfaction recorded in flexible work hours and leave policy transparency.
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 animate-fade-in shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Automated Compliance & Audit Readiness</h3>
          <p className="text-xs text-slate-500">Continuous background compliance scanning for PF, ESI, Maternity Act, and labor law updates.</p>
          <div className="flex items-center gap-3 p-4 border border-emerald-200 bg-emerald-50/60 rounded-xl text-xs font-bold text-emerald-900">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>100% Audit Ready — 0 compliance discrepancies found across active employee files.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HuremasoAIPage;
