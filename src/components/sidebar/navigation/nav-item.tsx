import { ElementType } from 'react'

interface NavItemProps {
  title: string
  icon: ElementType
  href: string
}

export function NavItem({ title, icon: Icon, href }: NavItemProps) {
  return (
    <a
      href={href}
      className="flex flex-row items-center gap-2 rounded p-1 lg:hover:bg-accent lg:hover:text-muted-foreground"
    >
      <Icon />
      <span className="text-lg font-semibold">{title}</span>
    </a>
  )
}
