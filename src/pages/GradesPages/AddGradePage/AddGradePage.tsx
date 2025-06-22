import PageWrapper from '../../../components/pageWrapper/PageWrapper'
import AddEntityForm from '../../../components/addEntityForm/addEntityForm'

const AddGradePage = () => {
  return (
    <PageWrapper>
      <AddEntityForm
        apiEndpoint='/api/grade/add'
        entityLabel='Add Grade'
        fields={[
          { name: 'ticket_number', label: 'Ticket number', required: true },
          { name: 'grade_value', label: 'Grade value', required: true },
          { name: 'student_ID', label: 'Student ID', required: true },
          { name: 'subject_ID', label: 'Subject ID', required: true },
          { name: 'teacher_ID', label: 'Teacher ID', required: true }
        ]}
      />
    </PageWrapper>
  )
}

export default AddGradePage
