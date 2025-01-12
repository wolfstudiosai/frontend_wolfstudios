import Link from 'next/link';
import { Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { textShortner } from '@/utils/utils';

export const RightCampaignOverview = ({ data }) => {
  return (
    <Box>
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item size={{ xs: 12, md: 4 }} key={index}>
            <SingleCard data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const SingleCard = ({ data }) => {
  return (
    <Box>
      <Paper elevation={1} variant="outlined">
        <Box
          component="img"
          src={`${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${data.thumbnail}`}
          sx={{ height: 200, width: '100%', objectFit: 'cover', border: 0, borderRadius: '5px 5px 0 0' }}
        />
        <Box p={2}>
          <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
            {data.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {textShortner(data.description, 80)}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            Model: {data.model || '-'}
          </Typography>
          <Link
            href={`campaign/${data.slug}`}
            style={{
              fontSize: '0.9rem',
              color: 'var(--mui-palette-text-secondary)',
            }}
          >
            View Campaign
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};
