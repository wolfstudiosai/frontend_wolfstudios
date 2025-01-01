'use client';

import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

function noop() {
  return undefined;
}

export function CustomersPagination({ pageNo, limit }) {
  const handleChangePage = (
    event,
    newPage,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={count}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      page={page}
      rowsPerPage={5}
      rowsPerPageOptions={[5, 10, 25]}
    />
  );
}
