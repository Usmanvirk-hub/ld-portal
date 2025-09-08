"use client"

import { useState, useEffect } from "react"
import type { ReactNode } from "react"
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
  Divider,
  Snackbar,
  InputAdornment,
  TablePagination,
  CircularProgress,
  CardHeader,
  Skeleton,
} from "@mui/material"
import {
  CloudUpload,
  Visibility,
  MoreVert,
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
  AccountBalance,
  TrendingUp,
  TrendingDown,
  Warning,
  CheckCircleOutline,
  FileDownload,
  Business,
  CreditCard,
} from "@mui/icons-material"
import type { SelectChangeEvent } from "@mui/material"
import apiClient from "@/lib/api"
import { PAYMENT_ENDPOINTS } from "@/lib/endpoints"

interface Deposit {
  id: string
  userId: number
  userName: string
  userEmail: string
  userPhone: string
  amount: string
  method: string
  status: "Pending" | "Approved" | "Rejected" | "Processing" | "Completed"
  date: string
  requestedDate: string
  processedDate?: string
  receipt: string
  notes?: string
  adminNotes?: string
  transactionId?: string
}

const initialDeposits: Deposit[] = [
  {
    id: "DEP001",
    userId: 1,
    userName: "John Doe",
    userEmail: "john@example.com",
    userPhone: "+1 (555) 123-4567",
    amount: "$500.00",
    method: "Bank Transfer",
    status: "Completed",
    date: "2024-01-15",
    requestedDate: "2024-01-15",
    processedDate: "2024-01-16",
    receipt: "data:image/jpeg;base64,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",
    transactionId: "DEP001234",
    notes: "Monthly deposit",
    adminNotes: "Verified and processed",
  },
  {
    id: "DEP002",
    userId: 2,
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    userPhone: "+1 (555) 234-5678",
    amount: "$1,000.00",
    method: "Credit Card",
    status: "Pending",
    date: "2024-01-14",
    requestedDate: "2024-01-14",
    receipt: "https://picsum.photos/1200/800.jpg",
    notes: "Investment deposit",
  },
  {
    id: "DEP003",
    userId: 3,
    userName: "Mike Johnson",
    userEmail: "mike@example.com",
    userPhone: "+1 (555) 345-6789",
    amount: "$750.00",
    method: "PayPal",
    status: "Approved",
    date: "2024-01-13",
    requestedDate: "2024-01-13",
    processedDate: "2024-01-14",
    receipt: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    adminNotes: "Approved for processing",
  },
  {
    id: "DEP004",
    userId: 4,
    userName: "Sarah Wilson",
    userEmail: "sarah@example.com",
    userPhone: "+1 (555) 456-7890",
    amount: "$250.00",
    method: "Bank Transfer",
    status: "Rejected",
    date: "2024-01-12",
    requestedDate: "2024-01-12",
    processedDate: "2024-01-13",
    receipt: "receipt4.pdf",
    adminNotes: "Invalid receipt provided",
  },
  {
    id: "DEP005",
    userId: 5,
    userName: "Robert Brown",
    userEmail: "robert@example.com",
    userPhone: "+1 (555) 567-8901",
    amount: "$1,200.00",
    method: "Credit Card",
    status: "Processing",
    date: "2024-01-11",
    requestedDate: "2024-01-11",
    processedDate: "2024-01-12",
    receipt: "receipt5.pdf",
    adminNotes: "Currently processing",
  },
  {
    id: "DEP006",
    userId: 6,
    userName: "Emily Davis",
    userEmail: "emily@example.com",
    userPhone: "+1 (555) 678-9012",
    amount: "$800.00",
    method: "Bank Transfer",
    status: "Completed",
    date: "2024-01-10",
    requestedDate: "2024-01-10",
    processedDate: "2024-01-11",
    receipt: "receipt6.pdf",
    transactionId: "DEP005678",
    notes: "Regular deposit",
    adminNotes: "Successfully processed",
  },
  {
    id: "DEP007",
    userId: 7,
    userName: "David Martinez",
    userEmail: "david@example.com",
    userPhone: "+1 (555) 789-0123",
    amount: "$300.00",
    method: "PayPal",
    status: "Pending",
    date: "2024-01-09",
    requestedDate: "2024-01-09",
    receipt: "receipt7.pdf",
    notes: "Small deposit",
  },
  {
    id: "DEP008",
    userId: 8,
    userName: "Lisa Anderson",
    userEmail: "lisa@example.com",
    userPhone: "+1 (555) 890-1234",
    amount: "$2,000.00",
    method: "Bank Transfer",
    status: "Approved",
    date: "2024-01-08",
    requestedDate: "2024-01-08",
    processedDate: "2024-01-09",
    receipt: "receipt8.pdf",
    adminNotes: "Large deposit approved",
  },
  {
    id: "DEP009",
    userId: 9,
    userName: "James Taylor",
    userEmail: "james@example.com",
    userPhone: "+1 (555) 901-2345",
    amount: "$450.00",
    method: "Credit Card",
    status: "Rejected",
    date: "2024-01-07",
    requestedDate: "2024-01-07",
    processedDate: "2024-01-08",
    receipt: "receipt9.pdf",
    adminNotes: "Card verification failed",
  },
  {
    id: "DEP010",
    userId: 10,
    userName: "Maria Garcia",
    userEmail: "maria@example.com",
    userPhone: "+1 (555) 012-3456",
    amount: "$650.00",
    method: "Bank Transfer",
    status: "Completed",
    date: "2024-01-06",
    requestedDate: "2024-01-06",
    processedDate: "2024-01-07",
    receipt: "receipt10.pdf",
    transactionId: "DEP009012",
    notes: "International deposit",
    adminNotes: "Processed successfully",
  }
]

export default function DepositsPage() {
  const [deposits, setDeposits] = useState<Deposit[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [open, setOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })
  const [receipt, setReceipt] = useState<File | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [formData, setFormData] = useState({
    amount: "",
    method: "",
    description: "",
  })
  const [showReceiptPreview, setShowReceiptPreview] = useState(false)
  const [receiptPreviewOpen, setReceiptPreviewOpen] = useState(false)
  const [previewReceipt, setPreviewReceipt] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch deposits from API
  const fetchDeposits = async (pageNum: number = 0, pageSize: number = 5) => {
    try {
      setLoading(true)
      const response = await apiClient.get(PAYMENT_ENDPOINTS.list, {
        params: {
          page: pageNum + 1, // API uses 1-based pagination
          pageSize: pageSize,
        }
      })

      console.log('API Response:', response.data)

      // Prefer exact fields provided by the API item you shared
      const source = Array.isArray(response.data?.data)
        ? response.data.data
        : Array.isArray(response.data?.items)
          ? response.data.items
          : Array.isArray(response.data)
            ? response.data
            : []

      const transformedDeposits = source.map((item: any) => {
        // Map flexible item shapes into Deposit
        const company = item.company || {}
        const bank = item.bankAccount || {}

        // Compose amount with optional currency if present
        const amountValue = typeof item.amount === 'number' || typeof item.amount === 'string'
          ? String(item.amount)
          : ''
        const currency = item.currency ? String(item.currency) : ''
        const amountWithCurrency = currency ? `${amountValue} ${currency}` : amountValue

        // Normalize status (keep original case)
        const rawStatus = item.status || 'Pending'
        const status = typeof rawStatus === 'string'
          ? rawStatus
          : 'Pending'

        // Dates
        const createdAt = item.createdAt || item.date || new Date().toISOString()

        return {
          id: item.id ?? item.transactionId ?? `DEP${Math.random().toString(36).slice(2, 9)}`,
          userId: item.userId ?? company.id ?? 0,
          userName: item.userName ?? company.name ?? 'Unknown User',
          userEmail: item.userEmail ?? '',
          userPhone: item.userPhone ?? '',
          amount: amountWithCurrency || '$0.00',
          method: item.method ?? bank.bankName ?? 'Bank',
          status,
          date: createdAt,
          requestedDate: item.requestedDate ?? createdAt,
          processedDate: item.processedDate ?? item.updatedAt ?? undefined,
          receipt: item.receipt ?? item.proofFile ?? '',
          notes: item.notes ?? item.purpose ?? '',
          adminNotes: item.adminNotes ?? item.remark ?? '',
          transactionId: item.transactionId ?? item.id ?? '',
        }
      })

      setDeposits(transformedDeposits)
      setTotalCount(
        Number(response.data?.totalCount) ||
        Number(response.data?.total) ||
        Number(response.data?.count) ||
        transformedDeposits.length
      )
    } catch (error: any) {
      const status = error?.response?.status
      const dataMsg = error?.response?.data?.message || error?.message || 'Unknown error'
      console.error('Error fetching deposits:', { status, data: error?.response?.data })

      // Retry once without credentials in case endpoint is public and rejects cookies
      try {
        const response = await apiClient.get(PAYMENT_ENDPOINTS.list, {
          params: { page: pageNum + 1, pageSize },
          withCredentials: false,
        })
        console.log('API Response (no creds):', response.data)

        const source = Array.isArray(response.data?.data)
          ? response.data.data
          : Array.isArray(response.data?.items)
            ? response.data.items
            : Array.isArray(response.data)
              ? response.data
              : []

        const transformedDeposits = source.map((item: any) => ({
          id: item.id,
          userId: item.userId,
          userName: item.userName,
          userEmail: item.userEmail,
          userPhone: item.userPhone,
          amount: item.amount,
          method: item.method,
          status: item.status,
          date: item.date,
          requestedDate: item.requestedDate,
          processedDate: item.processedDate,
          receipt: item.receipt,
          notes: item.notes,
          adminNotes: item.adminNotes,
          transactionId: item.transactionId,
        }))

        setDeposits(transformedDeposits)
        setTotalCount(
          Number(response.data?.totalCount) ||
          Number(response.data?.total) ||
          Number(response.data?.count) ||
          transformedDeposits.length
        )
        return
      } catch (retryErr: any) {
        const retryStatus = retryErr?.response?.status
        const retryMsg = retryErr?.response?.data?.message || retryErr?.message || 'Unknown error'
        console.error('Retry (no creds) failed:', { status: retryStatus, data: retryErr?.response?.data })
        setSnackbar({
          open: true,
          message: `Failed to fetch deposits (${status || 'n/a'}: ${dataMsg}). No records available.`,
          severity: 'error'
        })
        // Show no data instead of fallback data
        setDeposits([])
        setTotalCount(0)
      }
    } finally {
      setLoading(false)
    }
  }

  // Load deposits on component mount and when page/rowsPerPage changes
  useEffect(() => {
    fetchDeposits(page, rowsPerPage)
  }, [page, rowsPerPage])

  // Client-side filtering
  const filteredDeposits = deposits.filter(deposit => {
    const matchesSearch =
      deposit.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(deposit.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.userEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "All" || deposit.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Use API data directly since pagination is handled by the API
  const paginatedDeposits = filteredDeposits

  const DetailRow = ({ label, value }: { label: string; value: ReactNode }) => (
    <Box sx={{
      py: 1.25,
      borderTop: '1px solid var(--border)',
      '&:first-of-type': { borderTop: 'none', pt: 0 },
    }}>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '220px 1fr' },
        alignItems: 'flex-start',
        gap: 2,
      }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--muted-foreground)' }}>
          {label}
        </Typography>
        <Box>
          {typeof value === 'string' || typeof value === 'number' ? (
            <Typography sx={{ color: 'var(--foreground)' }}>{value}</Typography>
          ) : (
            value
          )}
        </Box>
      </Box>
    </Box>
  )

  const getReceiptUrl = (receiptFileName: string) => {
    if (
      /^https?:\/\//.test(receiptFileName) ||
      receiptFileName.startsWith('/') ||
      receiptFileName.startsWith('data:') ||
      receiptFileName.startsWith('blob:')
    ) {
      return receiptFileName
    }
    return `/receipts/${receiptFileName}`
  }

  const downloadReceipt = async (receiptFileName: string) => {
    const url = getReceiptUrl(receiptFileName)
    try {
      // Direct-download if it's a data URL
      if (url.startsWith('data:')) {
        const defaultName = (() => {
          const match = url.match(/^data:([^;]+)/)
          const mime = match ? match[1] : 'application/octet-stream'
          if (mime === 'application/pdf') return 'receipt.pdf'
          if (mime === 'image/jpeg') return 'receipt.jpg'
          if (mime === 'image/png') return 'receipt.png'
          if (mime === 'image/webp') return 'receipt.webp'
          return 'receipt'
        })()
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = receiptFileName.includes('data:') ? defaultName : receiptFileName
        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)
        return
      }

      const res = await fetch(url)
      if (!res.ok) throw new Error('not-found')
      const blob = await res.blob()
      const objectUrl = window.URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = objectUrl
      anchor.download = receiptFileName
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
      window.URL.revokeObjectURL(objectUrl)
    } catch (err) {
      // Fallback: open in new tab for cross-origin URLs
      if (/^https?:\/\//.test(url) || url.startsWith('blob:') || url.startsWith('data:')) {
        window.open(url, '_blank')
        return
      }
      setSnackbar({
        open: true,
        message: `Receipt not found. Place the file at public/receipts/${receiptFileName} or provide a full URL.`,
        severity: 'error'
      })
    }
  }

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceipt(e.target.files[0])
    }
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, deposit: Deposit) => {
    setAnchorEl(event.currentTarget)
    setSelectedDeposit(deposit)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedDeposit(null)
  }

  const handleStatusChange = (depositId: string, newStatus: Deposit["status"], adminNotes?: string) => {
    setDeposits(deposits.map(deposit =>
      deposit.id === depositId
        ? {
          ...deposit,
          status: newStatus,
          processedDate: new Date().toISOString().split('T')[0],
          adminNotes: adminNotes || deposit.adminNotes
        }
        : deposit
    ))
    setSnackbar({
      open: true,
      message: `Deposit ${newStatus.toLowerCase()} successfully`,
      severity: "success"
    })
    handleMenuClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newDeposit: Deposit = {
      id: `DEP${String(deposits.length + 1).padStart(3, '0')}`,
      userId: 1, // Current user ID
      userName: "Current User",
      userEmail: "user@example.com",
      userPhone: "+1 (555) 000-0000",
      ...formData,
      status: "Pending",
      date: new Date().toISOString().split('T')[0],
      requestedDate: new Date().toISOString().split('T')[0],
      receipt: receipt?.name || "no-receipt.pdf",
      notes: formData.description,
    }
    setDeposits([newDeposit, ...deposits])
    setSnackbar({
      open: true,
      message: "Deposit submitted successfully!",
      severity: "success"
    })
    setOpen(false)
    setFormData({ amount: "", method: "", description: "" })
    setReceipt(null)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

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
          Deposit Management
        </Typography>

      </Box>

      {/* Statistics Cards */}


      {/* Filters */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--card)',
          width: '100%',         // stretch full width
          maxWidth: '100%',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          {/* Search Input */}
          <Grid item sx={{ width: '65%' }} xs={12} md={9}>
            <TextField
              fullWidth
              placeholder="Search by user name, email, or deposit ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  backgroundColor: 'var(--background)',
            
                  '&:hover fieldset': {
                    borderColor: 'var(--foreground)', // hover border
                  },
            
                  '&.Mui-focused': {
                    backgroundColor: 'var(--card)',
                  },
            
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--foreground)', // focus border
                    borderWidth: '1px', // optional: make it bolder
                  },
                },
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

          {/* Status Filter */}
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: 'var(--muted-foreground)' }}>Status Filter</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status Filter"
                sx={{
                  borderRadius: 1,
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                  '&:hover': {
                    backgroundColor: 'var(--muted)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'var(--muted))',
                  },
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


      {/* Deposits Table */}
      <Paper sx={{
        borderRadius: 2,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--card)',
        overflow: 'hidden'
      }}>
        <Box sx={{ p: 3, borderBottom: '1px solid var(--border)' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
            Deposit Requests ({totalCount})
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'var(--muted)' }}>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Deposit ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Method</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2 }}>Receipt</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'var(--muted-foreground)', py: 2, paddingLeft: '25px' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <>
                  {[...Array(5)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Skeleton variant="circular" width={40} height={40} />
                          <Box>
                            <Skeleton variant="text" width={120} height={20} />
                            <Skeleton variant="text" width={80} height={16} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Skeleton variant="text" width={80} height={20} />
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Skeleton variant="text" width={100} height={20} />
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Skeleton variant="text" width={90} height={20} />
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Skeleton variant="text" width={100} height={20} />
                      </TableCell>
                      <TableCell sx={{ py: 2, textAlign: 'left' }}>
                        <Skeleton variant="rectangular" width={60} height={32} sx={{ borderRadius: 1 }} />
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Skeleton variant="rectangular" width={70} height={32} sx={{ borderRadius: 1 }} />
                          <Skeleton variant="circular" width={32} height={32} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : totalCount === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No records available
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedDeposits.map((deposit) => (
                  <TableRow
                    key={deposit.id}
                    hover
                    sx={{
                      cursor: "pointer",
                      '&:hover': {
                        backgroundColor: 'var(--muted)',
                      },
                      borderBottom: '1px solid var(--border)'
                    }}
                    onClick={() => {
                      setSelectedDeposit(deposit)
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
                            {deposit.userName}
                          </Typography>
                          {/* <Typography variant="body2" sx={{ color: 'var(--muted-foreground)', fontSize: '0.75rem' }}>
                          {deposit.userEmail}
                        </Typography> */}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: 'var(--muted-foreground)' }}>
                        {deposit.id}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
                        {deposit.amount}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ color: 'var(--muted-foreground)' }}>
                        {deposit.method}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Chip
                        label={deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                        size="small"
                        sx={{
                          borderRadius: 1,
                          fontWeight: 500,
                          fontFamily: 'system-ui, sans-serif',
                          fontSize: '0.75rem',
                          backgroundColor: getStatusColor(deposit.status),
                          color: 'white',
                          '& .MuiChip-label': {
                            color: 'white',
                            fontWeight: 600
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ color: 'var(--muted-foreground)' }}>
                        {new Date(deposit.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2, textAlign: 'left' }}>
                      <Button
                        size="small"
                        startIcon={<Visibility />}
                        onClick={(e) => {
                          e.stopPropagation()
                          setPreviewReceipt(deposit.receipt)
                          setReceiptPreviewOpen(true)
                        }}
                        sx={{
                          textTransform: 'none',
                          fontFamily: 'system-ui, sans-serif',
                          borderRadius: 1,
                          // px: 2,
                          fontSize: '0.75rem',
                          color: 'var(--muted-foreground)',
                          backgroundColor: 'var(--muted)',
                          '&:hover': {
                            backgroundColor: 'var(--accent)',
                            color: 'var(--accent-foreground)'
                          }
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()} sx={{ py: 2 }}>
                      <Box sx={{ display: "flex", }}>
                        <Button
                          size="small"
                          onClick={() => {
                            setSelectedDeposit(deposit)
                            setViewOpen(true)
                          }}
                          sx={{
                            textTransform: 'none',
                            fontFamily: 'system-ui, sans-serif',
                            borderRadius: 1,

                            fontSize: '0.75rem',
                            color: 'var(--muted-foreground)'
                          }}
                        >
                          Details
                        </Button>
                        <IconButton
                          onClick={(e) => handleMenuClick(e, deposit)}
                          sx={{
                            borderRadius: 1,
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
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
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
            borderRadius: 1,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--card)',
            mt: 1
          }
        }}
      >
        {selectedDeposit?.status?.toLowerCase() === "pending" && (
          <>
            <MenuItem
              onClick={() => handleStatusChange(selectedDeposit.id, "Approved", "Approved by admin")}
              sx={{ py: 1.5, px: 2 }}
            >
              <CheckCircle sx={{ mr: 2, color: "success.main" }} />
              Approve
            </MenuItem>
            <MenuItem
              onClick={() => handleStatusChange(selectedDeposit.id, "Rejected", "Rejected due to invalid receipt")}
              sx={{ py: 1.5, px: 2 }}
            >
              <Cancel sx={{ mr: 2, color: "error.main" }} />
              Reject
            </MenuItem>
            <Divider />
          </>
        )}
        {selectedDeposit?.status?.toLowerCase() === "approved" && (
          <MenuItem
            onClick={() => handleStatusChange(selectedDeposit.id, "Processing", "Processing deposit")}
            sx={{ py: 1.5, px: 2 }}
          >
            <Edit sx={{ mr: 2, color: "info.main" }} />
            Mark as Processing
          </MenuItem>
        )}
        {selectedDeposit?.status?.toLowerCase() === "processing" && (
          <MenuItem
            onClick={() => handleStatusChange(selectedDeposit.id, "Completed", "Deposit completed successfully")}
            sx={{ py: 1.5, px: 2 }}
          >
            <CheckCircle sx={{ mr: 2, color: "success.main" }} />
            Mark as Completed
          </MenuItem>
        )}
        <MenuItem onClick={() => {
          setViewOpen(true)
          setSelectedDeposit(deposit)
          handleMenuClose()
        }} sx={{ py: 1.5, px: 2 }}>
          <Visibility sx={{ mr: 2 }} />
          View Details
        </MenuItem>
      </Menu>

      {/* Add Deposit Dialog */}
      {/* <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="sm" 
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 1,
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            backgroundColor: 'var(--card)',
          }
        }}
      >
        <DialogTitle sx={{ p: 3, pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
            New Deposit
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
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
                      borderRadius: 1,
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
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    value={formData.method}
                    onChange={handleSelectChange}
                    label="Payment Method"
                    sx={{
                      borderRadius: 1,
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
                    }}
                  >
                    <MenuItem value="bank">Bank Transfer</MenuItem>
                    <MenuItem value="card">Credit Card</MenuItem>
                    <MenuItem value="paypal">PayPal</MenuItem>
                    <MenuItem value="crypto">Cryptocurrency</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description (Optional)"
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange("description")}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
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
                <Button 
                  variant="outlined" 
                  component="label" 
                  startIcon={<CloudUpload />} 
                  fullWidth
                  sx={{
                    borderRadius: 1,
                    py: 1.5,
                    textTransform: 'none',
            fontFamily: 'system-ui, sans-serif',
                    borderColor: 'var(--border)',
                    color: 'var(--muted-foreground)',
                    '&:hover': {
                      borderColor: 'var(--ring)',
                      backgroundColor: 'var(--muted)'
                    }
                  }}
                >
                  Upload Receipt/Proof
                  <input type="file" hidden accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
                </Button>
                {receipt && (
                  <Typography variant="body2" sx={{ mt: 1, color: 'var(--muted-foreground)' }}>
                    Selected: {receipt.name}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button 
              onClick={() => setOpen(false)}
              sx={{ 
                textTransform: 'none',
            fontFamily: 'system-ui, sans-serif',
                borderRadius: 1,
                px: 3,
                color: 'var(--muted-foreground)'
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              sx={{ 
                textTransform: 'none',
            fontFamily: 'system-ui, sans-serif',
                borderRadius: 1,
                px: 3,
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': {
                  backgroundColor: 'var(--primary)',
                  opacity: 0.9,
                }
              }}
            >
              Submit Deposit
            </Button>
          </DialogActions>
        </form>
      </Dialog> */}

      {/* View Deposit Dialog */}
      <Dialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        maxWidth="lg"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 1,
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            backgroundColor: 'var(--card)',
          }
        }}
      >
        <DialogTitle sx={{ p: 3, pb: 1, position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pr: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
              Transaction Details - {selectedDeposit?.id}
            </Typography>
            {selectedDeposit && (
              <Chip
                label={selectedDeposit.status.charAt(0).toUpperCase() + selectedDeposit.status.slice(1)}
                size="small"
                sx={{
                  borderRadius: 1,
                  fontWeight: 500,
                  backgroundColor: getStatusColor(selectedDeposit.status),
                  color: 'white',
                  '& .MuiChip-label': { color: 'white', fontWeight: 600 }
                }}
              />
            )}
          </Box>
          <IconButton
            onClick={() => setViewOpen(false)}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: 'var(--muted-foreground)',
              '&:hover': {
                backgroundColor: 'var(--muted)',
                color: 'var(--foreground)'
              }
            }}
          >
            <Cancel />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3, pt: 2 }}>
          {selectedDeposit && mounted ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
              {/* Transaction Overview */}
              <Card sx={{ mt: 2 }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AttachMoney />
                      Transaction Overview
                    </Box>
                  }
                />
                <CardContent>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Amount
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" color="var(--foreground)">
                        {selectedDeposit.amount}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Transaction ID
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                        {selectedDeposit.transactionId || selectedDeposit.id}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Internal ID
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        #{selectedDeposit.id}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Status
                      </Typography>
                      <Chip
                        label={selectedDeposit.status.charAt(0).toUpperCase() + selectedDeposit.status.slice(1)}
                        size="small"
                        sx={{
                          borderRadius: 1,
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          backgroundColor: getStatusColor(selectedDeposit.status),
                          color: 'white',
                          '& .MuiChip-label': { color: 'white', fontWeight: 600 }
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Purpose
                      </Typography>
                      <Typography variant="body1">{selectedDeposit.notes || 'Deposit request'}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Remark
                      </Typography>
                      <Typography variant="body1">{selectedDeposit.adminNotes || 'No remarks'}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Proof File
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Receipt sx={{ fontSize: 16 }} />
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {selectedDeposit.receipt}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Button
                          size="small"
                          startIcon={<Visibility />}
                          onClick={() => setShowReceiptPreview(prev => !prev)}
                          sx={{
                            textTransform: 'none',
                            fontFamily: 'system-ui, sans-serif',
                            borderRadius: 1,
                            color: 'var(--muted-foreground)',
                            fontSize: '0.75rem',
                            px: 2,
                            py: 0.5
                          }}
                        >
                          {showReceiptPreview ? 'Hide Preview' : 'Preview'}
                        </Button>
                        <Button
                          size="small"
                          startIcon={<FileDownload />}
                          onClick={() => downloadReceipt(selectedDeposit.receipt)}
                          sx={{
                            textTransform: 'none',
                            fontFamily: 'system-ui, sans-serif',
                            borderRadius: 1,
                            color: 'var(--muted-foreground)',
                            fontSize: '0.75rem',
                            px: 2,
                            py: 0.5
                          }}
                        >
                          Download
                        </Button>
                        <Button
                          size="small"
                          component="a"
                          href={getReceiptUrl(selectedDeposit.receipt)}
                          target="_blank"
                          rel="noreferrer"
                          startIcon={<Visibility />}
                          sx={{
                            textTransform: 'none',
                            fontFamily: 'system-ui, sans-serif',
                            borderRadius: 1,
                            color: 'var(--muted-foreground)',
                            fontSize: '0.75rem',
                            px: 2,
                            py: 0.5
                          }}
                        >
                          Open
                        </Button>
                      </Box>
                    </Box>
                    {showReceiptPreview && (
                      <Box sx={{ gridColumn: '1 / -1', mt: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 1 }}>
                          Receipt Preview
                        </Typography>
                        <Box sx={{
                          border: '1px solid var(--border)',
                          borderRadius: 1,
                          overflow: 'hidden',
                          maxHeight: 400,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          bgcolor: 'grey.50'
                        }}>
                          {(() => {
                            const url = getReceiptUrl(selectedDeposit.receipt)
                            const isPdf = /\.pdf(\?|$)/i.test(url) || url.startsWith('data:application/pdf')
                            const isExternal = /^https?:\/\//.test(url)

                            if (isPdf) {
                              if (isExternal) {
                                return (
                                  <Box sx={{ p: 3, textAlign: 'center' }}>
                                    <Receipt sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                                    <Typography sx={{ color: 'var(--muted-foreground)', mb: 2 }}>
                                      PDF preview may be blocked by the source.
                                    </Typography>
                                    <Button
                                      size="small"
                                      component="a"
                                      href={url}
                                      target="_blank"
                                      rel="noreferrer"
                                      startIcon={<Visibility />}
                                      sx={{ textTransform: 'none' }}
                                    >
                                      Open in new tab
                                    </Button>
                                  </Box>
                                )
                              }
                              return (
                                <object
                                  data={url}
                                  type="application/pdf"
                                  width="100%"
                                  height="400px"
                                  style={{ border: 'none' }}
                                >
                                  <Box sx={{ p: 3, textAlign: 'center' }}>
                                    <Receipt sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                                    <Typography sx={{ color: 'var(--muted-foreground)', mb: 2 }}>
                                      PDF preview not available.
                                    </Typography>
                                    <Button
                                      size="small"
                                      component="a"
                                      href={url}
                                      target="_blank"
                                      rel="noreferrer"
                                      startIcon={<Visibility />}
                                      sx={{ textTransform: 'none' }}
                                    >
                                      Open in new tab
                                    </Button>
                                  </Box>
                                </object>
                              )
                            }
                            return (
                              <Box
                                component="img"
                                src={url}
                                alt="Receipt preview"
                                sx={{
                                  width: '100%',
                                  maxHeight: 400,
                                  objectFit: 'contain',
                                  display: 'block'
                                }}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.style.display = 'none'
                                  const parent = target.parentElement
                                  if (parent) {
                                    parent.innerHTML = `
                                      <div style="padding: 24px; text-align: center;">
                                        <svg style="width: 48px; height: 48px; color: #9ca3af; margin-bottom: 16px;" fill="currentColor" viewBox="0 0 20 20">
                                          <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                        </svg>
                                        <p style="color: #6b7280; margin-bottom: 16px;">Image preview not available.</p>
                                        <a href="${url}" target="_blank" rel="noreferrer" style="color: #3b82f6; text-decoration: none; font-size: 14px;">Open in new tab</a>
                                      </div>
                                    `
                                  }
                                }}
                              />
                            )
                          })()}
                        </Box>
                      </Box>
                    )}
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Created At
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarToday sx={{ fontSize: 16 }} />
                        <Typography variant="body1">
                          {new Date(selectedDeposit.date).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",

                          })}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Company Information */}
              <Card>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Business />
                      Company Information
                    </Box>
                  }
                />
                <CardContent>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Company Name
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {selectedDeposit.userName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Company ID
                      </Typography>
                      <Typography variant="body1">#{selectedDeposit.userId}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Company Created
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarToday sx={{ fontSize: 16 }} />
                        <Typography variant="body1">
                          {new Date(selectedDeposit.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          })}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Public Key
                      </Typography>
                      <Paper sx={{ p: 1, bgcolor: 'grey.100' }}>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                          pub_76543210abcdef9876543210abcdef12
                        </Typography>
                      </Paper>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Private Key
                      </Typography>
                      <Paper sx={{ p: 1, bgcolor: 'grey.100' }}>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                          priv_f1e2d3c4b5a697887766554433221100
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Bank Account Information */}
              <Card>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CreditCard />
                      Bank Account Information
                    </Box>
                  }
                />
                <CardContent>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Bank Name
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccountBalance sx={{ fontSize: 16 }} />
                        <Typography variant="body1" fontWeight="bold">
                          {selectedDeposit.method}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Account Title
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Person sx={{ fontSize: 16 }} />
                        <Typography variant="body1" fontWeight="bold">
                          {selectedDeposit.userName}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Account Number
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        ****9876543210987
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        IBAN
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        PK45UNIL0000009876543210987
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Account ID
                      </Typography>
                      <Typography variant="body1">#2</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Status
                      </Typography>
                      <Chip
                        label="ACTIVE"
                        size="small"
                        sx={{
                          borderRadius: 1,
                          fontWeight: 500,
                          fontFamily: 'system-ui, sans-serif',
                          fontSize: '0.75rem',
                          backgroundColor: '#a4ee97',
                          color: 'white',
                          '& .MuiChip-label': { color: 'white', fontWeight: 600 }
                        }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ) : selectedDeposit ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
              <CircularProgress />
            </Box>
          ) : null}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          {selectedDeposit?.status?.toLowerCase() === "pending" && (
            <>
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircle />}
                onClick={() => {
                  handleStatusChange(selectedDeposit.id, "Approved", "Approved by admin")
                  setViewOpen(false)
                }}
                sx={{
                  textTransform: 'none',
                  fontFamily: 'system-ui, sans-serif',
                  borderRadius: 1,
                  px: 3,
                  boxShadow: '0 4px 12px rgba(72, 187, 120, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(72, 187, 120, 0.4)',
                  }
                }}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<Cancel />}
                onClick={() => {
                  handleStatusChange(selectedDeposit.id, "Rejected", "Rejected by admin")
                  setViewOpen(false)
                }}
                sx={{
                  textTransform: 'none',
                  fontFamily: 'system-ui, sans-serif',
                  borderRadius: 1,
                  px: 3,
                  boxShadow: '0 4px 12px rgba(245, 101, 101, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(245, 101, 101, 0.4)',
                  }
                }}
              >
                Reject
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Receipt Preview Dialog */}
      <Dialog
        open={receiptPreviewOpen}
        onClose={() => setReceiptPreviewOpen(false)}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 1,
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            backgroundColor: 'var(--card)',
          }
        }}
      >
        <DialogTitle sx={{ p: 3, pb: 1, position: 'relative' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
            Receipt Preview
          </Typography>
          <IconButton
            onClick={() => setReceiptPreviewOpen(false)}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: 'var(--muted-foreground)',
              '&:hover': {
                backgroundColor: 'var(--muted)',
                color: 'var(--foreground)'
              }
            }}
          >
            <Cancel />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3, pt: 2 }}>
          {previewReceipt && (
            <Box sx={{
              border: '1px solid var(--border)',
              borderRadius: 1,
              overflow: 'hidden',
              maxHeight: '70vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'grey.50'
            }}>
              {(() => {
                const url = getReceiptUrl(previewReceipt)
                const isPdf = /\.pdf(\?|$)/i.test(url) || url.startsWith('data:application/pdf')
                const isExternal = /^https?:\/\//.test(url)

                if (isPdf) {
                  if (isExternal) {
                    return (
                      <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Receipt sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                        <Typography sx={{ color: 'var(--muted-foreground)', mb: 2 }}>
                          PDF preview may be blocked by the source.
                        </Typography>
                        <Button
                          size="small"
                          component="a"
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          startIcon={<Visibility />}
                          sx={{ textTransform: 'none' }}
                        >
                          Open in new tab
                        </Button>
                      </Box>
                    )
                  }
                  return (
                    <object
                      data={url}
                      type="application/pdf"
                      width="100%"
                      height="500px"
                      style={{ border: 'none' }}
                    >
                      <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Receipt sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                        <Typography sx={{ color: 'var(--muted-foreground)', mb: 2 }}>
                          PDF preview not available.
                        </Typography>
                        <Button
                          size="small"
                          component="a"
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          startIcon={<Visibility />}
                          sx={{ textTransform: 'none' }}
                        >
                          Open in new tab
                        </Button>
                      </Box>
                    </object>
                  )
                }
                return (
                  <Box
                    component="img"
                    src={url}
                    alt="Receipt preview"
                    sx={{
                      width: '100%',
                      maxHeight: '70vh',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        parent.innerHTML = `
                          <div style="padding: 24px; text-align: center;">
                            <svg style="width: 48px; height: 48px; color: #9ca3af; margin-bottom: 16px;" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                            </svg>
                            <p style="color: #6b7280; margin-bottom: 16px;">Image preview not available.</p>
                            <a href="${url}" target="_blank" rel="noreferrer" style="color: #3b82f6; text-decoration: none; font-size: 14px;">Open in new tab</a>
                          </div>
                        `
                      }
                    }}
                  />
                )
              })()}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={() => setReceiptPreviewOpen(false)}
            sx={{
              textTransform: 'none',
              fontFamily: 'system-ui, sans-serif',
              borderRadius: 1,
              px: 3,
              color: 'var(--muted-foreground)'
            }}
          >
            Close
          </Button>
          {previewReceipt && (
            <Button
              onClick={() => downloadReceipt(previewReceipt)}
              startIcon={<FileDownload />}
              sx={{
                textTransform: 'none',
                fontFamily: 'system-ui, sans-serif',
                borderRadius: 1,
                px: 3,
                color: 'var(--muted-foreground)'
              }}
            >
              Download
            </Button>
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
            borderRadius: 1,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
