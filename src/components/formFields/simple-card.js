import { InputLabel, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

export const SimpleCard = ({ heading, first_category_title, first_category_value, second_category_title, second_category_value  }) => {
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
                    <Typography color="text.secondary">{heading}</Typography>
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                    <InputLabel>{first_category_title}</InputLabel>
                    <Typography color="text.secondary">{first_category_value || '-'}</Typography>
                </Grid>

                
                <Grid item size={{ xs: 12, md: 6 }}>
                    <InputLabel>{second_category_title}</InputLabel>
                    <Typography color="text.secondary">{second_category_value || '-'}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};