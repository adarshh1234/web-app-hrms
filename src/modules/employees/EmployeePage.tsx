import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Trash2, 
  Edit2, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Upload,
  Users
} from 'lucide-react';
import { 
  getEmployees, 
  saveEmployees, 
  Employee 
} from '../../data/mockData';

export const EmployeePage: React.FC = () => {
  // Database States
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Search Filter States
  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchInclude, setSearchInclude] = useState('Current Employees Only');
  const [searchSupervisor, setSearchSupervisor] = useState('');
  const [searchJob, setSearchJob] = useState('');
  const [searchSubUnit, setSearchSubUnit] = useState('');

  // Add Employee Form States
  const [newFirstName, setNewFirstName] = useState('');
  const [newMiddleName, setNewMiddleName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newId, setNewId] = useState('');
  const [newJob, setNewJob] = useState('Engineering');
  const [newSubUnit, setNewSubUnit] = useState('Software');
  const [newSupervisor, setNewSupervisor] = useState('');
  const [newLocation, setNewLocation] = useState('Kochi');

  // Edit Mode States
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setEmployees(getEmployees());
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let filtered = getEmployees();
    if (searchName) {
      filtered = filtered.filter(emp => emp.name.toLowerCase().includes(searchName.toLowerCase()));
    }
    if (searchId) {
      filtered = filtered.filter(emp => emp.id.includes(searchId));
    }
    if (searchStatus) {
      filtered = filtered.filter(emp => emp.attendanceStatus === searchStatus);
    }
    if (searchLocation) {
      filtered = filtered.filter(emp => emp.location.toLowerCase().includes(searchLocation.toLowerCase()));
    }
    if (searchSupervisor) {
      filtered = filtered.filter(emp => emp.supervisor === searchSupervisor);
    }
    if (searchJob) {
      filtered = filtered.filter(emp => emp.jobTitle === searchJob);
    }
    if (searchSubUnit) {
      filtered = filtered.filter(emp => emp.subUnit === searchSubUnit);
    }
    setEmployees(filtered);
  };

  const handleResetSearch = () => {
    setSearchName('');
    setSearchId('');
    setSearchStatus('');
    setSearchLocation('');
    setSearchSupervisor('');
    setSearchJob('');
    setSearchSubUnit('');
    setEmployees(getEmployees());
  };

  const handleSaveEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFirstName.trim() || !newLastName.trim()) {
      alert("First Name and Last Name are required!");
      return;
    }

    const fullName = `${newFirstName} ${newMiddleName ? newMiddleName + ' ' : ''}${newLastName}`;
    const generatedId = newId.trim() || `EMP${Math.floor(100000 + Math.random() * 900000)}`;

    const list = getEmployees();

    if (editingId) {
      // Update
      const updated = list.map(emp => {
        if (emp.id === editingId) {
          return {
            ...emp,
            name: fullName,
            jobTitle: newJob,
            subUnit: newSubUnit,
            supervisor: newSupervisor,
            location: newLocation
          };
        }
        return emp;
      });
      setEmployees(updated);
      saveEmployees(updated);
      setEditingId(null);
      alert("Employee details updated successfully!");
    } else {
      // Create
      const newEmp: Employee = {
        id: generatedId,
        name: fullName,
        email: `${newFirstName.toLowerCase()}@company.com`,
        phone: '+1-555-0199',
        department: newSubUnit,
        jobTitle: newJob,
        subUnit: newSubUnit,
        location: newLocation,
        supervisor: newSupervisor || 'None',
        employmentStatus: 'Full-Time',
        attendanceStatus: 'Present'
      };
      const updated = [...list, newEmp];
      setEmployees(updated);
      saveEmployees(updated);
      alert("Employee added successfully!");
    }

    // Reset Form
    setNewFirstName('');
    setNewMiddleName('');
    setNewLastName('');
    setNewId('');
  };

  const handleStartEdit = (emp: Employee) => {
    setEditingId(emp.id);
    const names = emp.name.split(' ');
    setNewFirstName(names[0] || '');
    setNewMiddleName(names.length > 2 ? names[1] || '' : '');
    setNewLastName(names.length > 1 ? names[names.length - 1] || '' : '');
    setNewId(emp.id);
    setNewJob(emp.jobTitle);
    setNewSubUnit(emp.subUnit);
    setNewSupervisor(emp.supervisor);
    setNewLocation(emp.location);
    
    // Scroll to form
    document.getElementById('add-employee-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      const updated = getEmployees().filter(e => e.id !== id);
      setEmployees(updated);
      saveEmployees(updated);
      alert("Employee removed from directory.");
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Search Collapsible Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Search</h2>
        
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-700">
          <div>
            <label className="block mb-1">Employee Name</label>
            <input 
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            />
          </div>
          <div>
            <label className="block mb-1">Employee Id</label>
            <input 
              type="text"
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
              <option value="">All Statuses</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="On-Leave">On-Leave</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Location</label>
            <input 
              type="text"
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
            <select
              value={searchSupervisor}
              onChange={(e) => setSearchSupervisor(e.target.value)}
              className="w-full bg-white rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            >
              <option value="">Select Supervisor</option>
              <option value="Amal Benny">Amal Benny</option>
              <option value="Alexa">Alexa</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Job Title</label>
            <select
              value={searchJob}
              onChange={(e) => setSearchJob(e.target.value)}
              className="w-full bg-white rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            >
              <option value="">Select Job</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Sub Unit</label>
            <select
              value={searchSubUnit}
              onChange={(e) => setSearchSubUnit(e.target.value)}
              className="w-full bg-white rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            >
              <option value="">Select Sub Unit</option>
              <option value="Software">Software</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="col-span-4 flex justify-end gap-2 pt-2">
            <button 
              type="submit"
              className="px-5 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white font-bold rounded-lg shadow-sm"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* 2. Employee List Grid Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex justify-end">
          <button 
            onClick={() => {
              setEditingId(null);
              setNewFirstName('');
              setNewMiddleName('');
              setNewLastName('');
              setNewId('');
              document.getElementById('add-employee-form-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Employee</span>
          </button>
        </div>

        {/* Table layout matching Figma exactly */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
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
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-500">{emp.id.replace('EMP', '')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center font-bold text-[8px] text-slate-600 shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                          alt={emp.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-bold text-slate-800">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-semibold">{emp.jobTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-semibold">{emp.subUnit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-semibold">{emp.supervisor || ''}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                      emp.attendanceStatus === 'Present' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      emp.attendanceStatus === 'Late' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-rose-50 text-rose-700 border-rose-100'
                    }`}>
                      {emp.attendanceStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-semibold">{emp.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-1.5">
                      <button 
                        onClick={() => handleDelete(emp.id)}
                        className="p-1 bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-full border border-slate-200 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <button 
                        onClick={() => handleStartEdit(emp)}
                        className="p-1 bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-full border border-slate-200 transition-colors"
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

        {/* Pagination Card */}
        <div className="flex justify-end items-center gap-2 pt-2">
          <button className="p-1 border border-slate-200 rounded hover:bg-slate-50 text-slate-500">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs font-bold text-slate-700 px-2 py-1 bg-slate-55 border border-slate-200 rounded">1</span>
          <button className="p-1 border border-slate-200 rounded hover:bg-slate-50 text-slate-500">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 3. Add Employee Form Section */}
      <div id="add-employee-form-section" className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">{editingId ? 'Edit Employee details' : 'Add Employee'}</h3>
          {/* Toggle button from Figma */}
          <div className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
          </div>
        </div>

        <form onSubmit={handleSaveEmployee} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          {/* Profile Uploader Left */}
          <div className="flex flex-col items-center justify-center space-y-3 p-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <div className="relative h-28 w-28 rounded-full border border-slate-200 overflow-hidden bg-white flex items-center justify-center font-bold text-slate-400 text-lg">
              <Users className="h-12 w-12 text-slate-300" />
              <button 
                type="button"
                onClick={() => alert("Simulating upload avatar picture")}
                className="absolute bottom-1 right-1 h-7 w-7 rounded-full bg-[#0473b8] text-white flex items-center justify-center shadow"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="text-[9px] text-slate-400 text-center leading-relaxed">
              Accepts .jpg, .png, .gif up to 1MB. Recommended dimensions: 200px x 200px
            </p>
          </div>
          {/* Form details right (3 columns) */}
          <div className="md:col-span-3 space-y-5 text-xs font-semibold text-slate-705">
            
            {/* Row 1: Employee Name */}
            <div className="space-y-1.5">
              <label className="block text-slate-800">Employee Name</label>
              <div className="grid grid-cols-3 gap-3">
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
            <div className="space-y-1.5 max-w-xs">
              <label className="block text-slate-800">Employee ID</label>
              <input 
                type="text"
                placeholder="Employee ID"
                value={newId}
                onChange={(e) => setNewId(e.target.value)}
                className="w-full rounded border border-slate-200 px-3 py-2 text-slate-900 text-xs focus:border-[var(--primary-color)] outline-none font-mono"
              />
            </div>

            {/* Cancel / Save triggers */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button 
                type="button" 
                onClick={() => {
                  setNewFirstName('');
                  setNewMiddleName('');
                  setNewLastName('');
                  setNewId('');
                  setEditingId(null);
                }}
                className="px-5 py-2 border border-slate-200 text-slate-750 font-bold rounded-lg hover:bg-slate-50 transition-all bg-white"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white font-bold rounded-lg shadow-sm transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EmployeePage;
