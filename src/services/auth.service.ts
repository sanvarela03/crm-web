import api from '../api/axios'
import TokenService from './token.service'

interface RegisterRequest {
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
  phone: string
  roles: string[]
}
class AuthService {
  login(username: string, password: string) {
    return api.post('auth/signin', { username, password }).then((response) => {
      if (response.data.token) {
        TokenService.setUser(response.data)
      }
      return response.data
    })
  }

  async logout() {
    return api.post('auth/signout').then((response) => {
      if (response.data) {
        TokenService.removeUser()
      }
      return response.data.message
    })
  }

  register(data: RegisterRequest) {
    return api.post('auth/signup', data)
  }

  getCurrentUser() {
    return TokenService.getUser()
  }
}

export default new AuthService()
