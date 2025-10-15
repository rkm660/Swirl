import { Fragment, useState, useEffect, ReactNode } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { Menu, Transition } from '@headlessui/react'
import {
  HomeIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  QuestionMarkCircleIcon,
  TagIcon,
  DocumentTextIcon,
  UserGroupIcon,
  PaperAirplaneIcon,
  TrashIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
// import logo from '/logo.svg'

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: HomeIcon },
  { name: 'Goal', to: '/goal', icon: TagIcon },
  { name: 'Templates', to: '/templates', icon: DocumentTextIcon },
  { name: 'Leads', to: '/prospects', icon: UserGroupIcon },
  { name: 'Outbounds', to: '/outbounds', icon: PaperAirplaneIcon },
  { name: 'Discarded', to: '/discarded', icon: TrashIcon },
  { name: 'Settings', to: '/settings', icon: Cog6ToothIcon },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, logout } = useAuth0()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768 // md breakpoint
      setIsMobileView(isMobile)
      if (!isMobile) {
        setIsMobileMenuOpen(false)
      }
    }

    // Set initial value
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className={classNames(
        "fixed top-0 z-40 flex h-14 w-full items-center justify-between border-b border-gray-200 bg-white px-4",
        isMobileView ? "" : "pl-6"
      )}>
        <div className="flex items-center">
          {isMobileView ? (
            <button
              type="button"
              className="bg-white text-gray-500 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Toggle sidebar</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          ) : (
            <Link to="/dashboard" className="flex items-center">
              <img src="/logo.svg" alt="EverLeads" className="h-12 w-auto" />
            </Link>
          )}
        </div>

        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="flex items-center rounded-full bg-white text-sm">
              <span className="sr-only">Open user menu</span>
              {user?.picture ? (
                <img
                  className="h-7 w-7 rounded-full"
                  src={user.picture}
                  alt={user?.name || 'User avatar'}
                />
              ) : (
                <UserCircleIcon className="h-7 w-7 text-gray-400" />
              )}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => logout()}
                    className={classNames(
                      active ? '' : '',
                      'block w-full bg-white px-4 py-2 text-left text-xs text-gray-700'
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </header>

      {/* Navigation sidebar */}
      <nav
        className={classNames(
          'fixed left-0 z-30 flex h-[calc(100%-3.5rem)] w-56 transform flex-col bg-white shadow-lg transition-transform duration-200 ease-in-out',
          isMobileView ? (isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0',
          'top-14' // Always below header
        )}
      >
        <div className="mt-2 flex-1 px-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={() => isMobileView && setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium'
                )
              }
            >
              <item.icon
                className="mr-2 h-4 w-4 flex-shrink-0"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Help button */}
        <div className="border-t border-gray-200 px-2 py-2">
          <button className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <QuestionMarkCircleIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Help & Support
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className={classNames(
        'pt-14 transition-[padding] duration-200 ease-in-out',
        isMobileView ? 'pl-0' : 'pl-56'
      )}>
        <main className="p-4">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && isMobileView && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-25 transition-opacity duration-200 ease-in-out"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}
