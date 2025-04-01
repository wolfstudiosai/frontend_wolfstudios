'use client';

import { Button, FormControlLabel, IconButton, Switch } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';

import {
  createProductionAsync,
  deleteProductionAsync,
  getProductionAsync,
  updateProductionAsync
} from '../_lib/production.action';
import { defaultProduction } from '../_lib/production.types';
import { ProductionForm } from './production-form';
import { ProductionQuickView } from './production-quickview';
import { formConstants } from '/src/app/constants/form-constants';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '/src/components/drawer/drawer';
import { Iconify } from '/src/components/iconify/iconify';
import useAuth from '/src/hooks/useAuth';

export const ManageProductionRightPanel = ({ open, onClose, fetchList, data, width, view }) => {
    return(
        <>
        </>
    );
}