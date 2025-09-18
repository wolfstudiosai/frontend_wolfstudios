'use client';

import React from 'react';
import Image from 'next/image';
import { Divider, Drawer, Grid2 as Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { ServiceTiers } from './service-tiers';
import { api } from '/src/utils/api';

export const ServiceRightPanel = ({ open, onClose, service }) => {
  const [selectedTier, setSelectedTier] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const amount = Number(service.price) + selectedTier.reduce((total, item) => total + item.amount, 0);

      const information = {
        name: formData.name,
        email: formData.email,
        amount,
        currency: 'USD',
        services: [
          {
            name: service.title,
            addons: selectedTier.map((item) => ({ name: item.category, price: item.amount })),
          },
        ],
      };

      const res = await api.post('/payments', information);

      if (res.data.success) {
        window.location.href = res.data.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <Box p={2} pb={5} width="30vw">
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
                {selectedTier.map((tier, index) => (
                  <Box display="flex" key={index} alignItems="center" justifyContent="space-between">
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
              {selectedTier.reduce((total, tier) => total + tier.amount, Number(service.price))}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Enter Your Details
          </Typography>
          <Box component="form" onSubmit={handleCheckout} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              size="small"
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              size="small"
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Box display="flex" gap={2}>
              <Button type="submit" variant="contained" color="primary">
                Checkout
              </Button>
              <Button type="button" variant="text" color="primary" onClick={onClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};
