import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductTable from "../components/ProductTable.jsx"; // Explicit .jsx extension
import ProductFormModal from "../components/ProductFormModal.jsx"; // Explicit .jsx extension
import { toast } from 'react-toastify'; // Import toast

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Function to fetch products
  const fetchProducts = () => {
    axios.get("https://dummyjson.com/products?limit=10")
      .then(res => setProducts(res.data.products))
      .catch(error => {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products.");
      });
  };

  useEffect(() => {
    fetchProducts(); // Initial fetch
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/products/${id}`);
      // Optimistically update UI
      setProducts(prev => prev.filter(product => product.id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If 404, assume it was already deleted or doesn't exist, remove from UI
        setProducts(prev => prev.filter(product => product.id !== id));
        toast.warn("Product not found on server, removed from list.");
      } else {
        console.error("Delete failed:", error);
        toast.error("Failed to delete product.");
      }
    }
  };

  const handleAdd = () => {
    setEditingProduct(null); // Clear any existing product for add mode
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product); // Set product for edit mode
    setShowModal(true);
  };

  const handleSave = async (formData) => {
    try {
      if (editingProduct) {
        // Simulate PUT request for existing product
        const response = await axios.put(`https://dummyjson.com/products/${editingProduct.id}`, formData);
        setProducts(products.map(p => (p.id === editingProduct.id ? { ...p, ...response.data } : p)));
        toast.success("Product updated successfully!");
      } else {
        // Simulate POST request for new product
        const response = await axios.post("https://dummyjson.com/products/add", formData);
        // Add the new product to the state. Dummyjson always returns id 101 for new products.
        setProducts([...products, { ...formData, id: Date.now() }]); // Use timestamp for unique ID
        toast.success("Product added successfully!");
      }
      setShowModal(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save product.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-400">Product Management</h1>
        <button
          onClick={handleAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
        >
          + Add Product
        </button>
      </div>

      <ProductTable products={products} onDelete={handleDelete} onEdit={handleEdit} />

      {showModal && (
        <ProductFormModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          product={editingProduct}
        />
      )}
    </div>
  );
}

export default ProductManagement;
