'use client';

import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { toast } from 'sonner';

import { Iconify } from '../../../../components/iconify/iconify';
import Step4 from './step-four';
import Step1 from './step-one';
import Step3 from './step-three.js';
import Step2 from './step-two';
import Link from 'next/link';

const steps = [<Step1 />, <Step2 />, <Step3 />, <Step4 />];

const initialValues = {
  name: '',
  role: '',
  email: '',
  phone: '',
  goals: [],
  platforms: [],
  brandName: '',
  teamSize: '',
  budget: '',
  additionalNote: '',
};

export default function LeadForm() {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const isLastStep = step === steps.length - 1;

  const validate = (values) => {
    const errors = {};

    if (step === 0) {
      if (!values.name) errors.name = 'Name is required';
      if (!values.role) errors.role = 'Role is required';
      if (!values.email) errors.email = 'Email is required';
    }

    if (step === 1) {
      if (!values.goals?.length) errors.goals = 'Select at least one goal';
      if (!values.platforms?.length) errors.platforms = 'Select at least one platform';
    }

    if (step === 2) {
      if (!values.brandName) errors.brandName = 'Brand name required';
      if (!values.budget) errors.budget = 'Select a budget';
      if (!values.teamSize) errors.teamSize = 'Select a team size';
    }

    return errors;
  };

  const handleNext = async (values, actions) => {
    if (isLastStep) {
      setOpen(true);
      actions.resetForm();
      setStep(0);
      toast.success("Thank you! We'll contact you soon.");
    } else {
      setStep(step + 1);
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} validate={validate} onSubmit={handleNext}>
        {({ isSubmitting }) => (
          <Form>
            <Box>{steps[step]}</Box>

            <Box sx={{ display: 'flex', justifyContent: step > 0 ? 'space-between' : 'flex-end', mt: 3 }}>
              {step > 0 && (
                <Button onClick={() => setStep(step - 1)} variant="outlined" color="inherit">
                  Back
                </Button>
              )}

              <Button type="submit" variant="contained">
                {isLastStep ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="success-dialog-title"
        aria-describedby="success-dialog-description"
      >
        <DialogContent>
          <Box display='flex' flexDirection='column' alignItems='center' gap={2}>
          <Iconify icon="icon-park-outline:success" width={64} height={64} color="green" />
          <Typography variant="h1">Congratulations!</Typography>
          <Typography variant="h6">
            Your lead request has been submitted successfully. We will connect you soon
          </Typography>

          <Button variant='contained' as={Link} href='/'>Go to home</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
