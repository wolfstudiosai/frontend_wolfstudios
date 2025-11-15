"use client";

import React from "react";
import { Box, Grid2 as Grid, Card, CardContent, Typography, Divider } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
} from "recharts";

const earningsData = [
  { month: "Jan", earnings: 400 },
  { month: "Feb", earnings: 800 },
  { month: "Mar", earnings: 1200 },
  { month: "Apr", earnings: 900 },
  { month: "May", earnings: 1800 },
];

const campaignData = [
  { month: "Jan", approved: 4, rejected: 1 },
  { month: "Feb", approved: 3, rejected: 2 },
  { month: "Mar", approved: 6, rejected: 0 },
  { month: "Apr", approved: 5, rejected: 1 },
  { month: "May", approved: 7, rejected: 1 },
];

const socialData = [
  { month: "Jan", followers: 1200, engagement: 4.2 },
  { month: "Feb", followers: 1350, engagement: 4.8 },
  { month: "Mar", followers: 1550, engagement: 5.3 },
  { month: "Apr", followers: 1700, engagement: 5.0 },
  { month: "May", followers: 1850, engagement: 5.5 },
];

const affiliateData = [
  { month: "Jan", clicks: 120, conversions: 12, commission: 40 },
  { month: "Feb", clicks: 180, conversions: 20, commission: 85 },
  { month: "Mar", clicks: 240, conversions: 32, commission: 115 },
  { month: "Apr", clicks: 310, conversions: 41, commission: 160 },
  { month: "May", clicks: 360, conversions: 49, commission: 210 },
];

export const UserAnalyticsView = () => {
  return (
    <Box>
      {/* Header */}
      <Typography variant="h4" fontWeight={500} sx={{ mb: 2 }}>
        Creator Dashboard
      </Typography>

      {/* Top Summary Cards */}
      <Grid container spacing={1}>
        {[
          { label: "Total Earnings", value: "$2,450" },
          { label: "Pending Payout", value: "$310" },
          { label: "Campaigns Joined", value: "18" },
          { label: "Approval Rate", value: "82%" },
          { label: "Profile Completion", value: "70%" },
        ].map((item, i) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}
            key={i}
            sx={{ border: 1, borderColor: "divider" }}
          >
            <Card sx={{ borderRadius: 0 }}>
              <CardContent>
                <Typography color="text.secondary">{item.label}</Typography>
                <Typography variant="h5" fontWeight={600} sx={{ mt: 1 }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={1} sx={{ mt: 1 }}>

        {/* Earnings Chart */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ border: 1, borderColor: "divider" }}>
          <Card sx={{ borderRadius: 0 }}>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Earnings Overview
              </Typography>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={earningsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="earnings" stroke="#3f51b5" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Campaign Performance Chart */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ border: 1, borderColor: "divider" }}>
          <Card sx={{ borderRadius: 0 }}>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Campaign Performance
              </Typography>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={campaignData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="approved" fill="#8253F2" radius={[5, 5, 0, 0]} />
                  <Bar dataKey="rejected" fill="#f44336" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* SECOND ROW OF CHARTS */}
      <Grid container spacing={1} sx={{ mt: 1 }}>
        {/* Affiliate Performance Chart */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ border: 1, borderColor: "divider" }}>
          <Card sx={{ borderRadius: 0 }}>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Affiliate Performance
              </Typography>

              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={affiliateData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />

                  <Bar dataKey="clicks" fill="#42A5F5" radius={[5, 5, 0, 0]} />
                  <Bar dataKey="conversions" fill="#66BB6A" radius={[5, 5, 0, 0]} />
                  <Line type="monotone" dataKey="commission" stroke="#FFA726" strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Social Growth Chart */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ border: 1, borderColor: "divider" }}>
          <Card sx={{ borderRadius: 0 }}>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Social Growth
              </Typography>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={socialData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="followers" stroke="#FFD700" strokeWidth={3} />
                  <Line type="monotone" dataKey="engagement" stroke="#00C49F" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Profile Checklist */}
      {/* <Card sx={{ borderRadius: 0, mt: 1, border: 1, borderColor: "divider" }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Profile Checklist
          </Typography>

          {[
            "Upload profile photo",
            "Connect Instagram / TikTok",
            "Add portfolio / media",
            "Complete bio & details",
            "Submit your first content",
          ].map((task, i) => (
            <Box key={i} sx={{ py: 1 }}>
              <Typography>⬤ {task}</Typography>
              <Divider sx={{ mt: 1 }} />
            </Box>
          ))}
        </CardContent>
      </Card> */}
    </Box>
  );
}