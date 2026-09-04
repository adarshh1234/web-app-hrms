import React from 'react';
import { GraduationCap, Compass, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const WellnessEmployeeDevelopmentPage: React.FC = () => {
  const toast = useToast();

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider mb-2">
          <GraduationCap className="h-3.5 w-3.5 text-teal-300" />
          <span>Professional Growth</span>
        </div>
        <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Employee Development</h1>
        <p className="text-xs text-teal-100/80 mt-1">Skill matrices, leadership mentorship tracks, certification allowances, and career pathing.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Completed Training Hours</span>
          <div className="text-2xl font-extrabold text-slate-900">48 Hours</div>
          <span className="text-[11px] text-teal-600 font-semibold">Annual Target: 60 Hours</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Active Certifications</span>
          <div className="text-2xl font-extrabold text-slate-900">4 Badges</div>
          <span className="text-[11px] text-emerald-600 font-semibold">AWS & PMP Certified</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Learning Allowance Balance</span>
          <div className="text-2xl font-extrabold text-slate-900">$1,200 USD</div>
          <span className="text-[11px] text-teal-600 font-semibold">Reimbursable for courses</span>
        </div>
      </div>

      {/* Active Learning Programs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 m-0 border-b border-slate-150 pb-3">Enrolled Executive Leadership Programs</h3>
        <div className="space-y-3">
          {[
            { title: 'Strategic Product Leadership & Team Management', provider: 'Huremaso Learning Hub', progress: '75%', modules: '6 of 8 Completed' },
            { title: 'Advanced Cloud Security & Microservices Architecture', provider: 'Coursera Enterprise', progress: '40%', modules: '4 of 10 Completed' },
          ].map((course, idx) => (
            <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 m-0">{course.title}</h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{course.provider} • {course.modules}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold text-[#004848]">{course.progress}</span>
                <button 
                  onClick={() => toast.success("Opening course player...")}
                  className="px-3 py-1.5 bg-[#004848] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-[#006666]"
                >
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WellnessEmployeeDevelopmentPage;
