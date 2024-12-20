import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const workoutFilterSchema = z.object({
  workoutCategory: z.string().optional(),
})

type WorkoutFilterSchema = z.infer<typeof workoutFilterSchema>

export function HomeFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const workoutCategory = searchParams.get('workoutCategory')

  const { control, handleSubmit, reset } = useForm<WorkoutFilterSchema>({
    resolver: zodResolver(workoutFilterSchema),
    defaultValues: {
      workoutCategory: workoutCategory ?? 'all',
    },
  })

  function handleFilter({ workoutCategory }: WorkoutFilterSchema) {
    setSearchParams((state) => {
      if (workoutCategory) {
        state.set('workoutCategory', workoutCategory)
      } else {
        state.delete('workoutCategory')
      }

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state: URLSearchParams) => {
      state.delete('workoutCategory')

      return state
    })
    reset({
      workoutCategory: 'all',
    })
  }

  return (
    <form
      className="flex flex-row items-center gap-4"
      onSubmit={handleSubmit(handleFilter)}
    >
      <div className="flex flex-row items-center space-x-2">
        <span className="text-base font-semibold">Filtros</span>

        <Controller
          name="workoutCategory"
          control={control}
          render={({ field: { name, onChange, value, disabled } }) => {
            return (
              <Select
                defaultValue="all"
                name={name}
                value={value}
                onValueChange={onChange}
                disabled={disabled}
              >
                <SelectTrigger className="h-8 w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="lower">Treino Inferior</SelectItem>
                  <SelectItem value="upper">Treino Superior</SelectItem>
                </SelectContent>
              </Select>
            )
          }}
        />
      </div>

      <div className="space-x-2">
        <Button type="submit" variant="default" size="xs">
          <Search className="mr-2 h-4 w-4" />
          Filtrar resultados
        </Button>
        <Button
          type="button"
          variant="outline"
          size="xs"
          onClick={handleClearFilters}
        >
          <X className="mr-2 h-4 w-4" />
          Remover Filtros
        </Button>
      </div>
    </form>
  )
}
