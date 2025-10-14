import { useState, useMemo } from 'react'
import { MagnifyingGlassIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface DiscardedProspect {
  id: string
  name: string
  title: string
  company: string
  followerCount: number
  location: string
  linkedinUrl: string
  discardedDate: string
}

export default function Discarded() {
  // Mock data - in real app this would come from API
  const [discardedProspects] = useState<DiscardedProspect[]>([
    {
      id: '1',
      name: 'John Smith',
      title: 'VP of Sales',
      company: 'Old Corp',
      followerCount: 500,
      location: 'Boston, MA',
      linkedinUrl: 'https://linkedin.com/in/john-smith',
      discardedDate: '2024-03-20'
    },
    {
      id: '2', 
      name: 'Lisa Wang',
      title: 'Marketing Director',
      company: 'Legacy Inc',
      followerCount: 750,
      location: 'Chicago, IL',
      linkedinUrl: 'https://linkedin.com/in/lisa-wang',
      discardedDate: '2024-03-19'
    }
  ])

  const formatFollowerCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K'
    }
    return count.toString()
  }

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [companyFilter, setCompanyFilter] = useState('')
  const [sortField, setSortField] = useState<'name' | 'title' | 'company' | 'followers' | 'location' | 'date' | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (field: 'name' | 'title' | 'company' | 'followers' | 'location' | 'date') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getSortedProspects = (prospects: DiscardedProspect[]) => {
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
        case 'date':
          aValue = new Date(a.discardedDate).getTime()
          bValue = new Date(b.discardedDate).getTime()
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
    let filtered = discardedProspects.filter(prospect => {
      const matchesSearch = prospect.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           prospect.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           prospect.company.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCompany = !companyFilter || prospect.company.toLowerCase().includes(companyFilter.toLowerCase())
      return matchesSearch && matchesCompany
    })

    return getSortedProspects(filtered)
  }, [discardedProspects, searchQuery, companyFilter, sortField, sortDirection])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Discarded</h1>
        <p className="mt-1 text-sm text-gray-500">
          Prospects that were marked as not interested
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
            placeholder="Search discarded..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-md border border-gray-300 pl-9 pr-3 py-1.5 text-xs text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div className="flex gap-2 sm:gap-4">
          <input
            type="text"
            placeholder="Filter by company..."
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="flex-1 sm:flex-none block rounded-md border border-gray-300 px-3 py-1.5 text-xs text-gray-900 focus:border-primary-500 focus:ring-primary-500"
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
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center">
                        Discarded Date
                        {sortField === 'date' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
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
                      <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-500">
                        {new Date(prospect.discardedDate).toLocaleDateString()}
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
