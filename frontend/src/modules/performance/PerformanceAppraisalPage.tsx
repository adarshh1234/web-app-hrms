import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  BarChart3, 
  Clock, 
  Zap, 
  BrainCircuit, 
  FileText, 
  Award, 
  ThumbsUp, 
  Target, 
  TrendingUp,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const PerformanceAppraisalPage: React.FC = () => {
  const toast = useToast();
  const location = useLocation();
  const path = location.pathname;

  const isReportsAi = path.includes('/reports-ai');
  const isAttendanceTime = path.includes('/attendance-time');
  const isSmartWork = path.includes('/smart-work');
  const isPsychometric = path.includes('/psychometric');
  const isEsops = path.includes('/e-sops');
  const isReview = path.includes('/review');
  const isReferences = path.includes('/references');
  const isStrategy = path.includes('/strategy');
  const isAnalyticsAi = path.includes('/analytics-ai');

  // Sub-view 1: Lists – reports – AI page
  if (isReportsAi) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-teal-300" />
              <span>AI Evaluation Engine</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Lists – Reports – AI Page</h1>
            <p className="text-xs text-teal-100/80 m-0">AI-generated evaluation reports, rating distribution heatmaps, and skill gap summaries.</p>
          </div>
          <button 
            onClick={() => toast.success("Generating AI appraisal summary report...")}
            className="px-4 py-2.5 bg-white text-[#004848] text-xs font-extrabold rounded-xl shadow-sm hover:bg-teal-50 cursor-pointer"
          >
            Generate AI Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500">AI Evaluation Score</span>
            <div className="text-2xl font-extrabold text-slate-900">4.8 / 5.0</div>
            <span className="text-[11px] font-semibold text-emerald-600">Top 5% Performance Tier</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500">Peer Sentiment Rating</span>
            <div className="text-2xl font-extrabold text-slate-900">96% Positive</div>
            <span className="text-[11px] font-semibold text-teal-600">Based on 360° Feedback</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500">Core Competencies Met</span>
            <div className="text-2xl font-extrabold text-slate-900">12 of 12</div>
            <span className="text-[11px] font-semibold text-emerald-600">100% Target Alignment</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">AI Competency & Skill Gap Analysis</h3>
          <div className="space-y-3">
            {[
              { skill: 'Technical Architecture & Code Efficiency', score: '98%', status: 'Exceeds Expectation' },
              { skill: 'Cross-functional Collaboration', score: '94%', status: 'Exceeds Expectation' },
              { skill: 'Strategic Project Delivery & Planning', score: '91%', status: 'Meets Expectation' },
            ].map((row, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 m-0">{row.skill}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">AI Benchmark Score: {row.score}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold">{row.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Sub-view 2: Attendance and time
  if (isAttendanceTime) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Attendance & Time Appraisal Impact</h1>
          <p className="text-xs text-teal-100/80 mt-1">Correlation metrics between attendance punctuality, OT hours, and appraisal ratings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500">Punctuality Score</span>
            <div className="text-2xl font-extrabold text-slate-900">99.2%</div>
            <span className="text-[11px] font-semibold text-emerald-600">Perfect attendance streak</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500">Overtime Utilization</span>
            <div className="text-2xl font-extrabold text-slate-900">14.5 Hours / mo</div>
            <span className="text-[11px] font-semibold text-teal-600">Approved OT Contribution</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500">Time-to-Task Completion</span>
            <div className="text-2xl font-extrabold text-slate-900">1.15x Velocity</div>
            <span className="text-[11px] font-semibold text-emerald-600">Delivers ahead of schedule</span>
          </div>
        </div>
      </div>
    );
  }

  // Sub-view 3: Smart work
  if (isSmartWork) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Smart Work & Efficiency Metrics</h1>
          <p className="text-xs text-teal-100/80 mt-1">Output efficiency, automation impact, and smart work scorecards.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Smart Work Indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
              <span className="text-xs font-bold text-slate-500">Workflow Automation Created</span>
              <div className="text-xl font-extrabold text-slate-900">8 Automated Workflows</div>
              <p className="text-[11px] text-slate-500 font-semibold">Saved 120 manual team hours per month</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
              <span className="text-xs font-bold text-slate-500">Focus Hours Ratio</span>
              <div className="text-xl font-extrabold text-[#004848]">68% Deep Work Time</div>
              <p className="text-[11px] text-slate-500 font-semibold">Optimal balance of meeting vs coding</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sub-view 4: Psychometric assessments
  if (isPsychometric) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Psychometric Assessments</h1>
          <p className="text-xs text-teal-100/80 mt-1">Behavioral profiles, cognitive assessment scores, and team synergy metrics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500">DISC Profile Archetype</span>
            <div className="text-xl font-extrabold text-[#004848]">Dominant-Influencer (Di)</div>
            <span className="text-[11px] font-semibold text-slate-500">Natural Problem Solver & Leader</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500">Cognitive Aptitude Index</span>
            <div className="text-2xl font-extrabold text-slate-900">95th Percentile</div>
            <span className="text-[11px] font-semibold text-emerald-600">High analytical reasoning</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500">Emotional Intelligence (EQ)</span>
            <div className="text-2xl font-extrabold text-slate-900">138 / 150</div>
            <span className="text-[11px] font-semibold text-teal-600">Excellent empathy & conflict resolution</span>
          </div>
        </div>
      </div>
    );
  }

  // Sub-view 5: E-SOPs
  if (isEsops) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">E-SOPs (Appraisal Standard Operating Procedures)</h1>
          <p className="text-xs text-teal-100/80 mt-1">Standardized appraisal guidelines, rating calibration criteria, and dispute resolution workflows.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
          {[
            { title: 'SOP 1.0: Annual Appraisal Cycle Execution & Timeline', status: 'Mandatory Read', updated: 'August 2026' },
            { title: 'SOP 2.0: 360-Degree Peer Feedback Guidelines & Ethics', status: 'Active', updated: 'July 2026' },
            { title: 'SOP 3.0: Manager Rating Calibration & Bell-Curve Adjustments', status: 'Active', updated: 'June 2026' },
            { title: 'SOP 4.0: Appraisal Appeal & Grievance Escalation Process', status: 'Active', updated: 'May 2026' }
          ].map((sop, i) => (
            <div key={i} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">{sop.title}</h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Last Updated: {sop.updated}</p>
              </div>
              <button 
                onClick={() => toast.success("Opening SOP document viewer...")}
                className="px-3 py-1.5 bg-[#004848] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#006666]"
              >
                View Document
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Sub-view 6: Performance Review
  if (isReview) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Performance Review</h1>
            <p className="text-xs text-teal-100/80 mt-1">Self-appraisals, manager evaluations, and 360° feedback forms.</p>
          </div>
          <button 
            onClick={() => toast.success("Self-appraisal form submitted for Q3 review cycle!")}
            className="px-4 py-2 bg-white text-[#004848] text-xs font-bold rounded-xl cursor-pointer shadow-sm hover:bg-teal-50"
          >
            Submit Self Appraisal
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 m-0">Q3 2026 Appraisal Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-slate-200 rounded-xl bg-emerald-50/50 space-y-1">
              <span className="text-xs font-bold text-emerald-800">1. Self Appraisal</span>
              <div className="text-sm font-extrabold text-emerald-900">Completed (Submitted)</div>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl bg-amber-50/50 space-y-1">
              <span className="text-xs font-bold text-amber-800">2. Manager Review</span>
              <div className="text-sm font-extrabold text-amber-900">In Progress (Pending Signoff)</div>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
              <span className="text-xs font-bold text-slate-500">3. Final HR Calibration</span>
              <div className="text-sm font-extrabold text-slate-700">Scheduled for Sep 15</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sub-view 7: References and recommendations
  if (isReferences) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">References & Recommendations</h1>
          <p className="text-xs text-teal-100/80 mt-1">Peer commendations, internal endorsements, and promotion recommendations.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-150 pb-3">
            <h3 className="text-sm font-bold text-slate-900 m-0">Endorsements & Commendations</h3>
            <button 
              onClick={() => toast.success("Recommendation form opened.")}
              className="px-3 py-1.5 bg-[#004848] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#006666]"
            >
              Write Peer Endorsement
            </button>
          </div>
          <div className="space-y-3">
            {[
              { from: 'David Miller (Engineering Lead)', text: 'Sarah consistently displays exceptional leadership in architecture design and mentors junior engineers with remarkable dedication.', date: 'August 18, 2026' },
              { from: 'Emily Davis (Product Director)', text: 'Highly recommend Sarah for Senior Staff Engineer role. Her impact on Q2 product velocity was outstanding.', date: 'July 29, 2026' },
            ].map((rec, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
                <h4 className="text-xs font-bold text-slate-900 m-0">{rec.from}</h4>
                <p className="text-xs text-slate-600 font-semibold italic">"{rec.text}"</p>
                <span className="text-[10px] text-slate-400 font-bold block pt-1">{rec.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Sub-view 8: Special Strategy Program
  if (isStrategy) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Special Strategy Program</h1>
          <p className="text-xs text-teal-100/80 mt-1">High-Potential (HiPo) fast-track tracks, executive succession planning, and strategic retention programs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <span className="px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full text-xs font-extrabold">HiPo Talent Track</span>
            <h3 className="text-base font-extrabold text-slate-900 m-0">Executive Fast-Track Promotion Program</h3>
            <p className="text-xs text-slate-600 font-semibold">Nominated for Director of Engineering succession plan. Includes executive coaching & offshore leadership rotations.</p>
            <button 
              onClick={() => toast.success("Opening HiPo program milestone portal...")}
              className="w-full py-2 bg-[#004848] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#006666]"
            >
              View Program Roadmap
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-extrabold">Retention Grant</span>
            <h3 className="text-base font-extrabold text-slate-900 m-0">Key Talent Strategic Retention Bonus</h3>
            <p className="text-xs text-slate-600 font-semibold">Tier-1 Retention Agreement active through December 2027 with quarterly equity acceleration.</p>
            <span className="text-xs font-extrabold text-emerald-600 block">Status: Active & Vesting</span>
          </div>
        </div>
      </div>
    );
  }

  // Sub-view 9: Reports and analytics - AI
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider mb-2">
          <BrainCircuit className="h-3.5 w-3.5 text-teal-300" />
          <span>AI Predictive Analytics</span>
        </div>
        <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Reports and Analytics – AI</h1>
        <p className="text-xs text-teal-100/80 mt-1">Predictive attrition risk models, AI performance trajectory projections, and department appraisal heatmaps.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Predicted 1-Yr Performance Trajectory</span>
          <div className="text-2xl font-extrabold text-slate-900">+18% Growth</div>
          <span className="text-[11px] font-semibold text-emerald-600">High Growth Potential</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">AI Attrition Risk Index</span>
          <div className="text-2xl font-extrabold text-slate-900">Low (2.1%)</div>
          <span className="text-[11px] font-semibold text-emerald-600">High Retention Likelihood</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Leadership Readiness Score</span>
          <div className="text-2xl font-extrabold text-slate-900">92 / 100</div>
          <span className="text-[11px] font-semibold text-teal-600">Ready for Promotion</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAppraisalPage;
