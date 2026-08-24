import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Square, 
  CalendarDays, 
  ClipboardList, 
  UserCheck, 
  Clock, 
  AlertCircle,
  FileText,
  UserPlus,
  ArrowRight,
  TrendingUp,
  UserMinus,
  Users,
  Briefcase,
  TrendingDown,
  Search,
  Camera,
  List,
  CalendarClock,
  ArrowUp,
  Check,
  User
} from 'lucide-react';
import { Employee } from '../../types';
import timeService from '../../services/timeService';
import employeeService from '../../services/employeeService';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import Badge from '../../components/common/Badge';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [punch, setPunch] = useState({ punchedIn: true, time: "Today at 10:43 AM (GMT 6)" });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const syncPunchStatus = async () => {
    const status = await timeService.getPunchStatus();
    setPunch({ punchedIn: status.punchedIn, time: status.time || "" });
  };

  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      try {
        await syncPunchStatus();
        const emps = await employeeService.getAll();
        setEmployees(emps);
      } finally {
        setIsLoading(false);
      }
    };
    initData();

    window.addEventListener('punch-status-changed', syncPunchStatus);
    return () => {
      window.removeEventListener('punch-status-changed', syncPunchStatus);
    };
  }, []);

  const handlePunchToggle = async () => {
    const newStatus = !punch.punchedIn;
    const now = new Date();
    const timeStr = `Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (GMT 6)`;
    const newPunch = { punchedIn: newStatus, time: timeStr };
    await timeService.savePunchStatus(newPunch);
    setPunch(newPunch);
    window.dispatchEvent(new Event('punch-status-changed'));
  };

  const leaveEmployees = employees.filter(e => e.attendanceStatus === 'On-Leave');
  const totalEmployees = employees.length;
  const onLeaveCount = leaveEmployees.length;
  const presentCount = employees.filter(e => e.attendanceStatus === 'Present').length;

  const subunitDistribution = [
    { name: 'Engineering', count: employees.filter(e => e.subUnit === 'Engineering').length },
    { name: 'Marketing', count: employees.filter(e => e.subUnit === 'Marketing').length },
    { name: 'Sales', count: employees.filter(e => e.subUnit === 'Sales').length },
    { name: 'HR', count: employees.filter(e => e.subUnit === 'HR').length },
  ];

  const locationDistribution = [
    { name: 'Kochi', count: employees.filter(e => e.location === 'Kochi').length },
    { name: 'Texas', count: employees.filter(e => e.location === 'Texas').length },
    { name: 'Ottawa (HQ)', count: employees.filter(e => e.location === 'Canadian Regional HQ').length },
  ];

  return (
    <div className="space-y-6">
      {/* Row 1: Time at Work Widget (matches Figma design structure and colors) */}
      <div className="bg-[#e9eff4] rounded-xl border border-[#d6e2eb] p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left column: User Punched In status */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Clock className="h-4.5 w-4.5 text-slate-500" />
            <span>Time at Work</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-full border border-slate-200 overflow-hidden bg-slate-100 shadow-sm shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Sarah Joseph"
                className="h-full w-full object-cover"
              />
              <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#e9eff4] ${punch.punchedIn ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-blue-600 hover:underline cursor-pointer" onClick={handlePunchToggle}>
                {punch.punchedIn ? 'Punched In' : 'Punched Out'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">{punch.time}</p>
            </div>
          </div>

          {/* Central stopwatch action pill button */}
          <button 
            onClick={handlePunchToggle}
            className="flex items-center justify-between w-64 bg-white border border-slate-200 hover:border-slate-350 shadow-sm rounded-full py-2.5 px-5 cursor-pointer text-slate-800 transition-all select-none"
          >
            <span className="text-sm font-extrabold tracking-tight">0h 56m Today</span>
            <div className="h-6 w-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Clock className="h-3.5 w-3.5" />
            </div>
          </button>
        </div>

        {/* Right column: 7 vertical white hours bar columns */}
        <div className="flex flex-col items-end space-y-3 border-l border-slate-200 pl-6 h-full justify-between w-full">
          {/* Date info above the bars */}
          <div className="text-right w-full pr-2 select-none">
            <div className="text-[11px] font-bold text-slate-900 leading-none">This Week</div>
            <div className="text-[10px] font-bold text-slate-400 mt-1">Jun 23 - Jun 29</div>
          </div>

          <div className="flex justify-between items-end h-20 gap-3 w-full px-2">
            {[0, 14, 18, 12, 16, 0, 0].map((val, idx) => (
              <div key={`day-bar-${idx}`} className="flex-1 flex flex-col items-center h-full justify-end">
                {/* Outer white column */}
                <div className="w-6 h-20 bg-white border border-slate-200 rounded-lg relative overflow-hidden flex flex-col justify-end">
                  {val > 0 && (
                    <div 
                      className="bg-[#0473b8] w-full rounded-b-md" 
                      style={{ height: `${(val / 20) * 100}%` }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-bold w-full px-2 uppercase tracking-wide">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
      </div>

      {/* Row 2: 4 Stats Cards (matching exact Figma icons, text and sparklines) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Total Employees */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex justify-between h-28 select-none">
          <div className="flex flex-col justify-between h-full">
            <div className="h-9 w-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold text-slate-500">Total Employees</span>
          </div>
          <div className="flex flex-col justify-between items-end h-full">
            <div className="relative">
              <TrendingUp className="h-4.5 w-4.5 text-emerald-500" />
              <span className="absolute -top-1 -right-1.5 text-[8px] font-bold text-emerald-500">+</span>
            </div>
            <span className="text-2xl font-extrabold text-slate-900 leading-none">{totalEmployees}</span>
          </div>
        </div>

        {/* Today's Presents */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex justify-between h-28 select-none">
          <div className="flex flex-col justify-between h-full">
            <div className="h-9 w-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <UserCheck className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold text-slate-500">Today's Presents</span>
          </div>
          <div className="flex flex-col justify-between items-end h-full">
            <div className="relative">
              <TrendingUp className="h-4.5 w-4.5 text-emerald-500" />
              <span className="absolute -top-1 -right-1.5 text-[8px] font-bold text-emerald-500">+</span>
            </div>
            <span className="text-2xl font-extrabold text-slate-900 leading-none">{presentCount}</span>
          </div>
        </div>

        {/* Today's Absence */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex justify-between h-28 select-none">
          <div className="flex flex-col justify-between h-full">
            <div className="h-9 w-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <UserMinus className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold text-slate-500">Today's Absence</span>
          </div>
          <div className="flex flex-col justify-between items-end h-full">
            <div className="relative">
              <TrendingDown className="h-4.5 w-4.5 text-rose-500" />
              <span className="absolute -bottom-1 -right-1 text-[8px] font-bold text-rose-500">+</span>
            </div>
            <span className="text-2xl font-extrabold text-slate-900 leading-none">{onLeaveCount}</span>
          </div>
        </div>

        {/* On Leave */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex justify-between h-28 select-none">
          <div className="flex flex-col justify-between h-full">
            <div className="h-9 w-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <CalendarDays className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold text-slate-500">On Leave</span>
          </div>
          <div className="flex flex-col justify-end items-end h-full">
            <span className="text-2xl font-extrabold text-slate-900 leading-none">{onLeaveCount}</span>
          </div>
        </div>
      </div>

      {/* Row 3: 3 Columns Distribution Charts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Sub Unit Pie Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-900 mb-3">Employee Distribution by Sub Unit</h3>
          <div className="flex justify-center my-4 relative">
            {/* CSS Conic-gradient Pie Chart to match Figma colors */}
            <div 
              className="h-28 w-28 rounded-full border border-slate-100 shadow-sm"
              style={{
                background: 'conic-gradient(#0473b8 0% 75%, #ecc94b 75% 100%)'
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#0473b8] shrink-0"></span>
              <span>Texas R&D</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ecc94b] shrink-0"></span>
              <span>Unassigned</span>
            </div>
          </div>
        </div>

        {/* Location Pie Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-900 mb-3">Employee Distribution by Location</h3>
          <div className="flex justify-center my-4 relative">
            <div 
              className="h-28 w-28 rounded-full border border-slate-100 shadow-sm"
              style={{
                background: 'conic-gradient(#0473b8 0% 90%, #ecc94b 90% 100%)'
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#0473b8] shrink-0"></span>
              <span>Human Resources</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ecc94b] shrink-0"></span>
              <span>Unassigned</span>
            </div>
          </div>
        </div>

        {/* Employees on Leave Today List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900">Employees on Leave Today</h3>
          </div>
          <div className="divide-y divide-slate-100 flex-1 max-h-[170px] overflow-y-auto">
            {leaveEmployees.map((emp) => (
              <div key={emp.id} className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-full bg-slate-150 border border-slate-200 overflow-hidden flex items-center justify-center font-bold text-[10px] text-slate-700">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                      alt="Alaxa" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-none">Alaxa</h4>
                    <p className="text-[9px] text-slate-400 font-bold mt-1">Emp ID: {emp.id.replace('EMP', '')} · {emp.subUnit}</p>
                  </div>
                </div>
                <Badge variant="neutral" size="sm">
                  CAN - Personal
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Row 4: Buzz & My Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Buzz Posts Card */}
        <div className="md:col-span-2 bg-[#f1f3f5] rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-900 border-b border-slate-105 pb-3 flex items-center gap-2">
            <Camera className="h-4.5 w-4.5 text-slate-700" />
            <span>Buzz Latest Posts</span>
          </h3>
          <div className="space-y-3 max-h-[170px] overflow-y-auto pr-1">
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-blue-50 border border-blue-100 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Alexa" className="h-full w-full object-cover" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">Alexa</h4>
                </div>
                <span className="text-[9px] text-slate-400 font-semibold">2025-27-06 10:26 AM</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-9">
                Hello, I am Alexa
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-blue-50 border border-blue-100 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Alexa" className="h-full w-full object-cover" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">Alexa</h4>
                </div>
                <span className="text-[9px] text-slate-400 font-semibold">2025-27-06 10:26 AM</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-9">
                Hello, I am Alexa
              </p>
            </div>
          </div>
        </div>

        {/* My Actions Card */}
        <div className="bg-[#e2e4e7]/60 rounded-xl border border-slate-250 p-5 shadow-sm flex flex-col justify-between space-y-4">
          <h3 className="text-xs font-bold text-slate-900 border-b border-slate-200/50 pb-3 flex items-center gap-1.5">
            <List className="h-4.5 w-4.5 text-slate-700" />
            <span>My Actions</span>
          </h3>
          <div className="space-y-3 flex-1">
            <div 
              className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200/60 hover:border-slate-350 cursor-pointer shadow-sm"
              onClick={() => navigate('/performance')}
            >
              <div className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-xs shrink-0">
                <CalendarClock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">(1) Pending Self Review</h4>
              </div>
            </div>
            <div 
              className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200/60 hover:border-slate-350 cursor-pointer shadow-sm"
              onClick={() => navigate('/recruitment')}
            >
              <div className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-xs shrink-0">
                <UserCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">(10) Candidates to Interview</h4>
              </div>
            </div>
            <div 
              className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200/60 hover:border-slate-350 cursor-pointer shadow-sm"
              onClick={() => navigate('/time')}
            >
              <div className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-xs shrink-0">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">(2) Timesheets to Approve</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 5: Quick Actions (exactly matching Figma text, icons and layout) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          
          {/* 1. Assign Leave */}
          <button 
            onClick={() => navigate('/leave')}
            className="flex flex-col items-center justify-center p-4 bg-[#0473b8] hover:bg-[#03629e] text-white rounded-xl transition-all text-center shadow-sm h-32 cursor-pointer select-none"
          >
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <Users className="h-8 w-8 text-white" />
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-[#0473b8] rounded-full flex items-center justify-center border border-white">
                  <Check className="h-2.5 w-2.5 text-white font-extrabold" />
                </div>
              </div>
            </div>
            <span className="text-xs font-bold mt-2">Assign Leave</span>
          </button>
 
          {/* 2. Leave List */}
          <button 
            onClick={() => navigate('/leave')}
            className="flex flex-col items-center justify-center p-4 bg-[#0473b8] hover:bg-[#03629e] text-white rounded-xl transition-all text-center shadow-sm h-32 cursor-pointer select-none"
          >
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <Users className="h-8 w-8 text-white" />
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-[#0473b8] rounded-full flex items-center justify-center border border-white">
                  <List className="h-2.5 w-2.5 text-white font-extrabold" />
                </div>
              </div>
            </div>
            <span className="text-xs font-bold mt-2">Leave List</span>
          </button>

          {/* 3. Timesheets */}
          <button 
            onClick={() => navigate('/time')}
            className="flex flex-col items-center justify-center p-4 bg-[#0473b8] hover:bg-[#03629e] text-white rounded-xl transition-all text-center shadow-sm h-32 cursor-pointer select-none"
          >
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <ClipboardList className="h-8 w-8 text-white" />
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-[#0473b8] rounded-full flex items-center justify-center border border-white">
                  <Clock className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
            </div>
            <span className="text-xs font-bold mt-2">Timesheets</span>
          </button>

          {/* 4. Apply Leave */}
          <button 
            onClick={() => navigate('/leave')}
            className="flex flex-col items-center justify-center p-4 bg-[#0473b8] hover:bg-[#03629e] text-white rounded-xl transition-all text-center shadow-sm h-32 cursor-pointer select-none"
          >
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <FileText className="h-8 w-8 text-white" />
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-[#0473b8] rounded-full flex items-center justify-center border border-white">
                  <ArrowRight className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
            </div>
            <span className="text-xs font-bold mt-2">Apply Leave</span>
          </button>

          {/* 5. My Leave */}
          <button 
            onClick={() => navigate('/leave')}
            className="flex flex-col items-center justify-center p-4 bg-[#0473b8] hover:bg-[#03629e] text-white rounded-xl transition-all text-center shadow-sm h-32 cursor-pointer select-none"
          >
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <User className="h-8 w-8 text-white" />
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-[#0473b8] rounded-full flex items-center justify-center border border-white">
                  <ArrowUp className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
            </div>
            <span className="text-xs font-bold mt-2">My Leave</span>
          </button>

          {/* 6. My Timesheet */}
          <button 
            onClick={() => navigate('/time')}
            className="flex flex-col items-center justify-center p-4 bg-[#0473b8] hover:bg-[#03629e] text-white rounded-xl transition-all text-center shadow-sm h-32 cursor-pointer select-none"
          >
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <Briefcase className="h-8 w-8 text-white" />
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-[#0473b8] rounded-full flex items-center justify-center border border-white">
                  <Clock className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
            </div>
            <span className="text-xs font-bold mt-2">My Timesheet</span>
          </button>

        </div>
      </div>

      {/* Row 6: Recent Activity (exactly matching Figma text logs) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-3">Recent Activity</h3>
        <div className="space-y-4 text-xs">
          
          <div className="flex gap-3">
            <div className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-500 bg-slate-50">
              <CalendarDays className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-800">Leave Request</h4>
              <p className="text-slate-500">Michael Chen requested 3 days of vacation</p>
              <span className="text-[10px] text-slate-400 font-semibold block">4 hours ago</span>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-500 bg-slate-50">
              <Search className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-800">New Job Application</h4>
              <p className="text-slate-500">Michael Chen requested 3 day5 new applications for Senior Designer positions of vacation</p>
              <span className="text-[10px] text-slate-400 font-semibold block">8 hours ago</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
