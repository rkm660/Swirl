import { useState } from 'react'
import { 
  CreditCardIcon, 
  UserIcon, 
  BuildingOfficeIcon, 
  EnvelopeIcon,
  LinkIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

export default function Settings() {
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Mock user data
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    company: 'Acme Corp',
    email: 'john.doe@acmecorp.com',
    linkedin: 'https://linkedin.com/in/johndoe'
  })

  // Mock subscription data
  const [subscription, setSubscription] = useState({
    plan: 'free',
    leadsUsed: 23,
    leadsLimit: 100
  })

  const handleUpgrade = async () => {
    setIsUpgrading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubscription(prev => ({ ...prev, plan: 'pro', leadsLimit: 999999 }))
    } catch (error) {
      console.error('Upgrade failed:', error)
    } finally {
      setIsUpgrading(false)
    }
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Profile saved successfully
    } catch (error) {
      console.error('Save failed:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and subscription
        </p>
      </div>


      {/* Personal Information Section */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
              Personal Information
            </h3>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={userInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BuildingOfficeIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="company"
                      value={userInfo.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={userInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>

                {/* LinkedIn */}
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                    LinkedIn Profile
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="linkedin"
                      value={userInfo.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-primary-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>

      {/* Billing & Subscription Section */}
      <div className="space-y-6">
          {/* Current Plan */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Current Plan
              </h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Free Plan */}
                <div className={`relative rounded-lg border-2 p-6 ${
                  subscription.plan === 'free' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 bg-white'
                }`}>
                  {subscription.plan === 'free' && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 text-primary-600">
                        <CheckIcon className="h-4 w-4" />
                        <span className="text-xs font-medium">Current</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-900">Free</h4>
                    <p className="text-3xl font-bold text-gray-900 mt-2">$0</p>
                    <p className="text-sm text-gray-500">per month</p>
                  </div>
                  
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">100 free leads</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Basic templates</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Email support</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                    <div className="text-sm text-gray-600 mb-2">
                      Leads used: {subscription.leadsUsed} / {subscription.leadsLimit}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${(subscription.leadsUsed / subscription.leadsLimit) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Pro Plan */}
                <div className={`relative rounded-lg border-2 p-6 ${
                  subscription.plan === 'pro' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 bg-white'
                }`}>
                  {subscription.plan === 'pro' && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 text-primary-600">
                        <CheckIcon className="h-4 w-4" />
                        <span className="text-xs font-medium">Current</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-900">Pro</h4>
                    <p className="text-3xl font-bold text-gray-900 mt-2">$10</p>
                    <p className="text-sm text-gray-500">per month</p>
                  </div>
                  
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Unlimited leads</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">All templates</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Priority support</span>
                    </li>
                  </ul>
                  
                  {subscription.plan === 'free' && (
                    <button
                      onClick={handleUpgrade}
                      disabled={isUpgrading}
                      className="w-full mt-6 bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                      {isUpgrading ? 'Upgrading...' : 'Upgrade to Pro'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          {subscription.plan === 'pro' && (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Payment Method
                </h3>
                <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                  <CreditCardIcon className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/25</p>
                  </div>
                  <button className="ml-auto text-sm text-primary-600 hover:text-primary-700">
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}