import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface CustomerRecord {
  id: string;
  customerName: string;
  project: string;
  projectAdmins: string;
}

export const ProjectInfoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'customers' | 'project'>('customers');

  // Project tab search states
  const [searchCustName, setSearchCustName] = useState('');
  const [searchProjName, setSearchProjName] = useState('');
  const [searchProjAdmin, setSearchProjAdmin] = useState('');

  const [customerRecords, setCustomerRecords] = useState<CustomerRecord[]>([
    { id: '1', customerName: 'ACMF Ltd', project: 'ACME Ltd', projectAdmins: '-' },
    { id: '2', customerName: 'Apache Software Foundation', project: 'ACME Ltd', projectAdmins: '-' },
    { id: '3', customerName: 'FreeWave Technologies, Inc.', project: 'ACME Ltd', projectAdmins: '-' },
    { id: '4', customerName: 'Fresh Books Software Ltd', project: 'ACME Ltd', projectAdmins: '-' },
  ]);

  const handleReset = () => {
    setSearchCustName('');
    setSearchProjName('');
    setSearchProjAdmin('');
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this record?")) {
      setCustomerRecords(customerRecords.filter(c => c.id !== id));
    }
  };

  const renderCustomersTab = () => {
    return (
      <div className="space-y-6">
        {/* Title */}
        <h2 className="text-sm font-bold text-slate-900 m-0">Customers</h2>

        {/* Content Box */}
        <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
          
          {/* Header info bar with Add Button */}
          <div className="flex justify-between items-center pb-1">
            <span className="text-[10px] font-bold text-slate-500">(3) Records Found</span>
            <button 
              onClick={() => alert("Add customer")}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              <span>Add</span>
            </button>
          </div>

          {/* Table Column headers */}
          <div className="grid grid-cols-12 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
            <span className="col-span-4">Name</span>
            <span className="col-span-6">Description</span>
            <span className="col-span-2 text-right">Actions</span>
          </div>

          {/* Rows list */}
          <div className="space-y-2">
            {[
              { name: 'ACME Ltd', desc: 'Leading apparel manufacturing chain.' },
              { name: 'Apache Software Foundation', desc: 'Leading apparel manufacturing chain.' },
              { name: 'FreeWave Technologies, Inc.', desc: 'Leading apparel manufacturing chain.' },
              { name: 'Fresh Books Software Ltd', desc: 'Leading apparel manufacturing chain.' }
            ].map((c, idx) => (
              <div 
                key={idx}
                className="grid grid-cols-12 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm text-xs font-bold text-slate-800"
              >
                <span className="col-span-4 text-slate-900 font-extrabold">{c.name}</span>
                <span className="col-span-6 text-slate-500 font-semibold">{c.desc}</span>
                
                <div className="col-span-2 flex justify-end gap-2 text-slate-400 select-none">
                  <button 
                    onClick={() => alert(`Deleting customer ${c.name}`)}
                    className="w-7 h-7 rounded-full bg-[#d0d3d7] hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-all cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    onClick={() => alert(`Editing customer ${c.name}`)}
                    className="w-7 h-7 rounded-full bg-[#d0d3d7] hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-all cursor-pointer"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  };

  const renderProjectTab = () => {
    return (
      <div className="space-y-6">
        {/* Title */}
        <h2 className="text-sm font-bold text-slate-900 m-0">Employee Attendance Records</h2>

        {/* Search form Card */}
        <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold text-slate-705">
            <div>
              <label className="block mb-1.5">Customer Name</label>
              <input 
                type="text" 
                value={searchCustName}
                onChange={(e) => setSearchCustName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none text-xs font-semibold bg-white"
              />
            </div>

            <div>
              <label className="block mb-1.5">Project</label>
              <input 
                type="text" 
                value={searchProjName}
                onChange={(e) => setSearchProjName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none text-xs font-semibold bg-white"
              />
            </div>

            <div>
              <label className="block mb-1.5">Project Admin</label>
              <input 
                type="text" 
                value={searchProjAdmin}
                onChange={(e) => setSearchProjAdmin(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none text-xs font-semibold bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button 
              onClick={handleReset}
              className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white"
            >
              Reset
            </button>
            <button 
              onClick={() => alert("Searching records")}
              className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* Table list block */}
        <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
          
          {/* Header info bar with Add Button */}
          <div className="flex justify-between items-center pb-1">
            <span className="text-[10px] font-bold text-slate-500">(3) Records Found</span>
            <button 
              onClick={() => alert("Add new record")}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              <span>Add</span>
            </button>
          </div>

          {/* Table Column headers */}
          <div className="grid grid-cols-4 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
            <span>Customer Name</span>
            <span>Project</span>
            <span>Project Admins</span>
            <span className="text-right">Actions</span>
          </div>

          {/* Rows list with outline borders matching Figma exactly */}
          <div className="space-y-2">
            {customerRecords.map((c) => (
              <div 
                key={c.id}
                className="grid grid-cols-4 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm text-xs font-bold text-slate-800"
              >
                <span>{c.customerName}</span>
                <span className="text-slate-550 font-semibold">{c.project}</span>
                <span className="text-slate-400 font-normal">{c.projectAdmins}</span>
                
                <div className="flex justify-end gap-2.5">
                  <button 
                    onClick={() => alert(`Editing record #${c.id}`)}
                    className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(c.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* 2 Tab pills at the top */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab('customers')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'customers' 
              ? 'bg-blue-50 text-[#0473b8] font-extrabold border border-blue-200 shadow-sm'
              : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Customers
        </button>
        <button
          onClick={() => setActiveTab('project')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'project' 
              ? 'bg-blue-50 text-[#0473b8] font-extrabold border border-blue-200 shadow-sm'
              : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Project
        </button>
      </div>

      {/* Render selected tab content */}
      {activeTab === 'customers' ? renderCustomersTab() : renderProjectTab()}

    </div>
  );
};
export default ProjectInfoPage;
