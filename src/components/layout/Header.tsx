import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen, onLogout }) => {
  const location = useLocation();
  const hideSearch = location.pathname === '/employees/list' || location.pathname === '/employees';

  return (
    <header 
      className={`fixed top-0 right-0 z-20 flex h-16 items-center justify-between border-b border-slate-150 bg-white px-8 transition-all duration-300 ${
        sidebarOpen ? 'left-72' : 'left-20'
      }`}
    >
      {/* Left side: Search input matching Figma layout */}
      <div className="flex-1 max-w-md">
        {!hideSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-800" />
            <input 
              type="text" 
              placeholder="Search........" 
              className="w-full pl-9 pr-4 py-2 border border-slate-700 bg-white rounded-lg text-xs font-semibold text-black outline-none focus:border-slate-800 placeholder:text-slate-500"
            />
          </div>
        )}
      </div>

      {/* Right side: profile icon followed by notification icon */}
      <div className="flex items-center gap-3">
        {/* Profile Avatar (Sarah Joseph) */}
        <button 
          onClick={onLogout}
          className="h-9 w-9 rounded-full overflow-hidden border border-slate-200 hover:border-slate-300 transition-all cursor-pointer bg-slate-100 flex items-center justify-center font-bold text-xs"
          title="Log Out of Demo"
        >
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="Sarah Joseph"
            className="h-full w-full object-cover"
          />
        </button>

        {/* Bell Notification icon inside a bordered card */}
        <div className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center relative hover:bg-slate-50 cursor-pointer">
          <Bell className="h-4 w-4 text-slate-500" />
        </div>
      </div>
    </header>
  );
};
export default Header;
