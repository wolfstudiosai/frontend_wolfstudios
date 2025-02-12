import { CustomChip } from '@/components/core/custom-chip';
import { isSupabaseUrl, pxToRem } from '@/utils/helper';
import { Box, Stack, Typography } from '@mui/material';

export const PartnerQuickView = ({ data }) => {
  return (
    <Stack>
      <Box
        component="img"
        src={
          isSupabaseUrl(data?.profile_image)
            ? `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${data?.profile_image}`
            : data?.profile_image
        }
        sx={{
          height: '100%',
          width: pxToRem(400),
          objectFit: 'contain',
          borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
          border: '1px solid var(--mui-palette-divider)',
        }}
      />
      <Box>
        <Typography sx={{ fontSize: '14px', fontWeight: 500, mt: 1.5 }} color="text.primary">
          Name
        </Typography>
        <Typography sx={{ fontSize: '14px' }} color="text.secodary">
          {data.name || '-'}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ fontSize: '14px', fontWeight: 500, mt: 1.5 }} color="text.primary">
          Email
        </Typography>
        <Typography sx={{ fontSize: '14px' }} color="text.secodary">
          {data.email || '-'}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ fontSize: '14px', fontWeight: 500, mt: 1.5 }} color="text.primary">
          Phone
        </Typography>
        <Typography sx={{ fontSize: '14px' }} color="text.secodary">
          {data.phone || '-'}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ fontSize: '14px', fontWeight: 500, mt: 1.5 }} color="text.primary">
          State
        </Typography>
        <Typography sx={{ fontSize: '14px' }} color="text.secodary">
          {data.state || '-'}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ fontSize: '14px', fontWeight: 500, mt: 1.5 }} color="text.primary">
          Website
        </Typography>
        <Typography sx={{ fontSize: '14px' }} color="text.secodary">
          {data.website || '-'}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ fontSize: '14px', fontWeight: 500, mt: 1.5 }} color="text.primary">
          Tags
        </Typography>
        {data?.tags.map((item) => (
          <CustomChip key={item} label={item} sx={{ mr: 1 }} />
        ))}
      </Box>
    </Stack>
  );
};
