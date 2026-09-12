import React, { useState } from 'react';
import { ChevronDown, ExternalLink, Send, CheckCircle2, FileText } from 'lucide-react';
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

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postJobTitle.trim()) {
      toast.error('Job Title is required!');
      return;
    }
    toast.success(`Job "${postJobTitle}" published successfully to LetsGetIn!`);
  };

  const handleViewInLetsGetIn = () => {
    toast.success('Opening job posting preview on LetsGetIn Portal...');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-2 select-none">
        <h1 className="text-xl font-bold text-slate-900 m-0">Post a New Job</h1>
        <p className="text-xs text-slate-500 mt-1 font-normal">Create and publish your job posting to LetsGetIn</p>
      </div>

      <form onSubmit={handlePostJob} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        {/* Basic Info */}
        <div className="space-y-4 pt-1">
          <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Basic Information</span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-700">
            <div className="md:col-span-2">
              <label className="block mb-1.5">Job Title *</label>
              <input
                type="text"
                required
                value={postJobTitle}
                onChange={(e) => setPostJobTitle(e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 bg-white font-semibold text-xs outline-none focus:border-[var(--primary-color)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-700">
            <div>
              <label className="block mb-1.5">Minimum Salary</label>
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <select className="bg-transparent border-none outline-none text-slate-800 text-xs font-bold px-2 py-2">
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                </select>
                <input
                  type="text"
                  value={postMinSalary}
                  onChange={(e) => setPostMinSalary(e.target.value)}
                  className="w-full border-none outline-none text-slate-900 text-xs font-semibold px-2 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5">Maximum Salary</label>
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <select className="bg-transparent border-none outline-none text-slate-800 text-xs font-bold px-2 py-2">
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                </select>
                <input
                  type="text"
                  value={postMaxSalary}
                  onChange={(e) => setPostMaxSalary(e.target.value)}
                  className="w-full border-none outline-none text-slate-900 text-xs font-semibold px-2 py-2"
                />
              </div>
            </div>
          </div>

          <div className="max-w-md text-xs font-bold text-slate-700">
            <label className="block mb-1.5">Employment Type</label>
            <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <select
                value={postEmploymentType}
                onChange={(e) => setPostEmploymentType(e.target.value)}
                className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-50 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                <ChevronDown className="h-3.5 w-3.5 text-slate-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Job Description &amp; Details</span>

          <div className="text-xs font-bold text-slate-700">
            <label className="block mb-1.5">Description</label>
            <textarea
              rows={5}
              value={postDesc}
              onChange={(e) => setPostDesc(e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-3 text-slate-900 font-semibold text-xs outline-none resize-none bg-slate-50/20 focus:border-[var(--primary-color)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-700">
            <div className="md:col-span-2">
              <label className="block mb-1.5">Location</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white col-span-1">
                  <select
                    value={postLocationType}
                    onChange={(e) => setPostLocationType(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-50 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-700" />
                  </div>
                </div>

                <input
                  type="text"
                  value={postOfficeLocation}
                  onChange={(e) => setPostOfficeLocation(e.target.value)}
                  placeholder="Office Location / City"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 bg-white font-semibold text-xs outline-none col-span-2 focus:border-[var(--primary-color)]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-700">
            <div>
              <label className="block mb-1.5">Experience Level</label>
              <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <select
                  value={postExpLevel}
                  onChange={(e) => setPostExpLevel(e.target.value)}
                  className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                  <option value="Lead / Principal">Lead / Principal</option>
                </select>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-50 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                  <ChevronDown className="h-3.5 w-3.5 text-slate-700" />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1.5">Department</label>
              <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <select
                  value={postDept}
                  onChange={(e) => setPostDept(e.target.value)}
                  className="w-full bg-transparent px-3 py-2.5 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Product">Product</option>
                  <option value="Human Resources">Human Resources</option>
                </select>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-50 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                  <ChevronDown className="h-3.5 w-3.5 text-slate-700" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs font-bold text-slate-700">
            <label className="block mb-1.5">Required Skills</label>
            <textarea
              rows={3}
              value={postSkills}
              onChange={(e) => setPostSkills(e.target.value)}
              placeholder="e.g. React, Node.js, Python, AWS"
              className="w-full border border-slate-200 rounded-lg p-3 text-slate-900 font-semibold text-xs outline-none resize-none bg-slate-50/20 focus:border-[var(--primary-color)]"
            />
          </div>

          <div className="text-xs font-bold text-slate-700">
            <label className="block mb-1.5">Required Qualifications</label>
            <input
              type="text"
              value={postQuals}
              onChange={(e) => setPostQuals(e.target.value)}
              placeholder="e.g. Bachelor in Computer Science or equivalent"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 bg-white font-semibold text-xs outline-none focus:border-[var(--primary-color)]"
            />
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => toast.info('Job post canceled')}
            className="px-5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={() => toast.success('Job description saved as draft')}
            className="px-5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Save as Draft
          </button>

          <button
            type="button"
            onClick={handleViewInLetsGetIn}
            className="flex items-center gap-2 px-5 py-2.5 border border-emerald-500/40 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <ExternalLink className="h-3.5 w-3.5 text-emerald-600" />
            <span>View in LetsGetIn</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#004848] hover:bg-[#003838] text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Post a Job</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobTab;
