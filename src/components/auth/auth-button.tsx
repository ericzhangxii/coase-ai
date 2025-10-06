'use client'

import { useState } from 'react'
import { useAuth } from './auth-provider'

export function AuthButton() {
  const { user, signOut, signInWithProvider } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(true)
      await signInWithProvider(provider)
    } catch (error) {
      console.error('Error signing in:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {user.email}
        </span>
        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleSignIn('google')}
        disabled={isLoading}
        className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Loading...' : 'Sign in with Google'}
      </button>
      <button
        onClick={() => handleSignIn('github')}
        disabled={isLoading}
        className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Loading...' : 'Sign in with GitHub'}
      </button>
    </div>
  )
}