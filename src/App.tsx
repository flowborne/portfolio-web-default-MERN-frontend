import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook'
import RoutesComponent from './router/routes'

const App = () => {
  const { token, login, logout, userID } = useAuth()
  const isAuthenticated = !!token
  return (
    <AuthContext.Provider
      value={{ token, login, logout, userID, isAuthenticated }}
    >
      <RoutesComponent isAuthenticated={isAuthenticated} />
    </AuthContext.Provider>
  )
}

export default App
