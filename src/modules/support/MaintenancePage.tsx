import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Plus } from 'lucide-react';

interface Ticket {
  id: string;
  status: 'Open' | 'Resolved';
  priority?: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  createdDate: string;
  category?: string;
  resolvedDate?: string;
}

export const MaintenancePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [newCategory, setNewCategory] = useState('System Error');

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '1',
      status: 'Open',
      priority: 'High',
      title: 'Not able to add new candidates',
      description: 'System error when attempting to add new candidate profiles. Error occurs during the submission process.',
      createdDate: 'July 24 ,2025 - 6.30 Pm',
      category: 'System Error'
    },
    {
      id: '2',
      status: 'Resolved',
      title: 'Not able to add new candidates',
      description: 'System error when attempting to add new candidate profiles. Error occurs during the submission process.',
      createdDate: 'July 24 ,2025 - 6.30 Pm',
      resolvedDate: 'July 27 ,2025 - 6.30 Pm'
    }
  ]);

  const handleCreateTicket = () => {
    if (!newTitle.trim() || !newDesc.trim()) {
      alert("Please fill in all details!");
      return;
    }
    const newTicket: Ticket = {
      id: String(Date.now()),
      status: 'Open',
      priority: newPriority,
      title: newTitle,
      description: newDesc,
      createdDate: new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) + ' - 6.30 Pm',
      category: newCategory
    };
    setTickets([newTicket, ...tickets]);
    setShowModal(false);
    setNewTitle('');
    setNewDesc('');
    alert("Support ticket created successfully!");
  };

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Header bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900 m-0">Active Support Tickets</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="px-6 py-2.5 bg-[#85bfe2]/70 hover:bg-[#85bfe2] text-slate-800 text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          Create Support Ticket
        </button>
      </div>

      {/* Tickets Cards List */}
      <div className="space-y-4">
        {tickets.map((t) => (
          <div 
            key={t.id} 
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3.5 hover:shadow-md transition-all relative overflow-hidden"
          >
            {/* Status & Priority Badge top line */}
            <div className="flex justify-between items-center">
              {/* Status pill */}
              {t.status === 'Open' ? (
                <span className="flex items-center gap-1.5 px-3 py-0.5 bg-rose-50 text-rose-600 rounded-full text-[10px] font-bold border border-rose-100">
                  <span className="w-1.5 h-1.5 bg-rose-600 rounded-full"></span>
                  <span>Open</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold border border-emerald-100">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>Resolved</span>
                </span>
              )}

              {/* Priority pill */}
              {t.priority && (
                <span className="px-3 py-0.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold border border-amber-100">
                  {t.priority} Priority
                </span>
              )}
            </div>

            {/* Title & Body Description */}
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-slate-850 m-0">{t.title}</h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                {t.description}
              </p>
            </div>

            {/* Footer Metadata logs */}
            <div className="flex gap-6 text-[10px] font-bold text-slate-400">
              <span>Created : {t.createdDate}</span>
              {t.category && <span>Category: {t.category}</span>}
              {t.resolvedDate && <span>Resolved : {t.resolvedDate}</span>}
            </div>

          </div>
        ))}
      </div>

      {/* Creation Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xl w-full max-w-lg space-y-6">
            <h3 className="text-sm font-bold text-slate-900">Create Support Ticket</h3>
            
            <div className="space-y-4 text-xs font-bold text-slate-705">
              <div>
                <label className="block mb-1.5">Ticket Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter ticket title"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 outline-none text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 outline-none text-xs font-semibold bg-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1.5">Category</label>
                  <input 
                    type="text" 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="System Error"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 outline-none text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Ticket Description</label>
                <textarea 
                  rows={4}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe your issue details here..."
                  className="w-full border border-slate-200 rounded-lg p-3 text-xs font-semibold text-slate-800 outline-none resize-none focus:border-blue-450"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-5 py-2 border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 text-xs"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateTicket}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white font-bold rounded-lg shadow-sm text-xs cursor-pointer"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default MaintenancePage;
