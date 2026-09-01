import { useState, useEffect, useRef, useCallback } from 'react'

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

export function useFetchData<T>(fetchFn: () => Promise<T>, initialData: T | null = null) {
  const [data, setData] = useState<T | null>(initialData)
  const [status, setStatus] = useState<AsyncStatus>('loading')
  const [error, setError] = useState<string | null>(null)

  const fetchRef = useRef(fetchFn)
  useEffect(() => {
    fetchRef.current = fetchFn
  }, [fetchFn])

  const execute = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const result = await fetchRef.current()
      setData(result)
      setStatus('success')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An error occurred while loading data'
      setError(msg)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    execute()
  }, [execute])

  return {
    data,
    status,
    error,
    isLoading: status === 'loading',
    isError: status === 'error',
    isSuccess: status === 'success',
    refetch: execute,
    setData,
  }
}
