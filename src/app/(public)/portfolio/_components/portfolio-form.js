'use client';

import { Button, FormControl, FormLabel, InputAdornment, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';
import { getCountryListAsync, getStateListAsync } from '/src/actions/common';
import { CustomAutoComplete } from '/src/components/formFields/custom-auto-complete';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';
import { Iconify } from '/src/components/iconify/iconify';
import { MediaIframeDialog } from '/src/components/media-iframe-dialog/media-iframe-dialog';
import { ImageUploader } from '/src/components/uploaders/image-uploader';
import { MediaUploaderTrigger } from '/src/components/uploaders/media-uploader-trigger';

import { useFormik } from 'formik';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';
import { createPortfolioAsync, getPortfolioCategoryListAsync, updatePortfolioAsync } from '../_lib/portfolio.actions';
import { defaultPortfolio } from '../_lib/portfolio.types';
import { formConstants } from '/src/app/constants/form-constants';
import { imageUploader } from '/src/utils/upload-file';

export const PortfolioForm = ({ data, onClose, fetchList }) => {
  console.log(data);
  // *********************States*********************************
  const [loading, setLoading] = React.useState(false);
  const [mediaPreview, setMediaPreview] = React.useState(null);
  const [openVerticalUploadDialog, setOpenVerticalUploadDialog] = React.useState(false);
  const [openHorizontalUploadDialog, setOpenHorizontalUploadDialog] = React.useState(false);
  const [countries, setCountries] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [portfolioCategories, setPortfolioCategories] = React.useState([]);
  const [partners, setPartners] = React.useState([]);

  // ***************** Formik *******************************

  const { values, errors, handleChange, handleSubmit, setValues, setFieldValue, resetForm } =
    useFormik({
      initialValues: defaultPortfolio(data),
      validate: (values) => {
        const errors = {};
        if (!values.projectTitle) {
          errors.projectTitle = formConstants.required;
        }

        return errors;
      },
      onSubmit: async (values) => {
        setLoading(true);
        try {
          const imageFields = ['singlePageHeroImage', 'thumbnailImage', 'imagefield'];

          // Step 1: Collect image files and their metadata
          for (const field of imageFields) {
            const file = values[field];
            if (file instanceof File) {
              const res = await imageUploader([{
                file,
                fileName: file.name.split('.').slice(0, -1).join('.'),
                fileType: file.type.split('/')[1],
              }], 'portfolios');

              values[field] = res;
            }
          }

          console.log(values);

          const res = data ? await updatePortfolioAsync(values) : await createPortfolioAsync(values);
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

  // *****************Use Effects****************************

  // React.useEffect(() => {
  //   return () => {
  //     setValues(defaultPortfolio);
  //   };
  // }, []);

  // React.useEffect(() => {
  //   if (data) {
  //     setValues(data);
  //   }
  // }, [data]);

  React.useEffect(() => {
    const fetchPrerequisitesData = async () => {
      try {
        const countryResponse = await getCountryListAsync({ page: 1, rowsPerPage: 100 });
        if (countryResponse?.success) {
          setCountries(countryResponse.data.map((item) => ({ value: item.id, label: item.Name })));
        }
        const stateResponse = await getStateListAsync({ page: 1, rowsPerPage: 100 });
        if (stateResponse?.success) {
          setStates(stateResponse.data.map((item) => ({ value: item.id, label: item.Name })));
        }
        const categoryResponse = await getPortfolioCategoryListAsync({ page: 1, rowsPerPage: 100 });
        if (categoryResponse?.success) {
          setPortfolioCategories(categoryResponse.data.map((item) => ({ value: item.id, label: item.Name })));
        }
        const partnerResponse = await getPartnerListAsync({ page: 1, rowsPerPage: 100 });
        if (partnerResponse?.success) {
          setPartners(partnerResponse.data.map((item) => ({ value: item.id, label: item.Name })));
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchPrerequisitesData();
  }, []);

  return (
    <>
      {/* <PageLoader loading={loading} error={null}> */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="projectTitle"
              label="Project Title"
              value={values.projectTitle}
              onChange={handleChange}
            />
            <ErrorMessage error={errors.projectTitle} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoComplete
              label='Categories'
              value={values.portfolioCategories}
              onChange={(_, value) => setFieldValue('portfolioCategories', value.map(i => i.value))}
              options={portfolioCategories}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoComplete
              label='Partners'
              value={values.partnerHQ}
              onChange={(_, value) => setFieldValue('partnerHQ', value.map(i => i.value))}
              options={partners}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoComplete
              label='States'
              value={values.states}
              onChange={(_, value) => setFieldValue('states', value.map(i => i.value))}
              options={states}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoComplete
              label='Countries'
              value={values.countries}
              onChange={(_, value) => setFieldValue('countries', value.map(i => i.value))}
              options={countries}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomDatePicker
              label={'Date'}
              error={errors.date}
              value={values.date}
              format="MMMM YYYY"
              onChange={(value) => setFieldValue('date', value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              name="video_url"
              label="Video URL"
              value={values.video_url}
              onChange={handleChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end" title="Preview Video">
                      <Iconify
                        style={{ cursor: 'pointer' }}
                        icon="lucide:view"
                        onClick={() => setMediaPreview(values.video_url)}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          {/* <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              name="hero_image"
              label="Hero Image"
              value={values.hero_image}
              onChange={handleChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end" title="Preview Image">
                      <Iconify
                        style={{ cursor: 'pointer' }}
                        icon="lucide:view"
                        onClick={() => setMediaPreview(values.hero_image)}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid> */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth error={Boolean(errors.thumbnail)}>
              <FormLabel sx={{ mb: 1 }}>Image Field</FormLabel>
              <ImageUploader
                value={values.singlePageHeroImage}
                onFileSelect={(file) => setFieldValue('imagefield', file)}
                onDelete={() => setFieldValue('imagefield', null)}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth error={Boolean(errors.thumbnail)}>
              <FormLabel sx={{ mb: 1 }}>Hero Image</FormLabel>
              <ImageUploader
                value={values.singlePageHeroImage}
                onFileSelect={(file) => setFieldValue('singlePageHeroImage', file)}
                onDelete={() => setFieldValue('singlePageHeroImage', null)}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth error={Boolean(errors.thumbnail)}>
              <FormLabel sx={{ mb: 1 }}>Thumbnail</FormLabel>
              <ImageUploader
                value={values.thumbnail}
                onFileSelect={(file) => setFieldValue('thumbnailImage', file)} // onFileSelect(file)}
                onDelete={() => setFieldValue('thumbnailImage', null)}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="shortDescription"
              label="Short Description"
              value={values.shortDescription}
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="fullDescription"
              label="Full Description"
              value={values.full_description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <MediaUploaderTrigger
              open={openVerticalUploadDialog}
              onClose={() => setOpenVerticalUploadDialog(false)}
              onSave={(urls) => setFieldValue('verticalImageGallery', urls)}
              value={values?.verticalImageGallery}
              label={'Vertical Gallery Images'}
              onAdd={() => setOpenVerticalUploadDialog(true)}
              onDelete={(filteredUrls) => setFieldValue('verticalImageGallery', filteredUrls)}
              folderName='portfolios'
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <MediaUploaderTrigger
              open={openHorizontalUploadDialog}
              onClose={() => setOpenHorizontalUploadDialog(false)}
              onSave={(urls) => setFieldValue('horizontalImageGallery', urls)}
              value={values?.horizontalImageGallery}
              label={'Horizontal Gallery Images'}
              onAdd={() => setOpenHorizontalUploadDialog(true)}
              onDelete={(filteredUrls) => setFieldValue('horizontalImageGallery', filteredUrls)}
              folderName='portfolios'
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
