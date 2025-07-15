'use client';

import { Button, FormControlLabel, IconButton, Switch } from '@mui/material';
import { useFormik } from 'formik';
import Link from 'next/link';
import React from 'react';

import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { Iconify } from '/src/components/iconify/iconify';
import useAuth from '/src/hooks/useAuth';

import { DrawerContainer } from '../../../../components/drawer/drawer';
import { CampaignQuickView } from '../_components/campaign-quick-view';
import {
  createCampaignAsync,
  deleteCampaignAsync,
  getCampaignAsync,
  updateCampaignAsync
} from '../_lib/campaign.actions';
import { defaultCampaign } from '../_lib/campaign.types';
import { CampaignForm } from './campaign-form';
import { formConstants } from '/src/app/constants/form-constants';
import { campaignPayload } from '../_lib/campaign.payload';
import useSWR, { mutate } from 'swr';
import PageLoader from '../../../../components/loaders/PageLoader';

const useGetCampaign = (id) => {
  const { data, isLoading } = useSWR(id ? `campaign-${id}` : null, () => getCampaignAsync(id));
  return { data, isLoading };
};

export const CampaignRightPanel = ({ fetchList, onClose, id, open, view = 'QUICK' }) => {
  const { data: campaignData, isLoading } = useGetCampaign(id);
  const { isLogin } = useAuth();
  const [isFeatured, setIsFeatured] = React.useState(campaignData?.data?.isFeatured);
  const [panelView, setPanelView] = React.useState(view);
  const [loading, setLoading] = React.useState(false);

  // *********************Formik*********************************
  const { values, errors, handleChange, handleSubmit, setFieldValue, resetForm, setValues } = useFormik({
    initialValues: defaultCampaign(campaignData?.data),
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = formConstants.required;
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const finalData = await campaignPayload(values, true);

        const res = id
          ? await updateCampaignAsync(id, finalData)
          : await createCampaignAsync(finalData);
        if (res.success) {
          onClose?.();
          resetForm();
          fetchList();
          mutate(`campaign-${id}`);
        } else {
          console.error('Operation failed:', res.message);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleDelete = async () => {
    onClose?.();
    fetchList?.();
  };

  const handleFeatured = async (featured) => {
    try {
      setIsFeatured(featured);
      await updateCampaignAsync(id, { ...campaignData?.data, isFeatured: featured });
      fetchList();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // *****************Action Buttons*******************************
  const actionButtons = (
    <>
      {isLogin && (
        <>
          {panelView === 'EDIT' && id ? (
            <IconButton onClick={() => setPanelView('QUICK')} title="Edit">
              <Iconify icon="solar:eye-broken" />
            </IconButton>
          ) : (
            id && (
              <IconButton onClick={() => setPanelView('EDIT')} title="Quick">
                <Iconify icon="mynaui:edit-one" />
              </IconButton>
            )
          )}

          {panelView !== 'QUICK' && (
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
              Save
            </Button>
          )}

          {panelView !== 'ADD' && (
            <IconButton
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              as={Link}
              href={`/campaign/${id}`}
              title="Analytics"
            >
              <Iconify icon="mdi:analytics" />
            </IconButton>
          )}

          {panelView === 'QUICK' && (
            <DeleteConfirmationPasswordPopover
              id={id}
              title="Are you sure you want to delete?"
              deleteFn={deleteCampaignAsync}
              passwordInput
              onDelete={handleDelete}
            />
          )}

          {panelView !== 'ADD' && (
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={isFeatured}
                  onChange={(e) => handleFeatured(e.target.checked)}
                  color="primary"
                />
              }
              label="Featured"
            />
          )}
        </>
      )}
    </>
  );

  // React.useEffect(() => {
  //   if (data) {
  //     setValues(defaultCampaign(data));
  //   }
  // }, [data]);

  return (
    <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons}>
      <PageLoader loading={isLoading}>
        {panelView === 'QUICK' ? (
          <CampaignQuickView data={campaignData?.data} isEdit={false} />
        ) : (
          <CampaignForm formikProps={{ values, setValues, errors, handleChange, setFieldValue }} />
        )}
      </PageLoader>
    </DrawerContainer>
  );
};
