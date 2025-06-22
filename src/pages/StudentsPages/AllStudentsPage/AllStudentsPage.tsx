import PageWrapper from '../../../components/pageWrapper/PageWrapper'
import FetchDataTable from '../../../components/fetchDataTable/fetchDataTable'

const AllStudentsPage = () => {
  const columns = [
    { field: '_id', headerName: 'id' },
    { field: 'lastName', headerName: 'Last Name' },
    { field: 'group_name', headerName: 'Group Name' }
  ]
  return (
    <PageWrapper>
      <FetchDataTable
        apiEndpoint='/api/student'
        columns={columns}
        navigateParams='/Students/one-student/'
        tableLabel='Students table'
      />
    </PageWrapper>
  )
}

export default AllStudentsPage
