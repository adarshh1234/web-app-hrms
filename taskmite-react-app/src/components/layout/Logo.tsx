import './Logo.css'

export interface LogoProps {
  className?: string
  onClick?: () => void
}

export function Logo({ className = '', onClick }: LogoProps) {
  return (
    <div className={`letgetin-logo ${className}`} onClick={onClick} role="banner">
      <div className="letgetin-logo-badge">
        <span className="letgetin-logo-letter">L</span>
      </div>
      <div className="letgetin-logo-text">
        <span className="letgetin-text-let">Let</span>
        <span className="letgetin-text-getin">GetIn</span>
      </div>
    </div>
  )
}
