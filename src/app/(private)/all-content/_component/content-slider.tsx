import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
    Box,
    Typography,
    Chip,
    Avatar,
    Button,
} from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const partners = [
    { id: 1, name: "EV Capital Pty Limited", amount: "$31,369.03", date: "8/1/2025", status: "Active – Top Performer", statusType: "active", img: "https://via.placeholder.com/120x120" },
    { id: 2, name: "Unnamed partner", amount: "$17,769.46", date: "1/1/2025", status: "Re-Engage", statusType: "reengage", img: "" },
    { id: 3, name: "Digile Media", amount: "$17,439.47", date: "1/1/2025", status: "Offer Support", statusType: "offer", img: "https://via.placeholder.com/120x120" },
    { id: 4, name: "Amobeez Ltd.", amount: "$11,196.10", date: "9/1/2025", status: "Active – Top Performer", statusType: "active", img: "https://via.placeholder.com/120x120" },
    { id: 5, name: "Zenith Digital", amount: "$14,209.99", date: "3/1/2025", status: "Offer Support", statusType: "offer", img: "https://via.placeholder.com/120x120" },
    { id: 6, name: "Quantum Partners", amount: "$18,500.00", date: "6/1/2025", status: "Re-Engage", statusType: "reengage", img: "" },
    { id: 7, name: "NextGen Solutions", amount: "$21,000.10", date: "7/1/2025", status: "Active – Top Performer", statusType: "active", img: "https://via.placeholder.com/120x120" },
    { id: 8, name: "TechHive Media", amount: "$10,899.42", date: "5/1/2025", status: "Re-Engage", statusType: "reengage", img: "https://via.placeholder.com/120x120" },
];

export const ContentSlider = () => {
    const getStatusColor = (type) => {
        switch (type) {
            case "active":
                return { bg: "#b26a00", color: "#fff" };
            case "reengage":
                return { bg: "#d8e5ff", color: "#0056d2" };
            case "offer":
                return { bg: "#f4eaff", color: "#7a42f4" };
            default:
                return { bg: "#eee", color: "#333" };
        }
    };

    return (
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
            >
                {partners.map((p) => {
                    const colors = getStatusColor(p.statusType);
                    return (
                        <SwiperSlide key={p.id}>
                            <Box
                                sx={{
                                    backgroundColor: "background.paper",
                                    p: 2,
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
                                    {p.img ? (
                                        <Avatar src={p.img} alt={p.name} sx={{ width: 80, height: 80 }} />
                                    ) : (
                                        <Avatar
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                bgcolor: "#f2f2f2",
                                                color: "#888",
                                                fontSize: 12,
                                            }}
                                        >
                                            No Image
                                        </Avatar>
                                    )}
                                </Box>

                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600, mb: 0.5, fontSize: "1rem" }}
                                >
                                    {p.amount}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{ color: "#5a5a5a", fontWeight: 500 }}
                                >
                                    {p.name}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    sx={{ color: "#888", mb: 1, display: "block" }}
                                >
                                    {p.date}
                                </Typography>

                                <Chip
                                    label={p.status}
                                    sx={{
                                        bgcolor: colors.bg,
                                        color: colors.color,
                                        fontWeight: 500,
                                        fontSize: "0.75rem",
                                        alignSelf: "center",
                                    }}
                                />
                            </Box>
                        </SwiperSlide>
                    );
                })}
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
                }}
            >
                <Button
                    size="small"
                    variant="text"
                    className="prev-button"
                >
                    <KeyboardBackspaceIcon fontSize="small" /> Prev
                </Button>

                <Button
                    size="small"
                    variant="text"
                    className="next-button"
                >
                    Next <ArrowRightAltIcon fontSize="small" />
                </Button>
            </Box>
        </Box>
    );
};