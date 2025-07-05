'use client';

import { useState } from 'react';
import { Avatar, Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { IconWithoutText } from '/src/components/utils/icon-text';
import { PartnerRightPanel } from './partner-right-panel';

import { formatCompactNumber } from '/src/utils/helper';

export const PartnerCardTwo = ({ partner, fetchList }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [openPartnerPanel, setOpenPartnerPanel] = useState(null);

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
        onClick={() => {
          setSelectedItemId(partner.id)
          setOpenPartnerPanel(true)
        }}
      >
        {/* Large Profile Image */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <Avatar
            src={partner?.profileImage[0] ? partner?.profileImage[0] : '/src/assets/images/placeholder.png'}
            variant="square"
            p={0}
            sx={{
              width: '100%',
              height: 200,
              p: 0,
              borderRadius: 0,
            }}
          />
        </Box>

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
            {partner?.name ? partner?.name : '....'}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {partner?.occupation ? partner?.occupation : 'N/A'}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ my: 1.5, height: '32px' }} justifyContent="center">
            {partner?.email && (
              <IconWithoutText icon="mage:email" value={partner?.email} type={'email'} sx={{ color: '#4267B2' }} />
            )}
            {partner?.instagram && (
              <IconWithoutText icon="mdi:instagram" value={partner?.instagram} type={'url'} sx={{ color: '#E1306C' }} />
            )}
            {/* {partner?.Facebook && (
              <IconWithoutText icon="mdi:facebook" value={partner?.Facebook} type={'url'} sx={{ color: '#4267B2' }} />
            )} */}
            {partner?.youtube && (
              <IconWithoutText icon="mdi:youtube" value={partner?.youtube} type={'url'} sx={{ color: '#FF0000' }} />
            )}
            {partner?.linkedin && (
              <IconWithoutText icon="mdi:linkedin" value={partner?.linkedin} type={'url'} sx={{ color: '#0077B5' }} />
            )}
            {partner?.website && (
              <IconWithoutText icon="mdi:web" value={partner?.website} type={'url'} sx={{ color: '#4267B2' }} />
            )}
          </Stack>

          <Divider sx={{ my: 1.5 }} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Audience
              </Typography>
              <Typography variant="h6">
                {partner?.totalAudience ? formatCompactNumber(partner.totalAudience) : '-'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Credits
              </Typography>
              <Typography variant="h6">
                {partner?.remainingCredits ? formatCompactNumber(partner.remainingCredits) : '-'}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Rate (h)
              </Typography>
              <Typography variant="h6">
                {partner?.hourlyRate ? '$' + formatCompactNumber(partner.hourlyRate) : '-'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Views
              </Typography>
              <Typography variant="h6">
                {partner?.partnerPostViews ? formatCompactNumber(partner.partnerPostViews) : '-'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Right Panel Component */}
      {openPartnerPanel && (
        <PartnerRightPanel
          onClose={() => {
            setSelectedItemId(null)
            setOpenPartnerPanel(false)
          }}
          fetchList={fetchList}
          id={selectedItemId}
          open={openPartnerPanel}
        />
      )}
    </Box>
  );
};
