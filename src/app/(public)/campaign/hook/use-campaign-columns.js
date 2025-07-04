
import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import AttachFile from "@mui/icons-material/AttachFile";
import { dateFormatter } from '/src/utils/date-formatter';
import { formatCompactNumber } from '/src/utils/helper';
import Link from 'next/link';
import DateEditCell from '/src/components/data-table/date-edit-cell';
import SelectEditCell from '/src/components/data-table/select-edit-cell';
import { renderAutoCompleteEditCell, renderAutoCompleteCell } from '/src/components/data-table/render-auto-complete-edit-cell';
import { campaignProgressStatus } from '/src/app/(public)/campaign/_lib/campaign.constants';
import { useMemo } from 'react';
import { getContentList } from '../../../(private)/all-content/_lib/all-content.actions';
import { getProductListAsync, getRetailPartnerListAsync, getStakeHolderListAsync } from '../../../../lib/common.actions';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';
import { getSpaceListAsync } from '../../spaces/_lib/space.actions';
import { getProductionListAsync } from '../../production/_lib/production.action';

export const useCampaignColumns = (
    anchorEl,
    setImageToShow,
    handleUploadModalOpen,
    visibleColumns
) => {
    const [contentOptions, setContentOptions] = React.useState([]);
    const [stakeholderOptions, setStakeholderOptions] = React.useState([]);
    const [retailPartnerOptions, setRetailPartnerOptions] = React.useState([]);
    const [partnerOptions, setPartnerOptions] = React.useState([]);
    const [spaceOptions, setSpaceOptions] = React.useState([]);
    const [productionHQOptions, setProductionHQOptions] = React.useState([]);
    const [productOptions, setProductOptions] = React.useState([]);

    // --------------- Fetch Prerequisites Data -------------------
    React.useEffect(() => {
        const fetchPrerequisitesData = async () => {
            try {
                const contentResponse = await getContentList({ page: 1, rowsPerPage: 20 });
                if (contentResponse?.success) {
                    const options = contentResponse.data.map((item) => ({ value: item.id, label: item.name }));
                    setContentOptions(options);
                }
                const stakeholderResponse = await getStakeHolderListAsync({ page: 1, rowsPerPage: 20 });
                if (stakeholderResponse?.success) {
                    const options = stakeholderResponse.data.map((item) => ({ value: item.id, label: item.name }));
                    setStakeholderOptions(options);
                }
                const retailPartnerResponse = await getRetailPartnerListAsync({ page: 1, rowsPerPage: 20 });
                if (retailPartnerResponse?.success) {
                    const options = retailPartnerResponse.data.map((item) => ({ value: item.id, label: item.name }));
                    setRetailPartnerOptions(options);
                }
                const partnerResponse = await getPartnerListAsync({ page: 1, rowsPerPage: 20 });
                if (partnerResponse?.success) {
                    const options = partnerResponse.data.map((item) => ({ value: item.id, label: item.name }));
                    setPartnerOptions(options);
                }
                const spaceResponse = await getSpaceListAsync({ page: 1, rowsPerPage: 20 });
                if (spaceResponse?.success) {
                    const options = spaceResponse.data.map((item) => ({ value: item.id, label: item.name }));
                    setSpaceOptions(options);
                }

                const productionHQResponse = await getProductionListAsync({ page: 1, rowsPerPage: 20 });
                if (productionHQResponse?.success) {
                    const options = productionHQResponse.data.map((item) => ({ value: item.id, label: item.name }));
                    setProductionHQOptions(options);
                }

                const productResponse = await getProductListAsync({ page: 1, rowsPerPage: 20 });
                if (productResponse?.success) {
                    const options = productResponse.data.map((item) => ({ value: item.id, label: item.name }));
                    setProductOptions(options);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchPrerequisitesData();
    }, []);


    const columns = useMemo(() => [
        { field: 'name', headerName: 'Name', width: 280, editable: true },
        {
            field: 'campaignStatus',
            headerName: 'Campaign Status',
            width: 150,
            editable: true,
            renderEditCell: (params) => <SelectEditCell
                {...params}
                options={campaignProgressStatus}
            />
        },
        {
            field: "notes",
            headerName: "Notes",
            width: 200,
            editable: true,
        },
        {
            field: "campaignDescription",
            headerName: "Description",
            width: 200,
            editable: true,
        },
        {
            field: 'client',
            headerName: 'Client',
            width: 150,
            editable: true
        },
        {
            field: 'guidelines',
            headerName: 'Guidelines',
            width: 200,
            editable: true
        },
        {
            field: "campaignImage",
            headerName: "Campaign Image",
            width: 150,
            renderCell: (params) => {
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            '&:hover .attach-icon': {
                                display: 'inline-block',
                            },
                        }}
                    >
                        {params.row.campaignImage.length > 0 &&
                            params.row.campaignImage.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image}
                                    alt="Campaign Image"
                                    width={22}
                                    height={22}
                                    style={{ objectFit: 'cover', borderRadius: '2px', cursor: 'pointer' }}
                                    onClick={(event) => {
                                        anchorEl.current = event.currentTarget;
                                        setImageToShow(image);
                                    }}
                                />
                            ))}

                        <AttachFile
                            className="attach-icon"
                            titleAccess="Attach"
                            onClick={() => handleUploadModalOpen(params.row, params.field)}
                            sx={{
                                fontSize: 18,
                                cursor: 'pointer',
                                display: 'none',
                            }}
                        />
                    </Box>
                );
            }
        },
        {
            field: 'imageInspirationGallery',
            headerName: 'Image Inspiration Gallery',
            width: 200,
            renderCell: (params) => {
                return (
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            gap: 0.5,
                            alignItems: 'center',
                            position: 'relative',
                            '&:hover .attach-icon': {
                                display: 'inline-block',
                            },
                        }}
                    >
                        {params.row.imageInspirationGallery.length > 0 && params.row.imageInspirationGallery.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt="Image Inspiration Gallery"
                                width={22}
                                height={22}
                                style={{ objectFit: 'cover', borderRadius: '2px', cursor: 'pointer' }}
                                onClick={(event) => {
                                    anchorEl.current = event.currentTarget;
                                    setImageToShow(image);
                                }}
                            />
                        ))}

                        <AttachFile
                            className="attach-icon"
                            titleAccess="Attach"
                            onClick={() => handleUploadModalOpen(params.row, params.field)}
                            sx={{
                                fontSize: 18,
                                cursor: 'pointer',
                                display: 'none',
                            }}
                        />
                    </Box>
                )
            }
        },
        {
            field: 'budget',
            headerName: 'Budget',
            width: 200, editable: true,
            valueFormatter: (value) => formatCompactNumber(value),
        },
        {
            field: 'productExpense',
            headerName: 'Product Expense',
            width: 150,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value),
        },
        {
            field: 'videoInspirationGallery',
            headerName: 'Video Inspiration Gallery',
            width: 200,
            editable: false,
            renderCell: (params) => <Box sx={{ width: '100%', height: '100%', display: 'flex', gap: 0.5, alignItems: 'center' }}>
                {params.row.videoInspirationGallery.length > 0 && params.row.videoInspirationGallery.map((video, index) => (
                    <Box key={index} as={Link} href={video} target="_blank" sx={{ cursor: 'pointer' }}>Link</Box>
                ))}
            </Box>
        },
        {
            field: 'campaignROI',
            headerName: 'Campaign ROI',
            width: 150,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value)
        },
        {
            field: 'totalExpense',
            headerName: 'Total Expense',
            width: 200,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value)
        },
        {
            field: 'totalContentEngagement',
            headerName: 'Total Content Engagement',
            width: 200,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value)
        },
        {
            field: 'campaignGoals',
            headerName: 'Goals',
            width: 200,
            editable: false,
        },
        // Content HQ
        {
            field: 'contentHQ',
            headerName: 'Content HQ',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getContentList(paging, filters, 'and');
                    return res?.data?.map((item) => ({
                        label: item.name,
                        value: item.id,
                    })) || [];
                },
                defaultOptions: contentOptions,
                multiple: true,
            })
        },
        // Stakeholders
        {
            field: 'stakeholders',
            headerName: 'Stakeholders',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const res = await getStakeHolderListAsync(paging, debounceValue);
                    return res?.data?.map((item) => ({
                        label: item.name,
                        value: item.id,
                    })) || [];
                },
                defaultOptions: stakeholderOptions,
                multiple: true,
            })
        },
        // Proposed Partners
        {
            field: 'proposedPartners',
            headerName: 'Proposed Partners',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getPartnerListAsync(paging, filters, 'and');
                    return res?.data?.map((item) => ({
                        label: item.name,
                        value: item.id,
                    })) || [];
                },
                defaultOptions: partnerOptions,
                multiple: true,
            })
        },
        // Retail Partners
        {
            field: 'retailPartners',
            headerName: 'Retail Partners',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getRetailPartnerListAsync(paging, filters, 'and');
                    return res?.data?.map((item) => ({
                        label: item.name,
                        value: item.id,
                    })) || [];
                },
                defaultOptions: retailPartnerOptions,
                multiple: true,
            })
        },
        // Reatail Partners 2
        {
            field: 'retailPartners2',
            headerName: 'Retail Partners 2',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getRetailPartnerListAsync(paging, filters, 'and');
                    return res?.data?.map((item) => ({
                        label: item.name,
                        value: item.id,
                    })) || [];
                },
                defaultOptions: retailPartnerOptions,
                multiple: true,
            })
        },
        // Reatail Partners 3
        {
            field: 'retailPartners3',
            headerName: 'Retail Partners 3',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getRetailPartnerListAsync(paging, filters, 'and');
                    return res?.data?.map((item) => ({
                        label: item.name,
                        value: item.id,
                    })) || [];
                },
                defaultOptions: retailPartnerOptions,
                multiple: true,
            })
        },
        // Contributed Partners
        {
            field: 'contributedPartners',
            headerName: 'Contributed Partners',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getPartnerListAsync(paging, filters, 'and');
                    return res?.data?.map((item) => ({
                        label: item.name,
                        value: item.id,
                    })) || [];
                },
                defaultOptions: productOptions,
                multiple: true,
            })
        },
        // Production HQ
        {
            field: 'productionHQ',
            headerName: 'Production HQ',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getProductionListAsync(paging, filters, 'and');
                    return res?.data?.map((item) => ({
                        label: item.name,
                        value: item.id,
                    })) || [];
                },
                defaultOptions: productionHQOptions,
                multiple: true,
            })
        },
        // Products
        {
            field: 'products',
            headerName: 'Product',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const res = await getProductListAsync(paging, debounceValue);
                    return res?.data?.map((item) => ({
                        label: item.name,
                        value: item.id,
                    })) || [];
                },
                defaultOptions: productOptions,
                multiple: true,
            })
        },
        // Spaces
        {
            field: 'spaces',
            headerName: 'Spaces',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getSpaceListAsync(paging, filters, 'and');
                    return res?.data?.map((item) => ({
                        label: item.name,
                        value: item.id,
                    })) || [];
                },
                defaultOptions: spaceOptions,
                multiple: true,
            })
        },
        {
            field: 'startDate',
            headerName: 'Start Date',
            width: 180,
            editable: true,
            valueGetter: (value, row) => dateFormatter(row.startDate, 'YYYY-MM-DD'),
            renderEditCell: (params) => <DateEditCell {...params} format="YYYY-MM-DD" />
        },
        {
            field: 'endDate',
            headerName: 'End Date',
            width: 180,
            editable: true,
            valueGetter: (value, row) => dateFormatter(row.endDate, 'YYYY-MM-DD'),
            renderEditCell: (params) => <DateEditCell {...params} format="YYYY-MM-DD" />
        },
    ], [anchorEl, setImageToShow, handleUploadModalOpen]);

    const visibleFields = useMemo(() =>
        columns.filter(col =>
            visibleColumns?.some(
                visibleCol =>
                    visibleCol.columnName.charAt(0).toLowerCase() + visibleCol.columnName.slice(1) === col.field
            )
        ), [columns, visibleColumns]
    );

    return visibleFields;
};