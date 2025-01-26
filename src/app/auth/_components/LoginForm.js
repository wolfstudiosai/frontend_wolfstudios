'use client';

import { ErrorText } from '@/components/core/error-text';
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
import * as React from 'react';
import * as Yup from 'yup';

import useAuth from '/src/hooks/useAuth';

const oAuthProviders = [{ id: 'google', name: 'Google', logo: '/assets/logo-google.svg' }];
const defaultValues = { email: '', password: '' };
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export function LoginForm({ closeDialog }) {
  const { login } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
    useFormik({
      initialValues: defaultValues,
      validationSchema,
      onSubmit: async (values) => {
        setLoading(true);
        await login(values.email, values.password, (error) => {
          setError(error);
        });
        setLoading(false);
        closeDialog?.();
      },
    });

  return (
    <Stack spacing={3} sx={{ minWidth: 300 }}>
      {/* <Stack spacing={2}>
        {oAuthProviders.map((provider) => (
          <Button
            color="secondary"
            disabled={loading}
            endIcon={<Box alt="" component="img" height={24} src={provider.logo} width={24} />}
            key={provider.id}
            onClick={() => {
              onAuth(provider.id).catch(() => {});
            }}
            variant="outlined"
          >
            Continue with {provider.name}
          </Button>
        ))}
      </Stack>
      <Divider>or</Divider> */}
      <Stack spacing={2}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <ErrorText error={error} />
            <FormControl error={Boolean(errors.email)}>
              <InputLabel>Email address</InputLabel>
              <OutlinedInput size='small' type="email" name="email" value={values.email} onChange={handleChange} />
              {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
            </FormControl>
            <FormControl error={Boolean(errors.password)}>
              <InputLabel>Password</InputLabel>
              <CustomPasswordInput size='small' name="password" value={values.password} onChange={handleChange} />
              {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
            </FormControl>
            {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
            <Button
              type={loading ? 'button' : 'submit'}
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}
