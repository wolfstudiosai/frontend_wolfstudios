'use client';

import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';  
import { DrawerContainer } from '/src/components/drawer/drawer';
import { Iconify } from '/src/components/iconify/iconify';
import { Box, Button, IconButton, Popover, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import useAuth from '/src/hooks/useAuth';
import { ContentForm } from './content-form';
import { ContentQuickView } from './content-quick-view';
import { defaultContent } from '../_lib/all-content.types';
import { useFormik } from 'formik';
import { updateContentAsync, deleteContentAsync,createContentAsync  } from '../_lib/all-content.actions';

export const ManageContentRightPanel = ({ open, onClose, fetchList, data, width, view, isAdd }) => {
  const isUpdate = data?.id ? true : false;
  const router = useRouter();
  const { isLogin } = useAuth();
  const [sidebarView, setSidebarView] = React.useState(view); // QUICK // EDIT
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = useState(data); // formdata
  
  React.useEffect(() => {
    if (isAdd) {
      // Reset to default content when adding new
      // setValues(defaultContent);
      setSidebarView('EDIT');
    } else if (data?.id) {
      // Load existing data when available
      // setValues(data);
      setSidebarView('QUICK');
    }
  }, [isAdd, data]);
  
    const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
      useFormik({
        initialValues: defaultContent,
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
            const res = isUpdate ? await updateContentAsync(file, values) : await createContentAsync(file, values);
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

  const handleDelete = async (password) => {
    const response = await deleteContentAsync([data.id]);
    if (response.success) {
      fetchList();
      window.location.reload();
    }
  };

  const handleDataUpdate = async () => {
    let currentID = data?.id;
    const updatedFormData = { ...formData, id: currentID };
    const response = await updateContentAsync(updatedFormData, file);
    if (response.success) {
      window.location.reload();
    }
  }

  // *****************Action Buttons*******************************
  const actionButtons = (
    <>
      {isLogin && (
        <>
          {sidebarView === 'EDIT' && isUpdate ? (
             <Button size="small" variant="outlined" onClick={() => setSidebarView('QUICK')} title="Cancel">
             Cancel
           </Button>
            // <IconButton onClick={() => setSidebarView('QUICK')} title="Edit">
            //   <Iconify icon="solar:eye-broken" />
            // </IconButton>
          ) : (
            isUpdate && (
              <IconButton onClick={() => setSidebarView('EDIT')} title="Quick">
                <Iconify icon="mynaui:edit-one" />
              </IconButton>
            )
          )}
          {sidebarView === 'EDIT' && (
            // <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleDataUpdate}>
              {isAdd ? 'Create' : 'Save'}
            </Button>
          )}
          {/* {isUpdate && (
            <IconButton
              onClick={() => router.push(paths.public.campaign_analytics + '/' + data.slug)}
              title="Quick View"
            >
              <Iconify icon="hugeicons:analytics-01" />
            </IconButton>
          )} */}

          {/* <FormControlLabel
            control={
              <Switch
                size="small"
                checked={values?.featured}
                onChange={() => handleFeatured(!values?.featured)}
                color="primary"
                sx={{ ml: 0.4 }}
              />
            }
            label="Featured"
          /> */}
          <DeleteConfirmationPasswordPopover title={`Want to delete ${data?.name}?`}  onDelete={(password) => handleDelete(password)}  passwordInput disabled={!isUpdate || sidebarView === 'EDIT'} />
        </>
      )}
    </>
  );

  // *****************Use Effects*******************************

  // React.useEffect(() => {
  //   return () => {
  //     setValues(defaultCampaign);
  //   };
  // }, []);

  // React.useEffect(() => {
  //   if (data) {
  //     setValues(data);
  //   }
  // }, [data]);

  // React.useEffect(() => {
  //   if (isUpdate) {
  //     getSingleData();
  //   }
  // }, []);

  return (
    <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons}>
      {/* {sidebarView === 'QUICK' ? (
        <ContentQuickView data={data} isEdit={sidebarView} />
      ) : (
        // <ContentForm
        //   data={values}
        //   errors={errors}
        //   setFieldValue={setFieldValue}
        //   onChange={handleChange}
        //   onSetFile={setFile}
        // />
        <ContentQuickView data={data} isEdit={sidebarView} onUpdate={setFormData} />
      )}
      { isAdd &&
        <ContentForm
          data={values}
          errors={errors}
          setFieldValue={setFieldValue}
          onChange={handleChange}
          onSetFile={setFile}
        />
      } */}
      {isAdd ? (
      // Show ContentForm for add new content
      <ContentForm
        data={values}
        errors={errors}
        setFieldValue={setFieldValue}
        onChange={handleChange}
        onSetFile={setFile}
      />
    ) : sidebarView === 'QUICK' ? (
      // Show ContentQuickView for viewing
      <ContentQuickView data={data} isEdit={false} />
    ) : (
      <ContentQuickView data={data} isEdit={sidebarView} onUpdate={setFormData} />
    )}
      </DrawerContainer>
  );
};
