import React, { useState } from 'react';
import { FileText, Sparkles, Zap, Plus, Search, Calendar, CheckCircle2, Download, Send, Bot } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import Modal from '../../components/common/Modal';

export const HrLettersMemosPage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'memo' | 'notice' | 'circulars' | 'letters'>('memo');
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedDraft, setGeneratedDraft] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAi = (type: string) => {
    if (!aiPrompt.trim()) {
      toast.error('Please describe what you want to draft!');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedDraft(`[AI DRAFTED ${type.toUpperCase()}]\n\nSubject: ${aiPrompt}\n\nDear Team,\n\nThis is an official ${type} issued by HR Management regarding "${aiPrompt}". Please review the details below and comply with all updated procedures.\n\nBest Regards,\nHR Operations Team`);
      toast.success(`AI ${type} drafted successfully!`);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider">
            <FileText className="h-3.5 w-3.5 text-teal-300" />
            <span>Official Communications</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">HR Letters & Memos</h1>
          <p className="text-xs text-teal-100/80 m-0">Corporate memos, official notices, circulars, and AI-powered HR letter generation.</p>
        </div>
      </div>

      {/* Top Page UI Tabs */}
      <div className="flex flex-wrap gap-2.5 items-center border-b border-slate-200 pb-3 select-none">
        {[
          { id: 'memo', label: 'Memo List' },
          { id: 'notice', label: 'Notice List' },
          { id: 'circulars', label: 'Circulars List' },
          { id: 'letters', label: 'HR Letters / Notes List' },
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

      {/* Tab 1: Memo List */}
      {activeTab === 'memo' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 m-0">Corporate Memos</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Manage and issue official internal memorandum notices.</p>
            </div>
            <button 
              onClick={() => { setShowAiModal(true); setGeneratedDraft(''); setAiPrompt(''); }}
              className="px-4 py-2.5 bg-[#004848] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#006666] transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-teal-300" />
              <span>Memo Draft with AI</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            {[
              { id: 'MEMO-104', title: 'Q3 Hybrid Work & Office Policy Update', date: 'August 25, 2026', author: 'HR Director', status: 'Published' },
              { id: 'MEMO-103', title: 'Security Pass & Visitor Access Protocol', date: 'August 10, 2026', author: 'IT Operations', status: 'Published' },
              { id: 'MEMO-102', title: 'Annual Tax Exemption Submission Deadline', date: 'July 15, 2026', author: 'Payroll Dept', status: 'Archived' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 m-0">{item.id}: {item.title}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Issued: {item.date} • Issued by: {item.author}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">{item.status}</span>
                  <button 
                    onClick={() => toast.success("Downloading Memo PDF...")}
                    className="p-1.5 text-slate-500 hover:text-[#004848] cursor-pointer"
                    title="Download Memo"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Notice List */}
      {activeTab === 'notice' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 m-0">Official HR Notices</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Broadcast urgent notices and compliance announcements via API.</p>
            </div>
            <button 
              onClick={() => { setShowAiModal(true); setGeneratedDraft(''); setAiPrompt(''); }}
              className="px-4 py-2.5 bg-[#004848] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#006666] transition-all cursor-pointer flex items-center gap-2"
            >
              <Zap className="h-4 w-4 text-amber-300" />
              <span>Notice Drafting with API</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            {[
              { id: 'NTC-801', title: 'Labor Day Public Holiday Announcement', date: 'August 28, 2026', scope: 'All Staff', status: 'Active' },
              { id: 'NTC-799', title: 'Scheduled Server Maintenance & Email Downtime', date: 'August 18, 2026', scope: 'All Staff', status: 'Completed' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 m-0">{item.id}: {item.title}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Date: {item.date} • Scope: {item.scope}</p>
                </div>
                <span className="px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-xs font-extrabold">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Circulars List */}
      {activeTab === 'circulars' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 m-0">Department Circulars</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Publish circulars to designated business units.</p>
            </div>
            <button 
              onClick={() => { setShowAiModal(true); setGeneratedDraft(''); setAiPrompt(''); }}
              className="px-4 py-2.5 bg-[#004848] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#006666] transition-all cursor-pointer flex items-center gap-2"
            >
              <Zap className="h-4 w-4 text-amber-300" />
              <span>Circulars Draft with API</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            {[
              { id: 'CIR-502', title: 'Q4 Engineering Code Sprint & Hackathon', dept: 'Engineering', date: 'August 22, 2026' },
              { id: 'CIR-498', title: 'Sales Incentive Structure 2026 Revision', dept: 'Sales & Business', date: 'July 30, 2026' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 m-0">{item.id}: {item.title}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Department: {item.dept} • Date: {item.date}</p>
                </div>
                <button 
                  onClick={() => toast.success("Circular dispatched to department members!")}
                  className="px-3 py-1.5 bg-[#004848] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#006666]"
                >
                  Broadcast Circular
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: HR Letters / Notes List */}
      {activeTab === 'letters' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 m-0">HR Letters & Official Notes</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Generate employment verification, salary certificates, and recommendation notes.</p>
            </div>
            <button 
              onClick={() => { setShowAiModal(true); setGeneratedDraft(''); setAiPrompt(''); }}
              className="px-4 py-2.5 bg-[#004848] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#006666] transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-teal-300" />
              <span>Draft with AI</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            {[
              { id: 'LTR-1201', type: 'Experience & Conduct Certificate', recipient: 'Sarah Johnson', date: 'August 26, 2026' },
              { id: 'LTR-1194', type: 'Bank Salary Certificate Note', recipient: 'Michael Chen', date: 'August 14, 2026' },
              { id: 'LTR-1188', type: 'Relocation Support Letter', recipient: 'David Miller', date: 'July 28, 2026' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 m-0">{item.id}: {item.type}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Recipient: {item.recipient} • Date: {item.date}</p>
                </div>
                <button 
                  onClick={() => toast.success("Downloading official signed letter PDF...")}
                  className="px-3 py-1.5 bg-[#004848] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#006666] flex items-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Letter</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI / API Drafting Modal */}
      <Modal isOpen={showAiModal} onClose={() => setShowAiModal(false)} title={`Draft ${activeTab.toUpperCase()} with AI / API`}>
        <div className="space-y-4 text-xs font-semibold text-slate-700">
          <div>
            <label className="block mb-1.5 font-bold text-slate-900">Describe the topic or prompt for the draft:</label>
            <textarea
              rows={3}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. Write an official memo regarding mandatory security awareness training..."
              className="w-full border border-slate-200 rounded-xl p-3 text-xs font-semibold outline-none focus:border-[#004848] resize-none"
            />
          </div>

          <button
            onClick={() => handleGenerateAi(activeTab)}
            disabled={isGenerating}
            className="w-full py-2.5 bg-[#004848] text-white text-xs font-bold rounded-xl hover:bg-[#006666] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isGenerating ? (
              <span>Drafting with AI Model...</span>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-teal-300" />
                <span>Generate Draft</span>
              </>
            )}
          </button>

          {generatedDraft && (
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <label className="block font-bold text-slate-900">Generated Draft Preview:</label>
              <textarea
                rows={6}
                value={generatedDraft}
                onChange={(e) => setGeneratedDraft(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold outline-none focus:border-[#004848] resize-none"
              />
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  onClick={() => setShowAiModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    toast.success("Draft saved and dispatched!");
                    setShowAiModal(false);
                  }}
                  className="px-5 py-2 bg-[#004848] text-white font-bold rounded-xl hover:bg-[#006666] cursor-pointer"
                >
                  Save & Publish
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default HrLettersMemosPage;
