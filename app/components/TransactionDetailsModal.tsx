"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Chip,
  Avatar,
  Grid,
  Skeleton,
} from "@mui/material"
import {
  AttachMoney,
  Business,
  CreditCard,
  Description,
  Receipt,
  Visibility,
  FileDownload,
  Close,
  CheckCircle,
  Cancel,
  Person,
  CalendarToday,
} from "@mui/icons-material"

interface Deposit {
  id: number
  transactionId: string
  company: {
    id: number
    name: string
    publicKey: string
    privateKey: string
    createdAt: string
    email?: string
    phone?: string
  }
  bankAccount: {
    id: number
    bankName: string
    accountNumber: string
    iban: string
    accountTitle: string
    isActive: boolean
  }
  amount: string
  currency: string
  status: string
  purpose: string
  remark: string
  proofFile: string
  createdAt: string
  processedDate?: string
  requestedDate?: string
}

interface TransactionDetailsModalProps {
  open: boolean
  onClose: () => void
  selectedDeposit: Deposit | null
  onStatusChange: (id: number, status: string) => void
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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

const formatDateOnly = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function TransactionDetailsModal({ 
  open, 
  onClose, 
  selectedDeposit, 
  onStatusChange 
}: TransactionDetailsModalProps) {
  const [mounted, setMounted] = useState(false)
  const [showReceiptPreview, setShowReceiptPreview] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePreviewReceipt = () => {
    console.log('Preview clicked, current state:', showReceiptPreview)
    console.log('Proof file:', selectedDeposit?.proofFile)
    setShowReceiptPreview(!showReceiptPreview)
  }

  const handleDownloadReceipt = () => {
    console.log('Download clicked, proof file:', selectedDeposit?.proofFile)
    if (selectedDeposit?.proofFile) {
      const link = document.createElement('a')
      link.href = selectedDeposit.proofFile
      link.download = `receipt-${selectedDeposit.transactionId}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      console.log('No proof file available for download')
    }
  }

  const handleOpenReceipt = () => {
    console.log('Open clicked, proof file:', selectedDeposit?.proofFile)
    if (selectedDeposit?.proofFile) {
      window.open(selectedDeposit.proofFile, '_blank')
    } else {
      console.log('No proof file available to open')
    }
  }

  if (!mounted) {
    return null
  }

  console.log('TransactionDetailsModal rendered with:', { open, selectedDeposit: selectedDeposit?.id })

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ p: 3, pb: 1, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pr: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--foreground)' }}>
            Transaction Details - {selectedDeposit?.id || 'N/A'}
          </Typography>
          {selectedDeposit?.status && (
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
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'var(--muted-foreground)',
            '&:hover': {
              backgroundColor: 'var(--muted)',
            }
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, pt: 2 }}>
        {selectedDeposit && mounted && selectedDeposit.company && selectedDeposit.bankAccount ? (
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
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Transaction ID
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                      {selectedDeposit.transactionId || 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Amount
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {selectedDeposit.currency || 'USD'} {selectedDeposit.amount || '0.00'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Purpose
                    </Typography>
                    <Typography variant="body2">
                      {selectedDeposit.purpose || 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Status
                    </Typography>
                    <Chip
                      label={selectedDeposit.status ? selectedDeposit.status.charAt(0).toUpperCase() + selectedDeposit.status.slice(1) : 'Unknown'} 
                      size="small"
                      sx={{ 
                        borderRadius: 1,
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        backgroundColor: getStatusColor(selectedDeposit.status || 'unknown'),
                        color: 'white',
                        '& .MuiChip-label': { color: 'white', fontWeight: 600 }
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Created At
                    </Typography>
                    <Typography variant="body2">
                      {selectedDeposit.createdAt ? formatDate(selectedDeposit.createdAt) : 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Requested Date
                    </Typography>
                    <Typography variant="body2">
                      {selectedDeposit.requestedDate ? formatDate(selectedDeposit.requestedDate) : 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Processed Date
                    </Typography>
                    <Typography variant="body2">
                      {selectedDeposit.processedDate ? formatDate(selectedDeposit.processedDate) : 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Remark
                    </Typography>
                    <Typography variant="body2">
                      {selectedDeposit.remark || 'N/A'}
                    </Typography>
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
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Company Name
                    </Typography>
                    <Typography variant="body2">
                      {selectedDeposit.company?.name || 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Public Key
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {selectedDeposit.company?.publicKey || 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Private Key
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {selectedDeposit.company?.privateKey || 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Email
                    </Typography>
                    <Typography variant="body2">
                      {selectedDeposit.company?.email || 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Phone
                    </Typography>
                    <Typography variant="body2">
                      {selectedDeposit.company?.phone || 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Company Created
                    </Typography>
                    <Typography variant="body2">
                      {selectedDeposit.company?.createdAt ? formatDateOnly(selectedDeposit.company.createdAt) : 'N/A'}
                    </Typography>
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
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Bank Name
                    </Typography>
                    <Typography variant="body2">
                      {selectedDeposit.bankAccount?.bankName || 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Account Number
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                      {selectedDeposit.bankAccount?.accountNumber || 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      IBAN
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                      {selectedDeposit.bankAccount?.iban || 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Account Title
                    </Typography>
                    <Typography variant="body2">
                      {selectedDeposit.bankAccount?.accountTitle || 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Status
                    </Typography>
                    <Chip 
                      label={selectedDeposit.bankAccount?.isActive ? "ACTIVE" : "INACTIVE"}
                      size="small"
                      sx={{ 
                        borderRadius: 1,
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        backgroundColor: selectedDeposit.bankAccount?.isActive ? '#a4ee97' : '#ffcdd2',
                        color: 'white',
                        '& .MuiChip-label': { color: 'white', fontWeight: 600 }
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Proof File Section */}
            {selectedDeposit.proofFile && (
              <Card>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Receipt />
                      Receipt
                    </Box>
                  }
                />
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="outlined"
                      size="small" 
                      startIcon={<Visibility />}
                      onClick={handlePreviewReceipt}
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
                      variant="outlined"
                      size="small"
                      startIcon={<FileDownload />}
                      onClick={handleDownloadReceipt}
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
                      variant="outlined"
                      size="small"
                      startIcon={<Description />}
                      onClick={handleOpenReceipt}
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
                  
                  {showReceiptPreview && (
                    <Box sx={{ mt: 2 }}>
                      {selectedDeposit.proofFile?.endsWith('.png') || selectedDeposit.proofFile?.endsWith('.jpg') || selectedDeposit.proofFile?.endsWith('.jpeg') ? (
                        <img 
                          src={selectedDeposit.proofFile} 
                          alt="Receipt Preview" 
                          style={{ 
                            maxWidth: '100%', 
                            height: 'auto', 
                            borderRadius: '8px',
                            border: '1px solid var(--border)'
                          }}
                          onError={(e) => {
                            console.error('Error loading image:', e)
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : (
                        <Box sx={{ 
                          p: 2, 
                          border: '1px solid var(--border)', 
                          borderRadius: 1, 
                          textAlign: 'center',
                          backgroundColor: 'var(--muted)'
                        }}>
                          <Typography variant="body2" color="text.secondary">
                            PDF Preview not available. Click "Open" to view the file.
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                </CardContent>
              </Card>
            )}
          </Box>
        ) : selectedDeposit ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              Loading transaction details...
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No transaction selected
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        {selectedDeposit?.status === "pending" && (
          <>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircle />}
              onClick={() => onStatusChange(selectedDeposit.id, 'approved')}
              sx={{
                textTransform: 'none',
                fontFamily: 'system-ui, sans-serif',
                borderRadius: 1,
                px: 3,
                py: 1
              }}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<Cancel />}
              onClick={() => onStatusChange(selectedDeposit.id, 'rejected')}
              sx={{
                textTransform: 'none',
                fontFamily: 'system-ui, sans-serif',
                borderRadius: 1,
                px: 3,
                py: 1
              }}
            >
              Reject
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}
