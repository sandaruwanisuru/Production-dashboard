import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Props = {
  month: string;
  totalQuantity: number;
};

const BarChartBox = () => {
  const [datas, setDatas] = useState<Props[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reponse = await fetch('http://localhost:3000/orders/monthly');
        const data = await reponse.json();
        // console.log(data);
        setDatas(data);
      } catch (error) {
        console.log('error fetching data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="BarChartBox">
      <h1 className="text-center mb-5">Year of order</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={250}>
          <BarChart
            data={datas}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={40}
          >
            <XAxis
              dataKey="month"
              scale="auto"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip
              contentStyle={{ background: '#2a3447', borderRadius: '5px' }}
              labelStyle={{ display: 'none' }}
              cursor={{ fill: 'none' }}
            />
            <Legend />
            <Bar dataKey="totalQuantity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;
