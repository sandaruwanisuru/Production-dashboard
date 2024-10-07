import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="navbar flex justify-between border-b-2 border-b-slate-500 m-1">
      <div className="logo w-20 h-10">
        <img src="logo.jpg" alt="Logo" />
      </div>
      <div className="navList flex gap-4">
        <ul className="flex gap-4">
          <li>
            <Link to="/register" className="text-white hover:text-gray-300">
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="text-white">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
