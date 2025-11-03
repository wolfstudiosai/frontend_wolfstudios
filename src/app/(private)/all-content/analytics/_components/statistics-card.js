"use client"

import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { motion } from "framer-motion"
import React from "react"

export const StatisticsCard = ({ state }) => {
    return (
        <Card
            component={motion.div}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}
        >
            <CardContent>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {state.label}
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                    {state.value}
                </Typography>
            </CardContent>
        </Card>
    );
};