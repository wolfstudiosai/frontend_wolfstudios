import { Grid2, Card, CardHeader, CardContent, Stack, Typography, Box } from "@mui/material";

export default function FinancialInfo({ campaign }) {
    return (
        <Grid2 item size={{ xs: 12, md: 6 }}>
            <Card elevation={0} sx={{ height: "100%", borderRadius: 0, bgcolor: 'background.default', border: '1px solid var(--mui-palette-divider)', }}>
                <CardHeader title="Financial Info" subheader="Financial Info Details" />
                <CardContent>
                    <Stack spacing={1}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Campaign Budget
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {campaign?.Budget || "N/A"}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Campaign ROI
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {campaign?.CampaignROI || "N/A"}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Campaign Total Expense
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {campaign?.TotalExpense || "N/A"}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Campaign Total Content Engagement
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {campaign?.TotalContentEngagement || "N/A"}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Grid2>
    );
}