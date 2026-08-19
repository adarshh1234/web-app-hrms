import React, { useState, useEffect } from 'react';
import { 
  getMessageLogs, 
  saveMessageLogs,
  MessageLog 
} from '../../data/mockData';
import { 
  Send, 
  Search, 
  MessageSquare, 
  Mail, 
  Smartphone,
  Sparkles,
  Save
} from 'lucide-react';

export const MessagingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'sms' | 'email' | 'config'>('whatsapp');
  
  // Database States
  const [logs, setLogs] = useState<MessageLog[]>([]);

  // Composer States
  const [subject, setSubject] = useState('');
  const [messageText, setMessageText] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  // Lists for recipients
  const departments = ['All', 'HR', 'IT', 'Finance', 'Marketing', 'Operations'];
  const employeesList = [
    { name: 'Karthika Balan (IT)', dept: 'IT' },
    { name: 'Sarah Jo (Marketing)', dept: 'Marketing' },
    { name: 'Michael (Finance)', dept: 'Finance' },
    { name: 'David (Operations)', dept: 'Operations' },
    { name: 'Sarah Joseph (HR)', dept: 'HR' }
  ];

  useEffect(() => {
    setLogs(getMessageLogs());
  }, []);

  const handleToggleEmployee = (name: string) => {
    if (selectedEmployees.includes(name)) {
      setSelectedEmployees(selectedEmployees.filter(n => n !== name));
    } else {
      setSelectedEmployees([...selectedEmployees, name]);
    }
  };

  const handleSendMessage = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    let recipientsStr = '';
    if (selectedEmployees.length > 0) {
      recipientsStr = selectedEmployees.join(', ');
    } else if (selectedDept !== 'All') {
      recipientsStr = `${selectedDept} Department`;
    } else {
      recipientsStr = 'All Employees';
    }

    const newLog: MessageLog = {
      id: `MSG00${logs.length + 1}`,
      channel: activeTab === 'whatsapp' ? 'WhatsApp' : activeTab === 'sms' ? 'SMS' : 'Email',
      subject: subject || 'No Subject',
      recipients: recipientsStr,
      message: messageText,
      dateSent: new Date().toLocaleString(),
      status: isDraft ? 'Draft' : 'Sent',
      replies: 0
    };

    const updated = [newLog, ...logs];
    setLogs(updated);
    saveMessageLogs(updated);

    alert(isDraft ? "Message saved as draft!" : "Message dispatched successfully!");
    setSubject('');
    setMessageText('');
    setSelectedEmployees([]);
    setSelectedDept('All');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 m-0">Messaging Broadcasts</h1>
          <p className="text-sm text-slate-500 mt-1">Send mass broadcast notifications to your team via WhatsApp, SMS, or Email.</p>
        </div>

        {/* Tab Links */}
        <div className="flex flex-wrap border-b border-slate-200">
          {(['whatsapp', 'sms', 'email', 'config'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 uppercase tracking-wider transition-all -mb-[2px] ${
                activeTab === tab 
                  ? 'border-[var(--primary-color)] text-[var(--primary-color)] font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {tab === 'whatsapp' ? "WhatsApp" : tab === 'sms' ? 'SMS' : tab === 'email' ? 'Email' : 'Configuration'}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab !== 'config' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Composer Form (Left) */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5 capitalize">
              {activeTab === 'whatsapp' ? <MessageSquare className="h-5 w-5 text-emerald-500" /> : activeTab === 'sms' ? <Smartphone className="h-5 w-5 text-sky-500" /> : <Mail className="h-5 w-5 text-blue-500" />}
              <span>Send {activeTab} Broadcast</span>
            </h3>

            <form onSubmit={(e) => handleSendMessage(e, false)} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Subject</label>
                <input 
                  type="text"
                  placeholder="Enter the message subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                />
              </div>

              {/* Recipients Filter list */}
              <div className="grid grid-cols-2 gap-4 border border-slate-100 p-3 rounded-lg bg-slate-50/50">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Filter by Department</label>
                  <select
                    value={selectedDept}
                    onChange={(e) => {
                      setSelectedDept(e.target.value);
                      setSelectedEmployees([]);
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800 outline-none"
                  >
                    {departments.map(d => (
                      <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Selected Employees ({selectedEmployees.length})</label>
                  <div className="max-h-24 overflow-y-auto border border-slate-200 bg-white rounded p-1.5 space-y-1">
                    {employeesList.filter(e => selectedDept === 'All' || e.dept === selectedDept).map(e => (
                      <label key={e.name} className="flex items-center gap-1.5 text-[10px] text-slate-700 font-semibold cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={selectedEmployees.includes(e.name)}
                          onChange={() => handleToggleEmployee(e.name)}
                          className="rounded border-slate-350 text-[var(--primary-color)] h-3 w-3 shrink-0"
                        />
                        <span>{e.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Message Text (Massage)</label>
                <textarea
                  rows={4}
                  maxLength={1000}
                  placeholder="Type your message here..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                  <span>Selected: {selectedEmployees.length > 0 ? selectedEmployees.length : 'All'} employees</span>
                  <span>{messageText.length}/1000 characters</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={(e) => handleSendMessage(e, true)}
                  className="flex items-center gap-1 px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Draft</span>
                </button>
                <button 
                  type="submit"
                  className="flex items-center gap-1 px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold rounded-lg shadow-sm"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Broadcast</span>
                </button>
              </div>
            </form>
          </div>

          {/* Message History logs table (Right) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Message History</h3>
            
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {logs.filter(l => l.channel === (activeTab === 'whatsapp' ? 'WhatsApp' : activeTab === 'sms' ? 'SMS' : 'Email')).map((log, idx) => (
                <div key={idx} className="p-3 border border-slate-100 rounded-lg text-xs space-y-1.5">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-800">{log.subject}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      log.status === 'Sent' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-200'
                    }`}>{log.status}</span>
                  </div>
                  <p className="text-[10px] text-slate-600 line-clamp-2">{log.message}</p>
                  <div className="text-[9px] text-slate-400 flex justify-between border-t border-slate-50 pt-1.5">
                    <span>To: {log.recipients}</span>
                    <span>{log.dateSent}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'config' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm max-w-md space-y-4 animate-fade-in">
          <h3 className="text-base font-bold text-slate-900">Email SMTP Setup</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Mail Server / SMTP Host</label>
              <input type="text" value="smtp.huremaso.company.com" className="w-full bg-slate-50 rounded-lg border border-slate-200 px-3 py-2 text-slate-600 text-sm outline-none" readOnly />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">SMTP Port</label>
              <input type="text" value="587" className="w-full bg-slate-50 rounded-lg border border-slate-200 px-3 py-2 text-slate-600 text-sm outline-none" readOnly />
            </div>
            <button onClick={() => alert("Credentials saved!")} className="w-full py-2 bg-[var(--primary-color)] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[var(--primary-hover)]">
              Save Config
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default MessagingPage;
