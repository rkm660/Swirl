import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Goal() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!searchQuery.trim()) return
    
    setIsGenerating(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
      // TODO: Call actual API to generate leads
      console.log('Generating leads for:', searchQuery)
      // TODO: Navigate to prospects page with generated leads
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGenerate()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Current Goal</h1>
        <p className="mt-1 text-sm text-gray-500">
          Specify the type of leads you're seeking. You can always update this later!
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-8 sm:p-8">
          <div className="max-w-xl mx-auto">
            {/* Search bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g. sales professionals at beverage companies"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Generate button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleGenerate}
                disabled={!searchQuery.trim() || isGenerating}
                className="bg-primary-600 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </div>
                ) : (
                  'Generate'
                )}
              </button>
            </div>

                {/* Examples */}
                <div className="mt-8">
                  <p className="text-sm text-gray-600 mb-3">try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Sales professionals at beverage companies",
                  "IT directors in New Jersey", 
                  "Marketing managers at tech startups"
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(example)}
                    className="text-sm text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1 rounded-full transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            {/* Help */}
            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                💡 <strong>Tip:</strong> Be specific about job titles, industries, and locations. 
                Our AI will find matching professionals and add them to your Prospects page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
