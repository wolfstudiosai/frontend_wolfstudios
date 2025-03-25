'use client';

import React, { useState } from 'react';
import { formConstants } from '/src/app/constants/form-constants';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '/src/components/drawer/drawer';
import { Iconify } from '/src/components/iconify/iconify';
import { Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '/src/hooks/useAuth';

import { createPartnerAsync, deletePartnerAsync, getPartnerAsync, updatePartnerAsync } from '../_lib/partner.actions';
import { defaultPartner } from '../_lib/partner.types';
import { PartnerForm } from './partner-form';
import { PartnerQuickView } from './partner-quickview';

export const ManagePartnerRightPanel = ({ open, onClose, fetchList, data, width, view }) => {
  const isUpdate = data ? true : false;
  const { isLogin } = useAuth();
  const [formData, setFormData] = useState(data); // formdata
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
        if (!values.email) {
          errors.email = formConstants.required;
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
    setFieldValue('profile_image', '');
    setFile(null);
  };
  
  const handleDataUpdate = async () => {
    let currentID = data?.id;
    const updatedFormData = { ...formData, id: currentID };
    const response = await updatePartnerAsync(updatedFormData);
    if (response.success) {
      fetchList();
      window.location.reload();
    }
  }

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
              <Button size="small" variant="outlined" onClick={() => setSidebarView('QUICK')} title="Cancel">
              Cancel
            </Button>
            )
          )}

          {sidebarView === 'EDIT' && (
            // <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleDataUpdate}>
              Save
            </Button>
          )}
          <DeleteConfirmationPasswordPopover title={`Want to delete ${data?.name}?`}  onDelete={(password) => handleDelete(password)}  passwordInput disabled={!isUpdate || sidebarView === 'EDIT'} />
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
    <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons} width={width}>
      {sidebarView === 'QUICK' ? (
        <PartnerQuickView data={values} isEdit={sidebarView}/>
      ) : (
        // <PartnerForm
        //   data={values}
        //   errors={errors}
        //   onSubmit={handleSubmit}
        //   onChange={handleChange}
        //   onSetFile={setFile}
        //   onDelete={handleDeleteThumbnail}
        //   setFieldValue={setFieldValue}
        // />
        <PartnerQuickView data={values} isEdit={sidebarView} onUpdate={setFormData}/>
      )}
    </DrawerContainer>
  );
};
