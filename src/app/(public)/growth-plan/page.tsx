"use client";
import { Container, Typography, Paper } from "@mui/material";
import LeadForm from "./components/lead-form";

export default function WorkWithUsPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper sx={{ p: 4}}>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Work With Us
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" mb={4}>
          Get a personalized digital strategy for your brand.
        </Typography>
        <LeadForm />
      </Paper>
    </Container>
  );
}