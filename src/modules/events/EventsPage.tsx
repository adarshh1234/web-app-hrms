import React, { useState, useEffect } from 'react';
import { CompanyEvent } from '../../types';
import eventService from '../../services/eventService';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { 
  Plus, 
  Search, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CheckSquare, 
  ListTodo,
  Settings,
  Sparkles
} from 'lucide-react';
import Modal from '../../components/common/Modal';
import { useToast } from '../../hooks/useToast';

export const EventsPage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'add' | 'calendar' | 'support'>('all');

  // Database States
  const [events, setEvents] = useState<CompanyEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add Event Form States
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Training Session' | 'Team Meeting' | 'Holiday' | 'Interview' | 'Support Event'>('Training Session');
  const [desc, setDesc] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('05:00 PM');
  const [location, setLocation] = useState('In-Person');
  const [venue, setVenue] = useState('');
  const [participants, setParticipants] = useState('Sarah Johnson, Amal Benny');

  const loadEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await eventService.getEvents();
      setEvents(data);
    } catch (err) {
      setError('Failed to load events.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await eventService.createEvent({
        title,
        type,
        description: desc,
        startDate: startDate || new Date().toISOString().split('T')[0],
        endDate: endDate || new Date().toISOString().split('T')[0],
        startTime,
        endTime,
        location,
        venue: venue || 'Conference Room A',
        status: 'Upcoming',
        participants: participants.split(',').map(p => p.trim()),
        tasks: [
          { id: 'T1', name: 'Coordinate schedule logistics', assignee: 'Sarah Johnson', dueDate: startDate, status: 'Not Started' }
        ]
      });

      await loadEvents();
      toast.success("Company Event created successfully!");
      setTitle('');
      setDesc('');
      setStartDate('');
      setEndDate('');
      setVenue('');
      setActiveTab('all');
    } catch (err) {
      toast.error("Failed to create event.");
    }
  };

  const handleToggleTaskStatus = async (evtId: string, taskId: string) => {
    const evt = events.find(e => e.id === evtId);
    if (!evt) return;
    const updatedTasks = evt.tasks.map(t => {
      if (t.id === taskId) {
        const nextStatus = t.status === 'Completed' ? 'Not Started' as const : 'Completed' as const;
        return { ...t, status: nextStatus };
      }
      return t;
    });
    try {
      await eventService.updateEvent(evtId, { tasks: updatedTasks });
      await loadEvents();
    } catch (err) {
      toast.error("Failed to update task status.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 m-0">Events & Orientation</h1>
          <p className="text-sm text-slate-500 mt-1">Organize training sessions, holidays, corporate orientation bootcamps and team sync schedules.</p>
        </div>

        {/* Tab Links */}
        <div className="flex flex-wrap border-b border-slate-200">
          {(['all', 'add', 'calendar', 'support'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 uppercase tracking-wider transition-all -mb-[2px] ${
                activeTab === tab 
                  ? 'border-[var(--primary-color)] text-[var(--primary-color)] font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {tab === 'all' ? 'All Events' : tab === 'add' ? 'Add Event' : tab === 'calendar' ? 'Events Calendar' : 'Support Events'}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'all' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* List of Events Cards (Left) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Active Orientation & Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map(evt => {
                const totalTasks = evt.tasks.length;
                const completedTasks = evt.tasks.filter(t => t.status === 'Completed').length;
                return (
                  <div key={evt.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 hover:border-slate-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        evt.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        evt.status === 'Planning' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-purple-50 text-purple-700 border-purple-100'
                      }`}>
                        {evt.status}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">{evt.type}</span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{evt.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{evt.description}</p>
                    </div>

                    <div className="space-y-2 text-xs text-slate-655 border-t border-slate-50 pt-2">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>{evt.startDate} ({evt.startTime} - {evt.endTime})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span>{evt.location} · {evt.venue}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-slate-400" />
                        <span>{evt.participants.length} Participants</span>
                      </div>
                    </div>

                    {totalTasks > 0 && (
                      <div className="space-y-1 pt-2">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500">
                          <span>Tasks Progress</span>
                          <span>{completedTasks}/{totalTasks} Task</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[var(--primary-color)] h-full rounded-full" style={{ width: `${(completedTasks/totalTasks)*100}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tasks checklist panel (Right) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <ListTodo className="h-4.5 w-4.5 text-[var(--primary-color)]" />
              <span>Events Task Overview</span>
            </h3>
            
            <div className="space-y-4">
              {events.flatMap(e => e.tasks.map(t => ({ ...t, eventTitle: e.title, eventId: e.id }))).map((task) => (
                <div key={task.id} className="flex gap-2 text-xs border border-slate-100 rounded-lg p-2.5 hover:bg-slate-50">
                  <input 
                    type="checkbox"
                    checked={task.status === 'Completed'}
                    onChange={() => handleToggleTaskStatus(task.eventId, task.id)}
                    className="rounded border-slate-350 text-[var(--primary-color)] mt-0.5 shrink-0"
                  />
                  <div>
                    <h4 className={`font-semibold text-slate-800 ${task.status === 'Completed' ? 'line-through text-slate-400' : ''}`}>{task.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Event: {task.eventTitle} · Due: {task.dueDate}</p>
                    <p className="text-[9px] font-medium text-slate-500 mt-1">Assignee: {task.assignee}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'add' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm max-w-2xl space-y-4 animate-fade-in">
          <h3 className="text-base font-bold text-slate-900">Add Events</h3>
          
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">Event Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter Event Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Event Type *</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as CompanyEvent['type'])}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                >
                  <option>Training Session</option>
                  <option>Team Meeting</option>
                  <option>Holiday</option>
                  <option>Interview</option>
                  <option>Support Event</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Location Type</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                >
                  <option>In-Person</option>
                  <option>Online</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Start Date</label>
                <input 
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">End Date</label>
                <input 
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Start Time</label>
                <input 
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">End Time</label>
                <input 
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">Venue / Meeting Link *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter venue room name or video call URL link"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">Participants (Comma separated)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Sarah Johnson, Amal Benny, Lisa Anderson"
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">Event Description</label>
                <textarea 
                  rows={3}
                  placeholder="Enter event details/orientation agenda"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 text-sm focus:border-[var(--primary-color)] outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button type="button" onClick={() => setActiveTab('all')} className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold rounded-lg shadow-sm">Create Event</button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'calendar' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {/* Calendar Grid */}
          <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-900">July 2025</h3>
              <div className="flex gap-1.5 text-xs font-bold text-slate-500">
                <button className="px-2.5 py-1 border border-slate-200 rounded hover:bg-slate-50 bg-white">Month</button>
                <button className="px-2.5 py-1 border border-slate-200 rounded hover:bg-slate-50 bg-white">Week</button>
                <button className="px-2.5 py-1 border border-slate-200 rounded hover:bg-slate-50 bg-white">Day</button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-px bg-slate-200 rounded overflow-hidden">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <div key={d} className="bg-slate-50 p-2 text-center text-xs font-bold text-slate-500 uppercase">{d}</div>
              ))}
              {/* Dummy July 2025 calendar squares */}
              {Array.from({ length: 31 }).map((_, i) => {
                const dayNum = i + 1;
                const hasEvent = dayNum === 20 || dayNum === 25;
                return (
                  <div key={`day-${dayNum}`} className="bg-white p-3 min-h-[60px] flex flex-col justify-between items-start text-xs border-r border-b border-slate-100 relative">
                    <span className="font-semibold text-slate-400">{dayNum}</span>
                    {hasEvent && (
                      <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-[var(--primary-color)]"></span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming list */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">This Week</h3>
            <div className="space-y-3">
              <div className="p-3 border border-slate-100 rounded-lg text-xs space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-800">Team Meeting</span>
                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 font-bold text-[9px] uppercase">Confirmed</span>
                </div>
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>10:00 AM</span>
                  <span>July 25</span>
                </div>
              </div>
              <div className="p-3 border border-slate-100 rounded-lg text-xs space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-800">Next.js Interview</span>
                  <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100 font-bold text-[9px] uppercase">Pending</span>
                </div>
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>02:30 PM</span>
                  <span>July 27</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'support' && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400 text-sm shadow-sm animate-fade-in">
          No support events configured yet. Check calendar listings for updates.
        </div>
      )}
    </div>
  );
};
export default EventsPage;
