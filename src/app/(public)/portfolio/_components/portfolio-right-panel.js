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

import { createPortfolioAsync, deleteSinglePortfolioAsync, updatePortfolioAsync } from '../_lib/portfolio.actions';
import { defaultPortfolio } from '../_lib/portfolio.types';
import { convertArrayObjIntoArrOfStr } from '../../../../utils/convertRelationArrays';
import { PortfolioForm } from './portfolio-form';
import { PortfolioQuickView } from './portfolio-quickview';
import { formConstants } from '/src/app/constants/form-constants';

export const PortfolioRightPanel = ({ fetchList, onClose, data, open, view = 'QUICK' }) => {
  const { isLogin } = useAuth();
  const [isFeatured, setIsFeatured] = React.useState(data?.isFeatured);
  const [panelView, setPanelView] = React.useState(view);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  // *********************States*********************************

  const { values, errors, handleChange, handleSubmit, setValues, setFieldValue, resetForm } = useFormik({
    initialValues: defaultPortfolio(data),
    validate: (values) => {
      const errors = {};
      if (!values.thumbnailImage) {
        errors.thumbnailImage = formConstants.required;
      }
      if (!values.projectTitle) {
        errors.projectTitle = formConstants.required;
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const finalData = convertArrayObjIntoArrOfStr(values, [
          'portfolioCategories',
          'states',
          'countries',
          'partnerHQ',
        ]);

        const { id, ...rest } = finalData;
        const createPayload = {
          ...rest,
          thumbnailImage: Array.isArray(finalData.thumbnailImage)
            ? finalData.thumbnailImage[0]
            : finalData.thumbnailImage,
          videoLink: Array.isArray(finalData.videoLink) ? finalData.videoLink[0] || null : finalData.videoLink || null,
        };

        const res = data?.id
          ? await updatePortfolioAsync(data?.id, {
              ...finalData,
              thumbnailImage: Array.isArray(finalData.thumbnailImage)
                ? finalData.thumbnailImage[0] || ''
                : finalData.thumbnailImage || '',
              videoLink: Array.isArray(finalData.videoLink)
                ? finalData.videoLink[0] || null
                : finalData.videoLink || null,
            })
          : await createPortfolioAsync(createPayload);
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
      const finalData = convertArrayObjIntoArrOfStr(values, [
        'portfolioCategories',
        'states',
        'countries',
        'partnerHQ',
      ]);

      await updatePortfolioAsync(data?.id, {
        ...finalData,
        isFeatured: featured,
        thumbnailImage: Array.isArray(finalData.thumbnailImage)
          ? finalData.thumbnailImage[0] || ''
          : finalData.thumbnailImage || '',
        videoLink: Array.isArray(finalData.videoLink) ? finalData.videoLink[0] || null : finalData.videoLink || null,
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
              onClick={() => router.push(`/portfolio/${data?.id}`)}
              title="Analytics"
            >
              <Icon icon="mdi:analytics" />
            </IconButton>
          )}

          {panelView !== 'ADD' && (
            <DeleteConfirmationPasswordPopover
              id={data?.id}
              title="Are you sure you want to delete?"
              deleteFn={deleteSinglePortfolioAsync}
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
      setValues(defaultPortfolio(data));
    }
  }, [data]);

  return (
    <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons}>
      <PageLoader loading={loading}>
        {panelView === 'QUICK' ? (
          <PortfolioQuickView data={data} isEdit={false} />
        ) : (
          <PortfolioForm formikProps={{ values, setValues, errors, handleChange, setFieldValue }} />
        )}
      </PageLoader>
    </DrawerContainer>
  );
};
