import { X } from 'lucide-react'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

export interface WorkoutDetailsProps {
  workoutId: string
  open: boolean
}

export function WorkoutDetails({ workoutId, open }: WorkoutDetailsProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{workoutId}</DialogTitle>
        <DialogDescription>Detalhes do Treino</DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Tipo do Treino
              </TableCell>
              <TableCell className="flex justify-end text-base font-medium">
                Treino de Inferiores
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Aérobico</TableCell>
              <TableCell className="flex justify-end text-base font-medium">
                <X className="h-6 w-6" />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Realizado em:
              </TableCell>
              <TableCell className="flex justify-end text-base font-medium">
                22/05/2024
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Treino</TableHead>
              <TableHead className="text-right">Observação</TableHead>
              <TableHead className="text-right">Séries</TableHead>
              <TableHead className="text-right">Repetições</TableHead>
              <TableHead className="text-right">Carga(kg)</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Mobilidade</TableCell>
              <TableCell className="text-right">-</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">12</TableCell>
              <TableCell className="text-right">-</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Mesa Flexora</TableCell>
              <TableCell className="text-right">Unilateral</TableCell>
              <TableCell className="text-right">3</TableCell>
              <TableCell className="text-right">12</TableCell>
              <TableCell className="text-right">30</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="">Agachamento Stiff</TableCell>
              <TableCell className="text-right">Dropdown</TableCell>
              <TableCell className="text-right">3</TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">30</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Adutor</TableCell>
              <TableCell className="text-right">Progressão</TableCell>
              <TableCell className="text-right">3</TableCell>
              <TableCell className="text-right">12</TableCell>
              <TableCell className="text-right">50</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}
