'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AboutSection from '@/components/admin/AboutSection'
import VideosSection from '@/components/admin/VideosSection'
import AvailabilitySection from '@/components/admin/AvailabilitySection'
import SettingsSection from '@/components/admin/SettingsSection'
import BookingsSection from '@/components/admin/BookingsSection'

type Section = 'about' | 'videos' | 'availability' | 'settings' | 'bookings'

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>('about')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth/verify')
        const data = await response.json()
        if (!data.authenticated) {
          router.push('/admin')
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/admin')
      }
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      router.push('/admin')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Shobit G - Violinist Portfolio</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                View Site
              </a>
              <button
                onClick={handleLogout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveSection('about')}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                      activeSection === 'about'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    About / Bio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('videos')}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                      activeSection === 'videos'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Videos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('availability')}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                      activeSection === 'availability'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Calendar Availability
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('settings')}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                      activeSection === 'settings'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Site Settings
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection('bookings')}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                      activeSection === 'bookings'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Bookings
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeSection === 'about' && <AboutSection />}
            {activeSection === 'videos' && <VideosSection />}
            {activeSection === 'availability' && <AvailabilitySection />}
            {activeSection === 'settings' && <SettingsSection />}
            {activeSection === 'bookings' && <BookingsSection />}
          </main>
        </div>
      </div>
    </div>
  )
}
