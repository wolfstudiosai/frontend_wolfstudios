'use client';

import React, { useEffect, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '/src/hooks/useAuth';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '/src/components/drawer/drawer';
import { Iconify } from '/src/components/iconify/iconify';

import { createPartnerAsync, deletePartnerAsync, getPartnerAsync, updatePartnerAsync } from '../_lib/partner.actions';
import { defaultPartner } from '../_lib/partner.types';
import { PartnerForm } from './partner-form';
import { PartnerQuickView } from './partner-quickview';
import { formConstants } from '/src/app/constants/form-constants';
import { imageUploader } from '/src/utils/upload-file';

export const ManagePartnerRightPanel = ({ open, onClose, fetchList, data, width, view, isAdd }) => {
  const isUpdate = data?.id ? true : false;
  const { isLogin } = useAuth();
  const [sidebarView, setSidebarView] = React.useState(view); //QUICK/ EDIT
  const [loading, setLoading] = React.useState(false);

  // *********************States*********************************

  const handleDelete = async () => {
    const response = await deletePartnerAsync([data.id]);
    if (response.success) {
      fetchList();
      onClose?.();
    }
  };

  const { values, errors, handleChange, handleSubmit, setFieldValue, setValues, resetForm } = useFormik({
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
        const finalData = { ...values };
        const imageFields = ['profileImage', 'mediaKit', 'receipts'];
        // Collect image files and their metadata
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
              'partner-HQ'
            );

            finalData[field] = res;
          } else if (typeof value === 'string') {
            finalData[field] = [value];
          }
        }
        const res = isUpdate ? await updatePartnerAsync(finalData) : await createPartnerAsync(finalData);
        if (res.success) {
          resetForm();
          setSidebarView('QUICK');
          onClose?.();
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

  // *****************Use Effects**********************************
  useEffect(() => {
    if (sidebarView === 'EDIT' && data?.id) {
      const getSingleData = async () => {
        setLoading(true);
        try {
          const response = await getPartnerAsync(data.id);
          if (response.data) {
            setValues(defaultPartner(response.data));
          }
        } catch (error) {
          console.error('Error fetching partner data:', error);
          return null;
        } finally {
          setLoading(false);
        }
      };
      getSingleData();
    }
  }, [sidebarView, data?.id, setValues]);

  // *****************Action Buttons*******************************
  const actionButtons = (
    <>
      {isLogin && (
        <>
          {sidebarView === 'EDIT' && isUpdate ? (
            <IconButton onClick={() => setSidebarView('QUICK')} title="Edit">
              <Iconify icon="solar:eye-broken" />
            </IconButton>
          ) : (
            isUpdate && (
              <IconButton onClick={() => setSidebarView('EDIT')} title="Quick">
                <Iconify icon="mynaui:edit-one" />
              </IconButton>
            )
          )}
          {sidebarView === 'EDIT' && (
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
              Save
            </Button>
          )}
          {sidebarView === 'QUICK' && (
            <DeleteConfirmationPasswordPopover
              title={`Want to delete ${data?.name}?`}
              onDelete={(password) => handleDelete(password)}
              passwordInput
            />
          )}
        </>
      )}
    </>
  );

  return (
    <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons} width={width}>
      {sidebarView === 'QUICK' ? (
        <PartnerQuickView data={data} />
      ) : (
        <PartnerForm
          handleChange={handleChange}
          values={values}
          errors={errors}
          setFieldValue={setFieldValue}
          onSubmit={handleSubmit}
        />
      )}
    </DrawerContainer>
  );
};
