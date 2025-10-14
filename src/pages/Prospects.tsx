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
            
            {/* LinkedIn-style profile card */}
            <div className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white">
              {/* Header with profile info */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-32 relative">
                <div className="absolute bottom-0 left-6 transform translate-y-1/2">
                  <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-600">KB</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-12 px-6 pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Karen Bevan</h2>
                    <p className="text-gray-600 text-lg">Senior Marketing Manager</p>
                    <p className="text-gray-500 text-sm">London, United Kingdom</p>
                    <div className="flex items-center mt-2">
                      <span className="text-blue-600 text-sm font-medium">500+ connections</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700">
                      Connect
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50">
                      Message
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Experienced marketing professional with a passion for driving growth through strategic campaigns and data-driven insights. 
                      Specialized in digital marketing, brand development, and customer engagement strategies.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Experience</h3>
                    <div className="space-y-3">
                      <div className="border-l-2 border-blue-200 pl-4">
                        <h4 className="font-medium text-gray-900">Senior Marketing Manager</h4>
                        <p className="text-gray-600 text-sm">TechCorp Ltd • 2020 - Present</p>
                        <p className="text-gray-500 text-xs">London, United Kingdom</p>
                      </div>
                      <div className="border-l-2 border-gray-200 pl-4">
                        <h4 className="font-medium text-gray-900">Marketing Manager</h4>
                        <p className="text-gray-600 text-sm">Digital Solutions Inc • 2018 - 2020</p>
                        <p className="text-gray-500 text-xs">London, United Kingdom</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
                    <div className="border-l-2 border-green-200 pl-4">
                      <h4 className="font-medium text-gray-900">MBA in Marketing</h4>
                      <p className="text-gray-600 text-sm">London Business School • 2016 - 2018</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-gray-400">
                LinkedIn profile simulation - <a href="https://uk.linkedin.com/in/karenbevan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View original profile</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
