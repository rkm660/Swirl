import { useState, useEffect } from 'react'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

type ToastProps = {
  message: string
  type: 'success' | 'error'
  onClose: () => void
  duration?: number
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Wait for animation to complete
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-80">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {type === 'success' ? (
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
            ) : (
              <XMarkIcon className="h-5 w-5 text-red-600" />
            )}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={() => {
                setIsVisible(false)
                setTimeout(onClose, 300)
              }}
              className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Toast manager
let toastId = 0
const toasts: Array<{ id: number; message: string; type: 'success' | 'error'; duration?: number }> = []
const listeners: Array<() => void> = []

export const toast = {
  success: (message: string, options?: { duration?: number }) => {
    const id = ++toastId
    toasts.push({ id, message, type: 'success', duration: options?.duration })
    listeners.forEach(listener => listener())
  },
  error: (message: string, options?: { duration?: number }) => {
    const id = ++toastId
    toasts.push({ id, message, type: 'error', duration: options?.duration })
    listeners.forEach(listener => listener())
  }
}

export const useToast = () => {
  const [currentToasts, setCurrentToasts] = useState(toasts)

  useEffect(() => {
    const listener = () => setCurrentToasts([...toasts])
    listeners.push(listener)
    return () => {
      const index = listeners.indexOf(listener)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [])

  const removeToast = (id: number) => {
    const index = toasts.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.splice(index, 1)
      listeners.forEach(listener => listener())
    }
  }

  return { toasts: currentToasts, removeToast }
}
