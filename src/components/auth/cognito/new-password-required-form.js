'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { confirmSignIn } from 'aws-amplify/auth';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '/src/paths';
import { DynamicLogo } from '/src/components/core/logo';

const schema = zod
  .object({
    password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
    confirmPassword: zod.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const defaultValues = { password: '', confirmPassword: '' };

export function NewPasswordRequiredForm() {
  const [isPending, setIsPending] = React.useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values) => {
      setIsPending(true);

      try {
        const { nextStep } = await confirmSignIn({ challengeResponse: values.password });

        if (nextStep.signInStep === 'DONE') {
          // UserProvider will handle Router refresh
          // After refresh, GuestGuard will handle the redirect
          return;
        }

        throw new Error(`Unhandled next step: ${nextStep.signInStep}`);
      } catch (err) {
        setError('root', { type: 'server', message: err.message });
        setIsPending(false);
      }
    },
    [setError]
  );

  return (
    <Stack spacing={4}>
      <div>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
          <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
        </Box>
      </div>
      <Typography variant="h5">New password required</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput {...field} type="password" />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormControl error={Boolean(errors.confirmPassword)}>
                <InputLabel>Confirm password</InputLabel>
                <OutlinedInput {...field} type="password" />
                {errors.confirmPassword ? <FormHelperText>{errors.confirmPassword.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            Confirm
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
