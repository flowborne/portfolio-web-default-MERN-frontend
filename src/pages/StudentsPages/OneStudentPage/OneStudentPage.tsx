import PageWrapper from '../../../components/pageWrapper/PageWrapper'
import { useParams } from 'react-router-dom'
import StudentDetailsForm from '../../../components/detailsForms/studentDetailsForm'

const OneStudentPage = () => {
  const { studentId } = useParams()

  return (
    <PageWrapper>
      <StudentDetailsForm id={studentId} />
    </PageWrapper>
  )
}

export default OneStudentPage
