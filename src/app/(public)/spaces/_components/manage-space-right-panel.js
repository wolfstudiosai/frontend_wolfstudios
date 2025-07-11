'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Button, FormControlLabel, IconButton, Switch } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '/src/hooks/useAuth';
import { DrawerContainer } from '/src/components/drawer/drawer';

import { createSpaceAsync, deleteSpaceAsync, updateSpaceAsync } from '../_lib/space.actions';
import { defaultSpace } from '../_lib/space.types';
import { SpaceForm } from './space-form';
import { SpaceQuickViewV2 } from './space-quickviewV2';
import { formConstants } from '/src/app/constants/form-constants';

export const ManageSpaceRightPanel = ({ fetchList, onClose, data, open, view = 'QUICK' }) => {
  const { isLogin } = useAuth();
  const [isFeatured, setIsFeatured] = React.useState(data?.isFeatured);
  const [panelView, setPanelView] = React.useState(view);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const { values, errors, handleChange, handleSubmit, setValues, setFieldValue, resetForm } = useFormik({
    initialValues: defaultSpace(data),
    validate: (values) => {
      const errors = {};
      if (!values.thumbnailImage) {
        errors.thumbnailImage = formConstants.required;
      }
      if (!values.name) {
        errors.name = formConstants.required;
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const finalData = {
          ...values,
        };

        const arrayFields = [
          'type',
          'spaceStyle',
          'props',
          'theme',
          'availableLighting',
          'adons',
          'cycwall',
          'backdropSystem',
          'features',
        ];
        for (const field of arrayFields) {
          const value = values[field];
          if (value.length > 0) {
            const arrOfStr = value.map((item) => item.value);
            finalData[field] = arrOfStr;
          }
        }


        const { id, ...rest } = finalData;
        const createPayload = {
          ...rest,
          thumbnailImage: Array.isArray(finalData.thumbnailImage)
            ? finalData.thumbnailImage[0]
            : finalData.thumbnailImage,
        };

        const res = data?.id
          ? await updatePortfolioAsync(data?.id, {
              ...finalData,
              thumbnailImage: Array.isArray(finalData.thumbnailImage)
                ? finalData.thumbnailImage[0]
                : finalData.thumbnailImage,
            })
          : await createSpaceAsync(createPayload);
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

  // *********************States*********************************

  const handleDelete = async (password) => {
    const response = await deleteSpaceAsync([data.id]);
    if (response.success) {
      fetchList();
      onClose?.();
    }
  };

  const handleDeleteThumbnail = () => {
    setFieldValue('thumbnail', '');
    setFile(null);
  };

  const handleFeatured = async (featured) => {
    setIsFeatured(featured);
    await updateSpaceAsync(file, { ...values, isFeatured: featured });
    fetchList();
  };

  // *****************Action Buttons*******************************
  const actionButtons = (
    <>
      {isLogin && (
        <>
          {panelView === 'EDIT' && data?.id ? (
            <IconButton onClick={() => setPanelView('QUICK')} title="Edit">
              <Icon icon="solar:eye-broken" />
            </IconButton>
          ) : (
            data?.id && (
              <IconButton onClick={() => setPanelView('EDIT')} title="Quick">
                <Icon icon="mynaui:edit-one" />
              </IconButton>
            )
          )}

          {panelView !== 'QUICK' && (
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={() => handleSubmit()}>
              Save
            </Button>
          )}

          {panelView !== 'ADD' && (
            <IconButton
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => router.push(`/spaces/${data?.id}`)}
              title="Analytics"
            >
              <Icon icon="mdi:analytics" />
            </IconButton>
          )}

          {/* {panelView === 'QUICK' && (
            <DeleteConfirmationPasswordPopover
              id={data?.id}
              title="Are you sure you want to delete?"
              deleteFn={deletePortfolioAsync}
              passwordInput
              onDelete={handleDelete}
              disabled={!data?.id}
            />
          )} */}

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
        <SpaceQuickViewV2 data={values} isEdit={false} />
      ) : (
        <SpaceForm formikProps={{ values, setValues, errors, handleChange, setFieldValue }} />
      )}
    </DrawerContainer>
  );
};
