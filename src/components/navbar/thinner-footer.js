'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Box, Button, Popover, Stack, TextField, Typography } from '@mui/material';
import { toast } from 'sonner';

import { paths } from '/src/paths';
import { createNewsletterSignup } from '/src/actions/common.actions';

import { footerRoutes } from '/src/router';
import { pxToRem } from '/src/utils/helper';
import { SidebarPopoverItem } from '/src/utils/nav-utils';

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

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const res = await createNewsletterSignup(email);
      if (res.success) {
        setEmail('');
        toast.success("You've successfully subscribed to our newsletter");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        mx: { xs: 0.9, md: 1.5 },
        mt: 1,
      }}
    >
      <Box
        sx={{
          width: '100%',
          py: 8,
          px: 1,
          bgcolor: 'background.paper',
          color: '#fff',
          textAlign: 'center',
          border: '1px solid var(--mui-palette-divider)',
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: 'text.primary', mb: { xs: 0, md: 1 } }}
            fontSize={{ xs: '1.5rem', sm: '2rem', md: '2.2rem' }}
          >
            Don&apos;t Miss Out
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 4,
              fontSize: { xs: 16, md: 18 },
            }}
          >
            Subscribe to our newsletter and be the first to know about new features, updates, and exclusive content.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              maxWidth: 450,
              mx: 'auto',
            }}
          >
            <TextField
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 1,
                input: {
                  color: 'text.primary',
                  fontWeight: 500,
                },
              }}
              InputProps={{
                sx: {
                  height: 48,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                },
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && email) {
                  handleSubscribe();
                }
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 14,
                height: 48,
                borderRadius: 1,
                px: 4,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px 0 rgba(59,130,246,0.15)',
                transition: 'background 0.3s, box-shadow 0.3s',
                '&:hover': {
                  bgcolor: 'linear-gradient(90deg, #818cf8 0%, #60a5fa 100%)',
                  boxShadow: '0 6px 24px 0 rgba(59,130,246,0.22)',
                },
              }}
              onClick={handleSubscribe}
              disabled={!email || loading}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Box>
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
              Archive
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
                  <SidebarPopoverItem key={index} item={link} />
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
    </Box>
  );
};
