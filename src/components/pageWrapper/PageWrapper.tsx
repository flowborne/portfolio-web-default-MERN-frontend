import React, { ReactNode } from 'react'
import NavBar from '../navBar/NavBar'
import { Box } from '@mui/material'

interface PageWrapperProps {
  children: ReactNode
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Box>{children}</Box>
    </>
  )
}

export default PageWrapper
