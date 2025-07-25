'use client';

import { Assessment, AttachMoney, Flag, People } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { A11y, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { SliderWrapper } from '/src/components/slider/slider-wrapper';

import { formatCompactNumber } from '../../../../utils/helper';
import { isVideoContent, pxToRem } from '/src/utils/helper';
import useAuth from '/src/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const CampaignQuickView = ({ data, isEdit, onUpdate }) => {
  const { isLogin } = useAuth();
  const router = useRouter()
  const mediaArr = [
    ...(data?.imageInspirationGallery || []),
    ...(data?.videoInspirationGallery || []),
    ...(data?.campaignImage || []),
    data?.thumbnailImage,
  ];
  const budgetUsed = data.budget === 0 ? 0 : (data.totalExpense / data.budget) * 100;
  const remainingBudget = data.budget - data.totalExpense;

  const handleJoin = () => {
    if (!isLogin) {
      toast.error('Please login to join the campaign');
      router.push('/auth/sign-in');
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        mb={1}
        p={2}
        width="100%"
        sx={{ position: 'sticky', top: 0, left: 0, backgroundColor: 'var(--mui-palette-background-paper)', zIndex: 2 }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {data?.name || 'Untitled'} <Chip color="primary" label={data?.campaignStatus || 'Draft'} size="small" />
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {data?.campaignDescription || 'No description available.'}
            </Typography>
          </Box>
          <Button variant="contained" onClick={handleJoin}>Join</Button>
        </Stack>
      </Box>

      <Box p={2} backgroundColor="var(--mui-palette-background-paper)">
        <SliderWrapper
          modules={[Navigation, SwiperPagination, Scrollbar, A11y]}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          pauseOnHover
          spaceBetween={4}
        >
          {mediaArr.length > 0 ? (
            mediaArr?.map((item, index) => (
              <SwiperSlide key={index}>
                {isVideoContent(item) ? (
                  <Box
                    component="video"
                    src={item}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    sx={{
                      height: pxToRem(500),
                      width: '100%',
                      objectFit: 'contain',
                      border: '1px solid var(--mui-palette-divider)',
                    }}
                  />
                ) : (
                  <Box
                    component="img"
                    src={item || '/assets/image-placeholder.jpg'}
                    sx={{
                      height: pxToRem(500),
                      width: '100%',
                      objectFit: 'contain',
                      border: '1px solid var(--mui-palette-divider)',
                    }}
                  />
                )}
              </SwiperSlide>
            ))
          ) : (
            <Typography>No media available!</Typography>
          )}
        </SliderWrapper>
      </Box>

      {/* Campaign Overview */}
      <Paper elevation={0} sx={{ p: 3, my: 1, borderRadius: 0.5 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Assessment sx={{ mr: 1 }} />
          Campaign Overview
        </Typography>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default' }}>
              <Typography variant="h4" sx={{ color: 'primary', fontWeight: 700 }}>
                {formatCompactNumber(data.budget)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'primary' }}>
                Total Budget
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default' }}>
              <Typography variant="h4" sx={{ color: 'warning', fontWeight: 700 }}>
                {formatCompactNumber(data.totalExpense)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'warning' }}>
                Total Spent
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default' }}>
              <Typography variant="h4" sx={{ color: 'success', fontWeight: 700 }}>
                {formatCompactNumber(data.campaignROI)}x
              </Typography>
              <Typography variant="body2" sx={{ color: 'success' }}>
                ROI
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.default' }}>
              <Typography variant="h4" sx={{ color: 'info', fontWeight: 700 }}>
                {formatCompactNumber(data.totalContentEngagement)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'info' }}>
                Engagement
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Financial Breakdown */}
      <Paper elevation={0} sx={{ p: 3, mb: 2, borderRadius: 0.5 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <AttachMoney sx={{ mr: 1 }} />
          Financial Breakdown
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Budget Utilization</Typography>
            <Typography variant="body1" fontWeight="bold">
              {budgetUsed.toFixed(1)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={budgetUsed}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 6,
                background: 'primary.main',
              },
            }}
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: 'transparent !important' }}>Category</TableCell>
                <TableCell align="right" sx={{ backgroundColor: 'transparent !important' }}>
                  Amount
                </TableCell>
                <TableCell align="right" sx={{ backgroundColor: 'transparent !important' }}>
                  Percentage
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Total Budget</TableCell>
                <TableCell align="right">{formatCompactNumber(data.budget)}</TableCell>
                <TableCell align="right">100%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Expense</TableCell>
                <TableCell align="right">{formatCompactNumber(data.totalExpense)}</TableCell>
                <TableCell align="right">{budgetUsed.toFixed(1)}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Product Expense</TableCell>
                <TableCell align="right">{formatCompactNumber(data.productExpense)}</TableCell>
                <TableCell align="right">{((data.productExpense / data.budget) * 100).toFixed(1)}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Remaining Budget</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  {formatCompactNumber(remainingBudget)}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  {(100 - budgetUsed).toFixed(1)}%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Campaign Goals */}
      <Paper elevation={0} sx={{ p: 3, mb: 2, borderRadius: 0.5 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Flag sx={{ mr: 1 }} />
          Campaign Goals & Guidelines
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {data?.campaignGoals?.map((goal, index) => (
              <Chip key={index} label={goal} variant="outlined" />
            ))}
          </Stack>
        </Box>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Guidelines
          </Typography>
          <Typography variant="body1" sx={{ p: 2, borderRadius: 1 }}>
            {data?.campaignGuidelines || 'No guidelines available.'}
          </Typography>
        </Box>
      </Paper>

      {/* Team & Stakeholders */}
      <Paper elevation={0} sx={{ p: 3, mb: 2, borderRadius: 0.5 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <People sx={{ mr: 1 }} />
          Team & Stakeholders
        </Typography>

        <Box>
          <Typography variant="subtitle1">Stakeholders ({data?.stakeholders?.length})</Typography>
          <List dense>
            {data?.stakeholders?.map((stakeholder) => (
              <ListItem key={stakeholder.id} sx={{ p: 0 }}>
                <ListItemText
                  primary={stakeholder.name}
                  slotProps={{
                    primary: {
                      color: 'text.secondary',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box>
          <Typography variant="subtitle1">Content HQ ({data?.contentHQ?.length})</Typography>
          <List dense>
            {data?.contentHQ?.map((content) => (
              <ListItem key={content.id} sx={{ p: 0 }}>
                <ListItemText
                  primary={content.name}
                  slotProps={{
                    primary: {
                      color: 'text.secondary',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box>
          <Typography variant="subtitle1">Production HQ ({data?.productionHQ?.length})</Typography>
          <List dense>
            {data?.productionHQ?.map((production) => (
              <ListItem key={production.id} sx={{ p: 0 }}>
                <ListItemText
                  primary={production.name}
                  slotProps={{
                    primary: {
                      color: 'text.secondary',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box>
          <Typography variant="subtitle1">Proposed Partner ({data?.proposedPartners?.length})</Typography>
          <List dense>
            {data?.proposedPartners?.map((partner) => (
              <ListItem key={partner.id} sx={{ p: 0 }}>
                <ListItemText
                  primary={partner.name}
                  slotProps={{
                    primary: {
                      color: 'text.secondary',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box>
          <Typography variant="subtitle1">Contributed Partner ({data?.contributedPartners?.length})</Typography>
          <List dense>
            {data?.contributedPartners?.map((partner) => (
              <ListItem key={partner.id} sx={{ p: 0 }}>
                <ListItemText
                  primary={partner.name}
                  slotProps={{
                    primary: {
                      color: 'text.secondary',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box>
          <Typography variant="subtitle1">Spaces ({data?.spaces?.length})</Typography>
          <List dense>
            {data?.spaces?.map((space) => (
              <ListItem key={space.id} sx={{ p: 0 }}>
                <ListItemText
                  primary={space.name}
                  slotProps={{
                    primary: {
                      color: 'text.secondary',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
  );
};
