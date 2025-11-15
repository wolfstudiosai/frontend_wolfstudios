'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { paths } from '/src/paths';
import useAuth from '/src/hooks/useAuth';
import { CustomPasswordInput } from '/src/components/formFields/CustomPasswordInput';

import { createUser } from '/src/app/dashboard/users/_lib/user.actions';
import { defaultUser } from '/src/app/dashboard/users/_lib/user.types';
import { setTokenInCookies } from '/src/utils/axios-api.helpers';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().optional(),
  email: Yup.string().email('Invalid email').required('Email is required'),
  username: Yup.string().required('Username is required'),
  contactNumber: Yup.string().required('Contact number is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

export function SignupForm({ redirect = null }) {
  const { setUserInfo } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const { values, errors, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: defaultUser,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        ...values,
        authType: 'EMAIL_PASSWORD',
      };
      // const res = await createUser(payload, (error) => {
      //   setError(error);
      // });

      // if (res.success) {
      //   const userData = {
      //     id: res.data.id,
      //     token: res.data.accessToken,
      //     name: res.data.name,
      //     email: res.data.email,
      //     contact_number: res.data.contactNumber,
      //     profile_pic: res.data.profileImage,
      //     role: res.data.role,
      //     workspaces: res?.WorkspaceMembers?.map((member) => member?.Workspace),
      //   };

      //   // save user data in local storage
      //   localStorage.setItem('auth', JSON.stringify({ ...userData }));
      //   localStorage.setItem('accessToken', res.data.accessToken);

      //   setTokenInCookies(res.data.accessToken);
      //   setUserInfo(userData);

      //   if (redirect) {
      //     redirect();
      //   } else {
      //     router.push(paths.home);
      //   }
      // }
      // setLoading(false);
    },
  });

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} alignItems="center">
              <FormControl error={Boolean(errors.firstName)} fullWidth>
                <InputLabel>First Name</InputLabel>
                <OutlinedInput type="firstName" name="firstName" value={values.firstName} onChange={handleChange} />
              </FormControl>
              <FormControl error={Boolean(errors.lastName)} fullWidth>
                <InputLabel>Last Name</InputLabel>
                <OutlinedInput type="lastName" name="lastName" value={values.lastName} onChange={handleChange} />
              </FormControl>
            </Stack>

            <FormControl error={Boolean(errors.username)}>
              <InputLabel>Username</InputLabel>
              <OutlinedInput type="username" name="username" value={values.username} onChange={handleChange} />
            </FormControl>

            <FormControl error={Boolean(errors.email)}>
              <InputLabel>Email address</InputLabel>
              <OutlinedInput type="email" name="email" value={values.email} onChange={handleChange} />
              {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
            </FormControl>

            <FormControl error={Boolean(errors.contactNumber)}>
              <InputLabel>Contact Number</InputLabel>
              <OutlinedInput
                type="contactNumber"
                name="contactNumber"
                value={values.contactNumber}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl error={Boolean(errors.password)}>
              <InputLabel>Password</InputLabel>
              <CustomPasswordInput
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
            </FormControl>
            {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
            <Button
              type={loading ? 'button' : 'submit'}
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}
