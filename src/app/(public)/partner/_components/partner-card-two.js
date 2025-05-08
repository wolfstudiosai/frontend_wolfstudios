'use client';

import { useState } from 'react';
import { Avatar, Box, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';

import { IconWithoutText } from '/src/components/utils/icon-text';

import { ManagePartnerRightPanel } from './manage-partner-right-panel';
import { formatCompactNumber } from '/src/utils/helper';

export const PartnerCardTwo = ({ partner, fetchList }) => {
  const [openPartnerRightPanel, setOpenPartnerRightPanel] = useState(null);

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
        onClick={() => setOpenPartnerRightPanel(partner)}
      >
        {/* Large Profile Image */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
          <Avatar
            src={partner.ProfileImage[0]}
            variant="square"
            sx={{
              width: 120,
              height: 120,
              border: '4px solid white',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
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
            {partner.Name ? partner.Name : '....'}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {partner?.Occupation ? partner.Occupation : 'N/A'}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ my: 1.5, height: '32px' }} justifyContent="center">
            {partner?.Email && (
              <IconWithoutText icon="mage:email" value={partner?.Email} type={'email'} sx={{ color: '#4267B2' }} />
            )}
            {partner?.Instagram && (
              <IconWithoutText icon="mdi:instagram" value={partner?.Instagram} type={'url'} sx={{ color: '#E1306C' }} />
            )}
            {/* {partner?.Facebook && (
              <IconWithoutText icon="mdi:facebook" value={partner?.Facebook} type={'url'} sx={{ color: '#4267B2' }} />
            )} */}
            {partner?.Youtube && (
              <IconWithoutText icon="mdi:youtube" value={partner?.Youtube} type={'url'} sx={{ color: '#FF0000' }} />
            )}
            {partner?.LinkedIn && (
              <IconWithoutText icon="mdi:linkedin" value={partner?.LinkedIn} type={'url'} sx={{ color: '#0077B5' }} />
            )}
            {partner?.Website && (
              <IconWithoutText icon="mdi:web" value={partner?.Website} type={'url'} sx={{ color: '#4267B2' }} />
            )}
          </Stack>

          <Divider sx={{ my: 1.5 }} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Audience
              </Typography>
              <Typography variant="h6">
                {partner?.TotalAudience ? formatCompactNumber(partner.TotalAudience) : '-'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Credits
              </Typography>
              <Typography variant="h6">
                {partner?.RemainingCredits ? formatCompactNumber(partner.RemainingCredits) : '-'}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Rate (h)
              </Typography>
              <Typography variant="h6">
                {partner?.HourlyRate ? '$' + formatCompactNumber(partner.HourlyRate) : '-'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Views
              </Typography>
              <Typography variant="h6">
                {partner?.PartnerPostViews ? formatCompactNumber(partner.PartnerPostViews) : '-'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Right Panel Component */}
      <ManagePartnerRightPanel
        view="QUICK"
        fetchList={fetchList}
        open={openPartnerRightPanel ? true : false}
        data={openPartnerRightPanel}
        onClose={() => setOpenPartnerRightPanel(false)}
      />
    </Box>
  );
};
