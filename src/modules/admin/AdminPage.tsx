import React, { useState, useEffect } from 'react';
import { 
  getBranding, 
  saveBranding, 
  CorporateBranding 
} from '../../data/mockData';
import { 
  Settings, 
  Search, 
  Sliders, 
  Users, 
  Building, 
  Paintbrush, 
  Network,
  Plus,
  ChevronDown
} from 'lucide-react';
import Modal from '../../components/common/Modal';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'job' | 'org' | 'branding'>('branding');
  const [activeJobSub, setActiveJobSub] = useState<'shifts' | 'grades' | 'status' | 'categories'>('shifts');
  const [activeOrgSub, setActiveOrgSub] = useState<'info' | 'locations' | 'structure'>('structure');

  // Database / Branding state
  const [branding, setBranding] = useState<CorporateBranding>({
    primaryColor: '#0473b8',
    primaryHoverColor: '#03629e',
    primaryFontColor: '#ffffff',
    secondaryColor: '#f1f5f9',
    secondaryFontColor: '#1e293b',
    primaryGradientColor1: '#0473b8',
    primaryGradientColor2: '#0284c7'
  });

  // Admin users list
  const [users, setUsers] = useState([
    { username: 'admin', role: 'Admin', empName: 'Sarah Joseph', status: 'Enabled' },
    { username: 'huremaso_dev', role: 'Developer', empName: 'Amal Benny', status: 'Enabled' },
    { username: 'marketing_lead', role: 'Manager', empName: 'Sarah Johnson', status: 'Enabled' }
  ]);

  // Shifts state
  const [shifts, setShifts] = useState([
    { name: 'General Shift', from: '08:00 AM', to: '05:00 PM', hours: 9.00 },
    { name: 'Night Shift', from: '08:00 PM', to: '05:00 AM', hours: 9.00 }
  ]);

  // Locations state
  const [locations, setLocations] = useState([
    { name: 'Canadian Regional HQ', city: 'Ottawa', country: 'Canada', phone: '1-876-267-6999', employees: 1 },
    { name: 'Kochi Development Center', city: 'Kochi', country: 'India', phone: '91-484-259110', employees: 5 }
  ]);

  // Modals / Add states
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddShiftOpen, setIsAddShiftOpen] = useState(false);

  // Form States - User
  const [newUsername, setNewUsername] = useState('');
  const [newUserRole, setNewUserRole] = useState('Admin');
  const [newEmpName, setNewEmpName] = useState('Sarah Johnson');

  // Form States - Shift
  const [newShiftName, setNewShiftName] = useState('');
  const [newShiftFrom, setNewShiftFrom] = useState('08:00 AM');
  const [newShiftTo, setNewShiftTo] = useState('05:00 PM');
  const [newShiftHours, setNewShiftHours] = useState(9.00);

  // Search Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [locSearchName, setLocSearchName] = useState('');
  const [locSearchCity, setLocSearchCity] = useState('');
  const [locSearchCountry, setLocSearchCountry] = useState('');

  useEffect(() => {
    setBranding(getBranding());
  }, []);

  const handleApplyBranding = (e: React.FormEvent) => {
    e.preventDefault();
    saveBranding(branding);
    alert("Corporate branding updated! Styles applied dynamically across the app shell.");
  };

  const handleResetBranding = () => {
    const defaultBranding = {
      primaryColor: '#0473b8',
      primaryHoverColor: '#03629e',
      primaryFontColor: '#ffffff',
      secondaryColor: '#f1f5f9',
      secondaryFontColor: '#1e293b',
      primaryGradientColor1: '#0473b8',
      primaryGradientColor2: '#0284c7'
    };
    setBranding(defaultBranding);
    saveBranding(defaultBranding);
    alert("Branding reset to system default.");
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      username: newUsername,
      role: newUserRole,
      empName: newEmpName,
      status: 'Enabled'
    };
    setUsers([...users, newUser]);
    setIsAddUserOpen(false);
    setNewUsername('');
  };

  const handleAddShift = (e: React.FormEvent) => {
    e.preventDefault();
    const newShift = {
      name: newShiftName,
      from: newShiftFrom,
      to: newShiftTo,
      hours: newShiftHours
    };
    setShifts([...shifts, newShift]);
    setIsAddShiftOpen(false);
    setNewShiftName('');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 m-0">Admin Controls</h1>
          <p className="text-sm text-slate-500 mt-1">Configure global application variables, branding themes, job shifts, and users.</p>
        </div>

        {/* Tab Links */}
        <div className="flex flex-wrap border-b border-slate-200">
          {(['branding', 'users', 'job', 'org'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === 'org') {
                  setActiveOrgSub('structure');
                }
              }}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 uppercase tracking-wider transition-all -mb-[2px] ${
                activeTab === tab 
                  ? 'border-[var(--primary-color)] text-[var(--primary-color)] font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {tab === 'branding' ? 'Corporate Branding' : tab === 'users' ? 'User Management' : tab === 'job' ? 'Job Config' : 'Organization'}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'branding' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm max-w-xl animate-fade-in">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
            <Paintbrush className="h-5 w-5 text-[var(--primary-color)]" />
            <h3 className="text-base font-bold text-slate-900">Corporate Branding</h3>
          </div>

          <form onSubmit={handleApplyBranding} className="space-y-4 text-xs font-semibold text-slate-700">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Primary Color</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={branding.primaryColor}
                    onChange={(e) => setBranding({...branding, primaryColor: e.target.value, primaryHoverColor: e.target.value})}
                    className="h-8 w-10 border border-slate-250 rounded cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={branding.primaryColor}
                    onChange={(e) => setBranding({...branding, primaryColor: e.target.value})}
                    className="flex-1 rounded border border-slate-250 px-2 py-1 outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Primary Font Color</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={branding.primaryFontColor}
                    onChange={(e) => setBranding({...branding, primaryFontColor: e.target.value})}
                    className="h-8 w-10 border border-slate-250 rounded cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={branding.primaryFontColor}
                    onChange={(e) => setBranding({...branding, primaryFontColor: e.target.value})}
                    className="flex-1 rounded border border-slate-250 px-2 py-1 outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Primary Gradient Color 1</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={branding.primaryGradientColor1}
                    onChange={(e) => setBranding({...branding, primaryGradientColor1: e.target.value})}
                    className="h-8 w-10 border border-slate-250 rounded cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={branding.primaryGradientColor1}
                    className="flex-1 rounded border border-slate-250 px-2 py-1 outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Primary Gradient Color 2</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={branding.primaryGradientColor2}
                    onChange={(e) => setBranding({...branding, primaryGradientColor2: e.target.value})}
                    className="h-8 w-10 border border-slate-250 rounded cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={branding.primaryGradientColor2}
                    className="flex-1 rounded border border-slate-250 px-2 py-1 outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Secondary Color</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={branding.secondaryColor}
                    onChange={(e) => setBranding({...branding, secondaryColor: e.target.value})}
                    className="h-8 w-10 border border-slate-250 rounded cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={branding.secondaryColor}
                    className="flex-1 rounded border border-slate-250 px-2 py-1 outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Secondary Font Color</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={branding.secondaryFontColor}
                    onChange={(e) => setBranding({...branding, secondaryFontColor: e.target.value})}
                    className="h-8 w-10 border border-slate-250 rounded cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={branding.secondaryFontColor}
                    className="flex-1 rounded border border-slate-250 px-2 py-1 outline-none text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Logo details from Figma */}
            <div className="border border-slate-100 rounded-lg p-3 bg-slate-50/50 space-y-2">
              <span className="block text-xs font-bold text-slate-800">Client Logo File Upload</span>
              <p className="text-[10px] text-slate-400">Accepts .jpg, .png, .gif, .svg up to 1MB. Recommended dimensions: 50px X 50px</p>
              <button type="button" onClick={() => alert("Browse Logo file")} className="px-3 py-1.5 border border-slate-200 rounded text-[10px] bg-white font-bold text-slate-700">Browse</button>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button type="button" onClick={handleResetBranding} className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50">Reset to Default</button>
              <button type="button" onClick={handleApplyBranding} className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200">Preview</button>
              <button type="submit" className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold rounded-lg shadow-sm">Publish</button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900">System Users</h3>
            <button 
              onClick={() => setIsAddUserOpen(true)}
              className="flex items-center gap-1 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add User</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Username</th>
                  <th className="px-6 py-4">User Role</th>
                  <th className="px-6 py-4">Employee Name</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {users.map((usr, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 whitespace-nowrap font-mono font-semibold text-xs text-slate-655">{usr.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-700">{usr.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600">{usr.empName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {usr.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'job' && (
        <div className="space-y-6 animate-fade-in">
          {/* Job sub navigation */}
          <div className="flex border-b border-slate-200">
            <button 
              onClick={() => setActiveJobSub('shifts')}
              className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] ${activeJobSub === 'shifts' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
            >
              Work Shifts
            </button>
            <button 
              onClick={() => setActiveJobSub('grades')}
              className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] ${activeJobSub === 'grades' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
            >
              Pay Grades
            </button>
            <button 
              onClick={() => setActiveJobSub('status')}
              className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] ${activeJobSub === 'status' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
            >
              Employment Status
            </button>
            <button 
              onClick={() => setActiveJobSub('categories')}
              className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] ${activeJobSub === 'categories' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
            >
              Job Categories
            </button>
          </div>

          {activeJobSub === 'shifts' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900">Work Shift Rosters</h3>
                <button 
                  onClick={() => setIsAddShiftOpen(true)}
                  className="px-3 py-1.5 bg-[var(--primary-color)] text-white text-xs font-bold rounded hover:bg-[var(--primary-hover)]"
                >
                  Add Shift
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm text-slate-700">
                  <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">Shift Name</th>
                      <th className="px-6 py-4">From</th>
                      <th className="px-6 py-4">To</th>
                      <th className="px-6 py-4">Hours Per Day</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {shifts.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-800">{s.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-655">{s.from}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-655">{s.to}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-700">{s.hours} hrs</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeJobSub !== 'shifts' && (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400 text-xs font-semibold shadow-sm">
              Configuration lists persist in system environment variables.
            </div>
          )}
        </div>
      )}

      {activeTab === 'org' && (
        <div className="space-y-6 animate-fade-in">
          {/* Org sub navigation */}
          <div className="flex border-b border-slate-200">
            <button 
              onClick={() => setActiveOrgSub('structure')}
              className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] ${activeOrgSub === 'structure' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
            >
              Organization Structure
            </button>
            <button 
              onClick={() => setActiveOrgSub('locations')}
              className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] ${activeOrgSub === 'locations' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
            >
              Locations
            </button>
            <button 
              onClick={() => setActiveOrgSub('info')}
              className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] ${activeOrgSub === 'info' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
            >
              General Information
            </button>
          </div>

          {activeOrgSub === 'structure' && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Organization Structure Tree</h3>
                <button onClick={() => alert("Edit Structure enabled")} className="text-[var(--primary-color)] text-xs font-bold hover:underline">Edit</button>
              </div>

              {/* Hierarchy tree visualization */}
              <div className="p-4 bg-slate-50/50 rounded-lg text-xs space-y-3 font-semibold text-slate-700">
                <div className="flex items-center gap-2 text-[var(--primary-color)]">
                  <Network className="h-4.5 w-4.5" />
                  <span>HUREMASO (Corporate parent)</span>
                </div>
                <div className="pl-6 border-l-2 border-slate-200 space-y-2">
                  <div>· Administration</div>
                  <div>· Engineering</div>
                  <div>· Sales & Marketing</div>
                  <div>· Client Services</div>
                  <div>· Human Resources</div>
                </div>
              </div>
            </div>
          )}

          {activeOrgSub === 'locations' && (
            <div className="space-y-6">
              
              {/* Search Filters Card */}
              <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-slate-705">
                  <div>
                    <label className="block mb-1.5">Name</label>
                    <input 
                      type="text" 
                      value={locSearchName}
                      onChange={(e) => setLocSearchName(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5">City</label>
                    <input 
                      type="text" 
                      value={locSearchCity}
                      onChange={(e) => setLocSearchCity(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5">Country</label>
                    <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                      <select
                        value={locSearchCountry}
                        onChange={(e) => setLocSearchCountry(e.target.value)}
                        className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                      >
                        <option value="">Select Country</option>
                        <option value="Canada">Canada</option>
                        <option value="India">India</option>
                      </select>
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                        <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    onClick={() => { setLocSearchName(''); setLocSearchCity(''); setLocSearchCountry(''); }}
                    className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white"
                  >
                    Reset
                  </button>
                  <button 
                    onClick={() => alert("Searching locations...")}
                    className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Table list block */}
              <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-[10px] font-bold text-slate-500">(3) Records Found</span>
                  <button 
                    onClick={() => alert("Add Location")} 
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add</span>
                  </button>
                </div>
                
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left text-sm text-slate-700">
                    <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">City</th>
                        <th className="px-6 py-4">Country</th>
                        <th className="px-6 py-4">Phone</th>
                        <th className="px-6 py-4">No of Employees</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {locations.map((loc, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-800">{loc.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-655">{loc.city}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-655">{loc.country}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">{loc.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-750">{loc.employees}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeOrgSub === 'info' && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm max-w-xl space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">General Information</h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold mb-1">Organization Name</span>
                  <span className="text-slate-800 font-bold text-sm">HUREMASO</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold mb-1">Tax ID / Registration</span>
                  <span className="text-slate-800 font-bold">TX-90823812C</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold mb-1">Address Street 1</span>
                  <span className="text-slate-800 font-bold">324 Kochi Development Zone</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold mb-1">City</span>
                  <span className="text-slate-800 font-bold">Kochi</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal: Add User */}
      <Modal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        title="Add System User"
        footer={
          <>
            <button onClick={() => setIsAddUserOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50">Cancel</button>
            <button type="submit" form="add-user-form" className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white rounded-lg text-sm font-semibold shadow-sm">Save</button>
          </>
        }
      >
        <form id="add-user-form" onSubmit={handleAddUser} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Username *</label>
            <input 
              type="text" 
              required
              placeholder="Enter system username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">User Role</label>
            <select
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
            >
              <option>Admin</option>
              <option>Manager</option>
              <option>Developer</option>
              <option>Staff</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Employee Name</label>
            <select
              value={newEmpName}
              onChange={(e) => setNewEmpName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
            >
              <option>Sarah Johnson</option>
              <option>Michael Chen</option>
              <option>Lisa Anderson</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* Modal: Add Shift */}
      <Modal
        isOpen={isAddShiftOpen}
        onClose={() => setIsAddShiftOpen(false)}
        title="Add Work Shift"
        footer={
          <>
            <button onClick={() => setIsAddShiftOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50">Cancel</button>
            <button type="submit" form="add-shift-form" className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white rounded-lg text-sm font-semibold shadow-sm">Save</button>
          </>
        }
      >
        <form id="add-shift-form" onSubmit={handleAddShift} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Shift Name *</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Evening Shift"
              value={newShiftName}
              onChange={(e) => setNewShiftName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">From Time</label>
              <input 
                type="text"
                value={newShiftFrom}
                onChange={(e) => setNewShiftFrom(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">To Time</label>
              <input 
                type="text"
                value={newShiftTo}
                onChange={(e) => setNewShiftTo(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default AdminPage;
