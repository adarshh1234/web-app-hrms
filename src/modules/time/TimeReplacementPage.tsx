import React, { useState } from 'react';
import { RefreshCw, Users, CheckCircle2, Search, Plus, Calendar } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const TimeReplacementPage: React.FC = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const replacements = [
    { id: 'REP-501', original: 'Robert Fox', substitute: 'James Wilson', dept: 'Field Operations', date: '2026-09-02', shift: 'Night Shift (22:00 - 06:00)', reason: 'Emergency Medical Cover', status: 'Approved' },
    { id: 'REP-502', name: 'Courtney Henry', substitute: 'Eleanor Pena', dept: 'Customer Support', date: '2026-09-03', shift: 'Morning Shift (08:00 - 16:00)', reason: 'Personal Leave Swap', status: 'Approved' },
    { id: 'REP-503', original: 'Arlene McCoy', substitute: 'Cody Fisher', dept: 'Logistics Hub', date: '2026-09-04', shift: 'Evening Shift (14:00 - 22:00)', reason: 'Travel Replacement', status: 'Pending Manager Sign-off' },
  ];

  const filteredReplacements = replacements.filter(r => 
    (r.original || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.substitute.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider">
            <RefreshCw className="h-3.5 w-3.5 text-teal-300" />
            <span>Shift Replacement & Cover Roster</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Replacement</h1>
          <p className="text-xs text-teal-100/80 m-0">
            Manage duty replacements, substitute shifts, emergency roster swaps, and shift transfer approvals.
          </p>
        </div>
        <button
          onClick={() => toast.info("Opening Shift Replacement Request modal...")}
          className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#004848] hover:bg-teal-50 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-sm shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Request Replacement</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500">Active Replacement Shifts</span>
          <div className="text-2xl font-extrabold text-slate-900">24 Shifts</div>
          <span className="text-[11px] font-semibold text-teal-600">Covered by qualified substitutes</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500">Pending Shift Swaps</span>
          <div className="text-2xl font-extrabold text-slate-900">5 Requests</div>
          <span className="text-[11px] font-semibold text-amber-600">Awaiting department approval</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs font-bold text-slate-500">Roster Coverage Rate</span>
          <div className="text-2xl font-extrabold text-slate-900">98.4%</div>
          <span className="text-[11px] font-semibold text-emerald-600">Zero unassigned shifts recorded</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-150 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 m-0">Shift Replacement Log</h3>
            <p className="text-xs text-slate-500 mt-0.5">Substitute shift assignments and supervisor approvals.</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search original or substitute..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 outline-none focus:bg-white focus:border-[#004848] font-semibold"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/70">
                <th className="py-3 px-4">REPLACEMENT ID</th>
                <th className="py-3 px-4">ORIGINAL EMPLOYEE</th>
                <th className="py-3 px-4">SUBSTITUTE COVER</th>
                <th className="py-3 px-4">DEPARTMENT</th>
                <th className="py-3 px-4">SHIFT DATE & TIME</th>
                <th className="py-3 px-4">REASON</th>
                <th className="py-3 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 font-semibold text-slate-700">
              {filteredReplacements.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#004848]">{r.id}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{r.original || r.name}</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">{r.substitute}</td>
                  <td className="py-3 px-4">{r.dept}</td>
                  <td className="py-3 px-4">{r.date} ({r.shift})</td>
                  <td className="py-3 px-4">{r.reason}</td>
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

export default TimeReplacementPage;
