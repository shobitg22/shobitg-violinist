import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 })
  }

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'GitHub OAuth credentials not configured' },
      { status: 500 }
    )
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      }
    )

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return NextResponse.json(
        { error: tokenData.error_description },
        { status: 400 }
      )
    }

    // Return token in the format Decap CMS expects
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authorization Complete</title>
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage(
                'authorization:github:success:${JSON.stringify(tokenData)}',
                window.location.origin
              );
              window.close();
            }
          </script>
          <p>Authorization successful! You can close this window.</p>
        </body>
      </html>
    `

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.json(
      { error: 'Failed to authenticate with GitHub' },
      { status: 500 }
    )
  }
}
