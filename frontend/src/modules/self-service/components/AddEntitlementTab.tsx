import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { EntitlementTargetType } from '../../../types';
import leaveService from '../../../services/leaveService';
import { useToast } from '../../../hooks/useToast';

interface AddEntitlementTabProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const LEAVE_TYPE_OPTIONS = [
  { value: '', label: 'Select Leave Type' },
  { value: 'CAN-Vacation', label: 'CAN - Vacation' },
  { value: 'CAN-Personal', label: 'CAN - Personal' },
  { value: 'CAN-Sick', label: 'CAN - Sick' },
];

const LEAVE_PERIOD_OPTIONS = [
  { value: '', label: 'Select Leave Period' },
  { value: '2026-01-01 - 2026-12-31', label: '2026-01-01 - 2026-12-31' },
  { value: '2025-01-01 - 2025-12-31', label: '2025-01-01 - 2025-12-31' },
];

export const AddEntitlementTab: React.FC<AddEntitlementTabProps> = ({ onCancel, onSuccess }) => {
  const toast = useToast();
  const [targetType, setTargetType] = useState<EntitlementTargetType>('individual');
  const [employeeName, setEmployeeName] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [leavePeriod, setLeavePeriod] = useState('');
  const [entitlement, setEntitlement] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!leaveType || !leavePeriod) {
      toast.error('Please select leave type and leave period.');
      return;
    }

    setIsSubmitting(true);
    try {
      await leaveService.addEntitlement({
        targetType,
        employeeName: employeeName || 'Sarah Johnson',
        leaveType,
        leavePeriod,
        entitlement: Number(entitlement) || 0,
      });
      toast.success('Leave entitlement added successfully.');
      onSuccess();
    } catch {
      toast.error('Failed to add entitlement. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-sm font-bold text-slate-900 m-0">Add Leave Entitlement</h2>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        {/* Target Type Radio Group */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="entitlement-target"
              checked={targetType === 'individual'}
              onChange={() => setTargetType('individual')}
              className="w-4 h-4 accent-[#0473b8]"
            />
            <span className="text-xs font-semibold text-slate-700">Individual Employee</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="entitlement-target"
              checked={targetType === 'multiple'}
              onChange={() => setTargetType('multiple')}
              className="w-4 h-4 accent-[#0473b8]"
            />
            <span className="text-xs font-semibold text-slate-700">Multiple Employees</span>
          </label>
        </div>

        {/* Form Fields Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-700">
          <div>
            <label className="block mb-1.5">Employee Name</label>
            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Enter employee name"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-900 font-semibold text-xs outline-none focus:border-[#0473b8]"
            />
          </div>

          <div>
            <label className="block mb-1.5">Leave Type</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                {LEAVE_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-700">
          <div>
            <label className="block mb-1.5">Leave Period</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={leavePeriod}
                onChange={(e) => setLeavePeriod(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                {LEAVE_PERIOD_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1.5">Entitlement</label>
            <input
              type="number"
              value={entitlement}
              onChange={(e) => setEntitlement(e.target.value)}
              placeholder="0"
              min={0}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-900 font-semibold text-xs outline-none focus:border-[#0473b8]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEntitlementTab;
