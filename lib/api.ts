import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_BASE_URL, AUTH_ENDPOINTS } from '@/lib/endpoints'
import { getToken } from '@/lib/cookies'

// Base URL of your server
// Base URL is imported from endpoints.ts
const BASE_URL = API_BASE_URL

// Create axios instance (cookie-based auth)
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: attach Bearer token when available
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers = config.headers || {}
      ;(config.headers as any)['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for 401 handling and silent refresh
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true
      try {
        // Attempt refresh via cookie-based session
        await apiClient.post(AUTH_ENDPOINTS.refresh)
        return apiClient(originalRequest)
      } catch {
        // Do NOT hard-redirect to /login here; let pages handle it locally
        // This avoids kicking users out of protected areas on background requests
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

// Optional helpers
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => apiClient.get<T>(url, config),
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => apiClient.post<T>(url, data, config),
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => apiClient.put<T>(url, data, config),
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => apiClient.patch<T>(url, data, config),
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => apiClient.delete<T>(url, config),
}

export const uploadFile = async (
  url: string,
  file: File,
  onProgress?: (progress: number) => void
) => {
  const formData = new FormData()
  formData.append('file', file)
  return apiClient.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (evt) => {
      if (onProgress && evt.total) {
        onProgress(Math.round((evt.loaded * 100) / evt.total))
      }
    },
  })
}

export default apiClient


