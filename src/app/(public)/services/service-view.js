'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { services } from './_lib/constant';

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
              <Grid item xs={12} key={index}>
                <Box sx={{ mb: 6 }}>
                  {/* <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 3, fontSize: '1.6rem' }}>
                    {service.title}
                  </Typography> */}

                  {/* Parallax Background Divider */}
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
                  <Grid container spacing={4}>
                    {service.subServices.map((subService, subIndex) => (
                      <Grid item xs={12} sm={6} md={4} key={subIndex}>
                        <Box
                          sx={{
                            p: 4,
                            borderRadius: 2,
                            boxShadow: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '450px',
                            backgroundColor: '#fafafa',
                          }}
                        >
                          <Box
                            sx={{
                              width: '100%',
                              height: '150px',
                              backgroundImage: `url(${subService.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              borderRadius: '8px',
                              mb: 3,
                            }}
                          />
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
                            {subService.title}
                          </Typography>
                          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, flexGrow: 1 }}>
                            {subService.description}
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 0 }}>
                            Starting at
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                            {subService.price}
                          </Typography>
                          <Button variant="contained" color="secondary" size="small">
                            Add to Cart
                          </Button>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};
