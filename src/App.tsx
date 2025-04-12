import React, { useState, useEffect } from 'react'
import { useNavigate, useHref } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthService from './services/auth.service'
import Navbar from './components/Navbar'
import EventBus from './common/EventBus'
import MyRoutes from './pages/MyRoutes'
import MyNavbar from './components/NavbarLib/Navbar'
import { HeroUIProvider } from '@heroui/react'

interface CurrentUser {
  username: string
  roles: string[]
}

const App: React.FC = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false)
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false)
  const [showCandidateBoard, setShowCandidateBoard] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
      setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'))
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
      setShowCandidateBoard(user.roles.includes('ROLE_CANDIDATE'))
    }

    EventBus.on('logout', logOut)

    return () => {
      EventBus.remove('logout', logOut)
    }
  }, [])

  const logOut = async () => {
    setShowModeratorBoard(false)
    setShowAdminBoard(false)
    setShowCandidateBoard(false)
    setCurrentUser(null)
    navigate('/login')
    const msg = await AuthService.logout()
    alert(msg)
  }

  return (
    <div>
      <HeroUIProvider navigate={navigate} useHref={useHref}>
        <MyNavbar
          currentUser={currentUser}
          showModeratorBoard={showModeratorBoard}
          showAdminBoard={showAdminBoard}
          showCandidateBoard={showCandidateBoard}
          logOut={logOut}
        />

        <MyRoutes />
      </HeroUIProvider>
    </div>
  )
}

export default App
