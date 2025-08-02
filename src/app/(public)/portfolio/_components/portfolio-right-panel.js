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
import { usePortfolioList } from '/src/services/portfolio/usePortfolioList';
import { useGetPortfolioData } from '/src/services/portfolio/usePortfolioData';
import { useFeaturedPortfolioList } from '/src/services/portfolio/useFeaturedPortfolio';

export const PortfolioRightPanel = ({ onClose, id, open, view = 'QUICK' }) => {
  const { mutate: mutatePortfolioList } = usePortfolioList();
  const { mutate: mutateFeaturedPortfolioList } = useFeaturedPortfolioList();
  const { data: portfolioData, isLoading, mutate } = useGetPortfolioData(id);
  const { isLogin } = useAuth();
  const [isFeatured, setIsFeatured] = React.useState(false);
  const [panelView, setPanelView] = React.useState(view);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  // *********************States*********************************

  const { values, errors, handleChange, handleSubmit, setValues, setFieldValue, resetForm } = useFormik({
    initialValues: defaultPortfolio(),
    validate: (values) => {
      const errors = {};
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
          'caseStudies',
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
          ? await updatePortfolioAsync(portfolioData.data, {
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
          mutate();
          mutatePortfolioList();
          mutateFeaturedPortfolioList();

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
    if (portfolioData?.data) {
      setIsFeatured(portfolioData?.data?.isFeatured);
      setValues(defaultPortfolio(portfolioData?.data));
    }
  }, [portfolioData?.data]);

  const handleDelete = async () => {
    onClose?.();
    mutatePortfolioList();
    mutateFeaturedPortfolioList();
  };

  const handleFeatured = async (featured) => {
    try {
      setIsFeatured(featured);
      const finalData = convertArrayObjIntoArrOfStr(values, [
        'portfolioCategories',
        'states',
        'countries',
        'partnerHQ',
        'caseStudies'
      ]);

      const res = await updatePortfolioAsync(portfolioData.data, {
        ...finalData,
        isFeatured: featured,
        thumbnailImage: Array.isArray(finalData.thumbnailImage)
          ? finalData.thumbnailImage[0] || ''
          : finalData.thumbnailImage || '',
        videoLink: Array.isArray(finalData.videoLink) ? finalData.videoLink[0] || null : finalData.videoLink || null,
      });

      if (res.success) {
        onClose?.();
        mutate();
        mutatePortfolioList();
        mutateFeaturedPortfolioList();
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
              onClick={() => router.push(`/portfolio/${id}`)}
              title="Analytics"
            >
              <Icon icon="mdi:analytics" />
            </IconButton>
          )}

          {panelView !== 'ADD' && (
            <DeleteConfirmationPasswordPopover
              id={id}
              title="Are you sure you want to delete?"
              deleteFn={deleteSinglePortfolioAsync}
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
          <PortfolioQuickView data={portfolioData?.data} isEdit={false} />
        ) : (
          <PortfolioForm formikProps={{ values, setValues, errors, handleChange, setFieldValue }} />
        )}
      </PageLoader>
    </DrawerContainer>
  );
};
