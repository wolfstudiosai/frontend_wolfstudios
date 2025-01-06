import {
    Box,
    Button,
    Stack,
    Typography
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { CampaignDetailsRightPanel } from "../_components/campaign-details-right-panel";
import { CampaignDetailsSidebar } from "../_components/campaign-details-sidebar";
import { Iconify } from "@/components/iconify/iconify";
// import { CampaignDetailsRightPanel } from "../_components/campaign-details-right-panel";
// import { CampaignDetailsSidebar } from "../_components/campaign-details-sidebar";

export const CampaignDetailsView = ({ data }) => {
    const {
        campaign_title,
        description,
        details,
        author,
        article,
        images,
        videos,
        social_share,
    } = data;

    return (
        <Box sx={{ py: 4 }}>
            <Grid container spacing={4}>
                {/* Left Panel */}
                <Grid item size={{ xs: 12, md: 4 }}>
                    <CampaignDetailsSidebar
                        description={description}
                        details={details}
                        author={author}
                        campaign_title={campaign_title}
                    />
                </Grid>

                {/* Right Content */}
                <Grid item size={{ xs: 12, md: 8 }}>
                    <CampaignDetailsRightPanel
                        article={article}
                        images={images}
                        videos={videos}
                        social_share={social_share}
                    />
                </Grid>
            </Grid>

            {/* footer */}
            <Grid container
                sx={{
                    bgcolor: 'var(--mui-palette-background-level2)',
                    width: '100%',
                    p: 4,
                    borderRadius: 1,
                    mt: { xs: 4, md: 4 }
                }}
            >
                <Grid item size={{ xs: 12, md: 10 }}>
                    <Typography gutterBottom sx={{
                        fontWeight: 300,
                        fontSize: {
                            xs: '1.5rem',
                            md: '3.2rem'
                        },
                        lineHeight: 1,
                        textTransform: 'uppercase'
                    }}>
                        Start Creating
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ width: { xs: '70%', md: '40%' } }}
                    >
                        Lets create an unforgettable brand experience together. Start your journey now
                    </Typography>
                </Grid>
                <Grid item size={{ xs: 12, md: 2 }}>
                    <Stack direction="row" alignItems='flex-end' justifyContent='flex-end' sx={{ width: '100%', height: '100%'}}>
                        <Button
                            variant="contained"
                            color="text.secondary"
                            sx={{
                                mt: { xs: 2, md: 0 },
                                backgroundColor: 'white',
                                color: 'black',
                            }}
                            endIcon={<Iconify icon="material-symbols:arrow-outward-rounded" />}
                        >JOIN NOW</Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};
