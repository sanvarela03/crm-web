// src/api/axios.ts
import axios from 'axios'
import TokenService from '../services/token.service'

const api = axios.create({
  baseURL: await import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalConfig = error.config
    if (originalConfig.url !== '/auth/signin' && error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true
        try {
          const rs = await api.post('/auth/refreshtoken', {
            refreshToken: TokenService.getLocalRefreshToken(),
          })
          TokenService.updateLocalAccessToken(rs.data.accessToken)
          return api(originalConfig)
        } catch (_error) {
          return Promise.reject(_error)
        }
      }
    }
    return Promise.reject(error)
  }
)

export default api
