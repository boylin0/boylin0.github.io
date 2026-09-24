import { Play } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const VIDEO_URL = '/media/liveabc-tutorial.mp4'

/** Mounts the tutorial video only after the user asks for it. */
export function TutorialVideo() {
  const [visible, setVisible] = useState(false)

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-3">
        <h2 className="font-medium text-xl">使用範例</h2>
        <Button variant="outline" size="sm" onClick={() => setVisible((v) => !v)}>
          <Play />
          {visible ? '隱藏影片' : '播放影片'}
        </Button>
      </div>
      {visible && (
        // biome-ignore lint/a11y/useMediaCaption: the tutorial is a silent screen recording.
        <video
          src={VIDEO_URL}
          controls
          autoPlay
          preload="none"
          className="w-full max-w-3xl rounded-lg"
        />
      )}
    </section>
  )
}
