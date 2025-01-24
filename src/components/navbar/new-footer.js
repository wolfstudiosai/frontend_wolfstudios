import React from 'react';
import Link from 'next/link';
import { Box, Container, Typography, Stack } from '@mui/material';
import { NewfooterRoutes } from '@/router';

export const NewFooter = () => {
  const links = [
    { href: '/blog', label: 'Blog' },
    { href: '/learn', label: 'Learn' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/help', label: 'Help Docs' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/cookies', label: 'Cookie Policy' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/join', label: 'Join' },
  ];

  return (
    <React.Fragment>
      <Box
        component="footer"
        sx={{
          bgcolor: 'var(--mui-palette-background-level2)',
          color: 'var(--mui-palette-neutral-950)',
          left: 0,
          position: 'sticky',
          right: 0,
          bottom: 0,
          zIndex: 'var(--MainNav-zIndex)',
          mx: 0,
          borderRadius: 0,
          backdropFilter: 'blur(10px)',
          padding: 0,
          mt: 4,
        }}
      >
        <Container maxWidth="xxl" sx={{ py: '16px' }}>
          <Stack
            direction="row"
            spacing={2} 
            sx={{
              justifyContent: 'start',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {NewfooterRoutes.map((link, index) => (
              <React.Fragment key={index}>
                <Link href={link.href} passHref style={{ textDecoration: 'none' }}>
                  <Typography
                    sx={{
                      color: 'var(--mui-palette-neutral-950)',
                      fontSize: '0.875rem',
                      fontWeight: 'normal',
                      '&:hover': {
                        color: 'var(--mui-palette-common-dark)',
                      },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
                {index !== NewfooterRoutes.length - 1 && (
                  <Box
                    sx={{
                      height: '24px',
                      borderLeft: '1px solid var(--mui-palette-neutral-950)',
                      mx: 1,
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </Stack>
        </Container>
      </Box>
    </React.Fragment>
  );
};
