'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import TableReorderIcon from '@mui/icons-material/Reorder';
import { Checkbox, FormControlLabel, FormGroup, IconButton, Popover, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { alpha, useTheme } from '@mui/material/styles';
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
  createPortfolioAsync,
  createPortfolioView,
  deletePortfolioAsync,
  updatePortfolioAsync,
  updatePortfolioView,
} from '../_lib/portfolio.actions';
import { defaultPortfolio } from '../_lib/portfolio.types';
import { usePortfolioColumns } from '../hooks/use-portfolio-columns';
import { convertArrayObjIntoArrOfStr } from '../../../../utils/convertRelationArrays';
import { useRecordPortfolioList } from '../hooks/use-record-portfolio-list';
import { usePortfolioView } from '../hooks/use-portfolio-view';
import { usePortfolioViews } from '../hooks/use-portfolio-views';

export const PortfolioListView = () => {
  const theme = useTheme();
  const router = useRouter();
  const anchorEl = React.useRef(null);
  const hasInitialized = React.useRef(false);
  const [anchorElHide, setAnchorElHide] = React.useState(null);
  const [mediaToShow, setMediaToShow] = React.useState({
    type: '',
    url: '',
  });
  const singleImageField = ['thumbnailImage', 'videoLink'];
  const [imageUpdatedField, setImageUpdatedField] = React.useState(null);
  const [isImageUploadOpen, setIsImageUploadOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const viewId = searchParams.get('view');

  const handleUploadModalOpen = React.useCallback((data, field, uploadOpen) => {
    setOpen(true);
    setUpdatedRow(data);
    setImageUpdatedField(field);
    setIsImageUploadOpen(uploadOpen);
  }, []);

  const handleClosePopover = () => {
    anchorEl.current = null;
    setMediaToShow({
      type: '',
      url: '',
    });
  };

  const handleClosePopoverHide = () => {
    setAnchorElHide(null);
    setSearchColumns(allColumns);
    setNewVisibleColumns(visibleColumns);
  };

  const handleUploadImage = async (images) => {
    try {
      const finalData = convertArrayObjIntoArrOfStr(updatedRow, [
        'portfolioCategories',
        'states',
        'countries',
        'partnerHQ',
        'caseStudies',
      ]);

      if (singleImageField.includes(imageUpdatedField)) {
        finalData[imageUpdatedField] = images[0];
      } else {
        finalData[imageUpdatedField] = [...finalData[imageUpdatedField], ...images];
        for (const key of singleImageField) {
          finalData[key] = Array.isArray(finalData[key]) ? finalData[key][0] : finalData[key];
        }
      }

      const response = await updatePortfolioAsync(updatedRow.id, finalData);
      if (response.success) {
        setOpen(false);
        refreshAllPortfolioView();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // table columns
  const [records, setRecords] = React.useState([]);
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
  const columns = usePortfolioColumns(anchorEl, visibleColumns, setMediaToShow, handleUploadModalOpen);

  // SWR
  const { portfolioMeta, columns: portfolioColumns, isPortfoliosLoading } = useRecordPortfolioList();
  const { singleView, isSingleViewLoading, refreshViewData, refreshAllPortfolioView } = usePortfolioView(selectedViewId, pagination);
  const { viewsData, isViewsLoading } = usePortfolioViews();

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
    const result = await updatePortfolioView(viewId, data);
    return result;
  }

  // ******************************data grid handler starts*********************

  const handlePaginationModelChange = React.useCallback((newPaginationModel) => {
    const { page, pageSize } = newPaginationModel;
    const newPagination = { pageNo: page + 1, limit: pageSize };
    setPagination(newPagination);
  }, []);

  const processRowUpdate = React.useCallback(async (newRow, oldRow) => {
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow;

    const isTemporaryId = typeof newRow.id === 'string' && newRow.id.startsWith('temp_');

    let res;

    if (isTemporaryId) {
      if (!newRow.projectTitle) {
        toast.error('Please enter project title');
        return newRow;
      }

      res = await createPortfolioAsync(newRow);
    } else {
      const finalData = convertArrayObjIntoArrOfStr(newRow, [
        'portfolioCategories',
        'states',
        'countries',
        'partnerHQ',
        'caseStudies',
      ]);

      for (const key of singleImageField) {
        finalData[key] = Array.isArray(finalData[key]) ? finalData[key][0] : finalData[key];
      }

      res = await updatePortfolioAsync(newRow.id, finalData);
    }

    if (res.success) {
      refreshAllPortfolioView();
      return newRow;
    }

    return oldRow;
  }, [viewId]);

  // handle row selection
  const handleRowSelection = React.useCallback((newRowSelectionModel) => {
    const selectedData = newRowSelectionModel.map((id) => records.find((row) => row.id === id));
    setSelectedRows(selectedData);
  }, [records]);


  // handle process row update error
  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log({ children: error.message, severity: 'error' });
  }, []);
  // ******************************data grid handler ends*********************

  const handleAddNewItem = () => {
    const tempId = `temp_${Date.now()}`;
    const newRecord = { ...defaultPortfolio(), id: tempId };
    setRecords([newRecord, ...records]);
  };

  const handleDelete = async () => refreshAllPortfolioView();

  // Column handler
  // handle column change
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

      const res = await updatePortfolioView(viewId, data);
      if (res.success) {
        refreshViewData();
        handleClosePopoverHide();
      }
    }
  };

  // FILTERS
  // handle filter apply
  const handleFilterApply = async () => {
    if (viewId) {
      const res = await updateView({ filters })
      if (res.success) {
        refreshViewData();
      }
    }
  };

  // handle remove filter condition
  const handleRemoveFilterCondition = async (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
    if (viewId) {
      const res = await updateView({ filters: newFilters });
      if (res.success) {
        refreshViewData();
      }
    }
  };

  // handle clear filters
  const handleClearFilters = async () => {
    setFilters([]);
    if (viewId) {
      const res = await updateView({ filters: [] });
      if (res.success) {
        refreshViewData();
      }
    }
  };

  // initialize
  const initialize = async () => {
    try {
      // set meta data
      setMetaData(portfolioMeta);
      setAllColumns(portfolioColumns);

      // set views
      setViews(viewsData.data);

      if (viewsData.success && viewsData?.data?.length > 0) {
        const firstView = viewsData.data?.find((view) => view?.id === viewId) || viewsData.data[0];
        setSelectedViewId(firstView?.id);

        if (!viewId) {
          router.push(`?tab=portfolio&view=${firstView?.id}`);
        }
      } else {
        const payload = {
          label: 'Default View',
          description: 'Default View',
          table: 'PORTFOLIO',
          gate: 'and',
          isPublic: true,
          filters: [],
          columns: portfolioColumns.map((col) => col.columnName),
          sort: [],
          groups: [],
        };

        const res = await createPortfolioView(payload);

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

          mutate('portfolioViews');
          setSelectedViewId(res.data.id);
          router.replace(`?tab=portfolio&view=${res.data.id}`);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  // Watch for URL viewId change
  React.useEffect(() => {
    setPagination((prev) => ({ ...prev, pageNo: 1 }));
    if (searchParams.get('tab') !== 'portfolio') return;
    if (portfolioMeta && viewsData && !hasInitialized.current) {
      hasInitialized.current = true;
      initialize();
    }
  }, [portfolioMeta, viewsData, searchParams]);

  // store isView sidebar is open or not on local storage
  const handleOpenViewSidebar = () => {
    setShowView(!showView);
    localStorage.setItem('isRecordViewOpen', !showView);
  };

  React.useEffect(() => {
    if (singleView) {
      setRecords(singleView?.data?.data?.map((row) => defaultPortfolio(row)) || []);
      setTotalRecords(singleView?.data?.count);
      setSelectedViewData(singleView?.data);
      setFilters(singleView?.data?.meta?.filters || []);
      setGate(singleView?.data?.meta?.gate || 'and');
      setSort(singleView?.data?.meta?.sort || []);

      const selectedColumnNames = singleView?.data?.meta?.columns || [];
      const filtered = allColumns.filter((col) => selectedColumnNames.includes(col.columnName));

      setVisibleColumns(filtered);
      setNewVisibleColumns(filtered);
      setSearchColumns(allColumns);
    }
  }, [singleView]);

  React.useEffect(() => {
    const isViewOpen = localStorage.getItem('isRecordViewOpen');
    if (isViewOpen === 'true') {
      setShowView(true);
    }
  }, [showView]);

  return (
    <PageContainer>
      <Card sx={{ borderRadius: 0, minHeight: 'calc(100vh - 150px)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ padding: '5px' }}>
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
              loading={isSingleViewLoading || isPortfoliosLoading || isViewsLoading}
            />

            <Button startIcon={<Iconify icon="eva:grid-outline" width={16} height={16} />} variant="text" size="small">
              Group
            </Button>
            <TableSortBuilder
              allColumns={allColumns}
              sort={sort}
              setSort={setSort}
              updateView={updateView}
              refreshViewData={refreshViewData}
            />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <IconButton onClick={handleAddNewItem}>
              <AddIcon />
            </IconButton>
            <Box>
              <RefreshPlugin onClick={() => mutate(['portfolioView', viewId, pagination])} />
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
            viewsLoading={isViewsLoading}
          />

          <Box sx={{ overflowX: 'auto', height: '100%', width: '100%' }}>
            <EditableDataTable
              columns={columns}
              rows={records}
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              loading={isSingleViewLoading || isPortfoliosLoading || isViewsLoading}
              rowCount={totalRecords}
              checkboxSelection
              pagination
              paginationModel={{ page: pagination.pageNo - 1, pageSize: pagination.limit }}
              onPageChange={handlePaginationModelChange}
              pageSizeOptions={[20, 30, 50]}
              onRowSelectionModelChange={handleRowSelection}
            />
          </Box>
        </Box>
      </Card>

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
            <Image src={mediaToShow?.url} alt="Preview" width={300} height={300} style={{ borderRadius: 8, }} />
          )}
          {mediaToShow?.type === 'video' && (
            <video src={mediaToShow?.url} controls style={{ height: 300, width: 300, borderRadius: 8 }} />
          )}
        </Box>
      </Popover>

      {/* Image upload dialog */}
      <MediaUploader
        multiple={singleImageField.includes(imageUpdatedField) ? false : true}
        open={open}
        onClose={() => setOpen(false)}
        onSave={(paths) => handleUploadImage([...paths])}
        hideVideoUploader={isImageUploadOpen}
        hideImageUploader={!isImageUploadOpen}
        folderName="portfolios"
      />
    </PageContainer>
  );
};
