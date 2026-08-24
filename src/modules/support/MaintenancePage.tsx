import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { SupportTicket } from '../../types';

export const MaintenancePage: React.FC = () => {
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [newCategory, setNewCategory] = useState<'System Error' | 'Access Issue' | 'Hardware' | 'Other'>('System Error');

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: '1',
      status: 'Open',
      priority: 'High',
      title: 'Not able to add new candidates',
      description: 'System error when attempting to add new candidate profiles. Error occurs during the submission process.',
      createdDate: 'July 24, 2025 - 6.30 Pm',
      category: 'System Error'
    },
    {
      id: '2',
      status: 'Resolved',
      priority: 'Medium',
      title: 'Not able to add new candidates',
      description: 'System error when attempting to add new candidate profiles. Error occurs during the submission process.',
      createdDate: 'July 24, 2025 - 6.30 Pm',
      resolvedDate: 'July 27, 2025 - 6.30 Pm',
      category: 'System Error'
    }
  ]);

  const handleCreateTicket = () => {
    if (!newTitle.trim() || !newDesc.trim()) {
      toast.error('Please fill in all details!');
      return;
    }
    const newTicket: SupportTicket = {
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
    toast.success('Support ticket created successfully!');
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

              {t.priority && (
                <span className="px-3 py-0.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold border border-amber-100">
                  {t.priority} Priority
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-slate-850 m-0">{t.title}</h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                {t.description}
              </p>
            </div>

            <div className="flex gap-6 text-[10px] font-bold text-slate-400">
              <span>Created : {t.createdDate}</span>
              {t.category && <span>Category: {t.category}</span>}
              {t.resolvedDate && <span>Resolved : {t.resolvedDate}</span>}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Support Ticket">
        <div className="space-y-4 text-xs font-bold text-slate-705">
          <Input
            label="Ticket Title"
            type="text" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter ticket title"
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Priority"
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as 'High' | 'Medium' | 'Low')}
              options={[
                { value: 'High', label: 'High' },
                { value: 'Medium', label: 'Medium' },
                { value: 'Low', label: 'Low' }
              ]}
            />

            <Select
              label="Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as 'System Error' | 'Access Issue' | 'Hardware' | 'Other')}
              options={[
                { value: 'System Error', label: 'System Error' },
                { value: 'Access Issue', label: 'Access Issue' },
                { value: 'Hardware', label: 'Hardware' },
                { value: 'Other', label: 'Other' }
              ]}
            />
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

          <div className="flex justify-end gap-3 pt-3">
            <Button 
              variant="outline"
              size="md"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="primary"
              size="md"
              className="px-6"
              onClick={handleCreateTicket}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MaintenancePage;
