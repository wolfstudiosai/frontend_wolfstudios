'use client';

import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';

import { verifyPayment } from '../../../services/payment/verify-payment';

export default function PaymentStatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get('paymentId');

  const { data, error, isLoading } = useSWR(paymentId ? ['payment', paymentId] : null, ([, id]) => verifyPayment(id));

  const success = data?.success === true;

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: { xs: 3, sm: 5 },
          textAlign: 'center',
          bgcolor: 'background.paper',
          borderRadius: 3,
          minWidth: { xs: '100%', md: 400 },
        }}
      >
        {isLoading && <Typography>Checking payment status...</Typography>}

        {!isLoading && !error && success && (
          <Box>
            <CheckCircle style={{ color: 'green', width: 64, height: 64, marginBottom: 16 }} />
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {data?.message}
            </Typography>
            <Typography sx={{ mb: 3 }}>Thank you for your purchase 🎉</Typography>
            <Button variant="contained" onClick={() => router.push('/')}>
              Return Home
            </Button>
          </Box>
        )}

        {!isLoading && (!success || error) && (
          <Box>
            <XCircle style={{ color: 'red', width: 64, height: 64, marginBottom: 16 }} />
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Payment Failed
            </Typography>
            <Typography sx={{ mb: 3 }}>{data?.message || 'Payment failed. Please try again.'}</Typography>
            <Button variant="contained" color="error" onClick={() => router.push('/')}>
              Return Home
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
