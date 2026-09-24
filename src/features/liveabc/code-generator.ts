import type { ObfuscatorOptions } from 'javascript-obfuscator'
import type { Answer } from './types'

/** Expression that reaches the exam frame inside the LiveABC page. */
const EXAM_FRAME = "window.frames['shock'].contentWindow.frames['exam']"

/** Seconds written into the exam page when the requested time is zero. */
const DEFAULT_ELAPSED_SECONDS = 2000

const OBFUSCATOR_OPTIONS: ObfuscatorOptions = {
  advertisement: false,
  compact: true,
  identifierNamesGenerator: 'hexadecimal',
  simplify: true,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayThreshold: 0.75,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersType: 'function',
  target: 'browser',
}

/** Script that prints the IDs of the questions on the current exam page. */
export function buildProblemIdsScript(): string {
  return `${EXAM_FRAME}.document.querySelector('form#Carryout input#testidseq').value`
}

/** Script that makes the exam page believe `seconds` have passed since it started. */
export function buildSetTimeScript(seconds: number, now = new Date()): string {
  const elapsed = Math.trunc(seconds) || DEFAULT_ELAPSED_SECONDS
  const startTime = formatDateTime(new Date(now.getTime() - elapsed * 1000))
  return [
    `${EXAM_FRAME}.PastTime=${elapsed};`,
    `${EXAM_FRAME}.T_time=${elapsed};`,
    `${EXAM_FRAME}.document.getElementById('stime').value='${startTime}';`,
  ].join('\n')
}

/** Script that fills in every answer; questions without an answer are skipped. */
export function buildAutoAnswerScript(answers: readonly (Answer | undefined)[]): string {
  return answers
    .map((answer, index) => (answer ? `${EXAM_FRAME}.i11(${index + 1},'${answer}');` : null))
    .filter(Boolean)
    .join('\n')
}

/**
 * Obfuscates a script. The same source and seed always give the same output.
 * The obfuscator is loaded on first use because it is by far the largest dependency.
 */
export async function obfuscate(source: string, seed: string | number = 1): Promise<string> {
  const { default: JavaScriptObfuscator } = await import('javascript-obfuscator')
  return JavaScriptObfuscator.obfuscate(source, { ...OBFUSCATOR_OPTIONS, seed }).getObfuscatedCode()
}

/** Formats a date as `YYYY-MM-DD H:mm:ss`, the format the exam page expects. */
function formatDateTime(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  const day = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
  return `${day} ${date.getHours()}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}
