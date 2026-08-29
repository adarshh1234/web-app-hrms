import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Search, Bell, Menu, User, Briefcase, HardDrive, LogOut } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleMobile: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen, onToggleMobile, onLogout }) => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const hideSearch = location.pathname === '/employees/list' || location.pathname === '/employees';

  return (
    <header 
      className={`fixed top-0 right-0 z-20 flex h-16 items-center justify-between border-b border-slate-150 bg-white px-4 md:px-8 transition-all duration-300 ${
        sidebarOpen ? 'left-0 md:left-72' : 'left-0 md:left-20'
      }`}
    >
      <div className="flex items-center gap-3 flex-1 max-w-md">
        {/* Mobile: toggle mobile drawer */}
        <button
          onClick={onToggleMobile}
          className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors md:hidden"
          title="Toggle Sidebar"
        >
          <Menu className="h-4 w-4" />
        </button>
        {/* Desktop: toggle sidebar collapse */}
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors hidden md:inline-flex"
          title="Toggle Sidebar"
        >
          <Menu className="h-4 w-4" />
        </button>
        {!hideSearch && (
          <div className="relative flex-1">
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
      <div className="flex items-center gap-3 relative">
        {/* Profile Avatar (Sarah Joseph) */}
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="h-9 w-9 rounded-full overflow-hidden border border-slate-200 hover:border-slate-300 transition-all cursor-pointer bg-slate-100 flex items-center justify-center font-bold text-xs relative"
          title="User Profile"
        >
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="Sarah Joseph"
            className="h-full w-full object-cover"
          />
        </button>

        {/* Profile Popover Modal */}
        {showDropdown && (
          <div className="absolute top-12 right-0 z-50 w-64 bg-white rounded-3xl p-4 shadow-2xl border border-slate-200 text-slate-800 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
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
                  setShowDropdown(false);
                  onLogout();
                }}
                className="w-full flex items-center justify-center gap-2.5 p-3 rounded-2xl bg-rose-50/80 hover:bg-rose-100/80 border border-rose-100 text-rose-600 transition-all cursor-pointer group"
              >
                <LogOut className="w-4.5 h-4.5 text-rose-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-rose-600">Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Bell Notification icon inside a bordered card */}
        <div className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center relative hover:bg-slate-50 cursor-pointer">
          <Bell className="h-4 w-4 text-slate-500" />
        </div>
      </div>
    </header>
  );
};
export default Header;
