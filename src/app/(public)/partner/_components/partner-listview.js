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


  // update partner after images uploaded
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

  // update or create partner 
  const processRowUpdate = React.useCallback(async (newRow, oldRow) => {
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow;

    const isTemporaryId = typeof newRow.id === 'string' && newRow.id.startsWith('temp_');

    if (isTemporaryId) {
      if (!newRow.name) {
        toast.error("Please enter name");
        return newRow;
      }

      if (!newRow.email) {
        toast.error("Please enter email");
        return newRow;
      }

      await createPartnerAsync(newRow);
      fetchList();
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
      id: tempId,
      name: '',
      email: '',
      currentStatus: [],
      journeyStep: '',
      profileStatus: [],
      notes: '',
      hourlyRate: '',
      bookingLink: '',
      ageBracket: [],
      linkedinConnections: 0,
      X: '',
      XFollowing: 0,
      website: '',
      medium: '',
      soundcloud: '',
      spotify: '',
      opentoGifting: '',
      occupation: '',
      client: '',
      linkedin: '',
      mailingAddress: '',
      phone: '',
      pinterest: '',
      podcast: '',
      refusalReason: '',
      twitch: '',
      revoAmazonOrderConfirmationNumber: '',
      amazonReviewLink: '',
      amazonReviewCupper: '',
      amazonReviewThePill: '',
      amazonStorefront: '',
      deliverables: '',
      googleDriveFiles: '',
      revoIGPost: '',
      partnerIGRate: '',
      partnerTTRate: '',
      partnerYTRate: '',
      amountPaid: '',
      totalContributedEngagementByContent: '0',
      totalAudience: '',
      platformDeliverables:
        [],
      platforms: [],
      previousCollabExpense: '',
      revoOffer: '',
      remainingCredits: 0,
      ttPost: '',
      totalROI: '',
      ugcPaymentStatus: '',
      ugcRetainerAmount: 0,
      ugcTikTokLink: '',
      revoUGCArmyTTUsernamePW: '',
      whatsApp: '',
      ytPost: '',
      partnerPostViews: 0,
      sourcedFrom: [],
      estimatedTaxes: '',
      fbaXLevanta: 0,
      shippingFBAFeeGiftedPartners: '',
      levantaAffiliateFee: '',
      paypalFee: '',
      shippingExpense: '',
      amazonReferralFee: '',
      amazonOrderTotal: '',
      amazonTax: '',
      amazonKickback: '',
      monthSourced: '',
      secondPaymentDate: '',
      clientStatus: '',
      linktree: '',
      partnerUGCRate: '',
      partner360Rate: '',
      revoCounteroffer: '',
      opentoWhitelisting: '',
      conversionsBundleCupper: 0,
      conversionsMassageGun: 0,
      conversionsCupper: 0,
      conversionsOils: 0,
      conversionsWalkingPad: 0,
      amazonReviewWalkingPadPro: '',
      amazonReviewWalkingPadStandard: '',
      amazonReviewOil: '',
      amazonReviewSoothingCream: '',
      amazonReviewBeautyWand: '',
      contracts: [],
      paymentLink: '',
      totalExpense: '0',
      totalProductCOGExpense: '0',
      affiliatePlatform: [],
      profileImage: [],
      mediaKit: [],
      receipts: [],
    };

    setPartners((prev) => [newPartner, ...prev]);
  };

  // Column delete
  const handleDelete = async (password) => {
    fetchList()
    // const idsToDelete = [];
    // selectedRows.forEach((row) => {
    //   idsToDelete.push(row.id);
    // });
    // const response = await deletePartnerAsync(idsToDelete[0]);
    // if (response.success) {
    //   fetchList();
    // }
  };


  return (
    <PageContainer>
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
              id={selectedRows.map((row) => row.id)[0]}
              disabled={selectedRows.length === 0}
              deleteFn={deletePartnerAsync}
            />
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
