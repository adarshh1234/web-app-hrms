import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { WorkWeekConfig } from '../../../types';
import leaveService from '../../../services/leaveService';
import Loader from '../../../components/common/Loader';
import { useToast } from '../../../hooks/useToast';

const DAY_STATUS_OPTIONS = [
  { value: 'Full Day', label: 'Full Day' },
  { value: 'Half Day', label: 'Half Day' },
  { value: 'Non-Working', label: 'Non-Working' },
];

const DAYS_LIST: { key: keyof WorkWeekConfig; label: string }[] = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
];

export const WorkWeekTab: React.FC = () => {
  const toast = useToast();
  const [workWeek, setWorkWeek] = useState<WorkWeekConfig>({
    monday: 'Full Day',
    tuesday: 'Full Day',
    wednesday: 'Full Day',
    thursday: 'Full Day',
    friday: 'Full Day',
    saturday: 'Full Day',
    sunday: 'Full Day',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadWorkWeek = async () => {
      setIsLoading(true);
      try {
        const data = await leaveService.getWorkWeekConfig();
        setWorkWeek(data);
      } catch {
        toast.error('Failed to load work week settings.');
      } finally {
        setIsLoading(false);
      }
    };
    loadWorkWeek();
  }, [toast]);

  const handleDayChange = (dayKey: keyof WorkWeekConfig, value: string) => {
    setWorkWeek((prev) => ({ ...prev, [dayKey]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await leaveService.saveWorkWeekConfig(workWeek);
      toast.success('Work week configuration saved successfully.');
    } catch {
      toast.error('Failed to save work week configuration.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-sm font-bold text-slate-900 m-0">Work Week</h2>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="space-y-5 max-w-md text-xs font-bold text-slate-700">
          {DAYS_LIST.map(({ key, label }) => (
            <div key={key}>
              <label className="block mb-1.5">{label}</label>
              <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <select
                  value={workWeek[key]}
                  onChange={(e) => handleDayChange(key, e.target.value)}
                  className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                >
                  {DAY_STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                  <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
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

export default WorkWeekTab;
