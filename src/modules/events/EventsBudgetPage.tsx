import React, { useState } from 'react';
import { DollarSign, Plus, PieChart, TrendingDown, CheckCircle2, Clock, Trash2, Edit2, Wallet } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface EventBudgetItem {
  id: string;
  eventName: string;
  category: string;
  allocated: number;
  spent: number;
  status: 'Approved' | 'Pending Review' | 'Over Budget';
  owner: string;
}

export const EventsBudgetPage: React.FC = () => {
  const toast = useToast();
  const [budgetList, setBudgetList] = useState<EventBudgetItem[]>([
    {
      id: '1',
      eventName: 'Annual Corporate Gala 2026',
      category: 'Grand Venue & Banquet',
      allocated: 18000,
      spent: 16500,
      status: 'Approved',
      owner: 'Sarah Joseph'
    },
    {
      id: '2',
      eventName: 'Q3 All-Hands Tech Hackathon',
      category: 'Catering & Swag Kits',
      allocated: 6500,
      spent: 5800,
      status: 'Approved',
      owner: 'Alex Morgan'
    },
    {
      id: '3',
      eventName: 'Autumn Team Leadership Retreat',
      category: 'Travel & Accommodation',
      allocated: 12000,
      spent: 13200,
      status: 'Over Budget',
      owner: 'David Lee'
    },
    {
      id: '4',
      eventName: 'End of Year CSR Charity Run',
      category: 'Logistics & Branding',
      allocated: 4500,
      spent: 0,
      status: 'Pending Review',
      owner: 'Rachel Green'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [newEvtName, setNewEvtName] = useState('');
  const [newCategory, setNewCategory] = useState('Venue & Catering');
  const [newAllocated, setNewAllocated] = useState('');
  const [newOwner, setNewOwner] = useState('');

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvtName.trim() || !newAllocated) {
      toast.error('Event Name and Allocated Budget are required.');
      return;
    }
    const newItem: EventBudgetItem = {
      id: Date.now().toString(),
      eventName: newEvtName,
      category: newCategory,
      allocated: parseFloat(newAllocated) || 0,
      spent: 0,
      status: 'Pending Review',
      owner: newOwner || 'Sarah Joseph'
    };
    setBudgetList([...budgetList, newItem]);
    setNewEvtName('');
    setNewAllocated('');
    setNewOwner('');
    toast.success('Event budget item added for approval!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this event budget item?')) {
      setBudgetList(budgetList.filter((b) => b.id !== id));
      toast.success('Budget record removed.');
    }
  };

  const totalAllocated = budgetList.reduce((acc, b) => acc + b.allocated, 0);
  const totalSpent = budgetList.reduce((acc, b) => acc + b.spent, 0);
  const variance = totalAllocated - totalSpent;

  const filteredItems = budgetList.filter(
    (b) =>
      b.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 m-0">
            <Wallet className="h-5 w-5 text-[#006666]" />
            <span>Event Budget & Expense Planning</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage corporate event allocations, venue expenses, catering, and budget variances.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1">
          <span className="text-slate-400 font-semibold text-[11px] block">Total Event Pool</span>
          <span className="text-2xl font-extrabold text-slate-900">${totalAllocated.toLocaleString()}</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1">
          <span className="text-slate-400 font-semibold text-[11px] block">Actual Spent to Date</span>
          <span className="text-2xl font-extrabold text-[#006666]">${totalSpent.toLocaleString()}</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1">
          <span className="text-slate-400 font-semibold text-[11px] block">Remaining Savings / Variance</span>
          <span className={`text-2xl font-extrabold ${variance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            ${variance.toLocaleString()}
          </span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-1">
          <span className="text-slate-400 font-semibold text-[11px] block">Approval Status</span>
          <span className="text-2xl font-extrabold text-purple-700">3 Approved</span>
        </div>
      </div>

      {/* Add Budget Form Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
          Request Event Budget Allocation
        </h2>
        <form onSubmit={handleAddBudget} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-700">
          <div>
            <label className="block mb-1">Event Title</label>
            <input
              type="text"
              placeholder="e.g. Q4 Regional Sales Summit"
              value={newEvtName}
              onChange={(e) => setNewEvtName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            />
          </div>
          <div>
            <label className="block mb-1">Expense Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full bg-white rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            >
              <option value="Venue & Catering">Venue & Catering</option>
              <option value="Audio/Visual & Tech">Audio/Visual & Tech</option>
              <option value="Travel & Accommodation">Travel & Accommodation</option>
              <option value="Branding & Merchandise">Branding & Merchandise</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Allocated Amount ($)</label>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={newAllocated}
              onChange={(e) => setNewAllocated(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)] font-mono"
            />
          </div>
          <div>
            <label className="block mb-1">Event Owner</label>
            <input
              type="text"
              placeholder="e.g. Sarah Joseph"
              value={newOwner}
              onChange={(e) => setNewOwner(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:border-[var(--primary-color)]"
            />
          </div>
          <div className="sm:col-span-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-[#004848] hover:bg-[#003333] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Event Budget</span>
            </button>
          </div>
        </form>
      </div>

      {/* Budget Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-500">({filteredItems.length}) Event Budgets Listed</span>
          <input
            type="text"
            placeholder="Search event budget..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-[var(--primary-color)] w-full sm:w-64"
          />
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-750">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Event Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Owner</th>
                  <th className="px-6 py-4">Allocated ($)</th>
                  <th className="px-6 py-4">Spent ($)</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-900">{item.eventName}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-500">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-700">{item.owner}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-slate-800">
                      ${item.allocated.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-[#006666]">
                      ${item.spent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        item.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'Over Budget'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => toast.info(`Editing budget for ${item.eventName}`)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsBudgetPage;
