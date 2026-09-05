import React, { useState, useEffect } from 'react';
import { useToast } from '../../../hooks/useToast';
import adminService from '../../../services/adminService';

export const ModuleConfigTab: React.FC = () => {
  const toast = useToast();
  const [moduleToggles, setModuleToggles] = useState<Record<string, boolean>>({
    'Dashboard': true,
    'Employee Management (Exist)': true,
    'Recruitment': true,
    'Payroll': true,
    'Events': true,
    'Employee self service': true,
    'Reporting and Analytics': true,
    'Notifications': true,
    'Miscellaneous Request': true,
    'Monitoring Inhouse Association': true,
    'Admin': true,
    'Time': true,
    'Maintenance': true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminService.getConfiguration()
      .then((cfg) => {
        if (cfg?.modules) {
          setModuleToggles((prev) => ({ ...prev, ...cfg.modules }));
        }
      })
      .catch(() => {});
  }, []);

  const toggleModule = (name: string) => {
    setModuleToggles(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await adminService.updateConfiguration({
        modules: moduleToggles,
      });
      toast.success("Modules configuration updated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update module configuration");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-slate-900 m-0">Module Configuration</h2>

      <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-4">
        
        {/* List of modules toggles */}
        <div className="space-y-3.5 max-w-xl text-xs font-bold text-slate-705">
          {Object.keys(moduleToggles).map(name => (
            <div key={name} className="flex items-center justify-between py-1.5 border-b border-slate-50">
              <span>{name}</span>
              <button 
                onClick={() => toggleModule(name)}
                className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out cursor-pointer ${
                  moduleToggles[name] ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform duration-300 ease-in-out ${
                  moduleToggles[name] ? 'translate-x-4' : ''
                }`} />
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-4 border-t border-slate-105">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ModuleConfigTab;
