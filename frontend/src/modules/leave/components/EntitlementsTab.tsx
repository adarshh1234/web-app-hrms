import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { LeaveBalance } from '../../../types';
import leaveService from '../../../services/leaveService';
import { useToast } from '../../../hooks/useToast';

interface EntitlementsTabProps {
  balances: LeaveBalance[];
  onRefresh: () => void;
}

export const EntitlementsTab: React.FC<EntitlementsTabProps> = ({ balances, onRefresh }) => {
  const toast = useToast();
  const [activeEntitlementSub, setActiveEntitlementSub] = useState<'my' | 'employee' | 'add'>('my');
  const [searchTerm, setSearchTerm] = useState('');

  // Add Entitlement Form States
  const [entType, setEntType] = useState('CAN-Vacation');
  const [entEmployee, setEntEmployee] = useState('Sarah Johnson');
  const [entDays, setEntDays] = useState(15);
  const [entPeriod, setEntPeriod] = useState('2026-01-01 - 2026-12-31');

  const handleAddEntitlement = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBalances = balances.map(bal => {
      if (bal.leaveType === entType) {
        return {
          ...bal,
          entitled: bal.entitled + entDays,
          balance: bal.balance + entDays
        };
      }
      return bal;
    });
    await leaveService.saveBalances(updatedBalances);
    onRefresh();

    toast.success(`Successfully added ${entDays} days leave entitlement of type ${entType} for ${entEmployee}.`);
    setActiveEntitlementSub('my');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Sub Navigation */}
      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveEntitlementSub('my')}
          className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] cursor-pointer ${activeEntitlementSub === 'my' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
        >
          My Entitlement
        </button>
        <button 
          onClick={() => setActiveEntitlementSub('employee')}
          className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] cursor-pointer ${activeEntitlementSub === 'employee' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
        >
          Employee Entitlement
        </button>
        <button 
          onClick={() => setActiveEntitlementSub('add')}
          className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] cursor-pointer ${activeEntitlementSub === 'add' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
        >
          Add Entitlement
        </button>
      </div>

      {activeEntitlementSub === 'my' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Leave Type</th>
                <th className="px-6 py-4">Entitled Days</th>
                <th className="px-6 py-4">Taken Days</th>
                <th className="px-6 py-4">Pending Approval</th>
                <th className="px-6 py-4">Valid Period</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {balances.map((bal) => (
                <tr key={bal.leaveType} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-800">{bal.leaveType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600 font-bold">{bal.entitled}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600 font-bold">{bal.taken}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600 font-bold">{bal.pending}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400">2026-01-01 to 2026-12-31</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {activeEntitlementSub === 'employee' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex gap-3 max-w-md">
            <div className="flex-1 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5">
              <Search className="h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search Employee Name" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-900 outline-none"
              />
            </div>
            <button className="px-4 py-1.5 bg-[var(--primary-color)] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[var(--primary-hover)] cursor-pointer">
              Search
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Leave Type</th>
                  <th className="px-6 py-4">Entitled</th>
                  <th className="px-6 py-4">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { name: 'Michael Chen', type: 'CAN-Vacation', entitled: 15, balance: 12 },
                  { name: 'Lisa Anderson', type: 'CAN-Personal', entitled: 5, balance: 3 },
                  { name: 'Karthika Balan', type: 'CAN-Sick', entitled: 10, balance: 9 }
                ].filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                  <tr key={`${item.name}-${item.type}`} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-800">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-655">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-655 font-bold">{item.entitled}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-emerald-700">{item.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      )}

      {activeEntitlementSub === 'add' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm max-w-lg space-y-4">
          <h3 className="text-base font-bold text-slate-900">Add Leave Entitlement</h3>
          <form onSubmit={handleAddEntitlement} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Employee *</label>
              <select
                value={entEmployee}
                onChange={(e) => setEntEmployee(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
              >
                <option>Sarah Johnson</option>
                <option>Michael Chen</option>
                <option>Lisa Anderson</option>
                <option>Karthika Balan</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Leave Type *</label>
                <select
                  value={entType}
                  onChange={(e) => setEntType(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                >
                  <option value="CAN-Vacation">CAN - Vacation</option>
                  <option value="CAN-Personal">CAN - Personal</option>
                  <option value="CAN-Sick">CAN - Sick</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Entitlement (Days) *</label>
                <input 
                  type="number"
                  required
                  value={entDays}
                  onChange={(e) => setEntDays(parseInt(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Leave Period</label>
              <input 
                type="text"
                value={entPeriod}
                onChange={(e) => setEntPeriod(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button type="button" onClick={() => setActiveEntitlementSub('my')} className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 cursor-pointer">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EntitlementsTab;
