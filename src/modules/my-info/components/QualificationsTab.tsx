import React from 'react';
import { Plus } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export const QualificationsTab: React.FC = () => {
  const toast = useToast();

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-50 pb-3">Qualifications</h3>
      
      {/* Work Experience */}
      <div className="bg-slate-105 border border-slate-205 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center pb-1">
          <span className="text-xs font-bold text-slate-755">Work Experience</span>
          <button onClick={() => toast.info("Add work experience")} className="flex items-center gap-1 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold px-3 py-1.5 rounded-md">
            <Plus className="h-3 w-3" />
            <span>Add</span>
          </button>
        </div>
        <div className="text-[10px] font-bold text-slate-400">(1) Record Found</div>
        <div className="grid grid-cols-6 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
          <span>Company</span>
          <span>Job Title</span>
          <span>From</span>
          <span>To</span>
          <span>Comment</span>
          <span className="text-right">Action</span>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
          No work experience recorded.
        </div>
      </div>

      {/* Education */}
      <div className="bg-slate-105 border border-slate-205 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center pb-1">
          <span className="text-xs font-bold text-slate-755">Education</span>
          <button onClick={() => toast.info("Add education")} className="flex items-center gap-1 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold px-3 py-1.5 rounded-md">
            <Plus className="h-3 w-3" />
            <span>Add</span>
          </button>
        </div>
        <div className="text-[10px] font-bold text-slate-400">(1) Record Found</div>
        <div className="grid grid-cols-6 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
          <span>Level</span>
          <span>Institute</span>
          <span>Major/Specialization</span>
          <span>Year</span>
          <span>GPA/Score</span>
          <span className="text-right">Action</span>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
          No education records found.
        </div>
      </div>

      {/* Skill */}
      <div className="bg-slate-105 border border-slate-205 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center pb-1">
          <span className="text-xs font-bold text-slate-755">Skill</span>
          <button onClick={() => toast.info("Add skill")} className="flex items-center gap-1 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold px-3 py-1.5 rounded-md">
            <Plus className="h-3 w-3" />
            <span>Add</span>
          </button>
        </div>
        <div className="text-[10px] font-bold text-slate-400">(1) Record Found</div>
        <div className="grid grid-cols-3 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
          <span>Skill</span>
          <span>Years of Experience</span>
          <span className="text-right">Action</span>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
          No skill records configured.
        </div>
      </div>

      {/* Languages */}
      <div className="bg-slate-105 border border-slate-205 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center pb-1">
          <span className="text-xs font-bold text-slate-755">Languages</span>
          <button onClick={() => toast.info("Add language")} className="flex items-center gap-1 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold px-3 py-1.5 rounded-md">
            <Plus className="h-3 w-3" />
            <span>Add</span>
          </button>
        </div>
        <div className="text-[10px] font-bold text-slate-400">(1) Record Found</div>
        <div className="grid grid-cols-5 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
          <span>Language</span>
          <span>Fluency</span>
          <span>Competency</span>
          <span>Comments</span>
          <span className="text-right">Action</span>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
          No language records configured.
        </div>
      </div>

      {/* License */}
      <div className="bg-slate-105 border border-slate-205 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center pb-1">
          <span className="text-xs font-bold text-slate-755">License</span>
          <button onClick={() => toast.info("Add license")} className="flex items-center gap-1 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold px-3 py-1.5 rounded-md">
            <Plus className="h-3 w-3" />
            <span>Add</span>
          </button>
        </div>
        <div className="text-[10px] font-bold text-slate-400">(1) Record Found</div>
        <div className="grid grid-cols-4 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
          <span>License Type</span>
          <span>Issued Date</span>
          <span>Expiry Date</span>
          <span className="text-right">Action</span>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
          No licenses registered.
        </div>
      </div>

      {/* Attachments */}
      <div className="bg-slate-105 border border-slate-205 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center pb-1">
          <span className="text-xs font-bold text-slate-755">Attachments</span>
          <button onClick={() => toast.info("Add attachment")} className="flex items-center gap-1 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold px-3 py-1.5 rounded-md">
            <Plus className="h-3 w-3" />
            <span>Add</span>
          </button>
        </div>
        <div className="text-[10px] font-bold text-slate-400">(1) Record Found</div>
        <div className="grid grid-cols-7 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
          <span>File Name</span>
          <span className="col-span-2">Description</span>
          <span>Size</span>
          <span>Type</span>
          <span>Date Added</span>
          <span className="text-right">Actions</span>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 py-3.5 px-4 text-center text-xs font-bold text-slate-400">
          No qualification attachments.
        </div>
      </div>
    </div>
  );
};

export default QualificationsTab;
