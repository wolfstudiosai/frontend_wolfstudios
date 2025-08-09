'use client';

import React from 'react';
import { Box, Typography, Grid, IconButton, Button, Container, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Image from 'next/image';

export function ChatFooter() {
  return (
    <footer>
      {/* Top Section */}
      <Box bgcolor="#C8E225" color="black" py={6} mx={4}>
        <Container maxWidth="lg">
          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={2}
            borderRadius={2}
          >
            <Box mb={{ xs: 2, md: 0 }}>
              <Typography variant="body1">Contact</Typography>
              <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
                Let&apos;s Make Your <br />
                Fashion Brand Shine
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: 'none',
                backgroundColor: '#000',
                ':hover': { backgroundColor: '#333' },
              }}
            >
              Get In Touch
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Bottom Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4} mt={2}>
          {/* Left Column */}
          <Grid item xs={12} md={4}>
            <Box
              bgcolor="#1F1F1F"
              borderRadius={2}
              p={2}
              border={2}
              borderColor="#1F1F1F"
              color="inherit"
            >
              <Typography variant="h6" fontWeight="bold" mb={2} color='white'>
                The Wolves
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" mb={2} color='white'>
                Quick Links
              </Typography>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Home', 'Job', 'Contacts', 'Wishlist'].map((item) => (
                  <li key={item}>
                    <Typography
                      variant="body2"
                      component="a"
                      href="#"
                      sx={{
                        color: 'white',
                        textDecoration: 'none',
                        ':hover': { textDecoration: 'underline' },
                      }}
                    >
                      {item}
                    </Typography>
                  </li>
                ))}
              </ul>
              <Box display="flex" mt={2} gap={1}>
                <IconButton sx={{ color: 'white' }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton sx={{ color: 'white' }}>
                  <YouTubeIcon />
                </IconButton>
                <IconButton sx={{ color: 'white' }}>
                  <InstagramIcon />
                </IconButton>
                <IconButton sx={{ color: 'white' }}>
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={8} my={2}>
            <Grid container spacing={2 }  bgcolor="#1F1F1F"  borderRadius={2} p={2} border={2} borderColor="#1F1F1F">
              <Grid item xs={12} sm={4}>
                <Box>
                  <Image
                    src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=150&h=150&q=80"
                    alt="Mountain"
                    width={150}
                    height={150}
                    style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2} color='white'>
                  Site Information
                </Typography>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['Careers', 'Contact'].map((item) => (
                    <li key={item}>
                      <Typography
                        variant="body2"
                        component="a"
                        href="#"
                        sx={{
                          color: 'white',
                          textDecoration: 'none',
                          ':hover': { textDecoration: 'underline' },
                        }}
                      >
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2} color='white'>
                  Services
                </Typography>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['Terms & Conditions', 'Privacy Policy', 'Cookie Policy'].map((item) => (
                    <li key={item}>
                      <Typography
                        variant="body2"
                        component="a"
                        href="#"
                        sx={{
                          color: 'white',
                          textDecoration: 'none',
                          ':hover': { textDecoration: 'underline' },
                        }}
                      >
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Grid>
            </Grid>
            <Typography
              textAlign="center"
              variant="body2"
              sx={{ color: 'gray', fontSize: '0.875rem' }}
              bgcolor="#1F1F1F"  borderRadius={2} my={4} p={2} border={2} borderColor="#1F1F1F"
            >
              &copy; {new Date().getFullYear()} The Wolves - All Rights Reserved
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
