import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const ReportPage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'project' | 'employee' | 'summary'>('project');

  // Tab 1 state
  const [projName, setProjName] = useState('');
  const [projFromDate, setProjFromDate] = useState('');
  const [projToDate, setProjToDate] = useState('');
  const [projOnlyApproved, setProjOnlyApproved] = useState(true);

  // Tab 2 state
  const [empName, setEmpName] = useState('');
  const [empProjName, setEmpProjName] = useState('');
  const [empActivity, setEmpActivity] = useState('');
  const [empFromDate, setEmpFromDate] = useState('');
  const [empToDate, setEmpToDate] = useState('');
  const [empOnlyApproved, setEmpOnlyApproved] = useState(true);

  // Tab 3 state
  const [summEmpName, setSummEmpName] = useState('');
  const [summJobTitle, setSummJobTitle] = useState('');
  const [summSubUnit, setSummSubUnit] = useState('');
  const [summEmpStatus, setSummEmpStatus] = useState('');
  const [summFromDate, setSummFromDate] = useState('');
  const [summToDate, setSummToDate] = useState('');

  return (
    <div className="space-y-6">
      
      {/* 3 Navigation pills at the top */}
      <div className="flex gap-3">
        {([
          { id: 'project', label: 'Project Report' },
          { id: 'employee', label: 'Employee Report' },
          { id: 'summary', label: 'Attendance Summery' }
        ] as const).map(pill => (
          <button
            key={pill.id}
            onClick={() => setActiveTab(pill.id)}
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

      {/* Tab Panel 1: Project Report */}
      {activeTab === 'project' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Project Report</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
            {/* Project Name */}
            <div className="max-w-md text-xs font-bold text-slate-705">
              <label className="block mb-1.5">Project Name</label>
              <input 
                type="text" 
                value={projName}
                onChange={(e) => setProjName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 outline-none text-xs font-semibold"
              />
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-slate-705">Project Date Range</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl text-xs font-semibold text-slate-500">
                <div>
                  <span className="block mb-1 font-bold text-slate-705">From</span>
                  <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <input 
                      type="date"
                      value={projFromDate}
                      onChange={(e) => setProjFromDate(e.target.value)}
                      className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <span className="block mb-1 font-bold text-slate-705">To</span>
                  <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <input 
                      type="date"
                      value={projToDate}
                      onChange={(e) => setProjToDate(e.target.value)}
                      className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Toggle switch */}
            <div className="flex items-center gap-3 text-xs font-bold text-slate-705">
              <span>Only Include Approved Timesheets</span>
              <button 
                onClick={() => setProjOnlyApproved(!projOnlyApproved)}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
                  projOnlyApproved ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                  projOnlyApproved ? 'translate-x-5' : ''
                }`} />
              </button>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-2">
              <button 
                onClick={() => toast.info("Loading project report")}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-colors"
              >
                View
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 2: Employee Report */}
      {activeTab === 'employee' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Employee Report</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
            
            {/* Employee Name */}
            <div className="max-w-md text-xs font-bold text-slate-705">
              <label className="block mb-1.5">Employee Name</label>
              <input 
                type="text" 
                value={empName}
                onChange={(e) => setEmpName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 outline-none text-xs font-semibold"
              />
            </div>

            {/* Project Name and Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl text-xs font-bold text-slate-750">
              <div>
                <label className="block mb-1.5">Project Name</label>
                <input 
                  type="text" 
                  value={empProjName}
                  onChange={(e) => setEmpProjName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1.5">Activity Name</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={empActivity}
                    onChange={(e) => setEmpActivity(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Activity</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Testing">Testing</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-slate-705">Project Date Range</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl text-xs font-semibold text-slate-500">
                <div>
                  <span className="block mb-1 font-bold text-slate-705">From</span>
                  <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <input 
                      type="date"
                      value={empFromDate}
                      onChange={(e) => setEmpFromDate(e.target.value)}
                      className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <span className="block mb-1 font-bold text-slate-705">To</span>
                  <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <input 
                      type="date"
                      value={empToDate}
                      onChange={(e) => setEmpToDate(e.target.value)}
                      className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Toggle switch */}
            <div className="flex items-center gap-3 text-xs font-bold text-slate-705">
              <span>Only Include Approved Timesheets</span>
              <button 
                onClick={() => setEmpOnlyApproved(!empOnlyApproved)}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
                  empOnlyApproved ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                  empOnlyApproved ? 'translate-x-5' : ''
                }`} />
              </button>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-2">
              <button 
                onClick={() => toast.info("Loading employee report")}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-colors"
              >
                View
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 3: Attendance Summery */}
      {activeTab === 'summary' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Attendance Total Summary Report</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
            
            {/* Employee Name and Job Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl text-xs font-bold text-slate-705">
              <div>
                <label className="block mb-1.5">Employee Name</label>
                <input 
                  type="text" 
                  value={summEmpName}
                  onChange={(e) => setSummEmpName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1.5">Job Title</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={summJobTitle}
                    onChange={(e) => setSummJobTitle(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Job Title</option>
                    <option value="Engineer">Software Engineer</option>
                    <option value="Lead">Team Lead</option>
                    <option value="HR">HR Manager</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sub Unit and Employment Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl text-xs font-bold text-slate-705">
              <div>
                <label className="block mb-1.5">Sub Unit</label>
                <input 
                  type="text" 
                  value={summSubUnit}
                  onChange={(e) => setSummSubUnit(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1.5">Employment Status</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={summEmpStatus}
                    onChange={(e) => setSummEmpStatus(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Status</option>
                    <option value="FT">Full Time</option>
                    <option value="PT">Part Time</option>
                    <option value="Contract">Contract</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-slate-705">Date Range</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl text-xs font-semibold text-slate-500">
                <div>
                  <span className="block mb-1 font-bold text-slate-705">From</span>
                  <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <input 
                      type="date"
                      value={summFromDate}
                      onChange={(e) => setSummFromDate(e.target.value)}
                      className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <span className="block mb-1 font-bold text-slate-705">To</span>
                  <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <input 
                      type="date"
                      value={summToDate}
                      onChange={(e) => setSummToDate(e.target.value)}
                      className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-2">
              <button 
                onClick={() => toast.info("Loading attendance summary report")}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-colors"
              >
                View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
export default ReportPage;
