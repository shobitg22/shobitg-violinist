import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/session'
import { promises as fs } from 'fs'
import path from 'path'

const AVAILABILITY_FILE = path.join(process.cwd(), 'data', 'availability.json')

export async function GET() {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const fileContent = await fs.readFile(AVAILABILITY_FILE, 'utf-8')
    const data = JSON.parse(fileContent)

    return NextResponse.json({
      success: true,
      unavailableDates: data.unavailableDates || [],
      note: data.note || '',
    })
  } catch (error) {
    console.error('Error reading availability:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to read availability' },
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
    const { unavailableDates, note } = body

    if (!Array.isArray(unavailableDates)) {
      return NextResponse.json(
        { success: false, error: 'unavailableDates must be an array' },
        { status: 400 }
      )
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    for (const date of unavailableDates) {
      if (!dateRegex.test(date)) {
        return NextResponse.json(
          { success: false, error: `Invalid date format: ${date}. Use YYYY-MM-DD` },
          { status: 400 }
        )
      }
    }

    // Sort dates
    const sortedDates = [...unavailableDates].sort()

    // Write to file
    await fs.writeFile(
      AVAILABILITY_FILE,
      JSON.stringify({
        unavailableDates: sortedDates,
        note: note || 'Dates listed here are unavailable for booking. Admin can update this via the admin panel.',
      }, null, 2),
      'utf-8'
    )

    return NextResponse.json({
      success: true,
      message: 'Availability updated successfully',
    })
  } catch (error) {
    console.error('Error updating availability:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update availability' },
      { status: 500 }
    )
  }
}
