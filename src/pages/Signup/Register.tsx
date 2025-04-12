import { useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import AuthService from '../../services/auth.service'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import './Register.css'

interface Values {
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
  phone: string
  roles: string[]
}

const availableRoles = ['Usuario', 'Administrador', 'Moderador']

const Register = () => {
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
      email: Yup.string().required('Correo requerido').email('Correo inválido'),
      firstName: Yup.string().required('Nombre requerido'),
      lastName: Yup.string().required('Apellido requerido'),
      phone: Yup.string().required('Teléfono requerido'),
      roles: Yup.array().of(Yup.string()),
    })
  }

  const handleLogin = (formValue: Values) => {
    setMessage('')
    setLoading(true)
    AuthService.register(formValue).then(
      () => {
        navigate('/login')
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
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        roles: [],
      }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      <Form className="container-login">
        <h1>Crear cuenta</h1>
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
        <div>
          <Field
            className="login-field"
            name="email"
            type="text"
            placeholder="Correo"
          />
          <ErrorMessage name="email" component="div" className="error-msg" />
        </div>
        <div>
          <Field
            className="login-field"
            name="firstName"
            type="text"
            placeholder="Nombre"
          />
          <ErrorMessage
            name="firstName"
            component="div"
            className="error-msg"
          />
        </div>

        <div>
          <Field
            className="login-field"
            name="lastName"
            type="text"
            placeholder="Apellido"
          />
          <ErrorMessage name="lastName" component="div" className="error-msg" />
        </div>
        <div>
          <Field
            className="login-field"
            name="phone"
            type="text"
            placeholder="Teléfono"
          />
          <ErrorMessage name="phone" component="div" className="error-msg" />
        </div>
        <div>
          <label>Selecciona roles:</label>
          <Field
            as="select"
            name="roles"
            multiple
            className="login-field"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const selectedRoles = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              )
              setFieldValue('roles', selectedRoles)
            }}
          >
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Field>
          <ErrorMessage name="roles" component="div" className="error-msg" />
        </div>
        <button type="submit" disabled={loading}>
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>{'Continuar >'}</span>
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

export default Register
