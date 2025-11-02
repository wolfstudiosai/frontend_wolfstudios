import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
    Box,
    Typography,
    Avatar,
    Button,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const partners = [
    { id: 1, date: "8/1/2025", img: "https://via.placeholder.com/120x120" },
    { id: 2, date: "1/1/2025", img: "https://via.placeholder.com/120x120" },
    { id: 3, date: "1/1/2025", img: "https://via.placeholder.com/120x120" },
    { id: 4, date: "9/1/2025", img: "https://via.placeholder.com/120x120" },
    { id: 5, date: "3/1/2025", img: "https://via.placeholder.com/120x120" },
    { id: 6, date: "6/1/2025", img: "https://via.placeholder.com/120x120" },
    { id: 7, date: "7/1/2025", img: "https://via.placeholder.com/120x120" },
    { id: 8, date: "5/1/2025", img: "https://via.placeholder.com/120x120" },
];

export const FavoritesSlider = () => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    return (
        <Box mt={5}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Favorites Images
            </Typography>

            <Box sx={{ width: "100%", p: 2, mb: 5, position: "relative" }}>
                <Swiper
                    navigation={{
                        nextEl: ".next-button",
                        prevEl: ".prev-button",
                        disabledClass: "swiper-button-disabled",
                    }}
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={4.5}
                    pagination={{ clickable: true }}
                    style={{ paddingBottom: "50px" }}
                    breakpoints={{
                        320: { slidesPerView: 1.2 },
                        600: { slidesPerView: 2 },
                        900: { slidesPerView: 3 },
                        1200: { slidesPerView: 4.5 },
                    }}
                    onSwiper={(swiper) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    onSlideChange={(swiper) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                >
                    {partners.map((p) => (
                        <SwiperSlide key={p.id}>
                            <Box
                                sx={{
                                    backgroundColor: "background.paper",
                                    p: 1.5,
                                    height: "100%",
                                    textAlign: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mb: 1.5,
                                    }}
                                >
                                    <Avatar
                                        src={p.img}
                                        alt={p.date}
                                        sx={{
                                            width: "100%",
                                            height: "180px",
                                            borderRadius: 0,
                                        }}
                                    />
                                </Box>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 1,
                        position: "absolute",
                        bottom: 7,
                        right: 20,
                        zIndex: 10,
                        pointerEvents: "auto",
                    }}
                >
                    <Button
                        size="small"
                        variant="text"
                        className="prev-button"
                        disabled={isBeginning}
                    >
                        <KeyboardBackspaceIcon fontSize="small" /> Prev
                    </Button>

                    <Button
                        size="small"
                        variant="text"
                        className="next-button"
                        disabled={isEnd}
                    >
                        Next <ArrowRightAltIcon fontSize="small" />
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};