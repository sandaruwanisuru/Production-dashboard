import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Customer from './pages/Customer';
import Production from './pages/Production';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';

const Layout = () => {
  return (
    <div className="bg-blue-950 text-white p-5 h-screen">
      <Navbar />
      <div className="container flex">
        <div className="menuContainer w-60">
          <Menu />
        </div>
        <div className="contentContainer px-2 py-4 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/orders',
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: '/customers',
        element: (
          <ProtectedRoute>
            <Customer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/productions',
        element: (
          <ProtectedRoute>
            <Production />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />, // Add login route
      },
      {
        path: '/register',
        element: <Register />, // Add register route
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
