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

interface StudentDetailsProps {
  id: string | undefined
}

export default function StudentDetailsForm({ id }: StudentDetailsProps) {
  const { request } = useHTTP()
  const navigate = useNavigate()
  const [studentData, setStudentData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [lastName, setLastName] = useState<string>('')
  const [groupName, setGroupName] = useState<string>('')

  useEffect(() => {
    let isMounted = true

    const fetchStudent = async () => {
      if (isMounted) {
        try {
          const responseData: any = await request(`/api/student/${id}`, 'GET')
          setStudentData(responseData)
          setLastName(responseData.lastName)
          setGroupName(responseData.group_name)
        } catch (err) {
          setError('An error occurred while fetching student data')
        } finally {
          setLoading(false)
        }
      }
    }

    fetchStudent()

    return () => {
      isMounted = false
    };
  }, [id, request])

  const handleUpdate = async () => {
    setLoading(true)
    try {
      const response = await request(`/api/student/${id}`, 'PUT', {
        lastName,
        group_name: groupName
      })
      console.log(response);
      setStudentData({ ...studentData, lastName, group_name: groupName })
      navigate('/Students/all-students')
    } catch (err) {
      console.error('An error occurred:', err)
      setError('An error occurred while updating student data')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await request(`/api/student/${id}`, 'DELETE')
      console.log(response)
      navigate('/Students/all-students')
    } catch (err) {
      console.error('An error occurred:', err)
      setError('An error occurred while deleting the student')
    } finally {
      setLoading(false)
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>
  }

  if (!studentData) {
    return <Typography>No data found for the student with ID: {id}</Typography>
  }

  return (
    <Container style={details.container}>
      <Box sx={details.boxContainer}>
        <Typography variant="h4" gutterBottom>
          Student Details
        </Typography>
        <Box sx={details.formBox}>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <TextField
              fullWidth
              margin="normal"
              id="lastName"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              id="group_name"
              label="Group Name"
              variant="outlined"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
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
