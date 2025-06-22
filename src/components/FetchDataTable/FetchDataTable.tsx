import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useHTTP } from '../../hooks/http.hook'
import { useNavigate } from 'react-router-dom'

interface FetchDataTableProps {
  apiEndpoint: string
  columns: { field: string; headerName: string }[]
  tableLabel: string
  navigateParams: string
}

export default function FetchDataTable({
  apiEndpoint,
  columns,
  tableLabel,
  navigateParams,
}: FetchDataTableProps) {
  const { request } = useHTTP()
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData: any = await request(apiEndpoint, 'GET')
        console.log('Response Data:', responseData)
        if (Array.isArray(responseData)) {
          setData(responseData)
        } else {
          setError('Data received from the server is not in the expected format')
        }
      } catch (err) {
        setError('An error occurred while fetching data')
      }
    }

    fetchData();
  }, [apiEndpoint, request])

  const handleRowClick = (_id: string) => {
    navigate(`${navigateParams}${_id}`)
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    )
  }

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          {tableLabel}
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.field} sx={{ fontWeight: 'bold' }}>{column.headerName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ backgroundColor: index % 2 ? '#f5f5f5' : '' }}
                  onClick={() => handleRowClick(row._id)} 
                  style={{ cursor: 'pointer' }} 
                >
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  )
}
