'use client';

import React, { useState } from 'react';
import { DrawerContainer } from '../../../../components/drawer/drawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Divider, Grid2 } from '@mui/material';
import { ServiceTiers } from './service-tiers';

export const ServiceRightPanel = ({ open, onClose, service }) => {
    const [selectedTier, setSelectedTier] = useState([]);

    const actionButtons = [
        <Button variant="contained" color="primary">
            Proceed to checkout
        </Button>,
        <Button variant="outlined" color="primary" onClick={onClose}>
            Cancel
        </Button>,
    ];

    return (
        <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons}>
            <Box pb={5}>
                <Grid2 container spacing={2}>
                    {service.gallery.map((image, index) => (
                        <Grid2 size={{ xs: 6, md: 4, lg: 3 }} key={index}>
                            <Image
                                src={image}
                                alt={`service-${index}`}
                                width={300}
                                height={300}
                                style={{ width: '100%', height: '220px' }}
                            />
                        </Grid2>
                    ))}
                </Grid2>

                <Box mt={2}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {service.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {service.description}
                    </Typography>
                </Box>

                <ServiceTiers selectedTier={selectedTier} setSelectedTier={setSelectedTier} />

                <Box mt={5} maxWidth={300}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="body1">
                            Service price
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {service.price}
                        </Typography>
                    </Box>
                    {selectedTier.length > 0 && (
                        <Box mt={3}>
                            <Typography variant="body2" mb={2} color='text.secondary'>
                                Addons
                            </Typography>

                            <Box display="flex" flexDirection="column" gap={1}>
                                {selectedTier.map((tier) => (
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography variant="body1">
                                            {tier.category}
                                        </Typography>
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
                        <Typography variant="body1">
                            Total
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            ${selectedTier.reduce((total, tier) => total + tier.amount, Number(service.price))}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </DrawerContainer>
    )
}