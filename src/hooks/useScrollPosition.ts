import { useState, useEffect } from 'react'

interface ScrollPosition {
  scrollY: number
  scrollX: number
  isScrolled: boolean         // > 10px
  isScrolledFar: boolean      // > 200px
  scrollDirection: 'up' | 'down' | null
  scrollProgress: number      // 0 – 100 (%)
}

/**
 * Tracks window scroll position, direction, and progress.
 * Uses requestAnimationFrame for performance.
 */
export function useScrollPosition(threshold = 10): ScrollPosition {
  const [state, setState] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    isScrolled: false,
    isScrolledFar: false,
    scrollDirection: null,
    scrollProgress: 0,
  })

  useEffect(() => {
    let prevScrollY = window.scrollY
    let ticking = false

    const update = () => {
      const scrollY = window.scrollY
      const scrollX = window.scrollX
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = maxScroll > 0 ? Math.round((scrollY / maxScroll) * 100) : 0
      const scrollDirection = scrollY > prevScrollY ? 'down' : scrollY < prevScrollY ? 'up' : null

      setState({
        scrollY,
        scrollX,
        isScrolled: scrollY > threshold,
        isScrolledFar: scrollY > 200,
        scrollDirection,
        scrollProgress,
      })

      prevScrollY = scrollY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return state
}
