import React from 'react';
import { useToast } from '../../../hooks/useToast';

export const LeaveReportsTab: React.FC = () => {
  const toast = useToast();

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 animate-fade-in">
      <h3 className="text-base font-bold text-slate-900">Leave Entitlements and Usage Report</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">Location</label>
          <select className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800 outline-none">
            <option>All Locations</option>
            <option>Kochi</option>
            <option>Texas</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">Sub Unit</label>
          <select className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800 outline-none">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Marketing</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">Leave Type</label>
          <select className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800 outline-none">
            <option>CAN-Vacation</option>
            <option>CAN-Personal</option>
          </select>
        </div>
        <div className="flex items-end">
          <button 
            onClick={() => toast.info("Leave usage report generated below!")}
            className="w-full py-1.5 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
          >
            Generate
          </button>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4 text-center py-6 text-slate-400 text-xs font-semibold">
        Click Generate to pull leave balances.
      </div>
    </div>
  );
};

export default LeaveReportsTab;
