const ANSWER_PREFIX = '解答&nbsp;&nbsp;:&nbsp;&nbsp;<span class="ans2">'
const ANSWER_SUFFIX = '</span>&nbsp;&nbsp;</td></tr></tbody></table></div></td></tr>'
const ID_PREFIX = '<input type="hidden" id="testidseq" name="testidseq" value="'

export type ParsedAnswerPage =
  | { ok: true; entries: [id: string, answer: string][] }
  | { ok: false; answerCount: number; idCount: number }

/**
 * Extracts question IDs and answers from the HTML of a LiveABC answer page.
 * Returns `null` when the page has no question ID list.
 */
export function parseAnswerPage(html: string): ParsedAnswerPage | null {
  const source = html.replaceAll('\n', '')
  const ids = source.split(ID_PREFIX)[1]?.split('">')[0]?.split(',')
  if (!ids) return null

  const answers = source
    .split(ANSWER_PREFIX)
    .slice(1)
    .map((chunk) => chunk.split(ANSWER_SUFFIX)[0] ?? '')

  if (answers.length !== ids.length) {
    return { ok: false, answerCount: answers.length, idCount: ids.length }
  }
  return { ok: true, entries: ids.map((id, i) => [id, answers[i] as string]) }
}

/** Formats entries as lines that can be pasted into `data/problems.json`. */
export function toJsonLines(entries: readonly [string, string][]): string {
  return entries
    .map(([id, answer]) => `  ${JSON.stringify(id)}: ${JSON.stringify(answer)},`)
    .join('\n')
}
