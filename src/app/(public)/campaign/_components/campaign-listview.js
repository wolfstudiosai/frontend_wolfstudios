'use client';

import { PageContainer } from '@/components/container/PageContainer';
import { RefreshPlugin } from '@/components/core/plugins/RefreshPlugin';
import { EditableDataTable } from '@/components/data-table/editable-data-table';
import { DeleteConfirmationPopover } from '@/components/dialog/delete-confirmation-popover';
import { Iconify } from '@/components/iconify/iconify';
import { dateFormatter } from '@/utils/date-formatter';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import * as React from 'react';

// import {
//   createPortfolioAsync,
//   deletePortfolioAsync,
//   getPortfolioListAsync,
//   updatePortfolioAsync,
// } from '../_lib/portfolio.actions';
import { defaultCampaignData, singleCampaignData } from '../_lib/campagin.data';
import { ManageCampaignRightPanel } from './manage-campaign-right-panel';

export const CampaignListView = () => {
  // table columns
  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 70,
      editable: false,
      renderCell: (params) => (
        <IconButton onClick={() => handleEdit(params.row)}>
          <Iconify icon="ci:expand" />
        </IconButton>
      ),
    },
    { field: 'project_title', headerName: 'Project Title', width: 280, editable: true },
    { field: 'category', headerName: 'Category', width: 150, editable: true },
    { field: 'video_url', headerName: 'Video URL', width: 200, editable: true },
    { field: 'hero_image', headerName: 'Hero Image', width: 150, editable: true },
    { field: 'field_image', headerName: 'Field Image', width: 150, editable: true },
    { field: 'thumbnail', headerName: 'Thumbnail', width: 150, editable: true },
    { field: 'vertical_gallery_images', headerName: 'Vertical Gallery Images', width: 200, editable: true },
    { field: 'horizontal_gallery_images', headerName: 'Horizontal Gallery Images', width: 200, editable: true },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      editable: true,
      valueGetter: (value, row) => dateFormatter(value),
    },
    { field: 'short_description', headerName: 'Short Description', width: 200, editable: true },
    { field: 'full_description', headerName: 'Full Description', width: 300, editable: true },
    { field: 'state', headerName: 'State', width: 150, editable: true },
    { field: 'partner_hq', headerName: 'Partner HQ', width: 150, editable: true },
    { field: 'user_id', headerName: 'User ID', width: 150, editable: true },
    {
      field: 'created_at',
      headerName: 'Created At',
      width: 180,
      editable: true,
      valueGetter: (value, row) => dateFormatter(value),
    },
    {
      field: 'updated_at',
      headerName: 'Updated At',
      width: 180,
      editable: true,
      valueGetter: (value, row) => dateFormatter(value),
    },
  ];
  const [records, setRecords] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 200 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [filteredValue, setFilteredValue] = React.useState(columns.map((col) => col.field));
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [openDetails, setOpenDetails] = React.useState(null);

  async function fetchList() {
    try {
      setLoading(true);
      const response = await getPortfolioListAsync({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit,
      });
      if (response.success) {
        setRecords(response.data);
        setTotalRecords(response.totalRecords);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // ******************************data grid handler starts*********************

  const handlePaginationModelChange = (newPaginationModel) => {
    const { page, pageSize } = newPaginationModel;
    setPagination({ pageNo: page + 1, limit: pageSize });
  };

  const processRowUpdate = React.useCallback(async (newRow, oldRow) => {
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow;
    if (newRow.id) {
      await updatePortfolioAsync(null, newRow);
    } else {
      const { id, ...rest } = newRow;
      await createPortfolioAsync(null, rest);
      fetchList();
    }
    return newRow;
  }, []);

  const handleRowSelection = (newRowSelectionModel) => {
    const selectedData = newRowSelectionModel.map((id) => records.find((row) => row.id === id));
    setSelectedRows(selectedData);
  };

  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log({ children: error.message, severity: 'error' });
  }, []);

  const handleEdit = (params) => {
    setOpenDetails(params);
  };

  // ******************************data grid handler ends*********************

  const visibleColumns = columns.filter((col) => filteredValue.includes(col.field));

  const handleAddNewItem = () => {
    setRecords([defaultCampaignData, ...records]);
  };

  const handleDelete = async () => {
    const idsToDelete = [];
    selectedRows.forEach((row) => {
      idsToDelete.push(row.id);
    });
    const response = await deletePortfolioAsync(idsToDelete);
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

  React.useEffect(() => {
    fetchList();
  }, [pagination]);

  return (
    <PageContainer>
      <Card>
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
          <Box>
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
            rows={records}
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
      <ManageCampaignRightPanel
        open={openDetails ? true : false}
        onClose={() => setOpenDetails(null)}
        data={singleCampaignData}
        fetchList={fetchList}
      />
      {/* </PageLoader> */}
    </PageContainer>
  );
};
