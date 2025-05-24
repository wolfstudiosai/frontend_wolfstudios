'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '/src/hooks/useAuth';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { Iconify } from '/src/components/iconify/iconify';

import { CampaignQuickView } from '../_components/campaign-quick-view';
import {
    createCampaignAsync,
    deleteCampaignAsync,
    getCampaignAsync,
    updateCampaignAsync,
} from '../_lib/campaign.actions';
import { defaultCampaign } from '../_lib/campaign.types';
import { DrawerContainer } from '../../../../components/drawer/drawer';
import { CampaignForm } from './campaign-form';
import { formConstants } from '/src/app/constants/form-constants';
import { imageUploader } from '/src/utils/upload-file';
import Link from 'next/link';
import PageLoader from '/src/components/loaders/PageLoader';

export const CampaignRightPanel = ({ onClose, id, open }) => {
    const { isLogin } = useAuth();
    const router = useRouter();
    const [view, setView] = React.useState('QUICK');
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    // *********************Formik*********************************
    const { values, errors, handleChange, handleSubmit, setFieldValue, resetForm, setValues } = useFormik({
        initialValues: defaultCampaign(),
        validate: (values) => {
            const errors = {};
            if (!values.name) {
                errors.name = formConstants.required;
            }
            if (!values.client) {
                errors.client = formConstants.required;
            }
            if (!values.guidelines) {
                errors.guidelines = formConstants.required;
            }
            if (!values.description) {
                errors.description = formConstants.required;
            }
            if (!values.status) {
                errors.status = formConstants.required;
            }
            if (!values.startDate) {
                errors.startDate = formConstants.required;
            }
            if (!values.endDate) {
                errors.endDate = formConstants.required;
            }
            if (!values.notes) {
                errors.notes = formConstants.required;
            }

            return errors;
        },
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const finalData = {
                    ...values,
                };

                const imageFields = ['campaignImage'];
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
                            'campaigns'
                        );

                        finalData[field] = res;
                    } else if (typeof value === 'string') {
                        finalData[field] = [value];
                    }
                }

                const arrayFields = ['contentHQ', 'stakeholders', 'retailPartners', 'proposedPartners', 'spaces'];
                for (const field of arrayFields) {
                    const value = values[field];
                    if (value.length > 0) {
                        const arrOfStr = value.map((item) => item.value);
                        finalData[field] = arrOfStr;
                    }
                }

                if (finalData.goals && typeof finalData.goals === 'string') {
                    finalData.goals = finalData.goals.split(',').map((item) => item.trim());
                }
                const res = id ? await updateCampaignAsync(id, finalData) : await createCampaignAsync(finalData);
                if (res.success) {
                    onClose?.();
                    resetForm();
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

    // *************fetch single data***********************
    React.useEffect(() => {
        const getSingleData = async () => {
            setLoading(true);
            try {
                const response = await getCampaignAsync(id);
                if (response.data) {
                    setData(response.data);
                    setValues(defaultCampaign(response.data));
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



    const handleDelete = async () => {
        onClose?.();
        router.refresh()
    };

    // *****************Action Buttons*******************************
    const actionButtons = (
        <>
            {isLogin && (
                <>
                    {view === 'EDIT' && id ? (
                        <IconButton onClick={() => setView('QUICK')} title="Edit">
                            <Iconify icon="solar:eye-broken" />
                        </IconButton>
                    ) : (
                        id && (
                            <IconButton onClick={() => setView('EDIT')} title="Quick">
                                <Iconify icon="mynaui:edit-one" />
                            </IconButton>
                        )
                    )}

                    {view === 'EDIT' && (
                        <Button size="small" variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                            Save
                        </Button>
                    )}

                    {view === 'QUICK' && (
                        <>
                            <IconButton as={Link} href={`/campaign/${data?.id}`} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Analytics">
                                <Iconify icon="mdi:analytics" />
                            </IconButton>
                            <DeleteConfirmationPasswordPopover
                                id={data?.id}
                                title="Are you sure you want to delete?"
                                deleteFn={deleteCampaignAsync}
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
            <PageLoader loading={loading}>
                {view === 'QUICK' ? <CampaignQuickView data={data} /> : <CampaignForm handleChange={handleChange}
                    values={values}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    onSubmit={handleSubmit} />}
            </PageLoader>
        </DrawerContainer>
    );
};
