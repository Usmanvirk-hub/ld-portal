'use client'
import { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  Card,
  CardContent,
  Container,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api';
import { AUTH_ENDPOINTS } from '@/lib/endpoints';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    try {
      setErrorMessage('');
      console.log('Attempting login with:', { username: email, password: password });
      console.log('API endpoint:', AUTH_ENDPOINTS.login);
      
      // For demo purposes, let's use the demo credentials check
      if (email === 'test@example.com' && password === 'password123') {
        console.log('Demo login successful');
        // Set session cookie for middleware to detect
        document.cookie = "session=authenticated; path=/; max-age=86400; samesite=strict";
        console.log('Session cookie set, redirecting to dashboard...');
        
        // Redirect directly to dashboard
        window.location.href = '/dashboard';
        return;
      }
      
      // Try API call for other credentials
      const response = await apiClient.post(AUTH_ENDPOINTS.login, {
        username: email,
        password: password,
      });
      
      console.log('Login response:', response);
      
      // Set session cookie for middleware to detect
      document.cookie = "session=authenticated; path=/; max-age=86400; samesite=strict";
      console.log('Session cookie set, redirecting to dashboard...');
      
      // Redirect directly to dashboard
      window.location.href = '/dashboard';
    } catch (err: any) {
      console.error('Login error:', err);
      const msg = err?.response?.data?.message || 'Login failed. Please check your credentials or try the demo credentials.';
      setErrorMessage(msg);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: "var(--primary)",
        padding: 3
      }}
    >
      <Card
        elevation={24}
        sx={{
          width: '100%',
          maxWidth: 400,
          borderRadius: 4,
          background: 'var(--primary-foreground)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: "var(--primary)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
              }}
            >
              <LockIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                background: "var(--primary)",
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Login Accountll
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your account
            </Typography>
          </Box>

          {/* Error Alert */}
          {errorMessage && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  fontSize: '1.2rem'
                }
              }}
            >
              {errorMessage}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: "var(--primary)",
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: "var(--primary)",
                  }
                }
              }}
              InputLabelProps={{
                sx: {
                  '&.Mui-focused': {
                    color: "var(--primary)",
                  }
                }
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ mb: 4 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: 'text.secondary' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: "var(--primary)",
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: "var(--primary)",
                  }
                }
              }}
              InputLabelProps={{
                sx: {
                  '&.Mui-focused': {
                    color: "var(--primary)",
                  }
                }
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: "var(--primary)",
                // boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  background: 'var(--muted-foreground)',
                  boxShadow: 'var(--muted-foreground)',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Sign In
            </Button>
          </Box>

          {/* Footer */}
          <Divider sx={{ my: 3 }} />
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Typography
                component="span"
                sx={{
                  color: 'var(--primary)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Sign up here
              </Typography>
            </Typography>
          </Box>

          {/* Demo Credentials */}
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: '#f8fafc',
              borderRadius: 2,
              border: '1px dashed #cbd5e0'
            }}
          >
            <Typography variant="caption" color="text.secondary" display="block" align="center">
              <strong>Demo Credentials:</strong><br />
              Email: test@example.com<br />
              Password: password123
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>

  );
}