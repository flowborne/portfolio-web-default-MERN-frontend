import PageWrapper from '../../../components/pageWrapper/PageWrapper'
import { useParams } from 'react-router-dom'
import SubjectDetailsForm from '../../../components/detailsForms/subjectDetailsForm'

const OneSubjectPage = () => {
  const { subjectId } = useParams()

  return (
    <PageWrapper>
      <SubjectDetailsForm id={subjectId} />
    </PageWrapper>
  )
}

export default OneSubjectPage
