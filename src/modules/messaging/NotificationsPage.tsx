import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import Badge from '../../components/common/Badge';

interface HistoryItem {
  id: string;
  dateTime: string;
  message: string;
  recipients: string;
  status: 'Send' | 'Draft';
  read: string;
}

export const NotificationsPage: React.FC = () => {
  const toast = useToast();
  const location = useLocation();
  const path = location.pathname;

  // Determine sub-page configuration
  let pageTitle = 'E-Mail';
  let historyTitle = 'E- Mail History';
  let sendButtonText = 'Send Message';

  if (path.includes('/sms')) {
    pageTitle = 'Messages';
    historyTitle = 'Message History';
    sendButtonText = 'Send Message';
  } else if (path.includes('/whatsapp')) {
    pageTitle = "What's App Messages";
    historyTitle = 'Message History';
    sendButtonText = 'Send Message';
  } else if (path.includes('/employee-app')) {
    pageTitle = 'Employee App Messages';
    historyTitle = 'Message History';
    sendButtonText = 'Send Message';
  }

  // Recipient checkboxes state
  const [selectedDepts, setSelectedDepts] = useState<Record<string, boolean>>({});
  const [selectedEmps, setSelectedEmps] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // History logs states
  const [historyTab, setHistoryTab] = useState<'All' | 'Send' | 'Drafts'>('All');
  const [historySearch, setHistorySearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    { id: '1', dateTime: 'July 20, 2025 09:30 AM', message: 'Team meeting scheduled for...', recipients: 'All Employees', status: 'Send', read: '-' },
    { id: '2', dateTime: 'July 20, 2025 09:30 AM', message: 'Team meeting scheduled for...', recipients: 'Engineering Team (8)', status: 'Draft', read: '-' },
    { id: '3', dateTime: 'July 20, 2025 09:30 AM', message: 'Team meeting scheduled for...', recipients: 'Marketing Team (12)', status: 'Send', read: '8/12' },
    { id: '4', dateTime: 'July 20, 2025 09:30 AM', message: 'Team meeting scheduled for...', recipients: 'All Employees', status: 'Send', read: '-' },
  ]);

  // Count selected employees
  const selectedEmpCount = Object.values(selectedEmps).filter(Boolean).length;

  const handleDeptToggle = (dept: string) => {
    setSelectedDepts(prev => ({ ...prev, [dept]: !prev[dept] }));
  };

  const handleEmpToggle = (emp: string) => {
    setSelectedEmps(prev => ({ ...prev, [emp]: !prev[emp] }));
  };

  const handleSend = () => {
    if (!message.trim()) {
      toast.error("Please enter a message before sending.");
      return;
    }
    const newItem: HistoryItem = {
      id: String(Date.now()),
      dateTime: new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
      message: subject ? `${subject} - ${message.substring(0, 20)}...` : message.substring(0, 30),
      recipients: selectedEmpCount > 0 ? `${selectedEmpCount} Selected Employee(s)` : 'All Employees',
      status: 'Send',
      read: '-'
    };
    setHistoryItems([newItem, ...historyItems]);
    setSubject('');
    setMessage('');
    setSelectedEmps({});
    setSelectedDepts({});
    toast.success("Message sent successfully!");
  };

  const handleSaveDraft = () => {
    if (!message.trim() && !subject.trim()) {
      toast.error("Please enter a subject or message to save as draft.");
      return;
    }
    const newItem: HistoryItem = {
      id: String(Date.now()),
      dateTime: new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
      message: subject ? `${subject} - ${message.substring(0, 20)}...` : message.substring(0, 30),
      recipients: selectedEmpCount > 0 ? `${selectedEmpCount} Selected Employee(s)` : 'All Employees',
      status: 'Draft',
      read: '-'
    };
    setHistoryItems([newItem, ...historyItems]);
    setSubject('');
    setMessage('');
    setSelectedEmps({});
    setSelectedDepts({});
    toast.info("Draft saved successfully!");
  };

  // Filter history items
  const filteredHistory = historyItems.filter(item => {
    // Search filter
    if (historySearch && !item.message.toLowerCase().includes(historySearch.toLowerCase()) && !item.recipients.toLowerCase().includes(historySearch.toLowerCase())) {
      return false;
    }
    // Tab filter
    if (historyTab === 'Send' && item.status !== 'Send') return false;
    if (historyTab === 'Drafts' && item.status !== 'Draft') return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">{pageTitle}</h1>
      </div>

      {/* Main Composer Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left side: Recipients Checklist */}
        <div className="md:col-span-5 bg-white border-2 border-[#006666] rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-700">Recipients</h3>
          
          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search........"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-205 bg-slate-50/50 rounded-lg text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400 focus:bg-white focus:border-emerald-300"
            />
          </div>

          {/* Departments */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Departments</span>
            <div className="space-y-1.5 pl-1">
              {['All Departments', 'HR', 'IT', 'Finance', 'Marketing', 'Operations'].map((dept) => (
                <label key={dept} className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 hover:text-slate-900">
                  <input 
                    type="checkbox"
                    checked={!!selectedDepts[dept]}
                    onChange={() => handleDeptToggle(dept)}
                    className="rounded border-slate-300 text-[#006666] focus:ring-[#006666] h-3.5 w-3.5"
                  />
                  <span>{dept}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Employees */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Employees</span>
            <div className="space-y-1.5 pl-1 max-h-48 overflow-y-auto">
              {[
                { name: 'Karthika Balan', dept: 'IT' },
                { name: 'Sarah Jo', dept: 'Marketing' },
                { name: 'Michael', dept: 'Finance' },
                { name: 'David', dept: 'Operations' },
                { name: 'Sarah Joseph', dept: 'HR' },
              ].map((emp) => (
                <label key={emp.name} className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 hover:text-slate-900">
                  <input 
                    type="checkbox"
                    checked={!!selectedEmps[emp.name]}
                    onChange={() => handleEmpToggle(emp.name)}
                    className="rounded border-slate-300 text-[#006666] focus:ring-[#006666] h-3.5 w-3.5"
                  />
                  <span>{emp.name} <span className="text-slate-400">({emp.dept})</span></span>
                </label>
              ))}
            </div>
          </div>

          {/* Footer selected label */}
          <div className="pt-2 border-t border-slate-100 text-[11px] font-bold text-slate-500">
            Selected: {selectedEmpCount} employees
          </div>
        </div>

        {/* Right side: Message details block */}
        <div className="md:col-span-7 bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
          {/* Subject field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Subject</label>
            <input 
              type="text" 
              placeholder="Enter the message subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#006666]"
            />
          </div>

          {/* Massage field (Figma spelling) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Massage</label>
            <textarea 
              rows={6}
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-4 text-xs font-semibold text-slate-800 outline-none focus:border-[#006666] resize-none"
            />
            <div className="text-[10px] font-bold text-slate-400">
              {message.length}/1000 characters
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button 
              onClick={handleSaveDraft}
              className="px-6 py-2 border-2 border-[#006666] hover:border-[#004848] text-[#006666] hover:text-[#004848] text-xs font-bold rounded-lg cursor-pointer transition-colors bg-white"
            >
              Save Draft
            </button>
            <button 
              onClick={handleSend}
              className="px-6 py-2 bg-[#004848] hover:bg-[#003333] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-colors"
            >
              {sendButtonText}
            </button>
          </div>
        </div>

      </div>

      {/* History log panel */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        <h2 className="text-sm font-bold text-slate-900">{historyTitle}</h2>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {(['All', 'Send', 'Drafts'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setHistoryTab(tab)}
                className={`px-4 py-1.5 rounded text-xs font-bold border transition-colors ${
                  historyTab === tab 
                    ? 'bg-blue-50 text-[#0473b8] border-blue-200 font-extrabold shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-64">
            <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search........"
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-semibold text-slate-900 outline-none"
            />
          </div>
        </div>

        {/* Cards Table */}
        <div className="space-y-3">
          {/* Header row */}
          <div className="grid grid-cols-6 px-4 py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
            <span>Date/Time</span>
            <span className="col-span-2">Message</span>
            <span>Recipients</span>
            <span>Status</span>
            <span className="text-right">Read</span>
          </div>

          {/* Rows */}
          {filteredHistory.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-6 text-center text-xs text-slate-400 font-semibold">
              No matching records found.
            </div>
          ) : (
            <div className="space-y-2">
              {filteredHistory.map((item) => (
                <div 
                  key={item.id}
                  className="grid grid-cols-6 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm hover:border-slate-350 transition-all text-xs font-bold text-slate-805"
                >
                  <span className="text-slate-500 font-semibold">{item.dateTime}</span>
                  <span className="col-span-2 text-slate-800">{item.message}</span>
                  <span className="text-slate-500 font-semibold">{item.recipients}</span>
                  
                  <div>
                    <Badge variant={item.status === 'Send' ? 'success' : 'neutral'} size="sm">
                      {item.status}
                    </Badge>
                  </div>

                  <span className="text-right text-slate-500 font-semibold">{item.read}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 pt-2">
          <button className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-500">
            <ChevronLeft className="h-4 w-4" />
          </button>
          {[1, 2, 3].map(page => (
            <button 
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 text-xs font-bold border rounded-md transition-colors ${
                currentPage === page 
                  ? 'bg-blue-50 text-[#0473b8] border-blue-200 font-extrabold shadow-sm'
                  : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-500">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
export default NotificationsPage;
