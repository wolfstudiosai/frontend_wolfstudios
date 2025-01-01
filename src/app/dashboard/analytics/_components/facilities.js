import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { colorPalette } from "../page";
import { SalesByCategory } from "./sales-by-category";
import { TotalRoi } from "./total-roi";
import { PartnersByCategory } from "./partners-by-category";
import { PartnersByState } from "./partners-by-state";
import { FacilitiesGraph } from "./pacilities-graph";

export const Facilities = () => {
    return (
        <Stack spacing={4}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
                <Box sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h4">Facilities</Typography>
                </Box>
            </Stack>
            <Grid container spacing={4}>
                <Grid
                    size={{
                        xs: 12,
                    }}
                >
                    <FacilitiesGraph
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