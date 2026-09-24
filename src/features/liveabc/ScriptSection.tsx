import { Copy, LoaderCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { obfuscate } from './code-generator'
import { useCopy } from './use-copy'
import { useObfuscated } from './use-obfuscated'

type ScriptSectionProps = {
  title: string
  /** Script to preview, or `null` to show `placeholder` instead. */
  source: string | null
  placeholder?: string
  seed?: string
  /** Builds the script at copy time; defaults to `source`. */
  buildForCopy?: () => string
  children?: ReactNode
}

/** Shows an obfuscated script with a button that copies it. */
export function ScriptSection({
  title,
  source,
  placeholder,
  seed,
  buildForCopy,
  children,
}: ScriptSectionProps) {
  const preview = useObfuscated(source ?? '', seed)
  const { copy, pending } = useCopy()
  const disabled = source === null || pending

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-3">
        <h2 className="font-medium text-xl">{title}</h2>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => copy(() => obfuscate(buildForCopy?.() ?? source ?? '', seed))}
        >
          {pending ? <LoaderCircle className="animate-spin" /> : <Copy />}
          複製
        </Button>
      </div>
      <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-muted-foreground text-sm">
        <code>{source === null ? placeholder : (preview ?? '產生中…')}</code>
      </pre>
      {children}
    </section>
  )
}
