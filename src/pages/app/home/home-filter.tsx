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
      className="flex flex-row items-center gap-2 lg:gap-4"
      onSubmit={handleSubmit(handleFilter)}
    >
      <div className="flex flex-row items-center gap-x-1">
        <span className="text-sm font-semibold lg:text-base">Filtros</span>

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
                <SelectTrigger className="h-6 w-[150px] justify-items-start lg:h-8 lg:w-[160px] lg:text-base">
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

      <div className="flex flex-row gap-x-2">
        <Button
          type="submit"
          variant="default"
          className=" h-auto w-auto px-2 py-1 lg:h-8 lg:w-36"
        >
          <Search className="h-4 w-4 lg:mr-2" />
          <span className="hidden lg:mb-0.5 lg:flex">Filtrar resultados</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleClearFilters}
          className=" h-auto w-auto px-2 py-1 lg:flex lg:h-8 lg:w-36"
        >
          <X className="h-4 w-4 lg:mr-2" />
          <span className="hidden lg:mb-0.5 lg:flex">Remover Filtros</span>
        </Button>
      </div>
    </form>
  )
}
