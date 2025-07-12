'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Button, FormControlLabel, IconButton, Switch } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '/src/hooks/useAuth';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '/src/components/drawer/drawer';

import { createContentAsync, deleteContentAsync, updateContentAsync } from '../_lib/all-content.actions';
import { defaultContent } from '../_lib/all-content.types';
import { convertArrayObjIntoArrOfStr } from '../../../../utils/convertRelationArrays';
import { ContentForm } from './content-form';
import { ContentQuickView } from './content-quick-view';
import { formConstants } from '/src/app/constants/form-constants';

export const ManageContentRightPanel = ({ fetchList, onClose, data, open, view = 'QUICK' }) => {
  const { isLogin } = useAuth();
  const [isFeatured, setIsFeatured] = React.useState(data?.isFeatured);
  const [panelView, setPanelView] = React.useState(view);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const { values, errors, handleChange, setFieldValue, resetForm, setValues, handleSubmit } = useFormik({
    initialValues: defaultContent(data),
    validate: (values) => {
      const errors = {};
      const requiredFields = ['name', 'thumbnailImage'];

      requiredFields.forEach((field) => {
        if (
          !values[field] ||
          (Array.isArray(values[field]) && values[field].length === 0) ||
          (typeof values[field] === 'string' && values[field].trim() === '')
        ) {
          errors[field] = formConstants.required;
        }
      });

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const finalData = convertArrayObjIntoArrOfStr(values, [
          'campaigns',
          'cities',
          'products',
          'tags',
          'stakeholders',
          'partners',
          'retailPartners',
        ]);

        const { id, ...rest } = finalData;
        const createPayload = {
          ...rest,
          thumbnailImage: Array.isArray(finalData.thumbnailImage)
            ? finalData.thumbnailImage[0]
            : finalData.thumbnailImage,
        };

        const res = data?.id
          ? await updateContentAsync(data?.id, {
              ...finalData,
              thumbnailImage: Array.isArray(finalData.thumbnailImage)
                ? finalData.thumbnailImage[0]
                : finalData.thumbnailImage,
            })
          : await createContentAsync(createPayload);
        if (res.success) {
          onClose?.();
          resetForm();
          await fetchList();
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
      const finalData = convertArrayObjIntoArrOfStr(values, [
        'campaigns',
        'cities',
        'products',
        'tags',
        'stakeholders',
        'partners',
        'retailPartners',
      ]);

      await updateContentAsync(data?.id, {
        ...finalData,
        isFeatured: featured,
        thumbnailImage: Array.isArray(finalData.thumbnailImage)
          ? finalData.thumbnailImage[0]
          : finalData.thumbnailImage,
      });
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
          {panelView !== 'QUICK' && (
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={() => handleSubmit()}>
              Save
            </Button>
          )}
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
          {panelView !== 'ADD' && (
            <IconButton
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Analytics"
              onClick={() => router.push(`/all-content/${data?.id}`)}
            >
              <Icon icon="mdi:analytics" />
            </IconButton>
          )}
          {panelView !== 'ADD' && (
            <DeleteConfirmationPasswordPopover
              id={data?.id}
              title="Are you sure you want to delete?"
              deleteFn={deleteContentAsync}
              passwordInput
              onDelete={handleDelete}
              disabled={!data?.id}
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

  React.useEffect(() => {
    if (data) {
      setValues(defaultContent(data));
    }
  }, [data]);
  return (
    <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons}>
      {panelView === 'QUICK' ? (
        <ContentQuickView data={data} isEdit={false} />
      ) : (
        <ContentForm formikProps={{ values, setValues, errors, handleChange, setFieldValue }} />
      )}
    </DrawerContainer>
  );
};
