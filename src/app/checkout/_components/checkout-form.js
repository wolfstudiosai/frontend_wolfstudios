'use client';

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { api } from '/src/utils/api';
import { useCheckout } from '/src/contexts/checkout';
import Button from '@mui/material/Button'
import { Typography } from '@mui/material';

export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { getTotalAmount, selectedService, selectedTier } = useCheckout();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        try {
            setLoading(true);
            const payload = {
                serviceName: selectedService.title,
                servicePrice: selectedService.price,
                selectedTier,
                totalAmount: getTotalAmount(),
            }
            const fetchClientSecret = async () => {
                const res = await api.post('/payment/create-payment-intent', payload);
                setClientSecret(res.data.data);
            };
            fetchClientSecret();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();

        if (submitError) {
            // Show error to your customer
            setLoading(false);
            setErrorMessage(submitError.message);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://localhost:3000/payment-success?amount=${getTotalAmount()}`,
            },
        });

        if (error) {
            setErrorMessage(error.message);
        } else {
            setLoading(false);
            localStorage.removeItem('selectedService');
            localStorage.removeItem('selectedTier');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {clientSecret && <PaymentElement />}
            {errorMessage && <Typography color="error" mt={2}>{errorMessage}</Typography>}
            <Button fullWidth variant="contained" type="submit" disabled={!stripe || loading} sx={{ mt: 2 }}>
                {loading ? 'Loading...' : `Pay ${getTotalAmount()}`}
            </Button>
        </form>
    );
};