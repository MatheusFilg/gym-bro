import { Dumbbell, Home, User, Weight } from 'lucide-react'

import { ThemeToggle } from './theme/theme-toggle'

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
        <a
          href=""
          className="group flex flex-row items-center gap-3 transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
            <User className="h-4 w-4" />
          </div>
          <p className="text-sm text-primary-foreground lg:group-hover:text-muted-foreground">
            <span className="font-semibold underline">Faça login</span> e
            registre seus treinos
          </p>
        </a>

        <div className="flex flex-col space-y-1.5">
          <a
            href=""
            className="flex flex-row items-center gap-2 rounded p-1 lg:hover:bg-accent lg:hover:text-muted-foreground"
          >
            <Home />
            <span className="text-lg font-semibold">Home</span>
          </a>

          <a
            href=""
            className="flex flex-row items-center gap-2 rounded p-1 lg:hover:bg-accent lg:hover:text-muted-foreground"
          >
            <Weight />
            <span className="text-lg font-semibold">Treinos</span>
          </a>
        </div>
      </div>
      <div>
        <h1>Footer da sidebar</h1>
      </div>
    </div>
  )
}
