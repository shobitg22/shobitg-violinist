import { getIronSession, IronSession, SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'

export interface SessionData {
  isLoggedIn: boolean
  loginTime?: number
}

// Session configuration
export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long_for_secure_sessions',
  cookieName: 'admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60, // 1 hour
  },
}

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies()
  return getIronSession<SessionData>(cookieStore, sessionOptions)
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()

  if (!session.isLoggedIn) {
    return false
  }

  // Check if session has expired (1 hour)
  const now = Date.now()
  const loginTime = session.loginTime || 0
  const oneHour = 60 * 60 * 1000

  if (now - loginTime > oneHour) {
    session.isLoggedIn = false
    await session.save()
    return false
  }

  return true
}
