import React, { lazy, Suspense } from 'react'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import {
  HomeIcon,
  BriefcaseIcon,
  FunnelIcon,
  WrenchIcon,
  HistoryIcon,
  BellIcon,
  GearIcon,
} from './components/Icons'
import { Loader } from './components/Loader'
import './styles/profile.css'

const Home = lazy(() => import('./pages/Home'))
const PersonalInfo = lazy(() => import('./pages/PersonalInfo'))
const DataPersonalization = lazy(() => import('./pages/DataPersonalization'))
const Security = lazy(() => import('./pages/Security'))
const PeopleSharing = lazy(() => import('./pages/PeopleSharing'))
const PaymentsSubscription = lazy(() => import('./pages/PaymentsSubscription'))
const Help = lazy(() => import('./pages/Help'))

export const ProfilePage: React.FC = () => {
  const tabs = [
    { path: '/profile/home', label: 'Home', icon: HomeIcon },
    { path: '/profile/info', label: 'Personal Info', icon: BriefcaseIcon },
    { path: '/profile/data', label: 'Data & Personalization', icon: FunnelIcon },
    { path: '/profile/security', label: 'Security', icon: WrenchIcon },
    { path: '/profile/people', label: 'People & Sharing', icon: HistoryIcon },
    { path: '/profile/payments', label: 'Payments & Subscription', icon: BellIcon },
    { path: '/profile/help', label: 'Help', icon: GearIcon },
  ]

  return (
    <div className="taskmite-profile-wrapper">
      {/* Sub Navigation Bar for Taskmite Profile Module */}
      <nav className="profile-subnav" aria-label="Profile navigation">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `profile-subnav-item ${isActive ? 'active' : ''}`
            }
          >
            <tab.icon className="profile-subnav-icon" />
            <span>{tab.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Sub Page Content */}
      <Suspense fallback={<Loader text="Loading profile section..." />}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="info" element={<PersonalInfo />} />
          <Route path="data" element={<DataPersonalization />} />
          <Route path="security" element={<Security />} />
          <Route path="people" element={<PeopleSharing />} />
          <Route path="payments" element={<PaymentsSubscription />} />
          <Route path="help" element={<Help />} />
          <Route path="*" element={<Navigate to="home" replace />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default ProfilePage
