'use client';

import { PageContainer } from '/src/components/container/PageContainer';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { EditableDataTable } from '/src/components/data-table/editable-data-table';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { alpha, Button, IconButton, Popover, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import * as React from 'react';
import { createCampaignAsync, deleteCampaignBulkAsync, getCampaignListAsync, getCampaignViews } from '../_lib/campaign.actions';
import AddIcon from '@mui/icons-material/Add';
import { getCampaignColumns } from '../_utils/get-campaign-columns';
import { updateCampaignAsync } from '../_lib/campaign.actions';
import Image from 'next/image';
import { MediaUploader } from '/src/components/uploaders/media-uploader';
import { defaultCampaign } from '../_lib/campaign.types';
import { toast } from 'sonner';
import TableFilterBuilder from '/src/components/common/table-filter-builder';
import TableView from '/src/components/common/table-view';
import TableReorderIcon from '@mui/icons-material/Reorder';
import { useTheme } from '@mui/material/styles';
import { useSearchParams } from 'next/navigation';
import { Iconify } from '/src/components/iconify/iconify';

export const CampaignListView = () => {
  const theme = useTheme();
  const anchorEl = React.useRef(null);
  const [imageToShow, setImageToShow] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleUploadModalOpen = (data) => {
    setOpen(true);
    setUpdatedRow(data);
  };

  const handleClosePopover = () => {
    anchorEl.current = null;
    setImageToShow(null);
  };

  const handleUploadImage = async (images) => {
    try {
      const response = await updateCampaignAsync(updatedRow.id, { ...updatedRow, campaignImage: images });
      if (response.success) {
        toast.success('Campaign updated successfully');
        fetchList();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // table columns
  const columns = getCampaignColumns(anchorEl, setImageToShow, handleUploadModalOpen)

  const [records, setRecords] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 20 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [filteredValue, setFilteredValue] = React.useState(columns.map((col) => col.field));
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [updatedRow, setUpdatedRow] = React.useState(null);

  // View
  const [showView, setShowView] = React.useState(false);
  const [views, setViews] = React.useState([]);
  const searchParams = useSearchParams();
  const [selectedView, setSelectedView] = React.useState(null);

  // filter
  const [metaData, setMetaData] = React.useState([]);
  const [filters, setFilters] = React.useState([]);
  const [gate, setGate] = React.useState('and');

  async function fetchList() {
    try {
      setLoading(true);
      const response = await getCampaignListAsync({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit,
      }, filters, gate);

      if (response.success) {
        setRecords(response.data.map((row) => defaultCampaign(row)) || []);
        setTotalRecords(response.totalRecords);
        setMetaData(response.meta);
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

    const isTemporaryId = typeof newRow.id === 'string' && newRow.id.startsWith('temp_');

    if (isTemporaryId) {
      if (!newRow.name) {
        toast.error("Please enter name");
        return newRow;
      }

      if (!newRow.status) {
        toast.error("Please select campaign status");
        return newRow;
      }

      if (!newRow.notes) {
        toast.error("Please enter notes");
        return newRow;
      }

      if (!newRow.description) {
        toast.error("Please enter description");
        return newRow;
      }

      if (!newRow.client) {
        toast.error("Please enter client");
        return newRow;
      }

      if (!newRow.guidelines) {
        toast.error("Please enter guidelines");
        return newRow;
      }

      await createCampaignAsync(newRow);
      fetchList();
    } else {
      const finalData = {
        ...newRow,
      };

      const imageFields = ['campaignImage'];
      for (const field of imageFields) {
        const value = newRow[field];
        if (value instanceof File) {
          const res = await imageUploader(
            [
              {
                file: value,
                fileName: value.name.split('.').slice(0, -1).join('.'),
                fileType: value.type.split('/')[1],
              },
            ],
            'campaigns'
          );

          finalData[field] = res;
        } else if (typeof value === 'string') {
          finalData[field] = [value];
        }
      }

      const arrayFields = ['contentHQ', 'stakeholders', 'retailPartners', 'proposedPartners', 'spaces'];
      for (const field of arrayFields) {
        const value = newRow[field];
        if (value.length > 0) {
          const arrOfStr = value.map((item) => item.value);
          finalData[field] = arrOfStr;
        }
      }

      if (finalData.goals && typeof finalData.goals === 'string') {
        finalData.goals = finalData.goals.split(',').map((item) => item.trim());
      }
      await updateCampaignAsync(newRow.id, finalData);
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


  // ******************************data grid handler ends*********************

  const visibleColumns = columns.filter((col) => filteredValue.includes(col.field));

  const handleAddNewItem = () => {
    const tempId = `temp_${Date.now()}`;
    const newRecord = { ...defaultCampaign(), id: tempId };
    setRecords([newRecord, ...records]);
  };

  const handleDelete = async () => {
    fetchList();
  };

  const handleFilterApply = () => {
    setPagination({ pageNo: 1, limit: 20 });
  };

  const handleFilterClear = () => {
    setFilters([]);
    setGate('and');
    setPagination({ pageNo: 1, limit: 20 });
  };

  const handleShowViews = async () => {
    if (showView) {
      setShowView(false);
    } else {
      setShowView(true);
      const res = await getCampaignViews();
      if (res.success) {
        setViews(res.data);
      }
    }
  }

  React.useEffect(() => {
    const storedHiddenColumns = localStorage.getItem('hiddenColumns');
    if (storedHiddenColumns) {
      setFilteredValue(JSON.parse(storedHiddenColumns));
    }
  }, []);

  React.useEffect(() => {
    fetchList();
  }, [pagination]);

  React.useEffect(() => {
    const view = searchParams.get('view');
    if (view) {
      const viewData = views.find((v) => v.id === view);
      setSelectedView(viewData);
      setFilters(viewData?.filters || []);
      setGate(viewData?.gate || 'and');
    } else {
      setSelectedView(null);
      setFilters([]);
      setGate('and');
    }
  }, [searchParams]);


  return (
    <PageContainer>
      <Card sx={{ borderRadius: 0 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ padding: '5px 10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button
              startIcon={<TableReorderIcon />}
              variant="text"
              size="small"
              onClick={() => handleShowViews()}
              sx={{ bgcolor: showView ? alpha(theme.palette.primary.main, 0.08) : 'background.paper' }}
            >
              View
            </Button>

            <TableFilterBuilder
              metaData={metaData}
              filters={filters}
              gate={gate}
              setFilters={setFilters}
              setGate={setGate}
              handleFilterApply={handleFilterApply}
              handleFilterClear={handleFilterClear}
            />

            <Button
              startIcon={<Iconify icon="eva:grid-outline" width={16} height={16} />}
              variant="text"
              size="small"
            >
              Group
            </Button>
            <Button
              startIcon={<Iconify icon="si:swap-vert-duotone" width={16} height={16} />}
              variant="text"
              size="small"
            >
              Sort
            </Button>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <IconButton onClick={handleAddNewItem}>
              <AddIcon />
            </IconButton>
            <Box>
              <RefreshPlugin onClick={fetchList} />
            </Box>
            <DeleteConfirmationPasswordPopover
              title={`Are you sure you want to delete ${selectedRows.length} record(s)?`}
              onDelete={handleDelete}
              passwordInput
              id={selectedRows.map((row) => row.id)}
              deleteFn={deleteCampaignBulkAsync}
              disabled={selectedRows.length === 0} />
          </Box>
        </Box>

        <Box display='flex' justifyContent='center' alignItems='start'>
          {/* View */}
          <TableView
            views={views}
            showView={showView}
            setViews={setViews}
            setShowView={setShowView}
            selectedView={selectedView} />

          {/* Table */}
          <Box sx={{ overflowX: 'auto', height: '100%', width: '100%' }}>
            <EditableDataTable
              columns={visibleColumns}
              rows={records}
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              loading={loading}
              rowCount={totalRecords}
              checkboxSelection
              pageSizeOptions={[20, 30, 50]}
              paginationModel={{ page: pagination.pageNo - 1, pageSize: pagination.limit }}
              onPageChange={handlePaginationModelChange}
              onRowSelectionModelChange={handleRowSelection}
            />
          </Box>
        </Box>
      </Card>


      {/* Image upload popover */}
      <Popover
        open={Boolean(anchorEl.current)}
        anchorEl={anchorEl.current}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableAutoFocus
        disableEnforceFocus
        disablePortal
      >
        <Box sx={{ p: 1.5 }}>
          {imageToShow && (
            <Image
              src={imageToShow}
              alt="Preview"
              width={300}
              height={300}
              style={{ borderRadius: 8 }}
            />
          )}
        </Box>
      </Popover>


      {/* Image upload dialog */}
      <MediaUploader
        open={open}
        onClose={() => setOpen(false)}
        onSave={(paths) => handleUploadImage([...paths])}
        multiple
        hideVideoUploader={true}
        folderName="partner-HQ"
      />
    </PageContainer>
  );
};
