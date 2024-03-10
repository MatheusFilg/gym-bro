import { User } from 'lucide-react'

export function SignIn() {
  return (
    <a
      href=""
      className="group flex flex-row items-center gap-3 transition-colors"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
        <User className="h-4 w-4" />
      </div>
      <p className="text-sm text-primary-foreground lg:group-hover:text-muted-foreground">
        <span className="font-semibold underline">Faça login</span> e registre
        seus treinos
      </p>
    </a>
  )
}
