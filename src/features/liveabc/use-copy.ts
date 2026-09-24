import { useState } from 'react'
import { toast } from 'sonner'

/**
 * Copies the text produced by `produce` to the clipboard and reports the result with a toast.
 * `pending` is `true` while `produce` is running.
 */
export function useCopy() {
  const [pending, setPending] = useState(false)

  const copy = async (produce: () => string | Promise<string>) => {
    setPending(true)
    try {
      await navigator.clipboard.writeText(await produce())
      toast.success('已複製')
    } catch {
      toast.error('無法複製，請手動選取程式碼')
    } finally {
      setPending(false)
    }
  }

  return { copy, pending }
}
