import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { HolidayRecord } from '../../../types';
import leaveService from '../../../services/leaveService';
import Loader from '../../../components/common/Loader';
import Modal from '../../../components/common/Modal';
import { useToast } from '../../../hooks/useToast';

export const HolidaysTab: React.FC = () => {
  const toast = useToast();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [holidays, setHolidays] = useState<HolidayRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState<HolidayRecord | null>(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [dayType, setDayType] = useState<'Full Day' | 'Half Day'>('Full Day');
  const [repeatsAnnually, setRepeatsAnnually] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadHolidays = useCallback(async (fDate?: string, tDate?: string) => {
    setIsLoading(true);
    try {
      const data = await leaveService.getHolidays(fDate, tDate);
      setHolidays(data);
    } catch {
      toast.error('Failed to load holidays.');
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadHolidays();
  }, [loadHolidays]);

  const handleSearch = () => {
    loadHolidays(fromDate, toDate);
    toast.success('Holidays filtered.');
  };

  const handleReset = () => {
    setFromDate('');
    setToDate('');
    loadHolidays('', '');
    toast.info('Filters reset.');
  };

  const handleOpenAddModal = () => {
    setEditingHoliday(null);
    setName('');
    setDate(new Date().toISOString().split('T')[0]);
    setDayType('Full Day');
    setRepeatsAnnually(true);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: HolidayRecord) => {
    setEditingHoliday(item);
    setName(item.name);
    setDate(item.date);
    setDayType(item.dayType);
    setRepeatsAnnually(item.repeatsAnnually);
    setIsModalOpen(true);
  };

  const handleSaveModal = async () => {
    if (!name.trim() || !date) {
      toast.error('Please fill in required fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      if (editingHoliday) {
        await leaveService.updateHoliday(editingHoliday.id, {
          name: name.trim(),
          date,
          dayType,
          repeatsAnnually,
        });
        toast.success('Holiday updated successfully.');
      } else {
        await leaveService.addHoliday({
          name: name.trim(),
          date,
          dayType,
          repeatsAnnually,
        });
        toast.success('Holiday added successfully.');
      }
      setIsModalOpen(false);
      loadHolidays(fromDate, toDate);
    } catch {
      toast.error('Failed to save holiday.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, holidayName: string) => {
    try {
      await leaveService.deleteHoliday(id);
      toast.success(`Deleted holiday "${holidayName}".`);
      loadHolidays(fromDate, toDate);
    } catch {
      toast.error('Failed to delete holiday.');
    }
  };

  const handleGlobalSave = () => {
    toast.success('Holidays saved successfully.');
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-sm font-bold text-slate-900 m-0">Holidays</h2>

      {/* Top Card: Filter */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-700">
          <div>
            <label className="block mb-1.5">From</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-2.5 text-slate-900 outline-none text-xs font-semibold"
              />
              <div className="absolute right-3 pointer-events-none">
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1.5">To</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3 py-2.5 text-slate-900 outline-none text-xs font-semibold"
              />
              <div className="absolute right-3 pointer-events-none">
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white cursor-pointer"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSearch}
            className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>

      {/* Bottom Card: Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden space-y-0">
        {/* Table Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-100/70 border-b border-slate-200">
          <span className="text-xs font-bold text-slate-500">
            ({holidays.length}) Records Found
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

        {isLoading ? (
          <div className="p-6"><Loader /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-bold text-slate-800 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Full Day/ Half Day</th>
                  <th className="px-6 py-3">Repeats Annually</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {holidays.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-3.5 text-slate-900 font-semibold">{item.name}</td>
                    <td className="px-6 py-3.5 text-slate-700">{item.date}</td>
                    <td className="px-6 py-3.5 text-slate-700">{item.dayType}</td>
                    <td className="px-6 py-3.5 text-slate-700">{item.repeatsAnnually ? 'Yes' : 'No'}</td>
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
                {holidays.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400 font-semibold">
                      No holidays found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Pagination */}
        <div className="flex justify-end items-center gap-2 p-4 border-t border-slate-100">
          <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500 cursor-pointer">
            <ChevronLeft className="h-3 w-3" />
          </button>
          <button className="px-2.5 py-0.5 text-xs font-bold border rounded bg-blue-50 text-[#0473b8] border-blue-200">
            1
          </button>
          <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500 cursor-pointer">
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Bottom Save Button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={handleGlobalSave}
          className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          Save
        </button>
      </div>

      {/* Modal for Add / Edit Holiday */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingHoliday ? 'Edit Holiday' : 'Add Holiday'}
      >
        <div className="space-y-4 text-xs font-bold text-slate-700">
          <div>
            <label className="block mb-1.5">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. New Year's Day"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 font-semibold outline-none focus:border-[#0473b8]"
            />
          </div>

          <div>
            <label className="block mb-1.5">Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 font-semibold outline-none focus:border-[#0473b8]"
            />
          </div>

          <div>
            <label className="block mb-1.5">Full Day/ Half Day</label>
            <select
              value={dayType}
              onChange={(e) => setDayType(e.target.value as 'Full Day' | 'Half Day')}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 font-semibold outline-none focus:border-[#0473b8]"
            >
              <option value="Full Day">Full Day</option>
              <option value="Half Day">Half Day</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="repeats-annually"
              checked={repeatsAnnually}
              onChange={(e) => setRepeatsAnnually(e.target.checked)}
              className="w-4 h-4 accent-[#0473b8] rounded"
            />
            <label htmlFor="repeats-annually" className="cursor-pointer">
              Repeats Annually
            </label>
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

export default HolidaysTab;
