import { createFileRoute, redirect } from '@tanstack/react-router'
import { HomePage } from '@/features/home/HomePage'
import { resolveLegacyHash } from '@/lib/legacy-routes'

export const Route = createFileRoute('/_site/')({
  beforeLoad: ({ location }) => {
    const legacyTarget = resolveLegacyHash(location.hash)
    if (legacyTarget) throw redirect({ to: legacyTarget, replace: true })
  },
  component: HomePage,
})
