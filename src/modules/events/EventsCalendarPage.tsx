import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

export const EventsCalendarPage: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<'month' | 'week' | 'day'>('month');

  // Filter checkbox states
  const [trainingToggled, setTrainingToggled] = useState(true);
  const [meetingsToggled, setMeetingsToggled] = useState(true);
  const [holidaysToggled, setHolidaysToggled] = useState(true);
  const [interviewsToggled, setInterviewsToggled] = useState(true);

  // Calendar dates mock array
  const calendarCells = [
    { day: 30, current: false }, { day: 1, current: true }, { day: 2, current: true }, { day: 3, current: true }, { day: 4, current: true }, { day: 5, current: true }, { day: 6, current: true },
    { day: 7, current: true }, { day: 8, current: true }, { day: 9, current: true }, { day: 10, current: true }, { day: 11, current: true }, { day: 12, current: true }, { day: 13, current: true },
    { day: 14, current: true }, { day: 15, current: true }, { day: 16, current: true, isToday: true }, { day: 17, current: true }, { day: 18, current: true }, { day: 19, current: true }, { day: 20, current: true },
    { day: 21, current: true }, { day: 22, current: true }, { day: 23, current: true }, { day: 24, current: true }, { day: 25, current: true, hasPurpleDot: true }, { day: 26, current: true }, { day: 27, current: true },
    { day: 28, current: true }, { day: 29, current: true }, { day: 30, current: true }, { day: 31, current: true }, { day: 1, current: false }, { day: 2, current: false, hasRedDot: true }, { day: 3, current: false }
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Calendar top controls */}
      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
        
        {/* Left Today & Arrows navigation */}
        <div className="flex items-center gap-4">
          <button className="px-4 py-1.5 bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-lg hover:bg-slate-50">
            Today
          </button>
          
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-bold text-slate-800">July 2025</span>
            <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Month/Week/Day tabs and Add button */}
        <div className="flex items-center gap-4 select-none">
          
          <div className="flex bg-[#e2e4e7] p-1 rounded-lg text-xs font-bold">
            {(['Month', 'Week', 'Day'] as const).map(segment => (
              <button
                key={segment}
                type="button"
                onClick={() => setActiveSegment(segment.toLowerCase() as any)}
                className={`px-4 py-1 rounded transition-all ${
                  activeSegment === segment.toLowerCase()
                    ? 'bg-white text-slate-900 font-extrabold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {segment}
              </button>
            ))}
          </div>

          <button 
            onClick={() => alert("Redirecting to Add Event tab")}
            className="px-5 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
          >
            Add Event
          </button>
        </div>

      </div>

      {/* Grid columns: Calendar left, Sidebar details right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Days grid (8/12 grid span) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Days labels */}
          <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50 py-3 text-center text-xs font-bold text-slate-400">
            <span className="text-rose-500">Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span className="text-blue-500">Sa</span>
          </div>

          {/* Dates Grid (7 columns × 5 rows) */}
          <div className="grid grid-cols-7 text-xs font-bold text-slate-700 min-h-[450px]">
            {calendarCells.map((cell, idx) => (
              <div 
                key={idx}
                className={`border-b border-r border-slate-100 p-4 flex flex-col justify-between h-20 relative hover:bg-slate-50/50 transition-colors ${
                  !cell.current ? 'text-slate-300' : 'text-slate-800'
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  {cell.isToday ? (
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold">
                      {cell.day}
                    </span>
                  ) : (
                    <span>{cell.day}</span>
                  )}
                </div>

                {/* Event Marker dots */}
                <div className="flex justify-center gap-1 mt-auto">
                  {cell.hasPurpleDot && (
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></span>
                  )}
                  {cell.hasRedDot && (
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Event Types & This Week panels (4/12 span) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Panel 1: Event Types */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <span className="text-xs font-extrabold text-slate-800">Event Types</span>
              <Filter className="h-3.5 w-3.5 text-slate-400" />
            </div>

            {/* Event Checkboxes */}
            <div className="space-y-3.5 text-xs font-bold text-slate-700 pl-1">
              {/* Training Sessions */}
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={trainingToggled}
                  onChange={() => setTrainingToggled(!trainingToggled)}
                  className="rounded border-slate-350 text-blue-500 focus:ring-blue-400 h-3.5 w-3.5"
                />
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-sm"></span>
                  <span>Training Sessions</span>
                </span>
              </label>

              {/* Team Meetings */}
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={meetingsToggled}
                  onChange={() => setMeetingsToggled(!meetingsToggled)}
                  className="rounded border-slate-350 text-purple-500 focus:ring-purple-400 h-3.5 w-3.5"
                />
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-purple-500 rounded-sm"></span>
                  <span>Team Meetings</span>
                </span>
              </label>

              {/* Holidays */}
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={holidaysToggled}
                  onChange={() => setHolidaysToggled(!holidaysToggled)}
                  className="rounded border-slate-350 text-rose-500 focus:ring-rose-400 h-3.5 w-3.5"
                />
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-sm"></span>
                  <span>Holidays</span>
                </span>
              </label>

              {/* Interviews */}
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={interviewsToggled}
                  onChange={() => setInterviewsToggled(!interviewsToggled)}
                  className="rounded border-slate-350 text-emerald-500 focus:ring-emerald-400 h-3.5 w-3.5"
                />
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm"></span>
                  <span>Interviews</span>
                </span>
              </label>
            </div>
          </div>

          {/* Panel 2: This Week Schedule */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            <span className="block text-xs font-extrabold text-slate-800 border-b border-slate-50 pb-2">This Week</span>
            
            <div className="space-y-3">
              {/* Meeting Item 1 */}
              <div className="bg-[#e9eff4]/65 border border-slate-200 rounded-xl p-4 shadow-xs space-y-2 hover:shadow-sm transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">Team Meeting</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100">
                    Confirmed
                  </span>
                </div>
                <div className="text-[10px] font-bold text-slate-400 space-y-1">
                  <div>🕒 10:00 AM</div>
                  <div>📅 July 25</div>
                </div>
              </div>

              {/* Meeting Item 2 */}
              <div className="bg-[#e9eff4]/65 border border-slate-200 rounded-xl p-4 shadow-xs space-y-2 hover:shadow-sm transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">Team Meeting</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-50 text-amber-700 rounded border border-amber-100">
                    Pending
                  </span>
                </div>
                <div className="text-[10px] font-bold text-slate-400 space-y-1">
                  <div>🕒 10:00 AM</div>
                  <div>📅 July 27</div>
                </div>
              </div>

              {/* Meeting Item 3 */}
              <div className="bg-[#e9eff4]/65 border border-slate-200 rounded-xl p-4 shadow-xs space-y-2 hover:shadow-sm transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">Team Meeting</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-50 text-amber-700 rounded border border-amber-100">
                    Pending
                  </span>
                </div>
                <div className="text-[10px] font-bold text-slate-400 space-y-1">
                  <div>🕒 10:00 AM</div>
                  <div>📅 July 27</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
export default EventsCalendarPage;
