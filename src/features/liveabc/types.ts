export type Answer = 'A' | 'B' | 'C' | 'D'

export type ExamType = 'none' | 'listening' | 'reading'

/** One question in the generated answer sheet. */
export type AnsweredQuestion = {
  id: string
  /** Correct answer, or `undefined` when the question is not in the answer bank. */
  answer: Answer | undefined
  /** Deliberately wrong answer used to simulate mistakes. */
  wrongAnswer?: Answer
}
