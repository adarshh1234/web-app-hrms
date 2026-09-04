import React, { useState } from 'react';
import { Clock, DollarSign, CheckCircle2, RefreshCw, Download, Filter, Search } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const TimePayrollPage: React.FC = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const records = [
    { id: 'TP-101', name: 'Sarah Jenkins', dept: 'Engineering', daysPresent: 22, paidLeave: 1, shiftAllowance: '$250', netAdjustment: '+$3,850', status: 'Processed' },
    { id: 'TP-102', name: 'Alex Rivera', dept: 'Operations', daysPresent: 21, paidLeave: 2, shiftAllowance: '$180', netAdjustment: '+$3,420', status: 'Processed' },
    { id: 'TP-103', name: 'Marcus Chen', dept: 'Product Design', daysPresent: 20, paidLeave: 0, shiftAllowance: '$0', netAdjustment: '+$3,100', status: 'Pending Sync' },
    { id: 'TP-104', name: 'Emily Watson', dept: 'Quality Assurance', daysPresent: 23, paidLeave: 0, shiftAllowance: '$320', netAdjustment: '+$4,150', status: 'Processed' },
  ];

  const filteredRecords = records.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider">
            <Clock className="h-3.5 w-3.5 text-teal-300" />
            <span>Time & Attendance Integration</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Time Payroll</h1>
          <p className="text-xs text-teal-100/80 m-0">
            Attendance-linked payroll adjustments, shift differential allowances, and timesheet deductions.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => toast.success("Recalculating time-linked payroll balances...")}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold backdrop-blur-md transition-all text-white cursor-pointer"
          >
            <RefreshCw className="h-4 w-4 text-teal-300" />
            <span>Calculate Time Payroll</span>
          </button>
          <button
            onClick={() => toast.info("Exporting time payroll summary feed...")}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#004848] hover:bg-teal-50 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-sm"
          >
            <Download className="h-4 w-4" />
            <span>Export Feed</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500">Total Payable Hours Logged</span>
          <div className="text-2xl font-extrabold text-slate-900">14,820 hrs</div>
          <span className="text-[11px] font-semibold text-emerald-600">99.2% attendance compliance</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500">Shift Differential Allowance</span>
          <div className="text-2xl font-extrabold text-slate-900">$18,450</div>
          <span className="text-[11px] font-semibold text-teal-600">Night & weekend shift bonuses</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500">Unpaid LOP Deductions</span>
          <div className="text-2xl font-extrabold text-slate-900">-$2,120</div>
          <span className="text-[11px] font-semibold text-amber-600">Applied for unapproved absences</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-150 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 m-0">Time Payroll Calculations</h3>
            <p className="text-xs text-slate-500 mt-0.5">Verified monthly attendance timesheet payouts.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search employee or department..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 outline-none focus:bg-white focus:border-[#004848] font-semibold"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/70">
                <th className="py-3 px-4">RECORD ID</th>
                <th className="py-3 px-4">EMPLOYEE</th>
                <th className="py-3 px-4">DEPARTMENT</th>
                <th className="py-3 px-4">PRESENT DAYS</th>
                <th className="py-3 px-4">SHIFT ALLOWANCE</th>
                <th className="py-3 px-4">NET ADJUSTMENT</th>
                <th className="py-3 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 font-semibold text-slate-700">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#004848]">{r.id}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{r.name}</td>
                  <td className="py-3 px-4">{r.dept}</td>
                  <td className="py-3 px-4">{r.daysPresent} Days ({r.paidLeave} Paid Leave)</td>
                  <td className="py-3 px-4">{r.shiftAllowance}</td>
                  <td className="py-3 px-4 font-extrabold text-emerald-700">{r.netAdjustment}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      r.status === 'Processed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{r.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimePayrollPage;
