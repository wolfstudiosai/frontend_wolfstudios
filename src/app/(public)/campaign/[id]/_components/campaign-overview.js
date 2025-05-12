import { Grid2, Box, Card, CardHeader, CardContent, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

export default function CampaignOverview({ campaign }) {
    return (
        <Grid2 item size={{ xs: 12, md: 6 }}>
            <Card elevation={0} sx={{ height: "100%", borderRadius: 0, bgcolor: 'background.default', border: '1px solid var(--mui-palette-divider)', }}>
                <CardHeader title="Campaign Overview" subheader="Campaign Overview Details" />
                <CardContent>
                    <Stack spacing={1}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Campaign Name
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {campaign?.Name || "N/A"}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Client
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {campaign?.Client || "N/A"}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Campaign Description
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {campaign?.CampaignDescription || "N/A"}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Campaign Goals
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {campaign?.CampaignGoals?.join(", ") || "N/A"}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Start Date
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {campaign?.StartDate ? dayjs(campaign?.StartDate).format("YYYY-MM-DD") : "N/A"}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                End Date
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {campaign?.EndDate ? dayjs(campaign?.EndDate).format("YYYY-MM-DD") : "N/A"}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Grid2>
    );
}