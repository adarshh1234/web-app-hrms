import React, { useState } from 'react';
import { SlidersHorizontal, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const TimePage: React.FC = () => {
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const rows = Array(10).fill({
    name: 'Karthika Balan',
    dept: 'Design',
    date: 'July 20, 2025',
    punchIn: '8.00 Am',
    punchOut: '6.30 Pm',
    overtime: '1.30 Hr'
  });

  return (
    <div className="space-y-6">
      {/* Title & Action Bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900 m-0">Overt time Pool</h1>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => toast.info("Filter pool records")}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-[#0473b8] bg-white rounded-lg text-xs font-semibold text-[#0473b8] hover:bg-blue-50/50 transition-all"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#0473b8]" />
            <span>Filter</span>
          </button>
          <button 
            onClick={() => toast.info("Add candidate to overtime records")}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add New Candidate</span>
          </button>
        </div>
      </div>

      {/* Card Table View */}
      <div className="space-y-3">
        {/* Table Headers */}
        <div className="grid grid-cols-6 px-4 py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
          <span>Employee Name</span>
          <span>Department</span>
          <span>Date</span>
          <span>Punch In</span>
          <span>Punch Out</span>
          <span>Over Time</span>
        </div>

        {/* Card Rows */}
        <div className="space-y-2">
          {rows.map((row) => (
            <div 
              key={row.id || `${row.name}-${row.date}`}
              className="grid grid-cols-6 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm hover:border-slate-350 transition-all text-xs font-bold text-slate-800"
            >
              <span>{row.name}</span>
              <span className="text-slate-500 font-semibold">{row.dept}</span>
              <span className="text-slate-500 font-semibold">{row.date}</span>
              <span className="text-slate-500 font-semibold">{row.punchIn}</span>
              <span className="text-slate-500 font-semibold">{row.punchOut}</span>
              <span className="text-slate-500 font-semibold">{row.overtime}</span>
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
  );
};
export default TimePage;
