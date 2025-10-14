import { useState, useMemo } from 'react'
import { MagnifyingGlassIcon, FunnelIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'

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
  dateGenerated: string
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
      linkedinUrl: 'https://linkedin.com/in/sarah-johnson',
      dateGenerated: '2024-03-20'
    },
    {
      id: '2', 
      name: 'Mike Chen',
      title: 'IT Director',
      company: 'Tech Solutions',
      followerCount: 890,
      location: 'Newark, NJ',
      linkedinUrl: 'https://linkedin.com/in/mike-chen',
      dateGenerated: '2024-03-19'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      title: 'Marketing Manager',
      company: 'StartupXYZ',
      followerCount: 2100,
      location: 'San Francisco, CA',
      linkedinUrl: 'https://linkedin.com/in/emily-rodriguez',
      dateGenerated: '2024-03-18'
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

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<'date' | 'name' | 'title' | 'company' | 'followers' | 'location' | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (field: 'date' | 'name' | 'title' | 'company' | 'followers' | 'location') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getSortedProspects = (prospects: Prospect[]) => {
    if (!sortField) return prospects

    return [...prospects].sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (sortField) {
        case 'date':
          aValue = new Date(a.dateGenerated).getTime()
          bValue = new Date(b.dateGenerated).getTime()
          break
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'title':
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case 'company':
          aValue = a.company.toLowerCase()
          bValue = b.company.toLowerCase()
          break
        case 'followers':
          aValue = a.followerCount
          bValue = b.followerCount
          break
        case 'location':
          aValue = a.location.toLowerCase()
          bValue = b.location.toLowerCase()
          break
        default:
          return 0
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortDirection === 'asc') {
          return aValue.localeCompare(bValue)
        } else {
          return bValue.localeCompare(aValue)
        }
      } else {
        if (sortDirection === 'asc') {
          return (aValue as number) - (bValue as number)
        } else {
          return (bValue as number) - (aValue as number)
        }
      }
    })
  }

  // Filter and sort prospects
  const filteredAndSortedProspects = useMemo(() => {
    let filtered = prospects.filter(prospect => {
      if (!searchQuery.trim()) return true
      
      const searchLower = searchQuery.toLowerCase()
      return prospect.name.toLowerCase().includes(searchLower) ||
             prospect.title.toLowerCase().includes(searchLower) ||
             prospect.company.toLowerCase().includes(searchLower) ||
             prospect.location.toLowerCase().includes(searchLower) ||
             prospect.followerCount.toString().includes(searchLower) ||
             new Date(prospect.dateGenerated).toLocaleDateString().toLowerCase().includes(searchLower)
    })

    return getSortedProspects(filtered)
  }, [prospects, searchQuery, sortField, sortDirection])

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

      {/* Search */}
      <div className="mt-6">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder="Search prospects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-md border border-gray-300 pl-9 pr-3 py-1.5 text-xs text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 sm:pl-6"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center">
                        Date Generated
                        {sortField === 'date' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        Name
                        {sortField === 'name' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('title')}
                    >
                      <div className="flex items-center">
                        Title
                        {sortField === 'title' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('company')}
                    >
                      <div className="flex items-center">
                        Company
                        {sortField === 'company' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('followers')}
                    >
                      <div className="flex items-center">
                        Followers
                        {sortField === 'followers' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('location')}
                    >
                      <div className="flex items-center">
                        Location
                        {sortField === 'location' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                      Quick Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredAndSortedProspects.map((prospect) => (
                    <tr key={prospect.id} className="hover:bg-gray-50 transition-colors">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs text-gray-500 sm:pl-6">
                        {new Date(prospect.dateGenerated).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs">
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
      </div>
    </div>
  )
}
