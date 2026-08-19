import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './modules/login/LoginPage';
import DashboardPage from './modules/dashboard/DashboardPage';
import EmployeePage from './modules/employees/EmployeePage';
import EmployeeDocumentsPage from './modules/employees/EmployeeDocumentsPage';
import EmployeeConfigPage from './modules/employees/EmployeeConfigPage';
import EmployeeReportPage from './modules/employees/EmployeeReportPage';
import RecruitmentPage from './modules/recruitment/RecruitmentPage';
import TimePage from './modules/time/TimePage';
import TimesheetsPage from './modules/time/TimesheetsPage';
import AttendancePage from './modules/time/AttendancePage';
import ReportPage from './modules/time/ReportPage';
import ProjectInfoPage from './modules/time/ProjectInfoPage';
import WakeOffPage from './modules/time/WakeOffPage';
import TimeOffRequestPage from './modules/time/TimeOffRequestPage';
import EmployeeFinanceRequestsPage from './modules/time/EmployeeFinanceRequestsPage';
import PayrollOneTapPage from './modules/payroll/PayrollOneTapPage';
import PayrollBenefitAdvancePage from './modules/payroll/PayrollBenefitAdvancePage';
import SupportEventsPage from './modules/events/SupportEventsPage';
import AllEventsPage from './modules/events/AllEventsPage';
import AddEventPage from './modules/events/AddEventPage';
import EventsCalendarPage from './modules/events/EventsCalendarPage';
import PerformancePage from './modules/performance/PerformancePage';
import MyInfoPage from './modules/my-info/MyInfoPage';
import TravelDocumentsPage from './modules/self-service/TravelDocumentsPage';
import CompanyDocCenterPage from './modules/self-service/CompanyDocCenterPage';
import HRLettersPage from './modules/self-service/HRLettersPage';
import MassMessagesPage from './modules/self-service/MassMessagesPage';
import LeavePage from './modules/self-service/LeavePage';
import MessagingPage from './modules/messaging/MessagingPage';
import NotificationsPage from './modules/messaging/NotificationsPage';
import DocumentsPage from './modules/documents/DocumentsPage';
import AdminPage from './modules/admin/AdminPage';
import UserManagementPage from './modules/admin/UserManagementPage';
import JobConfigPage from './modules/admin/JobConfigPage';
import ConfigurationPage from './modules/admin/ConfigurationPage';
import QualificationPage from './modules/admin/QualificationPage';
import NationalitiesPage from './modules/admin/NationalitiesPage';
import BrandingPage from './modules/admin/BrandingPage';
import SupportPage from './modules/support/SupportPage';
import MaintenancePage from './modules/support/MaintenancePage';
import NewAssociationRequestPage from './modules/association/NewAssociationRequestPage';
import ExistingAssociationPage from './modules/association/ExistingAssociationPage';

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
          
          {/* Employee Management Nested Routes */}
          <Route path="/employees" element={<Navigate to="/employees/list" replace />} />
          <Route path="/employees/list" element={<EmployeePage />} />
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

          <Route path="/events" element={<Navigate to="/events/support" replace />} />
          <Route path="/events/support" element={<SupportEventsPage />} />
          <Route path="/events/all" element={<AllEventsPage />} />
          <Route path="/events/add" element={<AddEventPage />} />
          <Route path="/events/calendar" element={<EventsCalendarPage />} />
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
    </BrowserRouter>
  );
};

export default App;
