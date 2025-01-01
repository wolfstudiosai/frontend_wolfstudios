import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { TotalContributedEngagement } from "./total-contributed-engagement";
import { IgViewsByPost } from "@/components/dashboard/analytics/ig-views-by-post";
import { NumberOfAssestsByCampaign } from "./number-of-assests-by-campaign";
import { PercentOfAssetsByProduct } from "./percent-of-assets-by-product";
import { colorPalette } from "../page";

export const ContentPerformance = () => {
    return (
        <Stack spacing={4}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
                <Box sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h4">Content Performance</Typography>
                </Box>
            </Stack>
            <Grid container spacing={4}>
                {/* Total Contributed Engagement by Post Over 20K */}
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <TotalContributedEngagement
                        data={[
                            {
                                name: 'Alex Siquig Outdoor Workout 6',
                                campaign: "REVO massage gun",
                                sum: 92609,
                                total: 92609,
                                color: colorPalette[0],
                            },
                            {
                                name: 'Alex Siquig Outdoor Workout 6',
                                campaign: "REVO UGC ARMY",
                                sum: 3990,
                                total: 31609,
                                color: colorPalette[1]
                            },
                            {
                                name: 'Alex Siquig Outdoor Workout 6',
                                campaign: "REVO Walking Pad",
                                sum: 3990,
                                total: 21609,
                                color: colorPalette[3]
                            },
                            {
                                name: 'Alex Siquig Outdoor Workout 6',
                                campaign: "50 Review Challenge",
                                sum: 3990,
                                total: 41609,
                                color: colorPalette[4]
                            },
                            {
                                name: 'Alex Siquig Outdoor Workout 6',
                                campaign: "50 Review Challenge",
                                sum: 3990,
                                total: 21609,
                                color: colorPalette[5]
                            },
                            {
                                name: 'Publish fazly posts',
                                campaign: "50 Review Challenge 2",
                                sum: 3990,
                                total: 41609,
                                color: colorPalette[6]
                            },
                            {
                                name: 'Sarah Louise Rector Walking Pad',
                                campaign: "REVO Cupper",
                                sum: 13990,
                                total: 13990,
                                color: colorPalette[7]
                            },
                            {
                                name: 'Roen Gjoka',
                                campaign: "REVO Cupper",
                                sum: 23990,
                                total: 23990,
                                color: colorPalette[8]
                            },
                            {
                                name: 'Kiana Daigneault The Pill 1 - 2',
                                campaign: "REVO Cupper",
                                sum: 53990,
                                total: 53990,
                                color: colorPalette[9]
                            },
                        ]}
                    />
                </Grid>

                {/* Over 20,000 IG Views by Post */}
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <IgViewsByPost
                        data={[
                            {
                                name: 'Alex Siquig Outdoor Workout 6',
                                campaign: "REVO massage gun",
                                sum: 92609,
                                total: 92609,
                                color: colorPalette[0],
                            },
                            {
                                name: 'Alex Siquig Outdoor Workout 6',
                                campaign: "REVO UGC ARMY",
                                sum: 3990,
                                total: 31609,
                                color: colorPalette[1]
                            },
                            {
                                name: 'Alex Siquig Outdoor Workout 6',
                                campaign: "REVO Walking Pad",
                                sum: 3990,
                                total: 21609,
                                color: colorPalette[3]
                            },
                            {
                                name: 'Alex Siquig Outdoor Workout 6',
                                campaign: "50 Review Challenge",
                                sum: 3990,
                                total: 41609,
                                color: colorPalette[4]
                            },
                            {
                                name: 'Alex Siquig Outdoor Workout 6',
                                campaign: "50 Review Challenge",
                                sum: 3990,
                                total: 21609,
                                color: colorPalette[5]
                            },
                            {
                                name: 'Publish fazly posts',
                                campaign: "50 Review Challenge 2",
                                sum: 3990,
                                total: 41609,
                                color: colorPalette[6]
                            },
                            {
                                name: 'Sarah Louise Rector Walking Pad',
                                campaign: "REVO Cupper",
                                sum: 13990,
                                total: 13990,
                                color: colorPalette[7]
                            },
                            {
                                name: 'Roen Gjoka',
                                campaign: "REVO Cupper",
                                sum: 23990,
                                total: 23990,
                                color: colorPalette[8]
                            },
                            {
                                name: 'Kiana Daigneault The Pill 1 - 2',
                                campaign: "REVO Cupper",
                                sum: 53990,
                                total: 53990,
                                color: colorPalette[9]
                            },
                        ]}
                    />
                </Grid>

                {/*Number of Assets by Campaign */}
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <NumberOfAssestsByCampaign
                        data={[
                            { campaign: '#hotgirlwalks', no_of_contents: 5, color: colorPalette[11] },
                            { campaign: '50 Review Challenge', no_of_contents: 15, color: colorPalette[11] },
                            { campaign: 'B2B', no_of_contents: 4, color: colorPalette[11] },
                            { campaign: 'Club REVO I', no_of_contents: 8, color: colorPalette[11] },
                            { campaign: 'REVO Collabs', no_of_contents: 70, color: colorPalette[11] },
                            { campaign: 'REVO Cupper', no_of_contents: 324, color: colorPalette[11] },
                            { campaign: 'REVO Massage Gun', no_of_contents: 213, color: colorPalette[11] },
                            { campaign: 'REVO UGC ARMY', no_of_contents: 629, color: colorPalette[11] },
                            { campaign: 'REVO Walking Pad', no_of_contents: 190, color: colorPalette[11] },
                        ]}
                    />
                </Grid>

                {/* Percent of Assets by Product */}
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <PercentOfAssetsByProduct
                        data={[
                            { product: 'REVO Massage Gun', values: 258, percent: 16.93, color: colorPalette[0] },
                            { product: 'REVO Oils & Creams', values: 29, percent: 1.90, color: colorPalette[1] },
                            { product: 'REVO Smart Cupper', values: 725, percent: 47.57, color: colorPalette[2] },
                            { product: 'REVO Walking Pad Pro', values: 136, percent: 8.92, color: colorPalette[3] },
                            { product: 'REVO Walking Pad Max', values: 376, percent: 24.67, color: colorPalette[4] },

                        ]}
                    />
                </Grid>
            </Grid>
        </Stack>)
};