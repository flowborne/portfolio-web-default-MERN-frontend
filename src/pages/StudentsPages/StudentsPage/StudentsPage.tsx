import PageWrapper from '../../../components/pageWrapper/PageWrapper'
import { useNavigate } from 'react-router-dom'
import ControlsMenu from '../../../components/controlsMenu/ControlsMenu'
import React from 'react'

const StudentsPage: React.FC = () => {
  const navigate = useNavigate()

  const handleAllStudentsClick = () => {
    navigate('/Students/all-students')
  }

  const handleAddStudentClick = () => {
    navigate('/Students/add-student')
  }

  const buttons = [
    { label: 'All Students', handleClick: handleAllStudentsClick },
    { label: 'Add Student', handleClick: handleAddStudentClick }
  ]

  return (
    <PageWrapper>
      <ControlsMenu
        buttons={buttons}
        showIcon={false}
        title='Students functionality'
      />
    </PageWrapper>
  )
}

export default StudentsPage
