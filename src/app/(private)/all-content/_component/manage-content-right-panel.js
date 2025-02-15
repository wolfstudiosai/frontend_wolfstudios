'use client';

import { DeleteConfirmationPopover } from '@/components/dialog/delete-confirmation-popover';
import { DrawerContainer } from '@/components/drawer/drawer';
import { Iconify } from '@/components/iconify/iconify';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

import useAuth from '@/hooks/useAuth';
import { paths } from '@/paths';

import { ContentQuickView } from './content-quick-view';
// import { createCampaignAsync, deleteCampaignAsync, updateCampaignAsync } from '../_lib/campaign.actions';

export const ManageContentRightPanel = ({ open, onClose, fetchList, data, width, view }) => {
  const isUpdate = data?.id ? true : false;
  const router = useRouter();
  const { isLogin } = useAuth();

  const [sidebarView, setSidebarView] = React.useState(view); //QUICK/ EDIT
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    const response = await deleteCampaignAsync([data.id]);
    if (response.success) {
      // fetchList();
      window.location.reload();
    }
  };

  // *****************Action Buttons*******************************
  const actionButtons = (
    <>
      {isLogin && (
        <>
          {/* {sidebarView === 'EDIT' && isUpdate ? (
            <IconButton onClick={() => setSidebarView('QUICK')} title="Edit">
              <Iconify icon="solar:eye-broken" />
            </IconButton>
          ) : (
            isUpdate && (
              <IconButton onClick={() => setSidebarView('EDIT')} title="Quick">
                <Iconify icon="mynaui:edit-one" />
              </IconButton>
            )
          )} */}
          {/* {isUpdate && (
            <IconButton
              onClick={() => router.push(paths.public.campaign_analytics + '/' + data.slug)}
              title="Quick View"
            >
              <Iconify icon="hugeicons:analytics-01" />
            </IconButton>
          )} */}

          {/* <FormControlLabel
            control={
              <Switch
                size="small"
                checked={values?.featured}
                onChange={() => handleFeatured(!values?.featured)}
                color="primary"
                sx={{ ml: 0.4 }}
              />
            }
            label="Featured"
          /> */}

          {/* <DeleteConfirmationPopover title={`Want to delete ${data?.name}?`} onDelete={() => handleDelete()} /> */}

          {/* {sidebarView === 'EDIT' && (
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
              Save
            </Button>
          )} */}
        </>
      )}
    </>
  );

  // *****************Use Effects*******************************

  // React.useEffect(() => {
  //   return () => {
  //     setValues(defaultCampaign);
  //   };
  // }, []);

  // React.useEffect(() => {
  //   if (data) {
  //     setValues(data);
  //   }
  // }, [data]);

  // React.useEffect(() => {
  //   if (isUpdate) {
  //     getSingleData();
  //   }
  // }, []);

  return (
    <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons}>
      {sidebarView === 'QUICK' ? (
        <ContentQuickView data={data} />
      ) : (
        // <ContentForm
        //   data={values}
        //   errors={errors}
        //   setFieldValue={setFieldValue}
        //   onChange={handleChange}
        //   onSetFile={setFile}
        // />
        <></>
      )}
    </DrawerContainer>
  );
};
