import React, { useState } from 'react';
import { Mail, User } from 'lucide-react';

interface SupportEvent {
  id: string;
  timeAgo: string;
  title: string;
  description: string;
  author: string;
  replaysCount: number;
}

export const SupportEventsPage: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string>('4'); // Highlight card #4 by default matching image

  const events: SupportEvent[] = [
    { id: '1', timeAgo: '2 hr ago', title: 'Employee Onboarding System Access Issue', description: 'New employee unable to access HR portal after completing onboarding process...', author: 'Sarah Jo', replaysCount: 3 },
    { id: '2', timeAgo: '2 hr ago', title: 'Employee Onboarding System Access Issue', description: 'New employee unable to access HR portal after completing onboarding process...', author: 'Sarah Jo', replaysCount: 3 },
    { id: '3', timeAgo: '2 hr ago', title: 'Employee Onboarding System Access Issue', description: 'New employee unable to access HR portal after completing onboarding process...', author: 'Sarah Jo', replaysCount: 3 },
    { id: '4', timeAgo: '2 hr ago', title: 'Employee Onboarding System Access Issue', description: 'New employee unable to access HR portal after completing onboarding process...', author: 'Sarah Jo', replaysCount: 3 },
    { id: '5', timeAgo: '2 hr ago', title: 'Employee Onboarding System Access Issue', description: 'New employee unable to access HR portal after completing onboarding process...', author: 'Sarah Jo', replaysCount: 3 },
    { id: '6', timeAgo: '2 hr ago', title: 'Employee Onboarding System Access Issue', description: 'New employee unable to access HR portal after completing onboarding process...', author: 'Sarah Jo', replaysCount: 3 },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Support Events</h1>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {events.map((e) => (
          <div 
            key={e.id}
            onClick={() => setActiveCard(e.id)}
            className={`bg-white rounded-xl p-5 shadow-sm space-y-4 hover:shadow-md transition-all cursor-pointer border ${
              activeCard === e.id 
                ? 'border-2 border-blue-500' 
                : 'border-slate-200'
            }`}
          >
            {/* Top row */}
            <div className="text-[10px] font-bold text-slate-400">
              {e.timeAgo}
            </div>

            {/* Title & Body */}
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-slate-850 m-0">{e.title}</h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                {e.description}
              </p>
            </div>

            {/* Actions & Meta footer line */}
            <div className="flex justify-between items-center pt-2">
              <div className="flex gap-3">
                <button 
                  onClick={(event) => {
                    event.stopPropagation();
                    alert("Ticket set to Open status");
                  }}
                  className="px-5 py-1.5 bg-[#a3d2ee]/60 hover:bg-[#a3d2ee] text-slate-750 text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Open
                </button>
                <button 
                  onClick={(event) => {
                    event.stopPropagation();
                    alert("Opening replay dialog");
                  }}
                  className="px-5 py-1.5 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Replay
                </button>
              </div>

              {/* Author & Replay Count details */}
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  <span>{e.author}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>{e.replaysCount} Replays</span>
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
export default SupportEventsPage;
