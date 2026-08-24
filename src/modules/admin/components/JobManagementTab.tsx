import React, { useState } from 'react';
import Modal from '../../../components/common/Modal';
import { useToast } from '../../../hooks/useToast';

export const JobManagementTab: React.FC = () => {
  const toast = useToast();
  const [activeJobSub, setActiveJobSub] = useState<'shifts' | 'grades' | 'status' | 'categories'>('shifts');
  const [shifts, setShifts] = useState([
    { name: 'General Shift', from: '08:00 AM', to: '05:00 PM', hours: 9.00 },
    { name: 'Night Shift', from: '08:00 PM', to: '05:00 AM', hours: 9.00 }
  ]);
  const [isAddShiftOpen, setIsAddShiftOpen] = useState(false);
  const [newShiftName, setNewShiftName] = useState('');
  const [newShiftFrom, setNewShiftFrom] = useState('08:00 AM');
  const [newShiftTo, setNewShiftTo] = useState('05:00 PM');
  const [newShiftHours, setNewShiftHours] = useState(9.00);

  const handleAddShift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShiftName) return;
    setShifts([...shifts, { name: newShiftName, from: newShiftFrom, to: newShiftTo, hours: newShiftHours }]);
    setNewShiftName('');
    setIsAddShiftOpen(false);
    toast.success(`Work shift ${newShiftName} created successfully!`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Job sub navigation */}
      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveJobSub('shifts')}
          className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] cursor-pointer ${activeJobSub === 'shifts' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
        >
          Work Shifts
        </button>
        <button 
          onClick={() => setActiveJobSub('grades')}
          className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] cursor-pointer ${activeJobSub === 'grades' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
        >
          Pay Grades
        </button>
        <button 
          onClick={() => setActiveJobSub('status')}
          className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] cursor-pointer ${activeJobSub === 'status' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
        >
          Employment Status
        </button>
        <button 
          onClick={() => setActiveJobSub('categories')}
          className={`px-3 py-1.5 text-xs font-bold border-b-2 -mb-[2px] cursor-pointer ${activeJobSub === 'categories' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-slate-500'}`}
        >
          Job Categories
        </button>
      </div>

      {activeJobSub === 'shifts' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Work Shift Rosters</h3>
            <button 
              onClick={() => setIsAddShiftOpen(true)}
              className="px-3 py-1.5 bg-[var(--primary-color)] text-white text-xs font-bold rounded hover:bg-[var(--primary-hover)] cursor-pointer"
            >
              Add Shift
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Shift Name</th>
                  <th className="px-6 py-4">From</th>
                  <th className="px-6 py-4">To</th>
                  <th className="px-6 py-4">Hours Per Day</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {shifts.map((s) => (
                  <tr key={s.name} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-800">{s.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-655">{s.from}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-655">{s.to}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-700">{s.hours} hrs</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      )}

      {activeJobSub !== 'shifts' && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400 text-xs font-semibold shadow-sm">
          Configuration lists persist in system environment variables.
        </div>
      )}

      {/* Modal: Add Shift */}
      <Modal
        isOpen={isAddShiftOpen}
        onClose={() => setIsAddShiftOpen(false)}
        title="Add Work Shift"
        footer={
          <>
            <button onClick={() => setIsAddShiftOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 cursor-pointer">Cancel</button>
            <button type="submit" form="add-shift-form" className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white rounded-lg text-sm font-semibold shadow-sm cursor-pointer">Save</button>
          </>
        }
      >
        <form id="add-shift-form" onSubmit={handleAddShift} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Shift Name *</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Evening Shift"
              value={newShiftName}
              onChange={(e) => setNewShiftName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">From Time</label>
              <input 
                type="text"
                value={newShiftFrom}
                onChange={(e) => setNewShiftFrom(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">To Time</label>
              <input 
                type="text"
                value={newShiftTo}
                onChange={(e) => setNewShiftTo(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default JobManagementTab;
