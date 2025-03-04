'use client';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import * as React from 'react';

import { CustomPasswordInput } from '/src/components/formFields/CustomPasswordInput';
import { CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { forgotPasswordAsync } from '../_lib/actions';
import { defaultForgotPassword } from '../_lib/types';
import { paths } from '/src/paths';

const getValidationSchema = (step) => {
  return Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    otp: step === 2 ? Yup.number().required('OTP is required') : Yup.number(),
    new_password: step === 2 ? Yup.string().required('Password is required') : Yup.string(),
  })
}

export function ForgotPasswordForm({ redirect = null }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(1);

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
    initialValues: defaultForgotPassword,
    validationSchema: getValidationSchema(step),
    onSubmit: async (values) => {
      setLoading(true);
      const res = step === 1
        ? await forgotPasswordAsync(values, 1)
        : await forgotPasswordAsync(values, 2);
      if (res?.success) {
        if (step === 1) {
          setStep(2);
        } else {
          if (redirect) {
            redirect();
          } else {
            router.push(paths.auth.default.sign_in);
          }
        }
      } else {
        console.error('Submission failed:', res?.error || 'Unknown error');
      }
      setLoading(false);
    }
  })


  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <FormControl error={Boolean(errors.email)}>
          <InputLabel>Email address</InputLabel>
          <OutlinedInput
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            disabled={step === 2}
          />
          {errors.email ? <FormHelperText>{errors.email}</FormHelperText> : null}
        </FormControl>
        {step === 2 && <FormControl error={Boolean(errors.otp)}>
          <InputLabel>Otp</InputLabel>
          <OutlinedInput
            type="umber"
            name="otp"
            value={values.otp}
            onChange={handleChange}
          />
          {errors.otp ? <FormHelperText>{errors.otp}</FormHelperText> : null}
        </FormControl>}
        {step === 2 && <FormControl error={Boolean(errors.new_password)}>
          <InputLabel>New Password</InputLabel>
          <CustomPasswordInput
            name="new_password"
            value={values.new_password}
            onChange={handleChange}
          />
          {errors.new_password ? <FormHelperText>{errors.new_password}</FormHelperText> : null}
        </FormControl>}
        <Button
          type={loading ? 'button' : 'submit'}
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {step === 1 ? 'Get OTP' : 'Reset password'}
        </Button>
      </Stack>
    </form>
  );
}
