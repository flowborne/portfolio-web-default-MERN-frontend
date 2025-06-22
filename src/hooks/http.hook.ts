import { useState, useCallback } from 'react'

interface RequestBody {
  [key: string]: string | number | boolean | object | null
}

interface RequestHeaders {
  [key: string]: string
}

interface UserResponse {
  userId: string
  token: string
  name: string
  email: string
}
interface UseHTTPReturn {
  loading: boolean
  request: (
    url: string,
    method?: string,
    body?: RequestBody | null,
    headers?: RequestHeaders
  ) => Promise<UserResponse>
  error: string | null
  clearError: () => void
}

export const useHTTP = (): UseHTTPReturn => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const request = useCallback(
    async (
      url: string,
      method: string = 'GET',
      body: RequestBody | null = null,
      headers: RequestHeaders = {}
    ): Promise<UserResponse> => {
      setLoading(true)
      try {
        let requestBody: string | null = null

        if (body) {
          requestBody = JSON.stringify(body)
          headers['Content-Type'] = 'application/json'
        }

        const response = await fetch(url, {
          method,
          body: requestBody,
          headers
        })
        if (!response.ok) {
          throw new Error('Something went wrong')
        }

        const data = (await response.json()) as UserResponse

        setLoading(false)
        return data
      } catch (err: unknown) {
        setLoading(false)
        if (err instanceof Error) {
          setError(err.message)
          throw err
        } else {
          setError('An unknown error occurred')
          throw new Error('An unknown error occurred')
        }
      }
    },
    []
  )

  const clearError = (): void => setError(null)

  return { loading, request, error, clearError }
}
