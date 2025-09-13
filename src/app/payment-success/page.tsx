import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Paper,
    Stack,
    Divider,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from 'next/link';

const PaymentSuccess = async ({ searchParams }) => {
    const { amount } = await searchParams;
    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: '100%', textAlign: 'center' }}>
                <Stack spacing={3} alignItems="center">
                    <CheckCircleOutlineIcon sx={{ fontSize: 64, color: 'success.main' }} />

                    <Typography variant="h5" fontWeight="bold">
                        Payment Successful!
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Thank you for your purchase. Your payment has been processed successfully.
                    </Typography>

                    <Divider sx={{ width: '100%' }} />

                    {/* Optional Order Summary Placeholder */}
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="subtitle2" color="text.secondary" mb={1}>
                            Order Summary
                        </Typography>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="body2">Total Paid:</Typography>
                            <Typography variant="body2" fontWeight="medium">${amount}</Typography>
                        </Stack>
                    </Box>

                    <Button component={Link} href="/" variant="contained" color="primary" fullWidth>
                        Back to Home
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
};

export default PaymentSuccess;