import Grid from '@mui/material/Grid2';
import React from 'react';

import { CustomAutoComplete } from '/src/components/formFields/custom-auto-complete';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { ErrorMessage } from '/src/components/formFields/error-message';
import { MediaIframeDialog } from '/src/components/media-iframe-dialog/media-iframe-dialog';

import { getCountryListAsync, getStateListAsync } from '../../../../lib/common.actions';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';
import { getSpaceCategoryListAsync } from '../_lib/space.actions';
import { defaultSpace1 } from '../_lib/space.types';

export const SpaceForm = ({ data, onSubmit, onChange, errors, onSetFile, onDeleteThumbnail, setFieldValue }) => {
  const [values, setValues] = React.useState(data || defaultSpace1);
  const types = [
    { value: 'Castle', label: 'Castle' },
    { value: 'Studio', label: 'Studio' },
    { value: 'Creative', label: 'Creative' },
    { value: 'House', label: 'House' },
  ];

  const spaceStyle = [
    { value: 'Artistic', label: 'Artistic' },
    { value: 'Bright', label: 'Bright' },
    { value: 'Creative', label: 'Creative' },
  ];

  const props = [
    { value: 'Camera', label: 'Camera' },
    { value: 'Lighting Kit', label: 'Lighting Kit' },
  ];

  const theme = [
    { value: 'Creative', label: 'Creative' },
    { value: 'Inspiring', label: 'Inspiring' },
    { value: 'Lifestyle', label: 'Lifestyle' },
  ];

  const availableLighting = [
    { value: 'Natural', label: 'Natural' },
    { value: 'Softbox', label: 'Softbox' },
    { value: 'LED', label: 'LED' },
    { value: 'Fluorescent', label: 'Fluorescent' },
  ];

  const adOns = [
    { value: 'Photography Equipment', label: 'Photography Equipment' },
    { value: 'Sound System', label: 'Sound System' },
    { value: 'Lighting', label: 'Lighting' },
  ];

  const features = [
    { value: 'Camera', label: 'Camera' },
    { value: 'Lighting Kit', label: 'Lighting Kit' },
  ];

  // *********************States*********************************
  const [mediaPreview, setMediaPreview] = React.useState(null);
  const [openVerticalUploadDialog, setOpenVerticalUploadDialog] = React.useState(false);
  const [openHorizontalUploadDialog, setOpenHorizontalUploadDialog] = React.useState(false);
  const [countries, setCountries] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [spaceCategories, setSpaceCategories] = React.useState([]);
  const [partners, setPartners] = React.useState([]);

  // *****************Use Effects*******************************

  React.useEffect(() => {
    return () => {
      setValues(defaultSpace1);
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
    };

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
    };

    fetchStates();
  }, []);

  React.useEffect(() => {
    const fetchspaceCategories = async () => {
      try {
        const res = await getSpaceCategoryListAsync({ page: 1, rowsPerPage: 100 });
        if (res?.success) {
          setSpaceCategories(res.data.map((item) => ({ value: item.id, label: item.Name })));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchspaceCategories();
  }, []);

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
    };

    fetchPartners();
  }, []);

  return (
    <>
      {/* <PageLoader loading={loading} error={null}> */}
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <CustomTextField name="name" label="Name" value={values.name} onChange={onChange} />
            <ErrorMessage error={errors.name} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="startingRatehr"
              label="Starting Rate/hr"
              value={values.startingRatehr}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="bookingLink" label="Booking Link" value={values.bookingLink} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Type"
              value={values.type}
              onChange={(_, value) =>
                setFieldValue(
                  'type',
                  value.map((i) => i.value)
                )
              }
              options={types}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Space Style"
              value={values.spaceStyle}
              onChange={(_, value) =>
                setFieldValue(
                  'spaceStyle',
                  value.map((i) => i.value)
                )
              }
              options={spaceStyle}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Props"
              value={values.props}
              onChange={(_, value) =>
                setFieldValue(
                  'props',
                  value.map((i) => i.value)
                )
              }
              options={props}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Theme"
              value={values.theme}
              onChange={(_, value) =>
                setFieldValue(
                  'theme',
                  value.map((i) => i.value)
                )
              }
              options={theme}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Available Lighting"
              value={values.availableLighting}
              onChange={(_, value) =>
                setFieldValue(
                  'availableLighting',
                  value.map((i) => i.value)
                )
              }
              options={availableLighting}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Add Ons"
              value={values.adOns}
              onChange={(_, value) =>
                setFieldValue(
                  'adOns',
                  value.map((i) => i.value)
                )
              }
              options={adOns}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField label="CycWall" name="cycWall" value={values.cycWall} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="Backdrop System"
              name="backdropSystem"
              value={values.backdropSystem}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutoComplete
              label="Features"
              value={values.features}
              onChange={(_, value) =>
                setFieldValue(
                  'features',
                  value.map((i) => i.value)
                )
              }
              options={features}
              multiple
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="Minimum Hourly Booking"
              name="minimumHourlyBooking"
              value={values.minimumHourlyBooking}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField label="Intro" name="intro" value={values.intro} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="About this Space"
              name="aboutThisSpace"
              value={values.aboutThisSpace}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField label="See the Space" name="seeTheSpace" value={values.seeTheSpace} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="Add to Project"
              name="addToProject"
              value={values.addToProject}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="Recent Creators Who Booked Here"
              name="recentCreatorsWhoBookedHere"
              value={values.recentCreatorsWhoBookedHere}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField label="Phone Number" name="phoneNumber" value={values.phoneNumber} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="Attendee Limit"
              name="attendeeLimit"
              value={values.attendeeLimit}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField label="Color Tone" name="colorTone" value={values.colorTone} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="Parking Instructions"
              name="parkingInstructions"
              value={values.parkingInstructions}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="Lighting Information"
              name="lightingInformation"
              value={values.lightingInformation}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="Sound Information"
              name="soundInformation"
              value={values.soundInformation}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField label="Space Access" name="spaceAccess" value={values.spaceAccess} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField label="Host Rules" name="hostRules" value={values.hostRules} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField label="Electrical" name="electrical" value={values.electrical} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="Permit Details"
              name="permitDetails"
              value={values.permitDetails}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField label="Bedrooms" name="bedrooms" value={values.bedrooms} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField label="Bathrooms" name="bathrooms" value={values.bathrooms} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="Square Footage"
              name="squareFootage"
              value={values.squareFootage}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              label="Available Hours"
              name="availableHours"
              value={values.availableHours}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomDatePicker
              label={'Date Listed'}
              error={errors.date}
              value={values.dateListed}
              format="MMMM YYYY"
              onChange={(value) => setFieldValue('dateListed', value)}
            />
          </Grid>
        </Grid>
      </form>

      {mediaPreview && <MediaIframeDialog open={true} data={mediaPreview} onClose={() => setMediaPreview(null)} />}
    </>
  );
};
