import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, BookOpen, FileText, User, LogOut, Moon, Sun } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Subjects', href: '/subjects', icon: BookOpen },
  { name: 'Assignments', href: '/assignments', icon: FileText },
  { name: 'Profile', href: '/profile', icon: User },
]

export const Sidebar: React.FC = () => {
  const { logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r">
      <div className="flex h-16 items-center px-6 border-b">
        <h1 className="text-xl font-bold text-primary">StudentHub</h1>
      </div>
      
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="border-t p-4 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="w-full justify-start"
        >
          {theme === 'light' ? (
            <Moon className="mr-3 h-4 w-4" />
          ) : (
            <Sun className="mr-3 h-4 w-4" />
          )}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="w-full justify-start text-destructive hover:text-destructive"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
