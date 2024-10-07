import BarChartBox from '../components/BarChartBox';
import OrderBox from '../components/OrderBox.tsx';
import PieChartBox from '../components/PieChartBox';
import ProductionBox from '../components/ProductionBox.tsx';
import { barChartproduction } from '../data.ts';

const Home = () => {
  return (
    <div className="home grid grid-cols-3 gap-4 pl-5">
      <div className="box1 border-2 rounded-sm p-3">
        <ProductionBox title="Total Production" />
      </div>
      <div className="box2 border-2 rounded-sm p-3">
        <OrderBox title="daily Production" />
      </div>
      <div className="box3 border-2 rounded-sm p-3 col-span-1 row-span-2">
        <PieChartBox />
      </div>
      <div className="box4 border-2 rounded-sm p-3 col-span-2 row-span-3">
        <BarChartBox {...barChartproduction} />
      </div>
    </div>
  );
};

export default Home;
