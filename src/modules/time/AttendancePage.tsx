import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my' | 'punch' | 'employee' | 'config'>('my');

  // Input states
  const [myRecordsDate, setMyRecordsDate] = useState('2025-07-20');
  const [punchDate, setPunchDate] = useState('2025-07-20');
  const [punchTime, setPunchTime] = useState('09:30 AM');
  const [punchNote, setPunchNote] = useState('');

  const [empSearchName, setEmpSearchName] = useState('');
  const [empSearchDate, setEmpSearchDate] = useState('2025-07-20');

  // Toggle configurations
  const [configTime, setConfigTime] = useState(true);
  const [configEdit, setConfigEdit] = useState(true);
  const [configSupervisor, setConfigSupervisor] = useState(true);

  // Pagination for employee records
  const [currentPage, setCurrentPage] = useState(1);

  // 16 rows of dummy data for employee records table
  const employeeRecordsRows = Array(16).fill({
    name: '12345qwer',
    duration: '00.00'
  });

  return (
    <div className="space-y-6">
      
      {/* 4 Navigation pills at the top */}
      <div className="flex flex-wrap gap-3">
        {[
          { id: 'my', label: 'My Records' },
          { id: 'punch', label: 'Punch In/Out' },
          { id: 'employee', label: 'Employee Records' },
          { id: 'config', label: 'Configuration' }
        ].map(pill => (
          <button
            key={pill.id}
            onClick={() => setActiveTab(pill.id as any)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === pill.id 
                ? 'bg-blue-50 text-[#0473b8] font-extrabold border border-blue-200 shadow-sm'
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Tab Panel 1: My Records */}
      {activeTab === 'my' && (
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-slate-900 m-0">My Attendance Records</h2>

          {/* Date Selector block */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            <div className="max-w-md text-xs font-bold text-slate-705">
              <label className="block mb-1.5">Date</label>
              <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <input 
                  type="date"
                  value={myRecordsDate}
                  onChange={(e) => setMyRecordsDate(e.target.value)}
                  className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => alert(`Viewing records for date: ${myRecordsDate}`)}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                View
              </button>
            </div>
          </div>

          {/* Table history block */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 m-0">Timesheets Pending Action</h3>
            
            <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="text-[10px] font-bold text-slate-400">
                (3) Records Found
              </div>

              {/* Grid Header */}
              <div className="grid grid-cols-6 px-2 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                <span>Punch In</span>
                <span>Punch In Note</span>
                <span>Punch Out</span>
                <span>Punch Out Note</span>
                <span>Duration (Hours)</span>
                <span className="text-right">Actions</span>
              </div>

              {/* Empty display */}
              <div className="bg-white border border-slate-200/50 rounded-lg p-6 text-center text-xs text-slate-400 font-bold">
                No attendance logs found for this date.
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab Panel 2: Punch In/Out */}
      {activeTab === 'punch' && (
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-slate-900 m-0">Punch In</h2>

          {/* Input details card */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-705">
              {/* Date */}
              <div>
                <label className="block mb-1.5">Date</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="date"
                    value={punchDate}
                    onChange={(e) => setPunchDate(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block mb-1.5">Time</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="text"
                    value={punchTime}
                    onChange={(e) => setPunchTime(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
                  />
                  <div className="absolute right-3 text-slate-400">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Note textarea */}
            <div className="text-xs font-bold text-slate-705">
              <label className="block mb-1.5">Note</label>
              <textarea 
                rows={4}
                value={punchNote}
                onChange={(e) => setPunchNote(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-3 text-xs font-semibold text-slate-800 outline-none focus:border-blue-400 resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => alert(`Punched successfully on ${punchDate} at ${punchTime}`)}
                className="px-8 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                In
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 3: Employee Records */}
      {activeTab === 'employee' && (
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-slate-900 m-0">Employee Attendance Records</h2>

          {/* Search filter block */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-705">
              {/* Employee Name */}
              <div>
                <label className="block mb-1.5">Employee Name</label>
                <input 
                  type="text" 
                  value={empSearchName}
                  onChange={(e) => setEmpSearchName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none text-xs font-semibold bg-white"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block mb-1.5">Date</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="date"
                    value={empSearchDate}
                    onChange={(e) => setEmpSearchDate(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => alert(`Viewing records for employee: ${empSearchName} on date: ${empSearchDate}`)}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                View
              </button>
            </div>
          </div>

          {/* Records Table */}
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="text-[10px] font-bold text-slate-400">
              (3) Records Found
            </div>

            {/* Table Headers */}
            <div className="grid grid-cols-3 px-2 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
              <span>Employee Name</span>
              <span>Total Duration (Hours)</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Table Rows (16 repeating cards) */}
            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {employeeRecordsRows.map((row, idx) => (
                <div 
                  key={idx}
                  className="grid grid-cols-3 items-center bg-white border border-slate-200 rounded-lg py-2 px-4 shadow-sm text-xs font-bold text-slate-800"
                >
                  <span>{row.name}</span>
                  <span className="text-slate-500 font-semibold">{row.duration}</span>
                  
                  <div className="flex justify-end">
                    <button 
                      onClick={() => alert(`Viewing records details for row #${idx}`)}
                      className="px-4 py-1 bg-slate-100 hover:bg-slate-200 text-slate-500 text-[10px] font-bold rounded transition-colors cursor-pointer border border-slate-200"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center gap-2 pt-2 bg-slate-100">
              <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
                <ChevronLeft className="h-3 w-3" />
              </button>
              {[1, 2, 3].map(page => (
                <button 
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2.5 py-0.5 text-xs font-bold border rounded bg-white transition-colors ${
                    currentPage === page 
                      ? 'bg-blue-50 text-[#0473b8] border-blue-200 font-extrabold'
                      : 'text-slate-650 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Tab Panel 4: Configuration */}
      {activeTab === 'config' && (
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-slate-900 m-0">Attendance Configuration</h2>

          {/* Checklist Toggles Card block */}
          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
            
            <div className="space-y-4">
              
              {/* Toggle 1 */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700">Employee can change current time when punching in/out</span>
                <button 
                  onClick={() => setConfigTime(!configTime)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
                    configTime ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                    configTime ? 'translate-x-5' : ''
                  }`} />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700">Employee can edit/delete own attendance records</span>
                <button 
                  onClick={() => setConfigEdit(!configEdit)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
                    configEdit ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                    configEdit ? 'translate-x-5' : ''
                  }`} />
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between py-2">
                <span className="text-xs font-bold text-slate-700">Supervisor can add/edit/delete attendance records of subordinates</span>
                <button 
                  onClick={() => setConfigSupervisor(!configSupervisor)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
                    configSupervisor ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                    configSupervisor ? 'translate-x-5' : ''
                  }`} />
                </button>
              </div>

            </div>

            <div className="flex justify-end pt-4">
              <button 
                onClick={() => alert("Configurations saved successfully!")}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
export default AttendancePage;
