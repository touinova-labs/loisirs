'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type WebSiteTheme = 'theme-premium' | 'theme-luxe'

interface ThemeContextType {
	theme: WebSiteTheme
	toggleTheme: () => void
	setTheme: (theme: WebSiteTheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const defaultTheme = (process.env.NEXT_PUBLIC_DEFAULT_THEME as WebSiteTheme) || 'theme-premium'
	const [theme, setThemeState] = useState<WebSiteTheme>(defaultTheme)
	const [mounted, setMounted] = useState(false)

	// Load theme from localStorage on mount
	useEffect(() => {
		setMounted(true)
		const savedTheme = localStorage.getItem('app-theme') as WebSiteTheme | null
		const preferredTheme = savedTheme || defaultTheme

		setThemeState(preferredTheme)
		applyTheme(preferredTheme)
	}, [])

	// Apply theme to document
	const applyTheme = (newTheme: WebSiteTheme) => {
		const html = document.documentElement

		// Remove all theme classes
		html.classList.remove('theme-premium', 'theme-luxe')

		// Add new theme class
		html.classList.add(newTheme)

		// Save to localStorage
		localStorage.setItem('app-theme', newTheme)
	}

	const toggleTheme = () => {
		const newTheme = theme === 'theme-premium' ? 'theme-luxe' : 'theme-premium'
		setThemeState(newTheme)
		applyTheme(newTheme)
	}

	const setTheme = (newTheme: WebSiteTheme) => {
		setThemeState(newTheme)
		applyTheme(newTheme)
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

// Hook to use theme context
export function useTheme() {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme must be used within ThemeProvider')
	}
	return context
}
