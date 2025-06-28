'use client';

import AddIcon from '@mui/icons-material/Add';
import TableReorderIcon from '@mui/icons-material/Reorder';
import { Checkbox, FormControlLabel, FormGroup, IconButton, Popover, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { alpha, useTheme } from '@mui/material/styles';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { toast } from 'sonner';

import TableFilterBuilder from '/src/components/common/table-filter-builder';
import TableView from '/src/components/common/table-view';
import { PageContainer } from '/src/components/container/PageContainer';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { EditableDataTable } from '/src/components/data-table/editable-data-table';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { Iconify } from '/src/components/iconify/iconify';

import {
  createContentAsync,
  deleteBulkContentAsync,
  getContentList,
  getContentViews,
  getSingleContentView,
  updateContentAsync,
  updateContentView,
} from '../_lib/all-content.actions';
import { defaultContent } from '../_lib/all-content.types';
import { getContentColumns } from '../_utils/get-content-columns';

export default function AllContentListView() {
  const theme = useTheme();
  const [anchorElHide, setAnchorElHide] = React.useState(null);

  const handleClosePopoverHide = () => {
    setAnchorElHide(null);
    setSearchColumns(allColumns);
  };

  const [records, setRecords] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 20 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [selectedRows, setSelectedRows] = React.useState([]);

  // View
  const [showView, setShowView] = React.useState(false);
  const [views, setViews] = React.useState([]);
  const [viewsLoading, setViewsLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const view = searchParams.get('view');
  const [selectedView, setSelectedView] = React.useState(null);

  // filter
  const [metaData, setMetaData] = React.useState([]);
  const [filters, setFilters] = React.useState([]);
  const [filtersLoaded, setFiltersLoaded] = React.useState(false);
  const [gate, setGate] = React.useState('and');

  // table columns
  const allColumns = React.useMemo(() => {
    const columns = metaData.map((obj) => {
      const key = Object.keys(obj)[0];
      return {
        label: obj[key].label,
        columnName: key,
        depth: obj[key].depth,
      };
    });
    return columns;
  }, [metaData]);

  const [visibleColumns, setVisibleColumns] = React.useState(allColumns);
  const [searchColumns, setSearchColumns] = React.useState(allColumns);
  const columns = getContentColumns(visibleColumns);

  const fetchList = async () => {
    try {
      const response = await getContentList(
        {
          page: pagination.pageNo,
          rowsPerPage: pagination.limit,
        },
        filters,
        gate
      );

      if (response.success) {
        setRecords(response.data.map((row) => defaultContent(row)));
        setTotalRecords(response.totalRecords);
        setMetaData(response.metaData);
      }
    } catch (error) {
      console.error('Error fetching contents:', error);
    } finally {
      setLoading(false);
    }
  };

  async function updateView(filters) {
    const data = {
      label: selectedView?.meta?.label,
      description: selectedView?.meta?.description,
      table: selectedView?.meta?.table,
      isPublic: selectedView?.meta?.isPublic,
      columns: selectedView?.meta?.columns,
      gate,
      filters,
      sort: selectedView?.meta?.sort,
      groups: selectedView?.meta?.groups,
    };
    await updateContentView(view, data);
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
        toast.error('Please enter name');
        return newRow;
      }

      if (!newRow.revoPinterest) {
        toast.error('Please enter pinterest status');
        return newRow;
      }

      if (!newRow.pinAccountsUsed) {
        toast.error('Please enter pin accounts used');
        return newRow;
      }

      if (!newRow.googleDriveFiles) {
        toast.error('Please enter google drive files');
        return newRow;
      }

      if (!newRow.playbookLink) {
        toast.error('Please enter playbook link');
        return newRow;
      }

      if (!newRow.monthUploaded) {
        toast.error('Please enter month uploaded');
        return newRow;
      }

      if (!newRow.assetStatus) {
        toast.error('Please enter asset status');
        return newRow;
      }

      if (!newRow.revoInstagram) {
        toast.error('Please enter instagram status');
        return newRow;
      }

      if (!newRow.creatorStatus) {
        toast.error('Please enter creator status');
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
    const selectedData = newRowSelectionModel.map((id) => records.find((row) => row.id === id));
    setSelectedRows(selectedData);
  };

  // ******************************data grid handler ends*********************

  const handleAddNewItem = () => {
    const tempId = `temp_${Date.now()}`;
    const newRecord = { ...defaultContent(), id: tempId };
    setRecords([newRecord, ...records]);
  };

  const handleDelete = async () => {
    fetchList();
  };

  // get single view
  const getSingleView = async (viewId) => {
    const res = await getSingleContentView(viewId);
    if (res.success) {
      setSelectedView(res.data);
      setFilters(res.data.meta?.filters || []);
      setGate(res.data.meta?.gate || 'and');
      setFiltersLoaded(true);
    }
  };

  const handleColumnChange = (e, col) => {
    let newVisibleColumns = [];
    if (e.target.checked) {
      // Add column
      const exists = visibleColumns.some((c) => c.columnName === col.columnName);
      if (exists) return;
      newVisibleColumns = [...visibleColumns, col];
    } else {
      // Remove column
      newVisibleColumns = visibleColumns.filter((c) => c.columnName !== col.columnName);
    }
    setVisibleColumns(newVisibleColumns);

    if (tab === 'campaign' && view) {
      const data = {
        columns: newVisibleColumns.map((c) => c.columnName),
        label: selectedView?.meta?.label,
        description: selectedView?.meta?.description,
        table: selectedView?.meta?.table,
        isPublic: selectedView?.meta?.isPublic,
        gate,
        filters,
        sort: selectedView?.meta?.sort,
        groups: selectedView?.meta?.groups,
      };

      updateContentView(view, data);
    }
  };

  // handle Column Search
  const handleColumnSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchColumns(allColumns.filter((col) => col.label.toLowerCase().includes(searchValue)));
  };

  // run when pagination, filters, gate, filtersLoaded change
  React.useEffect(() => {
    if (filtersLoaded) {
      fetchList();
    }
  }, [pagination, filters, gate, filtersLoaded]);

  // run when view change
  React.useEffect(() => {
    const view = searchParams.get('view');

    // Reset pageNo to 1 on view change
    setPagination((prev) => ({ ...prev, pageNo: 1 }));

    if (view) {
      getSingleView(view);
      setFiltersLoaded(false);
    } else {
      setSelectedView(null);
      setFilters([]);
      setGate('and');
      setVisibleColumns(allColumns);
      setFiltersLoaded(true);
    }
  }, [searchParams]);

  // run when allColumns change
  React.useEffect(() => {
    if (allColumns.length > 0 && visibleColumns.length === 0) {
      setSearchColumns(allColumns);
      setVisibleColumns(allColumns);
    }
  }, [allColumns]);

  // run when selectedView and metaData change
  React.useEffect(() => {
    if (selectedView && metaData.length > 0) {
      const selectedColumnNames = selectedView.meta?.columns || [];
      const filteredColumns = allColumns.filter((col) => selectedColumnNames.includes(col.columnName));
      setVisibleColumns(filteredColumns);
    }
  }, [metaData, selectedView, allColumns]);

  // run when viewsLoading change
  React.useEffect(() => {
    const fetchViews = async () => {
      setViewsLoading(true);
      const res = await getContentViews();
      if (res.success) {
        setViews(res.data);
      }
      setViewsLoading(false);
    };
    fetchViews();
  }, []);

  return (
    <PageContainer>
      <Card sx={{ borderRadius: 0, minHeight: 'calc(100vh - 150px)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ padding: '5px 10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button
              startIcon={<TableReorderIcon />}
              variant="text"
              size="small"
              onClick={() => setShowView((prev) => !prev)}
              sx={{ bgcolor: showView ? alpha(theme.palette.primary.main, 0.08) : 'background.paper' }}
            >
              View
            </Button>

            <Button
              startIcon={<Iconify icon="eva:eye-off-outline" width={16} height={16} />}
              variant="text"
              size="small"
              onClick={(e) => setAnchorElHide(e.currentTarget)}
            >
              Hide Fields
            </Button>

            <TableFilterBuilder
              metaData={metaData}
              filters={filters}
              gate={gate}
              setFilters={setFilters}
              setGate={setGate}
              updateView={updateView}
            />

            <Button startIcon={<Iconify icon="eva:grid-outline" width={16} height={16} />} variant="text" size="small">
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
              deleteFn={deleteBulkContentAsync}
              disabled={selectedRows.length === 0}
            />
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="start">
          {/* View */}
          <TableView
            views={views}
            showView={showView}
            setViews={setViews}
            setShowView={setShowView}
            columns={allColumns}
            selectedView={selectedView}
            viewsLoading={viewsLoading}
          />
          <Box sx={{ overflowX: 'auto', height: '100%', width: '100%' }}>
            <EditableDataTable
              columns={columns}
              rows={records}
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              loading={loading}
              rowCount={totalRecords}
              pageSizeOptions={[20, 50, 100]}
              paginationModel={{ page: pagination.pageNo - 1, pageSize: pagination.limit }}
              onPageChange={handlePaginationModelChange}
              onRowSelectionModelChange={handleRowSelection}
              checkboxSelection
            />
          </Box>
        </Box>
      </Card>
      {/* </PageLoader> */}

      {/* Hide fields popover */}
      <Popover
        id="hide-fields-popover"
        open={Boolean(anchorElHide)}
        anchorEl={anchorElHide}
        onClose={handleClosePopoverHide}
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
        <Box sx={{ width: 250, maxHeight: 350, overflowY: 'auto', scrollbarWidth: 'thin' }}>
          <Box sx={{ p: 1.5, position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'background.paper' }}>
            <TextField
              fullWidth
              placeholder="Find fields..."
              variant="outlined"
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
              onChange={(e) => handleColumnSearch(e)}
            />
          </Box>
          <FormGroup sx={{ gap: 0.5, p: 1 }}>
            {/* {loading && (
                    <Box sx={{ p: 1.5 }}>
                      <CircularProgress size={20} />
                    </Box>
                  )} */}
            {searchColumns?.map((col) => {
              return (
                <FormControlLabel
                  key={col.field}
                  control={
                    <Checkbox
                      checked={visibleColumns.some((c) => c.columnName === col.columnName)}
                      onChange={(e) => handleColumnChange(e, col)}
                    />
                  }
                  label={col.label}
                />
              );
            })}
          </FormGroup>
        </Box>
      </Popover>
    </PageContainer>
  );
}
