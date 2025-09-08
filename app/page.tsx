"use client";

import { ThemeToggle } from "../component/ui/theme-toggle";
import LoginScreen from "./login/page";
import { Box } from "@mui/material";
import './globals.css'
export default function Page() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "var(--primary)",
        color: "var(--foreground)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <LoginScreen />
    </Box>
  );
}
