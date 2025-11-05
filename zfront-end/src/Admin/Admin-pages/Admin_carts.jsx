import React from 'react'
import { useState, useEffect } from 'react'
import { Api } from "../../api";

const Admin_carts = () => {

  const [products, setProducts] = useState([])
  const [Errors, setErrors] = useState('')

  useEffect(() => {
    Api.get('/Order/get_cart/').then((response) => {
      console.log('success :', response.data)
      setProducts(response.data.Data)
    }).catch((error) => {
      console.log('error :', error.response.data)
      setErrors(error.response?.data.message || 'something went wrong')
    })
  }, [])


  return (
    <main className="w-full mx-auto bg-gray-900 min-h-screen p-6 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 ">
        <h1 className="font-bold font-serif text-3xl sm:text-4xl mb-3 sm:mb-0">
          Carts
        </h1>

        {/* Search and Button */}
        <div className="flex gap-3 items-center">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search"
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
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {products.map((item) => (
              <tr key={item.id} className="hover:bg-gray-700 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.product?.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{item.product?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.product?.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.product?.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.product?.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          {Errors && <p>{Errors}</p>}
        </div>

        {products.length === 0 && (
          <p className="text-gray-400 text-center py-6">No products added yet.</p>
        )}
      </div>
    </main>
  )
}
export default Admin_carts

