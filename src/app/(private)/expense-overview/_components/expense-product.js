
import React from "react";
import { Box, Typography } from "@mui/material";
import { CustomBarChart } from "../../performance-overview/_components/custom-bar-chart";

const data = [
    { label: 'Apr 2025', value: 4000 },
    { label: 'May 2025', value: 3000 },
    { label: 'Jun 2025', value: 2000 },
    { label: 'Jul 2025', value: 2780 },
    { label: 'Aug 2025', value: 1890 },
    { label: 'Sep 2025', value: 2390 },
    { label: 'Oct 2025', value: 3490 },
];

export const ExpenseProduct = () => {
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>Expenses: By Product</Typography>
            <CustomBarChart data={data} />
        </Box>
    );
};