'use client'

import { useState, useEffect } from 'react'

export default function AvailabilitySection() {
  const [unavailableDates, setUnavailableDates] = useState<string[]>([])
  const [note, setNote] = useState('')
  const [newDate, setNewDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetchAvailability()
  }, [])

  const fetchAvailability = async () => {
    try {
      const response = await fetch('/api/admin/availability')
      const data = await response.json()

      if (data.success) {
        setUnavailableDates(data.unavailableDates)
        setNote(data.note)
      }
    } catch (error) {
      console.error('Error fetching availability:', error)
      setMessage({ type: 'error', text: 'Failed to load availability data' })
    } finally {
      setLoading(false)
    }
  }

  const handleAddDate = () => {
    if (!newDate) {
      setMessage({ type: 'error', text: 'Please select a date' })
      return
    }

    if (unavailableDates.includes(newDate)) {
      setMessage({ type: 'error', text: 'This date is already marked as unavailable' })
      return
    }

    setUnavailableDates([...unavailableDates, newDate].sort())
    setNewDate('')
    setMessage({ type: 'success', text: 'Date added! Click "Save Changes" to persist.' })
  }

  const handleRemoveDate = (date: string) => {
    setUnavailableDates(unavailableDates.filter(d => d !== date))
    setMessage({ type: 'success', text: 'Date removed! Click "Save Changes" to persist.' })
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unavailableDates, note }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage({ type: 'success', text: 'Availability updated successfully!' })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update availability' })
      }
    } catch (error) {
      console.error('Error updating availability:', error)
      setMessage({ type: 'error', text: 'Failed to update availability' })
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getTodayString = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200 px-8 py-6">
        <h2 className="text-2xl font-bold text-gray-900">Calendar Availability</h2>
        <p className="text-sm text-gray-600 mt-1">Manage dates when you are unavailable for bookings</p>
      </div>

      <div className="p-8 space-y-6">
        {message && (
          <div
            className={`px-4 py-3 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Add New Date */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-4">Add Unavailable Date</h3>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="newDate" className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                id="newDate"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                min={getTodayString()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={handleAddDate}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Add Date
            </button>
          </div>
        </div>

        {/* Unavailable Dates List */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            Unavailable Dates ({unavailableDates.length})
          </h3>

          {unavailableDates.length === 0 ? (
            <p className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">
              No unavailable dates set. All dates are available for booking.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {unavailableDates.map((date) => (
                <div
                  key={date}
                  className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-gray-900">{formatDate(date)}</p>
                    <p className="text-sm text-gray-500">{date}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveDate(date)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Note Field */}
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
            Note (Optional)
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            placeholder="Add a note about unavailable dates..."
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
