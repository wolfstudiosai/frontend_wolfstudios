'use client';

import React from 'react';
import { CustomSelect } from '@/components/formFields/custom-select';
import { CustomTextField } from '@/components/formFields/custom-textfield';
import { ErrorMessage } from '@/components/formFields/error-message';
import { MediaIframeDialog } from '@/components/media-iframe-dialog/media-iframe-dialog';
import { ImageUploader } from '@/components/uploaders/image-uploader';
import { FormControl, FormLabel } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { defaultPartner } from '../_lib/partner.types';

export const PartnerForm = ({ data, onSubmit, onChange, errors, onSetFile, onDelete, setFieldValue }) => {
  const [values, setValues] = React.useState(data || defaultPartner);

  // *********************States*********************************
  const [mediaPreview, setMediaPreview] = React.useState(null);
  const [openVerticalUploadDialog, setOpenVerticalUploadDialog] = React.useState(false);
  const [openHorizontalUploadDialog, setOpenHorizontalUploadDialog] = React.useState(false);

  // *****************Use Effects*******************************

  React.useEffect(() => {
    return () => {
      setValues(defaultPartner);
    };
  }, []);

  React.useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  return (
    <>
      {/* <PageLoader loading={loading} error={null}> */}
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="name" label="Name" value={values.name} onChange={onChange} />
            <ErrorMessage error={errors.name} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="email" type={'email'} label="Email" value={values.email} onChange={onChange} />
            <ErrorMessage error={errors.email} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="phone" label="Phone" value={values.phone} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="website" label="Website" value={values.website} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="instagram" label="Instagram" value={values.instagram} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="instagram_following"
              label="Instagram Following"
              value={values.instagram_following}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="tiktok" label="Tiktok" value={values.tiktok} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="tiktok_following"
              label="Tiktok Following"
              value={values.tiktok_following}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="youtube" label="Youtube" value={values.youtube} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="youtube_following"
              label="Youtube Following"
              value={values.youtube_following}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="x" label="X" value={values.x} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="x_following" label="X Following" value={values.x_following} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="facebook" label="Facebook" value={values.facebook} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="facebook_following"
              label="Facebook Following"
              value={values.facebook_following}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField name="pinterest" label="pinterest" value={values.pinterest} onChange={onChange} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="pinterest_following"
              label="pinterest Following"
              value={values.pinterest_following}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="partner_IF_rate"
              label="Partner IG rate"
              value={values.partner_IF_rate}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="partner_TT_rate"
              label="Partner TT rate"
              value={values.partner_TT_rate}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="partner_YT_rate"
              label="Partner YT rate"
              value={values.partner_YT_rate}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="partner_UGC_rate"
              label="Partner UGC rate"
              value={values.partner_UGC_rate}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomTextField
              name="partner_360_rate"
              label="Partner 360 rate"
              value={values.partner_360_rate}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomSelect
              label={'Profile category'}
              value={values.profile_category}
              onChange={(value) => setFieldValue('profile_category', value)}
              name="profile_category"
              options={[
                { value: 'MODEL', label: 'Model' },
                { value: 'CREATOR', label: 'Creator' },
                { value: 'PHOTOGRAPHER', label: 'Photographer' },
                { value: 'REVIEW_PARTNER', label: 'Review partner' },
                { value: 'B2B', label: 'b2b' },
                { value: 'BLOG_OR_REVIEWER', label: 'Blog or reviewer' },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomSelect
              label={'Current Status'}
              value={values.current_status}
              onChange={(value) => setFieldValue('current_status', value)}
              name="current_status"
              options={[
                { value: 'ACTIVE', label: 'Active' },
                { value: 'INACTIVE', label: 'Inactive' },
                { value: 'NOT_STARTED', label: 'Not started' },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth error={Boolean(errors.thumbnail)}>
              <FormLabel sx={{ mb: 1 }}>Profile Image</FormLabel>
              <ImageUploader
                value={values.profile_image}
                onFileSelect={(file) => onSetFile(file)}
                onDelete={onDelete}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
