'use client';

import React from "react";
import { Box, Grid2 as Grid, TextField, Typography } from "@mui/material";

export default function ExpenseOverview() {
    return (
        <Box maxWidth="lg" sx={{ width: '100%', mx: 'auto', mt: 2 }}>
            <Typography fontWeight={600} variant="h4" sx={{ mb: 2 }}>New Expense Form</Typography>

            <Box component="form" display="flex" flexDirection="column" gap={4}>
                <Grid container spacing={2}>
                    {/* Name */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    {/* Stackholder */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Stackholder"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    {/* Partner HQ */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <TextField
                            label="Partner HQ"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    {/* Campaign HQ */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <TextField
                            label="Campaign HQ"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    {/* Production HQ */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <TextField
                            label="Production HQ"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    {/* Partner HQ */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <TextField
                            label="Payment date"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    {/* Campaign HQ */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <TextField
                            label="Expense Type"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    {/* Production HQ */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <TextField
                            label="Amount"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <TextField
                    label="Receipt"
                    variant="outlined"
                    fullWidth
                />
            </Box>
        </Box>
    );
}