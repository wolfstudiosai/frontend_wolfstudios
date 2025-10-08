import React from 'react'

import { Field, useFormikContext } from "formik";
import { TextField, FormControlLabel, Checkbox, Stack } from "@mui/material";
import { formLabel } from './form-label';

export default function Step4() {
  const { errors, touched } = useFormikContext();
  return (
    <Stack spacing={2}>
      <Field
        as={TextField}
        name="additionalNote"
        label={formLabel("Additional Note")}
        fullWidth
        multiline
        rows={4}
        error={touched.additionalNote && !!errors.additionalNote}
        helperText={touched.additionalNote && errors.additionalNote}
      />
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="I’d like to schedule a free consultation."
      />
    </Stack>
  );
}
