import { Mail } from 'lucide-react'
import { GithubIcon } from '@/components/icons/GithubIcon'
import { Button } from '@/components/ui/button'
import { CONTACT_EMAIL, GITHUB_PROFILE_URL, GITHUB_USER } from '@/lib/site'
import { FadeIn } from './FadeIn'
import { SectionHeading } from './SectionHeading'

export function AboutSection() {
  return (
    <>
      <SectionHeading>About Me</SectionHeading>
      <FadeIn className="p-6 md:p-12">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
          <img
            src={`https://avatars.githubusercontent.com/${GITHUB_USER}`}
            alt={`${GITHUB_USER} avatar`}
            loading="lazy"
            className="mx-auto size-60 rounded-full lg:mr-0"
          />
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <span className="bg-linear-45 from-[#2fdef5] from-[-80%] to-[#766ce9] bg-clip-text font-black text-4xl text-transparent">
              BOYLIN0
            </span>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                  <GithubIcon />
                  Github
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  <Mail />
                  E-Mail
                </a>
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  )
}
