'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { services } from './_lib/constant';
import { ServiceCard } from './_components/service-card';

export const ServicesPage = () => {
  return (
    <>
      {/* Services Title Section */}
      <Box sx={{ py: 2 }}>
        <Box sx={{ width: '100%', px: 0 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2, fontSize: '1.8rem' }}>
            Our Services
          </Typography>
          <Typography variant="body1" sx={{ mb: 0 }}>
            Explore our wide range of services designed to help your brand grow and succeed.
          </Typography>
        </Box>
      </Box>

      {/* Services Grid */}
      <Box sx={{ py: 0 }}>
        <Box sx={{ width: '100%', px: 2 }}>
          {/* Service Categories */}
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <ServiceCard service={service} key={index} />
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};
