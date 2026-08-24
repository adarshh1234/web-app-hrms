import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Upload
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import Button from '../../components/common/Button';

export const EmployeeConfigPage: React.FC = () => {
  const toast = useToast();
  const location = useLocation();
  const getInitialTab = () => {
    if (location.pathname.endsWith('/custom')) return 'custom';
    if (location.pathname.endsWith('/import')) return 'import';
    if (location.pathname.endsWith('/reporting')) return 'reporting';
    if (location.pathname.endsWith('/termination')) return 'termination';
    return 'optional';
  };
  const [activeTab, setActiveTab] = useState<'optional' | 'custom' | 'import' | 'reporting' | 'termination'>(getInitialTab);

  // Custom Fields state
  const [customFields, setCustomFields] = useState([
    { name: 'Address', screen: 'Personal Details', type: 'Text or Number' },
    { name: 'Blood Type', screen: 'Personal Details', type: 'Text or Number' },
    { name: 'custom', screen: 'Personal Details', type: 'Text or Number' },
    { name: 'Grades titles', screen: 'Personal Details', type: 'Text or Number' }
  ]);

  // Reporting Methods state
  const [reportingMethods, setReportingMethods] = useState([
    { name: 'Direct' },
    { name: 'Indirect' },
    { name: 'Test_Reporting' }
  ]);

  // Termination Reasons state (mockup duplicate list to match screenshots exactly)
  const [terminationReasons, setTerminationReasons] = useState([
    { name: 'Direct' },
    { name: 'Indirect' },
    { name: 'Test_Reporting' }
  ]);

  // Optional Fields toggles
  const [optionalFields, setOptionalFields] = useState({
    nickname: true,
    smoker: true,
    family: true,
    education: true
  });

  const handleAddCustomField = () => {
    const name = prompt("Enter custom field name:");
    if (!name) return;
    setCustomFields([...customFields, { name, screen: 'Personal Details', type: 'Text or Number' }]);
  };

  const handleAddReportingMethod = () => {
    const name = prompt("Enter reporting method name:");
    if (!name) return;
    setReportingMethods([...reportingMethods, { name }]);
  };

  const handleAddTerminationReason = () => {
    const name = prompt("Enter termination reason:");
    if (!name) return;
    setTerminationReasons([...terminationReasons, { name }]);
  };

  return (
    <div className="space-y-6">
      {/* Tab Selectors at the top */}
      <div className="flex flex-wrap gap-2.5 items-center border-b border-slate-100 pb-3">
        {([
          { id: 'optional', label: 'Optional Fields' },
          { id: 'custom', label: 'Custom Fields' },
          { id: 'import', label: 'Data Import' },
          { id: 'reporting', label: 'Reporting Methods' },
          { id: 'termination', label: 'Termination Reasons' }
        ] as const).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
              activeTab === tab.id 
                ? 'bg-blue-50 text-[#0473b8] border-blue-200 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Optional Fields Panel */}
      {activeTab === 'optional' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm max-w-2xl space-y-6">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Optional Fields</h3>
          
          <div className="space-y-5 text-xs font-bold text-slate-700">
            <div className="flex items-center justify-between">
              <span>Show Nickname</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={optionalFields.nickname}
                  onChange={(e) => setOptionalFields({...optionalFields, nickname: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-350 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span>Ask if He/She is a smoker</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={optionalFields.smoker}
                  onChange={(e) => setOptionalFields({...optionalFields, smoker: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-350 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span>Get Family Details</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={optionalFields.family}
                  onChange={(e) => setOptionalFields({...optionalFields, family: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-350 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span>Get Education Details</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={optionalFields.education}
                  onChange={(e) => setOptionalFields({...optionalFields, education: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-350 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <Button 
              variant="primary"
              size="md"
              className="px-6"
              onClick={() => toast.success("Settings Saved successfully!")}
            >
              Save
            </Button>
          </div>
        </div>
      )}

      {/* 2. Custom Fields Panel matching exact design layout and colors */}
      {activeTab === 'custom' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Custom Fields</h3>

          {/* Grey wrapper box containing records and lists */}
          <div className="bg-[#e9eff4]/65 border border-slate-250 p-6 rounded-xl space-y-4 shadow-sm max-w-4xl">
            <div className="flex justify-between items-center pb-2.5">
              <span className="text-[11px] font-bold text-slate-700">({customFields.length}) Records Found</span>
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold text-slate-500">Remaining number of custom fields: {10 - customFields.length}</span>
                <button 
                  onClick={handleAddCustomField}
                  className="flex items-center gap-1 px-4 py-1.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* List Header */}
            <div className="grid grid-cols-4 px-4 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              <span>Custom Field Name</span>
              <span>Screen</span>
              <span>Field Type</span>
              <span className="text-right">Actions</span>
            </div>

            {/* White rounded card list */}
            <div className="space-y-2">
              {customFields.map((f) => (
                <div 
                  key={`${f.name}-${f.screen}`} 
                  className="grid grid-cols-4 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm hover:border-slate-300 transition-all text-xs font-bold text-slate-850"
                >
                  <span>{f.name}</span>
                  <span className="text-slate-500 font-semibold">{f.screen}</span>
                  <span className="text-slate-500 font-semibold">{f.type}</span>
                  <div className="flex justify-end gap-1.5">
                    <button 
                      onClick={() => setCustomFields(customFields.filter(item => item.name !== f.name))}
                      className="p-1 bg-slate-100 text-slate-400 hover:text-rose-600 rounded-full border border-slate-200"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                    <button 
                      onClick={() => toast.info("Edit custom field")}
                      className="p-1 bg-slate-100 text-slate-400 hover:text-blue-600 rounded-full border border-slate-200"
                    >
                      <Edit2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Data Import Panel */}
      {activeTab === 'import' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6 max-w-3xl">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Data Import</h3>

          <div className="bg-slate-100 border border-slate-200 p-4 rounded-xl space-y-3 text-xs text-slate-600">
            <h4 className="font-bold text-slate-800 text-xs">Note:</h4>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li>Column order should not be changed</li>
              <li>First Name and Last Name are compulsory</li>
              <li>All date fields should be in YYYY-MM-DD format</li>
              <li>If gender is specified, value should be either Male or Female</li>
              <li>Each import file should be configured for 100 records or less</li>
              <li>Multiple import files may be required</li>
              <li>Sample CSV file : <a href="#" onClick={(e) => { e.preventDefault(); toast.info("Downloading sample"); }} className="text-blue-600 font-bold hover:underline">Download</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Select File</label>
            <div className="flex border border-slate-200 rounded-lg overflow-hidden max-w-md">
              <button 
                onClick={() => toast.info("Open file system")}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded border border-slate-200"
              >
                Browse
              </button>
              <div className="flex-1 px-3 py-2 text-xs text-slate-400 font-medium">
                No file selected (Accepts up to 1MB)
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <Button 
              variant="primary"
              size="md"
              className="px-5"
              icon={<Upload className="h-3.5 w-3.5" />}
              onClick={() => toast.info("Uploading csv files")}
            >
              Upload
            </Button>
          </div>
        </div>
      )}

      {/* 4. Reporting Methods Panel matching exact mockup */}
      {activeTab === 'reporting' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Reporting Methods</h3>

          <div className="bg-[#e9eff4]/65 border border-slate-250 p-6 rounded-xl space-y-4 shadow-sm max-w-4xl">
            <div className="flex justify-between items-center pb-2.5">
              <span className="text-[11px] font-bold text-slate-700">({reportingMethods.length}) Records Found</span>
              <button 
                onClick={handleAddReportingMethod}
                className="flex items-center gap-1 px-4 py-1.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* List Header */}
            <div className="grid grid-cols-2 px-4 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              <span>Name</span>
              <span className="text-right">Actions</span>
            </div>

            {/* List items */}
            <div className="space-y-2">
              {reportingMethods.map((m) => (
                <div 
                  key={m.name} 
                  className="grid grid-cols-2 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm hover:border-slate-300 transition-all text-xs font-bold text-slate-850"
                >
                  <span>{m.name}</span>
                  <div className="flex justify-end gap-1.5">
                    <button 
                      onClick={() => setReportingMethods(reportingMethods.filter(item => item.name !== m.name))}
                      className="p-1 bg-slate-100 text-slate-400 hover:text-rose-600 rounded-full border border-slate-200"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                    <button 
                      onClick={() => toast.info("Edit reporting method")}
                      className="p-1 bg-slate-100 text-slate-400 hover:text-blue-600 rounded-full border border-slate-200"
                    >
                      <Edit2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Termination Reasons Panel matching exact mockup */}
      {activeTab === 'termination' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Termination Reasons</h3>

          <div className="bg-[#e9eff4]/65 border border-slate-250 p-6 rounded-xl space-y-4 shadow-sm max-w-4xl">
            <div className="flex justify-between items-center pb-2.5">
              <span className="text-[11px] font-bold text-slate-700">({terminationReasons.length}) Records Found</span>
              <button 
                onClick={handleAddTerminationReason}
                className="flex items-center gap-1 px-4 py-1.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* List Header */}
            <div className="grid grid-cols-2 px-4 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              <span>Name</span>
              <span className="text-right">Actions</span>
            </div>

            {/* List items */}
            <div className="space-y-2">
              {terminationReasons.map((tr) => (
                <div 
                  key={tr.name} 
                  className="grid grid-cols-2 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm hover:border-slate-300 transition-all text-xs font-bold text-slate-850"
                >
                  <span>{tr.name}</span>
                  <div className="flex justify-end gap-1.5">
                    <button 
                      onClick={() => setTerminationReasons(terminationReasons.filter(item => item.name !== tr.name))}
                      className="p-1 bg-slate-100 text-slate-400 hover:text-rose-600 rounded-full border border-slate-200"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                    <button 
                      onClick={() => toast.info("Edit reason")}
                      className="p-1 bg-slate-100 text-slate-400 hover:text-blue-600 rounded-full border border-slate-200"
                    >
                      <Edit2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default EmployeeConfigPage;
