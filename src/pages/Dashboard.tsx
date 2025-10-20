import { useState } from 'react'
import { 
  UserGroupIcon, 
  PaperAirplaneIcon, 
  CheckCircleIcon, 
  ArrowTrendingUpIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly')

  const stats = [
    {
      name: 'Leads Generated',
      value: timeRange === 'daily' ? '89' : timeRange === 'weekly' ? '567' : '2,234',
      change: timeRange === 'daily' ? '+8%' : timeRange === 'weekly' ? '+15%' : '+23%',
      changeType: 'increase',
      icon: UserGroupIcon,
      color: 'bg-blue-500'
    },
    {
      name: 'Outreach',
      value: timeRange === 'daily' ? '47' : timeRange === 'weekly' ? '312' : '1,247',
      change: timeRange === 'daily' ? '+12%' : timeRange === 'weekly' ? '+8%' : '+18%',
      changeType: 'increase',
      icon: PaperAirplaneIcon,
      color: 'bg-purple-500'
    },
    {
      name: 'Responses',
      value: timeRange === 'daily' ? '23' : timeRange === 'weekly' ? '156' : '623',
      change: timeRange === 'daily' ? '+5%' : timeRange === 'weekly' ? '+12%' : '+31%',
      changeType: 'increase',
      icon: CheckCircleIcon,
      color: 'bg-green-500'
    },
    {
      name: 'Engaged',
      value: timeRange === 'daily' ? '8' : timeRange === 'weekly' ? '45' : '189',
      change: timeRange === 'daily' ? '+3%' : timeRange === 'weekly' ? '+7%' : '+15%',
      changeType: 'increase',
      icon: ArrowTrendingUpIcon,
      color: 'bg-orange-500'
    }
  ]

  // Mock time series data
  const timeSeriesData = {
    daily: [
      { period: 'Mon', leads: 78, outreach: 42, responses: 19, engaged: 6 },
      { period: 'Tue', leads: 89, outreach: 38, responses: 23, engaged: 8 },
      { period: 'Wed', leads: 92, outreach: 45, responses: 21, engaged: 7 },
      { period: 'Thu', leads: 89, outreach: 47, responses: 23, engaged: 8 },
      { period: 'Fri', leads: 85, outreach: 41, responses: 18, engaged: 6 },
      { period: 'Sat', leads: 45, outreach: 23, responses: 12, engaged: 4 },
      { period: 'Sun', leads: 38, outreach: 19, responses: 9, engaged: 3 }
    ],
    weekly: [
      { period: 'Dec 2-8', leads: 1234, outreach: 287, responses: 156, engaged: 52 },
      { period: 'Dec 9-15', leads: 1456, outreach: 312, responses: 189, engaged: 63 },
      { period: 'Dec 16-22', leads: 1378, outreach: 298, responses: 167, engaged: 56 },
      { period: 'Dec 23-29', leads: 1567, outreach: 350, responses: 203, engaged: 68 }
    ],
    monthly: [
      { period: 'Jan', leads: 4789, outreach: 1156, responses: 623, engaged: 208 },
      { period: 'Feb', leads: 5123, outreach: 1234, responses: 712, engaged: 238 },
      { period: 'Mar', leads: 4956, outreach: 1189, responses: 689, engaged: 230 },
      { period: 'Apr', leads: 5234, outreach: 1247, responses: 756, engaged: 252 }
    ]
  }

  const currentData = timeSeriesData[timeRange]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Performance overview for your outreach campaigns
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {(['daily', 'weekly', 'monthly'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              timeRange === range
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 ${stat.color} rounded-md flex items-center justify-center`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stat.value}
                    </dd>
                    <div className="flex items-center mt-1">
                      {stat.changeType === 'increase' ? (
                        <ArrowUpIcon className="h-3 w-3 text-green-500" />
                      ) : (
                        <ArrowDownIcon className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs font-medium ml-1 ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Time Series Chart */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Performance Trends
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <CalendarIcon className="h-4 w-4" />
              <span>Last {timeRange === 'daily' ? '7 days' : timeRange === 'weekly' ? '4 weeks' : '4 months'}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {currentData.map((item, index) => {
              const maxValue = Math.max(...currentData.map(d => Math.max(d.leads, d.outreach, d.responses, d.engaged)))
              const leadsWidth = (item.leads / maxValue) * 100
              const outreachWidth = (item.outreach / maxValue) * 100
              const responsesWidth = (item.responses / maxValue) * 100
              const engagedWidth = (item.engaged / maxValue) * 100
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">
                      {item.period}
                    </span>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{item.leads} leads</span>
                      <span>{item.outreach} outreach</span>
                      <span>{item.responses} responses</span>
                      <span>{item.engaged} engaged</span>
                    </div>
                  </div>
                  <div className="flex items-end space-x-1 h-8">
                    <div 
                      className="bg-blue-500 rounded-sm"
                      style={{ width: `${leadsWidth}%`, height: '100%' }}
                      title={`${item.leads} leads`}
                    ></div>
                    <div 
                      className="bg-purple-500 rounded-sm"
                      style={{ width: `${outreachWidth}%`, height: '100%' }}
                      title={`${item.outreach} outreach`}
                    ></div>
                    <div 
                      className="bg-green-500 rounded-sm"
                      style={{ width: `${responsesWidth}%`, height: '100%' }}
                      title={`${item.responses} responses`}
                    ></div>
                    <div 
                      className="bg-orange-500 rounded-sm"
                      style={{ width: `${engagedWidth}%`, height: '100%' }}
                      title={`${item.engaged} engaged`}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              <span className="text-sm text-gray-600">Leads</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
              <span className="text-sm text-gray-600">Outreach</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span className="text-sm text-gray-600">Responses</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
              <span className="text-sm text-gray-600">Engaged</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}