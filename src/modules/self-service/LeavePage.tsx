import React, { useState } from 'react';
import { Calendar, ChevronDown, Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

export const LeavePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | 'apply' 
    | 'my-leave' 
    | 'add-ent' 
    | 'emp-ent' 
    | 'my-ent' 
    | 'report-usage' 
    | 'report-my-usage' 
    | 'config-period' 
    | 'config-type' 
    | 'config-week' 
    | 'config-holidays' 
    | 'list' 
    | 'assign'
  >('apply');

  const [entitlementsMenuOpen, setEntitlementsMenuOpen] = useState(false);
  const [reportMenuOpen, setReportMenuOpen] = useState(false);
  const [configMenuOpen, setConfigMenuOpen] = useState(false);

  // Tab 1 state
  const [applyLeaveType, setApplyLeaveType] = useState('');
  const [applyFromDate, setApplyFromDate] = useState('');
  const [applyToDate, setApplyToDate] = useState('');
  const [applyReason, setApplyReason] = useState('');

  // Tab 2 filter states
  const [filterLeaveType, setFilterLeaveType] = useState('');
  const [filterStatus, setFilterStatus] = useState('Rejected');
  const [filterFromDate, setFilterFromDate] = useState('');
  const [filterToDate, setFilterToDate] = useState('');
  const [leaveRecords, setLeaveRecords] = useState([
    { date: '04/05/2025', name: 'Sarah Jon', type: 'Payed', balance: 2, days: 1, status: 'Approved', comment: 'Sick' }
  ]);

  // Tab 3 Add Entitlement states
  const [entitlementTarget, setEntitlementTarget] = useState<'individual' | 'multiple'>('individual');
  const [entEmpName, setEntEmpName] = useState('');
  const [entLeaveType, setEntLeaveType] = useState('');
  const [entPeriod, setEntPeriod] = useState('');
  const [entAmount, setEntAmount] = useState('');

  // Tab 4 (Employee Entitlement) states
  const [empEntName, setEmpEntName] = useState('');
  const [empEntLeaveType, setEmpEntLeaveType] = useState('');
  const [empEntPeriod, setEmpEntPeriod] = useState('');

  // Tab 5 (My Entitlement) states
  const [myEntLeaveType, setMyEntLeaveType] = useState('');
  const [myEntPeriod, setMyEntPeriod] = useState('');

  // Tab 6: Report - Entitlements and Usage states
  const [reportCriteria, setReportCriteria] = useState<'type' | 'emp'>('type');
  const [reportPastEmps, setReportPastEmps] = useState(true);
  const [repLeaveType, setRepLeaveType] = useState('');
  const [repPeriod, setRepPeriod] = useState('');
  const [repLocation, setRepLocation] = useState('');
  const [repJobTitle, setRepJobTitle] = useState('');
  const [repSubUnit, setRepSubUnit] = useState('');

  // Tab 7: Report - My Entitlements and Usage states
  const [myRepPeriod, setMyRepPeriod] = useState('');
  const [myRepToggled, setMyRepToggled] = useState(true);

  // Tab 8: Configure - Period states
  const [confStartMonth, setConfStartMonth] = useState('January');
  const [confStartDate, setConfStartDate] = useState('1');

  // Tab 9: Configure - Leave Type states
  const [leaveTypes, setLeaveTypes] = useState([
    { id: '1', name: 'CAN - Bereavement' },
    { id: '2', name: 'CAN - Bereavement' },
    { id: '3', name: 'CAN - Bereavement' },
    { id: '4', name: 'CAN - Bereavement' },
    { id: '5', name: 'CAN - Bereavement' },
    { id: '6', name: 'CAN - Bereavement' },
    { id: '7', name: 'CAN - Bereavement' },
    { id: '8', name: 'CAN - Bereavement' },
    { id: '9', name: 'CAN - Bereavement' }
  ]);

  // Tab 10: Configure - Work Week states
  const [mondayWork, setMondayWork] = useState('Full Day');
  const [tuesdayWork, setTuesdayWork] = useState('Full Day');
  const [wednesdayWork, setWednesdayWork] = useState('Full Day');
  const [thursdayWork, setThursdayWork] = useState('Full Day');
  const [fridayWork, setFridayWork] = useState('Full Day');
  const [saturdayWork, setSaturdayWork] = useState('Non-Working Day');
  const [sundayWork, setSundayWork] = useState('Non-Working Day');

  // Tab 11: Configure - Holidays states
  const [holidayFrom, setHolidayFrom] = useState('');
  const [holidayTo, setHolidayTo] = useState('');
  const [holidays, setHolidays] = useState([
    { name: "New Year's Day", date: '2025-01-01', type: 'Full Day', repeats: 'Yes' },
    { name: "St. Patrick's Day (Canada)", date: '2025-01-01', type: 'Full Day', repeats: 'Yes' },
    { name: "St. George's Day (Canada)", date: '2025-01-01', type: 'Full Day', repeats: 'Yes' },
    { name: "Victoria Day (Canada)", date: '2025-01-01', type: 'Full Day', repeats: 'Yes' },
    { name: "National Aboriginal Day", date: '2025-01-01', type: 'Full Day', repeats: 'Yes' },
    { name: "June Day (Canada)", date: '2025-01-01', type: 'Full Day', repeats: 'Yes' },
    { name: "The National Holiday of Quebec", date: '2025-01-01', type: 'Full Day', repeats: 'Yes' },
    { name: "Canada Day (Canada)", date: '2025-01-01', type: 'Full Day', repeats: 'Yes' },
    { name: "Independence Day", date: '2025-01-01', type: 'Full Day', repeats: 'Yes' },
    { name: "Nunavut Day", date: '2025-01-01', type: 'Full Day', repeats: 'Yes' },
    { name: "Orangeman's Day", date: '2025-01-01', type: 'Full Day', repeats: 'Yes' },
    { name: "Remembrance Day", date: '2025-01-01', type: 'Full Day', repeats: 'Yes' }
  ]);

  // Tab 12: Leave List filters
  const [listPastEmps, setListPastEmps] = useState(true);
  const [listFromDate, setListFromDate] = useState('');
  const [listToDate, setListToDate] = useState('');
  const [listStatus, setListStatus] = useState('');
  const [listEmpName, setListEmpName] = useState('');
  const [listLeaveType, setListLeaveType] = useState('');
  const [listSubUnit, setListSubUnit] = useState('');

  // Tab 13: Assign Leave states
  const [assignEmpName, setAssignEmpName] = useState('');
  const [assignLeaveType, setAssignLeaveType] = useState('');
  const [assignFromDate, setAssignFromDate] = useState('');
  const [assignToDate, setAssignToDate] = useState('');
  const [assignComment, setAssignComment] = useState('');

  const handleApply = () => {
    if (!applyLeaveType || !applyFromDate || !applyToDate) {
      alert("Please fill in leave type and date range!");
      return;
    }
    const newRecord = {
      date: applyFromDate,
      name: 'Sarah Jon',
      type: applyLeaveType,
      balance: 2,
      days: 1,
      status: 'Pending',
      comment: applyReason
    };
    setLeaveRecords([newRecord, ...leaveRecords]);
    setApplyLeaveType('');
    setApplyFromDate('');
    setApplyToDate('');
    setApplyReason('');
    alert("Leave application submitted successfully!");
    setActiveTab('my-leave');
  };

  const handleResetFilters = () => {
    setFilterLeaveType('');
    setFilterStatus('Rejected');
    setFilterFromDate('');
    setFilterToDate('');
  };

  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Top navigation tab pills */}
      <div className="flex flex-wrap gap-3 items-center">
        
        {/* Apply Leave */}
        <button
          onClick={() => { 
            setActiveTab('apply'); 
            setEntitlementsMenuOpen(false); 
            setReportMenuOpen(false); 
            setConfigMenuOpen(false);
          }}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'apply' 
              ? 'bg-blue-50 text-[#0473b8] font-extrabold border border-blue-200 shadow-sm'
              : 'bg-white text-slate-500 border border-slate-205 hover:bg-slate-50'
          }`}
        >
          Apply Leave
        </button>

        {/* My Leave */}
        <button
          onClick={() => { 
            setActiveTab('my-leave'); 
            setEntitlementsMenuOpen(false); 
            setReportMenuOpen(false); 
            setConfigMenuOpen(false);
          }}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'my-leave' 
              ? 'bg-blue-50 text-[#0473b8] font-extrabold border border-blue-200 shadow-sm'
              : 'bg-white text-slate-500 border border-slate-205 hover:bg-slate-50'
          }`}
        >
          My Leave
        </button>

        {/* Entitlements Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setEntitlementsMenuOpen(!entitlementsMenuOpen);
              setReportMenuOpen(false);
              setConfigMenuOpen(false);
            }}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all bg-white border border-slate-205 hover:bg-slate-50 ${
              ['add-ent', 'emp-ent', 'my-ent'].includes(activeTab) 
                ? 'bg-blue-50 text-[#0473b8] border-blue-205'
                : 'text-slate-550'
            }`}
          >
            <span>Entitlements</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          
          {entitlementsMenuOpen && (
            <div className="absolute left-0 mt-1.5 w-52 bg-white border border-slate-200 rounded-lg shadow-lg z-35 py-1.5 text-xs font-bold text-slate-750">
              <button 
                onClick={() => { setActiveTab('add-ent'); setEntitlementsMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors"
              >
                Add Entitlement
              </button>
              <button 
                onClick={() => { setActiveTab('emp-ent'); setEntitlementsMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors"
              >
                Employee Entitlement
              </button>
              <button 
                onClick={() => { setActiveTab('my-ent'); setEntitlementsMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors"
              >
                My Entitlement
              </button>
            </div>
          )}
        </div>

        {/* Report Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setReportMenuOpen(!reportMenuOpen);
              setEntitlementsMenuOpen(false);
              setConfigMenuOpen(false);
            }}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all bg-white border border-slate-205 hover:bg-slate-50 ${
              ['report-usage', 'report-my-usage'].includes(activeTab) 
                ? 'bg-blue-50 text-[#0473b8] border-blue-205'
                : 'text-slate-550'
            }`}
          >
            <span>Report</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {reportMenuOpen && (
            <div className="absolute left-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-lg shadow-lg z-35 py-1.5 text-xs font-bold text-slate-750">
              <button 
                onClick={() => { setActiveTab('report-usage'); setReportMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors"
              >
                Leave Entitlements and Usage Report
              </button>
              <button 
                onClick={() => { setActiveTab('report-my-usage'); setReportMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors"
              >
                My Leave Entitlements and Usage Report
              </button>
            </div>
          )}
        </div>

        {/* Configure Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setConfigMenuOpen(!configMenuOpen);
              setEntitlementsMenuOpen(false);
              setReportMenuOpen(false);
            }}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all bg-white border border-slate-205 hover:bg-slate-50 ${
              ['config-period', 'config-type', 'config-week', 'config-holidays'].includes(activeTab) 
                ? 'bg-blue-50 text-[#0473b8] border-blue-205'
                : 'text-slate-550'
            }`}
          >
            <span>Configure</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {configMenuOpen && (
            <div className="absolute left-0 mt-1.5 w-52 bg-white border border-slate-200 rounded-lg shadow-lg z-35 py-1.5 text-xs font-bold text-slate-750">
              <button 
                onClick={() => { setActiveTab('config-period'); setConfigMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors"
              >
                Leave Period
              </button>
              <button 
                onClick={() => { setActiveTab('config-type'); setConfigMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors"
              >
                Leave Type
              </button>
              <button 
                onClick={() => { setActiveTab('config-week'); setConfigMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors"
              >
                Work Week
              </button>
              <button 
                onClick={() => { setActiveTab('config-holidays'); setConfigMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors"
              >
                Holidays
              </button>
            </div>
          )}
        </div>

        {/* Leave List */}
        <button
          onClick={() => { 
            setActiveTab('list'); 
            setEntitlementsMenuOpen(false); 
            setReportMenuOpen(false); 
            setConfigMenuOpen(false);
          }}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'list' 
              ? 'bg-blue-50 text-[#0473b8] font-extrabold border border-blue-200 shadow-sm'
              : 'bg-white text-slate-500 border border-slate-205 hover:bg-slate-50'
          }`}
        >
          Leave List
        </button>

        {/* Assign Leave */}
        <button
          onClick={() => { 
            setActiveTab('assign'); 
            setEntitlementsMenuOpen(false); 
            setReportMenuOpen(false); 
            setConfigMenuOpen(false);
          }}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'assign' 
              ? 'bg-blue-50 text-[#0473b8] font-extrabold border border-blue-200 shadow-sm'
              : 'bg-white text-slate-500 border border-slate-205 hover:bg-slate-50'
          }`}
        >
          Assign Leave
        </button>

      </div>

      {/* Tab Panel 1: Apply Leave */}
      {activeTab === 'apply' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Apply Leave</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
              
              {/* Leave Type */}
              <div>
                <label className="block mb-1.5">Leave Type</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={applyLeaveType}
                    onChange={(e) => setApplyLeaveType(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-805" />
                  </div>
                </div>
              </div>

              {/* Employee Name */}
              <div>
                <label className="block mb-1.5">Employee Name</label>
                <input 
                  type="text" 
                  disabled
                  defaultValue="Sarah Johnson"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 font-semibold text-xs outline-none"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-slate-705">
              {/* From Date */}
              <div>
                <label className="block mb-1.5">From Date</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="date"
                    value={applyFromDate}
                    onChange={(e) => setApplyFromDate(e.target.value)}
                    className="w-full px-3 py-2 text-slate-905 outline-none text-xs font-semibold"
                  />
                  <div className="absolute right-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* To Date */}
              <div>
                <label className="block mb-1.5">To Date</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="date"
                    value={applyToDate}
                    onChange={(e) => setApplyToDate(e.target.value)}
                    className="w-full px-3 py-2 text-slate-905 outline-none text-xs font-semibold"
                  />
                  <div className="absolute right-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block mb-1.5">Department</label>
                <input 
                  type="text" 
                  disabled
                  defaultValue="Engineering"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 font-semibold text-xs outline-none"
                />
              </div>
            </div>

            {/* Reason */}
            <div className="text-xs font-bold text-slate-705">
              <label className="block mb-1.5">Reason</label>
              <textarea 
                rows={5}
                value={applyReason}
                onChange={(e) => setApplyReason(e.target.value)}
                placeholder="Reason details..."
                className="w-full border border-slate-200 rounded-lg p-3 text-slate-900 font-semibold text-xs outline-none resize-none"
              />
            </div>

            {/* Submit button */}
            <div className="flex justify-end pt-2">
              <button 
                onClick={handleApply}
                className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 2: My Leave */}
      {activeTab === 'my-leave' && (
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-slate-900 m-0">My Leave</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-705">
              {/* Leave Type */}
              <div>
                <label className="block mb-1.5">Leave Type</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={filterLeaveType}
                    onChange={(e) => setFilterLeaveType(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">All Leave Types</option>
                    <option value="Payed">Payed</option>
                    <option value="Sick Leave">Sick Leave</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              {/* Show Status */}
              <div>
                <label className="block mb-1.5">Show Leave with Status</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="Rejected">Rejected</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-705">
              {/* From Date */}
              <div>
                <label className="block mb-1">From Date</label>
                <input 
                  type="date"
                  value={filterFromDate}
                  onChange={(e) => setFilterFromDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none text-xs font-semibold bg-white"
                />
              </div>

              {/* To Date */}
              <div>
                <label className="block mb-1">To Date</label>
                <input 
                  type="date"
                  value={filterToDate}
                  onChange={(e) => setFilterToDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none text-xs font-semibold bg-white"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={handleResetFilters}
                className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white"
              >
                Reset
              </button>
              <button 
                onClick={() => alert("Searching leaves...")}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              >
                Search
              </button>
            </div>

          </div>

          {/* Table Container */}
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="text-[10px] font-bold text-slate-400">
              No Records Found
            </div>

            {/* Table Headers */}
            <div className="grid grid-cols-7 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
              <span>Date</span>
              <span>Employee Name</span>
              <span>Leave Type</span>
              <span>Leave Balance (Days)</span>
              <span>Number of Days</span>
              <span>Status</span>
              <span>Comments</span>
            </div>

            {/* Table Record Row */}
            <div className="space-y-1.5">
              {leaveRecords.map((row, index) => (
                <div 
                  key={index}
                  className="grid grid-cols-7 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
                >
                  <span>{row.date}</span>
                  <span className="text-slate-550 font-semibold">{row.name}</span>
                  <span className="text-slate-550 font-semibold">{row.type}</span>
                  <span className="text-slate-550 font-semibold">{row.balance}</span>
                  <span>{row.days}</span>
                  <div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      row.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-700 border-slate-150'
                    }`}>
                      {row.status}
                    </span>
                  </div>
                  <span className="text-slate-500 font-semibold italic">{row.comment}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 3: Add Entitlement */}
      {activeTab === 'add-ent' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Add Leave Entitlement</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
            
            {/* Radios choice */}
            <div className="flex gap-6 text-xs font-bold text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="radio" 
                  name="entTarget" 
                  checked={entitlementTarget === 'individual'}
                  onChange={() => setEntitlementTarget('individual')}
                  className="text-blue-600 focus:ring-blue-400 h-4 w-4"
                />
                <span>Individual Employee</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="radio" 
                  name="entTarget" 
                  checked={entitlementTarget === 'multiple'}
                  onChange={() => setEntitlementTarget('multiple')}
                  className="text-blue-600 focus:ring-blue-400 h-4 w-4"
                />
                <span>Multiple Employees</span>
              </label>
            </div>

            {/* Fields grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
              {/* Employee Name */}
              <div>
                <label className="block mb-1.5">Employee Name</label>
                <input 
                  type="text" 
                  value={entEmpName}
                  onChange={(e) => setEntEmpName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-905 bg-white font-semibold text-xs outline-none"
                />
              </div>

              {/* Leave Type */}
              <div>
                <label className="block mb-1.5">Leave Type</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={entLeaveType}
                    onChange={(e) => setEntLeaveType(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
              {/* Leave Period */}
              <div>
                <label className="block mb-1.5">Leave Period</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={entPeriod}
                    onChange={(e) => setEntPeriod(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Period</option>
                    <option value="2025-01-01 - 2025-12-31">2025-01-01 - 2025-12-31</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              {/* Entitlement */}
              <div>
                <label className="block mb-1.5">Entitlement</label>
                <input 
                  type="text" 
                  value={entAmount}
                  onChange={(e) => setEntAmount(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-905 bg-white font-semibold text-xs outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3.5 pt-2">
              <button 
                onClick={() => alert("Entitlement addition cancelled")}
                className="px-6 py-2.5 border border-[#0473b8] bg-white hover:bg-blue-50/50 text-[#0473b8] text-xs font-bold rounded-lg shadow-sm transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => alert("Entitlement added successfully!")}
                className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 4: Employee Entitlement */}
      {activeTab === 'emp-ent' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Leave Entitlements</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-slate-705">
              {/* Employee Name */}
              <div>
                <label className="block mb-1.5">Employee Name</label>
                <input 
                  type="text" 
                  value={empEntName}
                  onChange={(e) => setEmpEntName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                />
              </div>

              {/* Leave Type */}
              <div>
                <label className="block mb-1.5">Leave Type</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={empEntLeaveType}
                    onChange={(e) => setEmpEntLeaveType(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              {/* Leave Period */}
              <div>
                <label className="block mb-1.5">Leave Period</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={empEntPeriod}
                    onChange={(e) => setEmpEntPeriod(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Period</option>
                    <option value="2025-01-01 - 2025-12-31">2025-01-01 - 2025-12-31</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-2">
              <button 
                onClick={() => alert("Employee leave entitlements retrieved and updated!")}
                className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 5: My Entitlement */}
      {activeTab === 'my-ent' && (
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-slate-900 m-0">My Leave Entitlements</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
              {/* Leave Type */}
              <div>
                <label className="block mb-1.5">Leave Type</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={myEntLeaveType}
                    onChange={(e) => setMyEntLeaveType(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              {/* Leave Period */}
              <div>
                <label className="block mb-1.5">Leave Period</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={myEntPeriod}
                    onChange={(e) => setMyEntPeriod(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Period</option>
                    <option value="2025-01-01 - 2025-12-31">2025-01-01 - 2025-12-31</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-2">
              <button 
                onClick={() => alert("Personal entitlements database query saved!")}
                className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>

          </div>

          {/* Table list below */}
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 pb-1">
              <span>No Records Found</span>
              <span>Total 0.00 Day(s)</span>
            </div>

            {/* Headers */}
            <div className="grid grid-cols-6 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
              <span>Leave Type</span>
              <span>Entitlement Type</span>
              <span>Valid From</span>
              <span>Valid To</span>
              <span>Days</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Clean empty row */}
            <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
              No active entitlements configured for current search filters.
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 6: Leave Entitlements and Usage Report */}
      {activeTab === 'report-usage' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Leave Entitlements and Usage Report</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
            
            {/* Criteria & switch header */}
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-50 pb-3 text-xs font-bold text-slate-705">
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="repCriteria" 
                    checked={reportCriteria === 'type'}
                    onChange={() => setReportCriteria('type')}
                    className="text-blue-600 focus:ring-blue-400 h-4 w-4"
                  />
                  <span>Leave Type</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="repCriteria" 
                    checked={reportCriteria === 'emp'}
                    onChange={() => setReportCriteria('emp')}
                    className="text-blue-600 focus:ring-blue-400 h-4 w-4"
                  />
                  <span>Employee</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <span>Include Past Employees</span>
                <button 
                  onClick={() => setReportPastEmps(!reportPastEmps)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
                    reportPastEmps ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform duration-300 ease-in-out ${
                    reportPastEmps ? 'translate-x-4' : ''
                  }`} />
                </button>
              </div>
            </div>

            {/* Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-slate-705">
              {/* Leave Type */}
              <div>
                <label className="block mb-1.5">Leave Type</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={repLeaveType}
                    onChange={(e) => setRepLeaveType(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-805" />
                  </div>
                </div>
              </div>

              {/* Leave Period */}
              <div>
                <label className="block mb-1.5">Leave Period</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={repPeriod}
                    onChange={(e) => setRepPeriod(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Period</option>
                    <option value="2025-01-01 - 2025-12-31">2025-01-01 - 2025-12-31</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-850" />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block mb-1.5">Location</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={repLocation}
                    onChange={(e) => setRepLocation(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Location</option>
                    <option value="Canadian Regional HQ">Canadian Regional HQ</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-850" />
                  </div>
                </div>
              </div>
            </div>

            {/* Selection Grid Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
              {/* Job Title */}
              <div>
                <label className="block mb-1.5">Job Title</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={repJobTitle}
                    onChange={(e) => setRepJobTitle(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Job Title</option>
                    <option value="Software Engineer">Software Engineer</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-850" />
                  </div>
                </div>
              </div>

              {/* Sub Unit */}
              <div>
                <label className="block mb-1.5">Sub Unit</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={repSubUnit}
                    onChange={(e) => setRepSubUnit(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Sub Unit</option>
                    <option value="Engineering">Engineering</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-850" />
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Action */}
            <div className="flex justify-end pt-2">
              <button 
                onClick={() => alert("Report generation request sent!")}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Generate
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 7: My Leave Entitlements and Usage Report */}
      {activeTab === 'report-my-usage' && (
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-slate-900 m-0">My Leave Entitlements and Usage Report</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            
            {/* Header switches */}
            <div className="flex justify-end pb-1">
              <button 
                onClick={() => setMyRepToggled(!myRepToggled)}
                className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
                  myRepToggled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform duration-300 ease-in-out ${
                  myRepToggled ? 'translate-x-4' : ''
                }`} />
              </button>
            </div>

            {/* Leave Period dropdown */}
            <div className="max-w-md text-xs font-bold text-slate-705">
              <label className="block mb-1.5">Leave Period</label>
              <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <select
                  value={myRepPeriod}
                  onChange={(e) => setMyRepPeriod(e.target.value)}
                  className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                >
                  <option value="">Select Period</option>
                  <option value="2025-01-01 - 2025-12-31">2025-01-01 - 2025-12-31</option>
                </select>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                  <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => alert("Personal usage report compiled!")}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Generate
              </button>
            </div>
          </div>

          {/* Table display matching Image 4 exact table-like structure */}
          <div className="space-y-3">
            
            {/* Info bar */}
            <div className="flex justify-between items-center bg-[#e9eff4]/65 border border-slate-205 p-3.5 rounded-xl text-xs font-bold text-slate-500 shadow-xs">
              <span>(11) Records Found</span>
              <span>Total 0.00 Day(s)</span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-slate-205 rounded-xl bg-white shadow-xs">
              <table className="w-full border-collapse bg-white text-xs font-bold text-slate-800">
                <thead>
                  <tr className="bg-slate-100 text-slate-500 text-[10px] font-extrabold uppercase divide-x divide-slate-200">
                    <th className="border-b border-slate-200 px-4 py-3 text-left">Leave Type</th>
                    <th className="border-b border-slate-200 px-4 py-3 text-left">Leave Entitlements (Day)</th>
                    <th className="border-b border-slate-200 px-4 py-3 text-left">Leave Pending Approveles</th>
                    <th className="border-b border-slate-200 px-4 py-3 text-left">Leave Scheduled (Day)</th>
                    <th className="border-b border-slate-200 px-4 py-3 text-left">Leave Taken (Days)</th>
                    <th className="border-b border-slate-200 px-4 py-3 text-left">Leave Balance Day</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {Array(11).fill(null).map((_, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 divide-x divide-slate-150">
                      <td className="px-4 py-3.5 text-slate-850 font-extrabold">CAN-Vacation</td>
                      <td className="px-4 py-3.5 text-slate-400 font-semibold"></td>
                      <td className="px-4 py-3.5 text-slate-400 font-semibold"></td>
                      <td className="px-4 py-3.5 text-slate-400 font-semibold"></td>
                      <td className="px-4 py-3.5 text-slate-400 font-semibold"></td>
                      <td className="px-4 py-3.5 text-slate-400 font-semibold"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 8: Configure - Leave Period */}
      {activeTab === 'config-period' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Leave Period</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
              {/* Start Month */}
              <div>
                <label className="block mb-1.5">Start Month</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={confStartMonth}
                    onChange={(e) => setConfStartMonth(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="January">January</option>
                    <option value="February">February</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block mb-1.5">Start Date</label>
                <input 
                  type="text" 
                  value={confStartDate}
                  onChange={(e) => setConfStartDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-905 bg-white font-semibold text-xs outline-none"
                />
              </div>
            </div>

            {/* Current period details label */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705 pt-2">
              <div>
                <span className="block text-slate-400">End Date</span>
                <span className="block mt-1.5 text-slate-800 text-xs font-semibold">December 31</span>
              </div>

              <div>
                <span className="block text-slate-400">Current Leave Period</span>
                <span className="block mt-1.5 text-[#0473b8] text-xs font-semibold">2025-01-01 to 2025-31-12</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3.5 pt-4">
              <button 
                onClick={() => alert("Period configurations reset")}
                className="px-6 py-2.5 border border-[#0473b8] bg-white hover:bg-blue-50/50 text-[#0473b8] text-xs font-bold rounded-lg shadow-sm transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => alert("Period configuration saved!")}
                className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 9: Configure - Leave Type */}
      {activeTab === 'config-type' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Leave Type</h2>

          <div className="bg-slate-100 border border-slate-205 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center pb-1">
              <span className="text-[10px] font-bold text-slate-500">No Records Found</span>
              <button 
                onClick={() => alert("Add leave type")}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="h-3 w-3" />
                <span>Add</span>
              </button>
            </div>

            {/* Headers */}
            <div className="grid grid-cols-2 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
              <span>Name</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Rows list matching Image 5 items */}
            <div className="space-y-1.5">
              {leaveTypes.map(lt => (
                <div 
                  key={lt.id}
                  className="grid grid-cols-2 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-805"
                >
                  <span>{lt.name}</span>
                  
                  <div className="flex justify-end gap-2.5">
                    <button onClick={() => alert(`Edit ${lt.name}`)} className="p-1 text-slate-400 hover:text-blue-600">
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm(`Delete ${lt.name}?`)) {
                          setLeaveTypes(leaveTypes.filter(x => x.id !== lt.id));
                        }
                      }} 
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 10: Configure - Work Week (Image 1 of this turn) */}
      {activeTab === 'config-week' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Work Week</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-5">
            
            {/* Loop through week days */}
            {[
              { label: 'Monday', value: mondayWork, setter: setMondayWork },
              { label: 'Tuesday', value: tuesdayWork, setter: setTuesdayWork },
              { label: 'Wednesday', value: wednesdayWork, setter: setWednesdayWork },
              { label: 'Thursday', value: thursdayWork, setter: setThursdayWork },
              { label: 'Friday', value: fridayWork, setter: setFridayWork },
              { label: 'Saturday', value: saturdayWork, setter: setSaturdayWork },
              { label: 'Sunday', value: sundayWork, setter: setSundayWork }
            ].map(day => (
              <div key={day.label} className="max-w-md text-xs font-bold text-slate-705">
                <label className="block mb-1.5">{day.label}</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={day.value}
                    onChange={(e) => day.setter(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="Full Day">Full Day</option>
                    <option value="Half Day">Half Day</option>
                    <option value="Non-Working Day">Non-Working Day</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>
            ))}

            {/* Save Button */}
            <div className="flex justify-end pt-2">
              <button 
                onClick={() => alert("Work week settings saved successfully!")}
                className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 11: Configure - Holidays (Image 2 of this turn) */}
      {activeTab === 'config-holidays' && (
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-slate-900 m-0">Holidays</h2>

          {/* Date Range search filter */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-705">
              <div>
                <label className="block mb-1.5">From</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="date"
                    value={holidayFrom}
                    onChange={(e) => setHolidayFrom(e.target.value)}
                    className="w-full px-3 py-2 text-slate-905 outline-none text-xs font-semibold"
                  />
                  <div className="absolute right-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5">To</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="date"
                    value={holidayTo}
                    onChange={(e) => setHolidayTo(e.target.value)}
                    className="w-full px-3 py-2 text-slate-905 outline-none text-xs font-semibold"
                  />
                  <div className="absolute right-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => { setHolidayFrom(''); setHolidayTo(''); }}
                className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white"
              >
                Reset
              </button>
              <button 
                onClick={() => alert("Searching holidays...")}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          {/* Table list */}
          <div className="bg-slate-100 border border-slate-205 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center pb-1">
              <span className="text-[10px] font-bold text-slate-500">(3) Records Found</span>
              <button 
                onClick={() => alert("Add holiday")}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="h-3 w-3" />
                <span>Add</span>
              </button>
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-5 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
              <span>Name</span>
              <span>Date</span>
              <span>Full Day/ Half Day</span>
              <span>Repeats Annually</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Rows list matching Image 2 */}
            <div className="space-y-1.5">
              {holidays.map((h, index) => (
                <div 
                  key={index}
                  className="grid grid-cols-5 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
                >
                  <span>{h.name}</span>
                  <span className="text-slate-500 font-semibold">{h.date}</span>
                  <span className="text-slate-500 font-semibold">{h.type}</span>
                  <span className="text-slate-500 font-semibold">{h.repeats}</span>
                  
                  <div className="flex justify-end gap-2.5">
                    <button onClick={() => alert(`Edit ${h.name}`)} className="p-1 text-slate-400 hover:text-blue-600">
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm(`Delete ${h.name}?`)) {
                          setHolidays(holidays.filter((_, idx) => idx !== index));
                        }
                      }} 
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 pt-2">
              <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
                <ChevronLeft className="h-3 w-3" />
              </button>
              <button className="px-2.5 py-0.5 text-xs font-bold border rounded bg-blue-50 text-[#0473b8] border-blue-200 font-extrabold">
                1
              </button>
              <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Bottom Save button */}
          <div className="flex justify-end pt-2">
            <button 
              onClick={() => alert("Holidays configuration saved!")}
              className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Save
            </button>
          </div>

        </div>
      )}

      {/* Tab Panel 12: Leave List (Image 3 of this turn) */}
      {activeTab === 'list' && (
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-slate-900 m-0">Leave List</h2>

          {/* Filters Form Card */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            
            {/* Switch Include Past Employees */}
            <div className="flex justify-end items-center gap-2 text-xs font-bold text-slate-705 pb-1">
              <span>Include Past Employees</span>
              <button 
                onClick={() => setListPastEmps(!listPastEmps)}
                className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
                  listPastEmps ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform duration-300 ease-in-out ${
                  listPastEmps ? 'translate-x-4' : ''
                }`} />
              </button>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-slate-705">
              <div>
                <label className="block mb-1.5">From Date</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="date"
                    value={listFromDate}
                    onChange={(e) => setListFromDate(e.target.value)}
                    className="w-full px-3 py-2 text-slate-905 outline-none text-xs font-semibold"
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
                    value={listToDate}
                    onChange={(e) => setListToDate(e.target.value)}
                    className="w-full px-3 py-2 text-slate-905 outline-none text-xs font-semibold"
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
                    value={listStatus}
                    onChange={(e) => setListStatus(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-slate-705">
              <div>
                <label className="block mb-1.5">Employee Name</label>
                <input 
                  type="text" 
                  value={listEmpName}
                  onChange={(e) => setListEmpName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                />
              </div>

              <div>
                <label className="block mb-1.5">Leave Type</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={listLeaveType}
                    onChange={(e) => setListLeaveType(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Type</option>
                    <option value="Annual Leave">Annual Leave</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Sub Unit</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={listSubUnit}
                    onChange={(e) => setListSubUnit(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Sub Unit</option>
                    <option value="Engineering">Engineering</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => {
                  setListFromDate('');
                  setListToDate('');
                  setListStatus('');
                  setListEmpName('');
                  setListLeaveType('');
                  setListSubUnit('');
                }}
                className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white"
              >
                Reset
              </button>
              <button 
                onClick={() => alert("Searching leaves list logs...")}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              >
                Search
              </button>
            </div>

          </div>

          {/* Table grid below */}
          <div className="bg-slate-100 border border-slate-205 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 pb-1">
              <span>No Records Found</span>
              <span>Total 0.00 Day(s)</span>
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-8 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
              <span>Date</span>
              <span>Employee Name</span>
              <span>Leave Type</span>
              <span>Leave Balance</span>
              <span>Number of Day</span>
              <span>Status</span>
              <span>Comments</span>
              <span className="text-right">Action</span>
            </div>

            {/* Empty Row */}
            <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
              No leave records found.
            </div>

          </div>

        </div>
      )}

      {/* Tab Panel 13: Assign Leave (Image 4 of this turn) */}
      {activeTab === 'assign' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Assign Leave</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
              {/* Employee Name */}
              <div>
                <label className="block mb-1.5">Employee Name</label>
                <input 
                  type="text" 
                  value={assignEmpName}
                  onChange={(e) => setAssignEmpName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                />
              </div>

              {/* Leave Type */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block">Leave Type</label>
                  <span className="text-[10px] text-slate-400 font-bold">Leave Balance: 0.00 Day(s)</span>
                </div>
                
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={assignLeaveType}
                    onChange={(e) => setAssignLeaveType(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
              {/* From Date */}
              <div>
                <label className="block mb-1.5">From Date</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="date"
                    value={assignFromDate}
                    onChange={(e) => setAssignFromDate(e.target.value)}
                    className="w-full px-3 py-2.5 text-slate-905 outline-none text-xs font-semibold"
                  />
                  <div className="absolute right-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* To Date */}
              <div>
                <label className="block mb-1.5">To Date</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="date"
                    value={assignToDate}
                    onChange={(e) => setAssignToDate(e.target.value)}
                    className="w-full px-3 py-2.5 text-slate-905 outline-none text-xs font-semibold"
                  />
                  <div className="absolute right-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Comment */}
            <div className="text-xs font-bold text-slate-705">
              <label className="block mb-1.5">Comment</label>
              <textarea 
                rows={5}
                value={assignComment}
                onChange={(e) => setAssignComment(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-3 text-slate-900 font-semibold text-xs outline-none resize-none bg-slate-50/50"
              />
            </div>

            {/* Assign Button */}
            <div className="flex justify-end pt-2">
              <button 
                onClick={() => {
                  if (!assignEmpName || !assignLeaveType) {
                    alert("Please fill in employee name and leave type!");
                    return;
                  }
                  alert(`Leave type ${assignLeaveType} assigned to ${assignEmpName} successfully!`);
                  setAssignEmpName('');
                  setAssignLeaveType('');
                  setAssignFromDate('');
                  setAssignToDate('');
                  setAssignComment('');
                }}
                className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Assign
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
export default LeavePage;
