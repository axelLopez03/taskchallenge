import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export function TaskTable({ tasks, onDelete, onEdit }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'title', headerName: 'Título', width: 200 },
    { field: 'description', headerName: 'Descripción', width: 300 },
    { field: 'completed', headerName: 'Completada', width: 120, type: 'boolean' },
    {
      field: 'createdAt',
      headerName: 'Creada el',
      width: 180,
      valueGetter: (params) => {
        const value = params.value || (params.row && params.row.createdAt);
        if (!value) return '';
        const date = new Date(value);
        return isNaN(date) ? '' : date.toLocaleString();
      }
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="editar"
            color="primary"
            onClick={() => onEdit(params.row)}
            size="small"
            sx={{ color: 'var(--main-blue)' }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="eliminar"
            color="error"
            onClick={() => onDelete(params.row.id)}
            size="small"
            sx={{ color: 'var(--main-yellow)' }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];
return (
  <Paper sx={{ height: 400, width: '100%', maxWidth: 1600, margin: '0 auto', boxShadow: 3 }}>
    <DataGrid
      rows={tasks}
      columns={columns}
      pageSizeOptions={[5, 10]}
      initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
      checkboxSelection
      sx={{ border: 0 }}
      getRowId={(row) => row.id}
    />
  </Paper>
);
}