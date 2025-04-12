import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
  Dropdown,
  Divider,
} from '@heroui/react'
import { useLocation } from 'react-router-dom'
import { FaMoon, FaSun } from 'react-icons/fa6'
import { useTheme } from '@heroui/use-theme'

interface NavbarProps {
  currentUser?: { username: string } | null
  showModeratorBoard: boolean
  showAdminBoard: boolean
  showCandidateBoard: boolean
  logOut: () => void
}

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}

const MyNavbar: React.FC<NavbarProps> = ({
  currentUser,
  showModeratorBoard,
  showAdminBoard,
  showCandidateBoard,
  logOut,
}) => {
  const location = useLocation()
  const { theme, setTheme } = useTheme()
  console.log(location.pathname)
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/home">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === '/'}>
          <Link color="foreground" aria-current="page" href="/">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem
          className="hidden lg:flex"
          isActive={location.pathname === '/login'}
        >
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent>
        <NavbarItem>
          <Divider orientation="vertical" className="h-4" />
        </NavbarItem>
        <NavbarItem>
          <Button
            style={{ borderRadius: '50%' }}
            isIconOnly
            variant="bordered"
            color="default"
            onPress={() =>
              theme === 'light' ? setTheme('dark') : setTheme('light')
            }
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default MyNavbar
