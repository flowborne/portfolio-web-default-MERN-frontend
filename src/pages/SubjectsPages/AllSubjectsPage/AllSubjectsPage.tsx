import PageWrapper from '../../../components/pageWrapper/PageWrapper'
import FetchDataTable from '../../../components/fetchDataTable/fetchDataTable'

const AllSubjectsPage = () => {
  const columns = [
    { field: '_id', headerName: 'id' },
    { field: 'subject_name', headerName: 'Subjectname' }
  ]
  return (
    <PageWrapper>
      <FetchDataTable
        apiEndpoint='/api/subject'
        columns={columns}
        navigateParams='/Subjects/one-subject/'
        tableLabel='Subjects table'
      />
    </PageWrapper>
  )
}

export default AllSubjectsPage
