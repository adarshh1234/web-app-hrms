import type { ReactNode } from 'react'
import { ChevronRightIcon } from './Icons'

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="taskmite-page-header">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}

export function PageGrid({ children }: { children: ReactNode }) {
  return <div className="taskmite-page-grid">{children}</div>
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
    <section className={'taskmite-card' + (span === 'full' ? ' card-full' : '')}>
      <div className="taskmite-card-top">
        <div className="taskmite-card-copy">
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {graphic && <div className="taskmite-card-graphic">{graphic}</div>}
      </div>
      {children}
      {footer && <div className="taskmite-card-footer">{footer}</div>}
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
    <Tag className="taskmite-card-row" onClick={onClick} type={onClick ? 'button' : undefined}>
      <span className="taskmite-card-row-left">
        {icon && <span className="taskmite-card-row-icon">{icon}</span>}
        <span className="taskmite-card-row-label">{label}</span>
      </span>
      <span className="taskmite-card-row-right">
        {value && <span className="taskmite-card-row-value">{value}</span>}
        {chevron && <ChevronRightIcon className="taskmite-card-row-chevron" />}
      </span>
    </Tag>
  )
}
