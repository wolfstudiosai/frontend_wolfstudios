import Link from 'next/link';
import { textShortner } from '@/utils/utils';
import { Box, Chip, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Iconify } from '@/components/iconify/iconify';
import dayjs from 'dayjs';

export const RightCampaignOverview = ({ data }) => {
  return (
    <Box>
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item size={{ xs: 12, md: 4 }} key={index}>
            <CampaignCard data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const CampaignCard = ({ data }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Paper elevation={1} variant="outlined">
        <Box
          component="img"
          src={`${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${data.thumbnail}`}
          sx={{ height: 200, width: '100%', objectFit: 'cover', border: 0, borderRadius: '5px 5px 0 0' }}
        />
        <Chip size="small" color="secondary" label={data.status} sx={{ position: 'absolute', top: 10, left: 10 }} />
        <Box p={2}>
          <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
            {data.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {textShortner(data.description || '-', 80)}
          </Typography>
          <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
            <Iconify icon="material-symbols:calendar-month" width={14} height={14} sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Start Date: {dayjs(data.start_date).format('MMM D, YYYY')}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
            <Iconify icon="material-symbols:calendar-month" width={14} height={14} sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              End Date: {dayjs(data.end_date).format('MMM D, YYYY')}
            </Typography>
          </Box>
          <Link
            href={`/campaign/${data.slug}`} // Relative path to the campaign
            passHref
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.9rem',
                color: 'var(--mui-palette-text-secondary)',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              View Campaign
            </Typography>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};
