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
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    user.accessToken = token
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser(): AuthResponse | null {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user) {
      return user
    }
    return null
  }

  setUser(user: AuthResponse) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  removeUser() {
    localStorage.removeItem('user')
  }
}

export default new TokenService()
