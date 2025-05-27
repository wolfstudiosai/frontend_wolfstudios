import { Dialog } from "/src/components/dialog/Dialog";
import { CustomPasswordInput } from "/src/components/formFields/CustomPasswordInput";
import { Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, Stack } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useFormik } from "formik";
import React from "react";
import * as Yup from 'yup';
import { createUser, updateUserData } from "./_lib/user.actions";

const getValidationSchema = (isUpdated) => {

    return Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        role: Yup.string().required('Role is required'),
        username: Yup.string().required('User Name is required'),
        password: isUpdated
            ? Yup.string()
            : Yup.string().required('Password is required'),
        confirm_password: isUpdated
            ? Yup.string()
            : Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
    });
}


export const ManageUserDialog = (props) => {
    const { open, onClose, onConfirm, data } = props

    const [loading, setLoading] = React.useState(false);
    const isUpdated = data?.id ? true : false;

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        setValues,
        setFieldValue,
        isValid,
        resetForm,
    } = useFormik({
        initialValues: data,
        validationSchema: getValidationSchema(isUpdated),
        onSubmit: async (values) => {
            setLoading(true)
            const res = isUpdated ? await updateUserData({
                id: data.id,
                role: values.role,
                is_deleted: false,
                // status: values.status,
                contactNumber: values.contactNumber
            }) : await createUser(values);
            if (res.success) {
                onConfirm()
            }
            setLoading(false)
        }
    })

    return (
        <Dialog
            title={isUpdated ? "Update User" : "Create User"}
            onClose={onClose}
            open={open}
        >
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <FormControl fullWidth error={Boolean(errors.firstName)}>
                            <InputLabel>First Name</InputLabel>

                            <OutlinedInput
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                disabled={isUpdated}
                            />

                        </FormControl>
                    </Grid>
                    <Grid size={6}>
                        <FormControl fullWidth error={Boolean(errors.lastName)}>
                            <InputLabel>Last Name</InputLabel>

                            <OutlinedInput
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                disabled={isUpdated}
                            />

                        </FormControl>
                    </Grid>

                    <Grid size={12}>
                        <FormControl fullWidth error={Boolean(errors.email)}>
                            <InputLabel>Email</InputLabel>

                            <OutlinedInput
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                disabled={isUpdated}
                            />
                        </FormControl>
                    </Grid>

                    <Grid size={12}>
                        <FormControl fullWidth error={Boolean(errors.username)}>
                            <InputLabel>User Name</InputLabel>

                            <OutlinedInput
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                disabled={isUpdated}
                            />
                        </FormControl>
                    </Grid>

                    <Grid size={6}>
                        <FormControl fullWidth error={Boolean(errors.contactNumber)}>
                            <InputLabel>Contact No.</InputLabel>

                            <OutlinedInput
                                name="contactNumber"
                                value={values.contactNumber}
                                onChange={handleChange}
                                disabled={isUpdated}
                            />

                        </FormControl>
                    </Grid>



                    {/* {isUpdated && <Grid size={6}>
                        <FormControl fullWidth error={Boolean(errors.role)}>
                            <InputLabel>Status</InputLabel>

                            <Select
                                labelId="status"
                                id="status"
                                value={values.status}
                                label="Status"
                                onChange={(event) => setFieldValue("status", event.target.value)}
                            >
                                <MenuItem value={"ACTIVE"}>Active</MenuItem>
                                <MenuItem value={"BLOCKED"}>Blocked</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>} */}


                    <Grid size={6}>
                        <FormControl fullWidth error={Boolean(errors.role)}>
                            <InputLabel>Role</InputLabel>

                            <Select
                                labelId="role"
                                id="role"
                                value={values.role}
                                label="Role"
                                onChange={(event) => setFieldValue("role", event.target.value)}
                            >
                                <MenuItem value={"USER"}>User</MenuItem>
                                <MenuItem value={"ADMIN"}>Admin</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {!isUpdated && <Grid size={6}>
                        <FormControl error={Boolean(errors.password)}>
                            <InputLabel>Password</InputLabel>
                            <CustomPasswordInput
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.password)}
                            />
                        </FormControl>
                    </Grid>}

                    {!isUpdated && <Grid size={6}>
                        <FormControl error={Boolean(errors.confirm_password)}>
                            <InputLabel>Confirm Password</InputLabel>
                            <CustomPasswordInput
                                name="confirm_password"
                                value={values.confirm_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.confirm_password)}
                            />
                        </FormControl>
                        {errors.confirm_password ? <FormHelperText>{errors.confirm_password}</FormHelperText> : null}
                    </Grid>}


                    <Stack direction={"row"} justifyContent={"flex-end"} width={"100%"}>
                        <Button
                            variant="contained"
                            type={loading ? "button" : "submit"}
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                        >
                            {isUpdated ? "Update" : "Create"}
                        </Button>
                    </Stack>
                </Grid>
            </form>
        </Dialog>
    )
}