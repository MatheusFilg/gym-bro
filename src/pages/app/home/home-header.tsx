import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { WorkoutCreateForm } from '@/components/workout-create-form'

import { HomeFilter } from './home-filter'

export default function HomeHeader() {
  const [isDetailOpen, setIsDetailsOpen] = useState(false)

  return (
    <div className="mb-2 flex flex-row gap-7 lg:gap-10">
      <HomeFilter />

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="h-fit w-fit border-hidden p-1 lg:h-6 lg:border-solid lg:p-4"
          >
            <PlusCircle className="flex h-6 w-6 lg:hidden" />
            <span className="hidden lg:mb-0.5 lg:flex">Criar seu Treino</span>
          </Button>
        </DialogTrigger>
        <WorkoutCreateForm />
      </Dialog>
    </div>
  )
}
