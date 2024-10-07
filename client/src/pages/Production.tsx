import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';

import { useEffect, useState } from 'react';
import Addproduction from '../components/Addproduction';

type Production = {
  id: number;
  quantity: number;
  size: string;
  producedQuantity: number;
  createdAt: string;
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Production ID', width: 90 },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 150,
    editable: true,
  },

  {
    field: 'producedQuantity',
    headerName: 'Produced Quantity',
    width: 150,
    editable: true,
  },
  {
    field: 'size',
    headerName: 'Size',
    width: 110,
    editable: true,
  },
  {
    field: 'createdAt',
    headerName: 'Start Date',
    width: 150,
    editable: true,
    renderCell: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString();
    },
  },
  {
    field: 'endedAt',
    headerName: 'End Date',
    width: 150,
    editable: true,
    renderCell: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString();
    },
  },
];

const Production = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<Production[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/productions');
        const data = await response.json();
        setRows(data);
        if (rows) {
          console.log('fetched data', data);
        }
      } catch (error) {
        console.error('Error fetching customer data');
      }
    };
    fetchData();
  }, []);

  const handleEdit = async (id: number, updatedRow: Production) => {
    try {
      const response = await fetch(`http://localhost:3000/productions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRow),
      });
      // const updatedRow = await response.json();
      const updatedRows = rows.map((row) => (row.id === id ? updatedRow : row));
      setRows(updatedRows);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/productions/${id}`, {
        method: 'DELETE',
      });
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="production">
      <div className="heading mb-5 flex gap-4">
        <h3 className="text-xl">Productions</h3>
        {/* <Link to={`/add-productions`}> */}
        <button
          className="bg-slate-900 rounded-md px-2 py-1 font-bold hover:bg-white hover:text-slate-900"
          onClick={() => setOpen(true)}
        >
          Add productions
        </button>
        {/* </Link> */}
      </div>
      <DataTable
        rows={rows}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {open && <Addproduction setOpen={setOpen} columns={columns} />}
    </div>
  );
};

export default Production;
