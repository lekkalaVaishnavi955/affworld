// src/components/Navbar.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    toast.success("Logout successfully");
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow-md border-b border-gray-700">
      <Link to="/" className="text-xl font-semibold text-indigo-400 hover:text-indigo-300 transition">
        CRM 
      </Link>

      <div className="flex items-center gap-4">
        {isAuthenticated && (
          <>
             <Link to="/dashboard" className="text-gray-300 text-sm hover:text-white transition">
              Home
            </Link>
            <Link to="/analytics" className="text-gray-300 text-sm hover:text-white transition">
              Dashboard
            </Link>
            <Link to="/products" className="text-gray-300 text-sm hover:text-white transition">
              Products
            </Link>
            
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
