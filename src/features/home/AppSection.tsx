import { Link, type LinkProps } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FadeIn } from './FadeIn'

type AppSectionProps = {
  title: string
  description: ReactNode
  image: string
  to: LinkProps['to']
  /** Places the image on the right on wide screens. */
  reversed?: boolean
}

export function AppSection({ title, description, image, to, reversed = false }: AppSectionProps) {
  return (
    <section data-magnet className="container mx-auto flex h-dvh min-h-145 items-center px-4">
      <div className="grid w-full grid-cols-1 items-center gap-6 md:grid-cols-2">
        <FadeIn className={cn('p-3', reversed && 'md:order-2')}>
          <img src={image} alt="" className="mx-auto w-full max-w-lg" />
        </FadeIn>
        <FadeIn delay={0.5} className="flex flex-col items-center gap-6 p-3 text-center">
          <div className="space-y-3">
            <h3 className="font-medium text-3xl">{title}</h3>
            {description}
          </div>
          <Button asChild variant="outline" size="lg" className="min-w-38">
            <Link to={to}>
              <ArrowRight />
              GO
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}
