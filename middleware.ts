import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Change this to your server's session cookie name if different
const SESSION_COOKIE_NAME = process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME || 'session'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect dashboard and nested routes
  const isProtected = pathname.startsWith('/dashboard')

  if (isProtected) {
    const hasSession = req.cookies.has(SESSION_COOKIE_NAME)
    const sessionValue = req.cookies.get(SESSION_COOKIE_NAME)?.value
    console.log('Middleware check:', { 
      pathname, 
      hasSession, 
      sessionValue,
      allCookies: req.cookies.getAll().map(c => ({ name: c.name, value: c.value }))
    })

    if (!hasSession || sessionValue !== 'authenticated') {
      console.log('No valid session found, redirecting to login')
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}


