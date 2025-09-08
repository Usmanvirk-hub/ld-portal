"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material"
import { Visibility, VisibilityOff, Email as EmailIcon, Lock as LockIcon } from "@mui/icons-material"
import "../../app/globals.css"
import apiClient from "@/lib/api"
import { AUTH_ENDPOINTS } from "@/lib/endpoints"
import { setSessionCookie, setToken } from "@/lib/cookies"


export default function LoginScreen() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [error, setError] = useState("")
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  })
  const [errorTimeout, setErrorTimeout] = useState<NodeJS.Timeout | null>(null)
  const [errorCountdown, setErrorCountdown] = useState(0)

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  // Handle error timeout cleanup
  useEffect(() => {
    return () => {
      if (errorTimeout) {
        clearTimeout(errorTimeout)
      }
    }
  }, [errorTimeout])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rememberMe" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.email || !formData.password) {
      console.log("Validation error triggered")
      setError("Please fill in all fields")
      setSnackbar({
        open: true,
        message: "Please fill in all fields",
        severity: "error",
      })

      // Clear any existing timeout
      if (errorTimeout) {
        console.log("Clearing existing timeout")
        clearTimeout(errorTimeout)
      }

      // Add delay for validation error message display (5 seconds)
      console.log("Setting validation error timeout for 5 seconds")
      setErrorCountdown(5)

      const timeout = setTimeout(() => {
        console.log("Validation error timeout completed - clearing error")
        setError("") // Clear error message after 5 seconds
        setIsLoading(false)
        setErrorTimeout(null)
        setErrorCountdown(0)
      }, 5000)

      // Countdown timer
      const countdownInterval = setInterval(() => {
        setErrorCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      setErrorTimeout(timeout)
      console.log("Error timeout set:", timeout)
      return
    }

    setError("")

    try {
      console.log("Attempting login with:", { username: formData.email, password: formData.password })
      console.log("API endpoint:", AUTH_ENDPOINTS.login)

      // For demo purposes, let's use the demo credentials check
      if (formData.email === "test@example.com" && formData.password === "password123") {
        console.log("Demo login successful")

        // Set session cookie for middleware to detect
        setSessionCookie('authenticated')
        console.log("Session cookie set, redirecting to dashboard...")

        // Show success toast and navigate immediately
        setSnackbar({
          open: true,
          message: "Login successful! Redirecting to dashboard...",
          severity: "success",
        })

        // Navigate immediately without waiting
        window.location.href = "/dashboard"
        return
      }

      // Try API call for other credentials
      const response = await apiClient.post(AUTH_ENDPOINTS.login, {
        username: formData.email,
        password: formData.password,
      })

      console.log("Login response:", response)
      // If API returns a token, store it
      const token = (response as any)?.data?.access_token
        || (response as any)?.data?.token
        || (response as any)?.data?.accessToken
      if (token) {
        setToken(token)
      }

      // Set session cookie for middleware to detect
      setSessionCookie('authenticated')
      console.log("Session cookie set, redirecting to dashboard...")

      // Show success toast and navigate immediately
      setSnackbar({
        open: true,
        message: "Login successful! Redirecting to dashboard...",
        severity: "success",
      })

      // Navigate immediately without waiting
      window.location.href = "/dashboard"
    } catch (err: any) {
      console.error("Login error:", err)
      const msg =
        err?.response?.data?.message || "Login failed. Please check your credentials or try the demo credentials."
      console.log(msg)
      setError(msg)
      setSnackbar({
        open: true,
        message: msg,
        severity: "error",
      })

      // Clear any existing timeout
      if (errorTimeout) {
        clearTimeout(errorTimeout)
      }

      // Add delay for error message display (5 seconds)
      console.log("Setting API error timeout for 5 seconds")
      const timeout = setTimeout(() => {
        console.log("API error timeout completed - clearing error")
        setError("") // Clear error message after 5 seconds
        setIsLoading(false)
        setErrorTimeout(null)
      }, 5000)

      setErrorTimeout(timeout)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--primary)",
        padding: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: "var(--radius)",
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "var(--card-foreground)",
              mb: 1,
            }}
          >
            Login Account
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
            Sign in to your account to continue
          </Typography>
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              backgroundColor: "var(--destructive)",
              color: "var(--primary-foreground)",
              "& .MuiAlert-icon": {
                color: "var(--primary-foreground)",
              },
            }}
          >
            {error} {errorCountdown > 0 && `(Disappears in ${errorCountdown}s)`}
          </Alert>
        )}


        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "var(--muted-foreground)" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "var(--background)",
                "& fieldset": {
                  borderColor: "var(--border)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--ring)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--ring)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "var(--muted-foreground)",
              },
              "& .MuiInputBase-input": {
                color: "var(--foreground)",
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "var(--primary)",
                },
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "var(--muted-foreground)" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{ color: "var(--muted-foreground)" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "var(--background)",
                "& fieldset": {
                  borderColor: "var(--border)",
                },
                "&:hover fieldset": {
                  borderColor: "var(--ring)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--ring)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "var(--muted-foreground)",
              },
              "& .MuiInputBase-input": {
                color: "var(--foreground)",
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "var(--primary)",
                },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: 2,
              mb: 2,
              py: 1.5,
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              "&:hover": {
                backgroundColor: "var(--primary)",
                opacity: 0.9,
              },
              "&:active": {
                backgroundColor: "var(--primary)",
                opacity: 0.8,
              },
              "&:disabled": {
                backgroundColor: "var(--muted)",
                color: "var(--muted-foreground)",
              },
            }}
          >
            {isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                <Typography variant="body2">Signing In...</Typography>
              </Box>
            ) : (
              "Sign In"
            )}
          </Button>
        </Box>
      </Paper>

      {/* Toast Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000} // Updated from 4000ms to 3000ms (3 seconds)
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            backgroundColor: snackbar.severity === "success" ? "#4caf50" : "var(--destructive)",
            color: snackbar.severity === "success" ? "white" : "var(--primary-foreground)",
            "& .MuiAlert-icon": {
              color: snackbar.severity === "success" ? "white" : "var(--primary-foreground)",
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
