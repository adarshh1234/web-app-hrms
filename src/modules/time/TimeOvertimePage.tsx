import React, { useState } from 'react';
import { Clock, Plus, CheckCircle2, XCircle, Search, Filter } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const TimeOvertimePage: React.FC = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const otRequests = [
    { id: 'OT-801', name: 'David Miller', dept: 'Engineering', date: '2026-08-28', hours: '4.5 hrs', multiplier: '1.5x (Weekday OT)', amount: '$202.50', status: 'Approved' },
    { id: 'OT-802', name: 'Rachel Green', dept: 'Customer Success', date: '2026-08-29', hours: '6.0 hrs', multiplier: '2.0x (Weekend OT)', amount: '$360.00', status: 'Pending Approval' },
    { id: 'OT-803', name: 'Michael Scott', dept: 'Sales', date: '2026-08-30', hours: '3.0 hrs', multiplier: '1.5x (Weekday OT)', amount: '$135.00', status: 'Approved' },
    { id: 'OT-804', name: 'Jessica Taylor', dept: 'Quality Assurance', date: '2026-08-31', hours: '5.0 hrs', multiplier: '2.0x (Holiday OT)', amount: '$300.00', status: 'Approved' },
  ];

  const filteredRequests = otRequests.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider">
            <Clock className="h-3.5 w-3.5 text-teal-300" />
            <span>Overtime & Extra Hours Management</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">OT (Overtime)</h1>
          <p className="text-xs text-teal-100/80 m-0">
            Monitor logged overtime hours, apply 1.5x / 2.0x multiplier rules, and process manager sign-offs.
          </p>
        </div>
        <button
          onClick={() => toast.info("Opening Pre-Approve OT Slot form...")}
          className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#004848] hover:bg-teal-50 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-sm shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Pre-Approve OT Slot</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500">Total OT Hours Logged (Month)</span>
          <div className="text-2xl font-extrabold text-slate-900">642.5 hrs</div>
          <span className="text-[11px] font-semibold text-teal-600">Cross-department approved OT</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500">Pending Supervisor Approvals</span>
          <div className="text-2xl font-extrabold text-slate-900">12 Requests</div>
          <span className="text-[11px] font-semibold text-amber-600">Requires manager review</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500">Total OT Payout Valuation</span>
          <div className="text-2xl font-extrabold text-slate-900">$14,280.00</div>
          <span className="text-[11px] font-semibold text-emerald-600">Calculated with multiplier rates</span>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-150 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 m-0">Overtime Log Entries</h3>
            <p className="text-xs text-slate-500 mt-0.5">Logged extra hours verified by timeclock triggers.</p>
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
                <th className="py-3 px-4">REQUEST ID</th>
                <th className="py-3 px-4">EMPLOYEE</th>
                <th className="py-3 px-4">DEPARTMENT</th>
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-4">HOURS LOGGED</th>
                <th className="py-3 px-4">RATE MULTIPLIER</th>
                <th className="py-3 px-4">CALCULATED PAY</th>
                <th className="py-3 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 font-semibold text-slate-700">
              {filteredRequests.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#004848]">{r.id}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{r.name}</td>
                  <td className="py-3 px-4">{r.dept}</td>
                  <td className="py-3 px-4">{r.date}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{r.hours}</td>
                  <td className="py-3 px-4">{r.multiplier}</td>
                  <td className="py-3 px-4 font-extrabold text-emerald-700">{r.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      r.status === 'Approved'
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

export default TimeOvertimePage;
