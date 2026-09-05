import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { LocationPage } from '../employees/LocationPage';
import { DepartmentPage } from '../employees/DepartmentPage';
import OrganizationTab from './components/OrganizationTab';
import JobTitlesTab from './components/JobTitlesTab';
import adminService, {
  PayGradeRecord,
  EmpStatusRecord,
  JobCategoryRecord,
  WorkShiftRecord,
} from '../../services/adminService';

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
  const activeTab: JobTabType = tabParam && validTabs.includes(tabParam) ? tabParam : 'job';

  const setActiveTab = (tab: JobTabType) => {
    setSearchParams({ tab });
  };

  // Subtab 2: Pay Grades
  const [payGrades, setPayGrades] = useState<PayGradeRecord[]>([]);
  // Subtab 3: Employment Status
  const [empStatus, setEmpStatus] = useState<EmpStatusRecord[]>([]);
  // Subtab 4: Job Categories
  const [categories, setCategories] = useState<JobCategoryRecord[]>([]);
  // Subtab 5: Work Shifts
  const [shifts, setShifts] = useState<WorkShiftRecord[]>([]);

  useEffect(() => {
    if (activeTab === 'grades') {
      adminService.getPayGrades().then(setPayGrades).catch(() => toast.error('Failed to load pay grades'));
    } else if (activeTab === 'status') {
      adminService.getEmpStatuses().then(setEmpStatus).catch(() => toast.error('Failed to load employment statuses'));
    } else if (activeTab === 'categories') {
      adminService.getJobCategories().then(setCategories).catch(() => toast.error('Failed to load job categories'));
    } else if (activeTab === 'shifts') {
      adminService.getWorkShifts().then(setShifts).catch(() => toast.error('Failed to load work shifts'));
    }
  }, [activeTab]);

  // Handlers for Pay Grades
  const handleAddGrade = async () => {
    const name = prompt('Enter Pay Grade Name:');
    if (!name || !name.trim()) return;
    try {
      const created = await adminService.createPayGrade({ name: name.trim(), currency: 'United States Dollar' });
      setPayGrades([created, ...payGrades]);
      toast.success('Pay Grade added successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to add pay grade');
    }
  };

  const handleEditGrade = async (item: PayGradeRecord) => {
    const targetId = item.id || item._id || '';
    const newName = prompt('Update Pay Grade Name:', item.name);
    if (!newName || !newName.trim()) return;
    try {
      const updated = await adminService.updatePayGrade(targetId, { name: newName.trim() });
      setPayGrades(payGrades.map(x => (x.id === targetId || x._id === targetId) ? updated : x));
      toast.success('Pay Grade updated');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update pay grade');
    }
  };

  const handleDeleteGrade = async (id: string) => {
    if (confirm("Delete pay grade?")) {
      try {
        await adminService.deletePayGrade(id);
        setPayGrades(payGrades.filter(x => x.id !== id && x._id !== id));
        toast.success('Pay Grade deleted');
      } catch (err: any) {
        toast.error(err.message || 'Failed to delete pay grade');
      }
    }
  };

  // Handlers for Employment Status
  const handleAddStatus = async () => {
    const name = prompt('Enter Employment Status Name (e.g. Full-Time Permanent):');
    if (!name || !name.trim()) return;
    try {
      const created = await adminService.createEmpStatus({ status: name.trim() });
      setEmpStatus([created, ...empStatus]);
      toast.success('Employment Status added successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to add employment status');
    }
  };

  const handleEditStatus = async (item: EmpStatusRecord) => {
    const targetId = item.id || item._id || '';
    const newStatus = prompt('Update Employment Status Name:', item.status);
    if (!newStatus || !newStatus.trim()) return;
    try {
      const updated = await adminService.updateEmpStatus(targetId, { status: newStatus.trim() });
      setEmpStatus(empStatus.map(x => (x.id === targetId || x._id === targetId) ? updated : x));
      toast.success('Employment Status updated');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update employment status');
    }
  };

  const handleDeleteStatus = async (id: string) => {
    if (confirm("Delete employment status?")) {
      try {
        await adminService.deleteEmpStatus(id);
        setEmpStatus(empStatus.filter(x => x.id !== id && x._id !== id));
        toast.success('Employment Status deleted');
      } catch (err: any) {
        toast.error(err.message || 'Failed to delete employment status');
      }
    }
  };

  // Handlers for Job Categories
  const handleAddCategory = async () => {
    const name = prompt('Enter Job Category Name:');
    if (!name || !name.trim()) return;
    try {
      const created = await adminService.createJobCategory({ category: name.trim() });
      setCategories([created, ...categories]);
      toast.success('Job Category added successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to add job category');
    }
  };

  const handleEditCategory = async (item: JobCategoryRecord) => {
    const targetId = item.id || item._id || '';
    const newCat = prompt('Update Job Category Name:', item.category);
    if (!newCat || !newCat.trim()) return;
    try {
      const updated = await adminService.updateJobCategory(targetId, { category: newCat.trim() });
      setCategories(categories.map(x => (x.id === targetId || x._id === targetId) ? updated : x));
      toast.success('Job Category updated');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update job category');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm("Delete job category?")) {
      try {
        await adminService.deleteJobCategory(id);
        setCategories(categories.filter(x => x.id !== id && x._id !== id));
        toast.success('Job Category deleted');
      } catch (err: any) {
        toast.error(err.message || 'Failed to delete job category');
      }
    }
  };

  // Handlers for Work Shifts
  const handleAddShift = async () => {
    const name = prompt('Enter Work Shift Name (e.g. Morning Shift):');
    if (!name || !name.trim()) return;
    try {
      const created = await adminService.createWorkShift({
        name: name.trim(),
        from: '08:00 AM',
        to: '05:00 PM',
        hours: '9.00',
      });
      setShifts([created, ...shifts]);
      toast.success('Work Shift added successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to add work shift');
    }
  };

  const handleEditShift = async (item: WorkShiftRecord) => {
    const targetId = item.id || item._id || '';
    const newName = prompt('Update Work Shift Name:', item.name);
    if (!newName || !newName.trim()) return;
    try {
      const updated = await adminService.updateWorkShift(targetId, { name: newName.trim() });
      setShifts(shifts.map(x => (x.id === targetId || x._id === targetId) ? updated : x));
      toast.success('Work Shift updated');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update work shift');
    }
  };

  const handleDeleteShift = async (id: string) => {
    if (confirm("Delete work shift?")) {
      try {
        await adminService.deleteWorkShift(id);
        setShifts(shifts.filter(x => x.id !== id && x._id !== id));
        toast.success('Work Shift deleted');
      } catch (err: any) {
        toast.error(err.message || 'Failed to delete work shift');
      }
    }
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
              <span className="text-[10px] font-bold text-slate-500">({payGrades.length}) Records Found</span>
              <button 
                onClick={handleAddGrade}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
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
              {payGrades.map(g => {
                const gId = g.id || g._id || '';
                return (
                  <div 
                    key={gId}
                    className="grid grid-cols-3 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
                  >
                    <span>{g.name}</span>
                    <span className="text-slate-500 font-semibold">{g.currency}</span>
                    
                    <div className="flex justify-end gap-2.5">
                      <button onClick={() => handleEditGrade(g)} className="p-1 text-slate-400 hover:text-blue-600 cursor-pointer">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => handleDeleteGrade(gId)} className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
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
              <span className="text-[10px] font-bold text-slate-500">({empStatus.length}) Records Found</span>
              <button 
                onClick={handleAddStatus}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
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
              {empStatus.map(s => {
                const sId = s.id || s._id || '';
                return (
                  <div 
                    key={sId}
                    className="grid grid-cols-2 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
                  >
                    <span>{s.status}</span>
                    
                    <div className="flex justify-end gap-2.5">
                      <button onClick={() => handleEditStatus(s)} className="p-1 text-slate-400 hover:text-blue-600 cursor-pointer">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => handleDeleteStatus(sId)} className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
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
              <span className="text-[10px] font-bold text-slate-500">({categories.length}) Records Found</span>
              <button 
                onClick={handleAddCategory}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
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
              {categories.map(c => {
                const cId = c.id || c._id || '';
                return (
                  <div 
                    key={cId}
                    className="grid grid-cols-2 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
                  >
                    <span>{c.category}</span>
                    
                    <div className="flex justify-end gap-2.5">
                      <button onClick={() => handleEditCategory(c)} className="p-1 text-slate-400 hover:text-blue-600 cursor-pointer">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => handleDeleteCategory(cId)} className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
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
              <span className="text-[10px] font-bold text-slate-500">({shifts.length}) Records Found</span>
              <button 
                onClick={handleAddShift}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
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
              {shifts.map(s => {
                const sId = s.id || s._id || '';
                return (
                  <div 
                    key={sId}
                    className="grid grid-cols-5 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
                  >
                    <span>{s.name}</span>
                    <span className="text-slate-500 font-semibold">{s.from}</span>
                    <span className="text-slate-500 font-semibold">{s.to}</span>
                    <span>{s.hours}</span>
                    
                    <div className="flex justify-end gap-2.5">
                      <button onClick={() => handleEditShift(s)} className="p-1 text-slate-400 hover:text-blue-600 cursor-pointer">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => handleDeleteShift(sId)} className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
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
