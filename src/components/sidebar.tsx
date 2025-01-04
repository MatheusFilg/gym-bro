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
    <Collapsible className="fixed left-0 right-0 top-0 z-20 flex flex-col px-4 pt-2 lg:static lg:right-auto lg:border-r lg:p-2">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Dumbbell className="h-8 w-8" />
          <span className="text-2xl font-semibold tracking-tight">Gym.Bro</span>
        </div>

        <div className="flex flex-row gap-2">
          <ThemeToggle />
          <CollapsibleTrigger asChild className="w-fit lg:hidden">
            <Button size="icon" className="p-3">
              <AlignJustify className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>

      <CollapsibleContent
        forceMount
        className="mt-2 flex flex-1 flex-col justify-between p-4 data-[state=closed]:hidden data-[state=open]:bg-background lg:data-[state=closed]:flex"
      >
        <div className="flex justify-center align-middle">
          <p className="text-lg font-medium leading-relaxed">
            Aqui pode vir outras abas ou funcionalidades...
          </p>
        </div>
        <Footer />
      </CollapsibleContent>
    </Collapsible>
  )
}
