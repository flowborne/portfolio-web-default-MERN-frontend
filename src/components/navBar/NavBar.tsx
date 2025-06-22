import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { styles } from './navBarStyles'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

const pages = [
  { name: 'Manege', path: '/' },
  { name: 'Grades', path: '/Grades' },
  { name: 'Students', path: '/Students' },
  { name: 'Subjects', path: '/Subjects' },
  { name: 'Teachers', path: '/Teachers' }
]

const NavBar: React.FC = () => {
  const auth = useContext(AuthContext)
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const settings = [{ name: 'Logout', action: () => auth.logout() }]

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={styles.menuIconBox}>
            <IconButton
              aria-controls='menu-appbar'
              aria-haspopup='true'
              aria-label='account of current user'
              color='inherit'
              onClick={handleOpenNavMenu}
              size='large'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={styles.menuAnchorOrigin}
              id='menu-appbar'
              keepMounted
              onClose={handleCloseNavMenu}
              open={Boolean(anchorElNav)}
              sx={styles.menu}
              transformOrigin={styles.menuTransformOrigin}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    textAlign='center'
                    to={page.path}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={styles.adbIcon} />
          <Box sx={styles.buttonBox}>
            {pages.map((page) => (
              <Button
                component={Link}
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={styles.button}
                to={page.path}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              anchorOrigin={styles.userMenuAnchorOrigin}
              id='menu-appbar'
              keepMounted
              onClose={handleCloseUserMenu}
              open={Boolean(anchorElUser)}
              sx={styles.userMenu}
              transformOrigin={styles.userMenuTransformOrigin}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => {
                    setting.action()
                    handleCloseUserMenu()
                  }}
                >
                  <Typography textAlign='center'>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
