'use client';

import { Grid2 as Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { ServiceRightPanel } from './service-right-panel';
import React, { useState } from 'react';

export const ServiceCard = ({ service }) => {
  const [openServicePanel, setOpenServicePanel] = React.useState(false);
  const [selectedService, setSelectedService] = useState(null);

  return (
    <Grid size={12}>
      <Box sx={{ mb: 6 }}>
        <Box
          sx={{
            height: '300px',
            backgroundImage: `url(${service.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            my: 6,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#fff',
              backgroundColor: 'rgba(0,0,0,0.5)',
              px: 3,
              py: 1,
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            {service.title}
          </Typography>
        </Box>

        {/* Sub-service Grid */}
        <Grid container spacing={2}>
          {service.subServices.map((subService, subIndex) => (
            <Grid size={{ xs: 6, md: 3 }} key={subIndex}>
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'background.paper',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '150px',
                    backgroundImage: `url(${subService.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mb: 3,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, height: '45px' }}>
                  {subService.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: '1.5em',
                    height: '4.5em',
                  }}
                >
                  {subService.description}
                </Typography>

                <Typography variant="body2" sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 0 }}>
                  Starting at
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                  {subService.price}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    setOpenServicePanel(true);
                    setSelectedService(subService);
                  }}
                >
                  Purchase Now
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      {openServicePanel && (
        <ServiceRightPanel
          onClose={() => setOpenServicePanel(false)}
          open={openServicePanel}
          service={selectedService}
        />
      )}
    </Grid>
  );
};
