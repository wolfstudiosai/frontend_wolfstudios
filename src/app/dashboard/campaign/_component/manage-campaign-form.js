'use client';

import React from 'react';
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useFormik } from 'formik';

import { defaultCampaign } from '../_lib/types';

export const ManageCampaignForm = ({ data }) => {
  const [loading, setLoading] = React.useState(false);
  const isUpdated = data?.id ? true : false;
  const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
    useFormik({
      initialValues: defaultCampaign,
      validate: (values) => {
        const errors = {};

        return errors;
      },
      onSubmit: async (values) => {
        setLoading(true);
        const res = isUpdated
          ? await updateUserData({
              id: data.id,
              role: values.role,
              is_deleted: false,
              status: values.status,
              contact_number: values.contact_number,
            })
          : await createUser(values);
        if (res.success) {
          onConfirm();
        }
        setLoading(false);
      },
    });
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <TextField name="name" label="Campaign Name" value={values.name} onChange={handleChange} />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <TextField
                name="stackholder"
                label="Campaign stackholder"
                value={values.stackholder}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>

          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <TextField name="goal" label="Goal" value={values.goal} onChange={handleChange} />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.from_date)}>
              <DatePicker
                format="DD-MM-YYYY"
                label="From Date"
                onChange={() => {
                  // noop
                }}
                value={dayjs(values.start_date)}
              />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.end_date)}>
              <DatePicker
                format="DD-MM-YYYY"
                label="End Date"
                onChange={() => {
                  // noop
                }}
                value={dayjs(values.end_date)}
              />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <TextField
                name="partner_compensation"
                label="Partner Compensation"
                value={values.partner_compensation}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <TextField
                name="partner_deliverables"
                label="Partner Deliverables"
                value={values.partner_deliverables}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <TextField
                name="contributed_partners"
                label="Contributed Partners"
                value={values.contributed_partners}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <TextField
                name="prospected_partners"
                label="Prospected Partners"
                value={values.prospected_partners}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <TextField
                name="content_guidelines"
                label="Content Guidelines"
                value={values.content_guidelines}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <TextField
                name="content_guidelines"
                label="Content Guidelines"
                value={values.content_guidelines}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <TextField
                name="image_inspiration"
                label="Content HQ"
                value={values.image_inspiration}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <TextField
                name="video_inspiration"
                label="Video Inspiration"
                value={values.video_inspiration}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <TextField
                name="video_inspiration"
                label="Video Inspiration"
                value={values.video_inspiration}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <TextField
                name="content_engagement"
                type="number"
                label="Content Engagement"
                value={values.content_engagement}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <TextField
                name="product_expense"
                type="number"
                label="Product Expense"
                value={values.product_expense}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.role)}>
              <InputLabel>Status</InputLabel>
              <Select
                labelId="role"
                label="Status"
                id="role"
                value={values.role}
                onChange={(event) => setFieldValue('role', event.target.value)}
              >
                <MenuItem value={'PENDING'}>Pending</MenuItem>
                <MenuItem value={'DECLINED'}>Declined</MenuItem>
                <MenuItem value={'ACTIVE'}>Active</MenuItem>
                <MenuItem value={'COMPLETED'}>Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <TextField
                name="partner_expense"
                type="number"
                label="Partner Expense"
                value={values.partner_expense}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth error={Boolean(errors.first_name)}>
              <TextField
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </FormControl>
          </Grid>

          <Grid item size={12}>
            <Button
              variant="contained"
              type={loading ? 'button' : 'submit'}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
