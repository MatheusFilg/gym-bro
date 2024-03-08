import { Dumbbell } from 'lucide-react'

import { Footer } from '../footer'
import { SignIn } from '../sign-in'
import { ThemeToggle } from '../theme/theme-toggle'
import { Navigation } from './navigation'

export function Sidebar() {
  return (
    <div className="flex min-h-screen flex-col space-y-6 p-6 lg:border-r">
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-row items-center gap-2">
          <Dumbbell className="h-8 w-8" />
          <span className="text-3xl font-bold tracking-tight">Gym.Bro</span>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex flex-1 flex-col space-y-6">
        <SignIn />
        <Navigation />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}
