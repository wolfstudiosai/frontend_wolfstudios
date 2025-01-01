import { Iconify } from "@/components/iconify/iconify";
import { Avatar, Box, Divider, IconButton, Paper, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

export const CampaignDetailsSidebar = ({ description, details, author, campaign_title }) => {
    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography gutterBottom sx={{
                fontWeight: 300,
                fontSize: {
                    xs: '1.5rem',
                    md: '3.2rem'
                },
                lineHeight: 1
            }}>
                {campaign_title}
            </Typography>
            <Typography
                variant="body1"
                color="text.secondary"
            >
                {description}
            </Typography>
            <Box mt={3}>
                <TypographyWithBg title="Date" value={details.date} />
                <TypographyWithBg title="Compensation" value={details.compensation} />
                <TypographyWithBg title="Deliverables" value={details.deliverables} />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
            >
                AUTHOR
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
                <Avatar
                    src={author.profile_image}
                    alt={author.name}
                    sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Box>
                    <Typography
                        variant="subtitle2"
                        color="text.primaryX">
                        {author.name}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary">
                        {author.title}
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
            >
                SHARE
            </Typography>

            <Grid container spacing={2}>
                <Grid item size={{ xs: 12, md: 4 }}>
                    <IconButton
                        sx={{ bgcolor: 'var(--mui-palette-background-level2)', width: '100%' }}
                    >
                        <Iconify icon="tabler:message" width={28} height={28} />
                    </IconButton>
                </Grid>
                <Grid item size={{ xs: 12, md: 4 }}>
                    <IconButton
                        sx={{ bgcolor: 'var(--mui-palette-background-level2)', width: '100%' }}
                    >
                        <Iconify icon="material-symbols:share" width={28} height={28} />
                    </IconButton>
                </Grid>
                <Grid item size={{ xs: 12, md: 4 }}>
                    <IconButton
                        sx={{ bgcolor: 'var(--mui-palette-background-level2)', width: '100%' }}
                    >
                        <Iconify icon="ic:baseline-facebook" width={28} height={28} />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    )
};


const TypographyWithBg = ({ title, value }) => {
    return (
        <Stack
            direction="row"
            spacing={2}
            justifyContent={"space-between"}
            sx={{
                bgcolor: 'var(--mui-palette-background-level1)',
                borderRadius: 1,
                px: 2,
                py: 1,
                mt: 1
            }}
        >
            <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
            <Typography variant="subtitle2" color="text.secondary">{value}</Typography>
        </Stack>
    )
}