import React from 'react';
import { Check, X } from 'lucide-react';
import { LeaveRequest, LeaveBalance } from '../../../types';
import leaveService from '../../../services/leaveService';
import Badge from '../../../components/common/Badge';
import { useToast } from '../../../hooks/useToast';

interface MyLeaveListTabProps {
  requests: LeaveRequest[];
  balances: LeaveBalance[];
  onRefresh: () => void;
}

export const MyLeaveListTab: React.FC<MyLeaveListTabProps> = ({ requests, balances, onRefresh }) => {
  const toast = useToast();

  const handleApprove = async (id: string) => {
    try {
      await leaveService.updateRequestStatus(id, 'Approved');
      const req = requests.find(r => r.id === id);
      if (req && req.status === 'Pending') {
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
        await leaveService.saveBalances(updatedBalances);
      }
      onRefresh();
    } catch (err) {
      toast.error("Failed to approve request.");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await leaveService.updateRequestStatus(id, 'Rejected');
      const req = requests.find(r => r.id === id);
      if (req && req.status === 'Pending') {
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
        await leaveService.saveBalances(updatedBalances);
      }
      onRefresh();
    } catch (err) {
      toast.error("Failed to reject request.");
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-bold text-slate-900">All Applied Leaves (Roster List)</h3>
        <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-full">{requests.length} Requests</span>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
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
                    <Badge variant={req.status === 'Approved' ? 'success' : req.status === 'Rejected' ? 'error' : 'warning'} size="sm">
                      {req.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-semibold">
                    {req.status === 'Pending' ? (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleApprove(req.id)}
                          className="p-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded border border-emerald-200 inline-flex cursor-pointer"
                          title="Approve"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => handleReject(req.id)}
                          className="p-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded border border-rose-200 inline-flex cursor-pointer"
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
    </div>
  );
};

export default MyLeaveListTab;
