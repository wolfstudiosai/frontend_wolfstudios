import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { SettingsContext } from '/src/contexts/settings';

import { pxToRem } from '/src/utils/helper';

export const CampaignSection = () => {
  const {
    customSettings: { openSubNav },
  } = React.useContext(SettingsContext);
  return (
    <Box sx={{ px: 4, pt: 1 }}>
      <Grid container sx={{ mb: 2, position: 'relative' }} spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              // padding: 4,
              position: 'sticky',
              top: pxToRem(openSubNav ? 170 : 106),
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: '2.2rem',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                color: 'text.primary',
              }}
            >
              Campaign That we are proud of
            </Typography>
            <Typography fontSize={18} sx={{ color: 'text.secondary', width: { xs: '100%', md: '70%' } }}>
              Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
              visuals that captivate audiences, evoke emotion, and leave a lasting impact.
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack direction="column" gap={1}>
            <CampaignCard />
            <CampaignCard />
          </Stack>
        </Grid>
      </Grid>
      <Grid container sx={{ mb: 2, position: 'relative' }} spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              // padding: 4,
              position: 'sticky',
              top: pxToRem(openSubNav ? 170 : 106),
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: '2.2rem',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                color: 'text.primary',
              }}
            >
              Campaign That we are proud of 2
            </Typography>
            <Typography fontSize={18} sx={{ color: 'text.secondary', width: { xs: '100%', md: '70%' } }}>
              Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
              visuals that captivate audiences, evoke emotion, and leave a lasting impact.
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack direction="column" gap={1}>
            <CampaignCard />
            <CampaignCard />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

const CampaignCard = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: 450,
        overflow: 'hidden',
        transition: 'transform 300ms ease',
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
      }}
    >
      <Box
        className="image"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          backgroundImage: `url(https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57c56327d6ab7a4dda60_66f299235cc7eab712895f06_lionne-clothing-1-3.jpeg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 400ms ease',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '45%',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))',
          zIndex: 5,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          zIndex: 10,
          color: 'white',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: 'white',
            letterSpacing: '1px',
            fontSize: '1.25rem',
          }}
        >
          Title of the campaign
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.85rem',
            mt: 1,
          }}
        >
          Category
        </Typography>
      </Box>
    </Box>
  );
};
