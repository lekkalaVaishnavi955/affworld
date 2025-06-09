// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/Navbar';  
import ProductManagement from './pages/ProductManagement';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Analytics from './components/Analytics';
function App() {
  return (<>
    <Router>
      <Navbar /> 

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route 
          path="/products" 
          element={
             <PrivateRoute>
              <ProductManagement />
            </PrivateRoute>
            }
         />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
