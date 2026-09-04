import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronDown, 
  Search, 
  FileText, 
  SlidersHorizontal,
  ClipboardList
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const PerformancePage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'manage' | 'my' | 'employee' | 'my-tracker' | 'employee-tracker'>('manage');

  // Search filter states for Manage Reviews
  const [searchEmployee, setSearchEmployee] = useState('');
  const [searchReviewer, setSearchReviewer] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchJob, setSearchJob] = useState('');
  const [searchInclude, setSearchInclude] = useState('');
  const [searchFromDate, setSearchFromDate] = useState('');
  const [searchToDate, setSearchToDate] = useState('');

  const handleResetManage = () => {
    setSearchEmployee('');
    setSearchReviewer('');
    setSearchStatus('');
    setSearchJob('');
    setSearchInclude('');
    setSearchFromDate('');
    setSearchToDate('');
  };

  return (
    <div className="space-y-6">
      {/* 5 Pill Navigation Tabs at the top */}
      <div className="flex flex-wrap gap-2.5 items-center border-b border-slate-100 pb-3">
        {([
          { id: 'manage', label: 'Manage Reviews' },
          { id: 'my', label: 'My Review' },
          { id: 'employee', label: 'Employee Review' },
          { id: 'my-tracker', label: 'My Tracker' },
          { id: 'employee-tracker', label: 'Employee Tracker' }
        ] as const).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer select-none ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] text-white font-extrabold border-transparent shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Manage Reviews Panel */}
      {activeTab === 'manage' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Manage Performance Reviews</h2>

          {/* Search Card containing 7 inputs matching design exactly */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-bold text-slate-700">
              {/* Employee Name */}
              <div>
                <label className="block mb-1">Employee Name</label>
                <input 
                  type="text" 
                  value={searchEmployee}
                  onChange={(e) => setSearchEmployee(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none text-xs"
                />
              </div>

              {/* Reviewer */}
              <div>
                <label className="block mb-1">Reviewer</label>
                <input 
                  type="text" 
                  placeholder="Type for hint"
                  value={searchReviewer}
                  onChange={(e) => setSearchReviewer(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none text-xs"
                />
              </div>

              {/* Review Status with Gray Arrow Dropdown UI */}
              <div>
                <label className="block mb-1">Review Status</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending Self Review</option>
                    <option value="Reviewing">Reviewing</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              {/* Job Title with Gray Arrow Dropdown UI */}
              <div>
                <label className="block mb-1">Job Title</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={searchJob}
                    onChange={(e) => setSearchJob(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Job Title</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              {/* Include with Gray Arrow Dropdown UI */}
              <div>
                <label className="block mb-1">Include</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={searchInclude}
                    onChange={(e) => setSearchInclude(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Include All</option>
                    <option value="Active">Active Employees Only</option>
                    <option value="Terminated">Terminated Only</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              {/* From Date */}
              <div>
                <label className="block mb-1">From Date</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="date"
                    value={searchFromDate}
                    onChange={(e) => setSearchFromDate(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none text-xs"
                  />
                </div>
              </div>

              {/* To Date */}
              <div>
                <label className="block mb-1">To Date</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="date"
                    value={searchToDate}
                    onChange={(e) => setSearchToDate(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Actions bottom right */}
            <div className="flex justify-end gap-2.5 pt-2">
              <button 
                type="button"
                onClick={handleResetManage}
                className="px-5 py-2 border border-[#0473b8] text-[#0473b8] font-bold rounded-lg hover:bg-blue-50/50 text-xs transition-all bg-white"
              >
                Reset
              </button>
              <button 
                onClick={() => toast.info("Searching reviews")}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white font-bold rounded-lg shadow-sm text-xs"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. My Review Panel matching Image 2 */}
      {activeTab === 'my' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900">My Review</h2>

          {/* Grey wrapper block container */}
          <div className="bg-[#e9eff4]/65 border border-slate-250 p-6 rounded-xl space-y-4 shadow-sm">
            <div className="text-xs font-bold text-slate-750">
              No Records Found
            </div>

            {/* Separated header row block matching Figma exactly */}
            <div className="grid grid-cols-7 border border-slate-200 bg-white rounded-lg text-[10px] font-extrabold text-slate-400 uppercase tracking-wide overflow-hidden divide-x divide-slate-150">
              <div className="py-2.5 px-4">Employee Name</div>
              <div className="py-2.5 px-4">Job Title</div>
              <div className="py-2.5 px-4">Review Period</div>
              <div className="py-2.5 px-4">Due Date</div>
              <div className="py-2.5 px-4">Reviewer</div>
              <div className="py-2.5 px-4">Review Status</div>
              <div className="py-2.5 px-4 text-right">Action</div>
            </div>

            {/* Empty table content mock display */}
            <div className="bg-white/40 border border-slate-200/50 rounded-lg p-6 flex justify-between items-center text-xs text-slate-400 font-bold">
              <span>No active logs recorded.</span>
              <button className="p-1.5 bg-slate-100 text-slate-400 hover:text-slate-650 rounded-full border border-slate-200">
                <ClipboardList className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Employee Review Panel */}
      {activeTab === 'employee' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Employee Review</h2>
          <div className="bg-white border border-slate-200 p-8 rounded-xl text-center text-xs font-bold text-slate-400">
            No active employee performance reviews scheduled.
          </div>
        </div>
      )}

      {/* 4. My Tracker Panel matching Image 3 */}
      {activeTab === 'my-tracker' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900">My Tracker</h2>

          {/* Grey wrapper card */}
          <div className="bg-[#e9eff4]/65 border border-slate-250 p-6 rounded-xl space-y-4 shadow-sm max-w-4xl">
            <div className="text-xs font-bold text-slate-700 pb-2">
              No Records Found
            </div>

            {/* List Header */}
            <div className="grid grid-cols-4 px-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              <span>Tracker</span>
              <span>Added Date</span>
              <span>Modified Date</span>
              <span className="text-right">Action</span>
            </div>

            {/* Tracker Row Item */}
            <div className="grid grid-cols-4 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-850">
              <span>Tracker for paul</span>
              <span className="text-slate-500 font-semibold">2022-01-07</span>
              <span className="text-slate-500 font-semibold">2022-31-12</span>
              <div className="flex justify-end">
                <button 
                  onClick={() => toast.info("Viewing tracker logs")}
                  className="text-blue-600 font-extrabold hover:underline"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Employee Tracker Panel */}
      {activeTab === 'employee-tracker' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Employee Tracker</h2>
          <div className="bg-white border border-slate-200 p-8 rounded-xl text-center text-xs font-bold text-slate-400">
            No active trackers configured for team members.
          </div>
        </div>
      )}
    </div>
  );
};
export default PerformancePage;
