'use client';

import React from 'react';
import { DeleteConfirmationPopover } from '@/components/dialog/delete-confirmation-popover';
import { Iconify } from '@/components/iconify/iconify';
import { RightPanel } from '@/components/rightPanel/right-panel';
import { Button, IconButton, Stack } from '@mui/material';

import useAuth from '@/hooks/useAuth';

import { deletePortfolioAsync, getPortfolioAsync } from '../_lib/portfolio.actions';
import { defaultPortfolio } from '../_lib/portfolio.types';
import { PortfolioForm } from './portfolio-form';
import { PortfolioQuickView } from './portfolio-quickview';

export const ManagePortfolioRightPanel = ({ open, onClose, fetchList, data, width, view }) => {
  const isUpdate = data ? true : false;
  const [values, setValues] = React.useState(defaultPortfolio);
  const [sidebarView, setSidebarView] = React.useState(view); //QUICK/ EDIT
  const { isLogin } = useAuth();

  // *********************States*********************************
  const [loading, setLoading] = React.useState(false);

  const getSingleData = async () => {
    setLoading(true);
    try {
      const response = await getPortfolioAsync(id);
      setValues(response.data);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const response = await deletePortfolioAsync([portfolio.id]);
    if (response.success) {
      fetchList();
    }
  };

  // *****************Use Effects*******************************

  React.useEffect(() => {
    return () => {
      setValues(defaultPortfolio);
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
    <RightPanel
      heading={data?.project_title}
      open={open}
      onClose={onClose}
      width={width}
      actionButtons={() => (
        <Stack direction="row" alignItems="center" gap={2}>
          <Button variant="outlined" color="primary" onClick={onClose}>
            Close
          </Button>
          <Button variant="contained" color="primary" disabled={loading}>
            Save
          </Button>
          {isLogin && (
            <>
              {sidebarView === 'QUICK' ? (
                <IconButton onClick={() => setSidebarView('EDIT')} title="Edit">
                  <Iconify icon="mynaui:edit-one" />
                </IconButton>
              ) : (
                <IconButton onClick={() => setSidebarView('QUICK')} title="Quick View">
                  <Iconify icon="lets-icons:view-light" />
                </IconButton>
              )}
              <DeleteConfirmationPopover title={`Want to delete ${data?.project_title}?`} onDelete={handleDelete} />{' '}
            </>
          )}
        </Stack>
      )}
    >
      {sidebarView === 'QUICK' ? (
        <PortfolioQuickView data={values} />
      ) : (
        <PortfolioForm data={values} onClose={onClose} fetchList={fetchList} />
      )}
    </RightPanel>
  );
};
