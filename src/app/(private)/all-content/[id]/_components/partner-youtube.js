import { Grid2, Card, CardContent, Box, Typography, CardHeader } from "@mui/material";
import { Iconify } from '/src/components/iconify/iconify';

export default function PartnerYoutube({ content }) {
    return (
        <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
            <Card elevation={0} sx={{ height: "100%", border: '1px solid var(--mui-palette-divider)', borderRadius: 0, bgcolor: 'background.default' }}>
                <CardHeader title="Partner YouTube" subheader="Partner YouTube Analytics" />
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6">Partner YouTube</Typography>
                    </Box>

                    <Grid2 container spacing={2} sx={{ mb: 3 }}>
                        <Grid2 item xs={6} sm={3}>
                            <Card
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    borderRadius: 0
                                }}
                            >

                                <Typography variant="h5" fontWeight="bold">
                                    {content.YTPartnerTotalViews || '0'}
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
                                    borderRadius: 0
                                }}
                            >

                                <Typography variant="h5" fontWeight="bold">
                                    {content.YTPartnerTotallikes || '0'}
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
                                    borderRadius: 0
                                }}
                            >
                                <Typography variant="h5" fontWeight="bold">
                                    {content.YTPartnerTotalcomments || '0'}
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
                                    borderRadius: 0
                                }}
                            >
                                <Typography variant="h5" fontWeight="bold">
                                    {content.YTPartnerTotalSaves || '0'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Saves
                                </Typography>
                            </Card>
                        </Grid2>
                    </Grid2>

                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Link
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content.PartnerYTLink || "Not Available"}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">
                                Accounts Used
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content.YTAccountsUsed || "None"}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grid2>
    )
}