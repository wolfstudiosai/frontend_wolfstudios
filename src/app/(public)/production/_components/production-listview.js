'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import TableReorderIcon from '@mui/icons-material/Reorder';
import {
  alpha,
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Popover,
  TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { toast } from 'sonner';

import TableFilterBuilder from '/src/components/common/table-filter-builder';
import TableSortBuilder from '/src/components/common/table-sort-builder';
import TableView from '/src/components/common/table-view';
import { PageContainer } from '/src/components/container/PageContainer';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { EditableDataTable } from '/src/components/data-table/editable-data-table';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import { Iconify } from '/src/components/iconify/iconify';
import { MediaUploader } from '/src/components/uploaders/media-uploader';

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
import { useProductionColumns } from '../hooks/use-production-columns';
import { defaultProduction } from '../../production/_lib/production.types';
import { convertArrayObjIntoArrOfStr } from '/src/utils/convertRelationArrays';
import useSWR from 'swr';

export const ProductionListView = () => {
  const theme = useTheme();
  const anchorEl = React.useRef(null);
  const router = useRouter();
  const [anchorElHide, setAnchorElHide] = React.useState(null);
  const singleImageField = ['thumbnailImage'];
  const [isImageUploadOpen, setIsImageUploadOpen] = React.useState(false);
  const [mediaToShow, setMediaToShow] = React.useState({
    type: '',
    url: '',
  });
  const [imageUpdatedField, setImageUpdatedField] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const viewId = searchParams.get('view');

  const handleUploadModalOpen = (data, field, uploadOpen) => {
    setOpen(true);
    setImageUpdatedField(field);
    setUpdatedRow(data);
    setIsImageUploadOpen(uploadOpen);
  };

  const handleClosePopover = () => {
    anchorEl.current = null;
    setMediaToShow({
      type: '',
      url: '',
    });
  };

  const handleClosePopoverHide = () => {
    setAnchorElHide(null);
    setNewVisibleColumns(visibleColumns);
    setSearchColumns(allColumns);
  };


  // update partner after images uploaded
  const handleUploadImage = async (images) => {
    try {
      const finalData = convertArrayObjIntoArrOfStr(updatedRow, [
        'spaces',
        'stakeholders',
        'contributingPartners',
        'campaigns',
        'products',
        'proposedSpaces',
        'proposedPartners',
      ]);

      if (singleImageField.includes(imageUpdatedField)) {
        finalData[imageUpdatedField] = images[0];
      } else {
        finalData[imageUpdatedField] = [...finalData[imageUpdatedField], ...images];
      }

      const res = await updateProductionAsync(finalData);

      if (res.success) {
        setOpen(false);
        getSingleView(viewId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [records, setRecords] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 20 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [updatedRow, setUpdatedRow] = React.useState(null);

  // View
  const [showView, setShowView] = React.useState(false);
  const [views, setViews] = React.useState([]);
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
  const [newVisibleColumns, setNewVisibleColumns] = React.useState(visibleColumns);
  const [searchColumns, setSearchColumns] = React.useState([]);
  const columns = useProductionColumns(anchorEl, visibleColumns, setMediaToShow, handleUploadModalOpen);

  // SWR
  const {
    data: productions,
    error: productionsError,
    isLoading: isProductionsLoading,
  } = useSWR(['productionList', { page: 1, rowsPerPage: 20 }], ([, params]) => getProductionListAsync(params));

  const {
    data: viewsData,
    isLoading: viewsLoading,
    error: viewsError,
    mutate: mutateViews,
  } = useSWR('productionViews', getProductionViewsAsync);

  // get single view
  const getSingleView = async (viewId, paginationProps) => {
    try {
      setLoading(true);
      const viewPagination = paginationProps ? paginationProps : pagination;
      const response = await getSingleProductionViewAsync(viewId, viewPagination);

      if (response.success) {
        setRecords(response.data.data.map((row) => defaultProduction(row)) || []);
        setTotalRecords(response.data.count);
        setSelectedViewData(response.data);
        setFilters(response.data.meta?.filters || []);
        setGate(response.data.meta?.gate || 'and');
        setSort(response.data.meta?.sort || []);
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
    await updateProductionViewAsync(viewId, data);
  }

  // ******************************data grid handler starts*********************

  const handlePaginationModelChange = (newPaginationModel) => {
    const { page, pageSize } = newPaginationModel;
    const newPagination = { pageNo: page + 1, limit: pageSize };
    setPagination(newPagination);
    if (viewId) {
      getSingleView(viewId, newPagination);
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

      await createProductionAsync(newRow).then(() => getSingleView(viewId));
    } else {
      const finalData = convertArrayObjIntoArrOfStr(newRow, [
        'spaces',
        'stakeholders',
        'contributingPartners',
        'campaigns',
        'products',
        'proposedSpaces',
        'proposedPartners',
      ]);

      const numericFields = [
        'totalExpense',
        'spaceExpense',
        'talentExpense',
        'crewExpense',
        'foodExpense',
        'equipmentExpense',
        'reimbursments',
        'wardrobeExpense',
        'directorExpense',
        'producerExpense',
      ];

      for (const field of numericFields) {
        const value = newRow[field];
        if (value) {
          finalData[field] = Number(value);
        }
      }

      finalData.thumbnailImage = Array.isArray(finalData.thumbnailImage)
        ? finalData.thumbnailImage[0]
        : finalData.thumbnailImage;

      await updateProductionAsync(finalData).then(() => getSingleView(viewId));
    }

    return newRow;
  }, [viewId]);

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

  const handleDelete = async () => getSingleView(viewId);

  const handleColumnChange = async (e, col) => {
    let columns = [...newVisibleColumns];
    if (e.target.checked) {
      const exists = columns.some((c) => c.columnName === col.columnName);
      if (exists) return;
      columns = [...columns, col];
    } else {
      columns = columns.filter((c) => c.columnName !== col.columnName);
    }
    setNewVisibleColumns(columns);
  };

  // handle Column Search
  const handleColumnSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchColumns(allColumns.filter((col) => col.label.toLowerCase().includes(searchValue)));
  };

  // handle show all columns
  const showAllColumns = async () => {
    const newVisibleColumns = allColumns;
    setNewVisibleColumns(newVisibleColumns);
  };

  // handle hide all columns
  const hideAllColumns = async () => {
    const newVisibleColumns = visibleColumns.filter((col) => col.columnName === 'id');
    setNewVisibleColumns(newVisibleColumns);
  };

  const handleSaveColumns = async () => {
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

      const res = await updateProductionViewAsync(viewId, data);
      if (res.success) {
        getSingleView(viewId);
        handleClosePopoverHide();
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
    }
  };

  // handle clear filters
  const handleClearFilters = () => {
    setFilters([]);
    if (viewId) {
      updateView({ filters: [] }).then(() => {
        getSingleView(viewId);
      });
    }
  };


  const initialize = async () => {
    try {
      setLoading(true);
      // set meta data
      setMetaData(productions.meta);
      const columns = productions.meta.map((obj) => {
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
      setViews(viewsData.data);
      if (viewsData.success) {
        const firstView = viewsData.data?.find((view) => view?.id === viewId) || viewsData.data[0];
        await getSingleView(firstView?.id, pagination);

        if (!viewId) {
          router.push(`?tab=production&view=${firstView?.id}`);
        }
      } else {
        const payload = {
          label: 'Default View',
          description: 'Default View',
          table: 'PRODUCTION',
          gate: 'and',
          isPublic: true,
          filters: [],
          columns: columns.map((col) => col.columnName),
          sort: [],
          groups: [],
        };

        const res = await createProductionViewAsync(payload);

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
          router.push(`?tab=production&view=${res.data.id}`);
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
      setNewVisibleColumns(filtered);
    } else {
      setVisibleColumns(allColumns);
      setNewVisibleColumns(allColumns);
    }
    setSearchColumns(allColumns);
  }, [viewId, selectedViewData, allColumns]);

  // Watch for URL viewId change
  React.useEffect(() => {
    setPagination((prev) => ({ ...prev, pageNo: 1 }));
    if (searchParams.get('tab') !== 'production') return;
    if (!isProductionsLoading && !viewsLoading) {
      initialize();
    }
  }, [viewId, isProductionsLoading, viewsLoading]);

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
            />

            <Button startIcon={<Iconify icon="eva:grid-outline" width={16} height={16} />} variant="text" size="small">
              Group
            </Button>
            <TableSortBuilder
              allColumns={allColumns}
              sort={sort}
              setSort={setSort}
              updateView={updateView}
              getSingleView={getSingleView}
            />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <IconButton onClick={handleAddNewItem}>
              <AddIcon />
            </IconButton>
            <Box>
              <RefreshPlugin onClick={() => getSingleView(viewId)} />
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
          {mediaToShow?.type === 'image' && (
            <Image src={mediaToShow?.url} alt="Preview" width={300} height={300} style={{ borderRadius: 8 }} />
          )}
          {mediaToShow?.type === 'video' && (
            <video src={mediaToShow?.url} controls style={{ height: 300, width: 300, borderRadius: 8 }} />
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
                        checked={newVisibleColumns.some((c) => c.columnName === col.columnName)}
                        onChange={(e) => handleColumnChange(e, col)}
                      />
                    }
                    label={col.label}
                  />
                );
              })}
          </FormGroup>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button variant="outlined" size="small" onClick={hideAllColumns}>
                Hide all
              </Button>
              <Button variant="outlined" size="small" onClick={showAllColumns}>
                Show all
              </Button>
            </Box>
            <Button variant="contained" size="small" onClick={handleSaveColumns}>
              Save
            </Button>
          </Box>
        </Box>
      </Popover>

      {/* Image upload dialog */}
      <MediaUploader
        open={open}
        onClose={() => setOpen(false)}
        onSave={(paths) => handleUploadImage([...paths])}
        multiple={!singleImageField.includes(imageUpdatedField)}
        hideVideoUploader={isImageUploadOpen}
        hideImageUploader={!isImageUploadOpen}
        folderName="partner-HQ"
      />
    </PageContainer>
  );
};
