import { useState } from 'react'
import { Logo } from './Logo'
import { SearchIcon, GridIcon, RefreshIcon, MoreVerticalIcon } from '../common/Icons'
import { useToast } from '../../hooks/useToast'
import './Header.css'

export interface HeaderProps {
  onToggleMobileSidebar?: () => void
}

export function Header({ onToggleMobileSidebar }: HeaderProps) {
  const { showToast } = useToast()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleAction = (actionName: string) => {
    showToast(`${actionName} clicked`, 'info')
  }

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      showToast(`Searching for "${searchQuery}"...`, 'info')
    }
  }

  return (
    <header className="app-header">
      <div className="app-header-left">
        {onToggleMobileSidebar && (
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={onToggleMobileSidebar}
            aria-label="Toggle Navigation Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </button>
        )}
        <Logo />
      </div>
      <div className="app-header-actions">
        {isSearchOpen ? (
          <div className="header-search-expanded">
            <SearchIcon className="header-search-icon" />
            <input
              type="text"
              className="header-search-input"
              placeholder="Search LetGetIn account, settings, help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit()
                } else if (e.key === 'Escape') {
                  setIsSearchOpen(false)
                }
              }}
            />
            <button
              type="button"
              className="header-search-close"
              onClick={() => {
                setIsSearchOpen(false)
                setSearchQuery('')
              }}
              aria-label="Close search"
            >
              ✕
            </button>
          </div>
        ) : (
          <button type="button" aria-label="Search" onClick={() => setIsSearchOpen(true)}>
            <SearchIcon />
          </button>
        )}
        <button type="button" aria-label="Apps" onClick={() => handleAction('Apps')}>
          <GridIcon />
        </button>
        <button type="button" aria-label="Refresh" onClick={() => handleAction('Refresh')}>
          <RefreshIcon />
        </button>
        <button type="button" aria-label="More Options" onClick={() => handleAction('More Settings')}>
          <MoreVerticalIcon />
        </button>
      </div>
    </header>
  )
}
