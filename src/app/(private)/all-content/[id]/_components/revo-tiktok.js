import { Grid2, Card, CardContent, Box, Typography, CardHeader, Chip } from "@mui/material";

export default function RevoTiktok({ content }) {
    return (
        <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
            <Card elevation={0} variant="outlined" sx={{ height: "100%", border: '1px solid var(--mui-palette-divider)', borderRadius: 0, bgcolor: 'background.default' }}>
                <CardHeader title="REVO TikTok" subheader="Current status of content on REVO TikTok" />
                <CardContent sx={{ p: 3 }}>

                    <Box sx={{ mb: 3 }}>
                        <Card
                            variant="outlined"
                            sx={{
                                p: 3,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                borderRadius: 0,
                            }}
                        >

                            <Typography variant="h4" fontWeight="bold">
                                {content?.REVOTTViews || 0}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Total Views
                            </Typography>
                        </Card>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Link
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content?.REVOTikTok || "Not Available"}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" color="text.secondary">
                                Dummy Accounts
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content?.TTDummyAccountsUsed?.length > 0 ? content.TTDummyAccountsUsed.join(", ") : "None"}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grid2>
    )
}