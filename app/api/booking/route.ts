import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, eventDate, eventTime, location, budget, message } = body

    // Format timestamp
    const timestamp = new Date().toISOString()
    const formattedEventDate = new Date(eventDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Save to Google Sheets (if configured)
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        const sheetsResponse = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timestamp,
            name,
            phone,
            email,
            eventDate: formattedEventDate,
            eventTime,
            location,
            budget,
            message: message || '',
            status: 'Pending'
          }),
        })

        if (!sheetsResponse.ok) {
          console.error('Failed to save to Google Sheets')
        } else {
          console.log('Successfully saved booking to Google Sheets')
        }
      } catch (sheetsError) {
        console.error('Google Sheets error:', sheetsError)
        // Continue even if sheets fails
      }
    }

    // Format the booking details for email
    const bookingDetails = `
New Booking Request from ${name}

Contact Information:
- Name: ${name}
- Phone: ${phone}
- Email: ${email}

Event Details:
- Date: ${formattedEventDate}
- Time: ${eventTime}
- Location: ${location}
- Budget: ${budget}

${message ? `Additional Details:\n${message}` : ''}

Please respond to confirm availability.
    `.trim()

    // Send WhatsApp notification (using WhatsApp URL scheme)
    const whatsappMessage = encodeURIComponent(
      `New Booking Request!\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nDate: ${formattedEventDate}\nTime: ${eventTime}\nLocation: ${location}\nBudget: ${budget}${message ? `\n\nMessage: ${message}` : ''}`
    )
    const whatsappUrl = `https://wa.me/919419237802?text=${whatsappMessage}`

    console.log('Booking request received:', { name, email, phone })
    console.log('WhatsApp notification URL:', whatsappUrl)

    return NextResponse.json({
      success: true,
      message: 'Booking request submitted successfully',
      whatsappUrl
    })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit booking request' },
      { status: 500 }
    )
  }
}
