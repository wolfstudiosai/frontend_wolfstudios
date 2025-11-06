import React from "react";
import Marquee from "react-fast-marquee";
import { Box, Divider, Typography } from "@mui/material";

const items = [
    { label: "Contents", value: "12,845", growth: "+6" },
    { label: "Views", value: "58,492", growth: "+11" },
    { label: "Engagements", value: "9,745", growth: "-4" },
    { label: "Likes", value: "34,211", growth: "+9" },
    { label: "Comments", value: "4,678", growth: "-6" },
]

export const AnalyticsMarquee = () => {
    return (
        <Marquee gradient={false} speed={90} style={{ overflowY: "hidden" }}>
            <Box py={2} borderTop={1} borderBottom={1} borderColor="divider" display="flex" alignItems="center" gap={3} mt={1}>
                {items.map((item, index) => (
                    <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        gap={3}
                        mr={5}
                    >
                        <Typography variant="h5" color="primary">
                            {item.label}:
                        </Typography>
                        <Typography variant="h5">
                            {item.value}
                        </Typography>
                        <Typography variant="h5" sx={{ color: item.growth.startsWith("+") ? "green" : "red" }}>
                            {item.growth}
                        </Typography>

                        <Divider orientation="vertical" flexItem sx={{borderColor: "text.secondary"}} />
                    </Box>
                ))}
            </Box>
        </Marquee>
    );
}