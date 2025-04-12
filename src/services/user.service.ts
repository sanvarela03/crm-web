import api from '../api/axios'

interface AddUserRequest {
  username: string
  email: string
  password: string
  role: string
}
interface UpdateUserRequest {
  username?: string
  email?: string
  password?: string
  role?: string
}

class UserService {
  getUsers() {
    return api.get('/users')
  }

  getUserById(id: string) {
    return api.get(`/users/${id}`)
  }

  createUser(data: AddUserRequest) {
    return api.post('/users', data)
  }

  updateUser(id: string, data: UpdateUserRequest) {
    return api.put(`/users/${id}`, data)
  }

  deleteUser(id: string) {
    return api.delete(`/users/${id}`)
  }
  getPublicContent = () => {
    return api.get('/test/all')
  }
}
export default new UserService()
