import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Check, Search, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import { WorkoutDetails } from './workout-details'

interface WorkoutCardProps {
  workout: {
    id: string
    workoutCategory: 'upper' | 'lower'
    aerobic: boolean
    createdAt: string
  }
}

export function WorktoutCard({ workout }: WorkoutCardProps) {
  const [isDetailOpen, setIsDetailsOpen] = useState(false)

  return (
    <div className="flex w-[200px] flex-col items-center space-y-4 rounded bg-primary py-4 align-middle">
      <img
        className="h-14 w-14"
        src="https://github.com/MatheusFilg.png"
        alt=""
      />
      <h1 className="text-lg font-semibold">
        {workout.workoutCategory === 'upper'
          ? 'Treino Superior'
          : 'Treino Inferior'}
      </h1>
      <div className="flex flex-row items-center font-medium">
        Aeróbico
        {workout.aerobic ? (
          <Check className="ml-1 h-6 w-6" />
        ) : (
          <X className="ml-1 h-6 w-6" />
        )}
      </div>

      <div className="flex flex-row items-center gap-2">
        <span className="text-sm font-medium">
          {formatDistanceToNow((workout.createdAt), {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>

        <Dialog open={isDetailOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-6 p-2">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do Treino</span>
            </Button>
          </DialogTrigger>
          <WorkoutDetails workoutId={workout.id} open={isDetailOpen} />
        </Dialog>
      </div>
    </div>
  )
}
