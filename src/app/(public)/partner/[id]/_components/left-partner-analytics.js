
import { Box, Stack, Typography, Grid2, Card, CardContent, Divider, Avatar, Chip } from '@mui/material';
import { IconWithoutText } from '/src/components/utils/icon-text';
import { Iconify } from '/src/components/iconify/iconify';
import { formatCompactNumber } from '/src/utils/helper';

export const LeftPartnerAnalytics = ({ partner }) => {
    return (
        <Grid2 item xs={12} md={4}>
            <Card elevation={0} sx={{ borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                <CardContent sx={{ p: 3 }}>
                    <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                        <Box component={'img'} src={partner?.ProfileImage?.[0] || "/assets/avatar-1.png"} sx={{ borderRadius: 0.5, width: "100%", mb: 2 }} />
                        <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
                            {partner?.Name ? partner?.Name : "N/A"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {partner?.Occupation ? partner?.Occupation : "N/A"}
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ mb: 3, mt: 1, justifyContent: "center", flexWrap: "wrap", gap: 1 }}
                        >
                            {partner?.ProfileStatus?.map((status, i) => (
                                <Chip key={i} label={status} variant="outlined" size="small" />
                            ))}
                            {partner?.CurrentStatus?.map((status, i) => (
                                <Chip key={i} label={status} color="primary" size="small" />
                            ))}
                        </Stack>

                        <Divider sx={{ width: "100%", mb: 2 }} />

                        <Stack spacing={1} width="100%">
                            <Stack direction="row" spacing={2}>
                                <Iconify icon="mage:email" />
                                <Typography variant="body2" color="text.secondary" sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                                    {partner?.Email ? partner?.Email : "N/A"}
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Iconify icon="mage:phone" />
                                <Typography variant="body2" color="text.secondary">
                                    {partner?.Phone ? partner?.Phone : "N/A"}
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Iconify icon="mdi:location" />
                                <Typography variant="body2" color="text.secondary">
                                    {partner?.ByCityPartnerHQ?.[0]?.ByCity?.Name ? partner?.ByCityPartnerHQ?.[0]?.ByCity?.Name : "N/A"}
                                </Typography>
                            </Stack>
                        </Stack>

                        <Divider sx={{ width: "100%", my: 2 }} />

                        <Typography variant="subtitle2" gutterBottom>
                            Social Media
                        </Typography>

                        <Stack direction="row" spacing={2} sx={{ my: 1.5, height: '32px' }} justifyContent="center">
                            {partner?.Instagram && (
                                <IconWithoutText icon="mage:instagram" value={partner?.Instagram} type={'url'} sx={{ color: '#E1306C' }} />
                            )}
                            {partner?.Facebook && (
                                <IconWithoutText icon="mage:facebook" value={partner?.Facebook} type={'url'} sx={{ color: '#4267B2' }} />
                            )}
                            {partner?.Youtube && (
                                <IconWithoutText icon="mage:youtube" value={partner?.Youtube} type={'url'} sx={{ color: '#FF0000' }} />
                            )}
                            {partner?.Tiktok && (
                                <IconWithoutText icon="mage:tiktok" value={partner?.Tiktok} type={'url'} sx={{ color: '#69C9D0' }} />
                            )}
                            {partner?.X && (
                                <IconWithoutText icon="mage:x" value={partner?.X} type={'url'} sx={{ color: '#000' }} />
                            )}
                            {partner?.LinkedIn && (
                                <IconWithoutText icon="mage:linkedin" value={partner?.LinkedIn} type={'url'} sx={{ color: '#0077B5' }} />
                            )}
                            {partner?.Pinterest && (
                                <IconWithoutText icon="mage:pinterest" value={partner?.Pinterest} type={'url'} sx={{ color: '#BD081C' }} />
                            )}

                        </Stack>

                        <Box sx={{ mt: 2, width: "100%" }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Total Audience
                            </Typography>
                            <Typography variant="h4" fontWeight="bold" color="primary">
                                {partner?.TotalAudience ? formatCompactNumber(partner.TotalAudience) : '-'}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grid2>
    );
};