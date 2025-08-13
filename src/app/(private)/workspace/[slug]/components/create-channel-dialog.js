import { useContext, useState } from 'react';
import { Button, CircularProgress, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useFormik } from 'formik';

import { ChatContext } from '/src/contexts/chat';
import { Dialog } from '/src/components/dialog/Dialog';
import { CustomAutoComplete } from '/src/components/formFields/custom-auto-complete';
import { CustomSelect } from '/src/components/formFields/custom-select';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';

import { formConstants } from '/src/app/constants/form-constants';

export const CreateChannelDialog = (props) => {
  const { open, onClose } = props;
  const [loading, setLoading] = useState(false);

  const { createChannel, workspaceInfo } = useContext(ChatContext);

  const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
    useFormik({
      initialValues: { name: '', type: 'PUBLIC', members: [] },
      validate: (values) => {
        const errors = {};
        if (!values.name) {
          errors.name = formConstants.required;
        }

        if (!values.type) {
          errors.type = formConstants.required;
        }

        if (values.type === 'PRIVATE' && values.members?.length === 0) {
          errors.members = formConstants.required;
        }

        return errors;
      },
      onSubmit: async (values) => {
        setLoading(true);

        await createChannel({
          name: values.name,
          type: values.type,
          members: values.members.map((member) => member.value),
        });

        onClose();
        setLoading(false);
      },
    });

  console.log('values......', values);

  return (
    <Dialog title="Create Channel" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <CustomTextField name="name" label="Name" value={values.name} onChange={handleChange} />
            <ErrorMessage error={errors.name} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomSelect
              label="Type"
              value={values.type}
              onChange={(value) => setFieldValue('type', value)}
              options={[
                { value: 'PUBLIC', label: 'Public' },
                { value: 'PRIVATE', label: 'Private' },
              ]}
            />
            <ErrorMessage error={errors.type} />
          </Grid>
          {values.type === 'PRIVATE' && (
            <Grid size={{ xs: 12 }}>
              <CustomAutoComplete
                label="Members"
                value={values.members}
                onChange={(value) => setFieldValue('members', value)}
                options={workspaceInfo?.members?.map((member) => ({
                  value: member.id,
                  label: `${member.firstName} ${member.lastName}`,
                }))}
                multiple
              />
            </Grid>
          )}
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
