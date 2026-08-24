import React from 'react';
import { Plus } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export const EmergencyContactsTab: React.FC = () => {
  const toast = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-slate-105 border border-slate-200 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center pb-1">
          <span className="text-xs font-bold text-slate-705">Assigned Emergency Contacts</span>
          
          <button 
            onClick={() => toast.info("Add emergency contact")}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add</span>
          </button>
        </div>

        <div className="text-[10px] font-bold text-slate-400">
          No Records Found
        </div>

        {/* Columns */}
        <div className="grid grid-cols-5 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
          <span>Name</span>
          <span>Relationship</span>
          <span>Mobile</span>
          <span>Alternate Number</span>
          <span className="text-right">Action</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 py-4 px-4 text-center text-xs font-bold text-slate-400">
          No emergency contacts assigned yet.
        </div>
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

        <div className="bg-slate-105 border border-slate-200 rounded-xl p-5 space-y-3">
          <div className="text-[10px] font-bold text-slate-400">
            (1) Record Found
          </div>

          <div className="grid grid-cols-7 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
            <span>File Name</span>
            <span className="col-span-2">Description</span>
            <span>Size</span>
            <span>Type</span>
            <span>Date Added</span>
            <span className="text-right">Actions</span>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
            No attachments loaded.
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactsTab;
