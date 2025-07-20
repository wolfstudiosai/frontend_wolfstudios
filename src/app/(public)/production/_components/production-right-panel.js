'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Button, FormControlLabel, IconButton, Switch } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '/src/hooks/useAuth';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '/src/components/drawer/drawer';
import PageLoader from '/src/components/loaders/PageLoader';

import { createProductionAsync, deleteSingleProductionAsync, updateProductionAsync } from '../_lib/production.action';
import { defaultProduction } from '../_lib/production.types';
import { convertArrayObjIntoArrOfStr } from '../../../../utils/convertRelationArrays';
import { ProductionForm } from './production-form';
import { ProductionQuickView } from './production-quickview';
import { formConstants } from '/src/app/constants/form-constants';
import { useGetProductionData } from '/src/services/production/useProductionData';
import { useProductionList } from '/src/services/production/useProductionList';

export const ProductionRightPanel = ({ onClose, id, open, view = 'QUICK' }) => {
  const { mutate: mutateProductionList } = useProductionList();
  const { data: productionData, isLoading, mutate } = useGetProductionData(id);
  const { isLogin } = useAuth();
  const [isFeatured, setIsFeatured] = React.useState(productionData?.data?.isFeatured);
  const [panelView, setPanelView] = React.useState(view);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  // ***************** Formik *******************************
  const { values, errors, handleChange, handleSubmit, setValues, setFieldValue, resetForm } = useFormik({
    initialValues: defaultProduction(),
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
        const finalData = convertArrayObjIntoArrOfStr(values, [
          'spaces',
          'stakeholders',
          'contributingPartners',
          'campaigns',
          'products',
          'proposedSpaces',
          'proposedPartners',
        ]);

        const { id, ...rest } = finalData;
        const createPayload = {
          ...rest,
          thumbnailImage: Array.isArray(finalData.thumbnailImage)
            ? finalData.thumbnailImage[0]
            : finalData.thumbnailImage,
          videoLink: Array.isArray(finalData.videoLink) ? finalData.videoLink[0] || null : finalData.videoLink || null,
        };

        const res = id
          ? await updateProductionAsync({
            ...finalData,
            thumbnailImage: Array.isArray(finalData.thumbnailImage)
              ? finalData.thumbnailImage[0] || ''
              : finalData.thumbnailImage || '',
            videoLink: Array.isArray(finalData.videoLink)
              ? finalData.videoLink[0] || null
              : finalData.videoLink || null,
          })
          : await createProductionAsync(createPayload);
        if (res.success) {
          onClose?.();
          resetForm();
          mutate();
          mutateProductionList();
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

  React.useEffect(() => {
    if (productionData?.data) {
      setValues(defaultProduction(productionData?.data));
    }
  }, [productionData]);

  const handleDelete = async () => {
    mutateProductionList();
    onClose?.();
  };

  const handleFeatured = async (featured) => {
    try {
      setIsFeatured(featured);
      const finalData = convertArrayObjIntoArrOfStr(values, [
        'spaces',
        'stakeholders',
        'contributingPartners',
        'campaigns',
        'products',
        'proposedSpaces',
        'proposedPartners',
      ]);

      await updateProductionAsync({
        ...finalData,
        isFeatured: featured,
        thumbnailImage: Array.isArray(finalData.thumbnailImage)
          ? finalData.thumbnailImage[0] || ''
          : finalData.thumbnailImage || '',
      });
      mutate();
      mutateProductionList();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // *****************Action Buttons*******************************
  const actionButtons = (
    <>
      {isLogin && (
        <>
          {panelView !== 'QUICK' && (
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={() => handleSubmit()}>
              Save
            </Button>
          )}
          {panelView === 'EDIT' && id ? (
            <IconButton onClick={() => setPanelView('QUICK')} title="Edit">
              <Icon icon="solar:eye-broken" />
            </IconButton>
          ) : (
            id && (
              <IconButton onClick={() => setPanelView('EDIT')} title="Quick">
                <Icon icon="mynaui:edit-one" />
              </IconButton>
            )
          )}

          {panelView !== 'ADD' && (
            <IconButton
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => router.push(`/production/${id}`)}
              title="Analytics"
            >
              <Icon icon="mdi:analytics" />
            </IconButton>
          )}

          {panelView !== 'ADD' && (
            <DeleteConfirmationPasswordPopover
              id={id}
              title="Are you sure you want to delete?"
              deleteFn={deleteSingleProductionAsync}
              passwordInput
              onDelete={handleDelete}
              disabled={!id}
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


  return (
    <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons}>
      {panelView === 'QUICK' ? (
        <PageLoader loading={isLoading}>
          <ProductionQuickView data={productionData?.data} />
        </PageLoader>
      ) : (
        <ProductionForm formikProps={{ values, setValues, errors, handleChange, setFieldValue }} />
      )}
    </DrawerContainer>
  );
};
