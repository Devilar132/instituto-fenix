import { useRef, useCallback } from 'react'

export function useThrottle<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 300
): T {
  const lastRun = useRef<number>(Date.now())

  const throttledFunc = useCallback(
    (...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        func(...args)
        lastRun.current = Date.now()
      }
    },
    [func, delay]
  ) as T

  return throttledFunc
}

