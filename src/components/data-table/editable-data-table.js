'use client';

import React, { useCallback, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridCellModes, GridToolbar } from '@mui/x-data-grid';

export const EditableDataTable = ({
  columns,
  rows,
  processRowUpdate,
  onProcessRowUpdateError,
  loading = false,
  rowCount,
  pageSizeOptions,
  paginationModel,
  onPageChange,
  checkboxSelection = false,
  rowModesModel,
  onRowSelectionModelChange,
  onRowModesModelChange,
  onRowEditStop,
  onRowEditStart,
  editMode
}) => {
  const [cellModesModel, setCellModesModel] = useState({});
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const setDragStart = (x) => {
    isDragging.current = true;
    dragStartX.current = x - scrollRef.current.offsetLeft;
    dragScrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleDrag = (x) => {
    if (!isDragging.current) return;
    const moveX = x - scrollRef.current.offsetLeft;
    const walk = (moveX - dragStartX.current);
    scrollRef.current.scrollLeft = dragScrollLeft.current - walk;
  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  const handleMouseDown = (e) => setDragStart(e.pageX);
  const handleMouseMove = (e) => handleDrag(e.pageX);
  const handleTouchStart = (e) => setDragStart(e.touches[0].pageX);
  const handleTouchMove = (e) => handleDrag(e.touches[0].pageX);

  const handleCellClick = useCallback((params, event) => {
    if (!params.isEditable) return;
    if (event.target.nodeType === 1 && !event.currentTarget.contains(event.target)) return;

    setCellModesModel((prev) => {
      const newModel = {};
      for (const id in prev) {
        newModel[id] = {};
        for (const field in prev[id]) {
          newModel[id][field] = { mode: GridCellModes.View };
        }
      }
      newModel[params.id] = {
        ...newModel[params.id],
        [params.field]: { mode: GridCellModes.Edit },
      };
      return newModel;
    });
  }, []);

  const handleCellModesModelChange = useCallback((newModel) => {
    setCellModesModel(newModel);
  }, []);

  return (
    <Box
      ref={scrollRef}
      sx={{ overflowX: 'auto', height: '100%', width: '100%', cursor: isDragging.current ? 'grabbing' : 'grab' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={stopDrag}
    >
      <DataGrid
        rows={rows}
        rowCount={rowCount}
        columns={columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
        cellModesModel={cellModesModel}
        onCellModesModelChange={handleCellModesModelChange}
        onCellClick={handleCellClick}
        loading={loading}
        pageSizeOptions={pageSizeOptions}
        paginationModel={paginationModel}
        onPaginationModelChange={onPageChange}
        paginationMode="server"
        checkboxSelection={checkboxSelection}
        onRowSelectionModelChange={onRowSelectionModelChange}
        rowModesModel={rowModesModel}
        onRowModesModelChange={onRowModesModelChange}
        onRowEditStart={onRowEditStart}
        onRowEditStop={onRowEditStop}
        editMode={editMode}
        disableColumnSorting
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        sx={{
          minWidth: 'max-content',
          '& .MuiDataGrid-cell': {
            border: (theme) => `1px solid ${theme.palette.divider}`,
          },
        }}
      />
    </Box>
  );
};
