import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function AuthCallback() {
  const { handleRedirectCallback } = useAuth0()

  useEffect(() => {
    if (window.location.search.includes('code=') || window.location.search.includes('error=')) {
      handleRedirectCallback()
    }
  }, [handleRedirectCallback])

  return null
}
