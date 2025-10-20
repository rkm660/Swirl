import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { 
  CheckCircleIcon, 
  StarIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  PaperAirplaneIcon,
  ArrowRightIcon,
  PlayIcon,
  SparklesIcon,
  BoltIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

export default function Home() {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <img src="/logo.svg" alt="EverLeads" className="h-10 w-auto" />
          </div>
          <button
            onClick={() => loginWithRedirect()}
            className="rounded-full bg-primary-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Get Started
          </button>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Turn connections into
              <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent"> opportunities</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
              The simple way to manage your outreach, track responses, and grow your network. 
              Perfect for freelancers, consultants, and professionals who want to build meaningful connections.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
              <button
                onClick={() => loginWithRedirect()}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-200"></span>
                <span className="relative flex items-center">
                  Start building connections
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </span>
              </button>
              <button className="group inline-flex items-center justify-center px-6 py-4 text-base font-semibold text-gray-900 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                <PlayIcon className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-16">
              <p className="text-sm text-gray-500 mb-8">Trusted by professionals worldwide</p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-blue-500" />
                  <span>Setup in 2 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-purple-500" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to grow your network
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Streamline your outreach process with powerful tools designed for modern professionals.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <UserGroupIcon className="h-5 w-5 flex-none text-primary-600" />
                  Lead Management
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Organize and track your prospects with our intuitive lead management system. Never lose track of a potential connection again.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <PaperAirplaneIcon className="h-5 w-5 flex-none text-primary-600" />
                  Smart Outreach
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Send personalized messages at scale with our template system. Track delivery and responses in real-time.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <ChartBarIcon className="h-5 w-5 flex-none text-primary-600" />
                  Analytics & Insights
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Understand what works with detailed analytics. Track conversion rates and optimize your outreach strategy.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Loved by professionals worldwide
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join thousands of professionals who are growing their network with EverLeads.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {[
              {
                content: "EverLeads has completely transformed how I manage my outreach. The interface is clean, the analytics are insightful, and I've seen a 40% increase in response rates.",
                author: "Sarah Chen",
                role: "Freelance Consultant",
                rating: 5
              },
              {
                content: "As a startup founder, I needed a simple way to track my networking efforts. EverLeads made it effortless to stay organized and follow up with prospects.",
                author: "Marcus Rodriguez",
                role: "Startup Founder",
                rating: 5
              },
              {
                content: "The template system is a game-changer. I can personalize messages at scale while maintaining that personal touch that gets responses.",
                author: "Emily Watson",
                role: "Sales Professional",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-600 mb-6">
                  "{testimonial.content}"
                </blockquote>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by thousands of professionals
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              See why professionals choose EverLeads to grow their network.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {[
              { number: "10,000+", label: "Active Users" },
              { number: "50,000+", label: "Connections Made" },
              { number: "95%", label: "Satisfaction Rate" },
              { number: "2 min", label: "Average Setup Time" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-600">{stat.number}</div>
                <div className="text-sm text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Choose the plan that works for you. Start free, upgrade when you're ready.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">Free</h3>
                <p className="mt-4 text-4xl font-bold text-gray-900">$0</p>
                <p className="mt-2 text-sm text-gray-500">per month</p>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">100 targeted leads</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Email support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Basic analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Core features</span>
                </li>
              </ul>
              <button
                onClick={() => loginWithRedirect()}
                className="mt-8 w-full rounded-full bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                Get Started Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-primary-600 p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">Pro</h3>
                <p className="mt-4 text-4xl font-bold text-gray-900">$10</p>
                <p className="mt-2 text-sm text-gray-500">per month</p>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Unlimited leads</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Custom templates</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Priority support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">All features</span>
                </li>
              </ul>
            <button
              onClick={() => loginWithRedirect()}
                className="mt-8 w-full rounded-full bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
                Start Pro Trial
            </button>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to grow your network?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
              Join thousands of professionals who are building meaningful connections with EverLeads.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => loginWithRedirect()}
                className="rounded-full bg-white px-8 py-4 text-base font-semibold text-primary-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get Started Free
              </button>
              <button className="text-base font-semibold leading-6 text-white hover:text-primary-100">
                Learn more <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/logo.svg" alt="EverLeads" className="h-8 w-auto" />
            </div>
            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Terms</a>
              <a href="#" className="hover:text-gray-900">Support</a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500 text-center">
              © 2024 EverLeads. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}