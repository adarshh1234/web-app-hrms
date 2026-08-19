import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  SlidersHorizontal, 
  DollarSign,
  FileText,
  Briefcase,
  User
} from 'lucide-react';

interface FinanceRequest {
  id: string;
  name: string;
  empId: string;
  type: string;
  department: string;
  date: string;
  amount: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const EmployeeFinanceRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<FinanceRequest[]>([
    { id: '1', name: 'Sarah Johnson', empId: 'EMP2024001', type: 'Training Course Payment', department: 'Engineering', date: '2024-02-14', amount: '1,800', status: 'Pending' },
    { id: '2', name: 'Sarah Johnson', empId: 'EMP2024001', type: 'Training Course Payment', department: 'Engineering', date: '2024-02-14', amount: '1,800', status: 'Rejected' },
    { id: '3', name: 'Sarah Johnson', empId: 'EMP2024001', type: 'Training Course Payment', department: 'Engineering', date: '2024-02-14', amount: '1,800', status: 'Approved' },
    { id: '4', name: 'Sarah Johnson', empId: 'EMP2024001', type: 'Training Course Payment', department: 'Engineering', date: '2024-02-14', amount: '1,800', status: 'Approved' },
    { id: '5', name: 'Sarah Johnson', empId: 'EMP2024001', type: 'Training Course Payment', department: 'Engineering', date: '2024-02-14', amount: '1,800', status: 'Rejected' },
    { id: '6', name: 'Sarah Johnson', empId: 'EMP2024001', type: 'Training Course Payment', department: 'Engineering', date: '2024-02-14', amount: '1,800', status: 'Pending' },
    { id: '7', name: 'Sarah Johnson', empId: 'EMP2024001', type: 'Training Course Payment', department: 'Engineering', date: '2024-02-14', amount: '1,800', status: 'Rejected' },
    { id: '8', name: 'Sarah Johnson', empId: 'EMP2024001', type: 'Training Course Payment', department: 'Engineering', date: '2024-02-14', amount: '1,800', status: 'Approved' },
    { id: '9', name: 'Sarah Johnson', empId: 'EMP2024001', type: 'Training Course Payment', department: 'Engineering', date: '2024-02-14', amount: '1,800', status: 'Pending' },
    { id: '10', name: 'Sarah Johnson', empId: 'EMP2024001', type: 'Training Course Payment', department: 'Engineering', date: '2024-02-14', amount: '1,800', status: 'Approved' },
    { id: '11', name: 'Sarah Johnson', empId: 'EMP2024001', type: 'Training Course Payment', department: 'Engineering', date: '2024-02-14', amount: '1,800', status: 'Pending' },
    { id: '12', name: 'Sarah Johnson', empId: 'EMP2024001', type: 'Training Course Payment', department: 'Engineering', date: '2024-02-14', amount: '1,800', status: 'Rejected' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleAction = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.name.toLowerCase().includes(searchQuery.toLowerCase()) || req.empId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Request Filters</h1>
      </div>

      {/* Filter Bar (matches Image 4 layout) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search......." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 outline-none"
          />
        </div>

        {/* Date range picker */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Select date range" 
            className="w-full pl-3 pr-9 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 outline-none"
          />
          <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
        </div>

        {/* Status select */}
        <div className="relative">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-3 pr-9 py-2 border border-slate-200 bg-white rounded-lg text-xs font-semibold text-slate-800 outline-none appearance-none"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <SlidersHorizontal className="absolute right-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Amount range */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Amount range" 
            className="w-full pl-3 pr-9 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 outline-none"
          />
          <span className="absolute right-3 top-2 text-sm font-bold text-slate-400">₹</span>
        </div>
      </div>

      {/* Grid List matching 3 columns layout exactly */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredRequests.map((req) => (
          <div 
            key={req.id} 
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Top header row */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center font-bold text-[10px] text-slate-600 shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt={req.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-none">{req.name}</h4>
                  <span className="text-[9px] text-slate-400 font-bold mt-1 block">{req.empId}</span>
                </div>
              </div>

              {/* Status pill tag */}
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                req.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                'bg-rose-50 text-rose-600 border-rose-100'
              }`}>
                {req.status}
              </span>
            </div>

            {/* Content items */}
            <div className="space-y-2 text-xs font-bold text-slate-500">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                <span>{req.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-slate-400 shrink-0" />
                <span>{req.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                <span>{req.date}</span>
              </div>
            </div>

            {/* Bottom Actions and Price row */}
            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <span className="text-sm font-extrabold text-slate-900">${req.amount}</span>
              
              {req.status === 'Pending' && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAction(req.id, 'Approved')}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded cursor-pointer transition-colors"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleAction(req.id, 'Rejected')}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold rounded cursor-pointer transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default EmployeeFinanceRequestsPage;
