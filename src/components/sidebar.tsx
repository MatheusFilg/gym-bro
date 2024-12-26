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
    <Collapsible
      className="fixed left-0 right-7 top-9 z-20 flex flex-col justify-self-end data-[state=open]:bottom-0 lg:static lg:right-auto lg:top-0  lg:border-r lg:px-4 lg:py-8 lg:data-[state=closed]:bottom-0"
      // className="lg:flex lg:flex-col lg:border-r lg:px-4 lg:py-8"
    >
      <CollapsibleTrigger asChild className="w-fit lg:hidden">
        <Button size="xs" className="">
          <AlignJustify className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent
        forceMount
        className="flex flex-1 flex-col justify-between data-[state=closed]:hidden lg:data-[state=closed]:flex"
      >
        <div className="flex flex-row gap-20">
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
