import { Dumbbell } from 'lucide-react'

export function WorkoutEmpty() {
  return (
    <div className="flex h-80 flex-col items-center justify-center gap-4">
      <div className="flex flex-row items-center gap-2">
        <Dumbbell className="h-8 w-8" />
        <span className="text-2xl font-semibold tracking-tight">Gym.Bro</span>
      </div>
      <p className="max-w-80 text-center leading-relaxed ">
        Você ainda não cadastrou nenhum treino, que tal cadastrar agora?
      </p>
    </div>
  )
}
