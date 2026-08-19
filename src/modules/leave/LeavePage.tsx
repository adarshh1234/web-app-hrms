import React, { useState, useEffect } from 'react';
import { 
  getLeaveRequests, 
  saveLeaveRequests, 
  getLeaveBalances, 
  saveLeaveBalances,
  LeaveRequest, 
  LeaveBalance 
} from '../../data/mockData';
import { 
  Plus, 
  Search, 
  Calendar, 
  FileText, 
  Settings, 
  Clock, 
  Check, 
  X,
  AlertCircle
} from 'lucide-react';
import Modal from '../../components/common/Modal';

export const LeavePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'apply' | 'my-leave' | 'entitlements' | 'reports' | 'configure'>('apply');
  const [activeEntitlementSub, setActiveEntitlementSub] = useState<'my' | 'employee' | 'add'>('my');

  // Database States
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [balances, setBalances] = useState<LeaveBalance[]>([]);

  // Apply Form States
  const [leaveType, setLeaveType] = useState('CAN-Vacation');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveDays, setLeaveDays] = useState(0);

  // Add Entitlement Form States
  const [entType, setEntType] = useState('CAN-Vacation');
  const [entEmployee, setEntEmployee] = useState('Sarah Johnson');
  const [entDays, setEntDays] = useState(15);
  const [entPeriod, setEntPeriod] = useState('2026-01-01 - 2026-12-31');

  // Search Filter
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setRequests(getLeaveRequests());
    setBalances(getLeaveBalances());
  }, []);

  // Compute number of days when fromDate or toDate changes
  useEffect(() => {
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setLeaveDays(diffDays);
    } else {
      setLeaveDays(0);
    }
  }, [fromDate, toDate]);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromDate || !toDate) return;
    
    const newReq: LeaveRequest = {
      id: `LR00${requests.length + 1}`,
      employeeName: 'Sarah Johnson', // Mock user
      department: 'Marketing',
      leaveType,
      fromDate,
      toDate,
      numberOfDays: leaveDays,
      status: 'Pending',
      comments: reason,
      dateRequested: new Date().toISOString().split('T')[0]
    };

    const updated = [newReq, ...requests];
    setRequests(updated);
    saveLeaveRequests(updated);

    // Update balances (deduct pending)
    const updatedBalances = balances.map(bal => {
      if (bal.leaveType === leaveType) {
        return {
          ...bal,
          pending: bal.pending + leaveDays,
          balance: bal.balance - leaveDays
        };
      }
      return bal;
    });
    setBalances(updatedBalances);
    saveLeaveBalances(updatedBalances);

    alert("Leave request submitted successfully! Status is set to Pending.");
    setFromDate('');
    setToDate('');
    setReason('');
    setActiveTab('my-leave');
  };

  const handleAddEntitlement = (e: React.FormEvent) => {
    e.preventDefault();
    // Update balance entitlements
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
    setBalances(updatedBalances);
    saveLeaveBalances(updatedBalances);

    alert(`Successfully added ${entDays} days leave entitlement of type ${entType} for ${entEmployee}.`);
    setActiveEntitlementSub('my');
  };

  const handleApprove = (id: string) => {
    const updated = requests.map(req => {
      if (req.id === id) {
        // deduct taken count
        if (req.status === 'Pending') {
          const updatedBalances = balances.map(bal => {
            if (bal.leaveType === req.leaveType) {
              return {
                ...bal,
                pending: Math.max(0, bal.pending - req.numberOfDays),
                taken: bal.taken + req.numberOfDays
              };
            }
            return bal;
          });
          setBalances(updatedBalances);
          saveLeaveBalances(updatedBalances);
        }
        return { ...req, status: 'Approved' as const };
      }
      return req;
    });
    setRequests(updated);
    saveLeaveRequests(updated);
  };

  const handleReject = (id: string) => {
    const updated = requests.map(req => {
      if (req.id === id) {
        if (req.status === 'Pending') {
          const updatedBalances = balances.map(bal => {
            if (bal.leaveType === req.leaveType) {
              return {
                ...bal,
                pending: Math.max(0, bal.pending - req.numberOfDays),
                balance: bal.balance + req.numberOfDays
              };
            }
            return bal;
          });
          setBalances(updatedBalances);
          saveLeaveBalances(updatedBalances);
        }
        return { ...req, status: 'Rejected' as const };
      }
      return req;
    });
    setRequests(updated);
    saveLeaveRequests(updated);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 m-0">Leave Management</h1>
          <p className="text-sm text-slate-500 mt-1">Submit leave requests, check entitlements, and configure rosters.</p>
        </div>

        {/* Tab Links */}
        <div className="flex flex-wrap border-b border-slate-200">
          {(['apply', 'my-leave', 'entitlements', 'reports', 'configure'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 uppercase tracking-wider transition-all -mb-[2px] ${
                activeTab === tab 
                  ? 'border-[var(--primary-color)] text-[var(--primary-color)] font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'apply' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Apply Form */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Apply Leave</h3>
            
            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Leave Type *</label>
                  <select 
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                  >
                    <option value="CAN-Vacation">CAN - Vacation</option>
                    <option value="CAN-Personal">CAN - Personal</option>
                    <option value="CAN-Sick">CAN - Sick</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">From Date *</label>
                  <input 
                    type="date"
                    required
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">To Date *</label>
                  <input 
                    type="date"
                    required
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                  />
                </div>

                {leaveDays > 0 && (
                  <div className="col-span-2 bg-slate-50 border border-slate-100 rounded-lg p-3 text-xs text-slate-700">
                    Calculated Duration: <span className="font-bold text-slate-900">{leaveDays} Day(s)</span>
                  </div>
                )}

                <div className="col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Reason / Comment</label>
                  <textarea 
                    rows={3}
                    placeholder="Enter reason for leave request"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => { setFromDate(''); setToDate(''); setReason(''); }}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50"
                >
                  Reset
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold rounded-lg shadow-sm"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>

          {/* Quick Roster Balances info card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Clock className="h-4 w-4 text-[var(--primary-color)]" />
              <span>Leave Balances</span>
            </h3>
            <div className="space-y-3">
              {balances.map(bal => (
                <div key={bal.leaveType} className="flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-semibold text-slate-800">{bal.leaveType}</h4>
                    <p className="text-[10px] text-slate-400">Entitled: {bal.entitled}d · Pending: {bal.pending}d</p>
                  </div>
                  <span className="bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded text-xs border border-slate-200">
                    {bal.balance} Day(s)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'my-leave' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900">All Applied Leaves (Roster List)</h3>
            <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-full">{requests.length} Requests</span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Leave Type</th>
                  <th className="px-6 py-4">Dates</th>
                  <th className="px-6 py-4">Days</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {requests.length > 0 ? (
                  requests.map(req => (
                    <tr key={req.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-800">{req.employeeName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600">{req.leaveType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                        {req.fromDate} to {req.toDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-700">{req.numberOfDays}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                          req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          req.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                          'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-semibold">
                        {req.status === 'Pending' ? (
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleApprove(req.id)}
                              className="p-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded border border-emerald-200 inline-flex"
                              title="Approve"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                            <button 
                              onClick={() => handleReject(req.id)}
                              className="p-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded border border-rose-200 inline-flex"
                              title="Reject"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-400 font-medium">Logged</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                      No Records Found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'entitlements' && (
        <div className="space-y-6 animate-fade-in">
          {/* Sub Navigation */}
          <div className="flex border-b border-slate-200">
            <button 
              onClick={() => setActiveEntitlementSub('my')}
              className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] ${activeEntitlementSub === 'my' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
            >
              My Entitlement
            </button>
            <button 
              onClick={() => setActiveEntitlementSub('employee')}
              className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] ${activeEntitlementSub === 'employee' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
            >
              Employee Entitlement
            </button>
            <button 
              onClick={() => setActiveEntitlementSub('add')}
              className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] ${activeEntitlementSub === 'add' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
            >
              Add Entitlement
            </button>
          </div>

          {activeEntitlementSub === 'my' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
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
                  {balances.map((bal, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
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
                <button className="px-4 py-1.5 bg-[var(--primary-color)] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[var(--primary-hover)]">
                  Search
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
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
                    ].filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
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
                  <button type="button" onClick={() => setActiveEntitlementSub('my')} className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold rounded-lg shadow-sm">Save</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 animate-fade-in">
          <h3 className="text-base font-bold text-slate-900">Leave Entitlements and Usage Report</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Location</label>
              <select className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800 outline-none">
                <option>All Locations</option>
                <option>Kochi</option>
                <option>Texas</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Sub Unit</label>
              <select className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800 outline-none">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Marketing</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Leave Type</label>
              <select className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800 outline-none">
                <option>CAN-Vacation</option>
                <option>CAN-Personal</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={() => alert("Leave usage report generated below!")}
                className="w-full py-1.5 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Generate
              </button>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 text-center py-6 text-slate-400 text-xs font-semibold">
            Click Generate to pull leave balances.
          </div>
        </div>
      )}

      {activeTab === 'configure' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {/* Work Week configuration from Figma */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Work Week Rules</h3>
            <div className="space-y-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day} className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">{day}</span>
                  <select className="border border-slate-200 rounded px-2 py-0.5 bg-white text-xs text-slate-800">
                    <option value="full">Full Day</option>
                    <option value="half">Half Day</option>
                    <option value="off" selected={day === 'Saturday' || day === 'Sunday'}>Non-Working Day</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Holidays */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">National Holidays</h3>
              <button onClick={() => alert("Add Holiday Modal")} className="text-[var(--primary-color)] text-xs font-bold hover:underline">Add</button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 hover:bg-slate-50 rounded">
                <div>
                  <h4 className="font-semibold text-slate-800">Christmas Day</h4>
                  <p className="text-[10px] text-slate-400">Dec 25, 2026</p>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold self-center">National</span>
              </div>
              <div className="flex justify-between p-2 hover:bg-slate-50 rounded">
                <div>
                  <h4 className="font-semibold text-slate-800">New Year Holiday</h4>
                  <p className="text-[10px] text-slate-400">Jan 01, 2026</p>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold self-center">National</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default LeavePage;
