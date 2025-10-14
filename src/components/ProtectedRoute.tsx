import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
