'use client';

import * as React from 'react';
import { alpha, Box, Button, Card, Checkbox, FormControlLabel, FormGroup, IconButton, Popover, TextField } from '@mui/material';
import { PageContainer } from '/src/components/container/PageContainer';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { EditableDataTable } from '/src/components/data-table/editable-data-table';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';

import {
  createProductionAsync,
  createProductionViewAsync,
  deleteProductionAsync,
  getProductionListAsync,
  getProductionViewsAsync,
  getSingleProductionViewAsync,
  updateProductionAsync,
  updateProductionViewAsync,
} from '../_lib/production.action';
import AddIcon from '@mui/icons-material/Add';
import { defaultProduction } from '../../production/_lib/production.types';
import { getProductionColumns } from '../_utils/get-production-columns';
import Image from 'next/image';
import { MediaUploader } from '/src/components/uploaders/media-uploader';
import { toast } from 'sonner';
import TableFilterBuilder from '/src/components/common/table-filter-builder';
import TableSortBuilder from '/src/components/common/table-sort-builder';
import TableView from '/src/components/common/table-view';
import { useTheme } from '@mui/material/styles';
import { Iconify } from '/src/components/iconify/iconify';
import { useSearchParams, useRouter } from 'next/navigation';
import TableReorderIcon from '@mui/icons-material/Reorder';

export const ProductionListView = () => {
  const theme = useTheme();
  const anchorEl = React.useRef(null);
  const router = useRouter();
  const [anchorElHide, setAnchorElHide] = React.useState(null);
  const [imageToShow, setImageToShow] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClosePopover = () => {
    anchorEl.current = null;
    setImageToShow(null);
  };

  const handleClosePopoverHide = () => {
    setAnchorElHide(null);
    setSearchColumns(allColumns);
  };

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
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const [selectedView, setSelectedView] = React.useState(null);

  // filter
  const [metaData, setMetaData] = React.useState([]);
  const [filters, setFilters] = React.useState([]);
  const [gate, setGate] = React.useState('and');
  const [sort, setSort] = React.useState([]);

  // table columns
  const [allColumns, setAllColumns] = React.useState([]);
  const [visibleColumns, setVisibleColumns] = React.useState([]);
  const [searchColumns, setSearchColumns] = React.useState([]);
  const columns = React.useMemo(() => getProductionColumns(visibleColumns), [visibleColumns]);

  async function fetchList(props) {
    const filter = props ? props : filters;
    const paginationData = props ? props.pagination : pagination;
    try {
      setLoading(true);
      const response = await getProductionListAsync({
        page: paginationData.pageNo,
        rowsPerPage: paginationData.limit,
      }, filter, gate);

      if (response.success) {
        if (view) {
          setMetaData(response.meta);
        } else {
          setRecords(response.data.map((row) => defaultProduction(row)) || []);
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

  // get single view
  const getSingleView = async (viewId, paginationProps) => {
    try {
      setLoading(true);
      const viewPagination = paginationProps ? paginationProps : pagination;
      const response = await getSingleProductionViewAsync(viewId, viewPagination);

      if (response.success) {
        setRecords(response.data.data.map((row) => defaultProduction(row)) || []);
        setTotalRecords(response.data.count);
        setSelectedView(response.data);
        setFilters(response.data.meta?.filters || []);
        setGate(response.data.meta?.gate || 'and');
        setSort(response.data.meta?.sort || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateView(props) {
    const viewFilters = props.filters ? props.filters : filters;
    const viewSort = props.sort ? props.sort : sort;

    const data = {
      label: selectedView?.meta?.label,
      description: selectedView?.meta?.description,
      table: selectedView?.meta?.table,
      isPublic: selectedView?.meta?.isPublic,
      columns: selectedView?.meta?.columns,
      gate,
      filters: viewFilters,
      sort: viewSort,
      groups: selectedView?.meta?.groups
    }
    await updateProductionViewAsync(view, data);
  }

  // ******************************data grid handler starts*********************

  const handlePaginationModelChange = (newPaginationModel) => {
    const { page, pageSize } = newPaginationModel;
    const newPagination = { pageNo: page + 1, limit: pageSize };
    setPagination(newPagination);
    if (view) {
      getSingleView(view, newPagination);
    } else {
      fetchList({ pagination: newPagination });
    }
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

  const handleAddNewItem = () => {
    const tempId = `temp_${Date.now()}`;
    const newRow = { ...defaultProduction, id: tempId };
    setRecords([newRow, ...records]);
  };

  const handleDelete = async () => {
    fetchList();
  };

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

    if (view) {
      const data = {
        columns: newVisibleColumns.map((c) => c.columnName),
        label: selectedView?.meta?.label,
        description: selectedView?.meta?.description,
        table: selectedView?.meta?.table,
        isPublic: selectedView?.meta?.isPublic,
        gate,
        filters,
        sort: selectedView?.meta?.sort,
        groups: selectedView?.meta?.groups
      };

      const res = await updateProductionViewAsync(view, data);
      if (res.success) {
        getSingleView(view);
      }
    }
  }

  // handle Column Search
  const handleColumnSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchColumns(allColumns.filter((col) => col.label.toLowerCase().includes(searchValue)));
  }

  const showAllColumns = async () => {
    const newVisibleColumns = allColumns;
    setVisibleColumns(newVisibleColumns);

    if (view) {
      const data = {
        columns: allColumns.map((c) => c.columnName),
        label: selectedView?.meta?.label,
        description: selectedView?.meta?.description,
        table: selectedView?.meta?.table,
        isPublic: selectedView?.meta?.isPublic,
        gate,
        filters,
        sort,
        groups: selectedView?.meta?.groups
      };

      const res = await updateProductionViewAsync(view, data);
      if (res.success) {
        getSingleView(view);
      }
    }
  }

  const hideAllColumns = async () => {
    const newVisibleColumns = visibleColumns.filter((col) => col.columnName === 'id');
    setVisibleColumns(newVisibleColumns);

    if (view) {
      const data = {
        columns: ['id'],
        label: selectedView?.meta?.label,
        description: selectedView?.meta?.description,
        table: selectedView?.meta?.table,
        isPublic: selectedView?.meta?.isPublic,
        gate,
        filters,
        sort,
        groups: selectedView?.meta?.groups
      };

      const res = await updateProductionViewAsync(view, data);
      if (res.success) {
        getSingleView(view);
      }
    }
  }

  // FILTERS
  // handle filter apply
  const handleFilterApply = async () => {
    if (view) {
      updateView({ filters }).then(() => {
        getSingleView(view)
      });
    } else {
      fetchList(filters);
    }
  }

  // handle remove filter condition
  const handleRemoveFilterCondition = (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
    if (view) {
      updateView({ filters: newFilters }).then(() => {
        getSingleView(view)
      });
    } else {
      fetchList(newFilters);
    }
  };

  // handle clear filters
  const handleClearFilters = () => {
    setFilters([]);
    if (view) {
      updateView({ filters: [] }).then(() => {
        getSingleView(view)
      });
    } else {
      fetchList([]);
    }
  };

  // initialize
  const initialize = async () => {
    try {
      setLoading(true)
      const portfolios = await getProductionListAsync({
        page: 1,
        rowsPerPage: 1,
      });

      // set meta data
      setMetaData(portfolios.meta)
      const columns = portfolios.meta.map(obj => {
        const key = Object.keys(obj)[0];
        return {
          label: obj[key].label,
          columnName: key,
          type: obj[key].type,
          depth: obj[key].depth
        };
      });

      setAllColumns(columns);

      // set views
      const viewsData = await getProductionViewsAsync();
      setViews(viewsData.data)

      const viewId = searchParams.get('view');

      if (viewId) {
        getSingleView(viewId, pagination)
      } else if (viewsData.data.length > 0) {
        getSingleView(viewsData.data[0].id, pagination)
        router.push(`?tab=production&view=${viewsData.data[0].id}`);
      } else {
        const payload = {
          label: 'Default View',
          description: 'Default View',
          table: 'PRODUCTION',
          gate: 'and',
          isPublic: true,
          filters: [],
          columns: columns.map(col => col.columnName),
          sort: [],
          groups: []
        }
        const res = await createProductionViewAsync(payload);
        if (res.success) {
          const response = await getProductionViewsAsync();
          setViews(response.data)
          getSingleView(res.data.id, pagination)
          router.push(`?tab=production&view=${res.data.id}`);
        }
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  // update visible columns
  React.useEffect(() => {
    if (allColumns.length === 0) return;
    if (view && selectedView) {
      const selectedColumnNames = selectedView.meta?.columns || [];
      const filtered = allColumns.filter(col => selectedColumnNames.includes(col.columnName));
      setVisibleColumns(filtered);
    } else {
      setVisibleColumns(allColumns);
    }
    setSearchColumns(allColumns);
  }, [view, selectedView, allColumns]);

  // Watch for URL viewId change
  React.useEffect(() => {
    setPagination(prev => ({ ...prev, pageNo: 1 }));
    initialize()
  }, [searchParams]);

  return (
    <PageContainer>
      <Card sx={{ borderRadius: 0, minHeight: 'calc(100vh - 150px)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ padding: '5px 10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button
              startIcon={<TableReorderIcon />}
              variant="text"
              size="small"
              onClick={() => setShowView(prev => !prev)}
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
            />

            <Button
              startIcon={<Iconify icon="eva:grid-outline" width={16} height={16} />}
              variant="text"
              size="small"
            >
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
              onDelete={() => handleDelete()}
              passwordInput
              disabled={selectedRows.length === 0}
              id={selectedRows.map((row) => row.id)}
              deleteFn={deleteProductionAsync}
            />
          </Box>
        </Box>

        <Box display='flex' justifyContent='center' alignItems='start'>
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
              pageSizeOptions={[20, 30, 50]}
              paginationModel={{ page: pagination.pageNo - 1, pageSize: pagination.limit }}
              onPageChange={handlePaginationModelChange}
              checkboxSelection={true}
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
          <FormGroup sx={{ gap: 0.5, p: 1, display: 'flex', flexDirection: 'column', minHeight: 'auto', flexWrap: 'nowrap', maxHeight: 250, overflowY: 'auto', scrollbarWidth: 'thin' }}>
            {searchColumns.filter((col) => col.columnName !== 'id')?.map((col) => {
              return <FormControlLabel
                key={col.field}
                control={<Checkbox
                  checked={visibleColumns.some((c) => c.columnName === col.columnName)}
                  onChange={e => handleColumnChange(e, col)}
                />}
                label={col.label}
              />
            })}
          </FormGroup>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={hideAllColumns}
            >
              Hide all
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={showAllColumns}
            >
              Show all
            </Button>
          </Box>
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