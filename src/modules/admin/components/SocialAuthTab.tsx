import React from 'react';
import { Plus } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export const SocialAuthTab: React.FC = () => {
  const toast = useToast();

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-slate-900 m-0">Provider List</h2>

      <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center pb-1">
          <span className="text-[10px] font-bold text-slate-500">(3) Records Found</span>
          <button 
            onClick={() => toast.info("Add social provider")}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="h-3 w-3" />
            <span>Add</span>
          </button>
        </div>

        {/* Headers */}
        <div className="grid grid-cols-2 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
          <span>Name</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Empty provider body */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 text-center text-xs font-bold text-slate-400">
          No Social authentication providers configured.
        </div>

      </div>
    </div>
  );
};

export default SocialAuthTab;
