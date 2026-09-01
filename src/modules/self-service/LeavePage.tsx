import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Calendar, Clock, RefreshCw, FileText } from 'lucide-react';
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

import { TimesheetsPage } from '../time/TimesheetsPage';
import { WakeOffPage } from '../time/WakeOffPage';
import { TimeOffRequestPage } from '../time/TimeOffRequestPage';

type MainTabType = 'schedule' | 'replacement' | 'leave' | 'leave-request';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as MainTabType | null;
  const validMainTabs: MainTabType[] = ['schedule', 'replacement', 'leave', 'leave-request'];
  const mainTab: MainTabType = tabParam && validMainTabs.includes(tabParam)
    ? tabParam
    : 'leave';

  const setMainTab = (tab: MainTabType) => {
    setSearchParams({ tab });
  };

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
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Leave Management</h1>
        <p className="text-xs text-slate-500 mt-1">Manage employee schedules, replacement shifts, leave entitlements, and time off requests.</p>
      </div>

      {/* Main Section Tabs */}
      <div className="flex border-b border-slate-200 gap-3 text-xs font-bold text-slate-500 pb-1">
        {[
          { id: 'schedule', label: 'Schedule', icon: Calendar },
          { id: 'replacement', label: 'Replacement', icon: RefreshCw },
          { id: 'leave', label: 'Leave', icon: Clock },
          { id: 'leave-request', label: 'Leave Request', icon: FileText }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = mainTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setMainTab(tab.id as MainTabType)}
              className={`flex items-center gap-2 pb-3 px-1 transition-all -mb-[1.5px] border-b-2 cursor-pointer ${
                isActive
                  ? 'border-[#004848] text-[#004848] font-extrabold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-[#004848]' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Section 1: Schedule */}
      {mainTab === 'schedule' && (
        <div className="animate-fade-in">
          <TimesheetsPage />
        </div>
      )}

      {/* Section 2: Replacement */}
      {mainTab === 'replacement' && (
        <div className="animate-fade-in">
          <WakeOffPage />
        </div>
      )}

      {/* Section 3: Leave (Sub-tabs) */}
      {mainTab === 'leave' && (
        <div className="space-y-6 animate-fade-in">
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

            {/* Entitlements Dropdown Pill */}
            <div className="relative" ref={entitlementDropdown.ref}>
              <button
                type="button"
                onClick={entitlementDropdown.toggle}
                className={getDropdownPillClass(isEntitlementActive)}
              >
                <span>Entitlements</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${entitlementDropdown.isOpen ? 'rotate-180' : ''}`} />
              </button>
              {entitlementDropdown.isOpen && (
                <div className="absolute left-0 mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {ENTITLEMENT_MENU_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleEntitlementSelect(item.id)}
                      className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-blue-50 transition-colors ${
                        isEntitlementActive && entitlementSub === item.id ? 'text-[#0473b8] font-bold bg-blue-50/60' : 'text-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reports Dropdown Pill */}
            <div className="relative" ref={reportDropdown.ref}>
              <button
                type="button"
                onClick={reportDropdown.toggle}
                className={getDropdownPillClass(isReportActive)}
              >
                <span>Reports</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${reportDropdown.isOpen ? 'rotate-180' : ''}`} />
              </button>
              {reportDropdown.isOpen && (
                <div className="absolute left-0 mt-1.5 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {REPORT_MENU_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleReportSelect(item.id)}
                      className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-blue-50 transition-colors ${
                        isReportActive && reportSub === item.id ? 'text-[#0473b8] font-bold bg-blue-50/60' : 'text-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Configure Dropdown Pill */}
            <div className="relative" ref={configDropdown.ref}>
              <button
                type="button"
                onClick={configDropdown.toggle}
                className={getDropdownPillClass(isConfigActive)}
              >
                <span>Configure</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${configDropdown.isOpen ? 'rotate-180' : ''}`} />
              </button>
              {configDropdown.isOpen && (
                <div className="absolute left-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {CONFIG_MENU_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleConfigSelect(item.id)}
                      className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-blue-50 transition-colors ${
                        isConfigActive && configSub === item.id ? 'text-[#0473b8] font-bold bg-blue-50/60' : 'text-slate-700'
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

          {/* Active Tab Panel */}
          {activeTab === 'apply' && <ApplyLeaveTab onSuccess={() => {}} />}
          {activeTab === 'my-leave' && <MyLeaveTab />}

          {activeTab === 'entitlements' && entitlementSub === 'add' && <AddEntitlementTab onCancel={() => {}} onSuccess={() => {}} />}
          {activeTab === 'entitlements' && entitlementSub === 'employee' && <EmployeeEntitlementTab />}
          {activeTab === 'entitlements' && entitlementSub === 'my' && <MyEntitlementTab />}

          {activeTab === 'reports' && reportSub === 'leave-usage' && <LeaveUsageReportTab />}
          {activeTab === 'reports' && reportSub === 'my-leave-usage' && <MyLeaveUsageReportTab />}

          {activeTab === 'configure' && configSub === 'period' && <LeavePeriodTab />}
          {activeTab === 'configure' && configSub === 'type' && <LeaveTypeConfigTab />}
          {activeTab === 'configure' && configSub === 'work-week' && <WorkWeekTab />}
          {activeTab === 'configure' && configSub === 'holidays' && <HolidaysTab />}

          {activeTab === 'leave-list' && <LeaveListTab />}
          {activeTab === 'assign-leave' && <AssignLeaveTab />}
        </div>
      )}

      {/* Section 4: Leave Request */}
      {mainTab === 'leave-request' && (
        <div className="animate-fade-in">
          <TimeOffRequestPage />
        </div>
      )}
    </div>
  );
};
export default LeavePage;
