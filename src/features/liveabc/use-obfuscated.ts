import { useEffect, useState } from 'react'
import { obfuscate } from './code-generator'

/**
 * Obfuscates `source` in the background and returns the result, or `undefined` until it is
 * ready. The obfuscator chunk is fetched after the page has rendered.
 */
export function useObfuscated(source: string, seed?: string | number): string | undefined {
  const [result, setResult] = useState<{ source: string; code: string }>()

  useEffect(() => {
    let cancelled = false
    obfuscate(source, seed).then(
      (code) => {
        if (!cancelled) setResult({ source, code })
      },
      () => {},
    )
    return () => {
      cancelled = true
    }
  }, [source, seed])

  return result?.source === source ? result.code : undefined
}
