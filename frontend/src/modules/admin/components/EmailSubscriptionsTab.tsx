import React, { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import adminService from '../../../services/adminService';

export const EmailSubscriptionsTab: React.FC = () => {
  const toast = useToast();
  const [subscriptions, setSubscriptions] = useState([
    { id: '1', type: 'Leave Applications', enabled: true },
    { id: '2', type: 'Leave Approvals', enabled: true },
    { id: '3', type: 'Leave Assignments', enabled: true },
    { id: '4', type: 'Leave Cancellations', enabled: true },
    { id: '5', type: 'Leave Rejections', enabled: true },
  ]);

  useEffect(() => {
    adminService.getConfiguration()
      .then((cfg) => {
        if (cfg?.emailSubscriptions) {
          setSubscriptions((prev) =>
            prev.map((sub) => {
              return sub.type in cfg.emailSubscriptions
                ? { ...sub, enabled: !!cfg.emailSubscriptions[sub.type] }
                : sub;
            })
          );
        }
      })
      .catch(() => {});
  }, []);

  const toggleSubscription = async (id: string) => {
    const updated = subscriptions.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s));
    setSubscriptions(updated);
    
    const subMap: Record<string, boolean> = {};
    updated.forEach((s) => {
      subMap[s.type] = s.enabled;
    });

    try {
      await adminService.updateConfiguration({ emailSubscriptions: subMap });
      toast.success("Subscription setting updated");
    } catch (err: any) {
      toast.error("Failed to update subscription");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-slate-900 m-0">Email Subscriptions</h2>

      {/* Card containing subscriptions table */}
      <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
        <div className="text-[10px] font-bold text-slate-400">
          ({subscriptions.length}) Records Found
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
                  onClick={() => toast.info(`Manage subscribers for ${sub.type}`)}
                  className="p-1 text-slate-400 hover:text-blue-600 transition-colors bg-slate-100 border border-slate-200 rounded-md cursor-pointer"
                >
                  <UserPlus className="h-4 w-4" />
                </button>

                {/* Toggle switch */}
                <button 
                  onClick={() => toggleSubscription(sub.id)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out cursor-pointer ${
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
  );
};

export default EmailSubscriptionsTab;
