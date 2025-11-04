import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Api } from "../../api";

const Show_pro2 = () => {
  const [products, setProducts] = useState([]);
  const [Errors, setErrors] = useState('');
  const navigate = useNavigate();

  // ✅ Fetch all products
  useEffect(() => {
    Api.get("/Get_all_products/")
      .then((response) => {
        console.log('✅ Products fetched:', response.data);
        setProducts(response.data?.Data || []);
      })
      .catch((error) => {
        console.error('❌ Error fetching products:', error);
        setErrors('Failed to load products.');
      });
  }, []);

  // ✅ Add to Cart
  const Add_to_cart = (pk) => {
    Api.post(`/Order/add_to_cart/${pk}/`)
      .then((response) => {
        console.log('✅ Added to cart:', response.data);
      })
      .catch((error) => {
        console.log('❌ Error adding to cart:', error.response?.data);
        setErrors(error.response?.data?.message || "Something went wrong");
      });
  };

  // ✅ Direct Buy Handler
  const handleBuyNow = (productId) => {
    // Redirect to PayOptions page with product ID
    navigate(`/payoptions/${productId}`);
  };

  return (
    <main className="max-w-6xl mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Products</h1>

      {products.length === 0 && !Errors && (
        <p className="text-gray-600 text-center">Loading products...</p>
      )}

      {Errors && (
        <p className="text-red-600 text-center mb-4">{Errors}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((val) => (
          <div
            key={val.id}
            className="bg-amber-100 rounded-md shadow-md hover:shadow-lg transition duration-300 p-4 text-center"
          >
            <img
              className="h-72 w-full object-cover rounded-md mb-3"
              src={`http://127.0.0.1:8000${val.image}`}
              alt={val.name}
            />
            <h1 className="font-serif font-bold text-xl">{val.name}</h1>
            <p className="text-gray-500 text-sm mt-1">Elegant and Comfortable</p>
            <p className="text-lg font-semibold mt-2 text-blue-800">₹{val.price}</p>

            <div className="flex justify-center gap-6 mt-4">
              {/* ✅ Direct Buy */}
              <button
                onClick={() => handleBuyNow(val.id)}
                className="bg-blue-950 hover:bg-blue-800 text-white font-semibold rounded-full px-5 py-2 shadow-md"
              >
                Buy
              </button>

              {/* ✅ Add to Cart */}
              <button
                onClick={() => Add_to_cart(val.id)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-full px-5 py-2 shadow-md"
              >
                Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Show_pro2;
