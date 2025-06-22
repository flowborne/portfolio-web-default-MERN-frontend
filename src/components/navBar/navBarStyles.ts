export const styles = {
  menuIconBox: {
    flexGrow: 1,
    display: { xs: 'flex', md: 'none' }
  },
  adbIcon: {
    display: { xs: 'flex', md: 'none' },
    mr: 1
  },
  buttonBox: {
    flexGrow: 1,
    display: { xs: 'none', md: 'flex' }
  },
  button: {
    my: 2,
    color: 'white',
    display: 'block'
  },
  menu: {
    display: { xs: 'block', md: 'none' }
  },
  menuAnchorOrigin: {
    vertical: 'bottom' as const,
    horizontal: 'left' as const
  },
  menuTransformOrigin: {
    vertical: 'top' as const,
    horizontal: 'left' as const
  },
  userMenu: {
    mt: '45px'
  },
  userMenuAnchorOrigin: {
    vertical: 'top' as const,
    horizontal: 'right' as const
  },
  userMenuTransformOrigin: {
    vertical: 'top' as const,
    horizontal: 'right' as const
  }
}
