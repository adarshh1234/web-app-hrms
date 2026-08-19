import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  UserPlus, 
  Wallet, 
  CalendarRange, 
  User, 
  FolderOpen, 
  Settings, 
  Wrench,
  Link2,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Clock,
  Mail
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [sidebarSearch, setSidebarSearch] = useState('');
  const location = useLocation();

  // Accordion Expand/Collapse States
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    employee: false,
    config: false,
    overtime: false,
    payroll: false,
    association: false,
    notifications: false,
    timeGroup: false,
    eventsGroup: false,
    adminGroup: false,
    selfServiceGroup: false,
    recruitmentGroup: false,
    performance: false
  });

  const toggleGroup = (group: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const isEmployeeActive = location.pathname.startsWith('/employees') || location.pathname.startsWith('/performance');
  const isEmployeeChildActive = location.pathname.startsWith('/employees/list') || location.pathname.startsWith('/employees/documents') || location.pathname.startsWith('/employees/config') || location.pathname.startsWith('/employees/report') || location.pathname.startsWith('/performance');
  
  const isOvertimeActive = location.pathname.startsWith('/time/finance-request') || location.pathname.startsWith('/time/wake-off') || location.pathname.startsWith('/time/time-off');
  const isOvertimeChildActive = isOvertimeActive;

  const isPayrollActive = location.pathname.startsWith('/payroll');
  const isPayrollChildActive = location.pathname.startsWith('/payroll/');

  const isAssociationActive = location.pathname.startsWith('/association');
  const isAssociationChildActive = location.pathname.startsWith('/association/');

  const isNotificationsActive = location.pathname.startsWith('/notifications');
  const isNotificationsChildActive = location.pathname.startsWith('/notifications/');

  const isTimeGroupActive = location.pathname.startsWith('/time/timesheets') || location.pathname.startsWith('/time/attendance') || location.pathname.startsWith('/time/report') || location.pathname.startsWith('/time/project-info');
  const isTimeChildActive = isTimeGroupActive;

  const isEventsActive = location.pathname.startsWith('/events');
  const isEventsChildActive = location.pathname.startsWith('/events/');

  const isAdminActive = location.pathname.startsWith('/admin');
  const isAdminChildActive = location.pathname.startsWith('/admin/');

  const isSelfServiceActive = location.pathname.startsWith('/self-service') || location.pathname.startsWith('/my-info');
  const isSelfServiceChildActive = location.pathname.startsWith('/self-service/') || location.pathname.startsWith('/my-info');

  const isRecruitmentActive = location.pathname.startsWith('/recruitment');
  const isRecruitmentChildActive = location.pathname.startsWith('/recruitment') && location.search.startsWith('?tab=');

  // Styling helper for main menu links
  const getGroupClass = (isGroupActive: boolean, isAnyChildActive: boolean) => {
    if (isAnyChildActive) {
      return "w-full flex items-center gap-3.5 px-6 py-4.5 bg-[#95c5e8] text-white font-bold text-xs select-none border-b border-[#1487c8] transition-colors";
    }
    if (isGroupActive) {
      return "w-full flex items-center gap-3.5 px-6 py-4.5 bg-white text-slate-900 border-b border-slate-200 font-bold text-xs select-none transition-colors";
    }
    return "w-full flex items-center gap-3.5 px-6 py-4.5 bg-[#0a73b0] hover:bg-[#09669c] text-white border-b border-[#1487c8] font-bold text-xs select-none transition-colors";
  };

  const getLinkClass = (isActive: boolean) => {
    if (isActive) {
      return "w-full flex items-center gap-3.5 px-6 py-4.5 bg-white text-slate-900 border-b border-slate-200 font-bold text-xs select-none transition-colors";
    }
    return "w-full flex items-center gap-3.5 px-6 py-4.5 bg-[#0a73b0] hover:bg-[#09669c] text-white border-b border-[#1487c8] font-bold text-xs select-none transition-colors";
  };

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-30 flex flex-col h-full bg-[#0a73b0] transition-all duration-300 ${
        isOpen ? 'w-72' : 'w-20'
      } shadow-xl border-r border-slate-200`}
    >
      {/* Top section: Blue gradient wave background logo container */}
      <div className="relative overflow-hidden h-36 flex flex-col justify-end shrink-0 bg-gradient-to-tr from-[#e3f2fd] via-[#f0f9ff] to-[#90caf9] border-b border-slate-200">
        
        {/* Wavy abstract curves matching mockup design */}
        <svg 
          className="absolute inset-0 h-full w-full pointer-events-none select-none z-0" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          {/* Top-right wave */}
          <path d="M 50,0 C 70,25 85,35 100,20 L 100,0 Z" fill="#64b5f6" opacity="0.45" />
          {/* Center sweeping wave */}
          <path d="M 0,100 C 35,80 65,50 100,70 L 100,100 Z" fill="#cce7ff" opacity="0.65" />
          {/* Soft white wave sweep */}
          <path d="M 0,70 C 30,50 60,80 100,45 L 100,100 L 0,100 Z" fill="#ffffff" opacity="0.3" />
        </svg>

        {/* HUREMASO Logo matching exact design */}
        <div className="px-6 pb-6 relative z-10 flex items-center justify-center select-none text-[#5b9bd5] font-light text-[32px] tracking-wide font-sans">
          <span>HUR</span>
          <span className="relative flex items-center justify-center">
            E
            <span className="absolute top-[43%] left-[-1.5px] w-[18px] h-[3px] bg-black rounded-xs"></span>
          </span>
          <span className="text-[#3c3c3c] font-normal pl-0.5">MASO</span>
        </div>

        {/* Sidebar Search Input inside header - touching both ends */}
        {isOpen && (
          <div className="w-full relative z-10 border-b border-slate-200">
            <Search className="absolute left-6 top-3 h-4 w-4 text-black" />
            <input 
              type="text" 
              placeholder="Search........" 
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-3 bg-white text-xs font-bold text-black outline-none placeholder:text-slate-800 border-none"
            />
          </div>
        )}
      </div>

      {/* Navigation menu list with blue background */}
      <div className="flex flex-col flex-1 overflow-y-auto p-0 space-y-0 bg-[#0a73b0]">
        
        {/* 1st Main section: Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) => getLinkClass(isActive)}
        >
          <Home className="h-4.5 w-4.5 shrink-0" />
          {isOpen && <span className="whitespace-nowrap">Dashboard</span>}
        </NavLink>

        {/* 2nd Main section: Employee Management (Exist) */}
        <div className="w-full">
          <button
            onClick={(e) => toggleGroup('employee', e)}
            className={getGroupClass(isEmployeeActive, isEmployeeChildActive)}
          >
            <div className="flex items-center gap-3.5">
              <Users className="h-4.5 w-4.5 shrink-0" />
              {isOpen && <span className="whitespace-nowrap">Employee Management (Exist)</span>}
            </div>
          </button>

          {/* Subsections under Employee Management */}
          {isOpen && expandedGroups.employee && (
            <div className="bg-[#086399] w-full text-xs font-bold text-slate-100 divide-y divide-[#0c5987] select-none">
              <NavLink 
                to="/employees/list"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Employee List
              </NavLink>
              
              <NavLink 
                to="/employees/documents"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Employee documents
              </NavLink>

              <NavLink 
                to="/employees/config"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Configuration
              </NavLink>

              <NavLink 
                to="/employees/report"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Report
              </NavLink>

              <NavLink 
                to="/performance"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Performance
              </NavLink>

              <NavLink 
                to="/time/overtime-pool"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Overttime Pool
              </NavLink>

              <NavLink 
                to="/time/finance-request"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Employee finance requests
              </NavLink>

              <NavLink 
                to="/time/wake-off"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Wake off
              </NavLink>

              <NavLink 
                to="/time/time-off"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Time off Request
              </NavLink>
            </div>
          )}
        </div>

        {/* Recruitment Collapsible Accordion */}
        <div className="w-full">
          <button
            onClick={(e) => toggleGroup('recruitmentGroup', e)}
            className={getGroupClass(isRecruitmentActive, isRecruitmentChildActive)}
          >
            <div className="flex items-center gap-3.5">
              <UserPlus className="h-4.5 w-4.5 shrink-0" />
              {isOpen && <span className="whitespace-nowrap">Recruitment</span>}
            </div>
          </button>

          {/* Subsections under Recruitment */}
          {isOpen && expandedGroups.recruitmentGroup && (
            <div className="bg-[#086399] w-full text-xs font-bold text-slate-100 divide-y divide-[#0c5987] select-none">
              {[
                { name: 'Employee Onboarding', path: '/recruitment?tab=onboarding' },
                { name: 'Employee Offboarding', path: '/recruitment?tab=offboarding' },
                { name: 'AI Cv Parser', path: '/recruitment?tab=cv-parser' },
                { name: 'Post a Job', path: '/recruitment?tab=post-job' },
                { name: 'Track Applicant', path: '/recruitment?tab=track' },
                { name: 'Talent Pool', path: '/recruitment?tab=talent-pool' },
                { name: 'Feedback and Interview form', path: '/recruitment?tab=feedback' },
                { name: 'Candidate', path: '/recruitment?tab=candidates' },
                { name: 'Vacancy', path: '/recruitment?tab=vacancies' }
              ].map(sub => (
                <NavLink 
                  key={sub.name}
                  to={sub.path}
                  className={() => {
                    const isSubActive = location.search === `?tab=${sub.path.split('=')[1]}` || (location.pathname === '/recruitment' && location.search === '' && sub.path.includes('candidates'));
                    return `block px-10 py-3 transition-all ${
                      isSubActive
                        ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' 
                        : 'text-blue-100 hover:bg-[#07598a]'
                    }`;
                  }}
                >
                  {sub.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Payroll Collapsible accordion group */}
        <div className="w-full">
          <button
            onClick={(e) => toggleGroup('payroll', e)}
            className={getGroupClass(isPayrollActive, isPayrollChildActive)}
          >
            <div className="flex items-center gap-3.5">
              <Wallet className="h-4.5 w-4.5 shrink-0" />
              {isOpen && <span className="whitespace-nowrap">Payroll</span>}
            </div>
          </button>

          {/* Subsections under Payroll */}
          {isOpen && expandedGroups.payroll && (
            <div className="bg-[#086399] w-full text-xs font-bold text-slate-100 divide-y divide-[#0c5987] select-none">
              <NavLink 
                to="/payroll/one-tap"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Payroll in One Tap
              </NavLink>
              
              <NavLink 
                to="/payroll/benefit-advance"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Easy Employee Beniefit Advance
              </NavLink>
            </div>
          )}
        </div>

        {/* Events Collapsible Accordion Group */}
        <div className="w-full">
          <button
            onClick={(e) => toggleGroup('eventsGroup', e)}
            className={getGroupClass(isEventsActive, isEventsChildActive)}
          >
            <div className="flex items-center gap-3.5">
              <CalendarRange className="h-4.5 w-4.5 shrink-0" />
              {isOpen && <span className="whitespace-nowrap">Events</span>}
            </div>
          </button>

          {/* Subsections under Events */}
          {isOpen && expandedGroups.eventsGroup && (
            <div className="bg-[#086399] w-full text-xs font-bold text-slate-100 divide-y divide-[#0c5987] select-none">
              <NavLink 
                to="/events/support"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Support Events
              </NavLink>
              <NavLink 
                to="/events/all"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                All Events
              </NavLink>
              <NavLink 
                to="/events/add"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Add Event
              </NavLink>
              <NavLink 
                to="/events/calendar"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Events Calendar
              </NavLink>
            </div>
          )}
        </div>

        {/* Employee self service Collapsible Accordion Group */}
        <div className="w-full">
          <button
            onClick={(e) => toggleGroup('selfServiceGroup', e)}
            className={getGroupClass(isSelfServiceActive, isSelfServiceChildActive)}
          >
            <div className="flex items-center gap-3.5">
              <User className="h-4.5 w-4.5 shrink-0" />
              {isOpen && <span className="whitespace-nowrap">Employee self service</span>}
            </div>
          </button>

          {/* Subsections under Self Service */}
          {isOpen && expandedGroups.selfServiceGroup && (
            <div className="bg-[#086399] w-full text-xs font-bold text-slate-100 divide-y divide-[#0c5987] select-none">
              <NavLink 
                to="/self-service/travel"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Travel Documents
              </NavLink>
              <NavLink 
                to="/self-service/company-docs"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Company Doc-Center
              </NavLink>
              <NavLink 
                to="/self-service/hr-letters"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                HR Letters
              </NavLink>
              <NavLink 
                to="/self-service/mass-messages"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Mass Messages
              </NavLink>
              <NavLink 
                to="/self-service/leave"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Leave
              </NavLink>
              <NavLink 
                to="/my-info"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                My Info
              </NavLink>
            </div>
          )}
        </div>

        {/* Reporting and Analytics */}
        <NavLink
          to="/documents"
          className={({ isActive }) => getLinkClass(isActive)}
        >
          <FolderOpen className="h-4.5 w-4.5 shrink-0" />
          {isOpen && <span className="whitespace-nowrap">Reporting and Analytics</span>}
        </NavLink>

        {/* Notifications (Collapsible Accordion Group) */}
        <div className="w-full">
          <button
            onClick={(e) => toggleGroup('notifications', e)}
            className={getGroupClass(isNotificationsActive, isNotificationsChildActive)}
          >
            <div className="flex items-center gap-3.5">
              <Bell className="h-4.5 w-4.5 shrink-0" />
              {isOpen && <span className="whitespace-nowrap">Notifications</span>}
            </div>
          </button>

          {/* Subsections under Notifications */}
          {isOpen && expandedGroups.notifications && (
            <div className="bg-[#086399] w-full text-xs font-bold text-slate-100 divide-y divide-[#0c5987] select-none">
              <NavLink 
                to="/notifications/email"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Email
              </NavLink>
              <NavLink 
                to="/notifications/sms"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                SMS
              </NavLink>
              <NavLink 
                to="/notifications/whatsapp"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                What's App
              </NavLink>
              <NavLink 
                to="/notifications/employee-app"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Employee App
              </NavLink>
            </div>
          )}
        </div>

        {/* Miscellaneous Request */}
        <NavLink
          to="/support"
          className={({ isActive }) => getLinkClass(isActive)}
        >
          <Mail className="h-4.5 w-4.5 shrink-0" />
          {isOpen && <span className="whitespace-nowrap">Miscellaneous Request</span>}
        </NavLink>

        {/* Monitoring Inhouse Association */}
        <div className="w-full">
          <button
            onClick={(e) => toggleGroup('association', e)}
            className={getGroupClass(isAssociationActive, isAssociationChildActive)}
          >
            <div className="flex items-center gap-3.5">
              <Link2 className="h-4.5 w-4.5 shrink-0" />
              {isOpen && <span className="whitespace-nowrap">Monitoring Inhouse Association</span>}
            </div>
          </button>

          {/* Subsections: New Association Request & Existing */}
          {isOpen && expandedGroups.association && (
            <div className="bg-[#086399] w-full text-xs font-bold text-slate-100 divide-y divide-[#0c5987] select-none">
              <NavLink 
                to="/association/new"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                New Association Request
              </NavLink>
              
              <NavLink 
                to="/association/existing"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Existing
              </NavLink>
            </div>
          )}
        </div>

        {/* Admin Collapsible Accordion Group */}
        <div className="w-full">
          <button
            onClick={(e) => toggleGroup('adminGroup', e)}
            className={getGroupClass(isAdminActive, isAdminChildActive)}
          >
            <div className="flex items-center gap-3.5">
              <Settings className="h-4.5 w-4.5 shrink-0" />
              {isOpen && <span className="whitespace-nowrap">Admin</span>}
            </div>
          </button>

          {/* Subsections under Admin */}
          {isOpen && expandedGroups.adminGroup && (
            <div className="bg-[#086399] w-full text-xs font-bold text-slate-100 divide-y divide-[#0c5987] select-none">
              {[
                { name: 'User Management', path: '/admin/user-management' },
                { name: 'Job', path: '/admin/job' },
                { name: 'Organization', path: '/admin/organization' },
                { name: 'Qualification', path: '/admin/qualification' },
                { name: 'Nationalities', path: '/admin/nationalities' },
                { name: 'Corporate Branding', path: '/admin/branding' },
                { name: 'Configuration', path: '/admin/configuration' }
              ].map(sub => (
                <NavLink 
                  key={sub.name}
                  to={sub.path}
                  className={({ isActive }) => 
                    `block px-10 py-3 transition-all ${
                      isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                    }`
                  }
                >
                  {sub.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Time Collapsible Accordion Group */}
        <div className="w-full">
          <button
            onClick={(e) => toggleGroup('timeGroup', e)}
            className={getGroupClass(isTimeGroupActive, isTimeChildActive)}
          >
            <div className="flex items-center gap-3.5">
              <Clock className="h-4.5 w-4.5 shrink-0" />
              {isOpen && <span className="whitespace-nowrap">Time</span>}
            </div>
          </button>

          {/* Subsections under Time */}
          {isOpen && expandedGroups.timeGroup && (
            <div className="bg-[#086399] w-full text-xs font-bold text-slate-100 divide-y divide-[#0c5987] select-none">
              <NavLink 
                to="/time/timesheets"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Timesheets
              </NavLink>
              <NavLink 
                to="/time/attendance"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Attendance
              </NavLink>
              <NavLink 
                to="/time/report"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Report
              </NavLink>
              <NavLink 
                to="/time/project-info"
                className={({ isActive }) => 
                  `block px-10 py-3 transition-all ${
                    isActive ? 'bg-white text-slate-900 border-b border-slate-200 font-extrabold shadow-sm' : 'text-blue-100 hover:bg-[#07598a]'
                  }`
                }
              >
                Project Info
              </NavLink>
            </div>
          )}
        </div>

        {/* Maintenance */}
        <NavLink
          to="/maintenance"
          className={({ isActive }) => getLinkClass(isActive)}
        >
          <Wrench className="h-4.5 w-4.5 shrink-0" />
          {isOpen && <span className="whitespace-nowrap">Maintenance</span>}
        </NavLink>

      </div>
    </aside>
  );
};
export default Sidebar;
