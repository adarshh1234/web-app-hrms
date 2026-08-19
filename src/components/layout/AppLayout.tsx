import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { getBranding, saveBranding } from '../../data/mockData';

interface AppLayoutProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ isAuthenticated, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Initialise branding theme variables
    const branding = getBranding();
    saveBranding(branding);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        onLogout={onLogout} 
      />
      <Sidebar isOpen={sidebarOpen} />
      <main className={`transition-all duration-300 pt-16 ${sidebarOpen ? 'pl-72' : 'pl-20'}`}>
        <div className="p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default AppLayout;
