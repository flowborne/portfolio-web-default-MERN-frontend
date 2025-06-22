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



interface SubjectDetailsProps {
  id: string | undefined
}

export default function SubjectDetailsForm({ id }: SubjectDetailsProps) {
    const { request } = useHTTP();
    const navigate = useNavigate();
    const [subjectData, setSubjectData] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [subjectName, setSubjectName] = useState<string>('')
  
    useEffect(() => {
      let isMounted = true;
  
      const fetchSubject = async () => {
        if (isMounted) {
          try {
            const responseData: any = await request(`/api/subject/${id}`, 'GET')
            setSubjectData(responseData)
            setSubjectName(responseData.subject_name)
          } catch (err) {
            setError('An error occurred while fetching subject data')
          } finally {
            setLoading(false)
          }
        }
      };
  
      fetchSubject()
  
      return () => {
        isMounted = false
      };
    }, [id, request])
  
    const handleUpdate = async () => {
      setLoading(true)
      try {
        const response = await request(`/api/subject/${id}`, 'PUT', { subject_name: subjectName })
        console.log(response)
        setSubjectData({ ...subjectData, subject_name: subjectName })
        navigate('/Subjects/all-subjects')
      } catch (err) {
        console.error('An error occurred:', err)
        setError('An error occurred while updating subject data')
      } finally {
        setLoading(false)
      }
    }
  
    const handleDelete = async () => {
      setLoading(true)
      try {
        const response = await request(`/api/subject/${id}`, 'DELETE')
        console.log(response);
        navigate('/Subjects/all-subjects')
      } catch (err) {
        console.error('An error occurred:', err)
        setError('An error occurred while deleting the subject')
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
  
    if (!subjectData) {
      return <Typography>No data found for the subject with ID: {id}</Typography>
    }
  
    return (
      <Container style={details.container}>
        <Box sx={details.boxContainer}>
          <Typography variant="h4" gutterBottom>
            Subject Details
          </Typography>
          <Box sx={details.formBox}>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate() }}>
              <TextField
                fullWidth
                margin="normal"
                id="subject_name"
                label="Subject Name"
                variant="outlined"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
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