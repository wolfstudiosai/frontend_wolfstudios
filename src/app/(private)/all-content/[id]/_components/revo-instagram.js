import { Grid2, Card, CardContent, Box, Typography, CardHeader, Chip } from "@mui/material";

export default function RevoInstagram({ content }) {
    return (
        <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
            <Card elevation={0} variant="outlined" sx={{ height: "100%", border: '1px solid var(--mui-palette-divider)', borderRadius: 0, bgcolor: 'background.default' }}>
                <CardHeader title="REVO Instagram" subheader="Current status of content on REVO Instagram" />
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
                        <Box sx={{ textAlign: "center" }}>
                            <Chip
                                label={content.REVOInstagram}
                                variant="outlined"
                                sx={{
                                    px: 2,
                                    py: 3,
                                    fontSize: "1rem",
                                    mb: 2,
                                }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                Current status of content on REVO Instagram
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grid2>
    )
}