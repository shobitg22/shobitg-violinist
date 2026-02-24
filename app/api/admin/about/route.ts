import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/session'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ABOUT_FILE = path.join(process.cwd(), 'data', 'about.md')

export async function GET() {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const fileContent = await fs.readFile(ABOUT_FILE, 'utf-8')
    const { data, content } = matter(fileContent)

    return NextResponse.json({
      success: true,
      data: {
        title: data.title || '',
        image: data.image || '',
        content: content.trim(),
      },
    })
  } catch (error) {
    console.error('Error reading about data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to read about data' },
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
    const { title, image, content } = body

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Create frontmatter with data
    const frontmatter = {
      title,
      image: image || '/images/profile.jpg',
    }

    // Generate new markdown file content
    const newContent = matter.stringify(content.trim(), frontmatter)

    // Write to file
    await fs.writeFile(ABOUT_FILE, newContent, 'utf-8')

    return NextResponse.json({
      success: true,
      message: 'About section updated successfully',
    })
  } catch (error) {
    console.error('Error updating about data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update about data' },
      { status: 500 }
    )
  }
}
