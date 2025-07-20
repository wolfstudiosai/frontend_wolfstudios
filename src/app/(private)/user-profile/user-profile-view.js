'use client';

import React from 'react';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '../../../hooks/useAuth';
import { getProfileDataById, updateProfileData } from './_lib/actions';
import { defaultProfile } from './_lib/user-profile-types';
import { AccountDetailsForm } from './components/AccountDetailsForm';

export const UserProfileView = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { updateUserInfo } = useAuth();
  let authData = localStorage.getItem('auth');
  const userId = JSON.parse(authData).id;

  const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
    useFormik({
      initialValues: defaultProfile(),
      validate: (values) => {
        const errors = {};

        if (values.contactNumber && !/^\d+$/.test(values.contactNumber)) {
          errors.contactNumber = 'Contact number must contain only digits';
        }

        return errors;
      },
      onSubmit: async (values) => {
        setLoading(true);
        const res = await updateProfileData(values, userId);
        if (res?.success) {
          const data = res.data;
          updateUserInfo({
            name: ` ${data.firstName} ${data.lastName}`,
            contact_number: data.contactNumber,
            profile_pic: data.profileImage,
          });
          setValues(defaultProfile(data));
        }
        setLoading(false);
        setIsEditing(false);
      },
    });

  async function fetchProfileData() {
    setLoading(true);
    try {
      const response = await getProfileDataById(userId);

      if (response?.success) {
        const data = defaultProfile(response?.data);
        setValues(data);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <>
      <Box sx={{ width: '100%', py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" gap={2} alignItems="center">
          <Avatar alt="User profile" src={values?.profileImage} sx={{ width: 50, height: 50 }} />
          <Box>
            <Typography variant="h6">
              {values?.firstName} {values?.lastName}
            </Typography>
            <Typography>{values?.email}</Typography>
          </Box>
        </Stack>
        <Box>
          {isEditing ? (
            <Stack direction="row" gap={1}>
              <Button variant="text" color="error" size="small" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="contained" size="small" onClick={handleSubmit} disabled={loading}>
                Save
              </Button>
            </Stack>
          ) : (
            <Button variant="contained" size="small" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </Box>
      </Box>
      <AccountDetailsForm
        userId={userId}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setValues={setValues}
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setFieldValue={setFieldValue}
      />
    </>
  );
};
