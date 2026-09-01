import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  Users, 
  Filter, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  Video,
  AlertCircle
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const CallenderPage: React.FC = () => {
  const toast = useToast();
  const [currentMonth, setCurrentMonth] = useState('September 2026');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showEventModal, setShowEventModal] = useState(false);

  // New Event Form State
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('2026-09-15');
  const [eventType, setEventType] = useState('Meeting');

  const eventsList = [
    { id: 1, title: 'Company Wide All-Hands Sync', date: 'Sept 04, 2026', time: '10:00 AM - 11:30 AM', type: 'Meeting', location: 'Main Auditorium & Zoom', attendees: 145 },
    { id: 2, title: 'Candidate Interview - Aisha Kumar', date: 'Sept 08, 2026', time: '02:00 PM - 03:00 PM', type: 'Interview', location: 'Google Meet', attendees: 4 },
    { id: 3, title: 'Q3 Performance Review Deadline', date: 'Sept 15, 2026', time: 'All Day', type: 'Deadline', location: 'HR Portal', attendees: 350 },
    { id: 4, title: 'Labor Day Public Holiday', date: 'Sept 21, 2026', time: 'Full Day Off', type: 'Holiday', location: 'Company Wide', attendees: 500 },
    { id: 5, title: 'Off-Boarding F&F Sign-off Session', date: 'Sept 28, 2026', time: '04:00 PM - 05:00 PM', type: 'HR Admin', location: 'HR Suite 3B', attendees: 3 },
  ];

  const filteredEvents = selectedFilter === 'all' 
    ? eventsList 
    : eventsList.filter(e => e.type.toLowerCase() === selectedFilter.toLowerCase());

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle) {
      toast.error('Please enter an event title');
      return;
    }
    toast.success(`Event "${eventTitle}" scheduled successfully!`);
    setShowEventModal(false);
    setEventTitle('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider mb-2">
            <CalendarIcon className="h-3.5 w-3.5 text-teal-300" />
            <span>Corporate Schedule</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Callender & Events Hub</h1>
          <p className="text-xs text-teal-100/80 mt-1">Manage company-wide schedules, meetings, candidate interviews, and holidays.</p>
        </div>

        <button
          onClick={() => setShowEventModal(true)}
          className="px-5 py-2.5 bg-white text-[#004848] font-extrabold text-xs rounded-xl shadow-sm hover:bg-slate-100 transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Schedule New Event</span>
        </button>
      </div>

      {/* Filter and Month Navigation Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => toast.info('Switched to previous month')}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-base font-extrabold text-slate-900 min-w-36 text-center">{currentMonth}</span>
          <button 
            onClick={() => toast.info('Switched to next month')}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400 mr-1" />
          {[
            { id: 'all', label: 'All Events' },
            { id: 'meeting', label: 'Meetings' },
            { id: 'interview', label: 'Interviews' },
            { id: 'holiday', label: 'Holidays' },
            { id: 'deadline', label: 'Deadlines' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-[#004848] text-white font-extrabold border-transparent shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Calendar View + Today's Agenda */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Month Grid */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-500 pb-2 border-b border-slate-150">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-xs">
            {/* Days placeholder for Sept 2026 */}
            {Array.from({ length: 30 }).map((_, i) => {
              const dayNum = i + 1;
              const hasEvent = dayNum === 4 || dayNum === 8 || dayNum === 15 || dayNum === 21 || dayNum === 28;
              return (
                <div
                  key={i}
                  onClick={() => toast.info(`Viewing details for Sept ${dayNum}, 2026`)}
                  className={`min-h-20 p-2 border rounded-xl flex flex-col justify-between cursor-pointer transition-all ${
                    hasEvent 
                      ? 'bg-teal-50/60 border-teal-200 hover:border-[#004848]' 
                      : 'bg-white border-slate-150 hover:bg-slate-50'
                  }`}
                >
                  <span className={`font-extrabold text-xs ${hasEvent ? 'text-[#004848]' : 'text-slate-700'}`}>{dayNum}</span>
                  {hasEvent && (
                    <div className="mt-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#004848]"></span>
                      <p className="text-[10px] font-bold text-teal-900 truncate">Event Scheduled</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Scheduled Events List */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-150 pb-3">
            <h3 className="text-sm font-bold text-slate-900 m-0">Upcoming Events ({filteredEvents.length})</h3>
            <span className="text-xs font-bold text-[#004848]">Sept 2026</span>
          </div>

          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {filteredEvents.map((evt) => (
              <div key={evt.id} className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 space-y-2 hover:border-slate-300 transition-all">
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-bold text-slate-900 m-0 leading-tight">{evt.title}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold shrink-0 ${
                    evt.type === 'Meeting' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                    evt.type === 'Interview' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                    evt.type === 'Holiday' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {evt.type}
                  </span>
                </div>

                <div className="space-y-1 text-[11px] font-semibold text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-slate-400" />
                    <span>{evt.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3 w-3 text-slate-400" />
                    <span>{evt.attendees} Attendees</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Creating New Event */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex justify-between items-center border-b border-slate-150 pb-3">
              <h3 className="text-sm font-bold text-slate-900 m-0">Schedule New Corporate Event</h3>
              <button 
                onClick={() => setShowEventModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs font-semibold text-slate-700">
              <div>
                <label className="block mb-1 font-bold text-slate-800">Event Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Q4 Townhall Meeting"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-[#004848]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-bold text-slate-800">Date</label>
                  <input 
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold text-slate-800">Category</label>
                  <select 
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none"
                  >
                    <option>Meeting</option>
                    <option>Interview</option>
                    <option>Holiday</option>
                    <option>Deadline</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#004848] text-white font-bold rounded-xl text-xs hover:bg-[#006666]"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallenderPage;
