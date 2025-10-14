import { useState } from 'react'
import { ArrowUturnLeftIcon, ClipboardDocumentIcon, LinkIcon } from '@heroicons/react/24/outline'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface OutboundProspect {
  id: string
  name: string
  title: string
  company: string
  followerCount: number
  location: string
  linkedinUrl: string
  template: string
  status: 'not_contacted' | 'contacted'
  contactedDate?: string
}

export default function Outbounds() {
  // Mock data - in real app this would come from API
  const [outboundProspects, setOutboundProspects] = useState<OutboundProspect[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Sales Director',
      company: 'Beverage Co',
      followerCount: 1250,
      location: 'New York, NY',
      linkedinUrl: 'https://linkedin.com/in/sarah-johnson',
      template: 'A',
      status: 'not_contacted'
    },
    {
      id: '2', 
      name: 'Mike Chen',
      title: 'IT Director',
      company: 'Tech Solutions',
      followerCount: 890,
      location: 'Newark, NJ',
      linkedinUrl: 'https://linkedin.com/in/mike-chen',
      template: 'B',
      status: 'contacted',
      contactedDate: '2024-03-20'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      title: 'Marketing Manager',
      company: 'StartupXYZ',
      followerCount: 2100,
      location: 'San Francisco, CA',
      linkedinUrl: 'https://linkedin.com/in/emily-rodriguez',
      template: 'C',
      status: 'not_contacted'
    }
  ])

  const formatFollowerCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K'
    }
    return count.toString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_contacted': return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
      case 'contacted': return 'bg-green-50 text-green-700 ring-green-600/20'
      default: return 'bg-gray-50 text-gray-600 ring-gray-500/10'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'not_contacted': return 'Not Contacted'
      case 'contacted': return 'Contacted'
      default: return status
    }
  }

  const getTemplateColor = (templateId: string) => {
    switch (templateId) {
      case 'A': return 'bg-blue-100 text-blue-700'
      case 'B': return 'bg-green-100 text-green-700'
      case 'C': return 'bg-yellow-100 text-yellow-700'
      case 'D': return 'bg-purple-100 text-purple-700'
      case 'E': return 'bg-indigo-100 text-indigo-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handleCopyTemplate = (prospect: OutboundProspect) => {
    // Mock template content - in real app this would come from Templates API
    const templateContent = `Hi ${prospect.name.split(' ')[0]}, I'd love to connect with you...`
    
    // Copy template to clipboard
    navigator.clipboard.writeText(templateContent)
  }

  const handleConnect = (prospect: OutboundProspect) => {
    // Update status to contacted
    setOutboundProspects(prev => prev.map(p => 
      p.id === prospect.id 
        ? { ...p, status: 'contacted' as const, contactedDate: new Date().toISOString().split('T')[0] }
        : p
    ))
    
    // Open LinkedIn profile in new tab
    window.open(prospect.linkedinUrl, '_blank')
  }

  const toggleContactedStatus = (prospect: OutboundProspect) => {
    const newStatus = prospect.status === 'contacted' ? 'not_contacted' : 'contacted'
    const newDate = newStatus === 'contacted' ? new Date().toISOString().split('T')[0] : undefined
    
    setOutboundProspects(prev => prev.map(p => 
      p.id === prospect.id 
        ? { ...p, status: newStatus, contactedDate: newDate }
        : p
    ))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Outbounds</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your outbound campaigns and outreach status
        </p>
      </div>

      <div className="mt-8 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                      Company
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                      Followers
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                      Location
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                      Template
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                      Quick Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {outboundProspects.map((prospect) => (
                    <tr key={prospect.id} className="hover:bg-gray-50 transition-colors">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs sm:pl-6">
                        <div className="font-medium text-gray-900">{prospect.name}</div>
                        <div className="text-gray-500">
                          <a 
                            href={prospect.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-primary-600"
                          >
                            View LinkedIn
                          </a>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-900">
                        {prospect.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-900">
                        {prospect.company}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                        {formatFollowerCount(prospect.followerCount)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                        {prospect.location}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getTemplateColor(prospect.template)}`}>
                          Template {prospect.template}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs">
                        <div className="flex items-center space-x-2">
                          <span className={classNames(
                            getStatusColor(prospect.status),
                            'inline-flex flex-col items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'
                          )}>
                            <span>{getStatusText(prospect.status)}</span>
                            {prospect.contactedDate && (
                              <span className="text-xs opacity-75">
                                {new Date(prospect.contactedDate).toLocaleDateString()}
                              </span>
                            )}
                          </span>
                          {prospect.status === 'contacted' && (
                            <button
                              onClick={() => toggleContactedStatus(prospect)}
                              className="inline-flex items-center justify-center rounded-full p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                              title="Mark as not contacted"
                            >
                              <ArrowUturnLeftIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs text-left">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleCopyTemplate(prospect)}
                            className="inline-flex items-center justify-center rounded-full p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            title="Copy template to clipboard"
                          >
                            <ClipboardDocumentIcon className="h-4 w-4" />
                          </button>
                          {prospect.status !== 'contacted' && (
                            <button
                              onClick={() => handleConnect(prospect)}
                              className="inline-flex items-center justify-center rounded-full p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                              title="Open LinkedIn profile"
                            >
                              <LinkIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
