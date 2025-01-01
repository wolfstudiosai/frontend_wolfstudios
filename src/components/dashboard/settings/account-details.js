'use client';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import * as React from 'react';

import { useFormik } from 'formik';

import PageLoader from '@/components/PageLoader/PageLoader';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import * as Yup from 'yup';
import { getProfileData, updateProfileData } from '../../../app/dashboard/settings/_lib/actions';
import ImageUploader from '../uploaders/ImageUploader';
import { defaultProfile } from '@/app/dashboard/settings/_lib/types';



const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});


export function AccountDetails() {

  const [loading, setLoading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);


  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setValues,
    setFieldValue,
    isValid,
    resetForm,
  } = useFormik({
    initialValues: defaultProfile,
    validate: (values) => {
      const errors = {};

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true)
      await updateProfileData(values)
      setLoading(false)
      setIsEditing(false);
    }
  })
  async function fetchProfileData() {
    setLoading(true);
    try {
      const response = await getProfileData();

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
  }, [])

  return (
    <PageLoader
      loading={loading}
      error={null}
    >
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
              <IconButton
                title='Edit'
                onClick={() => setIsEditing(true)}>
                <BorderColorIcon />
              </IconButton>
            )
          }
        />
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <ImageUploader
                  disabled={!isEditing}
                  value={values.profile_pic}
                  onFileSelect={(file) => setFieldValue('profile_pic', file)}
                />
              </Stack>
              <Stack spacing={2}>

                <Grid container spacing={2}>
                  <Grid size={12}>
                    <FormControl fullWidth error={Boolean(errors.first_name)}>
                      <InputLabel>First Name</InputLabel>
                      {isEditing ? (
                        <OutlinedInput
                          name="first_name"
                          value={values.first_name}
                          onChange={handleChange}
                        />
                      ) : (
                        <Typography color='text.secondary'>{values.first_name || 'N/A'}</Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth error={Boolean(errors.email)}>
                      <InputLabel>Last Name</InputLabel>
                      {
                        isEditing ? (
                          <OutlinedInput
                            name="last_name"
                            value={values.last_name}
                            onChange={handleChange}
                          />
                        ) : (
                          <Typography color='text.secondary'>{values.last_name || 'N/A'}</Typography>
                        )
                      }

                    </FormControl>
                  </Grid>

                  <Grid size={12}>
                    <FormControl fullWidth error={Boolean(errors.email)}>
                      <InputLabel>Contact No.</InputLabel>
                      {
                        isEditing ? (
                          <OutlinedInput
                            name="contact_no"
                            value={values.contact_no}
                            onChange={handleChange}
                          />
                        ) : (
                          <Typography color='text.secondary'>{values.contact_no || 'N/A'}</Typography>
                        )
                      }
                    </FormControl>
                  </Grid>

                  <Grid size={12}>
                    <FormControl fullWidth error={Boolean(errors.email)}>
                      <InputLabel>Email</InputLabel>
                      {
                        isEditing ? (
                          <OutlinedInput
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            disabled
                          />
                        ) : (
                          <Typography color='text.secondary'>{values.email || 'N/A'}</Typography>
                        )
                      }
                    </FormControl>
                  </Grid>

                  <Grid size={12}>
                    <FormControl fullWidth error={Boolean(errors.email)}>
                      <InputLabel>Role</InputLabel>
                      {
                        isEditing ? (
                          <OutlinedInput
                            name="role"
                            value={values.role}
                            onChange={handleChange}
                            disabled
                          />
                        ) : (
                          <Typography color='text.secondary'>{values.role || 'N/A'}</Typography>
                        )
                      }
                    </FormControl>
                  </Grid>

                </Grid>
              </Stack>
            </Stack>
          </CardContent>
          {
            isEditing && (
              <CardActions >
                <Button color="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button variant="contained" type="submit">Update</Button>
              </CardActions>
            )
          }
        </form>
      </Card>
    </PageLoader>
  );
}
