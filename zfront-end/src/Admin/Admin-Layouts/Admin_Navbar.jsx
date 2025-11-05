import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Admin_Navbar = () => {

  const [open, Setopen] = useState(false);
  return (
    <nav className='w-full mx-auto p-8 bg-gray-900 text-white border-b' >
      <div>
        <ul className='hidden lg:flex justify-around'>
          <Link to="/admin" className="flex items-center gap-3 hover:text-white">
            <span className="material-symbols-outlined">shopping_cart_checkout</span>
            Products
          </Link>
          <Link to="/admin-carts" className="flex items-center gap-3 hover:text-black">
            <span className="material-symbols-outlined">shopping_cart_off</span>
            Cart
          </Link>
          <Link to="/admin-orders" className="flex items-center gap-3 hover:text-black">
            <span className="material-symbols-outlined">shopping_bag</span>
            Order
          </Link>
          <Link to="/admin-users" className="flex items-center gap-3 hover:text-black">
            <span className="material-symbols-outlined">group_add</span>
            User
          </Link>
        </ul>

        <button className='lg:hidden bg-gray-900 w-full text-white text-start p-5 flex justify-between' onClick={() => Setopen(!open)}>
          <span className="material-symbols-outlined">
            {open ? 'close' : 'menu'}
          </span>
          <div className='font-bold font-serif text-2xl'>
            <h1>Admin Board</h1>
          </div>
        </button>



      </div>
      {open && (
        <div className="w-full mx-auto flex flex-col gap-5 p-2 border border-gray-500 text-white bg-gray-500 font-bold lg:hidden relative">
          <ul className="flex flex-col gap-4">
            <li>
              <Link to="/admin" className="flex items-center gap-3 hover:text-black">
                <span className="material-symbols-outlined">shopping_cart_checkout</span>
                Products
              </Link>
            </li>
            <li>
              <Link to="/admin-carts" className="flex items-center gap-3 hover:text-black">
                <span className="material-symbols-outlined">shopping_cart_off</span>
                Cart
              </Link>
            </li>
            <li>
              <Link to="/admin-orders" className="flex items-center gap-3 hover:text-black">
                <span className="material-symbols-outlined">shopping_bag</span>
                Order
              </Link>
            </li>
            <li>
              <Link to="/admin-users" className="flex items-center gap-3 hover:text-black">
                <span className="material-symbols-outlined">group_add</span>
                User
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Admin_Navbar