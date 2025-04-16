import { Button, CircularProgress, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useFormik } from 'formik';
import React from 'react';
import { formConstants } from '/src/app/constants/form-constants';
import { Dialog } from '/src/components/dialog/Dialog';
import { CustomAutoComplete } from '/src/components/formFields/custom-auto-complete';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';

const participantsOptions = [
    {
        value: 'john_doe',
        label: 'John Doe',
    },
    {
        value: 'combina_key',
        label: 'Combina Key',
    },
    {
        value: 'mustafa_jawed',
        label: 'Mustafa Jawed',
    },
    {
        value: 'fazly_alahi',
        label: 'Fazly Alahi',
    }
]

export const CreateChannelDialog = (props) => {
    const { open, onClose } = props;

    const [loading, setLoading] = React.useState(false);

    const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
        useFormik({
            initialValues: { name: "", participants: [] },
            validate: (values) => {
                const errors = {};
                if (!values.name) {
                    errors.name = formConstants.required;
                }

                return errors;
            },
            onSubmit: async (values) => {
                setLoading(true);
                console.log(values);
                onClose();
                setLoading(false);
            },
        });

    return (
        <Dialog title="Create Channel" onClose={onClose} open={open}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <CustomTextField name="name" label="Name" value={values.name} onChange={handleChange} />
                        <ErrorMessage error={errors.name} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <CustomAutoComplete
                            label='Participants'
                            value={values.participants}
                            onChange={(_, value) => setFieldValue('participants', value)}
                            options={participantsOptions}
                            multiple
                        />
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
