'use client'

import { useTheme } from '@/app/providers/ThemeProvider'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isLuxe = theme === 'theme-luxe'

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-lg transition-all duration-300"
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-primary)',
      }}
      title={isLuxe ? 'Passer au mode Premium' : 'Passer au mode Luxe'}
    >
      {isLuxe ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  )
}
