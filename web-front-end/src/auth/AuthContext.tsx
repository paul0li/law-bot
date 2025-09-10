import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { login as apiLogin } from '../lib/api'

type User = {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

type AuthContextType = {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('auth')
    if (stored) {
      const parsed = JSON.parse(stored)
      setUser(parsed.user)
      setToken(parsed.token)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const res = await apiLogin(email, password)
    setUser(res.user)
    setToken(res.token)
    localStorage.setItem('auth', JSON.stringify(res))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth')
  }

  const value = useMemo(() => ({ user, token, login, logout }), [user, token])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
