import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Trash2, Edit2 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface MsgHistoryRow {
  id: string;
  dateTime: string;
  message: string;
  recipients: string;
  status: 'Send' | 'Draft';
  read: string;
}

export const MassMessagesPage: React.FC = () => {
  const toast = useToast();
  const [searchRecipient, setSearchRecipient] = useState('');
  const [selectedDepts, setSelectedDepts] = useState<string[]>([]);
  const [selectedEmps, setSelectedEmps] = useState<string[]>([]);

  // Composer fields
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [activeTab, setActiveTab] = useState<'All' | 'Send' | 'Drafts'>('All');
  const [currentPage, setCurrentPage] = useState(1);

  const departments = ['All Departments', 'HR', 'IT', 'Finance', 'Marketing', 'Operations'];
  const employees = [
    { name: 'Karthika Balan', dept: 'IT' },
    { name: 'Sarah Jo', dept: 'Marketing' },
    { name: 'Michael', dept: 'Finance' },
    { name: 'David', dept: 'Operations' },
    { name: 'Sarah Joseph', dept: 'HR' }
  ];

  const [history, setHistory] = useState<MsgHistoryRow[]>([
    { id: '1', dateTime: 'July 20, 2025 09:30 AM', message: 'Team meeting scheduled for...', recipients: 'All Employees', status: 'Send', read: '-' },
    { id: '2', dateTime: 'July 20, 2025 09:30 AM', message: 'Team meeting scheduled for...', recipients: 'Engineering Team (8)', status: 'Draft', read: '-' },
    { id: '3', dateTime: 'July 20, 2025 09:30 AM', message: 'Team meeting scheduled for...', recipients: 'Marketing Team (12)', status: 'Send', read: '8/12' },
    { id: '4', dateTime: 'July 20, 2025 09:30 AM', message: 'Team meeting scheduled for...', recipients: 'All Employees', status: 'Send', read: '-' },
  ]);

  const toggleDept = (dept: string) => {
    if (selectedDepts.includes(dept)) {
      setSelectedDepts(selectedDepts.filter(d => d !== dept));
    } else {
      setSelectedDepts([...selectedDepts, dept]);
    }
  };

  const toggleEmp = (emp: string) => {
    if (selectedEmps.includes(emp)) {
      setSelectedEmps(selectedEmps.filter(e => e !== emp));
    } else {
      setSelectedEmps([...selectedEmps, emp]);
    }
  };

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) {
      toast.error('Please fill in subject and message!');
      return;
    }
    const newMsg: MsgHistoryRow = {
      id: String(Date.now()),
      dateTime: 'July 20, 2025 09:30 AM',
      message: subject,
      recipients: selectedDepts.length > 0 ? `${selectedDepts.join(', ')} Departments` : 'Custom Recipients',
      status: 'Send',
      read: '-'
    };
    setHistory([newMsg, ...history]);
    setSubject('');
    setMessage('');
    toast.success('Message broadcasted successfully!');
  };

  const handleDeleteHistory = (id: string) => {
    setHistory(history.filter(h => h.id !== id));
    toast.success('Message log deleted.');
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Mass Messages</h1>
      </div>

      {/* Two Column Layout (Composer) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Recipients checklists (width 4/12 grid span) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
          <span className="block text-xs font-bold text-slate-700">Recipients</span>
          
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search........"
              value={searchRecipient}
              onChange={(e) => setSearchRecipient(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-905 bg-white focus:outline-none focus:border-slate-350"
            />
          </div>

          {/* Departments Checklist */}
          <div className="space-y-2.5">
            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Departments</span>
            <div className="space-y-2 text-xs font-bold text-slate-655 pl-1">
              {departments.map(dept => (
                <label key={dept} className="flex items-center gap-2.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedDepts.includes(dept)}
                    onChange={() => toggleDept(dept)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-400 h-3.5 w-3.5"
                  />
                  <span>{dept}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Employees Checklist */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Employees</span>
            <div className="space-y-2 text-xs font-bold text-slate-655 pl-1">
              {employees.map(emp => (
                <label key={emp.name} className="flex items-center gap-2.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedEmps.includes(emp.name)}
                    onChange={() => toggleEmp(emp.name)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-400 h-3.5 w-3.5"
                  />
                  <span>{emp.name} ({emp.dept})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Selected count footer */}
          <div className="text-[10px] font-bold text-slate-400 pt-2 border-t border-slate-100">
            Selected: {selectedDepts.length + selectedEmps.length} employees
          </div>
        </div>

        {/* Right Side: Message Editor Form (width 8/12 grid span) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card 1: Subject */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-3">
            <span className="block text-xs font-bold text-slate-700">Subject</span>
            <input 
              type="text"
              placeholder="Enter the message subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-semibold text-slate-805 outline-none focus:border-blue-400 bg-white"
            />
          </div>

          {/* Card 2: Message textarea */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-3">
            <span className="block text-xs font-bold text-slate-700">Massage</span>
            <textarea 
              rows={8}
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-3 text-xs font-semibold text-slate-805 outline-none resize-none focus:border-blue-400"
            />
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 pt-1">
              <span>{message.length}/1000 characters</span>
              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => toast.success('Draft saved successfully!')}
                  className="px-6 py-2 border border-[#006666] hover:bg-emerald-50/50 text-[#006666] font-bold rounded-lg text-xs transition-all bg-white cursor-pointer"
                >
                  Save Draft
                </button>
                <button 
                  onClick={handleSend}
                  className="px-6 py-2 bg-[#004848] hover:bg-[#003333] text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Message History Section below composer */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        <h2 className="text-sm font-bold text-slate-900 m-0">Message History</h2>

        {/* Filters and search info */}
        <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs text-xs font-bold">
          <div className="flex gap-2">
            {(['All', 'Send', 'Drafts'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab 
                    ? 'bg-blue-50 text-[#0473b8] border border-blue-200 font-extrabold shadow-sm'
                    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search........"
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 bg-white"
            />
          </div>
        </div>

        {/* Message history log list table */}
        <div className="space-y-3 bg-slate-100 border border-slate-200 rounded-xl p-5">
          {/* Table Headers */}
          <div className="grid grid-cols-6 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
            <span>Date/Time</span>
            <span className="col-span-2">Message</span>
            <span>Recipients</span>
            <span>Status</span>
            <span className="text-right">Read</span>
          </div>

          {/* Rows */}
          <div className="space-y-1.5">
            {history.map(row => (
              <div 
                key={row.id}
                className="grid grid-cols-6 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm text-xs font-bold text-slate-800"
              >
                <span>{row.dateTime}</span>
                <span className="col-span-2 text-slate-500 font-semibold truncate pr-4">{row.message}</span>
                <span className="text-slate-500 font-semibold">{row.recipients}</span>
                
                <div>
                  <span className={`text-[10px] font-bold px-3 py-0.5 rounded-full border ${
                    row.status === 'Send' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-700 border-slate-150'
                  }`}>
                    {row.status}
                  </span>
                </div>

                <div className="flex justify-end items-center gap-4">
                  <span className="text-slate-500 font-semibold">{row.read}</span>
                  <div className="flex gap-2 text-slate-400">
                    <button onClick={() => toast.info(`Editing message #${row.id}`)} className="hover:text-blue-600">
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDeleteHistory(row.id)} className="hover:text-rose-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 pt-2">
            <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
              <ChevronLeft className="h-3 w-3" />
            </button>
            {[1, 2, 3].map(page => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-2.5 py-0.5 text-xs font-bold border rounded bg-white transition-colors ${
                  currentPage === page 
                    ? 'bg-blue-50 text-[#0473b8] border-blue-200 font-extrabold'
                    : 'text-slate-650 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
export default MassMessagesPage;
