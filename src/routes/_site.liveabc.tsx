import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/layout/Navbar'
import { LiveABCPage } from '@/features/liveabc/LiveABCPage'

export const Route = createFileRoute('/_site/liveabc')({
  head: () => ({ meta: [{ title: 'LiveABC Tool' }] }),
  component: () => (
    <>
      <Navbar />
      <LiveABCPage />
    </>
  ),
})
