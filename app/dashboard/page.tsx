"use client"

import { useState, useEffect } from "react"
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Switch,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  IconButton,
  Menu,
} from "@mui/material"
import { 
  TrendingUp, 
  TrendingDown, 
  AccountBalance, 
  People,
  Visibility,
  Person,
  MoreVert,
  Refresh,
  Download,
  FilterList,
} from "@mui/icons-material"

interface DepositRequest {
  id: string
  amount: string
  invoiceId: string
  processingTime: string
  receipt: string
  status: "Pending" | "Approved" | "Rejected"
  userName: string
  userEmail: string
  date: string
}

interface WithdrawalRequest {
  id: string
  invoiceId: string
  amount: string
  details: string
  bank: string
  status: "Waiting for proof" | "Created" | "Processing" | "Completed" | "Rejected"
  userName: string
  userEmail: string
  date: string
}

interface DashboardStats {
  processingLimit: number
  dailyLimit: string
  weeklyLimit: string
  monthlyLimit: string
  availableBalance: string
  walletBalance: string
  dealerCode: string
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [stats, setStats] = useState<DashboardStats>({
    processingLimit: 1,
    dailyLimit: "M / I",
    weeklyLimit: "1M / M", 
    monthlyLimit: "B / M",
    availableBalance: "2,450,000",
    walletBalance: "1,850,000",
    dealerCode: "WTN567"
  })

  const [depositRequests, setDepositRequests] = useState<DepositRequest[]>([
    { id: "1", amount: "100000.00", invoiceId: "37905", processingTime: "1.53", receipt: "Receipt_37905.pdf", status: "Pending", userName: "John Doe", userEmail: "john@example.com", date: "2024-01-20" },
    { id: "2", amount: "29800.00", invoiceId: "37906", processingTime: "9.42", receipt: "Receipt_37906.pdf", status: "Pending", userName: "Jane Smith", userEmail: "jane@example.com", date: "2024-01-20" },
    { id: "3", amount: "10300.00", invoiceId: "37906", processingTime: "7.27", receipt: "Receipt_37906_2.pdf", status: "Pending", userName: "Mike Johnson", userEmail: "mike@example.com", date: "2024-01-19" },
    { id: "4", amount: "20000.00", invoiceId: "37906", processingTime: "5.15", receipt: "Receipt_37906_3.pdf", status: "Approved", userName: "Sarah Wilson", userEmail: "sarah@example.com", date: "2024-01-19" },
    { id: "5", amount: "10500.00", invoiceId: "37907", processingTime: "4.56", receipt: "Receipt_37907.pdf", status: "Pending", userName: "Robert Brown", userEmail: "robert@example.com", date: "2024-01-18" },
    { id: "6", amount: "29800.00", invoiceId: "37933", processingTime: "1.15", receipt: "Receipt_37933.pdf", status: "Pending", userName: "Emily Davis", userEmail: "emily@example.com", date: "2024-01-18" },
    { id: "7", amount: "45000.00", invoiceId: "37943", processingTime: "8.17", receipt: "Receipt_37943.pdf", status: "Pending", userName: "David Miller", userEmail: "david@example.com", date: "2024-01-17" },
    { id: "8", amount: "48000.00", invoiceId: "38067", processingTime: "25", receipt: "Receipt_38067.pdf", status: "Rejected", userName: "Lisa Anderson", userEmail: "lisa@example.com", date: "2024-01-17" },
    { id: "9", amount: "652000.00", invoiceId: "38243", processingTime: "", receipt: "Receipt_38243.pdf", status: "Pending", userName: "James Taylor", userEmail: "james@example.com", date: "2024-01-16" },
    { id: "10", amount: "10500.00", invoiceId: "38281", processingTime: "3 24.40", receipt: "Receipt_38281.pdf", status: "Pending", userName: "Maria Garcia", userEmail: "maria@example.com", date: "2024-01-16" },
  ])

  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([
    { id: "1", invoiceId: "162", amount: "37", details: "14175.00", bank: "United Bank", status: "Waiting for proof", userName: "John Doe", userEmail: "john@example.com", date: "2024-01-20" },
    { id: "2", invoiceId: "162", amount: "19", details: "26418.00", bank: "Meezan Bank", status: "Created", userName: "Jane Smith", userEmail: "jane@example.com", date: "2024-01-20" },
    { id: "3", invoiceId: "162", amount: "63", details: "14435.00", bank: "Meezan Bank", status: "Created", userName: "Mike Johnson", userEmail: "mike@example.com", date: "2024-01-19" },
    { id: "4", invoiceId: "162", amount: "89", details: "12073.00", bank: "Habib Bank", status: "Created", userName: "Sarah Wilson", userEmail: "sarah@example.com", date: "2024-01-19" },
    { id: "5", invoiceId: "162", amount: "85", details: "202088.00", bank: "Habib Metro Bank", status: "Created", userName: "Robert Brown", userEmail: "robert@example.com", date: "2024-01-18" },
    { id: "6", invoiceId: "162", amount: "41", details: "19104.00", bank: "United Bank", status: "Created", userName: "Emily Davis", userEmail: "emily@example.com", date: "2024-01-18" },
    { id: "7", invoiceId: "162", amount: "29", details: "57739.00", bank: "Bankislami Pakistan", status: "Created", userName: "David Miller", userEmail: "david@example.com", date: "2024-01-17" },
    { id: "8", invoiceId: "162", amount: "79", details: "43304.00", bank: "Bank Alfalah", status: "Created", userName: "Lisa Anderson", userEmail: "lisa@example.com", date: "2024-01-17" },
    { id: "9", invoiceId: "162", amount: "79", details: "66399.00", bank: "Allied Bank", status: "Created", userName: "James Taylor", userEmail: "james@example.com", date: "2024-01-16" },
    { id: "10", invoiceId: "162", amount: "31", details: "99612.00", bank: "Askari Bank", status: "Created", userName: "Maria Garcia", userEmail: "maria@example.com", date: "2024-01-16" },
  ])

  const [adminMode, setAdminMode] = useState(true)
  const [depositPage, setDepositPage] = useState(1)
  const [withdrawalPage, setWithdrawalPage] = useState(1)
  const [selectedDeposit, setSelectedDeposit] = useState<DepositRequest | null>(null)
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalRequest | null>(null)
  const [viewDepositOpen, setViewDepositOpen] = useState(false)
  const [viewWithdrawalOpen, setViewWithdrawalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuType, setMenuType] = useState<'deposit' | 'withdrawal' | null>(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const itemsPerPage = 10
  const depositStartIndex = (depositPage - 1) * itemsPerPage
  const withdrawalStartIndex = (withdrawalPage - 1) * itemsPerPage
  const displayedDeposits = depositRequests.slice(depositStartIndex, depositStartIndex + itemsPerPage)
  const displayedWithdrawals = withdrawalRequests.slice(withdrawalStartIndex, withdrawalStartIndex + itemsPerPage)
  const totalDepositPages = Math.ceil(depositRequests.length / itemsPerPage)
  const totalWithdrawalPages = Math.ceil(withdrawalRequests.length / itemsPerPage)

  // Mark mounted to avoid hydration mismatch for time-dependent UI
  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date())
      // Simulate real-time updates
      if (Math.random() > 0.7) {
        setSnackbar({
          open: true,
          message: "New transaction received",
          severity: "success"
        })
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, type: 'deposit' | 'withdrawal', item: DepositRequest | WithdrawalRequest) => {
    setAnchorEl(event.currentTarget)
    setMenuType(type)
    if (type === 'deposit') {
      setSelectedDeposit(item as DepositRequest)
    } else {
      setSelectedWithdrawal(item as WithdrawalRequest)
    }
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMenuType(null)
    setSelectedDeposit(null)
    setSelectedWithdrawal(null)
  }

  const handleDepositAction = (depositId: string, action: 'approve' | 'reject') => {
    setDepositRequests(prev => prev.map(deposit => 
      deposit.id === depositId 
        ? { ...deposit, status: action === 'approve' ? 'Approved' : 'Rejected' }
        : deposit
    ))
    
    setSnackbar({
      open: true,
      message: `Deposit ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
      severity: "success"
    })
    handleMenuClose()
  }

  const handleWithdrawalAction = (withdrawalId: string, newStatus: WithdrawalRequest['status']) => {
    setWithdrawalRequests(prev => prev.map(withdrawal => 
      withdrawal.id === withdrawalId 
        ? { ...withdrawal, status: newStatus }
        : withdrawal
    ))
    
    setSnackbar({
      open: true,
      message: `Withdrawal status updated to ${newStatus}`,
      severity: "success"
    })
    handleMenuClose()
  }

  const handleViewReceipt = (receipt: string) => {
    // Simulate opening receipt
    setSnackbar({
      open: true,
      message: `Opening ${receipt}...`,
      severity: "success"
    })
  }

  const handleRefreshData = () => {
    setLastRefresh(new Date())
    setSnackbar({
      open: true,
      message: "Data refreshed successfully",
      severity: "success"
    })
  }

  const handleExportData = (type: 'deposits' | 'withdrawals') => {
    // Simulate data export
    const data = type === 'deposits' ? depositRequests : withdrawalRequests
    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(data[0]).join(",") + "\n" +
      data.map(row => Object.values(row).join(",")).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${type}_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setSnackbar({
      open: true,
      message: `${type} data exported successfully`,
      severity: "success"
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
        return '#48BB78'
      case 'Pending':
      case 'Created':
        return '#4A5568'
      case 'Waiting for proof':
        return '#ED8936'
      case 'Processing':
        return '#3182CE'
      case 'Rejected':
        return '#E53E3E'
      default:
        return '#4A5568'
    }
  }

  return (
    <Box sx={{ backgroundColor: 'var(--primary-color)', minHeight: '100vh', p: 3 }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">Available balance</Typography>
            <Typography variant="h6" fontWeight="bold">{stats.availableBalance} (PKR)</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Wallet</Typography>
            <Typography variant="h6" fontWeight="bold">{stats.walletBalance} (PKR)</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Dealer code</Typography>
            <Typography variant="h6" fontWeight="bold">{stats.dealerCode}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={handleRefreshData} sx={{ color: "#4A5568" }}>
            <Refresh />
          </IconButton>
          <Typography variant="body2">Admin</Typography>
          <Switch 
            checked={adminMode} 
            onChange={(e) => setAdminMode(e.target.checked)}
            color="primary" 
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ color: "#2D3748", fontWeight: "bold" }}>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last updated: {lastRefresh.toLocaleTimeString()}
        </Typography>
      </Box>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ border: "2px solid #E2E8F0" }}>
            <CardContent sx={{ textAlign: "center", py: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                <Box sx={{ color: "#4A5568" }}><TrendingUp /></Box>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: "0.75rem", textTransform: "uppercase" }}>
                LIMIT ON PROCESSING DEPOSITS
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: "bold", color: "#2D3748" }}>
                {stats.processingLimit}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ border: "2px solid #E2E8F0" }}>
            <CardContent sx={{ textAlign: "center", py: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                <Box sx={{ color: "#4A5568" }}><AccountBalance /></Box>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: "0.75rem", textTransform: "uppercase" }}>
                DEPOSITS DAILY LIMIT (PKR)
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: "bold", color: "#2D3748" }}>
                {stats.dailyLimit}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ border: "2px solid #E2E8F0" }}>
            <CardContent sx={{ textAlign: "center", py: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                <Box sx={{ color: "#4A5568" }}><TrendingUp /></Box>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: "0.75rem", textTransform: "uppercase" }}>
                DEPOSITS WEEKLY LIMIT (PKR)
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: "bold", color: "#2D3748" }}>
                {stats.weeklyLimit}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ border: "2px solid #E2E8F0" }}>
            <CardContent sx={{ textAlign: "center", py: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                <Box sx={{ color: "#4A5568" }}><TrendingDown /></Box>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: "0.75rem", textTransform: "uppercase" }}>
                DEPOSITS MONTHLY LIMIT (PKR)
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: "bold", color: "#2D3748" }}>
                {stats.monthlyLimit}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tables Section */}
      <Grid container spacing={3}>
        {/* Deposits Requests */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
            <Box sx={{ p: 2, borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center", m: -3, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2D3748" }}>
                Deposits Requests
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton size="small" onClick={() => handleExportData('deposits')}>
                  <Download />
                </IconButton>
                <IconButton size="small">
                  <FilterList />
                </IconButton>
              </Box>
            </Box>
            <TableContainer sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Amount (PKR)</TableCell>
                    <TableCell>Invoice ID</TableCell>
                    <TableCell>Processing Time</TableCell>
                    <TableCell>Receipt</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedDeposits.map((deposit) => (
                    <TableRow 
                      key={deposit.id} 
                      hover
                      sx={{ 
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#F7FAFC" }
                      }}
                      onClick={() => {
                        setSelectedDeposit(deposit)
                        setViewDepositOpen(true)
                      }}
                    >
                      <TableCell sx={{ fontWeight: "bold" }}>{deposit.amount}</TableCell>
                      <TableCell>{deposit.invoiceId}</TableCell>
                      <TableCell>{deposit.processingTime}</TableCell>
                      <TableCell>
                        <Button 
                          size="small" 
                          startIcon={<Visibility />}
                          sx={{ 
                            color: "#4A5568",
                            textTransform: "none",
                            fontSize: "0.75rem"
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewReceipt(deposit.receipt)
                          }}
                        >
                          Receipt
                        </Button>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        {deposit.status === 'Pending' && adminMode ? (
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                backgroundColor: "#48BB78",
                                color: "white",
                                textTransform: "none",
                                fontSize: "0.75rem",
                                minWidth: "60px",
                                "&:hover": { backgroundColor: "#38A169" },
                              }}
                              onClick={() => handleDepositAction(deposit.id, 'approve')}
                            >
                              Approve
                            </Button>
                            <IconButton 
                              size="small" 
                              onClick={(e) => handleMenuClick(e, 'deposit', deposit)}
                            >
                              <MoreVert />
                            </IconButton>
                          </Box>
                        ) : (
                          <Chip
                            label={deposit.status}
                            size="small"
                            sx={{
                              backgroundColor: getStatusColor(deposit.status),
                              color: "white",
                              fontSize: "0.75rem",
                            }}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ p: 2, borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Showing {depositStartIndex + 1} to {Math.min(depositStartIndex + itemsPerPage, depositRequests.length)} of {depositRequests.length} entries
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {Array.from({ length: Math.min(totalDepositPages, 4) }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    size="small"
                    variant={page === depositPage ? "contained" : "outlined"}
                    sx={{
                      minWidth: "32px",
                      height: "32px",
                      backgroundColor: page === depositPage ? "#4A5568" : "transparent",
                      color: page === depositPage ? "white" : "#4A5568",
                      borderColor: "#4A5568",
                      "&:hover": {
                        backgroundColor: page === depositPage ? "#2D3748" : "#F7FAFC",
                      },
                    }}
                    onClick={() => setDepositPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Withdrawal Requests */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
            <Box sx={{ p: 2, borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center", m: -3, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2D3748" }}>
                Withdrawal Requests
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton size="small" onClick={() => handleExportData('withdrawals')}>
                  <Download />
                </IconButton>
                <IconButton size="small">
                  <FilterList />
                </IconButton>
              </Box>
            </Box>
            <TableContainer sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Invoice ID</TableCell>
                    <TableCell>Amount (PKR)</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedWithdrawals.map((withdrawal) => (
                    <TableRow 
                      key={withdrawal.id} 
                      hover
                      sx={{ 
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#F7FAFC" }
                      }}
                      onClick={() => {
                        setSelectedWithdrawal(withdrawal)
                        setViewWithdrawalOpen(true)
                      }}
                    >
                      <TableCell>{withdrawal.invoiceId}</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>{withdrawal.amount}</TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                            {withdrawal.details}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                            {withdrawal.bank}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: getStatusColor(withdrawal.status),
                              color: "white",
                              textTransform: "none",
                              fontSize: "0.75rem",
                              minWidth: "100px",
                              "&:hover": {
                                backgroundColor: getStatusColor(withdrawal.status),
                                opacity: 0.8,
                              },
                            }}
                          >
                            {withdrawal.status}
                          </Button>
                          {adminMode && (
                            <IconButton 
                              size="small" 
                              onClick={(e) => handleMenuClick(e, 'withdrawal', withdrawal)}
                            >
                              <MoreVert />
                            </IconButton>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ p: 2, borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Showing {withdrawalStartIndex + 1} to {Math.min(withdrawalStartIndex + itemsPerPage, withdrawalRequests.length)} of {withdrawalRequests.length} entries
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {Array.from({ length: Math.min(totalWithdrawalPages, 6) }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    size="small"
                    variant={page === withdrawalPage ? "contained" : "outlined"}
                    sx={{
                      minWidth: "32px",
                      height: "32px",
                      backgroundColor: page === withdrawalPage ? "#4A5568" : "transparent",
                      color: page === withdrawalPage ? "white" : "#4A5568",
                      borderColor: "#4A5568",
                      "&:hover": {
                        backgroundColor: page === withdrawalPage ? "#2D3748" : "#F7FAFC",
                      },
                    }}
                    onClick={() => setWithdrawalPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {menuType === 'deposit' && selectedDeposit && (
          <>
            {selectedDeposit.status === 'Pending' && (
              <>
                <MenuItem onClick={() => handleDepositAction(selectedDeposit.id, 'approve')}>
                  Approve Deposit
                </MenuItem>
                <MenuItem onClick={() => handleDepositAction(selectedDeposit.id, 'reject')}>
                  Reject Deposit
                </MenuItem>
              </>
            )}
            <MenuItem onClick={() => {
              setViewDepositOpen(true)
              handleMenuClose()
            }}>
              View Details
            </MenuItem>
          </>
        )}
        {menuType === 'withdrawal' && selectedWithdrawal && (
          <>
            {selectedWithdrawal.status === 'Created' && (
              <MenuItem onClick={() => handleWithdrawalAction(selectedWithdrawal.id, 'Processing')}>
                Start Processing
              </MenuItem>
            )}
            {selectedWithdrawal.status === 'Processing' && (
              <MenuItem onClick={() => handleWithdrawalAction(selectedWithdrawal.id, 'Completed')}>
                Mark Completed
              </MenuItem>
            )}
            {selectedWithdrawal.status === 'Waiting for proof' && (
              <MenuItem onClick={() => handleWithdrawalAction(selectedWithdrawal.id, 'Processing')}>
                Proof Received
              </MenuItem>
            )}
            <MenuItem onClick={() => {
              setViewWithdrawalOpen(true)
              handleMenuClose()
            }}>
              View Details
            </MenuItem>
          </>
        )}
      </Menu>

      {/* View Deposit Dialog */}
      <Dialog open={viewDepositOpen} onClose={() => setViewDepositOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Deposit Details</DialogTitle>
        <DialogContent>
          {selectedDeposit && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>User Information</Typography>
                  <Typography>Name: {selectedDeposit.userName}</Typography>
                  <Typography>Email: {selectedDeposit.userEmail}</Typography>
                  <Typography>Date: {selectedDeposit.date}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>Transaction Details</Typography>
                  <Typography>Amount: {selectedDeposit.amount} PKR</Typography>
                  <Typography>Invoice ID: {selectedDeposit.invoiceId}</Typography>
                  <Typography>Processing Time: {selectedDeposit.processingTime}</Typography>
                  <Typography>Status: {selectedDeposit.status}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>Receipt</Typography>
                  <Button variant="outlined" startIcon={<Visibility />}>
                    View {selectedDeposit.receipt}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDepositOpen(false)}>Close</Button>
          {selectedDeposit?.status === 'Pending' && adminMode && (
            <>
              <Button 
                variant="contained" 
                color="success"
                onClick={() => {
                  handleDepositAction(selectedDeposit.id, 'approve')
                  setViewDepositOpen(false)
                }}
              >
                Approve
              </Button>
              <Button 
                variant="contained" 
                color="error"
                onClick={() => {
                  handleDepositAction(selectedDeposit.id, 'reject')
                  setViewDepositOpen(false)
                }}
              >
                Reject
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* View Withdrawal Dialog */}
      <Dialog open={viewWithdrawalOpen} onClose={() => setViewWithdrawalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Withdrawal Details</DialogTitle>
        <DialogContent>
          {selectedWithdrawal && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>User Information</Typography>
                  <Typography>Name: {selectedWithdrawal.userName}</Typography>
                  <Typography>Email: {selectedWithdrawal.userEmail}</Typography>
                  <Typography>Date: {selectedWithdrawal.date}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>Transaction Details</Typography>
                  <Typography>Amount: {selectedWithdrawal.amount} PKR</Typography>
                  <Typography>Details: {selectedWithdrawal.details}</Typography>
                  <Typography>Bank: {selectedWithdrawal.bank}</Typography>
                  <Typography>Status: {selectedWithdrawal.status}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewWithdrawalOpen(false)}>Close</Button>
          {adminMode && selectedWithdrawal && (
            <FormControl sx={{ minWidth: 120, mr: 2 }}>
              <InputLabel>Change Status</InputLabel>
              <Select
                value={selectedWithdrawal.status}
                onChange={(e) => {
                  handleWithdrawalAction(selectedWithdrawal.id, e.target.value as WithdrawalRequest['status'])
                  setViewWithdrawalOpen(false)
                }}
                label="Change Status"
              >
                <MenuItem value="Created">Created</MenuItem>
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Waiting for proof">Waiting for proof</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
