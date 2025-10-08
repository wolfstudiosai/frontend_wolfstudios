import { MenuItem, Stack, TextField } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import { formLabel } from './form-label';

const teamSize = ["below 5", "5-10", "10-20", "20-50", "50-100", "Above 100"]
const budgets = ['Below $5,000', '$5,000–$15,000', '$15,000–$30,000', 'Above $30,000'];

export default function Step3() {
  const { errors, touched } = useFormikContext();

  return (
    <Stack spacing={2}>
      <Field
        as={TextField}
        name="brandName"
        label={formLabel("Brand name", true)}
        fullWidth
        error={touched.brandName && !!errors.brandName}
        helperText={touched.brandName && errors.brandName}
      />
      <Field
        as={TextField}
        select
        name="teamSize"
        label={formLabel("Team size", true)}
        fullWidth
        error={touched.teamSize && !!errors.teamSize}
        helperText={touched.teamSize && errors.teamSize}
      >
        {teamSize.map((t) => (
          <MenuItem key={t} value={t}>
            {t}
          </MenuItem>
        ))}
      </Field>
      <Field
        as={TextField}
        select
        name="budget"
        label={formLabel("Monthly marketing budget", true)}
        fullWidth
        error={touched.budget && !!errors.budget}
        helperText={touched.budget && errors.budget}
      >
        {budgets.map((b) => (
          <MenuItem key={b} value={b}>
            {b}
          </MenuItem>
        ))}
      </Field>
    </Stack>
  );
}
