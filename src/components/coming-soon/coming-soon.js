'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { Iconify } from '../iconify/iconify';

export const ComingSoon = ({ pageName }) => {
  const router = useRouter();

  const launchDate = new Date('2025-04-01T00:00:00Z').getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = launchDate - now;

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRedirect = () => {
    router.push('/');
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        px: 3,
      }}
    >
      {/* <Box sx={{ textAlign: "center", mb: 3 }}>
                <Iconify icon="mdi:clock-fast" sx={{ width: 100, height: 100, color: "primary.main" }} />
            </Box> */}

      {/* Countdown Timer */}

      <Typography sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}>Coming Soon!</Typography>

      <Typography sx={{ color: 'text.secondary', mb: 3 }}>
        {pageName ? (
          <>
            We are working hard to bring the{' '}
            <Typography component="span" sx={{ fontWeight: 'bold' }}>
              {pageName}
            </Typography>{' '}
            page ASAP.
          </>
        ) : (
          "We're working hard to bring this page to life. Stay tuned!"
        )}
      </Typography>
      <Grid container spacing={{ xs: 1, md: 2 }} justifyContent="center" sx={{ mb: 4 }}>
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds },
        ].map(({ label, value }) => (
          <Grid key={label}>
            <Box
              sx={{
                width: { xs: 64, md: 80 },
                height: { xs: 80, md: 100 },
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--mui-shape-borderRadius)',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                boxShadow: 3,
              }}
            >
              {value}
              <Typography variant="body2" sx={{ fontSize: '0.9rem', mt: 0.5 }}>
                {label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Button onClick={handleRedirect} size="large" variant="text">
        Go to Home
      </Button>
    </Container>
  );
};
