"use client";

import * as React from 'react';
import { Box, Divider } from '@mui/material';
import { useCheckout } from '/src/contexts/checkout';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { ServiceTiers } from '../../(public)/services/_components/service-tiers';

export const CheckoutDetails = () => {
    const { selectedService, selectedTier, getTotalAmount } = useCheckout();
    console.log(selectedService);
    return (
        <Box>
            <Typography variant="h5">Checkout Details</Typography>
            <Box display="flex" gap={2} mt={5} border={1} borderColor="divider" p={2}>
                <Box>
                    <Image src={selectedService?.image} alt={selectedService?.title} width={50} height={50} />
                </Box>
                <Typography variant="h5">{selectedService?.title}</Typography>
            </Box>

            <Box mt={5}>
                <Typography variant="h5">Service Tiers</Typography>
                <ServiceTiers selectedTier={selectedTier} />
            </Box>

            <Box mt={5}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body1" fontWeight={600}>
                        Service fee
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        ${selectedService?.price}
                    </Typography>
                </Box>
                {selectedTier.length > 0 && (
                    <Box mt={3}>
                        <Typography variant="body2" mb={2} color="text.secondary">
                            Addons
                        </Typography>

                        <Box display="flex" flexDirection="column" gap={1}>
                            {selectedTier.map((tier) => (
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Typography variant="body1">{tier.category}</Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        $ {tier.amount}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )}

                <Divider sx={{ my: 2 }} />
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Total
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        ${getTotalAmount()}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}