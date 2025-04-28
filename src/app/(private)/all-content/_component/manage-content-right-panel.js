'use client';

import React, { useState } from 'react';
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
import { defaultContent1 } from '../_lib/all-content.types.old';
import { ContentForm } from './content-form';
import { ContentQuickView } from './content-quick-view';
import { formConstants } from '/src/app/constants/form-constants';

export const ManageContentRightPanel = ({ open, onClose, fetchList, data, width, view, isAdd }) => {
  const isUpdate = data?.id ? true : false;
  const { isLogin } = useAuth();
  const [sidebarView, setSidebarView] = React.useState(view); // QUICK // EDIT
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = useState(data);
  console.log(data?.id, 'data.id....');
  console.log(sidebarView, 'sidebarView.....');
  React.useEffect(() => {
    if (isAdd) {
      // Reset to default content when adding new
      setValues(defaultContent1);
      setSidebarView('EDIT');
    } else if (data?.id) {
      // Load existing data when available
      setValues(data);
      setSidebarView('QUICK');
    }j
  }, [isAdd, data]);

  const { values, errors, handleChange, setFieldValue, resetForm, setValues, handleSubmit } = useFormik({
    initialValues: defaultContent(),
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = formConstants.required;
      }
      if (!values.revoPinterest) {
        errors.revoPinterest = formConstants.required;
      }
      if (!values.revoPinterest) {
        errors.revoPinterest = formConstants.required;
      }
      if (!values.pinAccountsUsed) {
        errors.pinAccountsUsed = formConstants.required;
      }
      if (!values.postQuality) {
        errors.postQuality = formConstants.required;
      }
      if (!values.googleDriveFiles) {
        errors.googleDriveFiles = formConstants.required;
      }
      if (!values.playbookLink) {
        errors.playbookLink = formConstants.required;
      }
      if (!values.upPromoteConversion) {
        errors.upPromoteConversion = formConstants.required;
      }
      if (!values.monthUploaded) {
        errors.monthUploaded = formConstants.required;
      }
      if (!values.revoInstagram) {
        errors.revoInstagram = formConstants.required;
      }
      if (!values.creatorStatus) {
        errors.creatorStatus = formConstants.required;
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        console.log(values, 'content value values...');
        const res = await createContentAsync(values);
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
  const handleDelete = async (password) => {
    const response = await deleteContentAsync([data.id]);
    if (response.success) {
      fetchList();
      window.location.reload();
    }
  };

  const handleDataUpdate = async () => {
    try {
      setLoading(true);
      let currentID = data?.id;
      const updatedFormData = { ...formData, id: currentID };
      const response = await updateContentAsync(updatedFormData, file);
      if (response.success) {
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // --------------- Fetch campaign during update -------------------
  React.useEffect(() => {
    const fetSingleData = async () => {
      try {
        const res = await getContentAsync(data?.id);
        if (res?.success) {
          setValues(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (data?.id && sidebarView === 'EDIT') {
      fetSingleData();
    }
  }, [data?.id]);

  // --------------- Set values during update -------------------
  React.useEffect(() => {
    if (data) {
      setValues(defaultContent(data));
    }
  }, [data, setValues]);

  console.log(errors, 'errors');
  console.log(values, 'values...');

  // *****************Action Buttons*******************************
  const actionButtons = (
    <>
      {isLogin && (
        <>
          {sidebarView === 'EDIT' && isUpdate ? (
            <Button size="small" variant="outlined" onClick={() => setSidebarView('QUICK')} title="Cancel">
              Cancel
            </Button>
          ) : (
            // <IconButton onClick={() => setSidebarView('QUICK')} title="Edit">
            //   <Iconify icon="solar:eye-broken" />
            // </IconButton>
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
          {/* {isAdd && (
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
              Create
            </Button>
          )} */}
          {sidebarView === 'QUICK' && (
            <DeleteConfirmationPasswordPopover
              title={`Want to delete ${data?.name}?`}
              onDelete={(password) => handleDelete(password)}
              passwordInput
              disabled={!isUpdate || sidebarView === 'EDIT'}
            />
          )}
        </>
      )}
    </>
  );

  return (
    <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons}>
      {sidebarView === 'EDIT' ? (
        <ContentForm formikProps={{ values, errors, handleChange, setFieldValue, handleSubmit }} />
      ) : (
        <ContentQuickView data={data} isEdit={false} />
      )}
    </DrawerContainer>
  );
};
