import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import adminService, { QualificationRecord } from '../../services/adminService';

type QualTab = 'education' | 'licenses' | 'skills' | 'languages' | 'memberships';

export const QualificationPage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<QualTab>('education');
  const [records, setRecords] = useState<QualificationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<QualificationRecord | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');

  const loadQualifications = async (cat: QualTab) => {
    setIsLoading(true);
    try {
      const data = await adminService.getQualifications({ category: cat });
      setRecords(data);
    } catch (err) {
      toast.error('Failed to load qualification records.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQualifications(activeTab);
  }, [activeTab]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await adminService.deleteQualification(id);
      toast.success('Qualification record deleted.');
      loadQualifications(activeTab);
    } catch (err) {
      toast.error('Failed to delete qualification record.');
    }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setNewTitle('');
    setNewSubtitle('');
    setShowAddModal(true);
  };

  const handleOpenEdit = (item: QualificationRecord) => {
    setEditingItem(item);
    setNewTitle(item.name);
    setNewSubtitle(item.subtitle || '');
    setShowAddModal(true);
  };

  const handleSaveRecord = async () => {
    if (!newTitle.trim()) {
      toast.error('Please fill in the record name.');
      return;
    }

    try {
      if (editingItem) {
        const targetId = editingItem.id || editingItem._id || '';
        await adminService.updateQualification(targetId, {
          name: newTitle.trim(),
          subtitle: newSubtitle.trim(),
        });
        toast.success('Qualification record updated!');
      } else {
        await adminService.createQualification({
          category: activeTab,
          name: newTitle.trim(),
          subtitle: newSubtitle.trim(),
        });
        toast.success('New qualification record added!');
      }
      setShowAddModal(false);
      setNewTitle('');
      setNewSubtitle('');
      loadQualifications(activeTab);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save qualification record.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 m-0">Qualifications</h1>
        <p className="text-sm text-slate-500 mt-1">Configure system qualification standards: Education, Licenses, Skills, Languages, and Memberships.</p>
      </div>

      {/* 5 Qualification Tab Pills */}
      <div className="flex flex-wrap gap-2.5 border-b border-slate-200 pb-4">
        {([
          { id: 'education', label: 'Education' },
          { id: 'licenses', label: 'Licenses' },
          { id: 'skills', label: 'Skills' },
          { id: 'languages', label: 'Languages' },
          { id: 'memberships', label: 'Memberships' }
        ] as const).map(pill => (
          <button
            key={pill.id}
            onClick={() => setActiveTab(pill.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === pill.id 
                ? 'bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] text-white font-extrabold shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-900 m-0 capitalize">{activeTab} Records</h2>
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#004848] hover:bg-[#003333] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="capitalize">Add {activeTab.slice(0, -1)}</span>
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
          <div className="text-xs font-bold text-slate-500">({records.length}) Records Found</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Name / Title</th>
                  <th className="px-6 py-3.5">Details / Subtitle</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-slate-400 font-medium">
                      Loading qualification records...
                    </td>
                  </tr>
                ) : records.length > 0 ? (
                  records.map(item => {
                    const recId = item.id || item._id || '';
                    return (
                      <tr key={recId} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 font-semibold text-slate-900">{item.name}</td>
                        <td className="px-6 py-4 text-slate-600">{item.subtitle || 'N/A'}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => handleOpenEdit(item)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full cursor-pointer" title="Edit">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDelete(recId, item.name)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full cursor-pointer" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-slate-400 font-medium">
                      No qualification records found under {activeTab}. Click "+ Add" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 capitalize">
              {editingItem ? `Edit ${activeTab} Record` : `Add ${activeTab} Record`}
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block mb-1 font-bold text-slate-700">Name / Title *</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Master of Business Administration"
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none font-semibold text-slate-800 focus:border-[#004848]"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold text-slate-700">Secondary Info / Subtitle</label>
                <input 
                  type="text" 
                  value={newSubtitle}
                  onChange={e => setNewSubtitle(e.target.value)}
                  placeholder="e.g. Institution, Authority, or Description"
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none font-semibold text-slate-800 focus:border-[#004848]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveRecord}
                className="px-4 py-2 bg-[#004848] text-white rounded-lg text-xs font-bold hover:bg-[#003333] cursor-pointer"
              >
                Save Qualification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QualificationPage;
