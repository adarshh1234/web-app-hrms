import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ArrowUpDown } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import adminService, { JobTitleRecord } from '../../../services/adminService';

export const JobTitlesTab: React.FC = () => {
  const toast = useToast();
  const [jobTitles, setJobTitles] = useState<JobTitleRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Modal State
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<JobTitleRecord | null>(null);
  const [formData, setFormData] = useState<{ title: string; description: string }>({ title: '', description: '' });

  const fetchJobTitles = async () => {
    setLoading(true);
    try {
      const data = await adminService.getJobTitles();
      setJobTitles(data || []);
    } catch (err: any) {
      console.error('Failed to load job titles:', err);
      toast.error('Failed to load job titles from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobTitles();
  }, []);

  const toggleSelectAll = () => {
    if (selectedIds.length === jobTitles.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(jobTitles.map(j => j.id || j._id || ''));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSort = () => {
    const sorted = [...jobTitles].sort((a, b) => {
      return sortAsc ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title);
    });
    setJobTitles(sorted);
    setSortAsc(!sortAsc);
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await adminService.deleteJobTitle(id);
        setJobTitles(prev => prev.filter(j => (j.id !== id && j._id !== id)));
        setSelectedIds(prev => prev.filter(i => i !== id));
        toast.success(`Job title "${title}" deleted.`);
      } catch (err: any) {
        toast.error(err.message || `Failed to delete "${title}".`);
      }
    }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', description: '' });
    setShowAddModal(true);
  };

  const handleOpenEdit = (item: JobTitleRecord) => {
    setEditingItem(item);
    setFormData({ title: item.title, description: item.description || '' });
    setShowAddModal(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error('Job Title is required.');
      return;
    }

    if (editingItem) {
      const targetId = editingItem.id || editingItem._id || '';
      try {
        const updated = await adminService.updateJobTitle(targetId, { title: formData.title.trim(), description: formData.description.trim() });
        setJobTitles(prev => prev.map(item => (item.id === targetId || item._id === targetId) ? updated : item));
        toast.success('Job title updated successfully.');
        setShowAddModal(false);
      } catch (err: any) {
        toast.error(err.message || 'Failed to update job title.');
      }
    } else {
      try {
        const created = await adminService.createJobTitle({ title: formData.title.trim(), description: formData.description.trim() });
        setJobTitles(prev => [created, ...prev]);
        toast.success('Job title added successfully.');
        setShowAddModal(false);
      } catch (err: any) {
        toast.error(err.message || 'Failed to add job title.');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xs space-y-4">
      {/* Top Header Row */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 m-0">Job Titles</h2>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-6 py-2 bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] hover:opacity-95 text-white text-xs font-bold rounded-full shadow-xs transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>Add</span>
        </button>
      </div>

      {/* Subtitle count */}
      <div className="text-sm font-medium text-slate-400">
        ({jobTitles.length}) Records Found
      </div>

      {/* Table Container */}
      <div className="bg-[#f2f5f8] border border-slate-200/60 rounded-2xl p-4 md:p-6 space-y-3">
        {/* Table Header Bar */}
        <div className="grid grid-cols-12 items-center px-6 py-3 bg-[#e4e8ec]/80 rounded-t-xl text-xs font-bold text-slate-600">
          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              checked={selectedIds.length === jobTitles.length && jobTitles.length > 0}
              onChange={toggleSelectAll}
              className="w-4 h-4 rounded border-slate-300 text-[#004848] focus:ring-[#004848] cursor-pointer"
            />
          </div>
          <div className="col-span-5 md:col-span-4 flex items-center gap-1.5 cursor-pointer select-none" onClick={handleSort}>
            <span>Job Titles</span>
            <ArrowUpDown className="h-3.5 w-3.5 text-slate-500" />
          </div>
          <div className="col-span-4 md:col-span-5">
            Job Description
          </div>
          <div className="col-span-2 md:col-span-2 text-right pr-2">
            Actions
          </div>
        </div>

        {/* Table Rows (Floating Pill Cards) */}
        <div className="space-y-2.5">
          {jobTitles.length > 0 ? (
            jobTitles.map((item) => {
              const recordId = item.id || item._id || '';
              const isSelected = selectedIds.includes(recordId);
              return (
                <div
                  key={recordId || item.title}
                  className={`grid grid-cols-12 items-center px-6 py-3.5 bg-white border rounded-full shadow-2xs transition-all ${
                    isSelected ? 'border-[#004848] bg-teal-50/20' : 'border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="col-span-1 flex items-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectRow(recordId)}
                      className="w-4 h-4 rounded border-slate-300 text-[#004848] focus:ring-[#004848] cursor-pointer"
                    />
                  </div>
                  <div className="col-span-5 md:col-span-4 font-medium text-slate-700 text-xs md:text-sm truncate">
                    {item.title}
                  </div>
                  <div className="col-span-4 md:col-span-5 text-slate-500 text-xs truncate pr-4">
                    {item.description || ''}
                  </div>
                  <div className="col-span-2 md:col-span-2 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleDelete(recordId, item.title)}
                      className="w-8 h-8 rounded-full bg-slate-100/90 text-slate-400 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="w-8 h-8 rounded-full bg-slate-100/90 text-slate-400 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-xs font-bold text-slate-400">
              No Job Titles defined. Click "+ Add" to create one.
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              {editingItem ? 'Edit Job Title' : 'Add Job Title'}
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block mb-1 font-bold text-slate-700">Job Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none font-semibold text-slate-800 focus:border-[#004848]"
                />
              </div>
              <div>
                <label className="block mb-1 font-bold text-slate-700">Job Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of responsibilities and scope..."
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none font-semibold text-slate-800 focus:border-[#004848] resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-full text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-[#004848] hover:bg-[#003333] text-white rounded-full text-xs font-bold cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobTitlesTab;
