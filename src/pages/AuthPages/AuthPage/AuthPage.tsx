import React from 'react'
import { useNavigate } from 'react-router-dom'
import ControlsMenu from '../../../components/controlsMenu/ControlsMenu'

const AuthPage: React.FC = () => {
  const navigate = useNavigate()

  const handleSignInClick = () => {
    navigate('/sign-in')
  }

  const handleSignUpClick = () => {
    navigate('/sign-up')
  }

  const buttons = [
    { label: 'Sign In', handleClick: handleSignInClick },
    { label: 'Sign Up', handleClick: handleSignUpClick }
  ]

  return <ControlsMenu buttons={buttons} showIcon title='Welcome to App' />
}

export default AuthPage
