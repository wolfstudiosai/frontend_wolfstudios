import { Grid2, Card, CardContent, Box, Typography } from "@mui/material";
import { Iconify } from '/src/components/iconify/iconify';

export default function PartnerInstagram({ content }) {
    return (
        <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
            <Card elevation={0} variant="outlined" sx={{ height: "100%", border: '1px solid var(--mui-palette-divider)', borderRadius: 0, bgcolor: 'background.default' }}>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6">Partner Instagram</Typography>
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
                                    borderRadius: 0,
                                }}
                            >
                                {/* <Visibility color="action" sx={{ mb: 1 }} /> */}
                                <Typography variant="h5" fontWeight="bold">
                                    {content.IGTotalViews}
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
                                {/* <Favorite color="action" sx={{ mb: 1 }} /> */}
                                <Typography variant="h5" fontWeight="bold">
                                    {content.IGTotalLikes}
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
                                {/* <Comment color="action" sx={{ mb: 1 }} /> */}
                                <Typography variant="h5" fontWeight="bold">
                                    {content.IGTotalComments}
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
                                {/* <Share color="action" sx={{ mb: 1 }} /> */}
                                <Typography variant="h5" fontWeight="bold">
                                    {content.IGTotalShares}
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
                                Link
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content.PartnerIGLink || "Not Available"}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">
                                Social Sets Used
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content.IGSocialSetsUsed || "None"}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grid2>
    )
}
