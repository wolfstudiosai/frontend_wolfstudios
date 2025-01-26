import React from 'react';
import Link from 'next/link';
import { footerRoutes } from '@/router';
import { pxToRem } from '@/utils/utils';
import { Box, Container, Stack, Typography } from '@mui/material';

export const ThinerFooter = () => {
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
          bgcolor: 'var(--mui-palette-background-default)',
          borderTop: '1px solid var(--mui-palette-background-level2)',
          left: 0,
          position: 'sticky',
          right: 0,
          bottom: 0,
          zIndex: 'var(--MainNav-zIndex)',
          mx: 0,
          borderRadius: 0,
          backdropFilter: 'blur(10px)',
          padding: 0,
          // mt: 4,
        }}
      >
        <Container maxWidth="xxl" sx={{ py: pxToRem(2) }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            {/* Links Section */}
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              {footerRoutes.map((link, index) => (
                <React.Fragment key={index}>
                  <Link href={link.href} passHref style={{ textDecoration: 'none' }}>
                    <Typography
                      component="span"
                      sx={{
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'text.primary',
                        },
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        lineHeight: '28px',
                      }}
                    >
                      {link.label}
                    </Typography>
                  </Link>
                  {/* Divider */}
                  {index !== footerRoutes.length - 1 && (
                    <Box
                      sx={{
                        height: pxToRem(12),
                        borderLeft: '1px solid',
                        borderColor: 'neutral.300',
                        mx: 1,
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Stack>

            {/* Copyright Section */}
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: 'text.secondary',
                textAlign: { xs: 'center', sm: 'left' },
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              ©{new Date().getFullYear()} Wolf Studios Ai. All rights reserved.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </React.Fragment>
  );
};
