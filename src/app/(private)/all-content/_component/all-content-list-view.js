'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import moment from 'moment';
import * as React from 'react';

import { CardTitle } from '@/components/cardTitle/CardTitle';
import { PageContainer } from '@/components/container/PageContainer';
import { RefreshPlugin } from '@/components/core/plugins/RefreshPlugin';
import { EditableDataTable } from '@/components/data-table/editable-data-table';
import { DeleteConfirmationPopover } from '@/components/dialog/delete-confirmation-popover';

import { createContentAsync, deleteContentAsync, updateContentAsync } from '../_lib/all-content.actions';
import { defaultContent } from '../_lib/all-content.types';

// table columns
const columns = [
    { field: 'title', headerName: 'Title', width: 280, editable: true },
    { field: 'campaign', headerName: 'Campaign', width: 150, editable: true },
    { field: 'product', headerName: 'Product', width: 150, editable: true },
    { field: 'stakeholder', headerName: 'Stakeholder', width: 150, editable: true },
    { field: 'posting_quality', headerName: 'Posting Quality', width: 150, editable: true },
    { field: 'google_drive_files', headerName: 'Google Drive Files', width: 200, editable: true },
    { field: 'playbook_link', headerName: 'Playbook Link', width: 200, editable: true },
    { field: 'uppromote_conversion', headerName: 'Uppromote Conversion', type: 'number', width: 150, editable: true },
    { field: 'asset_status', headerName: 'Asset Status', width: 120, editable: true },
    { field: 'month_uploaded', headerName: 'Month Uploaded', width: 150, editable: true },

    // Pinterest
    { field: 'REVO_pinterest', headerName: 'Pinterest Status', width: 150, editable: true },
    { field: 'PIN_accounts_used', headerName: 'Pinterest Accounts Used', width: 200, editable: true },
    { field: 'pinterest_PIN_click', headerName: 'Pinterest Pin Clicks', type: 'number', width: 150, editable: true },
    { field: 'pinterest_view', headerName: 'Pinterest Views', type: 'number', width: 150, editable: true },

    // Instagram
    { field: 'REVO_instagram', headerName: 'Instagram Status', width: 150, editable: true },
    { field: 'IG_like', headerName: 'Instagram Likes', type: 'number', width: 150, editable: true },
    { field: 'IG_comment', headerName: 'Instagram Comments', type: 'number', width: 150, editable: true },
    { field: 'IG_share', headerName: 'Instagram Shares', type: 'number', width: 150, editable: true },
    { field: 'IG_view', headerName: 'Instagram Views', type: 'number', width: 150, editable: true },
    { field: 'IG_social_sets_used', headerName: 'Instagram Social Sets Used', width: 200, editable: true },
    { field: 'partner_IG_link', headerName: 'Partner Instagram Link', width: 200, editable: true },

    // Twitter
    { field: 'REVO_twitter', headerName: 'Twitter Status', width: 150, editable: true },

    // TikTok
    { field: 'REVO_tiktok', headerName: 'TikTok Status', width: 150, editable: true },
    { field: 'REVO_TT_view', headerName: 'TikTok REVO Views', type: 'number', width: 150, editable: true },
    { field: 'tiktok_accounts_used', headerName: 'TikTok Accounts Used', width: 200, editable: true },
    { field: 'partner_tiktok_link', headerName: 'Partner TikTok Link', width: 200, editable: true },
    { field: 'partner_TT_like', headerName: 'Partner TikTok Likes', type: 'number', width: 150, editable: true },
    { field: 'partner_TT_comment', headerName: 'Partner TikTok Comments', type: 'number', width: 150, editable: true },
    { field: 'partner_TT_share', headerName: 'Partner TikTok Shares', type: 'number', width: 150, editable: true },
    { field: 'partner_TT_view', headerName: 'Partner TikTok Views', type: 'number', width: 150, editable: true },
    { field: 'partner_TT_save', headerName: 'Partner TikTok Saves', type: 'number', width: 150, editable: true },
    { field: 'TT_dummy_account_used', headerName: 'TikTok Dummy Account Used', width: 200, editable: true },

    // YouTube
    { field: 'YT_account_used', headerName: 'YouTube Account Used', width: 200, editable: true },
    { field: 'partner_YT_link', headerName: 'Partner YouTube Link', width: 200, editable: true },
    { field: 'partner_YT_like', headerName: 'Partner YouTube Likes', type: 'number', width: 150, editable: true },
    { field: 'partner_YT_comment', headerName: 'Partner YouTube Comments', type: 'number', width: 150, editable: true },
    { field: 'partner_YT_view', headerName: 'Partner YouTube Views', type: 'number', width: 150, editable: true },
    { field: 'partner_YT_save', headerName: 'Partner YouTube Saves', type: 'number', width: 150, editable: true },
    { field: 'REVO_clubrevo_youtube', headerName: 'Club REVO YouTube Status', width: 200, editable: true },
    { field: 'REVO_youtube', headerName: 'YouTube REVO Status', width: 200, editable: true },
    { field: 'YT_clubrevo_like', headerName: 'YouTube Club REVO Likes', type: 'number', width: 150, editable: true },
    { field: 'YT_clubrevo_view', headerName: 'YouTube Club REVO Views', type: 'number', width: 150, editable: true },
    { field: 'YT_REVOMADIC_like', headerName: 'YouTube REVOMADIC Likes', type: 'number', width: 150, editable: true },
    {
        field: 'YT_REVOMADIC_comment',
        headerName: 'YouTube REVOMADIC Comments',
        type: 'number',
        width: 150,
        editable: true,
    },
    { field: 'YT_REVOMADIC_share', headerName: 'YouTube REVOMADIC Shares', type: 'number', width: 150, editable: true },
    { field: 'YT_REVOMADIC_view', headerName: 'YouTube REVOMADIC Views', type: 'number', width: 150, editable: true },

    // Other Fields
    { field: 'creator_status', headerName: 'Creator Status', width: 150, editable: true },
    { field: 'profile', headerName: 'Profile', width: 150, editable: true },
    { field: 'posting_status', headerName: 'Posting Status', width: 150, editable: true },
    { field: 'partner_HQ', headerName: 'Partner HQ', width: 150, editable: true },
    { field: 'portfolio', headerName: 'Portfolio', width: 150, editable: true },
    { field: 'contributed_engagement', headerName: 'Contributed Engagement', type: 'number', width: 150, editable: true },
    { field: 'by_tags', headerName: 'Tags', width: 200, editable: true },
    { field: 'by_city', headerName: 'City', width: 150, editable: true },
    { field: 'all_internet_search', headerName: 'Internet Search', width: 200, editable: true },
    {
        field: 'created_at',
        headerName: 'Created At',
        width: 180,
        editable: true,
        valueGetter: (value, row) => moment(value).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
        field: 'updated_at',
        headerName: 'Updated At',
        width: 180,
        editable: true,
        valueGetter: (value, row) => moment(value).format('DD-MM-YYYY HH:mm:ss'),
    },
];

export default function AllContentListView({ setPagination, totalRecords, data, setData, loading, fetchList }) {
    const [filteredValue, setFilteredValue] = React.useState(columns.map((col) => col.field));
    const [selectedRows, setSelectedRows] = React.useState([]);

    // ******************************data grid handler starts*********************

    const handlePaginationModelChange = (newPaginationModel) => {
        const { page, pageSize } = newPaginationModel;
        setPagination({ pageNo: page + 1, limit: pageSize });
    };

    const processRowUpdate = React.useCallback(async (newRow, oldRow) => {
        if (JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow;
        if (newRow.id) {
            await updateContentAsync(newRow);
        } else {
            const { id, ...rest } = newRow;
            await createContentAsync(rest);
            fetchList();
        }
        return newRow;
    }, []);

    const handleRowSelection = (newRowSelectionModel) => {
        const selectedData = newRowSelectionModel.map((id) => data.find((row) => row.id === id));
        setSelectedRows(selectedData);
    };

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log({ children: error.message, severity: 'error' });
    }, []);

    // ******************************data grid handler ends*********************

    const visibleColumns = columns.filter((col) => filteredValue.includes(col.field));

    const handleAddNewItem = () => {
        setData([defaultContent, ...data]);
    };

    const handleDelete = async () => {
        const idsToDelete = [];
        selectedRows.forEach((row) => {
            idsToDelete.push(row.id);
        });
        const response = await deleteContentAsync(idsToDelete);
        if (response.success) {
            fetchList();
        }
    };

    React.useEffect(() => {
        const storedHiddenColumns = localStorage.getItem('hiddenColumns');
        if (storedHiddenColumns) {
            setFilteredValue(JSON.parse(storedHiddenColumns));
        }
    }, []);

    return (
        <PageContainer>
            <CardTitle
                title={''}
                rightItem={
                    <>
                        <Button startIcon={<PlusIcon />} variant="contained" onClick={handleAddNewItem}>
                            Add
                        </Button>
                    </>
                }
            />
            {/* <PageLoader loading={loading} error={null}> */}
            <Card>
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                    <Box>
                        {/* <FilterButton
              label="Columns"
              onFilterApply={(value) => {
                setFilteredValue(value);
              }}
              onFilterDelete={() => {
                // handlePhoneChange();
              }}
              popover={<HideColumsPopover />}
              value={columns}
            /> */}
                        <RefreshPlugin onClick={fetchList} />
                    </Box>
                    <DeleteConfirmationPopover
                        disabled={selectedRows.length === 0}
                        onDelete={handleDelete}
                        title={`Are you sure you want to delete ${selectedRows.length} record(s)?`}
                    />
                </Box>

                <Box sx={{ overflowX: 'auto', height: '100%', width: '100%' }}>
                    <EditableDataTable
                        columns={visibleColumns}
                        rows={data}
                        processRowUpdate={processRowUpdate}
                        onProcessRowUpdateError={handleProcessRowUpdateError}
                        loading={loading}
                        rowCount={totalRecords}
                        pageSizeOptions={[10, 25, 50, 100]}
                        onPageChange={handlePaginationModelChange}
                        checkboxSelection={true}
                        onRowSelectionModelChange={handleRowSelection}
                    />
                </Box>

            </Card>
            {/* </PageLoader> */}
        </PageContainer>
    );
}
