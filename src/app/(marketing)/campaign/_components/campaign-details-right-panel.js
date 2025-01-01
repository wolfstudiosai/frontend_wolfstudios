import { Box, Button, Card, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

const imgUrl = "https://fastly.picsum.photos/id/534/500/300.jpg?hmac=7_nLmR2xnpUlZjy_xfL0rGWO2wDs2eIhXGjBXtpKt18"
export const CampaignDetailsRightPanel = ({ article, images, videos, social_share }) => {
    return (
        <>
            <Grid container spacing={4}>
                <Grid item size={{ xs: 12, md: 4 }}>
                    <Box
                        component={"img"}
                        src={imgUrl}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1 }}
                    />
                </Grid>
                <Grid item size={{ xs: 12, md: 8 }}>
                    <Box>
                        <Typography gutterBottom sx={{
                            fontWeight: 300,
                            fontSize: {
                                xs: '1.4rem',
                                md: '2rem'
                            },
                            lineHeight: 1
                        }}>
                            {article.title}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                        >
                            {article.content}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{ mt: 2, borderRadius: 2, px: 2, fontWeight: 300 }}
                        >
                            {article.button_text}
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Box
                display="flex"
                gap={2}
                mt={4}
                overflow="auto"
                sx={{ bgcolor: 'var(--mui-palette-background-level1)', borderRadius: 1, p: 2 }}
            >
                {/* Images */}
                {images.map((img, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: 100,
                            height: {xs: 50, md: 100},
                            borderRadius: 1,
                            overflow: "hidden",
                            flex: '1 1 auto'
                        }}
                    >
                        <Box
                            component="img"
                            src={imgUrl}
                            alt={`Preview ${index + 1}`}
                            sx={{objectFit: 'cover', width: '100%', height: '100%'}}
                        />
                    </Card>
                ))}
            </Box>
            <Grid container spacing={2} mt={2}>
                {/* Videos */}
                {videos.map((video, index) => (
                    <Grid item size={{ xs: 12, md: 4 }} key={index}>
                        <Paper elevation={1} variant="outlined">
                            <Box
                                component="iframe"
                                src={video.url}
                                sx={{ height: 200, width: '100%', objectFit: 'cover', border: 0, borderRadius: "5px 5px 0 0" }}
                            />
                            <Box p={2}>
                                <Typography
                                    color="text.secondary"
                                    sx={{ fontWeight: 600 }}>
                                    {video.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {video.description}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </>
    )
};