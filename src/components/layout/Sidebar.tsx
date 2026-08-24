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
  Clock,
  Mail
} from 'lucide-react';
import HuremasoLogo from '../common/HuremasoLogo';
import HuremasoWaveBg from '../common/HuremasoWaveBg';

interface SidebarProps {
  isOpen: boolean;
  onToggle?: () => void;
  onClose?: () => void;
  isMobileOpen: boolean;
}

interface SidebarNavLinkProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isOpen: boolean;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({ to, icon: Icon, label, isOpen }) => {
  const getLinkClass = (isActive: boolean) => {
    if (isActive) {
      return "w-full flex items-center gap-3.5 px-6 py-4.5 bg-white text-slate-900 border-b border-slate-200 font-bold text-xs select-none transition-colors";
    }
    return "w-full flex items-center gap-3.5 px-6 py-4.5 bg-[#0a73b0] hover:bg-[#09669c] text-white border-b border-[#1487c8] font-bold text-xs select-none transition-colors";
  };

  return (
    <NavLink to={to} className={({ isActive }) => getLinkClass(isActive)}>
      <Icon className="h-4.5 w-4.5 shrink-0" />
      {isOpen && <span className="whitespace-nowrap">{label}</span>}
    </NavLink>
  );
};

interface SubItem {
  name: string;
  path: string;
  isCustomActive?: (pathname: string, search: string) => boolean;
}

interface SidebarNavGroupProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  groupKey: string;
  isGroupActive: boolean;
  isChildActive: boolean;
  isOpen: boolean;
  isExpanded: boolean;
  onToggle: (groupKey: string, e: React.MouseEvent) => void;
  items: SubItem[];
  location: { pathname: string; search: string };
}

const SidebarNavGroup: React.FC<SidebarNavGroupProps> = ({
  label,
  icon: Icon,
  groupKey,
  isGroupActive,
  isChildActive,
  isOpen,
  isExpanded,
  onToggle,
  items,
  location
}) => {
  const getGroupClass = (isGroupActive: boolean, isAnyChildActive: boolean) => {
    if (isAnyChildActive) {
      return "w-full flex items-center gap-3.5 px-6 py-4.5 bg-[#95c5e8] text-white font-bold text-xs select-none border-b border-[#1487c8] transition-colors";
    }
    if (isGroupActive) {
      return "w-full flex items-center gap-3.5 px-6 py-4.5 bg-white text-slate-900 border-b border-slate-200 font-bold text-xs select-none transition-colors";
    }
    return "w-full flex items-center gap-3.5 px-6 py-4.5 bg-[#0a73b0] hover:bg-[#09669c] text-white border-b border-[#1487c8] font-bold text-xs select-none transition-colors";
  };

  return (
    <div className="w-full">
      <button
        onClick={(e) => onToggle(groupKey, e)}
        className={getGroupClass(isGroupActive, isChildActive)}
      >
        <div className="flex items-center gap-3.5">
          <Icon className="h-4.5 w-4.5 shrink-0" />
          {isOpen && <span className="whitespace-nowrap">{label}</span>}
        </div>
      </button>

      {isOpen && isExpanded && (
        <div className="bg-[#086399] w-full text-xs font-bold text-slate-100 divide-y divide-[#0c5987] select-none">
          {items.map((sub) => (
            <NavLink
              key={sub.name}
              to={sub.path}
              className={({ isActive }) => {
                const active = sub.isCustomActive
                  ? sub.isCustomActive(location.pathname, location.search)
                  : isActive;
                return `block px-10 py-3 transition-all ${
                  active
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
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isMobileOpen }) => {
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

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 flex flex-col h-full bg-[#0a73b0] transition-all duration-300 shadow-xl border-r border-slate-200 w-72 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 ${isOpen ? 'md:w-72' : 'md:w-20'}`}
        onClick={(e) => {
          // Close mobile drawer when a link is clicked
          const target = e.target as HTMLElement;
          if (target.closest('a') && onClose) {
            onClose();
          }
        }}
      >
      {/* Top section: Blue gradient wave background logo container */}
      <div className="relative overflow-hidden h-36 flex flex-col justify-end shrink-0 bg-gradient-to-tr from-[#e3f2fd] via-[#f0f9ff] to-[#90caf9] border-b border-slate-200">
        <HuremasoWaveBg />

        <div className="px-6 pb-6 relative z-10">
          <HuremasoLogo size="lg" />
        </div>

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
        
        {/* Dashboard */}
        <SidebarNavLink to="/dashboard" icon={Home} label="Dashboard" isOpen={isOpen} />

        {/* Employee Management */}
        <SidebarNavGroup
          label="Employee Management (Exist)"
          icon={Users}
          groupKey="employee"
          isGroupActive={isEmployeeActive}
          isChildActive={isEmployeeChildActive}
          isOpen={isOpen}
          isExpanded={expandedGroups.employee}
          onToggle={toggleGroup}
          location={location}
          items={[
            { name: 'Employee List', path: '/employees/list' },
            { name: 'Employee documents', path: '/employees/documents' },
            { name: 'Configuration', path: '/employees/config' },
            { name: 'Report', path: '/employees/report' },
            { name: 'Performance', path: '/performance' },
            { name: 'Overttime Pool', path: '/time/overtime-pool' },
            { name: 'Employee finance requests', path: '/time/finance-request' },
            { name: 'Wake off', path: '/time/wake-off' },
            { name: 'Time off Request', path: '/time/time-off' }
          ]}
        />

        {/* Recruitment */}
        <SidebarNavGroup
          label="Recruitment"
          icon={UserPlus}
          groupKey="recruitmentGroup"
          isGroupActive={isRecruitmentActive}
          isChildActive={isRecruitmentChildActive}
          isOpen={isOpen}
          isExpanded={expandedGroups.recruitmentGroup}
          onToggle={toggleGroup}
          location={location}
          items={[
            { name: 'Employee Onboarding', path: '/recruitment?tab=onboarding', isCustomActive: (_, s) => s === '?tab=onboarding' },
            { name: 'Employee Offboarding', path: '/recruitment?tab=offboarding', isCustomActive: (_, s) => s === '?tab=offboarding' },
            { name: 'AI Cv Parser', path: '/recruitment?tab=cv-parser', isCustomActive: (_, s) => s === '?tab=cv-parser' },
            { name: 'Post a Job', path: '/recruitment?tab=post-job', isCustomActive: (_, s) => s === '?tab=post-job' },
            { name: 'Track Applicant', path: '/recruitment?tab=track', isCustomActive: (_, s) => s === '?tab=track' },
            { name: 'Talent Pool', path: '/recruitment?tab=talent-pool', isCustomActive: (_, s) => s === '?tab=talent-pool' },
            { name: 'Feedback and Interview form', path: '/recruitment?tab=feedback', isCustomActive: (_, s) => s === '?tab=feedback' },
            { name: 'Candidate', path: '/recruitment?tab=candidates', isCustomActive: (p, s) => s === '?tab=candidates' || (p === '/recruitment' && s === '') },
            { name: 'Vacancy', path: '/recruitment?tab=vacancies', isCustomActive: (_, s) => s === '?tab=vacancies' }
          ]}
        />

        {/* Payroll */}
        <SidebarNavGroup
          label="Payroll"
          icon={Wallet}
          groupKey="payroll"
          isGroupActive={isPayrollActive}
          isChildActive={isPayrollChildActive}
          isOpen={isOpen}
          isExpanded={expandedGroups.payroll}
          onToggle={toggleGroup}
          location={location}
          items={[
            { name: 'Payroll in One Tap', path: '/payroll/one-tap' },
            { name: 'Easy Employee Beniefit Advance', path: '/payroll/benefit-advance' }
          ]}
        />

        {/* Events */}
        <SidebarNavGroup
          label="Events"
          icon={CalendarRange}
          groupKey="eventsGroup"
          isGroupActive={isEventsActive}
          isChildActive={isEventsChildActive}
          isOpen={isOpen}
          isExpanded={expandedGroups.eventsGroup}
          onToggle={toggleGroup}
          location={location}
          items={[
            { name: 'Support Events', path: '/events/support' },
            { name: 'All Events', path: '/events/all' },
            { name: 'Add Event', path: '/events/add' },
            { name: 'Events Calendar', path: '/events/calendar' }
          ]}
        />

        {/* Employee self service */}
        <SidebarNavGroup
          label="Employee self service"
          icon={User}
          groupKey="selfServiceGroup"
          isGroupActive={isSelfServiceActive}
          isChildActive={isSelfServiceChildActive}
          isOpen={isOpen}
          isExpanded={expandedGroups.selfServiceGroup}
          onToggle={toggleGroup}
          location={location}
          items={[
            { name: 'Travel Documents', path: '/self-service/travel' },
            { name: 'Company Doc-Center', path: '/self-service/company-docs' },
            { name: 'HR Letters', path: '/self-service/hr-letters' },
            { name: 'Mass Messages', path: '/self-service/mass-messages' },
            { name: 'Leave', path: '/self-service/leave' },
            { name: 'My Info', path: '/my-info' }
          ]}
        />

        {/* Reporting and Analytics */}
        <SidebarNavLink to="/documents" icon={FolderOpen} label="Reporting and Analytics" isOpen={isOpen} />

        {/* Notifications */}
        <SidebarNavGroup
          label="Notifications"
          icon={Bell}
          groupKey="notifications"
          isGroupActive={isNotificationsActive}
          isChildActive={isNotificationsChildActive}
          isOpen={isOpen}
          isExpanded={expandedGroups.notifications}
          onToggle={toggleGroup}
          location={location}
          items={[
            { name: 'Email', path: '/notifications/email' },
            { name: 'SMS', path: '/notifications/sms' },
            { name: 'What\'s App', path: '/notifications/whatsapp' },
            { name: 'Employee App', path: '/notifications/employee-app' }
          ]}
        />

        {/* Miscellaneous Request */}
        <SidebarNavLink to="/support" icon={Mail} label="Miscellaneous Request" isOpen={isOpen} />

        {/* Monitoring Inhouse Association */}
        <SidebarNavGroup
          label="Monitoring Inhouse Association"
          icon={Link2}
          groupKey="association"
          isGroupActive={isAssociationActive}
          isChildActive={isAssociationChildActive}
          isOpen={isOpen}
          isExpanded={expandedGroups.association}
          onToggle={toggleGroup}
          location={location}
          items={[
            { name: 'New Association Request', path: '/association/new' },
            { name: 'Existing', path: '/association/existing' }
          ]}
        />

        {/* Admin */}
        <SidebarNavGroup
          label="Admin"
          icon={Settings}
          groupKey="adminGroup"
          isGroupActive={isAdminActive}
          isChildActive={isAdminChildActive}
          isOpen={isOpen}
          isExpanded={expandedGroups.adminGroup}
          onToggle={toggleGroup}
          location={location}
          items={[
            { name: 'User Management', path: '/admin/user-management' },
            { name: 'Job', path: '/admin/job' },
            { name: 'Organization', path: '/admin/organization' },
            { name: 'Qualification', path: '/admin/qualification' },
            { name: 'Nationalities', path: '/admin/nationalities' },
            { name: 'Corporate Branding', path: '/admin/branding' },
            { name: 'Configuration', path: '/admin/configuration' }
          ]}
        />

        {/* Time */}
        <SidebarNavGroup
          label="Time"
          icon={Clock}
          groupKey="timeGroup"
          isGroupActive={isTimeGroupActive}
          isChildActive={isTimeChildActive}
          isOpen={isOpen}
          isExpanded={expandedGroups.timeGroup}
          onToggle={toggleGroup}
          location={location}
          items={[
            { name: 'Timesheets', path: '/time/timesheets' },
            { name: 'Attendance', path: '/time/attendance' },
            { name: 'Report', path: '/time/report' },
            { name: 'Project Info', path: '/time/project-info' }
          ]}
        />

        {/* Maintenance */}
        <SidebarNavLink to="/maintenance" icon={Wrench} label="Maintenance" isOpen={isOpen} />

      </div>
      </aside>
    </>
  );
};

export default Sidebar;

