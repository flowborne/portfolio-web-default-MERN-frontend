import { useState, useEffect } from 'react'
import { useHTTP } from '../../hooks/http.hook'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import { details } from './details.styles'

interface TeacherDetailsProps {
  id: string | undefined;
}

export default function TeacherDetailsForm({ id }: TeacherDetailsProps) {
  const { request } = useHTTP()
  const navigate = useNavigate()
  const [teacherData, setTeacherData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')

  useEffect(() => {
    let isMounted = true

    const fetchTeacher = async () => {
      if (isMounted) {
        try {
          const responseData: any = await request(`/api/teacher/${id}`, 'GET')
          setTeacherData(responseData);
          setFirstName(responseData.firstName);
          setLastName(responseData.lastName);
        } catch (err) {
          setError('An error occurred while fetching teacher data')
        } finally {
          setLoading(false)
        }
      }
    }

    fetchTeacher()

    return () => {
      isMounted = false
    };
  }, [id, request])

  const handleUpdate = async () => {
    setLoading(true)
    try {
      const response = await request(`/api/teacher/${id}`, 'PUT', {
        firstName,
        lastName
      });
      console.log(response);
      setTeacherData({ ...teacherData, firstName, lastName })
      navigate('/Teachers/all-teachers')
    } catch (err) {
      console.error('An error occurred:', err)
      setError('An error occurred while updating teacher data')
    } finally {
      setLoading(false)
    }
  };

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await request(`/api/teacher/${id}`, 'DELETE')
      console.log(response)
      navigate('/Teachers/all-teachers')
    } catch (err) {
      console.error('An error occurred:', err);
      setError('An error occurred while deleting the teacher')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>
  }

  if (!teacherData) {
    return <Typography>No data found for the teacher with ID: {id}</Typography>
  }

  return (
    <Container style={details.container}>
      <Box sx={details.boxContainer}>
        <Typography variant="h4" gutterBottom>
          Teacher Details
        </Typography>
        <Box sx={details.formBox}>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <TextField
              fullWidth
              margin="normal"
              id="firstName"
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              id="lastName"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Box sx={details.buttonGroup}>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? 'Updating...' : 'Update'}
              </Button>
              <Button onClick={handleDelete} variant="contained" color="secondary" disabled={loading}>
                Delete
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  )
}
