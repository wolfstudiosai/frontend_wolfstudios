'use client';

import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '/src/hooks/useAuth';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '/src/components/drawer/drawer';
import { Iconify } from '/src/components/iconify/iconify';

import { createPartnerAsync, deletePartnerAsync, getPartnerAsync, updatePartnerAsync } from '../_lib/partner.actions';
import { defaultPartner1 } from '../_lib/partner.types';
import { PartnerForm } from './partner-form';
import { PartnerQuickView } from './partner-quickview';
import { formConstants } from '/src/app/constants/form-constants';

export const ManagePartnerRightPanel = ({ open, onClose, fetchList, data, width, view, isAdd }) => {
  const isUpdate = data ? true : false;
  const { isLogin } = useAuth();
  const [formData, setFormData] = useState(data); // formdata
  const [sidebarView, setSidebarView] = React.useState(view); //QUICK/ EDIT
  const [loading, setLoading] = React.useState(false);

  // *********************States*********************************

  // const getSingleData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await getPartnerAsync(id);
  //     setValues(response.data);
  //   } catch (error) {
  //     console.error('Error fetching partner data:', error);
  //     return null;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

          {sidebarView === 'EDIT' && !isAdd && (
            // <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleDataUpdate}>
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
            />
          )}
        </>
      )}
    </>
  );
  // *****************Use Effects*******************************

  return (
    <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons} width={width}>
      {isAdd ? (
        <PartnerForm id="" onClose={onClose} fetchList={fetchList} />
      ) : sidebarView === 'QUICK' ? (
        // <PartnerQuickView data={values} isEdit={sidebarView}/>
        <PartnerQuickView data={data} isEdit={sidebarView} />
      ) : (
        // <PartnerQuickView data={values} isEdit={sidebarView} onUpdate={setFormData}/>
        <PartnerQuickView data={data} isEdit={sidebarView} onUpdate={setFormData} />
      )}
    </DrawerContainer>
  );
};
