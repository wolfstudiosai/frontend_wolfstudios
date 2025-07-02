'use client';

import React from 'react';
import { FormControlLabel, IconButton, Switch } from '@mui/material';

import useAuth from '/src/hooks/useAuth';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { DrawerContainer } from '/src/components/drawer/drawer';
import { Iconify } from '/src/components/iconify/iconify';
import { Link } from 'next/link';
import { deletePortfolioAsync, getPortfolioAsync, updatePortfolioAsync } from '../_lib/portfolio.actions';
import { PortfolioForm } from './portfolio-form';
import { PortfolioQuickView } from './portfolio-quickview';
import PageLoader from '/src/components/loaders/PageLoader';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

export const PortfolioRightPanel = ({ fetchList, onClose, id, open, view = 'QUICK' }) => {
    const { isLogin } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [panelView, setPanelView] = React.useState(view);
    const [isFeatured, setIsFeatured] = React.useState(data?.isFeatured);

    // *********************States*********************************

    const getSingleData = async () => {
        setLoading(true);
        try {
            const response = await getPortfolioAsync(id);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching portfolio data:', error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        onClose?.();
        fetchList?.();
        router.refresh();
    };

    const handleFeatured = async (featured) => {
        try {
            setLoading(true);
            const finalData = {
                ...data,
            };

            const arrayFields = ['portfolioCategories', 'states', 'countries', 'partnerHQ'];
            for (const field of arrayFields) {
                const value = data[field];
                if (value.length > 0) {
                    const arrOfStr = value.map((item) => item.id);
                    finalData[field] = arrOfStr;
                }
            }

            if (finalData.videoLink.length === 0) {
                delete finalData.videoLink;
            }

            const isValidFormat = dayjs(data.date, 'MMMM YYYY', true).isValid();
            if (isValidFormat) {
                finalData.date = data.date;
            } else {
                finalData.date = dayjs().format('MMMM YYYY');
            }

            setIsFeatured(featured);
            await updatePortfolioAsync(id, { ...finalData, isFeatured: featured });
            fetchList();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (id) {
            getSingleData();
        }
    }, [id]);

    // *****************Action Buttons*******************************
    const actionButtons = (
        <>
            {isLogin && (
                <>
                    {panelView === 'EDIT' && id ? (
                        <IconButton onClick={() => setPanelView('QUICK')} title="Edit">
                            <Iconify icon="solar:eye-broken" />
                        </IconButton>
                    ) : (
                        id && (
                            <IconButton onClick={() => setPanelView('EDIT')} title="Quick">
                                <Iconify icon="mynaui:edit-one" />
                            </IconButton>
                        )
                    )}


                    {panelView === 'QUICK' && (
                        <>
                            <IconButton
                                as={Link}
                                href={`/portfolio/${data?.id}`}
                                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                title="Analytics"
                            >
                                <Iconify icon="mdi:analytics" />
                            </IconButton>
                            <DeleteConfirmationPasswordPopover
                                id={[data?.id]}
                                title="Are you sure you want to delete?"
                                deleteFn={deletePortfolioAsync}
                                passwordInput
                                onDelete={handleDelete}
                            />
                            <FormControlLabel
                                sx={{ ml: 2 }}
                                control={
                                    <Switch
                                        size="small"
                                        checked={isFeatured}
                                        onChange={(e) => handleFeatured(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Featured"
                            />
                        </>
                    )}
                </>
            )}
        </>
    );

    return (
        <DrawerContainer open={open} handleDrawerClose={onClose} actionButtons={actionButtons}>
            <PageLoader loading={loading}>
                {panelView === 'QUICK' ? (
                    <PortfolioQuickView data={data} />
                ) : (
                    <PortfolioForm id={data?.id} onClose={onClose} fetchList={fetchList} />
                )}
            </PageLoader>
        </DrawerContainer>
    );
};
