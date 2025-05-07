import { Box, Card, CardContent, CardHeader, Chip, Grid2, Paper, Stack, Typography } from '@mui/material';
import { Iconify } from '/src/components/iconify/iconify';

export default function CampaignDetails({ partner }) {
    return (
        <Grid2 item size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: "100%", borderRadius: 0, bgcolor: '#fff', border: '1px solid var(--mui-palette-divider)', }}>
                <CardHeader title="Campaign Details" subheader="Proposed campaigns and products" />
                <CardContent>
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Proposed Campaigns
                            </Typography>
                            {partner?.ByCampaignsProposedPartners?.length > 0 ? (
                                <Stack spacing={1}>
                                    {partner?.ByCampaignsProposedPartners?.map((campaign, index) => (
                                        <Box key={index} display="flex" alignItems="center" gap={1}>
                                            <Iconify icon="mdi:calendar-blank-outline" />
                                            <Typography variant="body2">{campaign.ByCampaigns.Name}</Typography>
                                        </Box>

                                    ))}
                                </Stack>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    No campaigns proposed
                                </Typography>
                            )}
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Products
                            </Typography>
                            {partner?.ByProductPartnerHQ?.length > 0 ? (
                                <Stack spacing={1}>
                                    {partner?.ByProductPartnerHQ?.map((product, index) => (
                                        <Box key={index} display="flex" alignItems="center" gap={1}>
                                            <Iconify icon="mdi:shopping-outline" />
                                            <Typography variant="body2">{product.ByProduct.Name}</Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    No products assigned
                                </Typography>
                            )}
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Campign Month
                            </Typography>
                            <Typography variant="body2">
                                {partner?.CampaignMonth.length > 0 ? partner?.CampaignMonth?.map((month, index) => (
                                    <Box key={index} display="flex" alignItems="center" gap={1}>
                                        <Iconify icon="mdi:calendar-blank-outline" />
                                        <Typography variant="body2">{month}</Typography>
                                    </Box>
                                )) : 'N/A'}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Tags
                            </Typography>
                            <Box display="flex" flexWrap="wrap" gap={1}>
                                {partner?.Tags?.length > 0 ? partner?.Tags?.map((tag, i) => (
                                    <Chip
                                        key={i}
                                        label={tag?.Name}
                                        size="small"
                                        icon={<Iconify icon="mdi:tag-outline" fontSize="small" />}
                                        sx={{ backgroundColor: theme.palette.grey[100] }}
                                    />
                                )) : (
                                    <Typography variant="body2" color="text.secondary">
                                        No tags assigned
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Grid2>
    );
}