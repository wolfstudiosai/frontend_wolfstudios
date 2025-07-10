'use client';

import React from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CustomAutoCompleteV2 } from '/src/components/formFields/custom-auto-complete-v2';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';

import { getPortfolioCategoryListAsync } from '../_lib/portfolio.actions';
import { MediaUploaderTrigger } from '../../../../components/uploaders/media-uploader-trigger';
import { getCaseStudyListAsync, getCountryListAsync, getStateListAsync } from '../../../../lib/common.actions';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';

export const PortfolioForm = ({ formikProps }) => {
  const [autocompleteFocus, setAutocompleteFocus] = React.useState({
    currentItem: '',
    prevItems: [],
  });
  const [thumbnailImage, setThumbnailImage] = React.useState(false);
  const [openImageUploadDialog, setOpenImageUploadDialog] = React.useState(false);

  const [autoCompleteOptions, setAutoCompleteOptions] = React.useState({
    portfolioCategories: [],
    partnerHQ: [],
    states: [],
    countries: [],
    caseStudies: [],
  });
  // ********************* Formik *******************************
  const { values, errors, handleChange, setFieldValue, handleSubmit, setValues } = formikProps;

  // --------------- Fetch Prerequisites Data -------------------
  const fetchFunctionsMap = {
    countries: getCountryListAsync,
    states: getStateListAsync,
    portfolioCategories: getPortfolioCategoryListAsync,
    partnerHQ: getPartnerListAsync,
    caseStudies: getCaseStudyListAsync,
  };
  React.useEffect(() => {
    const fetchData = async () => {
      if (!autocompleteFocus?.currentItem) return;
      const { currentItem, prevItems } = autocompleteFocus;

      if (prevItems.includes(currentItem)) return;
      const fetchFunction = fetchFunctionsMap[currentItem];
      if (!fetchFunction) return;

      try {
        const response = await fetchFunction({ page: 1, rowsPerPage: 100 });
        if (response?.success) {
          const options = response.data.map((item) => ({
            value: item.id,
            label: item.name,
          }));

          setAutoCompleteOptions((prevState) => ({
            ...prevState,
            [currentItem]: options,
          }));

          setAutocompleteFocus((prevState) => ({
            currentItem: '',
            prevItems: [...prevState.prevItems, currentItem],
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [autocompleteFocus]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            py: 2,
            border: '1px solid var(--mui-palette-background-level2)',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
            p: 2,
          }}
        >
          <Grid size={12}>
            <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
              General Information
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <MediaUploaderTrigger
              open={thumbnailImage}
              onClose={() => setThumbnailImage(false)}
              onSave={(urls) => setFieldValue('thumbnailImage', urls)}
              value={values?.thumbnailImage}
              label="Thumbnail Image"
              onAdd={() => setThumbnailImage(true)}
              onDelete={(filteredUrls) => setFieldValue('thumbnailImage', filteredUrls)}
              folderName="campaigns"
              hideVideoUploader
              hideImageUploader={false}
            />
            <ErrorMessage error={errors.thumbnailImage} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="projectTitle"
              label="Project Title"
              value={values.projectTitle}
              onChange={handleChange}
              error={errors.projectTitle}
              placeholder=""
            />
            <ErrorMessage error={errors.projectTitle} />
          </Grid>

          {/* categories */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              label="Categories"
              name="portfolioCategories"
              multiple
              value={values.portfolioCategories}
              defaultOptions={autoCompleteOptions.portfolioCategories}
              onChange={(_, value) => setFieldValue('portfolioCategories', value)}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getPortfolioCategoryListAsync(paging, debounceValue);
                return (
                  res?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                );
              }}
              placeholder={undefined}
              error={undefined}
              onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
            />
          </Grid>

          {/* partners */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              label="Partners"
              name="partnerHQ"
              multiple
              value={values.partnerHQ}
              defaultOptions={autoCompleteOptions.partnerHQ}
              onChange={(_, value) => setFieldValue('partnerHQ', value)}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                const res = await getPartnerListAsync(paging, filters, 'and');
                return (
                  res?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                );
              }}
              placeholder={undefined}
              error={undefined}
              onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
            />
          </Grid>

          {/* states */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              label="States"
              name="states"
              multiple
              value={values.states}
              defaultOptions={autoCompleteOptions.states}
              onChange={(_, value) => setFieldValue('states', value)}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 20 };
                const res = await getStateListAsync(paging, debounceValue);
                return (
                  res?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                );
              }}
              placeholder={undefined}
              error={undefined}
              onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
            />
          </Grid>

          {/* countries */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              label="Countries"
              name="countries"
              multiple
              value={values.countries}
              defaultOptions={autoCompleteOptions.countries}
              onChange={(e, val) => setFieldValue('countries', val)}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 100 };
                const res = await getCountryListAsync(paging, debounceValue);
                return (
                  res?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                );
              }}
              placeholder={undefined}
              error={undefined}
              onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
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
            <ErrorMessage error={errors.date} />
          </Grid>
          {/* <Grid size={{ xs: 12, md: 6 }}>
            <CustomAutoCompleteV2
              label="Case Study"
              name="caseStudies"
              multiple
              value={values.caseStudies}
              defaultOptions={autoCompleteOptions.caseStudies}
              onChange={(e, val) => setFieldValue('caseStudies', val)}
              fetchOptions={async (debounceValue) => {
                const paging = { page: 1, rowsPerPage: 100 };
                const res = await getCaseStudyListAsync(paging, debounceValue);
                return (
                  res?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                );
              }}
              placeholder={undefined}
              error={undefined}
              onFocus={(name) => setAutocompleteFocus({ currentItem: name, prevItems: [] })}
            />
          </Grid> */}
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            py: 2,
            border: '1px solid var(--mui-palette-background-level2)',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
            p: 2,
            mt: 4,
          }}
        >
          <Grid size={12}>
            <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
              Other Information
            </Typography>
          </Grid>

          {/* short description */}
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="projectShortDescription"
              label="Short Description"
              value={values.projectShortDescription}
              onChange={handleChange}
              multiline
              rows={2}
              error={null}
              helperText={''}
            />
          </Grid>

          {/* full description */}
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="projectSinglePageFullDescription"
              label="Full Description"
              value={values.projectSinglePageFullDescription}
              onChange={handleChange}
              multiline
              rows={4}
              error={null}
              helperText={''}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <MediaUploaderTrigger
              open={openImageUploadDialog}
              onClose={() => setOpenImageUploadDialog(false)}
              onSave={(urls) => setFieldValue('imageField', urls)}
              value={values?.imageField}
              label="Inspiration Images"
              onAdd={() => setOpenImageUploadDialog(true)}
              onDelete={(filteredUrls) => setFieldValue('imageField', filteredUrls)}
              folderName="campaigns"
              hideImageUploader={undefined}
              hideVideoUploader
              isMultiple
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};
