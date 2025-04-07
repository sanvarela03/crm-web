import { AuthResponse } from '../types/auth'

class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return user?.refreshToken || null
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return user?.accessToken || null
  }

  updateLocalAccessToken(token: string) {
    let user = JSON.parse(localStorage.getItem('user') || '{}')
    user.accessToken = token
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser(): AuthResponse {
    return JSON.parse(localStorage.getItem('user') || '{}')
  }

  setUser(user: AuthResponse) {
    localStorage.setItem('user', JSON.stringify(user))
  }
}

export default new TokenService()
