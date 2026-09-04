import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Brain, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Search,
  Upload,
  Plus
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import CompanyDocCenterPage from '../self-service/CompanyDocCenterPage';

export const LegalPage: React.FC = () => {
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = tabParam === 'documents' ? 'documents' : 'ai';

  const setActiveTab = (tab: 'ai' | 'documents') => {
    setSearchParams({ tab });
  };

  // AI Chat Simulation State
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am your Legal AI Assistant. I can analyze employee contracts, check compliance with local labor laws, generate standard legal agreements, and flag risk clauses.'
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
      let aiResponse = 'Our Legal AI has analyzed your request against current labor regulations and standard legal frameworks. All clauses comply with standard HR & employment guidelines.';
      if (userText.toLowerCase().includes('contract') || userText.toLowerCase().includes('agreement')) {
        aiResponse = 'Contract Audit Complete: Clause 4.2 (Non-Compete) matches regional enforceability standards. Clause 7.1 (Termination Notice) requires standard 30-day notice verification.';
      } else if (userText.toLowerCase().includes('privacy') || userText.toLowerCase().includes('gdpr')) {
        aiResponse = 'Data Protection Status: Compliant. Employee PII handling adheres to GDPR Article 6(1)(b) for contract execution.';
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Legal Management</h1>
        <p className="text-xs text-slate-500 mt-1">Manage AI-driven legal compliance, automated contract audits, and corporate legal documents.</p>
      </div>

      {/* Top 2 Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-bold text-slate-500">
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex items-center gap-2 pb-3 transition-all -mb-[1.5px] border-b-2 cursor-pointer ${
            activeTab === 'ai'
              ? 'border-[#004848] text-[#004848] font-extrabold'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <Sparkles className="h-4 w-4 text-teal-600" />
          <span>Legal AI</span>
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`flex items-center gap-2 pb-3 transition-all -mb-[1.5px] border-b-2 cursor-pointer ${
            activeTab === 'documents'
              ? 'border-[#004848] text-[#004848] font-extrabold'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <FileText className="h-4 w-4 text-slate-600" />
          <span>Documents</span>
        </button>
      </div>

      {/* Tab Content 1: Legal AI */}
      {activeTab === 'ai' && (
        <div className="space-y-6 animate-fade-in">
          {/* Top Quick Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-teal-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-teal-600 text-white rounded-xl shadow-xs">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 m-0">Compliance Score</h3>
                  <p className="text-xs font-bold text-teal-700 mt-0.5">98.4% Fully Compliant</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Zero active legal violations detected across active employment agreements and company policies.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xs">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 m-0">Automated Contract Audit</h3>
                  <p className="text-xs font-bold text-blue-700 mt-0.5">Real-Time Risk Detection</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Scans offer letters, NDAs, and agreements for illegal or non-standard provisions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-600 text-white rounded-xl shadow-xs">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 m-0">Policy Updates</h3>
                  <p className="text-xs font-bold text-amber-700 mt-0.5">2 Pending Regulatory Changes</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Upcoming labor code revisions in Q4 require minor update to remote work severance policy.
              </p>
            </div>
          </div>

          {/* AI Interactive Assistant Container */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-gradient-to-r from-[#002222] to-[#006666] text-white rounded-xl">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 m-0">Legal AI Assistant & Policy Auditor</h3>
                  <p className="text-xs text-slate-500">Ask legal questions, review employee contracts, or draft compliance clauses.</p>
                </div>
              </div>
              <button 
                onClick={() => toast.info("New Legal Session started")}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                + New Analysis
              </button>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                'Audit Executive Employment Agreement',
                'Check Remote Work Overtime Compliance',
                'Draft Mutual Non-Disclosure Agreement (NDA)',
                'Verify Maternity Leave Policy Standards'
              ].map(prompt => (
                <button
                  key={prompt}
                  onClick={() => {
                    setInputQuery(prompt);
                    toast.info(`Selected prompt: ${prompt}`);
                  }}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-full transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Box */}
            <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 min-h-[220px] max-h-[350px] overflow-y-auto space-y-3">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 text-xs leading-relaxed ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-[#004848] text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                      AI
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl max-w-xl font-medium ${
                      msg.sender === 'user'
                        ? 'bg-[#003333] text-white rounded-br-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendChat} className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Ask Legal AI to analyze contracts, compliance, or labor laws..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-900 bg-white outline-none focus:border-[#004848] transition-colors"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#002222] to-[#006666] text-white text-xs font-bold rounded-xl hover:opacity-95 transition-opacity cursor-pointer shadow-xs"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Ask AI</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab Content 2: Documents */}
      {activeTab === 'documents' && (
        <div className="animate-fade-in">
          <CompanyDocCenterPage />
        </div>
      )}
    </div>
  );
};

export default LegalPage;
