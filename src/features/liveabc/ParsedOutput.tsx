import type { ParsedAnswerPage } from './parse-answer-page'
import { toJsonLines } from './parse-answer-page'

export function ParsedOutput({ result }: { result: ParsedAnswerPage | null }) {
  if (result === null) {
    return <p className="text-destructive">找不到題號清單，請貼上完整的詳解頁 HTML。</p>
  }
  if (!result.ok) {
    return (
      <p className="text-destructive">
        題目數量不相符：解答 {result.answerCount} 題，題號 {result.idCount} 題。
      </p>
    )
  }
  return (
    <section className="space-y-3">
      <h2 className="font-medium text-xl">解析結果</h2>
      <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm">
        {toJsonLines(result.entries)}
      </pre>
    </section>
  )
}
