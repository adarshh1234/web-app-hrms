import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

interface ApplyLeaveTabProps {
  onSuccess: (record: { date: string; name: string; type: string; balance: number; days: number; status: string; comment: string }) => void;
}

export const ApplyLeaveTab: React.FC<ApplyLeaveTabProps> = ({ onSuccess }) => {
  const toast = useToast();
  const [applyLeaveType, setApplyLeaveType] = useState('');
  const [applyFromDate, setApplyFromDate] = useState('');
  const [applyToDate, setApplyToDate] = useState('');
  const [applyReason, setApplyReason] = useState('');

  const handleApply = () => {
    if (!applyLeaveType || !applyFromDate || !applyToDate) {
      toast.error('Please fill in leave type and date range!');
      return;
    }
    const newRecord = {
      date: applyFromDate,
      name: 'Sarah Johnson',
      type: applyLeaveType,
      balance: 2,
      days: 1,
      status: 'Pending',
      comment: applyReason,
    };
    onSuccess(newRecord);
    setApplyLeaveType('');
    setApplyFromDate('');
    setApplyToDate('');
    setApplyReason('');
    toast.success('Leave application submitted successfully!');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-slate-900 m-0">Apply Leave</h2>

      <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
          <div>
            <label className="block mb-1.5">Leave Type</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={applyLeaveType}
                onChange={(e) => setApplyLeaveType(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                <option value="">Select Leave Type</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-805" />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1.5">Employee Name</label>
            <input
              type="text"
              disabled
              defaultValue="Sarah Johnson"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 font-semibold text-xs outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-slate-705">
          <div>
            <label className="block mb-1.5">From Date</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <input
                type="date"
                value={applyFromDate}
                onChange={(e) => setApplyFromDate(e.target.value)}
                className="w-full px-3 py-2 text-slate-905 outline-none text-xs font-semibold"
              />
              <div className="absolute right-3 pointer-events-none">
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1.5">To Date</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <input
                type="date"
                value={applyToDate}
                onChange={(e) => setApplyToDate(e.target.value)}
                className="w-full px-3 py-2 text-slate-905 outline-none text-xs font-semibold"
              />
              <div className="absolute right-3 pointer-events-none">
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1.5">Department</label>
            <input
              type="text"
              disabled
              defaultValue="Engineering"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 font-semibold text-xs outline-none"
            />
          </div>
        </div>

        <div className="text-xs font-bold text-slate-705">
          <label className="block mb-1.5">Reason</label>
          <textarea
            rows={5}
            value={applyReason}
            onChange={(e) => setApplyReason(e.target.value)}
            placeholder="Reason details..."
            className="w-full border border-slate-200 rounded-lg p-3 text-slate-900 font-semibold text-xs outline-none resize-none"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleApply}
            className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeaveTab;
