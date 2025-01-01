'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridCellModes } from '@mui/x-data-grid';

export const EditableDataTable = ({
  columns,
  rows,
  processRowUpdate,
  onProcessRowUpdateError,
  loading = false,
  noDataMessage = 'No records found',
  pageSize = 10,
}) => {
  const [cellModesModel, setCellModesModel] = React.useState({});

  const handleCellClick = React.useCallback((params, event) => {
    if (!params.isEditable) return;

    if (event.target.nodeType === 1 && !event.currentTarget.contains(event.target)) return;

    setCellModesModel((prevModel) => {
      return {
        ...Object.keys(prevModel).reduce(
          (acc, id) => ({
            ...acc,
            [id]: Object.keys(prevModel[id] || {}).reduce(
              (acc2, field) => ({
                ...acc2,
                [field]: { mode: GridCellModes.View },
              }),
              {}
            ),
          }),
          {}
        ),
        [params.id]: {
          ...Object.keys(prevModel[params.id] || {}).reduce(
            (acc, field) => ({ ...acc, [field]: { mode: GridCellModes.View } }),
            {}
          ),
          [params.field]: { mode: GridCellModes.Edit },
        },
      };
    });
  }, []);

  const handleCellModesModelChange = React.useCallback((newModel) => {
    setCellModesModel(newModel);
  }, []);

  return (
    <Box sx={{ overflowX: 'auto', height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
        cellModesModel={cellModesModel}
        onCellModesModelChange={handleCellModesModelChange}
        onCellClick={handleCellClick}
        pageSize={pageSize}
        loading={loading}
        sx={{
          '& .MuiDataGrid-cell': {
            border: (theme) => `1px solid ${theme.palette.divider}`,
          },
        }}
        disableColumnSorting
      />
      {!rows?.length && !loading && (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            {noDataMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
