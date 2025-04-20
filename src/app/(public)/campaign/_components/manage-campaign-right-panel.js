'use client';

import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '../../../../components/drawer/drawer';///components/drawer/drawer
import { Iconify } from '/src/components/iconify/iconify';

import useAuth from '/src/hooks/useAuth';
import { paths } from '/src/paths';

import { CampaignQuickView } from '../_components/campaign-quick-view';
import { deleteCampaignAsync } from '../_lib/campaign.actions';
import { CampaignForm } from './campaign-form';

export const ManageCampaignRightPanel = ({ open, onClose, fetchList, data, view }) => {
  const isUpdate = data?.id ? true : false;
  const router = useRouter();
  const { isLogin } = useAuth();

  // *********************States*********************************
  const [sidebarView, setSidebarView] = React.useState(view); // QUICK / EDIT

  const handleDelete = async (password) => {
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
          {sidebarView === 'EDIT' && isUpdate ? (
            <IconButton onClick={() => setSidebarView('QUICK')} title="Edit">
              <Iconify icon="solar:eye-broken" />
            </IconButton>
          ) : (
            isUpdate && (
              <IconButton onClick={() => setSidebarView('EDIT')} title="Quick">
                <Iconify icon="mynaui:edit-one" />
              </IconButton>
            )
          )}
          {isUpdate && (
            <IconButton
              onClick={() => router.push(paths.public.campaign_analytics + '/' + data.slug)}
              title="Quick View"
            >
              <Iconify icon="hugeicons:analytics-01" />
            </IconButton>
          )}

          <DeleteConfirmationPasswordPopover title={`Want to delete ${data?.name}?`} onDelete={(password) => handleDelete(password)} passwordInput />

          {/* {sidebarView === 'EDIT' && (
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
              Save
            </Button>
          )} */}
        </>
      )}
    </>
  );

  return (
    <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons}>
      {sidebarView === 'QUICK' ? (
        <CampaignQuickView data={data} />
      ) : (
        <CampaignForm id={data?.id} onClose={onClose} fetchList={fetchList} />
      )}
    </DrawerContainer>
  );
};
