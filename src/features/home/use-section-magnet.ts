import { useEffect } from 'react'

/** Milliseconds the page must stay still before it snaps. */
const IDLE_DELAY = 500

/**
 * Scrolls to the top of the nearest `[data-magnet]` section once the user stops scrolling
 * close to it. Does nothing when the user prefers reduced motion.
 */
export function useSectionMagnet() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let timer: number | undefined

    const snap = () => {
      const sections = [...document.querySelectorAll<HTMLElement>('[data-magnet]')]
      const scrollTop = window.scrollY
      const target = sections.find((section, index) => {
        const { offsetTop: top, offsetHeight: height } = section
        const isFirst = index === 0
        const isLast = index === sections.length - 1
        const above = scrollTop > top - (isFirst ? 50 : height / 2)
        const below = scrollTop < top + (isLast ? height / 3 : height / 2)
        return above && below
      })
      if (target && target.offsetTop !== scrollTop) {
        window.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
      }
    }

    const onScroll = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(snap, IDLE_DELAY)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(timer)
    }
  }, [])
}
