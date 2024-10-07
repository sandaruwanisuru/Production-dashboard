import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';
import { useEffect, useState } from 'react';
import AddOrder from '../components/AddOrder';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order ID', width: 90 },
  {
    field: 'customer',
    headerName: 'Customer',
    width: 150,
    editable: true,
  },
  {
    field: 'createdAt',
    headerName: 'Order Date',
    width: 150,
    editable: true,
    renderCell: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString();
    },
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 110,
    editable: true,
  },
  {
    field: 'size',
    headerName: 'Size',
    width: 110,
    editable: true,
  },
];

type Orders = {
  id: number;
  quantity: number;
  size: string;
  createdAt: string;
};

const Orders = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<Orders[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders');
        const data = await response.json();
        setRows(data);
        console.log('fetched data', data);
      } catch (error) {
        console.error('Error fetching order data');
      }
    };
    fetchData();
  }, []);

  const handleEdit = async (id: number, updatedRow: Orders) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${id}`, {
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
      await fetch(`http://localhost:3000/orders/${id}`, {
        method: 'DELETE',
      });
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="orders p-4">
      <div className="heading mb-5 flex gap-4">
        <h3 className="text-xl">Orders</h3>
        <button
          className="bg-slate-900 rounded-md px-2 py-1 font-bold hover:bg-white hover:text-slate-900"
          onClick={() => setOpen(true)}
        >
          Add Order
        </button>
      </div>
      <div className="">
        <DataTable
          rows={rows}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {open && <AddOrder setOpen={setOpen} columns={columns} />}
      </div>
    </div>
  );
};

export default Orders;
