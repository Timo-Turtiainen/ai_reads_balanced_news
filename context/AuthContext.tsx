import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as AppleAuthentication from 'expo-apple-authentication'

interface AuthContextType {
  user: AppleAuthentication.AppleAuthenticationCredential | null
  setUser: (user: AppleAuthentication.AppleAuthenticationCredential | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppleAuthentication.AppleAuthenticationCredential | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const storedUser = await AsyncStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
          console.log('loadUser() user: ', user)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    loadUser()
  }, [])

  if (isLoading) {
    return null
  }

  async function logout() {
    await AsyncStorage.removeItem('user')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
