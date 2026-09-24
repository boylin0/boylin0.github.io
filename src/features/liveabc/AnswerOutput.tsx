import { cn } from '@/lib/utils'
import { isValidProblemId, submittedAnswer } from './answer-simulator'
import { buildAutoAnswerScript } from './code-generator'
import { ScriptSection } from './ScriptSection'
import type { AnsweredQuestion } from './types'

/** Number of answers shown per group. */
const GROUP_SIZE = 5

export function AnswerOutput({ questions }: { questions: readonly AnsweredQuestion[] }) {
  const answers = questions.map(submittedAnswer)
  const wrongCount = questions.filter((q) => q.wrongAnswer).length

  return (
    <div className="space-y-8">
      <section className="space-y-1">
        <h2 className="font-medium text-xl">作答資訊</h2>
        <p>
          錯誤題數 {wrongCount} / 全部題數 {questions.length}
        </p>
      </section>

      <ScriptSection
        title="自動填答"
        source={buildAutoAnswerScript(answers)}
        seed={answers.join('')}
      />

      <section className="space-y-3">
        <h2 className="font-medium text-xl">輸出結果</h2>
        <ol className="space-y-1">
          {questions.map((question, index) => (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: the list is rebuilt as a whole and IDs may repeat.
              key={index}
              className={cn(
                'flex flex-wrap items-baseline gap-x-3',
                index % GROUP_SIZE === GROUP_SIZE - 1 && 'mb-4',
              )}
            >
              <span className="w-10 text-right text-muted-foreground tabular-nums">
                {index + 1}.
              </span>
              <span className="w-4 font-semibold text-destructive">
                {submittedAnswer(question) ?? '-'}
              </span>
              {question.answer === undefined ? (
                <span className="text-muted-foreground text-sm">此題不在資料中</span>
              ) : (
                question.wrongAnswer && (
                  <span className="text-muted-foreground text-sm">正確答案 {question.answer}</span>
                )
              )}
              <span className="text-muted-foreground text-sm">
                {isValidProblemId(question.id)
                  ? `題號 ${question.id}`
                  : `題號格式錯誤：${question.id}`}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
