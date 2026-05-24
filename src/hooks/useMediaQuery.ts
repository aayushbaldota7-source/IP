import { useState, useEffect } from 'react'

/**
 * Returns true when the media query matches.
 * Automatically re-evaluates when the viewport changes.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)

    // Modern API
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    } else {
      // Legacy fallback
      mql.addListener(onChange)
      return () => mql.removeListener(onChange)
    }
  }, [query])

  return matches
}

// Convenience hooks
export const useIsMobile  = () => useMediaQuery('(max-width: 639px)')
export const useIsTablet  = () => useMediaQuery('(min-width: 640px) and (max-width: 1023px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
