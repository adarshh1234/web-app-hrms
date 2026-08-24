import React, { useState } from 'react';
import { 
  ChevronDown, 
  Search, 
  Trash2, 
  Edit2, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

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
    }
  };

  const handleEdit = (id: string) => {
    const newStatus = prompt("Enter new status (Approved, Pending, Rejected):");
    if (!newStatus) return;
    if (newStatus === 'Approved' || newStatus === 'Pending' || newStatus === 'Rejected') {
      setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Miscellaneous Request</h1>
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
            <span>Date Range</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <span>Department</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>
        </div>

        {/* Right Search input */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search........" 
            className="w-full pl-9 pr-4 py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Grid-based Card Table */}
      <div className="space-y-3">
        {/* Header row */}
        <div className="grid grid-cols-7 px-4 py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
          <span>Employee Name</span>
          <span>Department</span>
          <span>Request Type</span>
          <span>Submission Date</span>
          <span>Status</span>
          <span>Priority</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {requests.map((req) => (
            <div 
              key={req.id}
              className="grid grid-cols-7 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm hover:border-slate-350 transition-all text-xs font-bold text-slate-805"
            >
              <span>{req.name}</span>
              <span className="text-slate-500 font-semibold">{req.dept}</span>
              <span className="text-slate-500 font-semibold">{req.type}</span>
              <span className="text-slate-500 font-semibold">{req.date}</span>
              
              <div>
                <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded border ${
                  req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                  req.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                  'bg-rose-50 text-rose-700 border-rose-100'
                }`}>
                  {req.status}
                </span>
              </div>

              <div>
                <span className={`font-extrabold ${
                  req.priority === 'High' ? 'text-rose-600' :
                  req.priority === 'Medium' ? 'text-amber-500' :
                  'text-emerald-600'
                }`}>
                  {req.priority}
                </span>
              </div>

              <div className="flex justify-end gap-1.5">
                <button 
                  onClick={() => handleDelete(req.id)}
                  className="p-1 bg-slate-100 text-slate-405 hover:text-rose-600 rounded-full border border-slate-200 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
                <button 
                  onClick={() => handleEdit(req.id)}
                  className="p-1 bg-slate-100 text-slate-405 hover:text-blue-650 rounded-full border border-slate-200 transition-colors"
                >
                  <Edit2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 pt-4">
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
                : 'bg-white text-slate-650 border-slate-205 hover:bg-slate-50'
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
  );
};
export default SupportPage;
