import React, { useState } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Star, Share2, Edit2, Trash2, Calendar } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export const FeedbackTab: React.FC = () => {
  const toast = useToast();
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
    { id: 'f1', candidate: 'Sarah', position: 'UIUX Designer', interviewer: 'Amal Benny', date: '2024-29-03', techRating: 3, commRating: 3, status: 'Hire' },
    { id: 'f2', candidate: 'Sarah', position: 'UIUX Designer', interviewer: 'Amal Benny', date: '2024-29-03', techRating: 3, commRating: 3, status: 'Hold' },
    { id: 'f3', candidate: 'Sarah', position: 'UIUX Designer', interviewer: 'Amal Benny', date: '2024-29-03', techRating: 3, commRating: 3, status: 'Rejected' },
  ]);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFeed = {
      id: Math.random().toString(),
      candidate: feedCandidate || 'Candidate',
      position: feedPosition,
      interviewer: feedInterviewer || 'Interviewer',
      date: feedDate || new Date().toISOString().split('T')[0],
      techRating: feedTechRating,
      commRating: feedCommRating,
      status: feedStatus,
    };
    setFeedbacks([newFeed, ...feedbacks]);
    setFeedCandidate('');
    setFeedInterviewer('');
    setFeedDate('');
    setFeedComments('');
    toast.success('Interview feedback submitted successfully!');
  };

  const handleDelete = (id: string) => {
    setFeedbacks((prev) => prev.filter((f) => f.id !== id));
    toast.success('Feedback record deleted.');
  };

  return (
    <div className="space-y-6">
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
              {[1, 2, 3, 4, 5].map((val) => (
                <button type="button" key={val} onClick={() => setFeedTechRating(val)}>
                  <Star className={`h-5 w-5 ${val <= feedTechRating ? 'fill-current' : 'text-slate-200'}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-1.5">Communication Skills Rating</label>
            <div className="flex gap-1.5 text-amber-400">
              {[1, 2, 3, 4, 5].map((val) => (
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

      {/* Table */}
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
              {feedbacks.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 text-slate-900 font-bold">{f.candidate}</td>
                  <td className="px-4 py-3">{f.position}</td>
                  <td className="px-4 py-3 text-slate-500">{f.interviewer}</td>
                  <td className="px-4 py-3 text-slate-400">{f.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <Star key={v} className={`h-3 w-3 ${v <= f.techRating ? 'fill-current' : 'text-slate-150'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <Star key={v} className={`h-3 w-3 ${v <= f.commRating ? 'fill-current' : 'text-slate-150'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        f.status === 'Hire'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          : f.status === 'Hold'
                          ? 'bg-amber-50 text-amber-700 border-amber-100'
                          : 'bg-rose-50 text-rose-700 border-rose-100'
                      }`}
                    >
                      {f.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2 text-slate-400">
                      <button onClick={() => toast.info('Feedback shared')} className="p-1 hover:text-slate-600">
                        <Share2 className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => toast.info('Edit feedback')} className="p-1 hover:text-blue-600">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => handleDelete(f.id)} className="p-1 hover:text-rose-600">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center gap-2 pt-2">
          <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
            <ChevronLeft className="h-3 w-3" />
          </button>
          <button className="px-2.5 py-0.5 text-xs font-bold border rounded bg-blue-50 text-[#0473b8] border-blue-200">1</button>
          <button className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-500">
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackTab;
