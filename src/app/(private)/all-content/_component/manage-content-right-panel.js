'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, FormControlLabel, IconButton, Switch } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '/src/hooks/useAuth';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '/src/components/drawer/drawer';
import { Iconify } from '/src/components/iconify/iconify';

import {
  createContentAsync,
  deleteContentAsync,
  getContentAsync,
  updateContentAsync,
} from '../_lib/all-content.actions';
import { defaultContent } from '../_lib/all-content.types';
import { ContentForm } from './content-form';
import { ContentQuickView } from './content-quick-view';
import { formConstants } from '/src/app/constants/form-constants';

export const ManageContentRightPanel = ({ fetchList, onClose, id, open, view = 'QUICK' }) => {
  // const [sidebarView, setSidebarView] = React.useState(view); // QUICK // EDIT

  // const [isFeatured, setIsFeatured] = React.useState(data?.isFeatured);

  const { isLogin } = useAuth();
  const router = useRouter();
  const [panelView, setPanelView] = React.useState(view);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { values, errors, handleChange, setFieldValue, resetForm, setValues, handleSubmit } = useFormik({
    initialValues: defaultContent(),
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = formConstants.required;
      }
      if (!values.revoPinterest) {
        errors.revoPinterest = formConstants.required;
      }
      if (!values.revoPinterest) {
        errors.revoPinterest = formConstants.required;
      }
      if (!values.pinAccountsUsed) {
        errors.pinAccountsUsed = formConstants.required;
      }
      if (!values.postQuality) {
        errors.postQuality = formConstants.required;
      }
      if (!values.googleDriveFiles) {
        errors.googleDriveFiles = formConstants.required;
      }
      if (!values.playbookLink) {
        errors.playbookLink = formConstants.required;
      }
      if (!values.upPromoteConversion) {
        errors.upPromoteConversion = formConstants.required;
      }
      if (!values.assetStatus) {
        errors.assetStatus = formConstants.required;
      }
      if (!values.monthUploaded) {
        errors.monthUploaded = formConstants.required;
      }
      if (!values.revoInstagram) {
        errors.revoInstagram = formConstants.required;
      }
      if (!values.creatorStatus) {
        errors.creatorStatus = formConstants.required;
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const finalData = {
          ...values,
        };

        const imageFields = ['campaignImage', 'imageInspirationGallery'];
        for (const field of imageFields) {
          const value = values[field];
          if (value instanceof File) {
            const res = await imageUploader(
              [
                {
                  file: value,
                  fileName: value.name.split('.').slice(0, -1).join('.'),
                  fileType: value.type.split('/')[1],
                },
              ],
              'campaigns'
            );

            finalData[field] = res;
          } else if (typeof value === 'string') {
            finalData[field] = [value];
          }
        }

        const arrayFields = [
          'contentHQ',
          'stakeholders',
          'retailPartners',
          'proposedPartners',
          'contributedPartners',
          'spaces',
          'productionHQ',
          'products',
          'retailPartners2',
          'retailPartners3',
        ];

        for (const field of arrayFields) {
          const value = values[field];
          if (value.length > 0) {
            const arrOfStr = value.map((item) => item.value);
            finalData[field] = arrOfStr;
          }
        }

        const res = id ? await updateCampaignAsync(id, finalData) : await createCampaignAsync(finalData);
        if (res.success) {
          onClose?.();
          resetForm();
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
  const handleDelete = async () => {
    fetchList();
    onClose?.();
  };

  const handleFeatured = async (featured) => {
    try {
      setIsFeatured(featured);
      await updateContentAsync({ ...data, isFeatured: featured });
      fetchList();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // --------------- Fetch campaign during update -------------------
  React.useEffect(() => {
    const fetSingleData = async () => {
      try {
        const res = await getContentAsync(data?.id);
        if (res?.success) {
          setValues(defaultContent(res?.data));
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (data?.id && sidebarView === 'EDIT') {
      fetSingleData();
    }
  }, [data?.id, setValues, sidebarView]);

  // --------------- Set values during update -------------------
  React.useEffect(() => {
    if (data) {
      setValues(defaultContent(data));
    }
  }, [data, setValues]);

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

          <>
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
          </>
          {sidebarView === 'EDIT' && (
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
              Save
            </Button>
          )}

          <IconButton
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            as={Link}
            href={`/all-content/${data?.id}`}
            title="Analytics"
          >
            <Iconify icon="mdi:analytics" />
          </IconButton>

          {sidebarView === 'QUICK' && (
            <DeleteConfirmationPasswordPopover
              id={data?.id}
              title="Are you sure you want to delete?"
              deleteFn={deleteContentAsync}
              passwordInput
              onDelete={handleDelete}
            />
          )}
        </>
      )}
    </>
  );

  return (
    <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons}>
      {sidebarView === 'EDIT' ? (
        <ContentForm formikProps={{ values, setValues, errors, handleChange, setFieldValue, handleSubmit }} />
      ) : (
        <ContentQuickView data={data} isEdit={false} />
      )}
    </DrawerContainer>
  );
};
