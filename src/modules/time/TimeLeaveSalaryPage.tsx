import React, { useState } from 'react';
import { DollarSign, Calendar, CheckCircle2, Search, Download, Plus } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const TimeLeaveSalaryPage: React.FC = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const leaveSalaryRecords = [
    { id: 'LS-901', name: 'Sophia Martinez', dept: 'Finance & Legal', leaveType: 'Earned Leave (EL)', availableBalance: '24 Days', daysEncashing: '10 Days', dailyRate: '$180.00', totalValuation: '$1,800.00', status: 'Disbursed' },
    { id: 'LS-902', name: 'Ethan Hunt', dept: 'Security & Compliance', leaveType: 'Privilege Leave (PL)', availableBalance: '18 Days', daysEncashing: '8 Days', dailyRate: '$210.00', totalValuation: '$1,680.00', status: 'Approved for Payroll' },
    { id: 'LS-903', name: 'Olivia Wilde', dept: 'Human Resources', leaveType: 'Earned Leave (EL)', availableBalance: '30 Days', daysEncashing: '15 Days', dailyRate: '$195.00', totalValuation: '$2,925.00', status: 'Disbursed' },
  ];

  const filteredRecords = leaveSalaryRecords.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider">
            <DollarSign className="h-3.5 w-3.5 text-teal-300" />
            <span>Leave Encashment & Advance Salary</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Leave Salary</h1>
          <p className="text-xs text-teal-100/80 m-0">
            Process annual leave encashment payouts, earned leave valuations, and advance leave salary disbursements.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => toast.info("Opening Leave Encashment Application form...")}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#004848] hover:bg-teal-50 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Apply Leave Encashment</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500">Total Encashable Days Approved</span>
          <div className="text-2xl font-extrabold text-slate-900">342 Days</div>
          <span className="text-[11px] font-semibold text-emerald-600">Across active company entities</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500">Total Encashment Valuation</span>
          <div className="text-2xl font-extrabold text-slate-900">$42,850.00</div>
          <span className="text-[11px] font-semibold text-teal-600">Approved for FY2026 payout</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500">Advance Leave Salary Applications</span>
          <div className="text-2xl font-extrabold text-slate-900">8 Active</div>
          <span className="text-[11px] font-semibold text-amber-600">Pending finance disbursement</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-150 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 m-0">Leave Salary Encashment Records</h3>
            <p className="text-xs text-slate-500 mt-0.5">Calculated based on daily basic pay & earned leave balances.</p>
          </div>
          <div className="relative w-full md:w-64">
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

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/70">
                <th className="py-3 px-4">RECORD ID</th>
                <th className="py-3 px-4">EMPLOYEE</th>
                <th className="py-3 px-4">DEPARTMENT</th>
                <th className="py-3 px-4">LEAVE TYPE</th>
                <th className="py-3 px-4">BALANCE</th>
                <th className="py-3 px-4">ENCASHED DAYS</th>
                <th className="py-3 px-4">VALUATION</th>
                <th className="py-3 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 font-semibold text-slate-700">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#004848]">{r.id}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{r.name}</td>
                  <td className="py-3 px-4">{r.dept}</td>
                  <td className="py-3 px-4">{r.leaveType}</td>
                  <td className="py-3 px-4 font-bold text-slate-800">{r.availableBalance}</td>
                  <td className="py-3 px-4 font-bold text-teal-700">{r.daysEncashing}</td>
                  <td className="py-3 px-4 font-extrabold text-emerald-700">{r.totalValuation}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      r.status === 'Disbursed'
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

export default TimeLeaveSalaryPage;
