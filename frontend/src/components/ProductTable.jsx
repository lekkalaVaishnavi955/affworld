import React from "react";

function ProductTable({ products, onDelete, onEdit }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr className="bg-gray-700 text-left">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t border-gray-700">
              <td className="px-4 py-2">{p.title}</td>
              <td className="px-4 py-2">${p.price}</td>
              <td className="px-4 py-2">{p.stock}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(p)}
                  className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
