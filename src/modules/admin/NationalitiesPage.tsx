import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface NationalityRecord {
  id: string;
  name: string;
}

export const NationalitiesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [records, setRecords] = useState<NationalityRecord[]>([
    { id: '1', name: 'Afghan' },
    { id: '2', name: 'Albanian' },
    { id: '3', name: 'Algerian' },
    { id: '4', name: 'American' },
    { id: '5', name: 'Afghan' },
    { id: '6', name: 'Albanian' },
    { id: '7', name: 'Algerian' },
    { id: '8', name: 'American' },
    { id: '9', name: 'Afghan' },
    { id: '10', name: 'Albanian' },
    { id: '11', name: 'Algerian' },
    { id: '12', name: 'American' },
    { id: '13', name: 'Afghan' },
    { id: '14', name: 'Albanian' },
    { id: '15', name: 'Algerian' },
    { id: '16', name: 'American' },
    { id: '17', name: 'Algerian' },
    { id: '18', name: 'American' },
  ]);

  const handleDelete = (id: string) => {
    if (confirm("Delete this nationality record?")) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  return (
    <div className="space-y-4 max-w-5xl">
      <h2 className="text-sm font-bold text-slate-900 m-0">Nationalities</h2>

      <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
        
        {/* Info header bar with Add button */}
        <div className="flex justify-between items-center pb-1">
          <span className="text-[10px] font-bold text-slate-500">(3) Records Found</span>
          <button 
            onClick={() => alert("Add new nationality")}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="h-3 w-3" />
            <span>Add</span>
          </button>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-2 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
          <span>Nationality</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows List (18 rows repeating as per Image 4) */}
        <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
          {records.map((r, index) => (
            <div 
              key={index}
              className="grid grid-cols-2 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800 hover:border-slate-300 transition-all"
            >
              <span>{r.name}</span>
              
              <div className="flex justify-end gap-2.5">
                <button onClick={() => alert(`Edit ${r.name}`)} className="p-1 text-slate-400 hover:text-blue-600">
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => handleDelete(r.id)} className="p-1 text-slate-400 hover:text-rose-600">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination at the bottom */}
        <div className="flex justify-end items-center gap-2 pt-2 bg-slate-100">
          <button className="p-1 border border-slate-205 rounded bg-white hover:bg-slate-50 text-slate-500">
            <ChevronLeft className="h-3 w-3" />
          </button>
          {[1, 2, 3].map(page => (
            <button 
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-2.5 py-0.5 text-xs font-bold border rounded bg-white transition-colors ${
                currentPage === page 
                  ? 'bg-blue-50 text-[#0473b8] border-blue-200 font-extrabold'
                  : 'text-slate-650 border-slate-205 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="p-1 border border-slate-205 rounded bg-white hover:bg-slate-50 text-slate-500">
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>

      </div>

    </div>
  );
};
export default NationalitiesPage;
