/**
 * Maps the fragment of hash-based URLs such as `/#LiveABC` to the current path.
 * Keys are lowercase.
 */
const LEGACY_HASH_ROUTES = {
  liveabc: '/liveabc',
  flappybird: '/flappybird',
} as const

export type LegacyTarget = (typeof LEGACY_HASH_ROUTES)[keyof typeof LEGACY_HASH_ROUTES]

/** Returns the path a legacy hash points to, or `undefined` if it is not a legacy route. */
export function resolveLegacyHash(hash: string): LegacyTarget | undefined {
  const key = hash.replace(/^#?\/?/, '').toLowerCase()
  return Object.hasOwn(LEGACY_HASH_ROUTES, key)
    ? LEGACY_HASH_ROUTES[key as keyof typeof LEGACY_HASH_ROUTES]
    : undefined
}
