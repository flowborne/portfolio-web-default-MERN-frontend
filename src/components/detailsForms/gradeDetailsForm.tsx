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
import SubjectAutocomplete from '../autocomplets/SubjectAutocomplete'
import StudentAutocomplete from '../autocomplets/StudentAutocomplete'
import TeacherAutocomplete from '../autocomplets/TeacherAutocomplete'

interface GradeDetailsProps {
  id: string | undefined
}

export default function GradeDetailsForm({ id }: GradeDetailsProps) {
  const { request } = useHTTP()
  const navigate = useNavigate()
  const [gradeData, setGradeData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [ticketNumber, setTicketNumber] = useState<number>(0)
  const [gradeValue, setGradeValue] = useState<number>(0)
  const [studentID, setStudentID] = useState<string>('')
  const [subjectID, setSubjectID] = useState<string>('')
  const [teacherID, setTeacherID] = useState<string>('')

  useEffect(() => {
    let isMounted = true

    const fetchGrade = async () => {
      if (isMounted) {
        try {
          const responseData: any = await request(`/api/grade/${id}`, 'GET')
          setGradeData(responseData)
          setTicketNumber(responseData.ticket_number)
          setGradeValue(responseData.grade_value)
          setStudentID(responseData.student_ID)
          setSubjectID(responseData.subject_ID)
          setTeacherID(responseData.teacher_ID)
        } catch (err) {
          setError('An error occurred while fetching grade data')
        } finally {
          setLoading(false)
        }
      }
    };

    fetchGrade()

    return () => {
      isMounted = false
    };
  }, [id, request])

  const handleUpdate = async () => {
    setLoading(true)
    try {
      const response = await request(`/api/grade/${id}`, 'PUT', {
        ticket_number: ticketNumber,
        grade_value: gradeValue,
        student_ID: studentID,
        subject_ID: subjectID,
        teacher_ID: teacherID
      })
      console.log(response);
      setGradeData({ ...gradeData, ticket_number: ticketNumber, grade_value: gradeValue, student_ID: studentID, subject_ID: subjectID, teacher_ID: teacherID });
      navigate('/Grades/all-grades');
    } catch (err) {
      console.error('An error occurred:', err);
      setError('An error occurred while updating grade data')
    } finally {
      setLoading(false)
    }
  };

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await request(`/api/grade/${id}`, 'DELETE')
      console.log(response)
      navigate('/Grades/all-grades')
    } catch (err) {
      console.error('An error occurred:', err)
      setError('An error occurred while deleting the grade')
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

  if (!gradeData) {
    return <Typography>No data found for the grade with ID: {id}</Typography>
  }
  const onSubjectSelect = (subject: any) => {
    setSubjectID(subject ? subject._id : '')
  }
  
  const onStudentSelect = (student: any) => {
    setStudentID(student ? student._id : '')
  }
  const onTeacherSelect = (teacher: any) => {
    setTeacherID(teacher ? teacher._id : '')
  }
  

  return (
    <Container style={details.container}>
      <Box sx={details.boxContainer}>
        <Typography variant="h4" gutterBottom>
          Grade Details
        </Typography>
        <Box sx={details.formBox}>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <TextField
              fullWidth
              margin="normal"
              id="ticket_number"
              label="Ticket Number"
              variant="outlined"
              type="number"
              value={ticketNumber}
              onChange={(e) => setTicketNumber(Number(e.target.value))}
            />
            <TextField
              fullWidth
              margin="normal"
              id="grade_value"
              label="Grade Value"
              variant="outlined"
              type="number"
              value={gradeValue}
              onChange={(e) => setGradeValue(Number(e.target.value))}
            />
              <StudentAutocomplete onStudentSelect={onStudentSelect}/>
            <TextField
              fullWidth
              margin="normal"
              id="student_ID"
              label="Student ID"
              variant="outlined"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
            />
              <SubjectAutocomplete onSubjectSelect={onSubjectSelect} />
            <TextField
              fullWidth
              margin="normal"
              id="subject_ID"
              label="Subject ID"
              variant="outlined"
              value={subjectID}
              onChange={(e) => setSubjectID(e.target.value)}
            />
            <TeacherAutocomplete onTeacherSelect={onTeacherSelect}/>
            <TextField
              fullWidth
              margin="normal"
              id="teacher_ID"
              label="Teacher ID"
              variant="outlined"
              value={teacherID}
              onChange={(e) => setTeacherID(e.target.value)}
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
