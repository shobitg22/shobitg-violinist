import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, eventDate, eventTime, location, budget, message } = body

    // Format the booking details
    const bookingDetails = `
New Booking Request from ${name}

Contact Information:
- Name: ${name}
- Phone: ${phone}
- Email: ${email}

Event Details:
- Date: ${new Date(eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}
- Time: ${eventTime}
- Location: ${location}
- Budget: ${budget}

${message ? `Additional Details:\n${message}` : ''}

Please respond to confirm availability.
    `.trim()

    // Send email using Web3Forms (free email service)
    const emailResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY || 'demo-key',
        subject: `New Booking Request from ${name}`,
        from_name: 'Shobit G Violinist Website',
        to_email: 'shobitji2@gmail.com',
        message: bookingDetails,
        email: email,
        name: name,
      }),
    })

    // Send WhatsApp notification (using WhatsApp URL scheme)
    // Note: This creates a WhatsApp link that the server can log/track
    const whatsappMessage = encodeURIComponent(
      `New Booking Request!\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nDate: ${new Date(eventDate).toLocaleDateString()}\nTime: ${eventTime}\nLocation: ${location}\nBudget: ${budget}${message ? `\n\nMessage: ${message}` : ''}`
    )
    const whatsappUrl = `https://wa.me/919419237802?text=${whatsappMessage}`

    console.log('Booking request received:', { name, email, phone })
    console.log('WhatsApp notification URL:', whatsappUrl)

    if (!emailResponse.ok) {
      throw new Error('Failed to send email')
    }

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
