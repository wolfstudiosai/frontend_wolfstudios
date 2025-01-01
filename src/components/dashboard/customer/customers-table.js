'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import RouterLink from 'next/link';
import * as React from 'react';

import { DataTable } from '@/components/data-table/data-table';
import { dayjs } from '@/lib/dayjs';
import { paths } from '@/paths';

import { useCustomersSelection } from './customers-selection-context';

const columns = [
  {
    formatter: () => (
      <IconButton component={RouterLink} href={paths.dashboard.customers.details('1')}>
        <PencilSimpleIcon />
      </IconButton>
    ),
    name: 'Actions',
    // hideName: true,
    // align: 'right',
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
            {row.first_name} {row.last_name}
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
        {row.contact_number}
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
    name: 'Phone',
  },
  {
    formatter(row) {
      return dayjs(row.createdAt).format('MMM D, YYYY h:mm A');
    },
    name: 'Created at',
  },
  {
    formatter: (row) => {
      return <Chip label={row.status} size="small" variant="outlined" />
    },
    name: 'Status',
  },

];

export function CustomersTable({ rows }) {
  const { deselectAll, deselectOne, selectAll, selectOne, selected } = useCustomersSelection();

  return (
    <React.Fragment>
      <DataTable
        columns={columns}
        onDeselectAll={deselectAll}
        onDeselectOne={(_, row) => {
          deselectOne(row.id);
        }}
        onSelectAll={selectAll}
        onSelectOne={(_, row) => {
          selectOne(row.id);
        }}
        rows={rows}
        selectable
        selected={selected}
      />
      {!rows?.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No customers found
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
