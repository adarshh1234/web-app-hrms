import React, { useState } from 'react';
import EmailConfigTab from './components/EmailConfigTab';
import EmailSubscriptionsTab from './components/EmailSubscriptionsTab';
import LocalizationTab from './components/LocalizationTab';
import LanguagePackagesTab from './components/LanguagePackagesTab';
import ModuleConfigTab from './components/ModuleConfigTab';
import SocialAuthTab from './components/SocialAuthTab';
import OAuthClientsTab from './components/OAuthClientsTab';
import LdapAuthTab from './components/LdapAuthTab';

export type ConfigTabType = 'email' | 'subscriptions' | 'local' | 'packages' | 'module' | 'social' | 'oauth' | 'ldap';

export const ConfigurationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ConfigTabType>('email');

  const tabs: { id: ConfigTabType; label: string }[] = [
    { id: 'email', label: 'Email Configuration' },
    { id: 'subscriptions', label: 'Email Subscriptions' },
    { id: 'local', label: 'Localization' },
    { id: 'packages', label: 'Language Packages' },
    { id: 'module', label: 'Modules' },
    { id: 'social', label: 'Social Media Auth' },
    { id: 'oauth', label: 'Register OAuth Client' },
    { id: 'ldap', label: 'LDAP Authentication' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Title & Header Navigation Bar */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 m-0">System Configuration</h1>
          <p className="text-sm text-slate-500 mt-1">Manage core application preferences, authentication settings, and localization.</p>
        </div>

        {/* Tab Header Bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === t.id
                  ? 'border-[#0473b8] text-[#0473b8]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'email' && <EmailConfigTab />}
      {activeTab === 'subscriptions' && <EmailSubscriptionsTab />}
      {activeTab === 'local' && <LocalizationTab />}
      {activeTab === 'packages' && <LanguagePackagesTab />}
      {activeTab === 'module' && <ModuleConfigTab />}
      {activeTab === 'social' && <SocialAuthTab />}
      {activeTab === 'oauth' && <OAuthClientsTab />}
      {activeTab === 'ldap' && <LdapAuthTab />}

    </div>
  );
};

export default ConfigurationPage;
