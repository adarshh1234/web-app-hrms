import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Loader from './components/common/Loader';

// Lazy loading route components for performance & bundle splitting
const LoginPage = lazy(() => import('./modules/login/LoginPage'));
const DashboardPage = lazy(() => import('./modules/dashboard/DashboardPage'));
const HuremasoAIPage = lazy(() => import('./modules/ai/HuremasoAIPage'));
const EmployeePage = lazy(() => import('./modules/employees/EmployeePage'));
const EmployeeDocumentsPage = lazy(() => import('./modules/employees/EmployeeDocumentsPage'));
const EmployeeConfigPage = lazy(() => import('./modules/employees/EmployeeConfigPage'));
const EmployeeReportPage = lazy(() => import('./modules/employees/EmployeeReportPage'));
const DepartmentPage = lazy(() => import('./modules/employees/DepartmentPage'));
const LocationPage = lazy(() => import('./modules/employees/LocationPage'));
const LegalPage = lazy(() => import('./modules/employees/LegalPage'));
const RecruitmentPage = lazy(() => import('./modules/recruitment/RecruitmentPage'));
const TimePage = lazy(() => import('./modules/time/TimePage'));
const TimesheetsPage = lazy(() => import('./modules/time/TimesheetsPage'));
const AttendancePage = lazy(() => import('./modules/time/AttendancePage'));
const ReportPage = lazy(() => import('./modules/time/ReportPage'));
const ProjectInfoPage = lazy(() => import('./modules/time/ProjectInfoPage'));
const WakeOffPage = lazy(() => import('./modules/time/WakeOffPage'));
const TimeOffRequestPage = lazy(() => import('./modules/time/TimeOffRequestPage'));
const EmployeeFinanceRequestsPage = lazy(() => import('./modules/time/EmployeeFinanceRequestsPage'));
const TimePayrollPage = lazy(() => import('./modules/time/TimePayrollPage'));
const TimeOvertimePage = lazy(() => import('./modules/time/TimeOvertimePage'));
const TimeReplacementPage = lazy(() => import('./modules/time/TimeReplacementPage'));
const TimeLeaveSalaryPage = lazy(() => import('./modules/time/TimeLeaveSalaryPage'));
const PayrollOneTapPage = lazy(() => import('./modules/payroll/PayrollOneTapPage'));
const PayrollBenefitAdvancePage = lazy(() => import('./modules/payroll/PayrollBenefitAdvancePage'));
const SupportEventsPage = lazy(() => import('./modules/events/SupportEventsPage'));
const AllEventsPage = lazy(() => import('./modules/events/AllEventsPage'));
const AddEventPage = lazy(() => import('./modules/events/AddEventPage'));
const EventsCalendarPage = lazy(() => import('./modules/events/EventsCalendarPage'));
const EventsNewsletterPage = lazy(() => import('./modules/events/EventsNewsletterPage'));
const EventsBudgetPage = lazy(() => import('./modules/events/EventsBudgetPage'));
const PerformancePage = lazy(() => import('./modules/performance/PerformancePage'));
const PerformanceAppraisalPage = lazy(() => import('./modules/performance/PerformanceAppraisalPage'));
const EmployeeOnboardingPage = lazy(() => import('./modules/recruitment/EmployeeOnboardingPage'));
const EmployeeOffBoardingPage = lazy(() => import('./modules/recruitment/EmployeeOffBoardingPage'));
const CallenderPage = lazy(() => import('./modules/calendar/CallenderPage'));
const NotesPage = lazy(() => import('./modules/notes/NotesPage'));
const TasksPage = lazy(() => import('./modules/tasks/TasksPage'));
const HrLettersMemosPage = lazy(() => import('./modules/self-service/HrLettersMemosPage'));
const MyInfoPage = lazy(() => import('./modules/my-info/MyInfoPage'));
const EmployeeSelfServicePage = lazy(() => import('./modules/self-service/EmployeeSelfServicePage'));
const WellnessFinancialIncentivesPage = lazy(() => import('./modules/wellness/WellnessFinancialIncentivesPage'));
const WellnessEmployeeDevelopmentPage = lazy(() => import('./modules/wellness/WellnessEmployeeDevelopmentPage'));
const WellnessHealthPage = lazy(() => import('./modules/wellness/WellnessHealthPage'));
const WellnessWorkplaceBalancePage = lazy(() => import('./modules/wellness/WellnessWorkplaceBalancePage'));
const TravelDocumentsPage = lazy(() => import('./modules/self-service/TravelDocumentsPage'));
const CompanyDocCenterPage = lazy(() => import('./modules/self-service/CompanyDocCenterPage'));
const HRLettersPage = lazy(() => import('./modules/self-service/HRLettersPage'));
const MassMessagesPage = lazy(() => import('./modules/self-service/MassMessagesPage'));
const LeavePage = lazy(() => import('./modules/self-service/LeavePage'));
const NotificationsPage = lazy(() => import('./modules/messaging/NotificationsPage'));
const DocumentsPage = lazy(() => import('./modules/documents/DocumentsPage'));
const AdminPage = lazy(() => import('./modules/admin/AdminPage'));
const UserManagementPage = lazy(() => import('./modules/admin/UserManagementPage'));
const JobConfigPage = lazy(() => import('./modules/admin/JobConfigPage'));
const ConfigurationPage = lazy(() => import('./modules/admin/ConfigurationPage'));
const QualificationPage = lazy(() => import('./modules/admin/QualificationPage'));
const OrganizationPage = lazy(() => import('./modules/admin/OrganizationPage'));
const NationalitiesPage = lazy(() => import('./modules/admin/NationalitiesPage'));
const BrandingPage = lazy(() => import('./modules/admin/BrandingPage'));
const SupportPage = lazy(() => import('./modules/support/SupportPage'));
const MaintenancePage = lazy(() => import('./modules/support/MaintenancePage'));
const NewAssociationRequestPage = lazy(() => import('./modules/association/NewAssociationRequestPage'));
const ExistingAssociationPage = lazy(() => import('./modules/association/ExistingAssociationPage'));
const ProfilePage = lazy(() => import('./modules/profile/ProfilePage'));

export const App: React.FC = () => {
  // Simple session authentication check using localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('hr_demo_auth') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('hr_demo_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('hr_demo_auth');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader fullScreen text="Loading HR Portal..." />}>
        <Routes>
          {/* Login Page */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            } 
          />

          {/* Core HR Application Routes */}
          <Route 
            element={
              <AppLayout 
                isAuthenticated={isAuthenticated} 
                onLogout={handleLogout} 
              />
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* HUREMASO+AI Routes */}
            <Route path="/huremaso-ai" element={<HuremasoAIPage />} />
            <Route path="/ai" element={<Navigate to="/huremaso-ai" replace />} />
            <Route path="/ai/predictive-analytics" element={<HuremasoAIPage />} />
            <Route path="/ai/autonomous-performance" element={<HuremasoAIPage />} />
            <Route path="/ai/employee-experience" element={<HuremasoAIPage />} />
            <Route path="/ai/automated-compliance" element={<HuremasoAIPage />} />

            {/* Callender, Notes & Tasks Routes */}
            <Route path="/callender" element={<CallenderPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/tasks" element={<Navigate to="/tasks/kanban" replace />} />
            <Route path="/tasks/kanban" element={<TasksPage />} />
            <Route path="/tasks/todo" element={<TasksPage />} />
            
            {/* Employee Management Nested Routes */}
            <Route path="/employees" element={<Navigate to="/employees/list" replace />} />
            <Route path="/employees/list" element={<EmployeePage />} />
            <Route path="/employees/probation" element={<EmployeePage />} />
            <Route path="/employees/training" element={<EmployeePage />} />
            <Route path="/employees/interns" element={<EmployeePage />} />
            <Route path="/employees/department" element={<DepartmentPage />} />
            <Route path="/employees/location" element={<LocationPage />} />
            <Route path="/employees/projects" element={<ProjectInfoPage />} />
            <Route path="/employees/legal" element={<LegalPage />} />
            <Route path="/employees/documents" element={<EmployeeDocumentsPage />} />
            <Route path="/employees/config" element={<EmployeeConfigPage />} />
            <Route path="/employees/config/optional" element={<EmployeeConfigPage />} />
            <Route path="/employees/config/custom" element={<EmployeeConfigPage />} />
            <Route path="/employees/config/import" element={<EmployeeConfigPage />} />
            <Route path="/employees/config/reporting" element={<EmployeeConfigPage />} />
            <Route path="/employees/config/termination" element={<EmployeeConfigPage />} />
            <Route path="/employees/report" element={<EmployeeReportPage />} />

            <Route path="/recruitment" element={<RecruitmentPage />} />
            <Route path="/recruitment/resume" element={<RecruitmentPage />} />
            <Route path="/onboarding" element={<Navigate to="/onboarding/final-list" replace />} />
            <Route path="/onboarding/final-list" element={<EmployeeOnboardingPage />} />
            <Route path="/onboarding/background-verification" element={<EmployeeOnboardingPage />} />
            <Route path="/onboarding/assessments" element={<EmployeeOnboardingPage />} />
            <Route path="/onboarding/offers" element={<EmployeeOnboardingPage />} />
            <Route path="/onboarding/documents" element={<EmployeeOnboardingPage />} />
            <Route path="/onboarding/provisions" element={<EmployeeOnboardingPage />} />
            <Route path="/onboarding/buddy-manager" element={<EmployeeOnboardingPage />} />
            <Route path="/onboarding/training" element={<EmployeeOnboardingPage />} />
            <Route path="/onboarding/visa-immigration" element={<EmployeeOnboardingPage />} />
            <Route path="/onboarding/insurance" element={<EmployeeOnboardingPage />} />
            <Route path="/onboarding/miscellaneous" element={<EmployeeOnboardingPage />} />
            <Route path="/onboarding/reports" element={<EmployeeOnboardingPage />} />
            <Route path="/offboarding" element={<Navigate to="/offboarding/document" replace />} />
            <Route path="/offboarding/document" element={<EmployeeOffBoardingPage />} />
            <Route path="/offboarding/performance" element={<EmployeeOffBoardingPage />} />
            <Route path="/offboarding/settlement" element={<EmployeeOffBoardingPage />} />
            <Route path="/offboarding/legal" element={<EmployeeOffBoardingPage />} />
            <Route path="/offboarding/assets" element={<EmployeeOffBoardingPage />} />
            <Route path="/offboarding/travel" element={<EmployeeOffBoardingPage />} />
            <Route path="/offboarding/report" element={<EmployeeOffBoardingPage />} />
            <Route path="/payroll" element={<Navigate to="/payroll/one-tap" replace />} />
            <Route path="/payroll/one-tap" element={<PayrollOneTapPage />} />
            <Route path="/payroll/benefit-advance" element={<PayrollBenefitAdvancePage />} />
            <Route path="/payroll/employee-benefits" element={<PayrollBenefitAdvancePage />} />
            <Route path="/payroll/performance-benefits" element={<PayrollBenefitAdvancePage />} />
            <Route path="/payroll/other-benefits" element={<PayrollBenefitAdvancePage />} />
            <Route path="/payroll/salary-disbursement" element={<PayrollBenefitAdvancePage />} />
            <Route path="/payroll/payment-application" element={<PayrollBenefitAdvancePage />} />
            <Route path="/leave" element={<LeavePage />} />
            
            {/* Time & Attendance Nested Routes */}
            <Route path="/time" element={<Navigate to="/time/timesheets" replace />} />
            <Route path="/time/overtime-pool" element={<TimePage />} />
            <Route path="/time/timesheets" element={<TimesheetsPage />} />
            <Route path="/time/attendance" element={<AttendancePage />} />
            <Route path="/time/report" element={<ReportPage />} />
            <Route path="/time/project-info" element={<ProjectInfoPage />} />
            <Route path="/time/payroll" element={<TimePayrollPage />} />
            <Route path="/time/overtime" element={<TimeOvertimePage />} />
            <Route path="/time/replacement" element={<TimeReplacementPage />} />
            <Route path="/time/leave-salary" element={<TimeLeaveSalaryPage />} />
            <Route path="/time/finance-request" element={<EmployeeFinanceRequestsPage />} />
            <Route path="/time/wake-off" element={<WakeOffPage />} />
            <Route path="/time/time-off" element={<TimeOffRequestPage />} />

            <Route path="/events" element={<Navigate to="/events/all" replace />} />
            <Route path="/events/all" element={<AllEventsPage />} />
            <Route path="/events/support" element={<SupportEventsPage />} />
            <Route path="/events/newsletter" element={<EventsNewsletterPage />} />
            <Route path="/events/add" element={<AddEventPage />} />
            <Route path="/events/calendar" element={<EventsCalendarPage />} />
            <Route path="/events/budget" element={<EventsBudgetPage />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/performance-appraisal" element={<Navigate to="/performance-appraisal/reports-ai" replace />} />
            <Route path="/performance-appraisal/reports-ai" element={<PerformanceAppraisalPage />} />
            <Route path="/performance-appraisal/attendance-time" element={<PerformanceAppraisalPage />} />
            <Route path="/performance-appraisal/smart-work" element={<PerformanceAppraisalPage />} />
            <Route path="/performance-appraisal/psychometric" element={<PerformanceAppraisalPage />} />
            <Route path="/performance-appraisal/e-sops" element={<PerformanceAppraisalPage />} />
            <Route path="/performance-appraisal/review" element={<PerformanceAppraisalPage />} />
            <Route path="/performance-appraisal/references" element={<PerformanceAppraisalPage />} />
            <Route path="/performance-appraisal/strategy" element={<PerformanceAppraisalPage />} />
            <Route path="/performance-appraisal/analytics-ai" element={<PerformanceAppraisalPage />} />
            <Route path="/hr-letters-memos" element={<Navigate to="/hr-letters-memos/memo" replace />} />
            <Route path="/hr-letters-memos/memo" element={<HrLettersMemosPage />} />
            <Route path="/my-info" element={<MyInfoPage />} />
            <Route path="/self-service" element={<EmployeeSelfServicePage />} />
            <Route path="/wellness" element={<Navigate to="/wellness/financial-incentives" replace />} />
            <Route path="/wellness/financial-incentives" element={<WellnessFinancialIncentivesPage />} />
            <Route path="/wellness/employee-development" element={<WellnessEmployeeDevelopmentPage />} />
            <Route path="/wellness/health-wellness" element={<WellnessHealthPage />} />
            <Route path="/wellness/workplace-life-balance" element={<WellnessWorkplaceBalancePage />} />
            <Route path="/self-service/travel" element={<TravelDocumentsPage />} />
            <Route path="/self-service/company-docs" element={<CompanyDocCenterPage />} />
            <Route path="/self-service/hr-letters" element={<HRLettersPage />} />
            <Route path="/self-service/mass-messages" element={<MassMessagesPage />} />
            <Route path="/self-service/leave" element={<LeavePage />} />
            <Route path="/messaging" element={<Navigate to="/notifications/email" replace />} />
            <Route path="/notifications/email" element={<NotificationsPage />} />
            <Route path="/notifications/sms" element={<NotificationsPage />} />
            <Route path="/notifications/whatsapp" element={<NotificationsPage />} />
            <Route path="/notifications/employee-app" element={<NotificationsPage />} />
            <Route path="/notifications/huremaso" element={<NotificationsPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/admin" element={<Navigate to="/admin/user-management" replace />} />
            <Route path="/admin/user-management" element={<UserManagementPage />} />
            <Route path="/admin/job" element={<JobConfigPage />} />
            <Route path="/admin/organization" element={<OrganizationPage />} />
            <Route path="/admin/qualification" element={<QualificationPage />} />
            <Route path="/admin/nationalities" element={<NationalitiesPage />} />
            <Route path="/admin/branding" element={<BrandingPage />} />
            <Route path="/admin/configuration" element={<ConfigurationPage />} />
            <Route path="/support" element={<Navigate to="/support/general" replace />} />
            <Route path="/support/general" element={<SupportPage />} />
            <Route path="/support/maintenance" element={<SupportPage />} />
            <Route path="/support/help" element={<SupportPage />} />
            <Route path="/support/tickets" element={<SupportPage />} />
            <Route path="/support/contact" element={<SupportPage />} />
            <Route path="/maintenance" element={<Navigate to="/maintenance/tickets" replace />} />
            <Route path="/maintenance/tickets" element={<MaintenancePage />} />
            <Route path="/maintenance/huremaso" element={<MaintenancePage />} />
            <Route path="/association" element={<Navigate to="/association/new" replace />} />
            <Route path="/association/new" element={<NewAssociationRequestPage />} />
            <Route path="/association/existing" element={<ExistingAssociationPage />} />
            
            {/* Taskmite Integrated Profile Module Routes */}
            <Route path="/profile/*" element={<ProfilePage />} />
            <Route path="/profile" element={<Navigate to="/profile/home" replace />} />

            {/* Fallback Redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
