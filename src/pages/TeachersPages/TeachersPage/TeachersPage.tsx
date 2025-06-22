import PageWrapper from '../../../components/pageWrapper/PageWrapper'
import { useNavigate } from 'react-router-dom'
import ControlsMenu from '../../../components/controlsMenu/ControlsMenu'
import React from 'react'

const TeachersPage: React.FC = () => {
  const navigate = useNavigate()

  const handleAllTeachersClick = () => {
    navigate('/Teachers/all-teachers')
  }

  const handleAddTeacherClick = () => {
    navigate('/Teachers/add-teacher')
  }

  const buttons = [
    { label: 'All Teachers', handleClick: handleAllTeachersClick },
    { label: 'Add Teacher', handleClick: handleAddTeacherClick }
  ]

  return (
    <PageWrapper>
      <ControlsMenu
        buttons={buttons}
        showIcon={false}
        title='Teachers functionality'
      />
    </PageWrapper>
  )
}

export default TeachersPage
