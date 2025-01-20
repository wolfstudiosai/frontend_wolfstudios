'use client';

import { CustomPasswordInput } from '@/components/formFields/CustomPasswordInput';
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
const oAuthProviders = [
  { id: 'google', name: 'Google', logo: '/assets/logo-google.svg' },
];
const defaultValues = { email: '', password: '' };
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
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
      const res = await createUser(values, true, (error) => {
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
        {oAuthProviders.map((provider) => (
          <Button
            color="secondary"
            disabled={loading}
            endIcon={<Box alt="" component="img" height={24} src={provider.logo} width={24} />}
            key={provider.id}
            onClick={() => {
              onAuth(provider.id).catch(() => {
              });
            }}
            variant="outlined"
          >
            Continue with {provider.name}
          </Button>
        ))}
      </Stack>
      <Divider>or</Divider>
      <Stack spacing={2}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl error={Boolean(errors.first_name)}>
              <InputLabel>First Name</InputLabel>
              <OutlinedInput
                type="first_name"
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl error={Boolean(errors.last_name)}>
              <InputLabel>Last Name</InputLabel>
              <OutlinedInput
                type="last_name"
                name="last_name"
                value={values.last_name}
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
    </Stack>
  );
}
