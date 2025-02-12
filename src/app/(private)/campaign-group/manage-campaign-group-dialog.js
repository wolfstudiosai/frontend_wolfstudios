import React from 'react';
import { formConstants } from '@/app/constants/form-constants';
import { Dialog } from '@/components/dialog/Dialog';
import { CustomTextField } from '@/components/formFields/custom-textfield';
import { ErrorMessage } from '@/components/formFields/error-message';
import { Button, CircularProgress, FormControl, InputLabel, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useFormik } from 'formik';
import { createCampaignGroupAsync, updateCampaignGroupAsync } from '@/app/(public)/campaign/_lib/campaign.actions';

export const ManageCampaignGroupDialog = (props) => {
  const { open, onClose, onConfirm, data } = props;

  const [loading, setLoading] = React.useState(false);
  const isUpdated = data?.id ? true : false;

  const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
    useFormik({
      initialValues: data,
      validate: (values) => {
        const errors = {};
        if (!values.name) {
          errors.name = formConstants.required;
        }

        return errors;
      },
      onSubmit: async (values) => {
        setLoading(true);
        const res = isUpdated
          ? await updateCampaignGroupAsync({
              id: data.id,
              name: values.name,
              description: values.description,
            })
          : await createCampaignGroupAsync(values);
        if (res.success) {
          onConfirm();
        }
        setLoading(false);
      },
    });

  return (
    <Dialog title={isUpdated ? 'Update Campaign Group' : 'Create Campaign Group'} onClose={onClose} open={open}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <CustomTextField name="name" label=" Name" value={values.name} onChange={handleChange} />
            <ErrorMessage error={errors.name} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth error={Boolean(errors.last_name)}>
              <CustomTextField
                name="description"
                label="Description"
                value={values.descripiton}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </FormControl>
          </Grid>

          <Stack direction={'row'} justifyContent={'flex-end'} width={'100%'}>
            <Button
              variant="contained"
              type={loading ? 'button' : 'submit'}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              Save
            </Button>
          </Stack>
        </Grid>
      </form>
    </Dialog>
  );
};
