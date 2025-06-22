import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useState, FormEvent } from 'react'
import { useHTTP } from '../../hooks/http.hook'
import { addEntity } from './addEntity.styles'

interface AddEntityFormProps {
  entityLabel: string
  apiEndpoint: string
  fields: {
    name: string
    label: string
    required: boolean
  }[]
}

export default function AddEntityForm({
  entityLabel,
  apiEndpoint,
  fields
}: AddEntityFormProps) {
  const { request } = useHTTP()

  const initialFormState = fields.reduce(
    (acc, field) => {
      acc[field.name] = ''
      return acc
    },
    {} as { [key: string]: string }
  )

  const initialErrorState = fields.reduce(
    (acc, field) => {
      acc[field.name] = ''
      return acc
    },
    {} as { [key: string]: string }
  )

  const [upForm, setUpForm] = useState(initialFormState)
  const [errors, setErrors] = useState(initialErrorState)

  const validateField = (name: string, value: string) => {
    let error = ''

    const field = fields.find((field) => field.name === name)
    if (field?.required && !value) {
      error = `${field.label} is required`
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
        const data = await request(apiEndpoint, 'POST', { ...upForm })
        console.log(data)
        setUpForm(initialFormState)
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
      <Box sx={addEntity.container}>
        <Typography component='h1' variant='h5'>
          {entityLabel}
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmitWrapper}
          sx={addEntity.form}
        >
          <Grid container spacing={2}>
            {fields.map((field) => (
              <Grid item key={field.name} xs={12}>
                <TextField
                  autoComplete={field.name}
                  autoFocus={field.name === fields[0].name}
                  error={Boolean(errors[field.name])}
                  fullWidth
                  helperText={errors[field.name]}
                  id={field.name}
                  label={field.label}
                  name={field.name}
                  onChange={changeUpForm}
                  required={field.required}
                  value={upForm[field.name]}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            disabled={!isFormValid()}
            fullWidth
            sx={addEntity.submitButton}
            type='submit'
            variant='contained'
          >
            {entityLabel}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
