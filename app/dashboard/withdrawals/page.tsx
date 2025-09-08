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
  TablePagination,
} from "@mui/material"
import {
  AccountBalance,
  CreditCard,
  MoreVert,
  Visibility,
  Edit,
  CheckCircle,
  Cancel,
  Person,
  Email,
  Phone,
  CalendarToday,
  AttachMoney,
  Receipt,
  Search,
  Add,
  TrendingUp,
  TrendingDown,
  Warning,
  CheckCircleOutline,
  MoneyOff,
} from "@mui/icons-material"
import type { SelectChangeEvent } from "@mui/material"

interface Withdrawal {
  id: string
  userId: number
  userName: string
  userEmail: string
  userPhone: string
  amount: string
  method: string
  accountDetails: string
  status: "Pending" | "Approved" | "Rejected" | "Processing" | "Completed"
  fee: string
  date: string
  requestedDate: string
  processedDate?: string
  notes?: string
  adminNotes?: string
  transactionId?: string
}

const initialWithdrawals: Withdrawal[] = [
  {
    id: "WTH001",
    userId: 1,
    userName: "John Doe",
    userEmail: "john@example.com",
    userPhone: "+1 (555) 123-4567",
    amount: "$200.00",
    method: "Bank Transfer",
    accountDetails: "Account: ****1234, Bank: Chase Bank",
    status: "Completed",
    date: "2024-01-14",
    requestedDate: "2024-01-14",
    processedDate: "2024-01-15",
    fee: "$2.00",
    transactionId: "TXN001234",
    notes: "Regular withdrawal request",
    adminNotes: "Processed successfully",
  },
  {
    id: "WTH002",
    userId: 2,
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    userPhone: "+1 (555) 234-5678",
    amount: "$500.00",
    method: "PayPal",
    accountDetails: "PayPal: jane@example.com",
    status: "Pending",
    date: "2024-01-13",
    requestedDate: "2024-01-13",
    fee: "$5.00",
    notes: "Urgent withdrawal needed",
  },
  {
    id: "WTH003",
    userId: 3,
    userName: "Mike Johnson",
    userEmail: "mike@example.com",
    userPhone: "+1 (555) 345-6789",
    amount: "$300.00",
    method: "Bank Transfer",
    accountDetails: "Account: ****5678, Bank: Bank of America",
    status: "Approved",
    date: "2024-01-12",
    requestedDate: "2024-01-12",
    processedDate: "2024-01-13",
    fee: "$3.00",
    adminNotes: "Approved by admin",
  },
  {
    id: "WTH004",
    userId: 4,
    userName: "Sarah Wilson",
    userEmail: "sarah@example.com",
    userPhone: "+1 (555) 456-7890",
    amount: "$150.00",
    method: "Debit Card",
    accountDetails: "Card: ****9012",
    status: "Rejected",
    date: "2024-01-11",
    requestedDate: "2024-01-11",
    processedDate: "2024-01-12",
    fee: "$1.50",
    adminNotes: "Insufficient verification documents",
  },
  {
    id: "WTH005",
    userId: 5,
    userName: "Robert Brown",
    userEmail: "robert@example.com",
    userPhone: "+1 (555) 567-8901",
    amount: "$750.00",
    method: "Bank Transfer",
    accountDetails: "Account: ****3456, Bank: Wells Fargo",
    status: "Processing",
    date: "2024-01-10",
    requestedDate: "2024-01-10",
    processedDate: "2024-01-11",
    fee: "$7.50",
    adminNotes: "Currently processing",
  },
  {
    id: "WTH006",
    userId: 6,
    userName: "Emily Davis",
    userEmail: "emily@example.com",
    userPhone: "+1 (555) 678-9012",
    amount: "$400.00",
    method: "PayPal",
    accountDetails: "PayPal: emily@example.com",
    status: "Completed",
    date: "2024-01-09",
    requestedDate: "2024-01-09",
    processedDate: "2024-01-10",
    fee: "$4.00",
    transactionId: "TXN005678",
    notes: "Emergency withdrawal",
    adminNotes: "Fast-tracked and completed",
  },
  {
    id: "WTH007",
    userId: 7,
    userName: "David Martinez",
    userEmail: "david@example.com",
    userPhone: "+1 (555) 789-0123",
    amount: "$250.00",
    method: "Debit Card",
    accountDetails: "Card: ****7890",
    status: "Pending",
    date: "2024-01-08",
    requestedDate: "2024-01-08",
    fee: "$2.50",
    notes: "Standard withdrawal",
  },
  {
    id: "WTH008",
    userId: 8,
    userName: "Lisa Anderson",
    userEmail: "lisa@example.com",
    userPhone: "+1 (555) 890-1234",
    amount: "$1,000.00",
    method: "Bank Transfer",
    accountDetails: "Account: ****2468, Bank: TD Bank",
    status: "Approved",
    date: "2024-01-07",
    requestedDate: "2024-01-07",
    processedDate: "2024-01-08",
    fee: "$10.00",
    adminNotes: "Large withdrawal approved",
  },
  {
    id: "WTH009",
    userId: 9,
    userName: "James Taylor",
    userEmail: "james@example.com",
    userPhone: "+1 (555) 901-2345",
    amount: "$350.00",
    method: "PayPal",
    accountDetails: "PayPal: james@example.com",
    status: "Rejected",
    date: "2024-01-06",
    requestedDate: "2024-01-06",
    processedDate: "2024-01-07",
    fee: "$3.50",
    adminNotes: "Account verification required",
  },
  {
    id: "WTH010",
    userId: 10,
    userName: "Maria Garcia",
    userEmail: "maria@example.com",
    userPhone: "+1 (555) 012-3456",
    amount: "$600.00",
    method: "Bank Transfer",
    accountDetails: "Account: ****1357, Bank: PNC Bank",
    status: "Completed",
    date: "2024-01-05",
    requestedDate: "2024-01-05",
    processedDate: "2024-01-06",
    fee: "$6.00",
    transactionId: "TXN009012",
    notes: "Monthly withdrawal",
    adminNotes: "Processed without issues",
  }
]

export default function WithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(initialWithdrawals)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [open, setOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null)
  const [viewWithdrawalOpen, setViewWithdrawalOpen] = useState(false)
  const [accountModalOpen, setAccountModalOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<any>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [tabValue, setTabValue] = useState(0)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [formData, setFormData] = useState({
    amount: "",
    method: "",
    accountDetails: "",
    notes: "",
  })

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFormData(prev => ({
      ...prev,
      method: event.target.value
    }))
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, withdrawal: Withdrawal) => {
    setAnchorEl(event.currentTarget)
    setSelectedWithdrawal(withdrawal)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedWithdrawal(null)
  }

  const handleStatusChange = (withdrawalId: string, newStatus: Withdrawal["status"], adminNotes?: string) => {
    setWithdrawals(withdrawals.map(withdrawal => 
      withdrawal.id === withdrawalId 
        ? { 
            ...withdrawal, 
            status: newStatus,
            processedDate: new Date().toISOString().split('T')[0],
            adminNotes: adminNotes || withdrawal.adminNotes
          } 
        : withdrawal
    ))
    setSnackbar({
      open: true,
      message: `Withdrawal ${newStatus.toLowerCase()} successfully`,
      severity: "success"
    })
    handleMenuClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newWithdrawal: Withdrawal = {
      id: `WTH${String(withdrawals.length + 1).padStart(3, '0')}`,
      userId: 1, // Current user ID
      userName: "Current User",
      userEmail: "user@example.com",
      userPhone: "+1 (555) 000-0000",
      ...formData,
      status: "Pending",
      date: new Date().toISOString().split('T')[0],
      requestedDate: new Date().toISOString().split('T')[0],
      fee: formData.method === "bank" ? "$2.00" : formData.method === "paypal" ? "$5.00" : "$1.50",
    }
    setWithdrawals([newWithdrawal, ...withdrawals])
    setSnackbar({
      open: true,
      message: "Withdrawal request submitted successfully!",
      severity: "success"
    })
    setOpen(false)
    setFormData({ amount: "", method: "", accountDetails: "", notes: "" })
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const filteredWithdrawals = withdrawals.filter(withdrawal => {
    const matchesSearch = 
      withdrawal.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "All" || withdrawal.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const paginatedWithdrawals = filteredWithdrawals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#efde6b'; // Orange/amber for pending
      case 'approved':
        return 'var(--primary)'; // Primary color for approved
      case 'completed':
        return '#a4ee97'; // Primary color for completed (more visible)
      case 'rejected':
        return 'var(--destructive)'; // Destructive color for rejected
      case 'processing':
        return 'var(--ring)'; // Ring color for processing
      default:
        return 'var(--muted-foreground)'; // Muted color for default
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
          Withdrawal Management
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
          New Withdrawal
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
                <MoneyOff sx={{ color: 'var(--primary)', fontSize: '2rem' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--primary)', mb: 1 }}>
                $3,450.00
              </Typography>
              <Typography sx={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', fontWeight: 500 }}>
                Total Withdrawals
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
                <Warning sx={{ color: 'var(--accent-foreground)', fontSize: '2rem' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--accent-foreground)', mb: 1 }}>
                {withdrawals.filter(w => w.status === "Pending").length}
              </Typography>
              <Typography sx={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', fontWeight: 500 }}>
                Pending
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
                <CheckCircle sx={{ color: 'var(--primary)', fontSize: '2rem' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--primary)', mb: 1 }}>
                {withdrawals.filter(w => w.status === "Approved").length}
              </Typography>
              <Typography sx={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', fontWeight: 500 }}>
                Approved
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
                <CheckCircleOutline sx={{ color: 'var(--accent-foreground)', fontSize: '2rem' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--accent-foreground)', mb: 1 }}>
                {withdrawals.filter(w => w.status === "Completed").length}
              </Typography>
              <Typography sx={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', fontWeight: 500 }}>
                Completed
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
                <Cancel sx={{ color: 'var(--destructive)', fontSize: '2rem' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--destructive)', mb: 1 }}>
                {withdrawals.filter(w => w.status === "Rejected").length}
              </Typography>
              <Typography sx={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', fontWeight: 500 }}>
                Rejected
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
              placeholder="Search by user name, email, or withdrawal ID..."
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
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Withdrawals Table */}
      <Paper sx={{ 
        borderRadius: 3,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--card)',
        overflow: 'hidden'
      }}>
        <Box sx={{ p: 3, borderBottom: '1px solid var(--border)' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
            Withdrawal Requests ({filteredWithdrawals.length})
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'var(--muted)' }}>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Withdrawal ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Method</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedWithdrawals.map((withdrawal) => (
                <TableRow 
                  key={withdrawal.id} 
                  hover 
                  sx={{ 
                    cursor: "pointer",
                    '&:hover': {
                      backgroundColor: 'var(--muted)',
                    },
                    borderBottom: '1px solid var(--border)'
                  }}
                  onClick={() => {
                    setSelectedWithdrawal(withdrawal)
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
                          {withdrawal.userName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--muted-foreground)', fontSize: '0.75rem' }}>
                          {withdrawal.userEmail}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'var(--muted-foreground)' }}>
                      {withdrawal.id}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
                      {withdrawal.amount}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Typography variant="body2" sx={{ color: 'var(--muted-foreground)' }}>
                      {withdrawal.method}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Chip
                      label={withdrawal.status}
                      size="small"
                      sx={{ 
                        backgroundColor: getStatusColor(withdrawal.status),
                        color: "white",
                        borderRadius: 2,
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        '& .MuiChip-label': {
                          color: 'white',
                          fontWeight: 600
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Typography variant="body2" sx={{ color: 'var(--muted-foreground)' }}>
                      {withdrawal.date}
                    </Typography>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()} sx={{ py: 2 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedWithdrawal(withdrawal)
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
                        onClick={(e) => handleMenuClick(e, withdrawal)}
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
          count={filteredWithdrawals.length}
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
        {selectedWithdrawal?.status === "Pending" && (
          <>
            <MenuItem 
              onClick={() => handleStatusChange(selectedWithdrawal.id, "Approved", "Approved by admin")}
              sx={{ py: 1.5, px: 2 }}
            >
              <CheckCircle sx={{ mr: 2, color: "success.main" }} />
              Approve
            </MenuItem>
            <MenuItem 
              onClick={() => handleStatusChange(selectedWithdrawal.id, "Rejected", "Rejected due to policy violation")}
              sx={{ py: 1.5, px: 2 }}
            >
              <Cancel sx={{ mr: 2, color: "error.main" }} />
              Reject
            </MenuItem>
            <Divider />
          </>
        )}
        {selectedWithdrawal?.status === "Approved" && (
          <MenuItem 
            onClick={() => handleStatusChange(selectedWithdrawal.id, "Processing", "Processing withdrawal")}
            sx={{ py: 1.5, px: 2 }}
          >
            <Edit sx={{ mr: 2, color: "info.main" }} />
            Mark as Processing
          </MenuItem>
        )}
        {selectedWithdrawal?.status === "Processing" && (
          <MenuItem 
            onClick={() => handleStatusChange(selectedWithdrawal.id, "Completed", "Withdrawal completed successfully")}
            sx={{ py: 1.5, px: 2 }}
          >
            <CheckCircle sx={{ mr: 2, color: "success.main" }} />
            Mark as Completed
          </MenuItem>
        )}
        <MenuItem onClick={() => {
          setViewOpen(true)
          handleMenuClose()
        }} sx={{ py: 1.5, px: 2 }}>
          <Visibility sx={{ mr: 2 }} />
          View Details
        </MenuItem>
      </Menu>

      {/* Add Withdrawal Dialog */}
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
            New Withdrawal Request
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Alert 
                  severity="info" 
                  sx={{ 
                    mb: 2,
                    borderRadius: 2,
                    backgroundColor: '#ebf8ff',
                    border: '1px solid #bee3f8'
                  }}
                >
                  Available Balance: $12,450.00
                </Alert>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange("amount")}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  helperText="Minimum withdrawal: $10.00"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Withdrawal Method</InputLabel>
                  <Select
                    value={formData.method}
                    onChange={handleSelectChange}
                    label="Withdrawal Method"
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    <MenuItem value="bank">
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <AccountBalance />
                        Bank Transfer (Fee: $2.00)
                      </Box>
                    </MenuItem>
                    <MenuItem value="paypal">
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CreditCard />
                        PayPal (Fee: $5.00)
                      </Box>
                    </MenuItem>
                    <MenuItem value="card">
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CreditCard />
                        Debit Card (Fee: $1.50)
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Account Details"
                  multiline
                  rows={3}
                  value={formData.accountDetails}
                  onChange={handleInputChange("accountDetails")}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                  helperText="Enter your account number, IBAN, or PayPal email"
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
                  helperText="Any additional information"
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
              Submit Withdrawal
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* View Withdrawal Dialog */}
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
              Withdrawal Details - {selectedWithdrawal?.id}
            </Typography>
            {selectedWithdrawal && (
              <Chip
                label={selectedWithdrawal.status}
                color={getStatusColor(selectedWithdrawal.status)}
                size="small"
                sx={{ 
                  borderRadius: 2,
                  fontWeight: 500
                }}
              />
            )}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedWithdrawal && (
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
                <Tab label="User Info" />
                <Tab label="Withdrawal Details" />
                <Tab label="Processing Info" />
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
                        User Information
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                          Name
                        </Typography>
                        <Typography sx={{ color: '#2d3748' }}>
                          {selectedWithdrawal.userName}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                        <Email sx={{ color: '#718096', fontSize: '1rem' }} />
                        <Typography sx={{ color: '#2d3748' }}>
                          {selectedWithdrawal.userEmail}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Phone sx={{ color: '#718096', fontSize: '1rem' }} />
                        <Typography sx={{ color: '#2d3748' }}>
                          {selectedWithdrawal.userPhone}
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
                        <AttachMoney />
                        Financial Summary
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                          Withdrawal Amount
                        </Typography>
                        <Typography variant="h5" sx={{ color: '#4299e1', fontWeight: 700 }}>
                          {selectedWithdrawal.amount}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                          Processing Fee
                        </Typography>
                        <Typography sx={{ color: '#2d3748' }}>
                          {selectedWithdrawal.fee}
                        </Typography>
                      </Box>
                      <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                            Net Amount
                          </Typography>
                          <Typography variant="h6" sx={{ color: '#48bb78', fontWeight: 600 }}>
                            ${(parseFloat(selectedWithdrawal.amount.replace('$', '')) - parseFloat(selectedWithdrawal.fee.replace('$', ''))).toFixed(2)}
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
                        <Receipt />
                        Withdrawal Information
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                              Withdrawal Method
                            </Typography>
                            <Typography sx={{ color: '#2d3748' }}>
                              {selectedWithdrawal.method}
                            </Typography>
                          </Box>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                              Account Details
                            </Typography>
                            <Typography sx={{ color: '#2d3748' }}>
                              {selectedWithdrawal.accountDetails}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                              Request Date
                            </Typography>
                            <Typography sx={{ color: '#2d3748' }}>
                              {selectedWithdrawal.requestedDate}
                            </Typography>
                          </Box>
                          {selectedWithdrawal.transactionId && (
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                                Transaction ID
                              </Typography>
                              <Typography sx={{ color: '#2d3748' }}>
                                {selectedWithdrawal.transactionId}
                              </Typography>
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                      {selectedWithdrawal.notes && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                            User Notes
                          </Typography>
                          <Typography sx={{ color: '#2d3748' }}>
                            {selectedWithdrawal.notes}
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
                        <CalendarToday />
                        Processing Information
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                          Current Status
                        </Typography>
                        <Chip
                          label={selectedWithdrawal.status}
                          color={getStatusColor(selectedWithdrawal.status)}
                          size="small"
                          sx={{ 
                            borderRadius: 2,
                            fontWeight: 500,
                            mt: 1
                          }}
                        />
                      </Box>
                      {selectedWithdrawal.processedDate && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                            Processed Date
                          </Typography>
                          <Typography sx={{ color: '#2d3748' }}>
                            {selectedWithdrawal.processedDate}
                          </Typography>
                        </Box>
                      )}
                      {selectedWithdrawal.adminNotes && (
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#4a5568' }}>
                            Admin Notes
                          </Typography>
                          <Typography sx={{ color: '#2d3748' }}>
                            {selectedWithdrawal.adminNotes}
                          </Typography>
                        </Box>
                      )}
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
          {selectedWithdrawal?.status === "Pending" && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  handleStatusChange(selectedWithdrawal.id, "Approved", "Approved by admin")
                  setViewOpen(false)
                }}
                sx={{ 
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 3,
                  boxShadow: '0 4px 12px rgba(72, 187, 120, 0.3)'
                }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  handleStatusChange(selectedWithdrawal.id, "Rejected", "Rejected by admin")
                  setViewOpen(false)
                }}
                sx={{ 
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 3,
                  boxShadow: '0 4px 12px rgba(245, 101, 101, 0.3)'
                }}
              >
                Reject
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Account Modal */}
      <Dialog 
        open={accountModalOpen} 
        onClose={() => setAccountModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: "1px solid var(--border)", 
          backgroundColor: "var(--card)",
          color: "var(--foreground)",
          display: "flex",
          alignItems: "center",
          gap: 2
        }}>
          <AccountBalance sx={{ color: "var(--primary)" }} />
          Account Details
        </DialogTitle>
        
        <DialogContent sx={{ p: 3, backgroundColor: "var(--card)" }}>
          {selectedAccount && (
            <Grid container spacing={3}>
              {/* Account Information */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  backgroundColor: "var(--muted)",
                  border: "1px solid var(--border)"
                }}>
                  <Typography variant="h6" sx={{ 
                    mb: 2, 
                    color: "var(--foreground)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                  }}>
                    <Person sx={{ color: "var(--primary)" }} />
                    Account Information
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: "var(--muted-foreground)", mb: 0.5 }}>
                      Account Number
                    </Typography>
                    <Typography variant="body1" sx={{ color: "var(--foreground)", fontWeight: 500 }}>
                      {selectedAccount.accountNumber}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: "var(--muted-foreground)", mb: 0.5 }}>
                      Bank Name
                    </Typography>
                    <Typography variant="body1" sx={{ color: "var(--foreground)", fontWeight: 500 }}>
                      {selectedAccount.bankName}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: "var(--muted-foreground)", mb: 0.5 }}>
                      Account Type
                    </Typography>
                    <Typography variant="body1" sx={{ color: "var(--foreground)", fontWeight: 500 }}>
                      {selectedAccount.accountType}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" sx={{ color: "var(--muted-foreground)", mb: 0.5 }}>
                      Status
                    </Typography>
                    <Chip
                      label={selectedAccount.status}
                      size="small"
                      sx={{
                        backgroundColor: getStatusColor(selectedAccount.status),
                        color: "white",
                        fontWeight: 600,
                        '& .MuiChip-label': {
                          color: 'white',
                          fontWeight: 600
                        }
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>

              {/* Financial Summary */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  backgroundColor: "var(--muted)",
                  border: "1px solid var(--border)"
                }}>
                  <Typography variant="h6" sx={{ 
                    mb: 2, 
                    color: "var(--foreground)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                  }}>
                    <AttachMoney sx={{ color: "var(--primary)" }} />
                    Financial Summary
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: "var(--muted-foreground)", mb: 0.5 }}>
                      Current Balance
                    </Typography>
                    <Typography variant="h5" sx={{ color: "var(--foreground)", fontWeight: 700 }}>
                      ${selectedAccount.balance}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: "var(--muted-foreground)", mb: 0.5 }}>
                      Monthly Transactions
                    </Typography>
                    <Typography variant="body1" sx={{ color: "var(--foreground)", fontWeight: 500 }}>
                      {selectedAccount.monthlyTransactions}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" sx={{ color: "var(--muted-foreground)", mb: 0.5 }}>
                      Last Activity
                    </Typography>
                    <Typography variant="body1" sx={{ color: "var(--foreground)", fontWeight: 500 }}>
                      {selectedAccount.lastActivity}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              {/* Recent Transactions */}
              <Grid item xs={12}>
                <Paper sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  backgroundColor: "var(--muted)",
                  border: "1px solid var(--border)"
                }}>
                  <Typography variant="h6" sx={{ 
                    mb: 2, 
                    color: "var(--foreground)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                  }}>
                    <Receipt sx={{ color: "var(--primary)" }} />
                    Recent Transactions
                  </Typography>
                  
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)", fontWeight: "bold" }}>
                            Date
                          </TableCell>
                          <TableCell sx={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)", fontWeight: "bold" }}>
                            Description
                          </TableCell>
                          <TableCell sx={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)", fontWeight: "bold" }}>
                            Amount
                          </TableCell>
                          <TableCell sx={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)", fontWeight: "bold" }}>
                            Status
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedAccount.recentTransactions?.map((transaction: any, index: number) => (
                          <TableRow 
                            key={index}
                            hover
                            sx={{ 
                              "&:hover": { backgroundColor: "var(--muted)" }
                            }}
                          >
                            <TableCell sx={{ color: "var(--foreground)" }}>
                              {transaction.date}
                            </TableCell>
                            <TableCell sx={{ color: "var(--foreground)" }}>
                              {transaction.description}
                            </TableCell>
                            <TableCell sx={{ 
                              color: transaction.type === 'credit' ? "var(--accent)" : "var(--foreground)",
                              fontWeight: 500
                            }}>
                              {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={transaction.status}
                                size="small"
                                sx={{
                                  backgroundColor: getStatusColor(transaction.status),
                                  color: "white",
                                  fontSize: "0.75rem",
                                  fontWeight: 600,
                                  '& .MuiChip-label': {
                                    color: 'white',
                                    fontWeight: 600
                                  }
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        )) || (
                          <TableRow>
                            <TableCell colSpan={4} sx={{ textAlign: "center", color: "var(--muted-foreground)" }}>
                              No recent transactions
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 3, 
          borderTop: "1px solid var(--border)",
          backgroundColor: "var(--card)"
        }}>
          <Button
            onClick={() => setAccountModalOpen(false)}
            sx={{
              color: "var(--muted-foreground)",
              borderColor: "var(--border)",
              "&:hover": {
                borderColor: "var(--muted-foreground)",
                backgroundColor: "var(--muted)"
              }
            }}
            variant="outlined"
          >
            Close
          </Button>
          <Button
            variant="contained"
            startIcon={<Edit />}
            sx={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              "&:hover": {
                backgroundColor: "var(--primary)",
                opacity: 0.9,
              },
            }}
          >
            Edit Account
          </Button>
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
