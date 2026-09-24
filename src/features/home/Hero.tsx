import spaceAnimation from '@/assets/lottie/space.json?url'
import spacePoster from '@/assets/space-poster.webp'
import spacePosterPlaceholder from '@/assets/space-poster-placeholder.webp'
import { GithubIcon } from '@/components/icons/GithubIcon'
import { Lottie } from '@/components/Lottie'
import { GITHUB_PROFILE_URL } from '@/lib/site'
import { FadeIn } from './FadeIn'

export function Hero() {
  return (
    <header className="relative overflow-hidden">
      {/*
        Layers under the animation: a tiny inlined blur, then its first frame. Each covers the
        one below once loaded, so the hero never shows an empty box.
      */}
      <img
        src={spacePosterPlaceholder}
        alt=""
        className="absolute inset-0 size-full scale-110 object-cover blur-xl"
      />
      <img
        src={spacePoster}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover"
      />
      <Lottie src={spaceAnimation} speed={0.5} className="relative aspect-video w-full" />
      <FadeIn
        delay={0.5}
        duration={3}
        className="absolute inset-0 flex items-center justify-center p-4 pb-[12%]"
      >
        <h1 className="text-center font-extralight text-[10vw] text-white leading-tight md:text-7xl lg:text-8xl">
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[0.25em] transition-opacity hover:opacity-70"
          >
            <GithubIcon className="size-[0.8em]" />
            BOYLIN0
          </a>
          <br />
          Github Pages
        </h1>
      </FadeIn>
    </header>
  )
}
