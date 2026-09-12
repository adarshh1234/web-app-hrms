import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sparkles,
  Users, 
  UserPlus, 
  UserCheck,
  UserMinus,
  Wallet, 
  Calendar, 
  User, 
  BarChart3, 
  Bell, 
  Mail, 
  Link as LinkIcon, 
  Settings, 
  Clock, 
  Wrench,
  HelpCircle,
  Heart,
  FileText,
  CheckSquare,
  Search,
  ChevronDown,
  Briefcase,
  HardDrive,
  LogOut,
  ChevronsUpDown
} from 'lucide-react';
import HuremasoLogo from '../common/HuremasoLogo';
import HuremasoWaveBg from '../common/HuremasoWaveBg';

interface SidebarProps {
  isOpen: boolean;
  onToggle?: () => void;
  onClose?: () => void;
  isMobileOpen: boolean;
  onLogout?: () => void;
}

interface SidebarNavLinkProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isOpen: boolean;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({ to, icon: Icon, label, isOpen }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `group relative flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 select-none ${
          isActive 
            ? 'bg-gradient-to-r from-[#002222] via-[#004848] to-[#007878] text-white shadow-md shadow-[#003333]/20' 
            : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
        } ${!isOpen ? 'justify-center px-0' : ''}`
      }
      title={!isOpen ? label : undefined}
    >
      {({ isActive }) => (
        <>
          <Icon className={`h-5 w-5 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
          {isOpen && <span className="truncate">{label}</span>}
        </>
      )}
    </NavLink>
  );
};

interface SubItem {
  name: string;
  path?: string;
  isCustomActive?: (pathname: string, search: string) => boolean;
  children?: SubItem[];
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

const SidebarSubItem: React.FC<{ sub: SubItem; location: { pathname: string; search: string } }> = ({ sub, location }) => {
  const isChildActive = sub.children?.some(c => 
    c.isCustomActive ? c.isCustomActive(location.pathname, location.search) : (c.path && location.pathname === c.path)
  ) || (sub.path && location.pathname === sub.path);

  const [isSubExpanded, setIsSubExpanded] = useState<boolean>(true);

  if (sub.children && sub.children.length > 0) {
    return (
      <div className="w-full space-y-0.5">
        <NavLink
          to={sub.path || '#'}
          onClick={(e) => {
            if (!sub.path || sub.path === '#') {
              e.preventDefault();
            }
            setIsSubExpanded(!isSubExpanded);
          }}
          className={({ isActive }) => {
            const active = isChildActive || (sub.path && sub.path !== '#' && isActive);
            return `w-full flex items-center justify-between px-3 py-2 text-[13px] font-medium rounded-full transition-all duration-150 select-none cursor-pointer ${
              active
                ? 'bg-gradient-to-r from-[#002222] to-[#006666] text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
            }`;
          }}
        >
          <span className="truncate">{sub.name}</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsSubExpanded(!isSubExpanded);
            }}
            className="p-0.5 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <ChevronDown
              className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
                isSubExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </NavLink>

        {isSubExpanded && (
          <div className="pl-3 pr-1 pt-0.5 pb-0.5 space-y-0.5 border-l-2 border-slate-100 ml-3">
            {sub.children.map((child) => (
              <SidebarSubItem key={child.name} sub={child} location={location} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      key={sub.name}
      to={sub.path || '#'}
      className={({ isActive }) => {
        const active = sub.isCustomActive
          ? sub.isCustomActive(location.pathname, location.search)
          : isActive;
        return `block px-3 py-2 text-[13px] font-medium rounded-full transition-all duration-150 ${
          active
            ? 'bg-gradient-to-r from-[#002222] to-[#006666] text-white font-semibold shadow-xs'
            : 'text-slate-500 hover:bg-slate-100/70 hover:text-slate-900'
        }`;
      }}
    >
      {sub.name}
    </NavLink>
  );
};

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
  const isAnyItemActive = items.some(sub => {
    if (sub.isCustomActive) {
      return sub.isCustomActive(location.pathname, location.search);
    }
    if (sub.children && sub.children.length > 0) {
      return sub.children.some(c => 
        c.isCustomActive ? c.isCustomActive(location.pathname, location.search) : (c.path && location.pathname === c.path)
      );
    }
    return sub.path && (location.pathname + location.search === sub.path || location.pathname === sub.path);
  });

  const isActiveGroup = isAnyItemActive || (isChildActive && isGroupActive);

  return (
    <div className="w-full">
      <button
        onClick={(e) => onToggle(groupKey, e)}
        className={`group w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 select-none ${
          isActiveGroup 
            ? 'bg-gradient-to-r from-[#002222] via-[#004848] to-[#007878] text-white shadow-md shadow-[#003333]/20' 
            : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
        } ${!isOpen ? 'justify-center px-0' : ''}`}
        title={!isOpen ? label : undefined}
      >
        <div className={`flex items-center gap-2.5 min-w-0 flex-1 ${!isOpen ? 'justify-center' : ''}`}>
          <Icon className={`h-5 w-5 shrink-0 transition-colors ${isActiveGroup ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
          {isOpen && <span className="truncate text-xs md:text-sm font-medium">{label}</span>}
        </div>
        {isOpen && (
          <ChevronDown 
            className={`h-4 w-4 shrink-0 ml-1 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            } ${isActiveGroup ? 'text-white' : 'text-slate-400'}`} 
          />
        )}
      </button>

      {isOpen && isExpanded && (
        <div className="pl-9 pr-1 pt-1 pb-1 space-y-0.5">
          {items.map((sub) => (
            <SidebarSubItem key={sub.name} sub={sub} location={location} />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isMobileOpen, onLogout }) => {
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const location = useLocation();

  // Accordion Expand/Collapse States
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    huremasoAi: false,
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
    recruitmentMainGroup: true,
    performance: false,
    maintenanceGroup: false,
    supportGroup: false,
    employeeAppGroup: false,
    wellnessGroup: false,
    performanceAppraisalGroup: false,
    hrLettersMemosGroup: false,
    onboardingGroup: false,
    offboardingGroup: false,
    tasksGroup: false
  });

  const toggleGroup = (group: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const isHuremasoAiActive = location.pathname.startsWith('/ai');
  const isHuremasoAiChildActive = isHuremasoAiActive;

  const isEmployeeActive = 
    location.pathname.startsWith('/employees') || 
    location.pathname.startsWith('/performance') ||
    location.pathname.startsWith('/self-service/hr-letters') ||
    location.pathname.startsWith('/self-service/mass-messages') ||
    location.pathname.startsWith('/self-service/leave') ||
    location.pathname.startsWith('/time/timesheets') ||
    location.pathname.startsWith('/time/overtime-pool') ||
    location.pathname.startsWith('/time/finance-request') ||
    location.pathname.startsWith('/time/wake-off') ||
    location.pathname.startsWith('/time/time-off') ||
    location.pathname.startsWith('/admin/nationalities') ||
    location.pathname.startsWith('/admin/job') ||
    location.pathname.startsWith('/admin/organization') ||
    location.pathname.startsWith('/time/project-info');

  const isEmployeeChildActive = isEmployeeActive;

  const isPayrollActive = location.pathname.startsWith('/payroll') || location.pathname.startsWith('/time/finance-request');
  const isPayrollChildActive = location.pathname.startsWith('/payroll/') || location.pathname.startsWith('/time/finance-request');

  const isAssociationActive = location.pathname.startsWith('/association');
  const isAssociationChildActive = location.pathname.startsWith('/association/');

  const isNotificationsActive = location.pathname.startsWith('/notifications');
  const isNotificationsChildActive = location.pathname.startsWith('/notifications/');

  const isTimeGroupActive = location.pathname.startsWith('/time/timesheets') || location.pathname.startsWith('/time/attendance') || location.pathname.startsWith('/time/report');
  const isTimeChildActive = isTimeGroupActive;

  const isEventsActive = location.pathname.startsWith('/events');
  const isEventsChildActive = location.pathname.startsWith('/events/');

  const isAdminActive = location.pathname.startsWith('/admin') && !location.pathname.startsWith('/admin/nationalities') && !location.pathname.startsWith('/admin/job') && !location.pathname.startsWith('/admin/organization');
  const isAdminChildActive = isAdminActive;

  const isSelfServiceActive = location.pathname.startsWith('/self-service') || location.pathname.startsWith('/my-info');
  const isSelfServiceChildActive = location.pathname.startsWith('/self-service/') || location.pathname.startsWith('/my-info');

  const isRecruitmentActive = location.pathname.startsWith('/recruitment');
  const isRecruitmentChildActive = location.pathname.startsWith('/recruitment') && location.search.startsWith('?tab=');

  const isMaintenanceActive = location.pathname.startsWith('/maintenance');
  const isMaintenanceChildActive = location.pathname.startsWith('/maintenance/');

  const isSupportActive = location.pathname.startsWith('/support');
  const isSupportChildActive = location.pathname.startsWith('/support/');

  const isEmployeeAppActive = location.pathname.startsWith('/self-service') || location.pathname.startsWith('/my-info') || location.pathname.startsWith('/association');
  const isEmployeeAppChildActive = isEmployeeAppActive;

  const isWellnessActive = location.pathname.startsWith('/wellness');
  const isWellnessChildActive = location.pathname.startsWith('/wellness/');

  const isPerformanceAppraisalActive = location.pathname.startsWith('/performance-appraisal');
  const isPerformanceAppraisalChildActive = isPerformanceAppraisalActive;

  const isHrLettersMemosActive = location.pathname.startsWith('/hr-letters-memos');
  const isHrLettersMemosChildActive = isHrLettersMemosActive;

  const isOnboardingActive = location.pathname.startsWith('/onboarding');
  const isOnboardingChildActive = isOnboardingActive;

  const isOffboardingActive = location.pathname.startsWith('/offboarding');
  const isOffboardingChildActive = isOffboardingActive;

  const isTasksActive = location.pathname.startsWith('/tasks');
  const isTasksChildActive = isTasksActive;

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-xs md:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 flex flex-col h-full bg-white border-r border-slate-200 transition-all duration-300 w-72 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        } md:translate-x-0 ${isOpen ? 'md:w-72' : 'md:w-20'}`}
        onClick={(e) => {
          // Close mobile drawer when a link is clicked
          const target = e.target as HTMLElement;
          if (target.closest('a') && onClose) {
            onClose();
          }
        }}
      >
        {/* Top section: Green gradient wave background logo container */}
        <div className="relative overflow-hidden h-36 flex flex-col justify-end shrink-0 bg-gradient-to-tr from-[#e6f4f4] via-[#f0fdfa] to-[#80cbd0] border-b border-slate-200">
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

        {/* Navigation menu list */}
        <div className="flex flex-col flex-1 overflow-y-auto p-3 space-y-1">
          
          {/* Dashboard */}
          <SidebarNavLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" isOpen={isOpen} />

          {/* HUREMASO+AI */}
          <SidebarNavGroup
            label="HUREMASO+AI"
            icon={Sparkles}
            groupKey="huremasoAi"
            isGroupActive={isHuremasoAiActive}
            isChildActive={isHuremasoAiChildActive}
            isOpen={isOpen}
            isExpanded={expandedGroups.huremasoAi}
            onToggle={toggleGroup}
            location={location}
            items={[
              { name: 'Predictive Workforce Analytics & Flight Risk Detection', path: '/ai/predictive-analytics' },
              { name: 'Autonomous Performance & Skill Management', path: '/ai/autonomous-performance' },
              { name: 'Next-Gen Employee Experience (EX) & Conversational HR', path: '/ai/employee-experience' },
              { name: 'Automated Compliance & Borderless Operations', path: '/ai/automated-compliance' }
            ]}
          />

          {/* Callender */}
          <SidebarNavLink to="/callender" icon={Calendar} label="Callender" isOpen={isOpen} />

          {/* Notes */}
          <SidebarNavLink to="/notes" icon={FileText} label="Notes" isOpen={isOpen} />

          {/* Tasks – */}
          <SidebarNavGroup
            label="Tasks –"
            icon={CheckSquare}
            groupKey="tasksGroup"
            isGroupActive={isTasksActive}
            isChildActive={isTasksChildActive}
            isOpen={isOpen}
            isExpanded={expandedGroups.tasksGroup}
            onToggle={toggleGroup}
            location={location}
            items={[
              { name: 'Task management', path: '/tasks/kanban' },
              { name: 'Todo list', path: '/tasks/todo' }
            ]}
          />

          {/* Employee Management */}
          <SidebarNavGroup
            label="Employee Management"
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
              { name: 'Nationalities', path: '/admin/nationalities' },
              { name: 'Department', path: '/employees/department' },
              { name: 'Location', path: '/employees/location' },
              { name: 'Projects', path: '/time/project-info' },
              { name: 'Job', path: '/admin/job' },
              { name: 'Legal', path: '/employees/legal' },
              { name: 'Employee Documents', path: '/employees/documents' },
              { name: 'HR Letters', path: '/self-service/hr-letters' },
              { name: 'Mass Message', path: '/self-service/mass-messages' },
              { name: 'Leave Management', path: '/self-service/leave' },
              { name: 'Employee Requests', path: '/time/finance-request' },
              { name: 'Reports & Analytics', path: '/employees/report' },
              { name: 'Configuration', path: '/employees/config' },
              { name: 'Performance', path: '/performance' }
            ]}
          />

          {/* Recruitment */}
          <SidebarNavGroup
            label="Recruitment"
            icon={UserPlus}
            groupKey="recruitmentMainGroup"
            isGroupActive={false}
            isChildActive={false}
            isOpen={isOpen}
            isExpanded={expandedGroups.recruitmentMainGroup}
            onToggle={toggleGroup}
            location={location}
            items={[
              { name: 'Resume', path: '/recruitment?tab=resume', isCustomActive: (p, s) => p.startsWith('/recruitment') && (s === '?tab=resume' || s === '' || p === '/recruitment/resume') },
              { name: 'AI Cv Parser', path: '/recruitment?tab=cv-parser', isCustomActive: (_, s) => s === '?tab=cv-parser' },
              { name: 'Post a Job', path: '/recruitment?tab=post-job', isCustomActive: (_, s) => s === '?tab=post-job' },
              { name: 'Track Applicant', path: '/recruitment?tab=track', isCustomActive: (_, s) => s === '?tab=track' },
              { name: 'Talent Pool', path: '/recruitment?tab=talent-pool', isCustomActive: (_, s) => s === '?tab=talent-pool' },
              { name: 'Feedback and Interview form', path: '/recruitment?tab=feedback', isCustomActive: (_, s) => s === '?tab=feedback' },
              { name: 'Candidate', path: '/recruitment?tab=candidates', isCustomActive: (p, s) => s === '?tab=candidates' },
              { name: 'Vacancy', path: '/recruitment?tab=vacancies', isCustomActive: (_, s) => s === '?tab=vacancies' }
            ]}
          />

          {/* Recruitment Pipeline */}
          <SidebarNavGroup
            label="Recruitment Pipeline"
            icon={UserPlus}
            groupKey="recruitmentGroup"
            isGroupActive={false}
            isChildActive={false}
            isOpen={isOpen}
            isExpanded={expandedGroups.recruitmentGroup}
            onToggle={toggleGroup}
            location={location}
            items={[
              { name: 'Vacancies', path: '/recruitment?tab=vacancies', isCustomActive: (p, s) => s === '?tab=vacancies' },
              { name: 'Talent Pool', path: '/recruitment?tab=talent-pool', isCustomActive: (_, s) => s === '?tab=talent-pool' },
              { name: 'Create Job', path: '/recruitment?tab=post-letgetin', isCustomActive: (_, s) => s === '?tab=post-letgetin' },
              { name: 'Post in letgetin', path: '/recruitment?tab=post-letgetin', isCustomActive: (_, s) => s === '?tab=post-letgetin' }
            ]}
          />

          {/* Employee Onboarding */}
          <SidebarNavGroup
            label="Employee Onboarding"
            icon={UserCheck}
            groupKey="onboardingGroup"
            isGroupActive={isOnboardingActive}
            isChildActive={isOnboardingChildActive}
            isOpen={isOpen}
            isExpanded={expandedGroups.onboardingGroup}
            onToggle={toggleGroup}
            location={location}
            items={[
              { name: 'Final List', path: '/onboarding/final-list' },
              { name: 'Background Verification', path: '/onboarding/background-verification' },
              { name: 'Assessments', path: '/onboarding/assessments' },
              { name: 'Offers', path: '/onboarding/offers' },
              { name: 'Documents', path: '/onboarding/documents' },
              { name: 'Provisions', path: '/onboarding/provisions' },
              { name: 'Buddy/Direct Manager', path: '/onboarding/buddy-manager' },
              { name: 'Training', path: '/onboarding/training' },
              { name: 'Visa & Immigration', path: '/onboarding/visa-immigration' },
              { name: 'Insurance', path: '/onboarding/insurance' },
              { name: 'Other Miscellaneous', path: '/onboarding/miscellaneous' },
              { name: 'Reports', path: '/onboarding/reports' }
            ]}
          />

          {/* Employee Off-Boarding */}
          <SidebarNavGroup
            label="Employee Off-Boarding"
            icon={UserMinus}
            groupKey="offboardingGroup"
            isGroupActive={isOffboardingActive}
            isChildActive={isOffboardingChildActive}
            isOpen={isOpen}
            isExpanded={expandedGroups.offboardingGroup}
            onToggle={toggleGroup}
            location={location}
            items={[
              { name: 'Document', path: '/offboarding/document' },
              { name: 'Performance', path: '/offboarding/performance' },
              { name: 'Settlement', path: '/offboarding/settlement' },
              { name: 'Legal', path: '/offboarding/legal' },
              { name: 'Assets', path: '/offboarding/assets' },
              { name: 'Travel', path: '/offboarding/travel' },
              { name: 'Report:', path: '/offboarding/report' }
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
              { name: 'AI – Floating for anything to ask', path: '/huremaso-ai' },
              { name: 'Payroll in OneTap', path: '/payroll/one-tap' },
              { name: 'Employee Finance Requests', path: '/time/finance-request' },
              { name: 'Employee Benefits Advance', path: '/payroll/benefit-advance' },
              { name: 'Employee Benefits', path: '/payroll/employee-benefits' },
              { name: 'Performance Benefits', path: '/payroll/performance-benefits' },
              { name: 'Other Benefits', path: '/payroll/other-benefits' },
              { name: 'Salary Disbursement', path: '/payroll/salary-disbursement' },
              { name: 'Payment Application', path: '/payroll/payment-application' }
            ]}
          />

          {/* Performance appraisal */}
          <SidebarNavGroup
            label="Performance appraisal"
            icon={BarChart3}
            groupKey="performanceAppraisalGroup"
            isGroupActive={isPerformanceAppraisalActive}
            isChildActive={isPerformanceAppraisalChildActive}
            isOpen={isOpen}
            isExpanded={expandedGroups.performanceAppraisalGroup}
            onToggle={toggleGroup}
            location={location}
            items={[
              { name: 'Lists – reports – AI page', path: '/performance-appraisal/reports-ai' },
              { name: 'Attendance and time', path: '/performance-appraisal/attendance-time' },
              { name: 'Smart work', path: '/performance-appraisal/smart-work' },
              { name: 'Psychometric assessments', path: '/performance-appraisal/psychometric' },
              { name: 'E-SOPs', path: '/performance-appraisal/e-sops' },
              { name: 'Performance Review', path: '/performance-appraisal/review' },
              { name: 'References and recommendations', path: '/performance-appraisal/references' },
              { name: 'Special Strategy Program', path: '/performance-appraisal/strategy' },
              { name: 'Reports and analytics - AI', path: '/performance-appraisal/analytics-ai' }
            ]}
          />

          {/* HR Letters & Memos */}
          <SidebarNavGroup
            label="HR Letters & Memos"
            icon={FileText}
            groupKey="hrLettersMemosGroup"
            isGroupActive={isHrLettersMemosActive}
            isChildActive={isHrLettersMemosChildActive}
            isOpen={isOpen}
            isExpanded={expandedGroups.hrLettersMemosGroup}
            onToggle={toggleGroup}
            location={location}
            items={[
              { name: 'Memo', path: '/hr-letters-memos/memo' }
            ]}
          />

          {/* Events */}
          <SidebarNavGroup
            label="Events"
            icon={Calendar}
            groupKey="eventsGroup"
            isGroupActive={isEventsActive}
            isChildActive={isEventsChildActive}
            isOpen={isOpen}
            isExpanded={expandedGroups.eventsGroup}
            onToggle={toggleGroup}
            location={location}
            items={[
              { name: 'All Events', path: '/events/all' },
              { name: 'Support Events', path: '/events/support' },
              { name: 'Events news letter', path: '/events/newsletter' },
              { name: 'add/Mange Events', path: '/events/add' },
              { name: 'Events Callender', path: '/events/calendar' },
              { name: 'Budget', path: '/events/budget' }
            ]}
          />

          {/* Employee App Management */}
          <SidebarNavGroup
            label="Employee App Management"
            icon={User}
            groupKey="employeeAppGroup"
            isGroupActive={isEmployeeAppActive}
            isChildActive={isEmployeeAppChildActive}
            isOpen={isOpen}
            isExpanded={expandedGroups.employeeAppGroup}
            onToggle={toggleGroup}
            location={location}
            items={[
              { name: 'Employee Self Service', path: '/self-service' }
            ]}
          />

          {/* Employee Wellness & Development */}
          <SidebarNavGroup
            label="Employee Wellness & Development"
            icon={Heart}
            groupKey="wellnessGroup"
            isGroupActive={isWellnessActive}
            isChildActive={isWellnessChildActive}
            isOpen={isOpen}
            isExpanded={expandedGroups.wellnessGroup}
            onToggle={toggleGroup}
            location={location}
            items={[
              { name: 'Financial Incentives', path: '/wellness/financial-incentives' },
              { name: 'Employee Development', path: '/wellness/employee-development' },
              { name: 'Health & Wellness', path: '/wellness/health-wellness' },
              { name: 'Workplace Life Balance', path: '/wellness/workplace-life-balance' }
            ]}
          />

          {/* Reporting and Analytics */}
          <SidebarNavLink to="/documents" icon={BarChart3} label="Reporting and Analytics" isOpen={isOpen} />

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
              { name: 'Employee App', path: '/notifications/employee-app' },
              { name: 'Huremaso', path: '/notifications/huremaso' }
            ]}
          />

          {/* Miscellaneous Request */}
          <SidebarNavLink to="/support" icon={Mail} label="Miscellaneous Request" isOpen={isOpen} />

          {/* Monitoring Inhouse Association */}
          <SidebarNavGroup
            label="Monitoring Inhouse Association"
            icon={LinkIcon}
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

          {/* Time & Attendance */}
          <SidebarNavGroup
            label="Time & Attendance"
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
              { name: 'Project Info', path: '/time/project-info' },
              { name: 'Payroll', path: '/time/payroll' },
              { name: 'OT', path: '/time/overtime' },
              { name: 'Replacement', path: '/time/replacement' },
              { name: 'Leave Salary', path: '/time/leave-salary' }
            ]}
          />

          {/* Maintenance */}
          <SidebarNavGroup
            label="Maintenance"
            icon={Wrench}
            groupKey="maintenanceGroup"
            isGroupActive={isMaintenanceActive}
            isChildActive={isMaintenanceChildActive}
            isOpen={isOpen}
            isExpanded={expandedGroups.maintenanceGroup}
            onToggle={toggleGroup}
            location={location}
            items={[
              { name: 'Active support ticket', path: '/maintenance/tickets' },
              { name: 'Huremaso', path: '/maintenance/huremaso' }
            ]}
          />

          {/* Support */}
          <SidebarNavGroup
            label="Support"
            icon={HelpCircle}
            groupKey="supportGroup"
            isGroupActive={isSupportActive}
            isChildActive={isSupportChildActive}
            isOpen={isOpen}
            isExpanded={expandedGroups.supportGroup}
            onToggle={toggleGroup}
            location={location}
            items={[
              { name: 'Support', path: '/support/general' },
              { name: 'Maintenance', path: '/support/maintenance' },
              { name: 'Help', path: '/support/help' },
              { name: 'Tickets', path: '/support/tickets' },
              { name: 'Contact', path: '/support/contact' }
            ]}
          />

        </div>

        {/* Bottom User Profile Section (HUREMASO) */}
        <div className="relative p-3 border-t border-slate-200 bg-slate-50/50 shrink-0">
          {showProfileModal && (
            <div className="absolute bottom-16 left-3 right-3 z-50 bg-white rounded-3xl p-4 shadow-2xl border border-slate-200 text-slate-800 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
              {/* Header Info */}
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="Sarah Joseph" 
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-sm font-bold text-slate-900 leading-tight truncate">Sarah Joseph</h4>
                  <p className="text-[11px] font-medium text-slate-500 truncate">sarah.j@company.com</p>
                </div>
              </div>

              {/* Sign Out Action */}
              <div className="pt-2 border-t border-slate-100">
                <button 
                  onClick={() => {
                    setShowProfileModal(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2.5 p-3 rounded-2xl bg-rose-50/80 hover:bg-rose-100/80 border border-rose-100 text-rose-600 transition-all cursor-pointer group"
                >
                  <LogOut className="w-4.5 h-4.5 text-rose-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-rose-600">Sign Out</span>
                </button>
              </div>
            </div>
          )}

          <button 
            onClick={() => setShowProfileModal(!showProfileModal)}
            className="w-full flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-200/60 transition-colors cursor-pointer select-none"
          >
            <div className="relative shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Sarah Joseph" 
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            {isOpen && (
              <div className="flex-1 text-left truncate min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">HUREMASO</div>
                <div className="text-[10px] font-medium text-slate-500 truncate">Sarah Joseph</div>
              </div>
            )}
            {isOpen && (
              <ChevronsUpDown className="w-4 h-4 text-slate-400 shrink-0 ml-auto" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;


