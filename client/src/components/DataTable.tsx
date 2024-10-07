import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

type DataProps = {
  rows: Object[];
  columns: GridColDef[];
  onEdit: (id: number, updatedRow: any) => void;
  onDelete: (id: number) => void;
};

const DataTable = (props: DataProps) => {
  const [updatedRows, setUpdatedRows] = useState({});

  const handleProcessRowUpdate = (newRow: any, oldRow: any) => {
    // Update the row data in state
    const updatedRow = { ...oldRow, ...newRow };
    setUpdatedRows((prev) => ({ ...prev, [newRow.id]: updatedRow }));

    // Trigger the onEdit handler to send updates to the server
    props.onEdit(newRow.id, updatedRow);

    return updatedRow;
  };

  const actionColumn: GridColDef = {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <div className="flex gap-3 ">
        <div onClick={() => props.onDelete(params.id as number)}>
          <DeleteIcon className="text-red-800 cursor-pointer" />
        </div>
      </div>
    ),
  };

  return (
    <div className="DataTable">
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          className="bg-white p-5"
          rows={props.rows}
          columns={[...props.columns, actionColumn]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          processRowUpdate={handleProcessRowUpdate} // Handle row updates here
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          sx={{
            '.MuiDataGrid-toolbarContainer': { flexDirection: 'row-reverse' },
          }}
        />
      </Box>
    </div>
  );
};

export default DataTable;
