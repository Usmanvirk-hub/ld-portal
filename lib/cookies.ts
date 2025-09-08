// Cookie utility functions

export const setSessionCookie = (value: string = 'authenticated') => {
  if (typeof document !== 'undefined') {
    // Set cookie with more permissive settings for development
    // Make sure to set SameSite=None and Secure in production
    const isProduction = process.env.NODE_ENV === 'production'
    document.cookie = `session=${value}; path=/; max-age=86400; samesite=${isProduction ? 'None' : 'Lax'}; secure=${isProduction ? 'true' : 'false'}`

    console.log('Session cookie set:', document.cookie)
  }
}

export const clearSessionCookie = () => {
  if (typeof document !== 'undefined') {
    document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    console.log('Session cookie cleared')
  }
}

export const getSessionCookie = (): string | null => {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';')
    const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('session='))
    return sessionCookie ? sessionCookie.split('=')[1] : null
  }
  return null
}

export const isAuthenticated = (): boolean => {
  return getSessionCookie() === 'authenticated'
}

// Token helpers (localStorage)
const TOKEN_KEY = 'auth_token'

export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token)
  }
}

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY)
  }
  return null
}

export const clearToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY)
  }
}
