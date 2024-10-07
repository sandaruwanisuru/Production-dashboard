import { Link } from 'react-router-dom';

const Menu = () => {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <div className="menu flex flex-col py-10 px-4 gap-5 ">
      <div className="home flex gap-3">
        <Link to={'/'}>Home</Link>
      </div>
      {isAuthenticated && (
        <>
          <div className="orders flex gap-3">
            <Link to={'/orders'}>Order</Link>
          </div>
          <div className="Customer flex gap-3">
            <Link to={'/customers'}>Customer</Link>
          </div>
          <div className="Production flex gap-3">
            <Link to={'/productions'}>Production</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
