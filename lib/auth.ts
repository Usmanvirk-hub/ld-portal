import type { LoginFormData } from "@/types/auth"

export const validateLoginForm = (data: LoginFormData): string | null => {
  if (!data.username.trim()) {
    return "Username is required"
  }

  if (!data.password.trim()) {
    return "Password is required"
  }

  if (data.username.length < 3) {
    return "Username must be at least 3 characters"
  }

  if (data.password.length < 6) {
    return "Password must be at least 6 characters"
  }

  return null
}

export const validateOTP = (otp: string[]): string | null => {
  const otpValue = otp.join("")

  if (otpValue.length !== 6) {
    return "Please enter all 6 digits"
  }

  if (!/^\d{6}$/.test(otpValue)) {
    return "OTP must contain only numbers"
  }

  return null
}

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

// Simulate API calls
export const authenticateUser = async (data: LoginFormData): Promise<boolean> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock authentication logic
  return data.username === "admin" && data.password === "password123"
}

export const verifyOTP = async (otp: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock OTP verification
  return otp === "123456"
}

export const resendOTP = async (username: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock resend logic
  console.log(`Resending OTP to ${username}`)
  return true
}
