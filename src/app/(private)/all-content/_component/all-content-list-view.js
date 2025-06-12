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

import {
  createContentAsync,
  deleteBulkContentAsync,
  getContentList,
  updateContentAsync
} from '../_lib/all-content.actions';
import { defaultContent } from '../_lib/all-content.types';
import { IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'sonner';
import { getContentColumns } from '../_utils/get-content-columns';

export default function AllContentListView() {
  // table columns
  const columns = getContentColumns();

  const [data, setData] = React.useState([]);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [paginateData, setPaginateData] = React.useState({ pageNo: 1, limit: 20 });
  const [filteredValue, setFilteredValue] = React.useState(columns.map((col) => col.field));
  const [selectedRows, setSelectedRows] = React.useState([]);

  const fetchList = async () => {
    try {
      const response = await getContentList({
        page: paginateData.pageNo,
        rowsPerPage: paginateData.limit,
      });
      if (response.success) {
        setData(response.data);
        setTotalRecords(response.totalRecords);
      }
    } catch (error) {
      console.error('Error fetching contents:', error);
    } finally {
      setLoading(false);
    }
  };

  // ******************************data grid handler starts*********************

  const handlePaginationModelChange = (newPaginationModel) => {
    const { page, pageSize } = newPaginationModel;
    setPaginateData({ pageNo: page + 1, limit: pageSize });
  };

  const processRowUpdate = React.useCallback(async (newRow, oldRow) => {
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow;

    const isTemporaryId = typeof newRow.id === 'string' && newRow.id.startsWith('temp_');
    if (isTemporaryId) {
      if (!newRow.name) {
        toast.error("Please enter name");
        return newRow;
      }

      if (!newRow.revoPinterest) {
        toast.error("Please enter pinterest status");
        return newRow;
      }

      if (!newRow.pinAccountsUsed) {
        toast.error("Please enter pin accounts used");
        return newRow;
      }

      if (!newRow.googleDriveFiles) {
        toast.error("Please enter google drive files");
        return newRow;
      }

      if (!newRow.playbookLink) {
        toast.error("Please enter playbook link");
        return newRow;
      }

      if (!newRow.monthUploaded) {
        toast.error("Please enter month uploaded");
        return newRow;
      }

      if (!newRow.assetStatus) {
        toast.error("Please enter asset status");
        return newRow;
      }

      if (!newRow.revoInstagram) {
        toast.error("Please enter instagram status");
        return newRow;
      }

      if (!newRow.creatorStatus) {
        toast.error("Please enter creator status");
        return newRow;
      }

      await createContentAsync(newRow);
      fetchList();
    } else {
      await updateContentAsync(newRow);
      fetchList();
    }

    return newRow;

  }, []);

  // console.log(data)

  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log({ children: error.message, severity: 'error' });
  }, []);

  const handleRowSelection = (newRowSelectionModel) => {
    const selectedData = newRowSelectionModel.map((id) => data.find((row) => row.id === id));
    setSelectedRows(selectedData);
  };

  // ******************************data grid handler ends*********************

  const visibleColumns = columns.filter((col) => filteredValue.includes(col.field));

  const handleAddNewItem = () => {
    const tempId = `temp_${Date.now()}`;
    const newRecord = { ...defaultContent(), id: tempId };
    setData([newRecord, ...data]);
  };

  const handleDelete = async () => {
    fetchList();
  };

  React.useEffect(() => {
    fetchList();
  }, [paginateData]);

  React.useEffect(() => {
    const storedHiddenColumns = localStorage.getItem('hiddenColumns');
    if (storedHiddenColumns) {
      setFilteredValue(JSON.parse(storedHiddenColumns));
    }
  }, []);

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
              onDelete={handleDelete}
              passwordInput
              id={selectedRows.map((row) => row.id)}
              deleteFn={deleteBulkContentAsync}
              disabled={selectedRows.length === 0}
            />
          </Box>
        </Box>

        <Box sx={{ overflowX: 'auto', height: '100%', width: '100%' }}>
          <EditableDataTable
            columns={visibleColumns}
            rows={data?.map((row) => defaultContent(row)) || []}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            loading={loading}
            rowCount={totalRecords}
            pageSizeOptions={[10, 20, 50]}
            paginationModel={{ page: paginateData.pageNo - 1, pageSize: paginateData.limit }}
            onPageChange={handlePaginationModelChange}
            onRowSelectionModelChange={handleRowSelection}
            checkboxSelection
          />
        </Box>
      </Card>
      {/* </PageLoader> */}
    </PageContainer>
  );
}
