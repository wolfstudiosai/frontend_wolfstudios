import { Grid2, Card, CardContent, Box, Typography, CardHeader } from "@mui/material";

export default function RevoYoutube({ content }) {
    return (
        <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
            <Card elevation={0} sx={{ height: "100%", borderRadius: 0, border: '1px solid var(--mui-palette-divider)', bgcolor: "background.default" }}>
                <CardHeader title="REVO YouTube" subheader="REVO YouTube Analytics" />
                <CardContent sx={{ p: 3 }}>
                    <Grid2 container spacing={2} sx={{ mb: 3 }}>
                        <Grid2 item xs={6}>
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
                                <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                                    Club REVO
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    {content.YTClubREVOTotalViews || '0'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Views
                                </Typography>
                            </Card>
                        </Grid2>
                        <Grid2 item xs={6}>
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
                                <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                                    Club REVO
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    {content.YTClubREVOTotalLikes || '0'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Likes
                                </Typography>
                            </Card>
                        </Grid2>
                        <Grid2 item xs={6}>
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
                                <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                                    REVOMADIC
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    {content.YTREVOMADICTotalViews || '0'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Views
                                </Typography>
                            </Card>
                        </Grid2>
                        <Grid2 item xs={6}>
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
                                <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                                    REVOMADIC
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    {content.YTREVOMADICTotalLikes || '0'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Likes
                                </Typography>
                            </Card>
                        </Grid2>
                    </Grid2>

                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Club REVO Link
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content.REVOClubrevoYoutube || "Not Available"}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                REVO Link
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content.REVOYoutube || "Not Available"}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                MADIC Comments
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content.YTREVOMADICTotalComments || '0'}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">
                                MADIC Shares
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content.YTREVOMADICTotalShares || '0'}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grid2>
    )
}