'use client';

import Box from '@mui/material/Box';
import { DataGrid, GridCellModes, GridToolbar } from '@mui/x-data-grid';
import * as React from 'react';

export const EditableDataTable = ({
  columns,
  rows,
  processRowUpdate,
  onProcessRowUpdateError,
  loading = false,
  pageSize = 10,
  rowCount,
  pageSizeOptions,
  onPageChange,
  paginationModel,
  checkboxSelection = false,
  rowModesModel,
  onRowSelectionModelChange,
  onRowModesModelChange,
  onRowEditStop,
  onRowEditStart,
  editMode
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
        rowCount={rowCount}
        columns={columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
        cellModesModel={cellModesModel}
        onCellModesModelChange={handleCellModesModelChange}
        onCellClick={handleCellClick}
        // pageSize={pageSize}
        loading={loading}
        pageSizeOptions={pageSizeOptions}
        paginationModel={paginationModel}
        sx={{
          '& .MuiDataGrid-cell': {
            border: (theme) => `1px solid ${theme.palette.divider}`,
          },
        }}
        editMode={editMode}
        onRowEditStart={onRowEditStart}
        onRowEditStop={onRowEditStop}
        rowModesModel={rowModesModel}
        onRowModesModelChange={onRowModesModelChange}
        disableColumnSorting
        disableRowSelectionOnClick
        onPaginationModelChange={onPageChange}
        paginationMode="server"
        checkboxSelection={checkboxSelection} // it will enable checkbox selection
        onRowSelectionModelChange={onRowSelectionModelChange} //it will return all selected rows
        slots={{ toolbar: GridToolbar }} // filtering csv download, hide cols, etc
      />
    </Box>
  );
};
