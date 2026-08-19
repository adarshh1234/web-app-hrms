import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Upload, 
  Sparkles, 
  Trash2, 
  Edit2, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  X,
  Check,
  Star,
  Eye,
  Filter,
  Share2,
  Calendar
} from 'lucide-react';

export const RecruitmentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') || 'candidates';
  const activeTab = tabParam as 
    | 'onboarding' 
    | 'offboarding' 
    | 'cv-parser' 
    | 'post-job' 
    | 'track' 
    | 'talent-pool' 
    | 'feedback' 
    | 'candidates' 
    | 'vacancies';

  // CV Parser States (Images 1 & 2)
  const [cvSearchText, setCvSearchText] = useState('');
  const [cvSuggestions, setCvSuggestions] = useState(['Age', 'Skill', 'Qualification', 'Experience', 'Qualification']);
  const [cvActivePills, setCvActivePills] = useState(['Age', 'Skill', 'Qualification']);
  const [cvsList, setCvsList] = useState(
    Array(11).fill({ name: 'Sarah Johnson', title: 'Senior Product Designer', modified: 'Last modified: 2 days ago' })
  );

  // Post Job States (Image 3)
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
  const [activePostChannel, setActivePostChannel] = useState<'linkedin' | 'instagram' | 'facebook'>('linkedin');

  // Track Applicant States (Images 4 & 5)
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
    { id: 8, name: 'Sarah Johnson', position: 'UI/UX Designer', exp: '2 Yr', appliedDate: 'July 20, 2025', status: 'Shot listed' }
  ]);

  // Talent Pool states (Image 1 of this turn)
  const [talentCards, setTalentCards] = useState([
    { title: 'Technical Skills', count: '1,247 candidates', skills: ['Programming', 'Data Analysis', 'Cloud Computing'], progress: 35 },
    { title: 'React Developer', count: '1,247 candidates', skills: ['Communication', 'Js', 'Teamwork'], progress: 65 },
    { title: 'Design Skills', count: '1,247 candidates', skills: ['UI/UX', 'Graphic Design', 'Prototyping'], progress: 48 },
    { title: 'Technical Skills', count: '1,247 candidates', skills: ['Programming', 'Data Analysis', 'Cloud Computing'], progress: 35 },
    { title: 'Soft Skills', count: '1,247 candidates', skills: ['Communication', 'Leadership', 'Teamwork'], progress: 75 },
    { title: 'Design Skills', count: '1,247 candidates', skills: ['UI/UX', 'Graphic Design', 'Prototyping'], progress: 48 },
    { title: 'Technical Skills', count: '1,247 candidates', skills: ['Programming', 'Data Analysis', 'Cloud Computing'], progress: 35 },
    { title: 'Soft Skills', count: '1,247 candidates', skills: ['Communication', 'Leadership', 'Teamwork'], progress: 75 },
    { title: 'Design Skills', count: '1,247 candidates', skills: ['UI/UX', 'Graphic Design', 'Prototyping'], progress: 48 },
    { title: 'Technical Skills', count: '1,247 candidates', skills: ['Programming', 'Data Analysis', 'Cloud Computing'], progress: 35 },
    { title: 'Soft Skills', count: '1,247 candidates', skills: ['Communication', 'Leadership', 'Teamwork'], progress: 75 },
    { title: 'Design Skills', count: '1,247 candidates', skills: ['UI/UX', 'Graphic Design', 'Prototyping'], progress: 48 }
  ]);

  // Feedback states (Image 2 of this turn)
  const [feedCandidate, setFeedCandidate] = useState('');
  const [feedPosition, setFeedPosition] = useState('Engineering');
  const [feedDate, setFeedDate] = useState('');
  const [feedInterviewer, setFeedInterviewer] = useState('');
  const [feedTechRating, setFeedTechRating] = useState(3);
  const [feedCommRating, setFeedCommRating] = useState(3);
  const [feedAssessment, setFeedAssessment] = useState('Good Fit');
  const [feedStatus, setFeedStatus] = useState('Hire');
  const [feedComments, setFeedComments] = useState('');
  const [feedSearch, setFeedSearch] = useState('');
  const [feedFilterStatus, setFeedFilterStatus] = useState('');

  const [feedbacks, setFeedbacks] = useState([
    { candidate: 'Sarah', position: 'UIUX Designer', interviewer: 'Amal Benny', date: '2024-29-03', techRating: 3, commRating: 3, status: 'Hire' },
    { candidate: 'Sarah', position: 'UIUX Designer', interviewer: 'Amal Benny', date: '2024-29-03', techRating: 3, commRating: 3, status: 'Hold' },
    { candidate: 'Sarah', position: 'UIUX Designer', interviewer: 'Amal Benny', date: '2024-29-03', techRating: 3, commRating: 3, status: 'Rejected' },
    { candidate: 'Sarah', position: 'UIUX Designer', interviewer: 'Amal Benny', date: '2024-29-03', techRating: 3, commRating: 3, status: 'Hire' },
    { candidate: 'Sarah', position: 'UIUX Designer', interviewer: 'Amal Benny', date: '2024-29-03', techRating: 3, commRating: 3, status: 'Hire' },
    { candidate: 'Sarah', position: 'UIUX Designer', interviewer: 'Amal Benny', date: '2024-29-03', techRating: 3, commRating: 3, status: 'Rejected' },
    { candidate: 'Sarah', position: 'UIUX Designer', interviewer: 'Amal Benny', date: '2024-29-03', techRating: 3, commRating: 3, status: 'Rejected' },
    { candidate: 'Sarah', position: 'UIUX Designer', interviewer: 'Amal Benny', date: '2024-29-03', techRating: 3, commRating: 3, status: 'Hold' }
  ]);

  // Candidates states (Image 3 of this turn)
  const [candFilterJobTitle, setCandFilterJobTitle] = useState('');
  const [candFilterVacancy, setCandFilterVacancy] = useState('');
  const [candFilterManager, setCandFilterManager] = useState('');
  const [candFilterStatus, setCandFilterStatus] = useState('');
  const [candFilterName, setCandFilterName] = useState('');
  const [candFilterKeywords, setCandFilterKeywords] = useState('');
  const [candFilterAppFrom, setCandFilterAppFrom] = useState('');
  const [candFilterAppTo, setCandFilterAppTo] = useState('');
  const [candFilterMethod, setCandFilterMethod] = useState('');

  const [candidatesList, setCandidatesList] = useState([
    { vacancy: 'Next js', candidate: 'Karthika', manager: 'Amal Benny', date: '2024-29-03', status: 'Shortlisted' },
    { vacancy: 'Blood Type', candidate: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '' },
    { vacancy: 'custom', candidate: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '' },
    { vacancy: 'Grades titles', candidate: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '' },
    { vacancy: 'Address', candidate: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: 'Shortlisted' },
    { vacancy: 'Blood Type', candidate: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '' },
    { vacancy: 'custom', candidate: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '' },
    { vacancy: 'Grades titles', candidate: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '' },
    { vacancy: 'Address', candidate: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: 'Shortlisted' },
    { vacancy: 'Blood Type', candidate: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '' },
    { vacancy: 'custom', candidate: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '' },
    { vacancy: 'Grades titles', candidate: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '' }
  ]);

  // Vacancy states (Image 4 of this turn)
  const [vacFilterJobTitle, setVacFilterJobTitle] = useState('');
  const [vacFilterVacancy, setVacFilterVacancy] = useState('');
  const [vacFilterManager, setVacFilterManager] = useState('');
  const [vacFilterStatus, setVacFilterStatus] = useState('');

  const [vacanciesList, setVacanciesList] = useState([
    { vacancy: 'Node Js', title: 'Node js developer', manager: 'Amal Benny', date: '2024-29-03', status: 'Available', count: '' },
    { vacancy: 'Blood Type', title: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '', count: '' },
    { vacancy: 'custom', title: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '', count: '' },
    { vacancy: 'Grades titles', title: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '', count: '' },
    { vacancy: 'Address', title: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: 'Shortlisted', count: '' },
    { vacancy: 'Blood Type', title: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '', count: '' },
    { vacancy: 'custom', title: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '', count: '' },
    { vacancy: 'Grades titles', title: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '', count: '' },
    { vacancy: 'Address', title: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: 'Shortlisted', count: '' },
    { vacancy: 'Blood Type', title: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '', count: '' },
    { vacancy: 'custom', title: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '', count: '' },
    { vacancy: 'Grades titles', title: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '', count: '' }
  ]);

  const handleRemoveActivePill = (pill: string) => {
    setCvActivePills(cvActivePills.filter(p => p !== pill));
  };

  const handleAddActivePill = () => {
    const next = prompt("Enter tag pill search category (e.g. Location, Degree):");
    if (next) {
      setCvActivePills([...cvActivePills, next]);
    }
  };

  const handleUpdateStatus = () => {
    setApplicants(applicants.map(app => {
      if (app.name === 'Sarah Johnson' || app.name === 'Karthika Balan') {
        return { ...app, status: modalSelectedStatus };
      }
      return app;
    }));
    setIsStatusModalOpen(false);
    alert(`Status updated to ${modalSelectedStatus} successfully!`);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedCandidate) {
      alert("Please enter candidate name!");
      return;
    }
    const newFeed = {
      candidate: feedCandidate,
      position: feedPosition,
      interviewer: feedInterviewer || 'Self-Service Panel',
      date: feedDate || '2024-29-03',
      techRating: feedTechRating,
      commRating: feedCommRating,
      status: feedStatus
    };
    setFeedbacks([newFeed, ...feedbacks]);
    setFeedCandidate('');
    setFeedInterviewer('');
    setFeedDate('');
    setFeedComments('');
    alert("Interview feedback submitted successfully!");
  };

  const hideHeader = ['cv-parser', 'post-job', 'track', 'talent-pool', 'feedback', 'candidates', 'vacancies'].includes(activeTab);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header bar */}
      {!hideHeader && (
        <div className="flex justify-between items-center select-none">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 m-0 capitalize">
              Recruitment: {activeTab.replace('-', ' ')}
            </h1>
            <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase">
              Huremaso Recruitment Pipeline Settings
            </p>
          </div>
        </div>
      )}

      {/* Tab Panel: AI CV Parser (Image 1 & 2) */}
      {activeTab === 'cv-parser' && (
        <div className="space-y-6">
          
          {/* Card 1: Search Form layout (Image 2) */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0">Search</h3>
            
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search........" 
                value={cvSearchText}
                onChange={(e) => setCvSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 bg-white rounded-lg text-xs font-semibold text-slate-900 outline-none focus:border-slate-350"
              />
            </div>

            {/* Tags row 1: Recommendations */}
            <div className="flex flex-wrap gap-2.5 items-center text-[10px] font-bold text-slate-600 pt-1">
              {cvSuggestions.map((s, idx) => (
                <span key={idx} className="bg-slate-50 border border-slate-150 px-3 py-1 rounded-md">
                  {s}
                </span>
              ))}
              <button 
                onClick={handleAddActivePill}
                className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 text-blue-500 flex items-center justify-center font-bold text-xs"
              >
                +
              </button>
            </div>

            {/* Tags row 2: Selected active filter pills with cross */}
            <div className="flex flex-wrap gap-2.5 items-center text-[10px] font-bold text-slate-800">
              {cvActivePills.map((p, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-slate-105 border border-slate-200 px-3 py-1.5 rounded-md">
                  <span>{p}</span>
                  <button onClick={() => handleRemoveActivePill(p)} className="p-0.5 text-slate-400 hover:text-slate-700">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-3.5 pt-2">
              <button 
                onClick={() => { setCvSearchText(''); setCvActivePills(['Age', 'Skill', 'Qualification']); }}
                className="px-6 py-2.5 border border-[#0473b8] bg-white hover:bg-blue-50/50 text-[#0473b8] text-xs font-bold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => alert("CV parsing criteria applied!")}
                className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Parse
              </button>
            </div>

          </div>

          {/* Card 2: CV List parsed items (Image 1) */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 m-0">List all CV's</h3>
            
            <div className="space-y-2.5">
              {cvsList.map((cv, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between bg-white border border-slate-150 rounded-lg p-3 px-4 shadow-xs"
                >
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-350 text-blue-600 focus:ring-blue-400 h-4 w-4 shrink-0" 
                    />
                    <div className="space-y-0.5">
                      <div className="text-slate-905 font-bold">{cv.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold">{cv.title}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
                    <span>{cv.modified}</span>
                    <button className="text-slate-400 hover:text-slate-800">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => alert("Batch CV extraction started!")}
                className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Parse
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Tab Panel: Post a Job */}
      {activeTab === 'post-job' && (
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

          {/* Social media Channel Preview (LinkedIn, Instagram, Facebook) */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-5">
            
            {/* Checkboxes matching Image 3 */}
            <div className="flex gap-4">
              <label className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded shadow-xs cursor-pointer select-none">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5" />
                <span className="text-xs font-bold text-slate-800">Linkdin</span>
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
              
              {/* Preview Box Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 flex justify-center">
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs max-w-lg w-full space-y-4 font-semibold">
                  
                  {/* LinkedIn header style */}
                  <div className="flex gap-3 items-center">
                    <div className="h-10 w-10 rounded-full bg-[#0077b5] flex items-center justify-center font-bold text-white text-xs shrink-0 select-none">
                      in
                    </div>
                    <div className="text-xs">
                      <h4 className="font-bold text-slate-905">Your Company Name</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">Job posting · 1 min</p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="text-xs space-y-1.5 pt-1.5 border-t border-slate-100">
                    <h3 className="text-sm font-bold text-slate-905">{postJobTitle}</h3>
                    <p className="text-slate-500 font-bold">{postEmploymentType} · {postLocationType}</p>
                    <p className="text-[#0473b8] font-bold mt-0.5">${parseInt(postMinSalary).toLocaleString()} - ${parseInt(postMaxSalary).toLocaleString()} USD/year</p>
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

            {/* Bottom Actions */}
            <div className="flex justify-end gap-3.5 pt-2 border-t border-slate-100">
              <button 
                type="button"
                onClick={() => alert("Job post canceled")}
                className="px-6 py-2 border border-[#0473b8] bg-white hover:bg-blue-50/50 text-[#0473b8] text-xs font-bold rounded shadow-xs transition-all"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={() => alert("Job description saved as draft")}
                className="px-6 py-2 border border-[#0473b8] bg-white hover:bg-blue-50/50 text-[#0473b8] text-xs font-bold rounded shadow-xs transition-all"
              >
                Save as Draft
              </button>
              <button 
                type="button"
                onClick={() => alert("Job description posted successfully!")}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded shadow-xs transition-all cursor-pointer"
              >
                Post to LinkedIn
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Tab Panel: Track Applicant */}
      {activeTab === 'track' && (
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
                          <button onClick={() => alert("Edit candidate")} className="p-1 hover:text-blue-600">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button 
                            onClick={() => {
                              if (confirm(`Delete candidate application?`)) {
                                setApplicants(applicants.filter(x => x.id !== app.id));
                              }
                            }}
                            className="p-1 hover:text-rose-600"
                          >
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
              <button className="px-2.5 py-0.5 text-xs font-bold border rounded bg-blue-50 text-[#0473b8] border-blue-200 font-extrabold">1</button>
              <button className="px-2.5 py-0.5 text-xs font-bold border rounded bg-white text-slate-500 hover:bg-slate-50">2</button>
              <button className="px-2.5 py-0.5 text-xs font-bold border rounded bg-white text-slate-500 hover:bg-slate-50">3</button>
              <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

          </div>

          {/* Dialog status change overlay modal (Image 5) */}
          {isStatusModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs select-none">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xl max-w-md w-full space-y-6">
                
                {/* Candidates List Header */}
                <div className="space-y-3 text-xs font-bold text-slate-800">
                  <h3 className="text-sm font-bold text-slate-905 m-0">Selected Candidate's</h3>
                  
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="w-4.5 h-4.5 rounded border border-emerald-500 flex items-center justify-center bg-emerald-50">
                        <Check className="h-3 w-3 text-emerald-600 font-bold" />
                      </div>
                      <span>Sarah Johnson</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="w-4.5 h-4.5 rounded border border-emerald-500 flex items-center justify-center bg-emerald-50">
                        <Check className="h-3 w-3 text-emerald-600 font-bold" />
                      </div>
                      <span>Karthika Balan</span>
                    </label>
                  </div>
                </div>

                {/* Status Choice */}
                <div className="space-y-3 text-xs font-bold text-slate-800">
                  <h3 className="text-sm font-bold text-slate-905 m-0">Change Status</h3>
                  
                  <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <select
                      value={modalSelectedStatus}
                      onChange={(e) => setModalSelectedStatus(e.target.value)}
                      className="w-full bg-transparent px-3 py-2.5 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                    >
                      <option value="Shot listed">Shot listed</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                      <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3.5 pt-2">
                  <button 
                    onClick={() => setIsStatusModalOpen(false)}
                    className="px-6 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-750 text-xs font-bold rounded-lg shadow-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleUpdateStatus}
                    className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    Save
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

      {/* Tab Panel: Talent Pool (Image 1 of this turn) */}
      {activeTab === 'talent-pool' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center text-xs font-bold">
            <h3 className="text-sm font-bold text-slate-900 m-0">Talent Pool</h3>
            <div className="flex gap-3">
              <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 bg-white text-slate-700 rounded-lg">
                <Filter className="h-3.5 w-3.5" />
                <span>Filter</span>
              </button>
              <button 
                onClick={() => alert("Add new candidate wizard")}
                className="px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white rounded-lg shadow-sm cursor-pointer"
              >
                + Add New Candidate
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {talentCards.map((card, index) => (
              <div 
                key={index}
                className="bg-white border border-slate-205 rounded-xl p-5 shadow-xs flex flex-col justify-between h-48 select-none"
              >
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-slate-805">{card.title}</h4>
                    <span className="text-[9px] text-slate-400 font-bold">{card.count}</span>
                  </div>
                  
                  <ul className="text-[10px] font-bold text-slate-450 space-y-1 pl-4 list-disc pt-1">
                    {card.skills.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 rounded-full h-1">
                    <div 
                      className="bg-blue-600 h-1 rounded-full" 
                      style={{ width: `${card.progress}%` }} 
                    />
                  </div>
                  
                  <button 
                    onClick={() => alert(`Showing candidate roster for ${card.title}`)}
                    className="w-full py-1.5 border border-slate-200 hover:bg-slate-50 text-[10px] font-bold text-slate-700 rounded-md transition-colors"
                  >
                    View Candidate List
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Panel: Feedback and Interview form (Image 2 of this turn) */}
      {activeTab === 'feedback' && (
        <div className="space-y-6">
          
          {/* Feedback draft composer */}
          <form onSubmit={handleFeedbackSubmit} className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-900 m-0">Interview Feedback Form</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
              <div>
                <label className="block mb-1.5">Candidate Name</label>
                <input 
                  type="text" 
                  placeholder="Enter Candidate Name"
                  value={feedCandidate}
                  onChange={(e) => setFeedCandidate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-905 bg-white font-semibold text-xs outline-none"
                />
              </div>

              <div>
                <label className="block mb-1.5">Position Applied</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={feedPosition}
                    onChange={(e) => setFeedPosition(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
              <div>
                <label className="block mb-1.5">Interview Date</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="date"
                    value={feedDate}
                    onChange={(e) => setFeedDate(e.target.value)}
                    className="w-full px-3 py-2 text-slate-905 outline-none text-xs font-semibold"
                  />
                  <div className="absolute right-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Interviewer Name</label>
                <input 
                  type="text" 
                  placeholder="Enter interviewer name"
                  value={feedInterviewer}
                  onChange={(e) => setFeedInterviewer(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-905 bg-white font-semibold text-xs outline-none"
                />
              </div>
            </div>

            {/* Ratings row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
              <div>
                <label className="block mb-1.5">Technical Skills Rating</label>
                <div className="flex gap-1.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map(val => (
                    <button type="button" key={val} onClick={() => setFeedTechRating(val)}>
                      <Star className={`h-5 w-5 ${val <= feedTechRating ? 'fill-current' : 'text-slate-200'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Communication Skills Rating</label>
                <div className="flex gap-1.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map(val => (
                    <button type="button" key={val} onClick={() => setFeedCommRating(val)}>
                      <Star className={`h-5 w-5 ${val <= feedCommRating ? 'fill-current' : 'text-slate-200'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Assessment & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-705">
              <div>
                <label className="block mb-1.5">Overall Assessment</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={feedAssessment}
                    onChange={(e) => setFeedAssessment(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="Good Fit">Good Fit</option>
                    <option value="Average">Average</option>
                    <option value="Weak candidate">Weak candidate</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Status</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={feedStatus}
                    onChange={(e) => setFeedStatus(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="Hire">Hire</option>
                    <option value="Hold">Hold</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs font-bold text-slate-705">
              <label className="block mb-1.5">Comments</label>
              <textarea 
                rows={4}
                placeholder="Enter comments"
                value={feedComments}
                onChange={(e) => setFeedComments(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-3 text-slate-900 font-semibold text-xs outline-none resize-none bg-slate-50/20"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button 
                type="submit"
                className="px-6 py-2.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Submit Feedback
              </button>
            </div>
          </form>

          {/* Feedback database logs table */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-1">
              <span className="text-xs font-bold text-slate-900">Interview Feedback</span>
              
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search........" 
                    value={feedSearch}
                    onChange={(e) => setFeedSearch(e.target.value)}
                    className="pl-8 pr-4 py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-semibold text-slate-900 outline-none w-48"
                  />
                </div>

                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white w-32">
                  <select
                    value={feedFilterStatus}
                    onChange={(e) => setFeedFilterStatus(e.target.value)}
                    className="w-full bg-transparent px-3 py-1.5 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">All Status</option>
                    <option value="Hire">Hire</option>
                    <option value="Hold">Hold</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3 w-3 text-slate-800" />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[10px] font-bold text-slate-400">
              (3) Records Found
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-bold text-slate-800 border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-450 text-[10px] uppercase">
                    <th className="px-4 py-3">Candidate Name</th>
                    <th className="px-4 py-3">Position</th>
                    <th className="px-4 py-3">Interviewer</th>
                    <th className="px-4 py-3">Interview Date</th>
                    <th className="px-4 py-3">Technical Rating</th>
                    <th className="px-4 py-3">Communication Rating</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-705">
                  {feedbacks.map((f, index) => (
                    <tr key={index} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 text-slate-900 font-bold">{f.candidate}</td>
                      <td className="px-4 py-3">{f.position}</td>
                      <td className="px-4 py-3 text-slate-500">{f.interviewer}</td>
                      <td className="px-4 py-3 text-slate-400">{f.date}</td>
                      <td className="px-4 py-3">
                        <div className="flex text-amber-400">
                          {[1, 2, 3, 4, 5].map(v => (
                            <Star key={v} className={`h-3 w-3 ${v <= f.techRating ? 'fill-current' : 'text-slate-150'}`} />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex text-amber-400">
                          {[1, 2, 3, 4, 5].map(v => (
                            <Star key={v} className={`h-3 w-3 ${v <= f.commRating ? 'fill-current' : 'text-slate-150'}`} />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          f.status === 'Hire' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          f.status === 'Hold' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          'bg-rose-50 text-rose-700 border-rose-100'
                        }`}>
                          {f.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2 text-slate-400">
                          <button onClick={() => alert("Share feedback")} className="p-1 hover:text-slate-600">
                            <Share2 className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => alert("Edit feedback")} className="p-1 hover:text-blue-600">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button 
                            onClick={() => {
                              if (confirm(`Delete feedback record?`)) {
                                setFeedbacks(feedbacks.filter((_, idx) => idx !== index));
                              }
                            }}
                            className="p-1 hover:text-rose-600"
                          >
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
            <div className="flex justify-center items-center gap-2 pt-2">
              <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
                <ChevronLeft className="h-3 w-3" />
              </button>
              <button className="px-2.5 py-0.5 text-xs font-bold border rounded bg-blue-50 text-[#0473b8] border-blue-200 font-extrabold">1</button>
              <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Tab Panel: Candidates (Image 3 of this turn) */}
      {activeTab === 'candidates' && (
        <div className="space-y-6">
          
          <div className="mb-2 select-none">
            <h1 className="text-xl font-bold text-slate-900 m-0">Candidates</h1>
          </div>

          {/* Card Filter Form */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-bold text-slate-705">
              <div>
                <label className="block mb-1.5">Job Title</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={candFilterJobTitle}
                    onChange={(e) => setCandFilterJobTitle(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Job Title</option>
                    <option value="Senior Developer">Senior Developer</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Vacancy</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={candFilterVacancy}
                    onChange={(e) => setCandFilterVacancy(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Vacancy</option>
                    <option value="Next js">Next js</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Hiring Manager</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={candFilterManager}
                    onChange={(e) => setCandFilterManager(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Manager</option>
                    <option value="Amal Benny">Amal Benny</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Status</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={candFilterStatus}
                    onChange={(e) => setCandFilterStatus(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Status</option>
                    <option value="Shortlisted">Shortlisted</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-bold text-slate-705">
              <div>
                <label className="block mb-1.5">Candidate Name</label>
                <input 
                  type="text" 
                  placeholder="Candidate Name"
                  value={candFilterName}
                  onChange={(e) => setCandFilterName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                />
              </div>

              <div>
                <label className="block mb-1.5">Keywords</label>
                <input 
                  type="text" 
                  placeholder="Keywords"
                  value={candFilterKeywords}
                  onChange={(e) => setCandFilterKeywords(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-905 bg-white font-semibold text-xs outline-none"
                />
              </div>

              <div>
                <label className="block mb-1.5">Date of Application (From)</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="date"
                    value={candFilterAppFrom}
                    onChange={(e) => setCandFilterAppFrom(e.target.value)}
                    className="w-full px-3 py-2.5 text-slate-905 outline-none text-xs font-semibold"
                  />
                  <div className="absolute right-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Date of Application (To)</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="date"
                    value={candFilterAppTo}
                    onChange={(e) => setCandFilterAppTo(e.target.value)}
                    className="w-full px-3 py-2.5 text-slate-905 outline-none text-xs font-semibold"
                  />
                  <div className="absolute right-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-xs text-xs font-bold text-slate-705">
              <label className="block mb-1.5">Method of Application</label>
              <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <select
                  value={candFilterMethod}
                  onChange={(e) => setCandFilterMethod(e.target.value)}
                  className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                >
                  <option value="">Select Method</option>
                  <option value="Online">Online</option>
                  <option value="Referral">Referral</option>
                </select>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                  <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => {
                  setCandFilterJobTitle('');
                  setCandFilterVacancy('');
                  setCandFilterManager('');
                  setCandFilterStatus('');
                  setCandFilterName('');
                  setCandFilterKeywords('');
                  setCandFilterAppFrom('');
                  setCandFilterAppTo('');
                  setCandFilterMethod('');
                }}
                className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white"
              >
                Reset
              </button>
              <button 
                onClick={() => alert("Searching candidates...")}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-slate-100 border border-slate-205 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center pb-1">
              <span className="text-[10px] font-bold text-slate-500">(3) Records Found</span>
              <button 
                onClick={() => alert("Add candidate")}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="h-3 w-3" />
                <span>Add</span>
              </button>
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-6 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
              <span>Vacancy</span>
              <span>Candidate</span>
              <span>Hiring Manager</span>
              <span>Date of Application</span>
              <span>Status</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Rows list */}
            <div className="space-y-1.5">
              {candidatesList.map((cand, index) => (
                <div 
                  key={index}
                  className="grid grid-cols-6 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
                >
                  <span>{cand.vacancy}</span>
                  <span className="text-slate-500 font-semibold">{cand.candidate}</span>
                  <span className="text-slate-500 font-semibold">{cand.manager}</span>
                  <span className="text-slate-500 font-semibold">{cand.date}</span>
                  
                  <div>
                    {cand.status && (
                      <span className="bg-blue-50 text-[#0473b8] border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {cand.status}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-end gap-2.5">
                    <button onClick={() => alert("View profile")} className="p-1 text-slate-400 hover:text-slate-600">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => alert("Edit candidate")} className="p-1 text-slate-400 hover:text-blue-600">
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm(`Delete candidate record?`)) {
                          setCandidatesList(candidatesList.filter((_, idx) => idx !== index));
                        }
                      }} 
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 pt-2">
              <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
                <ChevronLeft className="h-3 w-3" />
              </button>
              <button className="px-2.5 py-0.5 text-xs font-bold border rounded bg-blue-50 text-[#0473b8] border-blue-200 font-extrabold">1</button>
              <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Tab Panel: Vacancies (Image 4 of this turn) */}
      {activeTab === 'vacancies' && (
        <div className="space-y-6">
          
          <div className="mb-2 select-none">
            <h1 className="text-xl font-bold text-slate-900 m-0">Vacancies</h1>
          </div>

          {/* Card Filter Form */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-bold text-slate-705">
              <div>
                <label className="block mb-1.5">Job Title</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={vacFilterJobTitle}
                    onChange={(e) => setVacFilterJobTitle(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Job Title</option>
                    <option value="Node js developer">Node js developer</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Vacancy</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={vacFilterVacancy}
                    onChange={(e) => setVacFilterVacancy(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Vacancy</option>
                    <option value="Node Js">Node Js</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Hiring Manager</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={vacFilterManager}
                    onChange={(e) => setVacFilterManager(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Manager</option>
                    <option value="Amal Benny">Amal Benny</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Status</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={vacFilterStatus}
                    onChange={(e) => setVacFilterStatus(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-905 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select Status</option>
                    <option value="Available">Available</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-105 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => {
                  setVacFilterJobTitle('');
                  setVacFilterVacancy('');
                  setVacFilterManager('');
                  setVacFilterStatus('');
                }}
                className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white"
              >
                Reset
              </button>
              <button 
                onClick={() => alert("Searching vacancies...")}
                className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-slate-100 border border-slate-205 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center pb-1">
              <span className="text-[10px] font-bold text-slate-500">(3) Records Found</span>
              <button 
                onClick={() => alert("Add vacancy")}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-[10px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="h-3 w-3" />
                <span>Add</span>
              </button>
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-7 px-4 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
              <span>Vacancy</span>
              <span>Job Title</span>
              <span>Hiring Manager</span>
              <span>Date of Application</span>
              <span>Status</span>
              <span>No of Vacancy</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Rows list */}
            <div className="space-y-1.5">
              {vacanciesList.map((vac, index) => (
                <div 
                  key={index}
                  className="grid grid-cols-7 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
                >
                  <span>{vac.vacancy}</span>
                  <span className="text-slate-500 font-semibold">{vac.title}</span>
                  <span className="text-slate-500 font-semibold">{vac.manager}</span>
                  <span className="text-slate-500 font-semibold">{vac.date}</span>
                  
                  <div>
                    {vac.status && (
                      <span className="bg-blue-50 text-[#0473b8] border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {vac.status}
                      </span>
                    )}
                  </div>

                  <span className="text-slate-500 font-semibold">{vac.count}</span>

                  <div className="flex justify-end gap-2.5">
                    <button onClick={() => alert("View details")} className="p-1 text-slate-400 hover:text-slate-600">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => alert("Edit vacancy")} className="p-1 text-slate-400 hover:text-blue-600">
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 pt-2">
              <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
                <ChevronLeft className="h-3 w-3" />
              </button>
              <button className="px-2.5 py-0.5 text-xs font-bold border rounded bg-blue-50 text-[#0473b8] border-blue-200 font-extrabold">1</button>
              <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Placeholders for onboarding & offboarding */}
      {['onboarding', 'offboarding'].includes(activeTab) && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-xs font-bold text-slate-400">
          Recruitment Hub option configs. Complete route layout is registered.
        </div>
      )}

    </div>
  );
};
export default RecruitmentPage;
