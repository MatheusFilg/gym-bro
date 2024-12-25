import { AlignJustify, Dumbbell } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

import { Footer } from './footer'
import { ThemeToggle } from './theme/theme-toggle'
import { Button } from './ui/button'

export function Sidebar() {
  return (
    <Collapsible className="hidden min-h-screen flex-col justify-between space-y-[825px] px-4 py-8 lg:visible lg:flex lg:border-r">
      <CollapsibleTrigger asChild className="lg:hidden">
        <Button size="xs">
          <AlignJustify className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent forceMount>
        <div className="fixed flex flex-row gap-20">
          <div className="flex flex-row items-center gap-2">
            <Dumbbell className="h-8 w-8" />
            <span className="text-2xl font-semibold tracking-tight">
              Gym.Bro
            </span>
          </div>
          <ThemeToggle />
        </div>

        <Footer />
      </CollapsibleContent>
    </Collapsible>
  )
}
