import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import Button from '../../../components/common/Button';

export const LocalizationTab: React.FC = () => {
  const toast = useToast();
  const [localLang, setLocalLang] = useState('English (US)');
  const [localDateFormat, setLocalDateFormat] = useState('YYYY-MM-DD');

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-slate-900 m-0">Localization</h2>

      <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
          {/* Language */}
          <div>
            <label className="block mb-1.5">Language</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={localLang}
                onChange={(e) => setLocalLang(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                <option value="English (US)">English (US)</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
              </div>
            </div>
          </div>

          {/* Date Format */}
          <div>
            <label className="block mb-1.5">Date Format</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={localDateFormat}
                onChange={(e) => setLocalDateFormat(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-2">
          <Button 
            variant="primary"
            size="md"
            className="px-6"
            onClick={() => toast.success("Localization settings saved!")}
          >
            Save
          </Button>
        </div>

      </div>
    </div>
  );
};

export default LocalizationTab;
