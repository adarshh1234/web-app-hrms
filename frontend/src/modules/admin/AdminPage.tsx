import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import CorporateBrandingTab from './components/CorporateBrandingTab';
import SystemUsersTab from './components/SystemUsersTab';
import JobManagementTab from './components/JobManagementTab';
import OrganizationTab from './components/OrganizationTab';

export type AdminTabType = 'branding' | 'users' | 'job' | 'org';

export const AdminPage: React.FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialTab = (): AdminTabType => {
    if (location.pathname === '/admin/organization') return 'org';
    const tabParam = searchParams.get('tab') as AdminTabType | null;
    if (tabParam && ['branding', 'users', 'job', 'org'].includes(tabParam)) return tabParam;
    return 'branding';
  };

  const [activeTab, setActiveTabState] = useState<AdminTabType>(getInitialTab);

  useEffect(() => {
    if (location.pathname === '/admin/organization') {
      setActiveTabState('org');
    }
  }, [location.pathname]);

  const setActiveTab = (tab: AdminTabType) => {
    setActiveTabState(tab);
    setSearchParams({ tab });
  };

  const tabs: { id: AdminTabType; label: string }[] = [
    { id: 'branding', label: 'Corporate Branding' },
    { id: 'users', label: 'User Management' },
    { id: 'job', label: 'Job Config' },
    { id: 'org', label: 'Organization' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Title & Header Navigation Bar */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 m-0">Admin Management</h1>
          <p className="text-sm text-slate-500 mt-1">Configure company organization, roles, job shifts, and branding themes.</p>
        </div>

        {/* Tab Links */}
        <div className="flex flex-wrap border-b border-slate-200">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 uppercase tracking-wider transition-all -mb-[2px] cursor-pointer ${
                activeTab === t.id 
                  ? 'border-[var(--primary-color)] text-[var(--primary-color)] font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'branding' && <CorporateBrandingTab />}
      {activeTab === 'users' && <SystemUsersTab />}
      {activeTab === 'job' && <JobManagementTab />}
      {activeTab === 'org' && <OrganizationTab />}
    </div>
  );
};

export default AdminPage;
