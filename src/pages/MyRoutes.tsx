import { Route, Routes } from 'react-router-dom'
import BoardAdmin from './Admin/BoardAdmin'
import Home from './Home/Home'
import Login from './Login/Login'
import BoardModerator from './Moderator/BoardModerator'
import Profile from './Profile/Profile'
import Register from './Signup/Register'
import BoardUser from './User/BoardUser'
import Secure from './ProtectedRoute'
import CandidateBoard from './Candidate/CandidateBoard'

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Secure element={<Profile />} />} />
      <Route path="/user" element={<Secure element={<BoardUser />} />} />
      <Route
        path="/mod"
        element={
          <Secure element={<BoardModerator />} roles={['ROLE_MODERATOR']} />
        }
      />
      <Route
        path="/admin"
        element={<Secure element={<BoardAdmin />} roles={['ROLE_ADMIN']} />}
      />
      <Route
        path="/candidate"
        element={
          <Secure element={<CandidateBoard />} roles={['ROLE_CANDIDATE']} />
        }
      />
    </Routes>
  )
}
