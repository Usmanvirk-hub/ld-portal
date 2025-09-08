"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material"
import { 
  Save, 
  Security, 
  Notifications, 
  Payment, 
  Delete,
  Business,
  Email,
  Phone,
  LocationOn,
  Settings as SettingsIcon,
  Refresh,
} from "@mui/icons-material"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: "FinanceApp",
    email: "admin@financeapp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business St, City, State 12345",
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: true,
    autoApproveDeposits: false,
    minWithdrawal: "10",
    maxWithdrawal: "10000",
    withdrawalFee: "2.5",
  })
  const [success, setSuccess] = useState(false)

  const handleSave = () => {
    console.log("Settings saved:", settings)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [field]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    })
  }

  return (
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, px: 1, color: "var(--foreground)" }}>
        Settings
      </Typography>

      {success && (
        <Alert 
          severity="success" 
          sx={{ 
            mb: 4, 
            borderRadius: 2,
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            backgroundColor: "var(--card)",
            color: "var(--foreground)"
          }}
        >
          Settings saved successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            mb: 3, 
            borderRadius: 3, 
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
            }
          }}>
            <Typography variant="h6" gutterBottom sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 1,
              color: "var(--foreground)"
            }}>
              <Business />
              Company Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company Name"
                  value={settings.companyName}
                  onChange={handleChange("companyName")}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'var(--background)',
                      '& fieldset': {
                        borderColor: 'var(--border)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'var(--ring)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'var(--ring)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'var(--muted-foreground)',
                    },
                    '& .MuiInputBase-input': {
                      color: 'var(--foreground)',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={settings.email}
                  onChange={handleChange("email")}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'var(--background)',
                      '& fieldset': {
                        borderColor: 'var(--border)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'var(--ring)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'var(--ring)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'var(--muted-foreground)',
                    },
                    '& .MuiInputBase-input': {
                      color: 'var(--foreground)',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={settings.phone}
                  onChange={handleChange("phone")}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'var(--background)',
                      '& fieldset': {
                        borderColor: 'var(--border)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'var(--ring)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'var(--ring)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'var(--muted-foreground)',
                    },
                    '& .MuiInputBase-input': {
                      color: 'var(--foreground)',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={settings.address}
                  onChange={handleChange("address")}
                  multiline
                  rows={2}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'var(--background)',
                      '& fieldset': {
                        borderColor: 'var(--border)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'var(--ring)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'var(--ring)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'var(--muted-foreground)',
                    },
                    '& .MuiInputBase-input': {
                      color: 'var(--foreground)',
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            mb: 3, 
            borderRadius: 3, 
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
            }
          }}>
            <Typography variant="h6" gutterBottom sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 1,
              color: "var(--foreground)"
            }}>
              <Notifications />
              Notification Settings
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={handleChange("emailNotifications")}
                      color="primary"
                    />
                  }
                  label="Email Notifications"
                  sx={{ color: "var(--foreground)" }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.smsNotifications}
                      onChange={handleChange("smsNotifications")}
                      color="primary"
                    />
                  }
                  label="SMS Notifications"
                  sx={{ color: "var(--foreground)" }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.twoFactorAuth}
                      onChange={handleChange("twoFactorAuth")}
                      color="primary"
                    />
                  }
                  label="Two-Factor Authentication"
                  sx={{ color: "var(--foreground)" }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            mb: 3, 
            borderRadius: 3, 
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
            }
          }}>
            <Typography variant="h6" gutterBottom sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 1,
              color: "var(--foreground)"
            }}>
              <Payment />
              Transaction Settings
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoApproveDeposits}
                      onChange={handleChange("autoApproveDeposits")}
                      color="primary"
                    />
                  }
                  label="Auto-approve Deposits"
                  sx={{ color: "var(--foreground)" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Min Withdrawal"
                  value={settings.minWithdrawal}
                  onChange={handleChange("minWithdrawal")}
                  type="number"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'var(--background)',
                      '& fieldset': {
                        borderColor: 'var(--border)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'var(--ring)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'var(--ring)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'var(--muted-foreground)',
                    },
                    '& .MuiInputBase-input': {
                      color: 'var(--foreground)',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Max Withdrawal"
                  value={settings.maxWithdrawal}
                  onChange={handleChange("maxWithdrawal")}
                  type="number"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'var(--background)',
                      '& fieldset': {
                        borderColor: 'var(--border)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'var(--ring)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'var(--ring)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'var(--muted-foreground)',
                    },
                    '& .MuiInputBase-input': {
                      color: 'var(--foreground)',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Withdrawal Fee (%)"
                  value={settings.withdrawalFee}
                  onChange={handleChange("withdrawalFee")}
                  type="number"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'var(--background)',
                      '& fieldset': {
                        borderColor: 'var(--border)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'var(--ring)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'var(--ring)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'var(--muted-foreground)',
                    },
                    '& .MuiInputBase-input': {
                      color: 'var(--foreground)',
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              sx={{
                borderColor: "var(--destructive)",
                color: "var(--destructive)",
                "&:hover": {
                  borderColor: "var(--destructive)",
                  backgroundColor: "var(--destructive)",
                  color: "var(--primary-foreground)",
                },
              }}
            >
              Reset to Defaults
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSave}
              sx={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                "&:hover": {
                  backgroundColor: "var(--primary)",
                  opacity: 0.9,
                },
              }}
            >
              Save Settings
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
