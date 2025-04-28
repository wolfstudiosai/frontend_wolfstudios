'use client';

import React from 'react';
import { FormControlLabel, IconButton, Switch } from '@mui/material';

import useAuth from '/src/hooks/useAuth';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '/src/components/drawer/drawer';
import { Iconify } from '/src/components/iconify/iconify';

import { deletePortfolioAsync, updatePortfolioAsync } from '../_lib/portfolio.actions';
import { PortfolioForm } from './portfolio-form';
import { PortfolioQuickView } from './portfolio-quickview';

// import { api } from '/src/utils/api';

export const ManagePortfolioRightPanel = ({ open, onClose, fetchList, data, view }) => {
  const { isLogin } = useAuth();

  const [sidebarView, setSidebarView] = React.useState(view); //QUICK/ EDIT

  // *********************States*********************************

  // const getSingleData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await getPortfolioAsync(id);
  //     setValues(response.data);
  //   } catch (error) {
  //     console.error('Error fetching portfolio data:', error);
  //     return null;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleDelete = async (password) => {
    const response = await deletePortfolioAsync([data.id]);
    if (response.success) {
      fetchList();
      onClose?.();
    }
  };

  const handleFeatured = async (featured) => {
    setFieldValue('featured', featured);
    await updatePortfolioAsync(file, { ...values, featured });
    fetchList();
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

          {data !== null && (
            <>
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={data?.featured}
                    onChange={() => handleFeatured(!data?.featured)}
                    color="primary"
                  />
                }
                label="Featured"
              />

              <DeleteConfirmationPasswordPopover
                title={`Want to delete ${data?.project_title}?`}
                onDelete={(password) => handleDelete(password)}
                passwordInput
              />
            </>
          )}

          {/* {sidebarView === 'EDIT' && (
            <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
              Save
            </Button>
          )} */}
        </>
      )}
    </>
  );
  // *****************Use Effects*******************************

  // React.useEffect(() => {
  //   return () => {
  //     setValues(defaultPortfolio);
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
        <PortfolioQuickView data={data} />
      ) : (
        <PortfolioForm id={data?.id} onClose={onClose} fetchList={fetchList} />
      )}
    </DrawerContainer>
  );
};
