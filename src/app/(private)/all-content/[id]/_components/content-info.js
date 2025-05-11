import { Box, Card, CardContent, Divider, Grid2, Typography, Chip, CardHeader } from "@mui/material";
import { Stack } from "@mui/system";
import { Iconify } from '/src/components/iconify/iconify';

export default function ContentInfo({ content }) {
    return (
        <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
            <Card elevation={0} sx={{ height: "100%", border: '1px solid var(--mui-palette-divider)', borderRadius: 0, bgcolor: 'background.default' }}>
                <CardHeader title="Content Information" subheader="Content details and analytics" />
                <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                Posting Quality
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                {content?.PostingQuality?.map((quality, index) => (
                                    <Chip key={index} label={quality} variant="outlined" size="small" sx={{ mb: 1 }} />
                                ))}
                            </Stack>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                Media
                            </Typography>
                            <Grid2 container spacing={2}>
                                <Grid2 item xs={6}>
                                    <Card elevation={0} variant="outlined" sx={{ p: 1.5, borderRadius: 0 }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <Iconify icon="mdi:image" fontSize="small" color="action" sx={{ mr: 1 }} />
                                                <Typography variant="body2">Images</Typography>
                                            </Box>
                                            <Chip label={content?.Image?.length} size="small" color="primary" variant="outlined" />
                                        </Box>
                                    </Card>
                                </Grid2>
                                <Grid2 item xs={6}>
                                    <Card elevation={0} variant="outlined" sx={{ p: 1.5, borderRadius: 0 }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <Iconify icon="mdi:video" fontSize="small" color="action" sx={{ mr: 1 }} />
                                                <Typography variant="body2">Videos</Typography>
                                            </Box>
                                            <Chip label={content?.Video?.length} size="small" color="primary" variant="outlined" />
                                        </Box>
                                    </Card>
                                </Grid2>
                            </Grid2>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                Links
                            </Typography>
                            <Stack spacing={1}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Iconify icon="mdi:link" fontSize="small" color="action" sx={{ mr: 1 }} />
                                    <Typography variant="body2" noWrap>
                                        Playbook: {content?.PlaybookLink || "N/A"}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Iconify icon="mdi:google-drive" fontSize="small" color="action" sx={{ mr: 1 }} />
                                    <Typography variant="body2" noWrap>
                                        Google Drive: {content?.GoogleDriveFiles || "N/A"}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>

                        <Divider />

                        <Stack spacing={0}>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography color="text.secondary" variant="subtitle2" sx={{ mb: 1 }}>
                                    Campaign Content HQ
                                </Typography>
                                <Typography variant="body2" noWrap>
                                    {content?.ByCampaignsContentHQ?.length > 0 ? content?.ByCampaignsContentHQ?.join(", ") : "None"}
                                </Typography>
                            </Box>

                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography color="text.secondary" variant="subtitle2" sx={{ mb: 1 }}>
                                    City Content
                                </Typography>
                                <Typography variant="body2" noWrap>
                                    {content?.ByCityContent?.length > 0 ? content?.ByCityContent?.join(", ") : "None"}
                                </Typography>
                            </Box>

                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography color="text.secondary" variant="subtitle2" sx={{ mb: 1 }}>
                                    Product Content HQ
                                </Typography>
                                <Typography variant="body2" noWrap>
                                    {content?.ByProductContentHQ?.length > 0 ? content?.ByProductContentHQ?.join(", ") : "None"}
                                </Typography>
                            </Box>

                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography color="text.secondary" variant="subtitle2" sx={{ mb: 1 }}>
                                    Tags Content
                                </Typography>
                                <Typography variant="body2" noWrap>
                                    {content?.ByTagsContent?.length > 0 ? content?.ByTagsContent?.join(", ") : "None"}
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Grid2>
    )
}