'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Button, FormControlLabel, IconButton, Switch } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '/src/hooks/useAuth';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '/src/components/drawer/drawer';

import { createSpaceAsync, deleteSingleSpaceAsync, updateSpaceAsync } from '../_lib/space.actions';
import { defaultSpace } from '../_lib/space.types';
import { convertArrayObjIntoArrOfStr } from '../../../../utils/convertRelationArrays';
import { SpaceForm } from './space-form';
import { SpaceQuickViewV2 } from './space-quickviewV2';
import { formConstants } from '/src/app/constants/form-constants';
import { useGetSpaceData } from '/src/services/space/useSpaceData';
import { useSpaceList } from '/src/services/space/useSpaceList';
import PageLoader from '../../../../components/loaders/PageLoader';
import { useFeaturedSpacesList } from '/src/services/space/useFeaturedSpaces';

export const SpaceRightPanel = ({ onClose, id, open, view = 'QUICK' }) => {
  const { mutate: muteSpaceList } = useSpaceList();
  const { data: spaceData, isLoading, mutate } = useGetSpaceData(id);
  const { mutate: muteFeaturedSpaceList } = useFeaturedSpacesList();
  const { isLogin } = useAuth();
  const [isFeatured, setIsFeatured] = React.useState(spaceData?.data?.isFeatured);
  const [panelView, setPanelView] = React.useState(view);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const { values, errors, handleChange, handleSubmit, setValues, setFieldValue, resetForm } = useFormik({
    initialValues: defaultSpace(),
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
          'countries',
          'states',
          'tags',
          'destinations',
          'productionHQ',
          'productionHQ2',
        ]);

        const { id, ...rest } = finalData;
        const createPayload = {
          ...rest,
          thumbnailImage: Array.isArray(finalData.thumbnailImage)
            ? finalData.thumbnailImage[0]
            : finalData.thumbnailImage,
        };

        const res = id
          ? await updateSpaceAsync({
            ...finalData,
            thumbnailImage: Array.isArray(finalData.thumbnailImage)
              ? finalData.thumbnailImage[0]
              : finalData.thumbnailImage,
          })
          : await createSpaceAsync(createPayload);
        if (res.success) {
          onClose?.();
          resetForm();
          mutate();
          muteSpaceList();
          muteFeaturedSpaceList();
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
    if (spaceData?.data) {
      setValues(defaultSpace(spaceData?.data));
    }
  }, [spaceData?.data]);

  // *********************States*********************************
  const handleDelete = async () => {
    onClose?.();
    muteSpaceList()
    muteFeaturedSpaceList();
  };

  const handleFeatured = async (featured) => {
    try {
      setIsFeatured(featured);
      const finalData = convertArrayObjIntoArrOfStr(values, [
        'campaigns',
        'cities',
        'countries',
        'states',
        'tags',
        'destinations',
        'productionHQ',
        'productionHQ2',
      ]);

      const res = await updateSpaceAsync({
        ...finalData,
        isFeatured: featured,
        thumbnailImage: Array.isArray(finalData.thumbnailImage)
          ? finalData.thumbnailImage[0]
          : finalData.thumbnailImage,
      });

      if (res.success) {
        onClose?.();
        resetForm();
        mutate();
        muteSpaceList();
        muteFeaturedSpaceList();
      } else {
        console.error('Operation failed:', res.message);
      }
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
              onClick={() => router.push(`/analytics/${id}`)}
            >
              <Icon icon="mdi:analytics" />
            </IconButton>
          )}
          {panelView !== 'ADD' && (
            <DeleteConfirmationPasswordPopover
              id={id}
              title="Are you sure you want to delete?"
              deleteFn={deleteSingleSpaceAsync}
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
          <SpaceQuickViewV2 data={spaceData?.data} isEdit={false} />
        ) : (
          <SpaceForm formikProps={{ values, setValues, errors, handleChange, setFieldValue }} />
        )}
      </PageLoader>
    </DrawerContainer>
  );
};
