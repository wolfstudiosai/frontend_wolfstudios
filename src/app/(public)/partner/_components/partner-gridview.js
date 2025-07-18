'use client';

import React from 'react';
import { Box, Popover, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { Iconify } from '/src/components/iconify/iconify';
import { PageLoader } from '/src/components/loaders/PageLoader';

import { PartnerCardTwo } from './partner-card-two';

export const PartnerGridView = ({ data, loading }) => {
  return (
    <PageLoader loading={loading} error={null}>
      <Grid container spacing={0.5}>
        {data?.map((content, index) => (
          <Grid
            key={content.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
              xl: 2,
            }}
          >
            <PartnerCardTwo content={content} />
          </Grid>
        ))}
      </Grid>
    </PageLoader>
  );
};

export const SocialIconWithText = ({ icon, url, text, value, sx = {} }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [iframeError, setIframeError] = React.useState(false);
  const isInstagram = icon === 'hugeicons:instagram';

  const handlePopoverOpen = (event) => {
    if (isInstagram) {
      setAnchorEl(event.currentTarget);
      setIframeError(false);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleRedirect = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };
  return (
    <>
      <Stack direction="row" alignItems="center" gap={1} sx={{ ...sx }}>
        <Iconify
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          onClick={handleRedirect}
          sx={{
            cursor: 'pointer',
            color: 'text.primary',
            '&:hover': { color: 'primary.main' },
            cursor: 'pointer',
          }}
          icon={icon}
        />
        <Typography variant="body2">{'  ' + text}</Typography>
        {value != '$0' && value != '$' && <Typography variant="body2">{'  ' + value}</Typography>}
      </Stack>
      {isInstagram && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          PaperProps={{
            onMouseEnter: handlePopoverOpen,
            onMouseLeave: handlePopoverClose,
            sx: { pointerEvents: 'auto', p: 1 },
          }}
          disableRestoreFocus
        >
          <Box sx={{ width: 300, height: 400 }}>
            {!iframeError ? (
              <iframe
                src={`${url}embed`}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                style={{ borderRadius: 8 }}
                onError={() => setIframeError(true)}
              />
            ) : (
              <Stack alignItems="center" justifyContent="center" sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  This profile is private or unavailable.
                </Typography>
              </Stack>
            )}
          </Box>
        </Popover>
      )}
    </>
  );
};

export const SocialIconWithRedirectionUrl = ({ icon, url, text }) => {
  const handleRedirect = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Iconify onClick={handleRedirect} sx={{ cursor: 'pointer' }} icon={icon} />
      <Typography variant="body2">{text}</Typography>
    </Stack>
  );
};
