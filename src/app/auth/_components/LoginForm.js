'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ErrorText } from '/src/components/core/error-text';
import { CustomPasswordInput } from '/src/components/formFields/CustomPasswordInput';
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
import { server_base_api } from '/src/utils/api';

const defaultValues = { email: '', password: '' };
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export function LoginForm({ onLoginSuccess, redirectToHome = false }) {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
    useFormik({
      initialValues: defaultValues,
      validationSchema,
      onSubmit: async (values) => {
        setLoading(true);
        const res = await login({
          email: values.email,
          password: values.password,
          authType: 'EMAIL_PASSWORD',
          onError: (error) => {
            setError(error);
          },
        });
        setLoading(false);

        if (res.success) {
          onLoginSuccess?.();
          redirectToHome && router.push(paths.home);
        }
      },
    });

  const handleGoogleLogin = async (user) => {
    setLoading(true);
    try {
      const res = await server_base_api.post('/auth/login', {
        authType: 'GOOGLE',
        authId: user.id,
      });

      console.log(res);

      // if (res.data.success) {
      //   onLoginSuccess?.();
      //   redirectToHome && router.push(paths.home);
      // }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack spacing={3} sx={{ minWidth: 300 }}>
      <Stack spacing={2}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <ErrorText error={error} />
            <FormControl error={Boolean(errors.email)}>
              <InputLabel>Email address</InputLabel>
              <OutlinedInput size="small" type="email" name="email" value={values.email} onChange={handleChange} />
              {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
            </FormControl>
            <FormControl error={Boolean(errors.password)}>
              <InputLabel>Password</InputLabel>
              <CustomPasswordInput size="small" name="password" value={values.password} onChange={handleChange} />
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
