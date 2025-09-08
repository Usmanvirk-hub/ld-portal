"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  IconButton,
  Menu,
  Avatar,
  Tabs,
  Tab,
  Divider,
  Snackbar,
  InputAdornment,
  Switch,
  FormControlLabel,
  TablePagination,
} from "@mui/material"
import {
  Person,
  Add,
  Search,
  MoreVert,
  Visibility,
  Edit,
  Delete,
  CheckCircle,
  Cancel,
  Email,
  Phone,
  CalendarToday,
  LocationOn,
  Security,
  Block,
  People,
  AdminPanelSettings,
  VerifiedUser,
  Warning,
  TrendingUp,
} from "@mui/icons-material"
import type { SelectChangeEvent } from "@mui/material"
import CustomSwitch from "../components/customSwitch"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: "Admin" | "User" | "Manager" | "Support"
  status: "Active" | "Inactive"
  avatar?: string
  country: string
  city: string
  joinDate: string
  lastLogin: string
  totalDeposits: string
  totalWithdrawals: string
  accountBalance: string
  isVerified: boolean
  twoFactorEnabled: boolean
  notes?: string
}

const initialUsers: User[] = [
  {
    id: "USR001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "User",
    status: "Active",
    country: "United States",
    city: "New York",
    joinDate: "2024-01-15",
    lastLogin: "2024-01-20",
    totalDeposits: "$5,200.00",
    totalWithdrawals: "$1,800.00",
    accountBalance: "$3,400.00",
    isVerified: true,
    twoFactorEnabled: true,
    notes: "Premium customer with high transaction volume"
  },
  {
    id: "USR002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    role: "Manager",
    status: "Active",
    country: "United States",
    city: "Los Angeles",
    joinDate: "2024-01-10",
    lastLogin: "2024-01-19",
    totalDeposits: "$8,500.00",
    totalWithdrawals: "$2,300.00",
    accountBalance: "$6,200.00",
    isVerified: true,
    twoFactorEnabled: false,
    notes: "Manager with administrative privileges"
  },
  {
    id: "USR003",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 345-6789",
    role: "User",
    status: "Inactive",
    country: "Canada",
    city: "Toronto",
    joinDate: "2024-01-12",
    lastLogin: "2024-01-18",
    totalDeposits: "$1,200.00",
    totalWithdrawals: "$0.00",
    accountBalance: "$1,200.00",
    isVerified: false,
    twoFactorEnabled: false,
    notes: "New user pending verification"
  },
  {
    id: "USR004",
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 456-7890",
    role: "User",
    status: "Inactive",
    country: "United Kingdom",
    city: "London",
    joinDate: "2024-01-08",
    lastLogin: "2024-01-16",
    totalDeposits: "$3,800.00",
    totalWithdrawals: "$4,200.00",
    accountBalance: "-$400.00",
    isVerified: true,
    twoFactorEnabled: true,
    notes: "Account suspended due to suspicious activity"
  },
  {
    id: "USR005",
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    phone: "+1 (555) 000-0000",
    role: "Admin",
    status: "Active",
    country: "United States",
    city: "San Francisco",
    joinDate: "2024-01-01",
    lastLogin: "2024-01-20",
    totalDeposits: "$0.00",
    totalWithdrawals: "$0.00",
    accountBalance: "$0.00",
    isVerified: true,
    twoFactorEnabled: true,
    notes: "System administrator account"
  },
  {
    id: "USR006",
    firstName: "Robert",
    lastName: "Brown",
    email: "robert.brown@example.com",
    phone: "+1 (555) 567-8901",
    role: "Support",
    status: "Active",
    country: "Canada",
    city: "Vancouver",
    joinDate: "2024-01-05",
    lastLogin: "2024-01-19",
    totalDeposits: "$2,100.00",
    totalWithdrawals: "$500.00",
    accountBalance: "$1,600.00",
    isVerified: true,
    twoFactorEnabled: true,
    notes: "Customer support representative"
  },
  {
    id: "USR007",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 678-9012",
    role: "User",
    status: "Inactive",
    country: "Australia",
    city: "Sydney",
    joinDate: "2024-01-03",
    lastLogin: "2024-01-10",
    totalDeposits: "$750.00",
    totalWithdrawals: "$250.00",
    accountBalance: "$500.00",
    isVerified: false,
    twoFactorEnabled: false,
    notes: "Inactive user account"
  },
  {
    id: "USR008",
    firstName: "David",
    lastName: "Martinez",
    email: "david.martinez@example.com",
    phone: "+1 (555) 789-0123",
    role: "User",
    status: "Active",
    country: "Spain",
    city: "Madrid",
    joinDate: "2024-01-02",
    lastLogin: "2024-01-18",
    totalDeposits: "$4,300.00",
    totalWithdrawals: "$1,200.00",
    accountBalance: "$3,100.00",
    isVerified: true,
    twoFactorEnabled: false,
    notes: "International user from Spain"
  },
  {
    id: "USR009",
    firstName: "Lisa",
    lastName: "Anderson",
    email: "lisa.anderson@example.com",
    phone: "+1 (555) 890-1234",
    role: "Manager",
    status: "Active",
    country: "Germany",
    city: "Berlin",
    joinDate: "2023-12-28",
    lastLogin: "2024-01-20",
    totalDeposits: "$6,800.00",
    totalWithdrawals: "$2,800.00",
    accountBalance: "$4,000.00",
    isVerified: true,
    twoFactorEnabled: true,
    notes: "Regional manager for Europe"
  },
  {
    id: "USR010",
    firstName: "James",
    lastName: "Taylor",
    email: "james.taylor@example.com",
    phone: "+1 (555) 901-2345",
    role: "User",
    status: "Inactive",
    country: "United States",
    city: "Chicago",
    joinDate: "2023-12-25",
    lastLogin: "2024-01-05",
    totalDeposits: "$1,500.00",
    totalWithdrawals: "$1,500.00",
    accountBalance: "$0.00",
    isVerified: false,
    twoFactorEnabled: false,
    notes: "Account banned due to policy violations"
  },
  {
    id: "USR011",
    firstName: "Maria",
    lastName: "Garcia",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 012-3456",
    role: "User",
    status: "Active",
    country: "Mexico",
    city: "Mexico City",
    joinDate: "2023-12-20",
    lastLogin: "2024-01-17",
    totalDeposits: "$2,900.00",
    totalWithdrawals: "$900.00",
    accountBalance: "$2,000.00",
    isVerified: true,
    twoFactorEnabled: false,
    notes: "Active user from Mexico"
  },
  {
    id: "USR012",
    firstName: "Thomas",
    lastName: "Lee",
    email: "thomas.lee@example.com",
    phone: "+1 (555) 123-4567",
    role: "Support",
    status: "Active",
    country: "South Korea",
    city: "Seoul",
    joinDate: "2023-12-15",
    lastLogin: "2024-01-19",
    totalDeposits: "$3,200.00",
    totalWithdrawals: "$1,100.00",
    accountBalance: "$2,100.00",
    isVerified: true,
    twoFactorEnabled: true,
    notes: "Support team member for Asia region"
  }
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [roleFilter, setRoleFilter] = useState("All")
  const [open, setOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [tabValue, setTabValue] = useState(0)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    country: "",
    city: "",
    notes: "",
  })

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleSelectChange = (field: string) => (event: SelectChangeEvent) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget)
    setSelectedUser(user)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedUser(null)
  }

  const handleStatusChange = (userId: string, newStatus: User["status"]) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: newStatus }
        : user
    ))
    setSnackbar({
      open: true,
      message: `User status updated to ${newStatus}`,
      severity: "success"
    })
    handleMenuClose()
  }

  const handleVerificationToggle = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, isVerified: !user.isVerified }
        : user
    ))
    setSnackbar({
      open: true,
      message: "User verification status updated",
      severity: "success"
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newUser: User = {
      id: `USR${String(users.length + 1).padStart(3, '0')}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      role: (formData.role as User["role"]) || "User",
      status: "Inactive",
      country: formData.country,
      city: formData.city,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: "Never",
      totalDeposits: "$0.00",
      totalWithdrawals: "$0.00",
      accountBalance: "$0.00",
      isVerified: false,
      twoFactorEnabled: false,
      notes: formData.notes,
      avatar: undefined,
    }
    setUsers([newUser, ...users])
    setSnackbar({
      open: true,
      message: "User added successfully!",
      severity: "success"
    })
    setOpen(false)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      country: "",
      city: "",
      notes: "",
    })
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "All" || user.status === statusFilter
    const matchesRole = roleFilter === "All" || user.role === roleFilter
    
    return matchesSearch && matchesStatus && matchesRole
  })

  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "Active":
        return 'var(--primary)'
      case "Inactive":
        return 'var(--muted-foreground)'
      default:
        return 'var(--muted-foreground)'
    }
  }

  const getRoleColor = (role: User["role"]) => {
    switch (role) {
      case "Admin": return "error"
      case "Manager": return "info"
      case "Support": return "warning"
      case "User": return "default"
      default: return "default"
    }
  }

  return (
    <Box sx={{ p: 3, minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        mb: 4,
        px: 1
      }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
          User Management
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => setOpen(true)}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 500,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
              backgroundColor: 'var(--primary)',
              opacity: 0.9,
            }
          }}
        >
          Add User
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--card)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }
          }}>
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                <People sx={{ color: 'var(--primary)', fontSize: '2rem' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--primary)', mb: 1 }}>
                {users.length}
              </Typography>
              <Typography sx={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', fontWeight: 500 }}>
                Total Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--card)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }
          }}>
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                <CheckCircle sx={{ color: 'var(--accent-foreground)', fontSize: '2rem' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--accent-foreground)', mb: 1 }}>
                {users.filter(u => u.status === "Active").length}
              </Typography>
              <Typography sx={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', fontWeight: 500 }}>
                Active Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--card)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }
          }}>
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                <AdminPanelSettings sx={{ color: 'var(--accent-foreground)', fontSize: '2rem' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--accent-foreground)', mb: 1 }}>
                {users.filter(u => u.role === "Admin").length}
              </Typography>
              <Typography sx={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', fontWeight: 500 }}>
                Admins
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--card)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }
          }}>
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                <VerifiedUser sx={{ color: 'var(--accent-foreground)', fontSize: '2rem' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--accent-foreground)', mb: 1 }}>
                {users.filter(u => u.isVerified).length}
              </Typography>
              <Typography sx={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', fontWeight: 500 }}>
                Verified
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--card)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }
          }}>
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                <Warning sx={{ color: 'var(--destructive)', fontSize: '2rem' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--muted-foreground)', mb: 1 }}>
                {users.filter(u => u.status === "Inactive").length}
              </Typography>
              <Typography sx={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', fontWeight: 500 }}>
                Inactive Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ 
        p: 3, 
        mb: 3, 
        borderRadius: 3,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--card)'
      }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'var(--background)',
                  '&:hover': {
                    backgroundColor: 'var(--muted)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'var(--card)',
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'var(--muted-foreground)' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Role Filter</InputLabel>
              <Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                label="Role Filter"
                sx={{
                  borderRadius: 2,
                  backgroundColor: 'var(--background)',
                  '&:hover': {
                    backgroundColor: 'var(--muted)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'var(--card)',
                  }
                }}
              >
                <MenuItem value="All">All Roles</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Support">Support</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status Filter</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status Filter"
                sx={{
                  borderRadius: 2,
                  backgroundColor: 'var(--background)',
                  '&:hover': {
                    backgroundColor: 'var(--muted)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'var(--card)',
                  }
                }}
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Users Table */}
      <Paper sx={{ 
        borderRadius: 3,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--card)',
        overflow: 'hidden'
      }}>
        <Box sx={{ p: 3, borderBottom: '1px solid var(--border)' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
            Users ({filteredUsers.length})
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'var(--muted)' }}>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Balance</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Join Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow 
                  key={user.id} 
                  hover 
                  sx={{ 
                    cursor: "pointer",
                    '&:hover': {
                      backgroundColor: 'var(--muted)',
                    },
                    borderBottom: '1px solid var(--border)'
                  }}
                  onClick={() => {
                    setSelectedUser(user)
                    setViewOpen(true)
                  }}
                >
                  <TableCell sx={{ py: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ 
                        width: 40, 
                        height: 40,
                        backgroundColor: 'var(--primary)',
                        fontSize: '0.875rem'
                      }}>
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.firstName} />
                        ) : (
                          <Person />
                        )}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 500, color: 'var(--foreground)' }}>
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--muted-foreground)', fontSize: '0.75rem' }}>
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Chip
                      label={user.role}
                      color={getRoleColor(user.role)}
                      size="small"
                      sx={{ 
                        borderRadius: 2,
                        fontWeight: 500,
                        fontSize: '0.75rem'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Chip
                      label={user.status}
                      size="small"
                      sx={{ 
                        backgroundColor: getStatusColor(user.status),
                        color: 'white',
                        borderRadius: 2,
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        '& .MuiChip-label': { color: 'white', fontWeight: 600 }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
                      {user.accountBalance}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Typography variant="body2" sx={{ color: 'var(--muted-foreground)' }}>
                      {user.joinDate}
                    </Typography>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()} sx={{ py: 2 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedUser(user)
                          setViewOpen(true)
                        }}
                        sx={{
                          textTransform: 'none',
                          borderRadius: 1.5,
                          px: 2,
                          fontSize: '0.75rem',
                          color: 'var(--muted-foreground)'
                        }}
                      >
                        Details
                      </Button>
                      <IconButton 
                        onClick={(e) => handleMenuClick(e, user)}
                        sx={{ 
                          borderRadius: 1.5,
                          color: 'var(--muted-foreground)',
                          '&:hover': {
                            backgroundColor: 'var(--muted)'
                          }
                        }}
                      >
                        <MoreVert />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: '1px solid var(--border)',
            '& .MuiTablePagination-toolbar': {
              px: 3,
              py: 2,
            },
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              color: 'var(--muted-foreground)',
              fontWeight: 500,
            },
            '& .MuiTablePagination-select': {
              borderRadius: 1,
            },
            '& .MuiTablePagination-actions button': {
              borderRadius: 1,
              color: 'var(--muted-foreground)',
              '&:hover': {
                backgroundColor: 'var(--muted)',
              },
            },
          }}
        />
      </Paper>

      {/* Action Menu */}
      <Menu 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={handleMenuClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            border: '1px solid #e2e8f0',
            mt: 1
          }
        }}
      >
        <MenuItem onClick={() => {
          setViewOpen(true)
          handleMenuClose()
        }} sx={{ py: 1.5, px: 2 }}>
          <Visibility sx={{ mr: 2 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={() => {
          // Handle edit
          handleMenuClose()
        }} sx={{ py: 1.5, px: 2 }}>
          <Edit sx={{ mr: 2 }} />
          Edit User
        </MenuItem>
        <Divider />
        {selectedUser?.status === "Active" ? (
          <MenuItem 
            onClick={() => handleStatusChange(selectedUser.id, "Inactive")}
            sx={{ py: 1.5, px: 2 }}
          >
            <Cancel sx={{ mr: 2, color: "warning.main" }} />
            Deactivate
          </MenuItem>
        ) : (
          <MenuItem 
            onClick={() => selectedUser && handleStatusChange(selectedUser.id, "Active")}
            sx={{ py: 1.5, px: 2 }}
          >
            <CheckCircle sx={{ mr: 2, color: "success.main" }} />
            Activate
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={() => {
          // Handle delete
          handleMenuClose()
        }} sx={{ py: 1.5, px: 2, color: 'error.main' }}>
          <Delete sx={{ mr: 2 }} />
          Delete User
        </MenuItem>
      </Menu>

      {/* Add User Dialog */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="sm" 
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          }
        }}
      >
        <DialogTitle sx={{ p: 3, pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#2d3748' }}>
            Add New User
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange("lastName")}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={formData.role}
                    onChange={handleSelectChange("role")}
                    label="Role"
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Support">Support</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  value={formData.country}
                  onChange={handleInputChange("country")}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={formData.city}
                  onChange={handleInputChange("city")}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes (Optional)"
                  multiline
                  rows={2}
                  value={formData.notes}
                  onChange={handleInputChange("notes")}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button 
              onClick={() => setOpen(false)}
              sx={{ 
                textTransform: 'none',
                borderRadius: 2,
                px: 3
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              sx={{ 
                textTransform: 'none',
                borderRadius: 2,
                px: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              Add User
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* View User Dialog */}
      <Dialog 
        open={viewOpen} 
        onClose={() => setViewOpen(false)} 
        maxWidth="md" 
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          }
        }}
      >
        <DialogTitle sx={{ p: 3, pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#2d3748' }}>
              User Details - {selectedUser?.firstName} {selectedUser?.lastName}
            </Typography>
            {selectedUser && (
              <Chip
                label={selectedUser.status}
                size="small"
                sx={{ 
                  backgroundColor: getStatusColor(selectedUser.status),
                  color: 'white',
                  borderRadius: 2,
                  fontWeight: 500,
                  '& .MuiChip-label': { color: 'white', fontWeight: 600 }
                }}
              />
            )}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedUser && (
            <Box>
              <Tabs 
                value={tabValue} 
                onChange={(e, newValue) => setTabValue(newValue)} 
                sx={{ 
                  mb: 3,
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 500
                  }
                }}
              >
                <Tab label="Personal Info" />
                <Tab label="Account Details" />
                <Tab label="Security" />
              </Tabs>

              {tabValue === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      backgroundColor: '#f7fafc',
                      border: '1px solid #e2e8f0'
                    }}>
                      <Typography variant="h6" gutterBottom sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1,
                        fontWeight: 600,
                        color: '#2d3748',
                        mb: 2
                      }}>
                        <Person />
                        Personal Information
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                          Full Name
                        </Typography>
                        <Typography sx={{ color: '#2d3748' }}>
                          {selectedUser.firstName} {selectedUser.lastName}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                        <Email sx={{ color: '#718096', fontSize: '1rem' }} />
                        <Typography sx={{ color: '#2d3748' }}>
                          {selectedUser.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Phone sx={{ color: '#718096', fontSize: '1rem' }} />
                        <Typography sx={{ color: '#2d3748' }}>
                          {selectedUser.phone}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      backgroundColor: '#f7fafc',
                      border: '1px solid #e2e8f0'
                    }}>
                      <Typography variant="h6" gutterBottom sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1,
                        fontWeight: 600,
                        color: '#2d3748',
                        mb: 2
                      }}>
                        <LocationOn />
                        Location & Role
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                          Role
                        </Typography>
                        <Chip
                          label={selectedUser.role}
                          color={getRoleColor(selectedUser.role)}
                          size="small"
                          sx={{ 
                            borderRadius: 2,
                            fontWeight: 500,
                            mt: 0.5
                          }}
                        />
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                          Location
                        </Typography>
                        <Typography sx={{ color: '#2d3748' }}>
                          {selectedUser.city}, {selectedUser.country}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                          Join Date
                        </Typography>
                        <Typography sx={{ color: '#2d3748' }}>
                          {selectedUser.joinDate}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              )}

              {tabValue === 1 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      backgroundColor: '#f7fafc',
                      border: '1px solid #e2e8f0'
                    }}>
                      <Typography variant="h6" gutterBottom sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1,
                        fontWeight: 600,
                        color: '#2d3748',
                        mb: 2
                      }}>
                        <CalendarToday />
                        Account Summary
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                              Account Balance
                            </Typography>
                            <Typography variant="h5" sx={{ color: '#4299e1', fontWeight: 700 }}>
                              {selectedUser.accountBalance}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                              Total Deposits
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#48bb78', fontWeight: 600 }}>
                              {selectedUser.totalDeposits}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                              Total Withdrawals
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#f56565', fontWeight: 600 }}>
                              {selectedUser.totalWithdrawals}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                          Last Login
                        </Typography>
                        <Typography sx={{ color: '#2d3748' }}>
                          {selectedUser.lastLogin}
                        </Typography>
                      </Box>
                      {selectedUser.notes && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                            Notes
                          </Typography>
                          <Typography sx={{ color: '#2d3748' }}>
                            {selectedUser.notes}
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              )}

              {tabValue === 2 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      backgroundColor: '#f7fafc',
                      border: '1px solid #e2e8f0'
                    }}>
                      <Typography variant="h6" gutterBottom sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1,
                        fontWeight: 600,
                        color: '#2d3748',
                        mb: 2
                      }}>
                        <Security />
                        Security Settings
                      </Typography>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                          Account Status
                        </Typography>
                        <Chip
                          label={selectedUser.status}
                          size="small"
                          sx={{ 
                            backgroundColor: getStatusColor(selectedUser.status),
                            color: 'white',
                            borderRadius: 2,
                            fontWeight: 500,
                            mt: 1,
                            '& .MuiChip-label': { color: 'white', fontWeight: 600 }
                          }}
                        />
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={selectedUser.isVerified}
                              onChange={() => handleVerificationToggle(selectedUser.id)}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: '#48bb78',
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: '#48bb78',
                                },
                              }}
                            />
                          }
                          label="Account Verified"
                          sx={{ color: '#2d3748' }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                          Two-Factor Authentication
                        </Typography>
                        <Typography sx={{ color: '#2d3748', mt: 0.5 }}>
                          {selectedUser.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={() => setViewOpen(false)}
            sx={{ 
              textTransform: 'none',
              borderRadius: 2,
              px: 3
            }}
          >
            Close
          </Button>
          {selectedUser && (
            selectedUser.status === "Active" ? (
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  handleStatusChange(selectedUser.id, "Inactive")
                  setViewOpen(false)
                }}
                sx={{ textTransform: 'none', borderRadius: 2, px: 3 }}
              >
                Deactivate
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  handleStatusChange(selectedUser.id, "Active")
                  setViewOpen(false)
                }}
                sx={{ textTransform: 'none', borderRadius: 2, px: 3 }}
              >
                Activate
              </Button>
            )
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ mb: 2, mr: 2 }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ 
            borderRadius: 2,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
