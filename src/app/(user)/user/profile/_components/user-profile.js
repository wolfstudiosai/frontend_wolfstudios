"use client";

import React from "react";
import { Box, Button, Card, Divider, Typography } from "@mui/material";
import ProfileUploader from '/src/components/uploaders/profile-uploader';
import useAuth from '/src/hooks/useAuth';
import { useFormik } from "formik";

export const UserProfile = () => {
  const { userInfo } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
    useFormik({
      initialValues: {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        contactNumber: userInfo.contact_number,
        state: userInfo.state,
        city: userInfo.city,
        country: userInfo.country,
        profileImage: userInfo.profile_pic,
        role: userInfo.role,
        email: userInfo.email,
      },
      validate: (values) => {
        const errors = {};

        if (values.contactNumber && !/^\d+$/.test(values.contactNumber)) {
          errors.contactNumber = 'Contact number must contain only digits';
        }

        return errors;
      },
      onSubmit: async (values) => {
        console.log(values);
      },
    });

  return (
    <Card sx={{ borderRadius: 0, p: 2 }}>
      <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
        {/* <ProfileUploader
          value={userInfo.profile_pic}
          onFileSelect={(file) => setFieldValue('profileImage', file)}
          disabled={!isEditing}
        /> */}
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
  );
};