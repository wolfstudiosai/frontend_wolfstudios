"use client";

import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Grid2 as Grid,
  Card,
  Button,
  Divider,
} from "@mui/material";
import useAuth from '/src/hooks/useAuth';


export const UserProfilePageView = () => {
  const { userInfo } = useAuth();

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={500} mb={3}>
        My Profile
      </Typography>

      <Grid container spacing={1}>
        {/* Left side: Profile info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 0, p: 2 }}>
            <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
              <Avatar
                src={userInfo.profile_pic}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h6" fontWeight={600}>
                {userInfo.name}
              </Typography>
              <Typography color="text.secondary">{userInfo.role}</Typography>

              <Divider sx={{ width: "100%", my: 2 }} />

              <Box textAlign="left" width="100%">
                <Typography variant="body1" fontWeight={500}>
                  Email
                </Typography>
                <Typography color="text.secondary" mb={1}>
                  {userInfo.email}
                </Typography>

                <Typography variant="body1" fontWeight={500}>
                  Contact Number
                </Typography>
                <Typography color="text.secondary" mb={1}>
                  {userInfo.contact_number}
                </Typography>
              </Box>

              <Button
                variant="contained"
                sx={{ mt: 2, borderRadius: 2 }}
              >
                Edit Profile
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Right side: Additional info / stats */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ borderRadius: 0, p: 2 }}>
            <Typography variant="h6" mb={2}>
              Profile Overview
            </Typography>

            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Card sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Campaigns Joined
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    18
                  </Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Card sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Earnings
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    $2,450
                  </Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Card sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Profile Completion
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    70%
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" gap={2}>
              <Button variant="outlined" sx={{ borderRadius: 2 }}>
                Change Password
              </Button>
              <Button variant="contained" sx={{ borderRadius: 2 }}>
                Upload Portfolio
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}