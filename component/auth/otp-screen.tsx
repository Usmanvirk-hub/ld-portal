"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Box, Paper, Button, Typography, TextField, Alert, IconButton } from "@mui/material"
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material"
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";

import type { OTPScreenProps } from "@/types/auth"
import { validateOTP, formatTime, verifyOTP, resendOTP } from "@/lib/auth"

export default function OTPScreen({ username, onBack }: OTPScreenProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(true)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsTimerActive(false)
            return 0
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerActive, timeLeft])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple characters

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Clear error when user starts typing
    if (error) setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateOTP(otp)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const otpValue = otp.join("")
      const isValid = await verifyOTP(otpValue)

      if (isValid) {
        // Set session cookie for middleware to detect
        document.cookie = "session=authenticated; path=/; max-age=86400; secure; samesite=strict";
        setOpenSnackbar(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setError("Invalid OTP. Please try again.")
      }
    } catch (err) {
      setError("Verification failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      await resendOTP(username)
      setError("")
      setTimeLeft(300) // Reset to 5 minutes
      setIsTimerActive(true)
      setOtp(["", "", "", "", "", ""]) // Clear OTP inputs
      inputRefs.current[0]?.focus() // Focus first input
      alert("OTP resent successfully!")
    } catch (err) {
      setError("Failed to resend OTP. Please try again.")
    }
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
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton
            onClick={onBack}
            sx={{
              color: "var(--muted-foreground)",
              mr: 1,
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "var(--card-foreground)",
            }}
          >
            Enter OTP
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="body2" sx={{ color: "var(--muted-foreground)", mb: 2 }}>
            We've sent a 6-digit code to your registered device for
          </Typography>
          <Typography variant="body1" sx={{ color: "var(--foreground)", fontWeight: "medium" }}>
            {username}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", mb: 2 }}>
          {isTimerActive ? (
            <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
              Code expires in:{" "}
              <span style={{ color: "var(--primary)", fontWeight: "bold" }}>{formatTime(timeLeft)}</span>
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ color: "var(--destructive)" }}>
              Code has expired. Please request a new one.
            </Typography>
          )}
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
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "center",
              mb: 3,
            }}
          >
            {otp.map((digit, index) => (
              <TextField
                key={index}
                inputRef={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isLoading}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  },
                }}
                sx={{
                  width: "50px",
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
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "var(--foreground)",
                  },
                }}
              />
            ))}
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              mb: 2,
              py: 1.5,
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              "&:hover": {
                backgroundColor: "var(--primary)",
                opacity: 0.9,
              },
              "&:disabled": {
                backgroundColor: "var(--muted)",
                color: "var(--muted-foreground)",
              },
            }}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "var(--muted-foreground)", mb: 1 }}>
              Didn't receive the code?
            </Typography>
            <Button
              variant="text"
              onClick={handleResend}
              disabled={isTimerActive || isLoading}
              sx={{
                color: isTimerActive ? "var(--muted-foreground)" : "var(--primary)",
                "&:hover": {
                  backgroundColor: isTimerActive ? "transparent" : "var(--accent)",
                },
                "&:disabled": {
                  color: "var(--muted-foreground)",
                },
              }}
            >
              {isTimerActive ? `Resend in ${formatTime(timeLeft)}` : "Resend OTP"}
            </Button>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        message="Successfully verified! Redirecting to dashboard..."
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  )
}
