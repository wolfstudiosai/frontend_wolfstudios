import { Grid2, Card, CardContent, Box, Typography, CardHeader, Chip } from "@mui/material";

export default function PartnerTiktok({ content }) {
    return (
        <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
            <Card elevation={0} variant="outlined" sx={{ height: "100%", border: '1px solid var(--mui-palette-divider)', borderRadius: 0, bgcolor: 'background.default' }}>
                <CardHeader title="Partner TikTok" subheader="Current status of content on Partner TikTok" />
                <CardContent sx={{ p: 3 }}>
                    <Grid2 container spacing={2} sx={{ mb: 3 }}>
                        <Grid2 item xs={6} sm={3}>
                            <Card
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    borderRadius: 0,
                                }}
                            >
                                <Typography variant="h5" fontWeight="bold">
                                    {content?.PartnerTTViews}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Views
                                </Typography>
                            </Card>
                        </Grid2>
                        <Grid2 item xs={6} sm={3}>
                            <Card
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    borderRadius: 0,
                                }}
                            >
                                <Typography variant="h5" fontWeight="bold">
                                    {content?.PartnerTTLikes}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Likes
                                </Typography>
                            </Card>
                        </Grid2>
                        <Grid2 item xs={6} sm={3}>
                            <Card
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    borderRadius: 0,
                                }}
                            >
                                <Typography variant="h5" fontWeight="bold">
                                    {content?.PartnerTTComments}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Comments
                                </Typography>
                            </Card>
                        </Grid2>
                        <Grid2 item xs={6} sm={3}>
                            <Card
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    borderRadius: 0,
                                }}
                            >
                                <Typography variant="h5" fontWeight="bold">
                                    {content?.PartnerTTShares}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Shares
                                </Typography>
                            </Card>
                        </Grid2>
                    </Grid2>

                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Saves
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content?.PartnerTTSaves}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Link
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content?.PartnerTikTokLink || "Not Available"}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">
                                Accounts Used
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content?.TikTokAccountsused || "None"}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grid2>
    )
}