'use client'

import { useState, useEffect } from 'react'

interface Video {
  id: string
  title: string
  platform: string
  thumbnail: string
}

export default function VideosSection() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // Form state
  const [formData, setFormData] = useState<Video>({
    id: '',
    title: '',
    platform: 'youtube',
    thumbnail: '',
  })

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/admin/videos')
      const data = await response.json()

      if (data.success) {
        setVideos(data.videos)
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
      setMessage({ type: 'error', text: 'Failed to load videos' })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveVideos = async () => {
    try {
      const response = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videos }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage({ type: 'success', text: 'Videos updated successfully!' })
        setEditingIndex(null)
        setShowAddForm(false)
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update videos' })
      }
    } catch (error) {
      console.error('Error updating videos:', error)
      setMessage({ type: 'error', text: 'Failed to update videos' })
    }
  }

  const handleAddVideo = () => {
    if (!formData.id || !formData.title) {
      setMessage({ type: 'error', text: 'Video ID and Title are required' })
      return
    }

    // Generate thumbnail URL if not provided
    const thumbnail = formData.thumbnail ||
      (formData.platform === 'youtube'
        ? `https://i.ytimg.com/vi/${formData.id}/maxresdefault.jpg`
        : '')

    const newVideo = { ...formData, thumbnail }
    setVideos([...videos, newVideo])

    setFormData({ id: '', title: '', platform: 'youtube', thumbnail: '' })
    setShowAddForm(false)
    setMessage({ type: 'success', text: 'Video added! Click "Save All Changes" to persist.' })
  }

  const handleEditVideo = (index: number) => {
    setEditingIndex(index)
    setFormData(videos[index])
  }

  const handleUpdateVideo = () => {
    if (editingIndex === null) return

    if (!formData.id || !formData.title) {
      setMessage({ type: 'error', text: 'Video ID and Title are required' })
      return
    }

    const updatedVideos = [...videos]
    updatedVideos[editingIndex] = formData
    setVideos(updatedVideos)

    setEditingIndex(null)
    setFormData({ id: '', title: '', platform: 'youtube', thumbnail: '' })
    setMessage({ type: 'success', text: 'Video updated! Click "Save All Changes" to persist.' })
  }

  const handleDeleteVideo = async (index: number) => {
    if (!confirm('Are you sure you want to delete this video?')) return

    const updatedVideos = videos.filter((_, i) => i !== index)
    setVideos(updatedVideos)
    setMessage({ type: 'success', text: 'Video removed! Click "Save All Changes" to persist.' })
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const updatedVideos = [...videos]
    ;[updatedVideos[index - 1], updatedVideos[index]] = [updatedVideos[index], updatedVideos[index - 1]]
    setVideos(updatedVideos)
  }

  const handleMoveDown = (index: number) => {
    if (index === videos.length - 1) return
    const updatedVideos = [...videos]
    ;[updatedVideos[index], updatedVideos[index + 1]] = [updatedVideos[index + 1], updatedVideos[index]]
    setVideos(updatedVideos)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200 px-8 py-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Videos</h2>
        <p className="text-sm text-gray-600 mt-1">Add, edit, delete, and reorder your performance videos</p>
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

        {/* Add Video Button */}
        {!showAddForm && editingIndex === null && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            + Add New Video
          </button>
        )}

        {/* Add/Edit Form */}
        {(showAddForm || editingIndex !== null) && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-lg">
              {editingIndex !== null ? 'Edit Video' : 'Add New Video'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video ID *
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="dQw4w9WgXcQ"
                />
                <p className="text-xs text-gray-500 mt-1">YouTube video ID from URL</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="Performance Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="youtube">YouTube</option>
                  <option value="vimeo">Vimeo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail URL (optional)
                </label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="Auto-generated if empty"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={editingIndex !== null ? handleUpdateVideo : handleAddVideo}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                {editingIndex !== null ? 'Update Video' : 'Add Video'}
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setEditingIndex(null)
                  setFormData({ id: '', title: '', platform: 'youtube', thumbnail: '' })
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Videos List */}
        <div className="space-y-4">
          {videos.map((video, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-32 h-20 object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder.jpg'
                }}
              />

              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{video.title}</h4>
                <p className="text-sm text-gray-600">
                  {video.platform} • ID: {video.id}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={() => handleMoveDown(index)}
                  disabled={index === videos.length - 1}
                  className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  onClick={() => handleEditVideo(index)}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteVideo(index)}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {videos.length === 0 && (
            <p className="text-center text-gray-500 py-8">No videos added yet. Click &quot;Add New Video&quot; to get started.</p>
          )}
        </div>

        {/* Save All Changes Button */}
        {videos.length > 0 && (
          <button
            onClick={handleSaveVideos}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Save All Changes
          </button>
        )}
      </div>
    </div>
  )
}
