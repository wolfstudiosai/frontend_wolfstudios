'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, FormControlLabel, IconButton, Switch } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '/src/hooks/useAuth';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '/src/components/drawer/drawer';
import { Iconify } from '/src/components/iconify/iconify';
import PageLoader from '/src/components/loaders/PageLoader';

import {
  createProductionAsync,
  deleteProductionAsync,
  getProductionAsync,
  updateProductionAsync,
} from '../_lib/production.action';
import { defaultProduction } from '../_lib/production.types';
import { ProductionForm } from './production-form';
import { ProductionQuickView } from './production-quickview';
import { formConstants } from '/src/app/constants/form-constants';

export const ProductionRightPanel = ({ open, onClose, fetchList, id, view = 'QUICK' }) => {
  const isUpdate = id ? true : false;
  const { isLogin } = useAuth();
  const router = useRouter();

  const [sidebarView, setSidebarView] = React.useState(view);
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);

  // ***************** Formik *******************************
  const { values, errors, handleChange, handleSubmit, setValues, setFieldValue, isValid, resetForm } = useFormik({
    initialValues: defaultProduction(),
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = formConstants.required;
      }

      return errors;
    },
    onSubmit: async (values) => {
      const fieldsToFormat = [
        'status',
        'cardsUsed',
        'equipmentRentals',
        'productionUsage',
        'spaces',
        'stakeholders',
        'contributingPartners',
        'campaigns',
        'products',
        'proposedSpaces',
        'proposedPartners',
      ];

      const formattedValues = {
        ...values,
        ...Object.fromEntries(
          fieldsToFormat.map((key) => [
            key,
            Array.isArray(values[key]) && values[key].length > 0 ? values[key].map((item) => item.value) : [],
          ])
        ),
      };

      console.log('Formatted values: ', formattedValues);

      //   setLoading(true);
      //   try {
      //     const res = isUpdate ? await updateProductionAsync(file, values) : await createProductionAsync(file, values);
      //     if (res.success) {
      //       onClose?.();
      //       fetchList?.();
      //       resetForm();
      //       router.refresh();
      //     } else {
      //       console.error('Operation failed:', res.message);
      //     }
      //   } catch (error) {
      //     console.error('Error:', error);
      //   } finally {
      //     setLoading(false);
      //   }
    },
  });

  const handleDelete = async (password) => {
    const response = await deleteProductionAsync([id]);
    if (response.success) {
      fetchList?.();
      onClose?.();
      router.refresh();
    }
  };

  const handleDeleteThumbnail = () => {
    setFieldValue('thumbnail', '');
    setFile(null);
  };

  const handleFeatured = async (featured) => {
    setFieldValue('featured', featured);
    await updateProductionAsync(file, { ...values, featured });
    fetchList?.();
  };

  // *****************Action Buttons*******************************
  //   const actionButtons = (
  //     <>
  //       {isLogin && (
  //         <>
  //           {sidebarView === 'QUICK' ? (
  //             <>
  //               <IconButton onClick={() => setSidebarView('EDIT')} title="Edit">
  //                 <Iconify icon="mynaui:edit-one" />
  //               </IconButton>
  //             </>
  //           ) : (
  //             data !== null && (
  //               <IconButton onClick={() => setSidebarView('QUICK')} title="Quick View">
  //                 <Iconify icon="lets-icons:view-light" />
  //               </IconButton>
  //             )
  //           )}

  //           <FormControlLabel
  //             control={
  //               <Switch
  //                 size="small"
  //                 checked={values?.featured}
  //                 onChange={() => handleFeatured(!values?.featured)}
  //                 color="primary"
  //               />
  //             }
  //             label="Featured"
  //           />

  //           <DeleteConfirmationPasswordPopover
  //             title={`Want to delete ${data?.project_title}?`}
  //             onDelete={(password) => handleDelete(password)}
  //             passwordInput
  //           />

  //           {sidebarView === 'EDIT' && (
  //             <Button size="small" variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
  //               Save
  //             </Button>
  //           )}
  //         </>
  //       )}
  //     </>
  //   );

  // *****************Use Effects*******************************

  React.useEffect(() => {
    const getSingleData = async () => {
      setLoading(true);
      try {
        console.log(id, 'id');
        const response = await getProductionAsync(id);
        console.log(response.data, 'response.data');
        if (response.data) {
          setData(response.data);
          setValues(defaultProduction(response.data));
        }
      } catch (error) {
        console.error('Error fetching production data:', error);
        return null;
      } finally {
        setLoading(false);
      }
    };
    if (id) getSingleData();
  }, [id]);

  return (
    <DrawerContainer open={open} handleDrawerClose={onClose}>
      {sidebarView === 'QUICK' ? (
        <PageLoader loading={loading}>
          <ProductionQuickView data={data} />
        </PageLoader>
      ) : (
        <ProductionForm
          values={values}
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
