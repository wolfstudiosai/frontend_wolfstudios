'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import moment from 'moment';

import { CardTitle } from '/src/components/cardTitle/CardTitle';
import { PageContainer } from '/src/components/container/PageContainer';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { EditableDataTable } from '/src/components/data-table/editable-data-table';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';

import { createContentAsync, deleteContentAsync, updateContentAsync } from '../_lib/all-content.actions';
import { defaultContent } from '../_lib/all-content.types';

// table columns
const columns = [
  { field: 'name', headerName: 'Name', width: 280, editable: true },
  {
    field: 'postQuality',
    headerName: 'Posting Quality',
    width: 150,
    editable: true,
    valueGetter: (value, row) => value,
  },
  { field: 'googleDriveFiles', headerName: 'Google Drive Files', width: 200, editable: true },
  { field: 'playbookLink', headerName: 'Playbook Link', width: 200, editable: true },
  { field: 'upPromoteConversion', headerName: 'Uppromote Conversion', type: 'number', width: 150, editable: true },
  { field: 'assetStatus', headerName: 'Asset Status', width: 120, editable: false },
  { field: 'monthUploaded', headerName: 'Month Uploaded', width: 150, editable: false },

  // Pinterest
  { field: 'revoPinterest', headerName: 'Pinterest Status', width: 150, editable: true },
  { field: 'pinAccountsUsed', headerName: 'Pinterest Accounts Used', width: 200, editable: true },
  { field: 'pinterest_TotalPinClicks', headerName: 'Pinterest Pin Clicks', type: 'number', width: 150, editable: true },
  { field: 'pinterest_TotalViews', headerName: 'Pinterest Views', type: 'number', width: 150, editable: true },

  // Instagram
  { field: 'revoInstagram', headerName: 'Instagram Status', width: 150, editable: false },
  { field: 'ig_TotalLikes', headerName: 'Instagram Likes', type: 'number', width: 150, editable: true },
  { field: 'ig_TotalComments', headerName: 'Instagram Comments', type: 'number', width: 150, editable: true },
  { field: 'ig_TotalShares', headerName: 'Instagram Shares', type: 'number', width: 150, editable: true },
  { field: 'ig_TotalViews', headerName: 'Instagram Views', type: 'number', width: 150, editable: true },
  { field: 'ig_SocialSetsUsed', headerName: 'Instagram Social Sets Used', width: 200, editable: true },
  { field: 'partner_IGLink', headerName: 'Partner Instagram Link', width: 200, editable: true },

  // TikTok
  { field: 'revo_TikTok', headerName: 'TikTok Status', width: 150, editable: false },
  { field: 'revo_TTViews', headerName: 'TikTok REVO Views', type: 'number', width: 150, editable: true },
  { field: 'tikTokAccountsused', headerName: 'TikTok Accounts Used', width: 200, editable: true },
  { field: 'partner_TikTokLink', headerName: 'Partner TikTok Link', width: 200, editable: true },
  { field: 'partner_TTLikes', headerName: 'Partner TikTok Likes', type: 'number', width: 150, editable: true },
  { field: 'partner_TTComments', headerName: 'Partner TikTok Comments', type: 'number', width: 150, editable: true },
  { field: 'partner_TTShares', headerName: 'Partner TikTok Shares', type: 'number', width: 150, editable: true },
  { field: 'partner_TTViews', headerName: 'Partner TikTok Views', type: 'number', width: 150, editable: true },
  { field: 'partner_TTSaves', headerName: 'Partner TikTok Saves', type: 'number', width: 150, editable: true },
  {
    field: 'ttDummyAccountsUsed',
    headerName: 'TikTok Dummy Account Used',
    width: 200,
    editable: true,
    valueGetter: (value, row) => row,
  },

  // YouTube
  { field: 'yt_AccountsUsed', headerName: 'YouTube Account Used', width: 200, editable: true },
  { field: 'partner_YTLink', headerName: 'Partner YouTube Link', width: 200, editable: true },
  { field: 'yt_PartnerTotalLikes', headerName: 'Partner YouTube Likes', type: 'number', width: 150, editable: true },
  {
    field: 'yt_PartnerTotalComments',
    headerName: 'Partner YouTube Comments',
    type: 'number',
    width: 150,
    editable: true,
  },
  { field: 'yt_PartnerTotalViews', headerName: 'Partner YouTube Views', type: 'number', width: 150, editable: true },
  { field: 'yt_PartnerTotalSaves', headerName: 'Partner YouTube Saves', type: 'number', width: 150, editable: true },
  { field: 'revo_ClubRevoYoutube', headerName: 'Club REVO YouTube Status', width: 200, editable: true },
  { field: 'revo_Youtube', headerName: 'YouTube REVO Status', width: 200, editable: true },
  { field: 'yt_ClubREVOTotalLikes', headerName: 'YouTube Club REVO Likes', type: 'number', width: 150, editable: true },
  {
    field: 'yt_ClubREVOTotalViews',
    headerName: 'YouTube Club REVO Views',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'yt_REVOMADICTotalLikes',
    headerName: 'YouTube REVOMADIC Likes',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'yt_REVOMADICTotalComments',
    headerName: 'YouTube REVOMADIC Comments',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'yt_REVOMADICTotalShares',
    headerName: 'YouTube REVOMADIC Shares',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'yt_REVOMADICTotalViews',
    headerName: 'YouTube REVOMADIC Views',
    type: 'number',
    width: 150,
    editable: true,
  },

  // Other Fields
  { field: 'creatorStatus', headerName: 'Creator Status', width: 150, editable: false },
  { field: 'postingStatus', headerName: 'Posting Status', width: 150, editable: false },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    editable: true,
    valueGetter: (value, row) => moment(value).format('DD-MM-YYYY'),
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    editable: true,
    valueGetter: (value, row) => moment(value).format('DD-MM-YYYY'),
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

  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log({ children: error.message, severity: 'error' });
  }, []);

  // ******************************data grid handler ends*********************

  const visibleColumns = columns.filter((col) => filteredValue.includes(col.field));

  const handleAddNewItem = () => {
    setData([defaultContent, ...data]);
  };

  const handleDelete = async (password) => {
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
      <Card>
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
          <Box>
            <RefreshPlugin onClick={fetchList} />
          </Box>
          <DeleteConfirmationPasswordPopover
            title={`Are you sure you want to delete ${selectedRows.length} record(s)?`}
            onDelete={(password) => handleDelete(password)}
            passwordInput
            disabled={selectedRows.length === 0}
          />
        </Box>

        <Box sx={{ overflowX: 'auto', height: '100%', width: '100%' }}>
          <EditableDataTable
            columns={visibleColumns}
            rows={data?.map((row) => defaultContent(row)) || []}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            loading={loading}
            rowCount={totalRecords}
            pageSizeOptions={[10, 25, 50, 100]}
            onPageChange={handlePaginationModelChange}
          />
        </Box>
      </Card>
      {/* </PageLoader> */}
    </PageContainer>
  );
}
