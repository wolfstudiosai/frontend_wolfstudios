import { pxToRem } from '@/utils/helper';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';

import { Iconify } from '@/components/iconify/iconify';

export const LeftProfileOverview = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: { xs: 3, md: 2 } }}>
      <Box component={'img'} src="/assets/avatar-1.png" sx={{ borderRadius: 0.5, width: "100%" }} />
      <Typography sx={{ fontSize: '2.5rem', fontWeight: 300 }}>Sofia Rivers</Typography>
      <SocialIcons
        iconsArr={[
          { name: 'ic:sharp-facebook', url: 'facebook' },
          { name: 'hugeicons:instagram', url: 'instagram' },
          { name: 'pajamas:twitter', url: 'twitter' },
        ]}
      />
      <Stack direction="row" spacing={1}>
        <Chip color="primary" label="Approved" variant="soft" size="small" />
        <Chip color="primary" label="Approved" variant="soft" size="small" />
        <Chip color="primary" label="Approved" variant="soft" size="small" />
      </Stack>

      <ImageTextIconButton
        dataArr={[
          { id: 1, img: '/assets/avatar-1.png', title: 'Sofia Rivers' },
          { id: 2, img: '/assets/avatar-2.png', title: 'Sofia Rivers' },
          { id: 3, img: '/assets/avatar-3.png', title: 'Sofia Rivers' },
          { id: 4, img: '/assets/avatar-4.png', title: 'Sofia Rivers' },
        ]}
      />
      <BasicPlanCard />
    </Box>
  );
};

const SocialIcons = ({ iconsArr }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {iconsArr.map((icon) => {
        return (
          <Iconify
            key={icon.url}
            icon={icon.name}
            width={32}
            height={32}
            style={{
              cursor: 'pointer',
              color: 'var(--mui-palette-text-secondary)',
              backgroundColor: 'var(--mui-palette-background-level2)',
              borderRadius: '50%',
              padding: 4,
            }}
          />
        );
      })}
    </Box>
  );
};

const ImageTextIconButton = ({ dataArr }) => {
  return (
    <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
      {dataArr.map((item, index) => {
        return (
          <Stack
            key={index}
            direction="row"
            justifyContent={'space-between'}
            spacing={1}
            sx={{ bgcolor: 'var(--mui-palette-background-level2)', borderRadius: 0.5, p: 1 }}
          >
            <Box
              component={'img'}
              src={item.img}
              sx={{ height: pxToRem(32), width: pxToRem(32), borderRadius: '50%' }}
            />
            <Typography>{item.title}</Typography>
            <Iconify
              icon="icon-park-solid:right-c"
              width={32}
              height={32}
              style={{
                cursor: 'pointer',
                color: 'var(--mui-palette-text-secondary)',
                borderRadius: '50%',
                padding: '4px',
              }}
            />
          </Stack>
        );
      })}
    </Stack>
  );
};

export const BasicPlanCard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        gap: 1,
        p: { xs: 3, md: 2 },
        bgcolor: 'var(--mui-palette-background-level2)',
        width: '100%',
        borderRadius: 0.5,
      }}
    >
      <Typography sx={{ fontSize: pxToRem(28), fontWeight: 300 }}>Basic Plan</Typography>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Typography sx={{ fontSize: '1.8rem', fontWeight: 500 }}>$ 9.99/mo</Typography>
        <Button variant="outlined">Get Started</Button>
      </Stack>
      <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.</Typography>
    </Box>
  );
};
