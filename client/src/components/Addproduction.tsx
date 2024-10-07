import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  columns: GridColDef[];
};

const Addproduction = (props: Props) => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/productions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Customer added:', data);
        props.setOpen(false);
      } else {
        console.error('Failed to add customer');
      }
    } catch (error) {
      console.error('Error:', error);
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
        <h1 className="mb-8 text-3xl text-white">Add new</h1>
        <form
          className="flex flex-wrap max-w-screen-sm justify-between items-center"
          onSubmit={handleSubmit}
        >
          {props.columns
            .filter(
              (column) => column.field !== 'id' && column.field !== 'createdAt'
            ) // Hide unnecessary fields
            .map((column) => (
              <div className="item flex flex-col gap-3 mb-7" key={column.field}>
                <label className="text-lg">{column.headerName}</label>
                <input
                  className="p-2 bg-transparent border-solid border-2 border-slate-400 rounded-md"
                  type={column.type || 'text'}
                  placeholder={column.headerName}
                  value={formData[column.field as keyof typeof formData] || ''} // Use formData for controlled input
                  onChange={(e) =>
                    handleInputChange(column.field, e.target.value)
                  }
                />
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

export default Addproduction;
