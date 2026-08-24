import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ChevronDown } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export const QualificationPage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'info' | 'locations' | 'structure'>('info');

  // Tab 1 state
  const [editEnabled, setEditEnabled] = useState(true);

  // Tab 2 search states
  const [searchLocName, setSearchLocName] = useState('');
  const [searchLocCity, setSearchLocCity] = useState('');
  const [searchLocCountry, setSearchLocCountry] = useState('');

  const [locations, setLocations] = useState([
    { id: '1', name: 'Canadian Regional HQ', city: 'Ottawa', country: 'Canada', phone: '1-876-267-6999', employees: 1 },
    { id: '2', name: 'Canadian Regional HQ', city: 'Ottawa', country: 'Canada', phone: '1-876-267-6999', employees: 1 },
  ]);

  const handleDeleteLocation = (id: string) => {
    if (confirm("Are you sure you want to delete this location?")) {
      setLocations(locations.filter(l => l.id !== id));
    }
  };

  const handleResetLocation = () => {
    setSearchLocName('');
    setSearchLocCity('');
    setSearchLocCountry('');
  };

  return (
    <div className="space-y-6">
      
      {/* 3 Tab pills at the top */}
      <div className="flex gap-3">
        {([
          { id: 'info', label: 'General Information' },
          { id: 'locations', label: 'Locations' },
          { id: 'structure', label: 'Structure' }
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

      {/* Tab Panel 1: General Information (Image 1) */}
      {activeTab === 'info' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">General Information</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
            {/* Edit Toggle Switch */}
            <div className="flex justify-end items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Edit</span>
              <button 
                onClick={() => setEditEnabled(!editEnabled)}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
                  editEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                  editEnabled ? 'translate-x-5' : ''
                }`} />
              </button>
            </div>

            {/* Fields Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs font-bold text-slate-700">
              
              {/* Left Form Block (8/12 grid span) */}
              <div className="lg:col-span-9 space-y-4">
                
                {/* Org Name */}
                <Input
                  label="Organization Name"
                  type="text" 
                  defaultValue="HUREMASO"
                  disabled={!editEnabled}
                />

                {/* Reg Number & Tax ID */}
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
                    defaultValue="TAX-90823"
                    disabled={!editEnabled}
                  />
                </div>

              </div>

              {/* Right Summary Block (3/12 grid span) */}
              <div className="lg:col-span-3 flex flex-col justify-end">
                <span className="block mb-1.5 text-slate-705">Number of Employees</span>
                <div className="bg-slate-100 border border-slate-200 rounded-xl p-8 flex items-center justify-center text-slate-800 font-extrabold text-2xl h-24">
                  65
                </div>
              </div>

            </div>

            {/* Row 3: Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-slate-700">
              <Input
                label="Phone"
                type="text" 
                defaultValue="91-484-259110"
                disabled={!editEnabled}
              />
              <Input
                label="Fax"
                type="text" 
                defaultValue="91-484-259111"
                disabled={!editEnabled}
              />
              <Input
                label="Email"
                type="email" 
                defaultValue="info@huremaso.com"
                disabled={!editEnabled}
              />
            </div>

            {/* Row 4: Address */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-slate-700">
              <Input
                label="Address Street 1"
                type="text" 
                defaultValue="324 Kochi Development Zone"
                disabled={!editEnabled}
              />
              <Input
                label="Address Street 2"
                type="text" 
                defaultValue="Infopark Campus"
                disabled={!editEnabled}
              />
              <Input
                label="City"
                type="text" 
                defaultValue="Kochi"
                disabled={!editEnabled}
              />
            </div>

            {/* Row 5: Region */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-slate-700">
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
              <Input
                label="Country"
                type="text" 
                defaultValue="India"
                disabled={!editEnabled}
              />
            </div>

            {/* Row 6: Description */}
            <div className="text-xs font-bold text-slate-700">
              <label className="block mb-1.5 text-slate-750">State/Province</label>
              <textarea 
                rows={4}
                defaultValue="Corporate operations center managing system configuration variables."
                disabled={!editEnabled}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none font-semibold text-xs resize-none"
              />
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 2: Locations (Image 2) */}
      {activeTab === 'locations' && (
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-slate-900 m-0">Locations</h2>

          {/* Search Filter Card */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-slate-705">
              <Input
                label="Name"
                type="text" 
                value={searchLocName}
                onChange={(e) => setSearchLocName(e.target.value)}
              />

              <Input
                label="City"
                type="text" 
                value={searchLocCity}
                onChange={(e) => setSearchLocCity(e.target.value)}
              />

              <div>
                <label className="block mb-1.5">Country</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={searchLocCountry}
                    onChange={(e) => setSearchLocCountry(e.target.value)}
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
                onClick={handleResetLocation}
                className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white"
              >
                Reset
              </button>
              <Button 
                variant="primary"
                size="md"
                className="px-6"
                onClick={() => toast.info("Searching locations")}
              >
                Search
              </Button>
            </div>
          </div>

          {/* Table content */}
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
            
            {/* Header info */}
            <div className="flex justify-between items-center pb-1">
              <span className="text-[10px] font-bold text-slate-500">(3) Records Found</span>
              <button 
                onClick={() => toast.info("Add new location")}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="h-3 w-3" />
                <span>Add</span>
              </button>
            </div>

            {/* Grid Column Headers */}
            <div className="grid grid-cols-6 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
              <span>Name</span>
              <span>City</span>
              <span>Country</span>
              <span>Phone</span>
              <span>No of Employees</span>
              <span className="text-right">Actions</span>
            </div>

            {/* List Rows */}
            <div className="space-y-1.5">
              {locations.map((loc) => (
                <div 
                  key={loc.id}
                  className="grid grid-cols-6 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
                >
                  <span>{loc.name}</span>
                  <span className="text-slate-500 font-semibold">{loc.city}</span>
                  <span className="text-slate-500 font-semibold">{loc.country}</span>
                  <span className="text-slate-500 font-semibold">{loc.phone}</span>
                  <span>{loc.employees}</span>
                  
                  <div className="flex justify-end gap-2.5">
                    <button onClick={() => toast.info(`Edit location #${loc.id}`)} className="p-1 text-slate-400 hover:text-blue-600">
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDeleteLocation(loc.id)} className="p-1 text-slate-400 hover:text-rose-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* Tab Panel 3: Structure (Image 3) */}
      {activeTab === 'structure' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Organization Structure</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm relative min-h-[350px]">
            {/* Header edit toggle aligned top right */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Edit</span>
              <button 
                onClick={() => setEditEnabled(!editEnabled)}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
                  editEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                  editEnabled ? 'translate-x-5' : ''
                }`} />
              </button>
            </div>

            {/* Tree View Diagram Layout */}
            <div className="relative pl-0 pt-8 pb-4 max-w-2xl">
              {/* Vertical line starting from the root row down to the last child's horizontal connector */}
              <div className="absolute left-[24px] top-[48px] bottom-[24px] w-[2px] bg-[#0473b8]"></div>
              
              {/* Root Node */}
              <div className="relative h-8 flex items-center mb-6 pl-16">
                {/* Horizontal connector from vertical line to dot */}
                <span className="absolute left-[24px] w-8 h-[2px] bg-[#0473b8]"></span>
                {/* Dot touching HUREMASO text */}
                <span className="absolute left-[52px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0473b8] border-2 border-white shadow-xs z-10"></span>
                <span className="pl-4 text-sm font-extrabold text-[#0473b8] uppercase tracking-wide">HUREMASO</span>
              </div>

              {/* Child Nodes */}
              <div className="space-y-3">
                {[
                  'Administration',
                  'Engineering',
                  'Sales & Marketing',
                  'Client Services',
                  'Human Resources'
                ].map((dept) => (
                  <div key={dept} className="relative h-12 flex items-center pl-16">
                    {/* Connecting horizontal line from vertical line to the box */}
                    <span className="absolute left-[24px] w-10 h-[2px] bg-[#0473b8]"></span>
                    {/* Dot on the horizontal line, touching the left side of the box */}
                    <span className="absolute left-[58px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0473b8] border-2 border-white z-10"></span>
                    
                    {/* Flat Department Card block exactly like original Figma */}
                    <div className="w-full max-w-lg bg-[#e2e4e7] h-10 flex items-center px-4 text-slate-800 text-xs font-bold rounded-lg shadow-none select-none hover:bg-slate-300/80 transition-colors">
                      {dept}
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
export default QualificationPage;
