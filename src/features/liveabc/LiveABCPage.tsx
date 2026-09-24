import { useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { AnswerOutput } from './AnswerOutput'
import { parseProblemIds, simulateAnswers } from './answer-simulator'
import { buildProblemIdsScript, buildSetTimeScript } from './code-generator'
import { EXAM_TIME_LIMIT, SAMPLE_PROBLEM_IDS } from './exam'
import { ParsedOutput } from './ParsedOutput'
import { type ParsedAnswerPage, parseAnswerPage } from './parse-answer-page'
import { problemCount } from './problems'
import { ScriptSection } from './ScriptSection'
import { TutorialVideo } from './TutorialVideo'
import type { AnsweredQuestion, ExamType } from './types'
import { useDevMode } from './use-dev-mode'

type Output =
  | { kind: 'answers'; questions: AnsweredQuestion[] }
  | { kind: 'parsed'; result: ParsedAnswerPage | null }

const EXAM_TYPE_LABEL: Readonly<Record<ExamType, string>> = {
  none: '未選擇',
  listening: '聽力，45 分鐘',
  reading: '閱讀，75 分鐘',
}

export function LiveABCPage() {
  const [examType, setExamType] = useState<ExamType>('none')
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [problemInput, setProblemInput] = useState(SAMPLE_PROBLEM_IDS)
  const [errorRate, setErrorRate] = useState(0)
  const [output, setOutput] = useState<Output>()
  const devMode = useDevMode()
  const outputRef = useRef<HTMLDivElement>(null)

  const maxSeconds = EXAM_TIME_LIMIT[examType]

  useEffect(() => {
    const element = outputRef.current
    if (!output || !element) return
    if (element.getBoundingClientRect().top > window.innerHeight / 2) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [output])

  const changeExamType = (type: ExamType) => {
    const limit = EXAM_TIME_LIMIT[type]
    setExamType(type)
    setElapsedSeconds((seconds) => (seconds === 0 ? limit : Math.min(seconds, limit)))
  }

  return (
    <main className="container mx-auto max-w-4xl space-y-10 px-4 py-8">
      <header className="flex flex-wrap items-baseline gap-3">
        <h1 className="font-light text-3xl">LiveABC Tool</h1>
        <span className="text-muted-foreground text-sm">已收集 {problemCount} 題</span>
      </header>

      <TutorialVideo />

      <ScriptSection title="獲取題號" source={buildProblemIdsScript()} />

      <ScriptSection
        title="修改作答時間"
        source={examType === 'none' ? null : buildSetTimeScript(elapsedSeconds)}
        placeholder="請先選擇測驗類別"
        buildForCopy={() => buildSetTimeScript(elapsedSeconds)}
      >
        <div className="max-w-sm space-y-4 rounded-lg border p-4">
          <Badge>設定</Badge>
          <div className="space-y-2">
            <label htmlFor="exam-type" className="font-medium text-sm">
              測驗類別
            </label>
            <Select value={examType} onValueChange={(v) => changeExamType(v as ExamType)}>
              <SelectTrigger id="exam-type" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(EXAM_TYPE_LABEL) as ExamType[]).map((type) => (
                  <SelectItem key={type} value={type}>
                    {EXAM_TYPE_LABEL[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <span className="font-medium text-sm">作答時間</span>
            <Slider
              aria-label="作答時間"
              min={0}
              max={maxSeconds / 60}
              step={0.1}
              disabled={examType === 'none'}
              value={[elapsedSeconds / 60]}
              onValueChange={([minutes = 0]) => setElapsedSeconds(Math.round(minutes * 60))}
            />
            <p className="text-muted-foreground text-sm">
              約 {(elapsedSeconds / 60).toFixed(1)} 分鐘
            </p>
          </div>
        </div>
      </ScriptSection>

      <section className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="problem-ids" className="font-medium text-xl">
            輸入題號
          </label>
          <p className="text-muted-foreground text-sm">以逗號分隔多個題號。</p>
          <Textarea
            id="problem-ids"
            value={problemInput}
            onChange={(e) => setProblemInput(e.target.value)}
            className="min-h-40 font-mono"
          />
        </div>

        <div className="max-w-sm space-y-2">
          <label htmlFor="error-rate" className="font-medium text-sm">
            模擬錯誤率
          </label>
          <div className="flex items-center gap-2">
            <Input
              id="error-rate"
              type="number"
              min={0}
              max={100}
              step={1}
              value={errorRate}
              onChange={(e) =>
                setErrorRate(Math.min(Math.max(Number(e.target.value) || 0, 0), 100))
              }
              className="w-28"
            />
            <span className="text-muted-foreground">%</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            size="lg"
            onClick={() =>
              setOutput({
                kind: 'answers',
                questions: simulateAnswers(parseProblemIds(problemInput), errorRate),
              })
            }
          >
            產生解答
          </Button>
          {devMode && (
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setOutput({ kind: 'parsed', result: parseAnswerPage(problemInput) })}
            >
              解析詳解
            </Button>
          )}
        </div>
      </section>

      <div ref={outputRef} className="scroll-mt-4 break-all">
        {output?.kind === 'answers' && <AnswerOutput questions={output.questions} />}
        {output?.kind === 'parsed' && <ParsedOutput result={output.result} />}
      </div>
    </main>
  )
}
