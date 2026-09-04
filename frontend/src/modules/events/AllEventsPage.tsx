import React, { useState } from 'react';
import { SlidersHorizontal, Plus, Edit2, Share2, MoreVertical } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface EventCard {
  status: 'In Progress' | 'Up coming' | 'Planing';
  title: string;
  date: string;
  time: string;
  room: string;
  progress: string;
}

interface TaskRow {
  name: string;
  due: string;
  assignee: string;
  status: 'In Progress' | 'Pending' | 'Not Started';
}

export const AllEventsPage: React.FC = () => {
  const toast = useToast();
  const [activeTaskTab, setActiveTaskTab] = useState<'All' | 'Today' | 'Upcoming' | 'Completed'>('Upcoming');

  const events: EventCard[] = [
    { status: 'In Progress', title: 'Annual Leadership Training 2024', date: 'July 20, 2025', time: '9.00 AM - 4.00 PM', room: 'Main Conference Room', progress: '20/20 Task' },
    { status: 'Up coming', title: 'Annual Leadership Training 2024', date: 'July 20, 2025', time: '9.00 AM - 4.00 PM', room: 'Main Conference Room', progress: '7/20 Task' },
    { status: 'Planing', title: 'Annual Leadership Training 2024', date: 'July 20, 2025', time: '9.00 AM - 4.00 PM', room: 'Main Conference Room', progress: '7/20 Task' },
  ];

  const tasks: TaskRow[] = [
    { name: 'Prepare presentation slides', due: 'July 20, 2025', assignee: 'Sarah Jo', status: 'In Progress' },
    { name: 'Review employee feedback', due: 'July 21, 2025', assignee: 'Sarah Jo', status: 'Pending' },
    { name: 'Update company policies', due: 'July 24, 2025', assignee: 'Sarah Jo', status: 'Not Started' },
    { name: 'Book conference room', due: 'July 28, 2025', assignee: 'Sarah Jo', status: 'In Progress' },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      
      {/* 1. All Events Grid Section */}
      <div className="space-y-4">
        <div className="mb-2 select-none">
          <h1 className="text-xl font-bold text-slate-900 m-0">All Events</h1>
        </div>

        <div className="flex justify-between items-center">
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-[#0473b8] bg-white rounded-lg text-xs font-semibold text-[#0473b8] hover:bg-blue-50/50 transition-all">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#0473b8]" />
            <span>Filter</span>
          </button>
          <button 
            onClick={() => toast.info("Redirecting to Add Event tab")}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Event</span>
          </button>
        </div>

        {/* 3 Columns Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((e) => (
            <div key={e.title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 hover:shadow-md transition-all relative">
              
              {/* Header Status & Dots */}
              <div className="flex justify-between items-start">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                  e.status === 'In Progress' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                  e.status === 'Up coming' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                  'bg-slate-50 text-slate-700 border-slate-100'
                }`}>
                  {e.status}
                </span>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              {/* Event Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-850 m-0 leading-normal">{e.title}</h3>
                
                <div className="space-y-1.5 text-[10px] font-bold text-slate-400">
                  <div className="flex items-center gap-2">
                    <span>📅</span> <span>{e.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🕒</span> <span>{e.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍</span> <span>{e.room}</span>
                  </div>
                </div>
              </div>

              {/* Avatars */}
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1.5 overflow-hidden">
                  <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <span className="text-[9px] font-extrabold text-slate-500 bg-slate-100 rounded-full px-1.5 py-0.5">12+</span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[9px] font-bold text-slate-400">
                  <span>Progress</span>
                  <span>{e.progress}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1">
                  <div 
                    className="bg-blue-600 h-1 rounded-full" 
                    style={{ width: e.status === 'In Progress' ? '100%' : '35%' }}
                  />
                </div>
              </div>

              {/* Footer action icons */}
              <div className="flex justify-end gap-3 pt-2 border-t border-slate-50 text-slate-400">
                <button className="hover:text-blue-600">
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button className="hover:text-blue-600">
                  <Share2 className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 2. Tasks Overview Section */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-slate-900 m-0">Events Task Overview</h2>
          
          <button 
            onClick={() => toast.info("Add tasks modal popup")}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Tasks</span>
          </button>
        </div>

        {/* Tab filters row */}
        <div className="flex items-center gap-2">
          {(['All', 'Today', 'Upcoming', 'Completed'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTaskTab(tab)}
              className={`px-4 py-1.5 rounded text-xs font-bold border transition-colors ${
                activeTaskTab === tab 
                  ? 'bg-blue-50 text-[#0473b8] border-blue-200 font-extrabold shadow-xs'
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Card Row list Table */}
        <div className="space-y-3">
          {/* Table Headers */}
          <div className="grid grid-cols-5 px-4 py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
            <span>Task Name</span>
            <span>Due Date</span>
            <span>Assignee</span>
            <span>Status</span>
            <span className="text-right">Progress</span>
          </div>

          {/* Table Rows */}
          <div className="space-y-2">
            {tasks.map((t) => (
              <div 
                key={t.name}
                className="grid grid-cols-5 items-center bg-white border border-slate-200 rounded-lg py-3 px-4 shadow-xs text-xs font-bold text-slate-800 hover:border-slate-350 transition-all"
              >
                <span>{t.name}</span>
                <span className="text-slate-500 font-semibold">{t.due}</span>
                <span className="text-slate-500 font-semibold">{t.assignee}</span>
                
                <div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                    t.status === 'In Progress' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                    t.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                    'bg-slate-50 text-slate-700 border-slate-100'
                  }`}>
                    {t.status}
                  </span>
                </div>

                {/* Task progress bar */}
                <div className="flex justify-end items-center w-full">
                  <div className="w-24 bg-slate-100 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        t.status === 'In Progress' ? 'bg-blue-600 w-[60%]' :
                        t.status === 'Pending' ? 'bg-amber-500 w-[35%]' :
                        'bg-slate-300 w-0'
                      }`}
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
export default AllEventsPage;
