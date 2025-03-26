'use client';

import { FormControl, FormLabel, InputAdornment } from '@mui/material';
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

import { getPartnerListAsync } from '../../partner/_lib/partner.actions';
import { getPortfolioCategoryListAsync } from '../_lib/portfolio.actions';
import { defaultPortfolio } from '../_lib/portfolio.types';

export const PortfolioForm = ({ data, onSubmit, onChange, errors, onSetFile, onDeleteThumbnail, setFieldValue }) => {
  const [values, setValues] = React.useState(data || defaultPortfolio);

  // *********************States*********************************
  const [mediaPreview, setMediaPreview] = React.useState(null);
  const [openVerticalUploadDialog, setOpenVerticalUploadDialog] = React.useState(false);
  const [openHorizontalUploadDialog, setOpenHorizontalUploadDialog] = React.useState(false);
  const [countries, setCountries] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [portfolioCategories, setPortfolioCategories] = React.useState([]);
  const [partners, setPartners] = React.useState([]);

  // *****************Use Effects*******************************

  React.useEffect(() => {
    return () => {
      setValues(defaultPortfolio);
    };
  }, []);

  React.useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  React.useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getCountryListAsync({ page: 1, rowsPerPage: 100 });
        if (res?.success) {
          setCountries(res.data.map((item) => ({ value: item.id, label: item.Name })));
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchCountries();
  }, []);

  React.useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await getStateListAsync({ page: 1, rowsPerPage: 100 });
        if (res?.success) {
          setStates(res.data.map((item) => ({ value: item.id, label: item.Name })));
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchStates();
  }, []);

  React.useEffect(() => {
    const fetchPortfolioCategories = async () => {
      try {
        const res = await getPortfolioCategoryListAsync({ page: 1, rowsPerPage: 100 });
        if (res?.success) {
          setPortfolioCategories(res.data.map((item) => ({ value: item.id, label: item.Name })));
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchPortfolioCategories();
  }, [])

  React.useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await getPartnerListAsync({ page: 1, rowsPerPage: 100 });
        if (res?.success) {
          setPartners(res.data.map((item) => ({ value: item.id, label: item.Name })));
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchPartners();
  }, [])

  return (
    <>
      {/* <PageLoader loading={loading} error={null}> */}
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="projectTitle"
              label="Project Title"
              value={values.projectTitle}
              onChange={onChange}
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
            <CustomTextField
              name="video_url"
              label="Video URL"
              value={values.video_url}
              onChange={onChange}
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
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              name="hero_image"
              label="Hero Image"
              value={values.hero_image}
              onChange={onChange}
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
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomDatePicker
              label={'Date'}
              error={errors.date}
              value={values.date}
              onChange={(value) => setFieldValue('date', value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth error={Boolean(errors.thumbnail)}>
              <FormLabel sx={{ mb: 2.8 }}>Thumbnail</FormLabel>
              <ImageUploader
                value={values.thumbnail}
                onFileSelect={(file) => onSetFile(file)}
                onDelete={onDeleteThumbnail}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="shortDescription"
              label="Short Description"
              value={values.shortDescription}
              onChange={onChange}
              multiline
              rows={2}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="fullDescription"
              label="Full Description"
              value={values.full_description}
              onChange={onChange}
              multiline
              rows={4}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <MediaUploaderTrigger
              open={openVerticalUploadDialog}
              onClose={() => setOpenVerticalUploadDialog(false)}
              onSave={(urls) => setFieldValue('vertical_gallery_images', urls)}
              value={values?.vertical_gallery_images}
              label={'Vertical Gallery Images'}
              onAdd={() => setOpenVerticalUploadDialog(true)}
              onDelete={(filteredUrls) => setFieldValue('vertical_gallery_images', filteredUrls)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <MediaUploaderTrigger
              open={openHorizontalUploadDialog}
              onClose={() => setOpenHorizontalUploadDialog(false)}
              onSave={(urls) => setFieldValue('horizontal_gallery_images', urls)}
              value={values?.horizontal_gallery_images}
              label={'Horizontal Gallery Images'}
              onAdd={() => setOpenHorizontalUploadDialog(true)}
              onDelete={(filteredUrls) => setFieldValue('horizontal_gallery_images', filteredUrls)}
            />
          </Grid>
        </Grid>
      </form>

      {mediaPreview && <MediaIframeDialog open={true} data={mediaPreview} onClose={() => setMediaPreview(null)} />}
    </>
  );
};
