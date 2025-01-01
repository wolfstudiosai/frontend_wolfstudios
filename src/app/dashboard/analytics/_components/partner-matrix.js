import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { colorPalette } from "../page";
import { SalesByCategory } from "./sales-by-category";
import { TotalRoi } from "./total-roi";
import { PartnersByCategory } from "./partners-by-category";
import { PartnersByState } from "./partners-by-state";

export const PartnerMatrix = () => {
    return (
        <Stack spacing={4}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
                <Box sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h4">Partner Metrics / Demographics</Typography>
                </Box>
            </Stack>
            <Grid container spacing={4}>
                {/* Levanta: All Sales by Category */}
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <SalesByCategory
                        data={[
                            {
                                profile_category: 'Affiliate Network',
                                sum: 10609.62,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'Blog / Review',
                                sum: 14714.52,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'Creator',
                                sum: 8109.70,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'Publication',
                                sum: 1.70,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'Review Partner',
                                sum: 71769.70,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'SEO / Content Partner',
                                sum: 73542.70,
                                color: colorPalette[11],
                            }
                        ]}
                    />
                </Grid>
                {/* Levanta: Total ROI by Category */}
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <TotalRoi
                        data={[
                            {
                                profile_category: 'Affiliate Network',
                                sum: 12609.62,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'Blog / Review',
                                sum: 22714.52,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'Creator',
                                sum: 23109.70,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'Publication',
                                sum: 0,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'Review Partner',
                                sum: 149277.70,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'SEO / Content Partner',
                                sum: 124542.70,
                                color: colorPalette[11],
                            }
                        ]}
                    />
                </Grid>
                {/* partner by category */}
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <PartnersByCategory
                        data={[
                            { product: 'REVO Massage Gun', values: 258, color: colorPalette[0] },
                            { product: 'REVO Oils & Creams', values: 29, color: colorPalette[1] },
                            { product: 'REVO Smart Cupper', values: 725, color: colorPalette[2] },
                            { product: 'REVO Walking Pad Pro', values: 136, color: colorPalette[3] },
                            { product: 'REVO Walking Pad Max', values: 376, color: colorPalette[4] },

                        ].map((item, index, array) => {
                            const total = array.reduce((sum, current) => sum + current.values, 0);
                            return { ...item, percent: Number(((item.values / total) * 100)).toFixed(2) };
                        })}
                    />
                </Grid>
                {/* partner by state */}<Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <PartnersByState
                        data={[
                            { state: 'Western Australia', values: 258, color: colorPalette[0] },
                            { state: '(add hyperlink)', values: 29, color: colorPalette[1] },
                            { state: 'Alabama', values: 725, color: colorPalette[2] },
                            { state: 'Alaska', values: 136, color: colorPalette[3] },
                            { state: 'Alberta', values: 376, color: colorPalette[4] },
                            { state: 'Arizona', values: 376, color: colorPalette[5] },
                            { state: 'Arkansas', values: 376, color: colorPalette[6] },
                            { state: 'Atlanta', values: 376, color: colorPalette[7] },
                            { state: 'Australia', values: 376, color: colorPalette[8] },
                            { state: 'Austria', values: 376, color: colorPalette[9] },
                            { state: 'Azerbaijan', values: 376, color: colorPalette[10] },
                            { state: 'Bahamas', values: 376, color: colorPalette[11] },
                            { state: 'Balkans', values: 376, color: colorPalette[1] },
                        ].map((item, index, array) => {
                            const total = array.reduce((sum, current) => sum + current.values, 0);
                            return { ...item, percent: Number(((item.values / total) * 100)).toFixed(2) };
                        })}
                    />
                </Grid>

            </Grid>
        </Stack>)
};