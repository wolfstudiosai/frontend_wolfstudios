'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Button, FormControlLabel, IconButton, Switch } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '/src/hooks/useAuth';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '/src/components/drawer/drawer';
import PageLoader from '../../../../components/loaders/PageLoader';

import { createPartnerAsync, deletePartnerAsync, updatePartnerAsync } from '../_lib/partner.actions';
import { defaultPartner } from '../_lib/partner.types';
import { convertArrayObjIntoArrOfStr } from '../../../../utils/convertRelationArrays';
import { PartnerForm } from './partner-form';
import { PartnerQuickView } from './partner-quickview';
import { formConstants } from '/src/app/constants/form-constants';
import { useGetPartnerData } from '/src/services/partner/usePartnerData';
import { usePartnerList } from '/src/services/partner/usePartnerList';
import { useFeaturedPartnerList } from '/src/services/partner/useFeaturedPartner';

export const PartnerRightPanel = ({ onClose, id, open, view = 'QUICK' }) => {
  const { mutate: mutatePartnerList } = usePartnerList();
  const { data: partnerData, isLoading, mutate } = useGetPartnerData(id);
  const { mutate: mutateFeaturedPartnerList } = useFeaturedPartnerList();
  const { isLogin } = useAuth();
  const [isFeatured, setIsFeatured] = React.useState(false);
  const [panelView, setPanelView] = React.useState(view);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const { values, errors, handleChange, setFieldValue, resetForm, setValues, handleSubmit } = useFormik({
    initialValues: defaultPartner(),
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = formConstants.required;
      }
      if (!values.email) {
        errors.email = formConstants.required;
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const finalData = convertArrayObjIntoArrOfStr(values, [
          'stakeholders',
          'contentHQ',
          'profileCategory',
          'portfolios',
          'states',
          'cities',
          'services',
          'caseStudies',
          'productionHQ',
          'products',
          'contributedCampaigns',
          'countries',
          'tags',
          'retailPartners',
          'destinations',
          'proposedCampaigns',
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
          ? await updatePartnerAsync({
            ...finalData,
            thumbnailImage: Array.isArray(finalData.thumbnailImage)
              ? finalData.thumbnailImage[0]
              : finalData.thumbnailImage,
          })
          : await createPartnerAsync(createPayload);
        if (res.success) {
          onClose?.();
          resetForm();
          mutate();
          mutatePartnerList();
          mutateFeaturedPartnerList();

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
    if (partnerData?.data) {
      setIsFeatured(partnerData?.data?.isFeatured);
      setValues(defaultPartner(partnerData?.data));
    }
  }, [partnerData?.data]);

  const handleDelete = async () => {
    onClose?.();
    mutatePartnerList();
    mutateFeaturedPartnerList();
  };

  const handleFeatured = async (featured) => {
    try {
      setIsFeatured(featured);
      const finalData = convertArrayObjIntoArrOfStr(values, [
        'stakeholders',
        'contentHQ',
        'profileCategory',
        'portfolios',
        'states',
        'cities',
        'services',
        'caseStudies',
        'productionHQ',
        'products',
        'contributedCampaigns',
        'countries',
        'tags',
        'retailPartners',
        'destinations',
        'proposedCampaigns',
        'productionHQ2',
      ]);

      const res = await updatePartnerAsync({
        ...finalData,
        isFeatured: featured,
        thumbnailImage: Array.isArray(finalData.thumbnailImage)
          ? finalData.thumbnailImage[0]
          : finalData.thumbnailImage,
      });

      if (res.success) {
        onClose?.();
        mutate();
        mutatePartnerList();
        mutateFeaturedPartnerList();
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
              onClick={() => router.push(`/partner/${id}`)}
            >
              <Icon icon="mdi:analytics" />
            </IconButton>
          )}
          {panelView !== 'ADD' && (
            <DeleteConfirmationPasswordPopover
              id={id}
              title="Are you sure you want to delete?"
              deleteFn={deletePartnerAsync}
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
          <PartnerQuickView data={partnerData?.data} isEdit={false} />
        ) : (
          <PartnerForm formikProps={{ values, setValues, errors, handleChange, setFieldValue }} />
        )}
      </PageLoader>
    </DrawerContainer>
  );
};
