import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { SettingsContext } from '/src/contexts/settings';

import { pxToRem } from '/src/utils/helper';

export const CampaignSection = () => {
  const {
    customSettings: { openSubNav },
  } = React.useContext(SettingsContext);
  return (
    <>
      <Grid container sx={{ mb: 2,  position: 'relative' }} spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
              padding: 4,
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
            <Typography fontSize={21} sx={{ color: 'text.secondary', width: { xs: '100%', md: '70%' } }}>
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
              borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
              padding: 4,
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
            <Typography fontSize={21} sx={{ color: 'text.secondary', width: { xs: '100%', md: '70%' } }}>
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
    </>
  );
};

const CampaignCard = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: 450,
        overflow: 'hidden',
        bgcolor: 'neutral.200',
        '&:hover .image': {
          transform: 'scale(1.1)',
        },
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
          transition: 'transform 300ms',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          display: 'grid',
          placeContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
            padding: 2,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: 'white',
            backdropFilter: 'blur(10px)',
            fontSize: '2.5rem',
          }}
        >
          This is title 1
        </Typography>
      </Box>
    </Box>
  );
};
