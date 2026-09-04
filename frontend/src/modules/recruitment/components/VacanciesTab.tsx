import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, Eye, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import recruitmentService from '../../../services/recruitmentService';
import Loader from '../../../components/common/Loader';
import EmptyState from '../../../components/common/EmptyState';
import Badge from '../../../components/common/Badge';

export const VacanciesTab: React.FC = () => {
  const toast = useToast();
  const [vacFilterJobTitle, setVacFilterJobTitle] = useState('');
  const [vacFilterVacancy, setVacFilterVacancy] = useState('');
  const [vacFilterManager, setVacFilterManager] = useState('');
  const [vacFilterStatus, setVacFilterStatus] = useState('');

  const [vacanciesList, setVacanciesList] = useState([
    { id: 'v1', vacancy: 'Node Js', title: 'Node js developer', manager: 'Amal Benny', date: '2024-29-03', status: 'Available', count: 2 },
    { id: 'v2', vacancy: 'React Dev', title: 'Senior Frontend Engineer', manager: 'Sarah Joseph', date: '2024-29-03', status: 'Available', count: 1 },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVacancies = async () => {
      setIsLoading(true);
      try {
        const data = await recruitmentService.getVacancies();
        if (data && data.length > 0) {
          setVacanciesList(data.map(v => ({
            id: v.id,
            vacancy: v.department,
            title: v.jobTitle,
            manager: v.hiringManager,
            date: v.datePosted,
            status: v.status,
            count: v.noOfOpenings
          })));
        }
      } catch (err) {
        // fallback
      } finally {
        setIsLoading(false);
      }
    };
    fetchVacancies();
  }, []);

  const handleReset = () => {
    setVacFilterJobTitle('');
    setVacFilterVacancy('');
    setVacFilterManager('');
    setVacFilterStatus('');
  };

  return (
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
            onClick={handleReset}
            className="px-6 py-2 border border-[#0473b8] text-[#0473b8] text-xs font-bold rounded-lg hover:bg-blue-50/50 transition-all bg-white cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={() => toast.info('Searching vacancies...')}
            className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-slate-100 border border-slate-205 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center pb-1">
          <span className="text-[10px] font-bold text-slate-500">({vacanciesList.length}) Records Found</span>
          <button
            onClick={() => toast.info('Add vacancy modal')}
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
          {vacanciesList.map((vac) => (
            <div
              key={vac.id}
              className="grid grid-cols-7 items-center bg-white border border-slate-200 rounded-lg py-2.5 px-4 shadow-sm text-xs font-bold text-slate-800"
            >
              <span>{vac.vacancy}</span>
              <span className="text-slate-500 font-semibold">{vac.title}</span>
              <span className="text-slate-500 font-semibold">{vac.manager}</span>
              <span className="text-slate-500 font-semibold">{vac.date}</span>

              <div>
                {vac.status && (
                  <Badge variant="info" size="sm">
                    {vac.status}
                  </Badge>
                )}
              </div>

              <span className="text-slate-500 font-semibold">{vac.count}</span>

              <div className="flex justify-end gap-2.5">
                <button onClick={() => toast.info('View details')} className="p-1 text-slate-400 hover:text-slate-600">
                  <Eye className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => toast.info('Edit vacancy')} className="p-1 text-slate-400 hover:text-blue-600">
                  <Edit2 className="h-3.5 w-3.5" />
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

export default VacanciesTab;
