import { useNavigate } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { toggleFullscreen } from '@/lib/fullscreen'
import { FlappyBirdGame } from './game/FlappyBirdGame'

async function shareCurrentPage() {
  const url = window.location.href
  if (navigator.share) {
    await navigator.share({ title: document.title, url }).catch(() => {})
    return
  }
  try {
    await navigator.clipboard.writeText(url)
    toast.success('已複製連結')
  } catch {
    toast.error('無法分享，請手動複製網址')
  }
}

export function FlappyBirdPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const game = new FlappyBirdGame({
      container,
      onExit: () => navigate({ to: '/' }),
      onShare: shareCurrentPage,
      onToggleFullscreen: () => void toggleFullscreen(container).catch(() => {}),
    })
    void game.start()
    document.body.style.overflow = 'hidden'

    return () => {
      game.destroy()
      document.body.style.overflow = ''
    }
  }, [navigate])

  return <div ref={containerRef} className="fixed inset-0 touch-none overflow-hidden" />
}
