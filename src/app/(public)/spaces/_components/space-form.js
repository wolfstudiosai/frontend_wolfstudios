import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';

import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';

import { MediaUploaderTrigger } from '../../../../components/uploaders/media-uploader-trigger';
import { getCountryListAsync, getStateListAsync } from '../../../../lib/common.actions';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';

export const SpaceForm = ({ formikProps }) => {
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
    // countries: getCountryListAsync,
    // states: getStateListAsync,
    // portfolioCategories: getPortfolioCategoryListAsync,
    // partnerHQ: getPartnerListAsync,
    // caseStudies: getCaseStudyListAsync,
  };
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     if (!autocompleteFocus?.currentItem) return;
  //     const { currentItem, prevItems } = autocompleteFocus;

  //     if (prevItems.includes(currentItem)) return;
  //     const fetchFunction = fetchFunctionsMap[currentItem];
  //     if (!fetchFunction) return;

  //     try {
  //       const response = await fetchFunction({ page: 1, rowsPerPage: 100 });
  //       if (response?.success) {
  //         const options = response.data.map((item) => ({
  //           value: item.id,
  //           label: item.name,
  //         }));

  //         setAutoCompleteOptions((prevState) => ({
  //           ...prevState,
  //           [currentItem]: options,
  //         }));

  //         setAutocompleteFocus((prevState) => ({
  //           currentItem: '',
  //           prevItems: [...prevState.prevItems, currentItem],
  //         }));
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, [autocompleteFocus]);

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
              open={openImageUploadDialog}
              onClose={() => setOpenImageUploadDialog(false)}
              onSave={(urls) => setFieldValue('thumbnailImage', urls)}
              value={values?.thumbnailImage}
              label="Thumbnail Image"
              onAdd={() => setOpenImageUploadDialog(true)}
              onDelete={(filteredUrls) => setFieldValue('thumbnailImage', filteredUrls)}
              folderName="campaigns"
              isMultiple={false}
              hideVideoUploader
              hideImageUploader={false}
            />
            <ErrorMessage error={errors.thumbnailImage} />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField name="name" label="Name" value={values.name} onChange={handleChange} />
            <ErrorMessage error={errors.name} />
          </Grid>
        </Grid>
      </form>
    </>
  );
};
