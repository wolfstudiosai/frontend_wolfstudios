'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';

import useAuth from '/src/hooks/useAuth';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { Iconify } from '/src/components/iconify/iconify';

import { CampaignQuickView } from '../_components/campaign-quick-view';
import {
    createCampaignAsync,
    deleteCampaignAsync,
    getCampaignAsync,
    updateCampaignAsync,
} from '../_lib/campaign.actions';
import { defaultCampaign } from '../_lib/campaign.types';
import { DrawerContainer } from '../../../../components/drawer/drawer'; ///components/drawer/drawer

import { CampaignForm } from './campaign-form';
import { formConstants } from '/src/app/constants/form-constants';
import { imageUploader } from '/src/utils/upload-file';
import Link from 'next/link';
import PageLoader from '/src/components/loaders/PageLoader';

export const CampaignRightPanel = ({ onClose, id }) => {
    const { isLogin } = useAuth();
    const [open, setOpen] = React.useState(true);
    const [view, setView] = React.useState('QUICK');
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const getSingleData = async () => {
            setLoading(true);
            try {
                const response = await getCampaignAsync(id);
                if (response.data) {
                    setData(response.data);
                }
            } catch (error) {
                console.error('Error fetching partner data:', error);
                return null;
            } finally {
                setLoading(false);
            }
        };
        getSingleData();
    }, [id]);

    // *****************Action Buttons*******************************
    const actionButtons = (
        <>
            <button>close</button>
        </>
    );

    return (
        <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons}>
            <PageLoader loading={loading}>
                {view === 'QUICK' ? <CampaignQuickView data={data} /> : <CampaignForm />}
            </PageLoader>
        </DrawerContainer>
    );
};
