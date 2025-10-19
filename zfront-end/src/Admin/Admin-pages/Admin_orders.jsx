import React from 'react'


const Admin_orders = () => {
  const products = [
    { id: 1, name: 'iPhone 15', category: 'Electronics', price: '₹79,999', stock: 20 },
    { id: 2, name: 'Nike Air Max', category: 'Footwear', price: '₹9,999', stock: 50 },
    { id: 3, name: 'MacBook Air M3', category: 'Electronics', price: '₹1,29,999', stock: 10 },
  ]

  return (
    <main className="max-w-6xl mx-auto bg-gray-900 min-h-screen p-6 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 ">
        <h1 className="font-bold font-serif text-3xl sm:text-4xl mb-3 sm:mb-0">
          Orders
        </h1>

        {/* Search and Button */}
        <div className="flex gap-3 items-center">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search products"
              className="pl-10 pr-3 py-2 rounded-md border border-gray-500 bg-transparent placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-gray-800 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-700 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.stock}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap text-sm">
                  <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-xs font-medium mr-2">
                    Deliverd
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-gray-400 text-center py-6">No products added yet.</p>
        )}
      </div>
    </main>
  )
}

export default Admin_orders



