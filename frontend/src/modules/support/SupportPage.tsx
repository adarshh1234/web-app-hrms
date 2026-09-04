import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Search, 
  Trash2, 
  Edit2, 
  ChevronLeft, 
  ChevronRight,
  HelpCircle,
  Phone,
  Mail,
  LifeBuoy,
  FileText,
  Wrench,
  Ticket,
  CheckCircle2,
  Send
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface MiscRequest {
  id: string;
  name: string;
  dept: string;
  type: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  priority: 'High' | 'Medium' | 'Low';
}

export const SupportPage: React.FC = () => {
  const toast = useToast();
  const location = useLocation();
  const path = location.pathname;

  const [currentPage, setCurrentPage] = useState(1);
  const [requests, setRequests] = useState<MiscRequest[]>([
    { id: '1', name: 'Sarah Johnson', dept: 'Marketing', type: 'Office Equipment', date: 'July 20, 2025', status: 'Approved', priority: 'High' },
    { id: '2', name: 'Sarah Johnson', dept: 'Marketing', type: 'Office Equipment', date: 'July 20, 2025', status: 'Pending', priority: 'Medium' },
    { id: '3', name: 'Sarah Johnson', dept: 'Marketing', type: 'Office Equipment', date: 'July 20, 2025', status: 'Rejected', priority: 'Low' },
    { id: '4', name: 'Sarah Johnson', dept: 'Marketing', type: 'Office Equipment', date: 'July 20, 2025', status: 'Approved', priority: 'High' },
    { id: '5', name: 'Sarah Johnson', dept: 'Marketing', type: 'Office Equipment', date: 'July 20, 2025', status: 'Approved', priority: 'High' },
    { id: '6', name: 'Sarah Johnson', dept: 'Marketing', type: 'Office Equipment', date: 'July 20, 2025', status: 'Pending', priority: 'High' },
    { id: '7', name: 'Sarah Johnson', dept: 'Marketing', type: 'Office Equipment', date: 'July 20, 2025', status: 'Approved', priority: 'High' },
    { id: '8', name: 'Sarah Johnson', dept: 'Marketing', type: 'Office Equipment', date: 'July 20, 2025', status: 'Approved', priority: 'High' },
  ]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this request?")) {
      setRequests(requests.filter(req => req.id !== id));
      toast.success("Request deleted!");
    }
  };

  const handleEdit = (id: string) => {
    const newStatus = prompt("Enter new status (Approved, Pending, Rejected):");
    if (!newStatus) return;
    if (newStatus === 'Approved' || newStatus === 'Pending' || newStatus === 'Rejected') {
      setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
      toast.success("Status updated!");
    }
  };

  // Render Sub-views
  if (path.includes('/maintenance')) {
    return (
      <div className="space-y-6 max-w-5xl animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Wrench className="h-3.5 w-3.5 text-teal-300" />
            <span>Support Maintenance Services</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Support Maintenance</h1>
          <p className="text-xs text-teal-100/80 mt-1">Hardware servicing, workstation provisioning, and IT asset maintenance schedules.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-500">Scheduled Servicing</span>
            <div className="text-2xl font-extrabold text-slate-900">14 Workstations</div>
            <span className="text-[11px] font-semibold text-teal-600 font-bold">Planned for Friday</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-500">Hardware Replacements</span>
            <div className="text-2xl font-extrabold text-slate-900">3 Pending</div>
            <span className="text-[11px] font-semibold text-amber-600 font-bold">Under procurement</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-500">SLA Compliance Rate</span>
            <div className="text-2xl font-extrabold text-slate-900">99.4%</div>
            <span className="text-[11px] font-semibold text-emerald-600 font-bold">Optimal support health</span>
          </div>
        </div>
      </div>
    );
  }

  if (path.includes('/help')) {
    return (
      <div className="space-y-6 max-w-5xl animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="h-3.5 w-3.5 text-teal-300" />
            <span>Knowledge Base & FAQs</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Help Center</h1>
          <p className="text-xs text-teal-100/80 mt-1">Browse guidebooks, policy walkthroughs, and step-by-step HRMS documentation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'How to apply for leave encashment', category: 'Payroll & Leave', read: '3 min read' },
            { title: 'Submitting timesheets & extra OT hours', category: 'Time & Attendance', read: '4 min read' },
            { title: 'Updating emergency contacts & tax forms', category: 'Employee Self Service', read: '2 min read' },
            { title: 'Understanding performance review cycles', category: 'Performance', read: '5 min read' }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-2 text-[#004848] font-bold text-xs">
                <FileText className="h-4 w-4" />
                <span>{faq.category}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 m-0">{faq.title}</h3>
              <p className="text-[11px] font-semibold text-slate-400">{faq.read}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (path.includes('/tickets')) {
    return (
      <div className="space-y-6 max-w-5xl animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Support Tickets</h1>
            <p className="text-xs text-teal-100/80 mt-1">Track active support requests and response SLAs.</p>
          </div>
          <button 
            onClick={() => toast.success("Support ticket dispatch queue ready!")}
            className="px-4 py-2 bg-white text-[#004848] font-extrabold text-xs rounded-xl shadow-sm cursor-pointer"
          >
            Create Ticket
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50/70">
            <div>
              <h4 className="text-xs font-bold text-slate-900 m-0">TKT-4890: Payroll Direct Deposit Account Change</h4>
              <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Submitted 2 hours ago by Sarah Johnson</p>
            </div>
            <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[10px] font-extrabold">In Progress</span>
          </div>
        </div>
      </div>
    );
  }

  if (path.includes('/contact')) {
    return (
      <div className="space-y-6 max-w-5xl animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Contact Support</h1>
          <p className="text-xs text-teal-100/80 mt-1">Get in touch with the IT Helpdesk and HR Support Team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Support Contacts</h3>
            <div className="space-y-3 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#004848]" />
                <span>IT Emergency Hotline: +1 (800) 555-0199</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#004848]" />
                <span>Email Support: support@company.com</span>
              </div>
              <div className="flex items-center gap-3">
                <LifeBuoy className="h-4 w-4 text-[#004848]" />
                <span>Live Chat Support: Active (24/7)</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Send Quick Message</h3>
            <input 
              type="text" 
              placeholder="Your Subject" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-[#004848]"
            />
            <textarea 
              rows={3} 
              placeholder="Describe your issue..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-[#004848] resize-none"
            />
            <button 
              onClick={() => toast.success("Message sent to HR Support Team!")}
              className="w-full py-2 bg-[#004848] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Send Message</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default: General Miscellaneous Request page
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Support & Miscellaneous Requests</h1>
      </div>

      {/* Filter Control Bar matching design exactly */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left selects dropdowns */}
        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <span>Status</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <span>Type</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <span>Department</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>
        </div>

        {/* Right Search Input */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search request..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 outline-none focus:bg-white focus:border-[#004848] font-semibold"
          />
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-bold bg-slate-50/80 select-none">
                <th className="py-3 px-4">EMPLOYEE NAME</th>
                <th className="py-3 px-4">DEPARTMENT</th>
                <th className="py-3 px-4">REQUEST TYPE</th>
                <th className="py-3 px-4">REQUEST DATE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 font-semibold text-slate-700">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{req.name}</td>
                  <td className="py-3 px-4">{req.dept}</td>
                  <td className="py-3 px-4">{req.type}</td>
                  <td className="py-3 px-4">{req.date}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      req.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(req.id)}
                        className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer" 
                        title="Edit Request"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(req.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer" 
                        title="Delete Request"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
