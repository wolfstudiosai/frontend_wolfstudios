import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Link from 'next/link';

const PaymentCancelledPage = () => {
    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                <CancelIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                    Payment Cancelled
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Your transaction was not completed. You can try again or return to the homepage.
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Retry Payment
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        component={Link}
                        href="/"
                    >
                        Go to Homepage
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default PaymentCancelledPage;