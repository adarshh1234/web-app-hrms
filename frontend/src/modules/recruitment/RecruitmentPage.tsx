import React from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import ResumeTab from './components/ResumeTab';
import CvParserTab from './components/CvParserTab';
import PostJobTab from './components/PostJobTab';
import TrackApplicantsTab from './components/TrackApplicantsTab';
import TalentPoolTab from './components/TalentPoolTab';
import FeedbackTab from './components/FeedbackTab';
import CandidatesTab from './components/CandidatesTab';
import VacanciesTab from './components/VacanciesTab';
import PostInLetgetinTab from './components/PostInLetgetinTab';

export const RecruitmentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const tabParam = location.pathname.includes('/resume')
    ? 'resume'
    : searchParams.get('tab') || 'resume';
  const activeTab = tabParam as
    | 'resume'
    | 'onboarding'
    | 'offboarding'
    | 'cv-parser'
    | 'post-job'
    | 'track'
    | 'talent-pool'
    | 'feedback'
    | 'candidates'
    | 'vacancies'
    | 'post-letgetin';

  const hideHeader = ['resume', 'cv-parser', 'post-job', 'track', 'talent-pool', 'feedback', 'candidates', 'vacancies', 'post-letgetin'].includes(activeTab);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {!hideHeader && (
        <div className="flex justify-between items-center select-none">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 m-0 capitalize">
              Recruitment Pipeline: {activeTab.replace('-', ' ')}
            </h1>
            <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase">
              Huremaso Recruitment Pipeline Settings
            </p>
          </div>
        </div>
      )}

      {activeTab === 'resume' && <ResumeTab />}
      {activeTab === 'cv-parser' && <CvParserTab />}
      {activeTab === 'post-job' && <PostJobTab />}
      {activeTab === 'track' && <TrackApplicantsTab />}
      {activeTab === 'talent-pool' && <TalentPoolTab />}
      {activeTab === 'feedback' && <FeedbackTab />}
      {activeTab === 'candidates' && <CandidatesTab />}
      {activeTab === 'vacancies' && <VacanciesTab />}
      {activeTab === 'post-letgetin' && <PostInLetgetinTab />}

      {['onboarding', 'offboarding'].includes(activeTab) && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-xs font-bold text-slate-400">
          Recruitment Hub option configs. Complete route layout is registered.
        </div>
      )}
    </div>
  );
};

export default RecruitmentPage;
