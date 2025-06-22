import PageWrapper from '../../../components/pageWrapper/PageWrapper'
import AddEntityForm from '../../../components/addEntityForm/addEntityForm'

const AddTeacherPage = () => {
  return (
    <PageWrapper>
      <AddEntityForm
        apiEndpoint='/api/teacher/add'
        entityLabel='Add Teacher'
        fields={[
          { name: 'firstName', label: 'First Name', required: true },
          { name: 'lastName', label: 'Last Name', required: true }
        ]}
      />
    </PageWrapper>
  )
}

export default AddTeacherPage
