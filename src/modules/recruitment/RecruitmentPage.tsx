import React from 'react';
import { useSearchParams } from 'react-router-dom';
import CvParserTab from './components/CvParserTab';
import PostJobTab from './components/PostJobTab';
import TrackApplicantsTab from './components/TrackApplicantsTab';
import TalentPoolTab from './components/TalentPoolTab';
import FeedbackTab from './components/FeedbackTab';
import CandidatesTab from './components/CandidatesTab';
import VacanciesTab from './components/VacanciesTab';

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

  const hideHeader = ['cv-parser', 'post-job', 'track', 'talent-pool', 'feedback', 'candidates', 'vacancies'].includes(activeTab);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
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

      {activeTab === 'cv-parser' && <CvParserTab />}
      {activeTab === 'post-job' && <PostJobTab />}
      {activeTab === 'track' && <TrackApplicantsTab />}
      {activeTab === 'talent-pool' && <TalentPoolTab />}
      {activeTab === 'feedback' && <FeedbackTab />}
      {activeTab === 'candidates' && <CandidatesTab />}
      {activeTab === 'vacancies' && <VacanciesTab />}

      {['onboarding', 'offboarding'].includes(activeTab) && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-xs font-bold text-slate-400">
          Recruitment Hub option configs. Complete route layout is registered.
        </div>
      )}
    </div>
  );
};

export default RecruitmentPage;
