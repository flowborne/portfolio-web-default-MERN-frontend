export const ControlsStyles = {
  container: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '50px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#F0F4FF'
  },
  icon: {
    fontSize: '50px',
    color: '#1976D2',
    marginBottom: '20px'
  },
  title: {
    color: '#333333'
  },
  button: {
    color: '#FFFFFF',
    '&:nth-of-type(1)': {
      backgroundColor: '#1976D2'
    },
    '&:nth-of-type(2)': {
      backgroundColor: '#E91E63'
    }
  }
}
