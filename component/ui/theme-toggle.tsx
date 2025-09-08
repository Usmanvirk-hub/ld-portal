"use client"

import { useState, useEffect } from "react"
import { IconButton } from "@mui/material"
import { LightMode, DarkMode } from "@mui/icons-material"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        position: "fixed",
        top: 16,
        right: 16,
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        color: "var(--foreground)",
        "&:hover": {
          backgroundColor: "var(--accent)",
        },
      }}
    >
      {isDark ? <LightMode /> : <DarkMode />}
    </IconButton>
  )
}
