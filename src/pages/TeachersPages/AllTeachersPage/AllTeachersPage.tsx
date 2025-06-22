import PageWrapper from '../../../components/pageWrapper/PageWrapper'
import FetchDataTable from '../../../components/fetchDataTable/fetchDataTable'

const AllTeachersPage = () => {
  const columns = [
    { field: '_id', headerName: 'id' },
    { field: 'firstName', headerName: 'First Name' },
    { field: 'lastName', headerName: 'Last Name' }
  ]
  return (
    <PageWrapper>
      <FetchDataTable
        apiEndpoint='/api/teacher'
        columns={columns}
        navigateParams='/Teachers/one-teacher/'
        tableLabel='Teacher table'
      />
    </PageWrapper>
  )
}
export default AllTeachersPage
