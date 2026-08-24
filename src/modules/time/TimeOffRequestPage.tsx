import React, { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import Button from '../../components/common/Button';

export const TimeOffRequestPage: React.FC = () => {
  const toast = useToast();
  const [leaveType, setLeaveType] = useState('Annual Leave');
  const [fromDate, setFromDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Time off request submitted successfully!');
    setFromDate('');
    setEndDate('');
    setDuration('');
    setReason('');
  };

  return (
    <div className="space-y-6 max-w-4xl select-none">
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Time off Request</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-slate-700">
        {/* Leave Type */}
        <div className="space-y-1.5">
          <label className="block text-slate-800">Leave Type</label>
          <div className="relative">
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full bg-[#e2e4e7]/60 border border-slate-200 rounded px-3 py-2 text-slate-900 outline-none appearance-none"
            >
              <option>Annual Leave</option>
              <option>Sick Leave</option>
              <option>Casual Leave</option>
              <option>Maternity/Paternity Leave</option>
            </select>
            <div className="absolute right-3 top-2.5 pointer-events-none text-slate-500 text-[10px]">▼</div>
          </div>
        </div>

        {/* From Date & End Date */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-slate-800">From Date</label>
            <div className="relative flex items-center border border-slate-200 rounded overflow-hidden bg-white">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-slate-800">End Date</label>
            <div className="relative flex items-center border border-slate-200 rounded overflow-hidden bg-white">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-1.5">
          <label className="block text-slate-800">Duration</label>
          <input
            type="text"
            placeholder="Duration will be calculated"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full bg-[#e2e4e7]/60 border border-slate-200 rounded px-3 py-2 text-slate-900 outline-none"
          />
        </div>

        {/* Reason */}
        <div className="space-y-1.5">
          <label className="block text-slate-800">Reason</label>
          <textarea
            rows={6}
            placeholder="Type reason here..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-slate-200 rounded px-3 py-2 text-slate-900 outline-none font-normal"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="px-6"
          >
            Apply
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TimeOffRequestPage;
