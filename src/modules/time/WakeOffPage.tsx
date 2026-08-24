import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Plus, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import Button from '../../components/common/Button';

export const WakeOffPage: React.FC = () => {
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const rows = Array(10).fill({
    name: 'Karthika Balan',
    dept: 'Design',
    start: 'July 20, 2025',
    end: 'July 23,2025'
  });

  return (
    <div className="space-y-6">
      {/* Title & Top Action Bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900 m-0">Wake off</h1>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => toast.info("Open filters")}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-[#0473b8] bg-white rounded-lg text-xs font-semibold text-[#0473b8] hover:bg-blue-50/50 transition-all"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#0473b8]" />
            <span>Filter</span>
          </button>
          <Button 
            variant="primary"
            size="md"
            icon={<Plus className="h-3.5 w-3.5" />}
            onClick={() => toast.info("Add employee to wake off list")}
          >
            Add Employee
          </Button>
        </div>
      </div>

      {/* Grid-based Card Table matching exact layout spacing */}
      <div className="space-y-3">
        {/* Table Header */}
        <div className="grid grid-cols-4 px-4 py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
          <span>Employee Name</span>
          <span>Department</span>
          <span>Leave Starting Date</span>
          <span>Leave Ending Date</span>
        </div>

        {/* White Card Rows */}
        <div className="space-y-2">
          {rows.map((row) => (
            <div 
              key={row.id || `${row.name}-${row.start}`}
              className="grid grid-cols-4 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm hover:border-slate-350 transition-all text-xs font-bold text-slate-800"
            >
              <span>{row.name}</span>
              <span className="text-slate-500 font-semibold">{row.dept}</span>
              <span className="text-slate-500 font-semibold">{row.start}</span>
              <span className="text-slate-500 font-semibold">{row.end}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Pagination */}
      <div className="flex justify-end items-center gap-2 pt-4">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-500"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {[1, 2, 3].map(page => (
          <button 
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 text-xs font-bold border rounded-md transition-colors ${
              currentPage === page 
                ? 'bg-blue-50 text-[#0473b8] border-blue-200 font-extrabold shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {page}
          </button>
        ))}
        <button 
          onClick={() => setCurrentPage(prev => Math.min(3, prev + 1))}
          className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-500"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
export default WakeOffPage;
