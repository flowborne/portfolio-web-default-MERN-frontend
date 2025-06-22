import { useState, useCallback, useEffect } from 'react'

interface AuthState {
  token: string | null
  userID: string | null
}

const storageName = 'userData'

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    userID: null
  })

  const login = useCallback((jwtToken: string, id: string) => {
    setAuthState({ token: jwtToken, userID: id })

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userID: id,
        token: jwtToken
      })
    )
  }, [])

  const logout = useCallback(() => {
    setAuthState({ token: null, userID: null })

    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = localStorage.getItem(storageName)
    if (data) {
      const loginData = JSON.parse(data) as AuthState
      if (loginData.token && loginData.userID) {
        login(loginData.token, loginData.userID)
      }
    }
  }, [login])

  return { ...authState, login, logout }
}
