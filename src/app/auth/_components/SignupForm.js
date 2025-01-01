'use client';

import { createUser } from '@/app/dashboard/users/_lib/actions';
import { defaultUser } from '@/app/dashboard/users/_lib/types';
import { CustomPasswordInput } from '@/components/formFields/CustomPasswordInput';
import { paths } from '@/paths';
import { CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import * as Yup from 'yup';
const oAuthProviders = [
  { id: 'google', name: 'Google', logo: '/assets/logo-google.svg' },
];
const defaultValues = { email: '', password: '' };
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export function SignupForm() {

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
        router.push(paths.auth.default.signIn)
      }
      setLoading(false)
    }
  })

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h5">Sign up</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?{' '}
          <Link component={RouterLink} href={paths.auth.default.signIn} variant="subtitle2">
            Sign in
          </Link>
        </Typography>
      </Stack>
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
          <div>
            <Link component={RouterLink} href={paths.auth.default.forgotPassword} variant="subtitle2">
              Forgot password?
            </Link>
          </div>
        </Stack>
      </Stack>

    </Stack>
  );
}
