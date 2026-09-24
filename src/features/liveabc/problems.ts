import raw from './data/problems.json'
import type { Answer } from './types'

/** Answer bank keyed by LiveABC question ID. */
export const problems: Readonly<Record<string, Answer>> = raw as Record<string, Answer>

export const problemCount = Object.keys(problems).length
