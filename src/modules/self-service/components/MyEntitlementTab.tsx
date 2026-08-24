import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Pencil, Trash2 } from 'lucide-react';
import { LeaveEntitlementRecord } from '../../../types';
import leaveService from '../../../services/leaveService';
import Loader from '../../../components/common/Loader';
import { useToast } from '../../../hooks/useToast';

const LEAVE_TYPE_OPTIONS = [
  { value: '', label: 'Select Leave Type' },
  { value: 'CAN-Vacation', label: 'CAN - Vacation' },
  { value: 'CAN-Personal', label: 'CAN - Personal' },
  { value: 'CAN-Sick', label: 'CAN - Sick' },
];

const LEAVE_PERIOD_OPTIONS = [
  { value: '', label: 'Select Leave Period' },
  { value: '2026-01-01 - 2026-12-31', label: '2026-01-01 - 2026-12-31' },
  { value: '2025-01-01 - 2025-12-31', label: '2025-01-01 - 2025-12-31' },
];

export const MyEntitlementTab: React.FC = () => {
  const toast = useToast();
  const [leaveType, setLeaveType] = useState('');
  const [leavePeriod, setLeavePeriod] = useState('');
  const [records, setRecords] = useState<LeaveEntitlementRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const totalDays = records.reduce((sum, r) => sum + r.days, 0);

  const fetchEntitlements = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await leaveService.getMyEntitlements(
        leaveType || undefined,
        leavePeriod || undefined
      );
      setRecords(data);
      setHasSearched(true);
    } catch {
      toast.error('Failed to load entitlements.');
    } finally {
      setIsLoading(false);
    }
  }, [leaveType, leavePeriod, toast]);

  useEffect(() => {
    fetchEntitlements();
  }, [fetchEntitlements]);

  const handleSave = () => {
    fetchEntitlements();
    toast.success('Entitlements filtered successfully.');
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-sm font-bold text-slate-900 m-0">My Leave Entitlements</h2>

      {/* Filter Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-700">
          <div>
            <label className="block mb-1.5">Leave Type</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                {LEAVE_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1.5">Leave Period</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={leavePeriod}
                onChange={(e) => setLeavePeriod(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                {LEAVE_PERIOD_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Summary Row */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-b border-slate-200">
          <span className="text-xs font-bold text-rose-600">
            {records.length === 0 && hasSearched ? 'No Records Found' : `${records.length} Record(s) Found`}
          </span>
          <span className="text-xs font-bold text-slate-500">
            Total {totalDays.toFixed(2)} Day(s)
          </span>
        </div>

        {isLoading ? (
          <div className="p-6">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-bold text-slate-800 border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                  <th className="px-6 py-3">Leave Type</th>
                  <th className="px-6 py-3">Entitlement Type</th>
                  <th className="px-6 py-3">Valid From</th>
                  <th className="px-6 py-3">Valid To</th>
                  <th className="px-6 py-3">Days</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-3.5 text-slate-900">{rec.leaveType}</td>
                    <td className="px-6 py-3.5 text-slate-700">{rec.entitlementType}</td>
                    <td className="px-6 py-3.5 text-slate-700">{rec.validFrom}</td>
                    <td className="px-6 py-3.5 text-slate-700">{rec.validTo}</td>
                    <td className="px-6 py-3.5 text-slate-700">{rec.days.toFixed(2)}</td>
                    <td className="px-6 py-3.5">
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
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400 font-semibold">
                      No entitlement records to display.
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

export default MyEntitlementTab;
