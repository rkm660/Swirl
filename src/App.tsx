import { Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import MainLayout from './layouts/MainLayout'
import ProtectedRoute from './components/ProtectedRoute'
import LoadingSpinner from './components/LoadingSpinner'
import AuthCallback from './components/AuthCallback'

// Pages
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Goal from './pages/Goal'
import Templates from './pages/Templates'
import Prospects from './pages/Prospects'
import Outbounds from './pages/Outbounds'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

function App() {
  const { isLoading } = useAuth0()

  if (isLoading) {
    return <LoadingSpinner />
  }

  const ProtectedPage = ({ children }: { children: React.ReactNode }) => (
    <ProtectedRoute>
      <MainLayout>{children}</MainLayout>
    </ProtectedRoute>
  )

  return (
    <>
      <AuthCallback />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedPage><Dashboard /></ProtectedPage>} />
        <Route path="/goal" element={<ProtectedPage><Goal /></ProtectedPage>} />
        <Route path="/templates" element={<ProtectedPage><Templates /></ProtectedPage>} />
        <Route path="/prospects" element={<ProtectedPage><Prospects /></ProtectedPage>} />
        <Route path="/outbounds" element={<ProtectedPage><Outbounds /></ProtectedPage>} />
        <Route path="/settings" element={<ProtectedPage><Settings /></ProtectedPage>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
