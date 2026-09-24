import { useState } from 'react'
import { cn } from '@/lib/utils'

type StatsCardProps = {
  src: string
  alt: string
  className?: string
  /** Wraps the image in a bordered card, for images without a background of their own. */
  framed?: boolean
}

/** An image from public/github-stats/, produced by `pnpm stats`. Renders nothing if missing. */
export function StatsCard({ src, alt, className, framed = false }: StatsCardProps) {
  const [failed, setFailed] = useState(false)
  if (failed) return null

  const image = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={cn('block w-full', !framed && className)}
      onError={() => setFailed(true)}
    />
  )
  if (!framed) return image
  return (
    <div className={cn('flex items-center rounded-xl border bg-card p-4 shadow-sm', className)}>
      {image}
    </div>
  )
}
