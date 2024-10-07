import { GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  columns: GridColDef[];
};

const AddOrder = (props: Props) => {
  const [formData, setFormData] = useState({
    customerId: '', // This stores the selected customer ID
    quantity: '',
    size: '',
    createdAt: '',
  });
  const [customers, setCustomers] = useState<{ id: number; name: string }[]>(
    []
  );

  // Fetch customer data when the component mounts
  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch('http://localhost:3000/customers');
      const data = await response.json();
      setCustomers(data);
      console.log('fetch customers', data); // Make sure customers data is logged
    };
    fetchCustomers();
  }, []);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Submit form data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        createdAt: new Date(formData.createdAt).toISOString(), // Convert to ISO format
      };

      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Order added:', data); //Check
        props.setOpen(false); // Close modal on success
      } else {
        console.error('Failed to add order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div className="add absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
      <div className="modal p-12 rounded-xl bg-slate-800 relative">
        <span
          className="close text-2xl font-bold absolute top-3 right-3 cursor-pointer px-2 py-1 bg-white text-slate-800 hover:bg-slate-300"
          onClick={() => props.setOpen(false)}
        >
          X
        </span>
        <h1 className="mb-8 text-3xl text-white">Add New Order</h1>
        <form
          className="flex flex-wrap max-w-screen-sm justify-between items-center"
          onSubmit={handleSubmit}
        >
          {props.columns
            .filter((column) => column.field !== 'id')
            .map((column) => (
              <div className="item flex flex-col gap-3 mb-7" key={column.field}>
                <label className="text-lg">{column.headerName}</label>

                {/* Customer Selection Dropdown */}
                {column.field === 'customer' ? (
                  <select
                    className="p-2 bg-transparent border-solid border-2 border-slate-400 rounded-md"
                    onChange={(e) =>
                      handleInputChange('customerId', e.target.value)
                    }
                  >
                    <option value="">Select Customer</option>
                    {customers.map((Customer) => (
                      <option key={Customer.id} value={Customer.id}>
                        {Customer.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="p-2 bg-transparent border-solid border-2 border-slate-400 rounded-md"
                    type={column.type || 'text'}
                    placeholder={column.field}
                    onChange={(e) =>
                      handleInputChange(column.field, e.target.value)
                    }
                  />
                )}
              </div>
            ))}
          <button className="w-full cursor-pointer rounded-md font-bold p-3 bg-white text-slate-800 hover:bg-slate-300">
            ADD
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOrder;
