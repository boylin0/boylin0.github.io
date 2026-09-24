import { Link } from '@tanstack/react-router'
import { House } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="bg-zinc-900 text-zinc-100">
      <div className="flex h-14 items-center gap-2 px-4">
        <Link
          to="/"
          aria-label="Home"
          className="rounded-md p-2 transition-colors hover:bg-zinc-800"
        >
          <House className="size-5" />
        </Link>
        <Link
          to="/"
          className="rounded-md px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
        >
          Home
        </Link>
      </div>
    </nav>
  )
}
