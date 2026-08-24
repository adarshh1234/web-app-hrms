import React from 'react';
import { useToast } from '../../../hooks/useToast';

export const LeaveConfigureTab: React.FC = () => {
  const toast = useToast();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      {/* Work Week configuration from Figma */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Work Week Rules</h3>
        <div className="space-y-3">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
            <div key={day} className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">{day}</span>
              <select className="border border-slate-200 rounded px-2 py-0.5 bg-white text-xs text-slate-800" defaultValue={day === 'Saturday' || day === 'Sunday' ? 'off' : 'full'}>
                <option value="full">Full Day</option>
                <option value="half">Half Day</option>
                <option value="off">Non-Working Day</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Holidays */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">National Holidays</h3>
          <button onClick={() => toast.info("Add Holiday Modal")} className="text-[var(--primary-color)] text-xs font-bold hover:underline cursor-pointer">Add</button>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between p-2 hover:bg-slate-50 rounded">
            <div>
              <h4 className="font-semibold text-slate-800">Christmas Day</h4>
              <p className="text-[10px] text-slate-400">Dec 25, 2026</p>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold self-center">National</span>
          </div>
          <div className="flex justify-between p-2 hover:bg-slate-50 rounded">
            <div>
              <h4 className="font-semibold text-slate-800">New Year Holiday</h4>
              <p className="text-[10px] text-slate-400">Jan 01, 2026</p>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold self-center">National</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveConfigureTab;
