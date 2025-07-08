'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '/src/hooks/useAuth';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '/src/components/drawer/drawer';
import { Iconify } from '/src/components/iconify/iconify';

import {
  createContentAsync,
  deleteContentAsync,
  getContentAsync,
  updateContentAsync,
} from '../_lib/all-content.actions';
import { defaultContent } from '../_lib/all-content.types';
import { ContentForm } from './content-form';
import { ContentQuickView } from './content-quick-view';
import { formConstants } from '/src/app/constants/form-constants';

export const ManageContentRightPanel = ({ fetchList, onClose, data, open, view = 'QUICK' }) => {
  const { isLogin } = useAuth();
  const router = useRouter();
  const [panelView, setPanelView] = React.useState(view);
  // const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { values, errors, handleChange, setFieldValue, resetForm, setValues, handleSubmit } = useFormik({
    initialValues: defaultContent(),
    validate: (values) => {
      const errors = {};
      const requiredFields = [
        'name',
        'revoPinterest',
        'pinAccountsUsed',
        'postingQuality',
        'googleDriveFiles',
        'playbookLink',
        'assetStatus',
        'monthUploaded',
        'revoInstagram',
        'partnerIGLink',
        'igSocialSetsUsed',
        'revoTwitter',
        'tiktokAccountsUsed',
        'revoTikTok',
        'partnerTikTokLink',
        'ytAccountsUsed',
        'partnerYTLink',
        'revoClubrevoYoutube',
        'revoYoutube',
        'postingStatus',
        'totalContributedEngagement',
        'creatorStatus',
        'igPost4',
        'igPost2',
        'igPost3',
        'platform',
        'clubREVOIGHandle',
        'thumbnailImage',
        'ttDummyAccountsUsed',
      ];

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
        const finalData = {
          ...values,
        };

        const arrayFields = ['campaigns', 'cities', 'products', 'tags', 'stakeholders', 'partners', 'retailPartners'];

        for (const field of arrayFields) {
          const value = values[field];
          if (value.length > 0) {
            const arrOfStr = value.map((item) => item.value);
            finalData[field] = arrOfStr;
          }
        }

        const splitArrayFields = ['postingQuality', 'creatorStatus', 'platform', 'ttDummyAccountsUsed'];

        for (const field of splitArrayFields) {
          const value = field?.split(',');
          if (value.length > 0) {
            finalData[field] = value;
          }
        }

        const res = data?.id
          ? await updateContentAsync(id, {
              ...finalData,
              thumbnailImage: Array.isArray(finalData.thumbnailImage)
                ? finalData.thumbnailImage[0]
                : finalData.thumbnailImage,
            })
          : await createContentAsync({
              ...finalData,
              thumbnailImage: Array.isArray(finalData.thumbnailImage)
                ? finalData.thumbnailImage[0]
                : finalData.thumbnailImage,
            });
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
      await updateContentAsync({ ...data, isFeatured: featured });
      fetchList();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // console.log(id, 'id....');
  // --------------- Fetch campaign during update -------------------
  React.useEffect(() => {
    const fetSingleData = async () => {
      try {
        const res = await getContentAsync(data?.id);

        console.log(res, 'res....');
        if (res?.success) {
          const modifiedData = defaultContent(res?.data);
          console.log(modifiedData, 'modifiedData');
          setValues(defaultContent(res?.data));
          // setData(res?.data?.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (data?.id && panelView === 'EDIT') {
      fetSingleData();
    }
  }, [data?.id, panelView]);

  console.log(data?.id, 'data?.id');
  console.log(panelView, 'panelView');
  console.log(values, 'values....');

  // *****************Action Buttons*******************************
  const actionButtons = (
    <>
      {isLogin && (
        <>
          {panelView === 'EDIT' && data?.id ? (
            <IconButton onClick={() => setPanelView('QUICK')} title="Edit">
              <Iconify icon="solar:eye-broken" />
            </IconButton>
          ) : (
            data?.id && (
              <IconButton onClick={() => setPanelView('EDIT')} title="Quick">
                <Iconify icon="mynaui:edit-one" />
              </IconButton>
            )
          )}

          {panelView === 'EDIT' && (
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
              Save
            </Button>
          )}

          <IconButton
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            as={Link}
            href={`/all-content/${data?.id}`}
            title="Analytics"
          >
            <Iconify icon="mdi:analytics" />
          </IconButton>

          {panelView === 'QUICK' && (
            <DeleteConfirmationPasswordPopover
              id={data?.id}
              title="Are you sure you want to delete?"
              deleteFn={deleteContentAsync}
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
      {panelView === 'QUICK' ? (
        <ContentQuickView data={data} isEdit={false} />
      ) : (
        <ContentForm formikProps={{ values, setValues, errors, handleChange, setFieldValue, handleSubmit }} />
      )}
    </DrawerContainer>
  );
};
