'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Button, FormControlLabel, IconButton, Switch } from '@mui/material';
import { useFormik } from 'formik';
import { mutate as globalMutate } from 'swr';

import useAuth from '/src/hooks/useAuth';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '/src/components/drawer/drawer';

import { createContentAsync, deleteContentAsync, updateContentAsync } from '../_lib/all-content.actions';
import { defaultContent } from '../_lib/all-content.types';
import { convertArrayObjIntoArrOfStr } from '../../../../utils/convertRelationArrays';
import { ContentForm } from './content-form';
import { ContentQuickView } from './content-quick-view';
import { formConstants } from '/src/app/constants/form-constants';
import { useGetContentData } from '/src/services/content/useContentData';
import { useContentList } from '/src/services/content/useContentList';
import PageLoader from '/src/components/loaders/PageLoader';

// const revalidateAllContentLists = () => {
//   globalMutate(
//     (key) => {
//       if (typeof key === 'string') {
//         return key.toLowerCase().includes('content');
//       }

//       if (Array.isArray(key)) {
//         return key.some(
//           (part) => typeof part === 'string' && part.toLowerCase().includes('content')
//         );
//       }

//       return false;
//     },
//     undefined,
//     { revalidate: true }
//   );
// };


export const AllContentRightPanel = ({ onClose, id, open, view = 'QUICK' }) => {
  const { mutate: mutateList } = useContentList();
  const { mutate: mutateFeatured } = useContentList('featured');
  const { data: contentData, isLoading, mutate } = useGetContentData(id);
  const { isLogin } = useAuth();
  const [isFeatured, setIsFeatured] = React.useState(false);
  const [panelView, setPanelView] = React.useState(view);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const { values, errors, handleChange, setFieldValue, resetForm, setValues, handleSubmit } = useFormik({
    initialValues: defaultContent(),
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
            ? finalData.thumbnailImage[0] || ''
            : finalData.thumbnailImage || '',
        };

        const res = id
          ? await updateContentAsync({
            ...finalData,
            thumbnailImage: Array.isArray(finalData.thumbnailImage)
              ? finalData.thumbnailImage[0] || ''
              : finalData.thumbnailImage || '',
          })
          : await createContentAsync(createPayload);
        if (res.success) {
          onClose?.();
          resetForm();
          mutate();
          mutateList();
          mutateFeatured();
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
    if (contentData?.data) {
      setValues(defaultContent(contentData?.data));
      setIsFeatured(contentData?.data?.isFeatured);
    }
  }, [contentData]);

  const handleDelete = async () => {
    try {
      onClose?.();
      mutateList();
      mutateFeatured();
    } catch (error) {
      console.error('Error:', error);
    }
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

      await updateContentAsync({
        ...finalData,
        isFeatured: featured,
        thumbnailImage: Array.isArray(finalData.thumbnailImage)
          ? finalData.thumbnailImage[0]
          : finalData.thumbnailImage,
      });
      mutate();
      mutateList();
      mutateFeatured();
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
              title="Analytics"
              onClick={() => router.push(`/all-content/${id}`)}
            >
              <Icon icon="mdi:analytics" />
            </IconButton>
          )}
          {panelView !== 'ADD' && (
            <DeleteConfirmationPasswordPopover
              id={id}
              title="Are you sure you want to delete?"
              deleteFn={deleteContentAsync}
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
      <PageLoader loading={isLoading}>
        {panelView === 'QUICK' ? (
          <ContentQuickView data={contentData?.data} isEdit={false} />
        ) : (
          <ContentForm formikProps={{ values, setValues, errors, handleChange, setFieldValue }} />
        )}
      </PageLoader>
    </DrawerContainer>
  );
};
