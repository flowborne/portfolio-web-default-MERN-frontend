import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useHTTP } from '../../../hooks/http.hook'
import { useState, FormEvent } from 'react'
import { signUpStyles } from './signUP.styles'

export default function SignUp() {
  const { loading, request } = useHTTP()

  const [upForm, setUpForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const validateField = (name: string, value: string) => {
    let error = ''

    switch (name) {
      case 'firstName':
        if (!value) error = 'First name is required'
        break
      case 'lastName':
        if (!value) error = 'Last name is required'
        break
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

  const changeUpForm = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target
    setUpForm({ ...upForm, [name]: value })
    validateField(name, value)
  }

  const isFormValid = () => {
    return (
      Object.values(upForm).every((value) => value !== '') &&
      Object.values(errors).every((error) => error === '')
    )
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isFormValid()) {
      try {
        const data = await request('/api/auth/register', 'POST', { ...upForm })
        console.log(data)
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
      <Box sx={signUpStyles.container}>
        <Avatar sx={signUpStyles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmitWrapper}
          sx={signUpStyles.form}
        >
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <TextField
                autoComplete='given-name'
                autoFocus
                error={Boolean(errors.firstName)}
                fullWidth
                helperText={errors.firstName}
                id='firstName'
                label='First Name'
                name='firstName'
                onChange={changeUpForm}
                required
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                autoComplete='family-name'
                error={Boolean(errors.lastName)}
                fullWidth
                helperText={errors.lastName}
                id='lastName'
                label='Last Name'
                name='lastName'
                onChange={changeUpForm}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='email'
                error={Boolean(errors.email)}
                fullWidth
                helperText={errors.email}
                id='email'
                label='Email Address'
                name='email'
                onChange={changeUpForm}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='new-password'
                error={Boolean(errors.password)}
                fullWidth
                helperText={errors.password}
                id='password'
                label='Password'
                name='password'
                onChange={changeUpForm}
                required
                type='password'
              />
            </Grid>
          </Grid>
          <Button
            disabled={loading || !isFormValid()}
            fullWidth
            sx={signUpStyles.submitButton}
            type='submit'
            variant='contained'
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
