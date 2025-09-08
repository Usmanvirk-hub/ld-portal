export interface LoginFormData {
    username: string
    password: string
  }
  
  export interface OTPScreenProps {
    username: string
    onBack: () => void
  }
  
  export interface AuthState {
    isAuthenticated: boolean
    user: User | null
    isLoading: boolean
  }
  
  export interface User {
    id: string
    username: string
    email?: string
  }
  