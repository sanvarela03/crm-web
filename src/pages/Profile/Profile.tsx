import tokenService from '../../services/token.service'

export default function Profile() {
  const user = tokenService.getUser()

  return (
    <>
      <div>
        <p>
          Bienvenido{' '}
          <span style={{ fontWeight: 'bold' }}>{user?.username}</span>
        </p>
      </div>
    </>
  )
}
