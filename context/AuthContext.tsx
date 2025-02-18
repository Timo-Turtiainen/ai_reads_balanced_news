import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as AppleAuthentication from 'expo-apple-authentication'

interface AuthContextType {
  user: AppleAuthentication.AppleAuthenticationCredential | null
  setUser: (user: AppleAuthentication.AppleAuthenticationCredential | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppleAuthentication.AppleAuthenticationCredential | null>(null)

  useEffect(() => {
    async function loadUser() {
      const storedUser = await AsyncStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
    loadUser()
  }, [])

  const logout = async () => {
    await AsyncStorage.removeItem('user')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
