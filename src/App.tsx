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
const RecruitmentPage = lazy(() => import('./modules/recruitment/RecruitmentPage'));
const TimePage = lazy(() => import('./modules/time/TimePage'));
const TimesheetsPage = lazy(() => import('./modules/time/TimesheetsPage'));
const AttendancePage = lazy(() => import('./modules/time/AttendancePage'));
const ReportPage = lazy(() => import('./modules/time/ReportPage'));
const ProjectInfoPage = lazy(() => import('./modules/time/ProjectInfoPage'));
const WakeOffPage = lazy(() => import('./modules/time/WakeOffPage'));
const TimeOffRequestPage = lazy(() => import('./modules/time/TimeOffRequestPage'));
const EmployeeFinanceRequestsPage = lazy(() => import('./modules/time/EmployeeFinanceRequestsPage'));
const PayrollOneTapPage = lazy(() => import('./modules/payroll/PayrollOneTapPage'));
const PayrollBenefitAdvancePage = lazy(() => import('./modules/payroll/PayrollBenefitAdvancePage'));
const SupportEventsPage = lazy(() => import('./modules/events/SupportEventsPage'));
const AllEventsPage = lazy(() => import('./modules/events/AllEventsPage'));
const AddEventPage = lazy(() => import('./modules/events/AddEventPage'));
const EventsCalendarPage = lazy(() => import('./modules/events/EventsCalendarPage'));
const EventsNewsletterPage = lazy(() => import('./modules/events/EventsNewsletterPage'));
const EventsBudgetPage = lazy(() => import('./modules/events/EventsBudgetPage'));
const PerformancePage = lazy(() => import('./modules/performance/PerformancePage'));
const MyInfoPage = lazy(() => import('./modules/my-info/MyInfoPage'));
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
const NationalitiesPage = lazy(() => import('./modules/admin/NationalitiesPage'));
const BrandingPage = lazy(() => import('./modules/admin/BrandingPage'));
const SupportPage = lazy(() => import('./modules/support/SupportPage'));
const MaintenancePage = lazy(() => import('./modules/support/MaintenancePage'));
const NewAssociationRequestPage = lazy(() => import('./modules/association/NewAssociationRequestPage'));
const ExistingAssociationPage = lazy(() => import('./modules/association/ExistingAssociationPage'));

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
            <Route path="/ai" element={<Navigate to="/ai/predictive-analytics" replace />} />
            <Route path="/ai/predictive-analytics" element={<HuremasoAIPage />} />
            <Route path="/ai/autonomous-performance" element={<HuremasoAIPage />} />
            <Route path="/ai/employee-experience" element={<HuremasoAIPage />} />
            <Route path="/ai/automated-compliance" element={<HuremasoAIPage />} />
            
            {/* Employee Management Nested Routes */}
            <Route path="/employees" element={<Navigate to="/employees/list" replace />} />
            <Route path="/employees/list" element={<EmployeePage />} />
            <Route path="/employees/probation" element={<EmployeePage />} />
            <Route path="/employees/training" element={<EmployeePage />} />
            <Route path="/employees/interns" element={<EmployeePage />} />
            <Route path="/employees/department" element={<DepartmentPage />} />
            <Route path="/employees/location" element={<LocationPage />} />
            <Route path="/employees/projects" element={<ProjectInfoPage />} />
            <Route path="/employees/documents" element={<EmployeeDocumentsPage />} />
            <Route path="/employees/config" element={<EmployeeConfigPage />} />
            <Route path="/employees/config/optional" element={<EmployeeConfigPage />} />
            <Route path="/employees/config/custom" element={<EmployeeConfigPage />} />
            <Route path="/employees/config/import" element={<EmployeeConfigPage />} />
            <Route path="/employees/config/reporting" element={<EmployeeConfigPage />} />
            <Route path="/employees/config/termination" element={<EmployeeConfigPage />} />
            <Route path="/employees/report" element={<EmployeeReportPage />} />

            <Route path="/recruitment" element={<RecruitmentPage />} />
            <Route path="/payroll" element={<Navigate to="/payroll/one-tap" replace />} />
            <Route path="/payroll/one-tap" element={<PayrollOneTapPage />} />
            <Route path="/payroll/benefit-advance" element={<PayrollBenefitAdvancePage />} />
            <Route path="/leave" element={<LeavePage />} />
            
            {/* Time & Attendance Nested Routes */}
            <Route path="/time" element={<Navigate to="/time/overtime-pool" replace />} />
            <Route path="/time/overtime-pool" element={<TimePage />} />
            <Route path="/time/timesheets" element={<TimesheetsPage />} />
            <Route path="/time/attendance" element={<AttendancePage />} />
            <Route path="/time/report" element={<ReportPage />} />
            <Route path="/time/project-info" element={<ProjectInfoPage />} />
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
            <Route path="/my-info" element={<MyInfoPage />} />
            <Route path="/self-service" element={<Navigate to="/self-service/travel" replace />} />
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
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/admin" element={<Navigate to="/admin/user-management" replace />} />
            <Route path="/admin/user-management" element={<UserManagementPage />} />
            <Route path="/admin/job" element={<JobConfigPage />} />
            <Route path="/admin/organization" element={<AdminPage />} />
            <Route path="/admin/qualification" element={<QualificationPage />} />
            <Route path="/admin/nationalities" element={<NationalitiesPage />} />
            <Route path="/admin/branding" element={<BrandingPage />} />
            <Route path="/admin/configuration" element={<ConfigurationPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/association" element={<Navigate to="/association/new" replace />} />
            <Route path="/association/new" element={<NewAssociationRequestPage />} />
            <Route path="/association/existing" element={<ExistingAssociationPage />} />
            
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
