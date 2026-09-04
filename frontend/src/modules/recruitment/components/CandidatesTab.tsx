import React, { useState, useEffect } from 'react';
import { ChevronDown, Calendar, Plus, Eye, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import recruitmentService from '../../../services/recruitmentService';
import Loader from '../../../components/common/Loader';
import EmptyState from '../../../components/common/EmptyState';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';

export const CandidatesTab: React.FC = () => {
  const toast = useToast();
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
    { id: 'c1', vacancy: 'Next js', candidate: 'Karthika', manager: 'Amal Benny', date: '2024-29-03', status: 'Shortlisted' },
    { id: 'c2', vacancy: 'Blood Type', candidate: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '' },
    { id: 'c3', vacancy: 'custom', candidate: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '' },
    { id: 'c4', vacancy: 'Grades titles', candidate: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: '' },
    { id: 'c5', vacancy: 'Address', candidate: 'Personal Details', manager: 'Personal Details', date: '2024-29-03', status: 'Shortlisted' },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      setIsLoading(true);
      try {
        const data = await recruitmentService.getCandidates();
        if (data && data.length > 0) {
          setCandidatesList(data.map(c => ({
            id: c.id,
            vacancy: c.vacancy,
            candidate: c.name,
            manager: c.hiringManager,
            date: c.dateApplied,
            status: c.status
          })));
        }
      } catch (err) {
        // fallback to default mock if error
      } finally {
        setIsLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const handleDelete = (id: string) => {
    setCandidatesList((prev) => prev.filter((c) => c.id !== id));
    toast.success('Candidate record deleted');
  };

  const handleReset = () => {
    setCandFilterJobTitle('');
    setCandFilterVacancy('');
    setCandFilterManager('');
    setCandFilterStatus('');
    setCandFilterName('');
    setCandFilterKeywords('');
    setCandFilterAppFrom('');
    setCandFilterAppTo('');
    setCandFilterMethod('');
  };

  return (
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
          <Input
            label="Candidate Name"
            type="text"
            placeholder="Candidate Name"
            value={candFilterName}
            onChange={(e) => setCandFilterName(e.target.value)}
          />

          <Input
            label="Keywords"
            type="text"
            placeholder="Keywords"
            value={candFilterKeywords}
            onChange={(e) => setCandFilterKeywords(e.target.value)}
          />

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
            onClick={handleReset}
            className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white cursor-pointer"
          >
            Reset
          </button>
          <Button
            variant="primary"
            size="md"
            className="px-6"
            onClick={() => toast.info('Searching candidates...')}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-slate-100 border border-slate-205 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center pb-1">
          <span className="text-[10px] font-bold text-slate-500">({candidatesList.length}) Records Found</span>
          <button
            onClick={() => toast.info('Add candidate form')}
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
          {candidatesList.map((cand) => (
            <div
              key={cand.id}
              className="grid grid-cols-6 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
            >
              <span>{cand.vacancy}</span>
              <span className="text-slate-500 font-semibold">{cand.candidate}</span>
              <span className="text-slate-500 font-semibold">{cand.manager}</span>
              <span className="text-slate-500 font-semibold">{cand.date}</span>

              <div>
                {cand.status && (
                  <Badge variant="info" size="sm">
                    {cand.status}
                  </Badge>
                )}
              </div>

              <div className="flex justify-end gap-2.5">
                <button onClick={() => toast.info('View profile')} className="p-1 text-slate-400 hover:text-slate-600">
                  <Eye className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => toast.info('Edit candidate')} className="p-1 text-slate-400 hover:text-blue-600">
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => handleDelete(cand.id)} className="p-1 text-slate-400 hover:text-rose-600">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

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
  );
};

export default CandidatesTab;
