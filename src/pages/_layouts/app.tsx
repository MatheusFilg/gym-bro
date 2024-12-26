import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar'

export function AppLayout() {
  return (
    <div className="flex min-h-screen antialiased lg:grid lg:grid-cols-app">
      <Sidebar />
      <div>
        <Outlet />{' '}
      </div>
    </div>
  )
}
