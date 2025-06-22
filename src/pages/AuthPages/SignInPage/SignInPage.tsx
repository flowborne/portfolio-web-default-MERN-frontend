import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'

import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useHTTP } from '../../../hooks/http.hook'
import { useState, FormEvent, useContext } from 'react'
import { signInStyles } from './signIn.styles'
import { AuthContext } from '../../../context/AuthContext'

export default function SignIn() {
  const auth = useContext(AuthContext)
  const { loading, request } = useHTTP()

  const [inForm, setInForm] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const validateField = (name: string, value: string) => {
    let error = ''

    switch (name) {
      case 'email':
        if (!value) {
          error = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Email is invalid'
        }
        break
      case 'password':
        if (!value) {
          error = 'Password is required'
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters'
        } else if (!/[A-Z]/.test(value)) {
          error = 'Password must contain at least one uppercase letter'
        } else if (!/[0-9]/.test(value)) {
          error = 'Password must contain at least one number'
        } else if (!/[!@#$%^&*]/.test(value)) {
          error = 'Password must contain at least one special character'
        }
        break
      default:
        break
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }))
  }

  const changeInForm = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target
    setInForm({ ...inForm, [name]: value })
    validateField(name, value)
  }

  const isFormValid = () => {
    return (
      Object.values(inForm).every((value) => value !== '') &&
      Object.values(errors).every((error) => error === '')
    )
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isFormValid()) {
      try {
        const data = await request('/api/auth/login', 'POST', { ...inForm })
        auth.login(data.token, data.userId)
      } catch (err) {
        console.error('An error occurred:', err)
      }
    } else {
      console.error('Form is not valid')
    }
  }

  const handleSubmitWrapper = (event: FormEvent<HTMLFormElement>): void => {
    handleSubmit(event).catch((err) => console.error('An error occurred:', err))
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box sx={signInStyles.container}>
        <Avatar sx={signInStyles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmitWrapper}
          sx={signInStyles.form}
        >
          <TextField
            autoComplete='email'
            autoFocus
            error={Boolean(errors.email)}
            fullWidth
            helperText={errors.email}
            id='email'
            label='Email Address'
            margin='normal'
            name='email'
            onChange={changeInForm}
            required
          />
          <TextField
            autoComplete='current-password'
            error={Boolean(errors.password)}
            fullWidth
            helperText={errors.password}
            id='password'
            label='Password'
            margin='normal'
            name='password'
            onChange={changeInForm}
            required
            type='password'
          />
          <Button
            disabled={loading || !isFormValid()}
            fullWidth
            sx={signInStyles.submitButton}
            type='submit'
            variant='contained'
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
