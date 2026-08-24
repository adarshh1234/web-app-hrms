import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export const LdapAuthTab: React.FC = () => {
  const toast = useToast();
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

  return (
    <div className="space-y-6">
      
      {/* Header config label with switch */}
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-bold text-slate-900 m-0">LDAP Configuration</h2>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Enable</span>
          <button 
            onClick={() => setLdapEnabled(!ldapEnabled)}
            className={`w-10 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out cursor-pointer ${
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
              className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out cursor-pointer ${
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
                    className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out cursor-pointer ${
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
                    className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out cursor-pointer ${
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
              className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out cursor-pointer ${
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
          onClick={() => toast.info("LDAP connection test initiated...")}
          className="px-5 py-2.5 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 transition-all bg-white cursor-pointer"
        >
          Test Connection
        </button>
        <button 
          type="button"
          onClick={() => toast.success("LDAP Configuration saved successfully!")}
          className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          Save
        </button>
      </div>

    </div>
  );
};

export default LdapAuthTab;
