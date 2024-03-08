import { Home, Weight } from 'lucide-react'

import { NavItem } from './nav-item'

export function Navigation() {
  return (
    <div className="flex flex-col space-y-1.5">
      <NavItem href="/" icon={Home} title="Home" />
      <NavItem href="/treino" icon={Weight} title="Treinos" />
    </div>
  )
}
