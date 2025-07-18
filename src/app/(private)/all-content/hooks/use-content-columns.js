import React from 'react';
import { Box } from '@mui/material';
import DateEditCell from '/src/components/data-table/date-edit-cell';
import { dateFormatter } from '/src/utils/date-formatter';
import AttachFile from '@mui/icons-material/AttachFile';
import Image from 'next/image';
import { MultipleTextInputEditCell } from '/src/components/data-table/multiple-text-input-edit';
import { MultiSelectEditCell } from '/src/components/data-table/multi-select-edit-cell';
import { formatCompactNumber } from '../../../../utils/helper';
import SelectEditCell from '/src/components/data-table/select-edit-cell';
import { getCampaignListAsync } from '../../../(public)/campaign/_lib/campaign.actions';
import { getCityListAsync, getProductListAsync, getRetailPartnerListAsync, getStakeHolderListAsync, getTagListAsync } from '../../../../lib/common.actions';
import { getPartnerListAsync } from '../../../(public)/partner/_lib/partner.actions';
import { renderAutoCompleteCell, renderAutoCompleteEditCell } from '../../../../components/data-table/render-auto-complete-edit-cell';

export const useContentColumns = (anchorEl, visibleColumns, setMediaToShow, handleUploadModalOpen) => {
    const [autocompleteFocus, setAutocompleteFocus] = React.useState({
        currentItem: '',
        prevItems: [],
    });

    const [autoCompleteOptions, setAutoCompleteOptions] = React.useState({
        campaigns: [],
        cities: [],
        products: [],
        tags: [],
        stakeholders: [],
        partners: [],
        retailPartners: [],
    });

    // --------------- Fetch Prerequisites Data -------------------
    const fetchFunctionsMap = {
        campaigns: getCampaignListAsync,
        cities: getCityListAsync,
        products: getProductListAsync,
        tags: getTagListAsync,
        stakeholders: getStakeHolderListAsync,
        partners: getPartnerListAsync,
        retailPartners: getRetailPartnerListAsync,
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
        {
            field: 'thumbnailImage',
            headerName: 'Thumbnail Image',
            width: 250,
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
                        {params.row?.thumbnailImage?.length > 0 && params?.row?.thumbnailImage?.[0] && (
                            <Image
                                src={params?.row?.thumbnailImage?.[0]}
                                alt="Campaign Image"
                                width={22}
                                height={22}
                                style={{ objectFit: 'cover', borderRadius: '2px', cursor: 'pointer' }}
                                onClick={(event) => {
                                    anchorEl.current = event.currentTarget;
                                    setMediaToShow({
                                        type: 'image',
                                        url: params?.row?.thumbnailImage?.[0],
                                    });
                                }}
                            />
                        )}

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
        {
            field: 'images',
            headerName: 'Images',
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
                        {params?.row?.images?.length > 0 &&
                            params?.row?.images?.map((image, index) => (
                                <Image
                                    key={index + image}
                                    src={image}
                                    alt="image"
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
        {
            field: 'video',
            headerName: 'Video',
            width: 200,
            editable: true,
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
                    {params?.row?.video?.length > 0 &&
                        params?.row?.video?.map((video, index) => (
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
        {
            field: 'postingQuality',
            headerName: 'Posting Quality',
            width: 300,
            editable: true,
            renderCell: (params) => params.value.join(', '),
            renderEditCell: (params) => <MultipleTextInputEditCell {...params} />
        },
        { field: 'googleDriveFiles', headerName: 'Google Drive Files', width: 200, editable: true },
        { field: 'playbookLink', headerName: 'Playbook Link', width: 200, editable: true },
        {
            field: 'assetStatus',
            headerName: 'Asset Status',
            width: 200,
            editable: true,
            renderCell: (params) => params.row.assetStatus,
            renderEditCell: (params) => <SelectEditCell {...params} options={[{ value: 'Approved', label: 'Approved' }, { value: 'Rejected', label: 'Rejected' }]} />,
        },
        {
            field: 'monthUploaded',
            headerName: 'Month Uploaded',
            width: 180,
            editable: true,
            valueGetter: (value, row) => dateFormatter(row.monthUploaded, 'MMMM YYYY'),
            renderEditCell: (params) => <DateEditCell {...params} format="MMMM YYYY" />,
        },

        // Pinterest
        { field: 'revoPinterest', headerName: 'Pinterest Status', width: 150, editable: true },
        { field: 'pinAccountsUsed', headerName: 'Pinterest Accounts Used', width: 200, editable: true },
        {
            field: 'creatorStatus',
            headerName: 'Creator Status',
            width: 300,
            editable: true,
            renderCell: (params) => params.row.creatorStatus.join(', '),
            renderEditCell: (params) => <MultiSelectEditCell {...params} options={[
                { value: 'Approved', label: 'Approved' },
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
            ]} />
        },
        { field: 'revoInstagram', headerName: 'Instagram Status', width: 150, editable: true },
        { field: 'pinterest_TotalPinClicks', headerName: 'Pinterest Pin Clicks', type: 'number', width: 150, editable: true },
        { field: 'pinterest_TotalViews', headerName: 'Pinterest Views', type: 'number', width: 150, editable: true },

        // Instagram
        { field: 'igTotalLikes', headerName: 'Instagram Likes', type: 'number', width: 150, editable: true },
        { field: 'igTotalComments', headerName: 'Instagram Comments', type: 'number', width: 150, editable: true },
        { field: 'igTotalShares', headerName: 'Instagram Shares', type: 'number', width: 150, editable: true },
        { field: 'igTotalViews', headerName: 'Instagram Views', type: 'number', width: 150, editable: true },
        { field: 'igSocialSetsUsed', headerName: 'Instagram Social Sets Used', width: 200, editable: true },
        { field: 'partnerIGLink', headerName: 'Partner Instagram Link', width: 200, editable: true },
        { field: 'igPost4', headerName: 'Instagram Post 4', width: 200, editable: true },
        { field: 'igPost2', headerName: 'Instagram Post 2', width: 200, editable: true },
        { field: 'igPost3', headerName: 'Instagram Post 3', width: 200, editable: true },
        {
            field: 'platform',
            headerName: 'Platform',
            width: 300,
            editable: true,
            renderCell: (params) => params.value.join(', '),
            renderEditCell: (params) => <MultipleTextInputEditCell {...params} />
        },

        // TikTok
        { field: 'revoTikTok', headerName: 'TikTok Status', width: 150, editable: true },
        { field: 'revoTTViews', headerName: 'TikTok REVO Views', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'revoTTLikes', headerName: 'TikTok REVO Likes', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'revoTTComments', headerName: 'TikTok REVO Comments', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'revoTTShares', headerName: 'TikTok REVO Shares', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'revoTTSaves', headerName: 'TikTok REVO Saves', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'revoIGTotalViews', headerName: 'Instagram REVO Total Views', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'revoIGTotalShares', headerName: 'Instagram REVO Total Shares', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'revoIGTotalComments', headerName: 'Instagram REVO Total Comments', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'revoIGTotalLikes', headerName: 'Instagram REVO Total Likes', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },

        {
            field: 'audited',
            headerName: 'Audited',
            width: 200,
            editable: true,
            renderCell: (params) => params.row.audited,
            renderEditCell: (params) => <SelectEditCell {...params} options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]} />,
        },

        { field: 'clubREVOIGHandle', headerName: 'Club REVO IG Handle', width: 200, editable: true },

        { field: 'tikTokAccountsused', headerName: 'TikTok Accounts Used', width: 200, editable: true },

        // instagram
        { field: 'partnerIGTotalComments', headerName: 'Partner Instagram Comments', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'partnerIGTotalLikes', headerName: 'Partner Instagram Likes', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'partnerIGTotalShares', headerName: 'Partner Instagram Shares', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'partnerIGTotalViews', headerName: 'Partner Instagram Views', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },

        { field: "pinterestTotalPinClicks", headerName: "Pinterest Pin Clicks", width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: "pinterestTotalViews", headerName: "Pinterest Views", width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'revoTwitter', headerName: 'Twitter Status', width: 150, editable: true },

        { field: 'partnerTikTokLink', headerName: 'Partner TikTok Link', width: 200, editable: true },
        { field: 'partnerTTLikes', headerName: 'Partner TikTok Likes', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'partnerTTComments', headerName: 'Partner TikTok Comments', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'partnerTTShares', headerName: 'Partner TikTok Shares', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'partnerTTViews', headerName: 'Partner TikTok Views', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'partnerTTSaves', headerName: 'Partner TikTok Saves', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        {
            field: 'ttDummyAccountsUsed',
            headerName: 'TikTok Dummy Account Used',
            width: 300,
            editable: true,
            renderCell: (params) => params.value.join(', '),
            renderEditCell: (params) => <MultipleTextInputEditCell {...params} />
        },

        // YouTube
        { field: 'ytAccountsUsed', headerName: 'YouTube Account Used', width: 200, editable: true },
        { field: 'partnerYTLink', headerName: 'Partner YouTube Link', width: 200, editable: true },
        { field: 'ytPartnerTotalLikes', headerName: 'Partner YouTube Likes', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        {
            field: 'ytPartnerTotalComments',
            headerName: 'Partner YouTube Comments',
            width: 150,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value)
        },
        { field: 'ytPartnerTotalViews', headerName: 'Partner YouTube Views', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'ytPartnerTotalSaves', headerName: 'Partner YouTube Saves', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        { field: 'revoClubRevoYoutube', headerName: 'Club REVO YouTube Status', width: 200, editable: true },
        { field: 'revoYoutube', headerName: 'YouTube REVO Status', width: 200, editable: true },
        { field: 'ytClubREVOTotalLikes', headerName: 'YouTube Club REVO Likes', width: 150, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        {
            field: 'ytClubREVOTotalViews',
            headerName: 'YouTube Club REVO Views',
            width: 150,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value)
        },
        {
            field: 'ytREVOMADICTotalLikes',
            headerName: 'YouTube REVOMADIC Likes',
            width: 150,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value)
        },
        {
            field: 'ytREVOMADICTotalComments',
            headerName: 'YouTube REVOMADIC Comments',
            width: 150,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value)
        },
        {
            field: 'ytREVOMADICTotalShares',
            headerName: 'YouTube REVOMADIC Shares',
            width: 150,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value)
        },
        {
            field: 'ytREVOMADICTotalViews',
            headerName: 'YouTube REVOMADIC Views',
            width: 150,
            editable: true,
            valueFormatter: (value) => formatCompactNumber(value)
        },

        // Other Fields
        { field: 'upPromoteConversion', headerName: 'Uppromote Conversion', width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        {
            field: 'postingStatus', headerName: 'Posting Status', width: 200,
            editable: true,
            renderCell: (params) => params.row.assetStatus,
            renderEditCell: (params) => <SelectEditCell {...params} options={[{ value: 'Active', label: 'Active' }, { value: 'Rejected', label: 'Rejected' }, { value: 'Pending', label: 'Pending' }, { value: 'Approved', label: 'Approved' }]} />,
        },
        { field: "totalContributedEngagement", headerName: "Total Contributed Engagement", width: 200, editable: true, valueFormatter: (value) => formatCompactNumber(value) },
        // campaign
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
        // cities
        {
            field: 'cities',
            headerName: 'Cities',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getCityListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'cities',
                defaultOptions: autoCompleteOptions.cities,
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
        // tags
        {
            field: 'tags',
            headerName: 'Tags',
            width: 300,
            editable: true,
            renderCell: (params) => renderAutoCompleteCell(params.value),
            renderEditCell: renderAutoCompleteEditCell({
                fetchOptions: async (debounceValue) => {
                    const paging = { page: 1, rowsPerPage: 20 };
                    const filters = [{ key: 'name', type: 'string', operator: 'contains', value: debounceValue }];
                    const res = await getTagListAsync(paging, filters, 'and');
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'tags',
                defaultOptions: autoCompleteOptions.tags,
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
        // partners
        {
            field: 'partners',
            headerName: 'Partners',
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
                name: 'partners',
                defaultOptions: autoCompleteOptions.partners,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
        // retail partners
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
                    return (
                        res?.data?.map((item) => ({
                            label: item.name,
                            value: item.id,
                        })) || []
                    );
                },
                name: 'retailPartners',
                defaultOptions: autoCompleteOptions.retailPartners,
                onFocus: (name) => setAutocompleteFocus({ currentItem: name, prevItems: [] }),
                multiple: true,
            }),
        },
    ];

    const visibleFields = columns.filter(col => visibleColumns.some(visibleCol => visibleCol.columnName.charAt(0).toLowerCase() + visibleCol.columnName.slice(1) === col.field));

    return visibleFields;
}