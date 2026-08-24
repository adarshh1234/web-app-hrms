import React, { useState, useEffect } from 'react';
import { FinanceRequest } from '../../types';
import payrollService from '../../services/payrollService';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import Badge from '../../components/common/Badge';
import { 
  HeartPulse, 
  Award, 
  Car,
  Check,
  X
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const PayrollPage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'payroll-tap' | 'benefit-advance' | 'finance-requests'>('payroll-tap');
  const [financeRequests, setFinanceRequests] = useState<FinanceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [payrollEmployees, setPayrollEmployees] = useState([
    { id: '1', name: 'Sarah Johnson', dept: 'Marketing', date: 'July 20, 2025', status: 'Pending' },
    { id: '2', name: 'Michael Chen', dept: 'Engineering', date: 'July 20, 2025', status: 'Payed' },
    { id: '3', name: 'James Wilson', dept: 'Sales', date: 'July 20, 2025', status: 'Pending' },
    { id: '4', name: 'Lisa Anderson', dept: 'Marketing', date: 'July 20, 2025', status: 'Payed' }
  ]);

  const loadFinanceRequests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await payrollService.getFinanceRequests();
      setFinanceRequests(data);
    } catch (err) {
      setError('Failed to load finance requests.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFinanceRequests();
  }, []);

  const handlePaySubmit = (id: string) => {
    setPayrollEmployees(payrollEmployees.map(emp => {
      if (emp.id === id) {
        return { ...emp, status: 'Payed' };
      }
      return emp;
    }));
    toast.success('Payment processed successfully!');
  };

  const handleFinanceApprove = async (id: string) => {
    try {
      await payrollService.updateFinanceRequestStatus(id, 'Approved');
      await loadFinanceRequests();
      toast.success('Finance request approved!');
    } catch (err) {
      toast.error('Failed to approve request.');
    }
  };

  const handleFinanceReject = async (id: string) => {
    try {
      await payrollService.updateFinanceRequestStatus(id, 'Rejected');
      await loadFinanceRequests();
      toast.error('Finance request rejected!');
    } catch (err) {
      toast.error('Failed to reject request.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 m-0">Payroll Hub</h1>
          <p className="text-sm text-slate-500 mt-1">Disburse salaries in one tap, manage benefit advances, and approve financial requests.</p>
        </div>

        <div className="flex flex-wrap border-b border-slate-200">
          {(['payroll-tap', 'benefit-advance', 'finance-requests'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 uppercase tracking-wider transition-all -mb-[2px] cursor-pointer ${
                activeTab === tab 
                  ? 'border-[var(--primary-color)] text-[var(--primary-color)] font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {tab === 'payroll-tap' ? 'Payroll in One Tap' : tab.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'payroll-tap' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900">Salary Disbursal</h3>
            <button 
              onClick={() => {
                setPayrollEmployees(payrollEmployees.map(e => ({ ...e, status: 'Payed' })));
                toast.success('All salaries processed successfully in one tap!');
              }}
              className="px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
            >
              Pay All Employees
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Employee Name</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Disbursal Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {payrollEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-800">{emp.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">{emp.dept}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">{emp.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        emp.status === 'Payed' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-semibold">
                      {emp.status === 'Pending' ? (
                        <button 
                          onClick={() => handlePaySubmit(emp.id)}
                          className="px-3 py-1 bg-[#0473b8] text-white font-semibold rounded hover:bg-[#03629e] cursor-pointer"
                        >
                          Pay
                        </button>
                      ) : (
                        <span className="text-slate-400 font-medium">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'benefit-advance' && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-base font-bold text-slate-900">Easy Employee Benefit Advance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="h-10 w-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">Annual Health Check-ups</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Free or discounted full-body check-ups provided yearly for preventive health.</p>
              </div>
              <button 
                onClick={() => toast.success('Applied for Annual Health Check-ups Benefit!')}
                className="w-full py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                  <Award className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">Workshops & Conferences</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Sponsorship for attending or speaking at industry events to gain exposure and knowledge.</p>
              </div>
              <button 
                onClick={() => toast.success('Applied for Workshops & Conferences sponsorship!')}
                className="w-full py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                  <Car className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">Cab / Transport Facilities</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Free or subsidized transportation for commuting to and from the workplace.</p>
              </div>
              <button 
                onClick={() => toast.success('Applied for Cab / Transport facilities!')}
                className="w-full py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'finance-requests' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900">Finance Requests</h3>
            <div className="flex gap-2">
              <select className="border border-slate-200 rounded-lg text-xs font-semibold px-2 py-1 bg-white">
                <option>All Status</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Request Type</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Date Requested</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {financeRequests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">{req.employeeName}</div>
                      <div className="text-xs text-slate-400">ID: {req.employeeId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-655 font-medium">{req.requestType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">{req.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">{req.dateRequested}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-800">
                      ${req.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={req.status === 'Approved' ? 'success' : req.status === 'Rejected' ? 'error' : 'warning'} size="sm">
                        {req.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-semibold">
                      {req.status === 'Pending' ? (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleFinanceApprove(req.id)}
                            className="p-1 bg-emerald-50 text-emerald-700 border border-emerald-250 rounded hover:bg-emerald-100 cursor-pointer"
                            title="Approve Request"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                          <button 
                            onClick={() => handleFinanceReject(req.id)}
                            className="p-1 bg-rose-50 text-rose-700 border border-rose-250 rounded hover:bg-rose-100 cursor-pointer"
                            title="Reject Request"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-medium">Logged</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PayrollPage;
