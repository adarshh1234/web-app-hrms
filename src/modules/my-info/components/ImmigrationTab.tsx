import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export const ImmigrationTab: React.FC = () => {
  const toast = useToast();
  const [immigrationRecords, setImmigrationRecords] = useState([
    { doc: 'Passport', number: '34', issuedBy: 'Romania', issuedDate: '2019-10-10', expiryDate: '2019-10-10' }
  ]);

  const handleDeleteImmigration = (index: number) => {
    if (confirm("Delete this immigration record?")) {
      setImmigrationRecords(immigrationRecords.filter((_, idx) => idx !== index));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-105 border border-slate-200 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center pb-1">
          <span className="text-xs font-bold text-slate-705">Assigned Immigration Records</span>
          
          <button 
            onClick={() => toast.info("Add immigration record")}
            className="flex items-center gap-1 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold px-3 py-1.5 rounded-md cursor-pointer transition-colors"
          >
            <Plus className="h-3 w-3" />
            <span>Add</span>
          </button>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-6 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
          <span>Document</span>
          <span>Number</span>
          <span>Issued By</span>
          <span>Issued Date</span>
          <span>Expiry Date</span>
          <span className="text-right">Action</span>
        </div>

        {/* Rows */}
        <div className="space-y-1.5">
          {immigrationRecords.map((r, index) => (
            <div 
              key={`${r.doc}-${r.number}`}
              className="grid grid-cols-6 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-805"
            >
              <span>{r.doc}</span>
              <span className="text-slate-550 font-semibold">{r.number}</span>
              <span className="text-slate-550 font-semibold">{r.issuedBy}</span>
              <span className="text-slate-550 font-semibold">{r.issuedDate}</span>
              <span className="text-slate-550 font-semibold">{r.expiryDate}</span>
              
              <div className="flex justify-end gap-2.5">
                <button onClick={() => toast.info(`Edit immigration record #${index}`)} className="p-1 text-slate-400 hover:text-blue-600">
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => handleDeleteImmigration(index)} className="p-1 text-slate-400 hover:text-rose-600">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Attachments Section */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold text-slate-800">Attachments</h4>
            <button 
              onClick={() => toast.info("Add attachment")}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
            No attachments loaded.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmigrationTab;
