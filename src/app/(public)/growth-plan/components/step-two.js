import React from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { formLabel } from './form-label';

const goals = [
  'Grow social media following',
  'Launch a new campaign',
  'Manage PR & reputation',
  'Get verified or featured',
  'Increase brand collaborations',
];

const platforms = ['Instagram', 'YouTube', 'Facebook', 'X (Twitter)', 'TikTok'];

export default function Step2() {
  const { values, setFieldValue, errors } = useFormikContext();

  const handleChange = (field, value) => {
    const arr = values[field] || [];
    const updated = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    setFieldValue(field, updated);
  };

  return (
    <>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {formLabel("What are your goals?", true)}
      </Typography>
      <FormGroup>
        {goals.map((goal) => (
          <FormControlLabel
            key={goal}
            control={<Checkbox checked={values.goals.includes(goal)} onChange={() => handleChange('goals', goal)} />}
            label={goal}
          />
        ))}

        {errors.goals && (
          <Typography color="error" variant="caption">
            {errors.goals}
          </Typography>
        )}
      </FormGroup>

      <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
        {formLabel("Which platforms do you focus on?", true)}
      </Typography>
      <FormGroup>
        {platforms.map((platform) => (
          <FormControlLabel
            key={platform}
            control={
              <Checkbox
                checked={values.platforms.includes(platform)}
                onChange={() => handleChange('platforms', platform)}
              />
            }
            label={platform}
          />
        ))}

        {errors.platforms && (
          <Typography color="error" variant="caption">
            {errors.platforms}
          </Typography>
        )}
      </FormGroup>
    </>
  );
}
