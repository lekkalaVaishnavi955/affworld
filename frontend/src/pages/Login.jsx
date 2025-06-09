// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../redux/authSlice.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

useEffect(() => {
  return () => dispatch(clearError()); 
}, [dispatch]);
useEffect(() => {
  if (isAuthenticated) {
    navigate('/dashboard');
  }
}, [isAuthenticated, navigate]);
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    }
  }, [error]);

 // ✅ Final handleLogin inside Login.jsx
const handleLogin = async (e) => {
  e.preventDefault();
  const resultAction = await dispatch(loginUser({ username, password }));

  if (loginUser.fulfilled.match(resultAction)) {
    toast.success('Login successful!', {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  
  } else if (loginUser.rejected.match(resultAction)) {
    toast.error(resultAction.payload || 'Login failed', {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 px-4 py-8">
      <div className="max-w-md w-full bg-slate-700 p-8 rounded-xl shadow-2xl border border-slate-600 transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center drop-shadow-lg">
          Login to CRM
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-slate-300 mb-1 text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 border border-slate-500 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="e.g., emilys"
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-slate-400 border border-slate-500 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="e.g., emilyspass"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition transform duration-200 active:scale-95 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-10 text-center text-sm text-slate-400">
          <p>SDE Assignment 1 #089</p>
          <p>JUNE 5 2025</p>
          <p>+971542997582</p>
          <p>Dubai Internet City</p>
          <p>Operations@Affworld.io</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
