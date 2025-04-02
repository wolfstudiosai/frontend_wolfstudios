'use client';

import * as React from 'react';
import { Box, Button, Card, IconButton } from '@mui/material';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { CardTitle } from '/src/components/cardTitle/CardTitle';
import { PageContainer } from '/src/components/container/PageContainer';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { EditableDataTable } from '/src/components/data-table/editable-data-table';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { Iconify } from '/src/components/iconify/iconify';

import {
  createProductionAsync,
  deleteProductionAsync,
  getProductionListAsync,
  updateProductionAsync,
} from '../_lib/production.action';
import { defaultProduction } from '../_lib/production.types';
import { ManageProductionRightPanel } from './manage-production-right-panel';
import { dateFormatter } from '/src/utils/date-formatter';
import PageLoader from '/src/components/loaders/PageLoader';

export const ProductionListView = () => {

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
        { field: 'ProjectTitle', headerName: 'Project Title', width: 280, editable: true },
        {
          field: 'category',
          headerName: 'Category',
          width: 150,
          editable: true,
          valueGetter: (value, row) =>
            row.PortfolioCategoriesPortfolios.map((item) => item.PortfolioCategories.Name).join(', '),
        },
        { field: 'VideoLink', headerName: 'Video URL', width: 200, editable: true },
        // { field: 'hero_image', headerName: 'Hero Image', width: 150, editable: true },
        // { field: 'field_image', headerName: 'Field Image', width: 150, editable: true },
        // { field: 'thumbnail', headerName: 'Thumbnail', width: 150, editable: true },
        // { field: 'vertical_gallery_images', headerName: 'Vertical Gallery Images', width: 200, editable: true },
        // { field: 'horizontal_gallery_images', headerName: 'Horizontal Gallery Images', width: 200, editable: true },
        {
          field: 'Date',
          headerName: 'Date',
          width: 150,
          editable: true,
          valueGetter: (value, row) => dateFormatter(value),
        },
        { field: 'Projectshortdescription', headerName: 'Short Description', width: 200, editable: true },
        { field: 'Projectsinglepagefulldescription', headerName: 'Full Description', width: 300, editable: true },
        {
          field: 'state',
          headerName: 'State',
          width: 150,
          editable: true,
          valueGetter: (value, row) => row.ByStatesPortfolios.map((item) => item.ByStates.Name).join(', '),
        },
        {
          field: 'partner_hq',
          headerName: 'Partner HQ',
          width: 150,
          editable: true,
          valueGetter: (value, row) => row.PartnerHQPortfolios.map((item) => item.PartnerHQ.Name).join(', '),
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
          const response = await getProductionListAsync({
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
          await updateProductionAsync(null, newRow);
        } else {
          const { id, ...rest } = newRow;
          await createProductionAsync(null, rest);
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
        setRecords([defaultProduction, ...records]);
      };
    
      const handleDelete = async (password) => {
        const idsToDelete = [];
        selectedRows.forEach((row) => {
          idsToDelete.push(row.id);
        });
        const response = await deleteProductionAsync(idsToDelete);
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
         <PageLoader loading={loading}>
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
              <ManageProductionRightPanel
                open={openDetails ? true : false}
                onClose={() => setOpenDetails(null)}
                data={openDetails}
                fetchList={fetchList}
              />
          </PageLoader>
        </PageContainer>
    )
};