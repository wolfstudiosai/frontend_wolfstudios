'use client';

import { Card, CardContent, Stack, Box, Grid2, CardHeader } from '@mui/material';
import { FadeIn } from '/src/components/animation/fade-in';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import Image from 'next/image';

export default function CampaignImageSlider({ campaign }) {
    const campaignImages = [
        "https://cdn.wolfstudios.ai/campaigns/images/488803486_1234597315338529_5509616514289520380_n.jpeg",
        "https://cdn.wolfstudios.ai/campaigns/images/488803486_1234597315338529_5509616514289520380_n.jpeg",
        "https://cdn.wolfstudios.ai/campaigns/images/488803486_1234597315338529_5509616514289520380_n.jpeg",
        "https://cdn.wolfstudios.ai/campaigns/images/488803486_1234597315338529_5509616514289520380_n.jpeg",
        "https://cdn.wolfstudios.ai/campaigns/images/488803486_1234597315338529_5509616514289520380_n.jpeg",
        "https://cdn.wolfstudios.ai/campaigns/images/488803486_1234597315338529_5509616514289520380_n.jpeg",
        "https://cdn.wolfstudios.ai/campaigns/images/488803486_1234597315338529_5509616514289520380_n.jpeg",
        "https://cdn.wolfstudios.ai/campaigns/images/488803486_1234597315338529_5509616514289520380_n.jpeg",
        "https://cdn.wolfstudios.ai/campaigns/images/488803486_1234597315338529_5509616514289520380_n.jpeg",
        "https://cdn.wolfstudios.ai/campaigns/images/488803486_1234597315338529_5509616514289520380_n.jpeg",
    ]

    return (
        <Grid2 item size={12}>
            <Card elevation={0} sx={{ height: "100%", borderRadius: 0, bgcolor: 'background.default', border: '1px solid var(--mui-palette-divider)', }}>
                <CardHeader title="Campaign Images" subheader="Campaign Images Details" />
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
                            {campaignImages?.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <FadeIn>
                                        <CampaignImageCard image={image} />
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

const CampaignImageCard = ({ image }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '250px',
                overflow: 'hidden',
            }}
        >
            <Image
                src={image}
                alt="Campaign Image"
                fill
                style={{ objectFit: 'cover' }}
                quality={100}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={image}
                className="image"
            />
        </Box>
    );
};
