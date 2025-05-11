import { Box, Card, CardContent, Chip, Stack, Typography, CardHeader, Grid2 } from "@mui/material";
import { Iconify } from '/src/components/iconify/iconify';

export default function ContentOverview({ content }) {
    return (
        <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
            <Card elevation={0} sx={{ height: "100%", border: '1px solid var(--mui-palette-divider)', borderRadius: 0, bgcolor: 'background.default' }}>
                <CardHeader title="Content Overview" subheader="Overview of the content" />
                <CardContent sx={{ p: 3 }}>
                    <Stack spacing={1}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Name
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content?.Name || "Not Available"}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Creator Status
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content?.CreatorStatus || "Not Available"}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Asset Status
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content?.AssetStatus || "Not Available"}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Posting Status
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content?.PostingStatus || "Not Available"}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Month Uploaded
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {content?.MonthUploaded || "Not Available"}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Grid2>
    );
}