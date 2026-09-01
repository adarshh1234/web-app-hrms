import React, { useState } from 'react';
import { Send, Globe, CheckCircle, Clock, ExternalLink, RefreshCw, Layers } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export const PostInLetgetinTab: React.FC = () => {
  const toast = useToast();
  const [jobTitle, setJobTitle] = useState('Senior Full Stack Engineer');
  const [department, setDepartment] = useState('Engineering');
  const [locationType, setLocationType] = useState('Remote / Hybrid');
  const [salaryRange, setSalaryRange] = useState('$90,000 - $125,000');
  const [isPublishing, setIsPublishing] = useState(false);

  const [postedJobs, setPostedJobs] = useState([
    {
      id: 'lgt-101',
      title: 'Senior Frontend Developer (React)',
      dept: 'Engineering',
      postedDate: '2 hours ago',
      applicants: 18,
      status: 'Live on Letgetin'
    },
    {
      id: 'lgt-102',
      title: 'HR Talent Acquisition Specialist',
      dept: 'People Operations',
      postedDate: '1 day ago',
      applicants: 34,
      status: 'Live on Letgetin'
    },
    {
      id: 'lgt-103',
      title: 'Senior Product Designer',
      dept: 'Design',
      postedDate: '3 days ago',
      applicants: 27,
      status: 'Live on Letgetin'
    }
  ]);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim()) {
      toast.error('Please enter a job title!');
      return;
    }

    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      const newJob = {
        id: `lgt-${Math.floor(100 + Math.random() * 900)}`,
        title: jobTitle,
        dept: department,
        postedDate: 'Just now',
        applicants: 0,
        status: 'Live on Letgetin'
      };
      setPostedJobs(prev => [newJob, ...prev]);
      toast.success(`Job "${jobTitle}" successfully published to Letgetin network!`);
      setJobTitle('');
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider">
            <Globe className="h-3.5 w-3.5 text-teal-300" />
            <span>Letgetin Platform Integration Active</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white m-0">Post in Letgetin</h2>
          <p className="text-xs text-teal-100/80 m-0">
            Publish open requisitions directly to the Letgetin talent network and receive real-time applicant feeds.
          </p>
        </div>
        <button
          onClick={() => toast.success("Letgetin API connection status: 100% Operational.")}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold backdrop-blur-md transition-all text-white cursor-pointer shrink-0"
        >
          <RefreshCw className="h-4 w-4 text-emerald-300" />
          <span>Sync Letgetin Network</span>
        </button>
      </div>

      {/* Main Grid: Publish Form + Live Jobs List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Publish Form (1 Col) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-150 pb-3">
            <Layers className="h-4 w-4 text-[#004848]" />
            <h3 className="text-sm font-bold text-slate-900 m-0">Create Letgetin Post</h3>
          </div>

          <form onSubmit={handlePublish} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Lead QA Engineer"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none focus:bg-white focus:border-[#004848] font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none focus:bg-white focus:border-[#004848] font-semibold cursor-pointer"
              >
                <option value="Engineering">Engineering</option>
                <option value="People Operations">People Operations</option>
                <option value="Design">Design</option>
                <option value="Sales & Marketing">Sales & Marketing</option>
                <option value="Finance & Legal">Finance & Legal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Location Type</label>
              <input
                type="text"
                value={locationType}
                onChange={(e) => setLocationType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none focus:bg-white focus:border-[#004848] font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Salary Range</label>
              <input
                type="text"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none focus:bg-white focus:border-[#004848] font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={isPublishing}
              className="w-full py-2.5 bg-[#004848] hover:bg-[#003333] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
            >
              <span>{isPublishing ? 'Publishing...' : 'Publish to Letgetin'}</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

        {/* Live Posted Jobs List (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-150 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 m-0">Active Letgetin Postings</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Real-time candidate feed synchronized with Letgetin API.</p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">
              {postedJobs.length} Live Requisitions
            </span>
          </div>

          <div className="space-y-3">
            {postedJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 border border-slate-200 rounded-xl bg-slate-50/60 hover:bg-white hover:shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900 m-0">{job.title}</h4>
                    <span className="px-2 py-0.5 bg-teal-100 text-[#004848] text-[10px] font-extrabold rounded-md">
                      {job.dept}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <span>{job.postedDate}</span>
                    </span>
                    <span>•</span>
                    <span className="text-[#004848] font-bold">
                      {job.applicants} Applicants Received
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <CheckCircle className="h-3 w-3 text-emerald-600" />
                    <span>{job.status}</span>
                  </span>
                  <button
                    onClick={() => toast.info(`Viewing Letgetin live page for ${job.title}`)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInLetgetinTab;
