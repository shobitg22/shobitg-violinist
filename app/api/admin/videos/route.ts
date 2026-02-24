import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/session'
import { promises as fs } from 'fs'
import path from 'path'

const VIDEOS_FILE = path.join(process.cwd(), 'data', 'videos.json')

interface Video {
  id: string
  title: string
  platform: string
  thumbnail: string
}

export async function GET() {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const fileContent = await fs.readFile(VIDEOS_FILE, 'utf-8')
    const data = JSON.parse(fileContent)

    return NextResponse.json({
      success: true,
      videos: data.videos || [],
    })
  } catch (error) {
    console.error('Error reading videos:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to read videos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { videos } = body

    if (!Array.isArray(videos)) {
      return NextResponse.json(
        { success: false, error: 'Videos must be an array' },
        { status: 400 }
      )
    }

    // Validate each video
    for (const video of videos) {
      if (!video.id || !video.title || !video.platform) {
        return NextResponse.json(
          { success: false, error: 'Each video must have id, title, and platform' },
          { status: 400 }
        )
      }
    }

    // Write to file
    await fs.writeFile(
      VIDEOS_FILE,
      JSON.stringify({ videos }, null, 2),
      'utf-8'
    )

    return NextResponse.json({
      success: true,
      message: 'Videos updated successfully',
    })
  } catch (error) {
    console.error('Error updating videos:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update videos' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const videoId = searchParams.get('id')

    if (!videoId) {
      return NextResponse.json(
        { success: false, error: 'Video ID is required' },
        { status: 400 }
      )
    }

    const fileContent = await fs.readFile(VIDEOS_FILE, 'utf-8')
    const data = JSON.parse(fileContent)

    // Filter out the video with the given ID
    const updatedVideos = data.videos.filter((v: Video) => v.id !== videoId)

    await fs.writeFile(
      VIDEOS_FILE,
      JSON.stringify({ videos: updatedVideos }, null, 2),
      'utf-8'
    )

    return NextResponse.json({
      success: true,
      message: 'Video deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting video:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete video' },
      { status: 500 }
    )
  }
}
