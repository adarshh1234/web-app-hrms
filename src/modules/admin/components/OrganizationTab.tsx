import React, { useState } from 'react';
import { Network, Plus, ChevronDown } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export const OrganizationTab: React.FC = () => {
  const toast = useToast();
  const [activeOrgSub, setActiveOrgSub] = useState<'info' | 'locations' | 'structure'>('structure');
  const [locations, setLocations] = useState([
    { name: 'Canadian Regional HQ', city: 'Ottawa', country: 'Canada', phone: '1-876-267-6999', employees: 1 },
    { name: 'Kochi Development Center', city: 'Kochi', country: 'India', phone: '91-484-259110', employees: 5 }
  ]);
  const [locSearchName, setLocSearchName] = useState('');
  const [locSearchCity, setLocSearchCity] = useState('');
  const [locSearchCountry, setLocSearchCountry] = useState('');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Org sub navigation */}
      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveOrgSub('structure')}
          className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] cursor-pointer ${activeOrgSub === 'structure' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
        >
          Organization Structure
        </button>
        <button 
          onClick={() => setActiveOrgSub('locations')}
          className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] cursor-pointer ${activeOrgSub === 'locations' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
        >
          Locations
        </button>
        <button 
          onClick={() => setActiveOrgSub('info')}
          className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] cursor-pointer ${activeOrgSub === 'info' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
        >
          General Information
        </button>
      </div>

      {activeOrgSub === 'structure' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Organization Structure Tree</h3>
            <button onClick={() => toast.info("Edit Structure enabled")} className="text-[var(--primary-color)] text-xs font-bold hover:underline cursor-pointer">Edit</button>
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
                className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white cursor-pointer"
              >
                Reset
              </button>
              <button 
                onClick={() => toast.info("Searching locations...")}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>

          {/* Table list block */}
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center pb-1">
              <span className="text-[10px] font-bold text-slate-500">({locations.length}) Records Found</span>
              <button 
                onClick={() => toast.info("Add Location")} 
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="h-3 w-3" />
                <span>Add</span>
              </button>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
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
                  {locations.map((loc) => (
                    <tr key={loc.name} className="hover:bg-slate-50/50">
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
  );
};

export default OrganizationTab;
