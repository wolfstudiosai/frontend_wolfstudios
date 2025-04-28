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
  const isUpdate = data ? true : false;
  const { isLogin } = useAuth();
  const [formData, setFormData] = useState(data); // formdata
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

  const handleDataUpdate = async () => {
    let currentID = data?.id;
    const updatedFormData = { ...formData, id: currentID };
    const response = await updatePartnerAsync(updatedFormData);
    if (response.success) {
      fetchList();
      window.location.reload();
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
        const fieldToConvert = [
          'platformDeliverables',
          'affiliatePlatform',
          'ageBracket',
          'contracts',
          'currentStatus',
          'platforms',
          'profileStatus',
          'sourcedFrom',
        ];
        for (const field of fieldToConvert) {
          const value = values[field];
          if (value.length > 0) {
            const arrOfStr = value.map((item) => item.value);
            finalData[field] = arrOfStr;
          }
        }
        console.log('final data: ', finalData);
        const res =
          sidebarView === 'EDIT' ? await updatePartnerAsync(data.id, finalData) : await createPartnerAsync(finalData);
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
          {sidebarView === 'QUICK' && !isAdd ? (
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

          {/* {sidebarView === 'EDIT' && !isAdd && (
            // <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleDataUpdate}>
              Save
            </Button>
          )} */}
          {(isAdd || sidebarView === 'EDIT') && (
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
              {sidebarView === 'EDIT' ? 'Save' : 'Add'}
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

// {
//   isAdd ? (
//     <PartnerForm
//       handleChange={handleChange}
//       values={values}
//       errors={errors}
//       setFieldValue={setFieldValue}
//       onSubmit={handleSubmit}
//     />
//   ) : sidebarView === 'QUICK' ? (
//     // <PartnerQuickView data={values} isEdit={sidebarView}/>
//     <PartnerQuickView data={data} isEdit={sidebarView} />
//   ) : (
//     // <PartnerQuickView data={values} isEdit={sidebarView} onUpdate={setFormData}/>
//     <PartnerQuickView data={data} isEdit={sidebarView} onUpdate={setFormData} />
//   );
// }
