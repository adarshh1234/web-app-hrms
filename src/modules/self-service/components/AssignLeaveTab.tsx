import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import leaveService from '../../../services/leaveService';
import { useToast } from '../../../hooks/useToast';

const LEAVE_TYPE_OPTIONS = [
  { value: '', label: 'Select Leave Type' },
  { value: 'CAN-Vacation', label: 'CAN - Vacation' },
  { value: 'CAN-Personal', label: 'CAN - Personal' },
  { value: 'CAN-Sick', label: 'CAN - Sick' },
];

export const AssignLeaveTab: React.FC = () => {
  const toast = useToast();
  const [employeeName, setEmployeeName] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const leaveBalance = 0.00;

  const handleAssign = async () => {
    if (!employeeName) {
      toast.error('Please enter employee name.');
      return;
    }
    if (!leaveType) {
      toast.error('Please select a leave type.');
      return;
    }
    if (!fromDate || !toDate) {
      toast.error('Please select both from and to dates.');
      return;
    }

    setIsSubmitting(true);
    try {
      await leaveService.assignLeave({
        employeeName,
        leaveType,
        fromDate,
        toDate,
        comment,
      });
      toast.success('Leave assigned successfully.');
      setEmployeeName('');
      setLeaveType('');
      setFromDate('');
      setToDate('');
      setComment('');
    } catch {
      toast.error('Failed to assign leave.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-sm font-bold text-slate-900 m-0">Assign Leave</h2>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        {/* Row 1: Employee Name + Leave Type + Leave Balance */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs font-bold text-slate-700">
          <div className="md:col-span-5">
            <label className="block mb-1.5">Employee Name</label>
            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Enter employee name"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-900 font-semibold text-xs outline-none focus:border-[#0473b8]"
            />
          </div>

          <div className="md:col-span-4">
            <label className="block mb-1.5">Leave Type</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                {LEAVE_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
              </div>
            </div>
          </div>

          <div className="md:col-span-3 flex items-end">
            <span className="text-xs font-semibold text-slate-500 pb-2.5">
              Leave Balance: <span className="font-bold text-slate-800">{leaveBalance.toFixed(2)} Day(s)</span>
            </span>
          </div>
        </div>

        {/* Row 2: From Date + To Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-700 max-w-xl">
          <div>
            <label className="block mb-1.5">From Date</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-2.5 text-slate-900 outline-none text-xs font-semibold"
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
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3 py-2.5 text-slate-900 outline-none text-xs font-semibold"
              />
              <div className="absolute right-3 pointer-events-none">
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Comment */}
        <div className="text-xs font-bold text-slate-700">
          <label className="block mb-1.5">Comment</label>
          <textarea
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder=""
            className="w-full border border-slate-200 rounded-lg p-3 text-slate-900 font-semibold text-xs outline-none resize-none bg-slate-50 focus:border-[#0473b8] focus:bg-white"
          />
        </div>

        {/* Assign Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAssign}
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Assigning...' : 'Assign'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignLeaveTab;
