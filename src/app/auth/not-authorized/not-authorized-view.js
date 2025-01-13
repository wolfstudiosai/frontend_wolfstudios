'use client';

import { Button, Container, Typography } from '@mui/material';
import { default as Link, default as RouterLink } from 'next/link';
import useAuth from '/src/hooks/useAuth';

import { Iconify } from '@/components/iconify/iconify';
import { paths } from '/src/paths';

export const NotAuthorizedView = () => {
  const { userInfo } = useAuth();
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}
    >
      <Iconify icon="fluent-color:warning-16" sx={{ width: 80, height: 80 }} />
      <Typography variant="h3" sx={{ mb: 2 }}>
        You are not allowed to access this page!
      </Typography>

      <Typography sx={{ color: 'text.secondary' }} gutterBottom >
        Your current role is {userInfo?.role} but the page you are trying to access is restricted for this role. If you
        think this is a mistake please <Link href={paths.contact}>contact us</Link>
      </Typography>

      <Button component={RouterLink} href={paths.dashboard.overview} size="large" variant="contained">
        Return dashboard
      </Button>
    </Container>
  );
};
