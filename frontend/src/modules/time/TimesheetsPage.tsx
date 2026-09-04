import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface TimesheetAction {
  action: string;
  performedBy: string;
  comment: string;
}

export const TimesheetsPage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'my' | 'employee'>('my');
  const [dateRange, setDateRange] = useState('2025-07-07 to 2025-13-07');
  const [empSearchName, setEmpSearchName] = useState('');

  // Actions list for My Timesheet
  const actions: TimesheetAction[] = [
    { action: 'Submitted', performedBy: 'NewName User', comment: '2025-09-07' }
  ];

  // Timesheets Pending Action
  const pendingActions = [
    { name: '12345qwer', period: '2023-16-01 - 2023-22-01' },
    { name: '12345qwer', period: '2023-16-01 - 2023-22-01' },
    { name: '12345qwer', period: '2023-16-01 - 2023-22-01' },
    { name: '12345qwer', period: '2023-16-01 - 2023-22-01' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Tab selectors at the top */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab('my')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'my' 
              ? 'bg-blue-50 text-[#0473b8] font-extrabold border border-blue-200 shadow-sm'
              : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          My Timesheet
        </button>
        <button
          onClick={() => setActiveTab('employee')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'employee' 
              ? 'bg-blue-50 text-[#0473b8] font-extrabold border border-blue-200 shadow-sm'
              : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Employee Timesheet
        </button>
      </div>

      {/* 1. My Timesheet Tab Panel */}
      {activeTab === 'my' && (
        <div className="space-y-6">
          
          {/* Header block with Period selection */}
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-800 m-0">My Timesheets</h2>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Timesheet Period</span>
              
              <button className="p-1 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-500 bg-white">
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <div className="flex items-center gap-2 border border-slate-200 bg-white px-3 py-1 rounded-lg text-xs font-semibold text-slate-700">
                <span>{dateRange}</span>
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
              
              <button className="p-1 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-500 bg-white">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Timesheet main table */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-6">
            
            {/* Headers row */}
            <div className="grid grid-cols-10 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider text-center border-b border-slate-100 pb-2">
              <span className="text-left pl-2">Project</span>
              <span>Activity</span>
              <span>7 Mon</span>
              <span>8 Tue</span>
              <span>9 Wed</span>
              <span>10 Thu</span>
              <span>11 Fri</span>
              <span>12 Sat</span>
              <span>13 Sun</span>
              <span className="text-right pr-2">Total</span>
            </div>

            {/* Empty space indicating No Records Found */}
            <div className="py-8 text-center text-xs font-bold text-slate-400">
              No Records Found
            </div>

            {/* Footer row status and edit actions */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs font-bold">
              <span className="text-slate-550">Status: Submitted</span>
              <button 
                onClick={() => toast.info("Editing timesheet hours")}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-colors"
              >
                Edit
              </button>
            </div>

          </div>

          {/* Bottom section: Actions Performed on the Timesheet */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 m-0">Actions Performed on the Timesheet</h3>
            
            <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 space-y-2">
              {/* Header row */}
              <div className="grid grid-cols-4 px-2 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                <span>Actions</span>
                <span>Performed By</span>
                <span>Comment</span>
                <span className="text-right"></span>
              </div>

              {/* Rows */}
              {actions.map((act) => (
                <div 
                  key={`${act.action}-${act.performedBy}`}
                  className="grid grid-cols-4 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-xs text-xs font-bold text-slate-800"
                >
                  <span>{act.action}</span>
                  <span className="text-slate-500 font-semibold">{act.performedBy}</span>
                  <span className="text-slate-505 font-semibold">{act.comment}</span>
                  
                  <div className="flex justify-end">
                    <button 
                      onClick={() => toast.info("Viewing history logs")}
                      className="px-4 py-1 bg-slate-150 hover:bg-slate-200 text-slate-650 text-[10px] font-bold rounded cursor-pointer transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 2. Employee Timesheet Tab Panel matching Image 1 exactly */}
      {activeTab === 'employee' && (
        <div className="space-y-6">
          
          {/* Select Employee Card block */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 m-0">Select Employee</h2>
            
            <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
              <div className="max-w-md text-xs font-bold text-slate-700">
                <label className="block mb-1.5">Employee Name</label>
                <input 
                  type="text" 
                  value={empSearchName}
                  onChange={(e) => setEmpSearchName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none font-semibold text-xs bg-white"
                />
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={() => toast.info(`Viewing timesheet for ${empSearchName || 'Selected Employee'}`)}
                  className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  View
                </button>
              </div>
            </div>
          </div>

          {/* Timesheets Pending Action Table block */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 m-0">Timesheets Pending Action</h3>
            
            <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="text-[10px] font-bold text-slate-400">
                (3) Records Found
              </div>

              {/* Table Headers */}
              <div className="grid grid-cols-3 px-2 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                <span>Employee Name</span>
                <span>Timesheet Period</span>
                <span className="text-right">Actions</span>
              </div>

              {/* Table Rows */}
              <div className="space-y-2">
                {pendingActions.map((row) => (
                  <div 
                    key={`${row.name}-${row.period}`}
                    className="grid grid-cols-3 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
                  >
                    <span>{row.name}</span>
                    <span className="text-slate-500 font-semibold">{row.period}</span>
                    
                    <div className="flex justify-end">
                      <button 
                        onClick={() => toast.info(`Viewing pending timesheet for ${row.name}`)}
                        className="px-4 py-1.5 bg-[#85bfe2]/70 hover:bg-[#85bfe2] text-slate-750 text-[10px] font-bold rounded transition-colors cursor-pointer"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
export default TimesheetsPage;
