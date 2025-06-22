import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { ControlsStyles } from './ControlsMenu.styles'

interface ControlsMenuConfig {
  label: string
  handleClick: () => void
}

interface ControlsMenuProps {
  title: string
  buttons: ControlsMenuConfig[]
  showIcon?: boolean
}

const ControlsMenu: React.FC<ControlsMenuProps> = ({
  title,
  buttons,
  showIcon = true
}) => {
  return (
    <Container component='main' maxWidth='sm'>
      <Box sx={ControlsStyles.container}>
        {showIcon && <LockOutlinedIcon sx={ControlsStyles.icon} />}
        <Typography
          component='h1'
          gutterBottom
          sx={ControlsStyles.title}
          variant='h4'
        >
          {title}
        </Typography>
        <Stack direction='row' spacing={2}>
          {buttons.map((button, index) => (
            <Button
              key={index}
              onClick={button.handleClick}
              sx={ControlsStyles.button}
              variant='contained'
            >
              {button.label}
            </Button>
          ))}
        </Stack>
      </Box>
    </Container>
  )
}

export default ControlsMenu
