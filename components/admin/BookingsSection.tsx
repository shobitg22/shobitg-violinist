'use client'

import { useState, useEffect } from 'react'

interface Booking {
  timestamp?: string
  name: string
  phone: string
  email: string
  eventDate: string
  eventTime?: string
  location: string
  budget: string
  message?: string
  status?: string
}

export default function BookingsSection() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/bookings')
      const data = await response.json()

      if (data.success) {
        setBookings(data.bookings || [])

        if (data.message) {
          setMessage({ type: 'info', text: data.message })
        }

        if (!data.sheetConfigured) {
          setMessage({
            type: 'info',
            text: 'Google Sheets integration is not configured. Set GOOGLE_SHEETS_WEBHOOK_URL in environment variables.',
          })
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to fetch bookings' })
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
      setMessage({ type: 'error', text: 'Failed to fetch bookings' })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200 px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Bookings</h2>
            <p className="text-sm text-gray-600 mt-1">View booking requests from your website</p>
          </div>
          <button
            onClick={fetchBookings}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition text-sm"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {message && (
          <div
            className={`px-4 py-3 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : message.type === 'error'
                ? 'bg-red-50 border border-red-200 text-red-800'
                : 'bg-blue-50 border border-blue-200 text-blue-800'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">How to View Bookings</h3>
          <p className="text-sm text-blue-800">
            Booking data is stored in your Google Sheets. To view all bookings:
          </p>
          <ul className="list-disc list-inside text-sm text-blue-800 mt-2 space-y-1">
            <li>Open your Google Sheets document where bookings are stored</li>
            <li>All form submissions are automatically saved there</li>
            <li>You can sort, filter, and manage bookings directly in the sheet</li>
          </ul>
          {process.env.NEXT_PUBLIC_SHEET_URL && (
            <a
              href={process.env.NEXT_PUBLIC_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm font-medium text-blue-700 hover:text-blue-800 underline"
            >
              Open Google Sheet
            </a>
          )}
        </div>

        {/* Bookings Table */}
        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                    Date/Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                    Event Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                    Budget
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {booking.timestamp
                        ? new Date(booking.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {booking.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div>{booking.phone}</div>
                      <div className="text-xs text-gray-500">{booking.email}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      <div>{booking.eventDate}</div>
                      {booking.eventTime && (
                        <div className="text-xs text-gray-500">{booking.eventTime}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {booking.location}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.budget}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {booking.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">No bookings to display</p>
            <p className="text-sm text-gray-400 mt-2">
              Bookings will appear here once customers submit the booking form
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
