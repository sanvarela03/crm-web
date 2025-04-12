import React from 'react'
import { Link } from 'react-router-dom'

interface NavbarProps {
  currentUser?: { username: string } | null
  showModeratorBoard: boolean
  showAdminBoard: boolean
  showCandidateBoard: boolean
  logOut: () => void
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  showModeratorBoard,
  showAdminBoard,
  showCandidateBoard,
  logOut,
}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand">
        CRM
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              Inicio
            </Link>
          </li>
          {showModeratorBoard && (
            <li className="nav-item">
              <Link to="/mod" className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showCandidateBoard && (
            <li className="nav-item">
              <Link to="/candidate" className="nav-link">
                Panel de campaña
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to="/admin" className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to="/user" className="nav-link">
                User
              </Link>
            </li>
          )}
        </ul>
        <ul className="navbar-nav ms-auto">
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={logOut}>
                  Salir
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Ingresar
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
