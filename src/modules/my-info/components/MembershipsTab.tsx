import React from 'react';
import { Plus, Edit2, Trash2, Paperclip } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export const MembershipsTab: React.FC = () => {
  const toast = useToast();

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-50 pb-3">Memberships</h3>
      
      {/* Assigned Memberships */}
      <div className="bg-slate-105 border border-slate-200 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center pb-1">
          <span className="text-xs font-bold text-slate-705">Assigned Memberships</span>
          <button 
            onClick={() => toast.info("Add membership")}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add</span>
          </button>
        </div>
        <div className="text-[10px] font-bold text-slate-400">(1) Record Found</div>

        <div className="grid grid-cols-6 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
          <span>Membership</span>
          <span>Subscription Paid By</span>
          <span>Subscription Amount</span>
          <span>Currency</span>
          <span>Subscription Commence Date</span>
          <span className="text-right">Action</span>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 py-4 px-4 text-center text-xs font-bold text-slate-400">
          No memberships assigned.
        </div>
      </div>

      {/* Attachments Card */}
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-[#e2e4e7]/60 border border-slate-205 p-3 rounded-lg select-none">
          <span className="text-sm font-bold text-slate-850">Attachments</span>
          <button 
            onClick={() => toast.info("Add attachment")}
            className="flex items-center gap-1 px-4 py-1.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add</span>
          </button>
        </div>

        <div className="bg-slate-50 border border-slate-205 rounded-xl p-5 space-y-3">
          <div className="text-[10px] font-bold text-slate-400">
            (1) Record Found
          </div>

          <div className="grid grid-cols-7 px-4 py-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-100/85 rounded-lg border border-slate-200">
            <span>File Name</span>
            <span>Description</span>
            <span>Size</span>
            <span>Type</span>
            <span>Date Added</span>
            <span>Added By</span>
            <span className="text-right">Action</span>
          </div>

          <div className="grid grid-cols-7 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm text-xs font-bold text-slate-805">
            <span className="text-slate-700"></span>
            <span className="text-slate-400 font-semibold"></span>
            <span className="text-slate-400 font-semibold"></span>
            <span className="text-slate-400 font-semibold"></span>
            <span className="text-slate-400 font-semibold"></span>
            <span className="text-slate-400 font-semibold"></span>
            <div className="flex justify-end gap-3 text-slate-400 pr-1">
              <button className="hover:text-blue-600 p-0.5"><Edit2 className="h-3.5 w-3.5" /></button>
              <button className="hover:text-rose-600 p-0.5"><Trash2 className="h-3.5 w-3.5" /></button>
              <button className="hover:text-slate-600 p-0.5"><Paperclip className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipsTab;
