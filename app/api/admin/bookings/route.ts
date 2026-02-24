import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/session'

export async function GET() {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL

    if (!webhookUrl) {
      return NextResponse.json({
        success: false,
        error: 'Google Sheets webhook URL is not configured',
        bookings: [],
      })
    }

    // Try to fetch bookings from Google Sheets
    // The webhook URL might need to be modified to support GET requests
    // For now, we'll return an informational message
    try {
      // Attempt to fetch if the webhook supports GET
      const response = await fetch(webhookUrl, {
        method: 'GET',
      })

      if (response.ok) {
        const data = await response.json()
        return NextResponse.json({
          success: true,
          bookings: data.bookings || [],
        })
      }
    } catch (fetchError) {
      console.error('Error fetching bookings:', fetchError)
    }

    // If fetch fails or webhook doesn't support GET, return message
    return NextResponse.json({
      success: true,
      bookings: [],
      message: 'Bookings are stored in Google Sheets. Please check your Google Sheet directly for booking data.',
      sheetConfigured: true,
    })
  } catch (error) {
    console.error('Error in bookings API:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings', bookings: [] },
      { status: 500 }
    )
  }
}
