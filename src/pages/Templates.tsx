import { useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/24/outline'

interface Template {
  id: string
  name: string
  content: string
  description: string
}

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([
    { id: 'A', name: 'Template A', content: '', description: '' },
    { id: 'B', name: 'Template B', content: '', description: '' },
    { id: 'C', name: 'Template C', content: '', description: '' },
    { id: 'D', name: 'Template D', content: '', description: '' },
    { id: 'E', name: 'Template E', content: '', description: '' },
  ])

  const getTemplatePlaceholders = (templateId: string) => {
    const placeholders = {
      A: 'e.g. casual outreach for tech professionals',
      B: 'e.g. formal approach for enterprise sales',
      C: 'e.g. referral-based for mutual connections',
      D: 'e.g. industry-specific for healthcare',
      E: 'e.g. event-based for conference attendees'
    }
    return placeholders[templateId as keyof typeof placeholders] || placeholders.A
  }

  const updateTemplate = (id: string, field: 'content' | 'description', value: string) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t))
  }

  const getCharacterCount = (content: string) => content.length
  const isOverLimit = (content: string) => content.length > 300

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Templates</h1>
        <p className="mt-1 text-sm text-gray-500">
          LinkedIn connection request personal note templates
        </p>
      </div>

      {/* Premium notice */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <LockClosedIcon className="h-5 w-5 text-yellow-600 mr-2" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">Premium Feature</h3>
            <p className="text-sm text-yellow-700">
              LinkedIn personal note templates are available for premium users only. 
              Upgrade to access this feature.
            </p>
          </div>
        </div>
      </div>

      {/* Templates */}
      <div className="space-y-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ${getTemplateColor(template.id)}`}>
                    {template.id}
                  </span>
                </h3>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                    isOverLimit(template.content) ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {getCharacterCount(template.content)}/300
                  </span>
                  <LockClosedIcon className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Name field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descriptor
                </label>
                <input
                  type="text"
                  value={template.description}
                  onChange={(e) => updateTemplate(template.id, 'description', e.target.value)}
                  placeholder={getTemplatePlaceholders(template.id)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  maxLength={100}
                />
              </div>

              {/* Content field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Note
                </label>
                <textarea
                  value={template.content}
                  onChange={(e) => updateTemplate(template.id, 'content', e.target.value)}
                  placeholder="Hi {first_name}, I'd love to connect with you..."
                  className={`w-full px-3 py-2 border rounded-md resize-none ${
                    isOverLimit(template.content) 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                  }`}
                  rows={4}
                  maxLength={300}
                />
                
                {/* Character limit indicator */}
                {isOverLimit(template.content) && (
                  <div className="absolute bottom-2 right-2 text-xs text-red-600 font-medium">
                    Character limit exceeded
                  </div>
                )}
              </div>

              {/* Variable help */}
              <div className="mt-3 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>💡 Tip:</strong> Use <code className="bg-blue-100 px-1 rounded">{'{first_name}'}</code> to 
                  automatically insert the prospect's first name from their LinkedIn profile.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
          Save Templates
        </button>
      </div>
    </div>
  )
}
