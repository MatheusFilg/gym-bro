import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar'

export function AppLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-app lg:gap-2">
      <Sidebar />
      <div className="pt-16 lg:pt-0">
        <Outlet />{' '}
      </div>
    </div>
  )
}
