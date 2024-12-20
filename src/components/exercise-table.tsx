import { GetWorkoutDetailsResponse } from '@/api/get-workout-details'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

interface ExerciseTableProps {
  workout: GetWorkoutDetailsResponse
}

export default function ExerciseTable({ workout }: ExerciseTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Exercício</TableHead>
          <TableHead className="text-right">Observação</TableHead>
          <TableHead className="text-right">Séries</TableHead>
          <TableHead className="text-right">Repetições</TableHead>
          <TableHead className="text-right">Carga(kg)</TableHead>
        </TableRow>
      </TableHeader>

      {workout &&
        workout.exercises.map((exercise) => {
          return (
            <TableBody key={exercise.exercise}>
              <TableRow>
                <TableCell>{exercise.exercise}</TableCell>
                <TableCell className="max-w-6 truncate text-right">
                  {exercise.note}
                </TableCell>
                <TableCell className="text-right">{exercise.sets}</TableCell>
                <TableCell className="text-right">{exercise.reps}</TableCell>
                <TableCell className="text-right">{exercise.weight}</TableCell>
              </TableRow>
            </TableBody>
          )
        })}
    </Table>
  )
}
