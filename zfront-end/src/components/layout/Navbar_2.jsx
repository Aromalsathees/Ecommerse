import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar_2 = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md p-5 border-b text-black font-semibold">
      {/* Mobile navbar button */}
      <div className="lg:hidden flex justify-between items-center">
        <h1 className="text-xl font-semibold">MyShop</h1>
        <span
          onClick={() => setOpen(!open)}
          className="material-symbols-outlined cursor-pointer text-3xl"
        >
          {open ? "close" : "menu"}
        </span>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="flex flex-col gap-4 mt-4 text-black lg:hidden">
          <ul className="flex flex-col gap-3 text-black">
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/orderlist">Orders</Link></li>
            <li><Link to="/cart">Carts</Link></li>
          </ul>
        </div>
      )}

      {/* Desktop menu */}
      <div className="hidden lg:flex justify-between lg:w-full lg:px-20  items-center text-black">
        <h1 className="text-2xl font-semibold">MyShop</h1>
        <ul className="flex gap-8">
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/orderlist">Orders</Link></li>
          <li><Link to="/cart">Carts</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar_2;
