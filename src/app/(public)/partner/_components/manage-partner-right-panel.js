'use client';

import React from 'react';
import { formConstants } from '@/app/constants/form-constants';
import { DeleteConfirmationPopover } from '@/components/dialog/delete-confirmation-popover';
import { DrawerContainer } from '@/components/drawer/drawer';
import { Iconify } from '@/components/iconify/iconify';
import { Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '@/hooks/useAuth';

import { createPartnerAsync, deletePartnerAsync, getPartnerAsync, updatePartnerAsync } from '../_lib/partner.actions';
import { defaultPartner } from '../_lib/partner.types';
import { PartnerForm } from './partner-form';
import { PartnerQuickView } from './partner-quickview';

export const ManagePartnerRightPanel = ({ open, onClose, fetchList, data, width, view }) => {
  const isUpdate = data ? true : false;
  const { isLogin } = useAuth();

  const [sidebarView, setSidebarView] = React.useState(view); //QUICK/ EDIT
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
    useFormik({
      initialValues: defaultPartner,
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
          const res = isUpdate ? await updatePartnerAsync(file, values) : await createPartnerAsync(file, values);
          if (res.success) {
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

  // *********************States*********************************

  const getSingleData = async () => {
    setLoading(true);
    try {
      const response = await getPartnerAsync(id);
      setValues(response.data);
    } catch (error) {
      console.error('Error fetching partner data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const response = await deletePartnerAsync([data.id]);
    if (response.success) {
      fetchList();
      onClose?.();
    }
  };

  const handleDeleteThumbnail = () => {
    setFieldValue('thumbnail', '');
    setFile(null);
  };

  // *****************Action Buttons*******************************
  const actionButtons = (
    <>
      {isLogin && (
        <>
          {sidebarView === 'QUICK' ? (
            <IconButton onClick={() => setSidebarView('EDIT')} title="Edit">
              <Iconify icon="mynaui:edit-one" />
            </IconButton>
          ) : (
            data !== null && (
              <IconButton onClick={() => setSidebarView('QUICK')} title="Quick View">
                <Iconify icon="lets-icons:view-light" />
              </IconButton>
            )
          )}

          <DeleteConfirmationPopover title={`Want to delete ${data?.name}?`} onDelete={() => handleDelete()} />

          {sidebarView === 'EDIT' && (
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
              Save
            </Button>
          )}
        </>
      )}
    </>
  );
  // *****************Use Effects*******************************

  React.useEffect(() => {
    return () => {
      setValues(defaultPartner);
    };
  }, []);

  React.useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  React.useEffect(() => {
    if (isUpdate) {
      getSingleData();
    }
  }, []);

  return (
    <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons}>
      {sidebarView === 'QUICK' ? (
        <PartnerQuickView data={values} />
      ) : (
        <PartnerForm
          data={values}
          errors={errors}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onSetFile={setFile}
          onDeleteThumbnail={handleDeleteThumbnail}
          setFieldValue={setFieldValue}
        />
      )}
    </DrawerContainer>
  );
};
