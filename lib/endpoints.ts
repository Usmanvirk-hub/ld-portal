// Centralized API base URL and endpoint paths

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://138.197.22.237'

export const AUTH_ENDPOINTS = {
  login: '/admin/auth/login',
  refresh: '/auth/refresh',
  verify: '/auth/verify',
  logout: '/auth/logout',
}

export const PAYMENT_ENDPOINTS = {
  list: '/payments',
  byId: (id: string) => `/payments/${id}`,
}


