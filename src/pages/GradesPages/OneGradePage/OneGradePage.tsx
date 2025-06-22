import PageWrapper from '../../../components/pageWrapper/PageWrapper'
import { useParams } from 'react-router-dom'
import GradeDetailsForm from '../../../components/detailsForms/gradeDetailsForm'

const OneGradePage = () => {
  const { gradeId } = useParams()

  return (
    <PageWrapper>
      <GradeDetailsForm id={gradeId} />
    </PageWrapper>
  )
}

export default OneGradePage
