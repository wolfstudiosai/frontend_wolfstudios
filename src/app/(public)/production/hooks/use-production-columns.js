'use client';

import React from 'react';
import { formatCompactNumber } from '/src/utils/helper';
import { dateFormatter } from '/src/utils/date-formatter';
import DateEditCell from '/src/components/data-table/date-edit-cell';
import Image from 'next/image';
import AttachFile from '@mui/icons-material/AttachFile';
import { Box } from '@mui/material';
import { MultipleTextInputEditCell } from '/src/components/data-table/multiple-text-input-edit';
import { getSpaceListAsync } from '../../spaces/_lib/space.actions';
import { getProductListAsync, getStakeHolderListAsync } from '../../../../lib/common.actions';
import { getPartnerListAsync } from '../../partner/_lib/partner.actions';
import { getCampaignListAsync } from '../../campaign/_lib/campaign.actions';
import { renderAutoCompleteCell, renderAutoCompleteEditCell } from '../../../../components/data-table/render-auto-complete-edit-cell';
import { MultiSelectEditCell } from '/src/components/data-table/multi-select-edit-cell';
import { productionStatus } from '../../production/_lib/constant';

export const useProductionColumns = (anchorEl, visibleColumns, setMediaToShow, handleUploadModalOpen) => {
    const [autocompleteFocus, setAutocompleteFocus] = React.useState({
        currentItem: '',
        prevItems: [],
    });

    const [autoCompleteOptions, setAutoCompleteOptions] = React.useState({
        spaces: [],
        stakeholders: [],
        contributingPartners: [],
        campaigns: [],
        products: [],
        proposedSpaces: [],
        proposedPartners: [],
    });

    // --------------- Fetch Prerequisites Data -------------------
    const fetchFunctionsMap = {
        spaces: getSpaceListAsync,
        stakeholders: getStakeHolderListAsync,
        contributingPartners: getPartnerListAsync,
        campaigns: getCampaignListAsync,
        products: getProductListAsync,
        proposedSpaces: getSpaceListAsync,
        proposedPartners: getPartnerListAsync,
    };

    React.useEffect(() => {
        const fetchData = async () => {
            if (!autocompleteFocus?.currentItem) return;
            const { currentItem, prevItems } = autocompleteFocus;

            if (prevItems.includes(currentItem)) return;
            const fetchFunction = fetchFunctionsMap[currentItem];
            if (!fetchFunction) return;

            try {
                const response = await fetchFunction({ page: 1, rowsPerPage: 100 });
                if (response?.success) {
                    const options = response.data.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }));

                    setAutoCompleteOptions((prevState) => ({
                        ...prevState,
                        [currentItem]: options,
                    }));

                    setAutocompleteFocus((prevState) => ({
                        currentItem: '',
                        prevItems: [...prevState.prevItems, currentItem],
                    }));
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [autocompleteFocus]);


    const columns = [
        { field: 'name', headerName: 'Name', width: 280, editable: true },
        // Status
        {
            field: 'status',
            headerName: 'Status',
            width: 300,
            editable: true,
            renderCell: (params) => params.row.status.join(', '),
            renderEditCell: (params) => <MultiSelectEditCell {...params} options={productionStatus} />,
        },
        // Thumbnail image
        {
            field: 'thumbnailImage', headerName: 'Thumbnail Image', width: 150, renderCell: (params) => {
                return <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    '&:hover .attach-icon': {
                        display: 'inline-block',
                    },
                }}>
                    {Array.isArray(params.row.thumbnailImage) && params.row.thumbnailImage.length > 0 && params.row.thumbnailImage[0] && <Image
                        src={params.row.thumbnailImage[0]}
                        alt="Image"
                        width={22}
                        height={22}
                        style={{ objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={(event) => {
                            anchorEl.current = event.currentTarget;
                            setMediaToShow({
                                type: 'image',
                                url: params.row.thumbnailImage[0],
                            });
                        }}
                    />}

                    <AttachFile
                        className="attach-icon"
                        titleAccess="Attach"
                        onClick={() => handleUploadModalOpen(params.row, params.field, true)}
                        sx={{
                            fontSize: 18,
                            cursor: 'pointer',
                            display: 'none',
                        }}
                    />
                </Box>
            }
        },
        // Contracts
        {
            field: 'contracts',
            headerName: 'Contracts',
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
                        {params?.row?.contracts?.length > 0 &&
                            params?.row?.contracts?.map((image, index) => (
                                <Image
                                    key={index + image}
                                    src={image}
                                    alt="contracts image"
                                    width={22}
                                    height={22}
                                    style={{ objectFit: 'cover', borderRadius: '2px', cursor: 'pointer' }}
                                    onClick={(event) => {
                                        anchorEl.current = event.currentTarget;
                                        setMediaToShow({
                                            type: 'image',
                                            url: image,
                                        });
                                    }}
                                />
                            ))}

                        <AttachFile
                            className="attach-icon"
                            titleAccess="Attach"
                            onClick={() => handleUploadModalOpen(params.row, params.field, true)}
                            sx={{
                                fontSize: 18,
                                cursor: 'pointer',
                                display: 'none',
                            }}
                        />
                    </Box>
                );
            },
        },
        // receipts
        {
            field: 'receipts',
            headerName: 'Receipts',
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
                        {params?.row?.receipts?.length > 0 &&
                            params?.row?.receipts?.map((image, index) => (
                                <Image
                                    key={index + image}
                                    src={image}
                                    alt="Image Inspiration Gallery"
                                    width={22}
                                    height={22}
                                    style={{ objectFit: 'cover', borderRadius: '2px', cursor: 'pointer' }}
                                    onClick={(event) => {
                                        anchorEl.current = event.currentTarget;
                                        setMediaToShow({
                                            type: 'image',
                                            url: image,
                                        });
                                    }}
                                />
                            ))}

                        <AttachFile
                            className="attach-icon"
                            titleAccess="Attach"
                            onClick={() => handleUploadModalOpen(params.row, params.field, true)}
                            sx={{
                                fontSize: 18,
                                cursor: 'pointer',
                                display: 'none',
                            }}
                        />
                    </Box>
                );
            },
        },
        // shotlist
        {
            field: 'shotlist',
            headerName: 'Shotlist',
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
                        {params?.row?.shotlist?.length > 0 &&
                            params?.row?.shotlist?.map((image, index) => (
                                <Image
                                    key={index + image}
                                    src={image}
                                    alt="Shotlist"
                                    width={22}
                                    height={22}
                                    style={{ objectFit: 'cover', borderRadius: '2px', cursor: 'pointer' }}
                                    onClick={(event) => {
                                        anchorEl.current = event.currentTarget;
                                        setMediaToShow({
                                            type: 'image',
                                            url: image,
                                        });
                                    }}
                                />
                            ))}

                        <AttachFile
                            className="attach-icon"
                            titleAccess="Attach"
                            onClick={() => handleUploadModalOpen(params.row, params.field, true)}
                            sx={{
                                fontSize: 18,
                                cursor: 'pointer',
                                display: 'none',
                            }}
                        />
                    </Box>
                );
            },
        },
        // callSheet
        {
            field: 'callSheet',
            headerName: 'CallSheet',
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
                        {params?.row?.callSheet?.length > 0 &&
                            params?.row?.callSheet?.map((image, index) => (
                                <Image
                                    key={index + image}
                                    src={image}
                                    alt="callSheet"
                                    width={22}
                                    height={22}
                                    style={{ objectFit: 'cover', borderRadius: '2px', cursor: 'pointer' }}
                                    onClick={(event) => {
                                        anchorEl.current = event.currentTarget;
                                        setMediaToShow({
                                            type: 'image',
                                            url: image,
                                        });
                                    }}
                                />
                            ))}

                        <AttachFile
                            className="attach-icon"
                            titleAccess="Attach"
                            onClick={() => handleUploadModalOpen(params.row, params.field, true)}
                            sx={{
                                fontSize: 18,
                                cursor: 'pointer',
                                display: 'none',
                            }}
                        />
                    </Box>
                );
            },
        },
        // proofingLibrary
        {
            field: 'proofingLibrary',
            headerName: 'Proofing Library',
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
                        {params?.row?.proofingLibrary?.length > 0 &&
                            params?.row?.proofingLibrary?.map((image, index) => (
                                <Image
                                    key={index + image}
                                    src={image}
                                    alt="proofingLibrary"
                                    width={22}
                                    height={22}
                                    style={{ objectFit: 'cover', borderRadius: '2px', cursor: 'pointer' }}
                                    onClick={(event) => {
                                        anchorEl.current = event.currentTarget;
                                        setMediaToShow({
                                            type: 'image',
                                            url: image,
                                        });
                                    }}
                                />
                            ))}

                        <AttachFile
                            className="attach-icon"
                            titleAccess="Attach"
                            onClick={() => handleUploadModalOpen(params.row, params.field, true)}
                            sx={{
                                fontSize: 18,
                                cursor: 'pointer',
                                display: 'none',
                            }}
                        />
                    </Box>
                );
            },
        },
        // imageInspiration
        {
            field: 'imageInspiration',
            headerName: 'Image Inspiration',
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
                        {params?.row?.imageInspiration?.length > 0 &&
                            params?.row?.imageInspiration?.map((image, index) => (
                                <Image
                                    key={index + image}
                                    src={image}
                                    alt="imageInspiration"
                                    width={22}
                                    height={22}
                                    style={{ objectFit: 'cover', borderRadius: '2px', cursor: 'pointer' }}
                                    onClick={(event) => {
                                        anchorEl.current = event.currentTarget;
                                        setMediaToShow({
                                            type: 'image',
                                            url: image,
                                        });
                                    }}
                                />
                            ))}

                        <AttachFile
                            className="attach-icon"
                            titleAccess="Attach"
                            onClick={() => handleUploadModalOpen(params.row, params.field, true)}
                            sx={{
                                fontSize: 18,
                                cursor: 'pointer',
                                display: 'none',
                            }}
                        />
                    </Box>
                );
            },
        },
        // videoInspiration
        {
            field: 'videoInspiration',
            headerName: 'Video Inspiration',
            width: 200,
            editable: false,
            renderCell: (params) => (
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
                    {params?.row?.videoInspiration?.length > 0 &&
                        params?.row?.videoInspiration?.map((video, index) => (
                            <Box
                                key={index}
                                sx={{
                                    cursor: 'pointer',
                                    gap: 0.5,
                                    width: 22,
                                    height: 22,
                                }}
                                onClick={(event) => {
                                    anchorEl.current = event.currentTarget;
                                    setMediaToShow({
                                        type: 'video',
                                        url: video,
                                    });
                                }}
                            >
                                <video
                                    src={video}
                                    controls={false}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>
                        ))}

                    <AttachFile
                        className="attach-icon"
                        titleAccess="Attach"
                        onClick={() => handleUploadModalOpen(params.row, params.field, false)}
                        sx={{
                            fontSize: 18,
                            cursor: 'pointer',
                            display: 'none',
                        }}
                    />
                </Box>
            ),
        },
        // Proposed Date
        {
            field: 'proposedDate',
            headerName: 'Proposed Date',
            width: 200,
            editable: true,
            valueGetter: (value, row) => dateFormatter(row.proposedDate, 'YYYY-MM-DD'),
            renderEditCell: (params) => <DateEditCell {...params} format="YYYY-MM-DD" />
        },
        // record shoot date
        {
            field: 'recordShootDate',
            headerName: 'Record Shoot Date',
            width: 200,
            editable: true,
            valueGetter: (value, row) => dateFormatter(row.recordShootDate, 'YYYY-MM-DD'),
            renderEditCell: (params) => <DateEditCell {...params} format="YYYY-MM-DD" />
        },
        // internal notes
        {
            field: 'internalNotes',
            headerName: 'Internal Notes',
            width: 180,
            editable: true,
        },
        // total expense
        {
            field: 'totalExpense',
            headerName: 'Total Expense',
            width: 100,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value),
        },
        // spaceExpense
        {
            field: 'spaceExpense',
            headerName: 'Space Expense',
            width: 100,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value),
        },
        // talentExpense
        {
            field: 'talentExpense',
            headerName: 'Talent Expense',
            width: 100,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value),
        },
        // crewExpense
        {
            field: 'crewExpense',
            headerName: 'Crew Expense',
            width: 100,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value),
        },
        // foodExpense
        {
            field: 'foodExpense',
            headerName: 'Food Expense',
            width: 100,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value),
        },
        // equipmentExpense
        {
            field: 'equipmentExpense',
            headerName: 'Equipment Expense',
            width: 100,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value),
        },
        // reimbursments
        {
            field: 'reimbursments',
            headerName: 'Reimbursments',
            width: 100,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value),
        },
        // wardrobeExpense
        {
            field: 'wardrobeExpense',
            headerName: 'Wardrobe Expense',
            width: 100,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value),
        },
        // directorExpense
        {
            field: 'directorExpense',
            headerName: 'Director Expense',
            width: 100,
            editable: true,
            valueFormatter: (value, row) => formatCompactNumber(row.directorExpense)
        },
        // producerExpense
        {
            field: 'producerExpense',
            headerName: 'Producer Expense',
            width: 100,
            editable: true,
            valueFormatter: (value, row) => formatCompactNumber(row.producerExpense)
        },
        // equipmentRentals
        {
            field: 'equipmentRentals',
            headerName: 'Equipment Rentals',
            width: 300,
            editable: true,
            valueFormatter: (value) => value.join(', '),
            renderEditCell: (params) => <MultipleTextInputEditCell {...params} />,
        },
        // productionUsage
        {
            field: 'productionUsage',
            headerName: 'Production Usage',
            width: 300,
            editable: true,
            valueFormatter: (value) => value.join(', '),
            renderEditCell: (params) => <MultipleTextInputEditCell {...params} />,
        },
        // card used
        {
            field: 'cardsUsed',
            headerName: 'Cards Used', width: 300,
            editable: true,
            valueFormatter: (value) => value.join(', '),
            renderEditCell: (params) => <MultipleTextInputEditCell {...params} />,
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
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'spaces',
                defaultOptions: autoCompleteOptions.spaces,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // stakeholders
        {
            field: 'stakeholders',
            headerName: 'Stakeholders',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getStakeHolderListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'stakeholders',
                defaultOptions: autoCompleteOptions.stakeholders,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // contributingPartners
        {
            field: 'contributingPartners',
            headerName: 'Contributing Partners',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getPartnerListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'contributingPartners',
                defaultOptions: autoCompleteOptions.contributingPartners,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // campaigns
        {
            field: 'campaigns',
            headerName: 'Campaigns',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getCampaignListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'campaigns',
                defaultOptions: autoCompleteOptions.campaigns,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // products
        {
            field: 'products',
            headerName: 'Products',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getProductListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'products',
                defaultOptions: autoCompleteOptions.products,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // proposedSpaces
        {
            field: 'proposedSpaces',
            headerName: 'Proposed Spaces',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getSpaceListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'products',
                defaultOptions: autoCompleteOptions.proposedSpaces,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // proposedPartners
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
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'proposedPartners',
                defaultOptions: autoCompleteOptions.proposedPartners,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
    ];

    const visibleFields = React.useMemo(
        () =>
            columns.filter((col) =>
                visibleColumns?.some(
                    (visibleCol) => visibleCol.columnName.charAt(0).toLowerCase() + visibleCol.columnName.slice(1) === col.field
                )
            ),
        [columns, visibleColumns]
    );

    return visibleFields;
}
