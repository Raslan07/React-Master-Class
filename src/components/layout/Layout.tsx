import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useTheme } from '../../hooks/useTheme'

export function Layout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleTheme={toggleTheme} theme={theme} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}