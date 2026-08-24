import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export const PostJobTab: React.FC = () => {
  const toast = useToast();
  const [postJobTitle, setPostJobTitle] = useState('Senior Software Engineer');
  const [postMinSalary, setPostMinSalary] = useState('120000');
  const [postMaxSalary, setPostMaxSalary] = useState('180000');
  const [postEmploymentType, setPostEmploymentType] = useState('Full-time');
  const [postDesc, setPostDesc] = useState('Describe the role, responsibilities, and requirements...');
  const [postLocationType, setPostLocationType] = useState('Remote');
  const [postOfficeLocation, setPostOfficeLocation] = useState('HQ - Canadian Regional Office');
  const [postExpLevel, setPostExpLevel] = useState('Entry Level');
  const [postDept, setPostDept] = useState('Engineering');
  const [postSkills, setPostSkills] = useState('React, Node.js, Python');
  const [postQuals, setPostQuals] = useState('Bachelor in Computer Science or equivalent');

  return (
    <div className="space-y-6">
      <div className="mb-2 select-none">
        <h1 className="text-xl font-bold text-slate-900 m-0">Post a New Job</h1>
        <p className="text-xs text-slate-500 mt-1 font-normal">Create and publish your job posting to LinkedIn</p>
      </div>

      <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
        {/* Basic Info */}
        <div className="space-y-4 pt-1">
          <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Basic Information</span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
            <div className="md:col-span-2">
              <label className="block mb-1.5">Job Title *</label>
              <input
                type="text"
                value={postJobTitle}
                onChange={(e) => setPostJobTitle(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
            <div>
              <label className="block mb-1.5">Minimum Salary</label>
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <select className="bg-transparent border-none outline-none text-slate-800 text-xs font-bold px-2 py-2">
                  <option value="USD">USD</option>
                </select>
                <input
                  type="text"
                  value={postMinSalary}
                  onChange={(e) => setPostMinSalary(e.target.value)}
                  className="w-full border-none outline-none text-slate-905 text-xs font-semibold px-2 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5">Maximum Salary</label>
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <select className="bg-transparent border-none outline-none text-slate-800 text-xs font-bold px-2 py-2">
                  <option value="USD">USD</option>
                </select>
                <input
                  type="text"
                  value={postMaxSalary}
                  onChange={(e) => setPostMaxSalary(e.target.value)}
                  className="w-full border-none outline-none text-slate-905 text-xs font-semibold px-2 py-2"
                />
              </div>
            </div>
          </div>

          <div className="max-w-md text-xs font-bold text-slate-705">
            <label className="block mb-1.5">Employment Type</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={postEmploymentType}
                onChange={(e) => setPostEmploymentType(e.target.value)}
                className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-4 pt-4 border-t border-slate-50">
          <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Job Description</span>

          <div className="text-xs font-bold text-slate-705">
            <label className="block mb-1.5">Description</label>
            <textarea
              rows={5}
              value={postDesc}
              onChange={(e) => setPostDesc(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-3 text-slate-900 font-semibold text-xs outline-none resize-none bg-slate-50/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
            <div className="md:col-span-2">
              <label className="block mb-1.5">Location</label>
              <div className="grid grid-cols-3 gap-4">
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white col-span-1">
                  <select
                    value={postLocationType}
                    onChange={(e) => setPostLocationType(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-805" />
                  </div>
                </div>

                <input
                  type="text"
                  value={postOfficeLocation}
                  onChange={(e) => setPostOfficeLocation(e.target.value)}
                  placeholder="Office Address"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none col-span-2"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
            <div>
              <label className="block mb-1.5">Experience Level</label>
              <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <select
                  value={postExpLevel}
                  onChange={(e) => setPostExpLevel(e.target.value)}
                  className="w-full bg-transparent px-3 py-2.5 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </select>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                  <ChevronDown className="h-3.5 w-3.5 text-slate-805" />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1.5">Department</label>
              <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <select
                  value={postDept}
                  onChange={(e) => setPostDept(e.target.value)}
                  className="w-full bg-transparent px-3 py-2.5 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                </select>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                  <ChevronDown className="h-3.5 w-3.5 text-slate-805" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs font-bold text-slate-705">
            <label className="block mb-1.5">Required Skills</label>
            <textarea
              rows={3}
              value={postSkills}
              onChange={(e) => setPostSkills(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-3 text-slate-900 font-semibold text-xs outline-none resize-none bg-slate-50/20"
            />
          </div>

          <div className="text-xs font-bold text-slate-705">
            <label className="block mb-1.5">Required Qualifications</label>
            <input
              type="text"
              value={postQuals}
              onChange={(e) => setPostQuals(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-905 bg-white font-semibold text-xs outline-none"
            />
          </div>
        </div>
      </div>

      {/* Social Media Preview */}
      <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-5">
        <div className="flex gap-4">
          <label className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded shadow-xs cursor-pointer select-none">
            <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5" />
            <span className="text-xs font-bold text-slate-800">LinkedIn</span>
          </label>
          <label className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded shadow-xs cursor-pointer select-none">
            <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5" />
            <span className="text-xs font-bold text-slate-800">Instagram</span>
          </label>
          <label className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded shadow-xs cursor-pointer select-none">
            <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5" />
            <span className="text-xs font-bold text-slate-800">Facebook</span>
          </label>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900">LinkedIn Post Preview</h4>
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex justify-center">
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs max-w-lg w-full space-y-4 font-semibold">
              <div className="flex gap-3 items-center">
                <div className="h-10 w-10 rounded-full bg-[#0077b5] flex items-center justify-center font-bold text-white text-xs shrink-0 select-none">
                  in
                </div>
                <div className="text-xs">
                  <h4 className="font-bold text-slate-905">Your Company Name</h4>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">Job posting · 1 min</p>
                </div>
              </div>

              <div className="text-xs space-y-1.5 pt-1.5 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-905">{postJobTitle}</h3>
                <p className="text-slate-500 font-bold">{postEmploymentType} · {postLocationType}</p>
                <p className="text-[#0473b8] font-bold mt-0.5">${parseInt(postMinSalary || '0').toLocaleString()} - ${parseInt(postMaxSalary || '0').toLocaleString()} USD/year</p>
              </div>

              <div className="text-xs text-slate-500 font-medium italic line-clamp-3 leading-relaxed">
                {postDesc}
              </div>

              <div className="bg-slate-50 p-2.5 rounded text-[10px] text-slate-500 font-bold">
                Skills: {postSkills}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3.5 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => toast.info('Job post canceled')}
            className="px-6 py-2 border border-[#0473b8] bg-white hover:bg-blue-50/50 text-[#0473b8] text-xs font-bold rounded shadow-xs transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => toast.success('Job description saved as draft')}
            className="px-6 py-2 border border-[#0473b8] bg-white hover:bg-blue-50/50 text-[#0473b8] text-xs font-bold rounded shadow-xs transition-all cursor-pointer"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => toast.success('Job description posted successfully!')}
            className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded shadow-xs transition-all cursor-pointer"
          >
            Post to LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostJobTab;
