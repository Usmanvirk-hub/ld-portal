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
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  InputAdornment,
  TablePagination,
  Avatar,
  IconButton,
  Menu,
  Divider,
  Tabs,
  Tab,
} from "@mui/material"
import {
  AccountBalance,
  Add,
  Search,
  Edit,
  Delete,
  Visibility,
  MoreVert,
  Person,
  AttachMoney,
  CalendarToday,
  Star,
  StarBorder,
  CreditCard,
  CheckCircle,
  Warning,
  Cancel,
  TrendingUp,
} from "@mui/icons-material"
import type { SelectChangeEvent } from "@mui/material"

interface BankAccount {
  id: string
  userId: number
  userName: string
  userEmail: string
  bankName: string
  accountNumber: string
  accountType: "Checking" | "Savings" | "Business"
  balance: string
  currency: string
  status: "Active" | "Inactive" | "Suspended" | "Pending"
  isDefault: boolean
  createdDate: string
  lastTransaction: string
  routingNumber: string
  iban?: string
}

const initialAccounts: BankAccount[] = [
  {
    id: "ACC001",
    userId: 1,
    userName: "John Doe",
    userEmail: "john@example.com",
    bankName: "Chase Bank",
    accountNumber: "****1234",
    accountType: "Checking",
    balance: "$12,450.75",
    currency: "USD",
    status: "Active",
    isDefault: true,
    createdDate: "2024-01-10",
    lastTransaction: "2024-01-15",
    routingNumber: "021000021",
    iban: "US64SVBKUS6S3300958879",
  },
  {
    id: "ACC002",
    userId: 2,
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    bankName: "Bank of America",
    accountNumber: "****5678",
    accountType: "Savings",
    balance: "$8,750.20",
    currency: "USD",
    status: "Active",
    isDefault: false,
    createdDate: "2024-01-08",
    lastTransaction: "2024-01-14",
    routingNumber: "026009593",
  },
  {
    id: "ACC003",
    userId: 3,
    userName: "Mike Johnson",
    userEmail: "mike@example.com",
    bankName: "Wells Fargo",
    accountNumber: "****9012",
    accountType: "Business",
    balance: "$25,300.50",
    currency: "USD",
    status: "Suspended",
    isDefault: false,
    createdDate: "2024-01-05",
    lastTransaction: "2024-01-12",
    routingNumber: "121000248",
  },
  {
    id: "ACC004",
    userId: 4,
    userName: "Sarah Wilson",
    userEmail: "sarah@example.com",
    bankName: "TD Bank",
    accountNumber: "****3456",
    accountType: "Checking",
    balance: "$5,890.30",
    currency: "USD",
    status: "Pending",
    isDefault: false,
    createdDate: "2024-01-12",
    lastTransaction: "2024-01-13",
    routingNumber: "031101279",
  },
  {
    id: "ACC005",
    userId: 5,
    userName: "Robert Brown",
    userEmail: "robert@example.com",
    bankName: "HSBC",
    accountNumber: "****7890",
    accountType: "Savings",
    balance: "$15,670.85",
    currency: "USD",
    status: "Active",
    isDefault: true,
    createdDate: "2024-01-03",
    lastTransaction: "2024-01-15",
    routingNumber: "022000020",
    iban: "GB29NWBK60161331926819",
  },
]

export default function BankAccountsPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>(initialAccounts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [tabValue, setTabValue] = useState(0)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    accountType: "",
    routingNumber: "",
    iban: "",
    currency: "USD",
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

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, account: BankAccount) => {
    setAnchorEl(event.currentTarget)
    setSelectedAccount(account)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedAccount(null)
  }

  const handleStatusToggle = (accountId: string) => {
    setAccounts(accounts.map(account => 
      account.id === accountId 
        ? { ...account, status: account.status === "Active" ? "Inactive" : "Active" } 
        : account
    ))
    setSnackbar({
      open: true,
      message: "Account status updated successfully",
      severity: "success"
    })
  }

  const handleDefaultToggle = (accountId: string, userId: number) => {
    setAccounts(accounts.map(account => 
      account.userId === userId
        ? { ...account, isDefault: account.id === accountId }
        : account
    ))
    setSnackbar({
      open: true,
      message: "Default account updated successfully",
      severity: "success"
    })
  }

  const handleEditClick = () => {
    if (selectedAccount) {
      setFormData({
        bankName: selectedAccount.bankName,
        accountNumber: selectedAccount.accountNumber,
        accountType: selectedAccount.accountType,
        routingNumber: selectedAccount.routingNumber,
        iban: selectedAccount.iban || "",
        currency: selectedAccount.currency,
      })
      setEditOpen(true)
      handleMenuClose()
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAccount: BankAccount = {
      id: `ACC${String(accounts.length + 1).padStart(3, '0')}`,
      userId: 1, // Current user ID
      userName: "Current User",
      userEmail: "user@example.com",
      ...formData,
      accountType: formData.accountType as "Checking" | "Savings" | "Business",
      balance: "$0.00",
      status: "Pending",
      isDefault: false,
      createdDate: new Date().toISOString().split('T')[0],
      lastTransaction: "Never",
    }
    setAccounts([newAccount, ...accounts])
    setSnackbar({
      open: true,
      message: "Bank account added successfully!",
      severity: "success"
    })
    setOpen(false)
    setFormData({
      bankName: "",
      accountNumber: "",
      accountType: "",
      routingNumber: "",
      iban: "",
      currency: "USD",
    })
  }

  const handleDelete = (accountId: string) => {
    setAccounts(accounts.filter(account => account.id !== accountId))
    setSnackbar({
      open: true,
      message: "Account deleted successfully",
      severity: "success"
    })
    handleMenuClose()
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = 
      account.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "All" || account.status === statusFilter
    const matchesType = typeFilter === "All" || account.accountType === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const paginatedAccounts = filteredAccounts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const getStatusColor = (status: BankAccount["status"]) => {
    switch (status) {
      case "Active":
        return 'var(--primary)'
      case "Inactive":
        return 'var(--muted-foreground)'
      case "Pending":
        return '#efde6b'
      case "Suspended":
        return 'var(--destructive)'
      default:
        return 'var(--muted-foreground)'
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
          Bank Account Management
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
          Add Account
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
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
                <CreditCard sx={{ color: 'var(--primary)', fontSize: '2rem' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--primary)', mb: 1 }}>
                {accounts.length}
              </Typography>
              <Typography sx={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', fontWeight: 500 }}>
                Total Accounts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
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
                {accounts.filter(a => a.status === "Active").length}
              </Typography>
              <Typography sx={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', fontWeight: 500 }}>
                Active Accounts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
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
                <Star sx={{ color: 'var(--accent-foreground)', fontSize: '2rem' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--accent-foreground)', mb: 1 }}>
                {accounts.filter(a => a.isDefault).length}
              </Typography>
              <Typography sx={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', fontWeight: 500 }}>
                Default Accounts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
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
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--destructive)', mb: 1 }}>
                {accounts.filter(a => a.status === "Suspended").length}
              </Typography>
              <Typography sx={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', fontWeight: 500 }}>
                Suspended
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
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search by user name, email, or account number..."
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
          <Grid item xs={12} md={4}>
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
                <MenuItem value="Suspended">Suspended</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Bank Accounts Table */}
      <Paper sx={{ 
        borderRadius: 3,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--card)',
        overflow: 'hidden'
      }}>
        <Box sx={{ p: 3, borderBottom: '1px solid var(--border)' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
            Bank Accounts ({filteredAccounts.length})
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'var(--muted)' }}>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Bank</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Account</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Balance</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAccounts.map((account) => (
                <TableRow 
                  key={account.id} 
                  hover 
                  sx={{ 
                    cursor: "pointer",
                    '&:hover': {
                      backgroundColor: 'var(--muted)',
                    },
                    borderBottom: '1px solid var(--border)'
                  }}
                  onClick={() => {
                    setSelectedAccount(account)
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
                        <Person />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 500, color: 'var(--foreground)' }}>
                          {account.userName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--muted-foreground)', fontSize: '0.75rem' }}>
                          {account.userEmail}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'var(--foreground)' }}>
                      {account.bankName}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
                        {account.accountNumber}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'var(--muted-foreground)', fontSize: '0.75rem' }}>
                        {account.accountType}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
                      {account.balance}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Chip
                      label={account.status}
                      size="small"
                      sx={{ 
                        backgroundColor: getStatusColor(account.status),
                        color: 'white',
                        borderRadius: 2,
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        '& .MuiChip-label': { color: 'white', fontWeight: 600 }
                      }}
                    />
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()} sx={{ py: 2 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedAccount(account)
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
                        onClick={(e) => handleMenuClick(e, account)}
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
          count={filteredAccounts.length}
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
            border: '1px solid var(--border)',
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
        <MenuItem onClick={handleEditClick} sx={{ py: 1.5, px: 2 }}>
  <Edit sx={{ mr: 2 }} />
  Edit Account
</MenuItem>
        <Divider />
        <MenuItem 
          onClick={() => selectedAccount && handleStatusToggle(selectedAccount.id)} 
          sx={{ py: 1.5, px: 2 }}
        >
          <Switch 
            checked={selectedAccount?.status === "Active"}
            size="small"
            sx={{ mr: 2 }}
          />
          {selectedAccount?.status === "Active" ? "Deactivate" : "Activate"}
        </MenuItem>
        <Divider />
        <MenuItem 
          onClick={() => selectedAccount && handleDelete(selectedAccount.id)} 
          sx={{ py: 1.5, px: 2, color: 'var(--destructive)' }}
        >
          <Delete sx={{ mr: 2 }} />
          Delete Account
        </MenuItem>
      </Menu>

      {/* Add Account Dialog */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
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
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
            Add New Bank Account
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  value={formData.bankName}
                  onChange={handleInputChange("bankName")}
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
                  label="Account Number"
                  value={formData.accountNumber}
                  onChange={handleInputChange("accountNumber")}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Account Type</InputLabel>
                  <Select
                    value={formData.accountType}
                    onChange={handleSelectChange("accountType")}
                    label="Account Type"
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    <MenuItem value="Checking">Checking</MenuItem>
                    <MenuItem value="Savings">Savings</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Routing Number"
                  value={formData.routingNumber}
                  onChange={handleInputChange("routingNumber")}
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
                  label="IBAN (Optional)"
                  value={formData.iban}
                  onChange={handleInputChange("iban")}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={formData.currency}
                    onChange={handleSelectChange("currency")}
                    label="Currency"
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                    <MenuItem value="CAD">CAD</MenuItem>
                  </Select>
                </FormControl>
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
              Add Account
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* View Account Dialog */}
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
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
              Account Details - {selectedAccount?.id}
            </Typography>
            {selectedAccount && (
              <Chip
                label={selectedAccount.status}
                size="small"
                sx={{ 
                  backgroundColor: getStatusColor(selectedAccount.status),
                  color: 'white',
                  borderRadius: 2,
                  fontWeight: 500,
                  '& .MuiChip-label': { color: 'white', fontWeight: 600 }
                }}
              />
            )}
            {selectedAccount?.isDefault && (
              <Chip
                label="Default"
                color="warning"
                size="small"
                icon={<Star />}
                sx={{ 
                  borderRadius: 2,
                  fontWeight: 500
                }}
              />
            )}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedAccount && (
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
                <Tab label="Account Info" />
                <Tab label="User Details" />
                <Tab label="Transaction History" />
              </Tabs>

              {tabValue === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      backgroundColor: 'var(--muted)',
                      border: '1px solid var(--border)'
                    }}>
                      <Typography variant="h6" gutterBottom sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1,
                        fontWeight: 600,
                        color: 'var(--foreground)',
                        mb: 2
                      }}>
                        <AccountBalance />
                        Bank Information
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--muted-foreground)' }}>
                          Bank Name
                        </Typography>
                        <Typography sx={{ color: 'var(--foreground)' }}>
                          {selectedAccount.bankName}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--muted-foreground)' }}>
                          Account Number
                        </Typography>
                        <Typography sx={{ color: 'var(--foreground)' }}>
                          {selectedAccount.accountNumber}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--muted-foreground)' }}>
                          Account Type
                        </Typography>
                        <Typography sx={{ color: 'var(--foreground)' }}>
                          {selectedAccount.accountType}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--muted-foreground)' }}>
                          Routing Number
                        </Typography>
                        <Typography sx={{ color: 'var(--foreground)' }}>
                          {selectedAccount.routingNumber}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      backgroundColor: 'var(--muted)',
                      border: '1px solid var(--border)'
                    }}>
                      <Typography variant="h6" gutterBottom sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1,
                        fontWeight: 600,
                        color: 'var(--foreground)',
                        mb: 2
                      }}>
                        <AttachMoney />
                        Financial Details
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--muted-foreground)' }}>
                          Current Balance
                        </Typography>
                        <Typography variant="h5" sx={{ color: 'var(--primary)', fontWeight: 700 }}>
                          {selectedAccount.balance}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--muted-foreground)' }}>
                          Currency
                        </Typography>
                        <Typography sx={{ color: 'var(--foreground)' }}>
                          {selectedAccount.currency}
                        </Typography>
                      </Box>
                      {selectedAccount.iban && (
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--muted-foreground)' }}>
                            IBAN
                          </Typography>
                          <Typography sx={{ color: 'var(--foreground)' }}>
                            {selectedAccount.iban}
                          </Typography>
                        </Box>
                      )}
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
                      backgroundColor: 'var(--muted)',
                      border: '1px solid var(--border)'
                    }}>
                      <Typography variant="h6" gutterBottom sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1,
                        fontWeight: 600,
                        color: 'var(--foreground)',
                        mb: 2
                      }}>
                        <Person />
                        Account Holder Information
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--muted-foreground)' }}>
                              Full Name
                            </Typography>
                            <Typography sx={{ color: 'var(--foreground)' }}>
                              {selectedAccount.userName}
                            </Typography>
                          </Box>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--muted-foreground)' }}>
                              Email Address
                            </Typography>
                            <Typography sx={{ color: 'var(--foreground)' }}>
                              {selectedAccount.userEmail}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--muted-foreground)' }}>
                              User ID
                            </Typography>
                            <Typography sx={{ color: 'var(--foreground)' }}>
                              {selectedAccount.userId}
                            </Typography>
                          </Box>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--muted-foreground)' }}>
                              Account Created
                            </Typography>
                            <Typography sx={{ color: 'var(--foreground)' }}>
                              {selectedAccount.createdDate}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
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
                      backgroundColor: 'var(--muted)',
                      border: '1px solid var(--border)'
                    }}>
                      <Typography variant="h6" gutterBottom sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1,
                        fontWeight: 600,
                        color: 'var(--foreground)',
                        mb: 2
                      }}>
                        <CalendarToday />
                        Transaction History
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--muted-foreground)' }}>
                          Last Transaction
                        </Typography>
                        <Typography sx={{ color: 'var(--foreground)' }}>
                          {selectedAccount.lastTransaction}
                        </Typography>
                      </Box>
                      <Alert severity="info" sx={{ borderRadius: 2 }}>
                        Transaction history feature will be available soon. This will show detailed transaction records for this account.
                      </Alert>
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
          {selectedAccount?.status === "Pending" && (
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                handleStatusToggle(selectedAccount.id)
                setViewOpen(false)
              }}
              sx={{ 
                textTransform: 'none',
                borderRadius: 2,
                px: 3,
                boxShadow: '0 4px 12px rgba(72, 187, 120, 0.3)'
              }}
            >
              Approve Account
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Dialog
  open={editOpen}
  onClose={() => setEditOpen(false)}
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
    <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
      Edit Bank Account - {selectedAccount?.id}
    </Typography>
  </DialogTitle>
  <form onSubmit={(e) => {
    e.preventDefault()
    if (!selectedAccount) return
    const updatedAccounts = accounts.map(acc =>
      acc.id === selectedAccount.id
        ? {
            ...acc,
            bankName: formData.bankName,
            accountNumber: formData.accountNumber,
            accountType: formData.accountType as "Checking" | "Savings" | "Business",
            routingNumber: formData.routingNumber,
            iban: formData.iban,
            currency: formData.currency,
          }
        : acc
    )
    setAccounts(updatedAccounts)
    setSnackbar({
      open: true,
      message: "Bank account updated successfully!",
      severity: "success"
    })
    setEditOpen(false)
  }}>
    <DialogContent sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Bank Name"
            value={formData.bankName}
            onChange={handleInputChange("bankName")}
            required
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Account Number"
            value={formData.accountNumber}
            onChange={handleInputChange("accountNumber")}
            required
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Account Type</InputLabel>
            <Select
              value={formData.accountType}
              onChange={handleSelectChange("accountType")}
              label="Account Type"
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="Checking">Checking</MenuItem>
              <MenuItem value="Savings">Savings</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Routing Number"
            value={formData.routingNumber}
            onChange={handleInputChange("routingNumber")}
            required
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="IBAN (Optional)"
            value={formData.iban}
            onChange={handleInputChange("iban")}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Currency</InputLabel>
            <Select
              value={formData.currency}
              onChange={handleSelectChange("currency")}
              label="Currency"
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
              <MenuItem value="CAD">CAD</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions sx={{ p: 3, pt: 1 }}>
      <Button onClick={() => setEditOpen(false)} sx={{ textTransform: 'none', borderRadius: 2, px: 3 }}>
        Cancel
      </Button>
      <Button type="submit" variant="contained" sx={{ textTransform: 'none', borderRadius: 2, px: 3 }}>
        Save Changes
      </Button>
    </DialogActions>
  </form>
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
