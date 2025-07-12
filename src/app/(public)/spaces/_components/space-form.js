import React from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CustomAutoCompleteV2 } from '/src/components/formFields/custom-auto-complete-v2';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomSelect } from '/src/components/formFields/custom-select';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';

import { CustomMultipleInputFieldV2 } from '../../../../components/formFields/custom-multiple-input-field-v2';
import { CustomMultipleSelect } from '../../../../components/formFields/custom-multiple-select';
import { MediaUploaderTrigger } from '../../../../components/uploaders/media-uploader-trigger';
import {
  getCityListAsync,
  getCountryListAsync,
  getDestinationListAsync,
  getStateListAsync,
  getTagListAsync,
} from '../../../../lib/common.actions';
import { getCampaignListAsync } from '../../campaign/_lib/campaign.actions';
import { getProductionListAsync } from '../../production/_lib/production.action';

export const SpaceForm = ({ formikProps }) => {
  // ------------------------------------------- State ------------------------------------------
  const [autocompleteFocus, setAutocompleteFocus] = React.useState({
    currentItem: '',
    prevItems: [],
  });
  const [uploaderStates, setUploaderStates] = React.useState({
    showcaseYourLastProjectHereWithUs: false,
    horizontalGallery: false,
    verticalGallery: false,
    videoLink: false,
    thumbnailImage: false,
  });
  const [autoCompleteOptions, setAutoCompleteOptions] = React.useState({
    campaigns: [],
    cities: [],
    tags: [],
    states: [],
    countries: [],
    productionHQ: [],
    destinations: [],
  });

  const paging = { page: 1, rowsPerPage: 20 };

  // ------------------------------------------ Formik -----------------------------------------
  const { values, errors, handleChange, setFieldValue, handleSubmit, setValues } = formikProps;

  // ------------------------------------------- Fetch prequisites -----------------------------
  const fetchFunctionsMap = {
    campaigns: getCampaignListAsync,
    cities: getCityListAsync,
    tags: getTagListAsync,
    countries: getCountryListAsync,
    states: getStateListAsync,
    productionHQ: getProductionListAsync,
    destinations: getDestinationListAsync,
  };

  React.useEffect(() => {
    const fetchData = async () => {
      if (!autocompleteFocus?.currentItem) return;
      const { currentItem, prevItems } = autocompleteFocus;

      if (prevItems.includes(currentItem)) return;
      const fetchFunction = fetchFunctionsMap[currentItem];
      if (!fetchFunction) return;

      try {
        const response = await fetchFunction(paging);
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

  // -------------------------------------------- JSX -------------------------------------------
  return (
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
            open={uploaderStates.thumbnailImage}
            onClose={() => setUploaderStates((prev) => ({ ...prev, thumbnailImage: false }))}
            onSave={(urls) => setFieldValue('thumbnailImage', urls)}
            value={values?.thumbnailImage}
            label="Thumbnail Image"
            onAdd={() => setUploaderStates((prev) => ({ ...prev, thumbnailImage: true }))}
            onDelete={(filteredUrls) => setFieldValue('thumbnailImage', filteredUrls)}
            folderName="campaigns"
            isMultiple={false}
            hideVideoUploader
            hideImageUploader={false}
          />
          <ErrorMessage error={errors.thumbnailImage} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField name="name" label="Name" value={values.name} onChange={handleChange} />
          <ErrorMessage error={errors.name} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField name="phoneNumber" label="Phone number" value={values.phoneNumber} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomDatePicker
            label="Date listed"
            error={errors.dateListed}
            value={values.dateListed}
            format="YYYY-MM-DD"
            onChange={(value) => setFieldValue('dateListed', value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomMultipleSelect
            label="Type"
            value={values.type}
            onChange={(newValues) => setFieldValue('type', newValues)}
            options={[
              { value: 'Studio', label: 'Studio' },
              { value: 'Creative', label: 'Creative' },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField name="colorTone" label="Color tone" value={values.colorTone} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            type="number"
            name="startingRatehr"
            label="Starting rate/hr"
            value={values.startingRatehr}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField name="bookingLink" label="Booking link" value={values.bookingLink} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            type="number"
            name="minimumHourlyBooking"
            label="Minimum hourly booking"
            value={values.minimumHourlyBooking}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      {/* Additional Information */}
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
            Additional Information
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField name="intro" label="Intro" value={values.intro} onChange={handleChange} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            name="aboutThisSpace"
            label="About this space"
            value={values.aboutThisSpace}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            name="seeTheSpace"
            label="See the space"
            value={values.seeTheSpace}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            name="addToProject"
            label="Add to project"
            value={values.addToProject}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            name="recentCreatorsWhoBookedHere"
            label="Recent creators who booked here"
            value={values.recentCreatorsWhoBookedHere}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            name="parkingInstructions"
            label="Parking instructions"
            value={values.parkingInstructions}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            name="lightingInformation"
            label="Lighting information"
            value={values.lightingInformation}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            name="soundInformation"
            label="Sound information"
            value={values.soundInformation}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField name="spaceAccess" label="Space access" value={values.spaceAccess} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField name="hostRules" label="Host rules" value={values.hostRules} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField name="electrical" label="Electrical" value={values.electrical} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            name="permitDetails"
            label="Permit details"
            value={values.permitDetails}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            type="number"
            name="attendeeLimit"
            label="Attendee limit"
            value={values.attendeeLimit}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            type="number"
            name="squareFootage"
            label="Square footage"
            value={values.squareFootage}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField name="bedrooms" label="Bedrooms" value={values.bedrooms} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField name="bathrooms" label="Bathrooms" value={values.bathrooms} onChange={handleChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomTextField
            name="availableHours"
            label="Available hours"
            value={values.availableHours}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomMultipleSelect
            label="Space Style"
            value={values.spaceStyle}
            onChange={(newValues) => setFieldValue('spaceStyle', newValues)}
            options={[
              { value: 'Artistic', label: 'Artistic' },
              { value: 'Bright', label: 'Bright' },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            name="cycWall"
            label="cycwall"
            value={values.cycwall}
            onChange={(value) => setFieldValue('cycwall', value)}
            options={[
              { value: 'Yes', label: 'Yes' },
              { value: 'No', label: 'No' },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomMultipleSelect
            label="Props"
            value={values.props}
            onChange={(newValues) => setFieldValue('props', newValues)}
            options={[
              { value: 'Camera', label: 'Camera' },
              { value: 'Lighting Kit', label: 'Lighting Kit' },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomMultipleSelect
            label="Theme"
            value={values.theme}
            onChange={(newValues) => setFieldValue('theme', newValues)}
            options={[
              { value: 'Creative', label: 'Creative' },
              { value: 'Inspiring', label: 'Inspiring' },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomMultipleSelect
            label="Available Lighting"
            value={values.availableLighting}
            onChange={(newValues) => setFieldValue('availableLighting', newValues)}
            options={[
              { value: 'Natural', label: 'Natural' },
              { value: 'Softbox', label: 'Softbox' },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomMultipleInputFieldV2 name="adons" label="Ad-ons" value={values?.adons} setFieldValue={setFieldValue} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomMultipleInputFieldV2
            name="features"
            label="Features"
            value={values?.features}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, border: '1px solid red' }}>
          <CustomAutoCompleteV2
            multiple
            label="Campaign"
            name="campaigns"
            value={values.campaigns}
            onChange={(_, value) => setFieldValue('campaigns', value)}
            defaultOptions={autoCompleteOptions?.campaigns}
            fetchOptions={async (debounceValue) => {
              const res = await getCampaignListAsync(paging, debounceValue);
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
          <CustomAutoCompleteV2
            multiple
            label="Cities"
            name="cities"
            value={values.cities}
            onChange={(_, value) => setFieldValue('cities', value)}
            defaultOptions={autoCompleteOptions?.cities}
            fetchOptions={async (debounceValue) => {
              const res = await getCityListAsync(paging, debounceValue);
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
          <CustomAutoCompleteV2
            multiple
            label="Countries"
            name="countries"
            value={values.countries}
            onChange={(_, value) => setFieldValue('countries', value)}
            defaultOptions={autoCompleteOptions?.countries}
            fetchOptions={async (debounceValue) => {
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
          <CustomAutoCompleteV2
            multiple
            label="States"
            name="states"
            value={values.states}
            onChange={(_, value) => setFieldValue('states', value)}
            defaultOptions={autoCompleteOptions?.states}
            fetchOptions={async (debounceValue) => {
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
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomAutoCompleteV2
            multiple
            label="Tags"
            name="tags"
            value={values.tags}
            onChange={(_, value) => setFieldValue('tags', value)}
            defaultOptions={autoCompleteOptions?.tags}
            fetchOptions={async (debounceValue) => {
              const res = await getTagListAsync(paging, debounceValue);
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
          <CustomAutoCompleteV2
            multiple
            label="Destinations"
            name="destinations"
            value={values.destinations}
            onChange={(_, value) => setFieldValue('destinations', value)}
            defaultOptions={autoCompleteOptions?.destinations}
            fetchOptions={async (debounceValue) => {
              const res = await getDestinationListAsync(paging, debounceValue);
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
          <CustomAutoCompleteV2
            multiple
            label="Production HQs"
            name="productionHQ"
            value={values.productionHQ}
            onChange={(_, value) => setFieldValue('productionHQ', value)}
            defaultOptions={autoCompleteOptions?.productionHQ}
            fetchOptions={async (debounceValue) => {
              const res = await getProductionListAsync(paging, debounceValue);
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
          <CustomAutoCompleteV2
            multiple
            label="Production HQs 2"
            name="productionHQ2"
            value={values.productionHQ2}
            onChange={(_, value) => setFieldValue('productionHQ2', value)}
            defaultOptions={autoCompleteOptions?.productionHQ}
            fetchOptions={async (debounceValue) => {
              const res = await getProductionListAsync(paging, debounceValue);
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
          <MediaUploaderTrigger
            open={uploaderStates.showcaseYourLastProjectHereWithUs}
            onClose={() => setUploaderStates((prev) => ({ ...prev, showcaseYourLastProjectHereWithUs: false }))}
            onSave={(urls) => setFieldValue('showcaseYourLastProjectHereWithUs', urls)}
            value={values?.showcaseYourLastProjectHereWithUs}
            label="Showcase Your Last Project Here With Us"
            onAdd={() => setUploaderStates((prev) => ({ ...prev, showcaseYourLastProjectHereWithUs: true }))}
            onDelete={(filteredUrls) => setFieldValue('showcaseYourLastProjectHereWithUs', filteredUrls)}
            folderName="campaigns"
            hideImageUploader={false}
            hideVideoUploader={true}
            isMultiple={true}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MediaUploaderTrigger
            open={uploaderStates.travelTimePlaceholderImageForGoogleMaps}
            onClose={() => setUploaderStates((prev) => ({ ...prev, travelTimePlaceholderImageForGoogleMaps: false }))}
            onSave={(urls) => setFieldValue('travelTimePlaceholderImageForGoogleMaps', urls)}
            value={values?.travelTimePlaceholderImageForGoogleMaps}
            label="Travel Time Placeholder Image For Google Maps"
            onAdd={() => setUploaderStates((prev) => ({ ...prev, travelTimePlaceholderImageForGoogleMaps: true }))}
            onDelete={(filteredUrls) => setFieldValue('travelTimePlaceholderImageForGoogleMaps', filteredUrls)}
            folderName="campaigns"
            hideImageUploader={false}
            hideVideoUploader={true}
            isMultiple={true}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MediaUploaderTrigger
            open={uploaderStates.featuredGallery}
            onClose={() => setUploaderStates((prev) => ({ ...prev, featuredGallery: false }))}
            onSave={(urls) => setFieldValue('featuredGallery', urls)}
            value={values?.featuredGallery}
            label="Featured Gallery"
            onAdd={() => setUploaderStates((prev) => ({ ...prev, featuredGallery: true }))}
            onDelete={(filteredUrls) => setFieldValue('featuredGallery', filteredUrls)}
            folderName="campaigns"
            hideImageUploader={false}
            hideVideoUploader={true}
            isMultiple={true}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MediaUploaderTrigger
            open={uploaderStates.mainGallery}
            onClose={() => setUploaderStates((prev) => ({ ...prev, mainGallery: false }))}
            onSave={(urls) => setFieldValue('mainGallery', urls)}
            value={values?.mainGallery}
            label="Main Gallery"
            onAdd={() => setUploaderStates((prev) => ({ ...prev, mainGallery: true }))}
            onDelete={(filteredUrls) => setFieldValue('mainGallery', filteredUrls)}
            folderName="campaigns"
            hideImageUploader={false}
            hideVideoUploader={true}
            isMultiple={true}
          />
        </Grid>
      </Grid>
    </form>
  );
};
