'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { formConstants } from '@/app/constants/form-constants';
import { DeleteConfirmationPopover } from '@/components/dialog/delete-confirmation-popover';
import { Iconify } from '@/components/iconify/iconify';
import { RightPanel } from '@/components/rightPanel/right-panel';
import { Box, Button, FormControlLabel, IconButton, Stack, Switch } from '@mui/material';
import { useFormik } from 'formik';

import { paths } from '@/paths';
import useAuth from '@/hooks/useAuth';

import { defaultCampaignData } from '../_lib/campagin.data';
import { CampaignQuickView } from './campaign-quick-view';

// import {
//   createPortfolioAsync,
//   deletePortfolioAsync,
//   getPortfolioAsync,
//   updatePortfolioAsync,
// } from '../_lib/portfolio.actions';
// import { defaultPortfolio } from '../_lib/portfolio.types';
// import { PortfolioQuickView } from './portfolio-quickview';

export const ManageCampaignRightPanel = ({ open, onClose, fetchList, data, width, view }) => {
  const isUpdate = data ? true : false;
  const router = useRouter();
  const { isLogin } = useAuth();

  const [sidebarView, setSidebarView] = React.useState(view); //QUICK/ EDIT
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur, setValues, setFieldValue, isValid, resetForm } =
    useFormik({
      initialValues: defaultCampaignData,
      validate: (values) => {
        const errors = {};
        if (!values.project_title) {
          errors.project_title = formConstants.required;
        }

        return errors;
      },
      onSubmit: async (values) => {
        setLoading(true);
        // try {
        //   const res = isUpdate ? await updatePortfolioAsync(file, values) : await createPortfolioAsync(file, values);
        //   if (res.success) {
        //     onClose?.();
        //     fetchList();
        //   } else {
        //     console.error('Operation failed:', res.message);
        //   }
        // } catch (error) {
        //   console.error('Error:', error);
        // } finally {
        //   setLoading(false);
        // }
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

  const handleFeatured = async (featured) => {
    setFieldValue('featured', featured);
    await updatePortfolioAsync(file, { ...values, featured });
    fetchList();
  };

  // *****************Use Effects*******************************

  React.useEffect(() => {
    return () => {
      setValues(defaultCampaignData);
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
          <Button size="small" variant="outlined" color="primary" onClick={onClose}>
            Close
          </Button>

          {isLogin && (
            <>
              <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
                Save
              </Button>
              <IconButton onClick={() => router.push(paths.public.campaign + '/bogomore')} title="Quick View">
                <Iconify icon="lets-icons:view-light" />
              </IconButton>
              <DeleteConfirmationPopover
                title={`Want to delete ${data?.project_title}?`}
                onDelete={() => handleDelete()}
              />
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
            </>
          )}
        </Stack>
      )}
    >
      {sidebarView === 'QUICK' ? <CampaignQuickView data={data} /> : <Box>admin view</Box>}
    </RightPanel>
  );
};
