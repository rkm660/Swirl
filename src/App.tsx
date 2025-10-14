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

  return (
    <>
      <AuthCallback />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/goal" element={
          <ProtectedRoute>
            <MainLayout>
              <Goal />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/templates" element={
          <ProtectedRoute>
            <MainLayout>
              <Templates />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/prospects" element={
          <ProtectedRoute>
            <MainLayout>
              <Prospects />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/outbounds" element={
          <ProtectedRoute>
            <MainLayout>
              <Outbounds />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/settings" element={
          <ProtectedRoute>
            <MainLayout>
              <Settings />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
