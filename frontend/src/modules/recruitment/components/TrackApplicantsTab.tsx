import React, { useState } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import Modal from '../../../components/common/Modal';

export const TrackApplicantsTab: React.FC = () => {
  const toast = useToast();
  const [trackStatus, setTrackStatus] = useState('');
  const [trackDateRange, setTrackDateRange] = useState('');
  const [trackDept, setTrackDept] = useState('');
  const [trackSearch, setTrackSearch] = useState('');
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [modalSelectedStatus, setModalSelectedStatus] = useState('Shot listed');

  const [applicants, setApplicants] = useState([
    { id: 1, name: 'Sarah Johnson', position: 'UI/UX Designer', exp: '2 Yr', appliedDate: 'July 20, 2025', status: 'Shot listed' },
    { id: 2, name: 'Sarah Johnson', position: 'Marketing', exp: 'Office Equipment', appliedDate: 'July 20, 2025', status: 'Pending' },
    { id: 3, name: 'Sarah Johnson', position: 'Marketing', exp: 'Office Equipment', appliedDate: 'July 20, 2025', status: 'Rejected' },
    { id: 4, name: 'Sarah Johnson', position: 'UI/UX Designer', exp: '2 Yr', appliedDate: 'July 20, 2025', status: 'Shot listed' },
    { id: 5, name: 'Sarah Johnson', position: 'UI/UX Designer', exp: '2 Yr', appliedDate: 'July 20, 2025', status: 'Shot listed' },
    { id: 6, name: 'Sarah Johnson', position: 'UI/UX Designer', exp: '2 Yr', appliedDate: 'July 20, 2025', status: 'Shot listed' },
    { id: 7, name: 'Sarah Johnson', position: 'UI/UX Designer', exp: '2 Yr', appliedDate: 'July 20, 2025', status: 'Shot listed' },
    { id: 8, name: 'Sarah Johnson', position: 'UI/UX Designer', exp: '2 Yr', appliedDate: 'July 20, 2025', status: 'Shot listed' },
  ]);

  const handleDelete = (id: number) => {
    setApplicants((prev) => prev.filter((x) => x.id !== id));
    toast.success('Candidate deleted successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Filters card */}
      <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-950 m-0">Track Applicant</h3>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white w-40">
            <select
              value={trackStatus}
              onChange={(e) => setTrackStatus(e.target.value)}
              className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
            >
              <option value="">Status</option>
              <option value="Shot listed">Shot listed</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
              <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
            </div>
          </div>

          <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white w-40">
            <select
              value={trackDateRange}
              onChange={(e) => setTrackDateRange(e.target.value)}
              className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
            >
              <option value="">Date Range</option>
              <option value="July 20, 2025">July 20, 2025</option>
            </select>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
              <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
            </div>
          </div>

          <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white w-40">
            <select
              value={trackDept}
              onChange={(e) => setTrackDept(e.target.value)}
              className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
            >
              <option value="">Department</option>
              <option value="Marketing">Marketing</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
            </select>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
              <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
            </div>
          </div>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search........"
              value={trackSearch}
              onChange={(e) => setTrackSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 border border-slate-205 bg-white rounded-lg text-xs font-semibold text-slate-900 outline-none placeholder:text-slate-405"
            />
          </div>
        </div>
      </div>

      {/* Table roster */}
      <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-bold text-slate-800 border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="px-4 py-3">
                  <input type="checkbox" className="rounded border-slate-350 h-3.5 w-3.5" />
                </th>
                <th className="px-4 py-3">Candidate</th>
                <th className="px-4 py-3">Position</th>
                <th className="px-4 py-3">Experience</th>
                <th className="px-4 py-3">Applied Date</th>
                <th className="px-4 py-3">Current Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applicants.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3.5">
                    <input type="checkbox" className="rounded border-slate-350 h-3.5 w-3.5" />
                  </td>
                  <td className="px-4 py-3.5 text-slate-905">{app.name}</td>
                  <td className="px-4 py-3.5 text-slate-500 font-semibold">{app.position}</td>
                  <td className="px-4 py-3.5 text-slate-500 font-semibold">{app.exp}</td>
                  <td className="px-4 py-3.5 text-slate-500 font-semibold">{app.appliedDate}</td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => setIsStatusModalOpen(true)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-bold border transition-colors ${
                        app.status === 'Rejected'
                          ? 'bg-rose-50 text-rose-700 border-rose-100'
                          : app.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border-amber-100'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      }`}
                    >
                      <span>{app.status}</span>
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <div className="flex justify-end gap-2 text-slate-400">
                      <button onClick={() => toast.info('Edit candidate modal')} className="p-1 hover:text-blue-600">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => handleDelete(app.id)} className="p-1 hover:text-rose-600">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 pt-4">
          <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
            <ChevronLeft className="h-3 w-3" />
          </button>
          <button className="px-2.5 py-0.5 text-xs font-bold border rounded bg-blue-50 text-[#0473b8] border-blue-200">1</button>
          <button className="px-2.5 py-0.5 text-xs font-bold border rounded bg-white text-slate-500 hover:bg-slate-50">2</button>
          <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Status Modal */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title="Update Applicant Status"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 font-medium">Select new status for this candidate:</p>
          <select
            value={modalSelectedStatus}
            onChange={(e) => setModalSelectedStatus(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2 text-xs font-semibold outline-none"
          >
            <option value="Shot listed">Shot listed</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsStatusModalOpen(false)}
              className="px-4 py-2 border rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsStatusModalOpen(false);
                toast.success('Applicant status updated!');
              }}
              className="px-4 py-2 bg-[#0473b8] text-white rounded-lg text-xs font-semibold hover:bg-[#03629e]"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TrackApplicantsTab;
