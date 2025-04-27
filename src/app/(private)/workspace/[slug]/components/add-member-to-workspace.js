import { useContext, useEffect, useState } from 'react';
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

export const AddMemberToWorkspace = (props) => {
  const { open, onClose } = props;
  const [loading, setLoading] = useState(false);

  const { workspaceInfo } = useContext(ChatContext);

  const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
    useFormik({
      initialValues: { workspace: '', members: [] },
      validate: (values) => {
        const errors = {};

        if (values.type === 'PRIVATE' && values.members.length === 0) {
          errors.members = formConstants.required;
        }

        return errors;
      },
      onSubmit: async (values) => {
        setLoading(true);

        console.log('submitted values: ', values);

        onClose();
        setLoading(false);
      },
    });

  useEffect(() => {
    if (workspaceInfo) {
      setFieldValue('workspace', workspaceInfo.name);
    }
  }, [setFieldValue, workspaceInfo]);

  return (
    <Dialog title="Add Member" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="workspace"
              label="Workspace"
              value={values.workspace}
              onChange={handleChange}
              disabled
            />
            <ErrorMessage error={errors.workspace} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomAutoComplete
              label="Members"
              value={values.members}
              onChange={(_, value) => setFieldValue('members', value)}
              options={workspaceInfo?.members?.map((member) => ({
                value: member.id,
                label: `${member.firstName} ${member.lastName}`,
              }))}
              multiple
            />
          </Grid>
          <Stack direction={'row'} justifyContent={'flex-end'} width={'100%'}>
            <Button
              variant="contained"
              type={loading ? 'button' : 'submit'}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              Add
            </Button>
          </Stack>
        </Grid>
      </form>
    </Dialog>
  );
};
