import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, FileText, Calendar, DollarSign, Award, UserCheck, CreditCard, Sparkles, TrendingUp } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import Modal from '../../components/common/Modal';

interface PayrollRow {
  id: string;
  name: string;
  dept: string;
  date: string;
  status: 'Payed' | 'Pending';
}

type PayrollTabType = 
  | 'statement' 
  | 'upcoming' 
  | 'slips' 
  | 'pay-grades' 
  | 'employment-status' 
  | 'pay-on-request' 
  | 'advance-payments' 
  | 'reports';

const TABS: { id: PayrollTabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'statement', label: 'Salary Statement', icon: FileText },
  { id: 'upcoming', label: 'Upcoming Salary', icon: Calendar },
  { id: 'slips', label: 'Salary Slips', icon: DollarSign },
  { id: 'pay-grades', label: 'Pay Grades', icon: Award },
  { id: 'employment-status', label: 'Employment Status', icon: UserCheck },
  { id: 'pay-on-request', label: 'Pay on Request', icon: CreditCard },
  { id: 'advance-payments', label: 'Advance Payments', icon: TrendingUp },
  { id: 'reports', label: 'AI Reports and Analytics', icon: Sparkles }
];

export const PayrollOneTapPage: React.FC = () => {
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as PayrollTabType | null;
  const activeTab: PayrollTabType = tabParam && TABS.some(t => t.id === tabParam) ? tabParam : 'statement';

  const setActiveTab = (tab: PayrollTabType) => {
    setSearchParams({ tab });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [payAmount, setPayAmount] = useState('$00.00');

  const [rows, setRows] = useState<PayrollRow[]>([
    { id: '1', name: 'Sarah Johnson', dept: 'Marketing', date: 'July 20, 2025', status: 'Payed' },
    { id: '2', name: 'Sarah Johnson', dept: 'Marketing', date: 'July 20, 2025', status: 'Pending' },
    { id: '3', name: 'Sarah Johnson', dept: 'Marketing', date: 'July 20, 2025', status: 'Pending' },
    { id: '4', name: 'Sarah Johnson', dept: 'Marketing', date: 'July 20, 2025', status: 'Payed' },
  ]);

  const handlePayClick = (id: string) => {
    setSelectedRow(id);
    setPayAmount('$00.00');
  };

  const handleConfirmPay = () => {
    if (!selectedRow) return;
    setRows(prev => prev.map(r => r.id === selectedRow ? { ...r, status: 'Payed' } : r));
    setSelectedRow(null);
    toast.success('Payment processed successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Payroll in One Tap</h1>
        <p className="text-xs text-slate-500 mt-1">Manage single-tap payroll processing, salary slips, pay grades, and analytics.</p>
      </div>

      {/* 8 Top Navigation Tabs */}
      <div className="flex flex-wrap gap-2.5 items-center border-b border-slate-200 pb-3 select-none">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] text-white font-extrabold border-transparent shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content depending on Active Tab */}
      {(activeTab === 'statement' || activeTab === 'upcoming' || activeTab === 'slips' || activeTab === 'pay-on-request' || activeTab === 'advance-payments') && (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-3">
            <div className="grid grid-cols-5 px-4 py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              <span className="col-span-2">Employee Name</span>
              <span>Department</span>
              <span>Date</span>
              <span className="text-right">Status</span>
            </div>

            <div className="space-y-2">
              {rows.map((row) => (
                <div 
                  key={row.id}
                  className="grid grid-cols-5 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm text-xs font-bold text-slate-805"
                >
                  <span className="col-span-2">{row.name}</span>
                  <span className="text-slate-500 font-semibold">{row.dept}</span>
                  <span className="text-slate-500 font-semibold">{row.date}</span>
                  
                  <div className="flex justify-end items-center gap-4">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                      row.status === 'Payed' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {row.status}
                    </span>

                    {row.status === 'Pending' && (
                      <button 
                        onClick={() => handlePayClick(row.id)}
                        className="px-4 py-1 bg-[#004848] hover:bg-[#003333] text-white text-[10px] font-bold rounded transition-colors cursor-pointer"
                      >
                        Pay
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end items-center gap-2 pt-4">
            <button className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-500">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3].map(page => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-xs font-bold border rounded-md transition-colors ${
                  currentPage === page 
                    ? 'bg-[#004848] text-white border-[#004848] font-extrabold shadow-sm'
                    : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-500">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'pay-grades' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 animate-fade-in shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Pay Grades</h3>
          <p className="text-xs text-slate-500">Configured salary grades and compensation brackets for roles across departments.</p>
          <div className="grid grid-cols-3 gap-4 pt-2">
            {[
              { grade: 'Grade A - Executive', salary: '$120,000 - $180,000 / yr' },
              { grade: 'Grade B - Senior Lead', salary: '$85,000 - $115,000 / yr' },
              { grade: 'Grade C - Specialist', salary: '$55,000 - $80,000 / yr' }
            ].map((item, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 space-y-1">
                <span className="text-xs font-bold text-slate-900 block">{item.grade}</span>
                <span className="text-[11px] font-semibold text-[#004848] block">{item.salary}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'employment-status' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 animate-fade-in shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Employment Status Breakdown</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { status: 'Full-Time Permanent', count: '142 Employees' },
              { status: 'Part-Time', count: '28 Employees' },
              { status: 'Contract / Freelance', count: '15 Workers' },
              { status: 'Probationary', count: '9 Employees' }
            ].map((item, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 space-y-1">
                <span className="text-xs font-bold text-slate-700 block">{item.status}</span>
                <span className="text-base font-extrabold text-[#004848] block">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 animate-fade-in shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900">AI Payroll Reports & Analytics</h3>
          </div>
          <p className="text-xs text-slate-500">Automated insights, monthly payroll variance, and budget forecasting.</p>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="border border-teal-100 bg-teal-50/40 rounded-lg p-4 space-y-1">
              <span className="text-xs font-bold text-teal-900 block">Total Monthly Outflow</span>
              <span className="text-lg font-extrabold text-[#004848] block">$482,500.00</span>
            </div>
            <div className="border border-indigo-100 bg-indigo-50/40 rounded-lg p-4 space-y-1">
              <span className="text-xs font-bold text-indigo-900 block">Pending Requests</span>
              <span className="text-lg font-extrabold text-indigo-700 block">12 Payments</span>
            </div>
            <div className="border border-emerald-100 bg-emerald-50/40 rounded-lg p-4 space-y-1">
              <span className="text-xs font-bold text-emerald-900 block">AI Budget Variance</span>
              <span className="text-lg font-extrabold text-emerald-700 block">-1.4% (Within Limit)</span>
            </div>
          </div>
        </div>
      )}

      <Modal isOpen={!!selectedRow} onClose={() => setSelectedRow(null)} title="Enter Amount">
        <div className="space-y-4">
          <input 
            type="text" 
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
            className="w-full border border-slate-200 rounded-lg p-3 text-slate-800 font-mono text-sm outline-none focus:border-[#004848]"
          />

          <div className="flex justify-end gap-3 pt-3">
            <button 
              onClick={() => setSelectedRow(null)}
              className="px-5 py-2 border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 text-xs transition-all bg-white cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={handleConfirmPay}
              className="px-6 py-2 bg-[#004848] hover:bg-[#003333] text-white font-bold rounded-lg shadow-sm text-xs cursor-pointer"
            >
              Pay
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PayrollOneTapPage;
