import { NavLink } from 'react-router-dom'
import type { NavItem } from '../../types/navigation.types'
import {
  HomeIcon,
  BriefcaseIcon,
  FunnelIcon,
  WrenchIcon,
  HistoryIcon,
  BellIcon,
  GearIcon,
  LogoutIcon,
} from '../common/Icons'
import { useToast } from '../../hooks/useToast'
import './Sidebar.css'

export const navItems: NavItem[] = [
  { id: 'nav_home', path: '/', iconLabel: 'Home', navLabel: 'Home', icon: HomeIcon },
  { id: 'nav_info', path: '/info', iconLabel: 'Personal Info', navLabel: 'Personal Info', icon: BriefcaseIcon },
  { id: 'nav_data', path: '/data', iconLabel: 'Data & Personalization', navLabel: 'Data & Personalization', icon: FunnelIcon },
  { id: 'nav_security', path: '/security', iconLabel: 'Security', navLabel: 'Security', icon: WrenchIcon },
  { id: 'nav_people', path: '/people', iconLabel: 'People & Sharing', navLabel: 'People & Sharing', icon: HistoryIcon },
  { id: 'nav_payments', path: '/payments', iconLabel: 'Payments & Subscription', navLabel: 'Payments & Subscription', icon: BellIcon },
  { id: 'nav_help', path: '/help', iconLabel: 'Help', navLabel: 'Help', icon: GearIcon },
]

export interface SidebarProps {
  isMobileOpen?: boolean
  onCloseMobile?: () => void
}

export function Sidebar({ isMobileOpen = false, onCloseMobile }: SidebarProps) {
  const { showToast } = useToast()

  const handleLogout = () => {
    showToast('Logged out successfully', 'success')
    if (onCloseMobile) onCloseMobile()
  }

  const handleNavClick = () => {
    if (onCloseMobile) onCloseMobile()
  }

  return (
    <>
      {isMobileOpen && <div className="sidebar-backdrop" onClick={onCloseMobile} />}
      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <nav className="icon-col">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  onClick={handleNavClick}
                  className={({ isActive }) => 'icon-item' + (isActive ? ' active' : '')}
                >
                  <item.icon className="icon-item-svg" />
                  <span className="icon-item-label">{item.iconLabel}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="icon-col-logout">
            <button type="button" className="icon-item logout" onClick={handleLogout}>
              <LogoutIcon className="icon-item-svg" />
              <span className="icon-item-label">Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  )
}
