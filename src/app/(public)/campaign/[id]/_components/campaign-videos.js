'use client';

import { Grid2, Card, CardContent, CardHeader, Stack, Box } from "@mui/material";
import { FadeIn } from '/src/components/animation/fade-in';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

const CampaignVideoCard = ({ video }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '250px',
                overflow: 'hidden',
            }}
        >
            <Box
                component="iframe"
                src={"https://youtu.be/UIX_GYXJZpo?si=RTJvUZW3xPOEItOT"}
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
                autoPlay
                loop
                muted
            />
        </Box>
    );
};

export default function CampaignVideos({ campaign }) {

    return (
        <Grid2 item size={12}>
            <Card elevation={0} sx={{ height: "100%", borderRadius: 0, bgcolor: 'background.default', border: '1px solid var(--mui-palette-divider)', }}>
                <CardHeader title="Campaign Videos" subheader="Campaign Videos Details" />
                <CardContent>
                    <Stack spacing={2} sx={{ px: { xs: 1.5, md: 2 } }}>
                        <Swiper
                            modules={[Scrollbar, A11y]}
                            breakpoints={{
                                0: { slidesPerView: 1, spaceBetween: 10 },
                                425: { slidesPerView: 2, spaceBetween: 10 },
                                768: { slidesPerView: 3, spaceBetween: 10 },
                                1024: { slidesPerView: 4, spaceBetween: 10 },
                                1440: { slidesPerView: 5, spaceBetween: 10 },
                            }}
                            style={{
                                marginLeft: '-12px',
                                marginRight: '-12px',
                            }}
                        >
                            {campaign?.VideoInspirationGallery?.map((video, index) => (
                                <SwiperSlide key={index}>
                                    <FadeIn>
                                        <CampaignVideoCard video={video} />
                                    </FadeIn>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Stack>
                </CardContent>
            </Card>
        </Grid2>
    );
}