import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type title = {
  title: String;
};

const ProductionBox = (props: title) => {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/productions/total');
        const data = await response.json();
        setTotal(data.totalProducedQuantity);
      } catch (error) {
        console.error('error fetching total production', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="chartBox flex items-center flex-col gap-4">
      <span className="title">{props.title}</span>
      <h3 className="font-bold text-5xl">{total}</h3>
      <Link to="/">View All</Link>
    </div>
  );
};

export default ProductionBox;
