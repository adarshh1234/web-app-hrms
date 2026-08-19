import React, { useState, useEffect } from 'react';
import { 
  getAssociationRequests, 
  saveAssociationRequests,
  AssociationRequest 
} from '../../data/mockData';
import { 
  Link2, 
  Check, 
  X, 
  Search 
} from 'lucide-react';

export const AssociationPage: React.FC = () => {
  const [requests, setRequests] = useState<AssociationRequest[]>([]);

  useEffect(() => {
    setRequests(getAssociationRequests());
  }, []);

  const handleAction = (id: string, action: 'Accepted' | 'Cancelled') => {
    const updated = requests.map(req => {
      if (req.id === id) {
        return { ...req, status: action };
      }
      return req;
    });
    setRequests(updated);
    saveAssociationRequests(updated);
    alert(`Association request ${action.toLowerCase()}!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 m-0">Inhouse Association Monitoring</h1>
        <p className="text-sm text-slate-500 mt-1">Review requests from employees wishing to collaborate with cross-functional sub-units.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
          <Link2 className="h-5 w-5 text-[var(--primary-color)]" />
          <span>New Association Requests</span>
        </h3>

        <div className="space-y-4 max-w-2xl">
          {requests.map((req, idx) => (
            <div key={idx} className="p-4 border border-slate-100 rounded-xl space-y-3 bg-slate-50/50">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{req.employeeName}</h4>
                  <p className="text-[10px] text-slate-400">Date: {req.dateRequested}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  req.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                  req.status === 'Cancelled' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                  'bg-amber-50 text-amber-700 border-amber-100'
                }`}>{req.status}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{req.requestDetails}</p>
              
              {req.status === 'Pending' && (
                <div className="flex gap-2 justify-end border-t border-slate-100 pt-3">
                  <button 
                    onClick={() => handleAction(req.id, 'Cancelled')}
                    className="px-3 py-1.5 border border-slate-200 text-slate-700 font-bold text-xs rounded hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => handleAction(req.id, 'Accepted')}
                    className="px-4 py-1.5 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white font-bold text-xs rounded shadow-sm"
                  >
                    Accept
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AssociationPage;
