import RouterLink from 'next/link';
import { Iconify } from '/src/components/iconify/iconify';
import { pxToRem, textShortner } from '/src/utils/helper';
import { Box, Card, CardContent, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';

export const LeftCampaignOverview = ({ data }) => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography
        gutterBottom
        sx={{
          fontWeight: 300,
          fontSize: {
            xs: '1.5rem',
            md: '2.4rem',
          },
          lineHeight: 1,
        }}
      >
        Featured Campaign
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        {'Here are the top picks of this week, curated to inform and inspire you.'}
      </Typography>

      {data.map((item) => (
        <FeaturedCampaignCard key={item.id} data={item} />
      ))}
    </Paper>
  );
};

const FeaturedCampaignCard = ({ data }) => {
  return (
    <Card
      component={RouterLink}
      href={`campaign/${data.slug}`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        mb: 2,
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.09)',
        },
      }}
    >
      {/* Left: Campaign Image */}
      <Box
        sx={{
          width: '30%',
          height: '100%',
          minWidth: 120,
          maxWidth: 200,
          mr: 2,
        }}
      >
        <Box
          component="img"
          src={`${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${data.thumbnail}`}
          sx={{ height: pxToRem(100), width: '100%', objectFit: 'cover', border: 0, borderRadius: '5px' }}
        />
      </Box>

      {/* Right: Campaign Details */}
      <Box>
        <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {textShortner(data.description || '--', 80)}
        </Typography>

        <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
          <Iconify icon="material-symbols:calendar-month" width={14} height={14} sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Start Date: {dayjs(data.start_date).format('MMM D, YYYY')}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Iconify icon="material-symbols:calendar-month" width={14} height={14} sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            End Date: {dayjs(data.end_date).format('MMM D, YYYY')}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
