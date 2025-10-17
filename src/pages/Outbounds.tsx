import { useState, useMemo } from 'react'
import { ClipboardDocumentIcon, LinkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface OutboundProspect {
  id: string
  name: string
  title: string
  company: string
  followerCount: number
  location: string
  linkedinUrl: string
  template: string
  status: 'not_contacted' | 'contacted' | 'responded' | 'interested' | 'engaged'
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
      status: 'not_contacted'
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
      status: 'contacted',
      contactedDate: '2024-01-15'
    },
    {
      id: '4',
      name: 'David Kim',
      title: 'VP of Sales',
      company: 'Enterprise Corp',
      followerCount: 3200,
      location: 'Chicago, IL',
      linkedinUrl: 'https://linkedin.com/in/david-kim',
      template: 'A',
      status: 'responded',
      contactedDate: '2024-01-10'
    },
    {
      id: '5',
      name: 'Lisa Wang',
      title: 'CTO',
      company: 'Tech Innovations',
      followerCount: 4500,
      location: 'Seattle, WA',
      linkedinUrl: 'https://linkedin.com/in/lisa-wang',
      template: 'B',
      status: 'interested',
      contactedDate: '2024-01-08'
    }
  ])

  const formatFollowerCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K'
    }
    return count.toString()
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
    const today = new Date()
    const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    
    setOutboundProspects(prev => prev.map(p => 
      p.id === prospect.id 
        ? { ...p, status: 'contacted' as const, contactedDate: localDate }
        : p
    ))
    
    // Open LinkedIn profile in new tab
    window.open(prospect.linkedinUrl, '_blank')
  }

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortField, setSortField] = useState<'name' | 'title' | 'company' | 'followers' | 'location' | 'template' | 'status' | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (field: 'name' | 'title' | 'company' | 'followers' | 'location' | 'template' | 'status') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getSortedProspects = (prospects: OutboundProspect[]) => {
    if (!sortField) return prospects

    return [...prospects].sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (sortField) {
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
        case 'template':
          aValue = a.template
          bValue = b.template
          break
        case 'status':
          aValue = a.status
          bValue = b.status
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
    let filtered = outboundProspects.filter(prospect => {
      const matchesSearch = prospect.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           prospect.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           prospect.company.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = !statusFilter || prospect.status === statusFilter
      return matchesSearch && matchesStatus
    })

    return getSortedProspects(filtered)
  }, [outboundProspects, searchQuery, statusFilter, sortField, sortDirection])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Outbounds</h1>
        <p className="mt-1 text-sm text-gray-500">
          Easily connect with promising candidates
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder="Search outbounds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-md border border-gray-300 pl-9 pr-3 py-1.5 text-xs text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div className="flex gap-2 sm:gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 sm:flex-none block rounded-md border border-gray-300 px-3 py-1.5 text-xs text-gray-900 focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">All Statuses</option>
            <option value="not_contacted">Not Contacted</option>
            <option value="contacted">Contacted</option>
            <option value="responded">Responded</option>
            <option value="interested">Interested</option>
            <option value="engaged">Engaged</option>
          </select>
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
                    <th 
                      scope="col" 
                      className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('template')}
                    >
                      <div className="flex items-center">
                        Template
                        {sortField === 'template' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center">
                        Status
                        {sortField === 'status' && (
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
                        <div className="flex items-center space-x-1">
                          {['A', 'B', 'C', 'D', 'E'].map((templateId) => (
                            <button
                              key={templateId}
                              onClick={() => {
                                setOutboundProspects(prev => prev.map(p => 
                                  p.id === prospect.id ? { ...p, template: templateId } : p
                                ))
                              }}
                              className={`relative group px-2 py-1 rounded text-xs font-medium transition-colors ${
                                prospect.template === templateId 
                                  ? getTemplateColor(templateId)
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                              title={`Template ${templateId}`}
                            >
                              {templateId}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs">
                        <div className="relative">
                          <select
                            value={prospect.status}
                            onChange={(e) => {
                              const today = new Date()
                              const engagementStatuses = ['contacted', 'responded', 'interested', 'engaged']
                              const contactedDate = engagementStatuses.includes(e.target.value) 
                                ? `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
                                : undefined
                              setOutboundProspects(prev => prev.map(p => 
                                p.id === prospect.id ? { ...p, status: e.target.value as any, contactedDate } : p
                              ))
                            }}
                            className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                          >
                            <option value="not_contacted">Not Contacted</option>
                            <option value="contacted">Contacted</option>
                            <option value="responded">Responded</option>
                            <option value="interested">Interested</option>
                            <option value="engaged">Engaged</option>
                          </select>
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
                          <button
                            onClick={() => handleConnect(prospect)}
                            className="inline-flex items-center justify-center rounded-full p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            title="Open LinkedIn profile"
                          >
                            <LinkIcon className="h-4 w-4" />
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
