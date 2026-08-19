import React, { useState } from 'react';
import { ChevronDown, UserPlus, Plus, Edit2, Trash2, Languages, Download, Key } from 'lucide-react';

export const ConfigurationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'email' | 'subscriptions' | 'local' | 'packages' | 'module' | 'social' | 'oauth' | 'ldap'>('email');

  // Tab 1 state
  const [mailSentAs, setMailSentAs] = useState('admin@mail.com');
  const [mailMethod, setMailMethod] = useState<'secure' | 'smtp' | 'sendmail'>('sendmail');
  const [sendmailPathToggled, setSendmailPathToggled] = useState(true);

  // Tab 2 subscription states
  const [subscriptions, setSubscriptions] = useState([
    { id: '1', type: 'Leave Applications', enabled: true },
    { id: '2', type: 'Leave Approvals', enabled: true },
    { id: '3', type: 'Leave Assignments', enabled: true },
    { id: '4', type: 'Leave Cancellations', enabled: true },
    { id: '5', type: 'Leave Rejections', enabled: true },
  ]);

  // Tab 3 states
  const [localLang, setLocalLang] = useState('English (US)');
  const [localDateFormat, setLocalDateFormat] = useState('YYYY-MM-DD');

  // Tab 4 states (Language Packages)
  const [langPackages, setLangPackages] = useState([
    { code: 'en_US', name: 'English (US)', status: 'Active' },
    { code: 'es_ES', name: 'Spanish', status: 'Active' },
    { code: 'fr_FR', name: 'French', status: 'Inactive' },
  ]);

  // Tab 5 module config states
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

  // Tab 6: Provider List
  const [providers, setProviders] = useState<{ id: string; name: string }[]>([]);

  // Tab 7: Oauth Client List
  const [oauthClients, setOauthClients] = useState([
    { id: '1', name: 'OrangeHRM Mobile App', redirectUri: 'com.orangehrm.opensource://oauthredirect', status: '1-876-267-6999' }
  ]);

  // Tab 8: LDAP Settings
  const [ldapEnabled, setLdapEnabled] = useState(true);
  const [ldapHost, setLdapHost] = useState('localhost');
  const [ldapPort, setLdapPort] = useState('389');
  const [ldapEncryption, setLdapEncryption] = useState('');
  const [ldapImpl, setLdapImpl] = useState('');
  const [ldapBindAnon, setLdapBindAnon] = useState(true);
  const [ldapDN, setLdapDN] = useState('');
  const [ldapPass, setLdapPass] = useState('');

  const [ldapBaseDN, setLdapBaseDN] = useState('');
  const [ldapSearchScope, setLdapSearchScope] = useState('');
  const [ldapUserNameAttr, setLdapUserNameAttr] = useState('');
  const [ldapUserSearchFilter, setLdapUserSearchFilter] = useState('');
  const [ldapUserUniqueAttr, setLdapUserUniqueAttr] = useState('');

  // Data mapping fields
  const [ldapMapFirstName, setLdapMapFirstName] = useState('');
  const [ldapMapMiddleName, setLdapMapMiddleName] = useState('');
  const [ldapMapLastName, setLdapMapLastName] = useState('');
  const [ldapMapStatus, setLdapMapStatus] = useState('');
  const [ldapMapEmail, setLdapMapEmail] = useState('');
  const [ldapMapEmpId, setLdapMapEmpId] = useState('');

  const [ldapMapEmailToggle, setLdapMapEmailToggle] = useState(true);
  const [ldapMapEmpIdToggle, setLdapMapEmpIdToggle] = useState(true);

  // Additional settings
  const [ldapMergeUsers, setLdapMergeUsers] = useState(true);
  const [ldapSyncInterval, setLdapSyncInterval] = useState('');

  const toggleModule = (name: string) => {
    setModuleToggles(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleSubscription = (id: string) => {
    setSubscriptions(subscriptions.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const handleDeleteOauth = (id: string) => {
    if (confirm("Delete OAuth client?")) setOauthClients(oauthClients.filter(x => x.id !== id));
  };

  const handleResetEmail = () => {
    setMailSentAs('admin@mail.com');
    setMailMethod('sendmail');
    setSendmailPathToggled(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Scrollable Sub-tab Navigation pills */}
      <div className="flex flex-wrap gap-3 max-w-full overflow-x-auto pb-1">
        {[
          { id: 'email', label: 'Email Configuration' },
          { id: 'subscriptions', label: 'Email Subscriptions' },
          { id: 'local', label: 'Localization' },
          { id: 'packages', label: 'Language Packages' },
          { id: 'module', label: 'Module' },
          { id: 'social', label: 'Social Media Authentication' },
          { id: 'oauth', label: 'Register Oauth Client List' },
          { id: 'ldap', label: 'LDAP Configuration' }
        ].map(pill => (
          <button
            key={pill.id}
            onClick={() => setActiveTab(pill.id as any)}
            className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === pill.id 
                ? 'bg-blue-50 text-[#0473b8] font-extrabold border border-blue-200 shadow-sm'
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Tab Panel 1: Email Configuration */}
      {activeTab === 'email' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Email Configuration</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
            
            {/* Mail Sent As & Radio group */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs font-bold text-slate-705">
              {/* Mail Sent As input */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Mail Sent As</label>
                  <input 
                    type="email" 
                    value={mailSentAs}
                    onChange={(e) => setMailSentAs(e.target.value)}
                    className="w-full max-w-md rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none font-semibold text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="block mb-2">Path to Sendmail</label>
                  <span className="block text-slate-400 font-semibold mb-2">/usr/sbin/sendmail -bs</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>Send Test Mail</span>
                  <button 
                    onClick={() => setSendmailPathToggled(!sendmailPathToggled)}
                    className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
                      sendmailPathToggled ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform duration-300 ease-in-out ${
                      sendmailPathToggled ? 'translate-x-4' : ''
                    }`} />
                  </button>
                </div>
              </div>

              {/* Radio Group options */}
              <div className="space-y-2">
                <label className="block mb-4">Sending Method</label>
                <div className="flex items-center gap-6">
                  {/* Secure SMTP */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="radio" 
                      name="mailMethod" 
                      checked={mailMethod === 'secure'}
                      onChange={() => setMailMethod('secure')}
                      className="text-blue-600 focus:ring-blue-400 h-4 w-4 border-slate-300"
                    />
                    <span>SECURE SMTP</span>
                  </label>

                  {/* SMTP */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="radio" 
                      name="mailMethod" 
                      checked={mailMethod === 'smtp'}
                      onChange={() => setMailMethod('smtp')}
                      className="text-blue-600 focus:ring-blue-400 h-4 w-4 border-slate-300"
                    />
                    <span>SMTP</span>
                  </label>

                  {/* Sendmail */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="radio" 
                      name="mailMethod" 
                      checked={mailMethod === 'sendmail'}
                      onChange={() => setMailMethod('sendmail')}
                      className="text-blue-600 focus:ring-blue-400 h-4 w-4 border-slate-300"
                    />
                    <span>Sendmail</span>
                  </label>
                </div>
              </div>
            </div>

          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button 
              onClick={handleResetEmail}
              className="px-6 py-2 border border-[#0473b8] bg-white hover:bg-blue-50/50 text-[#0473b8] text-xs font-bold rounded-lg shadow-sm transition-all"
            >
              Reset
            </button>
            <button 
              onClick={() => alert("Email Configuration saved successfully!")}
              className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Tab Panel 2: Email Subscriptions */}
      {activeTab === 'subscriptions' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Email Subscriptions</h2>

          {/* Card containing subscriptions table */}
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="text-[10px] font-bold text-slate-400">
              (5) Records Found
            </div>

            {/* Headers */}
            <div className="grid grid-cols-3 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
              <span>Notification Type</span>
              <span>Subscribers</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Rows list */}
            <div className="space-y-2">
              {subscriptions.map(sub => (
                <div 
                  key={sub.id}
                  className="grid grid-cols-3 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm text-xs font-bold text-slate-800"
                >
                  <span>{sub.type}</span>
                  <span className="text-slate-400 font-normal">-</span>
                  
                  <div className="flex justify-end items-center gap-4">
                    {/* Gray subscriber add user icon */}
                    <button 
                      onClick={() => alert(`Manage subscribers for ${sub.type}`)}
                      className="p-1 text-slate-400 hover:text-blue-600 transition-colors bg-slate-100 border border-slate-200 rounded-md"
                    >
                      <UserPlus className="h-4 w-4" />
                    </button>

                    {/* Toggle switch */}
                    <button 
                      onClick={() => toggleSubscription(sub.id)}
                      className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
                        sub.enabled ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform duration-300 ease-in-out ${
                        sub.enabled ? 'translate-x-4' : ''
                      }`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 3: Localization */}
      {activeTab === 'local' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Localization</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
              {/* Language */}
              <div>
                <label className="block mb-1.5">Language</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={localLang}
                    onChange={(e) => setLocalLang(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              {/* Date Format */}
              <div>
                <label className="block mb-1.5">Date Format</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={localDateFormat}
                    onChange={(e) => setLocalDateFormat(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-2">
              <button 
                onClick={() => alert("Localization settings saved!")}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 4: Language Packages */}
      {activeTab === 'packages' && (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-sm font-bold text-slate-900 m-0">Language Packages</h2>

          <div className="bg-slate-100 border border-slate-205 rounded-xl p-5 space-y-3">
            <div className="text-[10px] font-bold text-slate-500">
              (5) Records Found
            </div>

            {/* Table headers */}
            <div className="grid grid-cols-12 px-4 py-1 text-[10px] font-extrabold text-slate-505 uppercase tracking-wider">
              <span className="col-span-10">Language Packages</span>
              <span className="col-span-2 text-right pr-4">Actions</span>
            </div>

            {/* Rows */}
            <div className="space-y-2">
              {[
                'Chinese (Simplified, China) - 中文 (简体, 中国)',
                'Chinese (Traditional, Taiwan) - 中文 (繁體, 台灣)',
                'Dutch - Nederlands',
                'English (United States)',
                'French - Français'
              ].map((langName, idx) => (
                <div 
                  key={idx}
                  className="grid grid-cols-12 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm text-xs font-bold text-slate-800"
                >
                  <span className="col-span-10 text-slate-750">{langName}</span>
                  
                  <div className="col-span-2 flex justify-end pr-2">
                    <div className="grid grid-cols-2 gap-1 select-none">
                      <button 
                        onClick={() => alert(`Translate ${langName}`)}
                        className="w-6 h-6 rounded-full bg-[#d0d3d7] hover:bg-slate-350 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                      >
                        <Languages className="h-3.5 w-3.5" />
                      </button>
                      <button 
                        onClick={() => alert(`Delete ${langName}`)}
                        className="w-6 h-6 rounded-full bg-[#d0d3d7] hover:bg-slate-350 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <button 
                        onClick={() => alert(`Export ${langName}`)}
                        className="w-6 h-6 rounded-full bg-[#d0d3d7] hover:bg-slate-350 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                      <button 
                        onClick={() => alert(`Configure keys for ${langName}`)}
                        className="w-6 h-6 rounded-full bg-[#d0d3d7] hover:bg-slate-350 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                      >
                        <Key className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 5: Module Configuration */}
      {activeTab === 'module' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Module Configuration</h2>

          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-4">
            
            {/* List of modules toggles */}
            <div className="space-y-3.5 max-w-xl text-xs font-bold text-slate-705 font-semibold">
              {Object.keys(moduleToggles).map(name => (
                <div key={name} className="flex items-center justify-between py-1.5 border-b border-slate-50">
                  <span>{name}</span>
                  <button 
                    onClick={() => toggleModule(name)}
                    className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
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
                onClick={() => alert("Modules configuration updated!")}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 6: Social Media Authentication (Image 1) */}
      {activeTab === 'social' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Provider List</h2>

          <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center pb-1">
              <span className="text-[10px] font-bold text-slate-500">(3) Records Found</span>
              <button 
                onClick={() => alert("Add social provider")}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="h-3 w-3" />
                <span>Add</span>
              </button>
            </div>

            {/* Headers */}
            <div className="grid grid-cols-2 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
              <span>Name</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Empty provider body */}
            <div className="bg-white rounded-lg border border-slate-200 p-8 text-center text-xs font-bold text-slate-400">
              No Social authentication providers configured.
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 7: Register Oauth Client List (Image 2) */}
      {activeTab === 'oauth' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 m-0">Register Oauth Client List</h2>

          <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center pb-1">
              <span className="text-[10px] font-bold text-slate-505">(3) Records Found</span>
              <button 
                onClick={() => alert("Register new client")}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="h-3 w-3" />
                <span>Add</span>
              </button>
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-4 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
              <span>Name</span>
              <span>Redirect URI</span>
              <span>Status</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Rows list */}
            <div className="space-y-1.5">
              {oauthClients.map(c => (
                <div 
                  key={c.id}
                  className="grid grid-cols-4 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
                >
                  <span>{c.name}</span>
                  <span className="text-slate-500 font-semibold truncate pr-4">{c.redirectUri}</span>
                  <span className="text-slate-500 font-semibold">{c.status}</span>
                  
                  <div className="flex justify-end gap-2.5">
                    <button onClick={() => alert(`Edit OAuth client ${c.name}`)} className="p-1 text-slate-400 hover:text-blue-600">
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDeleteOauth(c.id)} className="p-1 text-slate-400 hover:text-rose-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Tab Panel 8: LDAP Configuration (Image 3) */}
      {activeTab === 'ldap' && (
        <div className="space-y-6">
          
          {/* Header config label with switch */}
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-900 m-0">LDAP Configuration</h2>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Enable</span>
              <button 
                onClick={() => setLdapEnabled(!ldapEnabled)}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
                  ldapEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                  ldapEnabled ? 'translate-x-5' : ''
                }`} />
              </button>
            </div>
          </div>

          {/* Form details */}
          <div className="space-y-6">
            
            {/* Card 1: Server Settings */}
            <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Server Settings</span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-705">
                <div>
                  <label className="block mb-1">Host</label>
                  <input 
                    type="text" 
                    value={ldapHost}
                    onChange={(e) => setLdapHost(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none font-semibold text-xs"
                  />
                  <span className="block text-[9px] text-slate-400 font-bold mt-1 leading-normal">
                    LDAP Server IP or hostname without the protocol (without ldap:// or ldaps://)
                  </span>
                </div>

                <div>
                  <label className="block mb-1">Port</label>
                  <input 
                    type="text" 
                    value={ldapPort}
                    onChange={(e) => setLdapPort(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none font-semibold text-xs"
                  />
                  <span className="block text-[9px] text-slate-400 font-bold mt-1 leading-normal">
                    If SSL use port 636 by default
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-705">
                <div>
                  <label className="block mb-1">Encryption</label>
                  <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <select
                      value={ldapEncryption}
                      onChange={(e) => setLdapEncryption(e.target.value)}
                      className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                    >
                      <option value="">No Encryption</option>
                      <option value="ssl">SSL</option>
                      <option value="tls">TLS</option>
                    </select>
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                      <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-1">LDAP Implementation</label>
                  <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <select
                      value={ldapImpl}
                      onChange={(e) => setLdapImpl(e.target.value)}
                      className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                    >
                      <option value="">OpenLDAP</option>
                      <option value="ad">Active Directory</option>
                    </select>
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                      <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Bind Settings */}
            <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Bind Settings</span>
              
              <div className="flex items-center gap-3 text-xs font-bold text-slate-705">
                <span>Bind Anonymously</span>
                <button 
                  onClick={() => setLdapBindAnon(!ldapBindAnon)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
                    ldapBindAnon ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform duration-300 ease-in-out ${
                    ldapBindAnon ? 'translate-x-4' : ''
                  }`} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-705">
                <div>
                  <label className="block mb-1">Distinguished Name</label>
                  <input 
                    type="text" 
                    value={ldapDN}
                    onChange={(e) => setLdapDN(e.target.value)}
                    placeholder="cn=admin,dc=example,dc=com"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none font-semibold text-xs"
                  />
                </div>
                <div>
                  <label className="block mb-1">Password</label>
                  <input 
                    type="password" 
                    value={ldapPass}
                    onChange={(e) => setLdapPass(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none font-semibold text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Card 3: User Lookup Settings */}
            <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">User Lookup Settings</span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-705">
                <div>
                  <label className="block mb-1">Base Distinguished Name</label>
                  <input 
                    type="text" 
                    value={ldapBaseDN}
                    onChange={(e) => setLdapBaseDN(e.target.value)}
                    placeholder="ou=users,dc=example,dc=com"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none font-semibold text-xs"
                  />
                </div>

                <div>
                  <label className="block mb-1">Search Scope</label>
                  <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <select
                      value={ldapSearchScope}
                      onChange={(e) => setLdapSearchScope(e.target.value)}
                      className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                    >
                      <option value="">Subtree</option>
                      <option value="one">One Level</option>
                    </select>
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                      <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                    </div>
                  </div>
                  <span className="block text-[9px] text-slate-400 font-bold mt-1 leading-normal">
                    Subtree option will allow searching base directory and sub directories. One level will only search within the base directory
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-705">
                <div>
                  <label className="block mb-1">User Name Attribute</label>
                  <input 
                    type="text" 
                    value={ldapUserNameAttr}
                    onChange={(e) => setLdapUserNameAttr(e.target.value)}
                    placeholder="uid"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none font-semibold text-xs"
                  />
                  <span className="block text-[9px] text-slate-400 font-bold mt-1 leading-normal">
                    Attribute field to use when matching the username. For AD, sAMAccountName
                  </span>
                </div>

                <div>
                  <label className="block mb-1">User Search Filter</label>
                  <input 
                    type="text" 
                    value={ldapUserSearchFilter}
                    onChange={(e) => setLdapUserSearchFilter(e.target.value)}
                    placeholder="(objectClass=person)"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none font-semibold text-xs"
                  />
                  <span className="block text-[9px] text-slate-400 font-bold mt-1 leading-normal">
                    Attribute field to use when searching user objects. For openLDAP, person
                  </span>
                </div>
              </div>

              <div className="max-w-md text-xs font-bold text-slate-705">
                <label className="block mb-1">User Unique Id Attribute</label>
                <input 
                  type="text" 
                  value={ldapUserUniqueAttr}
                  onChange={(e) => setLdapUserUniqueAttr(e.target.value)}
                  placeholder="nsUniqueId"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none font-semibold text-xs"
                />
                <span className="block text-[9px] text-slate-400 font-bold mt-1 leading-normal">
                  Attribute field to use as a unique immutable identifier for user objects. This is used to track users who rename. For AD, objectGUID, openLDAP
                </span>
              </div>
            </div>

            {/* Card 4: Data Mapping */}
            <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Data Mapping</span>
              
              {/* Mapping table */}
              <div className="space-y-4">
                {/* Headers */}
                <div className="grid grid-cols-12 px-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  <span className="col-span-3">Field in OrangeHRM</span>
                  <span className="col-span-1 text-center"></span>
                  <span className="col-span-5">Field in LDAP Directory</span>
                  <span className="col-span-3 text-right">Use this field as employee mapping</span>
                </div>

                {/* Rows mapping */}
                <div className="space-y-3.5 text-xs font-bold text-slate-700">
                  {/* First Name */}
                  <div className="grid grid-cols-12 items-center">
                    <span className="col-span-3 text-slate-750">First Name</span>
                    <span className="col-span-1 text-center text-slate-400">←</span>
                    <div className="col-span-5">
                      <input 
                        type="text" 
                        value={ldapMapFirstName}
                        onChange={(e) => setLdapMapFirstName(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-slate-900 outline-none font-semibold text-xs"
                      />
                    </div>
                  </div>

                  {/* Middle Name */}
                  <div className="grid grid-cols-12 items-center">
                    <span className="col-span-3 text-slate-750">Middle Name</span>
                    <span className="col-span-1 text-center text-slate-400">←</span>
                    <div className="col-span-5">
                      <input 
                        type="text" 
                        value={ldapMapMiddleName}
                        onChange={(e) => setLdapMapMiddleName(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-slate-900 outline-none font-semibold text-xs"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="grid grid-cols-12 items-center">
                    <span className="col-span-3 text-slate-750">Last Name</span>
                    <span className="col-span-1 text-center text-slate-400">←</span>
                    <div className="col-span-5">
                      <input 
                        type="text" 
                        value={ldapMapLastName}
                        onChange={(e) => setLdapMapLastName(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-slate-900 outline-none font-semibold text-xs"
                      />
                    </div>
                  </div>

                  {/* User Status */}
                  <div className="grid grid-cols-12 items-center">
                    <span className="col-span-3 text-slate-750">User Status</span>
                    <span className="col-span-1 text-center text-slate-400">←</span>
                    <div className="col-span-5">
                      <input 
                        type="text" 
                        value={ldapMapStatus}
                        onChange={(e) => setLdapMapStatus(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-slate-900 outline-none font-semibold text-xs"
                      />
                    </div>
                  </div>

                  {/* Work Email */}
                  <div className="grid grid-cols-12 items-center">
                    <span className="col-span-3 text-slate-750">Work Email</span>
                    <span className="col-span-1 text-center text-slate-400">←</span>
                    <div className="col-span-5">
                      <input 
                        type="text" 
                        value={ldapMapEmail}
                        onChange={(e) => setLdapMapEmail(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-slate-900 outline-none font-semibold text-xs"
                      />
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <button 
                        onClick={() => setLdapMapEmailToggle(!ldapMapEmailToggle)}
                        className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
                          ldapMapEmailToggle ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform duration-300 ease-in-out ${
                          ldapMapEmailToggle ? 'translate-x-4' : ''
                        }`} />
                      </button>
                    </div>
                  </div>

                  {/* Employee Id */}
                  <div className="grid grid-cols-12 items-center">
                    <span className="col-span-3 text-slate-750">Employee Id</span>
                    <span className="col-span-1 text-center text-slate-400">←</span>
                    <div className="col-span-5">
                      <input 
                        type="text" 
                        value={ldapMapEmpId}
                        onChange={(e) => setLdapMapEmpId(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-slate-900 outline-none font-semibold text-xs"
                      />
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <button 
                        onClick={() => setLdapMapEmpIdToggle(!ldapMapEmpIdToggle)}
                        className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
                          ldapMapEmpIdToggle ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform duration-300 ease-in-out ${
                          ldapMapEmpIdToggle ? 'translate-x-4' : ''
                        }`} />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Card 5: Additional Settings */}
            <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Additional Settings</span>
              
              <div className="flex items-center justify-between text-xs font-bold text-slate-705">
                <span>Merge LDAP Users With Existing System Users</span>
                <button 
                  onClick={() => setLdapMergeUsers(!ldapMergeUsers)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
                    ldapMergeUsers ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform duration-300 ease-in-out ${
                    ldapMergeUsers ? 'translate-x-4' : ''
                  }`} />
                </button>
              </div>

              <div className="max-w-md text-xs font-bold text-slate-705 pt-2">
                <label className="block mb-1.5">Sync Interval (in Hours)</label>
                <input 
                  type="text" 
                  value={ldapSyncInterval}
                  onChange={(e) => setLdapSyncInterval(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none font-semibold text-xs"
                />
              </div>

              {/* Alert message */}
              <div className="bg-rose-50 border border-rose-100 text-rose-700 font-semibold text-[10px] rounded-xl p-4 leading-relaxed mt-4">
                Before activating the LDAP service, make sure that all LDAP settings are functioning properly since incorrect configuration may result in corrupted data. As a precaution, we recommend you to create a backup of your database before continuing.
              </div>
            </div>

          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button 
              onClick={() => alert("LDAP connection test initiated...")}
              className="px-5 py-2.5 border border-[#0473b8] bg-white hover:bg-blue-50/50 text-[#0473b8] text-xs font-bold rounded-lg shadow-sm transition-all"
            >
              Test Connection
            </button>
            <button 
              onClick={() => alert("LDAP Configuration saved successfully!")}
              className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Save
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
export default ConfigurationPage;
