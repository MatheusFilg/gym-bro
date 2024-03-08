import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavItemProps = LinkProps

export function NavItem(props: NavItemProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-current={pathname === props.to}
      {...props}
      className="flex flex-row items-center gap-2 rounded p-1 lg:hover:bg-accent lg:hover:text-muted-foreground"
    />
  )
}
