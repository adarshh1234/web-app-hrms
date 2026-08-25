export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastMessage {
  id: string
  message: string
  type: ToastType
  duration?: number
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

export interface ServiceState<T> {
  data: T | null
  status: AsyncStatus
  error: string | null
}
