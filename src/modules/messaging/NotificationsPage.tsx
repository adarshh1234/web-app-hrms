import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import Badge from '../../components/common/Badge';
import notificationService, { BackendNotification } from '../../services/notificationService';

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

  // Determine sub-page configuration and active channel
  let pageTitle = 'E-Mail';
  let historyTitle = 'E- Mail History';
  let sendButtonText = 'Send Message';
  let activeChannel = 'EMAIL';

  if (path.includes('/sms')) {
    pageTitle = 'Messages';
    historyTitle = 'Message History';
    sendButtonText = 'Send Message';
    activeChannel = 'SMS';
  } else if (path.includes('/whatsapp')) {
    pageTitle = "What's App Messages";
    historyTitle = 'Message History';
    sendButtonText = 'Send Message';
    activeChannel = 'WHATSAPP';
  } else if (path.includes('/employee-app')) {
    pageTitle = 'Employee App Messages';
    historyTitle = 'Message History';
    sendButtonText = 'Send Message';
    activeChannel = 'EMPLOYEE_APP';
  } else if (path.includes('/huremaso')) {
    pageTitle = 'Huremaso Broadcast Notifications';
    historyTitle = 'Huremaso Notification History';
    sendButtonText = 'Send Huremaso Notification';
    activeChannel = 'HUREMASO';
  }

  // Recipient checkboxes state
  const [selectedDepts, setSelectedDepts] = useState<Record<string, boolean>>({});
  const [selectedEmps, setSelectedEmps] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // History logs states
  const [historyTab, setHistoryTab] = useState<'All' | 'Send' | 'Drafts'>('All');
  const [historySearch, setHistorySearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  // Count selected employees
  const selectedEmpCount = Object.values(selectedEmps).filter(Boolean).length;

  const loadHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      const res = await notificationService.getNotifications({
        channel: activeChannel,
        status: historyTab === 'Send' ? 'SENT' : historyTab === 'Drafts' ? 'DRAFT' : undefined,
        search: historySearch,
        page: currentPage,
        limit: 20,
      });

      const items: HistoryItem[] = res.data.map((item: BackendNotification) => ({
        id: item.id,
        dateTime: item.createdAt
          ? new Date(item.createdAt).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })
          : new Date().toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            }),
        message: item.subject && item.subject !== 'No Subject' ? `${item.subject} - ${item.message}` : item.message,
        recipients: item.recipients || 'All Employees',
        status: item.status === 'SENT' ? 'Send' : 'Draft',
        read: '-',
      }));

      setHistoryItems(items);
    } catch (err) {
      console.error('Error fetching notification history:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [activeChannel, historyTab, historySearch, currentPage]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleDeptToggle = (dept: string) => {
    setSelectedDepts((prev) => ({ ...prev, [dept]: !prev[dept] }));
  };

  const handleEmpToggle = (emp: string) => {
    setSelectedEmps((prev) => ({ ...prev, [emp]: !prev[emp] }));
  };

  const getSelectedRecipientsLabel = () => {
    const selectedEmpNames = Object.keys(selectedEmps).filter((emp) => selectedEmps[emp]);
    const selectedDeptNames = Object.keys(selectedDepts).filter((dept) => selectedDepts[dept]);

    if (selectedEmpNames.length > 0) {
      return `${selectedEmpNames.length} Selected Employee(s)`;
    }
    if (selectedDeptNames.length > 0) {
      return selectedDeptNames.join(', ');
    }
    return 'All Employees';
  };

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error('Please enter a message before sending.');
      return;
    }
    setIsSubmitting(true);
    try {
      await notificationService.createNotification({
        channel: activeChannel,
        subject: subject || 'No Subject',
        message: message.trim(),
        recipients: getSelectedRecipientsLabel(),
        status: 'SENT',
      });

      setSubject('');
      setMessage('');
      setSelectedEmps({});
      setSelectedDepts({});
      toast.success('Message dispatched successfully and saved to backend!');
      await loadHistory();
    } catch (err) {
      toast.error('Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!message.trim() && !subject.trim()) {
      toast.error('Please enter a subject or message to save as draft.');
      return;
    }
    setIsSubmitting(true);
    try {
      await notificationService.createNotification({
        channel: activeChannel,
        subject: subject || 'No Subject',
        message: message.trim() || '(Draft Content)',
        recipients: getSelectedRecipientsLabel(),
        status: 'DRAFT',
      });

      setSubject('');
      setMessage('');
      setSelectedEmps({});
      setSelectedDepts({});
      toast.info('Draft saved successfully to backend!');
      await loadHistory();
    } catch (err) {
      toast.error('Failed to save draft.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter history items locally if needed
  const filteredHistory = historyItems;


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
              disabled={isSubmitting}
              className="px-6 py-2 border-2 border-[#006666] hover:border-[#004848] text-[#006666] hover:text-[#004848] text-xs font-bold rounded-lg cursor-pointer transition-colors bg-white disabled:opacity-50 flex items-center gap-1.5"
            >
              {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>Save Draft</span>
            </button>
            <button 
              onClick={handleSend}
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#004848] hover:bg-[#003333] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>{sendButtonText}</span>
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
          {isLoadingHistory ? (
            <div className="bg-white border border-slate-200 rounded-lg p-8 text-center text-xs text-slate-400 font-semibold flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-[#006666]" />
              <span>Loading notification history from server...</span>
            </div>
          ) : filteredHistory.length === 0 ? (
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
