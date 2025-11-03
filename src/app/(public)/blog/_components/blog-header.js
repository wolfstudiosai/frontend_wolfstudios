'use client';

import React from "react";
import TextMarquee from "/src/components/text-marquee";
import { Box } from "@mui/material";

export default function BlogHeader() {
    return (
        <Box mt={8}>
            <TextMarquee text="Blog" />
            <TextMarquee text="BRAXX" speed={45} />
        </Box>
    );
}