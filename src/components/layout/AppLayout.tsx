import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import adminService from '../../services/adminService';
import { ToastProvider } from '../../context/ToastContext';

interface AppLayoutProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ isAuthenticated, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Initialise branding theme variables
    const branding = adminService.getBranding();
    adminService.updateBranding(branding);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname, location.search]);

  const closeMobileSidebar = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-50">
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          onToggleMobile={() => setIsMobileOpen(prev => !prev)}
          onLogout={onLogout} 
        />
        <Sidebar isOpen={sidebarOpen} isMobileOpen={isMobileOpen} onClose={closeMobileSidebar} onLogout={onLogout} />
        <main className={`transition-all duration-300 pt-16 ${sidebarOpen ? 'pl-0 md:pl-72' : 'pl-0 md:pl-20'}`}>
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </ToastProvider>
  );
};
export default AppLayout;

