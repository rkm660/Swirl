export default function Prospects() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Prospects</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your prospect database
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-4">
                Prospect Profile Prototype
              </div>
            </div>
            
            <div className="w-full h-[600px] border border-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://uk.linkedin.com/in/karenbevan"
                title="LinkedIn Profile - Karen Bevan"
                className="w-full h-full"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </div>
            
            <div className="text-center">
              <div className="text-xs text-gray-400">
                Note: LinkedIn may block iframe embedding. This is a prototype demonstration.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
