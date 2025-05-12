import { Grid2, Card, CardContent, CardHeader, Stack, Box, Typography } from "@mui/material";

export default function CampaignAssociations({ campaign }) {
    return (
        <Grid2 item size={{ xs: 12, md: 6 }}>
            <Card elevation={0} sx={{ height: "100%", borderRadius: 0, bgcolor: 'background.default', border: '1px solid var(--mui-palette-divider)', }}>
                <CardHeader title="Campaign Associations" subheader="Campaign Associations Details" />
                <CardContent>
                    <Stack spacing={1}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Proposed Partners
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {campaign?.ByCampaignsProposedPartners?.map((item) => item?.ProposedPartners?.Name).join(", ") || "N/A"}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Retail Partners
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {campaign?.ByCampaignsRetailPartners?.map((item) => item?.RetailPartners?.Name).join(", ") || "N/A"}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Spaces
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {campaign?.ByCampaignsSpaces?.map((item) => item?.Spaces?.Name).join(", ") || "N/A"}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Stakeholders
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {campaign?.ByCampaignsStakeholders?.map((item) => item?.Stakeholders?.Name).join(", ") || "N/A"}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Notes
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {campaign?.Notes || "N/A"}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="subtitle2" gutterBottom color="text.secondary">
                                Guidelines
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {campaign?.Guidelines || "N/A"}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Grid2>
    );
}