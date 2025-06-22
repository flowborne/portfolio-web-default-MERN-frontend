import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useState, useEffect, FC } from 'react'
import { CircularProgress } from '@mui/material'
import { useHTTP } from '../../hooks/http.hook'

interface TeacherOption {
  _id: string
  lastName: string
}

interface TeacherAutocompleteProps extends Omit<AutocompleteProps<TeacherOption, false, false, false>, 'options' | 'renderInput'> {
  onTeacherSelect: (teacher: TeacherOption | null) => void
}

const TeacherAutocomplete: FC<TeacherAutocompleteProps> = ({ onTeacherSelect }) => {
  const { loading, request, clearError } = useHTTP()
  const [options, setOptions] = useState<TeacherOption[]>([])

  useEffect(() => {
    const fetchAllTeachers = async () => {
      try {
        const data: any = await request('/api/teacher/')
        setOptions(data)
      } catch (err) {
        console.error('Failed to fetch teachers:', err)
      }
    }

    fetchAllTeachers()
  }, [request])

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.lastName}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Пошук викладачів"
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
        onTeacherSelect(value)
        console.log(event)
        clearError()
      }}
    />
  )
}

export default TeacherAutocomplete
