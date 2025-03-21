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
  { field: 'Name', headerName: 'Name', width: 280, editable: true },
  {
    field: 'campaign',
    headerName: 'Campaign',
    width: 150,
    editable: true,
    valueGetter: (value, row) => row?.ByCampaignsContentHQ?.map((c) => c?.ByCampaigns?.Name).join(', '),
  },
  {
    field: 'product',
    headerName: 'Product',
    width: 150,
    editable: true,
    valueGetter: (value, row) => row?.ByProductContentHQ?.map((p) => p?.ByProduct?.Name).join(', '),
  },
  {
    field: 'stakeholder',
    headerName: 'Stakeholder',
    width: 150,
    editable: true,
    valueGetter: (value, row) => row?.ContentHQStakeholder?.map((s) => s?.Stakeholder?.Name).join(', '),
  },
  {
    field: 'posting_quality',
    headerName: 'Posting Quality',
    width: 150,
    editable: true,
    valueGetter: (value, row) => row?.PostingQuality?.map((p) => p).join(', '),
  },
  { field: 'GoogleDriveFiles', headerName: 'Google Drive Files', width: 200, editable: true },
  { field: 'PlaybookLink', headerName: 'Playbook Link', width: 200, editable: true },
  { field: 'UpPromoteConversion', headerName: 'Uppromote Conversion', type: 'number', width: 150, editable: true },
  { field: 'AssetStatus', headerName: 'Asset Status', width: 120, editable: true },
  { field: 'MonthUploaded', headerName: 'Month Uploaded', width: 150, editable: true },

  // Pinterest
  { field: 'REVOPinterest', headerName: 'Pinterest Status', width: 150, editable: true },
  { field: 'PINAccountsUsed', headerName: 'Pinterest Accounts Used', width: 200, editable: true },
  { field: 'PinterestTotalPinClicks', headerName: 'Pinterest Pin Clicks', type: 'number', width: 150, editable: true },
  { field: 'PinterestTotalViews', headerName: 'Pinterest Views', type: 'number', width: 150, editable: true },

  // Instagram
  { field: 'REVOInstagram', headerName: 'Instagram Status', width: 150, editable: true },
  { field: 'PartnerIGLink', headerName: 'Instagram Likes', type: 'number', width: 150, editable: true },
  { field: 'IGTotalComments', headerName: 'Instagram Comments', type: 'number', width: 150, editable: true },
  { field: 'IGTotalShares', headerName: 'Instagram Shares', type: 'number', width: 150, editable: true },
  { field: 'IGTotalViews', headerName: 'Instagram Views', type: 'number', width: 150, editable: true },
  { field: 'IGSocialSetsUsed', headerName: 'Instagram Social Sets Used', width: 200, editable: true },
  { field: 'PartnerIGLink', headerName: 'Partner Instagram Link', width: 200, editable: true },

  // Twitter
  { field: 'REVOTwitter', headerName: 'Twitter Status', width: 150, editable: true },

  // TikTok
  { field: 'REVOTikTok', headerName: 'TikTok Status', width: 150, editable: true },
  { field: 'REVOTTViews', headerName: 'TikTok REVO Views', type: 'number', width: 150, editable: true },
  { field: 'TikTokAccountsused', headerName: 'TikTok Accounts Used', width: 200, editable: true },
  { field: 'PartnerTikTokLink', headerName: 'Partner TikTok Link', width: 200, editable: true },
  { field: 'PartnerTTLikes', headerName: 'Partner TikTok Likes', type: 'number', width: 150, editable: true },
  { field: 'PartnerTTComments', headerName: 'Partner TikTok Comments', type: 'number', width: 150, editable: true },
  { field: 'PartnerTTShares', headerName: 'Partner TikTok Shares', type: 'number', width: 150, editable: true },
  { field: 'PartnerTTViews', headerName: 'Partner TikTok Views', type: 'number', width: 150, editable: true },
  { field: 'PartnerTTSaves', headerName: 'Partner TikTok Saves', type: 'number', width: 150, editable: true },
  {
    field: 'TTDummyAccountsUsed',
    headerName: 'TikTok Dummy Account Used',
    width: 200,
    editable: true,
    valueGetter: (value, row) => row?.TTDummyAccountsUsed?.join(', '),
  },

  // YouTube
  { field: 'YTAccountsUsed', headerName: 'YouTube Account Used', width: 200, editable: true },
  { field: 'PartnerYTLink', headerName: 'Partner YouTube Link', width: 200, editable: true },
  { field: 'YTPartnerTotallikes', headerName: 'Partner YouTube Likes', type: 'number', width: 150, editable: true },
  {
    field: 'YTPartnerTotalcomments',
    headerName: 'Partner YouTube Comments',
    type: 'number',
    width: 150,
    editable: true,
  },
  { field: 'YTPartnerTotalViews', headerName: 'Partner YouTube Views', type: 'number', width: 150, editable: true },
  { field: 'YTPartnerTotalSaves', headerName: 'Partner YouTube Saves', type: 'number', width: 150, editable: true },
  { field: 'REVOClubrevoYoutube', headerName: 'Club REVO YouTube Status', width: 200, editable: true },
  { field: 'REVOYoutube', headerName: 'YouTube REVO Status', width: 200, editable: true },
  { field: 'YTClubREVOTotalLikes', headerName: 'YouTube Club REVO Likes', type: 'number', width: 150, editable: true },
  { field: 'YTClubREVOTotalViews', headerName: 'YouTube Club REVO Views', type: 'number', width: 150, editable: true },
  { field: 'YTREVOMADICTotalLikes', headerName: 'YouTube REVOMADIC Likes', type: 'number', width: 150, editable: true },
  {
    field: 'YTREVOMADICTotalComments',
    headerName: 'YouTube REVOMADIC Comments',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'YTREVOMADICTotalShares',
    headerName: 'YouTube REVOMADIC Shares',
    type: 'number',
    width: 150,
    editable: true,
  },
  { field: 'YTREVOMADICTotalViews', headerName: 'YouTube REVOMADIC Views', type: 'number', width: 150, editable: true },

  // Other Fields
  { field: 'CreatorStatus', headerName: 'Creator Status', width: 150, editable: true },
  { field: 'PostingStatus', headerName: 'Posting Status', width: 150, editable: true },
  {
    field: 'partner_HQ',
    headerName: 'Partner HQ',
    width: 150,
    editable: true,
    valueGetter: (value, row) => row?.ContentHQPartnerHQ?.map((p) => p?.PartnerHQ?.Name).join(', '),
  },
  { field: 'portfolio', headerName: 'Portfolio', width: 150, editable: true },
  {
    field: 'TotalContributedEngagement',
    headerName: 'Contributed Engagement',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'by_tags',
    headerName: 'Tags',
    width: 200,
    editable: true,
    valueGetter: (value, row) => row?.ByTagsContent?.map((t) => t?.ByTags?.Name).join(', '),
  },
  {
    field: 'by_city',
    headerName: 'City',
    width: 150,
    editable: true,
    valueGetter: (value, row) => row?.ByCityContent?.map((c) => c?.ByCity?.Name).join(', '),
  },
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
          <DeleteConfirmationPasswordPopover title={`Are you sure you want to delete ${selectedRows.length} record(s)?`}  onDelete={(password) => handleDelete(password)}  passwordInput disabled={selectedRows.length === 0} />
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
