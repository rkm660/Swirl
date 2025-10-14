import { useState } from 'react'

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Discarded</h1>
        <p className="mt-1 text-sm text-gray-500">
          Prospects that were marked as not interested
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
                      Discarded Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {discardedProspects.map((prospect) => (
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
