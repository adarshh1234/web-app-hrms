import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import adminService, { NationalityRecord } from '../../services/adminService';

export const NationalitiesPage: React.FC = () => {
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState<NationalityRecord[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<NationalityRecord | null>(null);
  const [natName, setNatName] = useState('');

  const loadNationalities = async (page: number = 1) => {
    setIsLoading(true);
    try {
      const res = await adminService.getNationalities({ page, limit: 15 });
      setRecords(res.data);
      setTotalItems(res.total);
    } catch (err) {
      toast.error('Failed to load nationalities.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNationalities(currentPage);
  }, [currentPage]);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await adminService.deleteNationality(id);
        toast.success(`Nationality "${name}" deleted.`);
        loadNationalities(currentPage);
      } catch (err) {
        toast.error('Failed to delete nationality.');
      }
    }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setNatName('');
    setShowModal(true);
  };

  const handleOpenEdit = (item: NationalityRecord) => {
    setEditingItem(item);
    setNatName(item.name);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!natName.trim()) {
      toast.error('Nationality name is required.');
      return;
    }

    try {
      if (editingItem) {
        const targetId = editingItem.id || editingItem._id || '';
        await adminService.updateNationality(targetId, { name: natName.trim() });
        toast.success('Nationality updated successfully.');
      } else {
        await adminService.createNationality({ name: natName.trim(), status: 'Active' });
        toast.success('Nationality created successfully.');
      }
      setShowModal(false);
      setNatName('');
      loadNationalities(currentPage);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save nationality.');
    }
  };

  return (
    <div className="space-y-4 max-w-5xl">
      <h2 className="text-sm font-bold text-slate-900 m-0">Nationalities</h2>

      <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 space-y-3">
        {/* Info header bar with Add button */}
        <div className="flex justify-between items-center pb-1">
          <span className="text-xs font-bold text-slate-500">({totalItems}) Records Found</span>
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-md shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Nationality</span>
          </button>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-2 px-4 py-2 text-xs font-extrabold text-slate-500 uppercase tracking-wider">
          <span>Nationality</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows List */}
        <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
          {isLoading ? (
            <div className="bg-white rounded-lg p-6 text-center text-xs font-bold text-slate-400">Loading nationalities...</div>
          ) : records.length > 0 ? (
            records.map((r) => {
              const recordId = r.id || r._id || '';
              return (
                <div 
                  key={recordId}
                  className="grid grid-cols-2 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800 hover:border-slate-300 transition-all"
                >
                  <span>{r.name}</span>
                  
                  <div className="flex justify-end gap-2.5">
                    <button 
                      onClick={() => handleOpenEdit(r)} 
                      className="p-1 text-slate-400 hover:text-blue-600 cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(recordId, r.name)} 
                      className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-lg p-6 text-center text-xs font-bold text-slate-400">No nationalities recorded.</div>
          )}
        </div>

        {/* Pagination at the bottom */}
        {totalItems > 15 && (
          <div className="flex justify-end items-center gap-2 pt-2 bg-slate-100">
            <button 
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500 disabled:opacity-50 cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="text-xs font-bold text-slate-600">Page {currentPage}</span>
            <button 
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500 cursor-pointer"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              {editingItem ? 'Edit Nationality' : 'Add Nationality'}
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block mb-1 font-bold text-slate-700">Nationality Name *</label>
                <input
                  type="text"
                  value={natName}
                  onChange={e => setNatName(e.target.value)}
                  placeholder="e.g. Canadian"
                  className="w-full rounded-lg border border-slate-200 p-2.5 outline-none font-semibold text-slate-800 focus:border-[#0473b8]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white rounded-lg text-xs font-bold cursor-pointer"
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

export default NationalitiesPage;
