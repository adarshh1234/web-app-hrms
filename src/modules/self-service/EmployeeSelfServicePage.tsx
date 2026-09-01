import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TravelDocumentsPage from './TravelDocumentsPage';
import CompanyDocCenterPage from './CompanyDocCenterPage';
import HRLettersPage from './HRLettersPage';
import MassMessagesPage from './MassMessagesPage';
import LeavePage from './LeavePage';
import MyInfoPage from '../my-info/MyInfoPage';
import SupportPage from '../support/SupportPage';
import ExistingAssociationPage from '../association/ExistingAssociationPage';
import NewAssociationRequestPage from '../association/NewAssociationRequestPage';

export const EmployeeSelfServicePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'travel';
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const tabs = [
    { id: 'travel', label: 'Travel Documents' },
    { id: 'company-docs', label: 'Company Documents' },
    { id: 'hr-letters', label: 'HR Letters' },
    { id: 'messages', label: 'Messages' },
    { id: 'leave', label: 'Leave' },
    { id: 'my-info', label: 'My Info' },
    { id: 'misc-requests', label: 'Misc Requests' },
    { id: 'assoc-list', label: 'Associations - List' },
    { id: 'assoc-new', label: 'Associations - New' },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Employee Self Service</h1>
        <p className="text-xs text-slate-500 mt-1">Access documents, HR requests, leave management, and internal associations.</p>
      </div>

      {/* Top Page UI Tabs */}
      <div className="flex flex-wrap gap-2.5 items-center border-b border-slate-200 pb-3 select-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                isActive
                  ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div className="pt-2">
        {activeTab === 'travel' && <TravelDocumentsPage />}
        {activeTab === 'company-docs' && <CompanyDocCenterPage />}
        {activeTab === 'hr-letters' && <HRLettersPage />}
        {activeTab === 'messages' && <MassMessagesPage />}
        {activeTab === 'leave' && <LeavePage />}
        {activeTab === 'my-info' && <MyInfoPage />}
        {activeTab === 'misc-requests' && <SupportPage />}
        {activeTab === 'assoc-list' && <ExistingAssociationPage />}
        {activeTab === 'assoc-new' && <NewAssociationRequestPage />}
      </div>
    </div>
  );
};

export default EmployeeSelfServicePage;
