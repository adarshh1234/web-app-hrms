import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { ApplyLeaveTab } from './components/ApplyLeaveTab';
import { MyLeaveTab } from './components/MyLeaveTab';
import { AddEntitlementTab } from './components/AddEntitlementTab';
import { EmployeeEntitlementTab } from './components/EmployeeEntitlementTab';
import { MyEntitlementTab } from './components/MyEntitlementTab';
import { LeaveUsageReportTab } from './components/LeaveUsageReportTab';
import { MyLeaveUsageReportTab } from './components/MyLeaveUsageReportTab';
import { LeaveListTab } from './components/LeaveListTab';
import { AssignLeaveTab } from './components/AssignLeaveTab';
import { LeavePeriodTab } from './components/LeavePeriodTab';
import { LeaveTypeConfigTab } from './components/LeaveTypeConfigTab';
import { WorkWeekTab } from './components/WorkWeekTab';
import { HolidaysTab } from './components/HolidaysTab';

type LeaveTabType = 'apply' | 'my-leave' | 'entitlements' | 'reports' | 'configure' | 'leave-list' | 'assign-leave';
type EntitlementSubType = 'add' | 'employee' | 'my';
type ReportSubType = 'leave-usage' | 'my-leave-usage';
type ConfigSubType = 'period' | 'type' | 'work-week' | 'holidays';

const ENTITLEMENT_MENU_ITEMS: { id: EntitlementSubType; label: string }[] = [
  { id: 'add', label: 'Add Entitlement' },
  { id: 'employee', label: 'Employee Entitlement' },
  { id: 'my', label: 'My Entitlement' },
];

const REPORT_MENU_ITEMS: { id: ReportSubType; label: string }[] = [
  { id: 'leave-usage', label: 'Leave Entitlements and Usage Report' },
  { id: 'my-leave-usage', label: 'My Leave Entitlements and Usage Report' },
];

const CONFIG_MENU_ITEMS: { id: ConfigSubType; label: string }[] = [
  { id: 'period', label: 'Leave Period' },
  { id: 'type', label: 'Leave Type' },
  { id: 'work-week', label: 'Work Week' },
  { id: 'holidays', label: 'Holidays' },
];

/**
 * Custom hook to manage a pill dropdown (Entitlements, Report, Configure, etc.)
 * Encapsulates open state, ref, and outside-click-to-close logic.
 */
function usePillDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return { isOpen, ref, toggle, close };
}

export const LeavePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LeaveTabType>('apply');
  const [entitlementSub, setEntitlementSub] = useState<EntitlementSubType>('add');
  const [reportSub, setReportSub] = useState<ReportSubType>('leave-usage');
  const [configSub, setConfigSub] = useState<ConfigSubType>('period');

  const entitlementDropdown = usePillDropdown();
  const reportDropdown = usePillDropdown();
  const configDropdown = usePillDropdown();

  const handleEntitlementSelect = (sub: EntitlementSubType) => {
    setEntitlementSub(sub);
    setActiveTab('entitlements');
    entitlementDropdown.close();
  };

  const handleReportSelect = (sub: ReportSubType) => {
    setReportSub(sub);
    setActiveTab('reports');
    reportDropdown.close();
  };

  const handleConfigSelect = (sub: ConfigSubType) => {
    setConfigSub(sub);
    setActiveTab('configure');
    configDropdown.close();
  };

  const isEntitlementActive = activeTab === 'entitlements';
  const isReportActive = activeTab === 'reports';
  const isConfigActive = activeTab === 'configure';

  const getPillClass = (tabId: LeaveTabType) => {
    const isActive = tabId === activeTab;
    return `px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
      isActive
        ? 'bg-blue-50 text-[#0473b8] font-extrabold border border-blue-200 shadow-sm'
        : 'bg-white text-slate-500 border border-slate-205 hover:bg-slate-50'
    }`;
  };

  const getDropdownPillClass = (isActive: boolean) =>
    `px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
      isActive
        ? 'bg-blue-50 text-[#0473b8] font-extrabold border border-blue-200 shadow-sm'
        : 'bg-white text-slate-500 border border-slate-205 hover:bg-slate-50'
    }`;

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top navigation tab pills */}
      <div className="flex flex-wrap gap-3 items-center select-none">
        <button
          onClick={() => setActiveTab('apply')}
          className={getPillClass('apply')}
        >
          Apply Leave
        </button>

        <button
          onClick={() => setActiveTab('my-leave')}
          className={getPillClass('my-leave')}
        >
          My Leave
        </button>

        {/* Entitlements Dropdown */}
        <div className="relative" ref={entitlementDropdown.ref}>
          <button
            onClick={entitlementDropdown.toggle}
            className={getDropdownPillClass(isEntitlementActive)}
          >
            Entitlements
            <ChevronDown className="h-3 w-3" />
          </button>

          {entitlementDropdown.isOpen && (
            <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-20 min-w-[200px] py-1 animate-fade-in">
              {ENTITLEMENT_MENU_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleEntitlementSelect(item.id)}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                    isEntitlementActive && entitlementSub === item.id
                      ? 'bg-blue-50 text-[#0473b8] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Report Dropdown */}
        <div className="relative" ref={reportDropdown.ref}>
          <button
            onClick={reportDropdown.toggle}
            className={getDropdownPillClass(isReportActive)}
          >
            Report
            <ChevronDown className="h-3 w-3" />
          </button>

          {reportDropdown.isOpen && (
            <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-20 min-w-[300px] py-1 animate-fade-in">
              {REPORT_MENU_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleReportSelect(item.id)}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                    isReportActive && reportSub === item.id
                      ? 'bg-blue-50 text-[#0473b8] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Configure Dropdown */}
        <div className="relative" ref={configDropdown.ref}>
          <button
            onClick={configDropdown.toggle}
            className={getDropdownPillClass(isConfigActive)}
          >
            Configure
            <ChevronDown className="h-3 w-3" />
          </button>

          {configDropdown.isOpen && (
            <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-20 min-w-[200px] py-1 animate-fade-in">
              {CONFIG_MENU_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleConfigSelect(item.id)}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                    isConfigActive && configSub === item.id
                      ? 'bg-blue-50 text-[#0473b8] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setActiveTab('leave-list')}
          className={getPillClass('leave-list')}
        >
          Leave List
        </button>

        <button
          onClick={() => setActiveTab('assign-leave')}
          className={getPillClass('assign-leave')}
        >
          Assign Leave
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'apply' && <ApplyLeaveTab onSuccess={() => setActiveTab('my-leave')} />}

      {activeTab === 'my-leave' && <MyLeaveTab />}

      {/* Entitlements Sub-Pages */}
      {activeTab === 'entitlements' && entitlementSub === 'add' && (
        <AddEntitlementTab
          onCancel={() => setActiveTab('apply')}
          onSuccess={() => setEntitlementSub('my')}
        />
      )}
      {activeTab === 'entitlements' && entitlementSub === 'employee' && <EmployeeEntitlementTab />}
      {activeTab === 'entitlements' && entitlementSub === 'my' && <MyEntitlementTab />}

      {/* Report Sub-Pages */}
      {activeTab === 'reports' && reportSub === 'leave-usage' && <LeaveUsageReportTab />}
      {activeTab === 'reports' && reportSub === 'my-leave-usage' && <MyLeaveUsageReportTab />}

      {/* Configure Sub-Pages */}
      {activeTab === 'configure' && configSub === 'period' && <LeavePeriodTab />}
      {activeTab === 'configure' && configSub === 'type' && <LeaveTypeConfigTab />}
      {activeTab === 'configure' && configSub === 'work-week' && <WorkWeekTab />}
      {activeTab === 'configure' && configSub === 'holidays' && <HolidaysTab />}

      {/* Leave List */}
      {activeTab === 'leave-list' && <LeaveListTab />}

      {/* Assign Leave */}
      {activeTab === 'assign-leave' && <AssignLeaveTab />}
    </div>
  );
};

export default LeavePage;

