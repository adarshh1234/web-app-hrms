import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Calendar, Pencil, Trash2 } from 'lucide-react';
import { LeaveListRecord } from '../../../types';
import leaveService from '../../../services/leaveService';
import Loader from '../../../components/common/Loader';
import { useToast } from '../../../hooks/useToast';

const LEAVE_STATUS_OPTIONS = [
  { value: '', label: 'Select Status' },
  { value: 'All', label: 'All' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Rejected', label: 'Rejected' },
];

const LEAVE_TYPE_OPTIONS = [
  { value: '', label: 'Select Leave Type' },
  { value: 'CAN-Vacation', label: 'CAN - Vacation' },
  { value: 'CAN-Personal', label: 'CAN - Personal' },
  { value: 'CAN-Sick', label: 'CAN - Sick' },
];

const SUB_UNIT_OPTIONS = [
  { value: '', label: 'Select Sub Unit' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Texas R&D', label: 'Texas R&D' },
  { value: 'Administration', label: 'Administration' },
  { value: 'Human Resources', label: 'Human Resources' },
];

export const LeaveListTab: React.FC = () => {
  const toast = useToast();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showLeaveWithStatus, setShowLeaveWithStatus] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [subUnit, setSubUnit] = useState('');
  const [includePastEmployees, setIncludePastEmployees] = useState(true);
  const [records, setRecords] = useState<LeaveListRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const totalDays = records.reduce((sum, r) => sum + r.numberOfDays, 0);

  const fetchLeaveList = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await leaveService.getLeaveList({
        leaveType: leaveType || undefined,
        status: showLeaveWithStatus || undefined,
        employeeName: employeeName || undefined,
      });
      setRecords(data);
      setHasSearched(true);
    } catch {
      toast.error('Failed to load leave list.');
    } finally {
      setIsLoading(false);
    }
  }, [leaveType, showLeaveWithStatus, employeeName, toast]);

  useEffect(() => {
    fetchLeaveList();
  }, [fetchLeaveList]);

  const handleSearch = () => {
    fetchLeaveList();
  };

  const handleReset = () => {
    setFromDate('');
    setToDate('');
    setShowLeaveWithStatus('');
    setEmployeeName('');
    setLeaveType('');
    setSubUnit('');
    setIncludePastEmployees(true);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-sm font-bold text-slate-900 m-0">Leave List</h2>

      {/* Filter Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        {/* Include Past Employees Toggle */}
        <div className="flex justify-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs font-semibold text-slate-600">Include Past Employees</span>
            <button
              type="button"
              onClick={() => setIncludePastEmployees(!includePastEmployees)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                includePastEmployees ? 'bg-[#0473b8]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  includePastEmployees ? 'translate-x-4.5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </label>
        </div>

        {/* Filter Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-slate-700">
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

          <div>
            <label className="block mb-1.5">Show Leave with Status</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={showLeaveWithStatus}
                onChange={(e) => setShowLeaveWithStatus(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                {LEAVE_STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-slate-700">
          <div>
            <label className="block mb-1.5">Employee Name</label>
            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Enter employee name"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-900 font-semibold text-xs outline-none focus:border-[#0473b8]"
            />
          </div>

          <div>
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

          <div>
            <label className="block mb-1.5">Sub Unit</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={subUnit}
                onChange={(e) => setSubUnit(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                {SUB_UNIT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white cursor-pointer"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSearch}
            disabled={isLoading}
            className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-b border-slate-200">
          <span className={`text-xs font-bold ${records.length === 0 && hasSearched ? 'text-rose-600' : 'text-slate-600'}`}>
            {records.length === 0 && hasSearched ? 'No Records Found' : `${records.length} Record(s) Found`}
          </span>
          <span className="text-xs font-bold text-slate-500">
            Total {totalDays.toFixed(2)} Day(s)
          </span>
        </div>

        {isLoading ? (
          <div className="p-6"><Loader /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-bold text-slate-800 border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Employee Name</th>
                  <th className="px-4 py-3">Leave Type</th>
                  <th className="px-4 py-3">Leave Balance</th>
                  <th className="px-4 py-3">Number of Day</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Comments</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3.5 text-slate-900">{rec.date}</td>
                    <td className="px-4 py-3.5 text-slate-700">{rec.employeeName}</td>
                    <td className="px-4 py-3.5 text-slate-700">{rec.leaveType}</td>
                    <td className="px-4 py-3.5 text-slate-700">{rec.leaveBalance}</td>
                    <td className="px-4 py-3.5 text-slate-700">{rec.numberOfDays}</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getStatusBadgeClass(rec.status)}`}>
                        {rec.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-500">{rec.comments}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="p-1 text-slate-400 hover:text-[#0473b8] transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {records.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-slate-400 font-semibold">
                      No leave records to display.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveListTab;
