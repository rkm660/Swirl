import { useState } from 'react'

interface Prospect {
  id: string
  name: string
  title: string
  company: string
  location: string
  linkedinUrl: string
  status: 'new' | 'contacted' | 'responded' | 'not_interested'
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
      location: 'New York, NY',
      linkedinUrl: 'https://linkedin.com/in/sarah-johnson',
      status: 'new'
    },
    {
      id: '2', 
      name: 'Mike Chen',
      title: 'IT Director',
      company: 'Tech Solutions',
      location: 'Newark, NJ',
      linkedinUrl: 'https://linkedin.com/in/mike-chen',
      status: 'new'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      title: 'Marketing Manager',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      linkedinUrl: 'https://linkedin.com/in/emily-rodriguez',
      status: 'contacted'
    }
  ])

  // Mock templates - in real app this would come from Templates page/API
  const templates: Template[] = [
    { id: 'A', name: 'Template A', description: 'Friendly introduction for sales professionals' },
    { id: 'B', name: 'Template B', description: 'Professional outreach for IT decision makers' },
    { id: 'C', name: 'Template C', description: 'Casual connection request for marketing roles' },
    { id: 'D', name: 'Template D', description: 'Industry-specific message for beverage sector' },
    { id: 'E', name: 'Template E', description: 'Follow-up message for previous contacts' }
  ]

  const handleQuickAction = (prospectId: string, action: string) => {
    console.log(`Action ${action} for prospect ${prospectId}`)
    // TODO: Implement actual action logic
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-800'
      case 'contacted': return 'bg-yellow-100 text-yellow-800'
      case 'responded': return 'bg-blue-100 text-blue-800'
      case 'not_interested': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'New'
      case 'contacted': return 'Contacted'
      case 'responded': return 'Responded'
      case 'not_interested': return 'Not Interested'
      default: return status
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

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quick Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prospects.map((prospect) => (
                <tr key={prospect.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600">
                            {prospect.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {prospect.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          <a 
                            href={prospect.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-500"
                          >
                            View LinkedIn
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {prospect.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {prospect.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {prospect.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(prospect.status)}`}>
                      {getStatusText(prospect.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-1">
                      {['A', 'B', 'C', 'D', 'E'].map((templateId) => {
                        const template = templates.find(t => t.id === templateId)
                        return (
                          <button
                            key={templateId}
                            onClick={() => handleQuickAction(prospect.id, templateId)}
                            className="relative group bg-primary-100 text-primary-700 hover:bg-primary-200 px-2 py-1 rounded text-xs font-medium transition-colors"
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
                      <button
                        onClick={() => handleQuickAction(prospect.id, 'X')}
                        className="bg-red-100 text-red-700 hover:bg-red-200 px-2 py-1 rounded text-xs font-medium transition-colors"
                        title="Mark as not interested"
                      >
                        X
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
  )
}
