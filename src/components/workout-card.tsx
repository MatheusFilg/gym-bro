import { Search, X } from 'lucide-react'

import { Button } from './ui/button'

export function WorktoutCard() {
  return (
    <div className="flex w-[200px] flex-col items-center space-y-4 rounded bg-primary px-4 py-6">
      <img
        className="h-14 w-14"
        src="https://github.com/MatheusFilg.png"
        alt=""
      />
      <h1 className="text-lg font-semibold">Treino Inferior</h1>
      <div className="flex flex-row items-center font-medium">
        Aérobico <X className="ml-1 h-6 w-6" />
      </div>

      <div className="flex flex-row items-center gap-2">
        <span className="text-sm font-medium">há 3 dias</span>
        <Button variant="outline" className="h-6 p-2">
          <Search className="h-3 w-3" />
          <span className="sr-only">Detalhes do Treino</span>
        </Button>
      </div>
    </div>
  )
}
