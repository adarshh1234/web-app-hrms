import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { LocationPage } from '../employees/LocationPage';
import { DepartmentPage } from '../employees/DepartmentPage';
import OrganizationTab from './components/OrganizationTab';
import JobTitlesTab from './components/JobTitlesTab';

type JobTabType = 
  | 'job' 
  | 'grades' 
  | 'status' 
  | 'categories' 
  | 'shifts' 
  | 'locations' 
  | 'departments' 
  | 'organizations';

export const JobConfigPage: React.FC = () => {
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as JobTabType | null;
  const validTabs: JobTabType[] = ['job', 'grades', 'status', 'categories', 'shifts', 'locations', 'departments', 'organizations'];
  const activeTab: JobTabType = tabParam && validTabs.includes(tabParam)
    ? tabParam
    : 'job';

  const setActiveTab = (tab: JobTabType) => {
    setSearchParams({ tab });
  };

  // Subtab 2: Pay Grades
  const [payGrades, setPayGrades] = useState([
    { id: '1', name: '12345qwer', currency: 'United States Dollar' },
    { id: '2', name: '12345qwer', currency: 'United States Dollar' },
    { id: '3', name: '12345qwer', currency: 'United States Dollar' },
    { id: '4', name: '12345qwer', currency: 'United States Dollar' },
  ]);

  // Subtab 3: Employment Status
  const [empStatus, setEmpStatus] = useState([
    { id: '1', status: '12345qwer' },
    { id: '2', status: '12345qwer' },
    { id: '3', status: '12345qwer' },
    { id: '4', status: '12345qwer' },
  ]);

  // Subtab 4: Job Categories
  const [categories, setCategories] = useState([
    { id: '1', category: 'Craft Workers' },
    { id: '2', category: 'Laborers and Helpers' },
    { id: '3', category: 'Office and Clerical Workers' },
    { id: '4', category: 'Officials and Managers' },
  ]);

  // Subtab 5: Work Shifts
  const [shifts, setShifts] = useState([
    { id: '1', name: 'General', from: '08:00 AM', to: '05:00 PM', hours: '9.00' },
    { id: '2', name: 'General', from: '08:00 AM', to: '05:00 PM', hours: '9.00' },
  ]);

  const handleDeleteGrade = (id: string) => {
    if (confirm("Delete pay grade?")) setPayGrades(payGrades.filter(x => x.id !== id));
  };

  const handleDeleteStatus = (id: string) => {
    if (confirm("Delete employment status?")) setEmpStatus(empStatus.filter(x => x.id !== id));
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm("Delete job category?")) setCategories(categories.filter(x => x.id !== id));
  };

  const handleDeleteShift = (id: string) => {
    if (confirm("Delete work shift?")) setShifts(shifts.filter(x => x.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* 8 Tab pills at the top */}
      <div className="flex flex-wrap gap-2.5 border-b border-slate-200 pb-4">
        {[
          { id: 'job', label: 'Jobs' },
          { id: 'grades', label: 'Pay Grades' },
          { id: 'status', label: 'Employment Status' },
          { id: 'categories', label: 'Job Categories' },
          { id: 'shifts', label: 'Work Shifts' },
          { id: 'locations', label: 'Locations' },
          { id: 'departments', label: 'Departments' },
          { id: 'organizations', label: 'Organizations' }
        ].map(pill => (
          <button
            key={pill.id}
            onClick={() => setActiveTab(pill.id as JobTabType)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer select-none ${
              activeTab === pill.id 
                ? 'bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] text-white font-extrabold shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Tab Panel 1: Jobs */}
      {activeTab === 'job' && <JobTitlesTab />}

      {/* Tab Panel 2: Pay Grades */}
      {activeTab === 'grades' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Pay Grades</h2>

          <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center pb-1">
              <span className="text-[10px] font-bold text-slate-500">(3) Records Found</span>
              <button 
                onClick={() => toast.info("Add pay grade")}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors"
              >
                <Plus className="h-3 w-3" />
                <span>Add</span>
              </button>
            </div>

            {/* Table headers */}
            <div className="grid grid-cols-3 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
              <span>Name</span>
              <span>Currency</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Rows */}
            <div className="space-y-1.5">
              {payGrades.map(g => (
                <div 
                  key={g.id}
                  className="grid grid-cols-3 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
                >
                  <span>{g.name}</span>
                  <span className="text-slate-500 font-semibold">{g.currency}</span>
                  
                  <div className="flex justify-end gap-2.5">
                    <button onClick={() => toast.info(`Edit ${g.name}`)} className="p-1 text-slate-400 hover:text-blue-600">
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDeleteGrade(g.id)} className="p-1 text-slate-400 hover:text-rose-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 3: Employment Status */}
      {activeTab === 'status' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Employment Status</h2>

          <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center pb-1">
              <span className="text-[10px] font-bold text-slate-500">(3) Records Found</span>
              <button 
                onClick={() => toast.info("Add employment status")}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors"
              >
                <Plus className="h-3 w-3" />
                <span>Add</span>
              </button>
            </div>

            {/* Table headers */}
            <div className="grid grid-cols-2 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
              <span>Employment Status</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Rows */}
            <div className="space-y-1.5">
              {empStatus.map(s => (
                <div 
                  key={s.id}
                  className="grid grid-cols-2 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
                >
                  <span>{s.status}</span>
                  
                  <div className="flex justify-end gap-2.5">
                    <button onClick={() => toast.info(`Edit ${s.status}`)} className="p-1 text-slate-400 hover:text-blue-600">
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDeleteStatus(s.id)} className="p-1 text-slate-400 hover:text-rose-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 4: Job Categories */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Job Categories</h2>

          <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center pb-1">
              <span className="text-[10px] font-bold text-slate-500">(3) Records Found</span>
              <button 
                onClick={() => toast.info("Add job category")}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors"
              >
                <Plus className="h-3 w-3" />
                <span>Add</span>
              </button>
            </div>

            {/* Table headers */}
            <div className="grid grid-cols-2 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
              <span>Job Category</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Rows */}
            <div className="space-y-1.5">
              {categories.map(c => (
                <div 
                  key={c.id}
                  className="grid grid-cols-2 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
                >
                  <span>{c.category}</span>
                  
                  <div className="flex justify-end gap-2.5">
                    <button onClick={() => toast.info(`Edit ${c.category}`)} className="p-1 text-slate-400 hover:text-blue-600">
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDeleteCategory(c.id)} className="p-1 text-slate-400 hover:text-rose-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 5: Work Shifts */}
      {activeTab === 'shifts' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Work Shifts</h2>

          <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center pb-1">
              <span className="text-[10px] font-bold text-slate-500">(3) Records Found</span>
              <button 
                onClick={() => toast.info("Add work shift")}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors"
              >
                <Plus className="h-3 w-3" />
                <span>Add</span>
              </button>
            </div>

            {/* Table headers */}
            <div className="grid grid-cols-5 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
              <span>Name</span>
              <span>From</span>
              <span>To</span>
              <span>Hours Per Day</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Rows */}
            <div className="space-y-1.5">
              {shifts.map(s => (
                <div 
                  key={s.id}
                  className="grid grid-cols-5 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
                >
                  <span>{s.name}</span>
                  <span className="text-slate-500 font-semibold">{s.from}</span>
                  <span className="text-slate-500 font-semibold">{s.to}</span>
                  <span>{s.hours}</span>
                  
                  <div className="flex justify-end gap-2.5">
                    <button onClick={() => toast.info(`Edit ${s.name} shift`)} className="p-1 text-slate-400 hover:text-blue-600">
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDeleteShift(s.id)} className="p-1 text-slate-400 hover:text-rose-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 6: Locations */}
      {activeTab === 'locations' && <LocationPage />}

      {/* Tab Panel 7: Departments */}
      {activeTab === 'departments' && <DepartmentPage />}

      {/* Tab Panel 8: Organizations */}
      {activeTab === 'organizations' && <OrganizationTab />}

    </div>
  );
};
export default JobConfigPage;
