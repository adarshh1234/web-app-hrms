import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { LeaveBalance } from '../../../types';
import leaveService from '../../../services/leaveService';
import { useToast } from '../../../hooks/useToast';

interface ApplyLeaveTabProps {
  balances: LeaveBalance[];
  onSuccess: () => void;
  onTabChange: (tab: 'my-leave') => void;
}

export const ApplyLeaveTab: React.FC<ApplyLeaveTabProps> = ({ balances, onSuccess, onTabChange }) => {
  const toast = useToast();
  const [leaveType, setLeaveType] = useState('CAN-Vacation');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveDays, setLeaveDays] = useState(0);

  useEffect(() => {
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setLeaveDays(diffDays);
    } else {
      setLeaveDays(0);
    }
  }, [fromDate, toDate]);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromDate || !toDate) return;
    
    try {
      await leaveService.createRequest({
        employeeName: 'Sarah Johnson',
        department: 'Marketing',
        leaveType,
        fromDate,
        toDate,
        numberOfDays: leaveDays,
        comments: reason,
      });

      const updatedBalances = balances.map(bal => {
        if (bal.leaveType === leaveType) {
          return {
            ...bal,
            pending: bal.pending + leaveDays,
            balance: bal.balance - leaveDays
          };
        }
        return bal;
      });
      await leaveService.saveBalances(updatedBalances);

      onSuccess();
      toast.success("Leave request submitted successfully! Status is set to Pending.");
      setFromDate('');
      setToDate('');
      setReason('');
      onTabChange('my-leave');
    } catch (err) {
      toast.error("Failed to submit leave request.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      {/* Apply Form */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Apply Leave</h3>
        
        <form onSubmit={handleApplySubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-slate-700 block mb-1">Leave Type *</label>
              <select 
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
              >
                <option value="CAN-Vacation">CAN - Vacation</option>
                <option value="CAN-Personal">CAN - Personal</option>
                <option value="CAN-Sick">CAN - Sick</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">From Date *</label>
              <input 
                type="date"
                required
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">To Date *</label>
              <input 
                type="date"
                required
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
              />
            </div>

            {leaveDays > 0 && (
              <div className="col-span-2 bg-slate-50 border border-slate-100 rounded-lg p-3 text-xs text-slate-700">
                Calculated Duration: <span className="font-bold text-slate-900">{leaveDays} Day(s)</span>
              </div>
            )}

            <div className="col-span-2">
              <label className="text-xs font-semibold text-slate-700 block mb-1">Reason / Comment</label>
              <textarea 
                rows={3}
                placeholder="Enter reason for leave request"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button 
              type="button" 
              onClick={() => { setFromDate(''); setToDate(''); setReason(''); }}
              className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Reset
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
            >
              Apply
            </button>
          </div>
        </form>
      </div>

      {/* Quick Roster Balances info card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
          <Clock className="h-4 w-4 text-[var(--primary-color)]" />
          <span>Leave Balances</span>
        </h3>
        <div className="space-y-3">
          {balances.map(bal => (
            <div key={bal.leaveType} className="flex justify-between items-center text-xs">
              <div>
                <h4 className="font-semibold text-slate-800">{bal.leaveType}</h4>
                <p className="text-[10px] text-slate-400">Entitled: {bal.entitled}d · Pending: {bal.pending}d</p>
              </div>
              <span className="bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded text-xs border border-slate-200">
                {bal.balance} Day(s)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplyLeaveTab;
