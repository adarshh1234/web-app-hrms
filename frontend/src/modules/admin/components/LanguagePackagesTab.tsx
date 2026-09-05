import React, { useState } from 'react';
import { Languages, Trash2, Download, Key } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export const LanguagePackagesTab: React.FC = () => {
  const toast = useToast();

  const [langPackages, setLangPackages] = useState<string[]>([]);

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-sm font-bold text-slate-900 m-0">Language Packages</h2>

      <div className="bg-slate-100 border border-slate-205 rounded-xl p-5 space-y-3">
        <div className="text-[10px] font-bold text-slate-500">
          ({langPackages.length}) Records Found
        </div>

        {/* Table headers */}
        <div className="grid grid-cols-12 px-4 py-1 text-[10px] font-extrabold text-slate-505 uppercase tracking-wider">
          <span className="col-span-10">Language Packages</span>
          <span className="col-span-2 text-right pr-4">Actions</span>
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {langPackages.map((langName) => (
            <div 
              key={langName}
              className="grid grid-cols-12 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm text-xs font-bold text-slate-800"
            >
              <span className="col-span-10 text-slate-755">{langName}</span>
              
              <div className="col-span-2 flex justify-end pr-2">
                <div className="grid grid-cols-2 gap-1 select-none">
                  <button 
                    onClick={() => toast.info(`Translate ${langName}`)}
                    className="p-1.5 text-slate-400 hover:text-[#0473b8] transition-colors cursor-pointer"
                    title="Translate"
                  >
                    <Languages className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => toast.info(`Delete ${langName}`)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Delete Package"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => toast.info(`Export ${langName}`)}
                    className="p-1.5 text-slate-400 hover:text-[#0473b8] transition-colors cursor-pointer"
                    title="Export"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => toast.info(`Configure keys for ${langName}`)}
                    className="w-6 h-6 rounded-full bg-[#d0d3d7] hover:bg-slate-350 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                  >
                    <Key className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LanguagePackagesTab;
