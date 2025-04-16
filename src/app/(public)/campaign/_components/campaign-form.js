'use client';

import { Button, FormControl, FormLabel, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';
import { MediaIframeDialog } from '/src/components/media-iframe-dialog/media-iframe-dialog';

import { useFormik } from 'formik';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';
import { createCampaignAsync, getCampaignAsync, updateCampaignAsync } from '../_lib/campaign.actions';
import { defaultCampaign } from '../_lib/campaign.types';
import { getRetailPartnerListAsync, getStakeholderListAsync } from '/src/actions/common';
import { getContentList } from '/src/app/(private)/all-content/_lib/all-content.actions';
import { getSpaceListAsync } from '/src/app/(public)/spaces/_lib/space.actions';
import { formConstants } from '/src/app/constants/form-constants';
import { CustomAutoComplete } from '/src/components/formFields/custom-auto-complete';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomSelect } from '/src/components/formFields/custom-select';
import { VideoLinkField } from '/src/components/formFields/video-link-field';
import { ImageUploader } from '/src/components/uploaders/image-uploader';
import { MediaUploaderTrigger } from '/src/components/uploaders/media-uploader-trigger';
import { imageUploader } from '/src/utils/upload-file';

export const CampaignForm = ({ id, onClose, fetchList }) => {

    // *********************States*********************************
    const [loading, setLoading] = React.useState(false);
    const [mediaPreview, setMediaPreview] = React.useState(null);
    const [contentOptions, setContentOptions] = React.useState([]);
    const [stakeholderOptions, setStakeholderOptions] = React.useState([]);
    const [retailPartnerOptions, setRetailPartnerOptions] = React.useState([]);
    const [partnerOptions, setPartnerOptions] = React.useState([]);
    const [spaceOptions, setSpaceOptions] = React.useState([]);
    const [openImageUploadDialog, setOpenImageUploadDialog] = React.useState(false);
    const [data, setData] = React.useState(null);

    // ********************* Formik *******************************

    const { values, errors, handleChange, handleSubmit, setFieldValue, resetForm, setValues } =
        useFormik({
            initialValues: defaultCampaign(),
            validate: (values) => {
                const errors = {};
                if (!values.name) {
                    errors.projectTitle = formConstants.required;
                }

                return errors;
            },
            onSubmit: async (values) => {
                console.log("submitted values: ", values);
                setLoading(true);
                try {

                    const finalData = {
                        ...values,
                    }

                    const imageFields = ['campaignImage'];
                    for (const field of imageFields) {
                        const value = values[field];
                        if (value instanceof File) {
                            const res = await imageUploader([{
                                file: value,
                                fileName: value.name.split('.').slice(0, -1).join('.'),
                                fileType: value.type.split('/')[1],
                            }], 'campaigns');

                            finalData[field] = res;
                        } else if (typeof value === 'string') {
                            finalData[field] = [value];
                        }
                    }

                    const arrayFields = ['contentHQ', 'stakeholders', 'retailPartners', "proposedPartners", "spaces"];
                    for (const field of arrayFields) {
                        const value = values[field];
                        if (value.length > 0) {
                            const arrOfStr = value.map((item) => item.value);
                            finalData[field] = arrOfStr;
                        }
                    }

                    if (finalData.goals) {
                        finalData.goals = finalData.goals.split(',').map((item) => item.trim());
                    }
                    console.log("final data: ", finalData);

                    const res = id ? await updateCampaignAsync(id, finalData) : await createCampaignAsync(finalData);
                    console.log("response: ", res);
                    if (res.success) {
                        onClose?.();
                        resetForm();
                        fetchList();
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

    // ******************** Use Effects****************************

    // --------------- Fetch Prerequisites Data -------------------
    React.useEffect(() => {
        const fetchPrerequisitesData = async () => {
            try {
                const contentResponse = await getContentList({ page: 1, rowsPerPage: 100 });
                if (contentResponse?.success) {
                    const options = contentResponse.data.map((item) => ({ value: item.id, label: item.Name }));
                    setContentOptions(options);
                }
                const stakeholderResponse = await getStakeholderListAsync({ page: 1, rowsPerPage: 100 });
                if (stakeholderResponse?.success) {
                    const options = stakeholderResponse.data.map((item) => ({ value: item.id, label: item.Name }));
                    setStakeholderOptions(options);
                }
                const retailPartnerResponse = await getRetailPartnerListAsync({ page: 1, rowsPerPage: 100 });
                if (retailPartnerResponse?.success) {
                    const options = retailPartnerResponse.data.map((item) => ({ value: item.id, label: item.Name }));
                    setRetailPartnerOptions(options);
                }
                const partnerResponse = await getPartnerListAsync({ page: 1, rowsPerPage: 100 });
                if (partnerResponse?.success) {
                    const options = partnerResponse.data.map((item) => ({ value: item.id, label: item.Name }));
                    setPartnerOptions(options);
                }
                const spaceResponse = await getSpaceListAsync({ page: 1, rowsPerPage: 100 });
                if (spaceResponse?.success) {
                    const options = spaceResponse.data.map((item) => ({ value: item.id, label: item.Name }));
                    setSpaceOptions(options);
                }
            } catch (err) {
                console.error(err);
            }
        }

        fetchPrerequisitesData();
    }, []);

    // --------------- Fetch campaign during update -------------------
    React.useEffect(() => {
        const fetchSingleCampaign = async () => {
            try {
                const res = await getCampaignAsync(id);
                if (res?.success) {
                    setData(res.data);
                }
            } catch (err) {
                console.error(err);
            }
        }

        if (id) {
            fetchSingleCampaign();
        }
    }, [id])

    // --------------- Set values during update -------------------
    React.useEffect(() => {
        if (data) {
            setValues(defaultCampaign(data));
        }
    }, [data, setValues]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <CustomTextField
                            name="name"
                            label="Name"
                            value={values.name}
                            onChange={handleChange}
                        />
                        <ErrorMessage error={errors.name} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <CustomTextField
                            name="client"
                            label="Client"
                            value={values.client}
                            onChange={handleChange}
                        />
                        <ErrorMessage error={errors.name} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <CustomDatePicker
                            label="Start Date"
                            error={errors.startDate}
                            value={values.startDate}
                            format="YYYY-MM-DD"
                            onChange={(value) => setFieldValue('startDate', value)}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <CustomDatePicker
                            label="End Date"
                            error={errors.endDate}
                            value={values.endDate}
                            format="YYYY-MM-DD"
                            onChange={(value) => setFieldValue('endDate', value)}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <CustomTextField
                            name="budget"
                            label="Budget"
                            value={values.budget}
                            onChange={handleChange}
                            type="number"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <CustomTextField
                            name="totalExpense"
                            label="Total Expense"
                            value={values.totalExpense}
                            onChange={handleChange}
                            type="number"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <CustomTextField
                            name="productExpense"
                            label="Product Expense"
                            value={values.productExpense}
                            onChange={handleChange}
                            type="number"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <CustomTextField
                            name="totalContentEngagement"
                            label="Total Content Engagement"
                            value={values.totalContentEngagement}
                            onChange={handleChange}
                            type="number"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <CustomTextField
                            name="campaignROI"
                            label="Campaign ROI"
                            value={values.campaignROI}
                            onChange={handleChange}
                            type="number"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <CustomSelect
                            name="status"
                            label='Status'
                            value={values.status}
                            onChange={(value) => setFieldValue('status', value)}
                            options={[
                                { value: 'UPCOMING', label: 'Upcomming' },
                                { value: 'ACTIVE', label: 'Active' },
                                { value: 'PAUSED', label: 'Pause' },
                                { value: 'NEEDS_CASE_STUDY', label: 'Needs Case Study' },
                                { value: 'NEEDS_PARTNERS', label: 'Needs Partners' },
                                { value: 'ONBOARDING_PARTNERS', label: 'Onboarding Partners' },
                            ]}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <CustomAutoComplete
                            label='Content HQ'
                            value={values.contentHQ}
                            onChange={(_, value) => setFieldValue('contentHQ', value)}
                            options={contentOptions}
                            multiple
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <CustomAutoComplete
                            label='Stakeholder'
                            value={values.stakeholders}
                            onChange={(_, value) => setFieldValue('stakeholders', value)}
                            options={stakeholderOptions}
                            multiple
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <CustomAutoComplete
                            label='Proposed Partner'
                            value={values.proposedPartners}
                            onChange={(_, value) => setFieldValue('proposedPartners', value)}
                            options={partnerOptions}
                            multiple
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <CustomAutoComplete
                            label='Retail Partner'
                            value={values.retailPartners}
                            onChange={(_, value) => setFieldValue('retailPartners', value)}
                            options={retailPartnerOptions}
                            multiple
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <CustomAutoComplete
                            label='Space'
                            value={values.spaces}
                            onChange={(_, value) => setFieldValue('spaces', value)}
                            options={spaceOptions}
                            multiple
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth error={Boolean(errors.campaignImage)}>
                            <FormLabel sx={{ mb: 1 }}>Campaign Image</FormLabel>
                            <ImageUploader
                                value={values.campaignImage}
                                onFileSelect={(file) => setFieldValue('campaignImage', file)}
                                onDelete={() => setFieldValue('campaignImage', null)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <CustomTextField
                            name="goals"
                            label="Goals"
                            value={values.goals}
                            onChange={handleChange}
                        />
                        <ErrorMessage error={errors.name} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <CustomTextField
                            name="notes"
                            label="Notes"
                            value={values.notes}
                            onChange={handleChange}
                        />
                        <ErrorMessage error={errors.name} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <CustomTextField
                            name="guidelines"
                            label="Guidelines"
                            value={values.guidelines}
                            onChange={handleChange}
                        />
                        <ErrorMessage error={errors.name} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <CustomTextField
                            name="description"
                            label="Description"
                            value={values.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <VideoLinkField
                            name="videoInspirationGallery"
                            value={values.videoInspirationGallery}
                            setFieldValue={setFieldValue}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <MediaUploaderTrigger
                            open={openImageUploadDialog}
                            onClose={() => setOpenImageUploadDialog(false)}
                            onSave={(urls) => setFieldValue('imageInspirationGallery', urls)}
                            value={values?.imageInspirationGallery}
                            label="Inspiration Images"
                            onAdd={() => setOpenImageUploadDialog(true)}
                            onDelete={(filteredUrls) => setFieldValue('imageInspirationGallery', filteredUrls)}
                            folderName='campaigns'
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Stack direction="row" justifyContent="flex-end">
                            <Button size="small" variant="contained" color="primary" disabled={loading} type="submit">
                                Save
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>

            {mediaPreview && <MediaIframeDialog open={true} data={mediaPreview} onClose={() => setMediaPreview(null)} />}
        </>
    );
};
