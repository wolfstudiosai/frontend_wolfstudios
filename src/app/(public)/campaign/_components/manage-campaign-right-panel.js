'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '/src/hooks/useAuth';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { Iconify } from '/src/components/iconify/iconify';

import { CampaignQuickView } from '../_components/campaign-quick-view';
import {
  createCampaignAsync,
  deleteCampaignAsync,
  getCampaignAsync,
  updateCampaignAsync,
} from '../_lib/campaign.actions';
import { defaultCampaign } from '../_lib/campaign.types';
import { DrawerContainer } from '../../../../components/drawer/drawer'; ///components/drawer/drawer

import { CampaignForm } from './campaign-form';
import { formConstants } from '/src/app/constants/form-constants';
import { imageUploader } from '/src/utils/upload-file';

export const ManageCampaignRightPanel = ({ open, onClose, fetchList, data, view }) => {
  const isUpdate = data?.id ? true : false;
  const router = useRouter();
  const { isLogin } = useAuth();

  // *********************States*********************************
  const [sidebarView, setSidebarView] = React.useState(view); // QUICK / EDIT
  const [loading, setLoading] = React.useState(false);

  // *********************Formik*********************************

  const { values, errors, handleChange, handleSubmit, setFieldValue, resetForm, setValues } = useFormik({
    initialValues: defaultCampaign(),
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = formConstants.required;
      }
      if (!values.client) {
        errors.client = formConstants.required;
      }
      if (!values.guidelines) {
        errors.guidelines = formConstants.required;
      }
      if (!values.description) {
        errors.description = formConstants.required;
      }
      if (!values.status) {
        errors.status = formConstants.required;
      }
      if (!values.startDate) {
        errors.startDate = formConstants.required;
      }
      if (!values.endDate) {
        errors.endDate = formConstants.required;
      }
      if (!values.notes) {
        errors.notes = formConstants.required;
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const finalData = {
          ...values,
        };

        const imageFields = ['campaignImage'];
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

        const arrayFields = ['contentHQ', 'stakeholders', 'retailPartners', 'proposedPartners', 'spaces'];
        for (const field of arrayFields) {
          const value = values[field];
          if (value.length > 0) {
            const arrOfStr = value.map((item) => item.value);
            finalData[field] = arrOfStr;
          }
        }

        if (finalData.goals && typeof finalData.goals === 'string') {
          finalData.goals = finalData.goals.split(',').map((item) => item.trim());
        }
        const res = isUpdate ? await updateCampaignAsync(data?.id, finalData) : await createCampaignAsync(finalData);
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

  // *****************Use Effects**********************************
  React.useEffect(() => {
    if (sidebarView === 'EDIT' && data?.id) {
      const getSingleData = async () => {
        setLoading(true);
        try {
          const response = await getCampaignAsync(data.id);
          if (response.data) {
            setValues(defaultCampaign(response.data));
          }
        } catch (error) {
          console.error('Error fetching partner data:', error);
          return null;
        } finally {
          setLoading(false);
        }
      };
      getSingleData();
    }
  }, [sidebarView, data?.id, setValues]);

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
          {sidebarView === 'EDIT' && (
            <Button size="small" variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
              Save
            </Button>
          )}

          {sidebarView === 'QUICK' && (
            <DeleteConfirmationPasswordPopover
              id={data?.id}
              title="Are you sure you want to delete?"
              deleteFn={deleteCampaignAsync}
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
      {sidebarView === 'QUICK' ? (
        <CampaignQuickView data={data} />
      ) : (
        <CampaignForm
          handleChange={handleChange}
          values={values}
          errors={errors}
          setFieldValue={setFieldValue}
          onSubmit={handleSubmit}
        />
      )}
    </DrawerContainer>
  );
};
