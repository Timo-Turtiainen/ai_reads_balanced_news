import React, { createContext, useContext, useEffect, useState } from 'react'
import { useColorScheme } from '@/components/useColorScheme'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProviderContext({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme()
  const [theme, setThemeState] = useState<Theme>('system')

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme')
      if (savedTheme) {
        setThemeState(savedTheme as Theme)
      }
    }
    loadTheme()
  }, [])

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme)
    await AsyncStorage.setItem('theme', newTheme)
  }

  const currentTheme = theme === 'system' ? systemColorScheme ?? 'light' : theme
  console.log('currentTheme: ', currentTheme)
  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
