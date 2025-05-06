import { Box, Stack, Typography } from '@mui/material';
import { IconWithoutText } from '/src/components/utils/icon-text';

export const LeftPartnerAnalytics = ({ partner }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, padding: { xs: 3, md: 2 } }}>
            <Box component={'img'} src={partner?.ProfileImage.length ? partner.ProfileImage[0] : "/assets/avatar-1.png"} sx={{ borderRadius: 0.5, width: "100%" }} />
            <Typography sx={{ fontSize: '2rem', fontWeight: 300 }}>{partner?.Name ? partner.Name : '....'}</Typography>

            <Typography variant="body1" color="text.secondary" gutterBottom>
                {partner?.Occupation ? partner.Occupation : 'N/A'}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ my: 1, height: '32px' }} justifyContent="center">
                {partner?.Email && (
                    <IconWithoutText icon="mage:email" value={partner?.Email} type={'email'} sx={{ color: '#4267B2' }} />
                )}
                {partner?.Instagram && (
                    <IconWithoutText icon="mdi:instagram" value={partner?.Instagram} type={'url'} sx={{ color: '#E1306C' }} />
                )}

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
        </Box>
    );
};