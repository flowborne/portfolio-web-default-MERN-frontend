import PageWrapper from '../../../components/pageWrapper/PageWrapper'
import { useNavigate } from 'react-router-dom'
import ControlsMenu from '../../../components/controlsMenu/ControlsMenu'
import React from 'react'

const DetailPage: React.FC = () => {
  const navigate = useNavigate()

  const handleAllGradesClick = () => {
    navigate('/Grades/all-grades')
  }

  const handleAddGradeClick = () => {
    navigate('/Grades/add-grade')
  }

  const buttons = [
    { label: 'All Grades', handleClick: handleAllGradesClick },
    { label: 'Add Grade', handleClick: handleAddGradeClick }
  ]

  return (
    <PageWrapper>
      <ControlsMenu
        buttons={buttons}
        showIcon={false}
        title='Grades functionality'
      />
    </PageWrapper>
  )
}

export default DetailPage
