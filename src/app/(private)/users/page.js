'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { paths } from '/src/paths';
import { dayjs } from '/src/lib/dayjs';
import { useDebounce } from '/src/hooks/use-debounce';
import { RefreshPlugin } from '/src/components/core/plugins/RefreshPlugin';
import { DataTable } from '/src/components/data-table/data-table';
import { DeleteConfirmationPasswordPopover } from '/src/components/dialog/delete-dialog-pass-popup';

import { useAllUser } from '../../../services//users/useAllUser';
import { deleteUserAsync } from './_lib/user.actions';
import { defaultUser } from './_lib/user.types';
import { ManageUserDialog } from './manage-user-dialog';

export default function Page({}) {
  const [openModal, setOpenModal] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 10 });
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [status, setStatus] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const debounceSearch = useDebounce(searchValue, 500);

  const { users, totalRecords, isLoading, mutate } = useAllUser({
    page: pagination.pageNo,
    rowsPerPage: pagination.limit,
    status: status,
    search: debounceSearch,
  });

  const handleOpenModal = (data) => {
    setOpenModal(true);
    setModalData(data);
  };

  const handleConfirm = () => {
    setOpenModal(false);
    mutate(); // Revalidate the data
  };

  const onDelete = () => {
    mutate(); // Revalidate the data after deletion
  };

  const columns = [
    {
      formatter: (row) => (
        <Stack direction="row">
          <IconButton onClick={() => handleOpenModal(row)}>
            <PencilSimpleIcon />
          </IconButton>
        </Stack>
      ),
      name: 'Actions',
    },
    {
      formatter: (row) => (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <div>
            <Link
              color="inherit"
              component={RouterLink}
              href={paths.dashboard.customers.details('1')}
              sx={{ whiteSpace: 'nowrap' }}
              variant="subtitle2"
            >
              {row.firstName} {row.lastName}
            </Link>
            <Typography color="text.secondary" variant="body2">
              {row.email}
            </Typography>
          </div>
        </Stack>
      ),
      name: 'Name',
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.contactNumber}
        </Typography>
      ),
      name: 'Phone',
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.role}
        </Typography>
      ),
      name: 'Role',
    },
    {
      formatter(row) {
        return dayjs(row.createdAt).format('MMM D, YYYY h:mm A');
      },
      name: 'Created at',
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack spacing={4}>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Users</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button startIcon={<PlusIcon />} variant="contained" onClick={() => handleOpenModal(defaultUser)}>
              Add
            </Button>
          </Box>
        </Stack>
        <Card>
          <Box sx={{ overflowX: 'auto' }}>
            <React.Fragment>
              <DataTable
                loading={isLoading}
                isPagination={true}
                totalRecords={totalRecords}
                rowsPerPageOptions={pagination.limit}
                pageNo={pagination.pageNo}
                columns={columns}
                rows={users}
                uniqueRowId="id"
                selectionMode="multiple"
                leftItems={
                  <>
                    <TextField
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search users..."
                    />
                    <RefreshPlugin onClick={mutate} />
                  </>
                }
                rightItems={
                  <>
                    <DeleteConfirmationPasswordPopover
                      title={`Are you sure you want to delete ${selectedRows.length} record(s)?`}
                      id={selectedRows.map((row) => row.id)}
                      onDelete={onDelete}
                      deleteFn={deleteUserAsync}
                      passwordInput
                      disabled={selectedRows.length === 0}
                    />
                  </>
                }
                onRowsPerPageChange={(pageNumber, rowsPerPage) =>
                  setPagination({ pageNo: pageNumber, limit: rowsPerPage })
                }
                onPageChange={(newPageNumber) => setPagination({ ...pagination, pageNo: newPageNumber })}
                onSelection={(selectedRows) => setSelectedRows?.(selectedRows)}
              />
              {!users?.length && !isLoading ? (
                <Box sx={{ p: 3 }}>
                  <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                    No customers found
                  </Typography>
                </Box>
              ) : null}
            </React.Fragment>
          </Box>
        </Card>
      </Stack>
      {openModal && (
        <ManageUserDialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          onConfirm={handleConfirm}
          data={modalData}
        />
      )}
    </Box>
  );
}
