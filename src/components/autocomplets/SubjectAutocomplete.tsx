import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useState, useEffect, FC } from 'react'
import { CircularProgress } from '@mui/material'
import { useHTTP } from '../../hooks/http.hook'

interface SubjectOption {
  _id: string
  subject_name: string
}

interface SubjectAutocompleteProps extends Omit<AutocompleteProps<SubjectOption, false, false, false>, 'options' | 'renderInput'> {
  onSubjectSelect: (subject: SubjectOption | null) => void;
}

const SubjectAutocomplete: FC<SubjectAutocompleteProps> = ({ onSubjectSelect,  }) => {
  const { loading, request, clearError } = useHTTP()
  const [options, setOptions] = useState<SubjectOption[]>([])

  useEffect(() => {
    const fetchAllSubjects = async () => {
      try {
        const data: any = await request('/api/subject/')
        setOptions(data)
      } catch (err) {
        console.error('Failed to fetch subjects:', err)
      }
    }

    fetchAllSubjects()
  }, [request])

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.subject_name}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Пошук предметів"
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
        onSubjectSelect(value)
        console.log(event)
        clearError()
      }}
    />
  )
}

export default SubjectAutocomplete
