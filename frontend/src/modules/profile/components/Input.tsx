import type { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id || (label ? `input_${label.replace(/\s+/g, '_').toLowerCase()}` : undefined)

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <input id={inputId} className={`input-control ${className}`} {...props} />
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  )
}
