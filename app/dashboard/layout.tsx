"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material"
import {
  Menu as MenuIcon,
  Dashboard,
  AccountBalance,
  MoneyOff,
  People,
  Settings,
  AccountCircle,
  Logout,
  CreditCard,
  Notifications,
} from "@mui/icons-material"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { clearSessionCookie, isAuthenticated, clearToken } from "@/lib/cookies"
import '../globals.css'

const drawerWidth = 240

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
  { text: "Deposits", icon: <AccountBalance />, path: "/dashboard/deposits" },
  { text: "Withdrawals", icon: <MoneyOff />, path: "/dashboard/withdrawals" },
  { text: "Bank Accounts", icon: <CreditCard />, path: "/dashboard/bank-accounts" },
  { text: "User Management", icon: <People />, path: "/dashboard/users" },
  { text: "Settings", icon: <Settings />, path: "/dashboard/settings" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [notifications, setNotifications] = useState(0)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setNotifications(prev => prev + 1)
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  // Debug authentication status
  useEffect(() => {
    console.log('Dashboard layout mounted, auth status:', isAuthenticated())
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    // Clear session cookie
    clearSessionCookie()
    clearToken()
    handleClose()
    router.push("/login")
  }

  const drawer = (
    <Box sx={{ backgroundColor: "var(--sidebar)", height: "100%", color: "var(--sidebar-foreground)" }}>
      <Toolbar sx={{ backgroundColor: "var(--sidebar)" }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: "bold", color: "var(--sidebar-foreground)" }}>
          FinanceApp
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: "var(--sidebar-border)" }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              selected={pathname === item.path}
              sx={{
                color: "var(--sidebar-foreground)",
                "&:hover": {
                  backgroundColor: "var(--sidebar-accent)",
                },
                "&.Mui-selected": {
                  backgroundColor: "var(--sidebar-primary)",
                  color: "var(--sidebar-primary-foreground)",
                  fontWeight: "bold",
                  "& .MuiListItemIcon-root": {
                    color: "var(--sidebar-primary-foreground)",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex", backgroundColor: "var(--background)", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "var(--card)",
          color: "var(--card-foreground)",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: "var(--card-foreground)" }}>
            {menuItems.find((item) => item.path === pathname)?.text || "Dashboard"}
            {notifications > 0 && (
              <Chip 
                label={notifications} 
                size="small" 
                color="secondary" 
                sx={{ ml: 2 }}
              />
            )}
          </Typography>
          <div>
            <IconButton size="large" aria-label="notifications" sx={{ color: "var(--muted-foreground)", mr: 1 }}>
              <Notifications />
            </IconButton>
            <IconButton size="large" aria-label="account of current user" onClick={handleMenu} sx={{ color: "var(--muted-foreground)" }}>
              <Avatar sx={{ width: 32, height: 32, backgroundColor: "var(--muted-foreground)" }}>
                <AccountCircle />
              </Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
