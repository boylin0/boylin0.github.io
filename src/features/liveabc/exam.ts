import type { ExamType } from './types'

/** Longest elapsed time, in seconds, that can be set for each exam type; one minute under its limit. */
export const EXAM_TIME_LIMIT: Readonly<Record<ExamType, number>> = {
  none: 0,
  listening: 44 * 60,
  reading: 74 * 60,
}

export const SAMPLE_PROBLEM_IDS = Array.from({ length: 100 }, (_, i) => 1601 + i).join(',')
