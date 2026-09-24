import type { ReactNode } from 'react'

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="m-4 bg-linear-45 from-[#4c45dd] from-[-80%] to-[#00ff95] bg-clip-text text-center font-black text-5xl text-transparent leading-tight md:text-6xl">
      {children}
    </h2>
  )
}
