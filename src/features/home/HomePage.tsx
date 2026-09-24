import sectionFlappyBird from '@/assets/section-flappybird.svg'
import sectionLiveABC from '@/assets/section-liveabc.svg'
import sectionMore from '@/assets/section-more.svg'
import { GithubIcon } from '@/components/icons/GithubIcon'
import { Button } from '@/components/ui/button'
import { GITHUB_PROFILE_URL } from '@/lib/site'
import { AboutSection } from './AboutSection'
import { AppSection } from './AppSection'
import { GithubSection } from './GithubSection'
import { Hero } from './Hero'
import { SectionHeading } from './SectionHeading'
import { useSectionMagnet } from './use-section-magnet'

export function HomePage() {
  useSectionMagnet()

  return (
    <main className="bg-white pb-12">
      <Hero />

      <SectionHeading>My Online Apps</SectionHeading>

      <AppSection
        title="FlappyBird"
        image={sectionFlappyBird}
        to="/flappybird"
        description={
          <p>
            A FlappyBird game created with{' '}
            <a
              href="https://pixijs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              pixi.js
            </a>
            .
          </p>
        }
      />

      <AppSection
        title="LiveABC自動產生解答工具"
        image={sectionLiveABC}
        to="/liveabc"
        reversed
        description={<p className="text-muted-foreground text-sm">For NPTU only</p>}
      />

      <section className="mb-12 flex flex-col items-center gap-4">
        <img src={sectionMore} alt="" className="w-8" />
        <Button asChild variant="outline" size="lg" className="min-w-80">
          <a
            href={`${GITHUB_PROFILE_URL}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            See More
          </a>
        </Button>
      </section>

      <AboutSection />

      <GithubSection />
    </main>
  )
}
