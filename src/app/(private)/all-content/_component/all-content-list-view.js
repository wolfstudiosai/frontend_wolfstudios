'use client';

import AddIcon from '@mui/icons-material/Add';
import TableReorderIcon from '@mui/icons-material/Reorder';
import { Checkbox, FormControlLabel, FormGroup, IconButton, Popover, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { alpha, useTheme } from '@mui/material/styles';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { toast } from 'sonner';

import TableFilterBuilder from '/src/components/common/table-filter-builder';
import TableView from '/src/components/common/table-view';
import TableSortBuilder from '/src/components/common/table-sort-builder';
import { PageContainer } from '/src/components/container/PageContainer';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { EditableDataTable } from '/src/components/data-table/editable-data-table';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { Iconify } from '/src/components/iconify/iconify';

import {
  createContentAsync,
  createContentView,
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
  const router = useRouter();
  const anchorEl = React.useRef(null);
  const [anchorElHide, setAnchorElHide] = React.useState(null);
  const [imageToShow, setImageToShow] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const viewId = searchParams.get('view');

  const handleClosePopoverHide = () => {
    setAnchorElHide(null);
    setSearchColumns(allColumns);
  };

  async function fetchList(props) {
    const filter = props ? props : filters;
    const paginationData = props ? props.pagination : pagination;
    try {
      setLoading(true);
      const response = await getContentList(
        {
          page: paginationData.pageNo,
          rowsPerPage: paginationData.limit,
        },
        filter,
        gate
      );

      if (response?.success) {
        if (viewId) {
          setMetaData(response.meta);
        } else {
          setRecords(response.data.map((row) => defaultContent(row)) || []);
          setTotalRecords(response.totalRecords);
          setMetaData(response.meta);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const [records, setRecords] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 20 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [updatedRow, setUpdatedRow] = React.useState(null);

  // View
  const [showView, setShowView] = React.useState(false);
  const [views, setViews] = React.useState([]);
  const [viewsLoading, setViewsLoading] = React.useState(false);
  const [selectedViewId, setSelectedViewId] = React.useState(null);
  const [selectedViewData, setSelectedViewData] = React.useState(null);

  // filter
  const [metaData, setMetaData] = React.useState([]);
  const [filters, setFilters] = React.useState([]);
  const [gate, setGate] = React.useState('and');
  const [sort, setSort] = React.useState([]);

  // table columns
  const [allColumns, setAllColumns] = React.useState([]);
  const [visibleColumns, setVisibleColumns] = React.useState([]);
  const [searchColumns, setSearchColumns] = React.useState([]);
  const columns = React.useMemo(() => getContentColumns(visibleColumns), [visibleColumns]);

  // get single view
  const getSingleView = async (viewId, paginationProps) => {
    try {
      setLoading(true);
      const viewPagination = paginationProps ? paginationProps : pagination;
      const res = await getSingleContentView(viewId, viewPagination);
      if (res.success) {
        setRecords(res.data.data.map((row) => defaultContent(row)) || []);
        setTotalRecords(res.data.count);
        setSelectedViewData(res.data);
        setFilters(res.data.meta?.filters || []);
        setGate(res.data.meta?.gate || 'and');
        setSort(res.data.meta?.sort || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  async function updateView(props) {
    const viewFilters = props.filters ? props.filters : filters;
    const viewSort = props.sort ? props.sort : sort;
    const data = {
      label: selectedViewData?.meta?.label,
      description: selectedViewData?.meta?.description,
      table: selectedViewData?.meta?.table,
      isPublic: selectedViewData?.meta?.isPublic,
      columns: selectedViewData?.meta?.columns,
      gate,
      filters: viewFilters,
      sort: viewSort,
      groups: selectedViewData?.meta?.groups,
    };
    const result = await updateContentView(viewId, data);
    return result;
  }

  // ******************************data grid handler starts*********************

  const handlePaginationModelChange = (newPaginationModel) => {
    const { page, pageSize } = newPaginationModel;
    const newPagination = { pageNo: page + 1, limit: pageSize };
    setPagination(newPagination);
    if (viewId) {
      getSingleView(viewId, newPagination);
    } else {
      fetchList({ pagination: newPagination });
    }
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

  // Column handler
  // handle column change
  const handleColumnChange = async (e, col) => {
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

    if (viewId) {
      const data = {
        columns: newVisibleColumns.map((c) => c.columnName),
        label: selectedViewData?.meta?.label,
        description: selectedViewData?.meta?.description,
        table: selectedViewData?.meta?.table,
        isPublic: selectedViewData?.meta?.isPublic,
        gate,
        filters,
        sort,
        groups: selectedViewData?.meta?.groups,
      };

      const res = await updateContentView(viewId, data);
      if (res.success) {
        getSingleView(viewId);
      }
    }
  };

  // handle Column Search
  const handleColumnSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchColumns(allColumns.filter((col) => col.label.toLowerCase().includes(searchValue)));
  };

  const showAllColumns = async () => {
    const newVisibleColumns = allColumns;
    setVisibleColumns(newVisibleColumns);

    if (viewId) {
      const data = {
        columns: allColumns.map((c) => c.columnName),
        label: selectedViewData?.meta?.label,
        description: selectedViewData?.meta?.description,
        table: selectedViewData?.meta?.table,
        isPublic: selectedViewData?.meta?.isPublic,
        gate,
        filters,
        sort,
        groups: selectedViewData?.meta?.groups,
      };

      const res = await updateContentView(viewId, data);
      if (res.success) {
        getSingleView(viewId);
      }
    }
  };

  const hideAllColumns = async () => {
    const newVisibleColumns = visibleColumns.filter((col) => col.columnName === 'id');
    setVisibleColumns(newVisibleColumns);

    if (viewId) {
      const data = {
        columns: ['id'],
        label: selectedViewData?.meta?.label,
        description: selectedViewData?.meta?.description,
        table: selectedViewData?.meta?.table,
        isPublic: selectedViewData?.meta?.isPublic,
        gate,
        filters,
        sort,
        groups: selectedViewData?.meta?.groups,
      };

      const res = await updateContentView(viewId, data);
      if (res.success) {
        getSingleView(viewId);
      }
    }
  };


  // FILTERS
  // handle filter apply
  const handleFilterApply = async () => {
    if (viewId) {
      updateView({ filters }).then(() => {
        getSingleView(viewId);
      });
    } else {
      fetchList(filters);
    }
  };

  // handle remove filter condition
  const handleRemoveFilterCondition = (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
    if (viewId) {
      updateView({ filters: newFilters }).then(() => {
        getSingleView(viewId);
      });
    } else {
      fetchList(newFilters);
    }
  };

  // handle clear filters
  const handleClearFilters = () => {
    setFilters([]);
    if (viewId) {
      updateView({ filters: [] }).then(() => {
        getSingleView(viewId);
      });
    } else {
      fetchList([]);
    }
  };


  // initialize
  const initialize = async () => {
    try {
      setLoading(true);
      const campaigns = await getContentList({
        page: 1,
        rowsPerPage: 1,
      });

      // set meta data
      setMetaData(campaigns.meta);
      const columns = campaigns.meta.map((obj) => {
        const key = Object.keys(obj)[0];
        return {
          label: obj[key].label,
          columnName: key,
          type: obj[key].type,
          depth: obj[key].depth,
        };
      });

      setAllColumns(columns);

      // set views
      const viewsData = await getContentViews();
      setViews(viewsData.data);
      if (viewsData.success) {
        const firstView = viewsData.data?.find((view) => view?.id === viewId) || viewsData.data[0];
        await getSingleView(firstView?.id, pagination);
        router.push(`?tab=content&view=${firstView?.id}`);
      } else {
        const payload = {
          label: 'Default View',
          description: 'Default View',
          table: 'CONTENT',
          gate: 'and',
          isPublic: true,
          filters: [],
          columns: columns.map((col) => col.columnName),
          sort: [],
          groups: [],
        };

        const res = await createContentView(payload);

        if (res.success) {
          const createViewData = res?.data;
          setViews([
            {
              id: createViewData?.id,
              table: createViewData?.table,
              isPublic: createViewData?.isPublic,
              label: createViewData?.label,
              description: createViewData?.description,
              CreatedByUser: {},
              createdAt: createViewData?.createdAt,
            },
          ]);
          await getSingleView(res.data.id, pagination);
          router.push(`?tab=content&view=${res.data.id}`);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // update visible columns
  React.useEffect(() => {
    if (allColumns.length === 0) return;
    if (viewId && selectedViewData) {
      const selectedColumnNames = selectedViewData.meta?.columns || [];
      const filtered = allColumns.filter((col) => selectedColumnNames.includes(col.columnName));
      setVisibleColumns(filtered);
    } else {
      setVisibleColumns(allColumns);
    }
    setSearchColumns(allColumns);
  }, [viewId, selectedViewData, allColumns]);

  // Watch for URL viewId change
  React.useEffect(() => {
    setPagination((prev) => ({ ...prev, pageNo: 1 }));
    initialize();
  }, []);

  React.useEffect(() => {
    if (selectedViewId) {
      getSingleView(selectedViewId, pagination);
    }
  }, [selectedViewId]);


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
              handleFilterApply={handleFilterApply}
              handleRemoveFilterCondition={handleRemoveFilterCondition}
              handleClearFilters={handleClearFilters}
              loading={loading}
            />

            <Button startIcon={<Iconify icon="eva:grid-outline" width={16} height={16} />} variant="text" size="small">
              Group
            </Button>
            <TableSortBuilder
              allColumns={allColumns}
              sort={sort}
              setSort={setSort}
              updateView={updateView}
              fetchList={fetchList}
              getSingleView={getSingleView}
            />
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
            setSort={setSort}
            setFilters={setFilters}
            setPagination={setPagination}
            columns={allColumns}
            selectedView={selectedViewData}
            setSelectedViewId={setSelectedViewId}
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
        <Box sx={{ width: 250 }}>
          <Box sx={{ p: 1.5, backgroundColor: 'background.paper' }}>
            <TextField
              fullWidth
              placeholder="Find fields..."
              variant="outlined"
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
              onChange={(e) => handleColumnSearch(e)}
            />
          </Box>
          <FormGroup
            sx={{
              gap: 0.5,
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 'auto',
              flexWrap: 'nowrap',
              maxHeight: 250,
              overflowY: 'auto',
              scrollbarWidth: 'thin',
            }}
          >
            {searchColumns
              .filter((col) => col.columnName !== 'id')
              ?.map((col) => {
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
            <Button variant="outlined" size="small" onClick={hideAllColumns}>
              Hide all
            </Button>
            <Button variant="contained" size="small" onClick={showAllColumns}>
              Show all
            </Button>
          </Box>
        </Box>
      </Popover>
    </PageContainer>
  );
}
