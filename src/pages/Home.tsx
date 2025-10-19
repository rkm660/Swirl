import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Home() {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(156, 146, 172, 0.15) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-primary-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-primary-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-primary-300 rounded-full opacity-20 animate-pulse delay-500"></div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl text-center">
          {/* Logo */}
          <div className="mt-10 flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full blur-lg opacity-30"></div>
              <img src="/logo.svg" alt="EverLeads" className="relative h-32 w-auto sm:h-40" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Turn connections into
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent"> opportunities</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            The simple way to manage your outreach, track responses, and grow your network. 
            Perfect for freelancers, consultants, and professionals who want to build meaningful connections.
          </p>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>100 free leads</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Smart templates</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Easy tracking</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => loginWithRedirect()}
              className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-200"></span>
              <span className="relative">Start building connections</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-4">Join professionals who are growing their network</p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-xs text-gray-400">✓ No credit card required</div>
              <div className="text-xs text-gray-400">✓ Free forever plan</div>
              <div className="text-xs text-gray-400">✓ Setup in 2 minutes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent"></div>
    </div>
  )
}