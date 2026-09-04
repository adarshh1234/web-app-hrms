import React, { useState } from 'react';
import { ChevronDown, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LeaveRecord {
  id?: string;
  date: string;
  name: string;
  type: string;
  balance: number;
  days: number;
  status: string;
  comment: string;
}

interface MyLeaveTabProps {
  leaveRecords?: LeaveRecord[];
}

const defaultRecords: LeaveRecord[] = [
  { id: '1', date: '2025-07-20', name: 'Sarah Johnson', type: 'Annual Leave', balance: 18.5, days: 2, status: 'Approved', comment: 'Family vacation' },
  { id: '2', date: '2025-07-15', name: 'Sarah Johnson', type: 'Sick Leave', balance: 10, days: 1, status: 'Approved', comment: 'Doctor appointment' },
  { id: '3', date: '2025-06-10', name: 'Sarah Johnson', type: 'Casual Leave', balance: 6, days: 1, status: 'Rejected', comment: 'Personal work' },
];

export const MyLeaveTab: React.FC<MyLeaveTabProps> = ({ leaveRecords = defaultRecords }) => {
  const [filterLeaveType, setFilterLeaveType] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterFromDate, setFilterFromDate] = useState('');
  const [filterToDate, setFilterToDate] = useState('');

  const handleResetFilters = () => {
    setFilterLeaveType('');
    setFilterStatus('All');
    setFilterFromDate('');
    setFilterToDate('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-sm font-bold text-slate-900 m-0">My Leave History</h2>

      <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-705">
          <div>
            <label className="block mb-1.5">Leave Type</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={filterLeaveType}
                onChange={(e) => setFilterLeaveType(e.target.value)}
                className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                <option value="">All Leave Types</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1.5">Leave Status</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                <option value="All">All</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-705">
          <div>
            <label className="block mb-1.5">From Date</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <input
                type="date"
                value={filterFromDate}
                onChange={(e) => setFilterFromDate(e.target.value)}
                className="w-full px-3 py-2.5 text-slate-905 outline-none text-xs font-semibold"
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
                value={filterToDate}
                onChange={(e) => setFilterToDate(e.target.value)}
                className="w-full px-3 py-2.5 text-slate-905 outline-none text-xs font-semibold"
              />
              <div className="absolute right-3 pointer-events-none">
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={handleResetFilters}
            className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={() => {}}
            className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-bold text-slate-800 border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Employee Name</th>
                <th className="px-4 py-3">Leave Type</th>
                <th className="px-4 py-3">Leave Balance</th>
                <th className="px-4 py-3">Number of Days</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Comments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaveRecords.map((r, idx) => (
                <tr key={r.id || `leave-${idx}`} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3.5 text-slate-900">{r.date}</td>
                  <td className="px-4 py-3.5 text-slate-700">{r.name}</td>
                  <td className="px-4 py-3.5 text-slate-700">{r.type}</td>
                  <td className="px-4 py-3.5 text-slate-700">{r.balance}</td>
                  <td className="px-4 py-3.5 text-slate-700">{r.days}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        r.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : r.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500">{r.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center gap-2 pt-4">
          <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
            <ChevronLeft className="h-3 w-3" />
          </button>
          <button className="px-2.5 py-0.5 text-xs font-bold border rounded bg-blue-50 text-[#0473b8] border-blue-200">1</button>
          <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyLeaveTab;
