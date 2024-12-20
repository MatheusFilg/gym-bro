import { Dumbbell } from 'lucide-react'

import { Footer } from './footer'
import { ThemeToggle } from './theme/theme-toggle'

export function Sidebar() {
  return (
    <div className="flex min-h-screen flex-col space-y-[825px] px-4 py-8 lg:border-r">
      <div className="fixed flex flex-row gap-20">
        <div className="flex flex-row items-center gap-2">
          <Dumbbell className="h-8 w-8" />
          <span className="text-2xl font-semibold tracking-tight">Gym.Bro</span>
        </div>
        <ThemeToggle />
      </div>

      <Footer />
    </div>
  )
}
