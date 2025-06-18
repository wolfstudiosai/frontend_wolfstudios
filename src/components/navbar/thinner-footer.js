'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Box, Button, Container, Popover, Stack, Typography } from '@mui/material';

import { footerRoutes } from '/src/router';
import { paths } from '/src/paths';
import { pxToRem } from '/src/utils/helper';
import { PopoverMenuItem } from '/src/utils/nav-utils';

const archiveRoutes = [
  {
    key: 'records',
    title: 'Records',
    href: paths.private.archive_records,
    icon: 'material-symbols:data-table-outline',
    allowedRoles: ['admin', 'user', 'super_admin'],
  },
  {
    key: 'analytics',
    title: 'Analytics',
    href: paths.private.archive_analytics,
    icon: 'material-symbols:analytics-outline',
    allowedRoles: ['admin', 'user', 'super_admin'],
  },
];

export const ThinnerFooter = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isHoveringPopover, setIsHoveringPopover] = useState(false);

  useEffect(() => {
    setOpen(isHoveringButton || isHoveringPopover);
  }, [isHoveringButton, isHoveringPopover]);
  const handleButtonMouseEnter = () => {
    setIsHoveringButton(true);
  };

  const handleButtonMouseLeave = () => {
    setIsHoveringButton(false);
  };

  const handlePopoverMouseEnter = () => {
    setIsHoveringPopover(true);
  };

  const handlePopoverMouseLeave = () => {
    setIsHoveringPopover(false);
  };

  return (
    <React.Fragment>
      <Box
        component="footer"
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          borderTop: '1px solid var(--mui-palette-background-level2)',
          // left: 0,
          // position: 'sticky',
          // right: 0,
          // bottom: 0,
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
                  {index !== footerRoutes.length && (
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

              <>
                <Button
                  ref={buttonRef}
                  variant="text"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    lineHeight: '28px',
                  }}
                  onMouseEnter={handleButtonMouseEnter}
                  onMouseLeave={handleButtonMouseLeave}
                >
                  Hover Me
                </Button>

                <Popover
                  open={open}
                  anchorEl={buttonRef.current}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  onClose={() => setOpen(false)}
                  disableRestoreFocus
                  sx={{
                    pointerEvents: 'none',
                  }}
                >
                  <Box
                    onMouseEnter={handlePopoverMouseEnter}
                    onMouseLeave={handlePopoverMouseLeave}
                    sx={{
                      p: 0.5,
                      pointerEvents: 'auto',
                      width: 150,
                    }}
                  >
                    {archiveRoutes.map((link, index) => (
                      <PopoverMenuItem key={index} item={link} />
                    ))}
                  </Box>
                </Popover>
              </>
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
