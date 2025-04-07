// src/api.ts
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8080/v1/api',
})

let refreshTokenInProgress = false
let refreshSubscribers: ((token: string) => void)[] = []

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb)
}

const onTokenRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((cb) => cb(newToken))
  refreshSubscribers = []
}

// Interceptor para agregar token a cada request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// Interceptor para manejar refresh automático
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const refreshToken = localStorage.getItem('refreshToken')

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      if (refreshTokenInProgress) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`
            resolve(axios(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      refreshTokenInProgress = true

      try {
        const response = await axios.post(
          'http://localhost:8080/v1/api/auth/refreshtoken',
          {
            refreshToken,
          }
        )

        const {
          accessToken,
          refreshToken: newRefreshToken,
          tokenType,
        } = response.data

        // Guardamos los nuevos tokens
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', newRefreshToken)

        const authHeader = `${tokenType} ${accessToken}`
        onTokenRefreshed(accessToken)

        originalRequest.headers['Authorization'] = authHeader
        return axios(originalRequest)
      } catch (err) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(err)
      } finally {
        refreshTokenInProgress = false
      }
    }

    return Promise.reject(error)
  }
)

export default API
