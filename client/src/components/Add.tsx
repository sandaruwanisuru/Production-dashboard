import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  columns: GridColDef[];
};

type Customer = {
  id: number;
  name: string;
};

const Add = (props: Props) => {
  const [formData, setFormData] = useState<{ [key: string]: string | number }>({
    customerId: '',
    quantity: '',
    size: '',
  });

  const [customerData, setCustomerData] = useState<{
    name: string;
    email: string;
  }>({
    name: '',
    email: '',
  });

  const [customers, setCustomers] = useState<Customer[]>([]); // State to hold customer list
  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false); // Flag to toggle between order and customer forms

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleCustomerInputChange = (field: string, value: string) => {
    setCustomerData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form Data:', formData); // Log form data before sending

    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Order added successfully');
        props.setOpen(false);
      } else {
        console.error('Error adding order');
      }
    } catch (error) {
      console.error('Error submitting order:', error); // Log error
    }
  };

  const handleSubmitCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Customer Data:', customerData); // Log customer data before sending

    try {
      const response = await fetch('http://localhost:3000/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData), // Ensure this has the correct format
      });

      if (response.ok) {
        console.log('Customer added successfully');
        setCustomerData({ name: '', email: '' }); // Reset customer data
        setIsCreatingCustomer(false); // Switch back to order form
        await fetchCustomers(); // Refresh customer list
      } else {
        console.error('Error adding customer');
      }
    } catch (error) {
      console.error('Error submitting customer:', error); // Log error
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:3000/customers'); // Adjust endpoint as needed
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="add absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
      <div className="modal p-12 rounded-xl bg-slate-800 relative">
        <span
          className="close text-2xl font-bold absolute top-3 right-3 cursor-pointer px-2 py-1 bg-white text-slate-800 hover:bg-slate-300"
          onClick={() => props.setOpen(false)}
        >
          X
        </span>
        <h1 className="mb-8 text-3xl text-white">
          {isCreatingCustomer ? 'Add New Customer' : 'Add New Order'}
        </h1>

        {isCreatingCustomer ? (
          <form
            className="flex flex-wrap max-w-screen-sm justify-between items-center"
            onSubmit={handleSubmitCustomer}
          >
            <div className="item flex flex-col gap-3 mb-7">
              <label className="text-lg">Customer Name</label>
              <input
                className="p-2 bg-transparent border-solid border-2 border-slate-400 rounded-md"
                type="text"
                placeholder="Customer Name"
                value={customerData.name}
                onChange={(e) =>
                  handleCustomerInputChange('name', e.target.value)
                }
                required
              />
            </div>
            <div className="item flex flex-col gap-3 mb-7">
              <label className="text-lg">Email</label>
              <input
                className="p-2 bg-transparent border-solid border-2 border-slate-400 rounded-md"
                type="email"
                placeholder="Email"
                value={customerData.email}
                onChange={(e) =>
                  handleCustomerInputChange('email', e.target.value)
                }
                required
              />
            </div>
            <button className="w-full cursor-pointer rounded-md font-bold p-3 bg-white text-slate-800 hover:bg-slate-300">
              ADD CUSTOMER
            </button>
          </form>
        ) : (
          <form
            className="flex flex-wrap max-w-screen-sm justify-between items-center"
            onSubmit={handleSubmitOrder}
          >
            {props.columns
              .filter(
                (column) =>
                  column.field !== 'id' && column.field !== 'createdAt'
              ) // Hide the Order ID field
              .map((column) => (
                <div
                  className="item flex flex-col gap-3 mb-7"
                  key={column.field}
                >
                  <label className="text-lg">{column.headerName}</label>
                  {/* For Customer Selection  */}
                  {column.field === 'customer.name' ? (
                    <select
                      className="p-2 bg-transparent border-solid border-2 border-slate-400 rounded-md"
                      onChange={(e) =>
                        handleInputChange('customerId', Number(e.target.value))
                      } // Convert to number here
                      required
                    >
                      <option value="">Select Customer</option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="p-2 bg-transparent border-solid border-2 border-slate-400 rounded-md"
                      type={column.type || 'text'}
                      placeholder={column.field}
                      onChange={(e) =>
                        handleInputChange(
                          column.field,
                          column.field === 'quantity'
                            ? Number(e.target.value)
                            : e.target.value
                        )
                      }
                      required
                    />
                  )}
                </div>
              ))}
            <button className="w-full cursor-pointer rounded-md font-bold p-3 bg-white text-slate-800 hover:bg-slate-300">
              ADD ORDER
            </button>
          </form>
        )}

        <button
          className="mt-5 w-full cursor-pointer rounded-md font-bold p-3 bg-gray-400 text-slate-800 hover:bg-gray-300"
          onClick={() => setIsCreatingCustomer((prev) => !prev)}
        >
          {isCreatingCustomer
            ? 'Switch to Add Order'
            : 'Switch to Add Customer'}
        </button>
      </div>
    </div>
  );
};

export default Add;
