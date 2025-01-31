'use client';

import React from 'react';
import { formConstants } from '@/app/constants/form-constants';
import { DeleteConfirmationPopover } from '@/components/dialog/delete-confirmation-popover';
import { Iconify } from '@/components/iconify/iconify';
import { RightPanel } from '@/components/rightPanel/right-panel';
import { Button, IconButton, Stack } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '@/hooks/useAuth';

import {
  createPortfolioAsync,
  deletePortfolioAsync,
  getPortfolioAsync,
  updatePortfolioAsync,
} from '../_lib/portfolio.actions';
import { defaultPortfolio } from '../_lib/portfolio.types';
import { PortfolioForm } from './portfolio-form';
import { PortfolioQuickView } from './portfolio-quickview';

export const ManagePortfolioRightPanel = ({ open, onClose, fetchList, data, width, view }) => {
  const isUpdate = data ? true : false;
  const { isLogin } = useAuth();

  const [sidebarView, setSidebarView] = React.useState(view); //QUICK/ EDIT
  const [file, setFile] = React.useState(null);

  const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
    useFormik({
      initialValues: defaultPortfolio,
      validate: (values) => {
        const errors = {};
        if (!values.project_title) {
          errors.project_title = formConstants.required;
        }

        return errors;
      },
      onSubmit: async (values) => {
        setLoading(true);
        try {
          const res = isUpdate ? await updatePortfolioAsync(file, values) : await createPortfolioAsync(file, values);
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
    const response = await deletePortfolioAsync([data.id]);
    if (response.success) {
      fetchList();
    }
  };

  const handleDeleteThumbnail = () => {
    setFieldValue('thumbnail', '');
    setFile(null);
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
          <Button variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
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
              <DeleteConfirmationPopover
                title={`Want to delete ${data?.project_title}?`}
                onDelete={() => handleDelete()}
              />{' '}
            </>
          )}
        </Stack>
      )}
    >
      {sidebarView === 'QUICK' ? (
        <PortfolioQuickView data={values} />
      ) : (
        <PortfolioForm
          data={values}
          errors={errors}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onSetFile={setFile}
          onDeleteThumbnail={handleDeleteThumbnail}
        />
      )}
    </RightPanel>
  );
};
