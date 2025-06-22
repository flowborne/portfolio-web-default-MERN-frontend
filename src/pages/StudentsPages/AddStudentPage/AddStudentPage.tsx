import PageWrapper from '../../../components/pageWrapper/PageWrapper'
import AddEntityForm from '../../../components/addEntityForm/addEntityForm'

const AddStudentPage = () => {
  return (
    <PageWrapper>
      <AddEntityForm
        apiEndpoint='/api/student/add'
        entityLabel='Add Student'
        fields={[
          { name: 'lastName', label: 'Last Name', required: true },
          { name: 'group_name', label: 'Group name', required: true }
        ]}
      />
    </PageWrapper>
  )
}

export default AddStudentPage
