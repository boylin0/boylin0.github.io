import { useEffect, useState } from 'react'

const SECRET = 'dev'

/** Returns `true` once the user has typed "dev" on the page. */
export function useDevMode(): boolean {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (enabled) return
    let progress = 0
    const onKeyDown = (event: KeyboardEvent) => {
      progress = event.key.toLowerCase() === SECRET[progress] ? progress + 1 : 0
      if (progress === SECRET.length) setEnabled(true)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [enabled])

  return enabled
}
