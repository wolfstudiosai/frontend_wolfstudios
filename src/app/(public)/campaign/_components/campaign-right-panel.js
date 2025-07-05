'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '/src/hooks/useAuth';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { Iconify } from '/src/components/iconify/iconify';
import PageLoader from '/src/components/loaders/PageLoader';

import { CampaignQuickView } from '../_components/campaign-quick-view';
import {
  createCampaignAsync,
  deleteCampaignAsync,
  getCampaignAsync,
  updateCampaignAsync,
} from '../_lib/campaign.actions';
import { defaultCampaign } from '../_lib/campaign.types';
import { DrawerContainer } from '../../../../components/drawer/drawer';
import { CampaignForm } from './campaign-form';
import { formConstants } from '/src/app/constants/form-constants';
import { imageUploader } from '/src/utils/upload-file';

export const CampaignRightPanel = ({ fetchList, onClose, id, open, view = 'QUICK' }) => {
  const { isLogin } = useAuth();
  const router = useRouter();
  const [panelView, setPanelView] = React.useState(view);
  const [data, setData] = React.useState(null);
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
      if (!values.campaignDescription) {
        errors.campaignDescription = formConstants.required;
      }
      if (!values.campaignStatus) {
        errors.campaignStatus = formConstants.required;
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

      if (values.startDate && values.endDate && new Date(values.startDate) > new Date(values.endDate)) {
        errors.endDate = formConstants.endDate || 'End date must be after start date';
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

  // *************fetch single data***********************
  React.useEffect(() => {
    const getSingleData = async () => {
      setLoading(true);
      try {
        const response = await getCampaignAsync(id);
        if (response.data) {
          setData(response.data);
          setValues(defaultCampaign(response.data));
        }
      } catch (error) {
        console.error('Error fetching partner data:', error);
        return null;
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getSingleData();
    }
  }, [id]);

  const handleDelete = async () => {
    onClose?.();
    fetchList?.();
    router.refresh();
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

          {panelView === 'EDIT' && (
            <Button size="small" variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
              Save
            </Button>
          )}

          {panelView === 'QUICK' && (
            <>
              <IconButton
                as={Link}
                href={`/campaign/${data?.id}`}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Analytics"
              >
                <Iconify icon="mdi:analytics" />
              </IconButton>
              <DeleteConfirmationPasswordPopover
                id={data?.id}
                title="Are you sure you want to delete?"
                deleteFn={deleteCampaignAsync}
                passwordInput
                onDelete={handleDelete}
              />
            </>
          )}
        </>
      )}
    </>
  );

  return (
    <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons}>
      <PageLoader loading={loading}>
        {panelView === 'QUICK' ? (
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
      </PageLoader>
    </DrawerContainer>
  );
};
