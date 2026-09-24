import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LoadingScreen } from '@/components/LoadingScreen'
import { routeTree } from './routeTree.gen'
import './index.css'

const router = createRouter({
  routeTree,
  defaultPendingComponent: LoadingScreen,
  // Show the loading screen as soon as a route is pending so it continues the placeholder in
  // index.html without a blank gap.
  defaultPendingMs: 0,
  defaultPendingMinMs: 0,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const root = document.getElementById('root')
if (!root) throw new Error('Missing #root element')

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
