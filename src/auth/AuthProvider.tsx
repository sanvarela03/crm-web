import { createContext, useState, useEffect, ReactNode } from 'react'
import api from '../api/axios'
import { AuthUser } from '../types/AuthUser'

interface AuthContextType {
  user: AuthUser | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  accessToken: string | null
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)

  const login = async (username: string, password: string) => {
    const res = await api.post('/auth/signin', { username, password })
    setUser(res.data)
    setAccessToken(res.data.token)
    setRefreshToken(res.data.refreshToken)
  }

  const logout = () => {
    setUser(null)
    setAccessToken(null)
    setRefreshToken(null)
  }

  // Refrescar token automáticamente
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config
        if (
          err.response?.status === 401 &&
          refreshToken &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true
          try {
            const res = await api.post('/auth/refreshtoken', {
              refreshToken,
            })
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            api.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${res.data.accessToken}`
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${res.data.accessToken}`
            return api(originalRequest)
          } catch (e) {
            logout()
            return Promise.reject(e)
          }
        }
        return Promise.reject(err)
      }
    )

    return () => {
      api.interceptors.response.eject(interceptor)
    }
  }, [refreshToken])

  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  }, [accessToken])

  return (
    <AuthContext.Provider value={{ user, login, logout, accessToken }}>
      {children}
    </AuthContext.Provider>
  )
}
