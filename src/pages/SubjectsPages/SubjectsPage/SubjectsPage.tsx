import PageWrapper from '../../../components/pageWrapper/PageWrapper'
import { useNavigate } from 'react-router-dom'
import ControlsMenu from '../../../components/controlsMenu/ControlsMenu'
import React from 'react'

const SubjectsPage: React.FC = () => {
  const navigate = useNavigate()

  const handleAllSubjectsClick = () => {
    navigate('/Subjects/all-subjects')
  }

  const handleAddSubjectClick = () => {
    navigate('/Subjects/add-subject')
  }

  const buttons = [
    { label: 'All Subjects', handleClick: handleAllSubjectsClick },
    { label: 'Add Subjects', handleClick: handleAddSubjectClick }
  ]

  return (
    <PageWrapper>
      <ControlsMenu
        buttons={buttons}
        showIcon={false}
        title='Subjects functionality'
      />
    </PageWrapper>
  )
}

export default SubjectsPage
