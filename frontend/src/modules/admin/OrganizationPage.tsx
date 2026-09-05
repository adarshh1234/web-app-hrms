import React, { useState } from 'react';
import { Plus, Trash2, Network } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export const OrganizationPage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'info' | 'locations' | 'structure'>('info');

  // Tab 1 state
  const [editEnabled, setEditEnabled] = useState(true);

  // Tab 2 search states & location data
  const [searchLocName, setSearchLocName] = useState('');
  const [searchLocCity, setSearchLocCity] = useState('');
  const [searchLocCountry, setSearchLocCountry] = useState('');

  const [locations, setLocations] = useState([
    { id: '1', name: 'Canadian Regional HQ', city: 'Ottawa', country: 'Canada', phone: '1-876-267-6999', employees: 1 },
    { id: '2', name: 'Kochi Development Center', city: 'Kochi', country: 'India', phone: '91-484-259110', employees: 5 },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newLoc, setNewLoc] = useState({ name: '', city: '', country: 'Canada', phone: '', employees: 1 });

  const handleDeleteLocation = (id: string) => {
    if (confirm("Are you sure you want to delete this location?")) {
      setLocations(locations.filter(l => l.id !== id));
      toast.success("Location removed successfully.");
    }
  };

  const handleResetLocation = () => {
    setSearchLocName('');
    setSearchLocCity('');
    setSearchLocCountry('');
  };

  const handleAddLocation = () => {
    if (!newLoc.name || !newLoc.city) {
      toast.error("Location name and city are required.");
      return;
    }
    const created = {
      id: Date.now().toString(),
      ...newLoc
    };
    setLocations([...locations, created]);
    setShowAddModal(false);
    setNewLoc({ name: '', city: '', country: 'Canada', phone: '', employees: 1 });
    toast.success("Location added successfully.");
  };

  const filteredLocations = locations.filter(loc => {
    const matchName = !searchLocName || loc.name.toLowerCase().includes(searchLocName.toLowerCase());
    const matchCity = !searchLocCity || loc.city.toLowerCase().includes(searchLocCity.toLowerCase());
    const matchCountry = !searchLocCountry || loc.country.toLowerCase().includes(searchLocCountry.toLowerCase());
    return matchName && matchCity && matchCountry;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 m-0">Organization</h1>
        <p className="text-sm text-slate-500 mt-1">Manage general company information, location branches, and organizational hierarchy structure.</p>
      </div>

      {/* 3 Tab pills at the top */}
      <div className="flex gap-3 border-b border-slate-200 pb-3">
        {([
          { id: 'info', label: 'General Information' },
          { id: 'locations', label: 'Locations' },
          { id: 'structure', label: 'Structure' }
        ] as const).map(pill => (
          <button
            key={pill.id}
            onClick={() => setActiveTab(pill.id)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === pill.id 
                ? 'bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] text-white font-extrabold shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Tab Panel 1: General Information */}
      {activeTab === 'info' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">General Information</h2>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
            {/* Edit Toggle Switch */}
            <div className="flex justify-end items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Edit</span>
              <button 
                onClick={() => setEditEnabled(!editEnabled)}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out cursor-pointer ${
                  editEnabled ? 'bg-[#004848]' : 'bg-gray-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                  editEnabled ? 'translate-x-5' : ''
                }`} />
              </button>
            </div>

            {/* Fields Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs font-bold text-slate-700">
              {/* Left Form Block */}
              <div className="lg:col-span-9 space-y-4">
                <Input
                  label="Organization Name"
                  type="text" 
                  defaultValue="HUREMASO"
                  disabled={!editEnabled}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Registration Number"
                    type="text" 
                    defaultValue="TX-90823812C"
                    disabled={!editEnabled}
                  />
                  <Input
                    label="Tax ID"
                    type="text" 
                    defaultValue="TAX-884920"
                    disabled={!editEnabled}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Phone"
                    type="text" 
                    defaultValue="1-876-267-6999"
                    disabled={!editEnabled}
                  />
                  <Input
                    label="Fax"
                    type="text" 
                    defaultValue="1-876-267-7000"
                    disabled={!editEnabled}
                  />
                  <Input
                    label="Email"
                    type="email" 
                    defaultValue="info@huremaso.org"
                    disabled={!editEnabled}
                  />
                </div>

                <Input
                  label="Address Street 1"
                  type="text" 
                  defaultValue="324 Kochi Development Zone"
                  disabled={!editEnabled}
                />

                <Input
                  label="Address Street 2"
                  type="text" 
                  defaultValue="Suite 400"
                  disabled={!editEnabled}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    type="text" 
                    defaultValue="Kochi"
                    disabled={!editEnabled}
                  />
                  <Input
                    label="State/Province"
                    type="text" 
                    defaultValue="Kerala"
                    disabled={!editEnabled}
                  />
                  <Input
                    label="Zip/Postal Code"
                    type="text" 
                    defaultValue="682030"
                    disabled={!editEnabled}
                  />
                </div>

                <div>
                  <label className="block mb-1.5 font-bold text-slate-700">Country</label>
                  <select 
                    disabled={!editEnabled}
                    defaultValue="India"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 bg-white font-semibold text-xs outline-none disabled:bg-slate-50"
                  >
                    <option value="Canada">Canada</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1.5 font-bold text-slate-700">Notes</label>
                  <textarea
                    rows={3}
                    defaultValue="Primary corporate headquarters and offshore software engineering development center."
                    disabled={!editEnabled}
                    className="w-full rounded-lg border border-slate-200 p-3 text-slate-900 bg-white font-semibold text-xs outline-none disabled:bg-slate-50 resize-none"
                  />
                </div>
              </div>

              {/* Right Side Stats Panel */}
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Number of Employees</div>
                  <div className="text-2xl font-extrabold text-[#004848]">6</div>
                  <div className="text-[11px] text-slate-500">Active full-time across all branches</div>
                </div>

                {editEnabled && (
                  <div className="pt-2">
                    <Button 
                      onClick={() => toast.success("Organization General Information updated!")}
                      className="w-full bg-[#004848] hover:bg-[#003333] text-white"
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Panel 2: Locations */}
      {activeTab === 'locations' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 m-0">Locations Search</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-slate-700">
              <div>
                <label className="block mb-1.5">Name</label>
                <input 
                  type="text" 
                  value={searchLocName}
                  onChange={(e) => setSearchLocName(e.target.value)}
                  placeholder="Filter by location name..."
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 bg-white font-semibold text-xs outline-none focus:border-[#004848]"
                />
              </div>

              <div>
                <label className="block mb-1.5">City</label>
                <input 
                  type="text" 
                  value={searchLocCity}
                  onChange={(e) => setSearchLocCity(e.target.value)}
                  placeholder="Filter by city..."
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 bg-white font-semibold text-xs outline-none focus:border-[#004848]"
                />
              </div>

              <div>
                <label className="block mb-1.5">Country</label>
                <select
                  value={searchLocCountry}
                  onChange={(e) => setSearchLocCountry(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 bg-white font-semibold text-xs outline-none focus:border-[#004848]"
                >
                  <option value="">All Countries</option>
                  <option value="Canada">Canada</option>
                  <option value="India">India</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={handleResetLocation}
                className="px-6 py-2 border border-slate-300 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 transition-all bg-white cursor-pointer"
              >
                Reset
              </button>
              <button 
                onClick={() => toast.info(`Filtered ${filteredLocations.length} locations`)}
                className="px-6 py-2 bg-[#004848] hover:bg-[#003333] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>

          <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center pb-1">
              <span className="text-xs font-bold text-slate-500">({filteredLocations.length}) Records Found</span>
              <button 
                onClick={() => setShowAddModal(true)} 
                className="flex items-center gap-1.5 px-4 py-2 bg-[#004848] hover:bg-[#003333] text-white text-xs font-bold rounded-md shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Location</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3.5">Name</th>
                      <th className="px-6 py-3.5">City</th>
                      <th className="px-6 py-3.5">Country</th>
                      <th className="px-6 py-3.5">Phone</th>
                      <th className="px-6 py-3.5">Employees</th>
                      <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150">
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((loc) => (
                        <tr key={loc.id} className="hover:bg-slate-50/50">
                          <td className="px-6 py-4 font-semibold text-slate-900">{loc.name}</td>
                          <td className="px-6 py-4 text-slate-600">{loc.city}</td>
                          <td className="px-6 py-4 text-slate-600">{loc.country}</td>
                          <td className="px-6 py-4 text-slate-500 font-mono">{loc.phone}</td>
                          <td className="px-6 py-4 font-bold text-[#004848]">{loc.employees}</td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button 
                              onClick={() => handleDeleteLocation(loc.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                              title="Delete Location"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-slate-400 font-medium">
                          No locations found matching your search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Panel 3: Structure */}
      {activeTab === 'structure' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 m-0">Organization Structure Tree</h2>
              <p className="text-xs text-slate-500 mt-0.5">Hierarchical department decomposition and reporting tree.</p>
            </div>
            <button onClick={() => toast.info("Structure edit mode active")} className="px-4 py-1.5 bg-[#004848] text-white text-xs font-bold rounded-lg hover:bg-[#003333] transition-colors cursor-pointer">
              Edit Tree
            </button>
          </div>

          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 space-y-4">
            <div className="flex items-center gap-2.5 text-[#004848] font-bold text-sm">
              <Network className="h-5 w-5" />
              <span>HUREMASO (Corporate Parent Headquarters)</span>
            </div>
            <div className="pl-6 border-l-2 border-[#004848]/30 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#004848]" />
                <span className="font-bold text-slate-900">Administration Department</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#004848]" />
                <span className="font-bold text-slate-900">Engineering & Technology</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#004848]" />
                <span className="font-bold text-slate-900">Sales & Strategic Marketing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#004848]" />
                <span className="font-bold text-slate-900">Client Services & Operations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#004848]" />
                <span className="font-bold text-slate-900">Human Capital Management</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Location Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Add New Location</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block mb-1 font-bold text-slate-700">Location Name</label>
                <input 
                  type="text" 
                  value={newLoc.name}
                  onChange={e => setNewLoc({ ...newLoc, name: e.target.value })}
                  placeholder="e.g. US Tech Hub"
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none font-semibold"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold text-slate-700">City</label>
                <input 
                  type="text" 
                  value={newLoc.city}
                  onChange={e => setNewLoc({ ...newLoc, city: e.target.value })}
                  placeholder="e.g. Boston"
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none font-semibold"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold text-slate-700">Country</label>
                <input 
                  type="text" 
                  value={newLoc.country}
                  onChange={e => setNewLoc({ ...newLoc, country: e.target.value })}
                  placeholder="e.g. United States"
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none font-semibold"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold text-slate-700">Phone</label>
                <input 
                  type="text" 
                  value={newLoc.phone}
                  onChange={e => setNewLoc({ ...newLoc, phone: e.target.value })}
                  placeholder="e.g. +1 617-555-0199"
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none font-semibold"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddLocation}
                className="px-4 py-2 bg-[#004848] text-white rounded-lg text-xs font-bold hover:bg-[#003333] cursor-pointer"
              >
                Save Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationPage;
