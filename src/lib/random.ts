/** Returns a uniformly random element of a non-empty array. */
export function sample<T>(items: readonly T[]): T {
  if (items.length === 0) throw new RangeError('Cannot sample from an empty array')
  return items[Math.floor(Math.random() * items.length)] as T
}

/** Returns a shuffled copy using the Fisher-Yates algorithm. */
export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j] as T, result[i] as T]
  }
  return result
}

/** Returns a random integer between `min` and `max`, both inclusive. */
export function randomInt(min: number, max: number): number {
  const low = Math.ceil(min)
  const high = Math.floor(max)
  return Math.floor(Math.random() * (high - low + 1)) + low
}

/** Linearly maps `value` from one range to another. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}
