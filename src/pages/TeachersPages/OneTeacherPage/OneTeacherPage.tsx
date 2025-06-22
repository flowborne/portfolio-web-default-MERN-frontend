import PageWrapper from '../../../components/pageWrapper/PageWrapper'
import { useParams } from 'react-router-dom'
import TeacherDetailsForm from '../../../components/detailsForms/teacherDetailsForm'

const OneTeacherPage = () => {
  const { teacherId } = useParams()

  return (
    <PageWrapper>
      <TeacherDetailsForm id={teacherId} />
    </PageWrapper>
  )
}

export default OneTeacherPage
