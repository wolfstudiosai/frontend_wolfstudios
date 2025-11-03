"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { Box, Typography, useColorScheme } from "@mui/material";

export default function TextMarquee({
    text,
    speed = 90,
    textSx = {},
    dotSx = {},
}) {
    const { mode } = useColorScheme();

    return (
        <Marquee gradient={false} speed={speed} style={{ overflowY: "hidden" }}>
            {Array.from({ length: 8 }).map((_, index) => (
                <Box
                    key={index}
                    sx={{
                        ml: 10,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        height: "100%",
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 800,
                            textTransform: "uppercase",
                            fontSize: { xs: "3rem", md: "6rem" },
                            color: mode === "dark" ? "white" : "black",
                            ...textSx,
                        }}
                    >
                        {text}
                    </Typography>
                    <Box
                        sx={{
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            backgroundColor: mode === "dark" ? "white" : "black",
                            mt: 1,
                            ...dotSx,
                        }}
                    />
                </Box>
            ))}
        </Marquee>
    );
}