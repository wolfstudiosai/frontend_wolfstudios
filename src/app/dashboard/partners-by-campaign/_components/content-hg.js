import { CustomLinkViewer } from "@/components/formFields/CustomLinkViewer";
import { InputLabel, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

export const ContentHG = ({ data }) => {
    return (
        <Paper
            elevation={3}
            sx={{ mt: 2 }}
        >
            <Grid
                p={2}
                container
                spacing={2}
            >
                <Grid item size={{ xs: 12 }}>
                    <Typography color="text.secondary">{data?.name}</Typography>
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                    <InputLabel>REVO Pinterest</InputLabel>
                    <CustomLinkViewer domain="https://www.pinterest.com/p/" value={data?.revo_pinterest || '-'} />
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>
                    <InputLabel>REVO Pinterest</InputLabel>
                    <Typography color="text.secondary">{data?.pin_account || '-'}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};