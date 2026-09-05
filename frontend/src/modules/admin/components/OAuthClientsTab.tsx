import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export const OAuthClientsTab: React.FC = () => {
  const toast = useToast();
  const [oauthClients, setOauthClients] = useState<any[]>([]);

  const handleDeleteOauth = (id: string) => {
    if (confirm("Delete OAuth client?")) {
      setOauthClients(oauthClients.filter(x => x.id !== id));
      toast.success("OAuth client deleted");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-slate-900 m-0">Register Oauth Client List</h2>

      <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center pb-1">
          <span className="text-[10px] font-bold text-slate-505">({oauthClients.length}) Records Found</span>
          <button 
            onClick={() => toast.info("Register new client")}
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
                <button onClick={() => toast.info(`Edit OAuth client ${c.name}`)} className="p-1 text-slate-400 hover:text-blue-600 cursor-pointer">
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => handleDeleteOauth(c.id)} className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default OAuthClientsTab;
