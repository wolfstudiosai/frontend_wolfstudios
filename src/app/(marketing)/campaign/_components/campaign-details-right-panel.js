import { Avatar, AvatarGroup, Box, Button, Card, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

const imgUrl = 'https://fastly.picsum.photos/id/534/500/300.jpg?hmac=7_nLmR2xnpUlZjy_xfL0rGWO2wDs2eIhXGjBXtpKt18';
export const CampaignDetailsRightPanel = ({ thumbnail, title, article, images, videos, social_share }) => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, md: 4 }}>
          <Box
            component={'img'}
            src={`${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${thumbnail}`}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1 }}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 8 }}>
          <Box>
            <Typography
              gutterBottom
              sx={{
                fontWeight: 300,
                fontSize: {
                  xs: '1.4rem',
                  md: '2rem',
                },
                lineHeight: 1,
              }}
            >
              {title}
            </Typography>
            <Stack direction="row" gap={2} alignItems="center" sx={{ mt: 3, mb: 5 }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ borderRadius: 2, px: 6, fontWeight: 'medium', color: 'white' }}
              >
                {article.button_text}
              </Button>
              <AvatarGroup
                max={4}
                sx={{
                  '& .MuiAvatar-root': {
                    width: 30, // Set the size for all avatars
                    height: 30,
                    fontSize: '1rem', // Adjust the font size for the surplus avatar
                  },
                }}
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
              </AvatarGroup>
            </Stack>
            <Typography variant="body1" color="text.secondary">
              {article.content}
            </Typography>
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
              height: { xs: 50, md: 100 },
              borderRadius: 1,
              overflow: 'hidden',
              flex: '1 1 auto',
            }}
          >
            <Box
              component="img"
              src={imgUrl}
              alt={`Preview ${index + 1}`}
              sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
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
                sx={{ height: 200, width: '100%', objectFit: 'cover', border: 0, borderRadius: '8px 8px 0 0' }}
              />
              <Box p={2}>
                <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
                  {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {video.description}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
