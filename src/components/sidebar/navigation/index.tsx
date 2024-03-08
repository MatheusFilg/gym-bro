import { Home, Weight } from 'lucide-react'

import { NavItem } from './nav-item'

export function Navigation() {
  return (
    <div className="flex flex-col space-y-1.5">
      <NavItem to="/">
        <Home />
        <span className="text-lg font-semibold">Home</span>
      </NavItem>
      <NavItem to="/treinos">
        <Weight />
        <span className="text-lg font-semibold">Treinos</span>
      </NavItem>
    </div>
  )
}
