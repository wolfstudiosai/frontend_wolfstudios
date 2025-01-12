"use client";
import { CustomPasswordInput } from '@/components/formFields/CustomPasswordInput';
import { CircularProgress, FormHelperText } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import { Password as PasswordIcon } from '@phosphor-icons/react/dist/ssr/Password';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { resetPasswordAsync } from '../_lib/actions';
import { defaultResetPassword } from '../_lib/types';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old password is required'),
  newPassword: Yup.string().required('New password is required'),
  confirmPassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

export function ResetPasswordForm() {
  const [loading, setLoading] = React.useState(false);

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
    initialValues: defaultResetPassword,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await resetPasswordAsync(values);
      if (res.success) {
        resetForm();
      }
      setLoading(false);
    }
  })

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <PasswordIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Change password"
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl error={Boolean(errors.oldPassword)}>
              <InputLabel>Old Password</InputLabel>
              <CustomPasswordInput
                name="oldPassword"
                value={values.oldPassword}
                onChange={handleChange}
              />
              {errors.oldPassword ? <FormHelperText>{errors.oldPassword}</FormHelperText> : null}
            </FormControl>
            <FormControl error={Boolean(errors.newPassword)}>
              <InputLabel>New Password</InputLabel>
              <CustomPasswordInput
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
              />
              {errors.newPassword ? <FormHelperText>{errors.newPassword}</FormHelperText> : null}
            </FormControl>
            <FormControl error={Boolean(errors.confirmPassword)}>
              <InputLabel>Confirm Password</InputLabel>
              <CustomPasswordInput
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword ? <FormHelperText>{errors.confirmPassword}</FormHelperText> : null}
            </FormControl>
            <Button
              type={loading ? 'button' : 'submit'}
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              Update Password
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
