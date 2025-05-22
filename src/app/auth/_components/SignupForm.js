'use client';

import { CustomPasswordInput } from '/src/components/formFields/CustomPasswordInput';
import { CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import * as Yup from 'yup';
import { createUser } from '/src/app/dashboard/users/_lib/user.actions';
import { defaultUser } from '/src/app/dashboard/users/_lib/user.types';
import { paths } from '/src/paths';
import SocialLogin from '/src/components/common/social-login';
import { Iconify } from '/src/components/iconify/iconify';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  username: Yup.string().required('Username is required'),
  contactNumber: Yup.string().required('Contact number is required'),
  password: Yup.string().required('Password is required'),
});

export function SignupForm({ redirect = null }) {

  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

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
    initialValues: defaultUser,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      const payload = {
        ...values,
        authType: "EMAIL_PASSWORD",
      }
      const res = await createUser(payload, (error) => {
        setError(error)
      })

      if (res.success) {
        if (redirect) {
          redirect();
        } else {
          router.push(paths.auth.default.sign_in)
        }
      }
      setLoading(false)
    }
  })

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl error={Boolean(errors.firstName)}>
              <InputLabel>First Name</InputLabel>
              <OutlinedInput
                type="firstName"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl error={Boolean(errors.lastName)}>
              <InputLabel>Last Name</InputLabel>
              <OutlinedInput
                type="lastName"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl error={Boolean(errors.username)}>
              <InputLabel>Username</InputLabel>
              <OutlinedInput
                type="username"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl error={Boolean(errors.email)}>
              <InputLabel>Email address</InputLabel>
              <OutlinedInput
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
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
              {loading ? 'Signing in...' : "Sign in"}
            </Button>
          </Stack>
        </form>
      </Stack>

      <Divider sx={{ mt: 2 }}>OR</Divider>

      <Stack spacing={2} direction='column' alignItems='center'>
        <SocialLogin provider="facebook">
          <Iconify icon="logos:facebook" />
          Sign In with Facebook
        </SocialLogin>
        <SocialLogin provider="google">
          <Iconify icon="devicon:google" />
          Sign In with Google
        </SocialLogin>
      </Stack>
    </Stack>
  );
}
