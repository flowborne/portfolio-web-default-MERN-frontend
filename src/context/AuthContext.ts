import { createContext } from 'react'

type AuthContextProps = {
  token: string | null
  login: (jwtToken: string, id: string) => void
  logout: () => void
  userID: string | null
  isAuthenticated: boolean
}

const noop = () => {}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  userID: null,
  login: noop,
  logout: noop,
  isAuthenticated: false
})
