import { Avatar, Box, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import dayjs from 'dayjs';

import { Iconify } from '@/components/iconify/iconify';

export const CampaignDetailsSidebar = ({ description, details, author, campaign_title }) => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography
        gutterBottom
        sx={{
          fontWeight: 300,
          fontSize: {
            xs: '1.5rem',
            md: '3.2rem',
          },
          lineHeight: 1,
        }}
      >
        {campaign_title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
      <Box mt={3}>
        <TypographyWithBg title="Date" value={dayjs(details.date).format('YYYY-MM-DD')} />
        <TypographyWithBg title="Compensation" value={details.compensation} />
        <TypographyWithBg title="Deliverables" value={details.deliverables} />
      </Box>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 3, mb: 1 }}>
        SHARE
      </Typography>

      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 4 }}>
          <IconButton sx={{ bgcolor: 'var(--mui-palette-background-level2)', width: '100%', borderRadius: '4px' }}>
            <Iconify icon="tabler:message" width={28} height={28} />
          </IconButton>
        </Grid>
        <Grid item size={{ xs: 12, md: 4 }}>
          <IconButton sx={{ bgcolor: 'var(--mui-palette-background-level2)', width: '100%', borderRadius: '4px' }}>
            <Iconify icon="material-symbols:share" width={28} height={28} />
          </IconButton>
        </Grid>
        <Grid item size={{ xs: 12, md: 4 }}>
          <IconButton sx={{ bgcolor: 'var(--mui-palette-background-level2)', width: '100%', borderRadius: '4px' }}>
            <Iconify icon="ic:baseline-facebook" width={28} height={28} />
          </IconButton>
        </Grid>
      </Grid>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 3, mb: 1 }}>
        AUTHOR
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        sx={{ bgcolor: 'var(--mui-palette-background-level2)', p: 1.5, borderRadius: '4px' }}
      >
        <Avatar
          variant="square"
          src={author.profile_image ?? undefined}
          alt={author.first_name + ' ' + author.last_name}
          sx={{ width: 56, height: 56, mr: 2, borderRadius: '4px' }}
        />
        <Box>
          <Typography variant="subtitle2" color="text.primaryX" textTransform={'uppercase'}>
            { author.last_name ? author.first_name + ' ' + author.last_name : author.first_name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {author.role}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

const TypographyWithBg = ({ title, value }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent={'space-between'}
      sx={{
        bgcolor: 'var(--mui-palette-background-level2)',
        borderRadius: '4px',
        px: 2,
        py: 1,
        mt: 1,
      }}
    >
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        {value}
      </Typography>
    </Stack>
  );
};
