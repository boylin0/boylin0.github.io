import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { NotFoundScreen } from '@/components/NotFoundScreen'
import { Toaster } from '@/components/ui/sonner'

export const Route = createRootRoute({
  head: () => ({ meta: [{ title: "BOYLIN0's Github Pages" }] }),
  component: RootLayout,
  notFoundComponent: NotFoundScreen,
})

function RootLayout() {
  return (
    <>
      <HeadContent />
      <Outlet />
      <Toaster position="top-center" />
    </>
  )
}
