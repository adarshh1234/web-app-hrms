import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, List } from 'lucide-react';
import { LeaveTypeConfig } from '../../../types';
import leaveService from '../../../services/leaveService';
import Loader from '../../../components/common/Loader';
import Modal from '../../../components/common/Modal';
import { useToast } from '../../../hooks/useToast';

export const LeaveTypeConfigTab: React.FC = () => {
  const toast = useToast();
  const [leaveTypes, setLeaveTypes] = useState<LeaveTypeConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingType, setEditingType] = useState<LeaveTypeConfig | null>(null);
  const [typeName, setTypeName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadLeaveTypes = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await leaveService.getLeaveTypeConfigs();
      setLeaveTypes(data);
    } catch {
      toast.error('Failed to load leave types.');
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadLeaveTypes();
  }, [loadLeaveTypes]);

  const handleOpenAddModal = () => {
    setEditingType(null);
    setTypeName('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: LeaveTypeConfig) => {
    setEditingType(item);
    setTypeName(item.name);
    setIsModalOpen(true);
  };

  const handleSaveModal = async () => {
    if (!typeName.trim()) {
      toast.error('Please enter a leave type name.');
      return;
    }
    setIsSubmitting(true);
    try {
      if (editingType) {
        await leaveService.updateLeaveTypeConfig(editingType.id, typeName.trim());
        toast.success('Leave type updated successfully.');
      } else {
        await leaveService.addLeaveTypeConfig(typeName.trim());
        toast.success('Leave type added successfully.');
      }
      setIsModalOpen(false);
      loadLeaveTypes();
    } catch {
      toast.error('Failed to save leave type.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    try {
      await leaveService.deleteLeaveTypeConfig(id);
      toast.success(`Deleted leave type "${name}".`);
      loadLeaveTypes();
    } catch {
      toast.error('Failed to delete leave type.');
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-sm font-bold text-slate-900 m-0">Leave Type</h2>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-100/70 border-b border-slate-200">
          <span className="text-xs font-bold text-slate-500">
            {leaveTypes.length === 0 ? 'No Records Found' : `(${leaveTypes.length}) Records Found`}
          </span>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="p-6"><Loader /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-bold text-slate-800 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leaveTypes.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-3.5 text-slate-900 font-semibold">{item.name}</td>
                    <td className="px-6 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(item)}
                          className="w-7 h-7 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.name)}
                          className="w-7 h-7 rounded-full bg-slate-200/80 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {leaveTypes.length === 0 && (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center text-slate-400 font-semibold">
                      No leave types configured.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Add / Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingType ? 'Edit Leave Type' : 'Add Leave Type'}
      >
        <div className="space-y-4 text-xs font-bold text-slate-700">
          <div>
            <label className="block mb-1.5">Name *</label>
            <input
              type="text"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
              placeholder="e.g. CAN - Bereavement"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 font-semibold outline-none focus:border-[#0473b8]"
            />
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveModal}
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LeaveTypeConfigTab;
