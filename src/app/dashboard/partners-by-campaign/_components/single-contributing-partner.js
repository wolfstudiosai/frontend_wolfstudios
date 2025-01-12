import { ArrayOfStringCommaView } from "@/components/formFields/arrayof-string-comma-view";
import { ImageViewerWithDialog } from "@/components/formFields/image-viewer-with-modal";
import { SimpleCard } from "@/components/formFields/simple-card";
import { RightPanel } from "@/components/rightPanel/right-panel";
import { Button, InputLabel, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

export const SingleContributingPartnerRightPanel = ({ open, data, onClose, }) => {
    return (
        <RightPanel
            open={open}
            heading={data?.name}
            onClose={onClose}
            // drawerProps={{ zIndex: 1500 }}
            actionButtons={() => {
                return (
                    <Stack spacing={2} direction={"row"}>

                        <Button
                            variant="contained"
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                        >
                            Close
                        </Button>

                    </Stack>
                );
            }}
            size="lg"
        >
            <Grid container spacing={2}>
                <Grid item size={{ xs: 12, md: 6 }}>
                    <InputLabel>Stake Holders</InputLabel>
                    <ArrayOfStringCommaView value={data?.stackholders} />
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                    <InputLabel>Affiliate Platform</InputLabel>
                    <ArrayOfStringCommaView value={data?.stackholders} />
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                    <InputLabel>Profile Image</InputLabel>
                    <ImageViewerWithDialog url={data?.profile_image} />
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                    <InputLabel>Notes</InputLabel>
                    <Typography color="text.secondary">{data?.notes || '-'}</Typography>
                </Grid>

                <Grid item size={{ xs: 12 }}>
                    <InputLabel>Campaign</InputLabel>
                    {Array.isArray(data?.campaign) ? data?.campaign.map((item) => <SimpleCard key={item?.name} heading="Campaign" first_category_title="Guidelines" first_category_value={item?.guidelines} second_category_title="Total Content Engagement" second_category_value={item?.total_content_engagement} />) : null}
                </Grid>

                <Grid item size={{ xs: 12 }}>
                    <InputLabel>Products</InputLabel>
                    {Array.isArray(data?.campaign) ? data?.campaign.map((item) => <SimpleCard key={item?.name} heading={item?.name} first_category_title="category_title 1" first_category_value={item?.guidelines} second_category_title="category_title 2" second_category_value={item?.total_content_engagement} />) : null}
                </Grid>

                <Grid item size={{ xs: 12 }}>
                    <InputLabel>REVO Content Performance</InputLabel>
                    {Array.isArray(data?.revo_content_performance) ? data?.revo_content_performance.map((item) => <SimpleCard key={item?.name} heading={item?.name} first_category_title="category_title 1" first_category_value={item?.guidelines} second_category_title="category_title 2" second_category_value={item?.total_content_engagement} />) : null}
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                    <InputLabel>LinkedIn Connections</InputLabel>
                    <Typography color="text.secondary">{data?.linkedin_connection || '-'}</Typography>
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                    <InputLabel>Youtube Following</InputLabel>
                    <Typography color="text.secondary">{data?.youtube_following || '-'}</Typography>
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                    <InputLabel>Snapchat Following</InputLabel>
                    <Typography color="text.secondary">{data?.snapchat_follwing || '-'}</Typography>
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                    <InputLabel>X Following</InputLabel>
                    <Typography color="text.secondary">{data?.x_follwing || '-'}</Typography>
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                    <InputLabel>Pinterest Following</InputLabel>
                    <Typography color="text.secondary">{data?.pinterest_following || '-'}</Typography>
                </Grid>
            </Grid>

        </RightPanel>
    );
}