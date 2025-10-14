import { useState } from 'react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface Prospect {
  id: string
  name: string
  title: string
  company: string
  followerCount: number
  location: string
  linkedinUrl: string
}

interface Template {
  id: string
  name: string
  description: string
}

export default function Prospects() {
  // Mock data - in real app this would come from API
  const [prospects] = useState<Prospect[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Sales Director',
      company: 'Beverage Co',
      followerCount: 1250,
      location: 'New York, NY',
      linkedinUrl: 'https://linkedin.com/in/sarah-johnson'
    },
    {
      id: '2', 
      name: 'Mike Chen',
      title: 'IT Director',
      company: 'Tech Solutions',
      followerCount: 890,
      location: 'Newark, NJ',
      linkedinUrl: 'https://linkedin.com/in/mike-chen'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      title: 'Marketing Manager',
      company: 'StartupXYZ',
      followerCount: 2100,
      location: 'San Francisco, CA',
      linkedinUrl: 'https://linkedin.com/in/emily-rodriguez'
    }
  ])

  // Mock templates - in real app this would come from Templates page/API
  const templates: Template[] = [
    { id: 'A', name: 'Template A', description: 'friendly for sales pros' },
    { id: 'B', name: 'Template B', description: 'formal for IT directors' },
    { id: 'C', name: 'Template C', description: 'casual for marketing roles' },
    { id: 'D', name: 'Template D', description: 'industry-specific beverage' },
    { id: 'E', name: 'Template E', description: 'follow-up for previous contacts' }
  ]

  const handleQuickAction = (prospectId: string, action: string) => {
    console.log(`Action ${action} for prospect ${prospectId}`)
    if (action === 'X') {
      // TODO: Move to Discarded page
      console.log(`Moving prospect ${prospectId} to Discarded`)
    } else {
      // TODO: Move to Outbounds page
      console.log(`Moving prospect ${prospectId} to Outbounds with template ${action}`)
    }
  }


  const formatFollowerCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K'
    }
    return count.toString()
  }

  const getTemplateColor = (templateId: string) => {
    switch (templateId) {
      case 'A': return 'bg-blue-100 text-blue-700 hover:bg-blue-200'
      case 'B': return 'bg-green-100 text-green-700 hover:bg-green-200'
      case 'C': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
      case 'D': return 'bg-purple-100 text-purple-700 hover:bg-purple-200'
      case 'E': return 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }
  }


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Prospects</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your prospect database and outreach
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
                      Quick Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {prospects.map((prospect) => (
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
                      <td className="whitespace-nowrap px-3 py-4 text-xs text-left">
                        <div className="flex items-center space-x-1">
                          {['A', 'B', 'C', 'D', 'E'].map((templateId) => {
                            const template = templates.find(t => t.id === templateId)
                            return (
                              <button
                                key={templateId}
                                onClick={() => handleQuickAction(prospect.id, templateId)}
                                className={`relative group px-2 py-1 rounded text-xs font-medium transition-colors ${getTemplateColor(templateId)}`}
                                title={template?.description || `Template ${templateId}`}
                              >
                                {templateId}
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                  {template?.description || `Template ${templateId}`}
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </button>
                            )
                          })}
                          <div className="w-px h-4 bg-gray-300 mx-1"></div>
                          <button
                            onClick={() => handleQuickAction(prospect.id, 'X')}
                            className="bg-red-100 text-red-700 hover:bg-red-200 px-2 py-1 rounded-full text-xs font-bold transition-colors border border-red-200"
                            title="Mark as not interested"
                          >
                            ✕
                          </button>
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
