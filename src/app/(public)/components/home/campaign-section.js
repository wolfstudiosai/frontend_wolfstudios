import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { SettingsContext } from '/src/contexts/settings';
import { CustomChip } from '/src/components/core/custom-chip';
import { Iconify } from '/src/components/iconify/iconify';

import { getRandomGradientColor, isSupabaseUrl, pxToRem } from '/src/utils/helper';

export const CampaignSection = () => {
  const {
    customSettings: { openSubNav },
  } = React.useContext(SettingsContext);
  return (
    <>
      <Grid container sx={{ mb: 2, position: 'relative' }} spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              // backgroundColor: '#333',
              borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
              padding: 4,
              position: 'sticky',
              top: pxToRem(openSubNav ? 170 : 106),
              // boxShadow: 3,
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
              BITCOIN PAYMENT PROCESSING FOR BUSINESS
            </Typography>
            <Typography fontSize={21}>
              Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
              visuals that captivate audiences, evoke emotion, and leave a lasting impact.
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack direction="column" gap={2}>
            <CampaignCard />
            <CampaignCard />
          </Stack>
        </Grid>
      </Grid>
      <Grid container sx={{ mb: 2, position: 'relative' }} spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              // backgroundColor: '#333',
              borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
              padding: 4,
              position: 'sticky',
              top: pxToRem(openSubNav ? 170 : 106),
              // boxShadow: 3,
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
              BITCOIN PAYMENT PROCESSING FOR BUSINESS
            </Typography>
            <Typography fontSize={21}>
              Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
              visuals that captivate audiences, evoke emotion, and leave a lasting impact.
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack direction="column" gap={2}>
            <CampaignCard />
            <CampaignCard />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

// export const CampaignCard = () => {
//   return (
//     <>
//       <Stack
//         direction={{ sm: 'column', md: 'row' }}
//         sx={{
//           height: '265px',
//           borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
//           boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.09)',
//           overflow: 'visible',
//         }}
//       >
//         <Box
//           component="img"
//           src={isSupabaseUrl('') ? `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${''}` : ''}
//           alt="title"
//           sx={{
//             width: { sm: '100%', md: '30rem' },
//             height: '100%',
//             objectFit: 'cover',
//             borderRadius: 'calc(2* var(--mui-shape-borderRadius))',
//             padding: 1.5,
//           }}
//         />
//         <Stack direction="column" justifyContent="space-between" gap={1} sx={{ p: 2, width: '100%' }}>
//           <Box>
//             <Typography
//               variant="caption"
//               component="h4"
//               sx={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'secondary.main' }}
//             >
//               name
//             </Typography>
//             <Typography sx={{ fontSize: '1rem', color: 'text.secondary' }}>Content engagement:</Typography>
//             <Typography sx={{ fontSize: '1rem', color: 'text.secondary', mt: 2 }}>{'No description'}</Typography>
//           </Box>
//           <Stack direction={{ md: 'row', sm: 'column' }} justifyContent="space-between" gap={1}>
//             <Stack
//               direction="row"
//               alignItems="center"
//               divider={<Iconify icon="pepicons-pencil:line-y" sx={{ color: 'grey.400' }} />}
//             >
//               <CustomChip label="status" color="success" size="small" variant="soft" />
//             </Stack>
//           </Stack>
//         </Stack>
//       </Stack>
//     </>
//   );
// };

const CampaignCard = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: 450,
        // width: 450,
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
          backgroundImage: `url(https://picsum.photos/300/200?random=2)`,
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
