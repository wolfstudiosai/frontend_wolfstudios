'use client';

import { Button, FormControlLabel, IconButton, Switch } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';

import {
  createPortfolioAsync,
  deletePortfolioAsync,
  getPortfolioAsync,
  updatePortfolioAsync
} from '../_lib/portfolio.actions';
import { defaultPortfolio } from '../_lib/portfolio.types';
import { PortfolioForm } from './portfolio-form';
import { PortfolioQuickView } from './portfolio-quickview';
import { formConstants } from '/src/app/constants/form-constants';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '/src/components/drawer/drawer';
import { Iconify } from '/src/components/iconify/iconify';
import useAuth from '/src/hooks/useAuth';

export const ManagePortfolioRightPanel = ({ open, onClose, fetchList, data, width, view }) => {
  const isUpdate = data ? true : false;
  const { isLogin } = useAuth();

  const [sidebarView, setSidebarView] = React.useState(view); //QUICK/ EDIT
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
    useFormik({
      initialValues: defaultPortfolio,
      validate: (values) => {
        const errors = {};
        if (!values.projectTitle) {
          errors.projectTitle = formConstants.required;
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

  const handleDelete = async (password) => {
    const response = await deletePortfolioAsync([data.id]);
    if (response.success) {
      fetchList();
      onClose?.();
    }
  };

  const handleDeleteThumbnail = () => {
    setFieldValue('thumbnail', '');
    setFile(null);
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

          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={values?.featured}
                onChange={() => handleFeatured(!values?.featured)}
                color="primary"
              />
            }
            label="Featured"
          />

          <DeleteConfirmationPasswordPopover title={`Want to delete ${data?.project_title}?`} onDelete={(password) => handleDelete(password)} passwordInput />

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
    <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons}>
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
          setFieldValue={setFieldValue}
        />
      )}
    </DrawerContainer>
  );
};
