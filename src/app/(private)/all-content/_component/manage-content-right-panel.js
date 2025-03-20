'use client';

import { DeleteConfirmationPopover } from '/src/components/dialog/delete-confirmation-popover';
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
// import { createCampaignAsync, deleteCampaignAsync, updateCampaignAsync } from '../_lib/campaign.actions';

export const ManageContentRightPanel = ({ open, onClose, fetchList, data, width, view }) => {
  const isUpdate = data?.id ? true : false;
  const router = useRouter();
  const { isLogin } = useAuth();
  const [sidebarView, setSidebarView] = React.useState(view); //QUICK/ EDIT
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = useState(data); // formdata

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

  const handleDelete = async () => {
    const response = await deleteCampaignAsync([data.id]);
    if (response.success) {
      // fetchList();
      window.location.reload();
    }
  };

  const DeleteConfirmationwithPasswordPopover = ({ title, onDelete, passwordInput, disabled }) => {
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
  
    const handleConfirm = () => {
      if (passwordInput && !password) return;
      onDelete(passwordInput ? password : null);
      setPassword('');
      setOpen(false);
    };
  
    return (
      <>
        <IconButton 
          ref={anchorRef}
          onClick={() => setOpen(true)}
          title="Delete"
          disabled={disabled}
          color="error"
        >
          <Iconify icon="ic:outline-delete" width={24} height={24} color="error" />
        </IconButton>
  
        <Popover
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchorRef.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ p: 2, width: 300 }}>
            <Typography variant="subtitle1" gutterBottom>
              {title}
            </Typography>
            
            {passwordInput && (
              <TextField
                fullWidth
                type="password"
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
            )}
  
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button 
                variant="outlined" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                color="error"
                onClick={handleConfirm}
                disabled={passwordInput && !password}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Popover>
      </>
    );
  };

  const handleDataUpdate =(data) => {
    console.log('formdata from child', formData); 
    // setFormData(data);
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
              Save
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

          {/* <DeleteConfirmationPopover title={`Want to delete ${data?.name}?`} onDelete={() => handleDelete()} /> */}
          <DeleteConfirmationwithPasswordPopover title={`Want to delete ${data?.name}?`}  onDelete={(password) => handleDelete(password)}  passwordInput disabled={!isUpdate || sidebarView === 'EDIT'} />
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
      {sidebarView === 'QUICK' ? (
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
    </DrawerContainer>
  );
};
