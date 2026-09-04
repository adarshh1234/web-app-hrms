import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import PersonalDetailsTab from './components/PersonalDetailsTab';
import ContactDetailsTab from './components/ContactDetailsTab';
import EmergencyContactsTab from './components/EmergencyContactsTab';
import DependentsTab from './components/DependentsTab';
import ImmigrationTab from './components/ImmigrationTab';
import JobDetailsTab from './components/JobDetailsTab';
import SalaryDetailsTab from './components/SalaryDetailsTab';
import ReportToTab from './components/ReportToTab';
import QualificationsTab from './components/QualificationsTab';
import MembershipsTab from './components/MembershipsTab';

export type MyInfoTabType = 
  | 'personal' 
  | 'contact' 
  | 'emergency' 
  | 'dependents' 
  | 'immigration' 
  | 'job' 
  | 'salary' 
  | 'report-to' 
  | 'qualifications' 
  | 'memberships';

export const MyInfoPage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<MyInfoTabType>('personal');

  const tabs: { id: MyInfoTabType; label: string }[] = [
    { id: 'personal', label: 'Personal Details' },
    { id: 'contact', label: 'Contact Details' },
    { id: 'emergency', label: 'Emergency Contacts' },
    { id: 'dependents', label: 'Dependents' },
    { id: 'immigration', label: 'Immigration' },
    { id: 'job', label: 'Job' },
    { id: 'salary', label: 'Salary' },
    { id: 'report-to', label: 'Report to' },
    { id: 'qualifications', label: 'Qualifications' },
    { id: 'memberships', label: 'Memberships' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Two Column Page Layout matching Figma */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column Profile Sidebar (width 3/12 grid span) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col items-center gap-6">
          
          {/* Avatar container with blue overlay Add button */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-slate-100 border border-slate-205 overflow-hidden flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Profile Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <button 
              onClick={() => toast.info("Upload new avatar photo")}
              className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-md cursor-pointer border-2 border-white transition-colors"
            >
              <Plus className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Profile Details */}
          <div className="text-center space-y-1 select-none font-bold text-xs">
            <h2 className="text-sm font-bold text-slate-905 m-0">Sarah Johnson</h2>
            <p className="text-[10px] font-bold text-slate-400">Software Architect · ID: EMP329556</p>
          </div>

          {/* Navigation vertical menu */}
          <div className="w-full space-y-1 text-xs font-bold text-slate-700">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-[#0473b8] text-white font-extrabold shadow-xs' 
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Right Column Active Tab Panel (width 9/12 grid span) */}
        <div className="lg:col-span-9">
          {activeTab === 'personal' && <PersonalDetailsTab />}
          {activeTab === 'contact' && <ContactDetailsTab />}
          {activeTab === 'emergency' && <EmergencyContactsTab />}
          {activeTab === 'dependents' && <DependentsTab />}
          {activeTab === 'immigration' && <ImmigrationTab />}
          {activeTab === 'job' && <JobDetailsTab />}
          {activeTab === 'salary' && <SalaryDetailsTab />}
          {activeTab === 'report-to' && <ReportToTab />}
          {activeTab === 'qualifications' && <QualificationsTab />}
          {activeTab === 'memberships' && <MembershipsTab />}
        </div>

      </div>
    </div>
  );
};

export default MyInfoPage;
