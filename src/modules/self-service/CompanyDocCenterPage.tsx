import React, { useState } from 'react';
import { SlidersHorizontal, Download, Share2, Plus, ChevronLeft, ChevronRight, FileText, MoreVertical } from 'lucide-react';

interface DocRow {
  name: string;
  category: string;
  modified: string;
}

export const CompanyDocCenterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'legal' | 'agree' | 'travel' | 'emp' | 'policy'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const rows: DocRow[] = [
    { name: 'Employee Agreement Template', category: 'Legal Document', modified: '2 days ago' },
    { name: 'Travel Policy 2024', category: 'Travel Document', modified: '1 week ago' },
    { name: 'Travel Policy 2024', category: 'Travel Document', modified: '1 week ago' },
    { name: 'Remote Work Policy', category: 'Policy Document', modified: '2 days ago' },
    { name: 'Benefits Documentation', category: 'Employee Record', modified: '2 days ago' },
    { name: 'Employee Agreement Template', category: 'Legal Document', modified: '2 days ago' },
    { name: 'Employee Agreement Template', category: 'Legal Document', modified: '2 days ago' },
    { name: 'Employee Agreement Template', category: 'Legal Document', modified: '2 days ago' },
    { name: 'Travel Policy 2024', category: 'Travel Document', modified: '1 week ago' },
    { name: 'Remote Work Policy', category: 'Policy Document', modified: '2 days ago' },
    { name: 'Benefits Documentation', category: 'Employee Record', modified: '2 days ago' },
    { name: 'Employee Agreement Template', category: 'Legal Document', modified: '2 days ago' },
    { name: 'Benefits Documentation', category: 'Employee Record', modified: '2 days ago' },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Company Doc-Center</h1>
      </div>

      {/* Tab controls */}
      <div className="flex flex-wrap gap-4 border-b border-slate-200 pb-1 text-xs font-bold text-slate-500">
        {[
          { id: 'all', label: 'All Documents' },
          { id: 'legal', label: 'Legal Documents' },
          { id: 'agree', label: 'Agreements' },
          { id: 'travel', label: 'Travel Documents' },
          { id: 'emp', label: 'Employee Records' },
          { id: 'policy', label: 'Policies' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-2.5 transition-all -mb-[1.5px] border-b-2 ${
              activeTab === tab.id 
                ? 'border-blue-600 text-blue-600 font-extrabold'
                : 'border-transparent hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Sort and Upload line */}
      <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-4 text-xs font-bold text-slate-705">
          <span>Sort by: Last Modified</span>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#0473b8] bg-white rounded-lg text-[#0473b8] hover:bg-blue-50/50 transition-all font-semibold">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#0473b8]" />
            <span>Filter</span>
          </button>
        </div>

        <button 
          onClick={() => alert("Upload new document")}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Upload New Document</span>
        </button>
      </div>

      {/* Grid list table rows */}
      <div className="space-y-2">
        {rows.map((r, index) => (
          <div 
            key={index}
            className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300 hover:shadow-md transition-all text-xs font-bold text-slate-800"
          >
            
            {/* Left label details */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <FileText className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="block text-slate-850 font-extrabold">{r.name}</span>
                <span className="block text-[10px] text-slate-400 font-semibold">
                  {r.category} · Last modified: {r.modified}
                </span>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3.5 text-slate-400 pr-1">
              <button className="hover:text-blue-600 p-1">
                <Share2 className="h-4 w-4" />
              </button>
              <button className="hover:text-blue-600 p-1">
                <Download className="h-4 w-4" />
              </button>
              <button className="hover:text-blue-600 p-1">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 pt-4">
        <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
          <ChevronLeft className="h-3 w-3" />
        </button>
        {[1, 2, 3].map(page => (
          <button 
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-2.5 py-0.5 text-xs font-bold border rounded bg-white transition-colors ${
              currentPage === page 
                ? 'bg-blue-50 text-[#0473b8] border-blue-200 font-extrabold'
                : 'text-slate-650 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {page}
          </button>
        ))}
        <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

    </div>
  );
};
export default CompanyDocCenterPage;
