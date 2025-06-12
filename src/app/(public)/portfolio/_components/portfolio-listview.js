'use client';

import * as React from 'react';
import { IconButton, Popover, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { PageContainer } from '/src/components/container/PageContainer';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { EditableDataTable } from '/src/components/data-table/editable-data-table';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';

import {
  createPortfolioAsync,
  deletePortfolioAsync,
  getPortfolioListAsync,
  updatePortfolioAsync,
} from '../_lib/portfolio.actions';
import { defaultPortfolio } from '../_lib/portfolio.types';
import AddIcon from '@mui/icons-material/Add';
import { getPortfolioColumns } from '../_utils/get-portfolio-columns';
import { toast } from 'sonner';
import Image from 'next/image';

export const PortfolioListView = () => {
  const anchorEl = React.useRef(null);
  const [imageToShow, setImageToShow] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleUploadModalOpen = (data) => {
    setOpen(true);
    setUpdatedRow(data);
  };
  // table columns
  const columns = getPortfolioColumns(anchorEl, setImageToShow, handleUploadModalOpen)
  const [records, setRecords] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 20 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [filteredValue, setFilteredValue] = React.useState(columns.map((col) => col.field));
  const [selectedRows, setSelectedRows] = React.useState([]);

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

  console.log(records)

  // ******************************data grid handler starts*********************

  const handlePaginationModelChange = (newPaginationModel) => {
    const { page, pageSize } = newPaginationModel;
    setPagination({ pageNo: page + 1, limit: pageSize });
  };

  const processRowUpdate = React.useCallback(async (newRow, oldRow) => {
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow;

    const isTemporaryId = typeof newRow.id === 'string' && newRow.id.startsWith('temp_');

    if (isTemporaryId) {
      if (!newRow.projectTitle) {
        toast.error("Please enter project title");
        return newRow;
      }

      if (!newRow.videoLink) {
        toast.error("Please enter video link");
        return newRow;
      }

      if (!newRow.date) {
        toast.error("Please enter date");
        return newRow;
      }

      await createPortfolioAsync(newRow);
      fetchList();
    } else {
      await updatePortfolioAsync(newRow.id, newRow);
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
    const newRecord = { ...defaultPortfolio(), id: tempId };
    setRecords([newRecord, ...records]);
  };

  const handleDelete = async () => {
    fetchList();
  };

  const handleClosePopover = () => {
    anchorEl.current = null;
    setImageToShow(null);
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
      <Card sx={{ borderRadius: 0 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ padding: '5px 10px' }}>
          <TextField placeholder="Search..." size='small' sx={{ width: 300 }} />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <IconButton onClick={handleAddNewItem}>
              <AddIcon />
            </IconButton>
            <Box>
              <RefreshPlugin onClick={fetchList} />
            </Box>
            <DeleteConfirmationPasswordPopover
              title={`Are you sure you want to delete ${selectedRows.length} record(s)?`}
              onDelete={() => handleDelete()}
              passwordInput
              disabled={selectedRows.length === 0}
              id={selectedRows.map((row) => row.id)}
              deleteFn={deletePortfolioAsync}
            />
          </Box>
        </Box>

        <Box sx={{ overflowX: 'auto', height: '100%', width: '100%' }}>
          <EditableDataTable
            columns={visibleColumns}
            rows={records.map((row) => defaultPortfolio(row)) || []}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            loading={loading}
            rowCount={totalRecords}
            checkboxSelection
            pagination
            paginationModel={{ page: pagination.pageNo - 1, pageSize: pagination.limit }}
            onPageChange={handlePaginationModelChange}
            pageSizeOptions={[10, 20, 30]}
            onRowSelectionModelChange={handleRowSelection}
          />

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
    </PageContainer>
  );
};
