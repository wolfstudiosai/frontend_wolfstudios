'use client';

import * as React from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { IconButton, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import ProfileUploader from '/src/components/uploaders/profile-uploader';

import { getProfileDataById, updateProfileData } from '../_lib/actions';
import useAuth from '../../../../hooks/useAuth';
import { defaultProfileNew } from '/src/app/dashboard/settings/_lib/types';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export function AccountDetailsForm() {
  const [loading, setLoading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const { updateUserInfo } = useAuth();
  let authData = localStorage.getItem('auth');
  const userId = JSON.parse(authData).id;

 
  async function fetchProfileData() {
    setLoading(true);
    try {
      const response = await getProfileDataById(userId);
      setValues(response.data);
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
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <UserIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="My profile"
        action={
          !isEditing && (
            <IconButton title="Edit" onClick={() => setIsEditing(true)}>
              <BorderColorIcon />
            </IconButton>
          )
        }
      />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <ProfileUploader
                disabled={!isEditing}
                value={values.profileImage}
                onFileSelect={(file) => setFieldValue('profileImage', file)}
              />
            </Stack>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <FormControl fullWidth error={Boolean(errors.firstName)}>
                    <InputLabel>First Name</InputLabel>
                    {isEditing ? (
                      <OutlinedInput name="firstName" value={values.firstName} onChange={handleChange} />
                    ) : (
                      <Typography color="text.secondary">{values.firstName || 'N/A'}</Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid size={12}>
                  <FormControl fullWidth error={Boolean(errors.lastName)}>
                    <InputLabel>Last Name</InputLabel>
                    {isEditing ? (
                      <OutlinedInput name="lastName" value={values.lastName} onChange={handleChange} />
                    ) : (
                      <Typography color="text.secondary">{values.lastName || 'N/A'}</Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid size={12}>
                  <FormControl fullWidth error={Boolean(errors.contactNumber)}>
                    <InputLabel>Contact No.</InputLabel>
                    {isEditing ? (
                      <OutlinedInput name="contactNumber" value={values.contactNumber} onChange={handleChange} />
                    ) : (
                      <Typography color="text.secondary">{values.contactNumber || 'N/A'}</Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid size={12}>
                  <FormControl fullWidth error={Boolean(errors.username)}>
                    <InputLabel>Username</InputLabel>
                    {isEditing ? (
                      <OutlinedInput name="username" value={values.username} onChange={handleChange} disabled />
                    ) : (
                      <Typography color="text.secondary">{values.username || 'N/A'}</Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid size={12}>
                  <FormControl fullWidth error={Boolean(errors.email)}>
                    <InputLabel>Email</InputLabel>
                    {isEditing ? (
                      <OutlinedInput name="email" value={values.email} onChange={handleChange} disabled />
                    ) : (
                      <Typography color="text.secondary">{values.email || 'N/A'}</Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid size={12}>
                  <FormControl fullWidth error={Boolean(errors.role)}>
                    <InputLabel>Role</InputLabel>
                    {isEditing ? (
                      <OutlinedInput name="role" value={values.role} onChange={handleChange} disabled />
                    ) : (
                      <Typography color="text.secondary">{values.role || 'N/A'}</Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </CardContent>
        {isEditing && (
          <CardActions>
            <Button color="secondary" onClick={() => setIsEditing(false)} disabled={loading}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={loading}>
              Update
            </Button>
          </CardActions>
        )}
      </form>
    </Card>
  );
}
