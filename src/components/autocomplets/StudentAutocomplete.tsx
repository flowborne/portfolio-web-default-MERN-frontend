import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useState, useEffect, FC } from 'react'
import { CircularProgress } from '@mui/material'
import { useHTTP } from '../../hooks/http.hook'

interface StudentOption {
  _id: string
  lastName: string
}

interface StudentAutocompleteProps extends Omit<AutocompleteProps<StudentOption, false, false, false>, 'options' | 'renderInput'> {
  onStudentSelect: (student: StudentOption | null) => void
}

const StudentAutocomplete: FC<StudentAutocompleteProps> = ({ onStudentSelect }) => {
  const { loading, request, clearError } = useHTTP()
  const [options, setOptions] = useState<StudentOption[]>([])

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const data: any = await request('/api/student/')
        setOptions(data)
      } catch (err) {
        console.error('Failed to fetch students:', err)
      }
    };

    fetchAllStudents()
  }, [request])

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.lastName}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Пошук студентів"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      onChange={(event, value) => {
        onStudentSelect(value)
        console.log(event)
        clearError()
      }}
    />
  )
}

export default StudentAutocomplete
