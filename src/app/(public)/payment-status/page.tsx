'use client';

import { Button } from '@mui/material';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { verifyPayment } from '../../../services/payment/verify-payment';

export default function PaymentStatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get('paymentId');

  const { data, error, isLoading } = useSWR(
    paymentId ? ['payment', paymentId] : null,
    ([, id]) => verifyPayment(id)
  );

  const success = data?.success === true;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      {isLoading && <p>Checking payment status...</p>}

      {!isLoading && !error && success && (
        <>
          <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Payment Successful!</h1>
          <p className="mb-6">Thank you for your purchase 🎉</p>
          <Button variant="contained" onClick={() => router.push('/')}>
            Return Home
          </Button>
        </>
      )}

      {!isLoading && (!success || error) && (
        <>
          <XCircle className="text-red-500 w-16 h-16 mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Payment Failed</h1>
          <p className="mb-6">Something went wrong with your payment.</p>
          <Button variant="contained" color="error" onClick={() => router.push('/')}>
            Return Home
          </Button>
        </>
      )}
    </div>
  );
}
