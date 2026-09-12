import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Trash2, 
  Edit2, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Camera,
  Users,
  RotateCcw,
  X
} from 'lucide-react';
import { 
  Employee 
} from '../../types';
import employeeService from '../../services/employeeService';
import adminService, { JobTitleRecord, DepartmentRecord, LocationRecord } from '../../services/adminService';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { useToast } from '../../hooks/useToast';
import Badge from '../../components/common/Badge';

export const CANONICAL_EMPLOYMENT_STATUSES = [
  'Freelance',
  'Full-Time Contract',
  'Full-Time Permanent',
  'Full-Time Probation',
  'Part-Time Contract',
  'Part-Time Internship',
] as const;

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

export const EmployeePage: React.FC = () => {
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getActiveTabFromPath = (pathname: string) => {
    if (pathname.includes('/probation')) return 'probation';
    if (pathname.includes('/training')) return 'training';
    if (pathname.includes('/interns')) return 'interns';
    return 'staff';
  };

  const [activeTab, setActiveTab] = useState<'probation' | 'training' | 'interns' | 'staff'>(() => getActiveTabFromPath(location.pathname));

  useEffect(() => {
    setActiveTab(getActiveTabFromPath(location.pathname));
  }, [location.pathname]);

  // Database States
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form Open / Collapsed State
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Quick Table Search State
  const [quickSearch, setQuickSearch] = useState('');

  // Master Data Options from Admin
  const [jobTitlesList, setJobTitlesList] = useState<string[]>(['Engineering', 'Marketing', 'Sales']);
  const [departmentsList, setDepartmentsList] = useState<string[]>(['Software', 'Marketing', 'Sales']);
  const [locationsList, setLocationsList] = useState<string[]>(['Kochi', 'Texas', 'California', 'New York']);
  const [employmentStatusesList, setEmploymentStatusesList] = useState<string[]>([...CANONICAL_EMPLOYMENT_STATUSES]);

  // Search Filter States
  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchInclude, setSearchInclude] = useState('Current Employees Only');
  const [searchSupervisor, setSearchSupervisor] = useState('');
  const [searchJob, setSearchJob] = useState('');
  const [searchSubUnit, setSearchSubUnit] = useState('');

  // Add/Edit Employee Form States
  const [newFirstName, setNewFirstName] = useState('');
  const [newMiddleName, setNewMiddleName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newId, setNewId] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('+1-555-0199');
  const [newJob, setNewJob] = useState('Engineering');
  const [newSubUnit, setNewSubUnit] = useState('Software');
  const [newSupervisor, setNewSupervisor] = useState('');
  const [newEmploymentStatus, setNewEmploymentStatus] = useState<string>('Full-Time Permanent');
  const [newInclude, setNewInclude] = useState('Current Employees Only');
  const [newLocation, setNewLocation] = useState('Kochi');
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  // Edit Mode State
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load Admin Master Data
  const loadMasterData = async () => {
    try {
      const [jobs, depts, locs] = await Promise.allSettled([
        adminService.getJobTitles(),
        adminService.getDepartments(),
        adminService.getLocations(),
      ]);

      if (jobs.status === 'fulfilled' && Array.isArray(jobs.value) && jobs.value.length > 0) {
        const titles = jobs.value.map((j: JobTitleRecord) => j.title).filter(Boolean);
        if (titles.length > 0) setJobTitlesList(Array.from(new Set([...titles, 'Engineering', 'Marketing', 'Sales'])));
      }

      if (depts.status === 'fulfilled' && Array.isArray(depts.value) && depts.value.length > 0) {
        const deptNames = depts.value.map((d: DepartmentRecord) => d.name).filter(Boolean);
        if (deptNames.length > 0) setDepartmentsList(Array.from(new Set([...deptNames, 'Software', 'Marketing', 'Sales'])));
      }

      if (locs.status === 'fulfilled' && Array.isArray(locs.value) && locs.value.length > 0) {
        const locNames = locs.value.map((l: LocationRecord) => l.name || l.city).filter(Boolean);
        if (locNames.length > 0) setLocationsList(Array.from(new Set([...locNames, 'Kochi', 'Texas', 'California'])));
      }

      // Try loading admin employment statuses if available
      try {
        const VITE_API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '');
        const res = await fetch(`${VITE_API_URL}/admin/employment-statuses`);
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data) && json.data.length > 0) {
            const statuses = json.data.map((s: any) => s.status).filter(Boolean);
            if (statuses.length > 0) {
              setEmploymentStatusesList(Array.from(new Set([...statuses, ...CANONICAL_EMPLOYMENT_STATUSES])));
            }
          }
        }
      } catch {
        // Fall back to canonical statuses
      }
    } catch (e) {
      console.error('Failed to load master data:', e);
    }
  };

  const loadEmployees = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await employeeService.getAll({
        category: activeTab !== 'staff' ? activeTab : undefined,
      });
      setEmployees(data);
    } catch (err) {
      setError('Failed to load employee records.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMasterData();
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [activeTab]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const allData = await employeeService.getAll({
        search: searchName || undefined,
        employeeId: searchId || undefined,
        employmentStatus: searchStatus || undefined,
        location: searchLocation || undefined,
        supervisor: searchSupervisor || undefined,
        jobTitle: searchJob || undefined,
        subUnit: searchSubUnit || undefined,
        includeTerminated: searchInclude.includes('Terminated'),
        category: activeTab !== 'staff' ? activeTab : undefined,
      });

      let filtered = allData;
      if (searchName) {
        filtered = filtered.filter(emp => emp.name.toLowerCase().includes(searchName.toLowerCase()));
      }
      if (searchId) {
        filtered = filtered.filter(emp => emp.id.toLowerCase().includes(searchId.toLowerCase()));
      }
      if (searchStatus) {
        filtered = filtered.filter(emp => emp.employmentStatus === searchStatus);
      }
      if (searchLocation) {
        filtered = filtered.filter(emp => (emp.location || '').toLowerCase().includes(searchLocation.toLowerCase()));
      }
      if (searchSupervisor) {
        filtered = filtered.filter(emp => emp.supervisor === searchSupervisor);
      }
      if (searchJob) {
        filtered = filtered.filter(emp => emp.jobTitle === searchJob);
      }
      if (searchSubUnit) {
        filtered = filtered.filter(emp => emp.subUnit === searchSubUnit || emp.department === searchSubUnit);
      }

      setEmployees(filtered);
    } catch (err) {
      setError('Failed to filter employees.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSearch = () => {
    setSearchName('');
    setSearchId('');
    setSearchStatus('');
    setSearchLocation('');
    setSearchSupervisor('');
    setSearchJob('');
    setSearchSubUnit('');
    setSearchInclude('Current Employees Only');
    setQuickSearch('');
    loadEmployees();
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      toast.error('Invalid file format. Please upload a JPG, PNG, or GIF image.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Validate file size (1MB maximum)
    const MAX_SIZE = 1 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      toast.error('File size exceeds 1MB limit. Please upload a smaller image.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Read and preview image
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatarPreview(reader.result);
        toast.success('Profile photo loaded successfully.');
      }
    };
    reader.onerror = () => {
      toast.error('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setNewFirstName('');
    setNewMiddleName('');
    setNewLastName('');
    setNewId('');
    setNewEmail('');
    setNewPhone('+1-555-0199');
    setNewJob(jobTitlesList[0] || 'Engineering');
    setNewSubUnit(departmentsList[0] || 'Software');
    setNewSupervisor('');
    setNewEmploymentStatus(employmentStatusesList[2] || 'Full-Time Permanent');
    setNewInclude('Current Employees Only');
    setNewLocation(locationsList[0] || 'Kochi');
    setAvatarPreview('');
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSaveEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFirstName.trim() || !newLastName.trim()) {
      toast.error('First Name and Last Name are required!');
      return;
    }

    const fullName = `${newFirstName.trim()} ${newMiddleName.trim() ? newMiddleName.trim() + ' ' : ''}${newLastName.trim()}`;
    const emailToUse = newEmail.trim() || `${newFirstName.toLowerCase().trim()}.${newLastName.toLowerCase().trim()}@company.com`;
    const isTerminatedValue = newInclude === 'Include Terminated';

    try {
      if (editingId) {
        await employeeService.update(editingId, {
          name: fullName,
          firstName: newFirstName.trim(),
          middleName: newMiddleName.trim(),
          lastName: newLastName.trim(),
          email: emailToUse,
          phone: newPhone.trim(),
          jobTitle: newJob,
          department: newSubUnit,
          subUnit: newSubUnit,
          supervisor: newSupervisor,
          employmentStatus: newEmploymentStatus,
          location: newLocation,
          isTerminated: isTerminatedValue,
          avatar: avatarPreview || undefined,
        });
        toast.success('Employee details updated successfully!');
      } else {
        await employeeService.create({
          employeeId: newId.trim() || undefined,
          name: fullName,
          firstName: newFirstName.trim(),
          middleName: newMiddleName.trim(),
          lastName: newLastName.trim(),
          email: emailToUse,
          phone: newPhone.trim() || '+1-555-0199',
          department: newSubUnit,
          jobTitle: newJob,
          subUnit: newSubUnit,
          location: newLocation,
          supervisor: newSupervisor || 'None',
          employmentStatus: newEmploymentStatus,
          attendanceStatus: 'Present',
          isTerminated: isTerminatedValue,
          category: activeTab,
          avatar: avatarPreview || undefined,
        });
        toast.success('Employee added successfully!');
      }
      await loadEmployees();
      resetForm();
      setIsFormOpen(false);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save employee.');
    }
  };

  const handleStartEdit = (emp: Employee) => {
    setEditingId(emp.id);
    const names = (emp.name || '').split(' ');
    setNewFirstName(names[0] || '');
    setNewMiddleName(names.length > 2 ? names.slice(1, -1).join(' ') : '');
    setNewLastName(names.length > 1 ? names[names.length - 1] || '' : '');
    setNewId(emp.id);
    setNewEmail(emp.email || '');
    setNewPhone(emp.phone || '+1-555-0199');
    setNewJob(emp.jobTitle || 'Engineering');
    setNewSubUnit(emp.subUnit || emp.department || 'Software');
    setNewSupervisor(emp.supervisor || '');
    setNewEmploymentStatus(emp.employmentStatus || 'Full-Time Permanent');
    setNewInclude(emp.isTerminated ? 'Include Terminated' : 'Current Employees Only');
    setNewLocation(emp.location || 'Kochi');
    setAvatarPreview(emp.avatar || '');
    setIsFormOpen(true);
    
    setTimeout(() => {
      document.getElementById('add-employee-form-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeService.delete(id);
        await loadEmployees();
        toast.success('Employee removed from directory.');
      } catch (err: any) {
        toast.error(err.message || 'Failed to delete employee.');
      }
    }
  };

  // Available supervisors from actual Employee records (excluding current editing employee)
  const availableSupervisors = employees.filter(
    (emp) => !editingId || (emp.id !== editingId && (emp as any)._id !== editingId && emp.name !== newFirstName + ' ' + newLastName)
  );

  // Filter employees with quick search
  const displayedEmployees = quickSearch.trim()
    ? employees.filter((emp) => {
        const query = quickSearch.toLowerCase();
        return (
          emp.name.toLowerCase().includes(query) ||
          emp.id.toLowerCase().includes(query) ||
          (emp.jobTitle || '').toLowerCase().includes(query) ||
          (emp.subUnit || '').toLowerCase().includes(query) ||
          (emp.location || '').toLowerCase().includes(query) ||
          (emp.supervisor || '').toLowerCase().includes(query) ||
          (emp.employmentStatus || '').toLowerCase().includes(query)
        );
      })
    : employees;

  return (
    <div className="space-y-6">
      {/* Top Sub-pages Pill Navigation */}
      <div className="flex flex-wrap gap-3">
        {[
          { id: 'probation', label: 'On Probation', path: '/employees/probation' },
          { id: 'training', label: 'Training', path: '/employees/training' },
          { id: 'interns', label: 'Interns', path: '/employees/interns' },
          { id: 'staff', label: 'Staff List', path: '/employees/list' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                navigate(tab.path);
              }}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-50 text-[#0473b8] font-extrabold border border-blue-200 shadow-sm'
                  : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. Search Filter Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-sm font-bold text-slate-800">Search</h2>
          <button
            type="button"
            onClick={handleResetSearch}
            className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-[#0473b8] transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        </div>
        
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-700">
          <div>
            <label className="block mb-1">Employee Name</label>
            <input 
              type="text"
              placeholder="Search by name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            />
          </div>
          <div>
            <label className="block mb-1">Employee Id</label>
            <input 
              type="text"
              placeholder="e.g. EMP329556"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            />
          </div>
          <div>
            <label className="block mb-1">Employment Status</label>
            <select
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
              className="w-full bg-white rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            >
              <option value="">All Employment Statuses</option>
              {employmentStatusesList.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Location</label>
            <input 
              type="text"
              placeholder="Filter by location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            />
          </div>

          <div>
            <label className="block mb-1">Include</label>
            <select
              value={searchInclude}
              onChange={(e) => setSearchInclude(e.target.value)}
              className="w-full bg-white rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            >
              <option>Current Employees Only</option>
              <option>Include Terminated</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Supervisor Name</label>
            <input 
              type="text"
              list="supervisor-search-hints"
              placeholder="Type for hints..."
              value={searchSupervisor}
              onChange={(e) => setSearchSupervisor(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            />
            <datalist id="supervisor-search-hints">
              {availableSupervisors.map((sup) => (
                <option key={sup.id} value={sup.name} />
              ))}
            </datalist>
          </div>
          <div>
            <label className="block mb-1">Job Title</label>
            <select
              value={searchJob}
              onChange={(e) => setSearchJob(e.target.value)}
              className="w-full bg-white rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            >
              <option value="">All Job Titles</option>
              {jobTitlesList.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Sub Unit</label>
            <select
              value={searchSubUnit}
              onChange={(e) => setSearchSubUnit(e.target.value)}
              className="w-full bg-white rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            >
              <option value="">All Sub Units</option>
              {departmentsList.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1 sm:col-span-4 flex justify-end gap-2 pt-2">
            <button 
              type="submit"
              className="px-5 py-2 bg-[#004848] hover:bg-[#003333] text-white font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* 2. Employee List Grid Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-500">
            ({displayedEmployees.length}) Employee{displayedEmployees.length === 1 ? '' : 's'} Found
          </span>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="rounded-lg border border-slate-200 pl-8 pr-3 py-1.5 text-xs text-slate-900 outline-none focus:border-[var(--primary-color)] w-full sm:w-64"
              />
            </div>
            <button 
              onClick={() => {
                if (!isFormOpen) {
                  resetForm();
                  setIsFormOpen(true);
                  setTimeout(() => {
                    document.getElementById('add-employee-form-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                } else {
                  setIsFormOpen(false);
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#004848] hover:bg-[#003838] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-colors whitespace-nowrap"
            >
              <Plus className="h-4 w-4" />
              <span>{isFormOpen ? 'Close Form' : 'Add Employee'}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={loadEmployees} className="font-bold underline ml-2">Retry</button>
          </div>
        )}

        {isLoading ? (
          <Loader text="Loading employees..." />
        ) : displayedEmployees.length === 0 ? (
          <EmptyState title="No employees found" description="No employee records matched your criteria or directory is empty." />
        ) : (
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-750">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-550 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Employee Name</th>
                  <th className="px-6 py-4 flex items-center gap-1">
                    <span>Job Title</span>
                    <span className="text-[9px] font-semibold text-slate-400">↑↓</span>
                  </th>
                  <th className="px-6 py-4">Sub Unit</th>
                  <th className="px-6 py-4">Supervisor</th>
                  <th className="px-6 py-4">Employment Status</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {displayedEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 whitespace-nowrap font-mono font-semibold text-slate-600">{emp.id.replace('EMP', '')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center font-bold text-[8px] text-slate-600 shrink-0">
                          <img 
                            src={emp.avatar || DEFAULT_AVATAR} 
                            alt={emp.name} 
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                            }}
                          />
                        </div>
                        <span className="font-bold text-slate-800">{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-semibold">{emp.jobTitle}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-semibold">{emp.subUnit || emp.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-semibold">{emp.supervisor || 'None'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="neutral" size="sm">
                        {emp.employmentStatus || 'Full-Time Permanent'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-semibold">{emp.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => handleDelete(emp.id)}
                          className="p-1.5 bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-full border border-slate-200 transition-colors cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => handleStartEdit(emp)}
                          className="p-1.5 bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-full border border-slate-200 transition-colors cursor-pointer"
                          title="Edit Record"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        )}

        {/* Pagination Card */}
        <div className="flex justify-end items-center gap-2 pt-2">
          <button className="p-1 border border-slate-200 rounded hover:bg-slate-50 text-slate-500 cursor-pointer">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs font-bold text-slate-700 px-2 py-1 bg-slate-55 border border-slate-200 rounded">1</span>
          <button className="p-1 border border-slate-200 rounded hover:bg-slate-50 text-slate-500 cursor-pointer">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 3. Add Employee Form Section — Conditionally Rendered */}
      {isFormOpen && (
        <div id="add-employee-form-section" className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">{editingId ? 'Edit Employee Details' : 'Add Employee'}</h3>
            <div className="flex items-center gap-3">
              {/* Toggle button matching design */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isFormOpen} 
                  onChange={() => setIsFormOpen(!isFormOpen)} 
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#004848]"></div>
              </label>
              <button 
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  resetForm();
                }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Hidden Photo File Input */}
          <input 
            type="file"
            ref={fileInputRef}
            accept=".jpg,.jpeg,.png,.gif,image/jpeg,image/png,image/gif"
            className="hidden"
            onChange={handlePhotoSelect}
          />

          <form onSubmit={handleSaveEmployee} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            {/* Profile Uploader Left */}
            <div className="flex flex-col items-center justify-center space-y-3 p-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative h-28 w-28 rounded-full border-2 border-slate-200 overflow-hidden bg-white flex items-center justify-center font-bold text-slate-400 text-lg cursor-pointer hover:opacity-90 group transition-all"
              >
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Avatar Preview" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Users className="h-12 w-12 text-slate-300 group-hover:text-slate-400 transition-colors" />
                )}
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="absolute bottom-1 right-1 h-7 w-7 rounded-full bg-[#004848] hover:bg-[#003838] text-white flex items-center justify-center shadow cursor-pointer transition-colors"
                  title="Upload Photo"
                >
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              {avatarPreview && (
                <button
                  type="button"
                  onClick={() => {
                    setAvatarPreview('');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="text-[10px] text-rose-600 font-bold hover:underline cursor-pointer"
                >
                  Remove photo
                </button>
              )}
              <p className="text-[9px] text-slate-400 text-center leading-relaxed">
                Accepts .jpg, .png, .gif up to 1MB. Recommended: 200px x 200px
              </p>
            </div>

            {/* Form Details Right (3 columns) */}
            <div className="md:col-span-3 space-y-4 text-xs font-semibold text-slate-700">
              
              {/* Row 1: Employee Name */}
              <div className="space-y-1.5">
                <label className="block text-slate-800">Employee Name *</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input 
                    type="text" 
                    required
                    placeholder="First Name"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    className="w-full rounded border border-slate-200 px-3 py-2 text-slate-900 text-xs focus:border-[var(--primary-color)] outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Middle Name"
                    value={newMiddleName}
                    onChange={(e) => setNewMiddleName(e.target.value)}
                    className="w-full rounded border border-slate-200 px-3 py-2 text-slate-900 text-xs focus:border-[var(--primary-color)] outline-none"
                  />
                  <input 
                    type="text" 
                    required
                    placeholder="Last Name"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    className="w-full rounded border border-slate-200 px-3 py-2 text-slate-900 text-xs focus:border-[var(--primary-color)] outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Employee ID */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block mb-1 text-slate-800">Employee ID</label>
                  <input 
                    type="text"
                    placeholder="Auto-generated if blank"
                    value={newId}
                    onChange={(e) => setNewId(e.target.value)}
                    className="w-full rounded border border-slate-200 px-3 py-2 text-slate-900 text-xs focus:border-[var(--primary-color)] outline-none font-mono"
                  />
                </div>
              </div>

              {/* Row 3: Job Title, Sub Unit / Department, Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block mb-1 text-slate-800">Job Title</label>
                  <select
                    value={newJob}
                    onChange={(e) => setNewJob(e.target.value)}
                    className="w-full bg-white rounded border border-slate-200 px-3 py-2 text-slate-900 text-xs focus:border-[var(--primary-color)] outline-none"
                  >
                    {jobTitlesList.map((job) => (
                      <option key={job} value={job}>
                        {job}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-slate-800">Sub Unit</label>
                  <select
                    value={newSubUnit}
                    onChange={(e) => setNewSubUnit(e.target.value)}
                    className="w-full bg-white rounded border border-slate-200 px-3 py-2 text-slate-900 text-xs focus:border-[var(--primary-color)] outline-none"
                  >
                    {departmentsList.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-slate-800">Location</label>
                  <select
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-white rounded border border-slate-200 px-3 py-2 text-slate-900 text-xs focus:border-[var(--primary-color)] outline-none"
                  >
                    {locationsList.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Supervisor, Employment Status & Include */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block mb-1 text-slate-800">Supervisor Name</label>
                  <input 
                    type="text"
                    list="supervisor-form-hints"
                    placeholder="Type for hints..."
                    value={newSupervisor}
                    onChange={(e) => setNewSupervisor(e.target.value)}
                    className="w-full rounded border border-slate-200 px-3 py-2 text-slate-900 text-xs focus:border-[var(--primary-color)] outline-none"
                  />
                  <datalist id="supervisor-form-hints">
                    {availableSupervisors.map((sup) => (
                      <option key={sup.id} value={sup.name} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block mb-1 text-slate-800">Employment Status</label>
                  <select
                    value={newEmploymentStatus}
                    onChange={(e) => setNewEmploymentStatus(e.target.value)}
                    className="w-full bg-white rounded border border-slate-200 px-3 py-2 text-slate-900 text-xs focus:border-[var(--primary-color)] outline-none"
                  >
                    {employmentStatusesList.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-slate-800">Include</label>
                  <select
                    value={newInclude}
                    onChange={(e) => setNewInclude(e.target.value)}
                    className="w-full bg-white rounded border border-slate-200 px-3 py-2 text-slate-900 text-xs focus:border-[var(--primary-color)] outline-none"
                  >
                    <option>Current Employees Only</option>
                    <option>Include Terminated</option>
                  </select>
                </div>
              </div>

              {/* Cancel / Save Triggers */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => {
                    setIsFormOpen(false);
                    resetForm();
                  }}
                  className="px-5 py-2 border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-all bg-white cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-[#004848] hover:bg-[#003838] text-white font-bold rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  {editingId ? 'Update Employee' : 'Save'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeePage;
