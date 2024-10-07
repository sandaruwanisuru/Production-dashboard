import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';

import { useEffect, useState } from 'react';
import AddCustomer from '../components/AddCustomer';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Customer ID', width: 90 },
  {
    field: 'name',
    headerName: 'Customer',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    editable: true,
  },
];

type Customers = {
  id: number;
  name: String;
  email: string;
};

const Customer = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<Customers[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/customers');
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

  const handleEdit = async (id: number, updatedRow: Customers) => {
    try {
      const response = await fetch(`http://localhost:3000/customers/${id}`, {
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
      await fetch(`http://localhost:3000/customers/${id}`, {
        method: 'DELETE',
      });
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="Customer">
      <div className="heading mb-5 flex gap-4">
        <h3 className="text-xl">Customers</h3>
        <button
          className="bg-slate-900 rounded-md px-2 py-1 font-bold hover:bg-white hover:text-slate-900"
          onClick={() => setOpen(true)}
        >
          Add Customer
        </button>
      </div>
      <DataTable
        rows={rows}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {open && <AddCustomer setOpen={setOpen} columns={columns} />}
    </div>
  );
};

export default Customer;
