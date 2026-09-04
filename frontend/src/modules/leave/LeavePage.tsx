import React, { useState, useEffect } from 'react';
import { LeaveRequest, LeaveBalance } from '../../types';
import leaveService from '../../services/leaveService';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import ApplyLeaveTab from './components/ApplyLeaveTab';
import MyLeaveListTab from './components/MyLeaveListTab';
import EntitlementsTab from './components/EntitlementsTab';
import LeaveReportsTab from './components/LeaveReportsTab';
import LeaveConfigureTab from './components/LeaveConfigureTab';

export type LeaveTabType = 'apply' | 'my-leave' | 'entitlements' | 'reports' | 'configure';

export const LeavePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LeaveTabType>('apply');
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [balances, setBalances] = useState<LeaveBalance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLeaveData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [reqs, bals] = await Promise.all([
        leaveService.getRequests(),
        leaveService.getBalances()
      ]);
      setRequests(reqs);
      setBalances(bals);
    } catch (err) {
      setError('Failed to load leave records.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeaveData();
  }, []);

  const tabs: { id: LeaveTabType; label: string }[] = [
    { id: 'apply', label: 'Apply' },
    { id: 'my-leave', label: 'My Leave' },
    { id: 'entitlements', label: 'Entitlements' },
    { id: 'reports', label: 'Reports' },
    { id: 'configure', label: 'Configure' },
  ];

  return (
    <div className="space-y-6">
      {/* Title & Header navigation */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 m-0">Leave Management</h1>
          <p className="text-sm text-slate-500 mt-1">Submit leave requests, check entitlements, and configure rosters.</p>
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

      {isLoading ? (
        <Loader />
      ) : error ? (
        <EmptyState title="Error Loading Leave Data" description={error} />
      ) : (
        <>
          {activeTab === 'apply' && (
            <ApplyLeaveTab 
              balances={balances} 
              onSuccess={loadLeaveData} 
              onTabChange={(tab) => setActiveTab(tab)} 
            />
          )}
          {activeTab === 'my-leave' && (
            <MyLeaveListTab 
              requests={requests} 
              balances={balances} 
              onRefresh={loadLeaveData} 
            />
          )}
          {activeTab === 'entitlements' && (
            <EntitlementsTab 
              balances={balances} 
              onRefresh={loadLeaveData} 
            />
          )}
          {activeTab === 'reports' && <LeaveReportsTab />}
          {activeTab === 'configure' && <LeaveConfigureTab />}
        </>
      )}
    </div>
  );
};

export default LeavePage;
