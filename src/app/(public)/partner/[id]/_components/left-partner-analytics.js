import { Avatar, Box, Card, CardContent, Chip, Divider, Grid2, Stack, Typography } from '@mui/material';

import { Iconify } from '/src/components/iconify/iconify';
import { IconWithoutText } from '/src/components/utils/icon-text';

import { formatCompactNumber } from '/src/utils/helper';

export const LeftPartnerAnalytics = ({ partner }) => {


  return (
    <Grid2 item xs={12} md={4}>
      <Card elevation={0} sx={{ borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
            <Box
              component={'img'}
              src={partner?.thumbnailImage || '/assets/avatar-1.png'}
              sx={{ borderRadius: 0.5, width: '100%', mb: 2, objectFit: 'cover' }}
            />
            <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
              {partner?.name ? partner?.name : 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {partner?.occupation ? partner?.occupation : 'N/A'}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{ mb: 3, mt: 1, justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}
            >
              {partner?.profileStatus?.map((status, i) => (
                <Chip key={i} label={status} variant="outlined" size="small" />
              ))}
              {partner?.currentStatus?.map((status, i) => (
                <Chip key={i} label={status} color="primary" size="small" />
              ))}
            </Stack>

            <Divider sx={{ width: '100%', mb: 2 }} />

            <Stack spacing={1} width="100%">
              <Stack direction="row" spacing={2}>
                <Iconify icon="mage:email" />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                >
                  {partner?.email ? partner?.email : 'N/A'}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Iconify icon="mage:phone" />
                <Typography variant="body2" color="text.secondary">
                  {partner?.phone ? partner?.phone : 'N/A'}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Iconify icon="mdi:location" />
                <Typography variant="body2" color="text.secondary">
                  {partner?.cities?.map((city) => city).join(', ') || 'N/A'}
                </Typography>
              </Stack>
            </Stack>

            <Divider sx={{ width: '100%', my: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              Social Media
            </Typography>

            <Stack direction="row" spacing={2} sx={{ my: 1.5, height: '32px' }} justifyContent="center">
              {partner?.instagram && (
                <IconWithoutText
                  icon="mage:instagram"
                  value={partner?.instagram}
                  type={'url'}
                  sx={{ color: '#E1306C' }}
                />
              )}
              {partner?.Facebook && (
                <IconWithoutText
                  icon="mage:facebook"
                  value={partner?.Facebook}
                  type={'url'}
                  sx={{ color: '#4267B2' }}
                />
              )}
              {partner?.youtube && (
                <IconWithoutText icon="mage:youtube" value={partner?.youtube} type={'url'} sx={{ color: '#FF0000' }} />
              )}
              {partner?.tiktok && (
                <IconWithoutText icon="mage:tiktok" value={partner?.tiktok} type={'url'} sx={{ color: '#69C9D0' }} />
              )}
              {partner?.x && <IconWithoutText icon="mage:x" value={partner?.x} type={'url'} sx={{ color: '#000' }} />}
              {partner?.linkedin && (
                <IconWithoutText
                  icon="mage:linkedin"
                  value={partner?.linkedin}
                  type={'url'}
                  sx={{ color: '#0077B5' }}
                />
              )}
              {partner?.pinterest && (
                <IconWithoutText
                  icon="mage:pinterest"
                  value={partner?.pinterest}
                  type={'url'}
                  sx={{ color: '#BD081C' }}
                />
              )}
            </Stack>

            <Box sx={{ mt: 2, width: '100%' }}>
              <Typography variant="subtitle2" gutterBottom>
                Total Audience
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {partner?.totalAudience ? formatCompactNumber(partner.totalAudience) : '-'}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid2>
  );
};
