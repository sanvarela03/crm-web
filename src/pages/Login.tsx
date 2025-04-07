import { useState } from 'react'
import { useAuth } from '../auth/userAuth'

const Login = () => {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(username, password)
      alert('Login exitoso')
    } catch (err) {
      alert('Error al iniciar sesión')
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Iniciar sesión </h1>
      <p>{import.meta.env.VITE_API_BASE_URL}</p>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  )
}

export default Login
