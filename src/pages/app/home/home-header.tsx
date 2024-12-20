import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { WorkoutCreateForm } from '@/components/workout-create-form'

import { HomeFilter } from './home-filter'

export default function HomeHeader() {
  const [isDetailOpen, setIsDetailsOpen] = useState(false)

  return (
    <div className="mb-2 flex flex-row justify-between gap-10">
      <HomeFilter />

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-6 p-4">
            Criar seu Treino
          </Button>
        </DialogTrigger>
        <WorkoutCreateForm />
      </Dialog>
    </div>
  )
}
