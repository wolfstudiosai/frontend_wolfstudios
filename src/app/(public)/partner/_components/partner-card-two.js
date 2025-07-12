'use client';

import React from 'react';
import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { IconWithoutText } from '/src/components/utils/icon-text';

import { PartnerRightPanel } from './partner-right-panel';
import { formatCompactNumber } from '/src/utils/helper';

export const PartnerCardTwo = ({ content, fetchList }) => {
  const [openRightPanel, setOpenRightPanel] = React.useState(null);

  console.log(content, 'content from sidebar......');

  return (
    <Box>
      <Card
        elevation={0}
        sx={{
          border: '1px solid var(--mui-palette-divider)',
          overflow: 'hidden',
          boxShadow: 2,
          borderRadius: 0,
          bgcolor: 'background.paper',
          width: { xs: '100%', sm: '350px', md: '380px', lg: '408px' },
          maxWidth: '100%',
        }}
        onClick={() => setOpenRightPanel(content)}
      >
        <Box
          component="img"
          src={content?.thumbnailImage ?? '/assets/image-placeholder.jpg'}
          alt={content?.name}
          sx={{ width: '100%', height: '260px', objectFit: 'cover' }}
        />

        <CardContent sx={{ pt: 2, textAlign: 'center' }}>
          <Typography
            fontWeight="bold"
            sx={{
              fontSize: { xs: '16px', sm: '18px', md: '20px' },
              fontWeight: 700,
              color: 'text.primary',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {content?.name ? content?.name : '....'}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {content?.occupation ? content?.occupation : 'N/A'}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ my: 1.5, height: '32px' }} justifyContent="center">
            {content?.email && (
              <IconWithoutText icon="mage:email" value={content?.email} type={'email'} sx={{ color: '#4267B2' }} />
            )}
            {content?.instagram && (
              <IconWithoutText icon="mdi:instagram" value={content?.instagram} type={'url'} sx={{ color: '#E1306C' }} />
            )}
            {/* {content?.Facebook && (
              <IconWithoutText icon="mdi:facebook" value={content?.Facebook} type={'url'} sx={{ color: '#4267B2' }} />
            )} */}
            {content?.youtube && (
              <IconWithoutText icon="mdi:youtube" value={content?.youtube} type={'url'} sx={{ color: '#FF0000' }} />
            )}
            {content?.linkedin && (
              <IconWithoutText icon="mdi:linkedin" value={content?.linkedin} type={'url'} sx={{ color: '#0077B5' }} />
            )}
            {content?.website && (
              <IconWithoutText icon="mdi:web" value={content?.website} type={'url'} sx={{ color: '#4267B2' }} />
            )}
          </Stack>

          <Divider sx={{ my: 1.5 }} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Audience
              </Typography>
              <Typography variant="h6">
                {content?.totalAudience ? formatCompactNumber(content.totalAudience) : '-'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Credits
              </Typography>
              <Typography variant="h6">
                {content?.remainingCredits ? formatCompactNumber(content.remainingCredits) : '-'}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Rate (h)
              </Typography>
              <Typography variant="h6">
                {content?.hourlyRate ? '$' + formatCompactNumber(content.hourlyRate) : '-'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Views
              </Typography>
              <Typography variant="h6">
                {content?.partnerPostViews ? formatCompactNumber(content.partnerPostViews) : '-'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <PartnerRightPanel
        fetchList={fetchList}
        onClose={() => setOpenRightPanel(null)}
        open={openRightPanel ? true : false}
        data={content}
        view={'QUICK'}
      />
    </Box>
  );
};
