import type { ReactNode } from 'react'
import { ChevronRightIcon } from './Icons'
import './Card.css'

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}

export function PageGrid({ children }: { children: ReactNode }) {
  return <div className="page-grid">{children}</div>
}

export function Card({
  title,
  description,
  graphic,
  footer,
  children,
  span,
}: {
  title: string
  description?: string
  graphic?: ReactNode
  footer?: ReactNode
  children?: ReactNode
  span?: 'full' | 'half'
}) {
  return (
    <section className={'card' + (span === 'full' ? ' card-full' : '')}>
      <div className="card-top">
        <div className="card-copy">
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {graphic && <div className="card-graphic">{graphic}</div>}
      </div>
      {children}
      {footer && <div className="card-footer">{footer}</div>}
    </section>
  )
}

export function CardRow({
  icon,
  label,
  value,
  onClick,
  chevron = true,
}: {
  icon?: ReactNode
  label: string
  value?: string
  onClick?: () => void
  chevron?: boolean
}) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag className="card-row" onClick={onClick} type={onClick ? 'button' : undefined}>
      <span className="card-row-left">
        {icon && <span className="card-row-icon">{icon}</span>}
        <span className="card-row-label">{label}</span>
      </span>
      <span className="card-row-right">
        {value && <span className="card-row-value">{value}</span>}
        {chevron && <ChevronRightIcon className="card-row-chevron" />}
      </span>
    </Tag>
  )
}
