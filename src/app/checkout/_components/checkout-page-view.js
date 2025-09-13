'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { CheckoutDetails } from './checkout-details';
import { CheckoutForm } from './checkout-form';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCheckout } from '/src/contexts/checkout';
import { Button, Divider, Typography } from '@mui/material';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

export const CheckoutPageView = () => {
    const { getTotalAmount, selectedService } = useCheckout();
    console.log(selectedService);

    return (
        <>
            {selectedService ? (<Box display="flex" gap={2} p={2} pb={5}>
                <Box flex={1}>
                    <CheckoutDetails />
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box flex={1}>
                    <Elements
                        stripe={stripePromise}
                        options={{
                            mode: "payment",
                            amount: getTotalAmount(),
                            currency: "usd",
                        }}>
                        <CheckoutForm />
                    </Elements>
                </Box>
            </Box>) : (
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={5}>
                    <Typography variant="h5" align="center" mt={5}>Please select a service first</Typography>
                    <Button variant="contained" color="primary" href="/services">Select a service</Button>
                </Box>
            )}
        </>
    );
}
