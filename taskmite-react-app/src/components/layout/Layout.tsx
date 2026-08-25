import { useState, type ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { ToastContainer } from '../common/Toast'
import './Layout.css'

export interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="app-shell">
      <Header onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)} />
      <div className="app-body">
        <Sidebar isMobileOpen={mobileSidebarOpen} onCloseMobile={() => setMobileSidebarOpen(false)} />
        <main className="app-content">{children}</main>
      </div>
      <ToastContainer />
    </div>
  )
}
