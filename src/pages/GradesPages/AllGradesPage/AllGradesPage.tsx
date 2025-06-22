import PageWrapper from '../../../components/pageWrapper/PageWrapper'
import FetchDataTable from '../../../components/fetchDataTable/fetchDataTable'

const AllGradesPage = () => {
  const columns = [
    { field: '_id', headerName: 'id' },
    { field: 'ticket_number', headerName: 'Ticket number' },
    { field: 'grade_value', headerName: 'Grade value' },
    { field: 'student_ID', headerName: 'Student ID' },
    { field: 'subject_ID', headerName: 'Subject ID' },
    { field: 'teacher_ID', headerName: 'Teacher ID' }
  ]
  return (
    <PageWrapper>
      <FetchDataTable
        apiEndpoint='/api/grade'
        columns={columns}
        navigateParams='/Grades/one-grade/'
        tableLabel='Grades table'
      />
    </PageWrapper>
  )
}

export default AllGradesPage
