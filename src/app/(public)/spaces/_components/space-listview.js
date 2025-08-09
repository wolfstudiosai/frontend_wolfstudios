'use client';

import * as React from 'react';
import { Box, Card, IconButton } from '@mui/material';
import { PageContainer } from '/src/components/container/PageContainer';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { EditableDataTable } from '/src/components/data-table/editable-data-table';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { Iconify } from '/src/components/iconify/iconify';

import {
  createSpaceAsync,
  deleteSpaceAsync,
  getSpaceListAsync,
  updateSpaceAsync,
} from '../_lib/space.actions';
import { defaultSpace } from '../_lib/space.types';
import { ManageSpaceRightPanel } from './manage-space-right-panel';
import { dateFormatter } from '/src/utils/date-formatter';

export const SpaceListView = ({data, fetchList1, totalRecords1, loading1}) => {
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
        { field: 'Name', headerName: 'Name', width: 280, editable: true },
        {
          field: 'category',
          headerName: 'Category',
          width: 150,
          editable: true,
          valueGetter: (value, row) =>
            row.ByTagsSpaces.map((item) => item.ByTags.Name).join(', '),
        },
        {
          field: 'Features',
          headerName: 'Features',
          width: 150,
          editable: true,
          valueGetter: (value, row) => row.Features.map((item) => item).join(', '),
        },
        { field: 'Type', headerName: 'Type', width: 100, editable: true },
        { field: 'VideoLink', headerName: 'Video URL', width: 200, editable: true },
        // {
        //   field: 'Date',
        //   headerName: 'Date',
        //   width: 150,
        //   editable: true,
        //   valueGetter: (value, row) => dateFormatter(value),
        // },
        { field: 'StartingRatehr', headerName: 'Starting Rate hourly', width: 150, editable: true },
        { field: 'SquareFootage', headerName: 'Square Footage', width: 150, editable: true },
        { field: 'AvailableHours', headerName: 'Available Hours', width: 150, editable: true },
        { field: 'MinimumHourlyBooking', headerName: 'Minimum Hourly Booking', width: 150, editable: true },
        {
          field: 'city',
          headerName: 'City',
          width: 150,
          editable: true,
          valueGetter: (value, row) => row.ByCitySpaces.map((item) => item.ByCities?.Name).join(', '),
        },
        {
          field: 'state',
          headerName: 'State',
          width: 150,
          editable: true,
          valueGetter: (value, row) => row.ByStatesSpaces.map((item) => item.ByStates?.Name).join(', '),
        },
        {
          field: 'country',
          headerName: 'Country',
          width: 150,
          editable: true,
          valueGetter: (value, row) => row.ByCountrySpaces.map((item) => item.ByCountry?.Name).join(', '),
        },
        // { field: 'user_id', headerName: 'User ID', width: 150, editable: true },
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
          const response = await getSpaceListAsync({
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
          await updateSpaceAsync(null, newRow);
        } else {
          const { id, ...rest } = newRow;
          await createSpaceAsync(null, rest);
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
        setRecords([defaultSpace, ...records]);
      };
    
      const handleDelete = async (password) => {
        const idsToDelete = [];
        selectedRows.forEach((row) => {
          idsToDelete.push(row.id);
        });
        const response = await deleteSpaceAsync(idsToDelete);
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
                  <DeleteConfirmationPasswordPopover title={`Are you sure you want to delete ${selectedRows.length} record(s)?`}  onDelete={(password) => handleDelete(password)}  passwordInput disabled={selectedRows.length === 0} />
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
              <ManageSpaceRightPanel
                open={openDetails ? true : false}
                onClose={() => setOpenDetails(null)}
                data={openDetails}
                fetchList={fetchList}
              />
              {/* </PageLoader> */}
        </PageContainer>
    )
};