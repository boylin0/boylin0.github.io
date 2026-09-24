import { sample, shuffle } from '@/lib/random'
import { problems } from './problems'
import type { Answer, AnsweredQuestion } from './types'

/**
 * Wrong choices for each correct answer. Questions answered D have four options; the others
 * are treated as three-option questions so a wrong answer never points at a missing D.
 */
const WRONG_CHOICES: Readonly<Record<Answer, readonly Answer[]>> = {
  A: ['B', 'C'],
  B: ['A', 'C'],
  C: ['A', 'B'],
  D: ['A', 'B', 'C'],
}

/** Splits user input on commas and whitespace into question IDs. */
export function parseProblemIds(input: string): string[] {
  return input.split(/[\s,]+/).filter(Boolean)
}

export function isValidProblemId(id: string): boolean {
  return /^\d+$/.test(id)
}

/**
 * Looks up every question and marks `errorRate` percent of them with a wrong answer.
 * Only questions found in the answer bank can be marked wrong.
 */
export function simulateAnswers(ids: readonly string[], errorRate: number): AnsweredQuestion[] {
  const questions: AnsweredQuestion[] = ids.map((id) => ({ id, answer: problems[id] }))
  const wrongCount = Math.floor((ids.length * errorRate) / 100)

  const candidates = shuffle(questions.filter((q) => q.answer !== undefined))
  for (const question of candidates.slice(0, wrongCount)) {
    question.wrongAnswer = sample(WRONG_CHOICES[question.answer as Answer])
  }
  return questions
}

/** The answer to submit: the simulated wrong answer if there is one, otherwise the correct one. */
export function submittedAnswer(question: AnsweredQuestion): Answer | undefined {
  return question.wrongAnswer ?? question.answer
}
