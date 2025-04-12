import { useState } from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import './Login.css'
import AuthService from '../../services/auth.service'

interface Values {
  username: string
  password: string
}

const Login = () => {
  const navigate: NavigateFunction = useNavigate()
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const validationSchema = () => {
    return Yup.object().shape({
      username: Yup.string()
        .required('Usuario requerido')
        .min(4, 'El nombre de usuario debe tener al menos 4 caracteres'),
      password: Yup.string()
        .required('Contraseña requerido')
        .min(5, 'La contraseña debe tener al menos 5 caracteres'),
    })
  }

  const handleLogin = (formValue: Values) => {
    const { username, password } = formValue
    setMessage('')
    setLoading(true)
    AuthService.login(username, password).then(
      () => {
        navigate('/profile')
        window.location.reload()
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()

        // const resMessage = error.message || error.toString()

        setLoading(false)
        console.log('Error en el login ->', error)
        setMessage(resMessage)
      }
    )
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      <Form className="container-login">
        <h1>Iniciar sesión </h1>
        {/* <p>{import.meta.env.VITE_API_BASE_URL}</p> */}
        <div>
          <Field
            className="login-field"
            name="username"
            type="text"
            placeholder="Usuario"
          />
          <ErrorMessage name="username" component="div" className="error-msg" />
        </div>
        <div>
          <Field
            className="login-field"
            name="password"
            type="password"
            placeholder="Contraseña"
          />
          <ErrorMessage name="password" component="div" className="error-msg" />
        </div>
        <button type="submit" disabled={loading}>
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Iniciar sesión</span>
        </button>
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
      </Form>
    </Formik>
  )
}

export default Login
