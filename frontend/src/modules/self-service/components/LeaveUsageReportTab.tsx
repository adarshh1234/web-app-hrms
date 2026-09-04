import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ReportFilterMode, LeaveUsageReportRecord } from '../../../types';
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

const LOCATION_OPTIONS = [
  { value: '', label: 'Select Location' },
  { value: 'Kochi', label: 'Kochi' },
  { value: 'Texas', label: 'Texas' },
  { value: 'Canadian Regional HQ', label: 'Canadian Regional HQ' },
];

const JOB_TITLE_OPTIONS = [
  { value: '', label: 'Select Job Title' },
  { value: 'Software Engineer', label: 'Software Engineer' },
  { value: 'Senior Product Designer', label: 'Senior Product Designer' },
  { value: 'Content Manager', label: 'Content Manager' },
  { value: 'System Analyst', label: 'System Analyst' },
];

const SUB_UNIT_OPTIONS = [
  { value: '', label: 'Select Sub Unit' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Texas R&D', label: 'Texas R&D' },
  { value: 'Administration', label: 'Administration' },
  { value: 'Human Resources', label: 'Human Resources' },
];

export const LeaveUsageReportTab: React.FC = () => {
  const toast = useToast();
  const [filterMode, setFilterMode] = useState<ReportFilterMode>('leave-type');
  const [leaveType, setLeaveType] = useState('');
  const [leavePeriod, setLeavePeriod] = useState('');
  const [location, setLocation] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [subUnit, setSubUnit] = useState('');
  const [includePastEmployees, setIncludePastEmployees] = useState(true);
  const [records, setRecords] = useState<LeaveUsageReportRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const totalDays = records.reduce((sum, r) => sum + r.leaveBalanceDays, 0);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const data = await leaveService.getLeaveUsageReport(leaveType || undefined);
      setRecords(data);
      setHasGenerated(true);
      toast.success('Report generated successfully.');
    } catch {
      toast.error('Failed to generate report.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-sm font-bold text-slate-900 m-0">Leave Entitlements and Usage Report</h2>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        {/* Toggle + Include Past */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="report-filter-mode"
                checked={filterMode === 'leave-type'}
                onChange={() => setFilterMode('leave-type')}
                className="w-4 h-4 accent-[#0473b8]"
              />
              <span className="text-xs font-semibold text-slate-700">Leave Type</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="report-filter-mode"
                checked={filterMode === 'employee'}
                onChange={() => setFilterMode('employee')}
                className="w-4 h-4 accent-[#0473b8]"
              />
              <span className="text-xs font-semibold text-slate-700">Employee</span>
            </label>
          </div>

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
            <label className="block mb-1.5">Leave Period</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={leavePeriod}
                onChange={(e) => setLeavePeriod(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                {LEAVE_PERIOD_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1.5">Location</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                {LOCATION_OPTIONS.map((opt) => (
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
            <label className="block mb-1.5">Job Title</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                {JOB_TITLE_OPTIONS.map((opt) => (
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

        {/* Generate Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>

      {/* Results Table */}
      {hasGenerated && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-600">
              ({records.length}) Records Found
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
                    <th className="px-6 py-3">Leave Type</th>
                    <th className="px-6 py-3">Leave Entitlements (Day)</th>
                    <th className="px-6 py-3">Leave Pending Approvals</th>
                    <th className="px-6 py-3">Leave Scheduled (Day)</th>
                    <th className="px-6 py-3">Leave Taken (Days)</th>
                    <th className="px-6 py-3">Leave Balance Day</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {records.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-3.5 text-slate-900">{rec.leaveType}</td>
                      <td className="px-6 py-3.5 text-slate-700">{rec.leaveEntitlementDays}</td>
                      <td className="px-6 py-3.5 text-slate-700">{rec.leavePendingApprovals}</td>
                      <td className="px-6 py-3.5 text-slate-700">{rec.leaveScheduledDays}</td>
                      <td className="px-6 py-3.5 text-slate-700">{rec.leaveTakenDays}</td>
                      <td className="px-6 py-3.5 text-slate-700">{rec.leaveBalanceDays}</td>
                    </tr>
                  ))}
                  {records.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-400 font-semibold">
                        No records found. Try adjusting filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeaveUsageReportTab;
