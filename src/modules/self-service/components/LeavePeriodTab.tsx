import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { LeavePeriodConfig } from '../../../types';
import leaveService from '../../../services/leaveService';
import { useToast } from '../../../hooks/useToast';
import Loader from '../../../components/common/Loader';

const MONTH_OPTIONS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const LeavePeriodTab: React.FC = () => {
  const toast = useToast();
  const [config, setConfig] = useState<LeavePeriodConfig>({
    startMonth: 'January',
    startDate: '01',
    endDate: 'December 31',
    currentPeriod: '2025-01-01 to 2025-31-12'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadConfig = async () => {
      setIsLoading(true);
      try {
        const data = await leaveService.getLeavePeriodConfig();
        setConfig(data);
      } catch {
        toast.error('Failed to load leave period configuration.');
      } finally {
        setIsLoading(false);
      }
    };
    loadConfig();
  }, [toast]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await leaveService.saveLeavePeriodConfig(config);
      toast.success('Leave period configuration saved successfully.');
    } catch {
      toast.error('Failed to save leave period configuration.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    toast.info('Changes reverted.');
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-sm font-bold text-slate-900 m-0">Leave Period</h2>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-700">
          <div>
            <label className="block mb-1.5">Start Month</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={config.startMonth}
                onChange={(e) => setConfig({ ...config, startMonth: e.target.value })}
                className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                {MONTH_OPTIONS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1.5">Start Date</label>
            <input
              type="text"
              value={config.startDate}
              onChange={(e) => setConfig({ ...config, startDate: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-900 font-semibold text-xs outline-none focus:border-[#0473b8]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold text-slate-600">
          <div>
            <span className="block font-bold text-slate-800 mb-1">End Date</span>
            <span className="text-slate-500">{config.endDate}</span>
          </div>

          <div>
            <span className="block font-bold text-slate-800 mb-1">Current Leave Period</span>
            <span className="text-slate-500">{config.currentPeriod}</span>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeavePeriodTab;
