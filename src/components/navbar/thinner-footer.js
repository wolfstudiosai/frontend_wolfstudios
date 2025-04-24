import React from 'react';
import Link from 'next/link';
import { Box, Container, Stack, Typography } from '@mui/material';

import { footerRoutes } from '/src/router';
import { pxToRem } from '/src/utils/helper';

export const ThinnerFooter = () => {
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
        }}
      >
        <Container maxWidth="xxl" sx={{ py: pxToRem(2) }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Links Section */}
            <Stack
              direction="row"
              spacing={{ xs: 0.5, md: 2 }}
              alignItems="center"
              flexWrap="wrap"
              width={'100%'}
              justifyContent={{ sm: 'center', md: 'flex-start' }}
            >
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
                        borderColor: 'text.secondary',
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
                textAlign: { sm: 'center', md: 'right' },
                width: '100%',
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
