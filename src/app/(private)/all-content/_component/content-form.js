'use client';

import { CampaignAutoSearch } from '@/components/autosearches/campaign-group-autosearch';
import { ErrorMessage } from '@/components/formFields/error-message';
import { MediaIframeDialog } from '@/components/media-iframe-dialog/media-iframe-dialog';
import { FormLabel } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';


export const ContentForm = ({ data, onSubmit, onChange, errors, onSetFile, onDeleteThumbnail, setFieldValue }) => {
  const [values, setValues] = React.useState(data);

  // *********************States*********************************
  const [mediaPreview, setMediaPreview] = React.useState(null);
  const [openImageGalleryDialog, setOpenImageGalleryDialog] = React.useState(false);
  const [openVideoGalleryDialog, setOpenVideoGalleryDialog] = React.useState(false);

  const handleChangeCampaignGroup = (value) => {
    setFieldValue('campaign_group_id', value?.id);
    setFieldValue('campaign_group_name', value?.name);
  };

  const handleDeleteThumbnail = () => {
    setFieldValue('campaign_image', '');
    onSetFile(null);
  };

  // *****************Use Effects*******************************
  // React.useEffect(() => {
  //   return () => {
  //     setValues(defaultCampaign);
  //   };
  // }, []);

  React.useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormLabel>Campaign Group</FormLabel>
            <CampaignAutoSearch
              name={values.campaign_group_name}
              id={values.campaign_group_id}
              onSelect={(value) => handleChangeCampaignGroup(value)}
            />
            <ErrorMessage error={errors.campaign_group_id} />
          </Grid>
          
        </Grid>
      </form>

      {mediaPreview && <MediaIframeDialog open={true} data={mediaPreview} onClose={() => setMediaPreview(null)} />}
    </>
  );
};
