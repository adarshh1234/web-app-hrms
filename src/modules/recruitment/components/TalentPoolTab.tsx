import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

export const TalentPoolTab: React.FC = () => {
  const toast = useToast();
  const [talentCards] = useState([
    { id: '1', title: 'Technical Skills', count: '1,247 candidates', skills: ['Programming', 'Data Analysis', 'Cloud Computing'], progress: 35 },
    { id: '2', title: 'React Developer', count: '1,247 candidates', skills: ['Communication', 'Js', 'Teamwork'], progress: 65 },
    { id: '3', title: 'Design Skills', count: '1,247 candidates', skills: ['UI/UX', 'Graphic Design', 'Prototyping'], progress: 48 },
    { id: '4', title: 'Technical Skills', count: '1,247 candidates', skills: ['Programming', 'Data Analysis', 'Cloud Computing'], progress: 35 },
    { id: '5', title: 'Soft Skills', count: '1,247 candidates', skills: ['Communication', 'Leadership', 'Teamwork'], progress: 75 },
    { id: '6', title: 'Design Skills', count: '1,247 candidates', skills: ['UI/UX', 'Graphic Design', 'Prototyping'], progress: 48 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-xs font-bold">
        <h3 className="text-sm font-bold text-slate-900 m-0">Talent Pool</h3>
        <div className="flex gap-3">
          <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 bg-white text-slate-700 rounded-lg">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
          </button>
          <button
            onClick={() => toast.info('Add new candidate wizard')}
            className="px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white rounded-lg shadow-sm cursor-pointer"
          >
            + Add New Candidate
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {talentCards.map((card) => (
          <div
            key={card.id}
            className="bg-white border border-slate-205 rounded-xl p-5 shadow-xs flex flex-col justify-between h-48 select-none"
          >
            <div className="space-y-1">
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-bold text-slate-805">{card.title}</h4>
                <span className="text-[9px] text-slate-400 font-bold">{card.count}</span>
              </div>

              <ul className="text-[10px] font-bold text-slate-450 space-y-1 pl-4 list-disc pt-1">
                {card.skills.map((s, idx) => (
                  <li key={`${s}-${idx}`}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="w-full bg-slate-100 rounded-full h-1">
                <div className="bg-blue-600 h-1 rounded-full" style={{ width: `${card.progress}%` }} />
              </div>

              <button
                onClick={() => toast.info(`Showing candidate roster for ${card.title}`)}
                className="w-full py-1.5 border border-slate-200 hover:bg-slate-50 text-[10px] font-bold text-slate-700 rounded-md transition-colors cursor-pointer"
              >
                View Candidate List
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TalentPoolTab;
