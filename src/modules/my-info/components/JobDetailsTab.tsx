import React, { useState } from 'react';
import { ChevronDown, Plus, Edit2, Trash2, Paperclip } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export const JobDetailsTab: React.FC = () => {
  const toast = useToast();
  const [joinedDate, setJoinedDate] = useState('2024-01-15');
  const [jobTitle, setJobTitle] = useState('Software Architect');
  const [jobSpecification, setJobSpecification] = useState('Technical Design & Architecture');
  const [jobCategory, setJobCategory] = useState('Professional');
  const [subUnit, setSubUnit] = useState('Engineering');
  const [location, setLocation] = useState('Canadian Regional HQ');
  const [empStatus, setEmpStatus] = useState('Full-Time Permanent');
  const [jobToggled, setJobToggled] = useState(true);

  return (
    <div className="space-y-6">
      {/* Form Card */}
      <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-50 pb-3">Job Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-slate-705">
          {/* Joined Date */}
          <div>
            <label className="block mb-1.5">Joined Date</label>
            <input 
              type="text" 
              value={joinedDate}
              onChange={(e) => setJoinedDate(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="block mb-1.5">Job Title</label>
            <input 
              type="text" 
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
            />
          </div>

          {/* Job Specification */}
          <div>
            <label className="block mb-1.5">Job Specification</label>
            <input 
              type="text" 
              value={jobSpecification}
              onChange={(e) => setJobSpecification(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-slate-705">
          {/* Job Category */}
          <div>
            <label className="block mb-1.5">Job Category</label>
            <input 
              type="text" 
              value={jobCategory}
              onChange={(e) => setJobCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
            />
          </div>

          {/* Sub Unit */}
          <div>
            <label className="block mb-1.5">Sub Unit</label>
            <input 
              type="text" 
              value={subUnit}
              onChange={(e) => setSubUnit(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1.5">Location</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                <option value="Canadian Regional HQ">Canadian Regional HQ</option>
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
          {/* Employment Status */}
          <div>
            <label className="block mb-1.5">Employment Status</label>
            <input 
              type="text" 
              value={empStatus}
              onChange={(e) => setEmpStatus(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
            />
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-end pt-2">
          <button 
            onClick={() => setJobToggled(!jobToggled)}
            className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
              jobToggled ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
              jobToggled ? 'translate-x-5' : ''
            }`} />
          </button>
        </div>

      </div>

      {/* Attachments Card */}
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-[#e2e4e7]/60 border border-slate-205 p-3 rounded-lg select-none">
          <span className="text-sm font-bold text-slate-850">Attachments</span>
          <button 
            onClick={() => toast.info("Add attachment")}
            className="flex items-center gap-1 px-4 py-1.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add</span>
          </button>
        </div>

        <div className="bg-slate-50 border border-slate-205 rounded-xl p-5 space-y-3">
          <div className="text-[10px] font-bold text-slate-400">
            (1) Record Found
          </div>

          <div className="grid grid-cols-7 px-4 py-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-100/85 rounded-lg border border-slate-200">
            <span>File Name</span>
            <span>Description</span>
            <span>Size</span>
            <span>Type</span>
            <span>Date Added</span>
            <span>Added By</span>
            <span className="text-right">Action</span>
          </div>

          <div className="grid grid-cols-7 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-sm text-xs font-bold text-slate-805">
            <span className="text-slate-700"></span>
            <span className="text-slate-400 font-semibold"></span>
            <span className="text-slate-400 font-semibold"></span>
            <span className="text-slate-400 font-semibold"></span>
            <span className="text-slate-400 font-semibold"></span>
            <span className="text-slate-400 font-semibold"></span>
            <div className="flex justify-end gap-3 text-slate-400 pr-1">
              <button className="hover:text-blue-600 p-0.5"><Edit2 className="h-3.5 w-3.5" /></button>
              <button className="hover:text-rose-600 p-0.5"><Trash2 className="h-3.5 w-3.5" /></button>
              <button className="hover:text-slate-600 p-0.5"><Paperclip className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default JobDetailsTab;
