

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Api } from '../../../api'

const Orders_list = () => {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    Api.get('/Order/Get_user_Orders/')
      .then((response) => {
        setOrders(response.data.Data)
        console.log('success :', response.data)
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Something went wrong')
        console.log('error :', error.response?.data?.message || 'Something went wrong')
      })
  }, [])

  return (
    <main className="w-full mx-auto lg:px-25 mt-15 lg:mt-30">
      <h1 className="font-bold flex  gap-2">
        <Link to='/products'>
          <span className="ml-5 material-symbols-outlined">keyboard_backspace</span>
          My Orders
        </Link>
      </h1>

      <div className="border border-gray-500 rounded-md h-auto m-4 py-8">
        <div className="relative p-4">
          <input
            className="absolute gap-3 rounded-md border border-gray-500 w-80 p-3 pl-12"
            type="text"
            placeholder="Search your Order here"
          />
          <span className="m-3 material-symbols-outlined">search</span>
        </div>

        {orders.length === 0 && <p className="text-center text-gray-500">No orders found.</p>}

        {orders.map((order, index) => (
          <div
            key={index}
            className="border border-gray-500 rounded-md p-4 m-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-bold">Order #{order.id}</h2>
              <p className="text-sm text-gray-400">Status: {order.payment_status}</p>
            </div>
            <p className="text-sm">Payment: {order.payment_method.toUpperCase()}</p>
            <p className="text-sm mb-3">Total: ₹{order.total_money}</p>

            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 items-center mt-4 border-t border-gray-700 pt-3"
              >
                <img
                  className="w-32 h-28 object-cover rounded-md"
                  src={item.product.image}
                  alt={item.product.name}
                />
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}

export default Orders_list
