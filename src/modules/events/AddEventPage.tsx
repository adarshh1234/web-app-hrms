import React, { useState } from 'react';
import { Calendar, Clock, ChevronDown, Search, X } from 'lucide-react';

export const AddEventPage: React.FC = () => {
  // Toggle states
  const [locationType, setLocationType] = useState<'in-person' | 'online'>('in-person');
  
  // Quick settings toggles
  const [sendReminder, setSendReminder] = useState(true);
  const [syncCalendar, setSyncCalendar] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Form states
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState('Training Session');
  const [desc, setDesc] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timezone, setTimezone] = useState('Training Session');
  const [venue, setVenue] = useState('');
  const [dept, setDept] = useState('All Department');
  
  // Task state
  const [taskTitle, setTaskTitle] = useState('');
  const [assignee, setAssignee] = useState('');
  const [checklistItems, setChecklistItems] = useState(['']);

  const participants = ['Sarah Jo', 'Sarah Jo', 'Sarah Jo', 'Sarah Jo', 'Sarah Jo'];

  const handleAddChecklist = () => {
    setChecklistItems([...checklistItems, '']);
  };

  const handleCreate = () => {
    alert("Event created successfully!");
  };

  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 m-0">Add Events</h1>
      </div>

      {/* Columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Event details form (8/12 grid span) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card 1: Event Details */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Events Details</span>
            
            <div className="space-y-3 text-xs font-bold text-slate-705">
              <div>
                <label className="block mb-1.5">Events Title</label>
                <input 
                  type="text" 
                  placeholder="Enter Event Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 outline-none text-xs font-semibold bg-white"
                />
              </div>

              <div>
                <label className="block mb-1.5">Events Type</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="Training Session">Training Session</option>
                    <option value="Team Meeting">Team Meeting</option>
                    <option value="Holiday">Holiday</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Description</label>
                <textarea 
                  rows={4}
                  placeholder="Enter Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-3 text-xs font-semibold text-slate-800 outline-none resize-none focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Date & Time */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Date & Time</span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-705">
              <div>
                <label className="block mb-1.5">Start Date</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Start Time</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="text"
                    placeholder="HH:MM"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
                  />
                  <div className="absolute right-3 text-slate-400">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5">End Date</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5">End Time</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <input 
                    type="text"
                    placeholder="HH:MM"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none text-xs font-semibold"
                  />
                  <div className="absolute right-3 text-slate-400">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Timezone */}
            <div className="text-xs font-bold text-slate-705">
              <label className="block mb-1.5">Time Zone</label>
              <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                >
                  <option value="Training Session">Training Session</option>
                  <option value="GMT">Greenwich Mean Time (GMT)</option>
                  <option value="EST">Eastern Standard Time (EST)</option>
                </select>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                  <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Location */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Location</span>
            
            {/* Toggle tabs */}
            <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-white max-w-xs text-xs font-bold">
              <button 
                onClick={() => setLocationType('in-person')}
                className={`flex-1 py-2 text-center transition-all ${
                  locationType === 'in-person' 
                    ? 'bg-[#0473b8] text-white' 
                    : 'bg-white text-slate-650 hover:bg-slate-50'
                }`}
              >
                In-Person
              </button>
              <button 
                onClick={() => setLocationType('online')}
                className={`flex-1 py-2 text-center transition-all ${
                  locationType === 'online' 
                    ? 'bg-[#0473b8] text-white' 
                    : 'bg-white text-slate-650 hover:bg-slate-50'
                }`}
              >
                Online
              </button>
            </div>

            {/* Venue name input */}
            <div className="text-xs font-bold text-slate-705">
              <label className="block mb-1.5">Venue/Meeting Link</label>
              <input 
                type="text" 
                placeholder="Enter Venue Name"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 outline-none text-xs font-semibold bg-white"
              />
            </div>
          </div>

          {/* Card 4: Participants */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Participants</span>
            
            <div className="space-y-3 text-xs font-bold text-slate-705">
              <div>
                <label className="block mb-1.5">Department</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="All Department">All Department</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Search Employee</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search"
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                  />
                </div>
              </div>

              {/* Selected pills list */}
              <div className="space-y-1.5">
                <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider">Selected Employees</span>
                <div className="flex flex-wrap gap-2">
                  {participants.map((name, idx) => (
                    <span 
                      key={idx}
                      className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200"
                    >
                      <span>{name}</span>
                      <button className="text-slate-400 hover:text-slate-600">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Add Task */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Add Task</span>
            
            <div className="space-y-3 text-xs font-bold text-slate-705">
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Task Details</span>
              
              <div>
                <label className="block mb-1.5">Task Title</label>
                <input 
                  type="text" 
                  placeholder="Enter Task Title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 outline-none text-xs font-semibold bg-white"
                />
              </div>

              <div>
                <label className="block mb-1.5">Assignee</label>
                <div className="relative flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <select
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-slate-900 outline-none appearance-none pr-9 text-xs font-semibold"
                  >
                    <option value="">Select assignee</option>
                    <option value="Sarah Jo">Sarah Jo</option>
                  </select>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-slate-100 border-l border-slate-200 flex items-center justify-center pointer-events-none">
                    <ChevronDown className="h-3.5 w-3.5 text-slate-800" />
                  </div>
                </div>
              </div>

              {/* Checklist items list */}
              <div className="space-y-1.5">
                <label className="block text-[10px] text-slate-405 uppercase tracking-wider">Check List</label>
                <div className="space-y-2">
                  {checklistItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-slate-350" />
                      <input 
                        type="text" 
                        placeholder="Add Check List Items"
                        value={item}
                        onChange={(e) => {
                          const newItems = [...checklistItems];
                          newItems[idx] = e.target.value;
                          setChecklistItems(newItems);
                        }}
                        className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-slate-900 outline-none text-xs font-semibold bg-white"
                      />
                    </div>
                  ))}
                </div>
                <button 
                  onClick={handleAddChecklist}
                  className="text-xs text-blue-600 font-bold hover:underline pt-1 cursor-pointer block"
                >
                  + Add Items
                </button>
              </div>

            </div>
          </div>

          {/* Form action buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button className="px-6 py-2 border border-[#0473b8] hover:bg-blue-50/50 text-[#0473b8] text-xs font-bold rounded-lg transition-all bg-white">
              Cancel
            </button>
            <button className="px-6 py-2 border border-[#0473b8] hover:bg-blue-50/50 text-[#0473b8] text-xs font-bold rounded-lg transition-all bg-white">
              Save Draft
            </button>
            <button 
              onClick={handleCreate}
              className="px-6 py-2 bg-[#0473b8] hover:bg-[#03629e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Create Event
            </button>
          </div>

        </div>

        {/* Right column: Event preview card & Quick settings (4/12 span) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card 1: Event Preview */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-3 relative">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-100">
                In Progress
              </span>
              <button className="text-slate-400">×</button>
            </div>
            
            <h3 className="text-xs font-bold text-slate-850 m-0">Annual Leadership Training 2024</h3>
            
            <div className="space-y-1.5 text-[9px] font-bold text-slate-400">
              <div>📅 July 20, 2025</div>
              <div>🕒 9:00 AM - 4:00 PM</div>
              <div>📍 Main Conference Room</div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1 pt-1.5">
              <div className="flex justify-between text-[9px] font-bold text-slate-400">
                <span>Progress</span>
                <span>20/20 Task</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1">
                <div className="bg-blue-600 h-1 rounded-full w-full" />
              </div>
            </div>
          </div>

          {/* Card 2: Quick Settings */}
          <div className="bg-white border border-slate-205 rounded-xl p-5 shadow-sm space-y-4">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Settings</span>
            
            <div className="space-y-3 text-xs font-bold text-slate-700">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span>Send Reminder</span>
                <button 
                  onClick={() => setSendReminder(!sendReminder)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
                    sendReminder ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform duration-300 ease-in-out ${
                    sendReminder ? 'translate-x-4' : ''
                  }`} />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span>Sync to Calendar</span>
                <button 
                  onClick={() => setSyncCalendar(!syncCalendar)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
                    syncCalendar ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform duration-300 ease-in-out ${
                    syncCalendar ? 'translate-x-4' : ''
                  }`} />
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between py-1.5">
                <span>Email Notifications</span>
                <button 
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${
                    emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform duration-300 ease-in-out ${
                    emailNotifications ? 'translate-x-4' : ''
                  }`} />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
export default AddEventPage;
