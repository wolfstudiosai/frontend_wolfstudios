'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Divider, Grid2 as Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { DrawerContainer } from '../../../../components/drawer/drawer';
import { ServiceTiers } from './service-tiers';

export const ServiceRightPanel = ({ open, onClose, service }) => {
  const [selectedTier, setSelectedTier] = useState([]);

  const actionButtons = [
    <Button variant="contained" color="primary">
      Proceed to checkout
    </Button>,
    <Button variant="text" color="primary" onClick={onClose}>
      Cancel
    </Button>,
  ];

  return (
    <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons} width="30vw">
      <Box pb={5}>
        <Grid container spacing={1}>
          {service.gallery.map((image, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Image
                src={image}
                alt={`service-${index}`}
                width={300}
                height={300}
                style={{ width: '100%', height: '250px', objectFit: 'cover' }}
              />
            </Grid>
          ))}
        </Grid>

        <Box mt={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            {service.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {service.description}
          </Typography>
        </Box>

        <ServiceTiers selectedTier={selectedTier} setSelectedTier={setSelectedTier} />

        <Box mt={5}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="body1" fontWeight={600}>
              Service fee
            </Typography>
            <Typography variant="body1" color="text.secondary">
              ${service.price}
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
              ${selectedTier.reduce((total, tier) => total + tier.amount, Number(service.price))}
            </Typography>
          </Box>
        </Box>
      </Box>
    </DrawerContainer>
  );
};
