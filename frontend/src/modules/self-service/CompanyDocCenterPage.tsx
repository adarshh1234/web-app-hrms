import React, { useState } from 'react';
import { SlidersHorizontal, Download, Share2, Plus, ChevronLeft, ChevronRight, FileText, MoreVertical } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface DocRow {
  id: string;
  name: string;
  category: string;
  modified: string;
}

export const CompanyDocCenterPage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'legal' | 'agree' | 'travel' | 'emp' | 'policy'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const rows: DocRow[] = [
    { id: '1', name: 'Employee Agreement Template', category: 'Legal Document', modified: '2 days ago' },
    { id: '2', name: 'Travel Policy 2024', category: 'Travel Document', modified: '1 week ago' },
    { id: '3', name: 'Remote Work Policy', category: 'Policy Document', modified: '2 days ago' },
    { id: '4', name: 'Benefits Documentation', category: 'Employee Record', modified: '2 days ago' },
    { id: '5', name: 'Employee Agreement Template', category: 'Legal Document', modified: '2 days ago' },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Company Doc-Center</h1>
      </div>

      <div className="flex flex-wrap gap-4 border-b border-slate-200 pb-1 text-xs font-bold text-slate-500">
        {[
          { id: 'all' as const, label: 'All Documents' },
          { id: 'legal' as const, label: 'Legal Documents' },
          { id: 'agree' as const, label: 'Agreements' },
          { id: 'travel' as const, label: 'Travel Documents' },
          { id: 'emp' as const, label: 'Employee Records' },
          { id: 'policy' as const, label: 'Policies' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2.5 transition-all -mb-[1.5px] border-b-2 cursor-pointer ${
              activeTab === tab.id 
                ? 'border-blue-600 text-blue-600 font-extrabold'
                : 'border-transparent hover:text-slate-808'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-4 text-xs font-bold text-slate-705">
          <span>Sort by: Last Modified</span>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#0473b8] bg-white rounded-lg text-[#0473b8] hover:bg-blue-50/50 transition-all font-semibold">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#0473b8]" />
            <span>Filter</span>
          </button>
        </div>

        <button 
          onClick={() => toast.info('Upload new document dialog')}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Upload New Document</span>
        </button>
      </div>

      <div className="space-y-2">
        {rows.map((r) => (
          <div 
            key={r.id}
            className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300 hover:shadow-md transition-all text-xs font-bold text-slate-800"
          >
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

            <div className="flex items-center gap-3.5 text-slate-400 pr-1">
              <button onClick={() => toast.info('Share document')} className="hover:text-blue-600 p-1">
                <Share2 className="h-4 w-4" />
              </button>
              <button onClick={() => toast.success('Document download started')} className="hover:text-blue-600 p-1">
                <Download className="h-4 w-4" />
              </button>
              <button onClick={() => toast.info('More options')} className="hover:text-blue-600 p-1">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

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
