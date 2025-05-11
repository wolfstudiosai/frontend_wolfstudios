import { Grid2, Card, CardContent, Box, CardHeader, Stack, Typography, Divider, Chip } from "@mui/material";
export default function PlatformStatus({ content }) {
    return (
        <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
            <Card elevation={0} sx={{ height: "100%", border: '1px solid var(--mui-palette-divider)', borderRadius: 0, bgcolor: 'background.default' }}>
                <CardHeader title="Platform Status" subheader="Platform status and performance" />
                <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                        <Grid2 container spacing={2}>
                            <Grid2 item xs={6}>
                                <Card variant="outlined" sx={{ p: 1.5, borderRadius: 0 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        Instagram
                                    </Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                        {content?.REVOInstagram || "Not Set"}
                                    </Typography>
                                </Card>
                            </Grid2>
                            <Grid2 item xs={6}>
                                <Card variant="outlined" sx={{ p: 1.5, borderRadius: 0 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        TikTok
                                    </Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                        {content?.REVOTikTok || "Not Set"}
                                    </Typography>
                                </Card>
                            </Grid2>
                            <Grid2 item xs={6}>
                                <Card variant="outlined" sx={{ p: 1.5, borderRadius: 0 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        YouTube
                                    </Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                        {content?.REVOYoutube || "Not Set"}
                                    </Typography>
                                </Card>
                            </Grid2>
                            <Grid2 item xs={6}>
                                <Card variant="outlined" sx={{ p: 1.5, borderRadius: 0 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        Pinterest
                                    </Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                        {content?.REVOPinterest || "Not Set"}
                                    </Typography>
                                </Card>
                            </Grid2>
                        </Grid2>

                        <Divider />

                        <Box>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                Associations
                            </Typography>
                            <Stack spacing={1}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        By City
                                    </Typography>
                                    <Typography variant="body2">{content?.ByCityContent?.length || 0}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        By Tags
                                    </Typography>
                                    <Typography variant="body2">{content?.ByTagsContent?.length || 0}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        By Product
                                    </Typography>
                                    <Typography variant="body2">{content?.ByProductContentHQ?.length || 0}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        By Campaigns
                                    </Typography>
                                    <Typography variant="body2">{content?.ByCampaignsContentHQ?.length || 0}</Typography>
                                </Box>
                            </Stack>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                Conversion
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="body2" color="text.secondary">
                                    Up Promote
                                </Typography>
                                <Chip label={content?.UpPromoteConversion || 0} size="small" color="primary" />
                            </Box>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Grid2>
    )
}