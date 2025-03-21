'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { formConstants } from '/src/app/constants/form-constants';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '/src/components/drawer/drawer';
import { Iconify } from '/src/components/iconify/iconify';
import { Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';

import { paths } from '/src/paths';
import useAuth from '/src/hooks/useAuth';

import { CampaignForm } from '../_components/campaign-form';
import { CampaignQuickView } from '../_components/campaign-quick-view';
import { createCampaignAsync, deleteCampaignAsync, updateCampaignAsync } from '../_lib/campaign.actions';
import { defaultCampaign } from '../_lib/campaign.types';

export const ManageCampaignRightPanel = ({ open, onClose, fetchList, data, width, view }) => {
  const isUpdate = data?.id ? true : false;
  const router = useRouter();
  const { isLogin } = useAuth();

  const [sidebarView, setSidebarView] = React.useState(view); //QUICK/ EDIT
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
    useFormik({
      initialValues: defaultCampaign,
      validate: (values) => {
        const errors = {};
        if (!values.name) {
          errors.name = formConstants.required;
        }
        if (!values.campaign_group_id) {
          errors.campaign_group_id = formConstants.required;
        }

        return errors;
      },
      onSubmit: async (values) => {
        setLoading(true);
        try {
          const res = isUpdate ? await updateCampaignAsync(file, values) : await createCampaignAsync(file, values);
          if (res.success) {
            onClose();
            fetchList();
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

  // *********************States*********************************

  const getSingleData = async () => {
    setLoading(true);
    try {
      const response = await getPortfolioAsync(id);
      setValues(response.data);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

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

          <DeleteConfirmationPasswordPopover title={`Want to delete ${data?.name}?`}  onDelete={(password) => handleDelete(password)}  passwordInput/>

          {sidebarView === 'EDIT' && (
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
              Save
            </Button>
          )}
        </>
      )}
    </>
  );

  // *****************Use Effects*******************************

  React.useEffect(() => {
    return () => {
      setValues(defaultCampaign);
    };
  }, []);

  React.useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  React.useEffect(() => {
    if (isUpdate) {
      getSingleData();
    }
  }, []);

  return (
    <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons}>
      {sidebarView === 'QUICK' ? (
        <CampaignQuickView data={data} />
      ) : (
        <CampaignForm
          data={values}
          errors={errors}
          setFieldValue={setFieldValue}
          onChange={handleChange}
          onSetFile={setFile}
        />
      )}
    </DrawerContainer>
  );
};
