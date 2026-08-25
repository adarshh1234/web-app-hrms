import { useToast } from '../../hooks/useToast'
import './Toast.css'

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item toast-${toast.type}`}>
          <div className="toast-content">
            <span>
              {toast.type === 'success' && '✅'}
              {toast.type === 'error' && '⚠️'}
              {toast.type === 'warning' && '⚡'}
              {toast.type === 'info' && 'ℹ️'}
            </span>
            <span>{toast.message}</span>
          </div>
          <button
            type="button"
            className="toast-close-btn"
            onClick={() => removeToast(toast.id)}
            aria-label="Close alert notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
