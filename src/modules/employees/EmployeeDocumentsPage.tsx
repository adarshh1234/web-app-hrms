import React, { useState } from 'react';
import { 
  Folder, 
  MoreVertical, 
  Upload, 
  Plus, 
  Search, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

export const EmployeeDocumentsPage: React.FC = () => {
  const [folders, setFolders] = useState([
    { id: '1', name: 'Personal Information', count: 25 },
    { id: '2', name: 'Training Report', count: 25 },
    { id: '3', name: 'Benefits Documents', count: 25 },
    { id: '4', name: 'Policy Document', count: 25 },
    { id: '5', name: 'Personal Information', count: 25 },
    { id: '6', name: 'Training Report', count: 25 },
    { id: '7', name: 'Benefits Documents', count: 25 },
    { id: '8', name: 'Policy Document', count: 25 },
    { id: '9', name: 'Personal Information', count: 25 },
    { id: '10', name: 'Training Report', count: 25 },
    { id: '11', name: 'Benefits Documents', count: 25 },
    { id: '12', name: 'Policy Document', count: 25 },
    { id: '13', name: 'Personal Information', count: 25 },
    { id: '14', name: 'Training Report', count: 25 },
    { id: '15', name: 'Benefits Documents', count: 25 },
    { id: '16', name: 'Policy Document', count: 25 },
  ]);

  const handleCreateFolder = () => {
    const name = prompt("Enter new folder name:");
    if (!name) return;
    setFolders([...folders, { id: String(folders.length + 1), name, count: 0 }]);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Employee documents</h1>
      </div>

      {/* Control Bar matching Figma styling exactly */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left filters */}
        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-[#0473b8] bg-white rounded-lg text-xs font-semibold text-[#0473b8] hover:bg-blue-50/50 transition-all">
            <span>Sort By : Name</span>
            <ChevronDown className="h-3.5 w-3.5 text-[#0473b8]" />
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-[#0473b8] bg-white rounded-lg text-xs font-semibold text-[#0473b8] hover:bg-blue-50/50 transition-all">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#0473b8]" />
            <span>Filter</span>
          </button>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => alert("Upload documents")}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
          >
            <Upload className="h-3.5 w-3.5 text-white" />
            <span>Upload New</span>
          </button>
          <button 
            onClick={handleCreateFolder}
            className="flex items-center gap-1.5 px-4 py-2 border border-[#0473b8] hover:bg-blue-50 text-[#0473b8] text-xs font-bold rounded-lg transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Folder</span>
          </button>
        </div>
      </div>

      {/* Folder grid matching 4-column design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {folders.map((f, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-36 cursor-pointer"
            onClick={() => alert(`Opening folder: ${f.name}`)}
          >
            <div className="flex justify-between items-start">
              <Folder className="h-6 w-6 text-slate-700" />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  alert("Folder menu options");
                }}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-0.5">
              <h3 className="text-xs font-bold text-slate-800 truncate" title={f.name}>{f.name}</h3>
              <p className="text-[10px] font-bold text-slate-400">{f.count} Documents</p>
              <p className="text-[9px] text-slate-350 font-semibold">Modified 5 days ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default EmployeeDocumentsPage;
