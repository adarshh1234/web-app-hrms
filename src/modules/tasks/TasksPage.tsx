import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  CheckSquare, 
  Plus, 
  CheckCircle2, 
  Search,
  ChevronDown,
  Calendar,
  X,
  Settings
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface KanbanTask {
  id: number;
  title: string;
  type?: string;
  dueDate?: string;
  column: 'new-task' | 'scheduled' | 'in-progress' | 'completed';
}

interface TodoItem {
  id: number;
  title: string;
  category: string;
  completed: boolean;
  dueDate: string;
}

export const TasksPage: React.FC = () => {
  const toast = useToast();
  const location = useLocation();
  const path = location.pathname;

  const isKanban = path.includes('/tasks/kanban');
  const isTodo = path.includes('/tasks/todo');

  // Kanban Tasks State matching the requested design
  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>([
    { id: 1, title: 'Prepare Calculus quiz questions', column: 'new-task', type: 'Operational' },
    { id: 2, title: 'Draft syllabus for Quantum Physics', column: 'new-task', type: 'Technical' },
    { id: 3, title: 'Verify Aisha Kumar Background PCC Documents', column: 'new-task', type: 'Hiring' },
    { id: 4, title: 'Review term exams schedule', column: 'scheduled', type: 'Strategic' },
    { id: 5, title: 'Schedule Q3 All-Hands Townhall Meeting', column: 'scheduled', type: 'Operational' },
    { id: 6, title: 'Onboard new math co-teacher', column: 'in-progress', type: 'Hiring' },
    { id: 7, title: 'Draft Executive Severance Letter for Restructure', column: 'in-progress', type: 'Financial' },
    { id: 8, title: 'Submit Q3 budget analysis', column: 'completed', type: 'Financial' },
    { id: 9, title: 'Complete Employee App Travel Documents Feature Test', column: 'completed', type: 'Technical' },
  ]);

  // Inline Creation Card State
  const [isInlineTaskOpen, setIsInlineTaskOpen] = useState(false);
  const [inlineTaskName, setInlineTaskName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('Operational');

  // Calendar Date Picker Popover State
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDateDay, setSelectedDateDay] = useState(18);

  // Todo Items State
  const [todoItems, setTodoItems] = useState<TodoItem[]>([
    { id: 101, title: 'Approve September Monthly Payroll OneTap Disbursement', category: 'Payroll', completed: true, dueDate: 'Today' },
    { id: 102, title: 'Conduct Exit Interview for Senior Frontend Engineer', category: 'Off-Boarding', completed: false, dueDate: 'Tomorrow' },
    { id: 103, title: 'Issue Repatriation Flight Ticket Voucher', category: 'Off-Boarding', completed: false, dueDate: 'Sept 06' },
    { id: 104, title: 'Publish Q3 Internal HR Newsletter & Events Schedule', category: 'Events', completed: true, dueDate: 'Aug 31' },
    { id: 105, title: 'Audit YubiKey Hardware Security Token Distribution', category: 'Compliance', completed: true, dueDate: 'Aug 28' },
  ]);

  const [newTodoInput, setNewTodoInput] = useState('');

  const toggleTodo = (id: number) => {
    setTodoItems(prev => prev.map(t => {
      if (t.id === id) {
        const nextState = !t.completed;
        toast.info(nextState ? `Task marked completed!` : `Task marked pending.`);
        return { ...t, completed: nextState };
      }
      return t;
    }));
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoInput.trim()) return;
    const newItem: TodoItem = {
      id: Date.now(),
      title: newTodoInput.trim(),
      category: 'General',
      completed: false,
      dueDate: 'Today'
    };
    setTodoItems([newItem, ...todoItems]);
    setNewTodoInput('');
    toast.success('New todo item added!');
  };

  const handleSaveInlineTask = () => {
    if (!inlineTaskName.trim()) {
      toast.error('Please enter a task name');
      return;
    }
    const newTask: KanbanTask = {
      id: Date.now(),
      title: inlineTaskName.trim(),
      type: selectedType,
      dueDate: `Dec ${selectedDateDay}`,
      column: 'new-task'
    };
    setKanbanTasks([newTask, ...kanbanTasks]);
    toast.success(`Task "${inlineTaskName.trim()}" added to New task!`);
    setInlineTaskName('');
    setIsInlineTaskOpen(false);
    setIsDropdownOpen(false);
    setIsCalendarOpen(false);
  };

  const moveTaskColumn = (id: number, nextColumn: KanbanTask['column']) => {
    setKanbanTasks(prev => prev.map(kt => kt.id === id ? { ...kt, column: nextColumn } : kt));
    toast.success('Task moved successfully!');
  };

  const completedTodosCount = todoItems.filter(t => t.completed).length;
  const progressPercent = Math.round((completedTodosCount / todoItems.length) * 100) || 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">

      {/* VIEW 1: KANBAN BOARD */}
      {isKanban && (
        <div className="space-y-4">
          {/* Top Bar with Right-Aligned Dark Blue Circular + Button */}
          <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-4 shadow-xs flex justify-between items-center">
            <h1 className="text-lg font-bold text-slate-800 m-0">Task Management</h1>
            <button
              onClick={() => {
                setIsInlineTaskOpen(prev => !prev);
                setIsDropdownOpen(false);
                setIsCalendarOpen(false);
              }}
              title="Add New Task"
              className="w-10 h-10 rounded-full bg-[#1e3a8a] text-white hover:bg-[#1d4ed8] shadow flex items-center justify-center cursor-pointer transition-all active:scale-95"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          {/* Unified 4-Column Board matching the image design */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 min-h-[600px]">
              {[
                { id: 'new-task', label: 'New task' },
                { id: 'scheduled', label: 'Scheduled' },
                { id: 'in-progress', label: 'In Progress' },
                { id: 'completed', label: 'Completed' },
              ].map((col) => {
                const colTasks = kanbanTasks.filter(t => t.column === col.id);
                return (
                  <div key={col.id} className="flex flex-col bg-white">
                    {/* Centered Column Header */}
                    <div className="py-4 text-center font-bold text-slate-900 text-sm border-b border-slate-200 bg-white">
                      {col.label}
                    </div>

                    {/* Column Items Container */}
                    <div className="p-4 space-y-3 flex-1 bg-white">

                      {/* INLINE TASK CREATION CARD inside "New task" column */}
                      {col.id === 'new-task' && isInlineTaskOpen && (
                        <div className="bg-[#d9e6f6] border border-blue-200 rounded-xl p-4 shadow-sm space-y-4 relative animate-fade-in">
                          {/* Close X icon in top right grey circle badge */}
                          <button 
                            type="button"
                            onClick={() => {
                              setIsInlineTaskOpen(false);
                              setIsDropdownOpen(false);
                              setIsCalendarOpen(false);
                            }}
                            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-slate-300/80 hover:bg-slate-300 text-slate-700 font-bold flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <X className="h-3.5 w-3.5 text-slate-700" />
                          </button>

                          {/* Task Name Input */}
                          <input 
                            type="text"
                            placeholder="Task name"
                            value={inlineTaskName}
                            onChange={(e) => setInlineTaskName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveInlineTask();
                              }
                            }}
                            autoFocus
                            className="w-full bg-transparent border-none text-xs font-semibold text-slate-800 placeholder:text-slate-500 outline-none pr-8"
                          />

                          {/* Bottom Action Bar */}
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-2">
                              
                              {/* 1. Chevron Dropdown Trigger Button */}
                              <div className="relative">
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    setIsDropdownOpen(prev => !prev);
                                    setIsCalendarOpen(false);
                                  }}
                                  className="w-7 h-7 rounded-full border border-blue-400/40 bg-white/50 hover:bg-white flex items-center justify-center text-slate-700 transition-all cursor-pointer"
                                >
                                  <ChevronDown className="h-4 w-4" />
                                </button>

                                {/* Dropdown Popover Card */}
                                {isDropdownOpen && (
                                  <div className="absolute top-9 left-0 z-30 w-44 bg-white border border-slate-200 rounded-2xl p-1.5 shadow-xl space-y-0.5 text-xs select-none animate-fade-in">
                                    {[
                                      { label: 'Operational', color: 'bg-blue-100' },
                                      { label: 'Technical', color: 'bg-amber-300' },
                                      { label: 'Strategic', color: 'bg-emerald-200' },
                                      { label: 'Hiring', color: 'bg-red-200' },
                                      { label: 'Financial', color: 'bg-slate-300' },
                                    ].map((item) => (
                                      <button
                                        key={item.label}
                                        type="button"
                                        onClick={() => {
                                          setSelectedType(item.label);
                                          setIsDropdownOpen(false);
                                          toast.info(`Selected type: ${item.label}`);
                                        }}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer transition-all ${
                                          selectedType === item.label ? 'bg-slate-50 font-bold text-slate-900' : ''
                                        }`}
                                      >
                                        <span className={`w-3.5 h-3.5 rounded-sm ${item.color} shrink-0`}></span>
                                        <span>{item.label}</span>
                                      </button>
                                    ))}

                                    <div className="border-t border-slate-100 my-1"></div>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        setIsDropdownOpen(false);
                                        toast.success("Edit Type modal opened");
                                      }}
                                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#1c397c] hover:bg-slate-50 cursor-pointer transition-all"
                                    >
                                      <Settings className="h-4 w-4 text-[#1c397c]" />
                                      <span>Edit Type</span>
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* 2. Calendar Date Picker Popover Trigger Button */}
                              <div className="relative">
                                <button 
                                  type="button"
                                  onClick={() => {
                                    setIsCalendarOpen(prev => !prev);
                                    setIsDropdownOpen(false);
                                  }}
                                  className="w-7 h-7 rounded-full border border-blue-400/40 bg-white/50 hover:bg-white flex items-center justify-center text-slate-700 transition-all cursor-pointer"
                                >
                                  <Calendar className="h-3.5 w-3.5" />
                                </button>

                                {/* Date Picker Popover Card matching user image */}
                                {isCalendarOpen && (
                                  <div className="absolute top-9 left-0 z-30 w-64 bg-[#d9e6f6] border border-blue-200 rounded-2xl p-4 shadow-xl space-y-4 text-xs select-none animate-fade-in">
                                    {/* Top Month Black Pill Badge */}
                                    <div className="flex justify-end items-center">
                                      <span className="bg-black text-white px-3 py-1 text-xs font-bold rounded-lg tracking-wide">
                                        December
                                      </span>
                                    </div>

                                    {/* Weekday Labels */}
                                    <div className="grid grid-cols-7 gap-1 text-center font-semibold text-xs">
                                      <span className="text-slate-600">Mo</span>
                                      <span className="text-slate-600">Tu</span>
                                      <span className="text-slate-600">We</span>
                                      <span className="text-slate-600">Th</span>
                                      <span className="text-slate-600">Fr</span>
                                      <span className="text-blue-500">Sa</span>
                                      <span className="text-blue-500">Su</span>
                                    </div>

                                    {/* Dates Grid (1 to 31) */}
                                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                                      {Array.from({ length: 31 }).map((_, i) => {
                                        const dayNum = i + 1;
                                        const isSelected = dayNum === selectedDateDay;
                                        const isWeekend = (i % 7 === 5) || (i % 7 === 6);
                                        return (
                                          <button
                                            key={dayNum}
                                            type="button"
                                            onClick={() => {
                                              setSelectedDateDay(dayNum);
                                              toast.info(`Due date set to Dec ${dayNum}`);
                                            }}
                                            className={`h-7 flex items-center justify-center rounded-md font-semibold transition-all cursor-pointer ${
                                              isSelected 
                                                ? 'bg-black text-white font-extrabold shadow-sm' 
                                                : isWeekend 
                                                ? 'text-blue-500 hover:bg-white/50' 
                                                : 'text-slate-700 hover:bg-white/50'
                                            }`}
                                          >
                                            {dayNum}
                                          </button>
                                        );
                                      })}
                                    </div>

                                    {/* Bottom Action Buttons */}
                                    <div className="flex items-center justify-between pt-1">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setIsCalendarOpen(false);
                                          toast.info('Added time');
                                        }}
                                        className="bg-white text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs hover:bg-slate-50 cursor-pointer"
                                      >
                                        Add Time
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setIsCalendarOpen(false);
                                          toast.info('No Due Date selected');
                                        }}
                                        className="bg-white text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs hover:bg-slate-50 cursor-pointer"
                                      >
                                        No Due Date
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="w-7 h-7 rounded-full bg-[#3b82f6] text-white text-xs font-extrabold flex items-center justify-center shadow-xs">
                                K
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={handleSaveInlineTask}
                              className="bg-[#1c397c] text-white font-bold text-xs px-5 py-1.5 rounded-full hover:bg-[#1d4ed8] cursor-pointer shadow-xs transition-all"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Column Task Cards */}
                      {colTasks.map((task) => (
                        <div
                          key={task.id}
                          className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-4 text-xs font-semibold text-slate-700 shadow-2xs hover:shadow-xs transition-all cursor-pointer space-y-2"
                        >
                          <p className="m-0 leading-relaxed text-slate-800">{task.title}</p>

                          {/* Quick stage transition helper */}
                          <div className="pt-2 flex justify-end gap-1 opacity-0 hover:opacity-100 transition-opacity">
                            {col.id !== 'completed' && (
                              <button
                                onClick={() => {
                                  const next = col.id === 'new-task' ? 'scheduled' : col.id === 'scheduled' ? 'in-progress' : 'completed';
                                  moveTaskColumn(task.id, next);
                                }}
                                className="text-[10px] text-blue-600 font-bold hover:underline"
                              >
                                Move Next →
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: TODO LIST */}
      {isTodo && (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#002222] via-[#004848] to-[#006666] rounded-2xl p-6 text-white shadow-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 border border-teal-300/30 text-xs font-bold uppercase tracking-wider mb-2">
              <CheckSquare className="h-3.5 w-3.5 text-teal-300" />
              <span>Personal & HR Checklist</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white m-0">Todo List & Actions</h1>
            <p className="text-xs text-teal-100/80 mt-1">Daily HR checklists, priority tasks, and automated completion tracking.</p>
          </div>

          {/* Progress Bar Header Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900 m-0">Daily Todo Completion Progress</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">{completedTodosCount} of {todoItems.length} tasks finished</p>
              </div>
              <span className="text-xl font-extrabold text-[#004848]">{progressPercent}%</span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#004848] to-[#007878] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Quick Add Form */}
          <form onSubmit={handleAddTodo} className="flex gap-2">
            <input 
              type="text" 
              placeholder="+ Add a new todo item and press Enter..."
              value={newTodoInput}
              onChange={(e) => setNewTodoInput(e.target.value)}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004848] shadow-sm"
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-[#004848] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#006666] cursor-pointer"
            >
              Add Task
            </button>
          </form>

          {/* Checklist Items */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            {todoItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleTodo(item.id)}
                className={`p-4 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                  item.completed ? 'bg-slate-50 border-slate-200 opacity-75' : 'bg-white border-slate-200 hover:border-[#004848]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    item.completed ? 'bg-[#004848] border-[#004848] text-white' : 'border-slate-300'
                  }`}>
                    {item.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </div>
                  <span className={`text-xs font-bold ${item.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                    {item.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-50 text-teal-800 border border-teal-200">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">{item.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
