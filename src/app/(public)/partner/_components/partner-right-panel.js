'use client';

import { Button, FormControlLabel, IconButton, Switch } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';

import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '/src/components/drawer/drawer';
import { Iconify } from '/src/components/iconify/iconify';
import useAuth from '/src/hooks/useAuth';

import { createPartnerAsync, deletePartnerAsync, getPartnerAsync, updatePartnerAsync } from '../_lib/partner.actions';
import { defaultPartner } from '../_lib/partner.types';
import { PartnerForm } from './partner-form';
import { PartnerQuickView } from './partner-quickview';
import { formConstants } from '/src/app/constants/form-constants';
import { imageUploader } from '/src/utils/upload-file';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const PartnerRightPanel = ({ open, fetchList, onClose, id, view = 'QUICK' }) => {
    const { isLogin } = useAuth();
    const router = useRouter()
    const [data, setData] = React.useState(null);
    const [sidebarView, setSidebarView] = React.useState(view);
    const [loading, setLoading] = React.useState(false);

    // *********************States*********************************

    const handleDelete = async () => {
        fetchList();
        onClose?.();
        router.refresh()
    };

    const handleFeatured = async (featured) => {
        setData({ ...data, isFeatured: featured });
        const payload = defaultPartner({ ...data, isFeatured: featured })
        const response = await updatePartnerAsync(payload)
        if (response.success) {
            fetchList();
        }
    };

    const { values, errors, handleChange, handleSubmit, setFieldValue, setValues, resetForm } = useFormik({
        initialValues: defaultPartner(),
        validate: (values) => {
            const errors = {};
            if (!values.name) {
                errors.name = formConstants.required;
            }
            if (!values.email) {
                errors.email = formConstants.required;
            }

            return errors;
        },
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const finalData = { ...values };
                const imageFields = ['profileImage', 'mediaKit', 'receipts'];
                // Collect image files and their metadata
                for (const field of imageFields) {
                    const value = values[field];
                    if (value instanceof File) {
                        const res = await imageUploader(
                            [
                                {
                                    file: value,
                                    fileName: value.name.split('.').slice(0, -1).join('.'),
                                    fileType: value.type.split('/')[1],
                                },
                            ],
                            'partner-HQ'
                        );

                        finalData[field] = res;
                    } else if (typeof value === 'string') {
                        finalData[field] = [value];
                    }
                }
                const res = id ? await updatePartnerAsync(finalData) : await createPartnerAsync(finalData);
                if (res.success) {
                    resetForm();
                    onClose?.();
                    fetchList?.();
                    router.refresh()
                } else {
                    console.error('Operation failed:', res.message);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        },
    });

    // *****************Use Effects**********************************
    useEffect(() => {
        const getSingleData = async () => {
            setLoading(true);
            try {
                const response = await getPartnerAsync(id);
                if (response.data) {
                    setData(response.data);
                    setValues(defaultPartner(response.data));
                }
            } catch (error) {
                console.error('Error fetching partner data:', error);
                return null;
            } finally {
                setLoading(false);
            }
        };
        getSingleData();
    }, [id]);

    // *****************Action Buttons*******************************
    const actionButtons = (
        <>
            {isLogin && (
                <>
                    {sidebarView === 'EDIT' && id ? (
                        <IconButton onClick={() => setSidebarView('QUICK')} title="Edit">
                            <Iconify icon="solar:eye-broken" />
                        </IconButton>
                    ) : (
                        id && (
                            <IconButton onClick={() => setSidebarView('EDIT')} title="Quick">
                                <Iconify icon="mynaui:edit-one" />
                            </IconButton>
                        )
                    )}
                    <FormControlLabel
                        control={
                            <Switch
                                size="small"
                                checked={data?.isFeatured}
                                onChange={(e) => handleFeatured(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Featured"
                    />
                    {sidebarView === 'EDIT' && (
                        <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
                            Save
                        </Button>
                    )}
                    {sidebarView === 'QUICK' && (
                        <>
                            <IconButton as={Link} href={`/partner/${data?.id}`} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Analytics">
                                <Iconify icon="mdi:analytics" />
                            </IconButton>
                            <DeleteConfirmationPasswordPopover
                                id={data?.id}
                                title="Are you sure you want to delete?"
                                deleteFn={deletePartnerAsync}
                                passwordInput
                                onDelete={handleDelete}
                            />
                        </>
                    )}
                </>
            )}
        </>
    );

    return (
        <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons}>
            {sidebarView === 'QUICK' ? (
                <PartnerQuickView data={data} />
            ) : (
                <PartnerForm
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    onSubmit={handleSubmit}
                />
            )}
        </DrawerContainer>
    );
};
