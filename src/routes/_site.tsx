import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Footer } from '@/components/layout/Footer'

export const Route = createFileRoute('/_site')({
  component: SiteLayout,
})

function SiteLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
}
