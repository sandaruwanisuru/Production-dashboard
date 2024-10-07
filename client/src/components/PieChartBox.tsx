import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const PieChartBox = () => {
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [produtTotal, setProductTotal] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders/total');
        const data = await response.json();
        setOrderTotal(data.totalOrderQuantity);
        // console.log(data);
      } catch (error) {
        console.error('error fetching total orders', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/productions/total');
        const data = await response.json();
        setProductTotal(data.totalProducedQuantity);
        // console.log(data);
      } catch (error) {
        console.error('error fetching total production', error);
      }
    };
    fetchData();
  }, []);

  const remainningQuantity = orderTotal - produtTotal;

  const data = [
    { name: 'Order Quantity', value: orderTotal, color: '#0088FE' },
    {
      name: 'Produced Quantity',
      value: produtTotal,
      color: '#00C49F',
    },
    {
      name: 'Remainning Quantity',
      value: remainningQuantity,
      color: '#FFBB28',
    },
  ];

  return (
    <div className="PieChart">
      <h1 className="">Total</h1>
      <div className="chart ">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: 'White', borderRadius: '5px' }}
            />
            <Pie
              data={data}
              innerRadius={'65%'}
              outerRadius={'80%'}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={`${item.name}`} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options flex justify-between gap-5 text-sm">
        {data.map((item) => (
          <div
            className="option flex flex-col gap-5 items-center"
            key={item.value}
          >
            <div className="title flex gap-5 items-center">
              <div
                className="dot w-5 h-5 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
