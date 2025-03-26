'use client';

import { FormLabel, InputAdornment } from '@mui/material';
import { Iconify } from '/src/components/iconify/iconify';
import { defaultContent } from '../_lib/all-content.types';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { CustomDatePicker } from '/src/components/formFields/custom-date-picker';
import { ErrorMessage } from '/src/components/formFields/error-message';
import { MediaIframeDialog } from '/src/components/media-iframe-dialog/media-iframe-dialog';
import Grid from '@mui/material/Grid2';
import React from 'react';


export const ContentForm = ({ data, onSubmit, onChange, errors, onSetFile, onDeleteThumbnail, setFieldValue }) => {
  const [values, setValues] = React.useState(data || defaultContent);
  const [mediaPreview, setMediaPreview] = React.useState(null);

  // *****************Use Effects*******************************
  React.useEffect(() => {
    if (data) setValues(data);
  }, [data]);

  const handleArrayChange = (fieldName, value) => {
    const arr = value.split(',').map(item => item.trim());
    setFieldValue(fieldName, arr);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          {/* Basic Information Section */}
          <Grid size={{ xs: 12 }}>
            <CustomTextField name="name" label="Name" value={values.name || ''} onChange={onChange} />
            <ErrorMessage error={errors.name} />
          </Grid>

          <Grid container size={{ xs: 12 }} spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                name="revoPinterest"
                label="Revo Pinterest"
                value={values.revoPinterest || ''}
                onChange={onChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                name="pinAccountsUsed"
                label="Pin Accounts"
                value={values.pinAccountsUsed || ''}
                onChange={onChange}
              />
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="postQuality"
              label="Post Quality"
              value={values.postQuality?.join(', ') || ''}
              onChange={(e) => handleArrayChange('postQuality', e.target.value)}
            />
          </Grid>

          {/* Links Section */}
          <Grid container size={{ xs: 12 }} spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                name="googleDriveFiles"
                label="Google Drive"
                value={values.googleDriveFiles || ''}
                onChange={onChange}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify
                          icon="lucide:link"
                          onClick={() => window.open(values.googleDriveFiles, '_blank')}
                          style={{ cursor: 'pointer' }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                name="playbookLink"
                label="Playbook Link"
                value={values.playbookLink || ''}
                onChange={onChange}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify
                          icon="lucide:link"
                          onClick={() => window.open(values.playbookLink, '_blank')}
                          style={{ cursor: 'pointer' }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* Stats Section */}
          <Grid container size={{ xs: 12 }} spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <CustomTextField
                name="upPromoteConversion"
                label="Promote Conversion"
                type="number"
                value={values.upPromoteConversion || 0}
                onChange={onChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <CustomTextField
                name="assetStatus"
                label="Asset Status"
                select
                value={values.assetStatus || ''}
                onChange={onChange}
              >
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <CustomDatePicker
                label="Month Uploaded"
                views={['year', 'month']}
                value={values.monthUploaded ? new Date(values.monthUploaded) : null}
                onChange={(date) => 
                  setFieldValue('monthUploaded', date ? `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}` : '')
                }
              />
            </Grid>
          </Grid>

          {/* Social Media Section */}
          <Grid container size={{ xs: 12 }} spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                name="revoInstagram"
                label="Instagram Status"
                value={values.revoInstagram || ''}
                onChange={onChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                name="creatorStatus"
                label="Creator Status"
                value={values.creatorStatus || ''}
                onChange={onChange}
              />
            </Grid>
          </Grid>

          {/* TikTok Section */}
          <Grid container size={{ xs: 12 }} spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                name="tikTokAccountsused"
                label="TikTok Accounts"
                value={values.tikTokAccountsused || ''}
                onChange={onChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                name="TTDummyAccountsUsed"
                label="Dummy Accounts"
                value={values.TTDummyAccountsUsed?.join(', ') || ''}
                onChange={(e) => handleArrayChange('TTDummyAccountsUsed', e.target.value)}
              />
            </Grid>
          </Grid>

          {/* Partner Section */}
          <Grid size={{ xs: 12 }}>
            <FormLabel component="legend">Partner Metrics</FormLabel>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomTextField
                  name="partner.TikTokLink"
                  label="TikTok Link"
                  value={values.partner?.TikTokLink || ''}
                  onChange={onChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <CustomTextField
                  name="partner.TTViews"
                  label="TT Views"
                  type="number"
                  value={values.partner?.TTViews || 0}
                  onChange={onChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <CustomTextField
                  name="partner.TTLikes"
                  label="TT Likes"
                  type="number"
                  value={values.partner?.TTLikes || 0}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Additional Sections for IG, YT, Pinterest, REVO can be added similarly */}
          
        </Grid>
      </form>

      {mediaPreview && <MediaIframeDialog open={true} data={mediaPreview} onClose={() => setMediaPreview(null)} />}
    </>
  );
};
