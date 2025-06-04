'use client';

import * as React from 'react';
import { Box, Button, Card, IconButton, Popover, TextField } from '@mui/material';

import { PageContainer } from '/src/components/container/PageContainer';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { EditableDataTable } from '/src/components/data-table/editable-data-table';
import PageLoader from '/src/components/loaders/PageLoader';

import { createPartnerAsync, deletePartnerAsync, getPartnerListAsync, updatePartnerAsync } from '../_lib/partner.actions';
import { defaultPartner } from '../_lib/partner.types';
import { ManagePartnerRightPanel } from './manage-partner-right-panel';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';
import Image from 'next/image';
import { getPartnerColumns } from '../_utils/get-partner-columns';
import { MediaUploader } from '/src/components/uploaders/media-uploader';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'sonner';

export const PartnerListView = () => {
  // Image upload popover
  const anchorEl = React.useRef(null);
  const [imageToShow, setImageToShow] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleUploadModalOpen = (data) => {
    setOpen(true);
    setUpdatedRow(data);
  };

  // Table column
  const columns = getPartnerColumns({
    anchorEl,
    setImageToShow,
    handleUploadModalOpen
  });

  // Partner data handler
  const [partners, setPartners] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 20 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [filteredValue, setFilteredValue] = React.useState(columns.map((col) => col.field));
  const [openDetails, setOpenDetails] = React.useState(null);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [updatedRow, setUpdatedRow] = React.useState(null);
  const requiredFields = ["name", "email"];

  const handleClosePopover = () => {
    anchorEl.current = null;
    setImageToShow(null);
  };

  async function fetchList() {
    try {
      setLoading(true);
      const response = await getPartnerListAsync({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit,
      });
      if (response.success) {
        setPartners(response.data);
        setTotalRecords(response.totalRecords);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }


  const handleUploadImage = async (images) => {
    try {
      const newData = {
        ...updatedRow,
        profileImage: [...updatedRow.profileImage, ...images]
      }
      await updatePartnerAsync(newData);
    } catch (error) {
      console.log(error)
    } finally {
      fetchList();
    }
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
      if (!requiredFields.every((field) => newRow[field])) {
        toast.error("Please fill all required fields");
      } else {
        await createPartnerAsync(newRow);
        fetchList();
      }
    } else {
      await updatePartnerAsync(newRow);
      fetchList();
    }
    return newRow;
  }, []);

  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log({ children: error.message, severity: 'error' });
  }, []);

  // ******************************data grid handler ends*********************

  const visibleColumns = columns.filter((col) => filteredValue.includes(col.field));

  React.useEffect(() => {
    const storedHiddenColumns = localStorage.getItem('hiddenColumns');
    if (storedHiddenColumns) {
      setFilteredValue(JSON.parse(storedHiddenColumns));
    }
  }, []);

  const handleRowSelection = (newRowSelectionModel) => {
    const selectedData = newRowSelectionModel.map((id) => partners.find((row) => row.id === id));
    setSelectedRows(selectedData);
  };

  React.useEffect(() => {
    fetchList();
  }, [pagination]);

  // new column added
  const handleAddNewItem = () => {
    const tempId = `temp_${Date.now()}`;
    const newPartner = {
      ...defaultPartner(),
      id: tempId
    };

    setPartners((prev) => [newPartner, ...prev]);
  };

  // Column delete
  const handleDelete = async (password) => {
    const idsToDelete = [];
    selectedRows.forEach((row) => {
      idsToDelete.push(row.id);
    });
    // const response = await deletePartnerAsync(idsToDelete);
    // if (response.success) {
    //   fetchList();
    // }
  };


  return (
    <PageContainer>
      <PageLoader loading={loading}>
        <Card sx={{ borderRadius: 0 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ padding: '5px 10px' }}>
            <TextField placeholder="Search..." size='small' sx={{ width: 300 }} />
            <Box display="flex" alignItems="center">
              <IconButton onClick={handleAddNewItem}>
                <AddIcon />
              </IconButton>
              <RefreshPlugin onClick={fetchList} />
              <DeleteConfirmationPasswordPopover
                title={`Are you sure you want to delete ${selectedRows.length} record(s)?`}
                onDelete={(password) => handleDelete(password)}
                passwordInput
                disabled={selectedRows.length === 0} />
            </Box>
          </Box>

          <Box sx={{ overflowX: 'auto', height: '100%', width: '100%' }}>
            <EditableDataTable
              columns={visibleColumns}
              rows={partners?.map((row) => defaultPartner(row)) || []}
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              loading={loading}
              rowCount={totalRecords}
              checkboxSelection
              pageSizeOptions={[10, 20, 30]}
              paginationModel={{ page: pagination.pageNo - 1, pageSize: pagination.limit }}
              onPageChange={handlePaginationModelChange}
              onRowSelectionModelChange={handleRowSelection}
            />
          </Box>
        </Card>
        <ManagePartnerRightPanel
          open={openDetails ? true : false}
          onClose={() => setOpenDetails(null)}
          data={openDetails}
          fetchList={fetchList}
        />
      </PageLoader>

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
  );
};
