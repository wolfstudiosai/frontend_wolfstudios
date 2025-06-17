'use client';

import * as React from 'react';
import { Box, Card, IconButton, Popover, TextField } from '@mui/material';
import { PageContainer } from '/src/components/container/PageContainer';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { EditableDataTable } from '/src/components/data-table/editable-data-table';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';

import {
  createProductionAsync,
  deleteProductionAsync,
  getProductionListAsync,
  updateProductionAsync,
} from '../_lib/production.action';
import AddIcon from '@mui/icons-material/Add';
import { defaultProduction } from '../../production/_lib/production.types';
import { getProductionColumns } from '../_utils/get-production-columns';
import Image from 'next/image';
import { MediaUploader } from '/src/components/uploaders/media-uploader';
import { toast } from 'sonner';
import TableFilterBuilder from '/src/components/common/table-filter-builder';

export const ProductionListView = () => {
  const anchorEl = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [imageToShow, setImageToShow] = React.useState(null);

  // table columns
  const columns = getProductionColumns();
  const [records, setRecords] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 50 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [filteredValue, setFilteredValue] = React.useState(columns.map((col) => col.field));
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [updatedRow, setUpdatedRow] = React.useState(null);

  // filter
  const [metaData, setMetaData] = React.useState([]);
  const [filters, setFilters] = React.useState([]);
  const [gate, setGate] = React.useState('and');

  async function fetchList() {
    try {
      setLoading(true);
      const response = await getProductionListAsync({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit,
      }, filters, gate);
      if (response.success) {
        setRecords(response.data);
        setTotalRecords(response.totalRecords);
        setMetaData(response.metaData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // ******************************data grid handler starts*********************

  const handleClosePopover = () => {
    anchorEl.current = null;
    setImageToShow(null);
  };

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

      if (!newRow.proposedDate) {
        toast.error("Please select proposed date");
        return newRow;
      }

      if (!newRow.recordShootDate) {
        toast.error("Please select record shoot date");
        return newRow;
      }

      await createProductionAsync(null, newRow);
      fetchList();
    } else {
      await updateProductionAsync(null, newRow);
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

  // update partner after images uploaded
  const handleUploadImage = async (images) => {
    try {
      const newData = {
        ...updatedRow,
        Imagefield: [...updatedRow.Imagefield, ...images]
      }
      await updateProductionAsync(null, newData);
    } catch (error) {
      console.log(error)
    } finally {
      fetchList();
    }
  }

  const handleAddNewItem = () => {
    const tempId = `temp_${Date.now()}`;
    const newRow = { ...defaultProduction, id: tempId };
    setRecords([newRow, ...records]);
  };

  const handleDelete = async () => {
    fetchList();
  };

  const handleFilterApply = () => {
    setPagination({ pageNo: 1, limit: 50 });
  };

  const handleFilterClear = () => {
    setFilters([]);
    setGate('and');
    setPagination({ pageNo: 1, limit: 50 });
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
          <TableFilterBuilder
            metaData={metaData}
            filters={filters}
            setFilters={setFilters}
            gate={gate}
            setGate={setGate}
            handleFilterApply={handleFilterApply}
            handleFilterClear={handleFilterClear}
          />
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
              deleteFn={deleteProductionAsync}
            />
          </Box>
        </Box>

        <Box sx={{ overflowX: 'auto', height: '100%', width: '100%' }}>
          <EditableDataTable
            columns={visibleColumns}
            rows={records.map((row) => defaultProduction(row)) || []}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            loading={loading}
            rowCount={totalRecords}
            pageSizeOptions={[50, 100, 150]}
            paginationModel={{ page: pagination.pageNo - 1, pageSize: pagination.limit }}
            onPageChange={handlePaginationModelChange}
            checkboxSelection={true}
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
  )
};